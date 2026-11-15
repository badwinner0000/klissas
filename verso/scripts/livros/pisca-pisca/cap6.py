# Pisca-Pisca · Capítulo 6 · O topo (segunda, 22 de dezembro de 2025)
NOS = {}

def op(tom, tag, texto, se=None, ef=None, acao=False):
    d = dict(tom=tom, tag=tag, texto=texto)
    if se: d['se'] = se
    if ef: d['efeitos'] = ef
    if acao: d['acao'] = True
    return d

NOS['pp_c6_manha'] = dict(tipo='segue', cap=6, lugar='Depósito da Kessler Hardware', hora='Segunda, 22 de dezembro · 07h30', npcs=['szymanski', 'gus'],
 ir='pp_c6_carga',
 texto="""Segunda-feira de manhã, a três dias da Noite da Árvore, a Kessler Hardware está com a porta de ferro aberta e o beco cheio de gente de colete laranja. O seu Szymanski, sem avisar, chamou três ex-colegas da Con Edison, que desceram do Queens de caminhonete, com cintos de ferramentas e um termo de café.

Gus Pappas, de avental e de boné dos Yankees, distribui sanduíches de ovo com bacon embrulhados em papel pardo. Na calçada, um menino de onze anos mede o beco com passos de gigante: Nico Tedeschi, que decidiu, sem pedir licença a ninguém, que agora é o assistente-chefe da obra.

A estrela de oito pontas, limpa, polida, fora do lençol, brilha em cima da mesa como uma coisa que acordou de um sono comprido. Em volta dela, três metros de papel pardo com o desenho da árvore, rabiscado a lápis, riscado, redesenhado.

— Antes de montar qualquer coisa — diz o seu Szymanski, apontando a folha da carga com o dedo seco — a árvore precisa de um dono. Quem decide quando alguém tem de ceder?""")

NOS['pp_c6_carga'] = dict(tipo='decisao', cap=6, lugar='Depósito da Kessler Hardware', hora='Segunda, 22 de dezembro · 08h40',
 texto="""Uma árvore de doze metros que puxa quarenta por cento a mais do que o transformador aguenta tem, para existir, três saídas. Todas custam alguma coisa a alguém, e as duas pessoas que mandam no projeto precisam escolher a mesma.""",
 pergunta='Como a árvore passa a caber na carga?',
 ir='pp_c6_andaime',
 acoes=[
  dict(id='tedeschi', texto='Tirar mil lâmpadas da nº 8: a árvore usa menos das luzes do Papai Noel', efeitos=dict(flag='cedeu_a', vinculo=1),
   resultado="""Vocês decidem tirar mil lâmpadas da conta da nº 8, e a nº 8 vai sentir a falta delas. O trenó fica mais escuro; o Papai Noel de braço mecânico, que o seu Sal jura consertar desde 2019, perde as luzes do capuz. É um corte de orgulho, e um corte de orgulho dói mais do que um corte de energia."""),
  dict(id='lau', texto='Tirar a metade dos fios do ginkgo de vidro: a árvore usa menos da constelação da nº 11', efeitos=dict(flag='cedeu_b', vinculo=1),
   resultado="""Vocês decidem tirar a metade dos fios do ginkgo da conta. A constelação que levou quatro madrugadas de novembro para ser medida vai ficar com um buraco no meio. É um corte de coisa que ninguém viu e todo mundo já ama."""),
  dict(id='metades', texto='Acender a árvore em duas metades, em sincronia: uma metade de cada casa, no mesmo segundo', efeitos=dict(flag='duas_metades', abalo=1),
   resultado="""Vocês decidem não cortar nada. A árvore vai acender em duas metades, uma por casa, e o interruptor de cada metade vai estar na mão de uma pessoa. Se um dos dois atrasar um segundo, o transformador não aguenta. Foi a solução mais bonita e a mais arriscada: ela só funciona se os dois confiarem um no outro."""),
 ])

NOS['pp_c6_andaime'] = dict(tipo='dividir', cap=6, lugar='Cooper Green', hora='Segunda, 22 de dezembro · 16h20', cada=1,
 texto="""Às quatro e vinte, o tronco da árvore, doze metros de cabo trançado e um poste de aço escorado em três pontos, está de pé em Cooper Green, preso por andaimes de tubo, no meio da pracinha de grama pelada. Em volta, dezenas de bicos de fio esperam ser puxados para cima.

Os colegas do seu Szymanski foram embora. O sol de dezembro já cai pelo lado da igreja, e o frio sobe do chão. No topo do andaime, onde a estrela vai ser presa, ninguém precisa de ninguém, e é por isso que alguém precisa subir.""",
 pergunta='Quem faz o quê?',
 acoes=[
  dict(id='subir', texto='Subir pelo andaime até o topo, com a corda de segurança, para prender o último cabo', efeitos=dict(flag='subiu_topo', abalo=1),
   resultado="""Você sobe os degraus de tubo um a um, com a corda de segurança presa ao cinto e as luvas de couro do seu Szymanski, grandes demais. Doze metros acima da pracinha, o bairro se abre: as doze casas da Harmon Place, as duas de vela nas janelas, os telhados de Dyker Heights como uma maré cinzenta e, ao longe, a ponte Verrazzano com seus cabos acesos. O vento faz o andaime cantar de leve."""),
  dict(id='segurar', texto='Ficar embaixo, segurando a escada e passando os cabos para quem sobe', efeitos=dict(flag='ficou_embaixo', vinculo=1),
   resultado="""Você fica embaixo, com os pés bem plantados no pé da escada, as duas mãos no tubo gelado e o pescoço dobrado para cima. É o trabalho de quem confia, e confiar, para você, dá mais trabalho do que subir: você não pode fazer nada além de olhar, avisar, esperar e acreditar que a pessoa lá em cima sabe o que está fazendo."""),
  dict(id='medir', texto='Medir a tensão dos cabos com o aparelho do seu Szymanski, de olho nos números', efeitos=dict(flag='mediu_cabos'),
   resultado="""Você aponta o medidor para cada cabo, um por vez, anotando no caderno os números do visor, e eles ficam, todos, dentro da faixa. Há um prazer pequeno e honesto em ver um problema se comportar. Pela primeira vez em três dias, uma coisa se resolve sozinha."""),
 ],
 desfecho="""Quando o sol cai atrás da igreja de Saint Rose of Lima, os dois acabam, por acaso ou não, no mesmo andar do andaime, a seis metros do chão, sozinhos, com os colegas do seu Szymanski longe e a pracinha vazia lá embaixo.""",
 ir='pp_c6_dialogo')

NOS['pp_c6_dialogo'] = dict(tipo='dialogo', cap=6, lugar='Andaime, Cooper Green', hora='Segunda, 22 de dezembro · 17h05', comeca='B',
 texto="""A seis metros do chão, entre duas barras de aço, há um patamar de madeira em que cabem, com folga, duas pessoas sentadas. O vento é frio e limpo. A cidade começa a acender as luzes de verdade, uma janela por vez, e a Harmon Place, lá embaixo, continua escura.

Quando não há mais nada a medir, a conversa tem de ser a própria coisa.""",
 turnos=[
  dict(prompt='A primeira frase é sua.', opcoes=[
    op('abre', 'x0_foto', '— Eu achei uma foto, no pano da estrela. Meu avô e o seu. Você viu?', se='flag:b_mostrou_foto || flag:b_guardou_foto || flag:a_leu_caixa'),
    op('abre', 'x0_aqui', '— Dá para ver a rua inteira daqui. Eu nunca tinha visto a nossa rua assim.'),
    op('flerte', 'x0_vento', '— Se você cair, eu não te seguro. Mas eu grito bonito.'),
    op('seco', 'x0_trabalho', '— Esse andaime balança. A gente termina isso e desce.'),
  ]),
  dict(prompt='Agora é você quem responde.', opcoes=[
    op('abre', 'x1_verdade', '— Eu soube ontem o que aconteceu no velório. Você também, né?', se='flag:trocaram_versoes || flag:b_acolheu_po || flag:a_defendeu_wing'),
    op('cuida', 'x1_vento', '— Você está com frio. Vem para o meu lado, tem menos vento.'),
    op('flerte', 'x1_grito', '— Eu grito bonito, é verdade. Mas ninguém aqui vai ter coragem de te deixar cair.'),
    op('seco', 'x1_ok', '— Tá. A gente desce em cinco minutos.'),
  ]),
  dict(prompt='A conversa é sua de novo.', opcoes=[
    op('abre', 'x2_cornell', '— Eu entrei em Cornell. Ainda não sei se eu vou. Mas eu me inscrevi para ver se eu era capaz.', se='flag:confessou_cornell || flag:confessou_cornell_festa', ef=dict(vinculo=1)),
    op('abre', 'x2_medo', '— Eu tenho medo de que, se eu falar o que eu quero, você ache que eu estou largando você de novo.', ef=dict(vinculo=1)),
    op('fere', 'x2_plano', '— Você escreveu um plano de vida para a gente sem me perguntar. Isso não era cuidado.', ef=dict(abalo=1)),
    op('cuida', 'x2_obrigado', '— Eu não quero brigar aqui em cima. Hoje, não.'),
  ]),
  dict(prompt='A última palavra da tarde é sua.', opcoes=[
    op('abre', 'x3_quero', '— Eu estou com vontade de te beijar. Se você também estiver, eu quero saber agora.', ef=dict(flag='disse_quero', vinculo=1)),
    op('flerte', 'x3_quase', '— Acho que a gente está a um passo de fazer uma coisa que não estava no plano.'),
    op('cuida', 'x3_devagar', '— Sem pressa. Eu não vou a lugar nenhum hoje.'),
    op('seco', 'x3_descer', '— Vamos descer. Eu preciso pensar.'),
  ]),
 ],
 pool=[
  op('cuida', 'pl_luvas', '— Fica com as minhas luvas. As suas são grandes demais.'),
  op('seco', 'pl_depois', '— Isso a gente decide embaixo.'),
  op('flerte', 'pl_cabelo', '— O vento bagunçou o seu cabelo. Ficou bem.'),
  op('abre', 'pl_dificil', '— Eu não sabia que isso ia ser tão fácil de falar aqui em cima.'),
  op('fere', 'pl_fugir', '— Você vai descer correndo? Seria típico.'),
 ],
 fecho="""A luz do último sol toca a ponta da estrela, guardada na caixa de madeira ao lado, e por um segundo a pracinha lá embaixo vira um tanque de ouro. Em cima do andaime, ninguém se mexe.""",
 ir='pp_c6_consente')

NOS['pp_c6_consente'] = dict(tipo='consentimento', cap=6, lugar='Andaime, Cooper Green', hora='Segunda, 22 de dezembro · 17h40',
 texto="""O vento parou, por um momento, como se também esperasse. A seis metros do chão, entre duas barras de aço, o silêncio que sobrou depois da conversa tem a forma exata de uma pergunta.

Ninguém vai perguntar em voz alta. Cada um decide por dentro, e só se os dois quiserem alguma coisa acontece.""",
 pergunta='O que você quer?',
 avancar='Beijar. Agora, aqui em cima, sem plano.',
 ficar='Ficar perto, e ainda não atravessar.',
 flag='beijo_andaime',
 irAvancou='pp_c6_sim', irSem='pp_c6_nao')

NOS['pp_c6_sim'] = dict(tipo='segue', cap=6, lugar='Andaime, Cooper Green', hora='Segunda, 22 de dezembro · 17h42', requer=['beijo_andaime'],
 ir='pp_c6_fim',
 texto="""Não é um beijo de cinema. É curto, e começa meio desajeitado, porque as luvas do seu Szymanski são grandes demais e o nariz de um acerta o do outro. Depois encontra a posição certa, e fica. O frio some por uns segundos. O andaime balança de leve, e nenhum dos dois cai.

Quando se afastam, o rosto de cada um está na mesma cor que o céu, e nenhum deles sabe o que dizer. A primeira luz acesa de verdade da noite aparece, por acaso, na janela da Kessler Hardware, lá embaixo.""")

NOS['pp_c6_nao'] = dict(tipo='segue', cap=6, lugar='Andaime, Cooper Green', hora='Segunda, 22 de dezembro · 17h42', exclui=['beijo_andaime'],
 ir='pp_c6_fim',
 texto="""Nada acontece, e nada acontecer também é um jeito de a noite dizer alguma coisa. Os dois ficam onde estão, perto, a uns dez centímetros um do outro, olhando a rua escura lá embaixo. Ninguém se afasta. Ninguém atravessa.

O andaime balança de leve com o vento que voltou. A primeira luz acesa de verdade da noite aparece, por acaso, na janela da Kessler Hardware, lá embaixo, e os dois, sem combinar, esperam que ela acenda inteira antes de dizer qualquer coisa.""")

NOS['pp_c6_fim'] = dict(tipo='fim', cap=6, lugar='Depósito da Kessler Hardware', hora='Segunda, 22 de dezembro · 20h30',
 texto="""Às oito e meia, os dois voltam ao depósito para guardar as luvas e as cordas. {{se flag:beijo_andaime}}O que aconteceu no andaime ainda está nos lábios e não está em nenhuma lista. {{/se}}{{se !flag:beijo_andaime}}O que não aconteceu no andaime também está em todos os cantos do depósito, e fica entre os dois como uma terceira pessoa que ninguém convidou. {{/se}}{{se flag:cedeu_a}}A nº 8 abriu mão de mil lâmpadas, e ninguém lá em casa sabe disso ainda. {{/se}}{{se flag:cedeu_b}}O ginkgo vai ter um buraco no meio, e ninguém lá em casa sabe disso ainda. {{/se}}{{se flag:duas_metades}}A árvore só acende se os dois interruptores forem apertados no mesmo segundo. {{/se}}

Em cima da mesa de marceneiro, a prancheta azul de {{A.nome}} está aberta no cálculo da carga, com uma folha solta dobrada no meio. Uma janela do depósito, mal fechada, deixa entrar uma rajada de vento que levanta a folha, a sopra pela mesa, e a deixa cair no chão, aberta, de frente para cima.

Não é a folha da carga. É a folha de trás, a que ninguém devia ver: um arquivo impresso, de abas coloridas, com um título comprido, uma data de dois anos atrás, e, na margem, a letra de {{B.nome}}, a lápis, de hoje: *isso é um contrato, não um plano*.""",
 gancho="A planilha caiu no chão, aberta, com uma frase a lápis na margem que ninguém deveria ter lido.",
 ir='pp_c7_manha')
