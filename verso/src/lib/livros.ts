import { createHash } from 'node:crypto';
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { Livro } from '../content/schema';

const DIR = () => join(process.cwd(), 'content', 'livros');

export interface ResumoLivro {
  slug: string;
  titulo: string;
  secao: string;
  tropes: string[];
  sinopse?: string;
  serie?: string;
  tema?: Livro['tema'];
  capitulos: number;
  personagens?: Livro['personagens'];
  pronto: boolean;
}

export function listarLivros(): ResumoLivro[] {
  return readdirSync(DIR())
    .filter((f) => f.endsWith('.json'))
    .map((f) => {
      const slug = f.replace(/\.json$/, '');
      const l = Livro.parse(JSON.parse(readFileSync(join(DIR(), f), 'utf8')));
      // livros de teste (fixtures) não aparecem na biblioteca
      return { slug, titulo: l.titulo, secao: l.secao, tropes: l.tropes, sinopse: l.sinopse, serie: l.serie, tema: l.tema, capitulos: Math.max(...Object.values(l.nos).map((n) => n.cap)), personagens: l.personagens, pronto: !!l.personagens };
    })
    .filter((l) => l.pronto);
}

export function carregarLivro(slug: string): { livro: Livro; hash: string } {
  if (!/^[a-z0-9-]+$/.test(slug)) throw new Error('livro inválido');
  const raw = readFileSync(join(DIR(), `${slug}.json`), 'utf8');
  return { livro: Livro.parse(JSON.parse(raw)), hash: createHash('sha256').update(raw).digest('hex').slice(0, 16) };
}
