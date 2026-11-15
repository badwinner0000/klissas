// Lint de livros: regras das §5 e §6.2 do prompt. Falha bloqueia publicação.
import { type Livro as LivroT, Livro, type No, type Seat } from '../content/schema';
import { type EnvCond, ErroCond, flagsDaCond, validarCond } from './cond';
import { opcoesTurno } from './motor';
import { ErroTemplate, flagsLidas, renderizar, validarTemplate } from './template';

export interface Achado {
  regra: string;
  no?: string;
  msg: string;
}
export interface Resultado {
  erros: Achado[];
  avisos: Achado[];
}

const VERBOS = 'diz|disse|dizia|responde|respondeu|pergunta|perguntou|sussurra|sussurrou|murmura|murmurou|grita|gritou|fala|falou|retruca|retrucou|comenta|comentou|confessa|confessou|admite|admitiu';
const PROT = String.raw`(?:você|\{\{\s*[AB]\.(?:nome|ref)\s*\}\}|\{\{\s*(?:par|eu|ator|outro)\.(?:nome|ref)\s*\}\}|\{\{\s*(?:quem|outroquem)\s*\}\})`;
/** Só o OUTRO protagonista: em resultado de ação escolhida, o ator pode falar/agir (ele escolheu), o par não. */
const PAR = String.raw`(?:\{\{\s*(?:par|outro)\.(?:nome|ref)\s*\}\}|\{\{\s*outroquem\s*\}\})`;
const padroes = (p: string): RegExp[] => [
  new RegExp(String.raw`(?<![\p{L}])${p}\s+(?:${VERBOS})(?![\p{L}])`, 'iu'),
  new RegExp(String.raw`(?<![\p{L}])(?:${VERBOS})\s+${p}`, 'iu'),
  new RegExp(String.raw`[“"][^”"]{2,}[”"],?\s*(?:${VERBOS})\s+[^.]{0,30}${p}`, 'iu'),
  new RegExp(String.raw`(?:^|\n)\s*[—–-]\s*[^\n]*[—–-]\s*(?:${VERBOS})\s+${p}`, 'iu'),
  new RegExp(String.raw`(?<![\p{L}])${p}\s+(?:sente|pensa|percebe|nota|vê|olha para)(?![\p{L}])[^.]*(?:apaixonad|amor|desejo)`, 'iu'),
];
export const PADROES_AGENCIA = padroes(PROT);
const PADROES_PAR = padroes(PAR);
const DEFEITOS = /\$\{|undefined|\bnull\b|NaN|\[object|\{\{|\}\}/;
const GENERO_FIXO = /\b(sozinh[oa]|cansad[oa]|exaust[oa]|obrigad[oa]|educad[oa]|nervos[oa]|sério|séria|bonit[oa]|lind[oa])\b/i;

type Kind = 'narracao' | 'resultado' | 'opcao';
export function textosDoNo(no: No): { campo: string; texto: string; kind: Kind }[] {
  const out: { campo: string; texto: string; kind: Kind }[] = [];
  const add = (campo: string, texto: string | undefined, kind: Kind) => {
    if (texto !== undefined) out.push({ campo, texto, kind });
  };
  const acoes = (as: Extract<No, { acoes: unknown }>['acoes']) =>
    as.forEach((a) => {
      add(`acao:${a.id}`, a.texto, 'opcao');
      add(`acao:${a.id}.resultado`, a.resultado, 'resultado');
      a.variantes?.forEach((v, i) => add(`acao:${a.id}.v${i}`, v.resultado, 'resultado'));
    });
  if ('texto' in no) add('texto', no.texto, 'narracao');
  if ('pergunta' in no) add('pergunta', no.pergunta, 'opcao');
  switch (no.tipo) {
    case 'solo':
    case 'dividir':
    case 'decisao':
      acoes(no.acoes);
      if (no.tipo !== 'solo') add('desfecho', no.desfecho, 'narracao');
      break;
    case 'dialogo':
      add('fecho', no.fecho, 'narracao');
      for (const [i, t] of no.turnos.entries()) {
        add(`turno${i}.prompt`, t.prompt, 'opcao');
        for (const o of t.opcoes) {
          add(`turno${i}:${o.tag}`, o.texto, 'opcao');
          add(`turno${i}:${o.tag}.depois`, o.depois, 'resultado');
        }
      }
      for (const o of no.pool) add(`pool:${o.tag}`, o.texto, 'opcao');
      break;
    case 'consentimento':
      add('avancar', no.avancar, 'opcao');
      add('ficar', no.ficar, 'opcao');
      break;
    case 'fim':
      add('gancho', no.gancho, 'narracao');
      break;
    case 'final':
      no.finais?.forEach((f, i) => add(`final${i}`, f.texto, 'narracao'));
      break;
  }
  return out;
}

const destinosDe = (d: unknown): string[] => {
  if (typeof d === 'string') return [d];
  if (Array.isArray(d)) return d.flatMap((x) => destinosDe(x.ir));
  if (d && typeof d === 'object') return Object.values(d as Record<string, string>);
  return [];
};
export function destinos(no: No): string[] {
  switch (no.tipo) {
    case 'consentimento':
      return [no.irAvancou, no.irSem];
    case 'final':
      return [];
    case 'solo':
      return [...destinosDe(no.ir), ...no.acoes.flatMap((a) => (a.ir ? [a.ir] : []))];
    default:
      return destinosDe(no.ir);
  }
}

/** Detecta chaves duplicadas em objetos JSON (JSON.parse sobrescreve em silêncio). */
export function chavesDuplicadas(raw: string): string[] {
  const dups: string[] = [];
  const pilha: (Set<string> | null)[] = [];
  let i = 0;
  const n = raw.length;
  while (i < n) {
    const c = raw[i]!;
    if (c === '"') {
      let j = i + 1;
      let s = '';
      while (j < n && raw[j] !== '"') {
        if (raw[j] === '\\') {
          s += raw[j]! + raw[j + 1]!;
          j += 2;
        } else s += raw[j++];
      }
      let k = j + 1;
      while (k < n && /\s/.test(raw[k]!)) k++;
      const topo = pilha[pilha.length - 1];
      if (raw[k] === ':' && topo) {
        if (topo.has(s)) dups.push(s);
        topo.add(s);
      }
      i = j + 1;
      continue;
    }
    if (c === '{') pilha.push(new Set());
    else if (c === '[') pilha.push(null);
    else if (c === '}' || c === ']') pilha.pop();
    i++;
  }
  return dups;
}

function alcancaveis(l: LivroT, de: string): Set<string> {
  const vis = new Set<string>();
  const fila = [de];
  while (fila.length) {
    const id = fila.pop()!;
    if (vis.has(id) || !l.nos[id]) continue;
    vis.add(id);
    fila.push(...destinos(l.nos[id]!));
  }
  return vis;
}

export function lintarBruto(raw: string, outrosNomes: string[] = []): Resultado {
  const erros: Achado[] = [];
  for (const d of chavesDuplicadas(raw)) erros.push({ regra: 'id-duplicado', msg: `chave duplicada no JSON: "${d}" (sobrescrita silenciosa)` });
  let json: unknown;
  try {
    json = JSON.parse(raw);
  } catch (e) {
    return { erros: [{ regra: 'json', msg: `JSON inválido: ${(e as Error).message}` }], avisos: [] };
  }
  const p = Livro.safeParse(json);
  if (!p.success) {
    for (const i of p.error.issues) erros.push({ regra: 'schema', msg: `${i.path.join('.')}: ${i.message}` });
    return { erros, avisos: [] };
  }
  const r = lintarLivro(p.data, outrosNomes);
  return { erros: [...erros, ...r.erros], avisos: r.avisos };
}

const envBase = (flags: boolean, num: number, eu: Seat, hist: EnvCond['hist']): EnvCond => ({
  flags: new Proxy({}, { get: () => flags }) as Record<string, boolean>,
  vinculo: num,
  fa: num ? 5 : 0,
  abalo: { A: num ? 6 : 0, B: num ? 6 : 0 },
  eu,
  generos: { A: 'ela', B: 'ele' },
  hist,
});

export function lintarLivro(l: LivroT, outrosNomes: string[] = []): Resultado {
  const erros: Achado[] = [];
  const avisos: Achado[] = [];
  const E = (regra: string, no: string | undefined, msg: string) => erros.push({ regra, no, msg });
  const W = (regra: string, no: string | undefined, msg: string) => avisos.push({ regra, no, msg });
  const ids = Object.keys(l.nos);

  if (!l.nos[l.inicio]) E('destino', undefined, `início "${l.inicio}" não existe`);
  for (const [id, no] of Object.entries(l.nos)) {
    for (const d of destinos(no)) if (!l.nos[d]) E('destino', id, `destino inexistente: ${d}`);
    if (no.tipo === 'solo' && !no.ir && !no.acoes.some((a) => a.ir)) E('solo-sem-saida', id, 'nó solo sem ação de saída (ir)');
  }

  // condições: sintaxe
  const conds: { id: string; campo: string; expr: string | undefined }[] = [];
  for (const [id, no] of Object.entries(l.nos)) {
    if ('acoes' in no)
      for (const a of no.acoes) {
        conds.push({ id, campo: `acao:${a.id}`, expr: a.se });
        for (const v of a.variantes ?? []) conds.push({ id, campo: `acao:${a.id}.variante`, expr: v.se });
      }
    if (no.tipo === 'dialogo') for (const t of no.turnos) for (const o of t.opcoes) conds.push({ id, campo: `op:${o.tag}`, expr: o.se });
    if (no.tipo === 'dialogo') for (const o of no.pool) conds.push({ id, campo: `pool:${o.tag}`, expr: o.se });
    if (no.tipo === 'final') for (const f of no.finais ?? []) conds.push({ id, campo: 'final', expr: f.se });
    if (no.tipo === 'segue') for (const x of no.efeitosSe ?? []) conds.push({ id, campo: 'efeitosSe', expr: x.se });
    if ('ir' in no && Array.isArray(no.ir)) for (const x of no.ir) conds.push({ id, campo: 'ir', expr: x.se });
  }
  for (const c of conds) {
    try {
      if (c.expr) validarCond(c.expr);
    } catch (e) {
      E('condicao', c.id, `${c.campo}: ${e instanceof ErroCond ? e.message : String(e)}`);
    }
  }

  const vivos = alcancaveis(l, l.inicio);
  for (const id of ids) if (!vivos.has(id)) E('orfao', id, 'nó nunca visitado (inalcançável)');
  if (!ids.some((i) => l.nos[i]!.tipo === 'final')) E('sem-final', undefined, 'livro sem nó final');
  for (const id of vivos) {
    const no = l.nos[id]!;
    if (no.tipo !== 'final' && destinos(no).length === 0) E('sem-saida', id, 'nó sem saída');
  }

  // textos: template, defeitos, agência, nomes, gênero
  const proibidos = [...l.nomesProibidos, ...outrosNomes].filter(Boolean);
  const CTXS = [['ele', 'ele'], ['ele', 'ela'], ['ela', 'ele'], ['ela', 'ela']] as const;
  for (const [id, no] of Object.entries(l.nos)) {
    for (const t of textosDoNo(no)) {
      const onde = `${id}.${t.campo}`;
      try {
        validarTemplate(t.texto);
        for (const [ga, gb] of CTXS)
          for (const todas of [true, false])
            for (const eu of ['A', 'B'] as const)
              for (const ator of [undefined, 'A', 'B'] as const) {
                const flags = new Proxy({}, { get: () => todas }) as Record<string, boolean>;
                const out = renderizar(t.texto, { A: { nome: 'Zz', genero: ga, idade: 30 }, B: { nome: 'Yy', genero: gb, idade: 30 }, flags, eu, ator });
                if (DEFEITOS.test(out)) E('texto-quebrado', id, `${onde}: placeholder/valor quebrado em "${out.slice(0, 60)}"`);
              }
      } catch (e) {
        E('template', id, `${onde}: ${e instanceof ErroTemplate || e instanceof ErroCond ? e.message : String(e)}`);
        continue;
      }
      if (DEFEITOS.test(t.texto.replace(/\{\{[^}]*\}\}/g, ''))) E('texto-quebrado', id, `${onde}: contém undefined/null/NaN/[object/\${`);
      for (const n of proibidos) if (new RegExp(`(^|[^\\p{L}])${n}([^\\p{L}]|$)`, 'u').test(t.texto)) E('nome-fixo', id, `${onde}: nome fixo "${n}" no texto`);
      // agência: narração livre não pode falar/agir/sentir por protagonista; resultado de ação escolhida só não pode falar/sentir pelo PAR
      if (t.kind !== 'opcao') {
        for (const re of t.kind === 'narracao' ? PADROES_AGENCIA : PADROES_PAR) {
          const m = t.texto.match(re);
          if (m) E('agencia', id, `${onde}: narra fala/ação/sentimento de protagonista não escolhido → "${m[0].slice(0, 70)}"`);
        }
      }
      if (t.kind === 'opcao') {
        const m = t.texto.replace(/\{\{[^}]*\}\}/g, '').match(GENERO_FIXO);
        if (m) E('genero-fixo', id, `${onde}: possível palavra de gênero fixo em opção escolhível: "${m[0]}"`);
      }
    }
  }

  // diálogo: ≥3 opções com ≥3 tons em TODOS os caminhos possíveis
  for (const [id, no] of Object.entries(l.nos)) {
    if (no.tipo !== 'dialogo') continue;
    const reportado = new Set<string>();
    for (const [flags, num] of [[false, 0], [true, 0], [false, 10], [true, 10]] as const) {
      const dfs = (i: number, hist: EnvCond['hist']) => {
        if (i >= no.turnos.length) return;
        const quem: Seat = i % 2 === 0 ? no.comeca : no.comeca === 'A' ? 'B' : 'A';
        const o = opcoesTurno(no, i, envBase(flags, num, quem, hist));
        const tons = new Set(o.map((x) => x.tom));
        if (o.length < 3 || tons.size < 3) {
          const k = `${i}|${hist.map((h) => h.tag).join('>')}`;
          if (!reportado.has(k)) {
            reportado.add(k);
            E('dialogo-menos-de-3', id, `turno ${i}${hist.length ? ` (após ${hist.map((h) => h.tag).join(' › ')})` : ''}: ${o.length} opções/${tons.size} tons (mínimo 3)`);
          }
        }
        for (const x of o) dfs(i + 1, [...hist, { tag: x.tag, tom: x.tom }]);
      };
      dfs(0, []);
    }
    for (const [i, t] of no.turnos.entries()) {
      const tags = new Set<string>();
      for (const o of t.opcoes) {
        if (tags.has(o.tag)) E('id-duplicado', id, `tag repetida no turno ${i}: ${o.tag}`);
        tags.add(o.tag);
      }
    }
  }

  // ações
  for (const [id, no] of Object.entries(l.nos)) {
    if (no.tipo === 'dividir') {
      for (const s of ['A', 'B'] as const) {
        const n = no.acoes.filter((a) => !a.seat || a.seat === s).length;
        if (n < no.cada + 1) E('dividir-poucas-acoes', id, `assento ${s} tem só ${n} ações para escolher ${no.cada} (precisa de pelo menos ${no.cada + 1}, para sobrar opção depois da escolha do outro)`);
      }
    }
    if ('acoes' in no) {
      const idsA = new Set<string>();
      for (const a of no.acoes) {
        if (idsA.has(a.id)) E('id-duplicado', id, `ação repetida: ${a.id}`);
        idsA.add(a.id);
        if (a.variantes && a.variantes[a.variantes.length - 1]!.se.trim() !== '') E('variante-sem-padrao', id, `ação ${a.id}: a última variante precisa ter se vazio (padrão)`);
      }
    }
  }

  // flags: escrita x lida
  const escritas = new Set<string>();
  const lidas = new Set<string>();
  const opcionais = new Set<string>();
  const ef = (e: { flag?: string | string[] } | undefined) => {
    if (!e?.flag) return;
    for (const f of Array.isArray(e.flag) ? e.flag : [e.flag]) escritas.add(f);
  };
  for (const no of Object.values(l.nos)) {
    if (no.tipo === 'consentimento') {
      escritas.add(no.flag);
      opcionais.add(`${no.flag}_a`); // votos individuais (privados): podem ficar sem leitura
      opcionais.add(`${no.flag}_b`);
    }
    if (no.tipo === 'segue' || no.tipo === 'solo') ef(no.efeitos);
    if (no.tipo === 'segue') for (const x of no.efeitosSe ?? []) ef(x.efeitos);
    if ('acoes' in no)
      for (const a of no.acoes) {
        ef(a.efeitos);
        for (const v of a.variantes ?? []) ef(v.efeitos);
      }
    if (no.tipo === 'dialogo') for (const t of no.turnos) for (const o of t.opcoes) ef(o.efeitos);
    if (no.tipo === 'dialogo') for (const o of no.pool) ef(o.efeitos);
    for (const t of textosDoNo(no)) for (const f of flagsLidas(t.texto)) lidas.add(f);
    for (const f of [...(no.requer ?? []), ...(no.exclui ?? [])]) lidas.add(f);
  }
  for (const c of conds) for (const f of flagsDaCond(c.expr)) lidas.add(f);
  for (const f of escritas) if (!lidas.has(f)) E('escolha-morta', undefined, `flag "${f}" é gravada mas nenhuma cena a lê`);
  for (const f of lidas) if (!escritas.has(f) && !opcionais.has(f)) E('flag-nunca-gravada', undefined, `flag "${f}" é lida mas nunca gravada`);

  // consentimento: variantes e coerência
  for (const [id, no] of Object.entries(l.nos)) {
    if (no.tipo !== 'consentimento') continue;
    if (no.irAvancou === no.irSem) E('consentimento-sem-variante', id, 'irAvancou e irSem são o mesmo nó: falta variante "sem"');
    const av = alcancaveis(l, no.irAvancou);
    const sem = alcancaveis(l, no.irSem);
    for (const n of av) if (!sem.has(n) && !(l.nos[n]!.requer ?? []).includes(no.flag)) E('consentimento-sem-requer', n, `só alcançável após aceitar "${no.flag}" mas não declara requer`);
    for (const n of sem) if (!av.has(n) && !(l.nos[n]!.exclui ?? []).includes(no.flag)) E('consentimento-sem-exclui', n, `só alcançável na variante "sem" de "${no.flag}" mas não declara exclui`);
  }

  // finais
  for (const [id, no] of Object.entries(l.nos)) {
    if (no.tipo !== 'final') continue;
    if (!no.texto && !no.finais) E('final-vazio', id, 'final sem texto');
    if (no.finais && (no.finais[no.finais.length - 1]!.se ?? '').trim() !== '') E('final-sem-padrao', id, 'último final precisa ter se vazio (padrão)');
  }

  // tamanho
  for (const [id, no] of Object.entries(l.nos)) {
    const palavras = ('texto' in no && no.texto ? no.texto : '').trim().split(/\s+/).filter(Boolean).length;
    if (no.tipo !== 'final' && palavras > 0 && palavras < 150) W('cena-curta', id, `${palavras} palavras (<150)`);
    if (palavras > 400) W('cena-longa', id, `${palavras} palavras (>400)`);
  }
  return { erros, avisos };
}
