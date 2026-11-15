import { lerLivro } from '../src/content/carregar';
import { simular } from '../src/engine/simular';

const [slug, n = '50'] = process.argv.slice(2);
if (!slug) { console.error('uso: pnpm sim <livro> [N]'); process.exit(2); }
const r = simular(lerLivro(slug), Number(n));
console.log(`${r.partidas} partidas (4 políticas × 4 combinações de gênero × ${n}); finais distintos: ${r.finaisDistintos}`);
for (const e of r.erros.slice(0, 30)) console.log('  ERRO', e);
if (r.erros.length > 30) console.log(`  ... +${r.erros.length - 30}`);
console.log(r.erros.length ? `FALHOU (${r.erros.length} erros)` : 'OK: zero erros');
process.exit(r.erros.length ? 1 : 0);
