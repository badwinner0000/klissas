// Gera src/content/biblioteca.generated.ts: importa cada livro de content/livros/*.json.
// O servidor da Cloudflare não tem disco, então os livros entram no bundle em vez de serem lidos em tempo de execução.
import { readdirSync, writeFileSync } from 'node:fs';
const dir = new URL('../content/livros/', import.meta.url);
const arquivos = readdirSync(dir).filter((f) => f.endsWith('.json')).sort();
const linhas = [
  '// GERADO por scripts/gerar-biblioteca.mjs (roda no prebuild). Não edite à mão.',
  ...arquivos.map((f, i) => `import l${i} from '../../content/livros/${f}';`),
  'export const BIBLIOTECA: Record<string, unknown> = {',
  ...arquivos.map((f, i) => `  '${f.replace(/\.json$/, '')}': l${i},`),
  '};',
  '',
];
writeFileSync(new URL('../src/content/biblioteca.generated.ts', import.meta.url), linhas.join('\n'));
console.log(`biblioteca: ${arquivos.length} livros`);
