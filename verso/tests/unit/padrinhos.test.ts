import { describe, expect, it } from 'vitest';
import { lerBruto, lerLivro } from '../../src/content/carregar';
import { lintarBruto } from '../../src/engine/lint';
import { flagsPrivadas } from '../../src/engine/motor';
import { criarRng } from '../../src/engine/rng';
import { GENEROS, POLITICAS, jogadoresDe, jogar, simular } from '../../src/engine/simular';

const livro = () => lerLivro('padrinhos');

describe('Padrinho e Madrinha (livro migrado)', () => {
  it('lint: zero erros (avisos de baseline e de cena curta são tolerados)', () => {
    const r = lintarBruto(lerBruto('padrinhos'));
    expect(r.erros).toEqual([]);
  });

  it('regressão (item 1): nenhuma ação com resultado condicional/teste é compartilhada entre os dois', () => {
    for (const [id, n] of Object.entries(livro().nos))
      if ('acoes' in n) for (const a of n.acoes) expect(!!(a.compartilhada && a.variantes), `${id}.${a.id}`).toBe(false);
  });

  it('regressão (cap. 9): o discurso do microfone é diálogo com 3 tons por jogador, não narração', () => {
    const l = livro();
    const mic = l.nos.pd_c9_microfone as any;
    expect(mic.tipo).toBe('dialogo');
    for (const t of mic.turnos) expect(new Set(t.opcoes.map((o: any) => o.tom)).size).toBeGreaterThanOrEqual(3);
    expect(JSON.stringify(l.nos.pd_c9_cerimonia)).not.toContain('Boa tarde. Eu sou');
    const r = simular(l, 6);
    expect(r.naoVisitados).not.toContain('pd_c9_microfone');
  });

  it('sem dados, sem atributos, sem puzzle', () => {
    const bruto = lerBruto('padrinhos');
    expect(bruto).not.toMatch(/"teste"|"atributos"|"puzzle"|2d6/);
    expect(Object.values(livro().nos).some((n) => (n as { tipo: string }).tipo === 'puzzle')).toBe(false);
  });

  it('regressão: trechos em que o original narrava fala de protagonista sem escolha foram corrigidos', () => {
    const bruto = lerBruto('padrinhos');
    for (const frag of ['{{se eu:A}}Você pega{{senao}}{{A.Ref}} pega{{/se}} o microfone.', '\n\n— Mãe.\n\n', '\n\n— Às vezes.\n\n', 'disse *tudo bem*', '— Respira — você diz', '— Cético — você diz', 'Você diz que ouviu o recado'])
      expect(bruto, frag).not.toContain(frag);
  });

  it('simulação: 4 políticas × 4 gêneros, zero erros e todos os nós visitados', () => {
    const r = simular(livro(), 12);
    expect(r.erros).toEqual([]);
    expect(r.naoVisitados).toEqual([]);
  });

  for (const pol of POLITICAS)
    it(`consentimento oculto, política ${pol}: nunca texto contraditório até o fim`, () => {
      const l = livro();
      for (const [ga, gb] of GENEROS)
        for (let s = 1; s <= 6; s++) {
          const p = jogar(l, jogadoresDe(l, ga, gb), pol, criarRng(s));
          expect(p.erros, `${pol} ${ga}/${gb} #${s}`).toEqual([]);
          expect(p.estado.fim).toBe(true);
          // nó só do lado "sim" jamais aparece quando alguém recusou, e vice-versa
          const noites = [['pd_c3_sim', 'pd_c3_nao'], ['pd_c6_sim', 'pd_c6_nao']] as const;
          for (const [sim, nao] of noites) {
            if (pol !== 'ambos') expect(p.visitados.has(sim), `${sim} com ${pol}`).toBe(false);
            else expect(p.visitados.has(nao), `${nao} com ambos`).toBe(false);
          }
        }
    });

  it('votos individuais de consentimento são flags PRIVADAS (a camada de servidor não as projeta ao cliente)', () => {
    const priv = flagsPrivadas(livro());
    expect(priv.length).toBeGreaterThanOrEqual(10);
    expect(priv).toContain('noite3_a');
    expect(priv).toContain('noite3_b');
  });

  it('o texto reage a quem escolheu o quê: perspectiva do parceiro em 3ª pessoa, a sua em 2ª', () => {
    const l = livro();
    const p = jogar(l, { A: { nome: 'Ivy', genero: 'ela' }, B: { nome: 'Sam', genero: 'ele' } }, 'ambos', criarRng(3));
    const ta = p.textos.A.join('\n');
    expect(ta).toContain('Ivy'); // o nome aparece quando outro agiu / quando o par lê
    expect(ta).toContain('você');
    expect(p.textos.B.join('\n')).not.toMatch(/⟦ERRO|undefined|\{\{/);
  });
});
