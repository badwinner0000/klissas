# Pisca-Pisca · Capítulo 9 · As duas chaves (quarta, 24 de dezembro, à noite)
NOS = {}

def op(tom, tag, texto, se=None, ef=None, acao=False):
    d = dict(tom=tom, tag=tag, texto=texto)
    if se: d['se'] = se
    if ef: d['efeitos'] = ef
    if acao: d['acao'] = True
    return d

NOS['pp_c9_praca'] = dict(tipo='segue', cap=9, lugar='Cooper Green', hora='Quarta, 24 de dezembro · 18h20', npcs=['odalys', 'szymanski', 'gus'],
 ir='pp_c9_dividir',
 texto="""A Noite da Árvore começa, na verdade, às seis, com a Ceia da Praça: mesas de armar em volta de Cooper Green, toalhas de plástico, travessas de lasanha, dumplings, pierogi da senhora Wójcik, pernil da família Quiñones e o chocolate quente do Gus em um tambor de aço com torneira. Quatrocentas pessoas comem de pé, de gorro, no meio da neve, entre doze metros de árvore apagada e uma tempestade que acabou de passar.

Odalys Quiñones, de megafone, anuncia a ordem do evento com a solenidade de uma cerimônia de posse. O seu Szymanski, de colete laranja, caminha entre as mesas com um multímetro no bolso, como um médico de plantão. A nonna Concetta e a Pó-pó, de cobertor nos ombros, dividem um banco de pedra e uma travessa de biscoitos de amêndoa, e não conversam, mas as duas mastigam no mesmo ritmo.

{{se flag:cabos_misturados}}As duas famílias que seguraram os cabos juntos de manhã não se afastam, como se o gesto tivesse deixado uma cola invisível. {{/se}}{{se flag:sopa_na_kessler}}A sopa do Gus, feita de manhã para todos, virou assunto: alguém já a chama de *a sopa da trégua*. {{/se}}Às seis e quarenta, a nº 8 e a nº 11, ligadas à árvore pelos cabos de aço, estão com as janelas escuras, e o bairro inteiro olha para elas, esperando.

Depois, o seu Szymanski chega, devagar, e fala baixo, de modo que só dois ouvidos escutam: *a estrela não acende. Preciso de vocês dois no depósito. Agora.*""")

NOS['pp_c9_dividir'] = dict(tipo='dividir', cap=9, lugar='Depósito da Kessler Hardware', hora='Quarta, 24 de dezembro · 18h30', cada=1,
 texto="""No depósito, o seu Szymanski acende a lâmpada nua e fecha a porta de ferro. Em cima da mesa de marceneiro, a estrela de oito pontas está aberta, com o motorzinho de relógio à mostra, ao lado da caixa de papelão sem nome, a do X de fita adesiva, que alguém empurrou para o centro da mesa.

— O fio foi emendado, o motor gira, as lâmpadas estão boas. — Ele coça a nuca. — Mas tem uma coisa nessa estrela que eu nunca entendi. Dois fios, dois contatos, duas fechaduras. Como se ela fosse feita para ser ligada por duas pessoas ao mesmo tempo.

Tem vinte e cinco minutos. A pergunta é por onde começar.""",
 pergunta='O que você investiga?',
 acoes=[
  dict(id='caixa', texto='Abrir a caixa do X e ver o que tem dentro', efeitos=dict(flag='abriu_caixa_x', vinculo=1),
   resultado="""Você rasga a fita adesiva, com a unha, devagar. Dentro, enrolado em papel de seda amarelado, há um molho de chaves pequenas, de latão, cada uma com um número gravado, e debaixo delas, dobrado em quatro, um papel de caderno com a letra inclinada e antiga que você já conhece: *Duas chaves. Uma minha, uma do Wing. A estrela só acende quando as duas giram juntas. Assim a gente nunca esquece que uma árvore dá trabalho para dois.*"""),
  dict(id='motor', texto='Examinar o motor da estrela por dentro, procurando a segunda fechadura', efeitos=dict(flag='achou_fechadura', vinculo=1),
   resultado="""Você aproxima a lâmpada nua e, com a ponta de uma chave de fenda, afasta as engrenagens. No fundo do mecanismo, escondida por uma placa de latão, há uma fechadura pequena, redonda, e ao lado dela, a quinze centímetros de distância, uma segunda. Duas fendas, dois contatos, e uma etiqueta amarelada com uma letra apertada, de bigode e de lápis: *tem de ser dois, ao mesmo tempo, senão o motor não parte*."""),
  dict(id='lista', texto='Ler a lista da parede dos fundos, a de cabo-tronco-base-copa-carga-estrela', efeitos=dict(flag='leu_lista_parede'),
   resultado="""Você volta à lista da parede, a que está lá desde a primeira noite, e agora, com a luz nova, lê o que não tinha visto: uma sétima palavra, bem em baixo, quase apagada, na mesma letra inclinada de todas as caixas. *Chave.* E ao lado, a lápis, mais fino, como uma resposta: *duas*."""),
 ],
 desfecho="""Com as três pistas na mesa, o seu Szymanski faz a conta em voz alta, sem olhar para ninguém: duas chaves, duas fechaduras, um segundo exato. Uma chave, diz, ficou com a família do Gennaro. A outra, com a do Wing.""",
 ir={'A': 'pp_c9_chave_a', 'B': 'pp_c9_chave_b'})

NOS['pp_c9_chave_a'] = dict(tipo='solo', cap=9, seat='A', lugar='Praça de Cooper Green', hora='Quarta, 24 de dezembro · 18h42',
 texto="""Você sai do depósito correndo e acha a nonna Concetta onde a deixou, no banco de pedra, com o cobertor nos ombros e o prato de biscoitos no colo. Ela olha você chegar, com a respiração rasa, e antes que você abra a boca, enfia a mão no bolso do avental, entre o terço e um lenço bordado, e tira, num gesto de quem já ensaiou a cena durante treze anos, uma chave pequena de latão presa a um barbante vermelho.

— O seu nonno me deu isso em 2011, uma noite, sem explicar. Disse: *se um dia a estrela não acender, entrega à pessoa mais teimosa dos dois.* — Ela olha, de lado, para a Pó-pó, que dorme sentada ao lado, de boca aberta. — Eu esperei treze anos para saber se era você.""",
 acoes=[
  dict(id='pegar', texto='Pegar a chave e abraçar a nonna', ir='pp_c9_dialogo',
   efeitos=dict(flag='a_pegou_chave', vinculo=1),
   resultado="""Você pega a chave, com a mão trêmula, e abraça a nonna por cima do cobertor, do terço e do prato de biscoitos. O cheiro dela é de talco e de molho de tomate. *Vai*, diz ela no seu ouvido. *E não confere duas vezes. Dessa vez, uma só.*"""),
  dict(id='perguntar', texto='Perguntar à nonna se ela sabia do que o Wing estava fazendo no dia do velório', ir='pp_c9_dialogo',
   efeitos=dict(flag='a_perguntou_wing', abalo=1),
   resultado="""A nonna fica um tempo olhando a Pó-pó dormir. *Eu soube ontem à noite*, ela diz, devagar. *Ela me contou, aqui, neste banco, sem eu perguntar.* Põe a mão sobre a mão da outra velha, que continua dormindo. *Treze anos, minha filha. Treze anos de mulher orgulhosa de cada lado.* Depois olha para você: *vai, e acende isso por nós duas.*"""),
 ])

NOS['pp_c9_chave_b'] = dict(tipo='solo', cap=9, seat='B', lugar='Praça de Cooper Green', hora='Quarta, 24 de dezembro · 18h42',
 texto="""Você sai do depósito e acha a Pó-pó onde a deixou, no banco de pedra, de cobertor, e a nonna Concetta Tedeschi, ao lado, dormindo com a cabeça encostada no ombro dela. As duas, de olhos fechados, parecem as duas metades de uma mesma foto.

A Pó-pó, que não dorme, só fecha os olhos, levanta uma pálpebra e olha você chegar. Sem uma palavra, tira do bolso do xale uma chave pequena de latão, presa a um barbante azul, e, junto dela, um envelope amarelado, fechado com cera, onde se lê, em letra de bigode: *Para Sal Tedeschi. Quando a estrela acender.*

— O seu avô escreveu isso no hospital, em março de 2012. Eu nunca consegui entregar. — Ela põe o envelope na sua mão, com a chave por cima. — Agora você decide.""",
 acoes=[
  dict(id='guardar', texto='Guardar o envelope junto com a chave e entregar só depois que a árvore acender', ir='pp_c9_dialogo',
   efeitos=dict(flag='b_guardou_carta', abalo=1),
   resultado="""Você guarda o envelope no bolso interno do casaco, ao lado da fotografia de 1987, e a chave de latão na mão fechada. Pesa pouco, e pesa tanto que você tem medo de ela cair. A Pó-pó concorda com a cabeça, sem dizer nada: é a resposta que ela teria dado."""),
  dict(id='entregar', texto='Levar o envelope agora ao Sal, na frente da praça inteira, antes de qualquer luz', ir='pp_c9_dialogo',
   efeitos=dict(flag='b_entregou_carta', vinculo=1),
   resultado="""Você atravessa a pracinha, entre mesas e gorros, e para na frente do seu Sal Tedeschi, de camisa de domingo e de copo de chocolate na mão. Estende o envelope sem dizer nada. Ele olha a letra, a cera, a data, e, quando abre a boca para perguntar, você diz só: *foi o meu avô que escreveu para o seu pai. Está atrasado treze anos.* Sal pega o envelope com as duas mãos, e o copo cai na neve."""),
 ])

NOS['pp_c9_dialogo'] = dict(tipo='dialogo', cap=9, lugar='Plataforma da árvore, Cooper Green', hora='Quarta, 24 de dezembro · 18h50', comeca='A',
 texto="""Às seis e cinquenta, os dois chegam, por lados opostos da pracinha, à plataforma de madeira que fica ao pé da árvore, onde os dois interruptores esperam, a dez metros um do outro. Cada interruptor tem uma fechadura. Cada fechadura tem a forma de uma chave pequena de latão.

Dez minutos para sete. Quatrocentas pessoas, em volta, com a respiração suspensa.""",
 turnos=[
  dict(prompt='A primeira frase é sua.', opcoes=[
    op('abre', 'k0_comigo', '— Você tem a sua chave? Eu tenho a minha. A gente só faz isso junto.', ef=dict(vinculo=1)),
    op('seco', 'k0_segundo', '— Um segundo. A gente tem que apertar no mesmo segundo.'),
    op('flerte', 'k0_nervosa', '— Eu estou com as mãos tremendo. Isso nunca me aconteceu na frente de quatrocentas pessoas.'),
    op('cuida', 'k0_respira', '— Respira. Eu estou aqui do outro lado, e eu não vou a lugar nenhum.'),
  ]),
  dict(prompt='Agora é você quem responde.', opcoes=[
    op('abre', 'k1_medo', '— Eu tenho medo de errar o segundo. Eu nunca consegui ser pontual de verdade com ninguém.', ef=dict(vinculo=1)),
    op('seco', 'k1_conto', '— Eu conto até três. Você aperta no três.'),
    op('flerte', 'k1_ritmo', '— Vamos pelo ritmo da música da festa, a do Ansel. Eu sei de cor.'),
    op('cuida', 'k1_olha', '— Olha para mim e não para a árvore. Eu aperto quando você apertar.'),
  ]),
  dict(prompt='A conversa é sua de novo.', opcoes=[
    op('abre', 'k2_quero', '— Eu queria dizer uma coisa antes. Em voz alta. Para todo mundo ouvir.', ef=dict(flag='ia_falar')),
    op('seco', 'k2_depois', '— O que a gente tem de dizer a gente diz depois. Agora é a árvore.'),
    op('flerte', 'k2_ouvir', '— Quatrocentas pessoas. Se a gente errar, é o maior fiasco do Brooklyn.'),
  ]),
  dict(prompt='A última palavra antes do relógio é sua.', opcoes=[
    op('abre', 'k3_juntos', '— Eu confio em você. Aperta comigo.', ef=dict(vinculo=2)),
    op('seco', 'k3_agora', '— Três minutos. Vamos.'),
    op('cuida', 'k3_nao_solta', '— Não solta o meu olhar. Eu não solto o seu.'),
  ]),
 ],
 pool=[
  op('cuida', 'pl_fria', '— Sua mão está gelada. Fica com a minha luva.'),
  op('seco', 'pl_hora', '— Vamos.'),
  op('flerte', 'pl_plateia', '— Quatrocentas testemunhas. Se der certo, vão contar para sempre.'),
  op('abre', 'pl_medo', '— Eu estou com medo, e está tudo bem.'),
  op('fere', 'pl_depois', '— Se der errado, a culpa vai ser da sua pressa.'),
 ],
 fecho="""A Pó-pó e a nonna, de cobertores, acordaram ao mesmo tempo, e agora estão de pé, lado a lado, de mãos dadas, na primeira fila da pracinha. O seu Szymanski, ao lado do transformador, levanta o polegar.""",
 ir='pp_c9_fim')

NOS['pp_c9_fim'] = dict(tipo='fim', cap=9, lugar='Plataforma da árvore, Cooper Green', hora='Quarta, 24 de dezembro · 18h57',
 texto="""Seis e cinquenta e sete. Odalys Quiñones sobe no banco de pedra com o megafone de bateria nova e pede silêncio. O silêncio cai sobre Cooper Green como uma segunda neve.

{{se flag:b_entregou_carta}}Do lado esquerdo da praça, Sal Tedeschi lê uma carta de março de 2012, de joelhos na neve, com as duas mãos tremendo e a esposa de mãos no ombro dele. {{/se}}{{se flag:b_guardou_carta}}No bolso de um casaco, ao lado de uma fotografia de 1987, um envelope fechado com cera espera a luz. {{/se}}{{se flag:a_pegou_chave}}Na mão de {{A.nome}}, uma chave de latão pende de um barbante vermelho. {{/se}}{{se flag:duas_metades}}As duas metades da árvore, uma de cada casa, esperam o mesmo segundo. {{/se}}

— Dez! — grita Odalys, e a praça, de gorro e de copo, grita junto. — Nove! Oito!

Os dois estão cada um diante do seu interruptor, a dez metros, com uma chave de latão na mão, uma fechadura pequena à frente e um segundo exato para acertar. Não há plano B. Quatrocentas pessoas respiram no mesmo ritmo.

— Sete! Seis!

Falta uma coisa que nenhuma chave resolve, e que cada um dos dois sabe dizer, em voz alta, ou calar.""",
 gancho="Seis segundos, duas chaves, quatrocentas testemunhas, e uma coisa que cada um ainda não disse.",
 ir='pp_c10_contagem')
