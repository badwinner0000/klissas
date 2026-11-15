// Compara o texto lido no Verso com o gabarito do original (caminho em que os dois aceitam).
// Cobertura = % dos parágrafos do gabarito que aparecem em alguma partida simulada (mesmos nomes e gêneros).
import { readFileSync } from 'node:fs';
import { lerLivro } from '../../src/content/carregar';
import { criarRng } from '../../src/engine/rng';
import { jogar } from '../../src/engine/simular';

const norm = (s: string) => s.replace(/\s+/g, ' ').trim();
const gabarito = readFileSync(new URL('../../fontes/padrinho-e-madrinha/padrinho-e-madrinha-historia-completa.md', import.meta.url), 'utf8')
  .split('\n')
  .filter((l) => l.trim() && !l.startsWith('@@'))
  .map(norm);

const l = lerLivro('padrinhos');
const jog = { A: { nome: 'Ivy', genero: 'ela' as const }, B: { nome: 'Sam', genero: 'ele' as const } };
const vistos = new Set<string>();
const N = Number(process.argv[2] ?? 300);
for (let i = 0; i < N; i++) {
  const p = jogar(l, jog, 'ambos', criarRng(i + 1));
  for (const s of ['A', 'B'] as const) for (const t of p.textos[s]) for (const par of t.split('\n')) if (par.trim()) vistos.add(norm(par.replace(/^▸ \[[^\]]+\] /, '').replace(/^\[[^\]]+\] /, '')));
}
const faltam = gabarito.filter((g) => !vistos.has(g));
console.log(`gabarito: ${gabarito.length} parágrafos · encontrados: ${gabarito.length - faltam.length} (${(100 * (1 - faltam.length / gabarito.length)).toFixed(1)}%) em ${N} partidas`);
for (const f of faltam.slice(0, Number(process.argv[3] ?? 25))) console.log('  ✗', f.slice(0, 160));
