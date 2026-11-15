import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { Livro } from './schema';

export const DIR_LIVROS = join(import.meta.dirname, '../../content/livros');
export const listarSlugs = () => readdirSync(DIR_LIVROS).filter((f) => f.endsWith('.json')).map((f) => f.replace(/\.json$/, ''));
export const lerBruto = (slug: string) => readFileSync(join(DIR_LIVROS, `${slug}.json`), 'utf8');
export const lerLivro = (slug: string) => Livro.parse(JSON.parse(lerBruto(slug)));
/** Nomes de NPCs de OUTROS livros (não podem aparecer neste). */
export function nomesDeOutros(slug: string): string[] {
  return listarSlugs().filter((s) => s !== slug).flatMap((s) => Object.values(lerLivro(s).npcs).map((n) => n.nome));
}
