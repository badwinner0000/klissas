import { lerLivro } from '../src/content/carregar';
import { criarRng } from '../src/engine/dados';
import { type Politica, jogadoresDe, jogar } from '../src/engine/simular';

const [slug, politica = 'ambos', seed = '1'] = process.argv.slice(2);
if (!slug) { console.error('uso: pnpm trilha <livro> <ambos|nenhum|soA|soB> [seed]'); process.exit(2); }
const l = lerLivro(slug);
const p = jogar(l, jogadoresDe(l, 'ela', 'ele'), politica as Politica, criarRng(Number(seed)));
for (const s of ['A', 'B'] as const) {
  console.log(`\n######## LIDO PELO ASSENTO ${s} ########\n`);
  console.log(p.textos[s].join('\n\n---\n\n'));
}
if (p.erros.length) console.log('\nERROS:', p.erros);
