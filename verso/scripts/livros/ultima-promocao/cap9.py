# A Última Promoção · Capítulo 9 · O arco de Joanna
NOS = {}

def op(tom, tag, texto, se=None, ef=None, acao=False):
    d = dict(tom=tom, tag=tag, texto=texto)
    if se: d['se'] = se
    if ef: d['efeitos'] = ef
    if acao: d['acao'] = True
    return d

NOS['up_c9_dayton'] = dict(tipo='segue', cap=9, lugar='Duas cidades', hora='Terça · 07h00',
 ir={'A': 'up_c9_a1', 'B': 'up_c9_b1'},
 texto="""Na manhã de terça-feira, às sete, o mundo dos dois está em dois fusos horários, a seis horas de distância e a uma pergunta de diferença. Em Chicago, a janela do 41º andar da Meridian Group já tem outra pessoa na cadeira de quem foi demitida às oito do dia anterior. Em Viena, o Hotel Imperial já recolheu as xícaras do quarto 412 e trocou os lençóis.

{{se flag:noite_412}}Os lençóis, trocados, não guardam mais a forma de duas pessoas. {{/se}}{{se !flag:noite_412}}Os lençóis, trocados, nunca chegaram a guardar nada. {{/se}}A regra de não falar do assunto até quarta-feira, combinada num domingo de manhã, foi quebrada na segunda, às 9h40, por um telefone.

Cada um, em seu lado do Atlântico, está sozinho com uma pasta de quarenta e três arquivos e uma decisão que ninguém, nem a regra, pode tomar por ele.""")

NOS['up_c9_a1'] = dict(tipo='solo', cap=9, seat='A', lugar='Casa da Megan, Dayton, Ohio', hora='Terça · 07h30', npcs=['megan'],
 texto="""Dayton, Ohio, tem um céu largo, quarteirões de casas de tijolo com varanda e uma ausência de pressa que você tinha esquecido que existia. A casa de Megan fica numa rua de árvores velhas, com um balanço de pneu pendurado num carvalho e uma bicicleta de criança jogada no gramado.

A sua irmã mais velha, Megan Nicholls, quarenta e dois anos, de pijama de flanela e cabelo preso num lápis, abre a porta antes de você bater. Não pergunta nada. Dá um abraço desajeitado, de quem aprendeu a abraçar com uma criança no colo, e diz a frase que a sua vida inteira esperou ouvir, e que ninguém, nem a sua mãe, tinha dito:

— Entra. O café está pronto. Você não precisa ser {{A.nome}} hoje.

Na cozinha, o cheiro é de torrada com manteiga, e uma criança de três anos, de pijama de dinossauro, olha para você com olhos enormes e diz, com muita seriedade: *você está triste?*""",
 acoes=[
  dict(id='contar', texto='Contar tudo à Megan: a demissão, a fraude, a pessoa de Viena', ir='up_c9_a2',
   efeitos=dict(flag='a_contou_megan', vinculo=2),
   resultado="""Você conta. Pela primeira vez, sem organizar, sem ordenar, sem tirar os adjetivos. A Megan escuta, de braços cruzados sobre a mesa, e quando você termina, sem dizer nada, ela se levanta e põe mais uma fatia de pão na torradeira. É a resposta mais clara que você já recebeu: *eu continuo aqui*."""),
  dict(id='crianca', texto='Responder ao sobrinho: sim, a tia está triste, mas um pouco menos agora', ir='up_c9_a2',
   efeitos=dict(flag='a_falou_leo', vinculo=1),
   resultado="""Você se agacha na altura do Leo e diz, com a voz mais sincera que já usou: *estou. Mas um pouco menos agora.* Ele pensa, solene, e responde: *eu tenho um dinossauro que ajuda.* Estende o brinquedo, um tiranossauro de plástico com um dente quebrado, e você o segura, sem saber que, às vezes, o remédio é uma coisa pequena e quebrada."""),
  dict(id='evitar', texto='Dizer que está bem, que é só cansaço da viagem, e pedir o café', ir='up_c9_a2',
   efeitos=dict(flag='a_evitou_megan', abalo=1),
   resultado="""— É cansaço — você diz. — Da viagem. — A Megan olha para você por um tempo comprido, com o olhar de quem aprendeu a ler mentiras de criança. *Tá*, ela diz, e serve o café. A conversa vira o preço da gasolina, mas, debaixo da mesa, a mão dela encosta no seu joelho, de leve, e fica."""),
 ])

NOS['up_c9_a2'] = dict(tipo='solo', cap=9, seat='A', lugar='Varanda da casa da Nina, Dayton', hora='Terça · 15h30', npcs=['nina'],
 texto="""À tarde, a Nina Alvarez, trinta e oito anos, melhor amiga desde o ensino médio, aparece na varanda da Megan com uma garrafa de vinho e uma cara de quem foi avisada. Casada, mãe de um menino de três anos, professora de biologia, ela não é de rodeios. Senta no degrau ao seu lado, passa dois copos de plástico e diz:

— A Megan me contou. Não tudo. Contou o que ela entendeu, que é a parte que importa. — Ela serve o vinho. — Eu vou dizer uma coisa que eu nunca disse, porque você nunca deixou. Você passou onze anos provando para um homem que nunca olhou para os seus resultados que você merecia ser olhada. E agora ele te demitiu. E você está arrasada, não porque perdeu a vaga, mas porque perdeu a plateia.

O vinho é um Merlot barato. A frase é a coisa mais cara que alguém lhe diz há anos.""",
 acoes=[
  dict(id='chorar', texto='Chorar, pela primeira vez em dez anos, no degrau da varanda, com a Nina ao lado', ir='up_c9_a3',
   efeitos=dict(flag='a_chorou', vinculo=2),
   resultado="""Você chora. Não é um choro bonito: é feio, de ombros, de nariz, de quem esqueceu como se faz e aprende no meio da frase. A Nina não diz nada. Passa um guardanapo, depois o braço, depois a cabeça no seu ombro, e fica, como se tivesse a vida inteira para ficar. É a primeira vez que alguém a vê assim, e o mundo, surpreendentemente, não acaba."""),
  dict(id='discordar', texto='Discordar: dizer que não é a plateia que importa, e sim o que ela fez', ir='up_c9_a3',
   efeitos=dict(flag='a_discordou_nina', abalo=1),
   resultado="""— Não é a plateia — você diz. — É o trabalho. Eu escrevi aquela análise. Era boa. E alguém a usou para roubar. — A Nina assente, sem recuar. *Os dois são verdade*, ela diz. *O trabalho era bom. E você queria que alguém o visse.* Você não responde, e é uma resposta."""),
  dict(id='ligar_dean', texto='Dizer à Nina que tem uma pessoa em Viena que olhou, de verdade, e que ainda não sabe se acredita', ir='up_c9_a3',
   efeitos=dict(flag='a_falou_da_pessoa', vinculo=2),
   resultado="""— Tem uma pessoa em Viena — você diz. — Que olhou o meu trabalho, e não o meu cargo. Eu mandei a pasta. Ainda não respondeu. — A Nina arregala os olhos e sorri, um sorriso enorme, de quem finalmente viu o que esperava ver. *Então não era sobre a vaga*, ela diz, *e você nem percebeu.*"""),
 ])

NOS['up_c9_a3'] = dict(tipo='solo', cap=9, seat='A', lugar='RiverScape MetroPark, Dayton', hora='Terça · 18h00',
 texto="""O RiverScape MetroPark fica na margem do rio Great Miami, no centro de Dayton, e tem uma pista de patinação que no verão vira fonte, uma passarela suspensa sobre a água e uma ponte de pedestres cheia de luzes. Às seis da tarde de uma terça de março, está quase vazio: um casal de corredores, um homem com um cachorro, e você, sentada num banco de madeira, de casaco emprestado da Megan, olhando o rio.

Faz dois dias que você não confere uma planilha. Faz um dia que não pensa no organograma. O celular, no bolso, não vibrou nenhuma vez desde ontem à tarde, e o silêncio, que sempre foi o pior dos sinais, está se mostrando uma coisa mais estranha: uma folga.

Você pensa na frase da Nina, *você perdeu a plateia*. Pensa na mulher de blazer vermelho, que chorou com a história de um homem que ela nunca conheceu. Pensa que a coisa mais importante que você fez, em onze anos, talvez nunca tenha sido um número.""",
 acoes=[
  dict(id='aceitar', texto='Aceitar, sem drama, que não precisa da vaga para saber o que vale', ir='up_c9_fim',
   efeitos=dict(flag='a_aceitou_valer', vinculo=2),
   resultado="""Você aceita. Não é um momento de trombetas: é só o rio, o banco e uma frase simples que chega sem convite. *Eu não preciso da vaga.* Por um minuto inteiro, a frase não vem com um *mas*. É a primeira vez que você a pensa assim, inteira, e o corpo, que passou onze anos tenso, desce um centímetro."""),
  dict(id='planejar', texto='Abrir o caderno e começar a planejar a vingança: provas, advogados, imprensa', ir='up_c9_fim',
   efeitos=dict(flag='a_planejou_vinganca', abalo=1),
   resultado="""Você abre o caderno e escreve uma lista: *advogado, imprensa, SEC, Chloe, Frank Delaney.* Cada item tem uma seta. É o seu jeito de sobreviver, e funciona, e a lista, no fim, ocupa duas páginas inteiras. Mas, no pé da segunda página, sem querer, a sua letra escreve um nome que não estava no plano: *{{B.nome}}*."""),
  dict(id='ligar', texto='Pegar o celular e escrever uma mensagem, mesmo sem resposta, mesmo sem saber o que dizer', ir='up_c9_fim',
   efeitos=dict(flag='a_escreveu_ele', vinculo=2),
   resultado="""Você digita: *Eu não preciso que acredite. Eu só quero que saiba que eu estou bem, e que a pasta é verdadeira.* Apaga. Digita: *Eu sinto sua falta.* Apaga. Digita: *Obrigada por ter dançado.* Envia essa. A mensagem sobe, silenciosa, por cima de um oceano, e você fica olhando o rio, sem esperar nada, e esperando tudo."""),
 ])

NOS['up_c9_b1'] = dict(tipo='solo', cap=9, seat='B', lugar='Quarto 412, Hotel Imperial', hora='Terça · 13h00',
 texto="""{{se flag:acreditou_nela}}A frase *eu acredito*, dita ao telefone, agora precisa de um motivo, e a pasta vai dizer se foi fé ou burrice.{{/se}}{{se flag:duvidou_dela}}A frase *eu preciso ver provas*, dita ao telefone, agora tem as provas, e você não sabe o que desejar que elas digam.{{/se}}{{se flag:pediu_tempo}}As horas pedidas ao telefone viraram um dia.{{/se}} A pasta, de quarenta e três arquivos, está aberta no laptop, em cima da escrivaninha do quarto 412, onde o outro lado da cama continua feito, de colcha lisa, sem ninguém.

Você lê. Lê tudo. As versões do valuation, as datas de edição, os logs do sistema, as assinaturas. Lê duas vezes o e-mail em que Marcus Webb pede, às 23h47 de uma quinta-feira, que um *ajuste de sinergia* seja inserido *sem notificação à autora*. A autora. Você lê a palavra por muito tempo.

O que está na tela não deixa nenhuma dúvida: a pessoa que dançou com você escreveu um número honesto. Quem o trocou foi o homem que, ontem à noite, ofereceu a você a vaga.""",
 acoes=[
  dict(id='pedir_perdao', texto='Escrever uma mensagem: pedir perdão pela dúvida, e dizer que leu tudo', ir='up_c9_b2',
   efeitos=dict(flag='b_pediu_perdao', vinculo=2),
   resultado="""Você digita: *Li tudo. Você estava certa. Eu fui um idiota na ligação. Me perdoa.* Apaga *idiota*, que é palavra de adolescente, e escreve *covarde*, que é mais verdadeira. Envia. A mensagem, que leva três segundos para chegar, dura, na sua cabeça, uma eternidade. Nenhuma resposta vem, e você entende que não merece uma tão cedo."""),
  dict(id='planejar', texto='Pensar primeiro no que fazer com a prova, antes de qualquer mensagem pessoal', ir='up_c9_b2',
   efeitos=dict(flag='b_planejou_prova', abalo=1),
   resultado="""Você abre um bloco e escreve: *1. A quem entregar? 2. O que a Meridian faz com isso? 3. O que acontece com os cento e doze?* Cada pergunta é prática, e todas são desculpas para não escrever a outra mensagem, a que você sabe que deve. A lista dura uma hora. No fim, a última linha, sublinhada duas vezes, diz: *ligar para ela.*"""),
  dict(id='ligar_pai', texto='Ligar para o pai e contar tudo, a verdade inteira, pela primeira vez', ir='up_c9_b2',
   efeitos=dict(flag='b_contou_pai', vinculo=1),
   resultado="""Você liga. O seu pai atende com o cachorro latindo atrás e a voz de roupão. Você conta: o rombo, a venda, a Meridian, a MW Holdings. Do outro lado, um silêncio comprido, e depois uma coisa que você não esperava: *eu sabia do rombo, filho. Eu sempre soube. Eu vendi porque eu estava cansado, não porque você falhou.* Você segura o telefone com as duas mãos, no quarto de um hotel de seiscentos euros por noite."""),
 ])

NOS['up_c9_b2'] = dict(tipo='solo', cap=9, seat='B', lugar='Quarto 412, Hotel Imperial', hora='Terça · 19h30', npcs=['richard'],
 texto="""O celular toca de novo às sete e meia da noite, hora de Viena, uma da tarde em Chicago. É o seu pai, e a voz, que nunca é de pressa, é de pressa.

— O Buster fugiu — diz ele. — Faz duas horas. Eu abri a porta para o carteiro e ele passou por baixo das minhas pernas, filho, eu não vi. Saí atrás dele pelo quarteirão inteiro, na chuva. A vizinha disse que o viu virar a rua do galpão. Eu estou de roupão, no meio da calçada, e eu não sei o que fazer.

Um cachorro de dois anos, vira-lata, de uma orelha caída e outra em pé, está solto em Chicago em março. Você olha a pasta aberta, a mensagem não enviada, o hotel de seiscentos euros. Do outro lado do Atlântico, o homem que te criou chora sem dizer que está chorando.""",
 acoes=[
  dict(id='frank', texto='Pedir ao pai que ligue para o Frank Delaney: ele conhece cada rua de Gary e arredores', ir='up_c9_b3',
   efeitos=dict(flag='b_chamou_frank', vinculo=1),
   resultado="""— Liga para o Frank — você diz. — Ele tem três centros de distribuição e cem motoristas que conhecem a cidade inteira. Se o Buster foi para o galpão, alguém viu. — O seu pai concorda, com a voz mais firme. *Eu ligo.* E, logo depois: *Você liga também? Ele gosta de você. Fala mais com você do que comigo.*"""),
  dict(id='voltar', texto='Dizer ao pai que vai pegar o primeiro voo de volta, hoje à noite', ir='up_c9_b3',
   efeitos=dict(flag='b_vai_voltar', abalo=1),
   resultado="""— Eu pego o primeiro voo — você diz. — Chego amanhã de manhã. — O seu pai, do outro lado, protesta, fraco: *e o congresso?* *Dane-se o congresso*, você diz, e a frase, ao sair, é a coisa mais livre que você disse em anos. O som, do outro lado, é uma risada molhada de lágrima."""),
  dict(id='buscar', texto='Pedir a Chloe que vá até o galpão, agora, e olhe por lá', ir='up_c9_b3',
   efeitos=dict(flag='b_chamou_chloe', vinculo=1),
   resultado="""Você escreve à Chloe: *Vai ao galpão. O Buster fugiu. O meu pai está de roupão na calçada.* A resposta chega em dez segundos: *Já estou saindo.* Quatro minutos depois, uma foto: a estagiária de moletom da Northwestern, no meio de uma doca de carga, de joelhos no chão, tentando convencer um vira-lata de orelha caída a sair de baixo de um caminhão."""),
 ])

NOS['up_c9_b3'] = dict(tipo='solo', cap=9, seat='B', lugar='Hotel Imperial, Viena', hora='Terça · 21h00', npcs=['frank'],
 texto="""Às nove da noite, hora de Viena, o telefone toca de novo. Número de Indiana. É Frank Delaney, sessenta anos, a voz de quem fuma há quarenta e nunca admite, com o ruído de um motor de caminhão ao fundo.

— Achei o seu cachorro — diz Frank, sem dizer oi. — Estava dormindo na cabine do caminhão do Walter, no estacionamento do galpão de Gary. A Chloe veio buscar. Está tudo bem. Eu estou com ele aqui, aqui no meu colo, comendo um sanduíche que eu não ofereci.

Você respira, e sente o ar descer até os pés. Do outro lado, Frank Delaney pigarreia, e a próxima frase vem em um tom que você nunca ouviu nele, o de quem decide contar alguma coisa que prometeu guardar:

— Já que estou falando com você. Quero te contar uma coisa. Faz uns dias, uma moça me ligou. Voz plana, frases curtas. Disse que trabalhava na Meridian. Disse que a empresa que comprou a do seu pai estava mexendo nos números, e que eu devia ficar de olho nos meus contratos.""",
 acoes=[
  dict(id='saber', texto='Perguntar o nome da moça, mesmo já sabendo a resposta', ir='up_c9_fim',
   efeitos=dict(flag='b_soube_de_frank', vinculo=3),
   resultado="""— Qual era o nome dela? — Frank diz *Nicholls*, e depois, com a lentidão de quem saboreia: *{{A.nome}}. Falou três vezes, com cuidado. Disse que precisava que alguém de fora soubesse. Disse que não podia fazer mais, que ia perder o emprego, e que não se importava.* Você segura o telefone, em pé, no meio do quarto, sentindo uma coisa que não sabe nomear e que é, ao mesmo tempo, vergonha e orgulho."""),
  dict(id='silencio', texto='Ficar em silêncio por um tempo e deixar o Frank falar o resto', ir='up_c9_fim',
   efeitos=dict(flag='b_deixou_frank_falar', vinculo=2),
   resultado="""Você não pergunta nada. Frank fala por dois minutos, em frases lentas e sem enfeite, sobre uma moça de voz plana que ligou de um celular pessoal, sem ser mandada, em um dia que ele nunca esqueceu. *Gente assim*, ele diz, *eu nunca encontrei na Meridian. Nem em lugar nenhum.* Você concorda sem falar, e o silêncio, do lado de cá, ocupa o quarto inteiro."""),
  dict(id='agradecer', texto='Agradecer ao Frank e dizer que ele acabou de mudar o que você ia fazer', ir='up_c9_fim',
   efeitos=dict(flag='b_agradeceu_frank', vinculo=2),
   resultado="""— Frank, você não sabe o que acabou de me dar — você diz. — Eu estava a ponto de me enganar, e você me devolveu a conta. — Do outro lado, uma pausa de homem que não sabe elogiar, e depois: *eu só disse a verdade. Vai lá, filho. Se tiver que ir atrás de alguém, vai agora.*"""),
 ])

NOS['up_c9_fim'] = dict(tipo='fim', cap=9, lugar='Dayton e Viena', hora='Terça · 23h45',
 texto="""Às onze e quarenta e cinco da noite, hora de Viena, cinco e quarenta e cinco da tarde em Dayton, duas pessoas, cada uma de um lado do Atlântico, estão sozinhas com a mesma coisa: uma verdade que descobriram a respeito da outra. {{se flag:a_aceitou_valer}}Uma delas, num banco de madeira, à margem de um rio, aprendeu que não precisa da vaga. {{/se}}{{se flag:a_planejou_vinganca}}Uma delas, num banco de madeira, escreveu um nome numa lista de vingança que não era de vingança. {{/se}}{{se flag:a_escreveu_ele}}Uma delas enviou uma mensagem que dizia *obrigada por ter dançado*. {{/se}}{{se flag:b_soube_de_frank}}A outra, no quarto de um hotel, soube que, semanas antes da fraude estourar, foi avisada, e nunca soube por quem. {{/se}}{{se flag:b_pediu_perdao}}A outra pediu perdão, e a mensagem não teve resposta. {{/se}}

No Imperial, a pessoa que ficou em Viena fecha o laptop, olha o relógio e puxa uma mala do armário. Na mesa de cabeceira, o champanhe da Meridian continua intacto, com o cartão que diz *Que vença o melhor*. Do outro lado da cidade, o aeroporto tem um voo para Frankfurt às 6h10, e de Frankfurt, um para Cincinnati, que fica a uma hora de carro de Dayton.

No celular, a última notificação do dia, de um número que nunca ligou antes, de Dayton, Ohio: uma foto do rio, com a ponte de luzes ao fundo, e uma legenda de quatro palavras.

*Eu estou bem. Obrigad{{A.o_a}}.*""",
 gancho="Ele tem um voo às 6h10, uma pasta de provas e uma mensagem de quatro palavras.",
 ir='up_c10_aviao')
