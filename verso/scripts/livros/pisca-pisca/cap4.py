# Pisca-Pisca · Capítulo 4 · A festa (sábado, 20 de dezembro de 2025)
NOS = {}

def op(tom, tag, texto, se=None, ef=None, acao=False):
    d = dict(tom=tom, tag=tag, texto=texto)
    if se: d['se'] = se
    if ef: d['efeitos'] = ef
    if acao: d['acao'] = True
    return d

NOS['pp_c4_volta'] = dict(tipo='segue', cap=4, lugar='Harmon Place', hora='Sábado, 20 de dezembro · 14h20', npcs=['odalys', 'gus'],
 ir='pp_c4_convite',
 texto="""O reboque chega às nove e quarenta, o mecânico da Elizabeth Auto Tow diagnostica *a bomba-d'água, filho* em quatro segundos, e a van da Padaria Tedeschi, com o cannoli na lateral, volta a Dyker Heights ao meio-dia e meia, atrás de um guincho amarelo, com oitenta quilos de fio e dois passageiros que não dormiram.

Harmon Place está exatamente como foi deixada: doze casas de vela na janela, o poste mudo da esquina e uma fila de vizinhos na calçada, de braços cruzados, esperando para saber o que aconteceu na Turnpike. A notícia chegou antes: Fran, de Hoboken, mandou *ótima manhã com os dois, muito fofos* para a tia Angela, que mandou para a mãe de {{B.nome}}, que mandou para a Odalys.

Odalys Quiñones, de pé na frente da Kessler Hardware com o megafone debaixo do braço, só ergue uma sobrancelha. Gus Pappas, atrás dela, de avental, segura uma bandeja de coxinhas de pretzel e finge que a bandeja é o assunto.

— Fio chegou? — pergunta Odalys.

É uma pergunta sobre fio, e é a única que ninguém ali tem coragem de fazer de outro jeito.""")

NOS['pp_c4_convite'] = dict(tipo='segue', cap=4, lugar='Harmon Place', hora='Sábado, 20 de dezembro · 17h00',
 ir={'A': 'pp_c4_festa_a', 'B': 'pp_c4_festa_b'},
 texto="""O fio é descarregado e guardado no depósito, entre a mesa de marceneiro e a estrela. Às cinco da tarde, depois de um banho de dez minutos e de um prato de sobras de lasanha que a mãe de um e a avó do outro, cada uma na sua casa, servem sem fazer pergunta, chega o convite no celular dos dois, no mesmo minuto, de dois números diferentes:

*Festa do último ano, hoje, 21h, porão do Ansel. É a última antes do Natal. Vem. (E traz o outro, se quiser.)*

Sábado à noite, duas semanas antes de a vida de todo mundo mudar de endereço. A turma inteira vai estar lá. A turma inteira, aliás, já sabe da van, do diner e do sofá. Em cidade de bairro, a velocidade de uma notícia é medida em minutos de WhatsApp.""")

NOS['pp_c4_festa_a'] = dict(tipo='solo', cap=4, seat='A', lugar='Porão do Ansel', hora='Sábado, 20 de dezembro · 21h40',
 texto="""O porão do Ansel Reyes tem pé-direito baixo, um sofá de couro cor de mostarda, uma bola de espelhos pendurada num cano e uma playlist que alterna Taylor Swift com salsa. Sessenta pessoas, o cheiro de pizza fria e gente de gorro, e todos, sem exceção, olham para a porta quando você entra, e depois fingem que não olharam.

A sua amiga de infância, Bea Kowalczyk, de cabelo cor de laranja de tinta de mercado, puxa você pelo cotovelo para trás de uma pilha de casacos. Fala baixo, que é um modo de falar alto.

— Você não vai gostar disso — diz ela. — Mas melhor você ouvir de mim. A Dani, que trabalha no balcão da biblioteca, disse que {{B.nome}} passou a semana inteira lá, de capuz, com um tubo de projetos. Plantas. Cornell, tipo, a faculdade de arquitetura. — Ela morde o lábio. — {{B.nome}} nunca te contou?

Cornell, a seis horas de ônibus, e você, que chegou a escrever num arquivo de quarenta e um kilobytes *mesma faculdade, mesma república*.""",
 acoes=[
  dict(id='negar', texto='Dizer à Bea que isso é impossível e procurar {{B.nome}} na festa para tirar isso a limpo', ir='pp_c4_festa',
   efeitos=dict(flag='a_confrontou_boato', abalo=1),
   resultado="""Você diz *impossível* com uma voz um pouco mais alta do que pretendia, e uma garota ao lado derruba o copo. Bea levanta as duas mãos, num gesto de paz. Mas você já está olhando por cima da bola de espelhos, procurando uma cabeça escura de cabelo cacheado no meio do porão, com uma raiva que não tem forma ainda e uma pergunta que tem."""),
  dict(id='guardar', texto='Agradecer à Bea, guardar o que ouviu e esperar o outro contar sozinho', ir='pp_c4_festa',
   efeitos=dict(flag='a_guardou_boato'),
   resultado="""Você agradece, de um jeito calmo demais, e pega um copo de refrigerante sem gás na mesa de bebidas. A informação fica na sua mão como uma pedra de rio, lisa e fria. Você decide que o outro vai ter uma chance de falar antes de você acusar. Não é generosidade: é o hábito de conferir duas vezes."""),
  dict(id='rir', texto='Rir, mudar de assunto e tirar a Bea para dançar', ir='pp_c4_festa',
   efeitos=dict(flag='a_fingiu'),
   resultado="""Você ri, alto, e diz que a Bea tem a fofoca mais lenta do Brooklyn. Em quinze segundos as duas estão na pista, no meio de uma salsa que nenhuma sabe dançar. A pedra continua no bolso, mas você sabe carregar coisas pesadas sorrindo."""),
 ])

NOS['pp_c4_festa_b'] = dict(tipo='solo', cap=4, seat='B', lugar='Porão do Ansel', hora='Sábado, 20 de dezembro · 21h40',
 texto="""O porão do Ansel Reyes tem pé-direito baixo, um sofá cor de mostarda, uma bola de espelhos e a mesma playlist de sempre. Sessenta pessoas viram o rosto quando você entra, e depois se dedicam, com talento, a olhar para o chão.

O seu amigo Marcus Oyelaran, de moletom do time de debate e óculos de armação grossa, aparece do seu lado com um copo de suco de uva em cada mão e uma expressão de quem não sabe como começar.

— Eu tenho duas notícias — diz ele. — Uma é que você é o assunto da noite. A outra é que {{A.nome}}, pelo que a Bea contou, ainda guarda um arquivo no celular. Um tal de *Plano {{A.nome}} + {{B.nome}} 2029*. Ela chegou a mostrar para a Bea no ano passado, tipo, rindo, mas com uma cara que não era de riso.

Um plano, com data e com o seu nome, escrito por alguém que você deixou sem resposta durante dois anos.""",
 acoes=[
  dict(id='perguntar', texto='Perguntar ao Marcus exatamente o que estava escrito no arquivo', ir='pp_c4_festa',
   efeitos=dict(flag='b_perguntou_plano', abalo=1),
   resultado="""Você pergunta. Marcus conta o que sabe: abas coloridas, horários de ônibus, os cursos que vocês iam fazer juntos. *Parecia um mapa*, ele diz. *Um mapa de uma cidade que só existe se os dois forem.* Você agradece sem dizer nada, e o suco de uva, por algum motivo, fica sem gosto."""),
  dict(id='mudar', texto='Dizer ao Marcus que não quer falar disso hoje', ir='pp_c4_festa',
   efeitos=dict(flag='b_fugiu_do_assunto'),
   resultado="""Você diz que hoje não, e Marcus, que te conhece desde o sexto ano, aceita sem insistir e muda para o debate de sexta. Mas a palavra *mapa* ficou rondando no ar, e você sabe, como sempre soube, que fugir é uma resposta também."""),
  dict(id='procurar', texto='Atravessar o porão e procurar {{A.nome}} agora', ir='pp_c4_festa',
   efeitos=dict(flag='b_foi_atras'),
   resultado="""Você devolve o copo ao Marcus, abre caminho entre gente de gorro, desvia de uma garrafa de cidra e para no meio do porão, sem saber ainda o que dizer. É a primeira vez em dois anos que você começa uma conversa em vez de esperar o outro começar. Não é fácil, e não parece mais fácil por ser a primeira."""),
 ])

NOS['pp_c4_festa'] = dict(tipo='dividir', cap=4, lugar='Porão do Ansel', hora='Sábado, 20 de dezembro · 22h30', cada=1,
 texto="""Às dez e meia, a festa atinge o ponto em que ninguém mais fala em frases inteiras. O Ansel, de pé em cima do sofá, tenta fazer um brinde que é interrompido por uma salva de palmas por motivo nenhum. Dos quatro cantos do porão chega a mesma pergunta, em formas diferentes: *vocês voltaram? vocês dois estão juntos? é verdade que vocês dormiram em Hoboken?*

Sessenta pessoas esperam uma resposta, e cada uma já tem a sua.""",
 pergunta='O que você faz com os olhares?',
 acoes=[
  dict(id='pista', texto='Ir para a pista de dança e deixar o barulho responder por você', efeitos=dict(flag='festa_pista'),
   resultado="""Você vai para o meio do porão, entre a bola de espelhos e o sofá mostarda, e dança, mal, com o corpo inteiro. As perguntas viram ruído de fundo. É uma forma de estar numa festa sem estar nela: presente, visível e, de algum modo, intocável."""),
  dict(id='escada', texto='Subir os degraus do porão até o quintal e respirar', efeitos=dict(flag='festa_escada', abalo=1),
   resultado="""Você sobe os seis degraus de madeira até o quintal do Ansel, onde o frio acerta o rosto como um tapa gentil. Há uma árvore pelada, uma churrasqueira coberta de neve e um banco de ferro. O barulho do porão chega abafado, como um motor distante. Do alto, dá para ver o brilho fraco de uma vela em cada janela da vizinhança."""),
  dict(id='roda', texto='Ficar com os amigos e rir das perguntas, sem responder nenhuma', efeitos=dict(flag='festa_roda', vinculo=1),
   resultado="""Você se encosta na parede, entre dois amigos, e transforma cada pergunta em uma piada pequena. *Voltamos de quê?* *Do Hoboken ou do diner?* A roda ri, e a resposta, de tanto circular, vira folclore: a de que nada aconteceu, e a de que algo, talvez, esteja prestes a acontecer."""),
 ],
 desfecho="""Os dois acabam, por caminhos diferentes, no mesmo ponto: a porta dos fundos do porão, que dá para o quintal coberto de neve, onde só cabe uma conversa de cada vez.""",
 ir='pp_c4_dialogo')

NOS['pp_c4_dialogo'] = dict(tipo='dialogo', cap=4, lugar='Quintal do Ansel', hora='Sábado, 20 de dezembro · 23h05', comeca='A',
 texto="""O banco de ferro do quintal é pequeno, gelado e cheio de neve nas laterais, e só dois cabem nele, se os dois aceitarem. Do porão, o baixo de uma música abafada faz vibrar a tampa da churrasqueira. Entre as árvores peladas, o céu é de um cinza claro de cidade, sem estrelas.

Ninguém aqui tem plateia. É a primeira vez em dois dias.""",
 turnos=[
  dict(prompt='A primeira frase é sua.', opcoes=[
    op('seco', 'w0_ouvi', '— Ouvi uma coisa hoje. Quero que você me conte antes que eu invente o resto.', se='flag:a_guardou_boato || flag:a_confrontou_boato'),
    op('abre', 'w0_cansada', '— Eu não sei mais o que dizer para essa festa inteira.'),
    op('flerte', 'w0_banco', '— Tem lugar nesse banco, se você promete não falar de planilha.'),
    op('cuida', 'w0_casaco', '— Está frio demais para ficar lá fora sem casaco. Toma o meu.'),
  ]),
  dict(prompt='Agora é você quem responde.', opcoes=[
    op('abre', 'w1_conto', '— Eu me inscrevi em Cornell. Em outubro. Eu ia te contar.', ef=dict(flag='confessou_cornell_festa', vinculo=1)),
    op('seco', 'w1_depois', '— Isso a gente fala depois. Hoje a festa é demais.'),
    op('fere', 'w1_plano', '— E você? Ainda tem um plano com o meu nome no celular? Para um cara que você diz que odeia.', se='flag:b_perguntou_plano', ef=dict(abalo=1)),
    op('cuida', 'w1_vem', '— Senta aqui. Eu faço espaço.'),
  ]),
  dict(prompt='A conversa é sua de novo.', opcoes=[
    op('abre', 'w2_dois_anos', '— Eu fiquei dois anos sem falar com você porque eu não sabia dizer não.', ef=dict(vinculo=1)),
    op('fere', 'w2_sumiu', '— Você sumiu. Isso não foi falta de palavra, foi escolha.', ef=dict(abalo=1)),
    op('seco', 'w2_hoje', '— Eu não quero brigar hoje. Quero só saber se a gente consegue acender uma árvore.'),
  ]),
  dict(prompt='A última palavra da festa é sua.', opcoes=[
    op('flerte', 'w3_volta', '— Voltamos, então? Para todo mundo ouvir?'),
    op('abre', 'w3_parceiros', '— Eu quero, pelo menos, ser seu parceiro de projeto. O resto, devagar.', ef=dict(vinculo=1)),
    op('seco', 'w3_nada', '— Fala para eles que a gente só está construindo uma árvore.'),
  ]),
 ],
 pool=[
  op('cuida', 'pl_frio', '— Entra daqui a pouco. Você está roxo de frio.'),
  op('seco', 'pl_depois', '— Depois a gente retoma isso.'),
  op('flerte', 'pl_neve', '— Tem neve no seu cabelo. Ficou bonito.'),
  op('abre', 'pl_dificil', '— Isso é mais difícil do que eu pensei que seria.'),
  op('fere', 'pl_fugir', '— Você vai fugir de novo? A porta está ali.'),
 ],
 fecho="""Do porão, alguém grita o nome de uma música, e a festa inteira canta junto, abafada, como um coro atrás de uma parede. No quintal, as duas pessoas ficam em silêncio, olhando a neve que cai sobre uma churrasqueira coberta.""",
 ir='pp_c4_resposta')

NOS['pp_c4_resposta'] = dict(tipo='decisao', cap=4, lugar='Porão do Ansel', hora='Sábado, 20 de dezembro · 23h40',
 texto="""Quando os dois voltam ao porão, o Ansel, de microfone de karaokê na mão, anuncia que os *dois da árvore* chegaram, e a sala inteira vira o rosto de novo. Alguém grita *beijo!*, e o grito pega, vira coro, e vira, em dez segundos, uma parede de gente.

O microfone chega às mãos dos dois, que precisam responder ao mesmo tempo, com uma só voz.""",
 pergunta='O que vocês dizem?',
 ir={'A': 'pp_c4_noite_a', 'B': 'pp_c4_noite_b'},
 acoes=[
  dict(id='projeto', texto='Dizer que é só um projeto de árvore e mais nada', efeitos=dict(flag='disse_projeto'),
   resultado="""Vocês dizem, juntos, no microfone, que é só um projeto, e a sala geme de decepção. O Ansel faz uma careta. Em algum lugar, uma garota de gorro verde baixa o celular, com uma expressão de quem queria o outro final."""),
  dict(id='segredo', texto='Dizer que a gente não deve nada a ninguém e devolver o microfone', efeitos=dict(flag='disse_nada_a_ninguem', vinculo=1),
   resultado="""Vocês devolvem o microfone, sem dizer nada, com o olhar de quem já falou o que ia falar. O porão fica em silêncio meio segundo, e depois explode num *ooooh* mais alto do que qualquer beijo. A falta de resposta, de repente, é a melhor das respostas."""),
  dict(id='beijo_falso', texto='Fazer uma piada, e dizer que o beijo está marcado para o dia 22', efeitos=dict(flag='disse_dia22', vinculo=1),
   resultado="""Vocês dizem, em coro, que o beijo está *marcado para o dia 22*, às oito da noite, no depósito da Kessler, e que quem quiser ingresso fala com a Odalys. A sala vira uma gargalhada só. Ninguém imagina que, para os dois, a piada é um pouco menos piada do que parece."""),
 ])

NOS['pp_c4_noite_a'] = dict(tipo='solo', cap=4, seat='A', lugar='Calçada da nº 8', hora='Domingo, 21 de dezembro · 00h50',
 texto="""Você volta a pé pela calçada da Harmon Place, pisando na neve nova com as botas que o seu pai calçou nos anos oitenta. Doze janelas com vela, uma lua pequena atrás de uma nuvem, e, na nº 11, a luz de uma lanterna passeando de cômodo em cômodo.

No bolso do casaco, o celular vibra uma vez. É o grupo da turma. Uma notificação, de uma conta que você não conhece:""",
 acoes=[
  dict(id='abrir', texto='Abrir o vídeo agora, ali mesmo, na calçada', ir='pp_c4_fim',
   efeitos=dict(flag='a_viu_video', abalo=1),
   resultado="""Você abre. São sete segundos, filmados pelo alto, de um ângulo de cozinha. Dois vultos sob a luz de um fogão, de meias de lã, a um passo um do outro, em silêncio, enquanto a neve cai na janela de trás. Uma legenda em letras brancas: *a gente achava que era só planilha 👀*. Quarenta e três curtidas. Você nem sabe quem postou."""),
  dict(id='ignorar', texto='Guardar o celular sem abrir e entrar em casa', ir='pp_c4_fim',
   efeitos=dict(flag='a_ignorou_video'),
   resultado="""Você guarda o celular no fundo do bolso, aperta o casaco e entra. Sabe, antes de fechar a porta, que o que não abriu agora vai abrir sozinho amanhã, na boca de alguém, no almoço de domingo, com a família inteira à mesa."""),
 ])

NOS['pp_c4_noite_b'] = dict(tipo='solo', cap=4, seat='B', lugar='Varanda da nº 11', hora='Domingo, 21 de dezembro · 00h50',
 texto="""Você volta pela calçada da Harmon Place com o casaco molhado e o caderno de capa verde debaixo do braço, e do outro lado da rua uma luz de lanterna passeia pela nº 8. Na varanda da nº 11, a Pó-pó, de xale, de lampião aceso e de olhos bem abertos, espera você, sentada, como quem sabe que só o silêncio traz a verdade de volta.

No bolso, o celular vibra uma vez. É o grupo da turma. Uma notificação de uma conta que você não conhece:""",
 acoes=[
  dict(id='abrir', texto='Abrir o vídeo ali mesmo, na frente da Pó-pó', ir='pp_c4_fim',
   efeitos=dict(flag='b_viu_video', abalo=1),
   resultado="""Você abre, com a luz do lampião sobre a tela. São sete segundos de uma cozinha escura, com neve na janela e dois vultos de meias de lã, a um passo um do outro, e uma legenda: *a gente achava que era só planilha 👀*. A Pó-pó, sem erguer a voz, observa de lado e diz apenas: *então é por isso que você voltou com cara de dia de festa*."""),
  dict(id='guardar', texto='Guardar o celular e perguntar à Pó-pó por que ela está acordada', ir='pp_c4_fim',
   efeitos=dict(flag='b_perguntou_vo'),
   resultado="""Você guarda o celular e pergunta o que sempre pergunta, na hora certa ou errada: *por que a senhora está acordada?* A Pó-pó olha o lampião por um tempo, e responde, como quem lê uma carta: *porque tem coisa que eu devia ter te contado antes de você descobrir sozinho.*"""),
 ])

NOS['pp_c4_fim'] = dict(tipo='fim', cap=4, lugar='Harmon Place', hora='Domingo, 21 de dezembro · 01h20',
 texto="""Em algum momento depois da uma da manhã, o vídeo de sete segundos já passou das duzentas visualizações e está, agora, na mão de gente que nunca esteve em Hoboken. {{se flag:disse_projeto}}Por mais que os dois tenham dito que era só um projeto, a legenda não concorda. {{/se}}{{se flag:disse_nada_a_ninguem}}Como os dois não disseram nada, a legenda disse por eles. {{/se}}{{se flag:disse_dia22}}A piada do dia 22, ao microfone, já virou meme: alguém criou uma contagem regressiva. {{/se}}

Na Harmon Place, as luzes continuam apagadas. Mas há um celular acordado em cada casa, e outro, mais distante, na rua de trás, na mão de alguém que acabou de colar o link no grupo errado.

*Odalys Quiñones* aparece no topo da notificação, em letras de contato. A mensagem, curta, chega aos dois: *Bom dia. Vi o vídeo. Almoço de domingo, na minha casa, 1h da tarde. As duas famílias. É uma ordem.*""",
 gancho="As duas famílias, à mesma mesa, pela primeira vez em doze anos: quem vai contar o que na frente de quem?",
 ir='pp_rascunho_fim')
