# Pisca-Pisca · Capítulo 5 · A mesa (domingo, 21 de dezembro de 2025)
NOS = {}

def op(tom, tag, texto, se=None, ef=None, acao=False):
    d = dict(tom=tom, tag=tag, texto=texto)
    if se: d['se'] = se
    if ef: d['efeitos'] = ef
    if acao: d['acao'] = True
    return d

NOS['pp_c5_manha'] = dict(tipo='segue', cap=5, lugar='Harmon Place', hora='Domingo, 21 de dezembro · 09h30',
 ir={'A': 'pp_c5_nonna', 'B': 'pp_c5_po'},
 texto="""Domingo de manhã em Dyker Heights tem som de sino e cheiro de café passado. Os sinos são os da igreja de Saint Rose of Lima, duas quadras acima; o café vem de todas as janelas, porque ninguém, nem a Con Edison, consegue impedir um brooklynita de passar café, mesmo à luz de vela, mesmo no escuro.

A luz, aliás, voltou ontem à noite, às nove e quatro, em todas as casas da Harmon Place menos nas duas do fundo, que seguem na lista de espera da companhia. A nº 8 e a nº 11 acordam, cada uma do seu lado, com a casa gelada, a mensagem da Odalys fixada no topo do celular e uma família inteira com perguntas.

*Almoço de domingo, na minha casa, 1h da tarde. As duas famílias. É uma ordem.*

Faltam três horas e meia. Antes da ordem, cada uma das avós tem uma coisa a dizer.""")

NOS['pp_c5_nonna'] = dict(tipo='solo', cap=5, seat='A', lugar='Cozinha da nº 8', hora='Domingo, 21 de dezembro · 10h10',
 texto="""A nonna Concetta Tedeschi tem oitenta e quatro anos, um avental com bordado de limões e a regra de que, na cozinha dela, quem entra sem fome sai com uma fatia de pão de ló. Está de pé, junto ao fogão a lenha que o seu pai nunca teve coragem de tirar, mexendo uma panela de molho que ninguém pediu e que dará para trinta pessoas.

Você chega e encosta no balcão sem dizer boa-dia. Ela não pergunta nada, e a ausência da pergunta é o convite.

— Era uma conversa de telefone, eu disse que não era. — Ela baixa o fogo, olha o molho, não olha você. — O seu nonno Gennaro morreu no dia onze de março de 2012. Cinco dias depois, o velório, na igreja de cima. Veio a rua inteira, veio gente de Staten Island, veio o prefeito, veio o padre Tom. Um só homem não veio.

Ela mexe a colher, em círculos, mais devagar.

— Wing Lau. Vinte e cinco anos de amigo. Estrela feita junto, árvore montada junto, filho batizado quase junto. E não veio. Nem mandou flor. Nem mandou um bilhete. — A colher bate duas vezes na borda da panela. — O seu pai, que ama o próprio pai mais do que a si mesmo, nunca perdoou. E eu, que sou velha e ruim, deixei.""",
 acoes=[
  dict(id='defender', texto='Dizer que deve ter havido uma razão, que ninguém some por cinquenta anos de amizade sem motivo', ir='pp_c5_almoco',
   efeitos=dict(flag='a_defendeu_wing', vinculo=1),
   resultado="""— Deve ter havido uma razão — você diz, e é a primeira vez que você diz uma frase assim naquela cozinha. A nonna levanta os olhos da panela, surpresa, como quem ouve uma língua que já falou. *Se houve, ninguém nunca me contou*, responde. *E eu nunca perguntei.* Pelo jeito como ela diz, você percebe que a segunda frase pesa mais do que a primeira."""),
  dict(id='concordar', texto='Dizer que foi uma falta de respeito que a família tem direito de sentir até hoje', ir='pp_c5_almoco',
   efeitos=dict(flag='a_concordou_nonna', abalo=1),
   resultado="""— Foi falta de respeito — você diz, e a nonna faz que sim, devagar, aliviada de ser compreendida. *É isso, bambina. Foi isso.* Ela põe uma colher de molho no seu pão e você come, sem sentir o gosto, com a sensação de ter acabado de assinar um lado de um contrato que não leu inteiro."""),
  dict(id='silencio', texto='Ficar em silêncio, comer o pão e deixar a nonna terminar o molho', ir='pp_c5_almoco',
   efeitos=dict(flag='a_calou_nonna'),
   resultado="""Você não diz nada. Come o pão, ouve o molho borbulhar, e deixa que a história pese dentro da cozinha sem tentar consertá-la. A nonna, que conhece o seu silêncio melhor do que o seu pai, murmura: *você pensa como o Gennaro. Fica calado e depois faz a coisa certa.*"""),
 ])

NOS['pp_c5_po'] = dict(tipo='solo', cap=5, seat='B', lugar='Varanda da nº 11', hora='Domingo, 21 de dezembro · 10h10',
 texto="""A Pó-pó, oitenta e um anos, de xale cinza e de tigela de congee de gengibre, espera você na varanda, onde a vela rosa de aniversário ainda está meio derretida na mesa. Não pergunta se você dormiu, nem se aquilo no vídeo é verdade. Diz, de olhos no jardim, onde o ginkgo está nu, sem fios:

— Você me mandou uma mensagem às duas da manhã. Uma pergunta que eu já esperava há treze anos.

Ela vira a tigela de congee nas mãos, devagar, como quem escolhe a ordem das palavras.

— Seu avô Wing e o Gennaro Tedeschi fizeram a estrela em 1987. Foram vinte e cinco anos de amigos, de verdade, de ir ao jogo de beisebol juntos. Em março de 2012, o Gennaro morreu. Cinco dias depois, no dia do velório, seu avô estava no Maimonides, numa cama, com o coração parado. Ele pediu que eu fosse até a igreja e dissesse à família Tedeschi o que estava acontecendo. Eu fui até a porta. — A tigela para. — Vi o Sal, o filho, de olhos vermelhos, de terno, na entrada, e não consegui falar. Voltei para o hospital. E fiquei calada. Treze anos.""",
 acoes=[
  dict(id='perdoar', texto='Dizer à Pó-pó que ela não precisava ter carregado isso sozinha', ir='pp_c5_almoco',
   efeitos=dict(flag='b_acolheu_po', vinculo=1),
   resultado="""Você pega a mão dela, a mão pequena de pele fina, e diz que não precisava. A Pó-pó sorri, de um jeito que você nunca viu. *Eu tinha vergonha*, ela diz, *de ter sido covarde justo no dia em que o seu avô precisava que eu fosse corajosa.* E depois, mais baixo: *Eu tinha vergonha de ser um pouco igual a você.*"""),
  dict(id='cobrar', texto='Perguntar por que, em treze anos, ela nunca contou nada a ninguém', ir='pp_c5_almoco',
   efeitos=dict(flag='b_cobrou_po', abalo=1),
   resultado="""— Por que a senhora nunca contou? — você pergunta, mais duro do que quis. A Pó-pó não se defende. *Porque quanto mais o tempo passava, mais difícil ficava abrir a boca. Chega uma hora em que o silêncio vira casa, e você mora nele.* Você pensa, sem querer, em dois anos de mensagens sem resposta."""),
  dict(id='ouvir', texto='Ficar quieto e deixar ela terminar a tigela e a história', ir='pp_c5_almoco',
   efeitos=dict(flag='b_ouviu_po'),
   resultado="""Você não diz nada. A Pó-pó termina o congee, devagar, e fica olhando o ginkgo. O vento mexe um galho nu, e você escuta, pela primeira vez, a própria avó pensar. *Hoje à tarde eu conto o resto*, diz ela, *se a Concetta deixar.*"""),
 ])

NOS['pp_c5_almoco'] = dict(tipo='segue', cap=5, lugar='Casa de Odalys Quiñones', hora='Domingo, 21 de dezembro · 13h00', npcs=['odalys'],
 ir='pp_c5_dividir',
 texto="""A casa de Odalys Quiñones, na Eighty-Fifth, tem uma mesa para dezesseis e uma toalha de plástico com estampa de poinsétias. Quando as duas famílias chegam, cada uma por uma porta, com um prato de comida debaixo do braço por educação, a sala fica do tamanho de um corredor de tribunal.

De um lado, os Tedeschi: Sal, de camisa de domingo, ombros em guarda; Angela, com uma travessa de lasanha que serve de escudo; a nonna Concetta, de bengala e de terço no bolso; e o Nico, de onze anos, que acha tudo aquilo o melhor episódio de série da vida dele.

Do outro, os Lau: Lily, de olheiras de plantão, com um prato de dumplings de nabo; a Pó-pó, de xale e de passos curtos; e a Mei, de nove anos, que conta com cuidado as cadeiras e conclui em voz alta que *são dezesseis lugares e treze pessoas, então três ficam vazios*.

— Sentem — diz Odalys, e tira o megafone de cima da cadeira antes de servir. — E ninguém levanta antes da sobremesa.

Treze pessoas, uma mesa e doze anos de silêncio. Alguém vai ter que quebrar o gelo, e o gelo é fino.""")

NOS['pp_c5_dividir'] = dict(tipo='dividir', cap=5, lugar='Casa de Odalys Quiñones', hora='Domingo, 21 de dezembro · 13h40', cada=1,
 texto="""A primeira meia hora segue o protocolo de uma cúpula diplomática: *passa o sal*, *obrigado*, *está ótimo*. Depois Sal pergunta, sem olhar para ninguém, se alguém sabe quem foi que *puxou a instalação improvisada da nº 11 sem aprovação da companhia*. Lily responde, com o garfo no ar, que a instalação foi aprovada em novembro. Em dois minutos, os dois estão de pé.

No meio da mesa, a poinsétia de plástico balança. As duas avós, uma ao lado da outra por acaso, não dizem nada.""",
 pergunta='O que você faz?',
 acoes=[
  dict(id='interromper', texto='Levantar a voz e pedir que parem os dois', efeitos=dict(flag='interrompeu_briga', vinculo=1),
   resultado="""Você diz *chega*, alto, no meio de uma frase de Sal, e a mesa inteira vira o rosto. O silêncio é tão completo que dá para ouvir o gotejar de uma torneira na cozinha. Ninguém esperava que a pessoa mais calma da família fosse quem pararia a briga. Odalys, de braços cruzados, faz um sinal mínimo de aprovação."""),
  dict(id='sair', texto='Sair da sala sem fazer barulho e esperar na cozinha', efeitos=dict(flag='saiu_da_sala', abalo=1),
   resultado="""Você empurra a cadeira devagar e vai até a cozinha, onde encontra a Mei, de nove anos, de joelhos no chão, fingindo que procura uma colher. *Eu vim aqui para não ouvir*, diz ela, *mas dá para ouvir de qualquer lugar.* Vocês ficam os dois ali, sentados no linóleo, com as vozes dos adultos atravessando a parede como chuva."""),
  dict(id='perguntar', texto='Perguntar, diante de todos, por que as duas famílias pararam de se falar', efeitos=dict(flag='perguntou_a_mesa', abalo=1),
   resultado="""Você pergunta, com a voz firme e o coração aos pulos: *alguém aqui sabe por que a gente parou de se falar?* A mesa fica muda. Sal, com o garfo no ar, olha para a mãe. Lily olha para a sogra. Duas senhoras de xale, de lados opostos da toalha de poinsétias, desviam o rosto no mesmo segundo."""),
 ],
 desfecho="""Nos dez minutos seguintes ninguém grita, e é o silêncio mais perigoso do almoço. Depois da sobremesa, de pé na entrada, as duas famílias se despedem num cumprimento seco, cada uma com a sua versão incompleta da mesma história, e os dois do projeto seguem, sozinhos, para a calçada.""",
 ir='pp_c5_decisao')

NOS['pp_c5_decisao'] = dict(tipo='decisao', cap=5, lugar='Calçada da Eighty-Fifth Street', hora='Domingo, 21 de dezembro · 15h30',
 texto="""Na calçada da casa de Odalys, longe das janelas, os dois ficam parados, cada um com meia história no bolso: a nonna, que culpa o amigo que não veio ao velório, e a Pó-pó, que sabe o que o amigo estava fazendo naquele dia.

Quem tem uma metade da verdade precisa decidir se entrega a outra metade ao dono dela. Para isso, os dois precisam querer a mesma coisa.""",
 pergunta='O que vocês fazem com o que cada um ouviu hoje de manhã?',
 ir='pp_c5_deposito',
 acoes=[
  dict(id='contar', texto='Contar tudo um ao outro, agora, na calçada', efeitos=dict(flag='trocaram_versoes', vinculo=2),
   resultado="""Vocês contam. As duas metades, na boca de duas pessoas de pé na neve, formam uma história inteira em três minutos: um velório, um hospital, um silêncio que nasceu de vergonha e cresceu de orgulho. Quando a segunda metade acaba, nenhum dos dois consegue dizer nada. O vento levanta um pouco de neve da calçada e a joga entre os dois, como uma cortina."""),
  dict(id='esperar', texto='Esperar, e primeiro perguntar cada um à sua avó', efeitos=dict(flag='guardaram_versoes'),
   resultado="""Vocês combinam esperar: cada um pergunta à própria avó o que falta, antes de contar ao outro. É um jeito de proteger duas pessoas velhas de uma verdade que ainda não aprenderam a dizer. Também é um jeito, os dois sabem, de adiar uma conversa que dói."""),
  dict(id='planta', texto='Guardar a história e voltar ao trabalho: a árvore tem prazo', efeitos=dict(flag='voltaram_ao_trabalho'),
   resultado="""Vocês decidem que, por enquanto, a árvore é o único assunto. A história dos avós fica no bolso, ao lado do postal de 1987, até chegar a hora certa. Nenhum dos dois acredita muito na hora certa, mas ambos concordam em fingir que ela existe."""),
 ])

NOS['pp_c5_deposito'] = dict(tipo='segue', cap=5, lugar='Depósito da Kessler Hardware', hora='Domingo, 21 de dezembro · 19h20', npcs=['szymanski'],
 ir='pp_c5_fim',
 texto="""Às sete e vinte, no depósito, sob a lâmpada nua, os dois montam a primeira versão da tabela de carga: uma folha, duas colunas, doze linhas de cálculo. De um lado, a estrela de oito pontas, com oito lâmpadas de vidro soprado. Do outro, o tronco de cabo, a espiral da copa, os quarenta circuitos.

{{se flag:comprou_grosso}}O fio grosso, que custou o envelope inteiro, aguenta o calor de qualquer coisa que os dois inventem. {{/se}}{{se flag:comprou_fino}}O fio fino, barato e leve, só funciona se cada metade da árvore acender separada. {{/se}}{{se flag:comprou_misto}}Um pouco de cada fio, e a tabela precisa de duas colunas só para explicar quem ligou onde. {{/se}}{{se flag:comecou_copa}}Como começaram pela copa, o desenho está lindo e a conta está atrasada. {{/se}}{{se flag:comecou_carga}}Como começaram pela conta, a árvore ainda parece um esqueleto. {{/se}}{{se flag:comecou_junto}}Como a folha passou de mão em mão, cada linha tem duas letras. {{/se}}

Seu Szymanski, que chegou sem fazer barulho, de colete laranja, olha por cima dos ombros dos dois, sem tocar em nada, por um minuto inteiro. Depois pergunta, como quem não quer nada, qual é a soma da coluna da direita.""")

NOS['pp_c5_fim'] = dict(tipo='fim', cap=5, lugar='Depósito da Kessler Hardware', hora='Domingo, 21 de dezembro · 22h10',
 texto="""A soma da coluna da direita, feita três vezes, dá o mesmo resultado, e o mesmo resultado é um número que não cabe. Com a estrela acesa, as quarenta e duas fileiras de fio e as cinco mil lâmpadas da nº 8, a árvore de doze metros puxa quarenta por cento a mais do que o transformador da cidade aguenta.

Ninguém fala por um bom tempo. O seu Szymanski, de colete laranja, tira do bolso uma caneta, risca a última linha da folha e escreve ao lado, com letra de eletricista:

*A carga não fecha. Faltam três dias para alguém descobrir que a árvore tem de ser menor, ou de ser acesa em duas metades, ou de ter menos luz. Qualquer uma das três vai exigir que um de vocês ceda.*

Ele devolve a caneta, sem esperar resposta, e sai.""",
 gancho="Uma árvore de doze metros, um transformador pequeno demais e um jeito de resolver que exige que alguém ceda.",
 ir='pp_rascunho_fim')
