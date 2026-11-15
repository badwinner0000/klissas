import { readFileSync, readdirSync } from 'node:fs';
import { parse } from 'acorn'; import { simple } from 'acorn-walk';
const DIR = new URL('file:///home/user/klissas/verso/fontes/padrinho-e-madrinha/codigo-historia/');
const cnt = {};
const add = (k) => (cnt[k] = (cnt[k] ?? 0) + 1);
const keys = (o) => o.properties.filter(p=>p.type==='Property').map((p) => p.key.name ?? p.key.value);
for (const f of readdirSync(DIR).filter((x) => /^cap\d+\.js$/.test(x))) {
  const src = readFileSync(new URL(f, DIR), 'utf8');
  simple(parse(src, { ecmaVersion: 'latest' }), {
    CallExpression(c) {
      if (c.callee.name !== 'no') return;
      const o = c.arguments[1];
      const get = (k) => o.properties.find((p) => p.key.name === k)?.value;
      add('quem=' + (get('quem')?.value));
      const pr = get('prox'); if (pr) add('prox:' + pr.type);
      const cm = get('comeca'); if (cm) add('comeca:' + cm.type);
      const ops = get('ops');
      const eachOp = (arr, pre) => arr.elements.forEach((e) => { if (e?.type === 'ObjectExpression') { keys(e).forEach((k) => add(`${pre}.${k}`)); for (const p of e.properties) { if (['ok','falha','parcial'].includes(p.key?.name) && p.value.type==='ObjectExpression') keys(p.value).forEach(k=>add(`${pre}.${p.key.name}.${k}`)); if (p.key?.name==='ef' && p.value.type==='ObjectExpression') keys(p.value).forEach(k=>add('ef.'+k)); if (p.key?.name==='ef' && p.value.type!=='ObjectExpression') add('ef:'+p.value.type);} } else if (e) add(`${pre}:spread/other ${e.type}`); });
      if (ops?.type === 'ArrayExpression') eachOp(ops, 'op');
      const fal = get('falas');
      if (fal) fal.elements.forEach((F) => { keys(F).forEach((k) => add('fala.' + k));
        const fo = F.properties.find((p) => p.key.name === 'ops')?.value;
        if (fo) { add('fala.ops:' + fo.type); const body = fo.body; if (body?.type === 'ArrayExpression') eachOp(body, 'opd'); else if (body) add('fala.ops.body:' + body.type); } });
      const ef = get('ef'); if (ef) { add('node.ef:' + ef.type); if (ef.type==='ObjectExpression') keys(ef).forEach(k=>add('nef.'+k)); }
    },
  });
}
console.log(Object.entries(cnt).sort().map(([k, v]) => `${String(v).padStart(4)} ${k}`).join('\n'));
