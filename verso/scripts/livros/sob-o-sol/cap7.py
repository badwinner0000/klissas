# Sob o Sol da Toscana · Capítulo 7 · A Descoberta
NOS = {}

def op(tom, tag, texto, se=None, ef=None, acao=False):
    d = dict(tom=tom, tag=tag, texto=texto)
    if se: d['se'] = se
    if ef: d['efeitos'] = ef
    if acao: d['acao'] = True
    return d

NOS['ts_c7_cozinha'] = dict(tipo='segue', cap=7, lugar='Cozinha, Casa Bianchini', hora='Sexta · 21h30', npcs=['ottavia'],
 ir='ts_c7_dialogo',
 texto="""A sopa de pão e feijão da signora Ottavia tem o cheiro de uma casa que não é de nenhuma das duas. Uma colher de azeite, no meio da tigela, desenha um círculo dourado. O pão, amolecido, desmancha com a ponta da colher. A mesa dobrável, que balança, tem agora um guardanapo dobrado em quatro sob a perna curta, e duas velas de pote, acesas, que ninguém lembra de ter posto.

Há uma semana, as duas não se sentavam à mesma mesa sem um livro entre elas. Hoje, a única coisa entre elas é uma panela de ferro e um silêncio que, pela primeira vez, não pede desculpa.

{{se flag:b_confessou_matteo}}Uma delas sai de uma conversa em que disse, a um orientador, a palavra *medo*. {{/se}}{{se flag:a_contou_giulia}}A outra sai de uma conversa em que contou, a uma amiga, o que ainda não disse. {{/se}}Alguém, a certa altura, vai ter de dizer o primeiro nome do que aconteceu.""")

NOS['ts_c7_dialogo'] = dict(tipo='dialogo', cap=7, lugar='Cozinha, Casa Bianchini', hora='Sexta · 21h45', comeca='A',
 texto="""Do lado de fora, a noite de Siena tem o cheiro de fumaça de lenha e de chuva distante. Na cozinha, as velas tremem a cada vez que alguém respira. A sopa, depois de dois minutos de silêncio, está pela metade.

A conversa, que ninguém pediu, chega pelo caminho mais torto: pelos ex-namorados.""",
 turnos=[
  dict(prompt='A primeira frase é sua.', opcoes=[
    op('abre', 'q0_a_abre', '— Eu tive um ex. Quatro anos. Eu fugi dele para vir aqui. Eu nunca contei para ninguém.', se='eu:A', ef=dict(flag='a_contou_ex', vinculo=2)),
    op('flerte', 'q0_a_flerte', '— E você? Alguma história de amor trágica, de biblioteca, com um bibliotecário de bigode?', se='eu:A'),
    op('seco', 'q0_a_seco', '— A sopa está boa. É a coisa mais italiana que eu já comi.', se='eu:A'),
    op('abre', 'q0_b_abre', '— Eu não tive nenhum. Namorado, namorada, nada. Nunca.', se='eu:B', ef=dict(flag='b_contou_nunca', vinculo=2)),
    op('seco', 'q0_b_seco', '(Mexer a sopa em círculos, sem levantar os olhos, e esperar.)', se='eu:B', acao=True),
    op('cuida', 'q0_b_cuida', '— Eu fiz a sopa durar. Tem mais na panela, se você quiser.', se='eu:B'),
  ]),
  dict(prompt='Agora você responde.', opcoes=[
    op('abre', 'q1_b_abre', '— Eu nunca soube como se começa. Eu tinha medo de que, se começasse, eu parasse de estudar.', se='eu:B', ef=dict(vinculo=2)),
    op('seco', 'q1_b_seco', '— Eu fugi também. Só que eu fugi para dentro. Para dentro dos livros.', se='eu:B'),
    op('cuida', 'q1_b_cuida', '— Quatro anos é muito tempo. Deve ter sido difícil ir embora.', se='eu:B'),
    op('abre', 'q1_a_abre', '— Eu não sabia. Eu achei que você tinha... achei que você sabia tudo.', se='eu:A', ef=dict(vinculo=2)),
    op('cuida', 'q1_a_cuida', '— Obrigad{{eu.o_a}} por me contar. Eu sei que não é fácil.', se='eu:A'),
    op('seco', 'q1_a_seco', '(Ficar em silêncio, de olhos na tigela, e deixar a frase existir.)', se='eu:A', acao=True),
  ]),
  dict(prompt='A conversa é sua de novo.', opcoes=[
    op('abre', 'q2_a_abre', '— Eu achei que o beijo tinha sido um erro seu. Eu achei que você tinha se arrependido de mim.', se='eu:A', ef=dict(vinculo=2)),
    op('cuida', 'q2_a_cuida', '— A gente não precisa falar disso hoje. Eu espero. De verdade.', se='eu:A', ef=dict(flag='a_deu_espaco', vinculo=2)),
    op('flerte', 'q2_a_flerte', '— Tá. Mas eu não vou fingir que a noite do terraço não aconteceu.', se='eu:A'),
    op('abre', 'q2_b_abre', '— Eu não me arrependi de você. Eu me arrependi de ter fugido.', se='eu:B', ef=dict(vinculo=2)),
    op('seco', 'q2_b_seco', '— Eu preciso de tempo. Eu sei que é injusto. Mas é verdade.', se='eu:B'),
    op('cuida', 'q2_b_cuida', '— Eu tenho medo de te machucar. Eu não sei como não machucar.', se='eu:B'),
  ]),
  dict(prompt='A última palavra da mesa é sua.', opcoes=[
    op('abre', 'q3_b_abre', '— Obrigad{{eu.o_a}}. Por não pedir pressa. Ninguém nunca me deu isso.', se='eu:B', ef=dict(vinculo=2)),
    op('seco', 'q3_b_seco', '— Boa noite. Amanhã, às seis, a cozinha é minha. Mas eu deixo o café pronto.', se='eu:B'),
    op('cuida', 'q3_b_cuida', '(Empurrar a panela, devagar, para o lado da outra pessoa, e levantar.)', se='eu:B', acao=True),
    op('abre', 'q3_a_abre', '— Eu espero. O tempo que for. Eu levo mais jeito para isso do que aparento.', se='eu:A', ef=dict(vinculo=2)),
    op('flerte', 'q3_a_flerte', '— Boa noite. E obrigad{{eu.o_a}} pela sopa. Eu vou sonhar com ela.', se='eu:A'),
    op('seco', 'q3_a_seco', '(Soprar uma das velas e deixar a outra acesa, sem explicação.)', se='eu:A', acao=True),
  ]),
 ],
 pool=[
  op('cuida', 'pl_cuida', '(Servir mais sopa na tigela da outra pessoa, sem perguntar.)', acao=True),
  op('seco', 'pl_seco', '(Olhar a chama da vela, que balança, e esperar que ela firme.)', acao=True),
  op('flerte', 'pl_flerte', '(Sorrir para a tigela, só para ela, e esconder com a mão.)', acao=True),
  op('abre', 'pl_abre', '— Eu não sei dizer isso direito. Mas eu estou tentando.'),
  op('fere', 'pl_fere', '(Largar a colher na tigela, com um tilintar seco, e cruzar os braços.)', acao=True),
 ],
 fecho="""A signora Ottavia, no andar de baixo, bate, com o cabo da vassoura, duas vezes no teto, em compasso curto, o de quem apenas confere se as duas continuam vivas. As duas olham para cima, e uma ri, e a outra, depois de um segundo, também. A vela que sobrou tem um halo dourado.""",
 ir='ts_c7_decisao')

NOS['ts_c7_decisao'] = dict(tipo='decisao', cap=7, lugar='Cozinha, Casa Bianchini', hora='Sexta · 23h00',
 texto="""Dizer a verdade, em voz alta, é como abrir uma janela em um quarto fechado: entra ar, e entra frio. As duas ficam um tempo em silêncio, de pé, na cozinha, com as tigelas vazias. Falta decidir o que fazer com o que foi dito.""",
 pergunta='O que as duas fazem com a verdade?',
 ir={'A': 'ts_c7_noite_a', 'B': 'ts_c7_noite_b'},
 acoes=[
  dict(id='tempo', texto='Dar tempo: combinar, em voz alta, que não há pressa e que nada precisa ser decidido até o fim do mês', efeitos=dict(flag='combinaram_tempo', vinculo=2),
   resultado="""Vocês combinam, em voz alta, sem aperto de mão: nada precisa ser decidido até o fim do mês. É uma promessa curta, e a coisa mais generosa que uma das duas ouviu, e a mais difícil de cumprir que a outra prometeu. A vela, que sobrou, queima um pouco mais forte."""),
  dict(id='regra', texto='Fazer uma regra: cada uma dorme do seu lado, sem travesseiro no meio, e as duas conversam se alguma quiser', efeitos=dict(flag='regra_sem_travesseiro', vinculo=1),
   resultado="""Vocês combinam uma regra nova: sem travesseiro no meio. É uma regra de confiança, de duas pessoas que sabem, ao mesmo tempo, que a confiança precisa de um gesto. O travesseiro, que voltou na semana do silêncio, é levado, por uma das duas, de volta à cabeceira, e ninguém comenta."""),
  dict(id='nada', texto='Não combinar nada: deixar a sopa, a noite e a vela falarem, e ver o que vem de manhã', efeitos=dict(flag='nada_combinado'),
   resultado="""Vocês não combinam nada. É uma decisão de duas pessoas que acabaram de aprender que nem tudo precisa de plano, e que uma delas, que sempre fez plano, acaba de descobrir quanto custa não ter um. A vela, no fim, apaga sozinha."""),
 ])

NOS['ts_c7_noite_a'] = dict(tipo='solo', cap=7, seat='A', lugar='Quarto, Casa Bianchini', hora='Sábado · 00h20',
 texto="""Na cama, de lado, de olhos abertos, você olha o teto de madeira, onde a luz da vela da cozinha, que vem pela porta entreaberta, desenha uma faixa fina e dourada. A pessoa que dorme, a um palmo, respira devagar. Há cinco dias que as duas dormem de costas uma para a outra. Hoje, de algum modo, não.

Você pensa no que ouviu: *eu nunca tive nenhum*. Pensa que, para uma pessoa que nunca teve ninguém, uma noite, uma boca, um beijo debaixo de um arco, deve ter tido o peso de uma queda. E pensa na sua própria vida, no ex de quatro anos, na casa em Los Angeles, na mãe que diz *estamos tentando algumas coisas*, e entende, por fim, que as duas fogem do mesmo tamanho de silêncio.

O seu coração, que sempre soube se defender com barulho, está, pela primeira vez, só.""",
 acoes=[
  dict(id='esperar', texto='Deixar a mão, de propósito, aberta no meio da cama, sem tocar, como um convite sem obrigação', ir='ts_c7_fim',
   efeitos=dict(flag='a_deixou_mao', vinculo=2),
   resultado="""Você deixa a mão no meio da cama, de palma para cima, aberta, sem apertar nada, sem pedir nada. Um convite sem prazo. Você fecha os olhos, e o sono, devagar, vem. Em algum ponto da madrugada, uma coisa quente toca, de leve, a ponta dos seus dedos, e desaparece. Você não abre os olhos. Mas sorri."""),
  dict(id='virar', texto='Virar de costas, para respeitar o espaço da outra pessoa, e dormir, mesmo sem sono', ir='ts_c7_fim',
   efeitos=dict(flag='a_virou_costas', abalo=1),
   resultado="""Você vira de costas, devagar, para o lado da parede, e abraça o travesseiro. É um gesto de respeito, e de saudade, e você, que nunca respeitou uma regra na vida, a cumpre com uma disciplina que lhe parece, de repente, uma forma de amor. Dorme às quatro, com a sensação de ter dito uma coisa que ninguém ouviu."""),
  dict(id='escrever', texto='Pegar o caderno de croquis, no escuro, e desenhar, de memória, a mão da outra pessoa segurando o guarda-chuva', ir='ts_c7_fim',
   efeitos=dict(flag='a_desenhou_mao', vinculo=1),
   resultado="""Você pega o caderno de croquis e o lápis, e, à luz da vela que vem da cozinha, desenha, de memória, uma mão em um cabo de madeira em cabeça de pássaro: os dedos longos, as unhas curtas, o calo de segurar lápis. O traço, que sempre foi rápido, sai devagar. Quando termina, às duas, você fecha o caderno, e o põe na cômoda, aberto, de propósito."""),
 ])

NOS['ts_c7_noite_b'] = dict(tipo='solo', cap=7, seat='B', lugar='Quarto, Casa Bianchini', hora='Sábado · 00h20',
 texto="""Na cama, de costas, de olhos abertos, você olha a faixa dourada que a vela desenha no teto. A pessoa a seu lado, que lhe contou do ex de quatro anos e que, em seguida, não lhe pediu nada, respira devagar. Há quatro dias que você não consegue dormir.

Você pensa na frase que lhe saiu, de um modo que não esperava: *eu não tive nenhum, nunca*. Dita em voz alta, numa cozinha, diante de uma sopa, com a luz de uma vela, a frase não pesou. Ao contrário. Saiu, e deixou no peito um espaço que você não sabia que tinha. E a resposta, em vez de piedade, foi um *eu espero*.

Você, que planejou cada passo, não planejou isto. Nem previu a possibilidade de uma pessoa lhe dar tempo sem lhe cobrar o resultado.""",
 acoes=[
  dict(id='tocar', texto='Estender a mão, devagar, no escuro, até encostar, de leve, na ponta dos dedos da outra pessoa', ir='ts_c7_fim',
   efeitos=dict(flag='b_tocou_dedos', vinculo=2),
   resultado="""Você estende a mão, no escuro, centímetro por centímetro, como quem procura um interruptor. Encontra, no lençol, uma palma aberta, quente, sem apertar. Toca, com a ponta dos dedos, a ponta de outros dedos, uma vez, de leve. Retira. O coração bate com uma força que parece audível, e a respiração ao lado, sem mudar de ritmo, continua. Você adormece, finalmente, com um calor na mão."""),
  dict(id='ficar', texto='Ficar em silêncio, de olhos abertos, na própria metade, e deixar a noite passar sem fazer nada', ir='ts_c7_fim',
   efeitos=dict(flag='b_ficou_quieta', abalo=1),
   resultado="""Você não faz nada. Fica na sua metade, de olhos abertos, de costas, de mãos cruzadas sobre o peito. O tempo, no escuro, tem a textura de uma dúvida. Você ouve a respiração da outra pessoa, lenta, a cada vez mais longe, e, às três, descobre que está chorando, sem som, de uma coisa que não é tristeza."""),
  dict(id='anotar', texto='Acender o abajur, devagar, sem acordar ninguém, e escrever, numa ficha em branco, o que sente', ir='ts_c7_fim',
   efeitos=dict(flag='b_escreveu_ficha', vinculo=1),
   resultado="""Você acende o abajur, baixa o brilho com a mão, pega uma ficha em branco e escreve, na letra firme de sempre: *tenho medo de ser feliz.* Olha a frase um tempo. Não a risca. Dobra a ficha em quatro e a guarda dentro do livro de Vasari, na página trinta e dois, entre uma anotação sobre Simone Martini e uma sobre o céu."""),
 ])

NOS['ts_c7_fim'] = dict(tipo='fim', cap=7, lugar='Casa Bianchini, Siena', hora='Sábado · 08h00',
 texto="""Sábado, oito da manhã. A luz, na persiana, desenha listras. {{se flag:combinaram_tempo}}Na porta da geladeira, um pedaço de fita adesiva, sem nada escrito, marca o dia primeiro de dezembro. {{/se}}{{se flag:regra_sem_travesseiro}}O travesseiro, que antes dividia a cama, está, de manhã, na cabeceira, e os dois lados do colchão tocam, de leve, na dobra do lençol. {{/se}}{{se flag:nada_combinado}}Na mesa da cozinha, a vela que sobrou, curta, ainda tem um fio de cera derretida. {{/se}}{{se flag:a_deixou_mao}}Na cama, uma mão repousa, de palma para cima, no meio do colchão. {{/se}}{{se flag:b_tocou_dedos}}E outra, ao lado, tem um calor que ainda não passou. {{/se}}{{se flag:a_desenhou_mao}}Sobre a cômoda, um caderno de croquis, aberto, mostra uma mão em um cabo de guarda-chuva. {{/se}}{{se flag:b_escreveu_ficha}}Entre as páginas de um livro, uma ficha dobrada guarda uma frase de sete palavras. {{/se}}

Quando a primeira acorda, com o sol no rosto, repara, na cozinha, num som que não é rotina: o de uma pessoa que faz café, devagar, sem pressa. Quando chega à porta, vê, na mesa, uma tigela de iogurte com mel, uma torrada com manteiga de amendoim, e, ao lado, uma xícara com leite quente, a que a outra pessoa nunca tomou, e que alguém, que prestou atenção, preparou.

A pessoa que cozinha não se vira. Mas a nuca, vermelha, e a colher, que tilinta na xícara, dizem, sem uma palavra, a coisa que nenhuma das duas, ainda, teve coragem de pôr em voz alta: *eu não estou fugindo.*""",
 gancho="Uma xícara de leite quente preparada por alguém que prestou atenção.",
 ir='ts_c8_viagem')
