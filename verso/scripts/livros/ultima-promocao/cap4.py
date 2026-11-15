# A Última Promoção · Capítulo 4 · As apresentações
NOS = {}

def op(tom, tag, texto, se=None, ef=None, acao=False):
    d = dict(tom=tom, tag=tag, texto=texto)
    if se: d['se'] = se
    if ef: d['efeitos'] = ef
    if acao: d['acao'] = True
    return d

NOS['up_c4_apresentacao'] = dict(tipo='segue', cap=4, lugar='Salão Strauss, Hofburg Congress Center, Viena', hora='Sábado · 08h40', npcs=['marcus'],
 ir={'A': 'up_c4_a', 'B': 'up_c4_b'},
 texto="""O Salão Strauss é um teatro de seiscentos lugares com lustres de cristal, camarotes dourados e um palco em que Johann Strauss regeu a própria valsa em 1867, dizem, e em que hoje, numa manhã de sábado de março, um técnico de colete preto conecta um único projetor a um único notebook, com a expressão de quem sabe que isso vai dar errado.

Quatrocentas e dezoito pessoas, de oitenta e um países, ocupam a plateia com café nas mãos e crachás de plástico no peito. Na primeira fila, de terno cinza-chumbo, o sorriso de comercial de seguro de vida aberto como uma persiana, está Marcus Webb.

— Hoje — diz ele ao microfone, e o *hoje* ecoa — temos o privilégio de ouvir duas abordagens para a operação regional do futuro. Uma baseada em dados. A outra, em relacionamentos. — Ele faz uma pausa de quem escreveu a pausa. — Que vença o melhor.

Duas cadeiras estão no palco, uma de cada lado do projetor. Há um relógio digital, de contagem regressiva, dentro de cada podium. Cada um dos dois tem vinte minutos.""")

NOS['up_c4_a'] = dict(tipo='solo', cap=4, seat='A', lugar='Bastidores do Salão Strauss', hora='Sábado · 08h45', npcs=['priya'],
 texto="""Nos bastidores, uma cortina de veludo vermelho, um espelho de camarim com lâmpadas redondas, um frigobar com água sem gás e a pior luz fluorescente da Áustria. Você conferiu os slides onze vezes. Cada um tem um número, um gráfico, uma conclusão. Nenhum tem um adjetivo.

Priya Patel, de crachá da Meridian e laptop contra o peito, aparece atrás de você, de olhos no chão, e fala em um volume que dá a impressão de que a frase não existe. *O Marcus mudou a lista de candidatos duas vezes. A primeira tinha só um nome.* Ela mexe nos fones de ouvido como quem precisa de ocupar as mãos. *O segundo foi adicionado na semana passada.*

A pergunta que fica no ar é de quem era o primeiro nome. A resposta vem sem rosto, antes que alguém a faça: *O seu. Então eu pensei que você devia saber.*""",
 acoes=[
  dict(id='agradecer', texto='Agradecer à Priya, em voz baixa, e perguntar o que mais ela sabe', ir='up_c4_apresentar',
   efeitos=dict(flag='a_agradeceu_priya', vinculo=1),
   resultado="""Você agradece, com uma frase que sai menos formal do que o seu costume. Priya olha para cima pela primeira vez em dias. Ela diz que não sabe mais nada, que só vê o que passa pela impressora, e que a impressora do 41º andar imprime, às vezes, coisas que não deviam sair. Depois sai, com a pressa de quem deixou o fogão ligado."""),
  dict(id='ensaiar', texto='Voltar ao espelho e ensaiar a abertura mais uma vez, ignorando o aviso', ir='up_c4_apresentar',
   efeitos=dict(flag='a_ensaiou'),
   resultado="""Você volta ao espelho e repete as três primeiras frases, em voz baixa, com a pontuação. Priya fica um instante parada, depois some pela cortina. Você sabe que ignorou uma informação importante. Sabe também que, sem ensaiar, não consegue entrar no palco."""),
  dict(id='mudar', texto='Mudar o slide de abertura: em vez do gráfico, uma frase sobre o cliente', ir='up_c4_apresentar',
   efeitos=dict(flag='a_mudou_slide', abalo=1),
   resultado="""Você apaga o gráfico de abertura, o que você conferiu onze vezes, e escreve no lugar uma frase: *Em 2019, um cliente me ligou às 23h porque o caminhão dele quebrou. Eu atendi.* Nunca contou isso em uma apresentação. As mãos estão frias, e você sabe que o instinto, uma vez na vida, está falando mais alto que o gráfico."""),
 ])

NOS['up_c4_b'] = dict(tipo='solo', cap=4, seat='B', lugar='Bastidores do Salão Strauss', hora='Sábado · 08h45',
 texto="""Atrás da cortina, com a gravata endireitada três vezes e um cartão de anotações na mão, você olha para o relógio digital do podium. Vinte minutos. Você tem uma apresentação de trinta e oito slides, escrita na madrugada, e nenhum deles é um gráfico. Os seus slides são fotos: de motoristas, de armazéns, de uma doca de carga em Gary, Indiana, às quatro da manhã.

O seu telefone vibra: Chloe, em Chicago, de madrugada. *Sorte. Respira. E lembra: você não é o filho do dono. Você é a pessoa que sabe o nome de cada motorista. Vai lá.*

Você relê a mensagem. Depois, sem saber por quê, relê de novo.""",
 acoes=[
  dict(id='respirar', texto='Respirar fundo, guardar o cartão no bolso e entrar de mãos vazias', ir='up_c4_apresentar',
   efeitos=dict(flag='b_sem_cartao', vinculo=1),
   resultado="""Você dobra o cartão, o põe no bolso e entra no palco de mãos vazias. É o oposto de tudo o que você aprendeu na faculdade e a única coisa que você sabe fazer: falar de gente como quem fala de família. Se errar, erra falando de coisas que conhece."""),
  dict(id='ligar_pai', texto='Ligar para o pai um minuto, só para ouvir a voz dele antes de entrar', ir='up_c4_apresentar',
   efeitos=dict(flag='b_ligou_pai', vinculo=1),
   resultado="""Você liga. O seu pai atende no terceiro toque, de roupão, com um cachorro latindo atrás. *Vai lá*, ele diz. *E fala do Walter. Do motorista que carregou o seu avô nos ombros em 1989. Eles vão entender.* A ligação dura quarenta segundos. Quando você entra no palco, o nome do Walter está na ponta da língua."""),
  dict(id='slides', texto='Mudar a ordem dos slides: começar pela doca de Gary, às quatro da manhã', ir='up_c4_apresentar',
   efeitos=dict(flag='b_mudou_ordem', abalo=1),
   resultado="""Você reordena os slides com a ponta dos dedos, de pé, no escuro dos bastidores: a doca de Gary primeiro, a foto de um motorista de cinquenta e oito anos, de colete refletivo, sorrindo com um dente de ouro. É o slide mais honesto da apresentação, e o menos corporativo. Você o coloca no começo, porque o começo é o que ninguém esquece."""),
 ])

NOS['up_c4_apresentar'] = dict(tipo='dividir', cap=4, lugar='Palco do Salão Strauss', hora='Sábado · 09h05', cada=1,
 texto="""O técnico de colete preto levanta o polegar. As luzes da plateia caem. Marcus Webb, de pé, aponta com a palma para o palco, como quem apresenta um prato. Os dois sobem, cada um de um lado, com o relógio digital em contagem regressiva e quatrocentos olhares sobre eles.

Quem fala primeiro? A moeda, jogada pelo Marcus, cai em *coroa*.""",
 pergunta='Como você apresenta?',
 acoes=[
  dict(id='dados', texto='Apresentar com dados duros: gráficos, números e a conclusão, sem adjetivos', efeitos=dict(flag='apresentou_dados'),
   resultado="""Você fala com a voz firme e plana de quem não precisa de volume. Cada slide tem um número, cada número tem uma fonte, cada fonte tem uma data. Em vinte minutos, a plateia aprende que a distribuição regional do Meio-Oeste tem uma ineficiência de onze por cento, e que um corte de duas rotas resolve. Não há uma piada. Há, ao final, um silêncio respeitoso e um aplauso de quem acabou de ser convencido."""),
  dict(id='historia', texto='Apresentar com histórias: o motorista, o cliente, a doca de Gary às quatro da manhã', efeitos=dict(flag='apresentou_historias', vinculo=1),
   resultado="""Você fala de um homem chamado Walter, de colete refletivo, que em 1989 carregou um dono de empresa nos ombros e em 2019 ensinou o neto desse dono a dirigir um caminhão de quarenta toneladas. A plateia, que veio ouvir um relatório, ouve uma história. Quando a sua voz embarga, de leve, no meio da frase sobre o dente de ouro, quatrocentas pessoas prendem a respiração. O aplauso é demorado."""),
  dict(id='misto', texto='Apresentar misturando os dois: um número, uma história, um número', efeitos=dict(flag='apresentou_misto', vinculo=1),
   resultado="""Você alterna: um gráfico, uma frase sobre uma pessoa; uma tabela, o nome de um cliente. É um truque que você aprendeu observando a outra pessoa no ensaio, sem querer. Funciona: o gráfico ganha rosto e o rosto ganha prova. Em vinte minutos, a plateia aplaude duas coisas que acredita serem uma só."""),
 ],
 desfecho="""Quando as luzes voltam, às 10h07, os dois estão de pé nos dois lados do palco, no meio de aplausos que parecem pertencer a um dos dois e pertencem a ambos. Em algum lugar entre a quarta e a quinta fila, um homem de camisa branca faz sinal para o técnico: o projetor falhou.""",
 ir='up_c4_decisao')

NOS['up_c4_decisao'] = dict(tipo='decisao', cap=4, lugar='Palco do Salão Strauss', hora='Sábado · 10h10',
 texto="""No meio da sessão de perguntas e respostas, o projetor trava com um estalo, a tela fica azul e um zumbido de ventilador cobre a voz da moderadora. Quatrocentos olhares se voltam, de novo, para o palco. Há uma pergunta de um delegado coreano que precisa de um gráfico, e só um notebook funciona.

Um dos dois tem o arquivo certo, no laptop certo. E o outro, a quem essa falha não custa nada, pode escolher.""",
 pergunta='O que vocês fazem com o projetor?',
 ir={'A': 'up_c4_corredor_a', 'B': 'up_c4_corredor_b'},
 acoes=[
  dict(id='ajudar', texto='Ajudar: conectar o laptop de quem apresentou antes, para resolver a pergunta', efeitos=dict(flag='ajudou_projetor', vinculo=2),
   resultado="""Vocês trocam um olhar de dois segundos, o suficiente para decidir. Um dos dois estende o laptop, o outro conecta o cabo, e o gráfico certo aparece na tela, a tempo da pergunta do delegado coreano. A plateia aplaude, e nenhum dos dois sabe se aplaude a solução ou a cooperação. Em primeira fila, Marcus Webb não sorri."""),
  dict(id='deixar', texto='Deixar o outro se virar: socorrer o rival não é obrigação', efeitos=dict(flag='deixou_projetor', abalo=1),
   resultado="""Nenhum dos dois se mexe. O técnico corre, tenta o cabo, reinicia o notebook. A pergunta do delegado coreano fica sem resposta por três minutos desconfortáveis. Alguém tosse. Alguém olha o relógio. Você sente, pela primeira vez, que ganhar não é a mesma coisa que ter razão."""),
  dict(id='dividir', texto='Dividir a solução: um conecta, o outro responde, e os dois dividem o crédito', efeitos=dict(flag='dividiu_projetor', vinculo=2),
   resultado="""Um conecta o cabo, o outro responde à pergunta em voz alta, e o gráfico aparece na tela no segundo exato em que a frase termina. A plateia ri, de alívio, e aplaude, de admiração. É um número de dupla que ninguém ensaiou. Marcus Webb, na primeira fila, tem o primeiro tique de uma sobrancelha."""),
 ])

NOS['up_c4_corredor_a'] = dict(tipo='solo', cap=4, seat='A', lugar='Corredor do Congress Center', hora='Sábado · 12h30',
 texto="""Você sai do Salão Strauss às 12h30 com o cartão do crachá apertado entre dois dedos. O corredor do Congress Center é largo, de mármore claro, com bancos de couro onde dezenas de executivos conferem o celular com a expressão de quem espera uma ressurreição. Você pega um café de máquina e senta num banco vazio.

Ninguém nunca tinha olhado para um slide seu e chorado. Hoje, na quarta fileira, uma mulher de blazer vermelho passou o lenço no rosto durante a história do Walter, que não era sua. A história do Walter fez a sala inteira lembrar de alguém. Você tem uma planilha para cada coisa da sua vida, e nunca soube que isso era possível.""",
 acoes=[
  dict(id='admitir', texto='Admitir para si mesma que o outro apresentou melhor do que você', ir='up_c4_fim',
   efeitos=dict(flag='a_admitiu', vinculo=1),
   resultado="""Você admite, sozinha, em voz baixa, com a boca encostada no copo de papel: *foi melhor.* A palavra pesa dois quilos. Mas, depois que sai, o peso some, e fica uma leveza esquisita no peito, a de quem encontrou uma coisa que procurava sem saber."""),
  dict(id='negar', texto='Repetir a si mesma que a vaga é dela e que dados vencem histórias', ir='up_c4_fim',
   efeitos=dict(flag='a_negou', abalo=1),
   resultado="""Você repete a frase, em voz baixa: *dados vencem histórias. Dados vencem histórias.* Na terceira vez, ela soa como uma oração. Você toma o café, frio, e olha o relógio. Falta uma hora para o almoço, e o rosto da mulher de blazer vermelho continua na sua cabeça, sem permissão."""),
  dict(id='ligar_nina', texto='Ligar para a Nina e contar, pela primeira vez, que você gostou de ouvir o rival', ir='up_c4_fim',
   efeitos=dict(flag='a_ligou_nina', vinculo=1),
   resultado="""Você liga. A Nina atende com um bebê gritando ao fundo e a voz de quem faz três coisas ao mesmo tempo. Você diz: *ele é bom.* Do outro lado, um silêncio de dois segundos, e depois uma risada de quem esperava a vida inteira essa frase. *Finalmente*, ela diz, *alguém que te impressiona.*"""),
 ])

NOS['up_c4_corredor_b'] = dict(tipo='solo', cap=4, seat='B', lugar='Corredor do Congress Center', hora='Sábado · 12h30', npcs=['frank'],
 texto="""Você sai do Salão Strauss com o coração batendo no ritmo de uma banda de marcha. O corredor, de mármore claro, tem uma fila de executivos que passam e acenam e dizem *great presentation* com a boca e *quem é você* com os olhos.

O celular vibra. É um número de Indiana, que você conhece de cor. Frank Delaney, sessenta anos, cliente da Tillman & Sons desde 1996, dono de três centros de distribuição em Gary, com a voz arenosa de quem fuma há quarenta anos e nunca admite.

— Eu estou vendo uma transmissão no computador da minha filha — diz ele, sem dizer oi. — Aquele é o Walter, no slide? O Walter com o dente de ouro?""",
 acoes=[
  dict(id='confirmar', texto='Confirmar: sim, é o Walter, e ele continua na estrada', ir='up_c4_fim',
   efeitos=dict(flag='b_falou_frank', vinculo=1),
   resultado="""— É o Walter — você diz. — Continua dirigindo. Fez sessenta anos em fevereiro. — Do outro lado, Frank Delaney faz um som que não é riso nem choro. *Vocês vendem a empresa e levam o Walter para uma conferência em Viena*, ele diz. *Esse é o Tillman que eu conheço.* A frase, dita de um modo estranho, é o melhor elogio do dia."""),
  dict(id='perguntar', texto='Perguntar ao Frank se ele ouviu falar de alguma coisa estranha na Meridian', ir='up_c4_fim',
   efeitos=dict(flag='b_perguntou_frank', abalo=1),
   resultado="""— Frank, você ouviu alguma coisa sobre a Meridian? — A linha fica silenciosa por três segundos. *Ouvi*, ele diz, devagar. *Mas é uma conversa de pessoa, não de telefone. Volta para Chicago. A gente toma um café.* Você sente um frio que não tem nada a ver com o ar-condicionado do corredor."""),
  dict(id='desligar', texto='Agradecer e desligar: tem trezentas pessoas esperando para falar com você', ir='up_c4_fim',
   efeitos=dict(flag='b_desligou_frank'),
   resultado="""Você agradece, com a gentileza de quem está com pressa, e desliga. Do outro lado do corredor, um grupo de executivos coreanos espera com cartões de visita. Você passa os próximos quarenta minutos apertando mãos e sorrindo, e só mais tarde, no elevador, percebe que a voz de Frank Delaney soava como alguém que queria contar uma coisa."""),
 ])

NOS['up_c4_fim'] = dict(tipo='fim', cap=4, lugar='Palácio Auersperg, Viena', hora='Sábado · 21h00', npcs=['marcus'],
 texto="""O jantar de gala do congresso é no Palácio Auersperg, um salão barroco de colunas douradas, mesas de vinte lugares e garçons de luvas brancas que servem um consomé de rabo de boi como se fosse um segredo de Estado. {{se flag:apresentou_dados}}A apresentação de dados rendeu um brinde de um delegado sueco. {{/se}}{{se flag:apresentou_historias}}A história do Walter rendeu uma conversa de vinte minutos com a mulher de blazer vermelho, que se descobriu ser diretora de uma rede de varejo em Seul. {{/se}}{{se flag:apresentou_misto}}A mistura de gráfico e rosto rendeu três cartões de visita. {{/se}}{{se flag:ajudou_projetor}}E a cooperação no projetor rendeu a Marcus Webb a primeira ruga de contrariedade da semana. {{/se}}{{se flag:deixou_projetor}}O projetor travado rendeu uma pergunta que ninguém respondeu, e um silêncio que alguém contou. {{/se}}{{se flag:dividiu_projetor}}O número da dupla no projetor virou assunto de quatro mesas. {{/se}}

Às nove e quarenta, entre o consomé e o vitello tonnato, Marcus Webb se levanta, bate com a colher numa taça de cristal e esvazia a sala com o sorriso.

— Quero fazer um brinde — diz ele. — A esta semana, a esta casa e ao futuro da Meridian no Meio-Oeste. E a nossa nova diretora regional, que, em breve, vocês conhecerão.

Quatrocentas taças sobem. Ele disse *diretora*. Não disse o nome. Em duas cadeiras da mesa 14, duas pessoas de taça na mão trocam um olhar, e cada uma, em silêncio, faz a mesma conta: a palavra *diretora* é feminina, e o cargo, até onde se sabe, ainda é de um dos dois.""",
 gancho="O chefe brindou à 'nova diretora regional' sem dizer o nome, e nenhum dos dois sabe de quem ele fala.",
 ir='up_c5_mesa')
