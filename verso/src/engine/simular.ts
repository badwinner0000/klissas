import type { Livro, Seat } from '../content/schema';
import { type Rng, criarRng } from './dados';
import { type Acao_, ErroJogo, type Estado, type Jogadores, agir, estadoInicial, visao } from './motor';
import type { Genero } from './template';

export type Politica = 'ambos' | 'nenhum' | 'soA' | 'soB';
export const POLITICAS: Politica[] = ['ambos', 'nenhum', 'soA', 'soB'];
export const GENEROS: [Genero, Genero][] = [['ele', 'ele'], ['ele', 'ela'], ['ela', 'ele'], ['ela', 'ela']];

export function jogadoresDe(l: Livro, ga: Genero, gb: Genero): Jogadores {
  const attrs = Object.fromEntries(l.atributos.map((a) => [a, 2]));
  return {
    A: { nome: 'Lia', genero: ga, atributos: attrs },
    B: { nome: 'Davi', genero: gb, atributos: attrs },
  };
}

export interface Partida {
  visitados: Set<string>;
  textos: Record<Seat, string[]>;
  erros: string[];
  estado: Estado;
  passos: number;
}

const DEFEITOS = /\$\{|undefined|\bnull\b|NaN|\[object|\{\{|\}\}/;

export function jogar(l: Livro, jog: Jogadores, politica: Politica, rng: Rng, maxPassos = 600): Partida {
  let e = estadoInicial(l);
  const visitados = new Set<string>([l.inicio]);
  const textos: Record<Seat, string[]> = { A: [], B: [] };
  const erros: string[] = [];
  const ultimo: Record<Seat, string> = { A: '', B: '' };
  const noAnterior: Record<Seat, string> = { A: '', B: '' };
  let passos = 0;
  while (!e.fim && passos < maxPassos) {
    let agiu = false;
    const ordem: Seat[] = rng() < 0.5 ? ['A', 'B'] : ['B', 'A'];
    for (const s of ordem) {
      const v = visao(l, e, s, jog);
      visitados.add(e.pos[s]);
      const chave = `${e.pos[s]}|${v.texto}|${v.transcricao.length}|${v.opcoes.length}|${v.aguardando}`;
      if (chave !== ultimo[s]) {
        ultimo[s] = chave;
        if (DEFEITOS.test(v.texto)) erros.push(`texto quebrado em ${e.pos[s]}: ${v.texto.slice(0, 80)}`);
        const falas = v.transcricao.map((t) => `${t.seat}: “${t.texto}”`).join('\n');
        const corpo = falas ? `${v.texto}\n\n${falas}` : v.texto;
        // uma entrada por nó: a mesma cena, evoluindo, substitui a anterior
        if (noAnterior[s] === e.pos[s] && textos[s].length) textos[s][textos[s].length - 1] = corpo;
        else textos[s].push(corpo);
        noAnterior[s] = e.pos[s];
      }
      if (!v.opcoes.length) continue;
      let op = v.opcoes[Math.floor(rng() * v.opcoes.length)]!;
      let acao: Acao_;
      if (v.tipo === 'consentimento') {
        const quer = politica === 'ambos' || (politica === 'soA' && s === 'A') || (politica === 'soB' && s === 'B');
        acao = { tipo: 'voto', id: quer ? 'avancar' : 'ficar' };
      } else if (op.id === 'continuar') acao = { tipo: 'continuar' };
      else acao = { tipo: 'opcao', id: op.id };
      try {
        e = agir(l, e, s, acao, jog, rng).estado;
      } catch (err) {
        erros.push(err instanceof ErroJogo ? err.message : String(err));
        return { visitados, textos, erros, estado: e, passos };
      }
      void op;
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
  if (e.finalTexto) textos.A.push(e.finalTexto), textos.B.push(e.finalTexto);
  return { visitados, textos, erros, estado: e, passos };
}

export function simular(l: Livro, n: number, seed = 1) {
  const todos = new Set<string>();
  const erros: string[] = [];
  const finais = new Set<string>();
  let partidas = 0;
  for (const politica of POLITICAS)
    for (const [ga, gb] of GENEROS)
      for (let i = 0; i < n; i++) {
        const rng = criarRng(seed * 100003 + partidas);
        const p = jogar(l, jogadoresDe(l, ga, gb), politica, rng);
        partidas++;
        p.visitados.forEach((v) => todos.add(v));
        if (p.estado.finalTexto) finais.add(p.estado.finalTexto.slice(0, 40));
        for (const er of p.erros) erros.push(`[${politica} ${ga}/${gb} #${i}] ${er}`);
      }
  const naoVisitados = Object.keys(l.nos).filter((id) => !todos.has(id));
  for (const id of naoVisitados) erros.push(`nó nunca visitado nas simulações: ${id}`);
  return { partidas, erros, naoVisitados, finaisDistintos: finais.size };
}
