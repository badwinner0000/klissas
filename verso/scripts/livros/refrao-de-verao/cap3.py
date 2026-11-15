# Refrão de Verão · Capítulo 3 · A Cidade
NOS = {}

def op(tom, tag, texto, se=None, ef=None, acao=False):
    d = dict(tom=tom, tag=tag, texto=texto)
    if se: d['se'] = se
    if ef: d['efeitos'] = ef
    if acao: d['acao'] = True
    return d

NOS['rv_c3_entrada'] = dict(tipo='segue', cap=3, lugar='Pine Hollow', hora='Terça · 20h00',
 ir='rv_c3_lanterna',
 texto="""Às oito da noite, a luz do vale é a de um quadro que alguém esqueceu de acabar: dourada nas bordas, lilás no meio, com um fio de nuvem encostado nas montanhas. De cima do morro, a Rua Principal de Pine Hollow parece uma coisa que cabe numa mão.

{{se flag:foram_juntos}}Os dois combinaram ir juntos, e a picape sobe a estrada com um rádio baixo. {{/se}}{{se flag:foram_separados}}Os dois combinaram ir separados, e uma bicicleta antiga desce a estrada, rangendo. {{/se}}{{se flag:so_um_pouco}}Os dois combinaram um meio-termo: aparecer, tomar um suco, ir embora antes das dez. {{/se}}As decisões, em cidade pequena, têm o prazo de validade de uma cerveja quente.""")

NOS['rv_c3_lanterna'] = dict(tipo='segue', cap=3, lugar='A Lanterna, Rua Principal', hora='Terça · 20h20', npcs=['doris', 'caleb', 'sarah'],
 ir='rv_c3_dividir',
 texto="""A Lanterna cheira a cerveja velha, a madeira encerada e a fritura de cebola. O balcão de nogueira, de cinquenta anos, tem uma marca de copo onde uma pessoa, na década de oitenta, perdeu uma aposta. Há doze banquetas, seis mesas e uma jukebox quebrada. Quarenta pessoas, a maior parte com mais de quarenta anos, conversam em voz alta, sem se importar com quem escuta.

Quando você entra, o sino toca. Quarenta rostos se viram para olhar, e, em três segundos, voltam à conversa. Ninguém grita seu nome, ninguém aponta o celular, ninguém pede foto. Uma senhora de cabelo branco só diz *boa noite, querida*, e vira a tampa de uma garrafa. É a primeira vez, em seis anos, que alguém olha para você e não vê um produto.

No balcão, Doris Pruitt, de blusa de domingo, avalia você de lado. Perto da jukebox, um rapaz de camisa de flanela, Caleb, acena. E, junto ao banjo, de braços cruzados, uma mulher de trinta anos, de cabelo preto, de olhar educado e cortante, observa a cena com a precisão de quem sabe o que tem a perder: Sarah Brandt, a ex.""")

NOS['rv_c3_dividir'] = dict(tipo='dividir', cap=3, lugar='A Lanterna', hora='Terça · 20h40', cada=1,
 texto="""Às oito e quarenta, A Lanterna é um organismo vivo: gente que entra, gente que sai, copos que tilintam, um banjo afinando no canto. Cada um dos dois, por motivos diferentes, tem a sensação de estar em um filme sem roteiro.

Alguém, em algum lugar, bate um copo na mesa, e a sala se organiza. É hora do show de terça.""",
 pergunta='Onde você se posiciona?',
 acoes=[
  dict(id='balcao', texto='Sentar no balcão e pedir uma cerveja, como se fosse da cidade', efeitos=dict(flag='sentou_balcao'),
   resultado="""Você escolhe uma banqueta e pede uma cerveja. O bartender, um homem de bigode de morsa, pergunta *light ou da torneira*, e você, sem saber, responde *a mais barata*. Ele ri. *A da torneira*, ele diz. O primeiro gole é gelado e ruim, e é a melhor cerveja que você bebe em meses."""),
  dict(id='palco', texto='Ficar perto do palco, de pé, para ouvir a música de perto', efeitos=dict(flag='ficou_palco', vinculo=1),
   resultado="""Você encosta numa coluna de madeira ao lado do palco e fica ali, de braços cruzados, ouvindo o banjo afinar. De perto, os instrumentos têm marcas, arranhões, uma fita crepe no braço do violão. São velhos, de gente que os toca todo dia. É um tipo de intimidade que você não tinha ouvido em estúdio nenhum."""),
  dict(id='caleb', texto='Ir até a mesa onde o rapaz de flanela acena e puxar conversa', efeitos=dict(flag='falou_caleb', vinculo=1),
   resultado="""Você atravessa o salão até a mesa do rapaz de flanela. *Caleb*, ele diz, estendendo a mão, *irmão do carpinteiro. Dizem que você é a neta do Henry. Eu acho que é uma pessoa interessante.* A frase é dita sem o menor propósito de elogio, e é a mais direta que você ouve na noite."""),
 ],
 desfecho="""Às nove, a sala se aquieta. O microfone, de um estalo, ganha vida. Um nome é anunciado no palco, e, pela primeira vez, a Lanterna inteira fica em silêncio por vontade própria.""",
 ir={'A': 'rv_c3_ouvir', 'B': 'rv_c3_palco'})

NOS['rv_c3_palco'] = dict(tipo='solo', cap=3, seat='B', lugar='Palco da Lanterna', hora='Terça · 21h00',
 texto="""Você sobe os dois degraus do palco com a mesma cara de todo terça-feira: a de quem preferia estar em outro lugar e não está. O violão do seu pai, de verniz gasto e rachadura no tampo, está encostado no banco. Há quarenta pessoas, e nenhuma tem celular na mão, porque o sinal de Pine Hollow nunca deixou.

Do fundo da sala, de pé, de braços cruzados, com a cerveja da torneira esquecida na mão, a pessoa do casaco de caxemira olha você. Você passou a semana inteira dizendo a si mesmo que não ia cantar nada hoje, e a verdade é que a coisa que você mais queria era ser ouvido por alguém que não conhecia o repertório.""",
 acoes=[
  dict(id='antiga', texto='Cantar a música que você escreveu aos dezessete anos, a que nunca mostrou a ninguém', ir='rv_c3_dialogo',
   efeitos=dict(flag='cantou_antiga', vinculo=2),
   resultado="""Você toca os primeiros acordes, em ré, e a sala percebe que é uma música que não conhece. A letra fala de uma estrada de terra, de um pai que adoece, de uma cidade que fica no retrovisor sem sair do lugar. A voz, mais baixa do que a de falar, rouca de quem não canta há anos, não treme. Quando termina, o silêncio dura três segundos, que são os mais compridos da sua vida, e depois a Lanterna inteira aplaude, de pé, sem gritos, só com as mãos."""),
  dict(id='cover', texto='Cantar uma música country conhecida, de todo mundo, e deixar a sala cantar junto', ir='rv_c3_dialogo',
   efeitos=dict(flag='cantou_cover'),
   resultado="""Você escolhe uma velha canção country, daquelas que o bar inteiro sabe de cor, e a Lanterna canta junto, em coro, desafinada e feliz. É a coisa mais fácil e a mais segura, e você a faz bem. Quando termina, ninguém aplaude por surpresa, e todo mundo aplaude por hábito. Do fundo da sala, a pessoa de casaco de caxemira não aplaude."""),
  dict(id='recusar', texto='Descer do palco e passar o violão a outra pessoa: hoje não', ir='rv_c3_dialogo',
   efeitos=dict(flag='recusou_cantar', abalo=1),
   resultado="""Você fica de pé, olha o violão e o devolve ao banco. *Hoje não*, diz ao microfone, e desce os degraus. A sala murmura, sem protestar. Em cidade pequena, quem canta toda terça tem o direito de faltar uma. Mas, ao passar pelo fundo, você sente, na nuca, o olhar da pessoa de caxemira, e sabe que perdeu uma coisa que não sabe nomear."""),
 ])

NOS['rv_c3_ouvir'] = dict(tipo='solo', cap=3, seat='A', lugar='Plateia da Lanterna', hora='Terça · 21h00', npcs=['doris'],
 texto="""O carpinteiro sobe os dois degraus do palco e pega um violão de verniz gasto, com uma rachadura no tampo. A sala de quarenta pessoas, sem celulares nas mãos, o observa com a paciência de quem já ouviu tudo. Você, de pé ao fundo, com uma cerveja ruim esquecida, nota algo que só quem passou a vida em palcos nota: a postura de quem não quer ser visto cantando, e que, por isso, vai cantar bem.

Ao seu lado, Doris Pruitt, de braços cruzados, sussurra, sem olhar para você: *ele faz isso toda terça. Nunca mostra uma música nova.*""",
 acoes=[
  dict(id='ouvir', texto='Ouvir com os olhos fechados, como se estivesse em um estúdio', ir='rv_c3_dialogo',
   efeitos=dict(flag='a_ouviu_fechados', vinculo=1),
   resultado="""Você fecha os olhos. Os primeiros acordes, em ré, têm o som de madeira velha, sem filtro, sem compressor, sem nenhum dos vinte e dois microfones a que você está acostumada. A voz entra, mais baixa do que a de falar. Quando você abre os olhos, quatro minutos depois, a sala inteira aplaude, e o seu rosto está molhado, o que você não esperava e não admitiria."""),
  dict(id='anotar', texto='Memorizar a estrutura da música, como faz por reflexo, procurando o que funciona', ir='rv_c3_dialogo',
   efeitos=dict(flag='a_analisou_musica'),
   resultado="""Por reflexo de ofício, você analisa: ré maior, um refrão de quatro compassos, uma ponte que cai um tom. É uma música simples e perfeita, o tipo que as suas equipes passam semanas tentando fabricar. Você percebe, com um mal-estar, que o que mais admira é o que nenhum produtor conseguiria vender."""),
  dict(id='sair', texto='Sair para a varanda antes do fim: música demais, para um primeiro dia', ir='rv_c3_dialogo',
   efeitos=dict(flag='a_saiu_antes', abalo=1),
   resultado="""Você deixa a cerveja no balcão e sai pela porta dos fundos, para a varanda, antes do último verso. O ar da noite bate no rosto. Por um minuto, ouve a música abafada pela parede e se pergunta o que é pior: ouvir, ou não aguentar ouvir."""),
 ])

NOS['rv_c3_dialogo'] = dict(tipo='dialogo', cap=3, lugar='Varanda dos fundos da Lanterna', hora='Terça · 22h10', comeca='A',
 texto="""A varanda dos fundos da Lanterna dá para um beco com contêineres de lixo, uma lâmpada de sódio e uma vista, entre dois telhados, de um pedaço de céu salpicado de estrelas. O barulho da música, abafado pela parede, chega como um coração dentro de uma garrafa.

Em cidade pequena, as melhores conversas são as que acontecem no beco.""",
 turnos=[
  dict(prompt='A primeira frase é sua.', opcoes=[
    op('abre', 't0_a_abre', '— Eu não sabia que você cantava. Você é muito melhor do que devia ser.', se='eu:A', ef=dict(vinculo=1)),
    op('flerte', 't0_a_flerte', '— O violão tem rachadura. A voz, também. Combinam.', se='eu:A'),
    op('seco', 't0_a_seco', '— Foi bonito. Eu não digo isso para qualquer um.', se='eu:A'),
    op('seco', 't0_b_seco', '— Você não aplaudiu. Eu reparei.', se='eu:B'),
    op('flerte', 't0_b_flerte', '— Você ficou lá no fundo, de braços cruzados. Estava avaliando o meu desempenho?', se='eu:B'),
    op('abre', 't0_b_abre', '— Eu não canto há muito tempo. Hoje foi diferente. Não sei por quê.', se='eu:B', ef=dict(vinculo=1)),
  ]),
  dict(prompt='Agora você responde.', opcoes=[
    op('abre', 't1_b_abre', '— Eu cantei para você. Não foi para a sala. Foi para você. Eu não sei por quê.', se='eu:B', ef=dict(vinculo=2)),
    op('seco', 't1_b_seco', '— Foi uma terça comum.', se='eu:B'),
    op('fere', 't1_b_fere', '— Você é do tipo que escuta de longe e julga de perto.', se='eu:B', ef=dict(abalo=1)),
    op('abre', 't1_a_abre', '— Eu não aplaudi porque não consegui mexer as mãos. Faz muito tempo que uma música não me deixa assim.', se='eu:A', ef=dict(vinculo=2)),
    op('seco', 't1_a_seco', '— Eu não aplaudo por obrigação.', se='eu:A'),
    op('flerte', 't1_a_flerte', '— Eu julguei. E aprovei.', se='eu:A'),
  ]),
  dict(prompt='A conversa é sua de novo.', opcoes=[
    op('abre', 't2_a_abre', '— Eu trabalho com música. Mais ou menos. Eu não conto muito.', se='eu:A', ef=dict(flag='a_quase_contou', vinculo=1)),
    op('flerte', 't2_a_flerte', '— Se eu cantasse aqui, no seu lugar, a Doris ia pedir o meu cartão preto de volta.', se='eu:A'),
    op('seco', 't2_a_seco', '— Não vou falar de mim. Fala você.', se='eu:A'),
    op('abre', 't2_b_abre', '— Eu tive uma banda, aos catorze. A gente era ruim e feliz. Eu quase fui para Seattle.', se='eu:B', ef=dict(flag='b_quase_contou', vinculo=1)),
    op('flerte', 't2_b_flerte', '— Você parece alguém que sabe de música mais do que diz.', se='eu:B'),
    op('seco', 't2_b_seco', '— Cantar aqui é um hobby. O trabalho é o telhado.', se='eu:B'),
  ]),
  dict(prompt='A última palavra da noite é sua.', opcoes=[
    op('abre', 't3_a_abre', '— Valeu. Pela música, e pela conversa. Eu não esperava nenhuma das duas.', se='eu:A', ef=dict(vinculo=1)),
    op('flerte', 't3_a_flerte', '— Canta de novo amanhã? Eu pago em biscoitos de aveia.', se='eu:A'),
    op('seco', 't3_a_seco', '— Boa noite. Amanhã, às sete. Sem rádio.', se='eu:A'),
    op('abre', 't3_b_abre', '— Boa noite. Se você quiser ouvir uma música, a Lanterna tem sempre uma terça.', se='eu:B', ef=dict(vinculo=1)),
    op('flerte', 't3_b_flerte', '— Eu aceito os biscoitos. Mas eu cobro de volta com um sorriso.', se='eu:B'),
    op('seco', 't3_b_seco', '— Boa noite. Amanhã, às sete. Com rádio.', se='eu:B'),
  ]),
 ],
 pool=[
  op('cuida', 'pl_cuida', '— Está frio. Quer o meu casaco?'),
  op('seco', 'pl_seco', '— Ok.'),
  op('flerte', 'pl_flerte', '— Você tem uma voz bonita para quem diz que odeia música.'),
  op('abre', 'pl_abre', '— Eu não sei por que estou falando isso com você.'),
  op('fere', 'pl_fere', '— Você acha que a cidade é pequena. A cidade é do tamanho que a gente permite.'),
 ],
 fecho="""A porta dos fundos abre e fecha. Do salão, uma voz de mulher chama o nome de {{B.nome}}, com um tom que não é de pedido: é de posse. Do beco, a lâmpada de sódio zumbe, e uma estrela cadente risca o pedaço de céu entre os telhados.""",
 ir={'A': 'rv_c3_melodia', 'B': 'rv_c3_noite_b'})

NOS['rv_c3_melodia'] = dict(tipo='solo', cap=3, seat='A', lugar='Chalé dos Ashby', hora='Terça · 23h40',
 texto="""Você volta ao chalé às onze e quarenta, com o corpo cansado e a cabeça estranha. O fogão, quase apagado, solta um calor baixo. A lanterna a querosene, no gancho da varanda, é a única luz. Você se senta no banco do piano, sem ter decidido sentar.

Dentro da cabeça, uma coisa está acontecendo, e você demora a reconhecer, porque faz oito meses que não acontece. É uma melodia. Pequena, torta, de quatro notas, que sobe, hesita e cai, como a voz do carpinteiro no refrão de uma música que você ouviu uma vez. Não é uma frase pronta. É o tipo de coisa que pode se tornar outra coisa, se você tiver coragem de tocá-la.""",
 acoes=[
  dict(id='tocar', texto='Tocar as quatro notas no piano, mesmo desafinadas', ir='rv_c3_fim',
   efeitos=dict(flag='a_tocou_melodia', vinculo=2),
   resultado="""Você toca. Dó, mi, sol, lá. A última nota soa meio tom abaixo, e é perfeita assim. Você repete, lento, uma vez, duas, dez, e, na décima primeira, as quatro notas viram cinco, e depois sete. Você não sabe de onde vêm. Só sabe que a mão sabe. Às duas da manhã, no verso da fotografia de uma menina de maria-chiquinha, você escreve a primeira linha de letra em oito meses: *o verão é uma coisa que a gente aprende a perder.*"""),
  dict(id='guardar', texto='Guardar a melodia na cabeça, sem tocar, com medo de estragar', ir='rv_c3_fim',
   efeitos=dict(flag='a_guardou_melodia', abalo=1),
   resultado="""Você fica imóvel, com a mão no ar, a um centímetro das teclas. Se tocar, a melodia pode ser uma bobagem. Se não tocar, ela continua sendo promessa. Você escolhe a promessa, e vai dormir com as quatro notas dando voltas na cabeça, tão frágeis que cada respiração parece pôr a perder uma delas."""),
  dict(id='cantarolar', texto='Cantarolar baixinho, no escuro, a música do carpinteiro, só para ver se a melodia vem dela', ir='rv_c3_fim',
   efeitos=dict(flag='a_cantarolou', vinculo=1),
   resultado="""Você cantarola o refrão que ouviu no bar, sem letra, só com a boca fechada. Em alguns compassos, a melodia dele e a sua se encontram e se misturam. Você percebe, com um susto bom, que o que estava procurando por oito meses não era uma ideia, era uma voz de fora, uma que não fosse a sua."""),
 ])

NOS['rv_c3_noite_b'] = dict(tipo='solo', cap=3, seat='B', lugar='Estrada da Lanterna', hora='Terça · 23h40', npcs=['sarah'],
 texto="""Você sai da Lanterna às onze e meia, com o violão nas costas e a cabeça no beco. Antes que chegue à picape, uma voz atrás de você diz o seu nome, o primeiro, curto, num tom que você conhece de cor: Sarah Brandt, trinta anos, de cabelo preto, de casaco azul-marinho, olhos educados e cortantes. Ela esteve com você por quatro anos, e se despediu faz dois, quando você disse, sem rodeio, que não sabia se queria mais do que aquilo.

— Você cantou a de dezessete — diz Sarah. Não é uma pergunta. — A que você nunca cantou para mim.

O vento mexe na ponta do casaco dela. Os dois ficam a três passos, no cascalho, sob uma lua de junho.""",
 acoes=[
  dict(id='verdade', texto='Dizer a verdade: não cantou para ninguém em especial, mas cantou para alguém que estava ouvindo', ir='rv_c3_fim',
   efeitos=dict(flag='b_disse_sarah', vinculo=1),
   resultado="""— Eu cantei para alguém que estava ouvindo — você diz. — Não era você. Desculpa. — Sarah ri, curto, sem humor. *Eu sei*, ela diz. *Eu vi.* Depois, muito baixo: *a neta do Henry. Cuidado, {{B.nome}}. Gente assim tem data de ir embora.* E sai, de casaco azul-marinho, pelo cascalho, sem se virar."""),
  dict(id='negar', texto='Negar: foi só uma música, num bar, numa terça', ir='rv_c3_fim',
   efeitos=dict(flag='b_negou_sarah', abalo=1),
   resultado="""— Foi só uma música — você diz. — Numa terça, num bar. — Sarah olha você por um segundo, com uma paciência que dói mais do que a raiva. *Você mente mal*, diz. *Sempre mentiu mal. É por isso que a cidade inteira gosta de você.* E vai embora, devagar, com o jeito de quem acabou de perder uma discussão que já tinha perdido."""),
  dict(id='seguir', texto='Não dizer nada, só acenar e seguir para a picape', ir='rv_c3_fim',
   efeitos=dict(flag='b_calou_sarah'),
   resultado="""Você aceita. Não diz nada, abre a porta da picape e entra. Sarah fica parada no cascalho, com os braços cruzados, e você ouve, pelo retrovisor, quando ela diz, para ninguém, uma coisa em voz baixa. Você liga o motor, e a cidade, no vidro de trás, fica do tamanho de uma mão."""),
 ])

NOS['rv_c3_fim'] = dict(tipo='fim', cap=3, lugar='Pine Hollow', hora='Quarta · 07h00',
 texto="""Na manhã de quarta-feira, às sete em ponto, uma picape de 1998 para em frente ao chalé dos Ashby, com um rádio laranja no banco do carona e uma caixa de ferramentas na caçamba. {{se flag:cantou_antiga}}O motorista cantou, na noite anterior, uma música que nunca cantou a ninguém, e a cidade inteira sabe, em doze horas, o primeiro verso. {{/se}}{{se flag:cantou_cover}}O motorista cantou, na noite anterior, uma velha canção country, e ninguém lembrou de comentar. {{/se}}{{se flag:recusou_cantar}}O motorista recusou cantar, na noite anterior, e a cidade, que respeita as terças, não comentou. {{/se}}{{se flag:a_tocou_melodia}}Dentro do chalé, no verso de uma fotografia, há uma linha de letra que ninguém leu. {{/se}}

A porta da varanda abre, e a pessoa que sai, de cabelo molhado e de olheiras novas, de uma qualidade diferente das de ontem, não carrega nem chapéu nem óculos escuros. Pela primeira vez, o rosto, inteiro, à luz da manhã, é só um rosto.

— Sem rádio — diz ela, ou ele, ou quem quer que seja, com a voz rouca de noite curta.

— Com rádio — diz o carpinteiro. E, depois de pensar um instante, abaixa o volume em dois pontos.""",
 gancho="Um volume abaixado em dois pontos, a primeira concessão do verão.",
 ir='rv_c4_telhado')
