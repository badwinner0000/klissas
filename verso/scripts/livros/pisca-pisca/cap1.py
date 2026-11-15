# Pisca-Pisca · Capítulo 1 · O apagão (quarta, 17 de dezembro de 2025)
L = 'Rua das Acácias'
NOS = {}

NOS['pp_c1_rua'] = dict(tipo='segue', cap=1, lugar=L, hora='Quarta, 17 de dezembro · 18h58', npcs=['rosangela'],
 ir={'A': 'pp_c1_a', 'B': 'pp_c1_b'},
 texto="""Rua das Acácias, quarta-feira, 17 de dezembro, seis e cinquenta e oito da noite. A rua tem duzentos metros de ladeira e doze casas, e em dezembro dá para ver o brilho dela lá da estrada, quilômetros abaixo, como um fósforo riscado no meio do morro.

Hoje é a Ligação das Luzes. Desde 2014 a cidade inteira sobe a ladeira com copo de quentão na mão para ver as duas casas do fundo, a 140 e a 147, uma de frente para a outra, acenderem tudo ao mesmo tempo. Depois cada um vota em qual fez o Natal mais bonito. A 140 é dos Calazans: cinco mil lâmpadas, um trenó no telhado e um Papai Noel de plástico cujo braço mecânico o seu Wando promete consertar desde 2019. A 147 é dos Beltrame: nenhum trenó, nenhum Papai Noel, só fios de luz quente que passam entre as janelas, descem pelo pé de goiaba e formam no quintal uma constelação que o povo chama de *a goiabeira de vidro*. Em onze anos, a 140 ganhou oito.

A prefeita Rosângela Pimenta, de brincos em forma de pinheirinho, pega o microfone da barraca de pastel.

— Dez! — conta ela, e a rua conta junto. Os dois fiscais de colete olham o medidor com cara de quem preferia estar em casa. — Nove! Oito!

No três, o transformador do poste da esquina faz o barulho de uma lata de biscoito sendo chutada. No dois, a luz do poste pisca duas vezes. No um, as cinco mil lâmpadas da 140 e os fios da goiabeira acendem juntos, e por um segundo e meio a Rua das Acácias é a coisa mais bonita do estado de Minas Gerais.

Depois apaga. A rua, o morro, o bairro, a cidade. Santa Rita do Mirante inteira, de uma vez, como se alguém tivesse soprado.""")

NOS['pp_c1_a'] = dict(tipo='solo', cap=1, seat='A', lugar='Calçada da casa 140', hora='Quarta, 17 de dezembro · 19h01',
 texto="""Escuro total, e você segura a prancheta contra o peito como se ela pudesse segurar a rua no lugar. Na prancheta, quatro folhas, uma para cada trecho da Ligação, com horário, amperagem e o nome de quem cuida de cada tomada. A folha da casa 140 está toda em azul, e a letra é a sua.

O seu pai, Wando, jura que não foi nada, que foi o poste. A sua mãe, Eunice, com a mão no peito, diz que foi a gambiarra do 147, que ela sempre avisou. O Dudu, de onze anos, quer saber se agora vale ponto. Do outro lado da rua, as vozes dos vizinhos já viraram um zum-zum de gente escolhendo um culpado.

Você tem uns dez segundos antes que a rua escolha.""",
 acoes=[
  dict(id='quadro', texto='Ligar a lanterna do celular e ir direto ao quadro de disjuntores', ir='pp_c1_praca',
   efeitos=dict(flag='a_quadro', abalo=1),
   resultado="""Você contorna a casa pelo corredor lateral com a luz do celular na mão. O quadro fica atrás da máquina de lavar, e todos os disjuntores estão no lugar. Nenhum caiu. Você confere duas vezes, porque conferir duas vezes é o seu jeito de acreditar.

O problema não está dentro da casa. Está fora dela, e fora é justo onde você manda menos."""),
  dict(id='acusar', texto='Dizer em voz alta que foi a gambiarra do 147', ir='pp_c1_praca',
   efeitos=dict(flag='a_acusou', abalo=1),
   resultado="""Você levanta a voz para a rua inteira ouvir: que a Ligação estava no horário, que a 140 estava dentro da carga combinada, que a goiabeira de vidro nunca teve projeto nenhum. A sua mãe aprova com um *isso mesmo*.

Do outro lado da rua, ninguém responde, e é pior do que se tivessem respondido. A frase fica no ar com o gosto de coisa dita antes de ter certeza."""),
  dict(id='contar', texto='Contar quem está na calçada, um por um, antes de pensar em qualquer outra coisa', ir='pp_c1_praca',
   efeitos=dict(flag='a_contou'),
   resultado="""Você conta baixinho: o seu pai, a sua mãe, o Dudu, a vizinha do 138 com o neto no colo, o seu Valdomiro de escada na mão, a dona Nena segurando uma travessa de bolo no escuro. Doze casas, trinta e uma pessoas, todas respirando.

Do outro lado da rua, a avó dos Beltrame está num banquinho, de xale, e levanta dois dedos na sua direção, como quem avisa que está tudo bem. Você levanta dois dedos de volta antes de se lembrar de que não deveria."""),
  dict(id='olhar', texto='Ficar olhando a casa da frente no escuro, sem fazer nada', ir='pp_c1_praca',
   efeitos=dict(flag='a_olhou', abalo=1),
   resultado="""Você não consegue deixar de olhar. A 147 no escuro é só uma casa: o telhado, a goiabeira com os fios apagados, a varanda com a mesa onde, dos seus oito aos catorze anos, você fez dever de casa com quem mora ali hoje.

Faz dois anos que vocês não dizem uma frase inteira um para o outro. Você sabe a data exata e acha ridículo saber."""),
 ])

NOS['pp_c1_b'] = dict(tipo='solo', cap=1, seat='B', lugar='Varanda da casa 147', hora='Quarta, 17 de dezembro · 19h01',
 texto="""No escuro, a casa inteira prende a respiração. A sua avó Dirce, acostumada a apagão desde o tempo do lampião, não sai do banquinho. A sua mãe, Silvana, que chegou do plantão há vinte minutos e ainda está de jaleco, pergunta por uma lanterna. A Maju, de nove anos, grita lá do alto da goiabeira que *dá para ver a cidade inteira apagada daqui!*

Na mesa da varanda, ao lado do pote de clipes, está o seu caderno de capa verde, aberto no desenho de hoje. Agora que a luz acabou, ele ficou à vista de quem passar com uma lanterna.""",
 acoes=[
  dict(id='telhado', texto='Subir no telhado para ver até onde vai o apagão', ir='pp_c1_praca',
   efeitos=dict(flag='b_telhado'),
   resultado="""Você sobe pela goiabeira, que conhece como a palma da mão, e do telhado enxerga o que a rua não enxerga: a cidade toda apagada, os morros ao fundo recortados em preto e, por cima de tudo, de repente, as estrelas de verdade, aquelas que só aparecem quando alguém desliga o mundo.

Em dez anos você nunca viu esse céu daqui. Pensa, sem querer, que daria um bom projeto de iluminação: o contrário da luz, que é saber onde deixar o escuro."""),
  dict(id='caderno', texto='Esconder o caderno de desenhos antes que alguém passe com uma lanterna', ir='pp_c1_praca',
   efeitos=dict(flag='b_caderno', abalo=1),
   resultado="""Você atravessa a varanda no escuro, fecha o caderno e enfia debaixo do pote de clipes. Lá dentro, quarenta e duas páginas de projetos que ninguém viu: pontes de luz entre as árvores, uma praça com fios descendo do coreto, a goiabeira na escala certa, cotas, setas.

Ninguém da sua família sabe o que está ali. Ninguém sabe que, em outubro, você se inscreveu numa faculdade de arquitetura a seiscentos quilômetros daqui."""),
  dict(id='vela', texto='Acender as velas de emergência com a avó antes que ela tente sozinha', ir='pp_c1_praca',
   efeitos=dict(flag='b_vo'),
   resultado="""Você chega ao banquinho antes que ela se levante. A avó Dirce guarda, para emergência, uma caixa de velas cor-de-rosa de aniversário no armário, e acende a primeira com a mão firme dos oitenta e um anos. *Guardar a coisa certa para a hora errada*, ela diz, *é a minha especialidade.*

Em cinco minutos a varanda tem sete velas e cheiro de festa de criança."""),
  dict(id='calar', texto='Ficar quieto no escuro enquanto a rua inteira procura um culpado', ir='pp_c1_praca',
   efeitos=dict(flag='b_calou', abalo=1),
   resultado="""Do outro lado da rua alguém levanta a voz, e a palavra *gambiarra* atravessa o asfalto. Você conhece a voz e conhece a frase. Poderia gritar de volta que a goiabeira de vidro tem projeto, que cada fio foi medido em novembro, durante quatro madrugadas.

Fica parado. O silêncio, que você sempre achou neutro, tem peso, e pesa sempre do lado de quem está sendo acusado."""),
 ])

NOS['pp_c1_praca'] = dict(tipo='segue', cap=1, lugar='Praça da Matriz', hora='Quarta, 17 de dezembro · 20h10', npcs=['rosangela', 'valdomiro', 'nena'],
 ir='pp_c1_dialogo',
 texto="""Às oito e dez, a praça da Matriz parece uma festa junina sem festa: duzentas lanternas de celular, cheiro de quentão esfriando e a barraca de pastel funcionando a gás, a única coisa da cidade que não depende de fio. Em cima do coreto, com o megafone numa mão e um prato de bolo de fubá na outra, está a prefeita Rosângela.

— Gente, é o seguinte! — grita ela, e o megafone, sem bateria, só faz um som de gaita. Ela desiste dele e fala de peito. — O transformador queimou. A companhia de energia diz que o bairro da Rua das Acácias passou da carga, e passou porque, como todo mundo sabe, há onze anos duas casas desta cidade tratam a rede elétrica como ringue de boxe.

A praça faz *ooooh*. {{se flag:a_acusou}}A prefeita levanta a mão antes que alguém comece: — Não quero saber de quem foi a culpa. Já ouvi a rua inteira dizer, e dizer de novo.{{senao}}A prefeita levanta a mão antes que alguém comece: — Não quero saber de quem foi a culpa.{{/se}}

— Decreto de emergência! — Ela mastiga o bolo e continua. — Este ano a Rua das Acácias não acende separada. O transformador da cidade aguenta uma coisa só: uma árvore, aqui no meio da praça, doze metros, com as luzes das duas casas somadas, ligada de uma vez na Ceia da Praça, dia 24, às sete da noite. Se acender, tem Natal em Santa Rita. Se não acender, a cidade passa o Natal à luz de vela, e a rua passa o ano seguinte explicando por quê.

O seu Valdomiro, eletricista aposentado, levanta a mão e a escada ao mesmo tempo. A dona Nena oferece o galpão da cooperativa e a sala dos fundos. {{se flag:b_telhado}}Alguém jura que viu uma silhueta no telhado da 147 durante o apagão, olhando para o céu, e o povo ri.{{/se}}

— Falta quem toque o projeto — diz a prefeita. — Os adultos das duas casas não se falam desde 2013 e eu não tenho tempo de ser árbitra. Então vão os dois mais novos que já são maiores de idade. {{A.nome}} e {{B.nome}}. Sete noites. Nem um dia a menos.""")

def op(tom, tag, texto, se=None, ef=None, acao=False):
    d = dict(tom=tom, tag=tag, texto=texto)
    if se: d['se'] = se
    if ef: d['efeitos'] = ef
    if acao: d['acao'] = True
    return d

NOS['pp_c1_dialogo'] = dict(tipo='dialogo', cap=1, lugar='Praça da Matriz', hora='Quarta, 17 de dezembro · 20h42', comeca='A',
 texto="""A praça esvazia aos poucos, em grupos, cada grupo com a sua opinião. Sobram a fonte seca, o coreto, o cheiro de pastel frio e duas pessoas de lados opostos da rua que agora ficaram do mesmo lado de um decreto. A prefeita deixou o megafone encostado no coreto e uma ordem no ar: *se resolvam*.

A primeira frase em dois anos vai ter que sair de alguém.""",
 turnos=[
  dict(prompt='A primeira frase é sua.', opcoes=[
    op('seco', 't0_horario', '— Galpão da cooperativa, amanhã, sete da noite. Leva a planta da sua casa que eu levo a da minha.', ef=dict(flag='a_marcou')),
    op('abre', 't0_nao_pedi', '— Eu não pedi nada disso. Mas também não vou fingir que a gente não se conhece.', ef=dict(vinculo=1)),
    op('flerte', 't0_megafone', '— Dois anos sem se falar e a prefeita resolve no megafone. Eu teria planejado pior.'),
  ]),
  dict(prompt='Agora é a sua vez de responder.', opcoes=[
    op('seco', 't1_planta', '— Eu levo a planta. Só não espere que seja bonita.', se='tom[0]:seco'),
    op('abre', 't1_sem_jeito', '— Eu nunca soube o que dizer para você. Foi por isso, lá atrás. Não foi por mal.', se='tom[0]:seco', ef=dict(vinculo=1)),
    op('fere', 't1_horario', '— Você marcou o horário antes de perguntar se eu podia.', se='tom[0]:seco'),
    op('cuida', 't1_dia_longo', '— Valeu pela sinceridade. O dia foi longo para todo mundo.', se='tom[0]:abre'),
    op('seco', 't1_ok', '— Tá. Então a gente faz a árvore e fica por isso mesmo.', se='tom[0]:abre'),
    op('flerte', 't1_conhece', '— Conhecer é muito dizer. Eu conheço a sua letra de prancheta.', se='tom[0]:abre'),
    op('flerte', 't1_pior', '— Pior? Com a Dona Nena de supervisora e a prefeita de fiscal? Duvido.', se='tom[0]:flerte'),
    op('seco', 't1_nao_rir', '— Não achei graça.', se='tom[0]:flerte'),
    op('abre', 't1_tambem', '— Eu também não sei se aguento sete noites. Mas aguento a primeira.', se='tom[0]:flerte', ef=dict(vinculo=1)),
  ]),
  dict(prompt='A conversa é sua de novo.', opcoes=[
    op('cuida', 't2_vo', '— A vela da sua avó foi a única que acendeu na rua. Ela está bem?', ef=dict(flag='a_perguntou_vo')),
    op('seco', 't2_regra', '— Regra um: a gente não discute na frente da Dona Nena. Ela conta tudo.'),
    op('fere', 't2_gambiarra', '— E tira da cabeça que a gambiarra foi minha. A sua goiabeira também não é santa.', ef=dict(abalo=1)),
  ]),
  dict(prompt='A última palavra da noite é sua.', opcoes=[
    op('abre', 't3_goiabeira', '— A goiabeira não é gambiarra. Eu medi cada fio, em novembro, quatro noites.', ef=dict(flag='b_revelou_goiabeira', vinculo=1)),
    op('seco', 't3_amanha', '— Amanhã. Sete horas. Eu levo a planta.'),
    op('cuida', 't3_descansa', '— Vai para casa descansar. Amanhã a gente começa de verdade.'),
  ]),
 ],
 pool=[
  op('abre', 'pl_cansaco', '— Estou cansad{{eu.o_a}} demais para brigar hoje.'),
  op('seco', 'pl_anotado', '— Anotado. Próximo assunto.'),
  op('flerte', 'pl_caso', '— Que ano para escolher para a gente se falar de novo.'),
  op('cuida', 'pl_escuro', '— Cuidado na ladeira. Está tudo escuro.'),
  op('fere', 'pl_antigo', '— Dois anos de silêncio e eu é que sou a difícil?'),
 ],
 fecho="""Ninguém aperta a mão de ninguém. Mas as lanternas de dois celulares apontam, ao mesmo tempo, para a ladeira, e os dois descem na mesma direção, a quatro passos de distância um do outro. É a distância exata de quem se conhece bem demais.""",
 ir='pp_c1_regra')

NOS['pp_c1_regra'] = dict(tipo='decisao', cap=1, lugar='Praça da Matriz', hora='Quarta, 17 de dezembro · 21h05',
 texto="""No começo da ladeira, em frente à padaria fechada, a conversa precisa de um jeito. As duas casas têm manuais de funcionamento opostos, e as duas pessoas que as representam herdaram o dever de defender o seu.

Antes de dormir, falta combinar a regra número um.""",
 pergunta='Qual é a regra número um do galpão?',
 ir={'A': 'pp_c1_noite_a', 'B': 'pp_c1_noite_b'},
 acoes=[
  dict(id='horario', texto='Horário fixo: das sete às dez, sem atraso e sem desculpa', efeitos=dict(flag='regra_horario'),
   resultado="""Vocês fecham o combinado: das sete às dez, todas as noites, com cinco minutos de tolerância e nenhum de explicação. Quem planeja vai respirar melhor, e quem foge terá hora marcada para não fugir."""),
  dict(id='ideias', texto='Uma ideia maluca por noite, de cada um, e a gente testa as duas', efeitos=dict(flag='regra_ideias', vinculo=1),
   resultado="""Vocês combinam: toda noite, cada um traz uma ideia que seria vergonhosa de apresentar à prefeitura, e as duas são testadas. Nenhuma pode ser descartada antes de acender."""),
  dict(id='passado', texto='Nada de passado até o dia 25', efeitos=dict(flag='regra_passado'),
   resultado="""Vocês acordam um armistício: até o dia 25, ninguém menciona dois anos atrás. A regra é simples, curta, e tem o jeito de uma promessa que vai ser difícil de cumprir."""),
 ])

NOS['pp_c1_noite_a'] = dict(tipo='solo', cap=1, seat='A', lugar='Quarto, casa 140', hora='Quarta, 17 de dezembro · 23h10',
 texto="""Onze da noite e a energia não voltou na rua. Você acende duas velas do armarinho da sua mãe, daquelas de pote com cheiro de canela, e senta na cama com a prancheta azul no colo e o celular com doze por cento de bateria.

Dezoito anos, a vida inteira planejada até março, e a primeira coisa que o dia 17 de dezembro lhe devolve é um nome que você prometeu não abrir.""",
 acoes=[
  dict(id='planilha', texto='Abrir no celular o arquivo antigo: "Plano {{A.nome}} + {{B.nome}} 2030"', ir='pp_c1_fim',
   efeitos=dict(flag='a_planilha', abalo=1),
   resultado="""O arquivo ainda está lá, com as abas coloridas e a data de criação: 14 de dezembro, dois anos atrás. Você escreveu, aos dezesseis, um plano de vida a dois que não tinha nada de romântico: a mesma faculdade, a mesma república, as matérias que fariam juntos, até os horários dos ônibus.

Na época chamou aquilo de carinho. Lendo hoje, parece um contrato que ninguém assinou."""),
  dict(id='apagar', texto='Apagar o arquivo de uma vez, sem abrir', ir='pp_c1_fim',
   efeitos=dict(flag='a_tentou_apagar'),
   resultado="""O celular pergunta se você tem certeza. Você tem certeza por dois segundos e meio, o bastante para o dedo desistir. O arquivo continua lá, pesando quarenta e um kilobytes, que é muito pouco para tanta coisa."""),
  dict(id='rascunho', texto='Escrever uma mensagem para a casa da frente e não enviar', ir='pp_c1_fim',
   efeitos=dict(flag='a_rascunho'),
   resultado="""Você escreve: *Desculpa pelo que eu disse na rua.* Olha a mensagem. Apaga. Escreve: *A gente começa amanhã, às sete.* Apaga. O cursor pisca no campo vazio, no ritmo da vela."""),
 ])

NOS['pp_c1_noite_b'] = dict(tipo='solo', cap=1, seat='B', lugar='Quarto, casa 147', hora='Quarta, 17 de dezembro · 23h10',
 texto="""A cama, o escuro e a goiabeira roçando a janela. Você pega a lanterna e o caderno de capa verde, que a sua avó, passando pelo corredor, fingiu não ver.

Lá embaixo a rua dorme sem luz. Daqui dá para ouvir o motor do gerador do vizinho e, do outro lado, o murmúrio de uma casa onde alguém também está acordado.""",
 acoes=[
  dict(id='desenhar', texto='Desenhar a árvore da praça de memória, antes que a ideia passe', ir='pp_c1_fim',
   efeitos=dict(flag='b_desenhou'),
   resultado="""Você desenha doze metros em quatro minutos: o tronco de cabos trançados, a copa em espiral e, no alto, uma estrela que não é estrela, mas um conjunto de oito lâmpadas girando devagar. Ao lado, em letra de projeto, escreve: *carga total: ???*

A pergunta ocupa mais espaço na página do que o desenho."""),
  dict(id='rasgar', texto='Arrancar a página do caderno e esconder no forro da mochila', ir='pp_c1_fim',
   efeitos=dict(flag='b_escondeu', abalo=1),
   resultado="""Você arranca a folha sem fazer barulho. É a primeira vez em anos que alguém, mesmo que só você, vê o seu desenho fora do caderno. Dobra em quatro e enfia no forro da mochila, junto do comprovante de inscrição da faculdade que ninguém da casa sabe que existe."""),
  dict(id='mensagens', texto='Abrir a conversa antiga com a casa da frente e ler as últimas mensagens', ir='pp_c1_fim',
   efeitos=dict(flag='b_leu'),
   resultado="""A última mensagem é de dois anos atrás: a foto de uma planilha colorida com um título comprido e a pergunta *o que você achou?*. Embaixo, no balão azul, a sua resposta: nenhuma.

Os dois anos de silêncio cabem inteiros nesse espaço em branco."""),
 ])

NOS['pp_c1_fim'] = dict(tipo='fim', cap=1, lugar=L, hora='Quinta, 18 de dezembro · 02h07',
 texto="""À meia-noite e doze a energia volta em Santa Rita do Mirante inteira, menos na Rua das Acácias, que passa a noite escura, com doze casas de vela na janela e um poste mudo na esquina. {{se flag:regra_horario}}Das sete às dez, tinha ficado combinado, e a rua dorme com o horário na cabeça. {{/se}}{{se flag:regra_ideias}}Uma ideia maluca por noite, tinha ficado combinado, e a rua dorme sem imaginar que ideia será essa. {{/se}}{{se flag:regra_passado}}Nada de passado até o dia 25, tinha ficado combinado, e a rua dorme com o passado inteiro ao lado da cama. {{/se}}

Às duas e sete da manhã, dois celulares vibram ao mesmo tempo, um em cada casa. O mesmo recado, de um número que nenhum dos dois tem salvo:

*A estrela da árvore não vai ser comprada. Ela já existe. Está no galpão desde 1987. Amanhã, às sete. Eu abro. V.*""",
 gancho="Quem guardou uma estrela por trinta e oito anos, e por que as duas famílias nunca mais falaram dela?",
 ir='pp_rascunho_fim')
