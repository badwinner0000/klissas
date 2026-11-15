import { describe, expect, it } from 'vitest';
import { lerBruto, lerLivro } from '../../src/content/carregar';
import { criarRng } from '../../src/engine/rng';
import { chavesDuplicadas, lintarBruto, lintarLivro } from '../../src/engine/lint';
import { ErroJogo, agir, estadoInicial, opcoesTurno, visao } from '../../src/engine/motor';
import { POLITICAS, GENEROS, jogadoresDe, jogar, simular } from '../../src/engine/simular';
import { ErroTemplate, renderizar } from '../../src/engine/template';

const livro = () => structuredClone(lerLivro('voo-cancelado'));
const raw = () => lerBruto('voo-cancelado');
const regras = (r: { erros: { regra: string }[] }) => r.erros.map((e) => e.regra);

describe('template', () => {
  const ctx = (ga: 'ele' | 'ela', gb: 'ele' | 'ela', flags = {}) => ({ A: { nome: 'Lia', genero: ga }, B: { nome: 'Davi', genero: gb }, flags });
  it('resolve gênero nas 4 combinações', () => {
    for (const [ga, gb] of GENEROS) {
      expect(renderizar('{{A.nome}} está {{A.o_a}}', ctx(ga, gb))).toBe(`Lia está ${ga === 'ele' ? 'o' : 'a'}`);
      expect(renderizar('{{B.Ele_ela}}', ctx(ga, gb))).toBe(gb === 'ele' ? 'Ele' : 'Ela');
    }
  });
  it('condicional por flag, senão e negação', () => {
    expect(renderizar('{{se flag:x}}sim{{senao}}não{{/se}}', ctx('ele', 'ela', { x: true }))).toBe('sim');
    expect(renderizar('{{se flag:x}}sim{{senao}}não{{/se}}', ctx('ele', 'ela'))).toBe('não');
    expect(renderizar('{{se !flag:x}}n{{/se}}', ctx('ele', 'ela'))).toBe('n');
  });
  it('rejeita JS arbitrário e variável desconhecida', () => {
    expect(() => renderizar('{{alert(1)}}', ctx('ele', 'ele'))).toThrow(ErroTemplate);
    expect(() => renderizar('{{A.senha}}', ctx('ele', 'ele'))).toThrow(ErroTemplate);
    expect(() => renderizar('{{se flag:x}}aberto', ctx('ele', 'ele'))).toThrow(ErroTemplate);
  });
});

describe('diálogo em turnos', () => {
  const env = (eu: 'A' | 'B', hist: { tag: string; tom: string }[], flags = false, n = 0) => ({
    flags: new Proxy({}, { get: () => flags }) as Record<string, boolean>, vinculo: n, fa: n, abalo: { A: n, B: n }, eu,
    generos: { A: 'ela' as const, B: 'ele' as const }, hist,
  });
  it('sempre ≥3 opções com 3 tons, qualquer que seja o tom anterior', () => {
    const l = livro();
    const no = l.nos.c1_dialogo!;
    if (no.tipo !== 'dialogo') throw 0;
    for (const tom of ['abre', 'seco', 'flerte', 'cuida', 'fere'])
      for (let i = 0; i < no.turnos.length; i++) {
        const o = opcoesTurno(no, i, env(i % 2 ? 'B' : 'A', i === 0 ? [] : [{ tag: 'x', tom }]));
        expect(o.length).toBeGreaterThanOrEqual(3);
        expect(new Set(o.map((x) => x.tom)).size).toBeGreaterThanOrEqual(3);
      }
  });
  it('o pool completa um turno com só 2 opções escritas', () => {
    const l = livro();
    const no = l.nos.c1_dialogo!;
    if (no.tipo !== 'dialogo') throw 0;
    no.turnos[0]!.opcoes = no.turnos[0]!.opcoes.slice(0, 2);
    expect(opcoesTurno(no, 0, env('A', [])).length).toBe(3);
  });
  it('não há sobreposição: quem não é da vez não age nem vê opções', () => {
    const l = livro();
    const jog = jogadoresDe(l, 'ela', 'ele');
    let e = estadoInicial(l);
    const rng = criarRng(1);
    const ir = (id: string, s: 'A' | 'B') => { e = agir(l, e, s, id === 'continuar' ? { tipo: 'continuar' } : { tipo: 'opcao', id }, jog).estado; };
    ir('continuar', 'A'); ir('continuar', 'B');
    ir('a_insistir', 'A'); ir('continuar', 'A');
    ir('b_cafe', 'B'); ir('continuar', 'B');
    ir('continuar', 'A'); ir('continuar', 'B');
    expect(e.pos.A).toBe('c1_dialogo');
    expect(visao(l, e, 'B', jog).opcoes).toHaveLength(0);
    expect(visao(l, e, 'B', jog).aguardando).toBeTruthy();
    expect(() => agir(l, e, 'B', { tipo: 'opcao', id: '0:b_cuida' }, jog)).toThrow(ErroJogo);
    ir('0:a_seco', 'A');
    // opções de B dependem do tom escolhido por A (seco)
    const ids = visao(l, e, 'B', jog).opcoes.map((o) => o.id);
    expect(ids).toContain('1:b_fere_seco');
    expect(ids).not.toContain('1:b_cuida_abre');
  });
});

describe('resultado sem dados (escolhas decidem)', () => {
  it('a variante depende do nervosismo acumulado, nunca de sorte: mesma entrada, mesmo resultado', () => {
    const l = livro();
    const jog = jogadoresDe(l, 'ela', 'ele');
    const rodar = (abalo: number) => {
      const e = estadoInicial(l);
      e.pos = { A: 'c1_solo_a', B: 'c1_solo_b' };
      e.nervosismo.A = abalo;
      const r = agir(l, e, 'A', { tipo: 'opcao', id: 'a_insistir' }, jog);
      return visao(l, r.estado, 'A', jog).registro.map((x) => x.texto).join('\n');
    };
    expect(rodar(0)).toContain('anota seu nome');
    expect(rodar(0)).toBe(rodar(0));
    expect(rodar(3)).toContain('Reclamações');
  });
  it('o livro não contém dados nem atributos', () => {
    const bruto = raw();
    expect(bruto).not.toMatch(/"teste"|"atributos"|2d6/);
  });
});

describe('dividir: exclusividade e não-repetição', () => {
  const chegar = () => {
    const l = livro();
    const jog = jogadoresDe(l, 'ela', 'ele');
    let e = estadoInicial(l);
    e.pos = { A: 'c1_dividir', B: 'c1_dividir' };
    return { l, jog, e: () => e, set: (x: typeof e) => (e = x) };
  };
  it('a ação escolhida por A some para B; ação exclusiva é só de quem escolheu', () => {
    const { l, jog, e, set } = chegar();
    expect(visao(l, e(), 'B', jog).opcoes.map((o) => o.id)).not.toContain('d_tv'); // exclusiva do assento A
    set(agir(l, e(), 'A', { tipo: 'opcao', id: 'd_frigobar' }, jog).estado);
    expect(visao(l, e(), 'B', jog).opcoes.map((o) => o.id)).not.toContain('d_frigobar');
    expect(() => agir(l, e(), 'B', { tipo: 'opcao', id: 'd_frigobar' }, jog)).toThrow(ErroJogo);
    expect(() => agir(l, e(), 'A', { tipo: 'opcao', id: 'd_muralha' }, jog)).toThrow(/já escolheu/);
  });
  it('resultado da ação do A é privado: B não vê o texto dele', () => {
    const { l, jog, e, set } = chegar();
    set(agir(l, e(), 'A', { tipo: 'opcao', id: 'd_cobertor' }, jog).estado);
    expect(visao(l, e(), 'B', jog).texto).not.toContain('armário do corredor');
  });
});

describe('consentimento oculto (§5.4)', () => {
  it('voto de um jogador não aparece em eventos nem na visão do outro', () => {
    const l = livro();
    const jog = jogadoresDe(l, 'ela', 'ele');
    let e = estadoInicial(l);
    e.pos = { A: 'c1_consent', B: 'c1_consent' };
    const r = agir(l, e, 'A', { tipo: 'voto', id: 'ficar' }, jog);
    expect(r.eventos).toHaveLength(0);
    expect(visao(l, r.estado, 'B', jog).opcoes).toHaveLength(2);
    const r2 = agir(l, r.estado, 'B', { tipo: 'voto', id: 'avancar' }, jog);
    const pub = r2.eventos.find((x) => x.tipo === 'consentimento')!;
    expect(pub.payload).toEqual({ no: 'c1_consent', avancou: false }); // sem dizer quem recuou
    expect(r2.estado.pos.A).toBe('c1_sem');
    expect(r2.estado.flags.consent_noite).toBe(false);
  });
  for (const pol of POLITICAS)
    it(`livro chega ao fim sem contradição: política ${pol}`, () => {
      const l = livro();
      for (const [ga, gb] of GENEROS) for (let s = 0; s < 40; s++) {
        const p = jogar(l, jogadoresDe(l, ga, gb), pol, criarRng(s));
        expect(p.erros).toEqual([]);
        expect(p.estado.fim).toBe(true);
        const texto = p.textos.A.join(' ');
        const beijou = pol === 'ambos';
        expect(texto.includes('Primeiro é a aproximação')).toBe(beijou); // cena só existe se os dois toparam
        expect(texto.includes('Ninguém atravessa a linha')).toBe(!beijou);
        expect(texto.includes('rastros da noite')).toBe(beijou); // texto posterior respeita a variante
      }
    });
});

describe('informação privada (§5.5)', () => {
  it('B nunca recebe o texto da cena solo de A', () => {
    const l = livro();
    for (let s = 0; s < 20; s++) {
      const p = jogar(l, jogadoresDe(l, 'ela', 'ele'), 'ambos', criarRng(s));
      expect(p.textos.B.join('\n')).not.toContain('bateria do seu celular');
      expect(p.textos.A.join('\n')).not.toContain('senhora lutando com uma mala');
    }
  });
});

describe('simulação completa', () => {
  it('voo-cancelado: 4 políticas × 4 combinações, zero erros e todos os nós visitados', () => {
    const r = simular(livro(), 25);
    expect(r.erros).toEqual([]);
    expect(r.naoVisitados).toEqual([]);
    expect(r.finaisDistintos).toBeGreaterThanOrEqual(2);
  });
});

describe('lint reprova defeitos plantados (regressão)', () => {
  it('livro de exemplo está limpo', () => expect(lintarBruto(raw()).erros).toEqual([]));

  it('agência: narração com fala do protagonista', () => {
    for (const frase of ['Você diz que está tudo bem.', '{{A.nome}} responde sem olhar.', '“Vamos embora”, diz você.', '— Chega — sussurra {{B.nome}}.']) {
      const l = livro();
      (l.nos.c1_encontro as any).texto += ` ${frase}`;
      expect(regras(lintarLivro(l)), frase).toContain('agencia');
    }
  });
  it('agência: NPC pode falar', () => {
    const l = livro();
    (l.nos.c1_encontro as any).texto += ' Dona Cida diz que o elevador quebrou.';
    expect(regras(lintarLivro(l))).not.toContain('agencia');
  });
  it('diálogo com só 2 opções e sem pool', () => {
    const l = livro();
    const n = l.nos.c1_dialogo as any;
    n.turnos[0].opcoes = n.turnos[0].opcoes.slice(0, 2);
    n.pool = [];
    expect(regras(lintarLivro(l))).toContain('dialogo-menos-de-3');
  });
  it('escolha morta e flag nunca gravada', () => {
    const l = livro();
    (l.nos.c2_decisao as any).acoes[0].efeitos.flag = 'ninguem_le';
    const r = regras(lintarLivro(l));
    expect(r).toContain('escolha-morta');
    const l2 = livro();
    (l2.nos.c2_manha as any).texto += '{{se flag:fantasma}}x{{/se}}';
    expect(regras(lintarLivro(l2))).toContain('flag-nunca-gravada');
  });
  it('nó órfão, destino inexistente', () => {
    const l = livro();
    (l.nos as any).solto = { ...l.nos.c1_fim };
    expect(regras(lintarLivro(l))).toContain('orfao');
    const l2 = livro();
    (l2.nos.c1_fim as any).ir = 'nao_existe';
    expect(regras(lintarLivro(l2))).toContain('destino');
  });
  it('id duplicado no JSON bruto', () => {
    const dup = raw().replace('"c1_fim": {', '"c1_sem": {\n "cap":1},\n    "c1_fim": {');
    expect(chavesDuplicadas(dup)).toContain('c1_sem');
    expect(regras(lintarBruto(dup))).toContain('id-duplicado');
  });
  it('placeholders e valores quebrados', () => {
    const l = livro();
    (l.nos.c1_encontro as any).texto += ' valor: ${x} e undefined';
    expect(regras(lintarLivro(l))).toContain('texto-quebrado');
    const l2 = livro();
    (l2.nos.c1_encontro as any).texto += ' {{A.sobrenome}}';
    expect(regras(lintarLivro(l2))).toContain('template');
  });
  it('nome fixo de protagonista e de outro livro', () => {
    const l = livro();
    (l.nos.c1_encontro as any).texto += ' Lia olhou para o relógio.';
    expect(regras(lintarLivro(l))).toContain('nome-fixo');
    const l2 = livro();
    (l2.nos.c1_encontro as any).texto += ' Pippa chegou.';
    expect(regras(lintarLivro(l2, ['Pippa']))).toContain('nome-fixo');
  });
  it('consentimento sem variante "sem" e nós sem requer/exclui', () => {
    const l = livro();
    (l.nos.c1_consent as any).irSem = 'c1_beijo';
    expect(regras(lintarLivro(l))).toContain('consentimento-sem-variante');
    const l2 = livro();
    delete (l2.nos.c1_beijo as any).requer;
    expect(regras(lintarLivro(l2))).toContain('consentimento-sem-requer');
  });
  it('gênero fixo em opção escolhível', () => {
    const l = livro();
    (l.nos.c1_dialogo as any).turnos[0].opcoes[1].texto = 'Estou cansada disso.';
    expect(regras(lintarLivro(l))).toContain('genero-fixo');
  });
  it('ação com resultado condicional não pode ser compartilhada', () => {
    const l = livro();
    (l.nos.c1_dividir as any).acoes[2].compartilhada = true; // d_frigobar tem variantes
    expect(regras(lintarLivro(l))).toContain('acao-com-teste-compartilhada');
  });
  it('dividir com ações insuficientes por assento', () => {
    const l = livro();
    (l.nos.c1_dividir as any).acoes = (l.nos.c1_dividir as any).acoes.slice(0, 2);
    expect(regras(lintarLivro(l))).toContain('dividir-poucas-acoes');
  });
});

describe('simulação detecta texto contraditório (regressão: "não beijou e a história seguiu como se tivesse")', () => {
  it('nó que presume a cena sem requer/exclui é pego pelo motor', () => {
    const l = livro();
    delete (l.nos.c1_sem as any).exclui;
    (l.nos.c1_sem as any).requer = ['consent_noite']; // sem beijo, mas a variante exige o beijo
    const r = simular(l, 5);
    expect(r.erros.some((e) => /contradição/.test(e))).toBe(true);
  });
});
