# Pisca-Pisca · Capítulo 7 · O que a gente não devia ter lido (terça, 23 de dezembro de 2025)
NOS = {}

def op(tom, tag, texto, se=None, ef=None, acao=False):
    d = dict(tom=tom, tag=tag, texto=texto)
    if se: d['se'] = se
    if ef: d['efeitos'] = ef
    if acao: d['acao'] = True
    return d

NOS['pp_c7_manha'] = dict(tipo='segue', cap=7, lugar='Depósito da Kessler Hardware', hora='Terça, 23 de dezembro · 08h00',
 ir={'A': 'pp_c7_a', 'B': 'pp_c7_b'},
 texto="""Terça-feira, véspera da véspera. O céu de Dyker Heights amanhece da cor de uma panela velha, com uma luz fosca que o rádio do carro do seu Szymanski chama de *sistema de baixa pressão chegando do oeste*.

{{se flag:beijo_andaime}}Ninguém falou da noite anterior, e a noite anterior está em todo canto. {{/se}}{{se !flag:beijo_andaime}}Ninguém falou do que não aconteceu na noite anterior, e o que não aconteceu está em todo canto. {{/se}}O depósito da Kessler cheira a café requentado, e o seu Szymanski deixou, em cima da mesa, um recado em letra de eletricista: *Saí para buscar mais fio. Voltem às nove. Não briguem em cima do transformador.*

Sobre a mesa de marceneiro, ao lado da estrela, estão dois objetos que ontem à noite, por descuido, ficaram ali: a folha da planilha, ainda dobrada no chão onde caiu, e o caderno de capa verde, aberto no último desenho, o da árvore em escala.

Por vinte minutos, o depósito está vazio de gente. Cada um chega em horário diferente, e cada um encontra uma coisa que não era sua.""")

NOS['pp_c7_a'] = dict(tipo='solo', cap=7, seat='A', lugar='Depósito da Kessler Hardware', hora='Terça, 23 de dezembro · 08h10',
 texto="""Você chega primeiro, às oito e dez, com a prancheta debaixo do braço e a chave pequena na mão. A lâmpada nua ainda está acesa. Em cima da mesa, ao lado da estrela, o caderno de capa verde, aberto, de lado.

Você sabe que não é seu. Sabe, também, que ele está aberto numa página com a árvore de Cooper Green desenhada em escala, com cotas, setas, o tronco de cabo trançado e a copa em espiral. Você sabe porque, sem querer, leu o desenho antes de pensar.

Uma folha para trás, do outro lado da página, há um título em letra pequena e firme: *Cornell, B.Arch, Admissão Antecipada*. Debaixo, duas colunas, uma de cada lado de uma linha vertical. À esquerda, em lápis: *ficar*. À direita, em lápis: *ir*. Na coluna da esquerda, uma só palavra, sublinhada: *{{A.nome}}*. Na da direita, doze linhas.""",
 acoes=[
  dict(id='ler', texto='Ler as doze linhas da coluna da direita', ir='pp_c7_briga',
   efeitos=dict(flag='a_leu_caderno', abalo=2),
   resultado="""Você lê. *Aulas de estrutura. O ateliê de maquetes. Gente que olha para uma ponte e pergunta como ela fica de pé. Uma cidade onde ninguém conhece a minha avó. Uma cidade onde ninguém sabe quem eu fui aos catorze.* A última linha, sozinha, sem ponto final: *Poder errar sem que tenha plano.*

Você fecha o caderno com as duas mãos. O que dói não é a faculdade: é a coluna da esquerda ter uma palavra só, e a da direita ter doze."""),
  dict(id='fechar', texto='Fechar o caderno sem ler mais nada e esperar o outro chegar', ir='pp_c7_briga',
   efeitos=dict(flag='a_fechou_caderno', abalo=1),
   resultado="""Você fecha o caderno com a ponta dos dedos, como quem fecha a porta do quarto de um desconhecido, e o põe de volta onde estava, na mesma direção. Mas o que viu continua com você: duas colunas, uma linha no meio, um nome sublinhado. Você acha, por um segundo, que ter lido menos é pior do que ter lido tudo."""),
 ])

NOS['pp_c7_b'] = dict(tipo='solo', cap=7, seat='B', lugar='Depósito da Kessler Hardware', hora='Terça, 23 de dezembro · 08h25',
 texto="""Você chega dez minutos depois, de capuz, com a chave pequena e um copo de café no punho fechado. A folha da planilha continua no chão, perto do pé da mesa, onde o vento a deixou. Ninguém a pegou.

Você a levanta para devolver, e ela se desdobra sozinha. Abas coloridas, horários de ônibus, as matérias que ela escreveu, aos dezesseis anos, que vocês dois fariam juntos. O seu rabisco a lápis, *isso é um contrato, não um plano*, de ontem à noite, ainda na margem.

Mas há uma aba que você nunca tinha visto, impressa pequena no canto direito, com letra de computador: *Plano B (se {{B.nome}} disser não)*. Debaixo, quatro linhas.""",
 acoes=[
  dict(id='ler', texto='Ler as quatro linhas do Plano B', ir='pp_c7_briga',
   efeitos=dict(flag='b_leu_plano_b', abalo=2),
   resultado="""Você lê. *1. Não perguntar de novo. 2. Ir para a faculdade mesmo assim. 3. Parar de olhar a janela da nº 11 às sete da manhã. 4. Não esperar.* A última palavra está sublinhada duas vezes, num lápis que fez um buraco no papel.

Você dobra a folha de novo, devagar, com um nó na garganta. Em dois anos de silêncio, você imaginou {{A.nome}} zangado ou zangada. Nunca imaginou preparada."""),
  dict(id='devolver', texto='Dobrar a folha sem ler a aba nova e deixar onde estava', ir='pp_c7_briga',
   efeitos=dict(flag='b_nao_leu_plano_b', abalo=1),
   resultado="""Você dobra a folha, bem, nos mesmos vincos, e a deixa em cima da prancheta azul, sem ler a aba nova. Há uma honra pequena em não ler o que não é seu. Há também uma covardia pequena, e você sabe, como sempre soube, que as duas vêm juntas."""),
 ])

NOS['pp_c7_briga'] = dict(tipo='dialogo', cap=7, lugar='Depósito da Kessler Hardware', hora='Terça, 23 de dezembro · 09h05', comeca='A',
 texto="""O seu Szymanski prometeu voltar às nove, e às nove e cinco ainda não voltou. O depósito tem duas pessoas, uma mesa de marceneiro, uma estrela de oito pontas e dois objetos que não eram de quem leu.

Em duas noites de beijo ou de quase-beijo, de cozinha de prima, de andaime e de tabela de carga, ninguém gritou. Hoje, o silêncio acaba.""",
 turnos=[
  dict(prompt='Quem fala primeiro é você.', opcoes=[
    op('fere', 'y0_caderno', '— Você tem doze motivos para ir embora e um para ficar. E o um é um nome, não uma razão.', se='flag:a_leu_caderno', ef=dict(abalo=1)),
    op('fere', 'y0_mentira', '— Eu vi o caderno. Você me deixou falar uma semana inteira de futuro, de árvore, de março, sabendo.', se='flag:a_leu_caderno || flag:a_fechou_caderno', ef=dict(abalo=1)),
    op('seco', 'y0_carga', '— Antes que a gente brigue: a carga fecha em duas metades. Eu preciso saber se você vai estar lá.'),
    op('cuida', 'y0_cuida', '— Você está com cara de quem não dormiu. Quer um café, antes de qualquer coisa?'),
  ]),
  dict(prompt='A resposta é sua.', opcoes=[
    op('fere', 'y1_plano', '— Você tem um Plano B, com a minha recusa já prevista. Eu li. Não é amor, é seguro.', se='flag:b_leu_plano_b', ef=dict(abalo=2)),
    op('fere', 'y1_contrato', '— E você escreveu um contrato quando tinha dezesseis anos, e esperou eu assinar. Isso também não é amor.', ef=dict(abalo=1)),
    op('abre', 'y1_contar', '— Eu ia contar sobre Cornell. Eu queria contar. Eu só não sabia como começar uma frase que machuca você.', ef=dict(vinculo=1)),
    op('seco', 'y1_nao', '— Não vou discutir isso aqui. Tenho uma árvore para acender.'),
  ]),
  dict(prompt='A conversa é sua de novo.', opcoes=[
    op('fere', 'y2_some', '— Você sempre faz isso: concorda, não faz, some. Não foi a primeira vez, e não vai ser a última.', ef=dict(abalo=1)),
    op('abre', 'y2_medo', '— Eu tenho medo. De que o que eu quero seja algo que você não consiga querer junto.', ef=dict(vinculo=1)),
    op('abre', 'y2_perdao', '— Eu errei com o plano. Eu devia ter perguntado, e eu fiz uma planilha. Eu sei que isso é um jeito de controlar.', ef=dict(vinculo=1)),
    op('seco', 'y2_pausa', '— Eu preciso de uma hora. Sozinh{{eu.o_a}}.'),
  ]),
  dict(prompt='A última palavra da briga é sua.', opcoes=[
    op('abre', 'y3_ficar', '— Eu quero ficar na árvore. Mesmo brigando. Mesmo com Cornell. Quero acender isso com você.', ef=dict(vinculo=2)),
    op('fere', 'y3_sair', '— Então termina isso sem mim. Eu avisei que ia dar errado.', ef=dict(abalo=2)),
    op('seco', 'y3_silencio', '— Eu não tenho mais nada a dizer hoje.'),
  ]),
 ],
 pool=[
  op('cuida', 'pl_sentar', '— Senta. A gente não precisa brigar de pé.'),
  op('seco', 'pl_depois', '— Depois a gente retoma.'),
  op('flerte', 'pl_beijo', '— Ontem você não estava com tanta raiva.'),
  op('abre', 'pl_dificil', '— Falar isso é mais difícil do que subir doze metros.'),
  op('fere', 'pl_fugir', '— Você vai fugir de novo. Já sei como esse filme termina.'),
 ],
 fecho="""O barulho do vento passa pelo beco, e a lâmpada nua do teto balança uma vez. Em cima da mesa, a estrela de oito pontas devolve a luz fraca para os dois lados, como uma testemunha.""",
 ir='pp_c7_decide')

NOS['pp_c7_decide'] = dict(tipo='decisao', cap=7, lugar='Depósito da Kessler Hardware', hora='Terça, 23 de dezembro · 10h00',
 texto="""Dos dois lados da mesa, em silêncio, as duas pessoas sabem que existe uma saída boa e uma saída fácil. Elas nem sempre são a mesma. E, como sempre, só é uma decisão se os dois escolherem a mesma coisa.""",
 pergunta='O que vocês fazem agora?',
 ir={'A': 'pp_c7_noite_a', 'B': 'pp_c7_noite_b'},
 acoes=[
  dict(id='pausa', texto='Uma pausa: cada um vai para casa e só volta à noite', efeitos=dict(flag='fez_pausa'),
   resultado="""Vocês combinam uma pausa. Cada um guarda o que trouxe e sai por uma porta diferente do depósito, com o cuidado de quem sabe que uma pausa pode ser um descanso ou o começo de uma fuga. Não dizem para quando."""),
  dict(id='trabalhar', texto='Trabalhar em silêncio: a árvore não espera, a briga pode esperar', efeitos=dict(flag='trabalhou_calado', abalo=1),
   resultado="""Vocês trabalham. Passam seis horas puxando fio, medindo cabo, apertando parafuso, sem dizer nada além de *passa* e *aqui*. É a pior e a melhor coisa que dois adultos recentes sabem fazer: calar, e fazer com as mãos o que não conseguem com a boca."""),
  dict(id='conversar', texto='Continuar a conversa, mesmo que machuque, até chegar a algum lugar', efeitos=dict(flag='continuou_conversa', vinculo=1),
   resultado="""Vocês ficam. Sentam em lados opostos da mesa, com a estrela no meio, e conversam até a luz da lâmpada nua ser a única do beco. Não chegam a um acordo, e nem a uma briga final. Chegam, devagar, a uma conversa maior do que qualquer uma das duas pessoas."""),
 ])

NOS['pp_c7_noite_a'] = dict(tipo='solo', cap=7, seat='A', lugar='Quarto, casa nº 8', hora='Terça, 23 de dezembro · 22h40',
 texto="""Dez e quarenta da noite, e a luz voltou, finalmente, na nº 8: a companhia religou o transformador às seis. A casa está quente, cheira a molho e a pinheiro, e da sala vem o barulho do filme de Natal que o seu pai e o Nico veem todo ano, sem falar.

Você está sentad{{eu.o_a}} na beira da cama, com a prancheta no colo, e o celular, virado para baixo, ao lado. Na tela, três mensagens que você mandou nas últimas duas horas, sem resposta. A terceira, a mais curta, diz apenas: *Você está bem?*

Do outro lado da rua, a janela do quarto da nº 11 está escura. Foi a primeira vez, em dez anos, que ela estava escura antes da meia-noite.""",
 acoes=[
  dict(id='ir_la', texto='Atravessar a rua e bater na porta da nº 11, mesmo que seja tarde', ir='pp_c7_fim',
   efeitos=dict(flag='a_foi_atras', abalo=1),
   resultado="""Você veste o casaco por cima do pijama, calça as botas do seu pai e atravessa Harmon Place, de neve até o tornozelo, até a varanda da nº 11, onde o lampião da Pó-pó balança no gancho. Bate duas vezes. Quem abre é a Pó-pó, de xale, que olha você de cima a baixo, e diz, em voz baixa: *ele saiu às oito, com a mochila. Não disse para onde.*"""),
  dict(id='esperar', texto='Mandar uma última mensagem e deixar o celular longe', ir='pp_c7_fim',
   efeitos=dict(flag='a_esperou_msg'),
   resultado="""Você escreve: *Eu estou aqui se você quiser falar. Sem pressa.* Envia. Põe o celular dentro da gaveta da cabeceira, fecha a gaveta e deita, de olhos abertos, com o teto cheio de luzes que não estão ali. É a primeira vez, em toda a sua vida, que você não confere duas vezes se a mensagem foi entregue."""),
  dict(id='trabalhar', texto='Ir de novo ao depósito, no escuro, e trabalhar sozinh{{eu.o_a}}', ir='pp_c7_fim',
   efeitos=dict(flag='a_foi_depositar'),
   resultado="""Você pega a chave pequena e vai a pé, pela neve, até a Kessler. O depósito, no escuro, com a estrela de oito pontas em cima da mesa, parece um barco ancorado. Você acende a lâmpada nua e começa a medir um cabo que já foi medido. É um jeito de fazer alguma coisa enquanto o resto da vida decide por você."""),
 ])

NOS['pp_c7_noite_b'] = dict(tipo='solo', cap=7, seat='B', lugar='Rodoviária, Port Authority', hora='Terça, 23 de dezembro · 22h40',
 texto="""Você está na plataforma 312 do terminal de ônibus de Port Authority, em Manhattan, com a mochila no colo, a fotografia de 1987 no bolso e um bilhete de ida e volta para Ithaca, comprado às oito e pouco da noite, num balcão onde ninguém perguntou nada.

Seis horas de ônibus. O último de hoje sai às onze e dez. Uma entrevista presencial em Cornell está marcada para amanhã às nove da manhã, um e-mail que chegou semanas atrás e que você respondeu com um *confirmo*, sem contar a ninguém.

Na tela do celular, três mensagens, todas de {{A.nome}}. A última, curta: *Você está bem?*""",
 acoes=[
  dict(id='viajar', texto='Embarcar no ônibus de Ithaca, mesmo com a véspera da árvore amanhã', ir='pp_c7_fim',
   efeitos=dict(flag='b_sumiu', abalo=2),
   resultado="""Você sobe os três degraus do ônibus, mostra o bilhete e se senta junto à janela. O motor liga. Você desliga o celular, sem responder, com a sensação, conhecida, de ter feito exatamente o que sempre faz: ir embora antes que alguém peça para ficar.

Pela janela, Manhattan vai ficando para trás em linhas de luz, como um desenho que alguém apaga devagar."""),
  dict(id='responder', texto='Ficar na plataforma, rasgar o bilhete e escrever de volta', ir='pp_c7_fim',
   efeitos=dict(flag='b_ficou', vinculo=2),
   resultado="""Você rasga o bilhete ao meio, devagar, e o deixa numa lixeira de metal. Escreve, com o polegar, uma mensagem que leva quatro minutos para ficar do jeito que você quer: *Estou bem. Fui embora por um tempo, mas voltei. Posso te contar tudo amanhã?* Você nunca mandou uma resposta tão rápido a alguém, nem tão devagar."""),
  dict(id='ligar_po', texto='Ligar para a Pó-pó e ouvir o que ela tem a dizer antes de decidir', ir='pp_c7_fim',
   efeitos=dict(flag='b_ligou_po'),
   resultado="""A Pó-pó atende no primeiro toque, em cantonês, e muda para inglês assim que ouve a sua respiração. *Onde você está?* Você diz. Ela fica quieta. Depois, devagar: *Seu avô também ficava numa plataforma, às vezes, em 1987, quando discutia com o Gennaro. Voltava sempre. Mas voltava porque alguém ligava.* E desliga, antes que você consiga responder."""),
 ])

NOS['pp_c7_fim'] = dict(tipo='fim', cap=7, lugar='Harmon Place', hora='Quarta, 24 de dezembro · 05h50',
 texto="""Às cinco e cinquenta da manhã do dia da Noite da Árvore, o celular dos dois vibra com o mesmo alerta do Serviço Nacional de Meteorologia: *Aviso de tempestade de inverno: neve forte e ventos de até 70 km/h a partir das 10h. Evite deslocamentos.* A tempestade que vinha do oeste chegou antes da hora.

{{se flag:b_sumiu}}Em algum ponto da I-81, num ônibus, uma pessoa lê o alerta e conta as horas para chegar. {{/se}}{{se flag:b_ficou}}Em algum ponto de Manhattan, uma pessoa lê o alerta e conta as horas para voltar para casa. {{/se}}{{se flag:b_ligou_po}}Em algum ponto de Manhattan, uma pessoa lê o alerta, com a voz da avó ainda na cabeça. {{/se}}{{se flag:a_foi_atras}}Na varanda da nº 11, uma lanterna de lampião tremeu a noite inteira. {{/se}}{{se flag:a_esperou_msg}}Na gaveta de uma cabeceira, um celular vibrou, uma vez, e ninguém atendeu. {{/se}}{{se flag:a_foi_depositar}}No depósito da Kessler, uma lâmpada nua ficou acesa a noite inteira. {{/se}}

Doze metros de cabo trançado, em Cooper Green, estremecem sob o primeiro vento. A árvore que ia acender às sete da noite precisa, antes, sobreviver à manhã.""",
 gancho="Uma tempestade de inverno chegou doze horas antes da Noite da Árvore, e um dos dois não está em casa.",
 ir='pp_rascunho_fim')
