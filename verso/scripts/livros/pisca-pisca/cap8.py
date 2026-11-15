# Pisca-Pisca · Capítulo 8 · A tempestade (quarta, 24 de dezembro, de dia)
NOS = {}

def op(tom, tag, texto, se=None, ef=None, acao=False):
    d = dict(tom=tom, tag=tag, texto=texto)
    if se: d['se'] = se
    if ef: d['efeitos'] = ef
    if acao: d['acao'] = True
    return d

NOS['pp_c8_tempestade'] = dict(tipo='segue', cap=8, lugar='Cooper Green', hora='Quarta, 24 de dezembro · 07h40', npcs=['odalys', 'szymanski'],
 ir={'A': 'pp_c8_a', 'B': 'pp_c8_b'},
 texto="""A tempestade chega às sete e quarenta, duas horas antes do que o serviço de meteorologia disse e doze antes do que Odalys Quiñones havia agendado. O vento sopra do oeste, em rajadas de sessenta quilômetros, carregando uma neve fina e horizontal que bate nas janelas como areia.

Em Cooper Green, os doze metros de cabo trançado balançam sobre o andaime. Os fios estendidos em espiral, ainda sem lâmpada, vibram como cordas de violão, e o poste de aço, escorado nos três pontos, faz um som grave e metálico de sino. O banco de pedra da pracinha já está coberto até a metade.

Do telhado da Kessler Hardware, o seu Szymanski, de colete laranja por cima de uma parca, aponta para o alto, e a mão treme só um pouco. Ao lado dele, Odalys, de megafone e de gorro de pompom, grita uma coisa que o vento leva embora.

Um dos três cabos de sustentação estala e solta o ponto de amarração. A árvore inteira, por um segundo, se inclina.""")

NOS['pp_c8_a'] = dict(tipo='solo', cap=8, seat='A', lugar='Cooper Green', hora='Quarta, 24 de dezembro · 07h55',
 texto="""Você corre pela neve com a prancheta presa debaixo do casaco, o capuz no rosto e as botas do seu pai. Chega a Cooper Green com o fôlego raspando a garganta e vê o que o vento fez: um dos cabos soltos chicoteando o ar, o tronco da árvore inclinado alguns graus para o lado do beco e, no alto, preso por um só gancho, o suporte onde a estrela ainda nem foi pendurada.

O seu Szymanski grita da calçada, com as mãos em concha: *tem que amarrar o cabo de novo, senão cai tudo!* Mas o cabo está a quatro metros de altura, e o andaime, com o vento, é uma escada de gelo.

Você tem, no máximo, dez minutos.""",
 acoes=[
  dict(id='subir', texto='Subir no andaime e amarrar o cabo sozinh{{eu.o_a}}', ir='pp_c8_familias',
   efeitos=dict(flag='a_amarrou_cabo', abalo=2),
   resultado="""Você sobe, de luvas de couro, de joelhos tremendo e com o vento puxando o casaco como uma mão. Quatro metros nunca foram tão longos. Quando a mão alcança o cabo e o laça de volta no gancho, o seu Szymanski, embaixo, bate palmas com as luvas, e Odalys, pela primeira vez em onze anos, esquece de dar uma ordem."""),
  dict(id='ajuda', texto='Chamar a nonna e o seu pai, e mandar o Nico buscar a Pó-pó e a Lily: precisamos de todo mundo', ir='pp_c8_familias',
   efeitos=dict(flag='a_chamou_todos', vinculo=1),
   resultado="""Você tira o celular, com os dedos duros de frio, e liga, uma por uma, para as pessoas da sua casa. O seu pai atende no primeiro toque. A nonna, de bengala e de terço, já estava descendo a escada quando você disse o primeiro nome. Pela primeira vez, ninguém pergunta quem mais vai estar lá. Você manda uma mensagem à Pó-pó, só *preciso de ajuda*, e vê as duas marcas ficarem azuis."""),
  dict(id='segurar', texto='Segurar o cabo de baixo com as duas mãos e pedir ao seu Szymanski que suba no seu lugar', ir='pp_c8_familias',
   efeitos=dict(flag='a_segurou_cabo', vinculo=1),
   resultado="""Você agarra o cabo preso no chão, planta os pés na neve e puxa, com todo o peso. O seu Szymanski sobe no andaime com uma agilidade que não combina com os setenta e um anos, amarra o gancho em dois movimentos e desce, devagar, soltando uma frase que é quase uma piada: *trinta anos de poste, e é uma pessoa de dezoito anos que me ensina a segurar um cabo*."""),
 ])

NOS['pp_c8_b'] = dict(tipo='solo', cap=8, seat='B', lugar='Estrada', hora='Quarta, 24 de dezembro · 07h55',
 texto="""{{se flag:b_sumiu}}O ônibus de Ithaca parou às sete e dez, em Binghamton, quando a neve fechou o trecho da I-81. A entrevista das nove foi trocada, às pressas, por uma chamada de vídeo no saguão de um posto de gasolina, com sinal fraco e um cheiro de café queimado. Na tela, uma professora de óculos redondos e voz lenta pergunta por que você quer estudar arquitetura.{{/se}}{{se !flag:b_sumiu}}Você acorda no sofá de uma sala do Brooklyn, com o rosto marcado pela almofada e o celular a oito por cento. Pela janela, a neve passa na horizontal. No alerta, uma mensagem da Odalys: *a árvore está em perigo, todo mundo para Cooper Green, AGORA.*{{/se}}

{{se flag:b_sumiu}}A pergunta é simples e você a ensaiou a vida inteira. Mas a pergunta que tem do outro lado do vidro é outra: *o que você vai fazer a seguir?*{{/se}}{{se !flag:b_sumiu}}Você calça as botas, ainda de casaco molhado, e sai pela porta antes de pensar.{{/se}}""",
 acoes=[
  dict(id='verdade', texto='{{se flag:b_sumiu}}Responder à professora com a verdade: sobre o ginkgo, a árvore de doze metros, o desenho{{senao}}Correr até Cooper Green, direto para o andaime{{/se}}', ir='pp_c8_familias',
   efeitos=dict(flag='b_disse_verdade', vinculo=1),
   resultado="""{{se flag:b_sumiu}}Você conta. Sobre o ginkgo de vidro que mediu em quatro madrugadas, e que ninguém da sua família sabia que era seu. Sobre uma árvore de doze metros que dois vizinhos construíram, em seis dias, por decreto, brigando. A professora escuta de olhos fechados, e no fim diz apenas: *essa é a primeira vez que um candidato me descreve um projeto que ainda está em obra.* A conexão cai logo depois, com o gelo, mas o que foi dito foi dito.{{senao}}Você corre pela neve, de braços cruzados contra o vento, e chega a Cooper Green sem fôlego, de rosto vermelho, justo quando o cabo solto chicoteia o ar. Sobe no andaime, sem pensar, e prende o gancho antes que alguém possa dizer não. Embaixo, ouve alguém gritar o seu nome, e é a primeira vez, em dois anos, que o grito soa como alívio.{{/se}}"""),
  dict(id='silencio', texto='{{se flag:b_sumiu}}Responder à professora com respostas boas e vazias, sem falar da árvore{{senao}}Chegar ao fim da rua e esperar do lado de fora antes de entrar{{/se}}', ir='pp_c8_familias',
   efeitos=dict(flag='b_ficou_calado', abalo=1),
   resultado="""{{se flag:b_sumiu}}Você responde bem. Fala de estruturas, de luz, de escala, e a professora anota, e a entrevista termina em doze minutos de frases que qualquer pessoa daria. Você desliga com a sensação de que acabou de fazer uma prova perfeita sobre outra pessoa.{{senao}}Você para na esquina, a vinte metros da pracinha, e fica olhando a árvore balançar. Todo mundo está correndo, gritando, puxando cabo, e você, que sempre soube chegar na hora de desenhar, sente os pés grudados na calçada. Respira três vezes antes de entrar.{{/se}}"""),
  dict(id='voltar', texto='{{se flag:b_sumiu}}Desligar a entrevista no meio e pegar o primeiro ônibus de volta{{senao}}Ligar para a Pó-pó e pedir que ela venha, mesmo com a neve{{/se}}', ir='pp_c8_familias',
   efeitos=dict(flag='b_voltou_cedo', vinculo=1),
   resultado="""{{se flag:b_sumiu}}Você pede desculpas à professora, desliga e corre pelo posto de gasolina até o balcão, onde um motorista de ônibus de bigode grisalho diz que a estrada reabre às onze. *Se o senhor estiver lá às onze, eu estou na primeira fila*, você diz, e ele ri e anota o seu nome numa lista.{{senao}}Você liga, a Pó-pó atende no primeiro toque, em cantonês, e muda para inglês. *Eu já estou na porta, de bota*, ela diz, e desliga antes de você contar o resto. Em dois minutos, a nº 11 inteira desce a rua em fila, de gorro, com a Mei na frente, de pá.{{/se}}"""),
 ])

NOS['pp_c8_familias'] = dict(tipo='dividir', cap=8, lugar='Cooper Green', hora='Quarta, 24 de dezembro · 10h30', cada=1,
 texto="""Às dez e meia, a tempestade está no auge. Nas esquinas de Cooper Green, a neve já passa dos joelhos de um adulto, e o vento derruba o que não está amarrado. A pracinha, que ontem era um canteiro de obras de quatro pessoas, é agora um formigueiro.

Os Tedeschi chegaram em fila, de gorro, com a nonna Concetta apoiada no braço do filho. Os Lau chegaram do outro lado, com a Pó-pó apoiada na bengala e a Mei empurrando uma pá maior do que ela. Os dois grupos se encontram no centro, em volta do andaime, a menos de cinco metros um do outro. Ninguém se cumprimenta. Ninguém vai embora.""",
 pergunta='O que você faz com a árvore e com as duas famílias?',
 acoes=[
  dict(id='cabos', texto='Dividir quem segura cada cabo: um Tedeschi e um Lau em cada um', efeitos=dict(flag='cabos_misturados', vinculo=1),
   resultado="""Você aponta para cada cabo e diz, alto, quem segura: *Sal, o da esquerda, com a Lily. Nonna, fica de fiscal. Pó-pó, de fiscal do outro lado.* Em um minuto, doze pessoas de duas famílias que não se falavam seguram, juntas, doze metros de cabo na neve. O vento puxa e todos puxam de volta."""),
  dict(id='cafe', texto='Mandar os dois mais velhos para a Kessler, fazer café e sopa para todo mundo', efeitos=dict(flag='sopa_na_kessler', vinculo=1),
   resultado="""Você leva a nonna e a Pó-pó, uma em cada braço, para o fundo da Kessler Hardware, onde Gus Pappas já acendeu o fogão a gás e está fatiando cebola. As duas senhoras se sentam lado a lado, com cobertores sobre os joelhos, e olham para a sopa. Nenhuma diz nada. Depois a nonna parte um pão ao meio e entrega a metade à outra."""),
  dict(id='estrela', texto='Ir buscar a estrela no depósito, antes que o vento leve alguma coisa', efeitos=dict(flag='buscou_estrela'),
   resultado="""Você atravessa a rua curva, de cabeça baixa, até o depósito, e levanta a estrela de oito pontas da mesa de marceneiro com as duas mãos, como quem carrega um prato quente. Pesa mais do que parece: trinta e oito anos de espera cabem em quatro quilos de latão. No caminho de volta, o vento tenta tirar a estrela das suas mãos, e você a abraça, de peito, até a praça."""),
 ],
 desfecho="""Às onze e vinte, a tempestade começa a ceder. Os cabos foram amarrados, a neve foi aberta com pá em volta do tronco e a árvore, doze metros de aço e fio, ainda está de pé. Em volta dela, de gorro, de luva, de nariz vermelho, está um bairro inteiro que ontem estava em guerra.""",
 ir='pp_c8_dialogo')

NOS['pp_c8_dialogo'] = dict(tipo='dialogo', cap=8, lugar='Kessler Hardware, fundos', hora='Quarta, 24 de dezembro · 12h00', comeca='B',
 texto="""Meio-dia, e o vento é só um assobio. Os dois, molhados até os ossos, de roupa pingando, encontram no fundo da Kessler Hardware um canto vazio, entre prateleiras de parafusos, e uma térmica de café que alguém deixou ali.

A briga de ontem ainda está nas duas bocas. Mas a manhã deixou um tipo de cansaço que torna difícil gritar.""",
 turnos=[
  dict(prompt='A primeira frase é sua.', opcoes=[
    op('abre', 'z0_voltei', '— Eu voltei. Não fugi até o fim. Isso é novo para mim.', ef=dict(vinculo=1)),
    op('cuida', 'z0_cafe', '— Toma o café. Está horrível, mas está quente.'),
    op('seco', 'z0_arvore', '— A árvore ficou de pé. Era o que importava.'),
    op('fere', 'z0_sumir', '— Você voltou porque ia dar errado se não voltasse. Não porque quis.', ef=dict(abalo=1)),
  ]),
  dict(prompt='Agora é você quem responde.', opcoes=[
    op('abre', 'z1_quis', '— Eu quis. Eu quis muito. Eu só não sabia como dizer isso sem parecer promessa.', ef=dict(vinculo=1)),
    op('abre', 'z1_li', '— Eu li o Plano B. Eu vi que você previu que eu ia embora.', se='flag:b_leu_plano_b', ef=dict(vinculo=1)),
    op('cuida', 'z1_frio', '— Você está tremendo. Fica mais perto do aquecedor.'),
    op('seco', 'z1_depois', '— A gente fala disso depois da árvore.'),
  ]),
  dict(prompt='A conversa é sua de novo.', opcoes=[
    op('abre', 'z2_cornell', '— Eu vou saber de Cornell no dia 25. Se eu entrar, eu não sei se vou. Mas eu quero decidir olhando para você.', se='flag:confessou_cornell || flag:confessou_cornell_festa || flag:a_leu_caderno', ef=dict(vinculo=1)),
    op('abre', 'z2_plano', '— O plano de dois anos atrás era meu jeito de pedir que você ficasse. Eu pedi errado.', ef=dict(vinculo=1)),
    op('flerte', 'z2_topo', '— Se a gente sobreviver a essa tempestade, eu quero subir de novo no andaime. Sem corda.'),
  ]),
  dict(prompt='A última palavra da manhã é sua.', opcoes=[
    op('abre', 'z3_juntos', '— A gente acende isso junto. De qualquer jeito.', ef=dict(vinculo=2)),
    op('seco', 'z3_hora', '— Sete da noite. Eu estou lá.'),
    op('flerte', 'z3_beijo', '— Depois da árvore, a gente continua de onde parou.'),
  ]),
 ],
 pool=[
  op('cuida', 'pl_sopa', '— Come alguma coisa. A sopa do Gus é boa.'),
  op('seco', 'pl_depois', '— Depois.'),
  op('flerte', 'pl_gorro', '— Seu gorro está torto. Ficou ótimo.'),
  op('abre', 'pl_cansaco', '— Eu estou cansad{{eu.o_a}}, mas é um cansaço bom.'),
  op('fere', 'pl_fugir', '— Eu só queria que você tivesse ficado ontem.'),
 ],
 fecho="""Pela vitrine da Kessler, a neve cai mais devagar. Do lado de fora, o seu Szymanski, de colete laranja, tira o gorro, olha para o céu e anota alguma coisa na palma da mão.""",
 ir='pp_c8_estrela')

NOS['pp_c8_estrela'] = dict(tipo='decisao', cap=8, lugar='Cooper Green', hora='Quarta, 24 de dezembro · 15h30',
 texto="""A tempestade passou. O céu está branco e baixo, e o vento caiu para uma brisa. Em Cooper Green, a árvore está de pé, sem lâmpada nenhuma, esperando as cinco mil lâmpadas, os fios do ginkgo e a estrela de oito pontas.

Faltam três horas e meia. O seu Szymanski diz que a estrela, para acender, precisa ser testada. Mas testar, no meio da neve, significa uma coisa: ligar o transformador.""",
 pergunta='O que vocês fazem com a estrela agora?',
 ir='pp_c8_fim',
 acoes=[
  dict(id='testar', texto='Testar a estrela agora, com o transformador, antes de subi-la', efeitos=dict(flag='testou_estrela', abalo=1),
   resultado="""Vocês decidem testar. O seu Szymanski liga o transformador, devagar, com a mão em cima do disjuntor, e os dois, de joelhos na neve, ligam os oito fios da estrela. Uma pausa de um segundo e meio, comprida demais, e nada acontece. Nenhuma das oito pontas acende."""),
  dict(id='subir', texto='Subir a estrela agora e testar tudo junto, no horário, às sete', efeitos=dict(flag='subiu_estrela', vinculo=1),
   resultado="""Vocês decidem não testar. A estrela vai para o alto, pendurada pelos oito pontos, com a promessa tácita de que o primeiro teste vai ser o único. Subir uma estrela sem prova, em dezembro, é um ato de fé, e fé, em Dyker Heights, é um tipo de engenharia."""),
  dict(id='abrir', texto='Abrir a estrela ali mesmo, na neve, para ver o motor por dentro', efeitos=dict(flag='abriu_estrela'),
   resultado="""Vocês decidem abrir. O seu Szymanski desparafusa a tampa de latão no centro da estrela, com a ponta de uma moeda, e os três se debruçam sobre um motorzinho de relógio, engrenagens do tamanho de uma unha, e um fio fino, cortado ao meio, que alguém soldou e cobriu de fita, e esqueceu."""),
 ])

NOS['pp_c8_fim'] = dict(tipo='fim', cap=8, lugar='Cooper Green', hora='Quarta, 24 de dezembro · 18h10',
 texto="""Às seis e dez, a pracinha de Cooper Green começa a encher. Cinquenta pessoas, depois duzentas, depois quatrocentas, todas de gorro e de copo de chocolate quente na mão, vindas das doze casas, da avenida, da igreja de cima. Gus Pappas montou uma barraca de pretzel ao lado do coreto. Odalys, de megafone com bateria nova, ensaia a contagem regressiva sob um poste.

{{se flag:testou_estrela}}O teste da tarde não acendeu nem uma ponta, e o seu Szymanski, sem dizer nada, passou uma hora com o ferro de solda. {{/se}}{{se flag:subiu_estrela}}A estrela está a doze metros, pendurada nos oito pontos, e ninguém sabe se ela acende. {{/se}}{{se flag:abriu_estrela}}O fio cortado do motor foi emendado, mas o seu Szymanski admitiu, em voz baixa, que *a emenda é de quem sabe de fio, não de quem sabe de estrela*. {{/se}}

Seis e cinquenta e três. As duas casas, a nº 8 e a nº 11, sem luz desde o dia 17, ligadas à árvore pelos cabos de aço, aguardam. Em um minuto, o transformador da cidade vai ser religado, e a árvore, doze metros de aço, fio e história, vai acender, ou não.

No topo, a estrela de oito pontas gira, devagar, empurrada pelo vento. Nenhuma lâmpada acende. Nenhuma, nenhuma, nenhuma.""",
 gancho="A estrela de 1987 não acende a sete minutos da Noite da Árvore.",
 ir='pp_rascunho_fim')
