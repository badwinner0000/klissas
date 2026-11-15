# Monta content/livros/pisca-pisca.json a partir dos capítulos. Uso: python3 scripts/livros/pisca-pisca/montar.py
import json, importlib.util, glob, os, re, sys
sys.path.insert(0, os.path.dirname(__file__))
base = os.path.dirname(__file__)
nos = {}
for f in sorted(glob.glob(os.path.join(base, 'cap*.py')), key=lambda x: int(re.search(r'cap(\d+)', x).group(1))):
    spec = importlib.util.spec_from_file_location('cap', f); m = importlib.util.module_from_spec(spec); spec.loader.exec_module(m)
    for k, v in m.NOS.items():
        assert k not in nos, f'id duplicado: {k}'
        nos[k] = v
from extras import EXTRAS
for nid, frases in EXTRAS.items():
    n = nos[nid]
    bloco = '\n\n' + '\n\n'.join(frases)
    if n['tipo'] == 'final':
        for f in n['finais']: f['texto'] += bloco
    elif n['tipo'] == 'fim':
        n['texto'] += bloco
    else:
        n['texto'] += bloco
ult = max(n['cap'] for n in nos.values())
# remove o final provisório se a história já tem final de verdade
if any(n['tipo']=='final' for n in nos.values()): pass
else:
    nos['pp_rascunho_fim'] = dict(tipo='final', cap=ult, texto='Fim do trecho escrito até agora (rascunho).')
livro = dict(
  id='pisca-pisca', titulo='Pisca-Pisca', secao='love-sparks', adulto=False, rascunho=False,
  tropes=['rivals-to-lovers', 'forced-proximity', 'neighbors', 'friends-to-lovers', 'christmas'],
  serie='Love Sparks · Natal',
  sinopse='Dyker Heights, Brooklyn, dezembro. O transformador queima na Acendida de Harmon Place porque duas casas rivais passaram juntas da carga, e a associação decreta: este ano só existe uma árvore de luzes, feita pelos dois vizinhos que não se falam há dois anos. Sete noites, um depósito de ferragens, uma estrela guardada desde 1987 e a pergunta de quem some e de quem controla.',
  linhaDoTempo=[
    dict(quando='Quarta, 17 de dezembro · 18h58', evento='Acendida de Harmon Place e apagão'),
    dict(quando='Quarta, 17 de dezembro · 20h10', evento='Decreto da associação em Cooper Green'),
    dict(quando='Quinta, 18 de dezembro · 02h07', evento='Mensagem sobre a estrela de 1987 no depósito da Kessler'),
  ],
  vinculoPorCapitulo=2, idades=dict(A=18, B=18),
  npcs=dict(odalys=dict(nome='Odalys Quiñones', voz='presidente da associação de moradores, broche de pinheirinho, megafone sem bateria, fala de peito'),
            szymanski=dict(nome='Seu Szymanski', voz='ex-técnico da Con Edison, 71 anos, fala pouco e guarda tudo'),
            gus=dict(nome='Gus Pappas', voz='dono da lanchonete Pappas, cheesecake, sabe de tudo e conta')),
  nomesProibidos=['Roz', 'Teddy'], escolhasMortasToleradas=[],
  tema=dict(a='#8c1738', b='#c4515f', destaque='#f5c76b'),
  personagens=dict(
    A=dict(papel='Quem planeja tudo (casa nº 8)', nomePadrao='Roz', generoPadrao='ela', idade=18, origem='Dyker Heights, Brooklyn', ferida='Medo de ser largada: quem se afasta some.'),
    B=dict(papel='Quem desenha em silêncio (casa nº 11)', nomePadrao='Teddy', generoPadrao='ele', idade=18, origem='Dyker Heights, Brooklyn', ferida='Medo de decepcionar: cala para não brigar, e o silêncio vira a briga.')),
  fatos=['Dyker Heights, Brooklyn, de 17 a 25 de dezembro de 2025.',
         'As casas nº 8 (ítalo-americanos) e nº 11 (sino-americanos) de Harmon Place não se falam há anos.',
         'A associação do bairro decretou uma só árvore de doze metros, feita pelos dois mais novos das casas.',
         'A estrela da árvore é de 1987 e só acende com duas chaves, giradas ao mesmo tempo.'],
  inicio='pp_c1_rua', nos=nos)
open(os.path.join(base, '../../../content/livros/pisca-pisca.json'), 'w').write(json.dumps(livro, ensure_ascii=False, indent=2) + '\n')
print('nós:', len(nos), '| capítulo mais alto:', ult)
