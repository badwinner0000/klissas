# Sob o Sol da Toscana · Capítulo 5 · A Festa
NOS = {}

def op(tom, tag, texto, se=None, ef=None, acao=False):
    d = dict(tom=tom, tag=tag, texto=texto)
    if se: d['se'] = se
    if ef: d['efeitos'] = ef
    if acao: d['acao'] = True
    return d

NOS['ts_c5_festa'] = dict(tipo='segue', cap=5, lugar='Casa Bianchini, Siena', hora='Sábado, uma semana depois · 19h00', npcs=['giulia'],
 ir={'A': 'ts_c5_a', 'B': 'ts_c5_b'},
 texto="""Não aconteceu nada, e tudo aconteceu. O quase da noite da chuva foi interrompido, em um segundo exato, por uma coisa que as duas ainda discutem: um estrondo, no andar de baixo, de uma panela de pressão que a signora Ottavia deixou cair, e que fez as duas rirem, de susto, em lados opostos do quarto. Depois, a noite, por falta de roteiro, continuou: um chá, um livro, uma luz de abajur.

Seis dias de silêncio educado. Uma não toca no assunto, a outra também. Nas manhãs, a cozinha é de uma; nas noites, da outra. A cama, de ferro, continua dividida. {{se flag:andaram_de_braco}}A manga de lã que uma vez encostou na da outra continua, na lembrança, mais quente do que devia. {{/se}}{{se flag:andaram_distantes}}O palmo de ar entre os ombros continua, como uma fronteira que ninguém ousou atravessar. {{/se}}{{se flag:correram_chuva}}A risada, a de correr na chuva, ainda sai, às vezes, no meio de uma frase. {{/se}}

No sábado, às sete, o celular das duas vibra, ao mesmo tempo, com a mesma mensagem da Giulia: *FESTA NA CASA DO LORENZO!!! PIAZZA DEL MERCATO!!! TODO MUNDO!!! VOCÊS DUAS!!! NÃO ACEITO NÃO!!!*""")

NOS['ts_c5_a'] = dict(tipo='solo', cap=5, seat='A', lugar='Quarto, Casa Bianchini', hora='Sábado · 19h10',
 texto="""Você está há quarenta minutos escolhendo uma roupa. Em Los Angeles, escolher uma roupa era uma ciência de dez segundos: o que está limpo, o que combina, o que a câmera ama. Aqui, a cada peça que tira da mala, você ouve a voz, baixa, da outra pessoa, na cozinha, lendo em voz alta uma frase de Vasari, e hesita.

Você tem três opções sobre a cama: um vestido preto, curto, de alças finas; um macacão jeans, descontraído; e uma saia midi de seda verde-água que a sua mãe comprou em Beverly Hills, e que você nunca usou.

Na outra ponta do apartamento, uma gaveta se fecha. A pessoa que divide o quarto com você, e que vai à festa porque você pediu, passou a manhã inteira dizendo que *não era uma pessoa de festa*. Você, que ouviu isso e disse *tá bom*, descobre que quer, com uma intensidade ridícula, que {{B.ele_ela}} vá.""",
 acoes=[
  dict(id='preto', texto='Vestir o vestido preto: é o da pessoa que você é nas festas', ir='ts_c5_dividir',
   efeitos=dict(flag='a_vestiu_preto', abalo=1),
   resultado="""Você veste o preto, com o cabelo solto e o batom que sempre usa. No espelho do armário, a pessoa que aparece é a de Los Angeles, a que ri alto e sabe onde pôr as mãos. É um uniforme. Você o ajeita, e, no corredor, quando a pessoa que divide o quarto cruza o seu caminho, vê os olhos subirem do seu pé ao seu rosto, e descerem, rápido, ao chão."""),
  dict(id='saia', texto='Vestir a saia verde-água, a que a sua mãe escolheu, e que você nunca teve coragem de usar', ir='ts_c5_dividir',
   efeitos=dict(flag='a_vestiu_saia', vinculo=2),
   resultado="""Você veste a saia. A seda é fria e cai em ondas até o meio da canela, e você, de blusa branca simples, parece outra pessoa: a de uma foto antiga de família, de uma época em que ninguém sabia o que fazer com o futuro. Você olha no espelho, um tempo longo, e dá um passo, para ouvir a seda. Na porta, a pessoa do quarto, que ia dizer uma frase, esquece de dizer."""),
  dict(id='jeans', texto='Vestir o macacão jeans, o mais confortável, para não parecer que se arrumou demais', ir='ts_c5_dividir',
   efeitos=dict(flag='a_vestiu_jeans'),
   resultado="""Você veste o macacão. É uma roupa que diz *eu não me arrumei*, e que, na verdade, levou quarenta minutos para ser escolhida. No espelho, a pessoa parece despreocupada e é, por dentro, uma máquina de calcular o que a outra pessoa vai achar. Você ajeita a alça, vira de costas para o espelho, e descobre que está sorrindo sozinh{{eu.o_a}}, como quem esconde uma coisa."""),
 ])

NOS['ts_c5_b'] = dict(tipo='solo', cap=5, seat='B', lugar='Quarto, Casa Bianchini', hora='Sábado · 19h10',
 texto="""Você tem uma única roupa de festa. Comprou-a em Boston, em um outlet, há dois anos, para uma formatura, e a usou, de lá para cá, em uma entrevista, em um casamento de tia e em um jantar de departamento. É um vestido azul-marinho, de mangas compridas, de corte reto, sem decote, de tecido grosso, que a sua mãe elogiou: *discreto*. Você o tira da mala, estende sobre a cama e fica olhando, com a certeza, que não sentia há anos, de que ele é errado.

Na cozinha, a pessoa que divide a casa com você canta, baixinho, uma música de que você não sabe o nome. Em seis dias, não tocou no assunto da noite da chuva. Nem você. A coisa ficou ali, no meio do apartamento, como um móvel novo que ninguém quer admitir ter comprado.

Você tem duas escolhas: ir à festa, por obrigação com a Giulia, ou ficar, por obrigação com a tese.""",
 acoes=[
  dict(id='ir', texto='Ir à festa, com o vestido azul-marinho, de cabeça erguida, sem desculpa', ir='ts_c5_dividir',
   efeitos=dict(flag='b_decidiu_ir', vinculo=1),
   resultado="""Você veste o vestido azul-marinho, penteia o cabelo, passa um batom pálido que comprou em Siena, ontem, sem saber para quê. No espelho, a pessoa é a de sempre, só com uma coisa nova no rosto: uma vontade. Você respira, e decide, em voz alta, para ninguém: *eu vou.*"""),
  dict(id='livro', texto='Pegar o livro, abrir na página trinta e dois e dizer a si que vai ficar só um pouco', ir='ts_c5_dividir',
   efeitos=dict(flag='b_quis_ficar', abalo=1),
   resultado="""Você pega o livro, abre na página trinta e dois, e diz, a si, em voz baixa: *eu fico só até as nove.* A frase, dita três vezes, perde o sentido. Quando levanta os olhos, o relógio de mesa marca 19:38, e, na porta do quarto, a outra pessoa, de saia verde-água ou de macacão, espera, com as mãos nos bolsos, a decisão."""),
  dict(id='mae', texto='Mandar uma mensagem à sua mãe, avisando que vai a uma festa, e esperar a resposta', ir='ts_c5_dividir',
   efeitos=dict(flag='b_avisou_mae_festa', abalo=1),
   resultado="""Você escreve: *Vou a uma festa de estudantes, hoje.* A resposta vem em dois minutos: *Lembre-se de que a bolsa exige média nove. Não beba muito.* E, depois, em outra mensagem: *Divirta-se, se for o caso.* A expressão *se for o caso*, que a sua mãe usa para tudo, não tem, hoje, o peso de sempre. Você guarda o celular com um estranho alívio, e a decisão, que parecia sua, parece só um pouco menos dela."""),
 ])

NOS['ts_c5_dividir'] = dict(tipo='dividir', cap=5, lugar='Casa do Lorenzo, Piazza del Mercato', hora='Sábado · 22h00', cada=1,
 texto="""A casa do Lorenzo, um estudante de arquitetura de Florença, ocupa o terceiro andar de um palácio da Piazza del Mercato, com um terraço enorme, de vaso de tomilho e de luzinhas penduradas, e uma sala onde cabem sessenta pessoas, a maior parte delas com um copo de vinho na mão. A música é uma mistura de rock italiano e de pop americano que ninguém escolheu. O vinho é tinto, de Montalcino, servido em copo de plástico, de garrafa de dois litros.

A Giulia, de macacão vermelho, de cabelo preso em um lenço, atravessa a sala com os braços abertos e grita um nome que as duas entendem: o delas.""",
 pergunta='O que você faz na festa?',
 acoes=[
  dict(id='dancar', texto='Ir para o meio da sala e dançar, com a Giulia, sem pensar', efeitos=dict(flag='dancou_com_giulia', vinculo=1),
   resultado="""Você vai para o meio da sala, e a música, que você conhece de cor, faz o resto. Dançar, para você, é a coisa mais natural do mundo, e a mais difícil de fazer bem quando alguém está olhando de longe. Você sabe que alguém, na parede, de copo na mão, olha. Dança melhor do que nunca."""),
  dict(id='terraco', texto='Subir ao terraço, com um copo de vinho, para ver as luzes de Siena de cima', efeitos=dict(flag='foi_ao_terraco', vinculo=1),
   resultado="""Você sobe a escada de ferro até o terraço, onde o ar é frio e limpo e o barulho da sala chega abafado. Siena, de cima, é um mar de telhas e de torres, com o Duomo, branco e preto, iluminado ao longe. Você bebe um gole de vinho, devagar, e descobre que o silêncio, aqui, de noite, não pede nada."""),
  dict(id='parede', texto='Ficar encostad{{eu.o_a}} na parede, de copo na mão, observando as pessoas, como quem faz uma pesquisa', efeitos=dict(flag='ficou_na_parede', abalo=1),
   resultado="""Você fica na parede, e observa: o Lorenzo, que discute arquitetura barroca com três pessoas; a Giulia, que dança; um casal, no canto, que se beija com a fome de quem tem seis meses de intercâmbio e seis dias de tempo. Você, que estuda a arte de ler gente, é a pessoa mais observada da sala, e não sabe."""),
 ],
 desfecho="""À meia-noite, depois de duas taças de vinho, de uma discussão sobre o Palio e de um pedaço de pizza fria, a festa muda de textura. A música baixa, o riso sobe, e uma das duas, a que não era de festa, está, de repente, no centro da sala, de olhos fechados, dançando uma música que não sabe o nome.""",
 ir='ts_c5_dialogo')

NOS['ts_c5_dialogo'] = dict(tipo='dialogo', cap=5, lugar='Casa do Lorenzo, terraço', hora='Domingo · 00h40', comeca='B',
 texto="""O terraço, a esta hora, está vazio, exceto por um vaso de tomilho, um banco de ferro e duas pessoas, de copo na mão, de bochechas coradas, de cabelo um pouco desfeito. A música, lá embaixo, é um coração distante. Siena, em volta, dorme, com a torre do Mangia iluminada, de dourado, no horizonte.

Uma das duas, que bebeu mais do que costuma, está mais solta do que nunca.""",
 turnos=[
  dict(prompt='A primeira frase é sua.', opcoes=[
    op('abre', 'p0_b_abre', '— Eu nunca dancei assim. Eu nem sabia que eu sabia.', se='eu:B', ef=dict(vinculo=2)),
    op('flerte', 'p0_b_flerte', '— Você dança melhor do que eu esperava. E eu esperava muito.', se='eu:B'),
    op('seco', 'p0_b_seco', '(Apoiar os cotovelos no parapeito e olhar a torre iluminada, sem dizer nada.)', se='eu:B', acao=True),
    op('abre', 'p0_a_abre', '— Eu gostei de te ver dançar. Foi a coisa mais bonita que eu vi na Itália.', se='eu:A', ef=dict(vinculo=2)),
    op('flerte', 'p0_a_flerte', '— Você estava de olhos fechados. Eu fiquei com ciúmes de quem você estava vendo.', se='eu:A'),
    op('cuida', 'p0_a_cuida', '— Tá com frio? Eu pego o seu casaco lá embaixo.', se='eu:A'),
  ]),
  dict(prompt='Agora você responde.', opcoes=[
    op('abre', 'p1_a_abre', '— Eu não sei se eu sei ficar em silêncio. Mas aqui, com você, parece fácil.', se='eu:A', ef=dict(vinculo=2)),
    op('flerte', 'p1_a_flerte', '(Chegar mais perto, devagar, até o ombro encostar no ombro.)', se='eu:A', acao=True),
    op('seco', 'p1_a_seco', '— Tá. Vamos para casa? Eu estou cansad{{eu.o_a}} de música alta.', se='eu:A'),
    op('abre', 'p1_b_abre', '— Eu estava vendo você. De olhos fechados. Eu não precisava de mais nada.', se='eu:B', ef=dict(vinculo=2)),
    op('seco', 'p1_b_seco', '— Eu bebi três taças. Isso explica muita coisa.', se='eu:B'),
    op('flerte', 'p1_b_flerte', '— Você me deixou com a cabeça em um lugar onde não estudei.', se='eu:B'),
  ]),
  dict(prompt='A conversa é sua de novo.', opcoes=[
    op('abre', 'p2_b_abre', '— Em seis dias eu pensei na noite da chuva todos os dias. Eu fingi que não.', se='eu:B', ef=dict(flag='b_admitiu_chuva', vinculo=2)),
    op('flerte', 'p2_b_flerte', '— Eu vou fazer uma coisa que não está em nenhuma tabela.', se='eu:B'),
    op('seco', 'p2_b_seco', '— Vamos para casa. Antes que eu diga o que não devia.', se='eu:B'),
    op('abre', 'p2_a_abre', '— Eu também pensei. Eu pensei tanto que eu parei de falar. Você reparou?', se='eu:A', ef=dict(flag='a_admitiu_chuva', vinculo=2)),
    op('flerte', 'p2_a_flerte', '— Então não finge. Eu estou aqui.', se='eu:A'),
    op('cuida', 'p2_a_cuida', '— A gente não precisa dizer. A gente só precisa ficar.', se='eu:A'),
  ]),
  dict(prompt='A última palavra do terraço é sua.', opcoes=[
    op('abre', 'p3_a_abre', '— Eu estou com medo. Mas eu estou aqui.', se='eu:A', ef=dict(vinculo=2)),
    op('flerte', 'p3_a_flerte', '— Vem. Vamos embora antes de a festa acabar. A gente anda.', se='eu:A'),
    op('cuida', 'p3_a_cuida', '(Estender a mão, a palma para cima, e esperar.)', se='eu:A', acao=True),
    op('abre', 'p3_b_abre', '— Eu estou com medo. Mas eu estou aqui.', se='eu:B', ef=dict(vinculo=2)),
    op('flerte', 'p3_b_flerte', '— Vamos embora. A gente anda.', se='eu:B'),
    op('seco', 'p3_b_seco', '(Pegar a mão estendida, sem hesitar, e descer a escada.)', se='eu:B', acao=True),
  ]),
 ],
 pool=[
  op('cuida', 'pl_cuida', '(Pôr o casaco nos ombros da outra pessoa, sem avisar.)', acao=True),
  op('seco', 'pl_seco', '(Olhar o relógio do Duomo, que marca uma da manhã, e depois o chão.)', acao=True),
  op('flerte', 'pl_flerte', '(Sorrir, sem desviar os olhos, mais tempo do que a educação aceita.)', acao=True),
  op('abre', 'pl_abre', '— Eu nunca disse isso a ninguém. Mas é verdade.'),
  op('fere', 'pl_fere', '(Soltar o ar devagar, com um riso que não chega aos olhos.)', acao=True),
 ],
 fecho="""A escada de ferro do terraço range sob dois pares de pés. Na sala, a Giulia, de macacão vermelho, de copo na mão, vê as duas descerem, de mãos dadas ou quase, e faz, com os olhos, um sinal que ninguém retribui. A porta do palácio, no térreo, abre para a noite.""",
 ir='ts_c5_decisao')

NOS['ts_c5_decisao'] = dict(tipo='decisao', cap=5, lugar='Piazza del Mercato, Siena', hora='Domingo · 01h10',
 texto="""A Piazza del Mercato, às uma da manhã, está vazia, de pedras molhadas por uma garoa fina, de postes de ferro e de um silêncio que só cidades antigas têm. As duas, de rosto quente, de casaco aberto, param no meio da praça, sem saber qual é a rua de casa, ou sem querer saber.

Uma coisa, que tem seis dias de idade, está prestes a ser dita, ou calada.""",
 pergunta='Como as duas voltam para casa?',
 ir='ts_c5_consente',
 acoes=[
  dict(id='andar', texto='A pé, pelo caminho mais longo, pela Via di Città, em silêncio', efeitos=dict(flag='voltaram_andando', vinculo=1),
   resultado="""Vocês escolhem o caminho mais longo, pela Via di Città. Os passos, em pedra molhada, fazem um som de duas pessoas que não têm hora para chegar. Nenhuma diz nada. As lâmpadas dos postes desenham, no chão, poças de ouro, e as duas, sem combinar, desviam das mesmas."""),
  dict(id='viela', texto='Por uma viela escura, a Via dei Pellegrini, onde ninguém passa, mais rápido', efeitos=dict(flag='voltaram_viela'),
   resultado="""Vocês escolhem a viela, estreita, de paredes altas, onde a luz dos postes não chega. O som dos passos, aqui, ecoa. O ar tem o cheiro frio de pedra e de mofo, e a distância entre os ombros, sem ninguém planejar, é de um palmo, e depois, de nada."""),
  dict(id='parar', texto='Parar na Piazza, sentar na beira da fonte seca e ficar, em silêncio, até a garoa parar', efeitos=dict(flag='sentaram_fonte', vinculo=2),
   resultado="""Vocês se sentam na beira da fonte seca, de pedra fria, lado a lado, e ficam. A garoa cai, fina, sobre os cabelos, e nenhuma das duas faz questão de procurar abrigo. O silêncio, que pesou durante seis dias, é, aqui, de uma leveza estranha, como se tivesse se cansado de ser carregado."""),
 ])

NOS['ts_c5_consente'] = dict(tipo='consentimento', cap=5, lugar='Vicolo del Sole, Siena', hora='Domingo · 01h40',
 texto="""O Vicolo del Sole, às uma e quarenta da manhã, tem um único poste aceso, um gato cinza dormindo num degrau e um arco de tijolos que, de noite, parece a boca de uma gruta. A porta verde, número quatro, está a cinco passos. As duas, de casaco molhado, param debaixo do arco, sem que ninguém tenha decidido parar.

Uma pergunta, que não foi feita, ocupa o espaço de um palmo. Cada uma, por dentro, decide, e só se as duas quiserem alguma coisa acontece.""",
 pergunta='O que você quer?',
 avancar='Beijar. Agora, aqui, debaixo do arco, sem plano.',
 ficar='Ficar perto, e ainda não atravessar.',
 flag='beijo_rua',
 irAvancou='ts_c5_sim', irSem='ts_c5_nao')

NOS['ts_c5_sim'] = dict(tipo='segue', cap=5, lugar='Vicolo del Sole, Siena', hora='Domingo · 01h42', requer=['beijo_rua'],
 ir='ts_c5_fim',
 texto="""Não é um beijo de dorama, nem de cinema. É curto, hesitante, com o gosto de vinho de Montalcino e de chuva. Uma boca, a que beijou muitas, e uma outra, que não sabia, descobrem, ao mesmo tempo, o mesmo compasso, e ficam. A mão de uma, que tremia, encontra o pescoço da outra. O poste, lá no fundo, pisca duas vezes. O gato cinza, no degrau, abre um olho e volta a dormir.

Quando se afastam, de olhos ainda fechados, o arco de tijolos, em volta, parece mais alto. Nenhuma das duas diz uma palavra. Em Siena, à uma e quarenta e três da manhã, duas pessoas que dividiram uma cama por seis semanas, sem tocá-la, se acharam.""")

NOS['ts_c5_nao'] = dict(tipo='segue', cap=5, lugar='Vicolo del Sole, Siena', hora='Domingo · 01h42', exclui=['beijo_rua'],
 ir='ts_c5_fim',
 texto="""Nada acontece, e nada acontecer também diz alguma coisa. As duas ficam debaixo do arco, a um palmo uma da outra, com a respiração visível no ar frio e o poste aceso ao fundo. O gato cinza abre um olho, olha, e volta a dormir. Em algum lugar, um relógio bate duas vezes, e nenhuma das duas se mexe.

*Boa noite*, diz uma. *Boa noite*, diz a outra. A porta verde, número quatro, está a cinco passos, e os cinco passos, hoje, são os mais longos da Toscana.""")

NOS['ts_c5_fim'] = dict(tipo='fim', cap=5, lugar='Casa Bianchini, Siena', hora='Domingo · 09h30',
 texto="""Domingo, nove e meia da manhã, e os sinos de Siena tocam em uma desordem ordenada. {{se flag:beijo_rua}}No quarto de teto de madeira, sobre a cama de ferro, duas pessoas dormem, a uma distância que já não se mede em palmos. O vestido preto, a saia verde-água, o macacão e o azul-marinho estão pelo chão, e a luz da persiana, em listras, passa por cima de tudo. {{/se}}{{se !flag:beijo_rua}}No quarto de teto de madeira, sobre a cama de ferro, duas pessoas dormem, de costas uma para a outra, a um palmo, com o travesseiro no meio, e o que não aconteceu debaixo do arco se espalha pelo colchão. {{/se}}{{se flag:voltaram_andando}}As botas, molhadas, secam à porta. {{/se}}{{se flag:voltaram_viela}}O casaco, sujo de mofo, pende da cadeira. {{/se}}{{se flag:sentaram_fonte}}O cabelo, ainda úmido de garoa, está espalhado no travesseiro. {{/se}}

Quando a primeira acorda, com um gosto de vinho velho e uma dor de cabeça pequena, fica olhando o teto, de olhos abertos, por um minuto. Depois vira o rosto, devagar, para o outro lado da cama.

A pessoa ao lado já está acordada. Está de costas para a cabeceira de ferro, de braços em volta dos joelhos, olhando a parede. O rosto, de perfil, é o de quem passou a noite em claro, e a boca, apertada, não diz bom-dia. Em cima da cômoda, o relógio de mesa marca, em verde, 09:34.""",
 gancho="De manhã, uma pessoa de costas, de braços em volta dos joelhos, olhando a parede, e nenhum bom-dia.",
 ir='ts_c6_medo')
