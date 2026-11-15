// Gramática segura de condições (nunca JS). Usada em `se`, `{{se ...}}`, finais e destinos.
//   átomos:  flag:x  vinc>=6  fa>=2  abalo>=3  eu:A  A.ela  eu.ele  hist[0]:tag  tom[1]:abre
//   lógica:  !  &&  ||  ( )
import type { Seat } from '../content/schema';

export interface EnvCond {
  flags: Record<string, boolean>;
  vinculo: number;
  fa: number;
  abalo: Record<Seat, number>;
  /** quem lê / quem age (o assento de referência de `eu`) */
  eu: Seat;
  generos: Record<Seat, 'ele' | 'ela'>;
  /** histórico do diálogo corrente */
  hist: { tag: string; tom: string }[];
}

export class ErroCond extends Error {}

type Ast =
  | { t: 'and' | 'or'; a: Ast; b: Ast }
  | { t: 'not'; a: Ast }
  | { t: 'at'; src: string };

const ATOMO = /^(?:flag:[a-z0-9_]+|(?:vinc|fa|abalo)(?:>=|<=|==|>|<)\d+|eu:[AB]|(?:A|B|eu|par)\.(?:ela|ele)|hist\[\d+\]:[a-z0-9_]+|tom\[\d+\]:[a-z]+)$/;

function tokenizar(s: string): string[] {
  const out: string[] = [];
  const re = /\s*(&&|\|\||!|\(|\)|[^\s&|!()]+)/gy;
  let m: RegExpExecArray | null;
  let ultimo = 0;
  while ((m = re.exec(s))) {
    out.push(m[1]!);
    ultimo = re.lastIndex;
  }
  if (s.slice(ultimo).trim()) throw new ErroCond(`condição inválida: "${s}"`);
  return out;
}

const cache = new Map<string, Ast | null>();
export function parseCond(src: string): Ast | null {
  const k = src.trim();
  if (!k) return null;
  const hit = cache.get(k);
  if (hit !== undefined) return hit;
  const tk = tokenizar(k);
  let i = 0;
  const or = (): Ast => {
    let a = and();
    while (tk[i] === '||') { i++; a = { t: 'or', a, b: and() }; }
    return a;
  };
  const and = (): Ast => {
    let a = not();
    while (tk[i] === '&&') { i++; a = { t: 'and', a, b: not() }; }
    return a;
  };
  const not = (): Ast => {
    if (tk[i] === '!') { i++; return { t: 'not', a: not() }; }
    if (tk[i] === '(') { i++; const a = or(); if (tk[i++] !== ')') throw new ErroCond(`parêntese não fechado em "${k}"`); return a; }
    const a = tk[i++];
    if (!a || !ATOMO.test(a)) throw new ErroCond(`átomo inválido "${a ?? ''}" em "${k}"`);
    return { t: 'at', src: a };
  };
  const ast = or();
  if (i !== tk.length) throw new ErroCond(`sobrou "${tk[i]}" em "${k}"`);
  cache.set(k, ast);
  return ast;
}

const outro = (s: Seat): Seat => (s === 'A' ? 'B' : 'A');
function atomo(src: string, e: EnvCond): boolean {
  let m: RegExpMatchArray | null;
  if (src.startsWith('flag:')) return !!e.flags[src.slice(5)];
  if ((m = src.match(/^(vinc|fa|abalo)(>=|<=|==|>|<)(\d+)$/))) {
    const v = m[1] === 'vinc' ? e.vinculo : m[1] === 'fa' ? e.fa : e.abalo[e.eu];
    const n = Number(m[3]);
    return m[2] === '>=' ? v >= n : m[2] === '<=' ? v <= n : m[2] === '==' ? v === n : m[2] === '>' ? v > n : v < n;
  }
  if (src.startsWith('eu:')) return e.eu === src.slice(3);
  if ((m = src.match(/^(A|B|eu|par)\.(ela|ele)$/))) {
    const seat: Seat = m[1] === 'A' ? 'A' : m[1] === 'B' ? 'B' : m[1] === 'eu' ? e.eu : outro(e.eu);
    return e.generos[seat] === m[2];
  }
  if ((m = src.match(/^hist\[(\d+)\]:(.+)$/))) return e.hist[Number(m[1])]?.tag === m[2];
  if ((m = src.match(/^tom\[(\d+)\]:(.+)$/))) return e.hist[Number(m[1])]?.tom === m[2];
  return false;
}
function ev(a: Ast, e: EnvCond): boolean {
  switch (a.t) {
    case 'and': return ev(a.a, e) && ev(a.b, e);
    case 'or': return ev(a.a, e) || ev(a.b, e);
    case 'not': return !ev(a.a, e);
    case 'at': return atomo(a.src, e);
  }
}
/** Condição vazia vale true. */
export function avaliarCond(src: string | undefined, e: EnvCond): boolean {
  const a = src ? parseCond(src) : null;
  return a ? ev(a, e) : true;
}
export function validarCond(src: string): void {
  parseCond(src);
}
export function flagsDaCond(src: string | undefined): string[] {
  return src ? [...src.matchAll(/flag:([a-z0-9_]+)/g)].map((m) => m[1]!) : [];
}
