// Motor determinístico e puro. Sem React, sem I/O. O servidor chama agir() e persiste o resultado.
import type { Acao, Clausula, Efeitos, Livro, No, OpDialogo, Seat, Tom } from '../content/schema';
import { type Rng, testar } from './dados';
import { type Perfil, renderizar } from './template';

export class ErroJogo extends Error {}

export interface Jogador extends Perfil {
  atributos: Record<string, number>;
}
export type Jogadores = Record<Seat, Jogador>;

export interface Estado {
  pos: Record<Seat, string>;
  flags: Record<string, boolean>;
  vinculo: number;
  nervosismo: Record<Seat, number>;
  pistas: Record<Seat, string[]>;
  /** progresso por nó (prontos, escolhas, transcrição de diálogo...) */
  sub: Record<string, any>;
  /** SEGREDOS: votos de consentimento. Nunca projetar para o cliente (vão para secret_votes). */
  segredos: Record<string, Partial<Record<Seat, 'avancar' | 'ficar'>>>;
  rev: number;
  fim: boolean;
  finalTexto?: string;
}

export type Acao_ = { tipo: 'continuar' } | { tipo: 'opcao'; id: string } | { tipo: 'voto'; id: 'avancar' | 'ficar' };

export interface Evento {
  seat: Seat | null;
  tipo: string;
  payload: Record<string, unknown>;
  visibilidade: 'publico' | 'A' | 'B';
}

export interface Visao {
  no: string; // id interno: só para log, nunca mostrar ao jogador
  tipo: No['tipo'];
  cap: number;
  texto: string;
  transcricao: { seat: Seat; texto: string }[];
  opcoes: { id: string; texto: string; tom?: Tom }[];
  aguardando: string | null;
  fim: boolean;
}

const outro = (s: Seat): Seat => (s === 'A' ? 'B' : 'A');
const SEATS: Seat[] = ['A', 'B'];

export function estadoInicial(l: Livro): Estado {
  return {
    pos: { A: l.inicio, B: l.inicio },
    flags: {},
    vinculo: 0,
    nervosismo: { A: 0, B: 0 },
    pistas: { A: [], B: [] },
    sub: {},
    segredos: {},
    rev: 0,
    fim: false,
  };
}

function render(txt: string, jog: Jogadores, e: Estado): string {
  return renderizar(txt, { A: jog.A, B: jog.B, flags: e.flags });
}

function clausulaOk(c: Clausula, e: Estado): boolean {
  if (c.flag !== undefined && !e.flags[c.flag]) return false;
  if (c.naoFlag !== undefined && e.flags[c.naoFlag]) return false;
  if (c.vinculoMin !== undefined && e.vinculo < c.vinculoMin) return false;
  if (c.vinculoMax !== undefined && e.vinculo > c.vinculoMax) return false;
  return true;
}

function aplicar(e: Estado, seat: Seat, ef?: Efeitos) {
  if (!ef) return;
  for (const f of ef.flag === undefined ? [] : Array.isArray(ef.flag) ? ef.flag : [ef.flag]) e.flags[f] = true;
  if (ef.vinculo) e.vinculo = Math.max(0, Math.min(10, e.vinculo + ef.vinculo));
  if (ef.abalo) e.nervosismo[seat] = Math.max(0, Math.min(10, e.nervosismo[seat] + ef.abalo));
  if (ef.pista) e.pistas[seat].push(ef.pista);
}

/** Dá ao texto da vez só as opções de diálogo, completando até 3 tons com o pool de reserva. */
export function opcoesTurno(no: Extract<No, { tipo: 'dialogo' }>, idx: number, tomAnterior?: Tom): OpDialogo[] {
  const t = no.turnos[idx]!;
  const base = [...((tomAnterior && t.porTom?.[tomAnterior]) || t.opcoes)];
  const tons = new Set(base.map((o) => o.tom));
  for (const p of no.pool) {
    if (tons.size >= 3) break;
    if (!tons.has(p.tom)) {
      base.push(p);
      tons.add(p.tom);
    }
  }
  return base;
}

function eligivel(a: Acao, seat: Seat): boolean {
  return !a.seat || a.seat === seat;
}

function mover(l: Livro, e: Estado, seat: Seat, destino: string) {
  const no = l.nos[destino];
  if (!no) throw new ErroJogo(`destino inexistente: ${destino}`);
  for (const f of no.requer ?? []) if (!e.flags[f]) throw new ErroJogo(`contradição: nó ${destino} requer ${f}`);
  for (const f of no.exclui ?? []) if (e.flags[f]) throw new ErroJogo(`contradição: nó ${destino} exclui ${f}`);
  e.pos[seat] = destino;
}

function destPara(d: string | Record<Seat, string>, seat: Seat): string {
  return typeof d === 'string' ? d : d[seat];
}

function concluir(l: Livro, e: Estado, destino: string | Record<Seat, string>) {
  for (const s of SEATS) mover(l, e, s, destPara(destino, s));
  if (e.pos.A === e.pos.B && l.nos[e.pos.A]?.tipo === 'final') e.fim = true;
}

function ambosAqui(e: Estado) {
  return e.pos.A === e.pos.B;
}

export function visao(l: Livro, e: Estado, seat: Seat, jog: Jogadores): Visao {
  const id = e.pos[seat];
  const no = l.nos[id]!;
  const base = { no: id, tipo: no.tipo, cap: no.cap, transcricao: [] as Visao['transcricao'], opcoes: [] as Visao['opcoes'], aguardando: null as string | null, fim: e.fim };
  const r = (t: string) => render(t, jog, e);
  const sub = e.sub[id] ?? {};
  const compartilhado = no.tipo !== 'solo';
  if (compartilhado && !ambosAqui(e)) return { ...base, texto: 'texto' in no ? r(no.texto) : '', aguardando: 'o outro jogador terminar a própria cena' };

  const continuar = (): Visao['opcoes'] => [{ id: 'continuar', texto: 'Continuar' }];
  const prontoJa = (sub.prontos as Seat[] | undefined)?.includes(seat);

  switch (no.tipo) {
    case 'segue':
      return { ...base, texto: r(no.texto), opcoes: prontoJa ? [] : continuar(), aguardando: prontoJa ? 'o outro jogador' : null };
    case 'fim':
      return { ...base, texto: `${r(no.texto)}\n\n${r(no.gancho)}`, opcoes: prontoJa ? [] : continuar(), aguardando: prontoJa ? 'o outro jogador' : null };
    case 'final':
      return { ...base, texto: e.finalTexto ?? '' };
    case 'solo': {
      if (no.seat !== seat) throw new ErroJogo('nó solo de outro assento');
      if (sub.resultado) return { ...base, texto: `${r(no.texto)}\n\n${sub.resultado}`, opcoes: continuar() };
      return {
        ...base,
        texto: r(no.texto),
        opcoes: no.acoes.filter((a) => eligivel(a, seat)).map((a) => ({ id: a.id, texto: r(a.texto) })),
      };
    }
    case 'dividir':
    case 'decisao': {
      const esc: Partial<Record<Seat, string>> = sub.escolhas ?? {};
      const meu: string | undefined = sub.res?.[seat];
      if (esc[seat]) {
        const ambos = !!esc.A && !!esc.B;
        if (!ambos) return { ...base, texto: `${r(no.texto)}\n\n${meu ?? ''}`, aguardando: 'o outro jogador escolher' };
        const des = no.desfecho ? `\n\n${r(no.desfecho)}` : '';
        return { ...base, texto: `${r(no.texto)}\n\n${meu ?? ''}${des}`, opcoes: prontoJa ? [] : continuar(), aguardando: prontoJa ? 'o outro jogador' : null };
      }
      const tomadas = no.tipo === 'dividir' ? Object.values(esc) : [];
      return {
        ...base,
        texto: r(no.texto),
        opcoes: no.acoes.filter((a) => eligivel(a, seat) && !tomadas.includes(a.id)).map((a) => ({ id: a.id, texto: r(a.texto) })),
      };
    }
    case 'consentimento': {
      const voto = e.segredos[id]?.[seat];
      if (voto) return { ...base, texto: r(no.texto), aguardando: 'o outro jogador' };
      return {
        ...base,
        texto: `${r(no.texto)}\n\n${r(no.pergunta)}`,
        opcoes: [
          { id: 'avancar', texto: r(no.avancar) },
          { id: 'ficar', texto: r(no.ficar) },
        ],
      };
    }
    case 'dialogo': {
      const idx: number = sub.turno ?? 0;
      const transcricao: Visao['transcricao'] = sub.transcricao ?? [];
      if (idx >= no.turnos.length) {
        return { ...base, texto: r(no.texto) + (no.fecho ? `\n\n${r(no.fecho)}` : ''), transcricao, opcoes: prontoJa ? [] : continuar(), aguardando: prontoJa ? 'o outro jogador' : null };
      }
      const t = no.turnos[idx]!;
      if (t.p !== seat) return { ...base, texto: r(no.texto), transcricao, aguardando: 'o outro jogador responder' };
      return {
        ...base,
        texto: r(no.texto),
        transcricao,
        opcoes: opcoesTurno(no, idx, sub.tomAnterior).map((o) => ({ id: `${idx}:${o.tag}`, texto: render(o.texto, jog, e), tom: o.tom })),
      };
    }
  }
}

export function agir(
  l: Livro,
  e0: Estado,
  seat: Seat,
  acao: Acao_,
  jog: Jogadores,
  rng: Rng,
): { estado: Estado; eventos: Evento[] } {
  if (e0.fim) throw new ErroJogo('a história já terminou');
  const e = structuredClone(e0);
  const id = e.pos[seat];
  const no = l.nos[id];
  if (!no) throw new ErroJogo(`nó inexistente: ${id}`);
  const eventos: Evento[] = [];
  const sub = (e.sub[id] ??= {});
  const ev = (tipo: string, payload: Record<string, unknown>, visibilidade: Evento['visibilidade'] = 'publico') =>
    eventos.push({ seat, tipo, payload: { no: id, ...payload }, visibilidade });

  if (no.tipo !== 'solo' && !ambosAqui(e)) throw new ErroJogo('aguarde o outro jogador');

  const pronto = (destino: string | Record<Seat, string>) => {
    if (acao.tipo !== 'continuar') throw new ErroJogo('ação inválida: esperado continuar');
    const p: Seat[] = (sub.prontos ??= []);
    if (p.includes(seat)) throw new ErroJogo('você já continuou');
    p.push(seat);
    if (p.length === 2) concluir(l, e, destino);
  };

  const rodarAcao = (a: Acao): string => {
    if (a.teste) {
      const t = a.teste;
      const r = testar(rng, jog[seat].atributos[t.attr] ?? 0, t.mod);
      const res = t[r.nivel];
      aplicar(e, seat, res.efeitos);
      ev('teste', { acao: a.id, attr: t.attr, dados: r.dados, total: r.total, nivel: r.nivel }, seat);
      return render(res.texto, jog, e);
    }
    aplicar(e, seat, a.efeitos);
    return render(a.resultado!, jog, e);
  };

  switch (no.tipo) {
    case 'segue':
      pronto(no.ir);
      if (sub.prontos.length === 2) aplicar(e, seat, no.efeitos);
      break;
    case 'fim':
      pronto(no.ir);
      break;
    case 'final':
      throw new ErroJogo('a história já terminou');
    case 'solo': {
      if (no.seat !== seat) throw new ErroJogo('esta cena é do outro jogador');
      if (sub.resultado) {
        if (acao.tipo !== 'continuar') throw new ErroJogo('esperado continuar');
        mover(l, e, seat, no.ir);
        break;
      }
      if (acao.tipo !== 'opcao') throw new ErroJogo('esperado uma escolha');
      const a = no.acoes.find((x) => x.id === acao.id && eligivel(x, seat));
      if (!a) throw new ErroJogo('ação inválida neste nó');
      sub.resultado = rodarAcao(a);
      ev('escolha', { acao: a.id }, seat);
      break;
    }
    case 'dividir':
    case 'decisao': {
      const esc: Partial<Record<Seat, string>> = (sub.escolhas ??= {});
      if (esc.A && esc.B) {
        pronto(no.ir);
        break;
      }
      if (esc[seat]) throw new ErroJogo('você já escolheu; aguarde o outro');
      if (acao.tipo !== 'opcao') throw new ErroJogo('esperado uma escolha');
      const tomadas = no.tipo === 'dividir' ? Object.values(esc) : [];
      const a = no.acoes.find((x) => x.id === acao.id && eligivel(x, seat) && !tomadas.includes(x.id));
      if (!a) throw new ErroJogo('ação indisponível (já escolhida pelo outro ou não é sua)');
      esc[seat] = a.id;
      (sub.res ??= {})[seat] = rodarAcao(a);
      ev('escolha', { acao: a.id }, seat);
      break;
    }
    case 'consentimento': {
      if (acao.tipo !== 'voto') throw new ErroJogo('esperado voto');
      const v = (e.segredos[id] ??= {});
      if (v[seat]) throw new ErroJogo('voto já registrado');
      v[seat] = acao.id;
      // o voto individual nunca vira evento público
      if (v.A && v.B) {
        const aceito = v.A === 'avancar' && v.B === 'avancar';
        e.flags[no.flag] = aceito;
        // resultado público não diz quem recuou
        eventos.push({ seat: null, tipo: 'consentimento', payload: { no: id, avancou: aceito }, visibilidade: 'publico' });
        concluir(l, e, aceito ? no.irAvancou : no.irSem);
      }
      break;
    }
    case 'dialogo': {
      const idx: number = (sub.turno ??= 0);
      if (idx >= no.turnos.length) {
        pronto(no.ir);
        break;
      }
      const t = no.turnos[idx]!;
      if (t.p !== seat) throw new ErroJogo('não é a sua vez de falar');
      if (acao.tipo !== 'opcao') throw new ErroJogo('esperado uma escolha');
      const op = opcoesTurno(no, idx, sub.tomAnterior).find((o) => `${idx}:${o.tag}` === acao.id);
      if (!op) throw new ErroJogo('opção inválida neste turno');
      aplicar(e, seat, op.efeitos);
      (sub.transcricao ??= []).push({ seat, texto: render(op.texto, jog, e) });
      sub.tomAnterior = op.tom;
      sub.turno = idx + 1;
      ev('fala', { tom: op.tom, tag: op.tag });
      break;
    }
  }

  if (e.fim) {
    const fn = l.nos[e.pos.A];
    if (fn?.tipo === 'final') {
      const f = fn.finais.find((x) => x.se.every((c) => clausulaOk(c, e)));
      e.finalTexto = f ? render(f.texto, jog, e) : '';
      eventos.push({ seat: null, tipo: 'fim', payload: { no: e.pos.A }, visibilidade: 'publico' });
    }
  }
  e.rev = e0.rev + 1;
  return { estado: e, eventos };
}
