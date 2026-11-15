# A Última Promoção · Capítulo 6 · O momento de verdade
NOS = {}

def op(tom, tag, texto, se=None, ef=None, acao=False):
    d = dict(tom=tom, tag=tag, texto=texto)
    if se: d['se'] = se
    if ef: d['efeitos'] = ef
    if acao: d['acao'] = True
    return d

NOS['up_c6_cafe'] = dict(tipo='segue', cap=6, lugar='Café Sperl, Viena', hora='Domingo · 01h30',
 ir='up_c6_dialogo',
 texto="""O vinho da casa é um Zweigelt tinto, servido em copos de pé curto, e cheira a cereja e a madeira velha. A vela pisca de novo. No canto do salão, o casal de idosos divide a Sachertorte em silêncio, com a ternura de quem não precisa mais de assunto.

Há uma hora, na escadaria do palácio, os dois eram candidatos à mesma vaga. Agora, numa mesa de mármore com marcas de copos de oitenta anos, são só duas pessoas que passaram quarenta horas acordadas, dançaram valsa na frente de quatrocentos executivos e entraram num café por vontade própria.

{{se flag:entrou_na_farsa}}A farsa dos parceiros ficou no palácio, e nenhum dos dois a trouxe. {{/se}}{{se flag:dean_contou_escritorio}}O outro já sabe que o escritório virou casa. {{/se}}{{se flag:joanna_contou_apto}}O outro já sabe do apartamento sem cadeiras. {{/se}}Nenhum dos dois sabe o que dizer, e é essa a melhor notícia da noite.""")

NOS['up_c6_dialogo'] = dict(tipo='dialogo', cap=6, lugar='Café Sperl, Viena', hora='Domingo · 01h50', comeca='A',
 texto="""A segunda taça chega sem ninguém pedir. As conversas de trabalho acabaram na primeira, e o que sobrou é o tipo de assunto que não cabe em planilha: o que cada um faz quando ninguém olha, e por quê.""",
 turnos=[
  dict(prompt='A primeira frase é sua.', opcoes=[
    op('abre', 'i0_a_abre', '— Eu não tenho amigos em Chicago. Tenho colegas, clientes e um sistema de agenda. Tenho a Nina, em Dayton, mas ela é de outra vida.', se='eu:A', ef=dict(vinculo=1)),
    op('flerte', 'i0_a_flerte', '— Você não é como eu imaginava. Eu esperava alguém mais irritante.', se='eu:A'),
    op('seco', 'i0_a_seco', '— O vinho é bom. Isso não é uma confissão, é uma observação.', se='eu:A'),
    op('abre', 'i0_b_abre', '— Eu moro no escritório. Cinco anos. A cama nunca chegou, e eu parei de esperar.', se='eu:B', ef=dict(vinculo=1)),
    op('flerte', 'i0_b_flerte', '— Você dança melhor do que mente. E mente muito bem.', se='eu:B'),
    op('seco', 'i0_b_seco', '— Eu não costumo beber com concorrentes. Hoje é exceção.', se='eu:B'),
  ]),
  dict(prompt='Agora você responde.', opcoes=[
    op('abre', 'i1_b_abre', '— Eu sei como é. Eu tenho cento e doze funcionários e nenhum amigo que não dependa do meu cheque.', se='eu:B', ef=dict(vinculo=1)),
    op('cuida', 'i1_b_cuida', '— Come alguma coisa. Você está pálid{{A.o_a}} de quem não faz refeição. Eu peço o strudel.', se='eu:B'),
    op('seco', 'i1_b_seco', '— Isso é uma tristeza muito organizada.', se='eu:B'),
    op('abre', 'i1_a_abre', '— No escritório? Cinco anos? Isso é... é triste, e eu entendo. Eu sei contar pelas luzes do prédio quando o seu andar apaga.', se='eu:A', ef=dict(vinculo=1)),
    op('cuida', 'i1_a_cuida', '— Você merece uma cama. De verdade. Com lençol e com travesseiro, e com um colchão que não seja o de um hotel.', se='eu:A'),
    op('seco', 'i1_a_seco', '— Isso é uma escolha. Cada um tem a sua.', se='eu:A'),
  ]),
  dict(prompt='A conversa é sua de novo.', opcoes=[
    op('abre', 'i2_a_abre', '— Eu tenho medo de que eu tenha passado a vida inteira provando uma coisa que ninguém estava olhando.', se='eu:A', ef=dict(vinculo=2)),
    op('flerte', 'i2_a_flerte', '— Se eu perder a vaga para você, eu quero que seja uma perda boa. Uma perda com vinho.', se='eu:A'),
    op('fere', 'i2_a_fere', '— Se você ganhar a vaga por causa do sobrenome, eu nunca vou te perdoar.', se='eu:A', ef=dict(abalo=1)),
    op('abre', 'i2_b_abre', '— Eu tenho medo de que todo mundo ache que eu só cheguei aqui porque era o filho do dono.', se='eu:B', ef=dict(vinculo=2)),
    op('flerte', 'i2_b_flerte', '— Se eu perder a vaga para você, eu quero que seja uma perda boa. Com uma pessoa que merece.', se='eu:B'),
    op('fere', 'i2_b_fere', '— Se você ganhar com dados e não com gente, eu nunca vou entender o que você quer de verdade.', se='eu:B', ef=dict(abalo=1)),
  ]),
  dict(prompt='A última palavra da mesa é sua.', opcoes=[
    op('abre', 'i3_a_abre', '— Eu gosto de estar aqui. Com você. Isso é... não é o plano.', se='eu:A', ef=dict(vinculo=2)),
    op('flerte', 'i3_a_flerte', '— Se eu te pedir para ficar mais um pouco, você fica?', se='eu:A'),
    op('seco', 'i3_a_seco', '— É tarde. Eu devia ir.', se='eu:A'),
    op('abre', 'i3_b_abre', '— Eu gosto de estar aqui. Com você. Eu não sei o que é isso, mas eu gosto.', se='eu:B', ef=dict(vinculo=2)),
    op('flerte', 'i3_b_flerte', '— Se você me pedir para ficar mais um pouco, eu fico até o café fechar.', se='eu:B'),
    op('seco', 'i3_b_seco', '— É tarde. Eu acompanho você até o hotel.', se='eu:B'),
  ]),
 ],
 pool=[
  op('cuida', 'pl_cuida', '— Você quer o meu casaco? Está frio perto da janela.'),
  op('seco', 'pl_seco', '— Continua.'),
  op('flerte', 'pl_flerte', '— A vela te favorece.'),
  op('abre', 'pl_abre', '— Eu nunca falei tanto assim com ninguém.'),
  op('fere', 'pl_fere', '— Você sempre foge quando fica perto demais.'),
 ],
 fecho="""A vela, quase no fim, pisca duas vezes. O garçom, de longe, finge que não vê nada. Entre os dois copos, a distância, que era de um braço, agora é de um suspiro.""",
 ir='up_c6_segredo')

NOS['up_c6_segredo'] = dict(tipo='dividir', cap=6, lugar='Café Sperl, Viena', hora='Domingo · 02h20', cada=1,
 texto="""Existe uma coisa que cada um dos dois ainda não disse, a que pesa mais do que as outras, a que fica no fundo da gaveta. O vinho ajuda, e a vela, e o silêncio do casal de idosos. Falta decidir se a noite é a hora.

Uma delas é sobre o que cada um sabe da fusão. A outra, sobre o que cada um fez.""",
 pergunta='O que você confessa?',
 acoes=[
  dict(id='valuation', seat='A', texto='Confessar que foi você quem escreveu o valuation que a Meridian usou para comprar a empresa dele', efeitos=dict(flag='confessou_valuation', vinculo=2),
   resultado="""Você diz, olhando o copo: *fui eu quem escreveu a análise. O valuation da Tillman & Sons. A Meridian usou o meu trabalho para comprar a empresa da sua família.* A pessoa à sua frente fica parada por um tempo longo. Depois, sem raiva, só com cansaço: *eu sei. A Chloe achou o nome da autora numa nota de rodapé. Eu estava esperando você contar.*"""),
  dict(id='menor_a', seat='A', texto='Contar só uma coisa menor: que você chegou a pensar em recusar a promoção, e nunca disse', efeitos=dict(flag='a_confessou_menor'),
   resultado="""Você diz uma coisa verdadeira, menor do que a que pesa: *eu pensei em recusar a promoção. Duas vezes. Nunca disse a ninguém.* A pessoa à sua frente assente, devagar, e entende que a confissão é uma porta entreaberta, e não a sala. Não insiste. É um dos poucos gestos de cuidado que você já recebeu."""),
  dict(id='calar_a', seat='A', texto='Não confessar nada: a vaga continua sendo uma disputa', efeitos=dict(flag='a_calou_segredo', abalo=1),
   resultado="""Você toma um gole de vinho e diz que não tem mais nada a contar. É uma mentira, e tem a firmeza de todas as suas mentiras: curta, completa, sem adjetivo. A pessoa à sua frente sabe que é mentira, e deixa passar, por educação ou por cálculo."""),
  dict(id='prejuizo', seat='B', texto='Confessar que você sabia que a Tillman & Sons perdia dinheiro havia anos e nunca contou a ninguém', efeitos=dict(flag='confessou_prejuizo', vinculo=2),
   resultado="""Você diz, devagar: *a empresa perdia dinheiro há anos. Eu sabia. Eu escondi do meu pai, dos funcionários, de todo mundo. Eu vendi a empresa para não ter que contar que ela já estava vendida.* A pessoa à sua frente fica quieta. Depois, em voz baixa: *a Meridian pagou quarenta e um milhões a mais do que ela valia. Você não escondeu o rombo. Alguém o escondeu por você.*"""),
  dict(id='menor_b', seat='B', texto='Contar só uma coisa menor: que você nunca quis dirigir a empresa do seu pai', efeitos=dict(flag='b_confessou_menor'),
   resultado="""Você diz uma coisa verdadeira, menor do que a que pesa: *eu nunca quis dirigir a empresa. Eu queria ser motorista de caminhão, como o Walter.* A pessoa à sua frente ri, baixo, com os olhos úmidos. A confissão é uma porta entreaberta, e ela a deixa assim."""),
  dict(id='calar_b', seat='B', texto='Não confessar nada: o vinho não é testemunha', efeitos=dict(flag='b_calou_segredo', abalo=1),
   resultado="""Você ergue o copo e diz um *saúde*, o que é uma maneira de dizer que não vai dizer nada. A pessoa à sua frente brinda, sem tirar os olhos de você. Você sabe que ela percebeu. Sabe também que, por enquanto, é a única coisa que você consegue fazer."""),
 ],
 desfecho="""O garçom traz a conta, sem ninguém pedir, e a deixa em cima da mesa, de cabeça para baixo, com a gentileza de quem sabe que ainda não é a hora. Na rua, a chuva começou, uma chuva fina de Viena, que não molha, só enfeita.""",
 ir='up_c6_consente')

NOS['up_c6_consente'] = dict(tipo='consentimento', cap=6, lugar='Café Sperl, Viena', hora='Domingo · 02h40',
 texto="""A vela chegou ao fim, e o fim dela é uma poça de cera clara sobre o mármore. Do lado de fora, a chuva fina faz a rua brilhar. No canto, o casal de idosos já foi embora, e o garçom, de pé junto ao balcão, finge polir um copo.

Entre os dois copos vazios, a mesa tem a largura exata de uma pergunta. Ninguém vai fazê-la em voz alta. Cada um decide por dentro, e só se os dois quiserem alguma coisa acontece.""",
 pergunta='O que você quer?',
 avancar='Beijar. Agora, nesta mesa, sem plano.',
 ficar='Ficar perto, e ainda não atravessar.',
 flag='beijo_cafe',
 irAvancou='up_c6_sim', irSem='up_c6_nao')

NOS['up_c6_sim'] = dict(tipo='segue', cap=6, lugar='Café Sperl, Viena', hora='Domingo · 02h42', requer=['beijo_cafe'],
 ir='up_c6_fim',
 texto="""Não é um beijo de cinema. É um beijo de duas pessoas de quarenta anos que sabem exatamente o que estão fazendo e que, ainda assim, erram o nariz na primeira tentativa. Depois, ele encontra o lugar certo, e fica. O gosto é de Zweigelt e de cera de vela. Do outro lado do salão, o garçom deixa cair uma colher, e o barulho é a única opinião que o mundo tem a oferecer.

Quando se afastam, de olhos abertos, a vela já apagou. Ninguém diz uma palavra. Em Viena, às duas e quarenta e dois da manhã, dois candidatos à mesma vaga são, por um instante, duas pessoas que se acharam.""")

NOS['up_c6_nao'] = dict(tipo='segue', cap=6, lugar='Café Sperl, Viena', hora='Domingo · 02h42', exclui=['beijo_cafe'],
 ir='up_c6_fim',
 texto="""Nada acontece, e nada acontecer também diz alguma coisa. A mesa continua sendo uma mesa, o vinho continua sendo vinho, e a vela, a essa altura só um toco, apaga sozinha. Os dois ficam onde estão, a trinta centímetros um do outro, olhando a chuva fina na janela, em um silêncio que tem a forma exata do que não foi dito.

Do balcão, o garçom pigarreia, e é o som que fecha a noite. Ninguém pede a conta, porque ninguém quer admitir que a conta é o que os traz de volta à realidade.""")

NOS['up_c6_fim'] = dict(tipo='fim', cap=6, lugar='Ringstrasse, Viena', hora='Domingo · 03h10',
 texto="""A chuva parou, e a Ringstrasse tem o cheiro de asfalto molhado e de tílias adormecidas. Os dois caminham de volta ao Imperial, lado a lado, sem se tocar, mas sem se afastar, com os ombros a dez centímetros de distância. {{se flag:beijo_cafe}}O gosto de vinho ainda está na boca de cada um, e a rua, inteira, parece ter virado uma pergunta que ninguém sabe formular. {{/se}}{{se !flag:beijo_cafe}}O que não aconteceu no café caminha com os dois, como uma terceira pessoa que ninguém convidou, e ninguém ousa mencionar. {{/se}}{{se flag:confessou_valuation}}A confissão do valuation, feita no meio do vinho, ainda pesa no ar, e quem a ouviu não a devolveu. {{/se}}{{se flag:confessou_prejuizo}}A confissão do rombo da empresa, feita no meio do vinho, ainda pesa no ar, e quem a ouviu não a devolveu. {{/se}}

Na porta do Hotel Imperial, o porteiro, de cartola e de casaco longo, abre a porta e diz *Guten Morgen*, com a gentileza de quem sabe que três da manhã é hora de bom-dia. Do elevador, o quarto 412 está a quatro andares. No espelho dourado da cabine, duas pessoas olham o mesmo ponto na parede.

Na frente da porta do quarto, com o cartão dourado na mão, uma delas diz a frase que ninguém, em seis noites, tinha ousado dizer em voz alta:

— E agora?""",
 gancho="Três da manhã, a porta do quarto único, e uma pergunta que ninguém sabe responder.",
 ir='up_c7_manha')
