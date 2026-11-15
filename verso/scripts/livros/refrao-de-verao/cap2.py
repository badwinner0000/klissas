# Refrão de Verão · Capítulo 2 · O Peixe Fora D'Água
NOS = {}

def op(tom, tag, texto, se=None, ef=None, acao=False):
    d = dict(tom=tom, tag=tag, texto=texto)
    if se: d['se'] = se
    if ef: d['efeitos'] = ef
    if acao: d['acao'] = True
    return d

NOS['rv_c2_mercearia'] = dict(tipo='segue', cap=2, lugar="Pruitt's Mercantile, Rua Principal, Pine Hollow", hora='Terça · 09h10', npcs=['doris'],
 ir={'A': 'rv_c2_a', 'B': 'rv_c2_b'},
 texto="""A Rua Principal de Pine Hollow tem quatrocentos metros, uma igreja metodista de tábuas brancas, um posto de gasolina de uma só bomba, um bar chamado A Lanterna e a Pruitt's Mercantile, que vende, pela ordem, comida, pregos, anzóis, jornais de três dias atrás, café de coador e opinião sobre todos os moradores. A mercearia tem um sino na porta que toca duas vezes, uma por quem entra, outra por quem fofoca.

Doris Pruitt, cinquenta e oito anos, de avental xadrez e óculos presos por uma corrente, ocupa o balcão desde 1989, e nunca, em trinta e seis anos, deixou um forasteiro passar sem inspeção.

Na vitrine, um cartaz escrito à mão avisa: *INTERNET VIA SATÉLITE, US$ 3 / 15 MIN, NO FUNDO*. Do lado de dentro, três cadeiras de cozinha dispostas em círculo, um bule de café que nunca esfria e uma prateleira de pão que acaba às dez.""")

NOS['rv_c2_a'] = dict(tipo='solo', cap=2, seat='A', lugar="Pruitt's Mercantile", hora='Terça · 09h15', npcs=['doris'],
 texto="""Você entra na mercearia com uma lista que escreveu no carro, na sua letra de autógrafo, e um chapéu de aba larga que cobriu metade do rosto. O sino toca duas vezes. Dentro, sob um ventilador de teto lento, uma mulher de avental olha você de cima a baixo, com um olhar que mede o preço da sua bolsa, da sua mala e do seu casaco, sem ter pressa.

— Você deve ser a neta do Henry — diz ela, sem sorrir. — Henry Ashby. Doris Pruitt. Eu fui a que fechou os olhos dele em março, porque ninguém mais estava lá. — Uma pausa de efeito. — Faz três meses.

A frase não é uma acusação, mas ocupa o mesmo lugar. Na sua lista, o primeiro item é *café especial (origem única)*, e a mercearia só tem Folgers.""",
 acoes=[
  dict(id='verdade', texto='Dizer a verdade: ela não pôde vir, estava em turnê, e se arrepende', ir='rv_c2_dividir',
   efeitos=dict(flag='a_disse_verdade', vinculo=1),
   resultado="""— Eu estava em turnê — você diz. — Em Tóquio. Eu soube tarde. — A palavra *turnê* cai no balcão sem eco. Doris não pergunta de quê. Fica um instante olhando para você, e, quando fala, a voz tem outro tom: *ele falava de você. Dizia que você cantava no quintal, aos nove anos, em cima do tanque.* Você não responde. Não consegue."""),
  dict(id='mentir', texto='Dizer que trabalha com uma coisa qualquer, de escritório, e mudar de assunto', ir='rv_c2_dividir',
   efeitos=dict(flag='a_mentiu_doris', abalo=1),
   resultado="""— Trabalho com marketing — você diz, depressa demais. — Em Los Angeles. É uma coisa de escritório. — Doris repete a palavra *marketing* com a sobrancelha, devagar, como quem experimenta uma moeda. *Marketing*, ela diz, *então a senhorita sabe vender.* O sino da porta toca, uma vez, e você não consegue saber se é salvação ou sentença."""),
  dict(id='cartao', texto='Estender o cartão preto e pedir o café mais caro que tiver', ir='rv_c2_dividir',
   efeitos=dict(flag='a_cartao_preto', abalo=1),
   resultado="""Você estende o cartão preto, de metal, e pede o café mais caro da casa. Doris pega o cartão com a ponta de dois dedos, vira, lê o nome impresso e o devolve. *Aqui a gente só aceita dinheiro*, ela diz, *e fiado, para quem eu conheço.* Você abre a carteira, vazia de notas pequenas, e descobre, aos vinte e seis anos, que não sabe o preço de um pão."""),
 ])

NOS['rv_c2_b'] = dict(tipo='solo', cap=2, seat='B', lugar="Pruitt's Mercantile", hora='Terça · 09h15', npcs=['doris'],
 texto="""Você entra na mercearia atrás de uma caixa de pregos de cobre, e dá de cara com a cena: a neta do Henry, de chapéu de aba larga e casaco de caxemira, parada diante do balcão, sendo avaliada por Doris Pruitt, que, em trinta e seis anos, já avaliou um prefeito, dois xerifes e um urso que entrou pela porta dos fundos em 2011.

A cena dura o que dura um café. Quando a neta, ou o neto, de chapéu, se afasta em direção à prateleira de pães, Doris te chama com o dedo, como quem convoca um aluno. Fala baixo, sem mexer os lábios.

— Aquela ali tem cara de problema. — O dedo aponta de leve. — Mala de seiscentos dólares. Mãos que nunca lavaram um prato. Eu aposto cinco dólares que vai embora em duas semanas.""",
 acoes=[
  dict(id='defender', texto='Dizer à Doris que ela está sendo injusta: a pessoa acabou de chegar', ir='rv_c2_dividir',
   efeitos=dict(flag='b_defendeu', vinculo=1),
   resultado="""— Doris — você diz, baixo. — Ela acabou de enterrar o avô. Dá um tempo. — Doris faz uma careta de quem engoliu um limão. *Eu estou dando*, diz. *É por isso que são só cinco dólares.* Mas a mão, ao pegar a sua caixa de pregos, empurra um pacote de biscoitos de aveia sobre o balcão. *Para levar para a casa*, ela diz. *Não para a menina. Para a casa.*"""),
  dict(id='apostar', texto='Apostar contra: dez dólares que ela fica o verão inteiro', ir='rv_c2_dividir',
   efeitos=dict(flag='b_apostou', abalo=1),
   resultado="""— Dez dólares que fica — você diz. — O verão inteiro. — Doris solta uma risada de bule fervendo. *Fechado*, diz, *Mas me paga em dinheiro. Eu quero ver você suar.* Você não sabe por que apostou. A frase saiu sozinha, como um prego que escolhe a madeira."""),
  dict(id='silencio', texto='Rir, pagar os pregos e não se meter', ir='rv_c2_dividir',
   efeitos=dict(flag='b_neutro'),
   resultado="""Você ri, paga a caixa de pregos, devolve o troco com um aceno e não entra no jogo. É uma habilidade que você aprendeu cedo: numa cidade de mil e duzentas pessoas, quem tem opinião sobre todo mundo termina sem amigo, e quem não tem termina sendo chamado para consertar tudo."""),
 ])

NOS['rv_c2_dividir'] = dict(tipo='dividir', cap=2, lugar="Pruitt's Mercantile", hora='Terça · 09h45', cada=1,
 texto="""A compra de duas semanas de mantimentos, para uma casa sem eletricidade e sem despensa, resulta em oito sacolas de papel, uma caixa de ovos, um saco de lenha de fogão e um balde de cobre que o seu Henry, segundo Doris, *deixou fiado desde 2019*. A conta é de cento e trinta e dois dólares, em dinheiro, que alguém precisa carregar até o carro, que não é um carro, é uma picape de 1998 com um adesivo de *Eu freio para alces*.

O sino da porta toca duas vezes, e Doris, de braços cruzados, observa a cena como quem espera um número de circo.""",
 pergunta='O que você faz?',
 acoes=[
  dict(id='carregar', texto='Carregar as sacolas sozinh{{eu.o_a}}, para mostrar que não precisa de ajuda', efeitos=dict(flag='carregou_sozinha', abalo=1),
   resultado="""Você levanta quatro sacolas de uma vez, como um prato de restaurante, e a caixa de ovos balança no topo. Dá três passos. No quarto, o sino da porta toca, a caixa de ovos desliza e o chão da Pruitt's Mercantile ganha uma omelete de uma dúzia. Doris, de longe, diz, sem expressão: *ovos, dois dólares.*"""),
  dict(id='ajudar', texto='Oferecer ajuda e dividir o peso: quatro sacolas para cada um', efeitos=dict(flag='dividiu_peso', vinculo=1),
   resultado="""Você pega as sacolas mais pesadas, a lenha e o balde, e deixa as de papel para a outra pessoa. Caminham juntos até a picape, em fila, de passos curtos, com um silêncio que, por conta do peso, não incomoda ninguém. Na caçamba, cada sacola encontra o seu lugar, como se o carregamento tivesse sido planejado."""),
  dict(id='debochar', texto='Fazer uma piada: perguntar se o chapéu serve para disfarçar ou para carregar peso', efeitos=dict(flag='fez_piada', vinculo=1),
   resultado="""— Esse chapéu é para disfarçar ou para carregar peso? — você pergunta, com a cara mais séria do mundo. A outra pessoa olha de lado, abre a boca para responder à altura e, contra a vontade, deixa escapar um riso curto, de nariz, que ela depois nega, com a sobrancelha. Doris, no balcão, anota alguma coisa mentalmente."""),
 ],
 desfecho="""O sino da porta toca, e a manhã vira meio-dia. A picape sobe a estrada de terra, de janelas abertas, com o cheiro de lenha e de pão fresco, e o rádio, que ninguém ligou, apita um chiado.""",
 ir='rv_c2_dialogo')

NOS['rv_c2_dialogo'] = dict(tipo='dialogo', cap=2, lugar='Picape, estrada do riacho', hora='Terça · 12h10', comeca='B',
 texto="""A picape de 1998 tem um banco único, de vinil rachado, onde cabem três pessoas ou duas com muitas opiniões. O motor faz o barulho de um gato com raiva, o câmbio só engata a terceira com paciência, e a estrada de terra, de pedras soltas, tem o ritmo de um tambor.

Dois quilômetros e duzentos metros até o chalé. Em dois quilômetros e duzentos metros, dá para falar de muita coisa, ou de nada.""",
 turnos=[
  dict(prompt='A primeira frase é sua.', opcoes=[
    op('seco', 's0_b_seco', '— Você nunca comprou comida na vida, né?', se='eu:B'),
    op('flerte', 's0_b_flerte', '— O sino tocou duas vezes. Quer dizer que a Doris já falou de você com metade da cidade.', se='eu:B'),
    op('cuida', 's0_b_cuida', '— Quer parar na lanchonete do posto? O café é ruim, mas é quente.', se='eu:B'),
    op('seco', 's0_a_seco', '— Eu sei comprar comida. Eu só nunca comprei sem alguém comprar por mim.', se='eu:A'),
    op('flerte', 's0_a_flerte', '— Seu carro tem personalidade. Eu até iria longe com ele, se ele não estivesse caindo.', se='eu:A'),
    op('abre', 's0_a_abre', '— Eu não sei o preço de nada. Isso é... isso é meio assustador.', se='eu:A', ef=dict(vinculo=1)),
  ]),
  dict(prompt='Agora você responde.', opcoes=[
    op('abre', 's1_a_abre', '— A Doris não gosta de mim. Eu percebi.', se='eu:A', ef=dict(vinculo=1)),
    op('flerte', 's1_a_flerte', '— Eu aposto que você cobra caro de todo mundo.', se='eu:A'),
    op('seco', 's1_a_seco', '— Não precisa me acompanhar até a casa. Eu me viro.', se='eu:A'),
    op('abre', 's1_b_abre', '— A Doris não gosta de ninguém no primeiro mês. Eu mesmo levei dois anos.', se='eu:B', ef=dict(vinculo=1)),
    op('flerte', 's1_b_flerte', '— Eu cobro o que vale. Se você achar caro, a gente negocia no sábado.', se='eu:B'),
    op('seco', 's1_b_seco', '— Eu vou levar até a porta. Faz parte do serviço.', se='eu:B'),
  ]),
  dict(prompt='A conversa é sua de novo.', opcoes=[
    op('abre', 's2_a_abre', '— Eu vim para cá para ficar sozinh{{eu.o_a}}. Eu sei que parece grosseria. É só que eu estou muito cansad{{eu.o_a}}.', se='eu:A', ef=dict(vinculo=1)),
    op('seco', 's2_a_seco', '— Duas semanas de telhado. Depois eu volto a ficar sozinh{{eu.o_a}}.', se='eu:A'),
    op('flerte', 's2_a_flerte', '— Se você parar de ouvir rádio, talvez eu aguente três semanas.', se='eu:A'),
    op('abre', 's2_b_abre', '— O seu avô morava sozinho há quarenta anos. Ele dizia que o silêncio era uma pessoa. Você vai descobrir.', se='eu:B', ef=dict(vinculo=1)),
    op('seco', 's2_b_seco', '— Duas semanas, talvez três. Depende da goteira.', se='eu:B'),
    op('flerte', 's2_b_flerte', '— O rádio fica. Mas eu mudo de estação por você, uma vez por dia.', se='eu:B'),
  ]),
  dict(prompt='A última palavra da viagem é sua.', opcoes=[
    op('flerte', 's3_b_flerte', '— Hoje à noite tem música ao vivo na Lanterna. Tem cerveja ruim e um banjo. Você devia aparecer.', se='eu:B', ef=dict(flag='convidou_bar')),
    op('cuida', 's3_b_cuida', '— Se precisar de qualquer coisa, a casa dos Pruitt é a segunda estrada à esquerda.', se='eu:B'),
    op('seco', 's3_b_seco', '— Amanhã às sete. Com rádio.', se='eu:B'),
    op('flerte', 's3_a_flerte', '— Hoje à noite tem alguma coisa nessa cidade, ou o sinal de TV também não pega?', se='eu:A'),
    op('abre', 's3_a_abre', '— Valeu pela carona. E pelas sacolas.', se='eu:A', ef=dict(vinculo=1)),
    op('seco', 's3_a_seco', '— Amanhã, então. Sem rádio, de preferência.', se='eu:A'),
  ]),
 ],
 pool=[
  op('cuida', 'pl_cuida', '— Segura essa sacola. Está virando.'),
  op('seco', 'pl_seco', '— Ok.'),
  op('flerte', 'pl_flerte', '— Você é menos insuportável do que parecia.'),
  op('abre', 'pl_abre', '— Eu não esperava tanta gentileza num dia só.'),
  op('fere', 'pl_fere', '— Você acha que me conhece. Não conhece.'),
 ],
 fecho="""A picape para na frente do chalé, e o motor, ao ser desligado, solta um suspiro de máquina cansada. O riacho, ali ao lado, continua falando sozinho.""",
 ir='rv_c2_decisao')

NOS['rv_c2_decisao'] = dict(tipo='decisao', cap=2, lugar='Varanda do chalé dos Ashby', hora='Terça · 12h30',
 texto="""As sacolas já estão na cozinha. O fogão a lenha, aceso por um carpinteiro em dois minutos, solta uma fumaça fina pela chaminé. Há ovos, pão, uma panela de macarrão e um silêncio de duas pessoas que ainda não sabem como se ver à noite.

O convite para a Lanterna ficou no ar, e a resposta, agora, não é se vai, mas como.""",
 pergunta='Como vocês vão à Lanterna?',
 ir={'A': 'rv_c2_noite_a', 'B': 'rv_c2_noite_b'},
 acoes=[
  dict(id='ir', texto='Juntos, na picape: ele passa pelo chalé às oito', efeitos=dict(flag='foram_juntos', vinculo=1),
   resultado="""Vocês combinam: às oito, o carpinteiro passa na estrada do riacho, e os dois descem juntos. Ninguém diz *é um encontro*, e cada um sabe que não é. A picape de 1998 tem um banco só, e uma negociação silenciosa sobre quem fica do lado da janela."""),
  dict(id='recusar', texto='Separados: cada um chega por conta própria, no seu horário', efeitos=dict(flag='foram_separados'),
   resultado="""Vocês combinam que cada um vai por conta própria. O carpinteiro chega no horário dele, e a outra pessoa, no dela, de bicicleta, de um modelo que o avô deixou no galpão. A decisão tem a clareza de uma porta aberta pelos dois lados, e os dois, por motivos diferentes, sentem um pouco de falta da outra versão."""),
  dict(id='suco', texto='Só um pouco: aparecer, tomar alguma coisa sem álcool e voltar antes das dez', efeitos=dict(flag='so_um_pouco'),
   resultado="""Vocês combinam um meio-termo: aparecer, tomar um suco e voltar antes das dez. É uma negociação de dois adultos que acabaram de descobrir que não sabem negociar, e funciona justamente por isso."""),
 ])

NOS['rv_c2_noite_a'] = dict(tipo='solo', cap=2, seat='A', lugar='Sala do chalé dos Ashby', hora='Terça · 18h30',
 texto="""Às seis e meia da tarde, no chalé do avô, com a luz amarela de três lâmpadas e o fogão a lenha bufando, você abre o piano de armário. A tampa solta uma poeira de trinta anos. Você toca uma nota, um dó central, e ela sai desafinada, com um zumbido que parece um pedido de desculpas.

Oito meses sem escrever uma linha. Você se lembra de cada tentativa: o estúdio em Malibu, o hotel em Londres, a casa de praia em Maui, o notebook aberto em quartos de luxo, o cursor piscando como uma pálpebra. Nada, nenhuma melodia, nenhuma rima, nada que não soasse como outra música sua.

Aqui, em Pine Hollow, sem sinal e sem plateia, o piano espera. A sua mão fica a dois centímetros das teclas.""",
 acoes=[
  dict(id='tocar', texto='Tocar uma escala, qualquer coisa, só para ouvir o som', ir='rv_c2_fim',
   efeitos=dict(flag='a_tocou_escala', vinculo=1),
   resultado="""Você toca uma escala de dó maior, lenta. Cada nota desafinada é uma pergunta. No fim, a última, um dó agudo, soa meio tom abaixo, e é a primeira nota imperfeita que você ouve em anos sem ninguém pedir para corrigi-la. Você ri sozinh{{eu.o_a}}, uma risada curta, e fecha a tampa do piano com um tapinha."""),
  dict(id='fechar', texto='Fechar a tampa do piano, sem tocar nada, e ir tomar um banho de bacia', ir='rv_c2_fim',
   efeitos=dict(flag='a_fechou_piano', abalo=1),
   resultado="""Você fecha a tampa. É um gesto pequeno e definitivo. Vai ao fogão, aquece uma panela de água do riacho, enche uma bacia de esmalte e toma o primeiro banho de bacia da vida. Quando se olha no espelho de moldura lascada, vê uma cara sem maquiagem, de vinte e seis anos, que nenhum fotógrafo jamais publicaria."""),
  dict(id='cartas', texto='Abrir a caixa de cartas do avô, que o advogado deixou na estante', ir='rv_c2_fim',
   efeitos=dict(flag='a_abriu_cartas', vinculo=1),
   resultado="""Na estante, entre os discos, há uma caixa de sapatos amarrada com barbante. Dentro, quarenta e três cartas, todas endereçadas a *{{A.nome}}, Los Angeles*, todas seladas, nenhuma enviada. Na primeira, com a letra trêmula do avô: *Querida, hoje o riacho transbordou e eu pensei em você, que gostava de pisar na água.* Você lê uma, e depois mais uma, e só para quando o fogão se apaga."""),
 ])

NOS['rv_c2_noite_b'] = dict(tipo='solo', cap=2, seat='B', lugar='Casa dos Lindqvist, Pine Hollow', hora='Terça · 18h30', npcs=['caleb'],
 texto="""A casa onde você mora é a casa onde o seu pai morreu, onde a sua mãe morou e de onde saiu para um lar de idosos em Spokane, e onde o seu irmão Caleb, vinte e oito anos, técnico de som freelancer, aparece a cada duas semanas para lavar a roupa, comer sua comida e deixar uma pilha de louça no seu pia. Hoje é um desses dias.

Caleb está sentado no balcão da cozinha, com os pés na cadeira, uma cerveja e um sorriso de quem ouviu uma fofoca. Doris já ligou, claro.

— Então a neta do Henry — diz ele. — Mala de seiscentos dólares e olheiras de quem vive na estrada. Dizem que é um nome de estrela de rádio. Eu fui pesquisar, e a internet, em Pine Hollow, só pega no fundo da mercearia. Você sabe o que isso significa.

Você não sabe. Cada vez que o seu irmão começa uma frase com *você sabe o que isso significa*, é para você descobrir sozinho.""",
 acoes=[
  dict(id='perguntar', texto='Perguntar ao Caleb o que ele descobriu, sem rodeios', ir='rv_c2_fim',
   efeitos=dict(flag='b_perguntou_caleb', abalo=1),
   resultado="""— O que você descobriu? — você pergunta. Caleb, com um sorriso de quem guardou a melhor parte da história, olha para o teto. *Nada*, diz, *e esse é o ponto. Todo mundo que importa tem um perfil. Ela não tem nada. Ou é invisível, ou é alguém que sabe como desaparecer.* Ele toma um gole. *Eu acho que é a segunda.*"""),
  dict(id='ignorar', texto='Mudar de assunto: perguntar se o Caleb vai ficar para o jantar', ir='rv_c2_fim',
   efeitos=dict(flag='b_ignorou_caleb'),
   resultado="""— Vai ficar para o jantar? — você pergunta. Caleb resmunga, mas aceita, e pega uma panela, o que é um sinal de amor fraterno. A conversa passa para o estoque de lenha, para o motor da picape e para uma garota de Spokane que ele insiste em não chamar de namorada. A neta do Henry fica pendurada no ar, como roupa no varal."""),
  dict(id='apostar', texto='Contar da aposta com a Doris: dez dólares que ela fica o verão inteiro', ir='rv_c2_fim',
   efeitos=dict(flag='b_contou_aposta', vinculo=1),
   resultado="""— Apostei dez dólares com a Doris que ela fica o verão — você diz. Caleb quase engasga com a cerveja. *Você apostou*, ele repete, *você, que nunca apostou em nada, nem em cavalo.* Ele ri por um minuto inteiro, e, quando para, olha você com uma seriedade nova. *Você está interessado*, diz. Você diz que não. Os dois sabem que sim."""),
 ])

NOS['rv_c2_fim'] = dict(tipo='fim', cap=2, lugar='Chalé dos Ashby / A Lanterna, Pine Hollow', hora='Terça · 19h50',
 texto="""Às sete e cinquenta da noite, em Pine Hollow, ainda é dia: o verão do noroeste do Pacífico estica a luz até as nove e meia, e o céu, atrás dos pinheiros, é uma aquarela de pêssego e lavanda. {{se flag:foram_juntos}}Na casa do riacho, alguém abre a mala de seiscentos dólares e procura, entre peças de grife, a única coisa que parece uma roupa de gente, enquanto uma picape de 1998 desce a estrada. {{/se}}{{se flag:foram_separados}}Na casa do riacho, alguém empurra uma bicicleta antiga para fora do galpão e confere os pneus, sem saber por que está sorrindo. {{/se}}{{se flag:so_um_pouco}}Na casa do riacho, alguém procura um suéter, para tomar um suco e ir embora às dez. {{/se}}{{se flag:a_tocou_escala}}No piano, uma escala imperfeita ainda ressoa no ar. {{/se}}{{se flag:a_abriu_cartas}}Na mesa, quarenta e três cartas de um avô esperam, em ordem, para serem lidas. {{/se}}{{se flag:a_fechou_piano}}O piano, de tampa fechada, guarda a sua poeira. {{/se}}

A Lanterna fica numa casa de tijolos, no fim da Rua Principal, com uma lanterna de ferro na porta, um balcão de nogueira e um palco de dois metros por três, onde um banjo, um violão e um contrabaixo dividem espaço com um microfone dos anos oitenta.

Na parede, ao lado do palco, uma fotografia emoldurada de uma banda de rock de adolescentes, com quatro garotos de cabelo comprido e jaqueta de couro. O garoto da esquerda, de violão, tem catorze anos, um sorriso enorme e um nome escrito a caneta embaixo da foto.

Alguém está prestes a entrar.""",
 gancho="A Lanterna, uma banda de adolescentes na parede e um nome na caneta.",
 ir='rv_c3_entrada')
