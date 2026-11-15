# Sob o Sol da Toscana · Capítulo 9 · A Véspera
NOS = {}

def op(tom, tag, texto, se=None, ef=None, acao=False):
    d = dict(tom=tom, tag=tag, texto=texto)
    if se: d['se'] = se
    if ef: d['efeitos'] = ef
    if acao: d['acao'] = True
    return d

NOS['ts_c9_vespera'] = dict(tipo='segue', cap=9, lugar='Casa Bianchini, Siena', hora='Janeiro · última semana', npcs=['ottavia', 'giulia'],
 ir={'A': 'ts_c9_a', 'B': 'ts_c9_b'},
 texto="""Os meses passam em Siena como as páginas de um livro que se lê devagar. A apresentação sobre Simone Martini, em dezesseis de dezembro, tirou nota máxima do professor Bellandi, que, em vez de elogiar o conteúdo, disse, de blazer de veludo, olhando as duas por cima dos óculos: *o que eu vi, senhoras e senhores, foi duas pessoas apaixonadas por um quadro. E isso, na minha cátedra, vale mais do que o rigor.* A turma aplaudiu. {{se flag:leu_a_fundo}}Uma das duas, que leu o tijolo de quinhentas páginas, citou de cabeça trechos em italiano. {{/se}}{{se flag:desenhou_afresco}}A outra, que desenhou a Concórdia, projetou, em um slide, doze figurinos do Bom Governo. {{/se}}{{se flag:pediu_aula}}A explicação particular da biblioteca, de meia hora, rendeu uma apresentação sem erro. {{/se}}

O Natal passou, sem festa. Janeiro chegou, com neve fina nas colinas, uma geada na janela do quarto e a lista, escrita à mão e colada na porta, de tudo o que as duas precisam fazer antes de partir. Na cozinha, as caixas de papelão. No armário, a fita crepe do primeiro dia, ainda dividindo as prateleiras. Na cômoda, a moeda de dois euros, de coroa para cima.

{{se flag:noite_florenca}}A noite de Florença, que ninguém menciona, ocupa o quarto inteiro. {{/se}}{{se !flag:noite_florenca}}Os dedos entrelaçados de uma manhã em Florença ocupam o quarto inteiro. {{/se}}Quando faltam quatro dias, as duas descobrem que a coisa que não foi dita tem a forma exata de uma mala.""")

NOS['ts_c9_a'] = dict(tipo='solo', cap=9, seat='A', lugar='Quarto, Casa Bianchini', hora='Terça · 11h00', npcs=['mae'],
 texto="""O e-mail da Maison Ferretti, de Roma, ainda está na sua caixa de entrada, aberto e lido quarenta e duas vezes. Um estágio de seis meses, de fevereiro a julho, em uma casa de moda de quarenta anos, no centro, a dois quarteirões da Piazza di Spagna, com salário, com alojamento incluído e com a assinatura de uma diretora de criação cujo nome você conhece de revista.

O seu voo para Los Angeles sai de Roma na sexta, às seis da manhã. A sua mãe, que não sabe do e-mail, já mandou, por mensagem, uma foto do seu quarto de infância, com a cama arrumada e um cartaz de *Bem-vinda de volta*. O seu pai, de onde vive agora, em um apartamento de dois quartos, mandou um coração.

Do outro lado do quarto, de joelhos, entre duas caixas de papelão, a pessoa que divide o apartamento com você embrulha livros em jornal, devagar, um a um, com a delicadeza de quem embrulha coisas vivas.""",
 acoes=[
  dict(id='contar', texto='Contar, em voz alta, que foi aprovad{{eu.o_a}}, e deixar a outra pessoa reagir como for', ir='ts_c9_dividir',
   efeitos=dict(flag='a_contou_estagio', vinculo=1, abalo=1),
   resultado="""— Eu fui aprovada — você diz, baixo. — Em Roma. Seis meses. — As mãos, no jornal, param. A pessoa, de joelhos, ergue os olhos, devagar, e o rosto, por um segundo, é uma página em branco. *Parabéns*, diz, em voz de comunicado. *É uma ótima oportunidade.* E volta a embrulhar o livro, com um cuidado que se parece com raiva."""),
  dict(id='esconder', texto='Esconder a notícia por mais um dia: ainda não decidiu, e não quer que a decisão seja de ninguém além de você', ir='ts_c9_dividir',
   efeitos=dict(flag='a_escondeu_estagio', abalo=2),
   resultado="""Você fecha o e-mail e, por mais um dia, guarda a notícia. É uma coisa que nunca fez: ter um segredo que não é uma fuga, mas um jeito de pensar. Na pia do banheiro, às dez da noite, diante do espelho, você diz, em voz baixa, as duas versões do futuro, a de Los Angeles e a de Roma, como quem testa vestidos."""),
  dict(id='mae', texto='Ligar para a sua mãe e pedir, pela primeira vez, que ela escute sem interromper', ir='ts_c9_dividir',
   efeitos=dict(flag='a_ligou_mae', vinculo=1),
   resultado="""Você liga. A sua mãe, em Los Angeles, atende no segundo toque, com a voz de quem estava com a mão no telefone. *Mãe*, você diz, *eu preciso que você escute até o fim.* Um silêncio. *Eu escuto.* Você conta do estágio, de Roma, de Siena, de uma pessoa. Quando termina, do outro lado, uma respiração funda: *seu pai e eu*, ela começa, e para. *Não. Eu. Eu estou orgulhosa de você, filha.*"""),
 ])

NOS['ts_c9_b'] = dict(tipo='solo', cap=9, seat='B', lugar='Escritório do Prof. Lazzeri', hora='Terça · 11h00', npcs=['matteo', 'mae'],
 texto="""O escritório de Matteo Lazzeri, na última semana, tem as estantes meio vazias, as caixas de livros no chão e a janela do pátio coberta de geada. Matteo, de camisa branca, de lápis vermelho atrás da orelha, entrega a você, por cima da mesa, um envelope de papel grosso, com o timbre da Sapienza, a universidade de Roma.

— Eu não devia entregar antes de março — diz ele. — Mas conheço o diretor. Leia.

Você lê. A candidatura ao mestrado em História da Arte, na Sapienza, foi pré-aprovada, com bolsa integral. Condição: a conclusão da graduação, em Boston, até maio, com média nove. É o que você sempre quis, e a primeira vez que a coisa que você sempre quis chega, e você não sente nada que se pareça com alegria.

— Você está pálid{{eu.o_a}} — diz Matteo, com uma delicadeza que ele nunca teve. — Quer um café?""",
 acoes=[
  dict(id='alegria', texto='Dizer, em voz baixa, que é o que sempre quis, e tentar sentir', ir='ts_c9_dividir',
   efeitos=dict(flag='b_disse_sempre_quis', abalo=1),
   resultado="""— É o que eu sempre quis — você diz, e a frase, dita, parece um texto decorado. Matteo, de lápis na mão, olha você. *E agora?*, pergunta. Você abre a boca. *Agora*, diz, *eu volto para Boston, termino a graduação, e venho para Roma em setembro.* Ele assente, sem sorrir. *É um bom plano*, diz. *Perfeito.* A palavra, na boca dele, soa como uma pergunta."""),
  dict(id='duvida', texto='Confessar a dúvida: que, pela primeira vez, o plano perfeito parece pequeno', ir='ts_c9_dividir',
   efeitos=dict(flag='b_confessou_duvida', vinculo=2),
   resultado="""— O plano parece pequeno — você diz, e a frase, antes de sair, parecia impossível. — Pela primeira vez. — Matteo pousa o lápis, devagar. *Eu sei*, diz. *Eu vi, desde o capítulo cinco.* Uma pausa. *Você sabe o que um bom orientador faz, quando vê um aluno em dúvida?* Você diz que não. *Ele não resolve. Ele pergunta: o que você quer, que o plano não previu?*"""),
  dict(id='mae', texto='Ligar para a sua mãe, do corredor, e contar a notícia da Sapienza, esperando a reação de sempre', ir='ts_c9_dividir',
   efeitos=dict(flag='b_ligou_mae_sapienza', abalo=1),
   resultado="""Você liga, do corredor, de pé, com o envelope na mão. A sua mãe, em Boston, atende com o bloco ao lado. *Pré-aprovada*, você diz. *Com bolsa.* *Excelente*, diz ela. *A condição é a média nove. Você manterá.* Não é uma pergunta. Você diz *sim*, e a palavra, que sempre saiu fácil, hoje fica, um momento, na garganta, como um osso pequeno."""),
 ])

NOS['ts_c9_dividir'] = dict(tipo='dividir', cap=9, lugar='Siena', hora='Quarta e quinta', cada=1,
 texto="""Faltam dois dias. A cidade, sob uma geada fina, tem a luz clara e dura de janeiro. As duas, sem combinar, fazem o mesmo: percorrem os lugares que viraram seus, como quem deixa um bilhete. A Piazza del Campo, a Via di Città, a biblioteca, a viela do arco de tijolos, o café da Piazza Salimbeni.

Em cada um, uma coisa ficou, e uma coisa vai levar.""",
 pergunta='O que você faz com os últimos dois dias?',
 acoes=[
  dict(id='lugares', texto='Visitar, uma a uma, as ruas e as praças, sem companhia, para se despedir de cada uma', efeitos=dict(flag='despediu_lugares', abalo=1),
   resultado="""Você percorre, sem companhia, a cidade inteira, parando em cada lugar que virou seu. Na Piazza del Campo, senta no chão de tijolos, de costas para a torre, e fica ali, sem fotografar. Na biblioteca, o bibliotecário de óculos ergue os olhos do jornal e, pela primeira vez em quatro meses, sorri. *Arrivederci*, diz. Você responde, em um italiano de ouvido: *a presto*."""),
  dict(id='juntas', texto='Convidar a outra pessoa para percorrer os lugares, juntas, uma última vez', efeitos=dict(flag='despediram_juntas', vinculo=2),
   resultado="""Vocês percorrem juntas, devagar, sem plano, os lugares que viraram de vocês. Na Piazza del Campo, cada uma escolhe um tijolo, e eles ficam a poucos centímetros um do outro. Na Via di Città, passam diante da biblioteca, e o bibliotecário, de longe, levanta a mão. Na viela do arco, o gato cinza, deitado num degrau, abre um olho e volta a dormir, como se soubesse."""),
  dict(id='trabalhar', texto='Passar os dois dias arrumando, empacotando, riscando itens da lista, para não pensar', efeitos=dict(flag='arrumou_tudo', abalo=1),
   resultado="""Você enche caixas, fecha malas, risca itens da lista, cola etiquetas, e a lista, que era de quarenta linhas, vira, em dois dias, de nenhuma. O apartamento, de teto de madeira, vai ficando vazio, e vazio, descobre, é uma coisa que tem barulho. Cada caixa fechada é um som de porta."""),
 ],
 desfecho="""Na quinta à noite, a cozinha da Casa Bianchini tem uma única cadeira, uma única tigela, uma única vela, e uma pessoa que, de repente, entende a que ponto sempre foram duas.""",
 ir='ts_c9_dialogo')

NOS['ts_c9_dialogo'] = dict(tipo='dialogo', cap=9, lugar='Cozinha, Casa Bianchini', hora='Quinta · 22h00', comeca='A',
 texto="""A signora Ottavia, no andar de baixo, deixou na porta uma travessa de biscoitos de amêndoa e um bilhete, em italiano, que as duas, a esta altura, já entendem inteiro: *Voltem. A casa espera.* A cozinha, de caixas empilhadas, cheira a amêndoa e a papelão.

Todas as coisas que as duas tinham a dizer estão, de algum modo, na mesa, entre duas xícaras vazias. E as duas, por teimosia, por medo, ou por amor, escolhem não pegá-las.""",
 turnos=[
  dict(prompt='A primeira frase é sua.', opcoes=[
    op('seco', 's0_a_seco', '— Eu volto para Los Angeles na sexta. Seis da manhã. Voo direto.', se='eu:A'),
    op('abre', 's0_a_abre', '— Eu tenho uma coisa para te contar. Mas eu não sei como. Eu nunca soube contar coisas sérias.', se='eu:A', ef=dict(vinculo=1)),
    op('flerte', 's0_a_flerte', '— Os biscoitos da signora são o único motivo pelo qual eu aguento dizer tchau.', se='eu:A'),
    op('seco', 's0_b_seco', '— Eu volto para Boston no sábado. Preciso entregar o capítulo final até maio.', se='eu:B'),
    op('abre', 's0_b_abre', '— Eu sei que você foi aprovad{{A.o_a}}. Em Roma. Eu vi, no trem, e eu fingi que não vi.', se='eu:B', ef=dict(vinculo=1)),
    op('cuida', 's0_b_cuida', '(Empurrar a travessa de biscoitos, devagar, para o lado da outra pessoa.)', se='eu:B', acao=True),
  ]),
  dict(prompt='Agora você responde.', opcoes=[
    op('seco', 's1_b_seco', '— Foi uma ótima experiência. Eu agradeço. Sinceramente.', se='eu:B'),
    op('fere', 's1_b_fere', '— A gente combinou que nada precisava ser decidido até o fim do mês. O mês acabou.', se='eu:B', ef=dict(abalo=1)),
    op('abre', 's1_b_abre', '— Eu não sei dizer o que eu quero. Pela primeira vez, eu não sei.', se='eu:B', ef=dict(vinculo=2)),
    op('seco', 's1_a_seco', '— Foi uma ótima experiência. Eu também agradeço. Muito.', se='eu:A'),
    op('fere', 's1_a_fere', '— Você sabia e não falou. Eu fiquei esperando que você falasse.', se='eu:A', ef=dict(abalo=1)),
    op('abre', 's1_a_abre', '— Eu não quero que isso acabe. Eu não sei como não acabar.', se='eu:A', ef=dict(vinculo=2)),
  ]),
  dict(prompt='A conversa é sua de novo.', opcoes=[
    op('abre', 's2_a_abre', '— Se eu aceitar Roma, a gente se vê? Se eu não aceitar, a gente se vê? Eu preciso saber.', se='eu:A', ef=dict(vinculo=1)),
    op('seco', 's2_a_seco', '— Tá. Tudo bem. Foi bom. A gente fica amigas. É a coisa mais madura.', se='eu:A'),
    op('fere', 's2_a_fere', '— Você sempre faz isso. Quando a coisa fica grande, você organiza.', se='eu:A', ef=dict(abalo=1)),
    op('abre', 's2_b_abre', '— Se eu pudesse escolher, eu escolheria ficar aqui. Mas eu não sei como se escolhe.', se='eu:B', ef=dict(vinculo=2)),
    op('seco', 's2_b_seco', '— Tudo bem. Foi bom. A gente fica amigas. É a coisa mais sensata.', se='eu:B'),
    op('fere', 's2_b_fere', '— E você sempre foge antes de a coisa ficar séria. Eu aprendi com você.', se='eu:B', ef=dict(abalo=1)),
  ]),
  dict(prompt='A última palavra da cozinha é sua.', opcoes=[
    op('abre', 's3_b_abre', '— Eu preciso de uma noite. Para pensar. Eu prometo que amanhã eu te digo.', se='eu:B', ef=dict(vinculo=1)),
    op('seco', 's3_b_seco', '— Boa noite. Amanhã, sete da manhã, o banheiro é meu.', se='eu:B'),
    op('cuida', 's3_b_cuida', '(Levantar, pôr a mão, de leve, no ombro da outra pessoa, e sair.)', se='eu:B', acao=True),
    op('abre', 's3_a_abre', '— Eu preciso de uma noite também. Mas eu não vou fugir. Eu volto.', se='eu:A', ef=dict(vinculo=1)),
    op('seco', 's3_a_seco', '— Boa noite. Amanhã, às seis, eu levo as caixas para a porta.', se='eu:A'),
    op('flerte', 's3_a_flerte', '(Dar um último gole na xícara vazia e sorrir, sem alegria, para a outra pessoa.)', se='eu:A', acao=True),
  ]),
 ],
 pool=[
  op('cuida', 'pl_cuida', '(Servir, em silêncio, a última xícara de chá, e empurrá-la para o meio da mesa.)', acao=True),
  op('seco', 'pl_seco', '(Olhar a lista, na porta, que não tem mais nenhuma linha, e baixar os olhos.)', acao=True),
  op('flerte', 'pl_flerte', '(Deixar o joelho, por baixo da mesa, tocar o da outra pessoa, e não recuar.)', acao=True),
  op('abre', 'pl_abre', '— Eu não sei dizer isso direito. Mas é verdade.'),
  op('fere', 'pl_fere', '(Cruzar os braços sobre a mesa, e esperar que a outra pessoa recue.)', acao=True),
 ],
 fecho="""Lá embaixo, a signora Ottavia bate com o cabo da vassoura no teto, uma vez, curta, que quer dizer, em qualquer língua, *vão dormir*. As duas olham para cima, e nenhuma ri.""",
 ir='ts_c9_decisao')

NOS['ts_c9_decisao'] = dict(tipo='decisao', cap=9, lugar='Quarto, Casa Bianchini', hora='Quinta · 23h30',
 texto="""A última noite em Siena tem a cama de ferro, a colcha branca, a luminária de papel e duas pessoas, de pé, uma de cada lado, que dormiram, ali, mais de cem vezes, e que, hoje, não sabem como se deitar.

{{se flag:noite_florenca}}Todas as noites desde Florença foram uma só. {{/se}}{{se !flag:noite_florenca}}Todas as noites desde Florença foram de mãos entrelaçadas. {{/se}}Ninguém quer ser a primeira a dizer a coisa que sabe.""",
 pergunta='Como as duas passam a última noite?',
 ir={'A': 'ts_c9_noite_a', 'B': 'ts_c9_noite_b'},
 acoes=[
  dict(id='juntas', texto='Dormir juntas, como sempre, sem dizer nada, e deixar a noite fazer o resto', efeitos=dict(flag='ultima_noite_juntas', vinculo=2),
   resultado="""Vocês se deitam, na cama de ferro, uma ao lado da outra, de olhos abertos, de mãos dadas por cima da colcha. Ninguém diz nada. A luz da luminária apaga, e, no escuro, uma respiração procura a outra, e as duas, sem combinar, acertam o compasso."""),
  dict(id='separadas', texto='Cada uma dorme do seu lado, sem tocar, para não tornar a despedida mais difícil', efeitos=dict(flag='ultima_noite_separadas', abalo=1),
   resultado="""Vocês se deitam, cada uma na sua metade, de costas. O travesseiro, que durante meses mudou de lugar, está, hoje, no meio, outra vez. Ninguém comenta. A noite é a mais longa do semestre, e a respiração, de um lado e do outro, finge um ritmo que não é."""),
  dict(id='conversar', texto='Ficar acordadas, na cama, conversando baixinho, sobre tudo menos sobre amanhã', efeitos=dict(flag='ultima_noite_conversa', vinculo=2),
   resultado="""Vocês ficam acordadas. Falam de tudo: da primeira noite, da torta de ricota, da mancha de vinho em forma de ilha, do guarda-chuva, do arco de tijolos, de uma Virgem que recua. Riem baixinho, para não acordar a signora Ottavia. Às quatro, ninguém mais fala, e uma das duas, sem querer, adormece com a mão no cabelo da outra."""),
 ])

NOS['ts_c9_noite_a'] = dict(tipo='solo', cap=9, seat='A', lugar='Quarto, Casa Bianchini', hora='Sexta · 04h30',
 texto="""Às quatro e meia da madrugada, de sexta, com o apartamento em silêncio e uma pessoa que dorme a vinte centímetros, você, de olhos abertos, tem os dois futuros, o de Los Angeles e o de Roma, lado a lado, como duas passagens. O voo, de Fiumicino, é às seis. O trem, de Siena para Roma, é às cinco e dez.

Você sempre achou que as grandes decisões se tomam com barulho: uma festa, uma briga, uma mensagem em letras maiúsculas. Mas esta, descobre, é de uma quietude tão grande que você pode ouvir o relógio de mesa, na cômoda, marcando, em verde, 04:31.

A mala, pronta, na porta. O bilhete de trem, no bolso do casaco. O e-mail de Roma, ainda aberto, no celular. E uma coisa, na ponta da língua, que você ainda não sabe se é um pedido ou uma despedida.""",
 acoes=[
  dict(id='bilhete', texto='Deixar um bilhete na mesa da cozinha, curto, antes de pegar o trem, dizendo onde vai', ir='ts_c9_fim',
   efeitos=dict(flag='a_deixou_bilhete', vinculo=2),
   resultado="""Você escreve, na letra rápida e inclinada de sempre, um bilhete de quatro linhas: *Fui para Roma. O estágio é na Maison Ferretti, perto da Piazza di Spagna. Eu ainda não decidi nada. Mas eu quero que você saiba onde eu estou.* Deixa o papel na mesa, sob a vela. Antes de sair, olha a pessoa que dorme, e a sua boca, sem som, diz o nome."""),
  dict(id='acordar', texto='Acordar a outra pessoa, devagar, e dizer a verdade: que vai a Roma, e que está com medo', ir='ts_c9_fim',
   efeitos=dict(flag='a_acordou_b', vinculo=2),
   resultado="""Você toca, de leve, o ombro. A pessoa abre os olhos, sem susto, como quem esperava. *Eu vou a Roma*, você diz, baixo. *Eu não sei se volto. Eu estou com medo.* Um segundo. A mão, no lençol, encontra a sua, e a aperta, uma vez, forte. *Eu sei*, diz a voz, rouca de sono. *Eu também.* Nenhuma das duas diz mais nada."""),
  dict(id='sair', texto='Pegar a mala em silêncio, sair sem dizer nada, e fechar a porta com cuidado', ir='ts_c9_fim',
   efeitos=dict(flag='a_saiu_calada', abalo=2),
   resultado="""Você pega a mala, o casaco e a chave, e sai, sem som, passando pela cozinha. A porta verde, do número quatro, fecha atrás de você com um estalo discreto. No vicolo, o gato cinza, deitado, abre um olho e fecha. Você anda até a Porta Camollia, a pé, com o frio no rosto e o nome de uma pessoa na boca, sem som."""),
 ])

NOS['ts_c9_noite_b'] = dict(tipo='solo', cap=9, seat='B', lugar='Quarto, Casa Bianchini', hora='Sexta · 04h30',
 texto="""Às quatro e meia da madrugada, de sexta, você, de olhos abertos, olha o teto de madeira, onde a luz de um poste desenha uma faixa fina. A pessoa a seu lado, deitada, respira devagar, e você, que sempre soube a hora exata, o minuto exato e a tarefa exata, não sabe o que fazer com as próximas horas.

Você pensa na carta da Sapienza, na média nove, no capítulo final, na sua mãe, no escritório de Matteo, em uma frase dele: *o que você quer, que o plano não previu?* Pensa, e a resposta, que sempre demorou semanas, hoje vem em um segundo, inteira, de um tamanho que assusta.

Você nunca quebrou uma rotina em vinte e dois anos. Nunca perdeu uma aula, nunca atrasou uma entrega, nunca disse *não* a um plano. E, a vinte centímetros, deitada, existe uma pessoa que, em quatro meses, quebrou todas.""",
 acoes=[
  dict(id='fichas', texto='Acender o abajur, pegar uma ficha em branco e escrever, em letra firme, a decisão que acabou de tomar', ir='ts_c9_fim',
   efeitos=dict(flag='b_escreveu_decisao', vinculo=2),
   resultado="""Você acende o abajur, baixo, pega uma ficha e escreve, na letra firme de sempre: *1. Pedir transferência. 2. Roma.* E, embaixo, em letra menor, que você nunca usa: *3. {{A.Ele_ela}}.* Você olha a ficha por um minuto inteiro. Depois a dobra e a guarda no bolso do casaco, onde as coisas importantes, a partir de hoje, vão ficar."""),
  dict(id='esperar', texto='Esperar o amanhecer, em silêncio, sem tomar nenhuma decisão, e deixar a manhã dizer', ir='ts_c9_fim',
   efeitos=dict(flag='b_esperou_manha', abalo=1),
   resultado="""Você não faz nada. Fica, de olhos abertos, até a persiana ganhar, em cima, uma linha cinza, e, depois, rosada. A pessoa a seu lado se mexe, um pouco, e você, sem decidir, fecha os olhos. Quando os abre, o sol está alto, e uma coisa, na cama, falta."""),
  dict(id='tocar', texto='Virar-se, devagar, e olhar a pessoa que dorme, sem tocar, por todo o tempo que puder', ir='ts_c9_fim',
   efeitos=dict(flag='b_olhou_dormir', vinculo=2),
   resultado="""Você vira o rosto no travesseiro. A pessoa que dorme tem a boca entreaberta, o cabelo caído sobre a testa e uma mão fechada, perto do queixo, como quem guarda um segredo. Você olha, sem tocar, durante mais de uma hora. É a coisa mais longa que fez sem ler uma palavra, e a mais clara."""),
 ])

NOS['ts_c9_fim'] = dict(tipo='fim', cap=9, lugar='Casa Bianchini, Siena', hora='Sexta · 07h30',
 texto="""Às sete e meia da manhã de sexta, em Siena, o sol, baixo, desenha na persiana listras de ouro. {{se flag:a_deixou_bilhete}}Na mesa da cozinha, sob uma vela curta, um bilhete de quatro linhas espera, escrito em letra rápida e inclinada. {{/se}}{{se flag:a_acordou_b}}Na cama de ferro, uma mão ainda guarda a pressão de outra, de uma última vez, no escuro. {{/se}}{{se flag:a_saiu_calada}}No degrau do vicolo, um gato cinza olha a rua vazia. {{/se}}{{se flag:ultima_noite_juntas}}O lençol ainda tem a forma de duas pessoas. {{/se}}{{se flag:ultima_noite_separadas}}O travesseiro do meio ainda está no meio. {{/se}}{{se flag:ultima_noite_conversa}}Uma risada, de madrugada, ainda não terminou de ecoar. {{/se}}{{se flag:b_escreveu_decisao}}No bolso de um casaco, uma ficha dobrada tem três linhas. {{/se}}

As malas, as caixas, a fita crepe do armário, o colchonete azul, a moeda de dois euros: tudo, no apartamento do terceiro andar, está em ordem, como numa foto de catálogo. Só a cama, de ferro, de colcha branca, com os dois travesseiros, ainda tem um calor.

Em uma das duas mãos, um bilhete de trem para Roma. Na outra, ou na mesma, um celular onde uma mensagem de duas linhas, enviada às seis e quarenta, de um número que não é de nenhum dos dois, diz, em italiano, em letra maiúscula, e que a signora Ottavia ditou ao neto: *NON PARTITE. LA CASA ASPETTA.* Não partam. A casa espera.""",
 gancho="Uma mala pronta, um bilhete para Roma e uma mensagem em italiano: não partam.",
 ir='ts_c10_trem')
