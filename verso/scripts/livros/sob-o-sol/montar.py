# Monta content/livros/sob-o-sol-da-toscana.json. Uso: python3 scripts/livros/sob-o-sol/montar.py
import json, importlib.util, glob, os, re, sys
base = os.path.dirname(__file__)
sys.path.insert(0, base)
nos = {}
for f in sorted(glob.glob(os.path.join(base, 'cap*.py')), key=lambda x: int(re.search(r'cap(\d+)', x).group(1))):
    spec = importlib.util.spec_from_file_location('cap', f); m = importlib.util.module_from_spec(spec); spec.loader.exec_module(m)
    for k, v in m.NOS.items():
        assert k not in nos, f'id duplicado: {k}'
        nos[k] = v
try:
    from extras import EXTRAS
    for nid, frases in EXTRAS.items():
        n = nos[nid]; bloco = '\n\n' + '\n\n'.join(frases)
        if n['tipo'] == 'final':
            for f in n['finais']: f['texto'] += bloco
        else: n['texto'] += bloco
except ImportError:
    pass
ult = max(n['cap'] for n in nos.values())
tem_final = any(n['tipo'] == 'final' for n in nos.values())
if not tem_final:
    nos['ts_rascunho_fim'] = dict(tipo='final', cap=ult, texto='Fim do trecho escrito até agora (rascunho).')
    for n in nos.values():
        if n['tipo'] == 'fim' and n['ir'] not in nos: n['ir'] = 'ts_rascunho_fim'
meta = dict(
  tema=dict(a='#6b3a1f', b='#d98e4a', destaque='#f3d9a4'),
  personagens=dict(
    A=dict(papel='A estudante de Moda e Comunicação', nomePadrao='Chloe', generoPadrao='ela', idade=21, origem='Los Angeles, Califórnia', ferida='Ser vista como fútil e não ser levada a sério.'),
    B=dict(papel='A estudante de História da Arte', nomePadrao='Riley', generoPadrao='ela', idade=22, origem='Boston, Massachusetts', ferida='Que a vida passe enquanto ela está lendo sobre a vida dos outros.')),
  fatos=['Siena, Toscana, Itália; um semestre de intercâmbio, de setembro a janeiro.',
         'Um erro no sistema da universidade pôs as duas na mesma vaga: um quarto, uma cama.',
         'A vizinha do andar de baixo, a signora Ottavia, deixa bilhetes em italiano, que só uma delas entende.',
         'As duas fazem juntas o trabalho de Cultura Italiana sobre uma obra de arte local.'])
livro = dict(
  id='sob-o-sol-da-toscana', titulo='Sob o Sol da Toscana', secao='k-vibes', adulto=True, rascunho=not tem_final,
  tropes=['forced-proximity', 'only-one-bed', 'opposites-attract', 'slow-burn', 'study-abroad'],
  serie='K-Vibes · Slow Burn',
  sinopse='Siena, Toscana. Duas universitárias americanas completamente opostas dividem o único apartamento disponível de um intercâmbio, com um quarto e uma cama. A convivência forçada, o silêncio e os olhares fazem o resto.',
  linhaDoTempo=[dict(quando='Setembro', evento='Chegada a Siena e o erro do sistema'), dict(quando='Novembro', evento='Florença e a Anunciação de Simone Martini'), dict(quando='Janeiro', evento='O fim do semestre e Roma')],
  vinculoPorCapitulo=2, idades=dict(A=21, B=22),
  npcs=dict(
    giulia=dict(nome='Giulia Brunelli', voz='23 anos, colega italiana, extrovertida, guia de Chloe pela cidade'),
    matteo=dict(nome='Matteo Lazzeri', voz='25 anos, orientador de Riley, sério e exigente, percebe o medo dela'),
    ottavia=dict(nome='Signora Ottavia', voz='70 anos, vizinha do andar de baixo, avental, dá conselhos em italiano e comida sem avisar'),
    bellandi=dict(nome='Professor Bellandi', voz='professor de Cultura Italiana, vaidoso e generoso com quem estuda'),
    mae=dict(nome='A mãe de Riley', voz='50 anos, fala por vídeo, cobra média nove e pontualidade')),
  nomesProibidos=['Chloe', 'Riley'], escolhasMortasToleradas=[],
  inicio=dict(A='ts_c1_a', B='ts_c1_b'), nos=nos)
if tem_final: livro.update(meta)
open(os.path.join(base, '../../../content/livros/sob-o-sol-da-toscana.json'), 'w').write(json.dumps(livro, ensure_ascii=False, indent=2) + '\n')
print('nós:', len(nos), '| capítulo mais alto:', ult, '| completo:', tem_final)
