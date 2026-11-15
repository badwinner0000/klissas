// Renderizador de templates com whitelist. Nunca executa JS vindo do banco.
//   {{A.nome}} {{B.ele_ela}} {{A.o_a}}            variáveis
//   {{se flag:x}}..{{senao}}..{{/se}}              condicional por flag
//   {{se !flag:x}} {{se A.ela}} {{se B.ele}}       negação / gênero
import type { Seat } from '../content/schema';
import { type EnvCond, avaliarCond, validarCond } from './cond';

export type Genero = 'ele' | 'ela';
export interface Perfil {
  nome: string;
  genero: Genero;
  idade?: number;
}
export interface CtxTpl {
  A: Perfil;
  B: Perfil;
  flags: Record<string, boolean>;
  /** quem lê (assento de referência de `eu`). Padrão: A. */
  eu?: Seat;
  /** quem agiu, para {{quem}} / {{outroquem}} */
  ator?: Seat;
  vinculo?: number;
  fa?: number;
  abalo?: Record<Seat, number>;
  hist?: { tag: string; tom: string }[];
}
export class ErroTemplate extends Error {}

const PRON: Record<string, [string, string]> = {
  ele_ela: ['ele', 'ela'],
  o_a: ['o', 'a'],
  dele_dela: ['dele', 'dela'],
  um_uma: ['um', 'uma'],
  senhor_senhora: ['senhor', 'senhora'],
  ao_a: ['ao', 'à'],
  seu_sua: ['seu', 'sua'],
  lo_la: ['lo', 'la'],
};
export const CHAVES_VALIDAS = ['nome', ...Object.keys(PRON)];

type Suj = Seat | 'eu' | 'par' | 'ator' | 'outro';
type Nodo =
  | { t: 'txt'; v: string }
  | { t: 'var'; suj: Suj; chave: string }
  | { t: 'quem'; chave: 'quem' | 'outroquem'; cap: boolean }
  | { t: 'se'; cond: string; sim: Nodo[]; nao: Nodo[] };

function parse(src: string): Nodo[] {
  const partes = src.split(/(\{\{[^}]*\}\})/);
  const raiz: Nodo[] = [];
  const pilha: { n: Extract<Nodo, { t: 'se' }>; emNao: boolean }[] = [];
  const alvo = () => {
    const topo = pilha[pilha.length - 1];
    return topo ? (topo.emNao ? topo.n.nao : topo.n.sim) : raiz;
  };
  for (const p of partes) {
    if (!p) continue;
    if (!p.startsWith('{{')) {
      alvo().push({ t: 'txt', v: p });
      continue;
    }
    const tok = p.slice(2, -2).trim();
    let m: RegExpMatchArray | null;
    if ((m = tok.match(/^se\s+(.+)$/))) {
      try { validarCond(m[1]!); } catch (e) { throw new ErroTemplate((e as Error).message); }
      const n: Extract<Nodo, { t: 'se' }> = { t: 'se', cond: m[1]!, sim: [], nao: [] };
      alvo().push(n);
      pilha.push({ n, emNao: false });
    } else if (tok === 'senao') {
      const topo = pilha[pilha.length - 1];
      if (!topo || topo.emNao) throw new ErroTemplate('{{senao}} fora de lugar');
      topo.emNao = true;
    } else if (tok === '/se') {
      if (!pilha.pop()) throw new ErroTemplate('{{/se}} sem {{se}}');
    } else if ((m = tok.match(/^(quem|outroquem|Quem|Outroquem)$/))) {
      alvo().push({ t: 'quem', chave: m[1]!.toLowerCase() as 'quem' | 'outroquem', cap: m[1]![0] !== m[1]![0]!.toLowerCase() });
    } else if ((m = tok.match(/^(A|B|eu|par|ator|outro)\.([A-Za-z_]+)$/))) {
      const chave = m[2]!;
      if (![...CHAVES_VALIDAS, 'ref', 'idade', 'inicial'].includes(chave.toLowerCase())) throw new ErroTemplate(`variável desconhecida: ${tok}`);
      alvo().push({ t: 'var', suj: m[1] as Suj, chave });
    } else {
      throw new ErroTemplate(`token inválido: {{${tok}}}`);
    }
  }
  if (pilha.length) throw new ErroTemplate('{{se}} sem {{/se}}');
  return raiz;
}

const outro = (x: Seat): Seat => (x === 'A' ? 'B' : 'A');
function env(ctx: CtxTpl): EnvCond {
  return {
    flags: ctx.flags,
    vinculo: ctx.vinculo ?? 0,
    fa: ctx.fa ?? 0,
    abalo: ctx.abalo ?? { A: 0, B: 0 },
    eu: ctx.eu ?? 'A',
    generos: { A: ctx.A.genero, B: ctx.B.genero },
    hist: ctx.hist ?? [],
  };
}
function seatDe(suj: Suj, ctx: CtxTpl): Seat {
  const eu = ctx.eu ?? 'A';
  const ator = ctx.ator ?? eu;
  return suj === 'A' || suj === 'B' ? suj : suj === 'eu' ? eu : suj === 'par' ? outro(eu) : suj === 'ator' ? ator : outro(ator);
}
const cap1 = (v: string) => v.charAt(0).toUpperCase() + v.slice(1);

function emit(ns: Nodo[], ctx: CtxTpl): string {
  let out = '';
  for (const n of ns) {
    if (n.t === 'txt') out += n.v;
    else if (n.t === 'quem') {
      const eu = ctx.eu ?? 'A';
      const ator = ctx.ator ?? eu;
      const voce = n.chave === 'quem' ? ator === eu : ator !== eu;
      const v = voce ? 'você' : ctx[n.chave === 'quem' ? ator : outro(ator)].nome;
      out += n.cap ? cap1(v) : v;
    } else if (n.t === 'var') {
      const seat = seatDe(n.suj, ctx);
      const perfil = ctx[seat];
      const baixa = n.chave.toLowerCase();
      let v: string;
      if (baixa === 'nome') v = perfil.nome;
      else if (baixa === 'idade') v = String(perfil.idade ?? '');
      else if (baixa === 'inicial') v = perfil.nome.charAt(0);
      else if (baixa === 'ref') v = (ctx.eu ?? 'A') === seat ? 'você' : perfil.nome;
      else v = PRON[baixa]![perfil.genero === 'ele' ? 0 : 1];
      if (baixa !== 'nome' && baixa !== 'idade' && baixa !== 'inicial' && n.chave[0] !== n.chave[0]!.toLowerCase()) v = cap1(v);
      out += v;
    } else out += emit(avaliarCond(n.cond, env(ctx)) ? n.sim : n.nao, ctx);
  }
  return out;
}

export function renderizar(src: string, ctx: CtxTpl): string {
  return emit(parse(src), ctx);
}
/** Lança ErroTemplate se a sintaxe for inválida. */
export function validarTemplate(src: string): void {
  parse(src);
}
/** Nomes de flags lidas por um template. */
export function flagsLidas(src: string): string[] {
  return [...src.matchAll(/\{\{\s*se\s+[^}]*\}\}/g)].flatMap((t) => [...t[0].matchAll(/flag:([a-z0-9_]+)/g)].map((m) => m[1]!));
}
