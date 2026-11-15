# Pisca-Pisca · Capítulo 2 · A estrela (quinta, 18 de dezembro de 2025)
D = 'Depósito da Kessler Hardware'
NOS = {}

def op(tom, tag, texto, se=None, ef=None, acao=False):
    d = dict(tom=tom, tag=tag, texto=texto)
    if se: d['se'] = se
    if ef: d['efeitos'] = ef
    if acao: d['acao'] = True
    return d

NOS['pp_c2_chegada'] = dict(tipo='segue', cap=2, lugar=D, hora='Quinta, 18 de dezembro · 18h58', npcs=['szymanski'],
 ir='pp_c2_dividir',
 texto="""A Kessler Hardware fechou em agosto, depois de sessenta e dois anos, e ninguém na Treze desfez a vitrine: ainda dá para ver o cartaz de *Fechadura e Chave em 10 Minutos* desbotado pelo sol. O depósito fica nos fundos, por um corredor entre a lavanderia e o beco, com porta de ferro que rasga o chão quando alguém a puxa.

Às sete menos dois, o seu Szymanski já está lá, de colete laranja da Con Edison que ele nunca devolveu, segurando um molho de chaves do tamanho de um cacho de uvas. Setenta e um anos, dois joelhos novos, nenhuma pressa. Abre a porta, acende a lâmpada nua do teto e fica em silêncio tempo demais, como quem decide o que não vai dizer.

— Tem tomada nova aqui, tem a velha ali, e o que está escrito *não mexa* é para ser levado a sério. — Ele entrega a chave grande a quem chegou primeiro e a pequena ao outro. — Eu abro hoje. Amanhã vocês se viram.

{{se flag:a_marcou}}Foi a sua mensagem de ontem que marcou o horário, e todo mundo aqui sabe disso. {{/se}}{{se flag:regra_horario}}Passaram cinco minutos da hora combinada e nenhum dos dois comentou. {{/se}}O depósito tem cheiro de óleo de máquina, serragem e Natal guardado: quarenta caixas de papelão empilhadas até o teto, cada uma com um nome escrito a caneta, e no centro, em cima de uma mesa de marceneiro, um volume do tamanho de uma criança, enrolado num lençol branco e amarrado com barbante de padaria.

— É isso — diz o seu Szymanski. — Desde 1987. — E vai embora, deixando a porta entreaberta e a pergunta fechada.""")

NOS['pp_c2_dividir'] = dict(tipo='dividir', cap=2, lugar=D, hora='Quinta, 18 de dezembro · 19h10', cada=1,
 texto="""Com a porta fechada, o depósito parece ainda menor. A lâmpada nua balança de leve. A estrela está ali, a três passos de cada um, e na parede do fundo, em letra de mão, alguém deixou escrita a lista de tudo o que esta cidade pequena do Brooklyn acha que uma árvore de doze metros precisa: *cabo, tronco, base, copa, carga, estrela*.

São sete noites e só uma árvore. Dá para ir por um lado ou por outro.""",
 pergunta='O que você faz primeiro?',
 acoes=[
  dict(id='medir', texto='Abrir a prancheta e começar a calcular a carga da árvore', 
   efeitos=dict(flag='a_medindo'),
   variantes=[
    dict(se='flag:a_quadro', resultado="""Você repete o que já sabe fazer: confere tudo duas vezes. Dessa vez são os circuitos, e dá o mesmo resultado de ontem à noite, no quadro de casa. O transformador aguenta, no máximo, o que as duas casas gastam em um dia comum, mais um tanto. Cinco mil lâmpadas somadas aos fios do ginkgo dão um número que não cabe.

Você escreve o número maior no alto da folha e sublinha duas vezes: **a carga não fecha com tudo ligado**."""),
    dict(se='', resultado="""Você abre a prancheta numa folha em branco e escreve o que o seu Szymanski deixou implícito: o transformador da esquina aguenta o que as duas casas gastam em um dia comum, e a árvore tem de caber nisso. Doze metros de copa, cinco mil lâmpadas de uma casa, os fios da outra, e nenhuma margem.

Você sublinha duas vezes: **a carga não fecha com tudo ligado**. A boa notícia é que o problema, agora, tem nome."""),
   ]),
  dict(id='estrela', texto='Desamarrar o barbante e abrir o lençol da estrela', 
   efeitos=dict(flag='b_abriu_estrela', vinculo=1),
   variantes=[
    dict(se='flag:b_telhado', resultado="""Você tira o barbante nó por nó, do jeito de quem sobe em telhado e sabe que nó apressado cai. O lençol desliza e, por baixo, a estrela é menor do que você imaginou e mais bonita: oito pontas de latão, cada uma com uma lâmpada de vidro soprado dentro de uma gaiola de fio fino, e no centro um motor pequeno que ainda gira se você empurra com o dedo.

Lá de cima, na noite do apagão, você viu um céu com essa mesma geometria. Fica um segundo em silêncio, e é um silêncio bom."""),
    dict(se='', resultado="""Você desfaz o barbante nó por nó, com o cuidado de quem não quer estragar a surpresa. O lençol desliza e, por baixo, a estrela é menor do que você imaginou e mais bonita: oito pontas de latão, cada uma com uma lâmpada de vidro soprado dentro de uma gaiola de fio fino, e no centro um motor pequeno que ainda gira se você empurra com o dedo.

Em trinta e oito anos ninguém a acendeu. Dá para ver pela poeira: ela está limpa só nas pontas, onde alguém passou o pano com carinho."""),
   ]),
  dict(id='caixas', texto='Ler os nomes escritos a caneta nas caixas empilhadas', 
   efeitos=dict(flag='achou_nomes'),
   resultado="""Cada caixa tem um nome e um ano, na mesma letra inclinada: *Pappas 1991*, *Quiñones 1996*, *Szymanski 2003*. Você anda entre as pilhas como numa biblioteca de Natais. Quase todas as caixas vieram de casas da rua, entregues à Kessler para guardar, e nunca mais foram buscadas.

Há uma pilha de caixas sem ano e sem nome, só com um X de fita adesiva por cima. Você escolhe uma ao acaso, só para ter o que fazer com as mãos, e ela pesa mais do que parece."""),
 ],
 desfecho="""O depósito se organiza sozinho: um de vocês na prancheta, outro no lençol ou nas caixas, e entre os dois uma mesa de marceneiro, uma lâmpada nua e a primeira noite de sete.

Durante vinte minutos, os únicos sons são o de lápis, o de papelão e o do vento no beco. Alguém precisa romper isso.""",
 ir='pp_c2_dialogo')

NOS['pp_c2_dialogo'] = dict(tipo='dialogo', cap=2, lugar=D, hora='Quinta, 18 de dezembro · 19h50', comeca='B',
 texto="""A estrela está agora de pé sobre a mesa, sem o lençol, e joga uma sombra de oito pontas na parede dos fundos. A lista de *cabo, tronco, base, copa, carga, estrela* ganha, com a sombra, uma sétima palavra que ninguém escreveu.

Vinte minutos de silêncio é o limite que dois ex-melhores-amigos aguentam.""",
 turnos=[
  dict(prompt='A primeira frase é sua.', opcoes=[
    op('abre', 'u0_linda', '— É linda. Eu achei que fosse ser mais feia. Mais fácil de odiar.', ef=dict(vinculo=1)),
    op('seco', 'u0_carga', '— Linda não acende. Preciso saber quanta carga ela puxa.'),
    op('flerte', 'u0_trinta', '— Trinta e oito anos de espera e ela aparece num lençol de padaria. Tem estilo.'),
  ]),
  dict(prompt='Agora você responde.', opcoes=[
    op('seco', 'u1_numero', '— Eu já tenho o número. Ela puxa menos do que a minha casa inteira. A questão é a copa.'),
    op('abre', 'u1_nonno', '— Alguém a guardou direito. Cuidou. Isso não é abandono, é espera.', ef=dict(vinculo=1)),
    op('fere', 'u1_ordem', '— Você começou pelo bonito. Eu comecei pela conta. Foi sempre assim entre nós.', ef=dict(abalo=1)),
  ]),
  dict(prompt='A conversa é sua de novo.', opcoes=[
    op('cuida', 'u2_regra', '— Pela regra de ontem: uma ideia maluca cada um. Eu começo, se você quiser.', se='flag:regra_ideias', ef=dict(flag='ideia_a')),
    op('seco', 'u2_horario', '— Já passou das oito. A gente combinou até as dez.', se='flag:regra_horario'),
    op('flerte', 'u2_passado', '— Nada de passado até o dia 25. Então me conta do presente: o que você faz quando acende uma luz?', se='flag:regra_passado'),
    op('abre', 'u2_ideia', '— Posso propor uma coisa? Não é plano, é só uma ideia.', se='!flag:regra_ideias && !flag:regra_horario && !flag:regra_passado'),
    op('cuida', 'u2_comeu', '— Você comeu alguma coisa hoje? Tem pretzel no carrinho, ainda deve estar aberto.', se='!flag:regra_ideias && !flag:regra_horario && !flag:regra_passado'),
    op('seco', 'u2_foco', '— Vamos ao que importa: tronco e base. O resto eu resolvo depois.', se='!flag:regra_ideias && !flag:regra_horario && !flag:regra_passado'),
  ]),
  dict(prompt='A última palavra da noite é sua.', opcoes=[
    op('abre', 'u3_obrigado', '— Valeu por não ter ido embora quando viu a mesa.', ef=dict(vinculo=1)),
    op('seco', 'u3_amanha', '— Amanhã às sete. Traz fita métrica.'),
    op('flerte', 'u3_estrela', '— Se a estrela acender, você paga o chocolate quente. Se não, eu pago.'),
  ]),
 ],
 pool=[
  op('cuida', 'pl_frio', '— O depósito é gelado. Tem um aquecedor em algum canto?'),
  op('seco', 'pl_ok', '— Ok. Seguimos.'),
  op('flerte', 'pl_poeira', '— Você tem poeira no cabelo. Aqui, do lado.'),
  op('abre', 'pl_cansado', '— Foi um dia longo. Mas foi melhor do que eu esperava.'),
  op('fere', 'pl_sempre', '— Você sempre faz isso: espera o outro falar primeiro.'),
 ],
 fecho="""A sombra da estrela, de oito pontas, atravessa a mesa e chega às mãos dos dois. Ninguém comenta.""",
 ir='pp_c2_decisao')

NOS['pp_c2_decisao'] = dict(tipo='decisao', cap=2, lugar=D, hora='Quinta, 18 de dezembro · 21h15',
 texto="""Antes de ir embora, falta uma escolha que muda como as outras seis noites vão ser: por onde começar a árvore. Os dois olham para a mesma parede, a da lista, e cada um vê uma ordem diferente.""",
 pergunta='Por onde a árvore começa?',
 ir={'A': 'pp_c2_noite_a', 'B': 'pp_c2_noite_b'},
 acoes=[
  dict(id='copa', texto='Pela copa: desenhar a forma da árvore antes de saber o que ela puxa', efeitos=dict(flag='comecou_copa', vinculo=1),
   resultado="""Vocês decidem começar pelo bonito. A copa vai ser uma espiral de fios, de baixo para cima, terminando na estrela. A carga, por enquanto, é um problema de amanhã."""),
  dict(id='carga', texto='Pela carga: fechar a conta de energia e só depois desenhar', efeitos=dict(flag='comecou_carga'),
   resultado="""Vocês decidem começar pela conta. Sem número, nada sobe. A copa, por enquanto, é um desenho que espera a carga fechar."""),
  dict(id='junto', texto='Pelas duas coisas ao mesmo tempo, uma de cada vez, passando a folha de um para o outro', efeitos=dict(flag='comecou_junto', vinculo=1),
   resultado="""Vocês decidem não decidir: um desenha, o outro calcula, e a folha passa de mão em mão a cada vinte minutos. É a ordem mais lenta e a única em que os dois precisam ler o que o outro escreveu."""),
 ])

NOS['pp_c2_noite_a'] = dict(tipo='solo', cap=2, seat='A', lugar=D, hora='Quinta, 18 de dezembro · 21h40',
 texto="""Por dois minutos, enquanto o outro devolve a chave ao molho, você faz o que sempre faz: confere. Dá a volta na mesa, passa a lanterna do celular pelos cantos e levanta, por hábito, a caixa de baixo da pilha sem nome, a do X de fita adesiva.

Por baixo da fita, em letra inclinada e antiga, a mesma letra de todas as outras caixas, está escrito um nome que você leu a vida inteira num barco de lembrança de comunhão, no cartão de Natal da sua nonna e no túmulo do cemitério de Green-Wood: *G. Tedeschi*.

Ao lado, num sinal de mais, outro nome. Você ainda não leu.""",
 acoes=[
  dict(id='ler', texto='Ler o segundo nome na caixa', ir='pp_c2_fim',
   efeitos=dict(flag='a_leu_caixa', abalo=1),
   resultado="""Você inclina a lanterna e lê o que estava escrito do outro lado do sinal de mais: *W. Lau*. A data embaixo é a mesma da estrela: *Natal de 1987*.

O seu avô, Gennaro, e o avô do vizinho, Wing, assinaram juntos uma caixa. Em onze anos de rivalidade, nenhum adulto das duas casas disse esse nome em voz alta."""),
  dict(id='fechar', texto='Fechar a caixa e dizer a si mesmo que é só coincidência', ir='pp_c2_fim',
   efeitos=dict(flag='a_fechou_caixa'),
   resultado="""Você empurra a caixa de volta ao lugar com a ponta do pé, como se fosse a de qualquer outra pessoa. O nome ao lado do seu, no entanto, já está dentro da sua cabeça, e nenhuma pilha de papelão consegue empurrá-lo de volta."""),
 ])

NOS['pp_c2_noite_b'] = dict(tipo='solo', cap=2, seat='B', lugar=D, hora='Quinta, 18 de dezembro · 21h40',
 texto="""Você vai guardar o lençol na pilha onde o encontrou, e de dentro dele, quando o dobra, cai um papel quadrado, antigo, do tamanho de um postal. Você o pega do chão com dois dedos.

É uma fotografia de 1987, com a borda dentada e a cor desbotada para laranja. Dois homens de casaco grosso, ao lado de uma árvore alta e apagada num terreno vazio, e entre eles, apoiada no ombro de um e na mão do outro, uma estrela de oito pontas. Um é italiano de cabelo ralo e sorriso grande. O outro, de bigode fino, é o seu avô.

No verso, em letra inclinada: *G.T. + W.L. · primeira árvore · Natal 87*.""",
 acoes=[
  dict(id='guardar', texto='Guardar a fotografia no bolso, sem contar a ninguém', ir='pp_c2_fim',
   efeitos=dict(flag='b_guardou_foto', abalo=1),
   resultado="""Você enfia o postal no bolso interno do casaco, junto da dobra do caderno. Seu avô morreu antes de você aprender a perguntar as coisas. Você nunca soube que ele tinha um amigo ali, a duas casas de distância, que um dia dividiu com ele uma estrela.

Pela primeira vez em muito tempo, tem algo seu, e ao mesmo tempo dos dois lados da rua."""),
  dict(id='mostrar', texto='Levar a fotografia até quem está do outro lado da mesa', ir='pp_c2_fim',
   efeitos=dict(flag='b_mostrou_foto', vinculo=1),
   resultado="""Você atravessa o depósito com o postal na mão. Não diz nada: só o estende sobre a mesa, sob a lâmpada nua, virado para cima. A outra pessoa olha por muito tempo e depois, devagar, vira a fotografia e lê o verso.

Nenhum dos dois fala. Do lado de fora, um caminhão de lixo passa pela Treze, e o barulho cobre o que poderia ter sido dito."""),
 ])

NOS['pp_c2_fim'] = dict(tipo='fim', cap=2, lugar='Harmon Place', hora='Quinta, 18 de dezembro · 23h50',
 texto="""Em casa, a luz ainda não voltou em Harmon Place, e a única coisa acesa na quadra inteira é o lampião de querosene que a Pó-pó pendurou na varanda da nº 11. Do outro lado da rua, a luz de uma vela anda de janela em janela na nº 8.

{{se flag:a_leu_caixa}}Um nome numa caixa de papelão. {{/se}}{{se flag:b_guardou_foto}}Uma fotografia no bolso do casaco. {{/se}}{{se flag:b_mostrou_foto}}Uma fotografia, de mão em mão, sobre uma mesa. {{/se}}Uma estrela guardada por trinta e oito anos, e nenhum dos adultos das duas casas jamais mencionou que ela existia.

Às onze e cinquenta, dois celulares vibram de novo, no mesmo segundo. Um número desconhecido. Uma foto de uma lápide, já com neve em cima, e uma legenda curta:

*Pergunte à sua avó por que as duas famílias pararam de se falar. Ela sabe. Não foi 2013.*""",
 gancho="Quem sabe que a briga não começou em 2013, e por que quer que os dois saibam agora?",
 ir='pp_c3_estrada')
