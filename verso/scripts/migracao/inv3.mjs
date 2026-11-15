import { readFileSync, readdirSync } from 'node:fs';
import { parse } from 'acorn'; import { simple } from 'acorn-walk';
const DIR = new URL('file:///home/user/klissas/verso/fontes/padrinho-e-madrinha/codigo-historia/');
const seen = new Map();
const note = (k, s) => { const key = k + ' :: ' + s; seen.set(key, (seen.get(key) ?? 0) + 1); };
for (const f of readdirSync(DIR).filter((x) => /^cap\d+\.js$/.test(x))) {
  const src = readFileSync(new URL(f, DIR), 'utf8');
  const code = (n) => src.slice(n.start, n.end).replace(/\s+/g, ' ');
  const cut = (n) => { const s = code(n); return s.length > 110 ? s.slice(0, 110) + '…' : s; };
  simple(parse(src, { ecmaVersion: 'latest' }), {
    CallExpression(c) {
      if (c.callee.name !== 'no') return;
      const o = c.arguments[1];
      for (const p of o.properties) {
        const k = p.key.name;
        if (['prox', 'ef', 'comeca'].includes(k) && p.value.type !== 'Literal' && p.value.type!=='ObjectExpression') note('node.' + k, cut(p.value));
        if (k === 'falas') p.value.elements.forEach((F) => F.properties.forEach((q) => { if (q.key.name === 'se') note('fala.se', cut(q.value)); if (q.key.name==='quem') note('fala.quem', cut(q.value)); if (q.key.name === 'ops') { const b = q.value.body; if (b.type === 'ArrayExpression') b.elements.forEach((e) => { if (e.type === 'SpreadElement') note('spread', cut(e.argument).replace(/\{t:.*$/, '{…}')); else e.properties?.forEach((z) => { if (z.key.name === 'se') note('opd.se', cut(z.value)); }); }); else note('ops.body', cut(b).slice(0,200)); } }));
        if (k === 'ops') p.value.elements?.forEach((e) => e.properties?.forEach((z) => { if (['se', 'req', 'nao', 'so', 'ambos', 'dif', 'ir'].includes(z.key.name)) note('op.' + z.key.name, cut(z.value)); }));
      }
    },
  });
}
const L = [...seen].sort();
console.log(L.map(([k, v]) => `${String(v).padStart(3)} ${k}`).join('\n'));
