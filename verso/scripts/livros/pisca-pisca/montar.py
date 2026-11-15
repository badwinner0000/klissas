# Monta content/livros/pisca-pisca.json a partir dos capítulos. Uso: python3 scripts/livros/pisca-pisca/montar.py
import json, importlib.util, glob, os, re
base = os.path.dirname(__file__)
nos = {}
for f in sorted(glob.glob(os.path.join(base, 'cap*.py')), key=lambda x: int(re.search(r'cap(\d+)', x).group(1))):
    spec = importlib.util.spec_from_file_location('cap', f); m = importlib.util.module_from_spec(spec); spec.loader.exec_module(m)
    for k, v in m.NOS.items():
        assert k not in nos, f'id duplicado: {k}'
        nos[k] = v
ult = max(n['cap'] for n in nos.values())
# remove o final provisório se a história já tem final de verdade
if 'pp_final' in nos: pass
else:
    nos['pp_rascunho_fim'] = dict(tipo='final', cap=ult, texto='Fim do trecho escrito até agora (rascunho).')
livro = dict(
  id='pisca-pisca', titulo='Pisca-Pisca', secao='love-sparks', adulto=False, rascunho=True,
  tropes=['rivals-to-lovers', 'forced-proximity', 'small-town', 'friends-to-lovers'],
  serie='Love Sparks · Natal',
  sinopse='Santa Rita do Mirante, dezembro. O transformador queima na Ligação das Luzes porque duas casas rivais passaram juntas da carga, e a prefeita decreta: este ano só existe uma árvore de luzes, feita pelos dois que não se falam há dois anos. Sete noites, um galpão, uma estrela guardada desde 1987 e a pergunta de quem some e de quem controla.',
  linhaDoTempo=[
    dict(quando='Quarta, 17 de dezembro · 18h58', evento='Ligação das Luzes e apagão'),
    dict(quando='Quarta, 17 de dezembro · 20h10', evento='Decreto da prefeita na praça'),
    dict(quando='Quinta, 18 de dezembro · 02h07', evento='Mensagem sobre a estrela de 1987'),
  ],
  vinculoPorCapitulo=2, idades=dict(A=18, B=18),
  npcs=dict(rosangela=dict(nome='Rosângela Pimenta', voz='prefeita, fala de megafone até sem bateria, brincos de pinheirinho'),
            valdomiro=dict(nome='Seu Valdomiro', voz='eletricista aposentado de 71 anos, fala pouco e guarda tudo'),
            nena=dict(nome='Dona Nena', voz='presidente da cooperativa, bolo de fubá com goiabada, sabe de tudo e conta')),
  nomesProibidos=['Nara', 'Lauro'], escolhasMortasToleradas=[],
  inicio='pp_c1_rua', nos=nos)
open(os.path.join(base, '../../../content/livros/pisca-pisca.json'), 'w').write(json.dumps(livro, ensure_ascii=False, indent=2) + '\n')
print('nós:', len(nos), '| capítulo mais alto:', ult)
