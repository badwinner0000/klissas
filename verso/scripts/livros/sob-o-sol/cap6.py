# Sob o Sol da Toscana · Capítulo 6 · O Medo
NOS = {}

def op(tom, tag, texto, se=None, ef=None, acao=False):
    d = dict(tom=tom, tag=tag, texto=texto)
    if se: d['se'] = se
    if ef: d['efeitos'] = ef
    if acao: d['acao'] = True
    return d

NOS['ts_c6_manha'] = dict(tipo='segue', cap=6, lugar='Casa Bianchini, Siena', hora='Domingo · 09h40',
 ir={'A': 'ts_c6_a', 'B': 'ts_c6_b'},
 texto="""{{se flag:beijo_rua}}O que aconteceu debaixo do arco não tem nome em nenhuma das línguas que as duas falam. É uma coisa de um minuto, de uma boca e de uma mão, de um gato que abriu um olho, e que, de manhã, com a luz da persiana desenhando listras no teto, parece, para uma delas, uma promessa, e, para a outra, uma sentença.{{senao}}O que não aconteceu debaixo do arco ocupa o apartamento inteiro. Está na cama, no travesseiro, na cozinha, no banheiro, nas duas xícaras sobre a mesa dobrável, como um móvel pesado que ninguém sabe onde pôr.{{/se}}

Em Siena, às nove e quarenta de domingo, o sol já está alto, e os sinos, de torre em torre, passam a notícia de que o mundo continua. Na cozinha, o café, que ninguém preparou, tem o cheiro de uma ausência. {{se flag:voltaram_andando}}As botas molhadas, à porta, secaram em duas poças. {{/se}}{{se flag:sentaram_fonte}}O cabelo, ainda úmido da garoa, ainda cheira a pedra. {{/se}}""")

NOS['ts_c6_a'] = dict(tipo='solo', cap=6, seat='A', lugar='Cozinha, Casa Bianchini', hora='Domingo · 09h50',
 texto="""Você sai do quarto, na ponta dos pés, com uma sensação no peito que não sabe nomear, e que é, ao mesmo tempo, o mais leve e o mais pesado que já sentiu. {{se flag:beijo_rua}}A boca ainda tem um gosto, de vinho e de chuva. As mãos ainda se lembram de um pescoço.{{senao}}As mãos ainda se lembram de uma distância de dois dedos.{{/se}}

Na cozinha, você liga a cafeteira. O barulho da água, na máquina, é o único som do apartamento. A cama, lá atrás, não faz barulho. A pessoa que dorme ali, ou finge, ou não dorme, não deu um sinal.

Você, que passou a vida inteira falando, descobre que não sabe começar uma frase. Sabe só o que não quer: que o silêncio, desta vez, seja uma fuga.""",
 acoes=[
  dict(id='esperar', texto='Preparar dois cafés e esperar, na mesa, sem tocar no celular, até a outra pessoa aparecer', ir='ts_c6_dividir',
   efeitos=dict(flag='a_esperou_cafe', vinculo=2),
   resultado="""Você serve dois cafés, com leite quente em um, açúcar no outro, e os põe na mesa dobrável, um de cada lado. Senta. Não pega o celular. Dez minutos, quinze, vinte. O café esfria. A porta do quarto, enfim, abre, e a pessoa que sai, vestida, de cabelo preso, olha as duas xícaras, e o seu rosto, e a mesa, e diz, com uma voz que não é a de ontem: *eu preciso sair.*"""),
  dict(id='sair', texto='Pegar o casaco e sair para a rua, sem café, antes que a outra pessoa acorde', ir='ts_c6_dividir',
   efeitos=dict(flag='a_saiu_antes', abalo=1),
   resultado="""Você veste o casaco, pega a chave de ferro e sai, descendo a escada de mármore, sem barulho, até a rua. O ar da manhã, frio e limpo, bate no rosto. Você anda, sem destino, até a Piazza del Campo, onde senta no chão de tijolos, de costas para a torre, e fica, olhando os pombos. É a primeira vez, em Siena, que você foge."""),
  dict(id='giulia', texto='Mandar uma mensagem para a Giulia: "Posso aparecer aí? Eu preciso conversar."', ir='ts_c6_dividir',
   efeitos=dict(flag='a_chamou_giulia', vinculo=1),
   resultado="""Você escreve: *Posso aparecer aí? Preciso conversar.* A resposta da Giulia chega em oito segundos, com um coração e uma frase: *Vem. Eu faço o café mais forte da Toscana.* Você veste o casaco, escreve um bilhete, *saí, volto à tarde*, e o deixa sobre a mesa. Pela primeira vez, é a sua mão que deixa um recado, e não a de outra pessoa."""),
 ])

NOS['ts_c6_b'] = dict(tipo='solo', cap=6, seat='B', lugar='Quarto, Casa Bianchini', hora='Domingo · 09h50',
 texto="""Você está sentad{{eu.o_a}} na cama, de costas para a cabeceira de ferro, de braços em volta dos joelhos, olhando a parede, desde as seis da manhã. A cabeça dói, de vinho. O coração dói de outra coisa. {{se flag:beijo_rua}}Na boca, o gosto de uma noite que você nunca imaginou. No pescoço, a lembrança de uma mão.{{senao}}Nos dedos, a lembrança de uma distância de dois dedos, que você, ontem, não venceu.{{/se}}

Você tem vinte e dois anos, um plano de vida, uma bolsa que exige média nove, um mestrado em Roma que depende de uma tese, e uma única certeza, que durou até ontem: a de que sabia o que queria.

Lá fora, o café, na cozinha, ferve. A pessoa que o prepara, e que você ouve cantarolar, baixinho, uma música que não sabe o nome, é a mesma que você, ontem à noite, quis tanto que doeu. E a única coisa que você consegue pensar é: *eu não sei o que fazer com isso.*""",
 acoes=[
  dict(id='sair', texto='Vestir-se rápido, pegar o fichário e sair, dizendo que tem trabalho na biblioteca', ir='ts_c6_dividir',
   efeitos=dict(flag='b_fugiu_biblioteca', abalo=2),
   resultado="""Você se veste em três minutos, pega o fichário e passa pela cozinha sem olhar para o lado. *Biblioteca*, diz, em voz de comunicado. *Volto à noite.* A porta do apartamento fecha com um estalo seco. Na escada de mármore, você apoia a testa na parede fria e respira, de olhos fechados, até que alguém, no andar de baixo, abre uma porta e fecha, devagar."""),
  dict(id='ficar', texto='Levantar, ir até a cozinha, e ficar de pé na porta, sem saber o que dizer', ir='ts_c6_dividir',
   efeitos=dict(flag='b_foi_cozinha', vinculo=1),
   resultado="""Você levanta, vai até a cozinha e fica de pé, na porta, de meia, com o cabelo desfeito. A pessoa, de costas, de pijama, mexe o café, com uma colher, devagar. Não se vira. *Bom dia*, diz. A sua boca abre, e nada sai. Ficam assim, um minuto, dois, com o barulho da colher contra a xícara, como um relógio."""),
  dict(id='mensagem', texto='Pegar o celular, abrir uma mensagem para a sua mãe, e ficar olhando o cursor', ir='ts_c6_dividir',
   efeitos=dict(flag='b_olhou_mae', abalo=1),
   resultado="""Você pega o celular e abre a conversa com a sua mãe. O cursor pisca no campo vazio. Você não sabe o que dizer. *Mãe, eu*, digita, e apaga. *Mãe, uma pessoa*, e apaga. A tela escurece, e a única coisa que o aparelho devolve é o seu rosto, branco, assustado, e a sensação, que você conhece desde os doze anos, de que está prestes a desapontar alguém."""),
 ])

NOS['ts_c6_dividir'] = dict(tipo='dividir', cap=6, lugar='Siena', hora='Segunda a quinta', cada=1,
 texto="""Os dias que se seguem têm a precisão de uma coreografia mal ensaiada. Na segunda, as duas se cruzam na cozinha, às seis e meia da manhã, e uma diz *oi*, com a voz um pouco alta demais, e a outra diz *oi*, com a voz um pouco baixa demais. Na terça, trocam duas frases sobre a apresentação. Na quarta, um *com licença* na porta do banheiro. Na quinta, nenhuma palavra.

O apartamento, que tinha um barulho a duas vozes, tem agora um barulho de duas ausências. A cama, de ferro, continua dividida, mas o travesseiro do meio voltou.""",
 pergunta='O que você faz com a distância?',
 acoes=[
  dict(id='trabalhar', texto='Mergulhar no trabalho: biblioteca, aula, estudo, para não ter tempo de pensar', efeitos=dict(flag='mergulhou_trabalho', abalo=1),
   resultado="""Você enche a agenda: biblioteca de manhã, aula à tarde, estudo de noite. A tabela de vinte e duas linhas, se existe, está cumprida até a linha dezenove. É uma defesa antiga, que funciona, em parte: você não pensa, mas dorme mal, e acorda às três, olhando o teto."""),
  dict(id='amigos', texto='Sair com os amigos, ir a jantares, a aperitivos, a qualquer lugar com barulho', efeitos=dict(flag='mergulhou_festas', abalo=1),
   resultado="""Você aceita todos os convites: aperitivo no Campo, jantar com a Giulia, uma noite de karaokê numa osteria, onde canta uma música de Los Angeles em italiano de ouvido. Ri alto. Cada risada é uma pedra no caminho, e você, de pedra em pedra, atravessa a semana sem pisar no chão."""),
  dict(id='falar', texto='Tentar, uma vez, perguntar: "A gente precisa conversar?", e ouvir o que vier', efeitos=dict(flag='tentou_falar', vinculo=1),
   resultado="""Você diz, na quinta, na cozinha, de costas para a pia: *a gente precisa conversar?* A outra pessoa, que cortava um pão, para a faca no ar. Um segundo. Dois. *Não agora*, responde, com a voz baixa e formal de quem recita. *Eu preciso de um tempo.* E o pão, partido ao meio, fica sobre a tábua, sem ser comido."""),
 ],
 desfecho="""Na sexta de manhã, a cozinha está vazia, exceto por um bilhete, em cima da mesa, de uma letra redonda e cuidadosa que uma das duas reconhece: *Matteo me pediu uma reunião. Volto à tarde.* Não há assinatura.""",
 ir={'A': 'ts_c6_giulia', 'B': 'ts_c6_matteo'})

NOS['ts_c6_giulia'] = dict(tipo='solo', cap=6, seat='A', lugar='Café da Piazza Salimbeni, Siena', hora='Sexta · 17h00', npcs=['giulia'],
 texto="""A Giulia Brunelli tem uma teoria: todo problema de coração se resolve com café, um *cornetto* e vinte minutos de conversa em voz alta. Vocês estão numa mesinha redonda, na Piazza Salimbeni, debaixo de um toldo listrado, e o *cornetto* de damasco, no seu prato, está intocado.

— Você está com cara de quem perdeu o ônibus — diz ela, sem rodeios. — Mas eu sei que não é o ônibus. É a sua colega de quarto, não é? A estudiosa. A que parece uma bibliotecária de filme.

Você abre a boca para negar, e a negação, que sempre saiu pronta, hoje não sai. Giulia, de queixo na mão, espera. É a primeira pessoa, em Siena, que olha para você com atenção inteira, e você, que fala por vício, descobre que não tem nada a dizer, a não ser a verdade.""",
 acoes=[
  dict(id='contar', texto='Contar tudo: o arco, o beijo ou o quase, a manhã, os cinco dias de silêncio', ir='ts_c6_fim',
   efeitos=dict(flag='a_contou_giulia', vinculo=2),
   resultado="""Você conta. Sem organizar, na ordem em que as coisas vêm: a noite da chuva, o terraço, o arco, a manhã de costas, os cinco dias. Giulia escuta, sem interromper, de olhos arregalados, e, quando você termina, pousa a mão sobre a sua. *{{B.Ele_ela}} está com medo*, diz. *Não de você. De si.* Uma pausa, curta: *as pessoas assim, quando se assustam, não gritam. Elas se organizam.*"""),
  dict(id='minimizar', texto='Dizer que não é nada, que são só dias estranhos, e pedir que a Giulia mude de assunto', ir='ts_c6_fim',
   efeitos=dict(flag='a_minimizou_giulia', abalo=1),
   resultado="""— Não é nada — você diz. — É só uma semana estranha. — Giulia, de colher no ar, olha você por três segundos, e suspira. *Tá*, diz. *Eu respeito.* E muda de assunto, para o Palio, para o Lorenzo, para o gelato. O seu *cornetto*, intocado, fica no prato, e você descobre que a sua mentira, que sempre foi perfeita, hoje é transparente até para uma pessoa que você conhece há seis semanas."""),
  dict(id='pergunta', texto='Perguntar à Giulia: "Como é que se espera alguém, sem pressionar?"', ir='ts_c6_fim',
   efeitos=dict(flag='a_perguntou_espera', vinculo=2),
   resultado="""— Como se espera alguém sem pressionar? — você pergunta. A pergunta, dita assim, tem o peso de uma confissão. Giulia sorri, devagar, o sorriso mais gentil que você viu na Itália. *Com um prato de comida na mesa*, diz. *E sem fazer perguntas.* Uma pausa. *É o que a minha nonna faz. É a coisa mais italiana que eu sei.*"""),
 ])

NOS['ts_c6_matteo'] = dict(tipo='solo', cap=6, seat='B', lugar='Escritório do Prof. Lazzeri, Università di Siena', hora='Sexta · 17h00', npcs=['matteo'],
 texto="""O escritório de Matteo Lazzeri, o orientador da sua tese, é uma sala pequena, de teto alto, em um andar do Palazzo San Niccolò, com uma mesa coberta de livros, uma janela para um pátio de limoeiros e um quadro de Duccio, uma reprodução, pendurado de lado. Matteo, vinte e cinco anos, de camisa branca e de olheiras de quem lê a noite inteira, está sentado atrás da mesa, com a sua tese aberta, e um lápis vermelho na mão.

— Há quatro semanas, você me entregava capítulos de quarenta páginas, com notas de rodapé impecáveis — diz ele, sem rodeios. — Esta semana, o capítulo cinco tem doze páginas, duas incoerências e uma frase, na página nove, que eu li três vezes. — Ele vira o caderno. — *A luz, em Siena, é um instrumento de devoção.* Isso, devo dizer, é bonito. E não é a sua voz.

Você olha a frase. É a sua. Escreveu-a há três semanas. Só que, agora, tem outro sentido.""",
 acoes=[
  dict(id='confessar', texto='Dizer a verdade, em voz baixa: que está com medo de se distrair, e que a distração tem nome', ir='ts_c6_fim',
   efeitos=dict(flag='b_confessou_matteo', vinculo=2),
   resultado="""— Estou com medo — você diz. — De me distrair. — A palavra, dita, parece pesar quatro quilos. Matteo pousa o lápis. *De se distrair do quê?*, pergunta, com uma delicadeza que você nunca ouviu nele. *Da tese. Da vida que eu planejei. De ser a pessoa que eu... que eu sempre fui.* Ele assente, devagar. *E a distração tem nome?* Você não responde. A janela, para o pátio, mostra um limoeiro, e o silêncio, em seguida, vale mais do que um sim."""),
  dict(id='defender', texto='Dizer que está tudo sob controle, que foi uma semana ruim, e que o capítulo cinco será refeito', ir='ts_c6_fim',
   efeitos=dict(flag='b_defendeu_controle', abalo=2),
   resultado="""— Está sob controle — você diz. — Foi uma semana ruim. Refaço o capítulo. — Matteo olha você, longamente, com o lápis vermelho a girar entre os dedos. *Eu não duvido de você*, diz. *Duvido do método. Um método que não deixa espaço para a vida, um dia, se rompe.* Ele devolve a tese. *Pense nisso.* Você sai do escritório com a nota mais alta e a sensação mais baixa da sua carreira."""),
  dict(id='silencio', texto='Ficar em silêncio, olhando o limoeiro pela janela, até a pergunta passar', ir='ts_c6_fim',
   efeitos=dict(flag='b_calou_matteo', vinculo=1),
   resultado="""Você não diz nada. Olha o limoeiro, no pátio, onde um pardal pula entre as folhas. O tempo passa, um minuto, dois, e Matteo, que não é de esperar, espera. *Há perguntas que não precisam de resposta imediata*, diz, por fim. *Mas precisam de resposta.* Ele fecha a tese. *Volte quando puder.* Você sai, de fichário no peito, com a impressão estranha de ter sido, pela primeira vez, entendid{{eu.o_a}} sem uma palavra."""),
 ])

NOS['ts_c6_fim'] = dict(tipo='fim', cap=6, lugar='Casa Bianchini, Siena', hora='Sexta · 21h00',
 texto="""Às nove da noite de sexta, a Casa Bianchini cheira a manjericão e a lenha: a signora Ottavia, no andar de baixo, preparou uma sopa de pão e feijão, e a deixou, sem aviso, em uma panela de ferro, na porta do apartamento, com uma colher de pau enfiada e um bilhete, em italiano, que as duas, ao mesmo tempo, não entendem e entendem.

{{se flag:a_contou_giulia}}Uma das duas, no café da Piazza Salimbeni, contou a uma amiga o que ainda não disse à outra. {{/se}}{{se flag:a_perguntou_espera}}Uma das duas aprendeu, de uma italiana, que se espera alguém *com um prato de comida na mesa*. {{/se}}{{se flag:b_confessou_matteo}}A outra confessou, a um orientador, em voz baixa, que a distração tem nome. {{/se}}{{se flag:b_defendeu_controle}}A outra defendeu, a um orientador, um método que já não sustenta. {{/se}}{{se flag:b_calou_matteo}}A outra calou diante de um limoeiro, e foi entendida. {{/se}}

Nenhuma das duas está na sala. As duas chegam, uma de cada lado do vicolo, com cinco minutos de diferença, e se encontram, de novo, na porta verde, número quatro, diante da panela de sopa que cheira a casa.

A mesa dobrável, na cozinha, tem duas tigelas, duas colheres e uma cadeira puxada, que alguém deixou de propósito, na ponta oposta. Ninguém comenta. As duas se sentam, e a sopa, pela primeira vez em uma semana, tem a temperatura de uma trégua.""",
 gancho="Uma panela de sopa na porta, duas tigelas na mesa e uma trégua por servir.",
 ir='ts_c7_cozinha')
