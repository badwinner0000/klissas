# A Última Promoção · Capítulo 3 · O quarto único
NOS = {}

def op(tom, tag, texto, se=None, ef=None, acao=False):
    d = dict(tom=tom, tag=tag, texto=texto)
    if se: d['se'] = se
    if ef: d['efeitos'] = ef
    if acao: d['acao'] = True
    return d

NOS['up_c3_manha'] = dict(tipo='segue', cap=3, lugar='Quarto 412, Hotel Imperial', hora='Sexta · 18h00',
 ir='up_c3_dividir',
 texto="""O quarto 412, às seis da tarde de sexta-feira, tem a luz de um fim de tarde vienense entrando pela janela do Ring, dourada e oblíqua, como se alguém tivesse pedido ao sol que se comportasse. Há duas malas, um frigobar com preços impossíveis e uma cama king que, com o passar das horas, parece ficar maior.

Ninguém dormiu direito. Os dois têm trinta e cinco horas de viagem nas costas e uma apresentação de nove da manhã na frente, e o único assunto que importa, a cama, ficou para depois, o que é uma maneira de dizer que ficou no meio do quarto.

{{se flag:quarto_unico}}Vocês aceitaram o quarto. {{/se}}{{se flag:procurou_outro}}Vocês tentaram todos os hotéis de Viena. {{/se}}{{se flag:ligou_priya}}Vocês ligaram para a Priya, e a Priya disse a verdade em quatro segundos. {{/se}}Nada disso importa agora. O que importa é que há um sofá de um metro e sessenta e cinco, um banheiro com uma banheira de cobre, uma TV de sessenta polegadas e duas pessoas com ideias diferentes sobre cada um deles.""")

NOS['up_c3_dividir'] = dict(tipo='dividir', cap=3, lugar='Quarto 412, Hotel Imperial', hora='Sexta · 19h30', cada=1,
 texto="""Às sete e meia, o quarto vira um território em disputa, sem que ninguém tenha dito a palavra *disputa*. A TV só tem um controle remoto. O banheiro tem um chuveiro e uma banheira, mas só um espelho. O frigobar tem uma garrafa de vinho austríaco que custa quarenta e oito euros, e uma cesta de snacks que custa o equivalente a um jantar.

Cada um dos dois precisa de alguma coisa, e o quarto só tem uma de cada.""",
 pergunta='O que você reivindica primeiro?',
 acoes=[
  dict(id='tv', texto='Pegar o controle da TV e procurar o canal de notícias', efeitos=dict(flag='pegou_tv'),
   resultado="""Você pega o controle antes de qualquer pergunta e acha um canal austríaco de notícias, em alemão, com legendas em inglês passando devagar demais. É uma vitória pequena, e você a aceita. O som de um apresentador de gravata falando de câmbio é o mais próximo de casa que existe naquele quarto."""),
  dict(id='chuveiro', texto='Ir direto para o chuveiro, antes que a água quente acabe', efeitos=dict(flag='pegou_chuveiro'),
   resultado="""Você entra no banheiro com a necessidade de quem não toma banho há um dia e meio. A água quente chega, depois de um minuto, em jato firme. Do outro lado da porta, o barulho da TV e de uma voz que está fingindo que não está ouvindo o chuveiro. Você tranca a porta duas vezes, e deixa a água cair por tempo demais."""),
  dict(id='cama', texto='Escolher o lado da cama e arrumar o travesseiro, declarando território', efeitos=dict(flag='pegou_cama', vinculo=1),
   resultado="""Você escolhe o lado da janela, bate duas vezes no travesseiro e deita por cima da colcha, de sapatos, com a atitude de quem diz *eu cheguei primeiro*. A outra pessoa olha para a cama, olha para você, e senta na ponta oposta do colchão, a um metro de distância, com a cara de quem aceita uma fronteira sem concordar com ela."""),
 ],
 desfecho="""Às oito e meia, depois de uma hora de acordos não ditos, o quarto tem uma geografia: um lado, o outro lado, e um espaço no meio que ninguém nomeia. Alguém, com a voz de quem chega à conclusão a que todos chegaram, propõe estabelecer regras.""",
 ir='up_c3_dialogo')

NOS['up_c3_dialogo'] = dict(tipo='dialogo', cap=3, lugar='Quarto 412, Hotel Imperial', hora='Sexta · 21h00', comeca='A',
 texto="""Às nove da noite, com o banho tomado, a TV desligada e uma garrafa de vinho aberta sobre a escrivaninha, os dois sentam em lados opostos do quarto, cada um em uma poltrona de veludo, com um copo na mão e uma folha de papel do hotel entre os dois.

Alguém, em algum momento, vai ter de escrever a primeira regra.""",
 turnos=[
  dict(prompt='A primeira frase é sua.', opcoes=[
    op('seco', 'g0_a_seco', '— Regra um: ninguém toca no lado do outro da cama. Nem de manhã, nem por acidente.', se='eu:A'),
    op('flerte', 'g0_a_flerte', '— Regra um: quem acordar primeiro faz o café. É só justiça.', se='eu:A'),
    op('cuida', 'g0_a_cuida', '— Regra um: se um dos dois precisar de espaço, avisa. Sem explicação.', se='eu:A'),
    op('seco', 'g0_b_seco', '— Regra um: o chuveiro tem horário. Eu levanto às seis, você às sete.', se='eu:B'),
    op('flerte', 'g0_b_flerte', '— Regra um: quem roncar paga o café da manhã. Eu aviso que eu não ronco, mas não tenho testemunhas.', se='eu:B'),
    op('abre', 'g0_b_abre', '— Regra um: a gente pode brigar o quanto quiser durante o dia, mas à noite o quarto é território neutro.', se='eu:B', ef=dict(vinculo=1)),
  ]),
  dict(prompt='Agora você responde.', opcoes=[
    op('seco', 'g1_a_seco', '— Aceito. Regra dois: sem conversa sobre a vaga depois das dez da noite.', se='eu:A'),
    op('fere', 'g1_a_fere', '— Regra dois: você não usa o meu xampu. Eu vi que você olhou.', se='eu:A', ef=dict(abalo=1)),
    op('abre', 'g1_a_abre', '— Regra dois: se um dos dois sonhar alto, o outro finge que não ouviu.', se='eu:A', ef=dict(vinculo=1)),
    op('seco', 'g1_b_seco', '— Aceito. Regra dois: a TV fica no volume dois depois das dez.', se='eu:B'),
    op('fere', 'g1_b_fere', '— Regra dois: você não me olha como se eu fosse um problema de planilha.', se='eu:B', ef=dict(abalo=1)),
    op('flerte', 'g1_b_flerte', '— Regra dois: ninguém se oferece para dormir no sofá. É um sofá de metro e sessenta e cinco, sejamos honestos.', se='eu:B'),
  ]),
  dict(prompt='A conversa é sua de novo.', opcoes=[
    op('flerte', 'g2_a_flerte', '— Regra três: o sofá é meu. Eu durmo em qualquer lugar. É uma habilidade.', se='eu:A'),
    op('cuida', 'g2_a_cuida', '— Regra três: ninguém dorme no sofá. A cama é grande. Eu confio em você para ficar do seu lado.', se='eu:A', ef=dict(flag='a_confiou_cama', vinculo=1)),
    op('seco', 'g2_a_seco', '— Regra três: ninguém fala do que aconteceu em Chicago. Aqui, somos colegas.', se='eu:A'),
    op('flerte', 'g2_b_flerte', '— Regra três: eu durmo no sofá, porque sou um cavalheiro. Ou porque sou teimoso. Dá no mesmo.', se='eu:B'),
    op('cuida', 'g2_b_cuida', '— Regra três: ninguém dorme no sofá. Eu confio que você vai ficar do seu lado.', se='eu:B', ef=dict(flag='b_confiou_cama', vinculo=1)),
    op('seco', 'g2_b_seco', '— Regra três: ninguém fala de trabalho no jantar. A gente precisa comer.', se='eu:B'),
  ]),
  dict(prompt='A última regra da noite é sua.', opcoes=[
    op('abre', 'g3_a_abre', '— Regra quatro: se alguém tiver medo, avisa. Eu aviso primeiro, se for o caso.', se='eu:A', ef=dict(vinculo=1)),
    op('flerte', 'g3_a_flerte', '— Regra quatro: se a gente perder a vaga, a gente perde junto e pede pizza.', se='eu:A'),
    op('seco', 'g3_a_seco', '— Regra quatro: nada de rir da cara do outro às seis da manhã.', se='eu:A'),
    op('abre', 'g3_b_abre', '— Regra quatro: se alguém precisar de ajuda, pede. Em voz alta. Eu sei que é difícil.', se='eu:B', ef=dict(vinculo=1)),
    op('flerte', 'g3_b_flerte', '— Regra quatro: quem perder a vaga leva o vencedor para jantar. Em Viena. Com vinho.', se='eu:B'),
    op('seco', 'g3_b_seco', '— Regra quatro: nada de acordar o outro com ruído de teclado.', se='eu:B'),
  ]),
 ],
 pool=[
  op('seco', 'pl_seco', '— Anotado. Próximo.'),
  op('cuida', 'pl_cuida', '— Quer mais vinho?'),
  op('flerte', 'pl_flerte', '— Você é mais divertido do que eu imaginava. Isso me irrita.'),
  op('abre', 'pl_abre', '— Eu não esperava gostar de fazer lista com você.'),
  op('fere', 'pl_fere', '— Você sempre faz regra para controlar o que não consegue.'),
 ],
 fecho="""A folha de papel do hotel, no fim, tem quatro regras, uma mancha de vinho no canto e as duas assinaturas, uma em cima da outra, na parte de baixo, como se tivessem sido feitas pela mesma mão.""",
 ir='up_c3_decisao')

NOS['up_c3_decisao'] = dict(tipo='decisao', cap=3, lugar='Quarto 412, Hotel Imperial', hora='Sexta · 23h10',
 texto="""Meia-noite menos cinquenta. A luz do abajur é amarela, a janela está entreaberta, e o Ring, lá embaixo, tem o silêncio de uma cidade que se recolhe cedo. Falta resolver a única coisa que ficou fora das regras: onde cada um dorme.""",
 pergunta='Como vocês dormem?',
 ir={'A': 'up_c3_noite_a', 'B': 'up_c3_noite_b'},
 acoes=[
  dict(id='cama', texto='Os dois na cama, cada um no seu lado, com um travesseiro no meio', efeitos=dict(flag='dormiram_cama', vinculo=1),
   resultado="""Vocês dividem a cama, com a lógica de duas pessoas adultas e a vergonha de duas crianças. Um travesseiro no meio, uma colcha por cima de cada um, e a certeza de que, se alguém acordar com o travesseiro no chão, ninguém vai comentar."""),
  dict(id='sofa', texto='Um na cama, o outro no sofá, e amanhã a gente revezam', efeitos=dict(flag='dormiram_sofa'),
   resultado="""Vocês decidem pelo sofá: quem estiver menos cansado, hoje, dorme nele. A noite vai ser longa, com os pés para fora do braço, a coluna em ângulo reto e o frio entrando pela janela. Quem perde na pedra, papel e tesoura, ganha uma colcha extra."""),
  dict(id='chao', texto='Fazer uma cama no chão com os cobertores e os travesseiros extras', efeitos=dict(flag='dormiram_chao', abalo=1),
   resultado="""Vocês montam uma cama improvisada no tapete, com os travesseiros extras e dois cobertores de lã. Parece um acampamento no meio de um hotel de cinco estrelas, e tem um quê de aventura que nenhum dos dois quer admitir. O chão é duro, e a ideia, estranhamente, é boa."""),
 ])

NOS['up_c3_noite_a'] = dict(tipo='solo', cap=3, seat='A', lugar='Quarto 412, Hotel Imperial', hora='Sábado · 01h30',
 texto="""À uma e meia da manhã, no escuro do quarto 412, com a respiração da outra pessoa ao lado e o ruído distante de um bonde na Ring, você está acordad{{eu.o_a}}. Está com o laptop fechado, o celular em silêncio e os olhos abertos para o teto.

Na tela do celular, ainda aberta desde o aeroporto, a fotografia da página do arquivo da aquisição: *US$ 41 milhões*, uma nota de rodapé, uma matrícula de usuário: *MW-0017*. Na outra mão, o cartão de Marcus que veio com o champanhe: *À dupla.* Você compara as duas letras, a do cartão e a da nota de rodapé, e a coincidência, que não é coincidência, não deixa você dormir.""",
 acoes=[
  dict(id='contar', texto='Acordar a pessoa ao lado e contar o que descobriu', ir='up_c3_fim',
   efeitos=dict(flag='a_contou_fraude', vinculo=2),
   resultado="""Você sussurra o nome da pessoa ao lado, no escuro. A resposta vem em dois segundos, de quem já estava acordad{{B.o_a}}. Você conta: o arquivo, a diferença de quarenta e um milhões, a matrícula, a nota de rodapé. Do outro lado do travesseiro, o silêncio dura tanto que você pensa que fez a pior escolha da sua carreira. Depois, em voz baixa: *eu estava esperando você contar.*"""),
  dict(id='guardar', texto='Guardar a informação até ter provas, e não dizer nada a ninguém', ir='up_c3_fim',
   efeitos=dict(flag='a_guardou_fraude', abalo=1),
   resultado="""Você apaga a tela do celular e deita de lado, de costas para a outra pessoa. A informação continua com você, no escuro, como um segundo travesseiro. Só dizer o que você pode provar é uma regra que você aprendeu a duras penas, e que hoje, pela primeira vez, parece mais solidão do que prudência."""),
  dict(id='buscar', texto='Levantar sem fazer barulho e procurar mais no laptop, no banheiro, de luz apagada', ir='up_c3_fim',
   efeitos=dict(flag='a_buscou_mais', abalo=1),
   resultado="""Você levanta sem fazer ruído, pega o laptop e tranca a porta do banheiro. Sentad{{eu.o_a}} na borda da banheira de cobre, com a tela como única luz, procura. Acha mais duas edições do mesmo usuário, as duas em datas de quinta à noite. Marcus Webb tem um hábito, o de mexer nos documentos tarde da noite, quando acha que ninguém olha."""),
 ])

NOS['up_c3_noite_b'] = dict(tipo='solo', cap=3, seat='B', lugar='Quarto 412, Hotel Imperial', hora='Sábado · 01h30',
 texto="""À uma e meia da manhã, no escuro do quarto, você está acordad{{eu.o_a}}. Não é insônia: é costume. Em cinco anos de escritório, o seu corpo aprendeu a dormir em turnos de quatro horas, e agora, numa cama de hotel de seiscentos euros, ele acorda no horário certo, como um relógio despertador ressentido.

A respiração ao lado é leve, mas não é de quem dorme. Você conhece a diferença. É a respiração de quem finge.

O celular vibra duas vezes, debaixo do travesseiro. A Chloe, de Chicago, em hora de almoço: *Achei uma coisa. Ligação de três diretores que saíram. Todos viram o Marcus assinar a mesma coisa. Uma auditoria que nunca foi publicada. Me liga.*""",
 acoes=[
  dict(id='ligar', texto='Sair para o corredor e ligar para a Chloe agora', ir='up_c3_fim',
   efeitos=dict(flag='b_ligou_chloe', vinculo=1),
   resultado="""Você veste o casaco por cima do pijama e sai para o corredor de tapete vermelho. A Chloe atende no primeiro toque, com a voz de quem não dormiu. *Uma auditoria interna*, diz ela, *de dois anos atrás. O Marcus assinou o relatório final, mas a versão pública não tem a página dezessete.* Você pergunta quem tem acesso à página. *Quem escreveu o valuation*, ela diz. *A sua concorrente.*"""),
  dict(id='esperar', texto='Esperar até de manhã para ouvir a Chloe, e ficar quieto no escuro', ir='up_c3_fim',
   efeitos=dict(flag='b_esperou_chloe'),
   resultado="""Você deixa o celular onde está e fica deitad{{eu.o_a}}, de olhos abertos, ouvindo a respiração do outro lado do colchão. É estranho: nos últimos cinco anos, a coisa mais próxima de companhia que você teve foi o ruído da geladeira do escritório. Esta noite, o ruído tem forma, calor, e um jeito de fingir que dorme."""),
  dict(id='falar', texto='Perguntar baixinho, no escuro, se a pessoa ao lado ainda está de olhos abertos', ir='up_c3_fim',
   efeitos=dict(flag='b_perguntou_acordada', vinculo=2),
   resultado="""— Você também está acordad{{A.o_a}}? — você pergunta, em voz que mal chega ao travesseiro. A resposta demora três segundos. *Estou*, diz a voz do outro lado, *e estou com uma coisa para te contar. Mas só se você prometer não rir.* Você promete. Do outro lado, uma respiração funda, a de quem vai pular de um lugar alto."""),
 ])

NOS['up_c3_fim'] = dict(tipo='fim', cap=3, lugar='Quarto 412, Hotel Imperial', hora='Sábado · 07h00',
 texto="""O despertador do hotel toca às sete em ponto, com um acorde de piano que parece ter sido composto para ofender. O quarto 412 tem, a esta hora, uma luz cinza e fria, uma TV ligada sem som, uma cama king que alguém, durante a noite, ocupou por inteiro, e um bilhete de papel timbrado que alguém, durante a madrugada, escreveu e deixou na escrivaninha.

{{se flag:dormiram_cama}}Vocês dividiram a cama, com um travesseiro no meio. De manhã, o travesseiro estava no chão. {{/se}}{{se flag:dormiram_sofa}}Um dos dois dormiu no sofá de um metro e sessenta e cinco e acordou com a coluna em formato de ponto de interrogação. {{/se}}{{se flag:dormiram_chao}}Vocês dormiram no tapete, e o tapete, de manhã, tinha as marcas de duas pessoas que, de algum modo, se aproximaram. {{/se}}{{se flag:a_contou_fraude}}O que foi contado de madrugada, no escuro, agora está sobre a escrivaninha, escrito à mão em papel do hotel. {{/se}}

Antes que alguém possa dizer bom dia, o celular de cada um vibra, no mesmo segundo. Um e-mail do Marcus, enviado às 6h58, de um telefone, com um erro de digitação que ele jamais cometeria em horário comercial:

*Pequena mudança: as duas apresentações serão no MESMO dia, às 9h, na MESMA sala. O grande palco, o Salão Strauss. Avisem a equipe de tecnologia que, para a dupla, só haverá um projetor. — M.*

A palavra *um* vem em negrito.""",
 gancho="As apresentações são hoje, às 9h, no mesmo palco, e só há um projetor.",
 ir='up_c4_apresentacao')
