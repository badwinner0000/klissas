# Sob o Sol da Toscana · Capítulo 1 · O Erro do Sistema
NOS = {}

def op(tom, tag, texto, se=None, ef=None, acao=False):
    d = dict(tom=tom, tag=tag, texto=texto)
    if se: d['se'] = se
    if ef: d['efeitos'] = ef
    if acao: d['acao'] = True
    return d

NOS['ts_c1_a'] = dict(tipo='solo', cap=1, seat='A', lugar='Vicolo del Sole, Siena', hora='Sábado · 16h30',
 texto="""Siena aparece primeiro como um cheiro: pedra quente, café, um fiapo de fumaça de lenha. Depois como um som: rodas de mala em paralelepípedo, quatro rodas, vinte quilos de roupa que você chamou de *o essencial* e que a sua mãe chamou, no aeroporto de Los Angeles, de *uma mudança*. O ônibus deixou você na Porta Camollia, e o resto, dois quilômetros de ladeira, vem a pé, com o celular na mão e a seta azul do mapa girando como quem também está perdida.

O Vicolo del Sole é uma rua de dois metros e meio de largura, com um arco de tijolos em cima, roupa pendurada de uma janela a outra e um gato cinza dormindo num degrau. O número quatro tem uma porta verde, escamada, com uma campainha de bronze e um nome escrito a caneta num papel dobrado: *CASA BIANCHINI. PIANO 3.*

Você tem vinte e um anos, um semestre inteiro pela frente e a certeza, que ninguém pediu, de que vai ser o melhor da sua vida. O que você ainda não sabe é que o sistema da universidade cometeu um erro, e que o erro, a esta hora, está subindo a mesma escada.""",
 acoes=[
  dict(id='gato', texto='Parar e fazer festa no gato cinza antes de entrar, porque é o primeiro italiano que cumprimenta você', ir='ts_c1_encontro',
   efeitos=dict(flag='a_fez_festa_gato', vinculo=1),
   resultado="""Você se agacha e estende a mão. O gato inspeciona, aprova com um piscar lento e oferece a cabeça. É a primeira conversa da sua vida na Itália, e você a conduz em inglês, em tom de segredo: *oi, lindo. Eu vou morar aqui. Não conta para ninguém que eu me perdi duas vezes.* Quando se levanta, a mala parece mais leve."""),
  dict(id='foto', texto='Tirar uma foto da rua inteira e mandar para o grupo da família, com dez emojis', ir='ts_c1_encontro',
   efeitos=dict(flag='a_mandou_foto', abalo=1),
   resultado="""Você ergue o celular, enquadra o arco, a roupa no varal e a luz dourada, e manda para o grupo: *CHEGUEI!!! OLHA ISSO!!!* Seguem dez emojis. A sua mãe responde em quatro segundos, com uma única linha: *Que lindo. Seu pai e eu estamos conversando. Liga depois.* Você olha a palavra *conversando*, que é a palavra que a sua família usa para o que não consegue dizer, e guarda o celular no bolso, rápido."""),
  dict(id='escada', texto='Empurrar a porta verde e subir a escada sem pensar, antes que a coragem acabe', ir='ts_c1_encontro',
   efeitos=dict(flag='a_subiu_direto'),
   resultado="""Você empurra a porta, que cede com um estalo, e começa a subir: três lances de escada de mármore gasto, uma luz de timer que apaga no segundo e acende no terceiro, e um cheiro de cebola refogada vindo do andar de baixo. A mala bate em cada degrau com um *toc* de metrônomo. No segundo andar, uma porta se abre uma fresta, e um olho, velho e muito atento, observa e fecha."""),
 ])

NOS['ts_c1_b'] = dict(tipo='solo', cap=1, seat='B', lugar='Vicolo del Sole, Siena', hora='Sábado · 16h30',
 texto="""Você chegou duas horas antes do horário combinado, o que, no seu caso, é a maneira correta de chegar. Veio de Roma de trem, com duas malas, uma mochila e um mapa impresso, que conferiu três vezes contra o mapa do celular, porque papel não perde sinal. O trem foi pontual. O ônibus 10, não. A pessoa que mora com você nos próximos cinco meses, segundo o e-mail da universidade, se chama {{A.nome}}, tem vinte e um anos e estuda Moda. O e-mail dizia *colega de quarto*, no singular, e você leu *quarto* como uma instituição: um espaço com duas camas.

O Vicolo del Sole é estreito, antigo, de tijolos cor de ferrugem e de janelas com cortinas de renda. No número quatro, uma porta verde. Você confere o endereço: *Casa Bianchini, piano 3.* Confere de novo. Tem uma lista de regras de convivência na mochila, em dois exemplares, que redigiu no avião. Pensou em entregá-la na chegada, com um sorriso.""",
 acoes=[
  dict(id='lista', texto='Conferir a lista de regras, uma última vez, antes de tocar a campainha', ir='ts_c1_encontro',
   efeitos=dict(flag='b_conferiu_lista'),
   resultado="""Você abre a pasta de plástico e lê a lista, que tem quatorze itens, numerados. O quinto, *silêncio depois das 22h*, está sublinhado. O décimo, *louça lavada no mesmo dia*, tem uma observação a lápis: *flexível?* Você apaga o ponto de interrogação, escreve *não* e fecha a pasta. É assim que você enfrenta o que não conhece: com um documento."""),
  dict(id='mae', texto='Mandar uma mensagem para a sua mãe: "Cheguei. Tudo em ordem."', ir='ts_c1_encontro',
   efeitos=dict(flag='b_avisou_mae', abalo=1),
   resultado="""Você escreve: *Cheguei. Tudo em ordem.* A resposta vem em dois minutos, com a pontualidade de quem estava esperando: *Ótimo. Lembre-se de que a bolsa exige média nove. Ligue domingo, às 19h.* Nenhuma pergunta sobre a cidade, nem sobre o prédio, nem sobre a luz. Você guarda o celular e sobe, com a sensação de ter entregado um relatório."""),
  dict(id='olhar', texto='Ficar um minuto parad{{eu.o_a}} no vicolo, olhando a luz bater no arco de tijolos, sem fazer mais nada', ir='ts_c1_encontro',
   efeitos=dict(flag='b_olhou_vicolo', vinculo=1),
   resultado="""Você não faz nada. É a coisa mais difícil que faz hoje. A luz do fim de tarde bate de lado no arco, e tudo o que é tijolo vira cobre. Um sino bate quatro vezes, longe. Você nunca tinha olhado para uma rua só para olhar, sem anotar o nome do estilo, a data de construção ou o arquiteto. Dura um minuto. É um minuto enorme."""),
 ])

NOS['ts_c1_encontro'] = dict(tipo='segue', cap=1, lugar='Apartamento, Casa Bianchini, 3º andar', hora='Sábado · 17h10', npcs=['ottavia'],
 ir='ts_c1_dividir',
 texto="""O apartamento do terceiro andar tem uma porta de madeira escura com uma chave de ferro, de dois palmos, que a proprietária, a signora Bianchini, deixou com a vizinha do segundo, a signora Ottavia, setenta anos, de avental, que entrega a chave sem dizer nada, fecha a porta do próprio andar e abre de novo, só para espiar.

Dentro: um corredor curto, um banheiro com banheira de pés e janela para um pátio, uma cozinha do tamanho de um armário grande, com dois fogões a gás, uma mesa dobrável e uma geladeira que ronca. E um quarto. Um só. Com um teto de madeira, uma janela alta com persiana verde, uma cômoda, um armário de uma porta e uma cama de casal, de ferro, com colcha branca e dois travesseiros.

As duas pessoas que chegam ao mesmo tempo, uma com vinte quilos, outra com duas malas e uma pasta, olham a cama. Depois olham uma para a outra. A janela alta deixa entrar um raio de sol, que atravessa o quarto e cai em cima da colcha, como um holofote.""")

NOS['ts_c1_dividir'] = dict(tipo='dividir', cap=1, lugar='Quarto, Casa Bianchini', hora='Sábado · 17h30', cada=1,
 texto="""Um erro de sistema, explica o e-mail que as duas recebem ao mesmo tempo, no celular, às cinco e meia, vem com um pedido de desculpas em italiano e em inglês: *a vaga foi atribuída duas vezes. Todos os outros alojamentos estão ocupados. Pedimos compreensão.* Nenhuma das duas tem para onde ir. A mala de uma está encostada na porta, a de outra, na janela.

A cama é uma só. O armário tem uma só porta. O raio de sol, a esta hora, ilumina apenas um dos lados.""",
 pergunta='O que você faz primeiro?',
 acoes=[
  dict(id='janela', texto='Ocupar o lado da janela da cama, jogar o casaco ali e declarar território', efeitos=dict(flag='pegou_janela'),
   resultado="""Você atravessa o quarto, joga o casaco no lado da janela, onde bate o sol, e diz *esse é o meu*, em um tom de brincadeira que não é inteiramente brincadeira. A outra pessoa não discute. Apenas olha o casaco, olha você, e abre uma das malas, devagar, sem desviar os olhos."""),
  dict(id='armario', texto='Abrir o armário e dividir as prateleiras ao meio, com fita, antes que haja discussão', efeitos=dict(flag='dividiu_armario', vinculo=1),
   resultado="""Você abre o armário, mede as prateleiras com a palma da mão e tira da mochila um rolo de fita crepe. Divide, ao meio, três prateleiras e uma barra de cabides, e cola uma etiqueta em cada metade. É o gesto mais pacífico possível e o mais passivo-agressivo, e você sabe, e faz mesmo assim."""),
  dict(id='sair', texto='Sair do quarto, ir à cozinha e respirar, porque não é possível pensar com aquela cama ali', efeitos=dict(flag='saiu_do_quarto', abalo=1),
   resultado="""Você sai, vai até a cozinha minúscula e abre a torneira, para ouvir alguma coisa. A água é gelada e tem gosto de pedra. Pela janela do pátio, a roupa de alguém balança numa corda. Você respira três vezes, devagar, e a cozinha, com os dois fogões e a mesa dobrável, parece, de repente, o único espaço do apartamento que ainda não é de ninguém."""),
 ],
 desfecho="""Às seis, com as duas malas abertas e uma cama que ninguém tocou, as duas se sentam, cada uma em uma das cadeiras da cozinha, em lados opostos da mesa dobrável. Entre elas, um bule de café que alguém, a signora Ottavia, deixou na porta, com um bilhete em italiano que nenhuma das duas entende.""",
 ir='ts_c1_dialogo')

NOS['ts_c1_dialogo'] = dict(tipo='dialogo', cap=1, lugar='Cozinha, Casa Bianchini', hora='Sábado · 18h00', comeca='A',
 texto="""A mesa dobrável balança, e uma das duas pernas está um centímetro mais curta. Um bule de café, duas xícaras que não combinam, e uma janela para o pátio, onde alguém, lá embaixo, canta uma ópera com a convicção de quem não tem plateia.

Alguém, em algum momento, vai ter de propor um jeito de conviver.""",
 turnos=[
  dict(prompt='A primeira frase é sua.', opcoes=[
    op('abre', 'k0_a_abre', '— Gente, tá tudo bem. A gente vai dar um jeito. Eu sou superfácil de conviver, juro!', se='eu:A', ef=dict(vinculo=1)),
    op('flerte', 'k0_a_flerte', '— Se for para dividir cama com alguém, podia ser pior. A mala é bonita.', se='eu:A'),
    op('seco', 'k0_a_seco', '— Tá, mas isso é, tipo, um erro enorme, né? Ninguém vai resolver?', se='eu:A'),
    op('seco', 'k0_b_seco', '— O e-mail diz que não há outro alojamento. Eu verifiquei três vezes.', se='eu:B'),
    op('abre', 'k0_b_abre', '— Eu preparei uma lista de regras. Posso entregar, se você quiser ler.', se='eu:B', ef=dict(vinculo=1)),
    op('cuida', 'k0_b_cuida', '— Você deve estar cansad{{A.o_a}} da viagem. Eu posso ficar com o lado do corredor.', se='eu:B'),
  ]),
  dict(prompt='Agora você responde.', opcoes=[
    op('flerte', 'k1_a_flerte', '— Uma LISTA? Você fez uma lista? Para mim? Eu amei, mano.', se='eu:A'),
    op('abre', 'k1_a_abre', '— Eu falo demais quando fico nervos{{eu.o_a}}. Desculpa. Isso é um defeito, eu sei.', se='eu:A', ef=dict(vinculo=1)),
    op('seco', 'k1_a_seco', '— Quatorze regras? Eu não aguento quatorze regras. Nem cinco.', se='eu:A'),
    op('seco', 'k1_b_seco', '— As regras são razoáveis. Silêncio depois das dez, louça lavada no mesmo dia.', se='eu:B'),
    op('cuida', 'k1_b_cuida', '— Você pode escrever as suas, e eu leio com atenção.', se='eu:B'),
    op('fere', 'k1_b_fere', '— Eu prefiro organização à improvisação. É uma questão de método.', se='eu:B', ef=dict(abalo=1)),
  ]),
  dict(prompt='A conversa é sua de novo.', opcoes=[
    op('abre', 'k2_a_abre', '— A minha regra é uma só: sem julgamento. Se eu chegar tarde, se eu trouxer gente. Tá?', se='eu:A', ef=dict(flag='regra_sem_julgar', vinculo=1)),
    op('flerte', 'k2_a_flerte', '— Posso trazer amigos? Eu já tenho três e nem cheguei na aula.', se='eu:A'),
    op('seco', 'k2_a_seco', '— Primeiro dia, regra um: ninguém dorme de sapato na cama. Eu vi o seu.', se='eu:A'),
    op('seco', 'k2_b_seco', '— Amigos, até as vinte e duas horas. Depois, silêncio.', se='eu:B', ef=dict(flag='regra_visitas')),
    op('abre', 'k2_b_abre', '— Eu preciso de silêncio para estudar. Não é pessoal. É uma necessidade.', se='eu:B', ef=dict(vinculo=1)),
    op('fere', 'k2_b_fere', '— Eu vim aqui para estudar. Não para uma festa. Isso precisa estar claro.', se='eu:B', ef=dict(abalo=1)),
  ]),
  dict(prompt='A última palavra da mesa é sua.', opcoes=[
    op('abre', 'k3_a_abre', '— Tá bom. Eu tento. De verdade. Mas eu preciso de uma coisa: um pouco de barulho às vezes.', se='eu:A', ef=dict(vinculo=1)),
    op('flerte', 'k3_a_flerte', '— Fechado. Mas se a gente se odiar, o gato do vicolo escolhe quem fica.', se='eu:A'),
    op('seco', 'k3_a_seco', '— Tá. Combinado. Mas eu escolho o lado da janela.', se='eu:A'),
    op('abre', 'k3_b_abre', '— Eu também vou tentar. Eu não levo jeito para isso. Mas eu vou tentar.', se='eu:B', ef=dict(vinculo=1)),
    op('cuida', 'k3_b_cuida', '— Combinado. O lado da janela é seu. Eu durmo bem em qualquer lugar.', se='eu:B'),
    op('seco', 'k3_b_seco', '— Combinado. Amanhã, sete da manhã, eu uso o banheiro primeiro.', se='eu:B'),
  ]),
 ],
 pool=[
  op('cuida', 'pl_cuida', '(Servir café para a outra pessoa, sem perguntar se a pessoa quer.)', acao=True),
  op('seco', 'pl_seco', '(Olhar a mesa dobrável, que balança, e calçar um guardanapo debaixo da perna curta.)', acao=True),
  op('flerte', 'pl_flerte', '(Sustentar o olhar um segundo a mais do que o necessário e desviar primeiro.)', acao=True),
  op('abre', 'pl_abre', '— Eu não sei o que a gente está fazendo. Mas eu estou aqui.'),
  op('fere', 'pl_fere', '(Cruzar os braços e esperar que a outra pessoa recue.)', acao=True),
 ],
 fecho="""Lá embaixo, a ópera termina, e alguém aplaude sozinho. Uma das duas ri, baixo, e a outra, depois de um segundo, também. É um riso curto, torto, de duas pessoas que acabaram de aceitar o mesmo erro. A luz, pela janela do pátio, já é de fim de dia.""",
 ir='ts_c1_decisao')

NOS['ts_c1_decisao'] = dict(tipo='decisao', cap=1, lugar='Quarto, Casa Bianchini', hora='Sábado · 22h00',
 texto="""Dez da noite, e o apartamento está em silêncio, que é a primeira das regras a ser cumprida. A cama de ferro, com a colcha branca, espera. Há dois travesseiros, uma coberta só e uma luminária de cabeceira, de abajur de papel, que acende com um estalo.

Falta a negociação que ninguém quer fazer em voz alta, e que, por isso, só pode ser feita em votação silenciosa.""",
 pergunta='Como as duas dormem?',
 ir={'A': 'ts_c1_noite_a', 'B': 'ts_c1_noite_b'},
 acoes=[
  dict(id='cama', texto='As duas na cama, cada uma na sua metade, com um travesseiro no meio', efeitos=dict(flag='dormiram_cama', vinculo=1),
   resultado="""Vocês combinam: cama dividida, cada uma de um lado, com um travesseiro como fronteira. Nenhuma diz *boa noite* de imediato. A colcha branca, grande demais, cobre as duas, e o travesseiro no meio, a cada respiração, parece mais fino."""),
  dict(id='chao', texto='Uma na cama, a outra no chão, num colchonete de ginástica que a signora Ottavia deixou na porta', efeitos=dict(flag='dormiram_chao'),
   resultado="""Vocês combinam o colchonete. A signora Ottavia, no corredor, havia deixado, sem pedir, um rolo de espuma azul de academia e um cobertor de lã áspera, com um bilhete em italiano. Quem fica no chão sente o frio do mármore subir pelas costas, e quem fica na cama sente o peso de ter aceitado o lado quente."""),
  dict(id='turnos', texto='Revezar: três noites em cada lugar, e começa quem perder no cara ou coroa', efeitos=dict(flag='dormiram_revezando', vinculo=1),
   resultado="""Vocês decidem revezar. Uma moeda de dois euros sobe, gira e cai, na palma de uma mão, com a coroa para cima. A decisão é rápida e justa e, de algum modo, a mais íntima, porque só os dois, naquela casa, saberão como foi a primeira noite de cada uma."""),
 ])

NOS['ts_c1_noite_a'] = dict(tipo='solo', cap=1, seat='A', lugar='Quarto, Casa Bianchini', hora='Sábado · 23h45',
 texto="""São quase meia-noite, a luz do abajur de papel está acesa, e você está deitad{{eu.o_a}} de costas, de olhos abertos, a vinte centímetros de uma pessoa que, a seu lado, lê. {{B.Ele_ela}} lê um livro grosso, de capa dura, em italiano, com um lápis na orelha e um marcador de página de couro, e vira cada folha com um som que você nunca soube que existia: um suspiro de papel.

Em Los Angeles, você nunca dormiu em silêncio. Sempre havia um carro, um vizinho, uma festa, uma série passando na TV da sala, para encobrir a voz dos seus pais no corredor. Aqui, o silêncio tem o tamanho de um quarto, e você não sabe o que fazer com ele.""",
 acoes=[
  dict(id='falar', texto='Perguntar baixinho o que a outra pessoa está lendo, só para ter alguma coisa no ar', ir='ts_c1_fim',
   efeitos=dict(flag='a_perguntou_livro', vinculo=1),
   resultado="""— O que você está lendo? — você sussurra. A pessoa ao lado demora um segundo a responder, como quem não esperava ser interrompida e descobre que não se importa. *Vasari*, diz. *As vidas dos artistas.* Você diz que nunca leu. *Eu sei*, diz a voz do lado, *eu li o seu silêncio*. E a frase fica no escuro, sem explicação, e você, pela primeira vez, não sabe o que responder."""),
  dict(id='fingir', texto='Fechar os olhos e fingir dormir, mesmo sem sono, para não incomodar', ir='ts_c1_fim',
   efeitos=dict(flag='a_fingiu_dormir', abalo=1),
   resultado="""Você fecha os olhos. Conta, mentalmente, vinte folhas viradas. A respiração ao seu lado é regular, e o lápis na orelha da outra pessoa, que você vê pela fresta dos cílios, brilha com a luz do abajur. É a performance mais longa da sua vida, e você é bom nisso, e o que não sabe é por que está fazendo."""),
  dict(id='celular', texto='Pegar o celular e abrir as redes sociais, com a tela virada para baixo, para ter companhia', ir='ts_c1_fim',
   efeitos=dict(flag='a_abriu_celular'),
   resultado="""Você pega o celular, abaixa o brilho ao mínimo e abre as redes. Uma festa em Los Angeles, uma foto de praia, um *story* do ex, que você ignora com o polegar. A luz azul na sua cara é a única coisa que se parece com casa. A pessoa ao lado, sem erguer os olhos do livro, diz, em voz baixíssima: *você pode pôr o celular no modo avião. A luz me atrapalha.* Você põe."""),
 ])

NOS['ts_c1_noite_b'] = dict(tipo='solo', cap=1, seat='B', lugar='Quarto, Casa Bianchini', hora='Sábado · 23h45',
 texto="""São quase meia-noite. Você está sentad{{eu.o_a}} na cama, de costas para a cabeceira de ferro, com o livro de Vasari aberto no colo, a luz do abajur de papel e um lápis na orelha. Há trinta e duas páginas para ler antes de dormir, uma meta que você se impôs há três anos e que, até hoje, nunca deixou de cumprir. A pessoa deitada ao seu lado, a vinte centímetros, está acordada. Você sabe pelo ritmo.

Há uma regra que você escreveu, a número cinco: *silêncio depois das 22h*. Você escreveu pensando em barulho, em música, em festa. Não pensou em respiração. É a primeira vez que o seu método não prevê uma coisa.

A luz do abajur, amarela, ilumina a colcha branca e o contorno de uma mão que repousa ao lado do travesseiro, aberta, de palma para cima, como quem esqueceu de fechá-la.""",
 acoes=[
  dict(id='apagar', texto='Apagar a luz, fechar o livro e tentar dormir, por consideração', ir='ts_c1_fim',
   efeitos=dict(flag='b_apagou_luz', vinculo=1),
   resultado="""Você marca a página com o marcador de couro, fecha o livro e apaga o abajur. O quarto fica escuro, e o escuro, que você sempre achou eficiente, parece, hoje, enorme. A respiração ao lado muda de ritmo, só um pouco, e você entende que, no escuro, a outra pessoa também respira diferente. Você demora uma hora a dormir, e não conta a ninguém."""),
  dict(id='ler', texto='Continuar lendo, em silêncio, e cumprir a meta de trinta e duas páginas', ir='ts_c1_fim',
   efeitos=dict(flag='b_continuou_lendo'),
   resultado="""Você continua. A meta é a meta. Cada folha virada é um pequeno suspiro de papel, e você, que nunca reparou, repara. Na página vinte, o seu lápis para no ar. Ao lado, a pessoa, de olhos abertos, não se mexe. Você termina as trinta e duas páginas às duas da manhã, com a convicção estranha de ter lido para duas."""),
  dict(id='perguntar', texto='Perguntar à pessoa ao lado se a luz a incomoda, antes de decidir', ir='ts_c1_fim',
   efeitos=dict(flag='b_perguntou_luz', vinculo=2),
   resultado="""— A luz incomoda? — você pergunta, baixo. A pessoa ao lado vira o rosto e olha você pela primeira vez desde a cozinha. *Não*, diz a voz, *eu gosto de saber que tem alguém acordado.* A frase é tão simples e tão pouco do que você esperava, que você, por um instante, esquece o que ia dizer. Depois, devagar, vira a página."""),
 ])

NOS['ts_c1_fim'] = dict(tipo='fim', cap=1, lugar='Casa Bianchini, Siena', hora='Domingo · 07h00',
 texto="""Domingo, sete da manhã, e Siena acorda com sinos. O primeiro vem da Torre del Mangia, grave e lento. Depois, os de cada igreja, um por vez, em uma desordem ordenada, como uma cidade inteira respirando em compassos diferentes. {{se flag:dormiram_cama}}Na cama de ferro, com um travesseiro que, durante a noite, mudou de lugar, duas pessoas acordam a uma distância que ninguém mediu. {{/se}}{{se flag:dormiram_chao}}No chão, num colchonete azul, uma pessoa acorda com o corpo de quem dormiu em mármore, e, na cama, outra acorda com o peso de quem aceitou o lado quente. {{/se}}{{se flag:dormiram_revezando}}Uma moeda de dois euros, na cômoda, mostra a coroa para cima. {{/se}}

{{se flag:b_apagou_luz}}O abajur está apagado. {{/se}}{{se flag:b_continuou_lendo}}O abajur ficou aceso a noite inteira. {{/se}}{{se flag:a_fingiu_dormir}}Uma pessoa fingiu dormir durante duas horas, e a outra sabia. {{/se}}{{se flag:a_perguntou_livro}}Vasari, *As vidas dos artistas*, está aberto sobre a cômoda, com o marcador de couro na página trinta e dois. {{/se}}

Alguém bate na porta do apartamento, duas vezes, com o nó do dedo. Na soleira, de avental e de rolo de cabelo, a signora Ottavia segura uma travessa coberta com um pano e diz, em italiano, uma frase comprida, com a mão no coração, apontando as duas. Nenhuma das duas entende uma palavra.

Mas a travessa, quando o pano sai, tem uma torta de ricota e espinafre ainda quente, e um bilhete, em inglês torto, de letra de escola primária: *Duas moças. Uma casa. Comam.*""",
 gancho="Uma torta quente, um bilhete em inglês torto e duas pessoas que acabaram de aceitar o mesmo erro.",
 ir='ts_c2_cozinha')
