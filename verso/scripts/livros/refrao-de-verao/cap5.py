# Refrão de Verão · Capítulo 5 · A Inspiração
NOS = {}

def op(tom, tag, texto, se=None, ef=None, acao=False):
    d = dict(tom=tom, tag=tag, texto=texto)
    if se: d['se'] = se
    if ef: d['efeitos'] = ef
    if acao: d['acao'] = True
    return d

NOS['rv_c5_composicao'] = dict(tipo='segue', cap=5, lugar='Chalé dos Ashby', hora='Quinta a sábado · junho',
 ir={'A': 'rv_c5_a', 'B': 'rv_c5_b'},
 texto="""Em três dias, o chalé do velho Henry muda de cheiro. O de cachimbo ainda está lá, nas cortinas, mas por cima dele, em camadas, chegam outros: café de coador, cedro novo, papel e lápis. O piano de armário, desafinado, ganha uma fita crepe em três teclas e um caderno aberto em cima, de capa preta, que já tem onze páginas rabiscadas, riscadas e reescritas.

{{se flag:a_enviou_demo}}A Lorna ainda não respondeu ao arquivo de quarenta e um segundos. {{/se}}{{se flag:a_nao_enviou}}A Lorna ainda espera um sinal de vida. {{/se}}O telhado, lá fora, tem agora três quartos de telhas novas, e o carpinteiro, que chega todo dia às sete com o rádio dois pontos mais baixo, aprendeu, sem que ninguém combinasse, a martelar em compasso de quatro por quatro.

É sábado. Em duas semanas, uma música inteira saiu de uma noite sem sono, e ainda precisa de quem a ouça.""")

NOS['rv_c5_a'] = dict(tipo='solo', cap=5, seat='A', lugar='Sala do chalé dos Ashby', hora='Sábado · 15h00',
 texto="""A música, a de uma noite só, tem seis versos, um refrão de quatro palavras e uma ponte que ainda não fecha. Você a toca no piano de armário desafinado, com as três teclas de fita crepe, e é a primeira vez em oito meses que uma música sua não soa como outra música sua.

A letra fala de verão, de perder, de aprender a perder. Fala de uma casa de madeira, de um riacho e de um telhado. Não fala de ninguém por nome, e o nome que não aparece em nenhum verso é um que você conhece de cor.

Pela janela aberta, o martelo bate em compasso. Você nunca mostrou uma música a ninguém antes de ela estar pronta. Hoje, a única pessoa em um raio de quatro quilômetros que poderia ouvi-la está a cinco metros, em cima de um telhado.""",
 acoes=[
  dict(id='chamar', texto='Abrir a janela e chamar o carpinteiro: "Vem ouvir uma coisa."', ir='rv_c5_demo',
   efeitos=dict(flag='a_chamou_ouvir', vinculo=2),
   resultado="""Você abre a janela. O martelo para. De cima, uma cabeça de boné aparece, com a testa franzida de quem esperava uma reclamação. *Vem ouvir uma coisa*, você diz, sem preâmbulo. A cabeça de boné some, a escada de alumínio range, e, em dez segundos, a porta da frente se abre, com o carpinteiro limpando as mãos no jeans, sem perguntar o que é."""),
  dict(id='ensaiar', texto='Tocar mais uma vez, até ter certeza de que ela merece ser ouvida', ir='rv_c5_demo',
   efeitos=dict(flag='a_ensaiou_demo', abalo=1),
   resultado="""Você toca mais uma vez, e outra, e outra. A cada repetição, a música parece menos sua e mais verdadeira. Às quatro e meia, com os dedos doloridos e a ponte ainda aberta, você decide que a única maneira de saber se uma música está pronta é entregá-la a alguém. Abre a janela, e o carpinteiro, que parou de martelar já faz um tempo, está sentado na escada, ouvindo."""),
  dict(id='esconder', texto='Fechar o caderno e a tampa do piano: ainda não, talvez nunca', ir='rv_c5_demo',
   efeitos=dict(flag='a_escondeu_musica', abalo=1),
   resultado="""Você fecha o caderno e a tampa do piano, num gesto que é um reflexo. É a música mais íntima que já escreveu, e a ideia de que outra pessoa a ouça é, de repente, mais nua do que qualquer foto de capa. Do lado de fora, o martelo continua. Você respira devagar, e a porta da frente se abre, sem aviso: o carpinteiro, com um copo de água na mão, pergunta *tudo bem aí?*"""),
 ])

NOS['rv_c5_b'] = dict(tipo='solo', cap=5, seat='B', lugar='Telhado do chalé dos Ashby', hora='Sábado · 15h00',
 texto="""Você está no último quadrante do telhado, o do canto norte, o mais velho e mais teimoso, com um prego de cobre na boca e o cheiro de cedro por todo lado. Há três dias, de dentro do chalé, o som de um piano desafinado começou a chegar pela janela aberta, em pedaços, em notas soltas, em repetições de quem procura.

Hoje, pela primeira vez, as notas se juntam. Você pára de martelar sem decidir. O prego sai da boca, a mão fica no ar. Do chão, a melodia sobe pelo telhado e entra pelo corpo, e é a coisa mais bonita e mais triste que você ouve desde a música do seu pai, aos dezessete.

Você não sabe o que fazer com isso. O silêncio do martelo parou, e você tem consciência de que, dentro da casa, a pessoa que toca também parou.""",
 acoes=[
  dict(id='ouvir', texto='Descer a escada devagar e sentar nos degraus, ouvindo, sem entrar', ir='rv_c5_demo',
   efeitos=dict(flag='b_ouviu_escada', vinculo=2),
   resultado="""Você desce a escada sem fazer barulho e senta no último degrau, de costas para a casa, de frente para o riacho. A música, que vem pela janela, é uma coisa nova, uma música que ninguém nunca ouviu, e você, o primeiro ouvinte do mundo, sente uma responsabilidade absurda: a de ouvir bem."""),
  dict(id='martelar', texto='Continuar martelando em compasso, para acompanhar a música sem interromper', ir='rv_c5_demo',
   efeitos=dict(flag='b_acompanhou_martelo', vinculo=1),
   resultado="""Você volta a martelar, em compasso de quatro por quatro, suave, no tempo da música. Lá dentro, a pessoa ao piano, que ouve, entende. A melodia e o martelo, sem se falar, acertam o mesmo ritmo, e é o primeiro dueto que você faz em quatorze anos: um prego de cobre contra um piano desafinado."""),
  dict(id='bater', texto='Descer e bater na porta, com a desculpa de pedir água, sem coragem de dizer o resto', ir='rv_c5_demo',
   efeitos=dict(flag='b_bateu_porta', vinculo=1),
   resultado="""Você desce e bate na porta, três vezes, em compasso. A música para. A pessoa que abre tem o cabelo desfeito, olhos brilhantes de quem esteve muito dentro de si mesma, e um lápis atrás da orelha. *Água?*, você pergunta. *Água*, ela diz, e vai à cozinha buscar um copo, sem perceber que o sorriso, nos lábios dela, é de quem acaba de ser ouvido."""),
 ])

NOS['rv_c5_demo'] = dict(tipo='dialogo', cap=5, lugar='Sala do chalé dos Ashby', hora='Sábado · 17h00', comeca='A',
 texto="""A sala do chalé tem a luz dourada de fim de tarde, que entra pela janela e cai no piano de armário, no caderno preto, num copo de água e em duas pessoas que, a um metro de distância, se olham como quem espera um veredito.

O violão do pai de {{B.nome}}, que ficou encostado ao corrimão da varanda desde terça, foi trazido para dentro por alguém, sem que ninguém admita ter sido.""",
 turnos=[
  dict(prompt='A primeira frase é sua.', opcoes=[
    op('abre', 'v0_a_abre', '— É uma coisa que eu escrevi. Ninguém nunca ouviu. Eu estou com medo.', se='eu:A', ef=dict(vinculo=1)),
    op('seco', 'v0_a_seco', '— Vou tocar. Sem comentários até o final.', se='eu:A'),
    op('flerte', 'v0_a_flerte', '— Se for ruim, finja que gostou. Se for boa, finja que não percebeu.', se='eu:A'),
    op('cuida', 'v0_b_cuida', '— Senta. Eu fico em pé, perto da janela. Toca.', se='eu:B'),
    op('abre', 'v0_b_abre', '— Eu estou nervos{{eu.o_a}} também. Eu nunca ouvi uma música antes de ela existir.', se='eu:B', ef=dict(vinculo=1)),
    op('seco', 'v0_b_seco', '— Toca. Eu não sou crítico, mas sei quando uma coisa é verdadeira.', se='eu:B'),
  ]),
  dict(prompt='Agora você responde.', opcoes=[
    op('abre', 'v1_b_abre', '— É a melhor coisa que eu ouvi na vida. E eu não sei dizer por quê.', se='eu:B', ef=dict(vinculo=2)),
    op('seco', 'v1_b_seco', '— A ponte não fecha. O resto está ótimo.', se='eu:B'),
    op('flerte', 'v1_b_flerte', '— Eu esperava uma coisa mais complicada. Isso é simples e dói. É o melhor tipo.', se='eu:B'),
    op('abre', 'v1_a_abre', '— A ponte não fecha. Eu sei. Eu não sei como fechar.', se='eu:A', ef=dict(vinculo=1)),
    op('seco', 'v1_a_seco', '— Valeu, mas eu preciso de crítica. Fala do que não funciona.', se='eu:A'),
    op('flerte', 'v1_a_flerte', '— Eu não esperava que um carpinteiro tivesse ouvido tão bom.', se='eu:A'),
  ]),
  dict(prompt='A conversa é sua de novo.', opcoes=[
    op('abre', 'v2_b_abre', '— A ponte pede um acorde de lá menor. Eu tentei uma coisa assim, aos dezessete. Posso mostrar?', se='eu:B', ef=dict(flag='b_deu_acorde', vinculo=2)),
    op('flerte', 'v2_b_flerte', '— Dá licença? Eu estou com o violão. Tem um truque de quem fica quatro anos só com três acordes.', se='eu:B'),
    op('cuida', 'v2_b_cuida', '— Não precisa fechar hoje. Uma ponte que não fecha às vezes é só uma ponte esperando.', se='eu:B'),
    op('abre', 'v2_a_abre', '— Mostra. Eu nunca deixei ninguém mexer numa música minha. Mas eu quero.', se='eu:A', ef=dict(vinculo=2)),
    op('seco', 'v2_a_seco', '— Tenta. Se estragar, eu volto à versão de ontem.', se='eu:A'),
    op('flerte', 'v2_a_flerte', '— Se for ruim, eu acabo com o seu violão.', se='eu:A'),
  ]),
  dict(prompt='A última palavra da sala é sua.', opcoes=[
    op('abre', 'v3_a_abre', '— Funcionou. A ponte fechou. Isso nunca me aconteceu com outra pessoa na sala.', se='eu:A', ef=dict(vinculo=2)),
    op('flerte', 'v3_a_flerte', '— A música é nossa, então. Eu aceito dividir os direitos, mas não o refrão.', se='eu:A'),
    op('seco', 'v3_a_seco', '— Anotado. Amanhã, de novo. Mesma hora.', se='eu:A'),
    op('abre', 'v3_b_abre', '— Eu nunca deixei ninguém ouvir eu tocar uma coisa nova. Hoje foi a primeira vez.', se='eu:B', ef=dict(vinculo=2)),
    op('flerte', 'v3_b_flerte', '— Está bom o violão, né? Ele só toca bem para quem sabe esperar.', se='eu:B'),
    op('seco', 'v3_b_seco', '— Amanhã, de novo. Mesma hora. Eu trago pregos e acordes.', se='eu:B'),
  ]),
 ],
 pool=[
  op('cuida', 'pl_cuida', '— Quer parar um pouco? A mão está cansada.'),
  op('seco', 'pl_seco', '— Ok.'),
  op('flerte', 'pl_flerte', '— Você é melhor do que o seu rádio.'),
  op('abre', 'pl_abre', '— Eu nunca fiz isso com outra pessoa.'),
  op('fere', 'pl_fere', '— Isso é perigoso. Você sabe.'),
 ],
 fecho="""A última nota da ponte, agora fechada, fica no ar por muito tempo, depois que as cordas e as teclas silenciam. A tarde, pela janela, tem a cor de uma pêra madura. E, ao lado do piano, uma cópia do caderno preto, com uma letra de carpinteiro riscada na margem, diz: *e a gente?*""",
 ir='rv_c5_decisao')

NOS['rv_c5_decisao'] = dict(tipo='decisao', cap=5, lugar='Chalé dos Ashby', hora='Sábado · 21h30',
 texto="""A noite cai como uma manta. O jantar, de ovos e pão, foi dividido numa mesa de cozinha sem toalha. O copo de vinho barato, de um vinho que a Doris insistiu em recomendar, esvaziou. O telhado, pronto, tem agora todas as telhas, e a escada de alumínio ainda está encostada.

A música ficou no piano. A conversa ficou na sala. O resto da noite, agora, é uma pergunta.""",
 pergunta='O que vocês fazem com a noite?',
 ir='rv_c5_consente',
 acoes=[
  dict(id='telhado', texto='Subir ao telhado novo, para ver as estrelas e o vale iluminado de vaga-lumes', efeitos=dict(flag='noite_telhado_novo', vinculo=1),
   resultado="""Vocês sobem. As telhas novas guardam o cheiro de cedro, e, do alto, o vale tem vaga-lumes aos milhares, como se o céu tivesse caído e preferido ficar. É a vista mais bonita de Pine Hollow, e só pode ser vista de um telhado que alguém fez."""),
  dict(id='riacho', texto='Descer ao riacho, descalços, e pisar na água fria', efeitos=dict(flag='noite_riacho', vinculo=1),
   resultado="""Vocês descem ao riacho, de pés descalços, e a água, gelada, tira o fôlego. Uma das pessoas ri, a outra também, e, no escuro, com a lua no meio da correnteza, as duas ficam ali, de calças arregaçadas, sem pressa de sair."""),
  dict(id='varanda', texto='Ficar na varanda, com o violão, tocando baixinho, sem pensar em mais nada', efeitos=dict(flag='noite_varanda'),
   resultado="""Vocês ficam na varanda. Um com o violão, outro com o caderno, uma lanterna a querosene no gancho. A noite passa em compasso de quatro por quatro. É uma maneira tranquila de prolongar um dia que nenhum dos dois quer que acabe."""),
 ])

NOS['rv_c5_consente'] = dict(tipo='consentimento', cap=5, lugar='Telhado do chalé dos Ashby', hora='Sábado · 23h10',
 texto="""Às onze e dez da noite, no telhado, com uma manta xadrez sobre os joelhos, as estrelas até o horizonte e a música, ainda, no ar, a conversa chegou a um ponto em que ninguém tem mais nada a dizer. A distância entre os dois, de um palmo, é a menor que já houve, e, ao mesmo tempo, a maior.

O silêncio que sobra tem a forma exata de uma pergunta. Ninguém vai fazê-la em voz alta. Cada um decide por dentro, e só se os dois quiserem alguma coisa acontece.""",
 pergunta='O que você quer?',
 avancar='Beijar. Agora, aqui em cima, sem plano.',
 ficar='Ficar perto, e ainda não atravessar.',
 flag='beijo_telhado',
 irAvancou='rv_c5_sim', irSem='rv_c5_nao')

NOS['rv_c5_sim'] = dict(tipo='segue', cap=5, lugar='Telhado do chalé dos Ashby', hora='Sábado · 23h12', requer=['beijo_telhado'],
 ir='rv_c5_fim',
 texto="""Não é um beijo de clipe. É curto, torto, começa meio sem jeito, porque os dois estão sentados numa telha inclinada e um deles apoia a mão no lugar errado. Depois encontra o lugar certo, e fica. O gosto é de vinho barato e de cedro, e as mãos, que passaram a semana inteira pregando e tocando, sabem o que fazer. A manta xadrez escorrega para as telhas, e ninguém a pega.

Quando se afastam, de olhos abertos, a Via Láctea ocupa o céu inteiro, e um vaga-lume, lá embaixo, acende e apaga como quem faz uma pergunta. Ninguém diz uma palavra. Em Pine Hollow, às onze e doze de uma noite de junho, uma popstar mundial e um carpinteiro da cidade são, por um instante, só duas pessoas que se acharam.""")

NOS['rv_c5_nao'] = dict(tipo='segue', cap=5, lugar='Telhado do chalé dos Ashby', hora='Sábado · 23h12', exclui=['beijo_telhado'],
 ir='rv_c5_fim',
 texto="""Nada acontece, e nada acontecer também diz alguma coisa. Os dois ficam onde estão, a um palmo um do outro, olhando os vaga-lumes lá embaixo, com a manta xadrez dividida sobre os joelhos. Um vaga-lume, mais corajoso, sobe até a altura do telhado, pisca duas vezes e vai embora.

Um dos dois, depois de um minuto, diz *está tarde*, e o outro responde *é*. Nenhum se mexe. É a conversa mais curta e mais cheia da semana.""")

NOS['rv_c5_fim'] = dict(tipo='fim', cap=5, lugar='Telhado do chalé dos Ashby', hora='Domingo · 00h20',
 texto="""À meia-noite e vinte, no telhado, a escada de alumínio ainda encostada, a noite fria e o vale cheio de vaga-lumes. {{se flag:beijo_telhado}}O gosto de vinho barato e de cedro ainda está na boca de cada um. {{/se}}{{se !flag:beijo_telhado}}O que não aconteceu está entre os dois, como uma terceira pessoa de manta xadrez. {{/se}}{{se flag:noite_telhado_novo}}As estrelas, o telhado e os vaga-lumes eram uma cena que ninguém planejou. {{/se}}{{se flag:noite_riacho}}Os pés ainda estão frios do riacho, e a pele ainda lembra a água. {{/se}}{{se flag:noite_varanda}}O violão, encostado ao corrimão, guarda o calor das mãos que o tocaram. {{/se}}{{se flag:b_deu_acorde}}O acorde de lá menor, na ponte, é a primeira coisa que alguém mudou numa música sem estragá-la. {{/se}}

A pessoa que mora na casa, depois de um silêncio comprido, desce a escada de alumínio com o cuidado de quem tem pernas pouco confiáveis. Do último degrau, olha para cima, para o carpinteiro, que ficou no telhado, com a manta nos joelhos. A luz da lanterna, no gancho da varanda, dá ao rosto dela uma cor que não é a de nenhum palco.

— Eu não posso — diz ela, ou ele, em voz tão baixa que o riacho quase cobre. — Eu não posso me envolver. Eu vou embora em agosto.""",
 gancho="Uma frase dita do último degrau: eu vou embora em agosto.",
 ir='rv_c6_lago')
