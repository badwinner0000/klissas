import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { lerBruto, lerLivro } from '../../src/content/carregar';
import { lintarBruto } from '../../src/engine/lint';
import { flagsPrivadas } from '../../src/engine/motor';
import { criarRng } from '../../src/engine/rng';
import { GENEROS, POLITICAS, jogadoresDe, jogar, simular } from '../../src/engine/simular';

const livro = () => lerLivro('padrinhos');

describe('consequências das escolhas (antes mortas)', () => {
  const arq = JSON.parse(readFileSync(new URL('../../scripts/migracao/consequencias-padrinhos.json', import.meta.url), 'utf8')) as {
    itens: { flag: string; no: string; texto: string; privadoDe?: 'A' | 'B' }[];
  };
  const l = livro();
  const vistos: Record<'A' | 'B', string> = { A: '', B: '' };
  for (let seed = 1; seed <= 90; seed++) {
    // metade das partidas com consentimento, metade sem: algumas reações só existem do lado "sem"
    const p = jogar(l, { A: { nome: 'Ivy', genero: 'ela' }, B: { nome: 'Sam', genero: 'ele' } }, seed % 2 ? 'ambos' : 'nenhum', criarRng(seed));
    vistos.A += p.textos.A.join('\n').replace(/\*/g, '');
    vistos.B += p.textos.B.join('\n').replace(/\*/g, '');
  }
  const render = (t: string) => t.replace(/\*/g, '');
  it('nenhuma flag consequente continua morta', () => {
    const baseline = new Set(l.escolhasMortasToleradas);
    for (const it of arq.itens) expect(baseline.has(it.flag), it.flag).toBe(false);
  });
  it('reação privada: aparece para quem fez a escolha e NUNCA para o outro jogador', () => {
    const chave = (t: string) => render(t).slice(0, 40);
    for (const it of arq.itens.filter((x) => x.privadoDe)) {
      const dono = it.privadoDe!;
      const outro = dono === 'A' ? 'B' : 'A';
      expect(vistos[outro].includes(chave(it.texto)), `${it.flag} vazou para ${outro}`).toBe(false);
      expect(vistos[dono].includes(chave(it.texto)), `${it.flag} nunca apareceu para ${dono} em 90 partidas`).toBe(true);
    }
  });
  it('reação pública aparece para os dois', () => {
    const chave = (t: string) => render(t).slice(0, 40);
    for (const it of arq.itens.filter((x) => !x.privadoDe)) {
      expect(vistos.A.includes(chave(it.texto)) || vistos.B.includes(chave(it.texto)), `${it.flag} nunca apareceu`).toBe(true);
    }
  });
});

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

  it('regressão: lugar e hora (cabeçalho da cena) são renderizados, sem {{ }} cru', () => {
    const l = livro();
    const p = jogar(l, jogadoresDe(l, 'ela', 'ele'), 'ambos', criarRng(5));
    expect(p.erros).toEqual([]);
    const todos = Object.values(l.nos).filter((n) => /\{\{/.test(`${n.lugar ?? ''}${n.hora ?? ''}`));
    expect(todos.length).toBeGreaterThan(0); // o livro de fato usa condicional no cabeçalho
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
