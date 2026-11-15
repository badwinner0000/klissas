# Monta content/livros/ultima-promocao.json a partir dos capítulos. Uso: python3 scripts/livros/ultima-promocao/montar.py
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
    nos['up_rascunho_fim'] = dict(tipo='final', cap=ult, texto='Fim do trecho escrito até agora (rascunho).')
    # alvos que o próximo capítulo ainda vai criar apontam para o final provisório
    for n in nos.values():
        if n['tipo'] == 'fim' and n['ir'] not in nos: n['ir'] = 'up_rascunho_fim'
livro = dict(
  id='ultima-promocao', titulo='A Última Promoção', secao='love-sparks', adulto=True, rascunho=not tem_final,
  tropes=['rivals-to-lovers', 'workplace-romance', 'forced-proximity', 'only-one-bed'],
  serie='Love Sparks · Livro 1',
  sinopse='Chicago e Viena. Duas pessoas disputam a mesma vaga de diretoria numa multinacional, viajam juntas a um congresso e dividem um quarto só. Quando descobrem que a vaga é uma isca para encobrir uma fraude, o único jeito de sair inteiras é juntas.',
  linhaDoTempo=[dict(quando='Segunda · 17 de março', evento='Venda da Tillman & Sons e anúncio da vaga'),
                dict(quando='Quinta · 20 de março', evento='Voo para Viena'),
                dict(quando='Sábado · 22 de março', evento='Apresentações no congresso')],
  vinculoPorCapitulo=2, idades=dict(A=38, B=41),
  npcs=dict(
    marcus=dict(nome='Marcus Webb', voz='50 anos, chefe, sorriso de comercial de seguro de vida, fala em frases de comunicado'),
    richard=dict(nome='Richard Tillman', voz='70 anos, pai de Dean, camisa de manga curta, cuida do cachorro, nunca lê o que escreve'),
    chloe=dict(nome='Chloe Bennett', voz='24 anos, estagiária, diz o que ninguém quer ouvir'),
    priya=dict(nome='Priya Patel', voz='28 anos, assistente administrativa, sabe de tudo e tem medo de falar'),
    nina=dict(nome='Nina Alvarez', voz='38 anos, melhor amiga, direta e carinhosa'),
    megan=dict(nome='Megan Nicholls', voz='42 anos, irmã, cansada e engraçada'),
    frank=dict(nome='Frank Delaney', voz='60 anos, cliente antigo, devagar e leal')),
  nomesProibidos=['Joanna', 'Dean'], escolhasMortasToleradas=[],
  tema=dict(a='#12343b', b='#2f6f73', destaque='#e0b96a'),
  personagens=dict(
    A=dict(papel='Diretora de contas da Meridian Group', nomePadrao='Joanna', generoPadrao='ela', idade=38, origem='Dayton, Ohio; mora em Lincoln Park, Chicago', ferida='Descobrir que passou a vida tentando provar algo que ninguém estava olhando.'),
    B=dict(papel='Diretor de operações da Tillman & Sons', nomePadrao='Dean', generoPadrao='ele', idade=41, origem='Chicago, Illinois', ferida='Que todos achem que só chegou onde chegou por ser o filho do dono.')),
  fatos=['Chicago e Viena, cerca de três semanas, do anúncio da venda da Tillman & Sons ao congresso global de operações.',
         'A Meridian Group comprou a empresa da família Tillman; a vaga de diretor regional do Meio-Oeste é disputada pelos dois.',
         'Marcus Webb é o chefe de Joanna e prometeu a mesma vaga aos dois.',
         'Há um quarto só reservado no Hotel Imperial, em Viena, para os seis dias do congresso.'],
  inicio=dict(A='up_c1_a', B='up_c1_b'), nos=nos)
open(os.path.join(base, '../../../content/livros/ultima-promocao.json'), 'w').write(json.dumps(livro, ensure_ascii=False, indent=2) + '\n')
print('nós:', len(nos), '| capítulo mais alto:', ult)
