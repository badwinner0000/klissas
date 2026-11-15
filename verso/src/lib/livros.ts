import { createHash } from 'node:crypto';
import { BIBLIOTECA } from '../content/biblioteca.generated';
import { Livro } from '../content/schema';

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
  return Object.entries(BIBLIOTECA)
    .map(([slug, bruto]) => {
      const l = Livro.parse(bruto);
      // livros de teste (fixtures) não aparecem na biblioteca: só entra quem tem ficha de personagens
      return { slug, titulo: l.titulo, secao: l.secao, tropes: l.tropes, sinopse: l.sinopse, serie: l.serie, tema: l.tema, capitulos: Math.max(...Object.values(l.nos).map((n) => n.cap)), personagens: l.personagens, pronto: !!l.personagens };
    })
    .filter((l) => l.pronto);
}

export function carregarLivro(slug: string): { livro: Livro; hash: string } {
  if (!/^[a-z0-9-]+$/.test(slug)) throw new Error('livro inválido');
  const bruto = BIBLIOTECA[slug];
  if (!bruto) throw new Error('livro inválido');
  // o hash identifica a versão do conteúdo: a sala fica presa a ele
  return { livro: Livro.parse(bruto), hash: createHash('sha256').update(JSON.stringify(bruto)).digest('hex').slice(0, 16) };
}
