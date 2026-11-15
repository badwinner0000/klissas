// Inventário do código-fonte de Padrinho e Madrinha: que formas de expressão e de nó existem.
import { readFileSync, readdirSync } from 'node:fs';
import { parse } from 'acorn';
import { simple } from 'acorn-walk';

const DIR = new URL('../../fontes/padrinho-e-madrinha/codigo-historia/', import.meta.url);
const exprs = new Map(), campos = new Map(), nos = [];
const fonte = (src, n) => src.slice(n.start, n.end);
const forma = (n, src) => {
  switch (n.type) {
    case 'CallExpression': return `${n.callee.type === 'Identifier' ? n.callee.name : n.callee.type === 'MemberExpression' ? `${n.callee.object.name ?? '?'}.${n.callee.property.name}` : '?'}(...)`;
    case 'ConditionalExpression': return `?: test=${forma(n.test, src)}`;
    case 'LogicalExpression': return `${n.operator}[${forma(n.left, src)}, ${forma(n.right, src)}]`;
    case 'UnaryExpression': return `${n.operator}${forma(n.argument, src)}`;
    case 'BinaryExpression': return `bin(${n.operator}; ${forma(n.left, src)}; ${forma(n.right, src)})`;
    case 'MemberExpression': return `${forma(n.object, src)}.${n.property.name ?? '[]'}`;
    case 'Identifier': return n.name;
    case 'Literal': return 'lit';
    case 'TemplateLiteral': return 'tpl';
    default: return n.type;
  }
};
for (const f of readdirSync(DIR).filter((x) => /^cap\d+\.js$/.test(x))) {
  const src = readFileSync(new URL(f, DIR), 'utf8');
  const ast = parse(src, { ecmaVersion: 'latest', sourceType: 'script' });
  simple(ast, {
    CallExpression(c) {
      if (c.callee.name !== 'no') return;
      const obj = c.arguments[1];
      const id = c.arguments[0].value;
      const tipo = obj.properties.find((p) => p.key.name === 'tipo')?.value.value;
      for (const p of obj.properties) campos.set(`${tipo}.${p.key.name ?? p.key.value}`, (campos.get(`${tipo}.${p.key.name ?? p.key.value}`) ?? 0) + 1);
      nos.push({ id, tipo });
    },
    TemplateLiteral(t) {
      for (const e of t.expressions) {
        const k = forma(e, src);
        exprs.set(k, (exprs.get(k) ?? 0) + 1);
      }
    },
  });
}
const top = (m, n = 60) => [...m].sort((a, b) => b[1] - a[1]).slice(0, n).map(([k, v]) => `${String(v).padStart(4)}  ${k}`).join('\n');
console.log(`nós: ${nos.length}`);
console.log('\n== campos por tipo\n' + top(campos, 200));
console.log('\n== formas de expressão dentro de ${...}\n' + top(exprs, 70));
console.log(`\ndistintas: ${exprs.size}`);
