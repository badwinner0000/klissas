# Refrão de Verão · Capítulo 6 · O Meio do Verão
NOS = {}

def op(tom, tag, texto, se=None, ef=None, acao=False):
    d = dict(tom=tom, tag=tag, texto=texto)
    if se: d['se'] = se
    if ef: d['efeitos'] = ef
    if acao: d['acao'] = True
    return d

NOS['rv_c6_lago'] = dict(tipo='segue', cap=6, lugar='Pine Hollow', hora='Julho',
 ir={'A': 'rv_c6_a', 'B': 'rv_c6_b'},
 texto="""Em Pine Hollow, julho chega com um calor de cigarra. O riacho baixa, o capim amarela, o posto de gasolina vende mais gelo do que gasolina, e as janelas da Rua Principal ficam abertas, com ventiladores velhos zumbindo como mosquitos educados. O telhado do chalé do velho Henry está pronto desde a última semana de junho, e o carpinteiro, a rigor, não precisa mais subir a estrada de terra.

Ele sobe todo dia, às sete, com um rádio laranja que já não toca. {{se flag:beijo_telhado}}Desde a noite do telhado, a regra de distância, estabelecida do último degrau, tem durado dois dias e uma hora. {{/se}}{{se !flag:beijo_telhado}}Desde a noite do telhado, em que nada aconteceu, a regra de distância foi dita em voz alta e ninguém a cumpriu. {{/se}}Há uma música em andamento, três cadernos de letra e uma frase dita de um degrau.

A cidade, que só percebe o que lhe interessa, já percebeu que a picape do Lindqvist passa mais tempo no cascalho do chalé do que em qualquer telhado.""")

NOS['rv_c6_a'] = dict(tipo='solo', cap=6, seat='A', lugar='Sala do chalé dos Ashby', hora='Domingo · 07h30', npcs=['lorna'],
 texto="""O celular, que só pega sinal numa pedra a trezentos metros do chalé, recebeu, durante a noite, uma mensagem de voz, que você só escuta de manhã, em pé sobre a pedra, de pijama e botas. Lorna Feldt, a agente, quarenta e cinco anos, voz de planilha:

*Oi, querida. Chegou o arquivo de quarenta e um segundos. É... é uma coisa. É boa. É diferente. O Marco, da gravadora, ouviu e disse que não tem batida. Eu disse que tem coração. Ele disse que coração não vende. Eu disse que a gente vê. Enfim. A turnê de outono foi confirmada: dois de setembro, em Seattle. Você volta no dia trinta de agosto. Eu mando um carro.*

A mensagem acaba. O vento mexe no seu cabelo, e a pedra, debaixo dos pés, é fria.""",
 acoes=[
  dict(id='responder', texto='Responder: "Eu volto. Mas preciso de mais tempo para o álbum. Não faz acordo por mim."', ir='rv_c6_dividir',
   efeitos=dict(flag='a_respondeu_lorna', vinculo=1),
   resultado="""Você digita, com o polegar de quem equilibra um café: *Eu volto. Mas não faz acordo por mim. Eu preciso do verão inteiro.* A mensagem fica na tela, em azul, esperando uma barra de sinal. A resposta, quando chega, dois minutos depois, é de uma palavra: *Ok.* E, em seguida: *Cuidado com o que você está sentindo. Você está escrevendo bem.* Lorna nunca disse isso a ninguém."""),
  dict(id='apagar', texto='Apagar a mensagem sem responder e guardar o celular no bolso', ir='rv_c6_dividir',
   efeitos=dict(flag='a_apagou_lorna', abalo=1),
   resultado="""Você apaga a mensagem, sem responder. É um gesto pequeno e definitivo, como fechar uma tampa de piano. Guardar o celular no bolso, sobre a pedra, no meio do mato, com o riacho ao fundo, é a coisa mais livre que você faz em meses, e a mais perigosa."""),
  dict(id='ouvir_de_novo', texto='Escutar a mensagem uma segunda vez, e uma terceira, tentando entender o que a Lorna não disse', ir='rv_c6_dividir',
   efeitos=dict(flag='a_releu_lorna', abalo=1),
   resultado="""Você escuta de novo. *Tem coração*, ela disse. *Cuidado com o que você está sentindo.* Você escuta pela terceira vez, e a voz da Lorna, que sempre foi plana, tem uma rachadura. É um aviso. De uma pessoa que conhece você há dez anos. Você guarda o celular, e uma pergunta antiga, de que a fama não foi feita para duas pessoas, volta."""),
 ])

NOS['rv_c6_b'] = dict(tipo='solo', cap=6, seat='B', lugar='Casa dos Lindqvist, Pine Hollow', hora='Domingo · 07h30', npcs=['caleb'],
 texto="""Você acorda com a luz da manhã batendo no teto de gesso e com a sensação, recente, de ter uma coisa a perder. O seu irmão Caleb está na cozinha, de cueca e camiseta de banda, com uma panela de ovos mexidos que ninguém pediu. Quando você aparece, ele aponta o garfo na sua direção.

— A cidade inteira sabe — diz. — Que você sobe a estrada todo dia. Que você levou o violão do papai para lá. Que o Henry Ashby, que nunca teve visita, agora tem uma visita todo dia, às sete. A Doris está aceitando apostas, sabia? Doze dólares que vocês dois estão juntos antes do fim do mês. Eu apostei vinte.

A resposta de que não tem nada já está pronta. Caleb diz *tá*, no tom de quem ouviu a que queria.""",
 acoes=[
  dict(id='negar', texto='Negar, sem convencer ninguém, e pedir que ele cuide da própria vida', ir='rv_c6_dividir',
   efeitos=dict(flag='b_negou_caleb', abalo=1),
   resultado="""— Não tem nada — você diz. — Cuida da sua vida. — Caleb ergue as duas mãos, de garfo, em rendição. *Tá bom*, diz, *tá bom*. E come os ovos, com a satisfação de quem ganhou. Quando você sai, bate a porta com um pouco mais de força do que precisava, e, na picape, descobre que está sorrindo."""),
  dict(id='contar', texto='Contar a verdade ao Caleb: que está gostando e que tem medo', ir='rv_c6_dividir',
   efeitos=dict(flag='b_contou_caleb', vinculo=2),
   resultado="""— Eu estou gostando — você diz, baixo. — E eu estou com medo. — O garfo de Caleb pára no ar. O irmão mais novo, que sempre soube de tudo e nunca ouviu nada, olha para você com uma seriedade que você não sabia que ele tinha. *Ela vai embora*, ele diz. *Eu sei*, você diz. *Mas tem coisas que valem o preço de uma despedida.*"""),
  dict(id='mudar', texto='Mudar de assunto: perguntar quando ele vai voltar a Spokane', ir='rv_c6_dividir',
   efeitos=dict(flag='b_fugiu_caleb'),
   resultado="""— Quando você volta a Spokane? — você pergunta. Caleb diz *quando eu quiser*, com o tom de quem sabe que você está fugindo e deixa. A conversa passa para um show em Seattle, que ele está ajudando a montar, em setembro, de uma popstar de que ninguém no Condado de Ferry nunca ouviu falar. Você não pergunta o nome."""),
 ])

NOS['rv_c6_dividir'] = dict(tipo='dividir', cap=6, lugar='Lago Cinza, a dez quilômetros de Pine Hollow', hora='Domingo · 14h00', cada=1,
 texto="""O Lago Cinza, ou Gray Lake, como diz o letreiro de madeira, fica a dez quilômetros de Pine Hollow, por uma estrada de terra que faz doze curvas e termina num cais de tábuas, uma prainha de seixos e uma vista de montanhas dentro d'água. Ninguém vem aqui em dia de semana. Aos domingos, uma família de pescadores. Hoje, nenhuma.

A picape para na sombra de um abeto. Os dois descem, com uma cesta de piquenique, duas toalhas e um silêncio que diz *a gente não devia estar aqui* e *a gente está*.""",
 pergunta='O que você faz no lago?',
 acoes=[
  dict(id='nadar', texto='Pular no lago de roupa e tudo, sem pensar', efeitos=dict(flag='nadou', vinculo=1),
   resultado="""Você tira os sapatos, corre pelo cais e pula. A água, de degelo, é um tapa gelado, e você emerge gritando e rindo, como uma criança, com o cabelo grudado no rosto. Pela primeira vez em anos, ninguém está olhando, e o corpo, sem plateia, esquece como se faz pose."""),
  dict(id='pescar', texto='Sentar na ponta do cais, com os pés na água, e ficar vendo a luz mudar', efeitos=dict(flag='ficou_cais'),
   resultado="""Você senta na ponta do cais, com os pés na água, e fica olhando as montanhas dentro d'água. Uma truta, ao longe, salta e desenha um círculo. Aqui, o tempo não é uma coisa que passa: é uma coisa que se espalha, como a luz sobre o lago."""),
  dict(id='sombra', texto='Ficar na sombra do abeto, com um caderno, escrevendo a segunda estrofe', efeitos=dict(flag='escreveu_lago', vinculo=1),
   resultado="""Você abre o caderno, encosta no tronco do abeto, com um pé de cada lado de uma raiz, e escreve. A segunda estrofe vem rápida, de uma vez só, sobre um lago que guarda as montanhas de cabeça para baixo. Quando você ergue a cabeça, uma hora depois, o sol mudou de lugar e a música mudou de tom."""),
 ],
 desfecho="""À tarde, com o sol baixo e a pele quente, a cesta de piquenique virou um deserto de migalhas, as toalhas secam no cais e, no horizonte, uma nuvem de calor ondula. A conversa, que foi pequena a manhã inteira, agora vai ficar grande.""",
 ir='rv_c6_dialogo')

NOS['rv_c6_dialogo'] = dict(tipo='dialogo', cap=6, lugar='Cais do Lago Cinza', hora='Domingo · 17h30', comeca='A',
 texto="""O cais de tábuas, aquecido por um dia inteiro de sol, tem cheiro de alcatrão e de madeira molhada. Duas pessoas sentam na ponta, de pernas penduradas sobre o lago, com os ombros a trinta centímetros de distância e o futuro, às costas, num calendário que nenhum dos dois quer olhar.""",
 turnos=[
  dict(prompt='A primeira frase é sua.', opcoes=[
    op('abre', 'w0_a_abre', '— Eu disse que não podia me envolver. Eu menti. Eu já estou envolvid{{eu.o_a}}.', se='eu:A', ef=dict(vinculo=2)),
    op('flerte', 'w0_a_flerte', '— Você nada melhor do que cuida de telhado. E o telhado, você faz bem.', se='eu:A'),
    op('seco', 'w0_a_seco', '— Eu volto em trinta de agosto. Eu preciso que você saiba disso de antemão.', se='eu:A'),
    op('abre', 'w0_b_abre', '— Eu sei que você vai embora. Eu entendi isso desde o primeiro dia. Eu quero o verão mesmo assim.', se='eu:B', ef=dict(vinculo=2)),
    op('flerte', 'w0_b_flerte', '— Você pulou de roupa. Ninguém nunca pulou de roupa por mim.', se='eu:B'),
    op('seco', 'w0_b_seco', '— Eu sei a data. Eu não preciso que você me lembre.', se='eu:B'),
  ]),
  dict(prompt='Agora você responde.', opcoes=[
    op('abre', 'w1_b_abre', '— Você vai voltar a ser famos{{A.o_a}}, em letras maiúsculas, em estádios. E eu vou ser o cara que consertou o seu telhado.', se='eu:B', ef=dict(vinculo=1)),
    op('seco', 'w1_b_seco', '— Isso não muda nada. Um verão é um verão.', se='eu:B'),
    op('fere', 'w1_b_fere', '— Você diz *envolvida* como quem fala de um contrato. Eu não sou um contrato.', se='eu:B', ef=dict(abalo=1)),
    op('abre', 'w1_a_abre', '— Eu não quero ser a famosa com você. Eu quero ser só quem eu sou quando estou aqui.', se='eu:A', ef=dict(vinculo=2)),
    op('seco', 'w1_a_seco', '— Eu sei o que é um verão. Eu só não sei o que fazer com ele.', se='eu:A'),
    op('flerte', 'w1_a_flerte', '— Você é o primeiro que me diz *maiúsculas* sem tremer. Eu gosto disso.', se='eu:A'),
  ]),
  dict(prompt='A conversa é sua de novo.', opcoes=[
    op('abre', 'w2_a_abre', '— Eu tenho medo de que, quando eu for embora, isso aqui vire uma coisa que eu inventei.', se='eu:A', ef=dict(vinculo=1)),
    op('flerte', 'w2_a_flerte', '— Se você aparecer um dia num show meu, eu te dou o melhor lugar da casa.', se='eu:A'),
    op('seco', 'w2_a_seco', '— Eu não faço promessa que não posso cumprir. É o meu defeito.', se='eu:A'),
    op('abre', 'w2_b_abre', '— Eu tenho medo de que, quando você for embora, eu vire o cara que ficou. De novo.', se='eu:B', ef=dict(vinculo=1)),
    op('flerte', 'w2_b_flerte', '— Eu nunca fui a um show na vida. Mas eu saberia achar o seu.', se='eu:B'),
    op('seco', 'w2_b_seco', '— Eu não peço promessa. Eu peço o dia de hoje.', se='eu:B'),
  ]),
  dict(prompt='A última palavra do cais é sua.', opcoes=[
    op('abre', 'w3_b_abre', '— Eu quero isso. Os dois meses que sobram. Sem plano, sem nome, sem final.', se='eu:B', ef=dict(vinculo=2)),
    op('flerte', 'w3_b_flerte', '— O sol está descendo. Quer a toalha, ou prefere a minha camiseta?', se='eu:B'),
    op('cuida', 'w3_b_cuida', '— Vamos? Está esfriando. A picape tem aquecedor, mais ou menos.', se='eu:B'),
    op('abre', 'w3_a_abre', '— Eu quero isso também. Mesmo sabendo que acaba.', se='eu:A', ef=dict(vinculo=2)),
    op('flerte', 'w3_a_flerte', '— A camiseta. E uma carona até o fim da curva.', se='eu:A'),
    op('cuida', 'w3_a_cuida', '— Vamos. Eu quero ver o pôr do sol da estrada.', se='eu:A'),
  ]),
 ],
 pool=[
  op('cuida', 'pl_cuida', '— Quer uma toalha? Você está tremendo.'),
  op('seco', 'pl_seco', '— Ok.'),
  op('flerte', 'pl_flerte', '— Você tem sol no cabelo.'),
  op('abre', 'pl_abre', '— Eu nunca falei isso com ninguém.'),
  op('fere', 'pl_fere', '— Você sempre foge quando é para valer.'),
 ],
 fecho="""O sol, a vermelhão, pousa sobre a montanha mais alta, e o lago, por um instante, vira uma poça de fogo. Dois patos cruzam o espelho, em fila, sem pressa. O silêncio que vem depois é do tipo que só existe entre pessoas que decidiram.""",
 ir='rv_c6_consente')

NOS['rv_c6_consente'] = dict(tipo='consentimento', cap=6, lugar='Chalé dos Ashby, quarto do avô', hora='Domingo · 22h30',
 texto="""A picape voltou à estrada de terra às nove, com o rádio baixo, e parou no cascalho do chalé às nove e meia. Ninguém desceu. Ficaram sentados dentro, no escuro, com o motor desligado e o riacho falando lá fora. A pele, depois de um dia de sol, está quente, e o cheiro de lago ainda está no cabelo.

Às dez e meia, na sala, com a lanterna a querosene acesa no gancho, ninguém disse nada. A escada que sobe ao quarto do avô, de madeira escura, tem dezessete degraus. Cada um decide, por dentro, o que a noite vai ser.""",
 pergunta='O que você quer?',
 avancar='Subir juntos. Deixar a noite acontecer.',
 ficar='Dar boa noite aqui embaixo, e deixar a noite ser só uma noite.',
 flag='noite_lago',
 irAvancou='rv_c6_noite', irSem='rv_c6_noite')

NOS['rv_c6_noite'] = dict(tipo='segue', cap=6, lugar='Chalé dos Ashby', hora='Domingo · 22h45',
 ir='rv_c6_foto',
 texto="""{{se flag:noite_lago}}Os dezessete degraus são vencidos juntos, em silêncio, com o ranger da madeira velha como único comentário. O quarto do avô, de cama de dossel, cortinas de renda amarelada e um cheiro de cachimbo e de lavanda, tem uma janela aberta para a noite. Lá fora, os grilos fazem o coro de sempre. A lanterna, deixada embaixo, enfeita a escada com uma luz fraca.

Há uma pausa em que os dois, que passaram o verão inteiro a medir o que dizer, não dizem nada. Depois, a noite se encarrega do resto, e é uma noite que o mundo, por respeito, não descreve.

Lá fora, em algum ponto do vale, um vaga-lume acende e apaga, e ninguém o vê.{{senao}}Os dois ficam parados, de pé, no pé da escada de dezessete degraus. Há uma pausa em que cada um espera que o outro mude de ideia, e nenhum muda. *Boa noite*, diz um. *Boa noite*, diz o outro. Ninguém sobe, e ninguém sai.

O carpinteiro volta à picape, e a outra pessoa sobe, sozinha, os dezessete degraus. A porta do quarto do avô se fecha, e a picape dá a partida, e a escada, lá embaixo, guarda o resto.{{/se}}""")

NOS['rv_c6_foto'] = dict(tipo='segue', cap=6, lugar='Pine Hollow', hora='Segunda · 06h45', npcs=['doris', 'caleb'],
 ir='rv_c6_fim',
 efeitos=dict(flag='cidade_descobriu'),
 texto="""Em Pine Hollow, a informação viaja de três maneiras: de boca em boca, pela fofoca da Doris e, desde as seis e quinze desta segunda-feira, pelo computador de 2009 dos fundos da Pruitt's Mercantile, onde uma garota de dezessete anos, a sobrinha de Doris, de passagem pelo verão, abriu um site de fofoca de celebridades para ver o que o mundo andava fazendo.

O mundo, ao que parece, andava procurando uma pessoa. Havia, no site, uma manchete de letras gordas: *ONDE ESTÁ {{A.nome}}? Popstar desaparece há seis semanas. Fontes dizem que ela se escondeu em uma cidade das montanhas de Washington.* E, embaixo, uma foto, tirada de longe, de uma bicicleta antiga, na Rua Principal, de uma figura curvada sobre o guidão, de chapéu de aba larga.

A sobrinha de Doris olha a foto por um minuto. Depois olha, pela janela, uma bicicleta antiga, de guidão torto, encostada na vitrine. A moça não diz nada, e a tela do computador, com a luz piscando, diz tudo.""")

NOS['rv_c6_fim'] = dict(tipo='fim', cap=6, lugar='Pruitt\'s Mercantile / Chalé dos Ashby', hora='Segunda · 07h30',
 texto="""Às sete e meia da manhã, o sino da Pruitt's Mercantile toca duas vezes, e entre uma e outra, a cidade de Pine Hollow muda de natureza. Doris Pruitt, de avental, olha a foto por muito tempo. {{se flag:noite_lago}}No chalé do riacho, ao mesmo tempo, duas pessoas acordam em uma cama de dossel, sem saber que, a quatro quilômetros, um site de fofoca acaba de revelar o que ninguém nunca revelou. {{/se}}{{se !flag:noite_lago}}No chalé do riacho, ao mesmo tempo, uma pessoa acorda sozinha, sem saber que, a quatro quilômetros, um site de fofoca acaba de revelar o que ninguém nunca revelou. {{/se}}{{se flag:a_respondeu_lorna}}O celular, na pedra, a trezentos metros, acaba de receber um sinal. {{/se}}{{se flag:nadou}}O cabelo ainda cheira a lago. {{/se}}{{se flag:escreveu_lago}}A segunda estrofe, escrita à sombra do abeto, está no caderno preto. {{/se}}

Doris, depois de um minuto, pega o telefone fixo da mercearia e disca um número que sabe de cor. *Caleb*, diz, *me liga assim que acordar. A hóspede do Henry é uma pessoa famosa. O Lindqvist sabe, o irmão dele sabe, e eu acho que só eu estava de fora.*

Do lado de fora, o sol da manhã bate na vitrine. A rua principal, vazia, tem uma bicicleta antiga encostada, de guidão torto. Em menos de uma hora, ela vai ter vinte fotógrafos em volta.""",
 gancho="Uma foto vazou, e a cidade, finalmente, sabe quem ela é.",
 ir='rv_c7_bar')
