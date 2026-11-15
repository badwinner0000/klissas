# A Última Promoção · Capítulo 7 · A manhã seguinte
NOS = {}

def op(tom, tag, texto, se=None, ef=None, acao=False):
    d = dict(tom=tom, tag=tag, texto=texto)
    if se: d['se'] = se
    if ef: d['efeitos'] = ef
    if acao: d['acao'] = True
    return d

NOS['up_c7_manha'] = dict(tipo='segue', cap=7, lugar='Corredor do 4º andar, Hotel Imperial', hora='Domingo · 03h20',
 ir=[dict(se='flag:beijo_cafe', ir='up_c7_consente'), dict(ir='up_c7_sem_beijo')],
 texto="""O corredor do quarto andar do Imperial tem tapete vermelho com um desenho de rosas, castiçais de bronze e um silêncio de lã. Às três e vinte da manhã, a luz é amarela e baixa, e os passos, mesmo cuidadosos, fazem um som que parece um comentário.

Na porta do 412, com o cartão dourado na mão e a pergunta ainda no ar, dois candidatos a uma vaga que talvez nunca tenha existido ficam parados, como duas pessoas diante do primeiro degrau de uma escada.

{{se flag:confessou_valuation}}Uma delas disse a verdade sobre o valuation, e a outra a ouviu. {{/se}}{{se flag:confessou_prejuizo}}Uma delas disse a verdade sobre o rombo da empresa, e a outra a ouviu. {{/se}}{{se flag:a_confessou_menor}}Uma delas contou uma meia verdade, e a outra a aceitou como uma verdade inteira. {{/se}}{{se flag:b_confessou_menor}}Uma delas contou uma meia verdade, e a outra a aceitou como uma verdade inteira. {{/se}}""")

NOS['up_c7_consente'] = dict(tipo='consentimento', cap=7, lugar='Porta do quarto 412, Hotel Imperial', hora='Domingo · 03h22', requer=['beijo_cafe'],
 texto="""A porta, de mogno escuro, tem um olho mágico de bronze e um número em relevo: 412. O cartão está na mão. Dentro, uma cama king, um sofá de metro e sessenta e cinco, e as regras que os dois assinaram em um papel do hotel, três noites atrás, uma delas sobre *território neutro*.

Ninguém diz nada. Cada um, por dentro, decide o que a próxima hora vai ser.""",
 pergunta='O que você quer?',
 avancar='Entrar juntos, e deixar a noite acontecer.',
 ficar='Entrar, cada um no seu lado, e deixar a noite ser só uma noite.',
 flag='noite_412',
 irAvancou='up_c7_noite', irSem='up_c7_noite')

NOS['up_c7_noite'] = dict(tipo='segue', cap=7, lugar='Quarto 412, Hotel Imperial', hora='Domingo · 03h30', requer=['beijo_cafe'],
 ir='up_c7_acorda',
 texto="""{{se flag:noite_412}}A porta fecha atrás dos dois com o clique suave de uma fechadura de hotel de luxo, e o mundo, do lado de fora, diminui de tamanho. A cama king, que durante três noites foi uma fronteira, deixa de ser uma coisa para medir. A luz do abajur é amarela. O Ring, lá embaixo, está em silêncio, e a cortina, de damasco, se mexe sozinha com uma corrente de ar da janela entreaberta.

Há uma pausa em que os dois, que passaram a semana inteira a medir o que dizer, não dizem nada. Depois, a noite se encarrega do resto, e é uma noite que o mundo, por educação, não descreve.

Lá fora, em algum ponto de Viena, um bonde amarelo passa em silêncio.{{senao}}Os dois entram. O clique suave da fechadura de hotel de luxo ecoa no quarto, e a cama king, que durante três noites foi uma fronteira, continua sendo uma fronteira. Cada um se troca no banheiro, cada um escolhe o seu lado do colchão, cada um se deita de costas, com uma colcha por cima e os olhos abertos para um teto de gesso com rosáceas.

Não há travesseiro no meio, desta vez. Há dez centímetros de espaço, e o espaço pesa. Ninguém tenta atravessá-lo, e, de algum modo, os dois sabem que essa também é uma resposta. Por volta das quatro, uma respiração mais lenta indica que um dos dois, afinal, adormeceu.{{/se}}""")

NOS['up_c7_sem_beijo'] = dict(tipo='segue', cap=7, lugar='Quarto 412, Hotel Imperial', hora='Domingo · 03h30', exclui=['beijo_cafe'],
 ir='up_c7_acorda',
 texto="""Os dois entram. A fechadura de hotel de luxo faz o seu clique, e a cama king, que durante três noites foi uma fronteira, continua sendo uma fronteira. Do café, ninguém trouxe nada além do cheiro de vinho e de papel de jornal nas roupas.

Cada um se troca no banheiro, cada um escolhe o seu lado, cada um se deita de costas, a um palmo de distância, com os olhos abertos para um teto de gesso com rosáceas. O que quase aconteceu, na mesa de mármore, ocupa o espaço no meio do colchão, e é uma presença que não cabe em nenhuma das regras escritas no papel do hotel.

Pelas quatro da manhã, a respiração do outro lado finalmente fica regular.""")

NOS['up_c7_acorda'] = dict(tipo='dialogo', cap=7, lugar='Quarto 412, Hotel Imperial', hora='Domingo · 09h40', comeca='B',
 texto="""{{se flag:noite_412}}Acordar com a luz de Viena pelas cortinas de damasco, às nove e quarenta, ao lado de alguém que, três dias antes, era uma concorrente, é uma experiência que nenhuma planilha previu. O quarto cheira a sabonete de hotel e a café requentado. Os lençóis têm a forma de duas pessoas que, de algum modo, pararam de ser duas.{{/se}}{{se !flag:noite_412}}Acordar com a luz de Viena pelas cortinas de damasco, às nove e quarenta, sem ter sido nada além de colegas num colchão, é uma experiência que nenhuma planilha previu. O quarto cheira a sabonete de hotel e a café requentado. O espaço no meio do colchão continua lá, e ninguém sabe se é uma muralha ou uma ponte.{{/se}}

O sol, oblíquo, atravessa a cortina e desenha no tapete um retângulo dourado. Alguém, em voz baixa, começa a dizer alguma coisa.""",
 turnos=[
  dict(prompt='A primeira frase é sua.', opcoes=[
    op('abre', 'j0_b_abre', '— Bom dia. Eu dormi melhor do que em cinco anos de escritório.', se='eu:B', ef=dict(vinculo=1)),
    op('flerte', 'j0_b_flerte', '— Você fala dormindo. Eu anotei tudo. Vou usar na negociação.', se='eu:B'),
    op('seco', 'j0_b_seco', '— Bom dia. Eu peço o café da manhã. Você quer o quê?', se='eu:B'),
    op('abre', 'j0_a_abre', '— Eu não sei o que dizer. Isso, para mim, é novidade.', se='eu:A', ef=dict(vinculo=1)),
    op('flerte', 'j0_a_flerte', '— Você ronca. Baixinho. É quase simpático.', se='eu:A'),
    op('seco', 'j0_a_seco', '— Bom dia. São 9h40. O brunch do congresso é às onze.', se='eu:A'),
  ]),
  dict(prompt='Agora você responde.', opcoes=[
    op('abre', 'j1_a_abre', '— Eu também não. E, curiosamente, não estou com medo.', se='eu:A', ef=dict(vinculo=1)),
    op('cuida', 'j1_a_cuida', '— Pede o café. Eu quero o forte, com leite quente. Valeu, se eu já não disse.', se='eu:A'),
    op('seco', 'j1_a_seco', '— Isso não muda o fato de que estamos competindo pela mesma vaga.', se='eu:A', ef=dict(abalo=1)),
    op('abre', 'j1_b_abre', '— Eu estou com medo, na verdade. Mas é do tipo bom.', se='eu:B', ef=dict(vinculo=1)),
    op('cuida', 'j1_b_cuida', '— Eu peço o café. E você fica aí mais cinco minutos. Ninguém está com pressa.', se='eu:B'),
    op('seco', 'j1_b_seco', '— Isso não muda o fato de que somos concorrentes. Mas muda muita coisa.', se='eu:B'),
  ]),
  dict(prompt='A conversa é sua de novo.', opcoes=[
    op('abre', 'j2_a_abre', '— O que a gente faz agora? Eu preciso saber o que você quer, para eu saber o que eu quero.', se='eu:A', ef=dict(vinculo=1)),
    op('flerte', 'j2_a_flerte', '— Podemos fingir que nada aconteceu, mas eu sou péssima mentirosa.', se='eu:A'),
    op('seco', 'j2_a_seco', '— Proponho uma regra: não falamos disso até o fim do congresso. Quarta-feira, e voltamos à conversa.', se='eu:A', ef=dict(flag='propos_regra_silencio')),
    op('abre', 'j2_b_abre', '— O que a gente faz agora? Eu quero que seja você a dizer. Eu aceito qualquer coisa que você disser.', se='eu:B', ef=dict(vinculo=1)),
    op('flerte', 'j2_b_flerte', '— Podemos fingir que nada aconteceu, mas eu sou péssimo mentiroso.', se='eu:B'),
    op('seco', 'j2_b_seco', '— Proponho uma regra: não falamos disso até o fim do congresso. Quarta-feira, e voltamos à conversa.', se='eu:B', ef=dict(flag='propos_regra_silencio')),
  ]),
  dict(prompt='A última palavra da manhã é sua.', opcoes=[
    op('abre', 'j3_a_abre', '— Combinado. Mas, só para constar: o que aconteceu não foi um erro.', se='eu:A', ef=dict(vinculo=1)),
    op('seco', 'j3_a_seco', '— Combinado. Regra: ninguém comenta. Ninguém analisa. Ninguém conta para a Nina.', se='eu:A'),
    op('flerte', 'j3_a_flerte', '— Combinado. Mas quarta, eu quero um jantar de verdade, com garçom e tudo.', se='eu:A'),
    op('abre', 'j3_b_abre', '— Combinado. Mas, só para constar: eu não me arrependo.', se='eu:B', ef=dict(vinculo=1)),
    op('seco', 'j3_b_seco', '— Combinado. Regra: ninguém comenta. Ninguém analisa. Ninguém conta para o meu pai.', se='eu:B'),
    op('flerte', 'j3_b_flerte', '— Combinado. Mas quarta, o jantar é meu, com garçom e tudo.', se='eu:B'),
  ]),
 ],
 pool=[
  op('cuida', 'pl_cuida', '— Quer que eu abra a cortina? Ou fecho?'),
  op('seco', 'pl_seco', '— Ok.'),
  op('flerte', 'pl_flerte', '— O café da manhã não vai ser tão bom quanto o resto.'),
  op('abre', 'pl_abre', '— Eu estou feliz. Isso é assustador.'),
  op('fere', 'pl_fere', '— Isso foi um erro, e nós dois sabemos.'),
 ],
 fecho="""A regra fica no ar como uma promessa de duas pessoas que, em quarenta e oito horas, descobriram que promessas são a única coisa que sabem fazer em dupla. Do lado de fora, o bonde amarelo passa, silencioso, e a Ringstrasse acorda para um domingo de céu limpo.""",
 ir='up_c7_regra')

NOS['up_c7_regra'] = dict(tipo='decisao', cap=7, lugar='Quarto 412, Hotel Imperial', hora='Domingo · 10h30',
 texto="""Uma regra, para valer, precisa de dois. Os dois já a combinaram em voz alta. Falta saber como cada um pretende cumpri-la, e se os dois pretendem a mesma coisa.""",
 pergunta='Como vocês vão agir daqui até quarta?',
 ir={'A': 'up_c7_a', 'B': 'up_c7_b'},
 acoes=[
  dict(id='normal', texto='Agir como se nada tivesse acontecido: colegas, concorrentes, com educação', efeitos=dict(flag='fingir_normal', abalo=1),
   resultado="""Vocês combinam agir normalmente. Colegas em público, concorrentes na sala, educados no corredor. É um plano de adultos com a lógica de crianças, e os dois sabem. Mas é o plano, e planos, quando se cumprem, parecem sempre ser a coisa certa."""),
  dict(id='aberto', texto='Agir abertamente: se alguém perguntar, a verdade; se ninguém perguntar, nada', efeitos=dict(flag='agir_aberto', vinculo=2),
   resultado="""Vocês combinam não esconder nada. Se alguém perguntar, vocês dizem a verdade. Se ninguém perguntar, ninguém diz nada. É uma regra mais difícil do que parece, porque exige que os dois escolham, a cada olhar, não desviar."""),
  dict(id='distancia', texto='Manter distância: passar os próximos dois dias em salas diferentes, e voltar a conversar na quarta', efeitos=dict(flag='manter_distancia'),
   resultado="""Vocês combinam distância. Salas separadas nos painéis, almoços em mesas diferentes, um quarto dividido como se fosse de dois hóspedes que nunca se viram. É a decisão mais prática e a mais triste, e dura menos de um dia, como toda decisão prática e triste."""),
 ])

NOS['up_c7_a'] = dict(tipo='solo', cap=7, seat='A', lugar='Brunch do congresso, Hofburg', hora='Domingo · 11h30', npcs=['marcus'],
 texto="""No brunch do congresso, entre uma mesa de salmão defumado e uma ilha de croissants, o seu celular vibra, em silêncio. Um e-mail, enviado há três minutos, sem saudação, sem assunto, só com duas linhas e uma assinatura:

*Precisamos conversar. Segunda-feira, 8h, na minha sala em Chicago. Sem a outra parte. — M.W.*

Você lê duas vezes. Em onze anos na Meridian, essa frase, *precisamos conversar*, tem um único significado: demissão, ou o aviso de uma. Você olha em volta. A pessoa que dormiu no 412 está do outro lado do salão, de costas, rindo de uma coisa que um delegado sueco disse. Você nunca a viu rir assim.""",
 acoes=[
  dict(id='contar', texto='Atravessar o salão e mostrar o e-mail à pessoa do 412, agora', ir='up_c7_fim',
   efeitos=dict(flag='a_mostrou_email', vinculo=2),
   resultado="""Você atravessa o salão, com o celular na mão. A pessoa do 412 vê o seu rosto antes de ver a tela, e a risada some. Você estende o celular, em silêncio. Depois de dois segundos, ela diz, em voz baixa, uma frase que não está no seu manual: *vem aqui. Fica comigo um minuto.*"""),
  dict(id='guardar', texto='Guardar o e-mail, não dizer nada e esperar até segunda', ir='up_c7_fim',
   efeitos=dict(flag='a_guardou_email', abalo=1),
   resultado="""Você guarda o celular no bolso do blazer. A regra do silêncio, combinada de manhã, sobre outro assunto, agora tem um segundo uso. Você sorri para um delegado alemão, pega um croissant, e a primeira coisa que pensa é que a sua vida, nos últimos dias, anda cheia de assuntos que não pode contar a ninguém."""),
  dict(id='responder', texto='Responder ao Marcus: aceito, mas quero que a pessoa do 412 também esteja', ir='up_c7_fim',
   efeitos=dict(flag='a_exigiu_presenca', abalo=1),
   resultado="""Você digita: *Aceito. Quero a outra parte presente.* A resposta, em quarenta segundos: *Não.* E, logo depois, uma segunda mensagem: *Segunda, 8h. Sozinha.* A palavra *sozinha* é a primeira vez que o Marcus usa o feminino para se referir a você em onze anos, e você sente, pelo mesmo motivo, um frio."""),
 ])

NOS['up_c7_b'] = dict(tipo='solo', cap=7, seat='B', lugar='Brunch do congresso, Hofburg', hora='Domingo · 11h30', npcs=['marcus'],
 texto="""No brunch do congresso, com um prato de ovos mexidos que você não pediu, o seu celular vibra. Um e-mail, de Marcus Webb, com um assunto cheio de pontos de exclamação, algo que ele jamais escreveria sem um motivo:

*{{B.nome}}! Parabéns pelas duas apresentações. A Meridian precisa de gente como você. Jantar hoje, 20h, só nós dois, Restaurante Steirereck. Quero falar do seu futuro. — Marcus.*

Você lê três vezes. A palavra *futuro*, em um e-mail de Marcus, nunca é inocente. O primeiro nome, sozinho, é a segunda coisa estranha. Do outro lado do salão, a pessoa do 412 conversa com uma delegada brasileira, de costas, e você sente, pela primeira vez, que tem um segredo que não pode contar.""",
 acoes=[
  dict(id='mostrar', texto='Mostrar o e-mail à pessoa do 412 e contar do jantar, mesmo sendo uma vantagem', ir='up_c7_fim',
   efeitos=dict(flag='b_mostrou_jantar', vinculo=2),
   resultado="""Você atravessa o salão e estende o celular. A pessoa do 412 lê, devagar. O rosto não muda. Depois, ela devolve o celular e diz, com a voz de quem escolhe cada palavra: *vai. E me conta tudo.* Você percebe que acabou de dar a ela uma informação, e que ela acabou de dar a você uma confiança."""),
  dict(id='guardar', texto='Guardar o e-mail e ir ao jantar sem dizer nada', ir='up_c7_fim',
   efeitos=dict(flag='b_guardou_jantar', abalo=1),
   resultado="""Você guarda o celular. A regra do silêncio, combinada de manhã, ganha um segundo uso. Você sabe que vai ao jantar, e sabe que não vai contar. Sorri para uma delegada alemã, aceita um café e pensa que nunca, em quarenta e um anos, teve um segredo tão pequeno e tão pesado."""),
  dict(id='recusar', texto='Responder ao Marcus: valeu, mas prefiro jantar com a equipe', ir='up_c7_fim',
   efeitos=dict(flag='b_recusou_jantar', vinculo=1),
   resultado="""Você digita: *Valeu, Marcus. Prefiro jantar com a delegação.* A resposta chega em três segundos: *Que pena.* E, logo depois, uma segunda mensagem: *Eu insisto.* É a palavra *insisto*, de um homem que nunca insiste, que faz você perceber que há uma coisa nesse jantar que não é um jantar."""),
 ])

NOS['up_c7_fim'] = dict(tipo='fim', cap=7, lugar='Hofburg Congress Center, Viena', hora='Domingo · 13h00',
 texto="""Ao meio-dia, o brunch acaba, a plateia se dispersa e a tarde de domingo se abre em painéis, visitas à Ópera e um passeio de barco no Danúbio. {{se flag:fingir_normal}}Os dois, de acordo, são educados no corredor. {{/se}}{{se flag:agir_aberto}}Os dois, de acordo, não se escondem de ninguém. {{/se}}{{se flag:manter_distancia}}Os dois, de acordo, passam a tarde em salas separadas, e a distância dói mais do que o combinado. {{/se}}

{{se flag:noite_412}}O que aconteceu no 412 está em todo lugar e em lugar nenhum, em um olhar de rabo de olho, em uma mão que não se estende e quase se estende. {{/se}}{{se !flag:noite_412}}O que não aconteceu no 412 é o que mais pesa, em um olhar de rabo de olho, em uma mão que não se estende e quase se estende. {{/se}}{{se flag:propos_regra_silencio}}A regra do silêncio foi proposta, e aceita, e já tem cheiro de promessa quebrada. {{/se}}

Às três da tarde, em lados diferentes do Hofburg, dois celulares vibram quase ao mesmo tempo. Cada um recebe uma notificação do mesmo remetente, Chloe Bennett, em Chicago, com a mesma frase, dita de dois jeitos, para duas pessoas que ainda acreditam que a outra não sabe de nada:

*Achei a página dezessete. Preciso que você me ligue hoje, a sós.*""",
 gancho="A estagiária achou a página que faltava, e cada um dos dois pensa que é o único a saber.",
 ir='up_c8_chloe')
