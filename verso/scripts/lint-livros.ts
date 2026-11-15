import { lerBruto, listarSlugs, nomesDeOutros } from '../src/content/carregar';
import { lintarBruto } from '../src/engine/lint';

const alvo = process.argv[2];
let falhou = false;
for (const slug of alvo ? [alvo] : listarSlugs()) {
  const r = lintarBruto(lerBruto(slug), nomesDeOutros(slug));
  console.log(`\n== ${slug}: ${r.erros.length} erro(s), ${r.avisos.length} aviso(s)`);
  for (const e of r.erros) console.log(`  ERRO  [${e.regra}] ${e.no ?? ''} ${e.msg}`);
  for (const w of r.avisos) console.log(`  aviso [${w.regra}] ${w.no ?? ''} ${w.msg}`);
  if (r.erros.length) falhou = true;
}
process.exit(falhou ? 1 : 0);
