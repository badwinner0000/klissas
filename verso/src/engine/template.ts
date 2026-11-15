// Renderizador de templates com whitelist. Nunca executa JS vindo do banco.
//   {{A.nome}} {{B.ele_ela}} {{A.o_a}}            variáveis
//   {{se flag:x}}..{{senao}}..{{/se}}              condicional por flag
//   {{se !flag:x}} {{se A.ela}} {{se B.ele}}       negação / gênero
import type { Seat } from '../content/schema';

export type Genero = 'ele' | 'ela';
export interface Perfil {
  nome: string;
  genero: Genero;
}
export interface CtxTpl {
  A: Perfil;
  B: Perfil;
  flags: Record<string, boolean>;
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
};
export const CHAVES_VALIDAS = ['nome', ...Object.keys(PRON)];

type Nodo =
  | { t: 'txt'; v: string }
  | { t: 'var'; seat: Seat; chave: string }
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
    if ((m = tok.match(/^se\s+(!?(?:flag:[a-z0-9_]+|[AB]\.(?:ele|ela)))$/))) {
      const n: Extract<Nodo, { t: 'se' }> = { t: 'se', cond: m[1]!, sim: [], nao: [] };
      alvo().push(n);
      pilha.push({ n, emNao: false });
    } else if (tok === 'senao') {
      const topo = pilha[pilha.length - 1];
      if (!topo || topo.emNao) throw new ErroTemplate('{{senao}} fora de lugar');
      topo.emNao = true;
    } else if (tok === '/se') {
      if (!pilha.pop()) throw new ErroTemplate('{{/se}} sem {{se}}');
    } else if ((m = tok.match(/^([AB])\.([A-Za-z_]+)$/))) {
      const chave = m[2]!;
      if (!CHAVES_VALIDAS.includes(chave.toLowerCase())) throw new ErroTemplate(`variável desconhecida: ${tok}`);
      alvo().push({ t: 'var', seat: m[1] as Seat, chave });
    } else {
      throw new ErroTemplate(`token inválido: {{${tok}}}`);
    }
  }
  if (pilha.length) throw new ErroTemplate('{{se}} sem {{/se}}');
  return raiz;
}

function avalia(cond: string, ctx: CtxTpl): boolean {
  const neg = cond.startsWith('!');
  const c = neg ? cond.slice(1) : cond;
  let r: boolean;
  if (c.startsWith('flag:')) r = !!ctx.flags[c.slice(5)];
  else r = ctx[c[0] as Seat].genero === c.slice(2);
  return neg ? !r : r;
}

function emit(ns: Nodo[], ctx: CtxTpl): string {
  let out = '';
  for (const n of ns) {
    if (n.t === 'txt') out += n.v;
    else if (n.t === 'var') {
      const perfil = ctx[n.seat];
      const baixa = n.chave.toLowerCase();
      let v = baixa === 'nome' ? perfil.nome : PRON[baixa]![perfil.genero === 'ele' ? 0 : 1];
      if (baixa !== 'nome' && n.chave[0] !== n.chave[0]!.toLowerCase()) v = v.charAt(0).toUpperCase() + v.slice(1);
      out += v;
    } else out += emit(avalia(n.cond, ctx) ? n.sim : n.nao, ctx);
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
  return [...src.matchAll(/\{\{\s*se\s+!?flag:([a-z0-9_]+)/g)].map((m) => m[1]!);
}
