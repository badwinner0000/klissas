import { readdirSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { lerLivro } from '../../src/content/carregar';
import { jogar, jogadoresDe } from '../../src/engine/simular';
import { criarRng } from '../../src/engine/rng';

// Regressão: um diálogo nunca pode oferecer de novo uma fala (de reserva ou não) que já foi dita na mesma cena.
const slugs = readdirSync(new URL('../../content/livros', import.meta.url))
  .filter((f) => f.endsWith('.json'))
  .map((f) => f.replace('.json', ''))
  .filter((s) => s !== 'voo-cancelado');

describe('diálogos não repetem falas', () => {
  for (const slug of slugs) {
    it(slug, () => {
      const l = lerLivro(slug);
      for (let i = 0; i < 40; i++) {
        const p = jogar(l, jogadoresDe(l, 'ele', 'ela'), 'ambos', criarRng(777 + i));
        for (const txt of [...p.textos.A, ...p.textos.B]) {
          // cada fala ('“…' ou '[Nome] …') aparece uma vez por bloco de cena
          const falas = txt.split('\n').filter((x) => x.startsWith('[') || x.startsWith('▸'));
          expect(new Set(falas).size, `fala repetida em ${slug}`).toBe(falas.length);
        }
      }
    });
  }
});
