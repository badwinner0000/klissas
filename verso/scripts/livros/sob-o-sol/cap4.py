# Sob o Sol da Toscana · Capítulo 4 · A Chuva
NOS = {}

def op(tom, tag, texto, se=None, ef=None, acao=False):
    d = dict(tom=tom, tag=tag, texto=texto)
    if se: d['se'] = se
    if ef: d['efeitos'] = ef
    if acao: d['acao'] = True
    return d

NOS['ts_c4_biblioteca'] = dict(tipo='segue', cap=4, lugar='Biblioteca degli Intronati, Siena', hora='Sábado · 15h20', npcs=['ottavia'],
 ir={'A': 'ts_c4_a', 'B': 'ts_c4_b'},
 texto="""O primeiro temporal do outono chega a Siena às três e vinte da tarde, sem aviso, como uma pessoa que abre a porta e entra. O céu, que de manhã era de um azul de cartão-postal, vira, em dez minutos, uma massa de chumbo, e o primeiro trovão, grave e comprido, faz tremer as janelas da sala de leitura. Depois, a chuva: uma cortina, uma parede, um barulho de mil dedos na vidraça.

O bibliotecário de óculos, que lia o jornal, ergue os olhos, murmura *eccolo*, e acende todas as lâmpadas de bronze verde. A sala, que era de poeira e de luz, vira um aquário. Lá fora, nas ruas de pedra, a água desce em rios, pelos degraus, e os pombos da praça somem.

{{se flag:trabalho_metodo}}Sobre a mesa, a tabela de vinte e duas linhas está na linha dezoito. {{/se}}{{se flag:trabalho_mistura}}Sobre a mesa, a tabela tem uma linha riscada e uma palavra a lápis: *passeio*. {{/se}}{{se flag:trabalho_livre}}Sobre a mesa, não há tabela alguma, só seis livros abertos e um desenho da Concórdia. {{/se}}As duas, em lados opostos da mesa, olham, ao mesmo tempo, para a janela, e depois para o relógio de parede, que marca 15:24. A biblioteca fecha às dezoito.""")

NOS['ts_c4_a'] = dict(tipo='solo', cap=4, seat='A', lugar='Janela, sala de leitura', hora='Sábado · 15h40',
 texto="""Você nunca gostou de chuva. Em Los Angeles, a chuva é um acontecimento, um dia de carro batido, de shopping lotado, de *story* com legenda de *clima*. Aqui, a chuva é uma coisa grande, antiga, que bate nas pedras de um modo que você não sabia que se podia ouvir.

Você deixa a mesa e vai até a janela, de braços cruzados, de moletom de UCLA, e fica olhando a rua, que virou um rio, e a luz, amarela e fraca, dos postes de ferro que acenderam às quatro. Nenhuma notificação no celular. Nenhum barulho, além da chuva e do tique-taque do relógio de parede.

Atrás de você, a pessoa que estuda não ergue os olhos há uma hora. Mas o lápis parou, e o silêncio, de novo, tem o tamanho exato do quarto.""",
 acoes=[
  dict(id='olhar', texto='Ficar na janela, em silêncio, olhando a chuva, sem pegar o celular', ir='ts_c4_dividir',
   efeitos=dict(flag='a_olhou_chuva', vinculo=2),
   resultado="""Você não pega o celular. Fica ali, de braços cruzados, com a testa quase no vidro. A chuva desce pelas pedras, em fios, e se junta, mais embaixo, em um rio que leva uma folha de plátano, devagar, rumo à praça. Cinco minutos. Dez. É a coisa mais longa que você faz sem fazer nada, e, quando se vira, tem os olhos úmidos, e não sabe de quê."""),
  dict(id='voltar', texto='Voltar à mesa e perguntar, baixo, se a outra pessoa quer fazer uma pausa', ir='ts_c4_dividir',
   efeitos=dict(flag='a_propos_pausa', vinculo=1),
   resultado="""Você volta e se senta, devagar, do outro lado da mesa. *Quer uma pausa?*, pergunta, em voz que mal sai. A pessoa, de lápis na mão, ergue os olhos, e há, no olhar, um pedido de desculpas que nunca vai ser dito. *Dez minutos*, responde. *Cinco.* E fecha o livro, com um cuidado novo, de quem concede uma coisa que não estava na tabela."""),
  dict(id='musica', texto='Pegar o celular, abrir uma playlist e pôr o fone em um só ouvido, só para ter companhia', ir='ts_c4_dividir',
   efeitos=dict(flag='a_pos_playlist'),
   resultado="""Você pega o celular e abre a playlist de Los Angeles, a de carro, a de festa, e põe o fone, só em um ouvido. A música, que sempre foi sua melhor amiga, soa, aqui, diferente: pequena, deslocada, como uma risada em uma igreja. Você a desliga, antes do refrão, e tira o fone, e a chuva, no vidro, ocupa o lugar."""),
 ])

NOS['ts_c4_b'] = dict(tipo='solo', cap=4, seat='B', lugar='Mesa de leitura', hora='Sábado · 15h40',
 texto="""Você tem catorze páginas para ler, uma ficha para redigir, e a impressão incômoda de que as frases estão passando pelos seus olhos sem entrar. A chuva, lá fora, bate nas vidraças com uma regularidade de metrônomo, e você, que sempre aprendeu a estudar com barulho, descobre que há um barulho de que não consegue se defender.

A pessoa que dividia a mesa levantou e foi até a janela. Está ali, de costas, de braços cruzados, de moletom largo, olhando a chuva em um silêncio que você não sabia que {{A.ele_ela}} tinha. A luz do poste, lá fora, desenha o contorno dos ombros. Você lê a mesma linha, a quinta vez: *a luz, em Lorenzetti, é a ordem do mundo.*

Você não sabe quando começou a olhar. Sabe que, quando se dá conta, o seu lápis está parado, no ar, a dois centímetros da folha.""",
 acoes=[
  dict(id='ler', texto='Voltar à linha e ler em voz baixa, para tentar prender a atenção', ir='ts_c4_dividir',
   efeitos=dict(flag='b_leu_voz_baixa'),
   resultado="""Você lê em voz baixa, quase sem som: *a luz, em Lorenzetti, é a ordem do mundo.* A frase, dita, ganha um peso que não tinha na página. Você a repete. Do outro lado da sala, sem se virar, a pessoa na janela inclina a cabeça, de leve, como quem ouve uma música que não sabe qual é."""),
  dict(id='pausa', texto='Fechar o livro, levantar, e ir até a janela, ficar a um metro, sem dizer nada', ir='ts_c4_dividir',
   efeitos=dict(flag='b_foi_janela', vinculo=2),
   resultado="""Você fecha o livro, levanta, atravessa a sala de leitura, de sapatos que não fazem barulho, e se põe ao lado da pessoa, a um metro, olhando a mesma chuva. Ninguém diz nada. A água desce, em fios, e se junta em um rio. Você não sabe o que está fazendo. Sabe que é a primeira coisa, em semanas, que não vem do seu plano."""),
  dict(id='anotar', texto='Anotar, na margem do caderno, uma frase sobre a chuva, para depois, e voltar à ficha', ir='ts_c4_dividir',
   efeitos=dict(flag='b_anotou_chuva', vinculo=1),
   resultado="""Você escreve, na margem, em letra miúda: *chuva em Siena: barulho de dedos*. É a coisa menos acadêmica que já anotou, e você não a risca. Volta à ficha, e, pela primeira vez, as frases entram: a chuva, de algum modo, serviu de tinta."""),
 ])

NOS['ts_c4_dividir'] = dict(tipo='dividir', cap=4, lugar='Biblioteca degli Intronati', hora='Sábado · 17h30', cada=1,
 texto="""Às cinco e meia, a chuva não parou, mas o trovão foi se afastando, e a sala, de lâmpadas verdes e de livros abertos, tem agora uma calma de refúgio. Faz quase duas horas que as duas estão ali, de um lado e do outro de uma mesa, com a chuva como terceira presença.

O bibliotecário, de casaco já vestido, passa, olha o relógio e, sem dizer nada, aponta para a porta com o queixo. Faltam trinta minutos para o fechamento.""",
 pergunta='O que você faz com os últimos minutos?',
 acoes=[
  dict(id='terminar', texto='Terminar a ficha, copiar a última citação e arrumar os livros, como quem encerra um dia', efeitos=dict(flag='terminou_ficha'),
   resultado="""Você copia a citação, fecha o caderno, empilha os seis livros por ordem de tamanho, e os devolve, um por um, às prateleiras de onde vieram. A ordem das coisas, a esta hora, é uma forma de calma. A pessoa ao lado, sem dizer nada, ajuda com os dois últimos."""),
  dict(id='esperar', texto='Ficar sentad{{eu.o_a}}, de braços cruzados, esperando a chuva diminuir', efeitos=dict(flag='esperou_chuva', abalo=1),
   resultado="""Você fica. A chuva não diminui. O relógio de parede marca 17:48, 17:52, 17:55. Cada minuto é uma tentativa de convencer o céu. Ao fundo, o bibliotecário pigarreia, com educação, a segunda vez. Você finalmente se levanta, de má vontade, como quem aceita uma sentença."""),
  dict(id='guarda_chuva', texto='Ir até o saguão, abrir o guarda-chuva verde que ficou no suporte e conferir o tamanho', efeitos=dict(flag='abriu_guarda_chuva', vinculo=1),
   resultado="""Você vai ao saguão, onde o guarda-chuva verde da signora Ottavia espera, pendurado, encostado a um vaso, e o abre, devagar, para conferir. É enorme. É verde-escuro, de varetas de madeira, com um cabo comprido, de cabeça de pássaro, e debaixo dele, descobre, cabem, com folga, duas pessoas que consigam ficar muito perto uma da outra."""),
 ],
 desfecho="""Às dezoito em ponto, o bibliotecário, com um chaveiro na mão, abre a porta do saguão e deixa entrar o barulho da rua: a chuva, o vento, a água descendo pelos degraus. As duas, de mochila, olham para o guarda-chuva, e depois uma para a outra.""",
 ir='ts_c4_dialogo')

NOS['ts_c4_dialogo'] = dict(tipo='dialogo', cap=4, lugar='Saguão da Biblioteca', hora='Sábado · 18h05', comeca='B',
 texto="""O saguão da biblioteca, com o piso de mármore xadrez, as escadas de ferro forjado e uma porta de vidro que dá para a rua molhada, tem um cheiro de pedra encharcada. O guarda-chuva verde, aberto, pende de uma das mãos. O outro braço fica livre.

Fora, em Siena, a chuva é um muro.""",
 turnos=[
  dict(prompt='A primeira frase é sua.', opcoes=[
    op('seco', 'o0_b_seco', '— A distância até o vicolo é de quinze minutos. Com chuva, vinte.', se='eu:B'),
    op('cuida', 'o0_b_cuida', '(Inclinar o guarda-chuva na direção da outra pessoa, antes de qualquer palavra.)', se='eu:B', acao=True),
    op('abre', 'o0_b_abre', '— Eu não costumo dividir guarda-chuva. É uma coisa nova.', se='eu:B', ef=dict(vinculo=1)),
    op('abre', 'o0_a_abre', '— Eu fico com o lado da chuva. Eu não me importo de me molhar.', se='eu:A', ef=dict(vinculo=1)),
    op('flerte', 'o0_a_flerte', '— Fica bem perto, tá? Para não pingar em você. E em mim.', se='eu:A'),
    op('seco', 'o0_a_seco', '— Gente, é só uma chuva. Vamos logo, antes que piore.', se='eu:A'),
  ]),
  dict(prompt='Agora você responde.', opcoes=[
    op('abre', 'o1_a_abre', '— Eu nunca fiquei tão perto de ninguém num guarda-chuva. Nem do meu ex.', se='eu:A', ef=dict(vinculo=2)),
    op('flerte', 'o1_a_flerte', '— Você cheira a papel velho e a sabonete de lavanda. Eu falo isso sem pensar.', se='eu:A'),
    op('seco', 'o1_a_seco', '(Segurar o cabo do guarda-chuva por cima da mão da outra pessoa, para ajudar a firmar.)', se='eu:A', acao=True),
    op('seco', 'o1_b_seco', '— O vento vem do oeste. É melhor andar do lado da parede.', se='eu:B'),
    op('abre', 'o1_b_abre', '— Eu também não. Eu nunca dividi um guarda-chuva com ninguém.', se='eu:B', ef=dict(vinculo=2)),
    op('cuida', 'o1_b_cuida', '— Cuidado com o degrau. A pedra escorrega.', se='eu:B'),
  ]),
  dict(prompt='A conversa é sua de novo.', opcoes=[
    op('abre', 'o2_a_abre', '— Eu fiquei com medo de você, no primeiro dia. Você parecia... um regulamento.', se='eu:A', ef=dict(vinculo=1)),
    op('flerte', 'o2_a_flerte', '(Rir, baixinho, e deixar o ombro bater de leve no ombro da outra pessoa.)', se='eu:A', acao=True),
    op('cuida', 'o2_a_cuida', '— Você está com frio? Eu posso te dar o meu moletom.', se='eu:A'),
    op('abre', 'o2_b_abre', '— Eu fiquei com medo de você, no primeiro dia. Você parecia... uma tempestade.', se='eu:B', ef=dict(vinculo=1)),
    op('seco', 'o2_b_seco', '(Corrigir o ângulo do guarda-chuva, com os olhos na rua.)', se='eu:B', acao=True),
    op('flerte', 'o2_b_flerte', '— Hoje não. Hoje você é só uma chuva.', se='eu:B'),
  ]),
  dict(prompt='A última palavra da porta é sua.', opcoes=[
    op('abre', 'o3_a_abre', '— Eu gosto de andar assim. Em silêncio. Eu não sabia que gostava.', se='eu:A', ef=dict(vinculo=2)),
    op('flerte', 'o3_a_flerte', '— Se a gente se perder, o guarda-chuva é grande o bastante para dormir.', se='eu:A'),
    op('seco', 'o3_a_seco', '— Vamos. Eu levo a mochila.', se='eu:A'),
    op('abre', 'o3_b_abre', '— Eu também gosto. É a primeira vez que o silêncio de outra pessoa me deixa em paz.', se='eu:B', ef=dict(vinculo=2)),
    op('seco', 'o3_b_seco', '— Vamos. Quinze minutos. Vinte, com chuva.', se='eu:B'),
    op('cuida', 'o3_b_cuida', '(Estender a mão livre, a palma para cima, e esperar a mochila.)', se='eu:B', acao=True),
  ]),
 ],
 pool=[
  op('cuida', 'pl_cuida', '(Ajustar o guarda-chuva, para que a água escorra do lado oposto.)', acao=True),
  op('seco', 'pl_seco', '(Olhar a rua, o rio de pedra, e esperar o momento de sair.)', acao=True),
  op('flerte', 'pl_flerte', '(Sorrir de lado, sem querer, e desviar o olhar para a chuva.)', acao=True),
  op('abre', 'pl_abre', '— Eu estou nervos{{eu.o_a}}. Eu não sei por quê.'),
  op('fere', 'pl_fere', '(Cruzar os braços, firme, e fingir que o frio é a razão.)', acao=True),
 ],
 fecho="""A porta de vidro abre com um sopro de ar molhado. Os dois passos seguintes, sob o guarda-chuva verde, são dados no mesmo compasso, sem que ninguém combine. A água, em volta, vira música.""",
 ir='ts_c4_decisao')

NOS['ts_c4_decisao'] = dict(tipo='decisao', cap=4, lugar='Via di Città, Siena', hora='Sábado · 18h25',
 texto="""A Via di Città, a rua principal de Siena, é uma ladeira estreita, de palácios de tijolo, que, em dia de chuva, vira uma calha. As duas caminham, sob um só guarda-chuva, com a água correndo pelos degraus e a luz dos postes refletida nas pedras. Falta atravessar a Piazza del Campo, e subir, enfim, até o vicolo.

O guarda-chuva é grande, mas não tanto quanto parece.""",
 pergunta='Como as duas caminham?',
 ir={'A': 'ts_c4_volta_a', 'B': 'ts_c4_volta_b'},
 acoes=[
  dict(id='juntas', texto='Bem juntas, de braço dado, para dividir o guarda-chuva e o calor', efeitos=dict(flag='andaram_de_braco', vinculo=2),
   resultado="""Vocês andam de braço dado, sem combinar, como quem descobre uma coisa que o corpo já sabia. A manga de lã de uma encosta no casaco da outra, e o calor passa, de uma pessoa à outra, pelo tecido, como um recado. Uma das duas, no meio da ladeira, escorrega, e a outra a segura, e nenhuma diz nada."""),
  dict(id='distantes', texto='Cada uma de um lado, tentando não se tocar, apesar do guarda-chuva', efeitos=dict(flag='andaram_distantes', abalo=1),
   resultado="""Vocês andam cada uma de um lado, com um palmo de ar entre os ombros, e a chuva, que cai pelo vão, molha o braço de quem está mais longe. É um esforço enorme para não se tocar, e o esforço, ao fim de dez passos, é mais íntimo do que o toque."""),
  dict(id='correr', texto='Correr, rindo, pulando as poças, e deixar o guarda-chuva balançar', efeitos=dict(flag='correram_chuva', vinculo=2),
   resultado="""Vocês correm. A ideia, de uma das duas, é de uma loucura que a outra aceita sem protesto. O guarda-chuva balança, a água entra por todos os lados, as botas afundam em poças, e a risada, as duas, sobe, em eco, pelas paredes estreitas de Via di Città. Quando chegam à Piazza del Campo, de roupa ensopada, o guarda-chuva está de cabeça para baixo."""),
 ])

NOS['ts_c4_volta_a'] = dict(tipo='solo', cap=4, seat='A', lugar='Piazza del Campo, Siena', hora='Sábado · 18h50',
 texto="""A Piazza del Campo, em forma de concha, de tijolos vermelhos, vazia, a esta hora, de turistas, parece um teatro depois do espetáculo. A chuva, mais fina, cai sobre as pedras e as faz brilhar, em nove faixas, as divisões antigas do Palio. No centro, a Torre del Mangia, escura, desaparece na neblina.

Debaixo do guarda-chuva, você sente a pessoa ao lado em cada respiração. O braço, o ombro, o cabelo molhado, a mão que segura o cabo, e que, num momento, no meio da praça, encostou na sua. Só um segundo. Um toque de dorso de mão, frio, de chuva.

Você, que fala, que sempre falou, que preencheu cada silêncio da vida com uma piada, não tem uma palavra.""",
 acoes=[
  dict(id='parar', texto='Parar no meio da praça, sob o guarda-chuva, e deixar a pessoa decidir se continua', ir='ts_c4_fim',
   efeitos=dict(flag='a_parou_praca', vinculo=2),
   resultado="""Você para. No meio da concha, sob a chuva, de guarda-chuva verde. A pessoa ao lado, que andava um passo à frente, também para, e vira o rosto. Não diz nada. Não pergunta. Ficam assim, dois segundos, três, quatro, com a água escorrendo pelas varetas, até que alguma coisa, sem palavra, é entendida, e as duas retomam o passo, mais devagar."""),
  dict(id='falar', texto='Falar sem parar, sobre qualquer coisa, como sempre, para tapar o que não quer sentir', ir='ts_c4_fim',
   efeitos=dict(flag='a_falou_demais', abalo=1),
   resultado="""Você fala. Do Palio, do cavalo que a Giulia disse que ganhou, da cor das telhas, do preço do gelato, de uma série que viu. Fala por quatro minutos, sem respirar, e a pessoa ao lado ouve, de cabeça baixa, com o rosto meio escondido pela borda do guarda-chuva. Quando você enfim se cala, a pessoa diz, baixo: *eu gosto quando você fala. Mas hoje eu gostei mais do que você não disse.*"""),
  dict(id='mao', texto='Deixar a mão, de propósito, no cabo do guarda-chuva, ao lado da mão da outra pessoa', ir='ts_c4_fim',
   efeitos=dict(flag='a_pos_a_mao', vinculo=2),
   resultado="""Você muda a mão de lugar. Devagar, como quem anda numa corda. O cabo de madeira, em cabeça de pássaro, tem espaço para duas mãos, e você põe a sua ao lado da outra, sem tocar, a um milímetro. A pessoa ao seu lado não se mexe. Mas os dedos, em um segundo, se abrem, de leve, e fecham, de novo, mais perto."""),
 ])

NOS['ts_c4_volta_b'] = dict(tipo='solo', cap=4, seat='B', lugar='Piazza del Campo, Siena', hora='Sábado · 18h50',
 texto="""Você nunca atravessou a Piazza del Campo de noite, nem em dia de chuva. A concha, deserta, brilha. As nove faixas de tijolo, que você estudou em uma planta, parecem, de perto, raios de um sol caído. A Torre del Mangia desaparece na névoa. O som da chuva, aqui, é de uma só nota, grave, que não se acaba.

Debaixo do guarda-chuva, a pessoa ao lado caminha em silêncio, o que você nunca esperaria. Em cinco semanas, é a primeira vez que alguém, a seu lado, não fala. O ombro da outra pessoa, a dois dedos do seu, emite um calor que atravessa duas camadas de lã. Em algum ponto, entre a Via di Città e o meio da praça, a mão da outra pessoa encostou na sua, no cabo.

Seu corpo, que sempre foi um instrumento de leitura, parece, de repente, um instrumento de outra coisa.""",
 acoes=[
  dict(id='seguir', texto='Continuar andando, no mesmo ritmo, sem comentar, e deixar o toque existir', ir='ts_c4_fim',
   efeitos=dict(flag='b_deixou_toque', vinculo=2),
   resultado="""Você continua andando, no mesmo ritmo, com o rosto reto. Não comenta, não se afasta. O dorso da mão, frio de chuva, repousa a um milímetro da outra, e você descobre que o seu corpo, que sempre soube se afastar, não sabe. Um passo. Dois. Dez. O toque, que foi de um segundo, é agora uma presença."""),
  dict(id='afastar', texto='Afastar a mão do cabo, sem pressa, e pôr no bolso, por prudência', ir='ts_c4_fim',
   efeitos=dict(flag='b_afastou_mao', abalo=1),
   resultado="""Você tira a mão do cabo, devagar, e a põe no bolso do casaco. O guarda-chuva balança, e a pessoa a seu lado, sem uma palavra, o segura com as duas mãos. É um gesto de uma delicadeza que dói. Você sente a falta do toque antes de ele ter acabado, e anda um pouco mais devagar, para ver se volta."""),
  dict(id='olhar', texto='Olhar de lado, uma vez, para o rosto da outra pessoa, de perto, sob a luz do poste', ir='ts_c4_fim',
   efeitos=dict(flag='b_olhou_de_perto', vinculo=2),
   resultado="""Você olha. Uma vez, só, de lado. Sob a luz amarela do poste, o rosto da outra pessoa, molhado, sem maquiagem, de cílios com gotas, é de uma nitidez que você não esperava: uma pinta pequena, abaixo do olho esquerdo, uma cicatriz fina no queixo, a boca entreaberta, de respirar pelo frio. Você nunca tinha visto. Volta os olhos para a rua, rápido, com o coração em um ritmo que o relógio de pulso não conhece."""),
 ])

NOS['ts_c4_fim'] = dict(tipo='fim', cap=4, lugar='Casa Bianchini, Siena', hora='Sábado · 19h30',
 texto="""Às sete e meia da noite, o terceiro andar da Casa Bianchini, escuro, cheira a chuva, a lã molhada e a pedra velha. {{se flag:andaram_de_braco}}Duas pessoas sobem a escada de mármore de braço dado, sem pressa, e os degraus, a cada passo, parecem mais curtos. {{/se}}{{se flag:andaram_distantes}}Duas pessoas sobem a escada com um palmo de ar entre os ombros, e o ar, a cada degrau, parece mais denso. {{/se}}{{se flag:correram_chuva}}Duas pessoas sobem a escada, de roupa ensopada, rindo, deixando atrás uma trilha de poças. {{/se}}{{se flag:a_pos_a_mao}}Uma mão ficou, na praça, ao lado de outra, a um milímetro. {{/se}}{{se flag:b_deixou_toque}}Um toque de dorso de mão, de um segundo, durou dez passos. {{/se}}{{se flag:b_olhou_de_perto}}Uma pinta abaixo do olho esquerdo ficou gravada em quem a viu. {{/se}}

No corredor, o guarda-chuva verde, pingando, é encostado à parede. No quarto, sem acender a luz, as duas tiram os casacos ensopados, uma de cada lado da cama de ferro, e o som da lã molhada caindo no chão é o único comentário.

A porta do quarto, de madeira escura, é estreita. As duas, ao mesmo tempo, se viram para a porta, para fechar, e ficam, de frente, a trinta centímetros uma da outra, com o cabelo pingando, o peito subindo e descendo, e o relógio de mesa, na cômoda, marcando, em verde, 19:31.

Nenhuma das duas fala. Há uma coisa no ar, que não é chuva, e que se aproxima, por dez centímetros, quase.""",
 gancho="Trinta centímetros, depois vinte, e uma coisa no ar que quase aconteceu.",
 ir='ts_c5_festa')
