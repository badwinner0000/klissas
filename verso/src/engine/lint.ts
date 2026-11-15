// Lint de livros: regras das §5 e §6.2 do prompt. Falha bloqueia publicação.
import { type Livro as LivroT, Livro, type No, TONS } from '../content/schema';
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
const PROT = String.raw`(?:você|\{\{\s*[AB]\.nome\s*\}\})`;
export const PADROES_AGENCIA: RegExp[] = [
  new RegExp(String.raw`(?<![\p{L}])${PROT}\s+(?:${VERBOS})(?![\p{L}])`, 'iu'),
  new RegExp(String.raw`(?<![\p{L}])(?:${VERBOS})\s+${PROT}`, 'iu'),
  new RegExp(String.raw`[“"][^”"]{2,}[”"],?\s*(?:${VERBOS})\s+[^.]{0,30}${PROT}`, 'iu'),
  new RegExp(String.raw`(?:^|\n)\s*[—–-]\s*[^\n]*[—–-]\s*(?:${VERBOS})\s+${PROT}`, 'iu'),
  new RegExp(String.raw`(?<![\p{L}])${PROT}\s+(?:sente|pensa|percebe|nota|vê|olha para)(?![\p{L}])[^.]*(?:apaixonad|amor|desejo)`, 'iu'),
];
const DEFEITOS = /\$\{|undefined|\bnull\b|NaN|\[object|\{\{|\}\}/;
const GENERO_FIXO = /\b(sozinh[oa]|cansad[oa]|exaust[oa]|obrigad[oa]|educad[oa]|nervos[oa]|sério|séria|certo\?|bonit[oa]|lind[oa])\b/i;
const CONTAGEM_MIN = 3;

function pronomes(texto: string) {
  return texto;
}

export function textosDoNo(no: No): { campo: string; texto: string; narracao: boolean }[] {
  const out: { campo: string; texto: string; narracao: boolean }[] = [];
  const add = (campo: string, texto: string | undefined, narracao: boolean) => {
    if (texto !== undefined) out.push({ campo, texto, narracao });
  };
  const acoes = (as: Extract<No, { acoes: unknown }>['acoes']) =>
    as.forEach((a) => {
      add(`acao:${a.id}`, a.texto, false);
      add(`acao:${a.id}.resultado`, a.resultado, true);
      a.variantes?.forEach((v, i) => add(`acao:${a.id}.v${i}`, v.resultado, true));
    });
  if ('texto' in no) add('texto', no.texto, true);
  switch (no.tipo) {
    case 'solo':
      acoes(no.acoes);
      break;
    case 'dividir':
      acoes(no.acoes);
      add('desfecho', no.desfecho, true);
      break;
    case 'decisao':
      acoes(no.acoes);
      add('desfecho', no.desfecho, true);
      break;
    case 'dialogo':
      add('fecho', no.fecho, true);
      for (const [i, t] of no.turnos.entries()) {
        for (const o of t.opcoes) add(`turno${i}:${o.tag}`, o.texto, false);
        for (const arr of Object.values(t.porTom ?? {})) for (const o of arr) add(`turno${i}:${o.tag}`, o.texto, false);
      }
      for (const o of no.pool) add(`pool:${o.tag}`, o.texto, false);
      break;
    case 'consentimento':
      add('pergunta', no.pergunta, false);
      add('avancar', no.avancar, false);
      add('ficar', no.ficar, false);
      break;
    case 'fim':
      add('gancho', no.gancho, true);
      break;
    case 'final':
      no.finais.forEach((f, i) => add(`final${i}`, f.texto, true));
      break;
  }
  return out;
}

export function destinos(no: No): string[] {
  switch (no.tipo) {
    case 'segue':
      return typeof no.ir === 'string' ? [no.ir] : [no.ir.A, no.ir.B];
    case 'consentimento':
      return [no.irAvancou, no.irSem];
    case 'final':
      return [];
    default:
      return [no.ir];
  }
}

/** Detecta chaves duplicadas em objetos JSON (JSON.parse sobrescreve em silêncio). */
export function chavesDuplicadas(raw: string): string[] {
  const dups: string[] = [];
  const pilha: (Set<string> | null)[] = [];
  let i = 0;
  const n = raw.length;
  let ultimaString: string | null = null;
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
      ultimaString = s;
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
  void ultimaString;
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
  const avisos: Achado[] = [];
  for (const d of chavesDuplicadas(raw)) erros.push({ regra: 'id-duplicado', msg: `chave duplicada no JSON: "${d}" (sobrescrita silenciosa)` });
  let json: unknown;
  try {
    json = JSON.parse(raw);
  } catch (e) {
    return { erros: [{ regra: 'json', msg: `JSON inválido: ${(e as Error).message}` }], avisos };
  }
  const p = Livro.safeParse(json);
  if (!p.success) {
    for (const i of p.error.issues) erros.push({ regra: 'schema', msg: `${i.path.join('.')}: ${i.message}` });
    return { erros, avisos };
  }
  const r = lintarLivro(p.data, outrosNomes);
  return { erros: [...erros, ...r.erros], avisos: [...avisos, ...r.avisos] };
}

export function lintarLivro(l: LivroT, outrosNomes: string[] = []): Resultado {
  const erros: Achado[] = [];
  const avisos: Achado[] = [];
  const E = (regra: string, no: string | undefined, msg: string) => erros.push({ regra, no, msg });
  const W = (regra: string, no: string | undefined, msg: string) => avisos.push({ regra, no, msg });
  const ids = Object.keys(l.nos);

  if (!l.nos[l.inicio]) E('destino', undefined, `início "${l.inicio}" não existe`);

  // destinos, saídas
  for (const [id, no] of Object.entries(l.nos)) {
    for (const d of destinos(no)) if (!l.nos[d]) E('destino', id, `destino inexistente: ${d}`);
    if (no.tipo === 'solo' && no.acoes.length === 0) E('solo-sem-saida', id, 'nó solo sem ação');
  }

  // órfãos
  const vivos = alcancaveis(l, l.inicio);
  for (const id of ids) if (!vivos.has(id)) E('orfao', id, 'nó nunca visitado (inalcançável)');
  if (!ids.some((i) => l.nos[i]!.tipo === 'final')) E('sem-final', undefined, 'livro sem nó final');
  for (const id of vivos) {
    const no = l.nos[id]!;
    if (no.tipo !== 'final' && destinos(no).length === 0) E('sem-saida', id, 'nó sem saída');
  }

  // textos: template, defeitos, agência, nomes, gênero
  const proibidos = [...l.nomesProibidos, ...outrosNomes].filter(Boolean);
  const CTXS = [
    ['ele', 'ele'], ['ele', 'ela'], ['ela', 'ele'], ['ela', 'ela'],
  ] as const;
  for (const [id, no] of Object.entries(l.nos)) {
    for (const t of textosDoNo(no)) {
      const onde = `${id}.${t.campo}`;
      try {
        validarTemplate(t.texto);
        for (const [ga, gb] of CTXS) {
          for (const todas of [true, false]) {
            const flags = new Proxy({}, { get: () => todas }) as Record<string, boolean>;
            const out = renderizar(t.texto, { A: { nome: 'Zz', genero: ga }, B: { nome: 'Yy', genero: gb }, flags });
            if (DEFEITOS.test(out)) E('texto-quebrado', id, `${onde}: placeholder/valor quebrado em "${out.slice(0, 60)}"`);
          }
        }
      } catch (e) {
        E('template', id, `${onde}: ${e instanceof ErroTemplate ? e.message : String(e)}`);
        continue;
      }
      if (DEFEITOS.test(t.texto.replace(/\{\{[^}]*\}\}/g, ''))) E('texto-quebrado', id, `${onde}: contém undefined/null/NaN/[object/\${`);
      for (const n of proibidos) if (new RegExp(`(^|[^\\p{L}])${n}([^\\p{L}]|$)`, 'u').test(t.texto)) E('nome-fixo', id, `${onde}: nome fixo "${n}" no texto`);
      if (t.narracao) {
        for (const re of PADROES_AGENCIA) {
          const m = t.texto.match(re);
          if (m) E('agencia', id, `${onde}: narra fala/ação/sentimento de protagonista não escolhido → "${m[0].slice(0, 70)}"`);
        }
      }
      if (!t.narracao && GENERO_FIXO.test(pronomes(t.texto.replace(/\{\{[^}]*\}\}/g, '')))) {
        const m = t.texto.match(GENERO_FIXO);
        E('genero-fixo', id, `${onde}: possível palavra de gênero fixo em opção escolhível: "${m?.[0]}"`);
      }
    }
  }

  // diálogo ≥ 3 opções/tons
  for (const [id, no] of Object.entries(l.nos)) {
    if (no.tipo !== 'dialogo') continue;
    no.turnos.forEach((t, i) => {
      const prev: (undefined | (typeof TONS)[number])[] = i === 0 ? [undefined] : [undefined, ...TONS];
      for (const tom of prev) {
        const o = opcoesTurno(no, i, tom);
        const tons = new Set(o.map((x) => x.tom));
        if (o.length < CONTAGEM_MIN || tons.size < CONTAGEM_MIN) E('dialogo-menos-de-3', id, `turno ${i}${tom ? ` (após tom ${tom})` : ''}: ${o.length} opções/${tons.size} tons (mínimo ${CONTAGEM_MIN})`);
      }
      const tags = new Set<string>();
      for (const o of [...t.opcoes, ...Object.values(t.porTom ?? {}).flat()]) {
        if (tags.has(o.tag)) E('id-duplicado', id, `tag repetida no turno ${i}: ${o.tag}`);
        tags.add(o.tag);
      }
    });
  }

  // ações exclusivas por assento (dividir): ≥3 elegíveis por assento
  for (const [id, no] of Object.entries(l.nos)) {
    if (no.tipo === 'dividir') {
      for (const s of ['A', 'B'] as const) {
        const n = no.acoes.filter((a) => !a.seat || a.seat === s).length;
        if (n < 3) E('dividir-poucas-acoes', id, `assento ${s} tem só ${n} ações (mínimo 3, para sobrar opção depois da escolha do outro)`);
      }
    }
    if (no.tipo === 'dividir' || no.tipo === 'decisao' || no.tipo === 'solo') {
      const idsA = new Set<string>();
      for (const a of no.acoes) {
        if (idsA.has(a.id)) E('id-duplicado', id, `ação repetida: ${a.id}`);
        if (a.variantes && a.variantes[a.variantes.length - 1]!.se.length !== 0) E('variante-sem-padrao', id, `ação ${a.id}: a última variante precisa ter se: [] (padrão)`);
        idsA.add(a.id);
      }
    }
  }

  // flags: escrita x lida
  const escritas = new Set<string>();
  const lidas = new Set<string>();
  const ef = (e: { flag?: string | string[] } | undefined) => {
    if (!e?.flag) return;
    for (const f of Array.isArray(e.flag) ? e.flag : [e.flag]) escritas.add(f);
  };
  for (const no of Object.values(l.nos)) {
    if (no.tipo === 'consentimento') escritas.add(no.flag);
    if (no.tipo === 'segue') ef(no.efeitos);
    if ('acoes' in no)
      for (const a of no.acoes) {
        ef(a.efeitos);
        for (const v of a.variantes ?? []) {
          ef(v.efeitos);
          for (const c of v.se) { if (c.flag) lidas.add(c.flag); if (c.naoFlag) lidas.add(c.naoFlag); }
        }
      }
    if (no.tipo === 'dialogo') for (const t of no.turnos) for (const o of [...t.opcoes, ...Object.values(t.porTom ?? {}).flat()]) ef(o.efeitos);
    if (no.tipo === 'dialogo') for (const o of no.pool) ef(o.efeitos);
    for (const t of textosDoNo(no)) for (const f of flagsLidas(t.texto)) lidas.add(f);
    for (const f of [...(no.requer ?? []), ...(no.exclui ?? [])]) lidas.add(f);
    if (no.tipo === 'final') for (const f of no.finais) for (const c of f.se) { if (c.flag) lidas.add(c.flag); if (c.naoFlag) lidas.add(c.naoFlag); }
  }
  for (const f of escritas) if (!lidas.has(f)) E('escolha-morta', undefined, `flag "${f}" é gravada mas nenhuma cena a lê`);
  for (const f of lidas) if (!escritas.has(f)) E('flag-nunca-gravada', undefined, `flag "${f}" é lida mas nunca gravada`);

  // consentimento: variantes e coerência
  for (const [id, no] of Object.entries(l.nos)) {
    if (no.tipo !== 'consentimento') continue;
    if (no.irAvancou === no.irSem) E('consentimento-sem-variante', id, 'irAvancou e irSem são o mesmo nó: falta variante "sem"');
    const av = alcancaveis(l, no.irAvancou);
    const sem = alcancaveis(l, no.irSem);
    for (const n of av) if (!sem.has(n) && !(l.nos[n]!.requer ?? []).includes(no.flag)) E('consentimento-sem-requer', n, `só alcançável após aceitar "${no.flag}" mas não declara requer`);
    for (const n of sem) if (!av.has(n) && !(l.nos[n]!.exclui ?? []).includes(no.flag)) E('consentimento-sem-exclui', n, `só alcançável na variante "sem" de "${no.flag}" mas não declara exclui`);
    // texto posterior a nó de consentimento que cite a cena sem condicional não é detectável por regex;
    // é coberto pela simulação nas 4 políticas (nós requer/exclui violados e trilha).
  }

  // finais
  for (const [id, no] of Object.entries(l.nos)) {
    if (no.tipo === 'final' && no.finais[no.finais.length - 1]!.se.length !== 0) E('final-sem-padrao', id, 'último final precisa ter se: [] (padrão)');
  }

  // linha do tempo e tamanho
  if (!l.linhaDoTempo.length) W('linha-do-tempo', undefined, 'sem linha do tempo');
  for (const [id, no] of Object.entries(l.nos)) {
    const palavras = ('texto' in no ? no.texto : '').trim().split(/\s+/).filter(Boolean).length;
    if (no.tipo !== 'final' && palavras > 0 && palavras < 150) W('cena-curta', id, `${palavras} palavras (<150)`);
    if (palavras > 400) W('cena-longa', id, `${palavras} palavras (>400)`);
  }
  return { erros, avisos };
}
