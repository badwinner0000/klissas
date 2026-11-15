# Refrão de Verão · Capítulo 9 · A Despedida
NOS = {}

def op(tom, tag, texto, se=None, ef=None, acao=False):
    d = dict(tom=tom, tag=tag, texto=texto)
    if se: d['se'] = se
    if ef: d['efeitos'] = ef
    if acao: d['acao'] = True
    return d

NOS['rv_c9_despedida'] = dict(tipo='segue', cap=9, lugar='Chalé dos Ashby', hora='Sexta · 29 de agosto · 08h00', npcs=['lorna'],
 ir='rv_c9_dialogo',
 texto="""O último dia de agosto, ou quase: sexta, vinte e nove. As folhas dos pinheiros mudaram de verde para um verde mais cansado, o riacho está baixo, e o céu da manhã tem uma limpeza de quem sabe que a estação vai virar. No chalé do velho Henry, as janelas estão abertas, as malas de seiscentos dólares fechadas, e um carro preto, o mesmo da chegada, está estacionado no cascalho, com um motorista de óculos escuros que lê o jornal sem ler.

{{se flag:aceitou_voltar}}Lorna Feldt avisou: o carro leva a Seattle para a turnê, que começa no dia dois. {{/se}}{{se flag:cancelou_turne}}Lorna Feldt avisou: a turnê foi cancelada, mas o contrato do show de Seattle, o último, de dezoito mil ingressos já vendidos, não pode ser desfeito sem uma multa que a gravadora não perdoa. É por esse show, e só por ele, que o carro está ali. {{/se}}{{se flag:negociou_volta}}Lorna Feldt avisou: a gravadora aceitou três semanas, e o primeiro compromisso é em Seattle, no dia dois, num show que não dá para adiar. {{/se}}

O álbum, de doze faixas, está pronto, e o chalé, depois de três meses, tem a forma de uma pessoa que mora ali. Falta uma coisa: o carpinteiro, que não sobe a estrada desde terça.""")

NOS['rv_c9_dialogo'] = dict(tipo='dialogo', cap=9, lugar='Varanda do chalé dos Ashby', hora='Sexta · 09h30', comeca='B',
 texto="""Às nove e meia da manhã, uma picape de 1998 sobe a estrada de terra, devagar, com o motor de gato com raiva. Estaciona atrás do carro preto. O carpinteiro desce, de boné, de camiseta de banda, de mãos nos bolsos. Não traz caixa de ferramentas, nem rádio.

Há três meses, os dois se conheceram numa varanda, a dois metros de distância. A distância, agora, é a mesma. Só mudou o que cabe dentro dela.""",
 turnos=[
  dict(prompt='A primeira frase é sua.', opcoes=[
    op('seco', 'y0_b_seco', '— Eu vim ver a calha. Está firme. Não precisa mexer em nada.', se='eu:B'),
    op('abre', 'y0_b_abre', '— Eu vim dizer tchau. Eu não sei como se faz isso. Eu nunca fiz direito.', se='eu:B', ef=dict(vinculo=1)),
    op('flerte', 'y0_b_flerte', '— O carro preto é bonito. Não tem goteira, né?', se='eu:B'),
    op('abre', 'y0_a_abre', '— Eu esperei que você viesse. Eu não sabia se ia vir. Eu estou feliz por ter vindo.', se='eu:A', ef=dict(vinculo=1)),
    op('seco', 'y0_a_seco', '— Você demorou. O carro sai ao meio-dia.', se='eu:A'),
    op('flerte', 'y0_a_flerte', '— A calha está ótima. O carpinteiro, nem tanto.', se='eu:A'),
  ]),
  dict(prompt='Agora você responde.', opcoes=[
    op('abre', 'y1_a_abre', '— O álbum está pronto. Doze faixas. A última, eu escrevi para você, sem nome.', se='eu:A', ef=dict(vinculo=2)),
    op('seco', 'y1_a_seco', '— Eu volto a Seattle hoje. Não é o fim do mundo. Tem estrada.', se='eu:A'),
    op('fere', 'y1_a_fere', '— Você sempre foge antes de ser deixado. Hoje, só está sendo mais rápido.', se='eu:A', ef=dict(abalo=1)),
    op('abre', 'y1_b_abre', '— Eu vou ouvir. Quando sair. Eu vou ouvir a última faixa, e vou saber que é para mim.', se='eu:B', ef=dict(vinculo=2)),
    op('seco', 'y1_b_seco', '— Boa viagem. A estrada de Republic tem buracos. O motorista que se cuide.', se='eu:B'),
    op('fere', 'y1_b_fere', '— Você vai voltar a ser famos{{A.o_a}}, e eu vou voltar a ser quem conserta telhado. É natural.', se='eu:B', ef=dict(abalo=1)),
  ]),
  dict(prompt='A conversa é sua de novo.', opcoes=[
    op('abre', 'y2_b_abre', '— Eu não vou à festa de despedida. Eu não consigo. Se eu for, eu peço para você ficar. E eu não tenho direito.', se='eu:B', ef=dict(flag='b_avisou_festa', vinculo=1)),
    op('seco', 'y2_b_seco', '— Eu tenho trabalho hoje à noite. A Lanterna é a casa da Doris. Você vai se despedir lá, sem mim.', se='eu:B'),
    op('flerte', 'y2_b_flerte', '— Se você aparecer em Pine Hollow de novo, a calha vai estar esperando.', se='eu:B'),
    op('abre', 'y2_a_abre', '— Eu queria que você fosse. Mas eu entendo. Eu também não aguentaria.', se='eu:A', ef=dict(vinculo=1)),
    op('seco', 'y2_a_seco', '— A despedida é um direito, não uma obrigação. Eu entendo.', se='eu:A'),
    op('fere', 'y2_a_fere', '— Então você vai me deixar ir sem uma palavra. É isso?', se='eu:A', ef=dict(abalo=1)),
  ]),
  dict(prompt='A última palavra da varanda é sua.', opcoes=[
    op('abre', 'y3_a_abre', '— Eu te amo. Eu não sei o que fazer com isso. Mas eu precisava dizer em voz alta, uma vez.', se='eu:A', ef=dict(flag='disse_amo_a', vinculo=2)),
    op('seco', 'y3_a_seco', '— Cuida do violão do seu pai. E do telhado. Foi o melhor que eu vi na vida.', se='eu:A'),
    op('flerte', 'y3_a_flerte', '— Se um dia você quiser ouvir um show de verdade, eu mando ingresso.', se='eu:A'),
    op('abre', 'y3_b_abre', '— Eu também. Mas eu não sei dizer. Eu escrevo, um dia, se eu aprender.', se='eu:B', ef=dict(flag='disse_amo_b', vinculo=2)),
    op('seco', 'y3_b_seco', '— Boa viagem. Tchau.', se='eu:B'),
    op('flerte', 'y3_b_flerte', '— O violão fica aqui, até você pedir de volta. É o penhor.', se='eu:B'),
  ]),
 ],
 pool=[
  op('cuida', 'pl_cuida', '— Come alguma coisa antes de viajar.'),
  op('seco', 'pl_seco', '— Ok.'),
  op('flerte', 'pl_flerte', '— Foi um bom verão.'),
  op('abre', 'pl_abre', '— Eu não sei como fazer isso.'),
  op('fere', 'pl_fere', '— Era isso que eu esperava.'),
 ],
 fecho="""A picape, sem pressa, dá marcha a ré e desce a estrada de terra, e o motor de gato com raiva some entre os pinheiros. O motorista do carro preto, que ouviu tudo e fingiu que lia, vira a página do jornal.""",
 ir={'A': 'rv_c9_a', 'B': 'rv_c9_b'})

NOS['rv_c9_a'] = dict(tipo='solo', cap=9, seat='A', lugar='Quarto do avô, chalé dos Ashby', hora='Sexta · 11h00',
 texto="""Às onze da manhã, no quarto do avô, com o sol atravessando a cortina de renda amarelada, você tem duas malas abertas, uma cama de dossel, uma caixa de sapatos com quarenta e três cartas e um caderno de capa preta, com doze músicas, todas escritas ali, todas inacabadas à sua maneira.

Você olha as coisas, uma por uma. Há o que você leva: o violão, as roupas, a fotografia de uma menina de maria-chiquinha. E o que você deixa, se deixar: os dias, os cheiros, o riacho. O caderno é a única coisa que cabe nas duas listas.""",
 acoes=[
  dict(id='deixar_caderno', texto='Deixar o caderno preto na mesa da cozinha, aberto na última página, para o carpinteiro achar', ir='rv_c9_a2',
   efeitos=dict(flag='a_deixou_caderno', vinculo=2),
   resultado="""Você carrega o caderno até a cozinha, abre na última página, onde a letra é miúda e apressada, e o deixa na mesa de pinho, ao lado do fogão apagado, com um prato de cerâmica em cima, para o vento não virar as folhas. Não escreve bilhete. A página fala por você."""),
  dict(id='bilhete', texto='Levar o caderno e deixar só um bilhete, curto, no verso de uma fotografia', ir='rv_c9_a2',
   efeitos=dict(flag='a_deixou_bilhete', vinculo=1),
   resultado="""Você guarda o caderno na mala e, no verso da fotografia da menina de maria-chiquinha, a mesma que o avô deixou, escreve três linhas, a lápis, com a letra mais clara que consegue. Põe a fotografia sobre o piano, apoiada na caixa de cartas. Não é uma carta de amor. É um jeito de dizer *eu passei por aqui*."""),
  dict(id='levar_tudo', texto='Levar tudo e não deixar nada: o que ficou está ficando, e não precisa de prova', ir='rv_c9_a2',
   efeitos=dict(flag='a_levou_tudo', abalo=1),
   resultado="""Você guarda o caderno, as cartas, a fotografia e o violão nas malas, fecha os fechos e põe a chave debaixo do tapete, onde o advogado mandou. Não deixa bilhete, nem recado, nem um fio de cabelo. É a atitude de quem foi treinada a nunca deixar rastro, e, pela primeira vez, você a odeia."""),
 ])

NOS['rv_c9_a2'] = dict(tipo='solo', cap=9, seat='A', lugar='A Lanterna, Rua Principal', hora='Sexta · 20h00', npcs=['doris', 'caleb'],
 texto="""A festa de despedida na Lanterna não foi planejada por ninguém e foi organizada por todo mundo. Há uma faixa de papel pardo no teto, escrita a pincel: *BOA VIAGEM, NETA DO HENRY.* Há uma travessa de biscoitos de aveia da Doris, uma garrafa de vinho barato do posto e uma banda de três, o banjo, o violão e o contrabaixo, tocando uma música que você escreveu em junho, de ouvido, que alguém aprendeu pelo caminho.

Quarenta e cinco pessoas, entre vizinhos e fotógrafos de camisa havaiana que se renderam. Caleb, de camiseta de banda, está ao lado de uma mesa de som improvisada. Doris, de blusa de domingo, de olhos úmidos, segura o seu cotovelo.

A cadeira ao lado do palco, a de {{B.nome}}, está vazia.""",
 acoes=[
  dict(id='cantar', texto='Subir ao palco e cantar a música do verão, a deles, sem apresentar', ir='rv_c9_fim',
   efeitos=dict(flag='a_cantou_despedida', vinculo=2),
   resultado="""Você sobe os dois degraus do palco, pega o violão do banjista e canta, sem apresentação, sem luz, sem nome, a música que escreveu no piano desafinado. A sala fica em silêncio, o silêncio inteiro de quarenta e cinco pessoas que não têm celular na mão. Quando você acaba, ninguém grita o seu nome. Alguém, no fundo, diz *obrigada*, só isso, e é a ovação mais bonita da sua vida."""),
  dict(id='doris', texto='Procurar a Doris, no canto, e agradecer a ela por ter fechado os olhos do avô', ir='rv_c9_fim',
   efeitos=dict(flag='a_agradeceu_doris', vinculo=2),
   resultado="""Você atravessa a sala até Doris, que finge procurar uma colher. *Obrigada*, você diz, *por ter ficado com ele. Quando eu não estava.* A mulher de avental, a que avaliou a sua mala em junho e apostou cinco dólares, fica sem fala por um segundo. Depois diz, rouca: *eu perdi a aposta*, e te abraça, com um cheiro de farinha e de querosene que você nunca vai esquecer."""),
  dict(id='esperar', texto='Ficar de pé, perto da porta, olhando se alguém chega, até o último minuto', ir='rv_c9_fim',
   efeitos=dict(flag='a_esperou_porta', abalo=1),
   resultado="""Você não canta, não agradece, não dança. Fica de pé, perto da porta, de olho no sino. Cada vez que ele toca, o seu coração acelera, e cada vez, é outra pessoa: um vizinho, um fotógrafo, uma criança. Às onze, a Doris coloca a mão no seu ombro, sem dizer nada. Às onze e quinze, o carro preto buzina, uma vez, e o sino toca pela última vez, com você saindo."""),
 ])

NOS['rv_c9_b'] = dict(tipo='solo', cap=9, seat='B', lugar='Casa dos Lindqvist', hora='Sexta · 20h00',
 texto="""Às oito da noite, a Lanterna está cheia, e você não está lá. Você está sentad{{eu.o_a}} no degrau da varanda da casa onde cresceu, com uma cerveja que não bebeu e o violão do seu pai no colo, que foi buscar no chalé às quatro da tarde, quando teve a certeza de que ninguém estaria lá.

Dá para ouvir, do alto do morro, ao longe, o som de um banjo e de um violão, tocando uma música em ré. Você a reconhece. É a de dezessete anos? Não. É uma que você ouviu em junho, em pedaços, de uma sala com janela aberta. Alguém, na cidade, aprendeu.

O céu, de fim de agosto, tem as primeiras estrelas de outono, mais limpas, mais frias.""",
 acoes=[
  dict(id='ficar', texto='Ficar no degrau, ouvindo de longe, sem ir', ir='rv_c9_fim',
   efeitos=dict(flag='b_ficou_longe', abalo=1),
   resultado="""Você fica. Ouve, de longe, uma música que não tem o seu nome em nenhum verso e que fala de tudo o que você viveu. Quando acaba, às nove e quarenta, a sala aplaude, e o som chega até aqui, como uma onda, pequena e quente. Você aplaude também, sozinh{{eu.o_a}}, no escuro, com a cerveja que ninguém vê."""),
  dict(id='estrada', texto='Pegar a picape e ir até a estrada de Republic, esperar o carro preto passar', ir='rv_c9_fim',
   efeitos=dict(flag='b_esperou_estrada', vinculo=1),
   resultado="""Você pega a picape e vai até a curva da estrada de Republic, a única que sai de Pine Hollow. Estaciona atrás de um abeto, com o motor desligado, e espera. Às onze e meia, um carro preto passa, devagar, com um vidro que desce três centímetros. Você não sabe se ela o viu. Fica ali até o carro virar um ponto de luz, e depois um nada."""),
  dict(id='caderno', texto='Subir de madrugada ao chalé, entrar com a chave do telhado, e olhar a casa vazia uma última vez', ir='rv_c9_fim',
   efeitos=dict(flag='b_foi_ao_chale', vinculo=2),
   resultado="""Você sobe de madrugada, à luz de uma lanterna, e entra no chalé pela porta que não tem chave, só trinco. A sala está vazia, o piano de tampa fechada, o fogão apagado. Sobre a mesa da cozinha, sob um prato de cerâmica, uma coisa pequena e escura espera, e você sabe, antes de se aproximar, o que é."""),
 ])

NOS['rv_c9_fim'] = dict(tipo='fim', cap=9, lugar='Chalé dos Ashby', hora='Sábado · 05h30',
 texto="""Às cinco e meia da manhã de sábado, o chalé do velho Henry está vazio. {{se flag:a_cantou_despedida}}Na Lanterna, a canção ainda vibra nas tábuas. {{/se}}{{se flag:a_agradeceu_doris}}Na Pruitt's Mercantile, uma mulher de avental guarda, pela primeira vez, uma aposta perdida num cofre. {{/se}}{{se flag:a_esperou_porta}}No sino da porta da Lanterna, uma última badalada ficou no ar, sem dono. {{/se}}{{se flag:b_ficou_longe}}No degrau da casa dos Lindqvist, uma cerveja esquentou, sem ser bebida. {{/se}}{{se flag:b_esperou_estrada}}Na curva da estrada de Republic, uma picape velha esfriou, de motor desligado. {{/se}}{{se flag:disse_amo_a}}Na varanda, uma pessoa disse *eu te amo*, em voz alta, uma vez, e a frase, sem resposta, ainda está lá. {{/se}}{{se flag:disse_amo_b}}Na varanda, uma pessoa disse *eu também*, e a frase, sem verbo, ainda está lá. {{/se}}

A porta da frente abre com o rangido de sempre. Quem entra, de boné, com uma lanterna na mão, faz o que ninguém, nesta casa, esperava: não procura nada. Anda até a cozinha, e fica parado, diante da mesa de pinho.

{{se flag:a_deixou_caderno}}Sobre a mesa, sob um prato de cerâmica, um caderno de capa preta, aberto na última página. A letra é miúda, apressada. No alto da página, escrito a lápis e riscado três vezes, um título: *Refrão de Verão.* Embaixo, doze versos. O último verso diz: *e se eu ficasse?*{{/se}}{{se flag:a_deixou_bilhete}}Sobre o piano, apoiada na caixa de cartas, uma fotografia antiga, de uma menina de maria-chiquinha. No verso, a lápis, três linhas: *Eu não sei dizer. Escrevi. A música é nossa. Eu volto, se você me pedir.*{{/se}}{{se flag:a_levou_tudo}}Sobre a mesa, nada. Só uma marca de poeira, retangular, onde um caderno ficou por três meses, e, na bancada, ao lado do fogão, um prato de cerâmica vazio. O que ela levou, ela levou inteiro. Mas, no chão, junto à porta, caída da mala fechada às pressas, uma folha de papel de pão, com *13 DIAS* escrito a lápis, e, embaixo, uma letra diferente: *e se eu voltasse?*{{/se}}""",
 gancho="Um caderno, uma fotografia ou uma folha caída, e um verso com a pergunta que ela não fez em voz alta.",
 ir='rv_c10_caminhao')
