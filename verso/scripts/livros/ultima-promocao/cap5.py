# A Última Promoção · Capítulo 5 · O jantar de networking
NOS = {}

def op(tom, tag, texto, se=None, ef=None, acao=False):
    d = dict(tom=tom, tag=tag, texto=texto)
    if se: d['se'] = se
    if ef: d['efeitos'] = ef
    if acao: d['acao'] = True
    return d

NOS['up_c5_mesa'] = dict(tipo='segue', cap=5, lugar='Palácio Auersperg, mesa 14', hora='Sábado · 22h00',
 ir='up_c5_dividir',
 texto="""A mesa 14 tem vinte lugares e dezoito pessoas, e os dois do 412 estão sentados lado a lado, por determinação de um cartão de papel grosso, caligrafado, que alguém do cerimonial colocou diante de cada prato. Entre eles, um centro de mesa de rosas brancas que impede, de propósito ou por acidente, uma conversa direta.

À esquerda do centro, Herr Doktor Lukas Brandstätter, sessenta e dois anos, presidente de uma rede de transporte da Baixa Áustria, de monóculo de décor e paciência de quem já viu três recessões. À direita, Ingrid Solheim, de Oslo, cinquenta e oito, dona de uma frota de balsas, que fala quatro idiomas e escolhe o quinto só para brigar.

— Os senhores — diz Brandstätter, com o garfo no ar e o sotaque de quem ensaiou a frase no avião — são o casal da apresentação. Aquele do projetor. A coisa mais engraçada que vi neste congresso em vinte anos.

A mesa fica em silêncio, o silêncio educado de quem espera uma correção que não vem.""")

NOS['up_c5_dividir'] = dict(tipo='dividir', cap=5, lugar='Palácio Auersperg, mesa 14', hora='Sábado · 22h10', cada=1,
 texto="""A palavra *casal* fica na mesa como um prato que ninguém pediu. Dezoito rostos, em silêncio, esperam. Os dois do 412 têm três opções, e cada uma custa uma coisa diferente.

Na primeira fila, a três mesas de distância, Marcus Webb ergue uma taça na direção da mesa 14, sem sorrir.""",
 pergunta='O que você diz?',
 acoes=[
  dict(id='corrigir', texto='Corrigir, com educação: somos colegas, e concorrentes à mesma vaga', efeitos=dict(flag='corrigiu_casal'),
   resultado="""Você diz, em um tom que consegue ser firme e gentil: *somos colegas. E concorrentes.* Herr Brandstätter ri, não por maldade, mas pela surpresa. *Concorrentes?* diz ele, e olha o outro, e olha você, com uma sobrancelha de quem aprendeu a ler pessoas em reuniões de conselho. *Então é pior do que um casal. É um casamento arranjado.*"""),
  dict(id='farsa', texto='Entrar na farsa: sim, somos parceiros, e nos damos muito bem', efeitos=dict(flag='entrou_na_farsa', vinculo=1),
   resultado="""Você sorri e diz, sem hesitar: *somos parceiros.* A palavra *parceiros* é uma ponte entre o trabalho e o outro sentido, e Brandstätter entende o segundo. A mesa inteira aprova com um *ahhh*. A pessoa ao seu lado, por um segundo, esquece de respirar, mas, a seguir, entra no jogo, com a mão apoiada no seu encosto."""),
  dict(id='mudar', texto='Mudar de assunto: perguntar ao Dr. Brandstätter sobre a rede de transporte dele', efeitos=dict(flag='mudou_assunto'),
   resultado="""Você diz *e o senhor, como vai a Baixa Áustria?*, e Brandstätter, que adora falar de caminhões, passa os próximos vinte minutos explicando as novas regras de pedágio da União Europeia. A palavra *casal* some da mesa, como se nunca tivesse sido dita. Mas, de longe, Marcus Webb ainda olha."""),
 ],
 desfecho="""Entre o consomé e o vitello tonnato, a mesa decide uma coisa por unanimidade, sem votação: os dois devem dançar. Uma orquestra, de fraque, começou a tocar *O Danúbio Azul* no centro do salão, e Ingrid Solheim, com uma taça de Grüner Veltliner na mão, declara que é uma obrigação diplomática.""",
 ir='up_c5_dialogo')

NOS['up_c5_dialogo'] = dict(tipo='dialogo', cap=5, lugar='Salão de baile, Palácio Auersperg', hora='Sábado · 23h00', comeca='B',
 texto="""Dançar valsa, para duas pessoas que nunca dançaram valsa, é uma conversa em que os pés falam primeiro. A orquestra toca, em compasso de três por quatro, uma melodia que todo mundo conhece e ninguém acompanha. Entre os casais de uma plateia de executivos, no meio de um salão barroco, os dois contam, baixinho, *um, dois, três*.

Uma mão na cintura, outra na mão. A distância, a menor que já houve, é uma regra do jogo.""",
 turnos=[
  dict(prompt='A primeira frase é sua.', opcoes=[
    op('seco', 'h0_b_seco', '— Você pisou no meu pé. Duas vezes.', se='eu:B'),
    op('flerte', 'h0_b_flerte', '— Se alguém perguntar, somos um casal que ensaiou muito.', se='eu:B'),
    op('cuida', 'h0_b_cuida', '— Eu conduzo. Você só segue o ritmo. É mais fácil.', se='eu:B'),
    op('seco', 'h0_a_seco', '— Eu não danço. Eu calculo. Um, dois, três.', se='eu:A'),
    op('flerte', 'h0_a_flerte', '— Você dança melhor do que apresenta. E apresenta bem.', se='eu:A'),
    op('abre', 'h0_a_abre', '— Eu nunca dancei valsa. Nunca tive com quem.', se='eu:A', ef=dict(vinculo=1)),
  ]),
  dict(prompt='Agora você responde.', opcoes=[
    op('flerte', 'h1_b_flerte', '— Eu tive aulas aos doze anos. A minha mãe insistiu. Nunca contei para ninguém.', se='eu:B', ef=dict(vinculo=1)),
    op('seco', 'h1_b_seco', '— Não fala. Conta. Um, dois, três.', se='eu:B'),
    op('abre', 'h1_b_abre', '— Eu também nunca dancei com alguém que eu não conhecesse. Isso é novo.', se='eu:B', ef=dict(vinculo=1)),
    op('seco', 'h1_a_seco', '— Isso é mais difícil do que parece.', se='eu:A'),
    op('abre', 'h1_a_abre', '— Eu estou me divertindo. Isso me assusta.', se='eu:A', ef=dict(vinculo=1)),
    op('fere', 'h1_a_fere', '— Você se faz de simpático porque quer a vaga.', se='eu:A', ef=dict(abalo=1)),
  ]),
  dict(prompt='A conversa é sua de novo.', opcoes=[
    op('abre', 'h2_b_abre', '— A mamãe teria gostado de ver. Ela dançou valsa até o fim.', se='eu:B', ef=dict(vinculo=1)),
    op('flerte', 'h2_b_flerte', '— Se perdermos a vaga, abrimos uma escola de valsa para executivos.', se='eu:B'),
    op('fere', 'h2_b_fere', '— O Marcus está olhando. Ele quer ver se a gente se odeia de verdade.', se='eu:B', ef=dict(abalo=1)),
    op('abre', 'h2_a_abre', '— A minha mãe também. Ela vive em Dayton, num apartamento que cheira a lavanda. Eu não ligo há três semanas.', se='eu:A', ef=dict(vinculo=1)),
    op('flerte', 'h2_a_flerte', '— Abrimos a escola. E cobramos em euros.', se='eu:A'),
    op('seco', 'h2_a_seco', '— O Marcus sempre olha. É o trabalho dele.', se='eu:A'),
  ]),
  dict(prompt='A última palavra da valsa é sua.', opcoes=[
    op('abre', 'h3_b_abre', '— Eu gostei. Dessa noite. De você, um pouco.', se='eu:B', ef=dict(vinculo=1)),
    op('flerte', 'h3_b_flerte', '— A música acaba daqui a pouco. Quer sair antes dos outros?', se='eu:B'),
    op('seco', 'h3_b_seco', '— Foi eficiente. Vamos voltar à mesa.', se='eu:B'),
    op('abre', 'h3_a_abre', '— Eu gostei. Mais do que devia.', se='eu:A', ef=dict(vinculo=1)),
    op('flerte', 'h3_a_flerte', '— Quero sair daqui. Sem falar de trabalho. Conhece algum café?', se='eu:A'),
    op('seco', 'h3_a_seco', '— Valeu pela dança. Agora, as pessoas.', se='eu:A'),
  ]),
 ],
 pool=[
  op('cuida', 'pl_cuida', '— Quer parar um pouco? Eu pego uma água.'),
  op('seco', 'pl_seco', '— Segue o ritmo.'),
  op('flerte', 'pl_flerte', '— Você cheira bem. Isso é distração.'),
  op('abre', 'pl_abre', '— Eu não sei o que estamos fazendo.'),
  op('fere', 'pl_fere', '— Isso é teatro, e nós sabemos.'),
 ],
 fecho="""A orquestra termina a valsa com um floreio de violinos. O salão aplaude. Os dois, no centro, ainda de mãos dadas, demoram um segundo a mais do que deviam para se soltar.""",
 ir='up_c5_decisao')

NOS['up_c5_decisao'] = dict(tipo='decisao', cap=5, lugar='Escadaria do Palácio Auersperg', hora='Domingo · 00h20',
 texto="""Do lado de fora, a noite de Viena é fria, limpa e silenciosa. Na escadaria do palácio, uma fila de táxis espera os executivos, e o motorista do primeiro olha para os dois, com a porta aberta.

O hotel fica a quinze minutos a pé, ou a seis de carro. Antes de ir, falta decidir como.""",
 pergunta='Como vocês voltam ao hotel?',
 ir={'A': 'up_c5_noite_a', 'B': 'up_c5_noite_b'},
 acoes=[
  dict(id='taxi', texto='De táxi: já foi dia demais, e o quarto único espera', efeitos=dict(flag='voltou_taxi'),
   resultado="""Vocês entram no táxi, um Mercedes antigo, com o motorista de quepe que não diz uma palavra. O trajeto de seis minutos dura uma eternidade e um suspiro. A cidade passa pela janela em ouro e preto. Ninguém fala, e o silêncio, desta vez, é de quem escolheu."""),
  dict(id='andar', texto='A pé: o frio faz bem, e Viena à noite merece ser vista', efeitos=dict(flag='voltou_a_pe', vinculo=1),
   resultado="""Vocês descem a escadaria e caminham. A Ringstrasse tem os prédios iluminados como um cenário, o bonde amarelo passa silencioso, e os passos, em ritmo diferente no começo, acertam o mesmo compasso na altura da Ópera. A neve não cai, mas o ar tem o cheiro dela."""),
  dict(id='cafe', texto='Parar num café aberto: ninguém dormiu o bastante, mas ninguém está com sono', efeitos=dict(flag='foi_ao_cafe', vinculo=1),
   resultado="""Vocês passam em frente a um café de janelas acesas, com mesas de mármore e garçons de colete, e um dos dois diz *aberto*, e o outro diz *meia-noite e vinte*, e os dois entram. Dentro, o cheiro é de café torrado e de papel de jornal, e um piano de armário, no canto, toca sozinho, em uma gravação."""),
 ])

NOS['up_c5_noite_a'] = dict(tipo='solo', cap=5, seat='A', lugar='Rua de Viena, a caminho do hotel', hora='Domingo · 00h40', npcs=['priya'],
 texto="""O celular vibra no bolso do casaco, no meio de uma rua vazia de Viena. É Priya Patel, de Chicago, com um texto que parece ter sido escrito e apagado sete vezes: *Eu não devia estar mandando isso. O Marcus pediu que eu imprimisse uma lista, ontem. Era a lista dos candidatos. Só um nome tinha um asterisco ao lado.*

Você lê duas vezes. Digita: *Qual nome?* A resposta chega depois de um minuto de pontinhos: *Eu não posso dizer. Você vai entender na hora certa.* E depois, uma mensagem a mais, curta: *Cuidado com quem você ama, e com quem você confia. São duas coisas diferentes.*""",
 acoes=[
  dict(id='insistir', texto='Insistir: perguntar de novo, exigir o nome', ir='up_c5_fim',
   efeitos=dict(flag='a_insistiu_priya', abalo=1),
   resultado="""Você escreve: *Priya, eu preciso saber.* A resposta, de novo, leva um minuto: *Eu tenho uma mãe em Mumbai que depende do meu salário. Desculpa.* Você não escreve mais nada. A frase, simples, é uma explicação inteira do funcionamento da Meridian, e você sente uma pena que não sabe onde pôr."""),
  dict(id='agradecer', texto='Agradecer, sem insistir: a Priya já fez mais do que devia', ir='up_c5_fim',
   efeitos=dict(flag='a_poupou_priya', vinculo=1),
   resultado="""Você escreve: *Obrigada. De verdade. Não precisa dizer mais nada.* A resposta, em um segundo: *Obrigada por não insistir.* O mundo é feito de pequenas gentilezas que ninguém registra, e esta, você decide, vai ficar na sua memória."""),
  dict(id='guardar', texto='Guardar a mensagem sem responder e olhar a pessoa ao lado, que anda um passo à frente', ir='up_c5_fim',
   efeitos=dict(flag='a_guardou_priya'),
   resultado="""Você guarda o celular, devagar, no bolso do casaco. A pessoa ao seu lado, um passo à frente, de mãos no bolso, não olha para trás, mas diminui o passo, de leve, como quem espera sem querer parecer que espera. Você pensa na frase da Priya. *Cuidado com quem você confia.* E acelera, de leve, para alcançar essa pessoa."""),
 ])

NOS['up_c5_noite_b'] = dict(tipo='solo', cap=5, seat='B', lugar='Rua de Viena, a caminho do hotel', hora='Domingo · 00h40',
 texto="""O celular vibra no bolso do casaco, no meio da noite vienense. É Chloe, de Chicago, com uma foto e uma mensagem: *Achei isso no site da Secretaria de Estado de Illinois. A Meridian Group registrou uma subsidiária três dias antes de comprar a empresa do seu pai. Chama-se MW Holdings. Os sócios não estão no registro, mas o endereço é uma caixa postal em Lincoln Park.*

Você olha a foto, em preto e branco, de um formulário de registro, com a letra de uma assinatura ilegível. Digita: *Lincoln Park?* A resposta, em oito segundos: *A sua concorrente mora em Lincoln Park.*""",
 acoes=[
  dict(id='suspeitar', texto='Pensar que a concorrente é a dona da subsidiária e guardar a informação', ir='up_c5_fim',
   efeitos=dict(flag='b_suspeitou', abalo=1),
   resultado="""Você guarda a informação como uma pedra no bolso. Lincoln Park é um bairro de cem mil pessoas, e a caixa postal pode ser de qualquer uma. Mas a coincidência, a de a pessoa que dançou com você há vinte minutos morar a dois quarteirões, não sai da sua cabeça. Você, que sempre aprendeu a confiar nas pessoas, descobre o gosto da dúvida."""),
  dict(id='defender', texto='Responder à Chloe: não pode ser, ela não faria isso, e pedir que continue investigando', ir='up_c5_fim',
   efeitos=dict(flag='b_defendeu', vinculo=1),
   resultado="""Você escreve: *Não é ela. Pode confiar. Procura o Marcus.* A Chloe responde com um emoji de sobrancelha levantada e uma frase seca: *Você a conhece há três dias.* Você pensa em responder, e não responde, porque a resposta honesta seria *e por isso mesmo*."""),
  dict(id='contar', texto='Esperar o momento e contar o que descobriu à pessoa ao lado, sem acusar', ir='up_c5_fim',
   efeitos=dict(flag='b_vai_contar', vinculo=1),
   resultado="""Você decide, ali mesmo, na rua vazia: vai contar. Não por ingenuidade, mas por uma aposta, a de que há pessoas que mentem quando acusadas e dizem a verdade quando perguntadas. Guarda o celular, aperta o passo e alcança a pessoa à frente, com uma frase que ainda não sabe como começar."""),
 ])

NOS['up_c5_fim'] = dict(tipo='fim', cap=5, lugar='Café Sperl, Gumpendorfer Straße, Viena', hora='Domingo · 01h10',
 texto="""Existe um café em Viena, na Gumpendorfer Straße, que está aberto desde 1880 e que parece não ter mudado uma cadeira desde então. O Café Sperl tem mesas de mármore, bancos de veludo verde, jornais pendurados em varões de madeira e uma mesa de bilhar no fundo, onde ninguém joga há décadas. Às uma e dez da manhã, tem um garçom de colete e bigode, um casal de idosos que divide uma torta Sachertorte e uma mesa de canto, perto da janela, vazia.

{{se flag:voltou_taxi}}Vocês voltaram de táxi, e o táxi passou duas vezes em frente ao café, sem que ninguém pedisse. {{/se}}{{se flag:voltou_a_pe}}Vocês voltaram a pé, e as pernas, sozinhas, escolheram esta rua. {{/se}}{{se flag:foi_ao_cafe}}Vocês escolheram o café, de comum acordo, sem dizer o nome. {{/se}}{{se flag:entrou_na_farsa}}A farsa dos parceiros ainda está no ar, e ninguém a desfez. {{/se}}{{se flag:corrigiu_casal}}A palavra *casamento arranjado*, dita à mesa, ficou martelando nos dois. {{/se}}

O garçom, de bandeja, aponta a mesa de canto sem perguntar. Dois menus em alemão, duas velas pequenas, uma janela que dá para uma rua de calçada molhada. O garçom volta com uma garrafa de vinho que ninguém pediu, serve dois copos e diz, num inglês de dicionário:

— A casa oferece. Para quem está cansado de ser inteligente.

Em cima da mesa, entre os dois copos, a vela pisca uma vez.""",
 gancho="Meia-noite e dez em Viena, uma mesa de canto, uma vela e duas pessoas cansadas de ser inteligentes.",
 ir='up_c6_cafe')
