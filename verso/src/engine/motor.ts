// Motor determinístico e puro (v2). Sem React, sem I/O, sem aleatoriedade: o servidor chama agir() e persiste.
import type { Acao, Dest, Efeitos, Livro, No, OpDialogo, Seat } from '../content/schema';
import { type EnvCond, avaliarCond } from './cond';
import { posse, vistaDoPar } from './perspectiva';
import { type CtxTpl, type Perfil, renderizar } from './template';

export class ErroJogo extends Error {}

export type Jogador = Perfil;
export type Jogadores = Record<Seat, Jogador>;

export interface Reg {
  k: 'esc' | 'txt' | 'fala';
  seat: Seat;
  /** texto já renderizado para cada leitor (perspectiva). */
  texto: Record<Seat, string>;
}

export interface Estado {
  pos: Record<Seat, string>;
  flags: Record<string, boolean>;
  vinculo: number;
  fa: number;
  nervosismo: Record<Seat, number>;
  pistas: Record<Seat, string[]>;
  /** ganho de vínculo já concedido por capítulo (teto por capítulo) */
  vg: Record<number, number>;
  /** progresso por nó */
  sub: Record<string, any>;
  /** SEGREDOS: votos de consentimento. Nunca projetar ao cliente (vão para secret_votes). */
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
  lugar?: string;
  hora?: string;
  texto: string;
  prompt?: string;
  registro: { k: Reg['k']; seat: Seat; texto: string }[];
  opcoes: { id: string; texto: string; tom?: string }[];
  aguardando: string | null;
  votoDoOutro?: { id: string; texto: string };
  fim: boolean;
  ficha: { vinculo: number; fa: number; nervosismo: number; pistas: string[] };
}

const SEATS: Seat[] = ['A', 'B'];
const outro = (s: Seat): Seat => (s === 'A' ? 'B' : 'A');

/** Flags gravadas por nós de consentimento por assento: PRIVADAS, nunca vão ao cliente nem ao estado público. */
export function flagsPrivadas(l: Livro): string[] {
  return Object.values(l.nos).flatMap((n) => (n.tipo === 'consentimento' ? [`${n.flag}_a`, `${n.flag}_b`] : []));
}

export function estadoInicial(l: Livro): Estado {
  return {
    pos: typeof l.inicio === 'string' ? { A: l.inicio, B: l.inicio } : { ...l.inicio },
    flags: {},
    vinculo: 0,
    fa: 0,
    nervosismo: { A: 0, B: 0 },
    pistas: { A: [], B: [] },
    vg: {},
    sub: {},
    segredos: {},
    rev: 0,
    fim: false,
  };
}

// ───────────── renderização ─────────────
function ctxTpl(l: Livro, e: Estado, jog: Jogadores, eu: Seat, ator?: Seat, hist?: { tag: string; tom: string }[]): CtxTpl {
  return {
    A: { ...jog.A, idade: jog.A.idade ?? l.idades?.A },
    B: { ...jog.B, idade: jog.B.idade ?? l.idades?.B },
    flags: e.flags,
    eu,
    ator,
    vinculo: e.vinculo,
    fa: e.fa,
    abalo: e.nervosismo,
    hist,
  };
}
function render(l: Livro, e: Estado, jog: Jogadores, txt: string, eu: Seat, ator?: Seat, hist?: { tag: string; tom: string }[]): string {
  return posse(renderizar(txt, ctxTpl(l, e, jog, eu, ator, hist)));
}
/** Texto escrito do ponto de vista de quem age; o parceiro lê em 3ª pessoa. */
function paraTodos(l: Livro, e: Estado, jog: Jogadores, txt: string, ator: Seat): Record<Seat, string> {
  const ta = render(l, e, jog, txt, ator, ator);
  const o = outro(ator);
  return { [ator]: ta, [o]: vistaDoPar(ta, jog[ator].nome, jog[o].nome) } as Record<Seat, string>;
}
function envCond(e: Estado, jog: Jogadores, eu: Seat, hist: { tag: string; tom: string }[] = []): EnvCond {
  return {
    flags: e.flags,
    vinculo: e.vinculo,
    fa: e.fa,
    abalo: e.nervosismo,
    eu,
    generos: { A: jog.A.genero, B: jog.B.genero },
    hist,
  };
}

// ───────────── efeitos ─────────────
const lista = (v: string | string[] | undefined) => (v === undefined ? [] : Array.isArray(v) ? v : [v]);
const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));

function aplicar(l: Livro, e: Estado, ator: Seat | 'ab', cap: number, ef?: Efeitos) {
  if (!ef) return;
  for (const f of lista(ef.flag)) e.flags[f] = true;
  for (const f of lista(ef.nflag)) delete e.flags[f];
  for (const f of lista(ef.flagSeat)) for (const s of ator === 'ab' ? SEATS : [ator]) e.flags[`${f}_${s.toLowerCase()}`] = true;
  const quem: Seat[] = ator === 'ab' ? SEATS : [ator];
  if (ef.abalo) for (const s of quem) e.nervosismo[s] = clamp(e.nervosismo[s] + ef.abalo, 0, 6);
  if (ef.abaloPar && ator !== 'ab') e.nervosismo[outro(ator)] = clamp(e.nervosismo[outro(ator)] + ef.abaloPar, 0, 6);
  if (ef.abaloAmbos) for (const s of SEATS) e.nervosismo[s] = clamp(e.nervosismo[s] + ef.abaloAmbos, 0, 6);
  if (ef.vinculo) {
    let v = ef.vinculo;
    if (v > 0) {
      const g = e.vg[cap] ?? 0;
      v = Math.min(v, l.vinculoPorCapitulo - g);
      if (v > 0) e.vg[cap] = g + v;
    }
    if (v) e.vinculo = clamp(e.vinculo + v, 0, 10);
  }
  if (ef.fa) e.fa = clamp(e.fa + ef.fa, 0, 5);
  if (ef.pista) for (const s of quem) if (!e.pistas[s].includes(ef.pista)) e.pistas[s].push(ef.pista);
}

// ───────────── destinos e movimento ─────────────
function resolverDest(e: Estado, jog: Jogadores, d: Dest, seat: Seat): string | Record<Seat, string> {
  if (typeof d === 'string') return d;
  if (!Array.isArray(d)) return d as Record<Seat, string>;
  const hit = d.find((x) => avaliarCond(x.se, envCond(e, jog, 'A')));
  if (!hit) throw new ErroJogo(`nenhum destino condicional vale (${seat})`);
  return hit.ir as string | Record<Seat, string>;
}
function destPara(d: string | Record<Seat, string>, seat: Seat): string {
  return typeof d === 'string' ? d : d[seat];
}
function mover(l: Livro, e: Estado, seat: Seat, destino: string) {
  const no = l.nos[destino];
  if (!no) throw new ErroJogo(`destino inexistente: ${destino}`);
  for (const f of no.requer ?? []) if (!e.flags[f]) throw new ErroJogo(`contradição: nó ${destino} requer ${f}`);
  for (const f of no.exclui ?? []) if (e.flags[f]) throw new ErroJogo(`contradição: nó ${destino} exclui ${f}`);
  e.pos[seat] = destino;
}
/** Entrada em nó: efeitos do nó uma única vez; pistas viram comuns quando os dois se encontram. */
function ativar(l: Livro, e: Estado, jog: Jogadores, seat: Seat) {
  const id = e.pos[seat];
  const no = l.nos[id]!;
  if (no.tipo === 'solo') {
    const sub = (e.sub[id] ??= {});
    if (!sub.entrou) {
      sub.entrou = true;
      aplicar(l, e, seat, no.cap, no.efeitos);
    }
    return;
  }
  if (e.pos.A !== e.pos.B) return;
  const sub = (e.sub[id] ??= {});
  if (sub.entrou) return;
  sub.entrou = true;
  for (const s of SEATS) for (const p of e.pistas[outro(s)]) if (!e.pistas[s].includes(p)) e.pistas[s].push(p);
  if (no.tipo === 'segue') {
    aplicar(l, e, 'ab', no.cap, no.efeitos);
    for (const x of no.efeitosSe ?? []) if (avaliarCond(x.se, envCond(e, jog, 'A'))) aplicar(l, e, 'ab', no.cap, x.efeitos);
  }
  if (no.tipo === 'final') {
    e.fim = true;
    const t = no.finais ? (no.finais.find((f) => avaliarCond(f.se, envCond(e, jog, 'A')))?.texto ?? '') : (no.texto ?? '');
    e.finalTexto = render(l, e, jog, t, 'A');
  }
}
function irPara(l: Livro, e: Estado, jog: Jogadores, d: Dest, seats: Seat[]) {
  for (const s of seats) mover(l, e, s, destPara(resolverDest(e, jog, d, s), s));
  for (const s of seats) ativar(l, e, jog, s);
}

// ───────────── diálogo ─────────────
function falante(no: Extract<No, { tipo: 'dialogo' }>, i: number): Seat {
  return i % 2 === 0 ? no.comeca : outro(no.comeca);
}
export function opcoesTurno(no: Extract<No, { tipo: 'dialogo' }>, idx: number, env: EnvCond): OpDialogo[] {
  const base = no.turnos[idx]!.opcoes.filter((o) => avaliarCond(o.se, env));
  const tons = new Set(base.map((o) => o.tom));
  for (const p of no.pool) {
    if (tons.size >= 3) break;
    if (!tons.has(p.tom) && avaliarCond(p.se, env)) {
      base.push(p);
      tons.add(p.tom);
    }
  }
  return base;
}

// ───────────── ações (solo / dividir / decisão) ─────────────
const elegivel = (a: Acao, seat: Seat, e: Estado, jog: Jogadores) => (!a.seat || a.seat === seat) && avaliarCond(a.se, envCond(e, jog, seat));

function resultadoDaAcao(l: Livro, e: Estado, jog: Jogadores, a: Acao, seat: Seat, cap: number, ator: Seat | 'ab'): Record<Seat, string> {
  const partes: string[] = [];
  if (a.resultado) partes.push(a.resultado);
  let efV: Efeitos | undefined;
  if (a.variantes) {
    // sem dados: a variante depende do estado ANTES da ação (flags, vínculo, nervosismo acumulado)
    const v = a.variantes.find((x) => avaliarCond(x.se, envCond(e, jog, seat)));
    if (!v) throw new ErroJogo(`nenhuma variante vale para a ação ${a.id}`);
    partes.push(v.resultado);
    efV = v.efeitos;
  }
  const out = paraTodos(l, e, jog, partes.join('\n\n'), seat);
  aplicar(l, e, ator, cap, a.efeitos);
  aplicar(l, e, ator, cap, efV);
  return out;
}

const pushReg = (sub: any, k: Reg['k'], seat: Seat, texto: Record<Seat, string>) => (sub.reg ??= []).push({ k, seat, texto });

// ───────────── visão ─────────────
export function visao(l: Livro, e: Estado, seat: Seat, jog: Jogadores): Visao {
  const id = e.pos[seat];
  const no = l.nos[id]!;
  const sub = e.sub[id] ?? {};
  const r = (t: string) => render(l, e, jog, t, seat);
  const reg = ((sub.reg ?? []) as Reg[]).map((x) => ({ k: x.k, seat: x.seat, texto: x.texto[seat] }));
  const base = {
    no: id,
    tipo: no.tipo,
    cap: no.cap,
    lugar: no.lugar,
    hora: no.hora,
    registro: reg,
    opcoes: [] as Visao['opcoes'],
    aguardando: null as string | null,
    fim: e.fim,
    ficha: { vinculo: e.vinculo, fa: e.fa, nervosismo: e.nervosismo[seat], pistas: [...e.pistas[seat]] },
  };
  const texto = 'texto' in no && no.texto ? r(no.texto) : '';
  if (no.tipo !== 'solo' && e.pos.A !== e.pos.B) return { ...base, texto, aguardando: 'o outro jogador terminar a própria cena' };

  const continuar = [{ id: 'continuar', texto: 'Continuar' }];
  const prontoJa = (sub.prontos as Seat[] | undefined)?.includes(seat);
  const pronto = { opcoes: prontoJa ? [] : continuar, aguardando: prontoJa ? 'o outro jogador' : null };

  switch (no.tipo) {
    case 'segue':
      return { ...base, texto, ...pronto };
    case 'fim':
      return { ...base, texto: no.gancho ? `${texto}\n\n${r(no.gancho)}` : texto, ...pronto };
    case 'final':
      return { ...base, texto: e.finalTexto ?? '' };
    case 'solo': {
      if (no.seat !== seat) throw new ErroJogo('nó solo de outro assento');
      if (!no.acoes.length || sub.saida) return { ...base, texto, opcoes: continuar };
      const usadas: string[] = sub.usadas ?? [];
      const op = no.acoes.filter((a) => elegivel(a, seat, e, jog) && (a.repete || a.ir || !usadas.includes(a.id))).map((a) => ({ id: a.id, texto: r(a.texto) }));
      return { ...base, texto, opcoes: op };
    }
    case 'dividir': {
      const esc: Record<Seat, string[]> = sub.esc ?? { A: [], B: [] };
      const feitos = (s: Seat) => esc[s].length >= no.cada;
      if (feitos('A') && feitos('B')) return { ...base, texto, ...pronto };
      if (feitos(seat)) return { ...base, texto, aguardando: 'o outro jogador escolher' };
      const op = no.acoes
        .filter((a) => elegivel(a, seat, e, jog) && !esc[seat].includes(a.id) && (a.compartilhada || !esc[outro(seat)].includes(a.id)))
        .map((a) => ({ id: a.id, texto: r(a.texto) }));
      return { ...base, texto, prompt: no.pergunta ? r(no.pergunta) : undefined, opcoes: op };
    }
    case 'decisao': {
      if (sub.resolvida) return { ...base, texto, ...pronto };
      const votos: Partial<Record<Seat, string>> = sub.votos ?? {};
      const op = no.acoes.filter((a) => elegivel(a, seat, e, jog)).map((a) => ({ id: a.id, texto: r(a.texto) }));
      const ida = votos[outro(seat)];
      const dele = ida ? no.acoes.find((a) => a.id === ida) : undefined;
      return {
        ...base,
        texto,
        prompt: no.pergunta ? r(no.pergunta) : undefined,
        opcoes: op,
        votoDoOutro: dele ? { id: dele.id, texto: r(dele.texto) } : undefined,
        aguardando: votos[seat] && !votos[outro(seat)] ? 'o outro jogador votar' : null,
      };
    }
    case 'consentimento': {
      if (e.segredos[id]?.[seat]) return { ...base, texto, aguardando: 'o outro jogador' };
      return { ...base, texto: `${texto}\n\n${r(no.pergunta)}`, opcoes: [{ id: 'avancar', texto: r(no.avancar) }, { id: 'ficar', texto: r(no.ficar) }] };
    }
    case 'dialogo': {
      const idx: number = sub.turno ?? 0;
      const hist = (sub.falas ?? []) as { tag: string; tom: string }[];
      if (idx >= no.turnos.length) return { ...base, texto: no.fecho ? `${texto}\n\n${r(no.fecho)}` : texto, ...pronto };
      const t = no.turnos[idx]!;
      if (falante(no, idx) !== seat) return { ...base, texto, aguardando: 'o outro jogador responder' };
      return {
        ...base,
        texto,
        prompt: t.prompt ? r(t.prompt) : undefined,
        opcoes: opcoesTurno(no, idx, envCond(e, jog, seat, hist)).map((o) => ({ id: `${idx}:${o.tag}`, texto: render(l, e, jog, o.texto, seat, seat, hist), tom: o.tom })),
      };
    }
  }
}

// ───────────── agir ─────────────
export function agir(l: Livro, e0: Estado, seat: Seat, acao: Acao_, jog: Jogadores): { estado: Estado; eventos: Evento[] } {
  if (e0.fim) throw new ErroJogo('a história já terminou');
  const e = structuredClone(e0);
  const id = e.pos[seat];
  const no = l.nos[id];
  if (!no) throw new ErroJogo(`nó inexistente: ${id}`);
  const eventos: Evento[] = [];
  const sub = (e.sub[id] ??= {});
  const ev = (tipo: string, payload: Record<string, unknown>, visibilidade: Evento['visibilidade'] = 'publico') =>
    eventos.push({ seat, tipo, payload: { no: id, ...payload }, visibilidade });
  if (no.tipo !== 'solo' && e.pos.A !== e.pos.B) throw new ErroJogo('aguarde o outro jogador');

  /** os dois apertam "continuar"; ao segundo, os dois seguem para `dest` */
  const pronto = (dest: Dest, efs?: () => void) => {
    if (acao.tipo !== 'continuar') throw new ErroJogo('ação inválida: esperado continuar');
    const p: Seat[] = (sub.prontos ??= []);
    if (p.includes(seat)) throw new ErroJogo('você já continuou');
    p.push(seat);
    if (p.length === 2) {
      efs?.();
      irPara(l, e, jog, dest, SEATS);
    }
  };
  const escolha = () => {
    if (acao.tipo !== 'opcao') throw new ErroJogo('esperado uma escolha');
    return acao.id;
  };

  switch (no.tipo) {
    case 'segue':
      pronto(no.ir);
      break;
    case 'fim':
      pronto(no.ir, () => {
        for (const s of SEATS) e.nervosismo[s] = Math.max(0, e.nervosismo[s] - 2);
      });
      break;
    case 'final':
      throw new ErroJogo('a história já terminou');
    case 'solo': {
      if (no.seat !== seat) throw new ErroJogo('esta cena é do outro jogador');
      if (!no.acoes.length || sub.saida) {
        if (acao.tipo !== 'continuar') throw new ErroJogo('esperado continuar');
        const d = (sub.saida ?? no.ir) as Dest | undefined;
        if (!d) throw new ErroJogo('cena solo sem saída');
        irPara(l, e, jog, d, [seat]);
        break;
      }
      const aid = escolha();
      const a = no.acoes.find((x) => x.id === aid);
      const usadas: string[] = (sub.usadas ??= []);
      if (!a || !elegivel(a, seat, e, jog) || (!a.repete && !a.ir && usadas.includes(a.id))) throw new ErroJogo('ação inválida neste nó');
      usadas.push(a.id);
      const rot = render(l, e, jog, a.texto, seat, seat);
      pushReg(sub, 'esc', seat, { A: rot, B: rot });
      pushReg(sub, 'txt', seat, resultadoDaAcao(l, e, jog, a, seat, no.cap, seat));
      ev('escolha', { acao: a.id }, seat);
      if (a.ir) sub.saida = a.ir;
      else if (!no.acoes.some((x) => elegivel(x, seat, e, jog) && (x.repete || x.ir || !usadas.includes(x.id)))) {
        if (!no.ir) throw new ErroJogo(`cena solo ${id} esgotou as ações sem saída`);
        sub.saida = no.ir;
      }
      break;
    }
    case 'dividir': {
      const esc: Record<Seat, string[]> = (sub.esc ??= { A: [], B: [] });
      if (esc.A.length >= no.cada && esc.B.length >= no.cada) {
        pronto(no.ir);
        break;
      }
      if (esc[seat].length >= no.cada) throw new ErroJogo('você já escolheu; aguarde o outro');
      const aid = escolha();
      const a = no.acoes.find((x) => x.id === aid);
      if (!a || !elegivel(a, seat, e, jog) || esc[seat].includes(a.id) || (!a.compartilhada && esc[outro(seat)].includes(a.id)))
        throw new ErroJogo('ação indisponível (já escolhida pelo outro ou não é sua)');
      esc[seat].push(a.id);
      const rot = render(l, e, jog, a.texto, seat, seat);
      pushReg(sub, 'esc', seat, { A: rot, B: rot });
      pushReg(sub, 'txt', seat, resultadoDaAcao(l, e, jog, a, seat, no.cap, seat));
      ev('escolha', { acao: a.id });
      break;
    }
    case 'decisao': {
      if (sub.resolvida) {
        pronto(no.ir);
        break;
      }
      const aid = escolha();
      const a = no.acoes.find((x) => x.id === aid);
      if (!a || !elegivel(a, seat, e, jog)) throw new ErroJogo('opção inválida nesta decisão');
      const votos: Partial<Record<Seat, string>> = (sub.votos ??= {});
      votos[seat] = a.id;
      if (votos.A && votos.A === votos.B) {
        const rot = render(l, e, jog, a.texto, seat, seat);
        pushReg(sub, 'esc', seat, { A: rot, B: rot });
        pushReg(sub, 'txt', 'A', resultadoDaAcao(l, e, jog, a, seat, no.cap, 'ab'));
        sub.resolvida = true;
        ev('decisao', { acao: a.id });
      }
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
        if (v.A === 'avancar') e.flags[`${no.flag}_a`] = true;
        if (v.B === 'avancar') e.flags[`${no.flag}_b`] = true;
        // resultado público não diz quem recuou
        eventos.push({ seat: null, tipo: 'consentimento', payload: { no: id, avancou: aceito }, visibilidade: 'publico' });
        irPara(l, e, jog, aceito ? no.irAvancou : no.irSem, SEATS);
      }
      break;
    }
    case 'dialogo': {
      const idx: number = (sub.turno ??= 0);
      if (idx >= no.turnos.length) {
        pronto(no.ir);
        break;
      }
      if (falante(no, idx) !== seat) throw new ErroJogo('não é a sua vez de falar');
      const aid = escolha();
      const hist = (sub.falas ??= []) as { seat: Seat; tag: string; tom: string }[];
      const h = hist.map((x) => ({ tag: x.tag, tom: x.tom }));
      const op = opcoesTurno(no, idx, envCond(e, jog, seat, h)).find((o) => `${idx}:${o.tag}` === aid);
      if (!op) throw new ErroJogo('opção inválida neste turno');
      if (op.acao) pushReg(sub, 'fala', seat, { A: render(l, e, jog, op.texto, 'A', seat, h), B: render(l, e, jog, op.texto, 'B', seat, h) });
      else {
        const t = render(l, e, jog, op.texto, seat, seat, h);
        pushReg(sub, 'fala', seat, { A: t, B: t });
      }
      if (op.depois) pushReg(sub, 'txt', seat, paraTodos(l, e, jog, op.depois, seat));
      aplicar(l, e, seat, no.cap, op.efeitos);
      const ant = hist[hist.length - 1];
      hist.push({ seat, tag: op.tag, tom: op.tom });
      sub.turno = idx + 1;
      // reciprocidade: abrir-se só conta quando o outro também se abre
      if (ant && ant.seat !== seat) {
        const abre = (t: string) => t === 'abre' || t === 'cuida' || t === 'flerte';
        if (abre(op.tom) && abre(ant.tom) && !sub.vincDado) {
          sub.vincDado = true;
          aplicar(l, e, 'ab', no.cap, { vinculo: 1 });
        }
        if (op.tom === 'flerte' && ant.tom === 'flerte' && !sub.faDado) {
          sub.faDado = true;
          aplicar(l, e, 'ab', no.cap, { fa: 1 });
        }
      }
      if (op.tom === 'cuida') aplicar(l, e, outro(seat), no.cap, { abalo: -1 });
      if (op.tom === 'fere' && !sub.feriu) {
        sub.feriu = true;
        aplicar(l, e, 'ab', no.cap, { vinculo: -1 });
      }
      ev('fala', { tom: op.tom, tag: op.tag });
      break;
    }
  }
  if (e.fim) eventos.push({ seat: null, tipo: 'fim', payload: { no: e.pos.A }, visibilidade: 'publico' });
  e.rev = e0.rev + 1;
  return { estado: e, eventos };
}

/** Estado inicial já com a ativação do primeiro nó. */
export function iniciar(l: Livro, jog: Jogadores): Estado {
  const e = estadoInicial(l);
  for (const s of SEATS) ativar(l, e, jog, s);
  return e;
}
