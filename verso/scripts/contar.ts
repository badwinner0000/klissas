import { lerLivro } from '../src/content/carregar';
import { textosDoNo } from '../src/engine/lint';

const slug = process.argv[2];
if (!slug) { console.error('uso: pnpm contar <livro>'); process.exit(2); }
const l = lerLivro(slug);
const porCap: Record<number, number> = {};
let total = 0;
for (const [id, no] of Object.entries(l.nos)) {
  const w = textosDoNo(no).reduce((s, t) => s + t.texto.split(/\s+/).filter(Boolean).length, 0);
  const principal = ('texto' in no ? no.texto : '').split(/\s+/).filter(Boolean).length;
  porCap[no.cap] = (porCap[no.cap] ?? 0) + w;
  total += w;
  const alerta = principal && principal < 150 ? '  ⚠ <150' : principal > 400 ? '  ⚠ >400' : '';
  console.log(`${String(principal).padStart(4)} palavras  cap ${no.cap}  ${id}${alerta}`);
}
for (const [c, w] of Object.entries(porCap)) console.log(`capítulo ${c}: ${w}`);
console.log(`TOTAL: ${total} (meta de um livro completo: 25.000–35.000)`);
