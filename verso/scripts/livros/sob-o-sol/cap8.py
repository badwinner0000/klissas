# Sob o Sol da Toscana · Capítulo 8 · A Viagem
NOS = {}

def op(tom, tag, texto, se=None, ef=None, acao=False):
    d = dict(tom=tom, tag=tag, texto=texto)
    if se: d['se'] = se
    if ef: d['efeitos'] = ef
    if acao: d['acao'] = True
    return d

NOS['ts_c8_viagem'] = dict(tipo='segue', cap=8, lugar='Estação de Siena', hora='Sábado, uma semana depois · 08h20', npcs=['giulia'],
 ir={'A': 'ts_c8_a', 'B': 'ts_c8_b'},
 texto="""O trem regional de Siena a Florença sai às oito e vinte e quatro, tem três vagões de assento azul-desbotado e uma janela, do lado esquerdo, que mostra, durante uma hora e meia, a Toscana inteira: colinas em ondas, ciprestes enfileirados como pontos de exclamação, vinhedos amarelos de novembro, um castelo, uma vila no alto de um morro, uma neblina fina nas baixadas.

Há uma semana, as duas têm um acordo sem papel: *nada precisa ser decidido até o fim do mês*. {{se flag:combinaram_tempo}}A fita adesiva sem nada escrito, na geladeira, marca o dia primeiro. {{/se}}O trabalho de Cultura Italiana, sobre a *Anunciação* de Simone Martini, que fica em Florença, na Galleria degli Uffizi, tem uma data: dezesseis de dezembro. As duas decidiram, em comum acordo, ir ver o quadro ao vivo.

A Giulia, na plataforma, de sacola e de sobrancelha arqueada, entrega às duas, em silêncio, um pacote de papel pardo com dois sanduíches, e diz, só: *não voltem muito cedo.*""")

NOS['ts_c8_a'] = dict(tipo='solo', cap=8, seat='A', lugar='Trem regional Siena–Florença', hora='Sábado · 08h40',
 texto="""Você nunca esteve num trem italiano. A janela, a seu lado, é uma tela viva: a luz da manhã, baixa e dourada, entra de lado e faz de cada cipreste uma agulha de ouro. A pessoa ao lado, de gola alta e de mochila no colo, lê, ou finge, um volume de Baxandall, e, de vez em quando, olha pela janela, rápido, e volta ao livro.

Você tem os dois sanduíches da Giulia no colo, um de presunto e queijo, outro de tomate e mussarela, e a certeza de que o dia, que começou com um café feito por outra pessoa, não pode dar errado. Mas o coração, esse, tem a pressa de um relógio que ninguém acertou.

Do outro lado do corredor, uma senhora de lenço na cabeça, com um cesto, ri, olhando as duas, e diz uma frase em italiano que nenhuma entende, e que o seu corpo, sem tradução, entende.""",
 acoes=[
  dict(id='dividir', texto='Abrir o pacote e oferecer um dos sanduíches, sem perguntar qual a outra pessoa prefere', ir='ts_c8_dividir',
   efeitos=dict(flag='a_ofereceu_sanduiche', vinculo=2),
   resultado="""Você abre o papel pardo, destaca o sanduíche de tomate e o estende por cima do braço do assento. *Esse é o seu*, diz. A pessoa olha o sanduíche, depois você, e, devagar, pega. *Como você sabia?*, pergunta. *Eu vi o que você come*, você diz, *nas últimas semanas.* O silêncio que se segue tem gosto de tomate e de manjericão."""),
  dict(id='janela', texto='Chegar um pouco mais perto da janela e apontar uma vila no alto de um morro, como quem divide um segredo', ir='ts_c8_dividir',
   efeitos=dict(flag='a_apontou_vila', vinculo=1),
   resultado="""Você se inclina, e aponta uma vila, no alto de um morro, de torres e de muros ocres. *Aquela ali*, você diz, baixo. *Eu vou morar naquela.* A pessoa ao lado ergue os olhos do livro, e o rosto, no reflexo do vidro, sorri, só um pouco. *É San Gimignano*, diz. *Tem catorze torres. Eram setenta.* Você não sabia. Fica, ali, de olhos na vila, ouvindo."""),
  dict(id='fotos', texto='Pegar o celular e tirar uma foto da paisagem, depois da outra pessoa, sem avisar', ir='ts_c8_dividir',
   efeitos=dict(flag='a_tirou_foto', abalo=1),
   resultado="""Você tira uma foto da paisagem. Depois, com o celular ainda erguido, baixa a câmera, e, em um segundo, sem avisar, fotografa a pessoa ao lado: de perfil, com o livro no colo e a luz da janela na bochecha. Olha a foto. É a melhor imagem que tirou na vida, e a única de que não vai mostrar a ninguém."""),
 ])

NOS['ts_c8_b'] = dict(tipo='solo', cap=8, seat='B', lugar='Trem regional Siena–Florença', hora='Sábado · 08h40',
 texto="""Você leu a mesma página de Baxandall quatro vezes. A janela, ao lado, é uma distração que nenhum livro previu: a luz, baixa e dourada, em cima de uma colina onde um ciprestes solitário projeta uma sombra de trinta metros. Você nunca viu isso nas gravuras. As gravuras, descobre, eram uma tradução, e este é o original.

A pessoa a seu lado, que dorme mal, ou nada, tem os dois sanduíches da Giulia no colo e olha a paisagem com uma atenção que não é a de sempre: a de quem, pela primeira vez, não está tentando ser vista. Você observa o contorno do rosto, de lado, contra a janela, e pensa que a luz da Toscana, a que você escreveu como *instrumento de devoção*, tem uma serventia mais simples: ilumina o que se ama.

Você escreve, no caderno, uma frase. Risca. Escreve de novo.""",
 acoes=[
  dict(id='aceitar', texto='Aceitar o que vier, e deixar a viagem ser só uma viagem, sem tese, sem ficha, sem tabela', ir='ts_c8_dividir',
   efeitos=dict(flag='b_aceitou_viagem', vinculo=2),
   resultado="""Você fecha o Baxandall e o guarda na mochila. A decisão, que parece pequena, tem o peso de uma mudança de religião. Sem livro, sem caderno, sem lápis, o que sobra são as mãos, no colo, e uma colina que passa. Em dez minutos, você descobre que olhar uma paisagem, sem anotar nada, é uma forma de leitura mais profunda do que qualquer outra."""),
  dict(id='explicar', texto='Explicar à outra pessoa, baixo, o nome de cada vila que passa, para ter o que dizer', ir='ts_c8_dividir',
   efeitos=dict(flag='b_explicou_vilas', vinculo=1),
   resultado="""Você diz, baixo: *Monteriggioni. Colle di Val d'Elsa. San Gimignano.* A cada nome, uma história, de cerco, de peste, de uma torre que caiu. A pessoa a seu lado escuta, de queixo apoiado na mão, de olhos na janela, e, de vez em quando, pergunta uma coisa curta. Você nunca falou tanto em um trem."""),
  dict(id='silencio', texto='Ficar em silêncio, de olhos na janela, e deixar o ombro da outra pessoa encostar no seu, com o balanço', ir='ts_c8_dividir',
   efeitos=dict(flag='b_deixou_ombro', vinculo=2),
   resultado="""Você fica em silêncio. O trem balança, e o ombro de uma pessoa, sem querer, encosta no seu. Você não se afasta. O calor, através de duas camadas de roupa, é uma coisa nova e muito simples. Dez minutos, quinze. Você descobre que o silêncio, com alguém ao lado, não é ausência: é um lugar."""),
 ])

NOS['ts_c8_dividir'] = dict(tipo='dividir', cap=8, lugar='Florença', hora='Sábado · 10h30', cada=1,
 texto="""A Estação de Santa Maria Novella, em Florença, cheira a café, a perfume e a pressa. Quarenta mil turistas, em fila, empurram, de mapa na mão, em direção ao Duomo. As duas, de mochila, saem para a rua, e, em dez minutos, estão sem rumo: a seta do celular gira, o mapa de papel não bate com as ruas, e uma pessoa que diz saber o caminho, e outra, que não faz questão de saber, escolhem, cada uma, uma direção.

O Uffizi fecha às seis e quinze. A *Anunciação* de Simone Martini espera, em uma sala de paredes vermelhas, no primeiro andar.""",
 pergunta='O que você faz?',
 acoes=[
  dict(id='mapa', texto='Insistir no mapa de papel, rua por rua, até achar o caminho', efeitos=dict(flag='seguiu_mapa'),
   resultado="""Você abre o mapa de papel, vira ao contrário, vira de lado, e segue, rua por rua, com o dedo na linha. Em quarenta minutos, vocês passaram duas vezes pela mesma fonte. Mas a pessoa ao lado não reclama: apenas segue, atrás, com um sorriso que só você, por sorte, não vê."""),
  dict(id='seguir', texto='Largar o mapa, seguir o instinto, e virar em qualquer rua que tenha uma luz bonita', efeitos=dict(flag='seguiu_instinto', vinculo=2),
   resultado="""Você larga o mapa, e vira à direita, depois à esquerda, depois em uma viela de paredes ocres, onde um homem de avental pendura salsichas, e uma loja de papel marmorizado vende cadernos cor de berinjela. Vocês se perdem, de verdade, e é a melhor coisa que acontece até o meio-dia. A luz, na viela, é uma pausa."""),
  dict(id='perguntar', texto='Parar e perguntar o caminho a uma senhora de lenço, em um italiano de três frases', efeitos=dict(flag='perguntou_caminho', vinculo=1),
   resultado="""Você para uma senhora de lenço e de sacola e pergunta, em um italiano de três frases, *dove è Uffizi?* A senhora, com a paciência de quem já ensinou a cidade a muitas gerações, explica, em dez frases, com as duas mãos, e termina com um sorriso e uma frase que vocês, sem entender, repetem a manhã inteira: *buon viaggio, ragazze*."""),
 ],
 desfecho="""À uma da tarde, depois de um gelato, de uma ponte e de uma sequência de erros que, vistos de longe, formam um desenho, as duas finalmente chegam, de pé, na fila do Uffizi, com os pés doloridos, a roupa um pouco suada e os rostos de quem passou uma manhã feliz sem notar.""",
 ir='ts_c8_dialogo')

NOS['ts_c8_dialogo'] = dict(tipo='dialogo', cap=8, lugar='Galleria degli Uffizi, Sala 3', hora='Sábado · 15h40', comeca='B',
 texto="""A Sala 3 do Uffizi tem as paredes vermelhas, um piso de madeira encerada, um cheiro de verniz antigo e, em frente à porta, no meio de uma parede, um quadro de três metros, de ouro, de azul e de vermelho: a *Anunciação*, de Simone Martini, de 1333.

O anjo, de asas coloridas, ajoelha; a Virgem, de manto azul, recua. Entre os dois, um vaso de lírios e uma frase, em letras douradas, que sai da boca do anjo. A sala, nesta hora, está quase vazia. As duas ficam, de pé, a dois passos do quadro, sem dizer nada, durante um tempo que nenhum relógio registra.""",
 turnos=[
  dict(prompt='A primeira frase é sua.', opcoes=[
    op('abre', 'r0_b_abre', '— É mais bonito do que eu imaginei. Eu li sobre ele durante três anos e nunca estive aqui.', se='eu:B', ef=dict(vinculo=2)),
    op('seco', 'r0_b_seco', '(Dar um passo à frente, devagar, e inclinar a cabeça para ver o ouro de perto.)', se='eu:B', acao=True),
    op('cuida', 'r0_b_cuida', '— Chega mais perto. A luz muda. Deixa eu mostrar o que eu vejo.', se='eu:B'),
    op('abre', 'r0_a_abre', '— Eu não entendo nada de arte. Mas eu sinto uma coisa quando olho para ele.', se='eu:A', ef=dict(vinculo=2)),
    op('flerte', 'r0_a_flerte', '— O anjo está tão tímido. Parece que tem medo de falar. Eu me reconheço.', se='eu:A'),
    op('seco', 'r0_a_seco', '(Cruzar os braços, de lado, e olhar o quadro de baixo para cima, em silêncio.)', se='eu:A', acao=True),
  ]),
  dict(prompt='Agora você responde.', opcoes=[
    op('abre', 'r1_a_abre', '— O que você sente quando olha? Eu quero saber. Eu quero que você me conte do jeito que você vê.', se='eu:A', ef=dict(vinculo=2)),
    op('flerte', 'r1_a_flerte', '— Você olha o quadro como eu olho um vestido: com paixão e com técnica.', se='eu:A'),
    op('seco', 'r1_a_seco', '— Me diz uma coisa que você sabe, e que ninguém mais sabe.', se='eu:A'),
    op('abre', 'r1_b_abre', '— O que eu sinto é medo. Medo de um anjo que chega com uma notícia que muda tudo.', se='eu:B', ef=dict(vinculo=2)),
    op('seco', 'r1_b_seco', '— A Virgem recua. Ela não esperava. Ninguém espera.', se='eu:B'),
    op('cuida', 'r1_b_cuida', '— Eu sinto o que você sente. Só que eu aprendi a dar nome.', se='eu:B'),
  ]),
  dict(prompt='A conversa é sua de novo.', opcoes=[
    op('abre', 'r2_b_abre', '— Eu sempre achei que a Virgem estava com medo. Hoje eu acho que ela está só... surpreendida pela alegria.', se='eu:B', ef=dict(flag='b_disse_alegria', vinculo=2)),
    op('flerte', 'r2_b_flerte', '— O manto dela é de azul de lápis-lazúli. Mais caro do que ouro. Eles o usavam para o que importava.', se='eu:B'),
    op('seco', 'r2_b_seco', '(Mover a mão, no ar, a um centímetro do manto azul, sem tocar.)', se='eu:B', acao=True),
    op('abre', 'r2_a_abre', '— Eu acho que ela recua porque não sabe se merece. Eu conheço esse movimento.', se='eu:A', ef=dict(flag='a_disse_merece', vinculo=2)),
    op('flerte', 'r2_a_flerte', '— O anjo parece estar quase dizendo: *eu vim te dizer uma coisa boa, não precisa ter medo.*', se='eu:A'),
    op('seco', 'r2_a_seco', '(Dar um passo, até o ombro encostar no ombro da outra pessoa, e ficar.)', se='eu:A', acao=True),
  ]),
  dict(prompt='A última palavra da sala é sua.', opcoes=[
    op('abre', 'r3_a_abre', '— Obrigad{{eu.o_a}} por me trazer aqui. Eu nunca teria visto isso sem você.', se='eu:A', ef=dict(vinculo=2)),
    op('flerte', 'r3_a_flerte', '— A gente devia escrever o trabalho como uma carta de amor ao quadro.', se='eu:A'),
    op('seco', 'r3_a_seco', '(Segurar, com a ponta dos dedos, a manga da outra pessoa, e não largar.)', se='eu:A', acao=True),
    op('abre', 'r3_b_abre', '— Obrigad{{eu.o_a}} por vir comigo. Eu nunca teria visto isso assim sem você.', se='eu:B', ef=dict(vinculo=2)),
    op('flerte', 'r3_b_flerte', '— A gente devia escrever o trabalho a quatro mãos. Eu escrevo os fatos, você as sensações.', se='eu:B'),
    op('seco', 'r3_b_seco', '(Pousar a mão, de leve, na mão que segura a manga, e fechar os olhos.)', se='eu:B', acao=True),
  ]),
 ],
 pool=[
  op('cuida', 'pl_cuida', '(Oferecer a garrafa de água, sem desviar os olhos do quadro.)', acao=True),
  op('seco', 'pl_seco', '(Olhar o relógio da parede, que marca 15:52, e depois o chão.)', acao=True),
  op('flerte', 'pl_flerte', '(Sorrir de lado, para o quadro, e deixar o sorriso ser visto.)', acao=True),
  op('abre', 'pl_abre', '— Eu não sei o que dizer. Mas eu quero ficar aqui.'),
  op('fere', 'pl_fere', '(Soltar o ar devagar, com os olhos fechados, e abrir de novo.)', acao=True),
 ],
 fecho="""Um guarda de uniforme escuro, no canto da sala, pigarreia, com delicadeza: faltam quinze minutos para o fechamento. As duas, sem se mexer, olham o anjo e a Virgem, uma última vez, e, ao mesmo tempo, sem combinar, respiram fundo, como quem sai de uma igreja.""",
 ir='ts_c8_decisao')

NOS['ts_c8_decisao'] = dict(tipo='decisao', cap=8, lugar='Lungarno, Florença', hora='Sábado · 17h45',
 texto="""Fora do Uffizi, o sol de novembro, baixo, faz do rio Arno uma lâmina de cobre. A Ponte Vecchio, com as lojas de ouro de portas fechadas, é uma sombra comprida. As duas, de mochila, andam pela margem, com o rosto cheio de uma coisa que não é cansaço.

O trem para Siena sai às vinte e vinte e dois. Até lá, há três horas e um rio.""",
 pergunta='Para onde as duas vão?',
 ir='ts_c8_consente1',
 acoes=[
  dict(id='ponte', texto='Ficar no Lungarno, na beira do Arno, vendo o pôr do sol na Ponte Vecchio', efeitos=dict(flag='ficaram_arno', vinculo=2),
   resultado="""Vocês ficam à beira do rio, de cotovelos no parapeito de pedra, vendo a luz mudar. O Arno, abaixo, desliza, sem pressa, em uma cor que nenhuma tinta tem. A Ponte Vecchio, de longe, acende suas luzes, uma a uma, e o reflexo cai na água, como um colar derramado."""),
  dict(id='colina', texto='Subir ao Piazzale Michelangelo, de onde se vê Florença inteira', efeitos=dict(flag='foram_piazzale', vinculo=1),
   resultado="""Vocês sobem, a pé, as escadas do Piazzale Michelangelo, quarenta minutos de degraus de pedra entre ciprestes. De lá, a cidade se abre: o Duomo, a Torre de Arnolfo, as pontes, os telhados cor de ferrugem, tudo dourado. O fim de tarde é de uma beleza que quase dói. As duas se sentam, na mureta, em silêncio."""),
  dict(id='perder', texto='Atravessar a ponte, ir para o Oltrarno, e se perder de novo, de propósito, nas vielas', efeitos=dict(flag='foram_oltrarno', vinculo=2),
   resultado="""Vocês atravessam a ponte e entram no Oltrarno, o bairro de artesãos, de ruas estreitas, de oficinas de marceneiros e de restaurantes de portas abertas. Perdem-se, de propósito, entre um ateliê de sapatos e uma loja de molduras. Em uma praça pequena, uma senhora vende castanhas assadas num cone de jornal, e as duas dividem o cone, de pé, de mãos queimadas."""),
 ])

NOS['ts_c8_consente1'] = dict(tipo='consentimento', cap=8, lugar='Lungarno, às margens do Arno', hora='Sábado · 19h30',
 texto="""O Arno, às sete e meia da noite, é um espelho escuro, com as luzes das pontes dobradas em cada onda. Um violinista, longe, toca uma música que não tem nome, e o som, sobre a água, chega em pedaços. Na pedra do parapeito, ainda morna do dia, as duas, de cotovelos juntos, não dizem uma palavra há dez minutos.

{{se flag:beijo_rua}}Há uma lembrança de um arco de tijolos, de uma noite de vinho, de uma manhã de costas. {{/se}}{{se !flag:beijo_rua}}Há uma lembrança de um arco de tijolos, de uma noite em que nada aconteceu, e que ocupou um mês. {{/se}}Uma pergunta, que ninguém faz em voz alta, ocupa o espaço entre os dois ombros. Cada uma decide por dentro, e só se as duas quiserem alguma coisa acontece.""",
 pergunta='O que você quer?',
 avancar='Beijar. Agora, diante do rio, sem pressa.',
 ficar='Ficar perto, e ainda não atravessar.',
 flag='beijo_arno',
 irAvancou='ts_c8_sim', irSem='ts_c8_nao')

NOS['ts_c8_sim'] = dict(tipo='segue', cap=8, lugar='Lungarno, às margens do Arno', hora='Sábado · 19h33', requer=['beijo_arno'],
 ir='ts_c8_perdido',
 texto="""Desta vez, ninguém foge. Uma das duas, a que, uma vez, recuou, vira o rosto, devagar, e a outra, que esperou um mês, espera ainda um segundo. O beijo, quando vem, não tem hesitação: é lento, firme, de duas pessoas que já sabem o caminho, e que, por isso, podem demorar. A mão de uma sobe, sem pressa, ao rosto da outra. A água, abaixo, passa. O violinista, ao longe, toca uma nota que dura.

Quando se afastam, a testa ainda encostada, os olhos abertos, a luz da Ponte Vecchio, no fundo, desenha em cada rosto um halo de ouro. *Eu não estou fugindo*, diz uma, em voz tão baixa que o rio quase a leva. *Eu sei*, diz a outra. E, em Florença, às sete e trinta e três, o tempo, que as duas sempre controlaram, para.""")

NOS['ts_c8_nao'] = dict(tipo='segue', cap=8, lugar='Lungarno, às margens do Arno', hora='Sábado · 19h33', exclui=['beijo_arno'],
 ir='ts_c8_perdido',
 texto="""Nada acontece, e nada acontecer também diz alguma coisa. As duas ficam à beira do Arno, a um palmo uma da outra, com o rio passando, o violino tocando e a Ponte Vecchio acesa ao fundo. Um dos ombros, de leve, encosta no outro, e fica. Não é um beijo. É uma presença.

*Está ficando frio*, diz uma. *Está*, diz a outra. Nenhuma se mexe. O violinista, ao longe, termina uma música, recomeça, e a noite, sem pressa, continua.""")

NOS['ts_c8_perdido'] = dict(tipo='segue', cap=8, lugar='Estação de Santa Maria Novella', hora='Sábado · 21h05',
 ir='ts_c8_consente2',
 texto="""Às nove e cinco, na Estação de Santa Maria Novella, o painel de partidas, de letras laranja, mostra uma coluna de nomes de cidades e, ao lado, uma palavra, em vermelho, que as duas, depois de duas leituras, entendem: *SOPPRESSO*. O trem das vinte e vinte e dois, o último para Siena, foi cancelado. Um funcionário, de colete, explica, com as mãos, que *uma árvore caiu na linha, perto de Poggibonsi*. O próximo trem é às seis da manhã.

Nenhuma das duas, ao saber, parece surpresa. Apenas se olham, no meio da estação, com uma expressão que tem, ao mesmo tempo, o espanto de quem fez um mau cálculo e o alívio de quem recebeu um presente.

— Há um hotel aqui perto — diz uma, em voz baixa, olhando o painel. — Pequeno. Eu vi uma placa. Eu não sei se tem quarto.""")

NOS['ts_c8_consente2'] = dict(tipo='consentimento', cap=8, lugar='Hotel Santa Croce, Florença', hora='Sábado · 22h10',
 texto="""O Hotel Santa Croce, uma pensão de seis quartos, num palácio de tijolos, tem uma recepção de balcão de madeira, um recepcionista de pijama e de chinelo, e um único quarto livre, no último andar, com uma cama de casal e uma janela para os telhados. O recepcionista, sem perguntar nada, entrega uma chave de ferro, com um sorriso discreto de quem já viu essa cena em muitas versões.

{{se flag:beijo_arno}}O gosto do Arno ainda está nas bocas. {{/se}}{{se !flag:beijo_arno}}O que não aconteceu no Arno ainda está nas mãos. {{/se}}No quarto, de teto de vigas e de papel de parede de rosas desbotadas, uma cama de ferro, parecida com a de Siena, mas mais larga, espera. A porta, fechada, deixa o mundo do lado de fora.

Uma pergunta, que ninguém faz em voz alta, ocupa o espaço da cama. Cada uma decide por dentro.""",
 pergunta='O que você quer?',
 avancar='Ficar. Deixar a noite acontecer.',
 ficar='Dormir ao lado, e deixar a noite ser só uma noite.',
 flag='noite_florenca',
 irAvancou='ts_c8_noite', irSem='ts_c8_noite')

NOS['ts_c8_noite'] = dict(tipo='segue', cap=8, lugar='Hotel Santa Croce, Florença', hora='Sábado · 22h30',
 ir='ts_c8_fim',
 texto="""{{se flag:noite_florenca}}A chave gira, a porta fecha, e o mundo diminui até o tamanho de um quarto de teto de vigas. A luz do abajur, de papel amarelo, é suave. A janela está entreaberta, e, lá fora, os telhados de Florença, sob uma lua pequena, são um mar de telhas. Alguém tira, devagar, uma mochila dos ombros de outra. Alguém abre, botão por botão, um casaco que ainda tem cheiro de rio.

Há uma pausa em que as duas, que passaram um mês aprendendo a medir cada gesto, não medem nada. Depois, a noite se encarrega do resto, e é uma noite de respiração, de pele fria que esquenta, de dedos que descobrem o que o silêncio já sabia. O mundo, por respeito, não a descreve.

Lá embaixo, na rua, um sino bate onze horas, e ninguém conta.{{senao}}As duas entram, e a porta fecha. O quarto, de teto de vigas e papel de rosas, tem uma luz de abajur que desenha na cama duas metades. Cada uma se troca no banheiro, uma de cada vez, e volta, de camiseta emprestada, de cabelo preso, de rosto lavado.

Deitam-se, de costas, lado a lado, a um palmo uma da outra, olhando as vigas do teto. Ninguém diz nada. Mas, depois de um minuto, uma mão procura a outra, no lençol, e as duas, entrelaçadas, ficam assim, sem pressa, até o sono vir.{{/se}}""")

NOS['ts_c8_fim'] = dict(tipo='fim', cap=8, lugar='Hotel Santa Croce, Florença', hora='Domingo · 06h30',
 texto="""Domingo, seis e meia da manhã, e Florença, lá fora, acorda com os primeiros sinos e uma luz de lavanda. {{se flag:noite_florenca}}Na cama de ferro, sob um lençol que tem a forma de duas pessoas, uma acorda com a cabeça no ombro da outra, e fica, de olhos fechados, ouvindo o coração. {{/se}}{{se !flag:noite_florenca}}Na cama de ferro, sob um lençol de rosas, duas mãos continuam entrelaçadas, de manhã, sem que ninguém as tenha soltado durante a noite. {{/se}}{{se flag:seguiu_mapa}}O mapa de papel, dobrado, está sobre a cadeira. {{/se}}{{se flag:seguiu_instinto}}Uma loja de cadernos cor de berinjela, numa viela, continua um segredo. {{/se}}{{se flag:perguntou_caminho}}*Buon viaggio, ragazze* ainda soa na memória. {{/se}}{{se flag:b_disse_alegria}}Uma frase, na Sala 3, sobre uma Virgem *surpreendida pela alegria*, voltou a ser dita em silêncio. {{/se}}{{se flag:a_disse_merece}}Uma frase, na Sala 3, sobre uma Virgem que *recua porque não sabe se merece*, voltou a ser dita em silêncio. {{/se}}

O celular de {{A.nome}}, na mesa de cabeceira, vibra, uma vez. Uma mensagem, em inglês, de um número salvo como *Estágio — Roma*. {{B.nome}}, na cama, de rosto ainda sonolento, vê, de relance, a primeira linha da tela iluminada, e não diz nada.

*Prezad{{A.o_a}} {{A.nome}},* diz a mensagem. *Temos o prazer de informar que a sua candidatura ao estágio de Moda e Comunicação, na Maison Ferretti, em Roma, foi aprovada.*""",
 gancho="Uma mensagem de Roma, vista de relance, na manhã de um domingo em Florença.",
 ir='ts_c9_vespera')
