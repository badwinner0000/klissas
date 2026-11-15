import type { Livro, Seat } from '../content/schema';
import { type Rng, criarRng } from './rng';
import { type Acao_, ErroJogo, type Estado, type Jogadores, agir, iniciar, visao } from './motor';
import type { Genero } from './template';

export type Politica = 'ambos' | 'nenhum' | 'soA' | 'soB';
export const POLITICAS: Politica[] = ['ambos', 'nenhum', 'soA', 'soB'];
export const GENEROS: [Genero, Genero][] = [['ele', 'ele'], ['ele', 'ela'], ['ela', 'ele'], ['ela', 'ela']];

export function jogadoresDe(l: Livro, ga: Genero, gb: Genero): Jogadores {
  void l;
  return { A: { nome: 'Lia', genero: ga }, B: { nome: 'Davi', genero: gb } };
}

export interface Partida {
  visitados: Set<string>;
  textos: Record<Seat, string[]>;
  erros: string[];
  estado: Estado;
  passos: number;
  /** variantes usadas por ação ("nó.ação" → índices): mostra ramos que o jogador nunca vê */
  usos: Map<string, Set<number>>;
}

const DEFEITOS = /\$\{|undefined|\bnull\b|NaN|\[object|\{\{|\}\}/;
const marca = { esc: '▸', fala: '“', txt: '' } as const;

export function jogar(l: Livro, jog: Jogadores, politica: Politica, rng: Rng, maxPassos = 1500): Partida {
  let e = iniciar(l, jog);
  const visitados = new Set<string>(typeof l.inicio === 'string' ? [l.inicio] : [l.inicio.A, l.inicio.B]);
  const textos: Record<Seat, string[]> = { A: [], B: [] };
  const erros: string[] = [];
  const ultimo: Record<Seat, string> = { A: '', B: '' };
  const noAnterior: Record<Seat, string> = { A: '', B: '' };
  const usos = new Map<string, Set<number>>();
  let passos = 0;
  while (!e.fim && passos < maxPassos) {
    let agiu = false;
    const ordem: Seat[] = rng() < 0.5 ? ['A', 'B'] : ['B', 'A'];
    for (const s of ordem) {
      const v = visao(l, e, s, jog);
      visitados.add(e.pos[s]);
      const linhas = v.registro.map((r) => (r.k === 'esc' ? `${marca.esc} [${jog[r.seat].nome}] ${r.texto}` : r.k === 'fala' ? `[${jog[r.seat].nome}] ${r.texto}` : r.texto));
      const corpo = [v.texto, ...linhas].filter(Boolean).join('\n\n');
      if (corpo !== ultimo[s]) {
        ultimo[s] = corpo;
        if (DEFEITOS.test(`${v.lugar ?? ''} ${v.hora ?? ''}`)) erros.push(`cabeçalho quebrado em ${e.pos[s]}: ${v.lugar} · ${v.hora}`);
        if (DEFEITOS.test(corpo)) erros.push(`texto quebrado em ${e.pos[s]}: ${corpo.match(DEFEITOS)?.[0]}`);
        if (noAnterior[s] === e.pos[s] && textos[s].length) textos[s][textos[s].length - 1] = corpo;
        else textos[s].push(corpo);
        noAnterior[s] = e.pos[s];
      }
      if (!v.opcoes.length) continue;
      let acao: Acao_;
      if (v.tipo === 'consentimento') {
        const quer = politica === 'ambos' || (politica === 'soA' && s === 'A') || (politica === 'soB' && s === 'B');
        acao = { tipo: 'voto', id: quer ? 'avancar' : 'ficar' };
      } else if (v.opcoes[0]!.id === 'continuar') acao = { tipo: 'continuar' };
      else if (v.tipo === 'decisao' && v.votoDoOutro && v.opcoes.some((o) => o.id === v.votoDoOutro!.id)) acao = { tipo: 'opcao', id: v.votoDoOutro.id };
      else acao = { tipo: 'opcao', id: v.opcoes[Math.floor(rng() * v.opcoes.length)]!.id };
      try {
        const r = agir(l, e, s, acao, jog);
        for (const ev of r.eventos) if ((ev.tipo === 'escolha' || ev.tipo === 'decisao') && typeof ev.payload.variante === 'number') { const k = `${ev.payload.no}.${ev.payload.acao}`; (usos.get(k) ?? usos.set(k, new Set()).get(k)!).add(ev.payload.variante as number); }
        e = r.estado;
      } catch (err) {
        erros.push(err instanceof ErroJogo ? err.message : String(err));
        return { visitados, textos, erros, estado: e, passos, usos };
      }
      passos++;
      agiu = true;
      break;
    }
    if (!agiu) {
      erros.push(`impasse: ninguém pode agir (A em ${e.pos.A}, B em ${e.pos.B})`);
      break;
    }
  }
  if (!e.fim && !erros.length) erros.push('limite de passos sem chegar ao fim');
  visitados.add(e.pos.A);
  visitados.add(e.pos.B);
  if (e.finalTexto) {
    textos.A.push(e.finalTexto);
    textos.B.push(e.finalTexto);
  }
  return { visitados, textos, erros, estado: e, passos, usos };
}

export function simular(l: Livro, n: number, seed = 1) {
  const todos = new Set<string>();
  const erros: string[] = [];
  const finais = new Set<string>();
  const usos = new Map<string, Set<number>>();
  let partidas = 0;
  for (const politica of POLITICAS)
    for (const [ga, gb] of GENEROS)
      for (let i = 0; i < n; i++) {
        const rng = criarRng(seed * 100003 + partidas);
        const p = jogar(l, jogadoresDe(l, ga, gb), politica, rng);
        partidas++;
        p.visitados.forEach((v) => todos.add(v));
        for (const [k, vs] of p.usos) { const a = usos.get(k) ?? usos.set(k, new Set()).get(k)!; vs.forEach((x) => a.add(x)); }
        if (p.estado.finalTexto) finais.add(p.estado.finalTexto.slice(0, 40));
        for (const er of p.erros) erros.push(`[${politica} ${ga}/${gb} #${i}] ${er}`);
      }
  const naoVisitados = Object.keys(l.nos).filter((id) => !todos.has(id));
  for (const id of naoVisitados) erros.push(`nó nunca visitado nas simulações: ${id}`);
  // ramos de resultado que NUNCA apareceram: o jogador não vê esse texto
  const ramosNunca: string[] = [];
  for (const [id, no] of Object.entries(l.nos)) if ('acoes' in no) for (const a of no.acoes) if (a.variantes && a.variantes.length > 1) { const u = usos.get(`${id}.${a.id}`); if (u) for (let i = 0; i < a.variantes.length; i++) if (!u.has(i)) ramosNunca.push(`${id}.${a.id}#${i}`); }
  return { partidas, erros, naoVisitados, finaisDistintos: finais.size, ramosNunca };
}
