# Refrão de Verão · Capítulo 7 · A Descoberta
NOS = {}

def op(tom, tag, texto, se=None, ef=None, acao=False):
    d = dict(tom=tom, tag=tag, texto=texto)
    if se: d['se'] = se
    if ef: d['efeitos'] = ef
    if acao: d['acao'] = True
    return d

NOS['rv_c7_bar'] = dict(tipo='segue', cap=7, lugar='Rua Principal, Pine Hollow', hora='Segunda · 11h00', npcs=['doris', 'sarah'],
 ir={'A': 'rv_c7_a', 'B': 'rv_c7_b'},
 texto="""Às onze da manhã de segunda, Pine Hollow, população mil duzentos e catorze, tem mil duzentos e catorze opiniões e, ao que parece, trinta e duas picapes e quatro vans de emissora estacionadas em fila dupla na Rua Principal. A notícia saiu do computador de 2009 da Pruitt's Mercantile e pegou carona em três satélites. Há um homem de colete refletivo da *Seattle Weekly*, uma moça de microfone de espuma, e dois rapazes de câmera no ombro, de bermuda e sandália, discutindo com o dono do posto de gasolina por causa de uma vaga.

A Lanterna, que costuma abrir às seis da tarde, abriu às dez. Dentro, quarenta e cinco pessoas, a maior parte curiosos de fora, bebem a cerveja ruim da casa e comentam uma foto de uma bicicleta antiga na vitrine.

Doris Pruitt, de avental, de mãos na cintura, em frente à mercearia, faz uma coisa que nunca fez em trinta e seis anos: fecha a porta, com a chave, no meio do dia.""")

NOS['rv_c7_a'] = dict(tipo='solo', cap=7, seat='A', lugar='Chalé dos Ashby', hora='Segunda · 11h30', npcs=['lorna'],
 texto="""O barulho vem antes do carro: o ronco de um motor de van, de dois, de três, na estrada de terra, e um som que você conhece como a trilha sonora de uma vida inteira, o de pessoas que gritam o seu nome. Pela janela, entre os pinheiros, três vans de emissora, uma fila de carros, dois fotógrafos já na porteira e um homem de colete refletivo com uma câmera de teleobjetiva, na beira do riacho.

Você, de pijama e meia grossa, com um café na mão e o caderno preto aberto sobre o piano, não se mexe. Em seis semanas, a coisa que você mais queria era anonimato, e acaba de perdê-lo. A única diferença é que, desta vez, há um telhado novo sobre a sua cabeça, e uma pessoa a quatro quilômetros dali que você ainda não avisou.""",
 acoes=[
  dict(id='enfrentar', texto='Sair para a varanda, de pijama, e falar com os repórteres, antes que inventem uma versão', ir='rv_c7_dialogo',
   efeitos=dict(flag='a_enfrentou_imprensa', abalo=1),
   resultado="""Você abre a porta, e o mundo explode em flashes. Você diz uma frase só, em voz clara: *estou escrevendo um álbum, em paz, na casa do meu avô, que morreu em março. Peço que respeitem a cidade.* Duas vans baixam as câmeras, e uma, ao fundo, continua. Quando você entra, com a mão tremendo na maçaneta, o telefone fixo da cozinha, que você não sabia que funcionava, toca."""),
  dict(id='esconder', texto='Fechar as cortinas, trancar a porta e esperar a poeira baixar', ir='rv_c7_dialogo',
   efeitos=dict(flag='a_escondeu_casa', abalo=1),
   resultado="""Você fecha as cortinas, passa a tranca, desliga a lanterna e se senta no chão, no meio da sala, encostad{{eu.o_a}} na parede, como na adolescência, quando a fama era uma ideia e não uma casa. Lá fora, o motor das vans fica, o sol sobe, e a cabine do tempo passa devagar. Você ouve, lá longe, o som de uma picape, que vem subindo a estrada."""),
  dict(id='lorna', texto='Ir até a pedra do sinal, ligar para a Lorna e pedir que ela tire isso de cima', ir='rv_c7_dialogo',
   efeitos=dict(flag='a_ligou_lorna', vinculo=0),
   resultado="""Você sai pelos fundos, corre até a pedra de sinal e liga. A Lorna atende no primeiro toque. *Eu soube às sete*, diz. *Já tem comunicado, já tem equipe indo daqui.* Uma pausa. *Querida, eu vou ser honesta: foi bom. A internet está dizendo que você está de volta. Os streams do arquivo de quarenta e um segundos, que o Marco vazou, subiram quatrocentos por cento.* Você não sabe o que sentir sobre ter sido vazada por um homem de quem nunca ouviu."""),
 ])

NOS['rv_c7_b'] = dict(tipo='solo', cap=7, seat='B', lugar='Lanterna, Rua Principal', hora='Segunda · 11h30', npcs=['caleb', 'sarah'],
 texto="""Você entra na Lanterna às onze e meia, com a camisa para fora da calça e o cabelo de quem dormiu pouco e acordou com o mundo do avesso. Quarenta e cinco pessoas se viram, e Caleb, no balcão, de camiseta de banda e cara de quem tem uma notícia que prefere não dar, empurra uma cerveja para você.

— Eu ia te contar — diz Caleb. — Mas a Doris me ligou antes de eu abrir a boca. — Ele vira o celular na sua direção. — Essa é a moça. A que você levou ao lago. A que você deixou tocar o violão do papai.

Na tela, uma manchete de letras gordas, com um nome em maiúsculas acima de uma foto de capa de revista, de uma pessoa de cabelo perfeito, de roupa de estádio, numa pose de quem tem doze Grammys e uma vida que não cabe em nenhuma cidade. Você lê as primeiras linhas duas vezes. Nenhuma frase diz *carpinteiro*.""",
 acoes=[
  dict(id='ler', texto='Ler a notícia inteira, devagar, até o último parágrafo', ir='rv_c7_dialogo',
   efeitos=dict(flag='b_leu_noticia', abalo=2),
   resultado="""Você lê tudo. Doze Grammys. Quatro turnês mundiais. Uma casa em Malibu, uma em Londres, uma em Maui. Um álbum que a crítica chamou de *a última grande obra do pop*, e, três anos depois, de *a última*. Uma frase solta, no meio de um parágrafo: *Fontes dizem que a artista passa por um bloqueio criativo severo.* Você ergue os olhos. Pensa na tarde em que ela, no degrau da varanda, disse *eu não sei mais escrever*. Ela falou a verdade. E não falou a outra metade."""),
  dict(id='sair', texto='Largar a cerveja e sair, antes que alguém veja a sua cara', ir='rv_c7_dialogo',
   efeitos=dict(flag='b_saiu_bar', abalo=1),
   resultado="""Você deixa a cerveja, empurra a porta e sai para o sol da Rua Principal, de olhos semicerrados. Os fotógrafos, que você nunca viu na vida, já o fotografam. Alguém pergunta *você é o carpinteiro?* Você não responde. Sobe na picape e dá a partida, sem destino, e o rádio, ligado sem querer, toca a música que ele tocou no bar, a de dezessete anos."""),
  dict(id='sarah', texto='Olhar para a Sarah, no canto, que não disse nada e já sabia', ir='rv_c7_dialogo',
   efeitos=dict(flag='b_olhou_sarah', vinculo=0),
   resultado="""Você procura, na sala, o canto onde Sarah Brandt, de braços cruzados, de casaco azul-marinho, observa a cena. Ela encontra o seu olhar e não desvia. Não há triunfo, não há *eu avisei*, há só uma lucidez cansada. Ela faz um gesto pequeno, de cabeça, que você entende: *você sabia que tinha data*."""),
 ])

NOS['rv_c7_dialogo'] = dict(tipo='dialogo', cap=7, lugar='Varanda do chalé dos Ashby', hora='Segunda · 14h00', comeca='B',
 texto="""A varanda do chalé, com a porta aberta e a poeira da estrada ainda no ar, tem um barulho de fundo de motores, flashes e passarinhos que não perceberam nada. As vans foram, aos poucos, empurradas para a porteira pelo xerife do condado, um homem de setenta anos e bigode de morsa que disse *aqui é propriedade privada* sem levantar a voz.

Na varanda, a dois metros de distância um do outro, estão duas pessoas que, na noite anterior, estavam a nenhuma.""",
 turnos=[
  dict(prompt='A primeira frase é sua.', opcoes=[
    op('fere', 'x0_b_fere', '— Doze Grammys. E eu aqui, explicando como se prega uma telha.', se='eu:B', ef=dict(abalo=1)),
    op('seco', 'x0_b_seco', '— Você podia ter me contado. Eu não ia reagir mal.', se='eu:B'),
    op('abre', 'x0_b_abre', '— Eu li a notícia. Eu li que você não sabe mais escrever. Foi a única coisa que você me contou de verdade.', se='eu:B', ef=dict(vinculo=1)),
    op('abre', 'x0_a_abre', '— Eu ia contar. Eu juro. Eu esperei o dia certo, e o dia certo nunca veio.', se='eu:A', ef=dict(vinculo=1)),
    op('seco', 'x0_a_seco', '— Eu não menti. Eu não disse tudo. É diferente.', se='eu:A'),
    op('fere', 'x0_a_fere', '— Você não ia ter reagido normal. Ninguém reage. Por isso eu vim para cá.', se='eu:A', ef=dict(abalo=1)),
  ]),
  dict(prompt='Agora você responde.', opcoes=[
    op('fere', 'x1_a_fere', '— Você não me deixou ser o que você queria que eu fosse. Você me deixou ser o que eu sou, e agora está bravo por isso.', se='eu:A', ef=dict(abalo=1)),
    op('abre', 'x1_a_abre', '— Eu sei como parece. Eu sei. Eu queria uma pessoa que não soubesse quem eu era. E você foi essa pessoa. Eu fui egoísta.', se='eu:A', ef=dict(vinculo=1)),
    op('seco', 'x1_a_seco', '— Isso é verdade, e não muda o que aconteceu.', se='eu:A'),
    op('fere', 'x1_b_fere', '— Você usou a cidade como um refúgio descartável. A Doris, o bar, eu. Tudo.', se='eu:B', ef=dict(abalo=2)),
    op('seco', 'x1_b_seco', '— Eu não estou bravo. Estou... eu não sei o que eu estou.', se='eu:B'),
    op('abre', 'x1_b_abre', '— Eu fui o primeiro que tratou você como pessoa. E você tratou a mim como cenário.', se='eu:B', ef=dict(vinculo=1)),
  ]),
  dict(prompt='A conversa é sua de novo.', opcoes=[
    op('abre', 'x2_a_abre', '— Eu não usei você. Eu estava com medo de que você mudasse. De que você me olhasse como todo mundo olha.', se='eu:A', ef=dict(vinculo=2)),
    op('fere', 'x2_a_fere', '— Você também escondeu uma coisa. A banda. Seattle. Você nunca disse que quase foi.', se='eu:A', ef=dict(abalo=1)),
    op('seco', 'x2_a_seco', '— Eu não vou me desculpar por ter querido um verão normal.', se='eu:A'),
    op('abre', 'x2_b_abre', '— Eu teria olhado. De outro jeito, talvez. Mas teria olhado igual. Era meu direito saber.', se='eu:B', ef=dict(vinculo=1)),
    op('fere', 'x2_b_fere', '— A cidade inteira vai ser o seu cenário agora. E vai sobrar para mim limpar a bagunça.', se='eu:B', ef=dict(abalo=1)),
    op('seco', 'x2_b_seco', '— Eu preciso de um tempo. Para pensar.', se='eu:B'),
  ]),
  dict(prompt='A última palavra da varanda é sua.', opcoes=[
    op('abre', 'x3_b_abre', '— Eu não sei se eu consigo fazer isso. Ser a pessoa de uma pessoa que as pessoas conhecem.', se='eu:B', ef=dict(vinculo=1)),
    op('seco', 'x3_b_seco', '— Eu volto amanhã, para terminar a calha. É trabalho. Não é outra coisa.', se='eu:B'),
    op('fere', 'x3_b_fere', '— Eu acho que a gente se enganou. Eu me enganei, pelo menos.', se='eu:B', ef=dict(abalo=2)),
    op('abre', 'x3_a_abre', '— Eu não sei se eu consigo ficar sem você. E eu sei que isso é um problema.', se='eu:A', ef=dict(vinculo=1)),
    op('seco', 'x3_a_seco', '— Eu vou terminar o álbum. Com você ou sem você. Mas eu preferia com.', se='eu:A'),
    op('fere', 'x3_a_fere', '— Você pode ir embora. É a coisa que você faz. Você vai embora antes de ser deixado.', se='eu:A', ef=dict(abalo=2)),
  ]),
 ],
 pool=[
  op('cuida', 'pl_cuida', '— Senta. A gente não precisa brigar de pé.'),
  op('seco', 'pl_seco', '— Ok.'),
  op('flerte', 'pl_flerte', '— Você fica bem quando está bravo.'),
  op('abre', 'pl_abre', '— Eu estou com medo.'),
  op('fere', 'pl_fere', '— Isso é o que eu esperava.'),
 ],
 fecho="""O sol, a pino, bate na varanda. Os flashes distantes ainda cintilam na porteira, como vaga-lumes de uma vida diferente. Entre os dois, uma tábua de madeira velha cede um centímetro, e é o único som que a conversa faz.""",
 ir='rv_c7_decisao')

NOS['rv_c7_decisao'] = dict(tipo='decisao', cap=7, lugar='Varanda do chalé dos Ashby', hora='Segunda · 15h00',
 texto="""Dois adultos, uma discussão comprida e uma pergunta no ar: o que se faz com o que acabou de ser dito? Nenhuma das respostas é limpa. Todas custam, e custam coisas diferentes.""",
 pergunta='O que vocês fazem agora?',
 ir='rv_c7_fim',
 acoes=[
  dict(id='espaco', texto='Dar espaço: cada um fica quieto um dia, e voltam a se falar quando estiverem mais calmos', efeitos=dict(flag='deram_espaco', abalo=1),
   resultado="""Vocês combinam espaço. O carpinteiro volta à picape, e a outra pessoa, ao piano. A discussão não acaba, só se afasta, como uma tempestade que vira para o outro lado do vale. É uma decisão madura, e doída, e funciona só para quem tem tempo."""),
  dict(id='insistir', texto='Ficar: sentar na varanda e conversar até resolver, mesmo que dure a noite inteira', efeitos=dict(flag='insistiram', vinculo=2),
   resultado="""Vocês ficam. A tarde vira noite, o fogão se acende, e a conversa, que começou como briga, vai mudando de cor, devagar, de vermelho para um cinza mais suave. Nada se resolve, mas uma coisa melhora: a certeza de que nenhum dos dois vai sair da sala batendo a porta."""),
  dict(id='romper', texto='Encerrar: dizer que foi bom enquanto durou, e que o verão, para os dois, acabou aí', efeitos=dict(flag='romperam', abalo=2),
   resultado="""Vocês decidem encerrar. A frase, dita com educação, tem o som de uma tábua que cede. O carpinteiro, depois de um minuto, estende a mão, como se fechasse um contrato. A outra pessoa a aperta, com um sorriso torto. É a coisa mais civilizada e mais triste que fizeram juntos."""),
 ])

NOS['rv_c7_fim'] = dict(tipo='fim', cap=7, lugar='Chalé dos Ashby', hora='Segunda · 20h30', npcs=['lorna'],
 texto="""À noite, o chalé do velho Henry está cercado, a quinhentos metros, por uma fila de carros que o xerife não deixa passar da porteira. {{se flag:deram_espaco}}O carpinteiro foi embora, com a promessa de uma volta, e o violão do pai dele, deixado de propósito ou por esquecimento, está encostado no piano. {{/se}}{{se flag:insistiram}}O carpinteiro ainda está na varanda, com um copo de água e uma conversa que parou no meio. {{/se}}{{se flag:romperam}}O carpinteiro foi embora, de picape, sem olhar para trás, e a calha, que ele não terminou, balança com o vento. {{/se}}{{se flag:a_enfrentou_imprensa}}A frase dita aos repórteres já está em oito sites. {{/se}}{{se flag:a_escondeu_casa}}As cortinas fechadas viraram, nas redes, *a mansão do mistério*. {{/se}}{{se flag:b_leu_noticia}}A notícia, lida inteira, deixou na cabeça uma frase: *bloqueio criativo severo*. {{/se}}{{se flag:noite_lago}}A cama de dossel, lá em cima, ainda guarda a forma de duas pessoas. {{/se}}

Às oito e meia, o telefone fixo da cozinha, que ninguém sabia que funcionava, toca. A pessoa que atende ouve, do outro lado, uma voz de planilha, a de uma mulher de quarenta e cinco anos que não perde tempo com saudação.

— Eu soube de tudo. — É Lorna Feldt. — O Marco ouviu o arquivo, ouviu o que vazou, e quer o álbum inteiro. Não em outubro. Em duas semanas. Eles já remarcaram a turnê, e a primeira data é em Seattle, no dia dois de setembro. Querida, a gravadora não vai esperar. Você tem quatorze dias para escrever um álbum, ou eles chamam um compositor.""",
 gancho="Quatorze dias para escrever um álbum inteiro.",
 ir='rv_c8_noite')
