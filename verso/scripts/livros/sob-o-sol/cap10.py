# Sob o Sol da Toscana · Capítulo 10 · O Grande Gesto
NOS = {}

def op(tom, tag, texto, se=None, ef=None, acao=False):
    d = dict(tom=tom, tag=tag, texto=texto)
    if se: d['se'] = se
    if ef: d['efeitos'] = ef
    if acao: d['acao'] = True
    return d

NOS['ts_c10_trem'] = dict(tipo='segue', cap=10, lugar='Siena e Roma', hora='Sexta · 08h00',
 ir={'A': 'ts_c10_a', 'B': 'ts_c10_b'},
 texto="""Às oito da manhã de sexta, o trem das cinco e dez, de Siena, já chegou a Roma. Quem o pegou, de mala e de bilhete, desce na Stazione Termini, no meio de um mar de gente, de mala de rodinha, de turista, de pombo, de megafone, com o rosto de quem não dormiu.

Em Siena, o apartamento do terceiro andar da Casa Bianchini está vazio, de uma ordem de catálogo. As caixas estão na porta. A cama, de ferro, está feita. Na mesa dobrável, de perna curta, sob um guardanapo dobrado em quatro, há uma vela curta, apagada, e o relógio de mesa, na cômoda, marca, em verde, 08:00.

A pessoa que ficou, de pé, no meio do quarto, tem um plano de vida, um voo, no sábado, de Roma para Boston, e um bilhete de trem, vazio, na mão. Nenhum dos três diz o que fazer.""")

NOS['ts_c10_a'] = dict(tipo='solo', cap=10, seat='A', lugar='Maison Ferretti, Via dei Fori Imperiali, Roma', hora='Sexta · 11h00',
 texto="""A Maison Ferretti ocupa um palácio de cinco andares, de fachada ocre e de janelas altas, a trezentos metros do Coliseu, que, de uma janela do segundo andar, aparece, ao longe, no meio de uma moldura de ciprestes. Dentro, um corredor de mármore, ateliês de vidro, manequins de pano, rolos de seda, e uma diretora de criação, Valentina Ferretti, sessenta anos, de óculos de armação vermelha, que lhe entrega um crachá e diz, em um inglês seco: *aqui trabalhamos em silêncio. A moda é uma coisa que se escuta.*

Você tem uma mesa, um computador, um caderno, e a sensação, estranha, de ter chegado a um lugar que sempre quis e que não é, ainda, seu. Do outro lado da janela, o Coliseu, enorme e antigo, brilha ao sol de janeiro, e você pensa, sem querer, em uma pessoa que, a duzentos quilômetros de distância, em um apartamento vazio, também olha uma janela.

O seu celular, em silêncio, tem uma única mensagem não lida, enviada às seis e quarenta, da signora Ottavia: *NON PARTITE.*""",
 acoes=[
  dict(id='ficar', texto='Aceitar o estágio de coração aberto, mesmo sem saber se a outra pessoa virá', ir='ts_c10_encontro',
   efeitos=dict(flag='a_aceitou_estagio', vinculo=2),
   resultado="""Você assina o contrato, de seis meses, com a caneta de ponta fina que a diretora estende. A letra, na linha, sai firme. *Bem-vinda*, diz Valentina Ferretti, sem sorrir. *Amanhã, oito horas.* Você, que sempre decidiu com barulho, assina em silêncio, e o silêncio, desta vez, não é fuga: é uma escolha de que você não precisa de plateia."""),
  dict(id='esperar', texto='Pedir, com educação, uns dias antes de assinar: precisa pensar, e precisa de uma resposta que ainda não tem', ir='ts_c10_encontro',
   efeitos=dict(flag='a_pediu_prazo', abalo=1),
   resultado="""— Preciso de três dias — você diz, na sala da diretora, de pé. A mulher de óculos vermelhos ergue uma sobrancelha. *Ninguém pede prazo à Maison Ferretti*, diz. *Mas você é a primeira a pedir com honestidade.* Uma pausa. *Três dias.* Você agradece, e, no corredor de mármore, com o crachá na mão, sente os joelhos fraquejarem."""),
  dict(id='mensagem', texto='Mandar uma mensagem à outra pessoa: "Eu estou em Roma. Eu não sei por que estou te contando. Mas eu quero que você saiba."', ir='ts_c10_encontro',
   efeitos=dict(flag='a_mandou_mensagem', vinculo=2),
   resultado="""Você escreve: *Eu estou em Roma. Eu não sei por que estou te contando. Mas eu quero que você saiba.* Olha a mensagem, o polegar sobre o botão de enviar, por um minuto inteiro. Envia. As duas marcas, na tela, ficam azuis em três segundos. A resposta não vem, e você, pela primeira vez, descobre que não precisa dela agora, para o seu dia ter valido."""),
 ])

NOS['ts_c10_b'] = dict(tipo='solo', cap=10, seat='B', lugar='Apartamento, Casa Bianchini', hora='Sexta · 09h00', npcs=['ottavia'],
 texto="""Você fica no meio do quarto, de casaco, com uma mala pronta e um bilhete, e a ficha dobrada no bolso, com três linhas. A porta do apartamento, atrás de você, abre, sem bater: a signora Ottavia, de avental, de rolo de cabelo, de chinelo, entra, olha o quarto, olha você, e senta na beira da cama de ferro, com a mão nos joelhos, como quem tem tempo.

Ela fala em italiano, devagar, apontando as coisas: a cama, a janela, o seu coração, a mala. Você, que estudou tantos meses a língua dos quadros, entende, pela primeira vez, uma frase inteira. *Quando eu tinha a sua idade*, diz a velha, *meu Franco estava em outra cidade. Eu fiquei. Fiz tudo certo. Perdi quarenta anos.* Ela ri, de um jeito que não é riso. *Vai.*

O trem de Siena para Roma sai às nove e quarenta.""",
 acoes=[
  dict(id='ir', texto='Pegar a mala, abraçar a signora Ottavia e correr até a estação', ir='ts_c10_b2',
   efeitos=dict(flag='b_decidiu_ir', vinculo=2),
   resultado="""Você a abraça. É a primeira vez que abraça alguém que não conhece o seu nome inteiro, e a signora, de avental, tem um cheiro de azeite e de talco. *Vai*, diz, de novo, com as duas mãos no seu rosto. Você pega a mala, desce os três lances de escada de mármore, de dois em dois degraus, e corre pelo vicolo, com o gato cinza olhando, até a Porta Camollia."""),
  dict(id='planejar', texto='Pedir à signora que espere, sentar à mesa da cozinha, e planejar, por escrito, cada passo, para ter certeza', ir='ts_c10_b2',
   efeitos=dict(flag='b_planejou_antes', abalo=1),
   resultado="""Você senta, tira da mochila uma ficha e escreve, em uma coluna: *horário do trem, endereço da Maison, o que dizer, o que fazer se ela não quiser.* A signora, na cama, observa, de braços cruzados, com a expressão de quem já viu isso. *Troppo*, diz, depois de cinco minutos. *Muito.* Você, com a caneta no ar, entende. Risca a última linha. Guarda a ficha. Corre."""),
  dict(id='ligar_matteo', texto='Ligar, antes de qualquer coisa, para o Matteo, e perguntar como se pede uma transferência', ir='ts_c10_b2',
   efeitos=dict(flag='b_ligou_matteo', vinculo=1),
   resultado="""Você liga, de pé, na cozinha. Matteo atende no segundo toque, de voz rouca. *Como se pede uma transferência para a Sapienza?* O silêncio do outro lado dura três segundos. *Com um formulário e uma carta*, diz, devagar. *Eu escrevo a carta. Você assina o formulário. Quando?* Você diz *hoje*. *Então corra*, diz ele, e você ouve, pela primeira vez, uma risada de Matteo Lazzeri."""),
 ])

NOS['ts_c10_b2'] = dict(tipo='solo', cap=10, seat='B', lugar='Trem Siena–Roma', hora='Sexta · 11h20',
 texto="""O trem para Roma, que você nunca tomou sem horário marcado, nem sem reserva de poltrona, anda por uma Toscana de janeiro: campos nus, geada nas baixadas, um castelo, um rebanho de ovelhas no meio de uma estrada. A janela, do lado direito, mostra um sol branco, baixo, que faz de cada cipreste uma sombra comprida. Você vai em pé, no corredor, porque não consegue sentar.

Você ensaiou uma frase. Ensaiou duas. Ensaiou, em voz baixa, no banheiro do trem, diante de um espelho de aço, com a ficha na mão. A frase, tantas vezes dita, perdeu o sentido, e o que sobra é uma coisa muito simples, que você, pela primeira vez, não sabe dizer em frases completas.

Em três horas, estará em Roma. Em quatro, na Via dei Fori Imperiali. Em cinco, em frente a uma porta, onde alguém, de crachá, talvez a esteja esperando, ou talvez não.""",
 acoes=[
  dict(id='frase', texto='Repetir, em voz baixa, a frase que você escreveu, até saber de cor', ir='ts_c10_encontro',
   efeitos=dict(flag='b_ensaiou_frase'),
   resultado="""Você repete, em voz baixa, para o vidro: *Eu pedi transferência para a Universidade de Roma.* A frase, a vinte repetições, soa a documento. *Eu não sei o que vai acontecer.* Esta soa melhor. *Eu não quero mais viver a vida dos outros nos livros.* Esta, a que você escreveu no avião, nunca parece sua. *Eu quero viver a minha, com você.* Você cala. A última, sem ensaio, é a única que você já sabe."""),
  dict(id='livro', texto='Abrir o livro de Vasari, na página trinta e dois, e ler, pela última vez, só para ter o que fazer com as mãos', ir='ts_c10_encontro',
   efeitos=dict(flag='b_leu_vasari', vinculo=1),
   resultado="""Você abre o livro, na página trinta e dois, onde há uma ficha dobrada e um marcador de couro, e lê, em italiano, uma frase sobre Simone Martini, *que pintou, em Avignon, a saudade de Siena*. As letras ficam turvas. Você fecha o livro. O trem, por dentro, treme, e você descobre que está chorando, de leve, sem soluço, de uma coisa que se parece muito com alívio."""),
  dict(id='olhar', texto='Não fazer nada, só olhar a Toscana passar e deixar o coração bater no compasso do trem', ir='ts_c10_encontro',
   efeitos=dict(flag='b_olhou_janela', vinculo=2),
   resultado="""Você não faz nada. Olha a Toscana passar, de pé, de testa no vidro. As colinas, em ondas, os ciprestes, a neblina, tudo desfila, sem se explicar. O coração, que passou vinte e dois anos obedecendo a um relógio, bate agora no compasso do trem, tum-tum, tum-tum, e é, pela primeira vez, só um coração."""),
 ])

NOS['ts_c10_encontro'] = dict(tipo='segue', cap=10, lugar='Via dei Fori Imperiali, Roma', hora='Sexta · 17h40',
 ir='ts_c10_dialogo',
 texto="""Às cinco e quarenta da tarde, em Roma, o sol de janeiro baixa por trás dos ciprestes, e o Coliseu, enorme, ao fundo, ganha uma cor de pão dourado. A Via dei Fori Imperiali, larga, de ruínas dos dois lados, é uma avenida de pedra e de luz. Na calçada, diante de um palácio de fachada ocre, de janelas altas e de uma placa de bronze em letras discretas, *MAISON FERRETTI*, uma pessoa de casaco, com uma mala e uma ficha dobrada, espera, de pé, há quarenta minutos.

{{se flag:a_aceitou_estagio}}Lá dentro, uma mesa com um contrato assinado espera um primeiro dia. {{/se}}{{se flag:a_pediu_prazo}}Lá dentro, uma mesa com um contrato por assinar espera uma resposta. {{/se}}{{se flag:a_mandou_mensagem}}Num celular, uma mensagem de duas linhas foi lida, e ainda não foi respondida. {{/se}}{{se flag:b_decidiu_ir}}A pessoa de casaco correu até a estação. {{/se}}{{se flag:b_planejou_antes}}A pessoa de casaco riscou uma linha de uma ficha. {{/se}}{{se flag:b_ligou_matteo}}A pessoa de casaco tem, no bolso, uma carta que um orientador escreveu à mão. {{/se}}

A porta de vidro do palácio abre. Alguém sai, de crachá no pescoço, de bolsa no ombro, de cabelo preso, de passo cansado, olhando o celular. Levanta os olhos.""")

NOS['ts_c10_dialogo'] = dict(tipo='dialogo', cap=10, lugar='Via dei Fori Imperiali, Roma', hora='Sexta · 17h45', comeca='B',
 texto="""A uns cinco passos, na calçada, no meio de uma avenida de ruínas, as duas se olham, e o tempo, em Roma, onde cada pedra já viu tudo, não faz questão de passar. O vento, frio, levanta uma folha de plátano, que roda e cai. O Coliseu, ao fundo, acende suas primeiras luzes.

Uma das duas tem uma frase. A outra, uma pergunta.""",
 turnos=[
  dict(prompt='A primeira frase é sua.', opcoes=[
    op('abre', 't0_b_abre', '— Eu pedi transferência para a Universidade de Roma. Eu não sei o que vai acontecer, mas eu não quero mais viver a vida dos outros nos livros. Eu quero viver a minha, com você.', se='eu:B', ef=dict(flag='disse_o_gesto', vinculo=3)),
    op('seco', 't0_b_seco', '— Eu peguei o trem. Eu nunca pego trem sem reserva. Mas eu peguei.', se='eu:B'),
    op('cuida', 't0_b_cuida', '(Estender, devagar, a ficha dobrada, e esperar que a outra pessoa a leia.)', se='eu:B', acao=True),
    op('abre', 't0_a_abre', '— Você veio. Eu estava a ponto de ir te buscar. Eu estava a ponto de pegar o trem.', se='eu:A', ef=dict(vinculo=2)),
    op('flerte', 't0_a_flerte', '— Você parece alguém que correu uma maratona sem querer. E, mesmo assim, é a coisa mais bonita que eu vi hoje.', se='eu:A'),
    op('seco', 't0_a_seco', '(Ficar parad{{eu.o_a}} na calçada, de bolsa no ombro, sem se mexer, e esperar.)', se='eu:A', acao=True),
  ]),
  dict(prompt='Agora você responde.', opcoes=[
    op('abre', 't1_a_abre', '— Eu aceitei o estágio. Eu não sabia se você vinha. Eu aceitei porque eu queria viver, não porque eu estava fugindo.', se='eu:A', ef=dict(vinculo=2)),
    op('flerte', 't1_a_flerte', '— Você planejou isso? Em quantas linhas de ficha?', se='eu:A'),
    op('seco', 't1_a_seco', '— Isso é uma loucura. Você sabe que isso é uma loucura, né?', se='eu:A'),
    op('abre', 't1_b_abre', '— Eu li o seu bilhete. Eu li o seu bilhete na mesa e eu entendi que você também tinha medo.', se='eu:B', ef=dict(vinculo=2)),
    op('cuida', 't1_b_cuida', '— Você está com frio. O seu casaco é fino. Eu trouxe o meu cachecol.', se='eu:B'),
    op('seco', 't1_b_seco', '— Eu sei que é uma loucura. Era a primeira que eu fazia. Eu queria saber como é.', se='eu:B'),
  ]),
  dict(prompt='A conversa é sua de novo.', opcoes=[
    op('abre', 't2_b_abre', '— Eu sempre achei que viver era uma coisa que se fazia depois. Depois da tese, do mestrado, do plano. Eu estava errad{{eu.o_a}}.', se='eu:B', ef=dict(vinculo=2)),
    op('flerte', 't2_b_flerte', '— Eu aprendi com você que o plano é um mapa. Mas a cidade é outra coisa.', se='eu:B'),
    op('seco', 't2_b_seco', '— O Matteo escreveu a carta. A transferência depende de uma assinatura. A minha, e a sua.', se='eu:B'),
    op('abre', 't2_a_abre', '— Eu sempre achei que o silêncio era o contrário de amar. Você me ensinou que é uma das formas.', se='eu:A', ef=dict(vinculo=2)),
    op('flerte', 't2_a_flerte', '— Eu fiquei quatro meses tentando falar o suficiente para você não perceber que eu estava com medo.', se='eu:A'),
    op('seco', 't2_a_seco', '(Dar um passo à frente, devagar, e parar a dois palmos.)', se='eu:A', acao=True),
  ]),
  dict(prompt='A última palavra da avenida é sua.', opcoes=[
    op('abre', 't3_a_abre', '— Eu quero. Eu quero tudo isso. Eu quero você aqui, mesmo sem plano.', se='eu:A', ef=dict(flag='a_quis_tudo', vinculo=2)),
    op('flerte', 't3_a_flerte', '— Se a gente se atrasar para o jantar, eu culpo você. E a fila do trem.', se='eu:A'),
    op('seco', 't3_a_seco', '(Segurar o rosto da outra pessoa com as duas mãos, e não dizer mais nada.)', se='eu:A', acao=True),
    op('abre', 't3_b_abre', '— Eu quero. Eu quero tudo isso. Eu quero você, mesmo sem plano.', se='eu:B', ef=dict(flag='b_quis_tudo', vinculo=2)),
    op('flerte', 't3_b_flerte', '— Eu não sei dançar, nem cozinhar. Mas eu sei esperar na porta de um prédio por quarenta minutos.', se='eu:B'),
    op('seco', 't3_b_seco', '(Dar o último passo, até o ombro encostar no ombro da outra pessoa, e ficar.)', se='eu:B', acao=True),
  ]),
 ],
 pool=[
  op('cuida', 'pl_cuida', '(Ajeitar o cachecol no pescoço da outra pessoa, devagar, sem dizer nada.)', acao=True),
  op('seco', 'pl_seco', '(Olhar o Coliseu, ao fundo, acender as luzes, e voltar os olhos.)', acao=True),
  op('flerte', 'pl_flerte', '(Sorrir, de lado, sem pressa, o sorriso de quem já escolheu.)', acao=True),
  op('abre', 'pl_abre', '— Eu não sei dizer isso direito. Mas é verdade.'),
  op('fere', 'pl_fere', '(Respirar fundo, de olhos fechados, e abrir de novo, a mesma pessoa.)', acao=True),
 ],
 fecho="""Uma buzina, longe, rompe o ar. Um grupo de turistas passa, em fila, com um guia que fala em espanhol. As duas, no meio da calçada, não ouvem nada. O Coliseu, atrás, terminou de acender, e o sol, no último instante, bate no rosto de cada uma, como se Roma, que viu tudo, aprovasse.""",
 ir='ts_c10_decisao')

NOS['ts_c10_decisao'] = dict(tipo='decisao', cap=10, lugar='Diante do Coliseu, Roma', hora='Sexta · 18h20',
 texto="""Em frente ao Coliseu, no fim da avenida, uma praça enorme, de pedras brancas, onde o vento faz dançar papel de sorvete e folha de plátano. As duas chegam, de braço dado, sem combinar, e param. O anfiteatro, de arcos dourados, ocupa o céu inteiro.

Falta decidir o que acontece depois do beijo. E o beijo, as duas sabem, não precisa de decisão.""",
 pergunta='O que as duas decidem para o dia seguinte e para os meses que vêm?',
 ir='ts_c10_final',
 acoes=[
  dict(id='ficar', texto='Ficar em Roma: a transferência, o estágio, um apartamento pequeno, os dois planos juntos', efeitos=dict(flag='aceitou_ficar', vinculo=3),
   resultado="""Vocês decidem ficar. Uma assina uma transferência, a outra, um contrato. Um apartamento, pequeno, de teto baixo, com uma cama de casal e uma cozinha de armário, será procurado amanhã, entre uma aula e um ateliê. O plano, que durou vinte e dois anos, é rasgado, e o que sobra é uma folha em branco, e as duas, de mãos dadas, a olham, sem medo."""),
  dict(id='distancia', texto='Tentar a distância: cada uma termina o que começou, e as duas se encontram nas férias, nos trens e nos telefones', efeitos=dict(flag='tentar_distancia', vinculo=1),
   resultado="""Vocês decidem tentar a distância. Uma termina a graduação em Boston, a outra, o estágio em Roma. As duas combinam um calendário, com as datas dos voos, e, no meio, um dia só delas, de abril, em Siena, no apartamento da signora Ottavia. É uma decisão de duas pessoas que se conhecem o suficiente para saber que podem esperar."""),
  dict(id='nada', texto='Não decidir nada: viver o beijo, o pôr do sol, a noite, e deixar o resto para amanhã', efeitos=dict(flag='nao_decidiram', vinculo=2),
   resultado="""Vocês não decidem nada. É a decisão mais radical que uma das duas já tomou, e a mais natural para a outra. Amanhã, as duas se preocupam. Hoje, o Coliseu, o sol e uma pessoa ao lado bastam. E o beijo, que vem em seguida, vale mais do que um plano."""),
 ])

NOS['ts_c10_final'] = dict(tipo='final', cap=10, lugar='Roma', hora='Sexta · 18h30',
 finais=[
  dict(se='flag:aceitou_ficar && vinc>=8', texto="""Em frente ao Coliseu, com o sol de janeiro batendo de lado em dois rostos, uma pessoa que nunca quebrou uma rotina segura, com as duas mãos, o rosto de outra que nunca ficou em silêncio, e as duas se beijam. O beijo não tem hesitação, nem pressa, nem plateia. Um grupo de turistas japoneses, em fila, desvia para não atrapalhar. Um vendedor de água, de saco plástico no ombro, assovia uma canção de Roma.

Em fevereiro, uma carta da Sapienza, assinada por um orientador de lápis vermelho, confirma a transferência de {{B.nome}}, com bolsa e com média nove, e uma nota à margem: *Eu sabia desde o capítulo cinco.* Em março, uma diretora de criação de óculos vermelhos entrega a {{A.nome}} um primeiro desfile, e diz, de cara séria: *aqui trabalhamos em silêncio. Mas você, aprendo, faz uma coisa que não é silêncio nem barulho: faz sentido.*

Em abril, as duas dividem um apartamento de teto baixo, na Via dei Serpenti, com uma cama de casal e uma cozinha de armário, e uma mesa dobrável de perna curta, calçada por um guardanapo. Aos domingos, de manhã, uma delas faz café, e a outra, devagar, aprende a tomar leite quente, e a signora Ottavia, de Siena, manda, de trem, em uma caixa de papelão, uma torta de ricota e espinafre, com um bilhete de letra de escola primária: *Duas moças. Uma casa. Comam.*

{{se flag:noite_florenca}}A noite de Florença ficou entre as duas, como uma data que ninguém precisa lembrar. {{/se}}{{se flag:beijo_rua}}Um arco de tijolos, num vicolo de Siena, tem, agora, uma pequena marca, a giz, feita por uma italiana de macacão vermelho: um coração. {{/se}}O quadro de Simone Martini, no Uffizi, continua lá, e o anjo continua, de asas coloridas, dizendo à Virgem, em letras douradas, a coisa que ninguém, em setecentos anos, soube dizer melhor: *não tenha medo.*"""),
  dict(se='flag:aceitou_ficar || flag:tentar_distancia', texto="""Em frente ao Coliseu, com o sol de janeiro batendo de lado em dois rostos, uma pessoa que nunca quebrou uma rotina beija, com as duas mãos no rosto, outra que nunca ficou em silêncio. O beijo é lento, e demorado, e tem o gosto de uma decisão tomada à mão.

Em maio, uma graduação termina em Boston, com média nove e uma nota de rodapé na dedicatória da tese: *a quem me ensinou a luz de Siena.* Em julho, um estágio termina em Roma, com uma carta de recomendação de duas linhas. No meio, entre uma data e outra, há uma troca de mensagens, de manhã e de noite, de fotos de cafés, de croquis feitos no trem, de trechos de Vasari lidos em voz alta por telefone.

Em agosto, as duas voltam a Siena, a um apartamento do terceiro andar de uma casa de tijolos, onde uma vizinha de avental as espera, na porta, com uma panela de sopa. {{se flag:noite_florenca}}A noite de Florença, que ninguém comenta, é, ainda, o centro de tudo. {{/se}}{{se flag:beijo_rua}}O gato cinza do vicolo, que as reconhece, passa a perna entre as botas de cada uma. {{/se}}Não é um final fechado. É uma estrada, de duas pessoas, com trens e atrasos, e, no meio, uma casa que espera."""),
  dict(texto="""Em frente ao Coliseu, com o sol de janeiro batendo de lado, duas pessoas se beijam, e o beijo é a única coisa que as duas decidem. Atrás, o anfiteatro, de arcos dourados, vê o que já viu muitas vezes: duas pessoas que se acharam e que ainda não sabem o que fazer com isso.

Amanhã, uma delas pega um voo para Boston, e a outra volta ao estágio. Há uma frase que ninguém diz, a de *até quando*, e uma que as duas dizem, juntas, em voz baixa, antes de se separarem na estação: *volta.* Os dias passam, e, em abril, uma mensagem chega, de uma vizinha de Siena, em italiano, ditada ao neto: *A casa espera. Vocês duas.*

Não é um final feliz de filme, nem de dorama. É um começo de primavera: uma colina, um sol que bate de lado, e duas pessoas que aprenderam, uma com a outra, que o silêncio, com alguém ao lado, não é ausência. É um lugar."""),
 ])
