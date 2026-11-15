# Monta content/livros/refrao-de-verao.json. Uso: python3 scripts/livros/refrao-de-verao/montar.py
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
    nos['rv_rascunho_fim'] = dict(tipo='final', cap=ult, texto='Fim do trecho escrito até agora (rascunho).')
    for n in nos.values():
        if n['tipo'] == 'fim' and n['ir'] not in nos: n['ir'] = 'rv_rascunho_fim'
meta = dict(
  tema=dict(a='#3a2a5c', b='#c4688a', destaque='#f4c36b'),
  personagens=dict(
    A=dict(papel='A popstar em crise', nomePadrao='Maya', generoPadrao='ela', idade=26, origem='Los Angeles, Califórnia', ferida='Descobrir que a única coisa que tem é a fama.'),
    B=dict(papel='O carpinteiro da cidade', nomePadrao='Jack', generoPadrao='ele', idade=31, origem='Pine Hollow, Washington', ferida='Ser deixado para trás por quem não pertence ao lugar.')),
  fatos=['Pine Hollow, cidade de mil e poucas pessoas nas montanhas do leste do estado de Washington; sinal de celular ruim, internet por satélite.',
         'A casa é do avô de Maya, Henry Ashby, que morreu em março; o carpinteiro foi contratado pelo espólio para reformá-la.',
         'Maya tem um verão, três meses, para compor o próximo álbum.',
         'Ninguém na cidade sabe quem Maya é.'])
livro = dict(
  id='refrao-de-verao', titulo='Refrão de Verão', secao='love-sparks', adulto=True, rascunho=not tem_final,
  tropes=['celebrity-romance', 'small-town', 'enemies-to-lovers', 'slow-burn', 'summer-romance'],
  serie='Love Sparks · Verão',
  sinopse='Uma popstar mundial em crise criativa se esconde na casa isolada do avô, em Pine Hollow, onde ninguém a conhece, e se envolve com o único carpinteiro que não se impressiona com ela. Mas o fim do verão e o prazo do álbum ameaçam o que os dois construíram.',
  linhaDoTempo=[dict(quando='Junho', evento='Chegada a Pine Hollow'), dict(quando='Julho', evento='O lago, a noite e a foto que vaza'), dict(quando='Agosto', evento='A despedida e o show em Seattle')],
  vinculoPorCapitulo=2, idades=dict(A=26, B=31),
  npcs=dict(
    doris=dict(nome='Doris Pruitt', voz='58 anos, dona da mercearia e do café, fofoqueira com coração de ouro, desconfia de forasteiros'),
    caleb=dict(nome='Caleb Lindqvist', voz='28 anos, irmão de Jack, técnico de som, leal e falante'),
    sarah=dict(nome='Sarah Brandt', voz='30 anos, ex de Jack, ainda apaixonada, educada e afiada'),
    lorna=dict(nome='Lorna Feldt', voz='45 anos, agente de Maya, fala em prazos e em metas')),
  nomesProibidos=['Maya', 'Jack'], escolhasMortasToleradas=[],
  inicio=dict(A='rv_c1_a', B='rv_c1_b'), nos=nos)
if tem_final: livro.update(meta)
open(os.path.join(base, '../../../content/livros/refrao-de-verao.json'), 'w').write(json.dumps(livro, ensure_ascii=False, indent=2) + '\n')
print('nós:', len(nos), '| capítulo mais alto:', ult, '| completo:', tem_final)
