// Converte o código-fonte de "Padrinho e Madrinha" (JS com funções) para o JSON seguro do Verso.
// Por AST (acorn): cada expressão é mapeada para um token do template ou para a gramática de condições.
// O que não mapear vira PROBLEMA listado (e um marcador ⟦ERRO⟧ no texto, que o lint reprova). Nunca erra em silêncio.
import { readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { parse } from 'acorn';
import { Livro } from '../../src/content/schema.ts';
import { lintarLivro } from '../../src/engine/lint.ts';

const DIR = new URL('../../fontes/padrinho-e-madrinha/codigo-historia/', import.meta.url);
const SAIDA = new URL('../../content/livros/padrinhos.json', import.meta.url);
const problemas = [];
let SRC = '';
let autoTag = 0;
let HELPERS = {};
let ALIAS = {};
let ID = '';
const erro = (n, msg) => {
  const trecho = n ? SRC.slice(n.start, n.end).replace(/\s+/g, ' ').slice(0, 90) : '';
  problemas.push(`${ID}: ${msg} → ${trecho}`);
  return `⟦ERRO:${msg}⟧`;
};

// ───────────── helpers do livro ─────────────
const TOK = {
  pda: '{{A.ref}}', Pda: '{{A.Ref}}', pdb: '{{B.ref}}', Pdb: '{{B.Ref}}',
  pdnA: '{{A.nome}}', pdnB: '{{B.nome}}',
  oA: '{{A.o_a}}', oB: '{{B.o_a}}', eleA: '{{A.ele_ela}}', eleB: '{{B.ele_ela}}', EleA: '{{A.Ele_ela}}', EleB: '{{B.Ele_ela}}',
  pdTitA: '{{se A.ela}}madrinha{{senao}}padrinho{{/se}}', pdTitB: '{{se B.ela}}madrinha{{senao}}padrinho{{/se}}',
  TitA: '{{se A.ela}}Madrinha{{senao}}Padrinho{{/se}}', TitB: '{{se B.ela}}Madrinha{{senao}}Padrinho{{/se}}',
  pdIrA: '{{se A.ela}}irmã{{senao}}irmão{{/se}}', pdIrB: '{{se B.ela}}irmã{{senao}}irmão{{/se}}',
};
const PARES = [['o', 'a', 'o_a'], ['ele', 'ela', 'ele_ela'], ['Ele', 'Ela', 'Ele_ela'], ['dele', 'dela', 'dele_dela'], ['um', 'uma', 'um_uma'], ['senhor', 'senhora', 'senhor_senhora'], ['ao', 'à', 'ao_a'], ['seu', 'sua', 'seu_sua']];
const PROP = { o: 'o_a', um: 'um_uma', ele: 'ele_ela', Ele: 'Ele_ela', dele: 'dele_dela', lo: 'lo_la', ap: 'nome' };
const GEMMA_SABE = '(flag:b_contou_gemma || flag:a_verdade || flag:b_devolveu)';

const nomeFn = (n) => (n.type === 'CallExpression' && n.callee.type === 'Identifier' ? n.callee.name : null);
const lit = (n) => (n && n.type === 'Literal' ? n.value : undefined);
const isC = (n) => n.type === 'Identifier' && (n.name === 'c' || n.name === 'E');

// ───────────── condições ─────────────
function cond(n) {
  switch (n.type) {
    case 'ArrowFunctionExpression': return cond(n.body);
    case 'Identifier':
      if (n.name === 'ehPA') return 'eu:A';
      if (n.name === 'ehPB') return 'eu:B';
      if (ALIAS[n.name] !== undefined) return `(${cond(ALIAS[n.name])})`;
      return erro(n, `identificador em condição: ${n.name}`);
    case 'Literal': return n.value === true ? '' : erro(n, 'literal em condição');
    case 'CallExpression': {
      const f = nomeFn(n);
      if (f === 'ehPA') return 'eu:A';
      if (f === 'ehPB') return 'eu:B';
      if (f === 'lsNoite') return `flag:${lit(n.arguments[1])}`;
      if (f && HELPERS[f]) return cond(HELPERS[f]);
      if (n.callee.type === 'MemberExpression' && isC(n.callee.object) && n.callee.property.name === 'f') return `flag:${lit(n.arguments[0])}`;
      return erro(n, 'chamada desconhecida em condição');
    }
    case 'UnaryExpression': if (n.operator === '!') return `!(${cond(n.argument)})`; break;
    case 'LogicalExpression': return `(${cond(n.left)}) ${n.operator} (${cond(n.right)})`;
    case 'BinaryExpression': {
      const { left: l, right: r, operator: op } = n;
      // d==='o' onde d = pdgB(c,'o','a')
      if (op === '===' && l.type === 'Identifier' && ALIAS[l.name]?.type === 'CallExpression' && ['pdgA', 'pdgB'].includes(nomeFn(ALIAS[l.name]))) {
        const S = nomeFn(ALIAS[l.name]) === 'pdgA' ? 'A' : 'B';
        const [, m, f] = ALIAS[l.name].arguments;
        return r.value === lit(m) ? `${S}.ele` : r.value === lit(f) ? `${S}.ela` : erro(n, 'comparação de gênero sem par');
      }
      // c.vinc>=5, c.fa>=2
      if (l.type === 'MemberExpression' && isC(l.object) && (l.property.name === 'vinc' || l.property.name === 'fa') && r.type === 'Literal') return `${l.property.name}${op}${r.value}`;
      // c.eu.g==='f'
      if (op === '===' && l.type === 'MemberExpression' && l.property.name === 'g' && r.type === 'Literal') {
        const suj = l.object.type === 'MemberExpression' && isC(l.object.object) ? l.object.property.name : null;
        const sujOk = { eu: 'eu', par: 'par' }[suj];
        if (sujOk) return `${sujOk}.${r.value === 'f' ? 'ela' : 'ele'}`;
      }
      // h[0].tag==='x'
      if (op === '===' && l.type === 'MemberExpression' && l.property.name === 'tag' && l.object.type === 'MemberExpression' && l.object.object.name === 'h') return `hist[${l.object.property.value}]:${r.value}`;
      return erro(n, `comparação desconhecida (${op})`);
    }
  }
  return erro(n, `condição desconhecida (${n.type})`);
}
const e_ = (a, b) => (a && b ? `(${a}) && (${b})` : a || b || '');

// ───────────── templates ─────────────
function token(n) {
  // c.Q, c.q, c.oq, c.oQ, c.eu.o, c.outroAtor.o ...
  if (n.object.type === 'Identifier' && isC(n.object)) {
    const p = n.property.name;
    return { Q: '{{Quem}}', q: '{{quem}}', oq: '{{outroquem}}', oQ: '{{Outroquem}}' }[p] ?? erro(n, `c.${p} desconhecido`);
  }
  if (n.object.type === 'MemberExpression' && isC(n.object.object)) {
    const suj = { eu: 'eu', par: 'par', ator: 'ator', outroAtor: 'outro' }[n.object.property.name];
    const k = PROP[n.property.name];
    if (suj && k) return `{{${suj}.${k}}}`;
  }
  // pdFA(c).ap
  if (n.object.type === 'CallExpression' && ['pdFA', 'pdFB'].includes(nomeFn(n.object)) && n.property.name === 'ap') return nomeFn(n.object) === 'pdFA' ? '{{A.nome}}' : '{{B.nome}}';
  return erro(n, 'membro desconhecido em texto');
}

function capitalizaTit(n) {
  // pdTitA(c).replace(/^./,x=>x.toUpperCase())
  return n.callee.object.type === 'CallExpression' ? (nomeFn(n.callee.object) === 'pdTitA' ? TOK.TitA : TOK.TitB) : null;
}

function tpl(n) {
  switch (n.type) {
    case 'Literal': return typeof n.value === 'string' ? n.value : String(n.value);
    case 'TemplateLiteral': {
      let s = '';
      n.quasis.forEach((q, i) => {
        s += q.value.cooked;
        if (n.expressions[i]) s += tpl(n.expressions[i]);
      });
      return s;
    }
    case 'ArrowFunctionExpression': return n.body.type === 'BlockStatement' ? bloco(n.body) : tpl(n.body);
    case 'BinaryExpression':
      if (n.operator === '+') return tpl(n.left) + tpl(n.right);
      return erro(n, 'operador em texto');
    case 'ConditionalExpression': {
      const a = tpl(n.consequent);
      const b = tpl(n.alternate);
      return `{{se ${cond(n.test)}}}${a}${b === '' ? '' : `{{senao}}${b}`}{{/se}}`;
    }
    case 'LogicalExpression': {
      // pdFB(c).idade||35
      if (n.operator === '||' && n.left.type === 'MemberExpression' && n.left.property.name === 'idade') return nomeFn(n.left.object) === 'pdFA' ? '{{A.idade}}' : '{{B.idade}}';
      return erro(n, 'lógico em texto');
    }
    case 'MemberExpression': return token(n);
    case 'Identifier': return ALIAS[n.name] ? tpl(ALIAS[n.name]) : HELPERS[n.name] ? tpl(HELPERS[n.name]) : erro(n, `identificador em texto: ${n.name}`);
    case 'CallExpression': {
      const f = nomeFn(n);
      if (n.callee.type === 'MemberExpression' && n.callee.property.name === 'charAt' && n.callee.object.type === 'MemberExpression' && ['pdFA', 'pdFB'].includes(nomeFn(n.callee.object.object))) return nomeFn(n.callee.object.object) === 'pdFA' ? '{{A.inicial}}' : '{{B.inicial}}';
      if (f && TOK[f]) return TOK[f];
      if (f === 'pdgA' || f === 'pdgB') {
        const S = f === 'pdgA' ? 'A' : 'B';
        const [, m, fe] = n.arguments;
        const mv = lit(m), fv = lit(fe);
        const par = mv !== undefined && fv !== undefined ? PARES.find((p) => p[0] === mv && p[1] === fv) : null;
        if (par) return `{{${S}.${par[2]}}}`;
        const mt = tpl(m), ft = tpl(fe);
        if (mt === ft) return mt;
        return `{{se ${S}.ela}}${ft}{{senao}}${mt}{{/se}}`;
      }
      if (f === 'pdnA' || f === 'pdnB') return TOK[f];
      // X.replace(...)
      if (n.callee.type === 'MemberExpression' && n.callee.property.name === 'replace') {
        const alvo = n.callee.object;
        const [a0, a1] = n.arguments;
        if (a0.type === 'Literal' && a0.regex && a1?.type === 'ArrowFunctionExpression') {
          const t = capitalizaTit(n);
          return t ?? erro(n, 'replace por regex desconhecido');
        }
        if (typeof lit(a0) === 'string' && a1) {
          const base = tpl(alvo);
          const i = base.indexOf(lit(a0));
          return i < 0 ? erro(n, 'replace: trecho não encontrado') : base.slice(0, i) + tpl(a1) + base.slice(i + lit(a0).length);
        }
      }
      return erro(n, `chamada desconhecida em texto${f ? `: ${f}` : ''}`);
    }
    default: return erro(n, `expressão desconhecida em texto (${n.type})`);
  }
}

// bloco com L.push / if / else if (nó final)
function bloco(b) {
  const partes = [];
  const stmt = (s) => {
    if (s.type === 'VariableDeclaration') { for (const d of s.declarations) if (d.id.name !== 'L' && d.init) ALIAS[d.id.name] = d.init; return ''; }
    if (s.type === 'ReturnStatement') return s.argument?.type === 'CallExpression' && s.argument.callee.property?.name === 'join' ? '' : tpl(s.argument);
    if (s.type === 'BlockStatement') return s.body.map(stmt).filter(Boolean).join('\n\n');
    if (s.type === 'ExpressionStatement' && s.expression.type === 'CallExpression' && s.expression.callee.property?.name === 'push') return s.expression.arguments.map(tpl).join('');
    if (s.type === 'IfStatement') {
      const a = stmt(s.consequent);
      const b2 = s.alternate ? stmt(s.alternate) : '';
      return `{{se ${cond(s.test)}}}${a}${b2 ? `{{senao}}${b2}` : ''}{{/se}}`;
    }
    return erro(s, `statement desconhecido (${s.type})`);
  };
  for (const s of b.body) {
    const t = stmt(s);
    if (t) partes.push(t);
  }
  return partes.join('\n\n');
}

// ───────────── efeitos ─────────────
function nomeFlag(n) {
  // 'x' | 'x_'+c.s (por assento)
  if (n.type === 'Literal') return { f: n.value };
  if (n.type === 'BinaryExpression' && n.operator === '+' && n.left.type === 'Literal' && n.right.type === 'MemberExpression' && n.right.property.name === 's') return { fs: n.left.value.replace(/_$/, '') };
  return { erro: erro(n, 'flag desconhecida') };
}
function efeitos(n) {
  if (!n) return undefined;
  if (n.type === 'ArrowFunctionExpression') {
    if (n.body.type === 'BlockStatement') return null; // tratado à parte (efeitosSe)
    return efeitos(n.body);
  }
  if (n.type === 'CallExpression' && nomeFn(n) === 'lsSim') return { flagSeat: lit(n.arguments[0]) };
  if (n.type !== 'ObjectExpression') { erro(n, 'efeitos desconhecidos'); return undefined; }
  const out = {};
  const add = (k, v) => { out[k] = out[k] === undefined ? v : [].concat(out[k], v); };
  for (const p of n.properties) {
    const k = p.key.name;
    const v = p.value;
    if (k === 'flag') {
      for (const x of v.type === 'ArrayExpression' ? v.elements : [v]) {
        const r = nomeFlag(x);
        if (r.f) add('flag', r.f); else if (r.fs) add('flagSeat', r.fs);
      }
    } else if (k === 'vinc') out.vinculo = v.value;
    else if (['fa', 'abalo', 'abaloPar', 'abaloAmbos'].includes(k)) out[k] = v.value;
    else if (k === 'pista') out.pista = v.value;
    else if (k === 'motivo' || k === 'motivoV') out[k] = v.value;
    else if (k === 'nflag') add('nflag', v.value);
    else erro(p, `efeito desconhecido: ${k}`);
  }
  return Object.keys(out).length ? out : undefined;
}

// ───────────── ações ─────────────
const prop = (o, k) => o.properties.find((p) => (p.key.name ?? p.key.value) === k)?.value;
const LIMIAR_FALHA = 'abalo>=3'; // sem dados: o ramo `falha` do original vale quando o personagem está abalado

function acao(o, id) {
  const a = { id };
  const t = prop(o, 't');
  a.texto = tpl(t);
  let se = '';
  const seN = prop(o, 'se');
  if (seN) {
    const c = cond(seN);
    if (c === 'eu:A') a.seat = 'A'; else if (c === 'eu:B') a.seat = 'B'; else se = c;
  }
  const req = prop(o, 'req'); if (req) se = e_(se, `flag:${req.value}`);
  const nao = prop(o, 'nao'); if (nao) se = e_(se, `!flag:${nao.value}`);
  const so = prop(o, 'so'); if (so) a.seat = so.value === 'a' ? 'A' : 'B';
  if (se) a.se = se;
  if (prop(o, 'ambos') && !prop(o, 'at')) a.compartilhada = true; // como no original: ação com teste é de UM só
  if (prop(o, 'repete')) a.repete = true;
  const ir = prop(o, 'ir'); if (ir) a.ir = ir.value;
  const ef = efeitos(prop(o, 'ef'));
  if (ef) a.efeitos = ef;
  const x = prop(o, 'x');
  if (prop(o, 'at')) {
    if (x) a.resultado = tpl(x);
    const ok = prop(o, 'ok'), falha = prop(o, 'falha');
    const v = (b, s) => {
      const r = { se: s, resultado: b && prop(b, 'x') ? tpl(prop(b, 'x')) : '' };
      const e = b && efeitos(prop(b, 'ef'));
      if (e) r.efeitos = e;
      return r;
    };
    a.variantes = [{ ...v(falha, LIMIAR_FALHA) }, { ...v(ok, '') }];
  } else if (x) a.resultado = tpl(x);
  else a.resultado = '';
  return a;
}

// ───────────── nós ─────────────
const get = (o, k) => prop(o, k);
const str = (n) => (n ? tpl(n) : undefined);

function dest(n) {
  if (!n) return undefined;
  if (n.type === 'Literal') return n.value;
  if (n.type === 'ArrowFunctionExpression') return destFn(n.body);
  return erro(n, 'destino desconhecido');
}
function destFn(b) {
  if (b.type === 'CallExpression' && nomeFn(b) === 'pdPor') return { A: b.arguments[1].value, B: b.arguments[2].value };
  if (b.type === 'Literal') return b.value;
  if (b.type === 'ConditionalExpression') {
    const c = cond(b.test);
    const a = destFn(b.consequent);
    const r = destFn(b.alternate);
    const lista = (d) => (Array.isArray(d) ? d : [{ ir: d }]);
    return [{ se: c, ir: Array.isArray(a) ? undefined : a }, ...lista(r)].filter((x) => x.ir !== undefined || true);
  }
  return erro(b, 'destino condicional desconhecido');
}

function opcoesDialogo(corpo, extra, saida) {
  if (corpo.type === 'ArrayExpression') {
    for (const el of corpo.elements) {
      if (el.type === 'SpreadElement') opcoesDialogo(el.argument, extra, saida);
      else {
        const t = prop(el, 't');
        const o = { tom: prop(el, 'tom').value, texto: tpl(t), tag: prop(el, 'tag')?.value ?? `auto${++autoTag}` };
        const se = prop(el, 'se');
        const sc = e_(extra, se ? cond(se) : '');
        if (sc) o.se = sc;
        if (prop(el, 'acao')) o.acao = true;
        const apos = prop(el, 'apos'); if (apos) o.depois = tpl(apos);
        const ef = efeitos(prop(el, 'ef')); if (ef) o.efeitos = ef;
        saida.push(o);
      }
    }
  } else if (corpo.type === 'ConditionalExpression') {
    const c = cond(corpo.test);
    opcoesDialogo(corpo.consequent, e_(extra, c), saida);
    opcoesDialogo(corpo.alternate, e_(extra, `!(${c})`), saida);
  } else erro(corpo, `ops de fala desconhecido (${corpo.type})`);
}

function convNo(id, o) {
  ID = id;
  const tipo = prop(o, 'tipo')?.value;
  const quem = prop(o, 'quem')?.value;
  const base = { cap: prop(o, 'cap').value };
  const lugar = str(prop(o, 'lugar')); if (lugar) base.lugar = lugar;
  const hora = str(prop(o, 'hora')); if (hora) base.hora = hora;
  const npcs = prop(o, 'npcs'); if (npcs) base.npcs = npcs.elements.map((e) => e.value);
  const texto = str(prop(o, 'texto'));
  const prox = dest(prop(o, 'prox'));
  const ef = prop(o, 'ef');

  if (quem === 'solo' || (!tipo && prop(o, 'ops'))) {
    const n = { ...base, tipo: 'solo', seat: '?', texto, acoes: [] };
    const ops = prop(o, 'ops');
    if (ops) n.acoes = ops.elements.map((e, i) => acao(e, `o${i + 1}`));
    if (prox) n.ir = prox;
    const efe = ef && efeitos(ef); if (efe) n.efeitos = efe;
    return n;
  }
  switch (tipo) {
    case 'segue': {
      const n = { ...base, tipo: 'segue', texto, ir: prox };
      if (ef) {
        if (ef.type === 'ArrowFunctionExpression' && ef.body.type === 'BlockStatement') {
          // const casa = COND; return {flag: casa?'a':'b'}
          const decl = ef.body.body.find((s) => s.type === 'VariableDeclaration').declarations[0];
          const ret = ef.body.body.find((s) => s.type === 'ReturnStatement').argument;
          const flagExp = ret.properties[0].value;
          const c = cond(decl.init);
          n.efeitosSe = [{ se: c, efeitos: { flag: flagExp.consequent.value } }, { se: `!(${c})`, efeitos: { flag: flagExp.alternate.value } }];
        } else { const e2 = efeitos(ef); if (e2) n.efeitos = e2; }
      }
      return n;
    }
    case 'fim': return { ...base, tipo: 'fim', texto, ir: prox };
    case 'final': return { ...base, tipo: 'final', texto };
    case 'dialogo': {
      const cm = prop(o, 'comeca');
      const comeca = cm.body.arguments[1].name === 'PD_A' ? 'A' : 'B';
      const turnos = prop(o, 'falas').elements.map((F, i) => {
        const t = { opcoes: [] };
        const p = prop(F, 'p'); if (p) t.prompt = tpl(p);
        const fo = prop(F, 'ops');
        opcoesDialogo(fo.body, '', t.opcoes);
        return t;
      });
      return { ...base, tipo: 'dialogo', texto, comeca, turnos, pool: [], ir: prox };
    }
    case 'dividir': {
      const ops = prop(o, 'ops').elements;
      if (prop(o, 'secreto')) {
        // consentimento: duas opções, uma delas com lsSim(k)
        const sim = ops.find((e) => prop(e, 'ef')?.type === 'CallExpression');
        const nao = ops.find((e) => e !== sim);
        const k = lit(prop(sim, 'ef').arguments[0]);
        const dst = Array.isArray(prox) ? prox : [{ ir: String(prox) }, { ir: String(prox) }]; // destino único: o texto seguinte ramifica pela flag
        return { ...base, tipo: 'consentimento', texto, pergunta: str(prop(o, 'pergunta')) ?? 'O que você quer?', avancar: tpl(prop(sim, 't')), ficar: tpl(prop(nao, 't')), flag: k, irAvancou: dst[0].ir, irSem: dst[1].ir };
      }
      const n = { ...base, tipo: 'dividir', texto, cada: prop(o, 'cada')?.value ?? 1, acoes: ops.map((e, i) => acao(e, `o${i + 1}`)), ir: prox };
      const pg = str(prop(o, 'pergunta')); if (pg) n.pergunta = pg;
      return n;
    }
    case 'decisao': {
      const n = { ...base, tipo: 'decisao', texto, acoes: prop(o, 'ops').elements.map((e, i) => acao(e, `o${i + 1}`)), ir: prox };
      const pg = str(prop(o, 'pergunta')); if (pg) n.pergunta = pg;
      return n;
    }
    case 'puzzle': return convPuzzle(base, o, texto, prox);
  }
  erro(o, `tipo desconhecido: ${tipo}`);
  return { ...base, tipo: 'segue', texto: texto ?? '', ir: prox ?? 'x' };
}

// Sem puzzle: vira uma decisão conjunta (os dois votam), cada resposta com seu resultado.
function convPuzzle(base, o, texto, prox) {
  const P = prop(o, 'puz');
  const enun = tpl(prop(P, 'enun'));
  const peca = prop(P, 'peca');
  const pa = tpl(prop(peca, 'a')), pb = tpl(prop(peca, 'b'));
  const opcoes = prop(P, 'opcoes').elements.map((e) => e.value);
  const certa = prop(P, 'certa').value;
  const okN = prop(P, 'ok'), falhaN = prop(P, 'falha');
  const corpo = `${texto}\n\n*${enun}*\n\n{{se eu:A}}${pa}{{senao}}${pb}{{/se}}`;
  const acoes = opcoes.map((t, i) => {
    const b = i === certa ? okN : falhaN;
    const a = { id: `o${i + 1}`, texto: t, resultado: tpl(prop(b, 'x')) };
    const e = efeitos(prop(b, 'ef')); if (e) a.efeitos = e;
    return a;
  });
  return { ...base, tipo: 'decisao', texto: corpo, pergunta: tpl(prop(P, 'tit')), acoes, ir: prox };
}

// ───────────── livro ─────────────
const nos = {};
const GLOBAIS = [];
for (const f of readdirSync(DIR).filter((x) => /^cap\d+\.js$/.test(x))) {
  const ast = parse(readFileSync(new URL(f, DIR), 'utf8'), { ecmaVersion: 'latest', sourceType: 'script' });
  for (const st of ast.body) if (st.type === 'VariableDeclaration') for (const d of st.declarations) if (d.init?.type === 'ArrowFunctionExpression') GLOBAIS.push({ name: d.id.name, node: d.init, src: f });
}
for (const f of readdirSync(DIR).filter((x) => /^cap\d+\.js$/.test(x)).sort((a, b) => Number(a.match(/\d+/)) - Number(b.match(/\d+/)))) {
  SRC = readFileSync(new URL(f, DIR), 'utf8');
  const ast = parse(SRC, { ecmaVersion: 'latest', sourceType: 'script' });
  HELPERS = {};
  for (const st of ast.body) if (st.type === 'VariableDeclaration') for (const d of st.declarations) if (d.init?.type === 'ArrowFunctionExpression') HELPERS[d.id.name] = d.init;
  // helpers definidos em outros capítulos (ex.: pdGemmaSabe no cap9)
  for (const g of GLOBAIS) if (!HELPERS[g.name]) HELPERS[g.name] = g.node;
  for (const st of ast.body) {
    if (st.type !== 'ExpressionStatement' || st.expression.type !== 'CallExpression' || st.expression.callee.name !== 'no') continue;
    const [idN, o] = st.expression.arguments;
    const id = idN.value;
    ID = id;
    ALIAS = {};
    if (nos[id]) problemas.push(`${id}: id duplicado (${f}); o último vence no original`);
    nos[id] = convNo(id, o);
  }
}

// reservas de fala: NOS.<id>.pool = [...]  (cap99.js)
{
  SRC = readFileSync(new URL('cap99.js', DIR), 'utf8');
  const ast = parse(SRC, { ecmaVersion: 'latest', sourceType: 'script' });
  HELPERS = {};
  for (const g of GLOBAIS) HELPERS[g.name] = g.node;
  for (const st of ast.body) {
    const x = st.expression;
    if (st.type !== 'ExpressionStatement' || x.type !== 'AssignmentExpression') { problemas.push(`cap99: statement ignorado (${st.type})`); continue; }
    const m = x.left;
    const id = m.object.property.name;
    ID = id; ALIAS = {};
    if (m.property.name !== 'pool' || !nos[id]) { problemas.push(`cap99: alvo inesperado ${id}.${m.property.name}`); continue; }
    const pool = [];
    opcoesDialogo(x.right, '', pool);
    nos[id].pool = pool;
  }
}

// assento dos nós solo: inferido pelos destinos por assento ({A:..., B:...})
const seatDe = {};
const marca = (id, s) => { if (id && nos[id] && seatDe[id] !== s) { if (seatDe[id] && seatDe[id] !== s) problemas.push(`${id}: assento ambíguo`); seatDe[id] = s; } };
const dests = (d) => (typeof d === 'string' ? [] : Array.isArray(d) ? d.flatMap((x) => dests(x.ir)) : d ? [d] : []);
for (const n of Object.values(nos)) for (const d of dests(n.ir)) { marca(d.A, 'A'); marca(d.B, 'B'); }
const inicio = { A: 'pd_c1_a', B: 'pd_c1_b' };
marca(inicio.A, 'A'); marca(inicio.B, 'B');
for (let mudou = true; mudou; ) {
  mudou = false;
  for (const [id, n] of Object.entries(nos)) {
    if (n.tipo !== 'solo' || !seatDe[id]) continue;
    const alvo = [typeof n.ir === 'string' ? n.ir : null, ...n.acoes.map((a) => a.ir)].filter(Boolean);
    for (const t of alvo) if (nos[t]?.tipo === 'solo' && !seatDe[t]) { seatDe[t] = seatDe[id]; mudou = true; }
  }
}
for (const [id, n] of Object.entries(nos)) if (n.tipo === 'solo') { n.seat = seatDe[id] ?? (problemas.push(`${id}: assento do solo não inferido`), 'A'); }

// linha do tempo: sequência de horários distintos (na ordem de leitura)
const linha = []; const vistos = new Set();
for (const n of Object.values(nos)) { if (n.hora && !vistos.has(n.hora) && !n.hora.includes('{{')) { vistos.add(n.hora); linha.push({ quando: n.hora, evento: n.lugar ?? '' }); } }

// ───────────── correções editoriais (o original violava as regras do Verso nestes trechos) ─────────────
const CORRECOES = [
  { no: 'pd_c1_b2', de: '{{A.nome}} disse *tudo bem* com a boca e *anotado* com o resto da cara.', para: '*Tudo bem* saiu da boca de {{A.nome}}, e *anotado*, do resto da cara.', motivo: 'agência: narrava fala de protagonista sem escolha' },
  { no: 'pd_c9_b', de: 'Você diz que ouviu o recado dele. Não precisa explicar qual.', para: 'O recado dele está no seu bolso, e ele sabe que você o ouviu. Não precisa explicar qual.', motivo: 'agência: narrava fala de protagonista sem escolha' },
  { no: 'pd_c5_d', de: '— Cético — você diz, antes de pensar. — Cético tem seis. É… — Você conta. — *Cabeça-dura*. Cabeça-dura tem onze.', para: 'A resposta chega antes de você pensar: *cético*, que tem seis letras e não serve. Você conta de cabeça. *Cabeça-dura*. Onze.', motivo: 'agência: narrava fala de protagonista sem escolha' },
  { no: 'pd_c6_a', de: '— Respira — você diz. — Eu tenho uma ideia.\n\nVocê não tem ideia nenhuma. É a frase que você diz desde 2015 para ganhar quarenta segundos, e funciona sobre a Pippa também.', para: 'Você tem uma frase pronta para isso, a mesma desde 2015, para ganhar quarenta segundos: *eu tenho uma ideia*. Você não tem ideia nenhuma, e a frase funciona sobre a Pippa também.', motivo: 'agência: narrava fala de protagonista sem escolha' },
  { no: 'pd_c4_a', de: '\n\n— Mãe.\n\n', para: '\n\nVocê abre a boca para dizer *mãe*, e ela não deixa.\n\n', motivo: 'agência: protagonista falava sem escolha (fala sem atribuição)' },
  { no: 'pd_c8_a', de: '\n\n— Às vezes.\n\n', para: '\n\nNem sempre, você pensa. Mas não é isso que ele veio ouvir.\n\n', motivo: 'agência: protagonista falava sem escolha (fala sem atribuição)' },
  { no: 'pd_c1_noite', de: 'Ouvir de novo o recado do Tunde, sozinho, na varanda', para: 'Ouvir de novo o recado do Tunde, sozinh{{eu.o_a}}, na varanda', motivo: 'gênero fixo em opção escolhível' },
  { no: 'pd_c7_a', de: 'Ler sozinha, pela primeira vez em nove meses.', para: 'Ler sozinh{{eu.o_a}}, pela primeira vez em nove meses.', motivo: 'gênero fixo em opção escolhível' },
];
const aplicaEm = (v, de, para, cont) => {
  if (typeof v === 'string') { if (v.includes(de)) { cont.n += v.split(de).length - 1; return v.split(de).join(para); } return v; }
  if (Array.isArray(v)) return v.map((x) => aplicaEm(x, de, para, cont));
  if (v && typeof v === 'object') return Object.fromEntries(Object.entries(v).map(([k, x]) => [k, aplicaEm(x, de, para, cont)]));
  return v;
};
for (const c of CORRECOES) {
  const cont = { n: 0 };
  nos[c.no] = aplicaEm(nos[c.no], c.de, c.para, cont);
  if (cont.n !== 1) problemas.push(`${c.no}: correção aplicada ${cont.n}x (esperado 1): ${c.de.slice(0, 40)}`);
}

// consentimento com destinos distintos: cada destino só existe do seu lado
for (const n of Object.values(nos)) {
  if (n.tipo !== 'consentimento' || n.irAvancou === n.irSem) continue;
  (nos[n.irAvancou].requer ??= []).push(n.flag);
  (nos[n.irSem].exclui ??= []).push(n.flag);
}

// NPCs e metadados vêm de base.js (parseados como dados)
const livro = {
  id: 'padrinhos',
  titulo: 'Padrinho e Madrinha',
  secao: 'love-sparks',
  adulto: false,
  tropes: ['wedding-party', 'enemies-to-lovers', 'forced-proximity', 'second-chance'],
  linhaDoTempo: linha,
  vinculoPorCapitulo: 1,
  idades: { A: 33, B: 35 },
  npcs: {},
  nomesProibidos: ['Lia', 'Davi'],
  inicio,
  nos,
};
// baseline: flags mortas do original (o lint passa a avisar, não bloquear)
{
  const parsed = Livro.safeParse(livro);
  if (!parsed.success) problemas.push(`schema: ${parsed.error.issues.slice(0, 5).map((i) => `${i.path.join('.')}: ${i.message}`).join(' | ')}`);
  else {
    const r = lintarLivro(parsed.data);
    livro.escolhasMortasToleradas = r.erros.filter((e) => e.regra === 'escolha-morta').map((e) => e.msg.match(/flag "([^"]+)"/)[1]).sort();
  }
}
writeFileSync(SAIDA, JSON.stringify(livro, null, 2) + '\n');
console.log(`nós convertidos: ${Object.keys(nos).length}`);
console.log(`problemas: ${problemas.length}`);
for (const p of problemas.slice(0, 60)) console.log('  -', p);
if (problemas.length > 60) console.log(`  ... +${problemas.length - 60}`);
process.exit(problemas.length ? 1 : 0);
