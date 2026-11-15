# Sob o Sol da Toscana · Capítulo 3 · A Aula
NOS = {}

def op(tom, tag, texto, se=None, ef=None, acao=False):
    d = dict(tom=tom, tag=tag, texto=texto)
    if se: d['se'] = se
    if ef: d['efeitos'] = ef
    if acao: d['acao'] = True
    return d

NOS['ts_c3_aula'] = dict(tipo='segue', cap=3, lugar='Palazzo San Niccolò, Università di Siena', hora='Segunda · 10h00', npcs=['bellandi', 'giulia'],
 ir={'A': 'ts_c3_a', 'B': 'ts_c3_b'},
 texto="""A aula de Cultura Italiana acontece numa sala de teto abobadado, com afrescos desbotados de santos que olham, de cima, com paciência de quem já viu muitas gerações de estudantes. Há quarenta carteiras, quatro janelas, um projetor de 2004 e um professor, Alessandro Bellandi, sessenta anos, de blazer de veludo cotelê e lenço no pescoço, que entra sem pressa, bate com o nó do dedo na lousa e diz, em inglês com sotaque de ópera:

— Senhoras e senhores, a arte italiana não se estuda. Se vive. E, como vocês não podem viver tudo, vão estudar um pedacinho, em dupla.

Ele distribui, sem olhar, uma lista de obras de Siena e arredores. *Uma obra, duas pessoas, quinze minutos de apresentação, em dezembro.* As duplas, anuncia, serão formadas por ele, *segundo um critério que eu não explico*. O critério, descobre-se em dois minutos, é a ordem em que as pessoas estão sentadas. Duas carteiras, a quarta e a quinta da segunda fila, ficam lado a lado.

— Vocês — diz o professor, apontando as duas, sem olhar. — Palazzo Pubblico. Ambrogio Lorenzetti. *O Bom e o Mau Governo.* Boa sorte.""")

NOS['ts_c3_a'] = dict(tipo='solo', cap=3, seat='A', lugar='Sala de aula, Palazzo San Niccolò', hora='Segunda · 10h40',
 texto="""Você acha que ouviu *Lorenzetti*, e que *Lorenzetti* é um pintor, e que *O Bom e o Mau Governo* é uma coisa muito grande, na parede de uma sala, com figuras. Você não anotou nada: estava ocupada em olhar a pessoa da carteira ao lado, que, em quarenta minutos de aula, escreveu duas páginas de anotações à mão, em uma caligrafia tão regular que parece impressa.

A pessoa agora fecha o caderno, devagar, e olha para você pela primeira vez desde a cozinha. Não há sorriso, não há hostilidade, só uma pergunta, em voz baixa, completa e formal: *você já leu alguma coisa sobre Lorenzetti?*

Você tem duas respostas. Uma é mentira. A outra é a verdade, e você, em Los Angeles, já fez muita coisa com a primeira.""",
 acoes=[
  dict(id='verdade', texto='Dizer a verdade: não, nunca, e que não anotou nada porque estava distraída', ir='ts_c3_dividir',
   efeitos=dict(flag='a_disse_nao_li', vinculo=1),
   resultado="""— Não — você diz. — Nada. Eu nem sei quem é. Eu estava distraíd{{eu.o_a}}. — A pessoa da carteira ao lado assente, sem julgar. *Eu imaginei*, diz. *A primeira aula sempre é difícil.* Há uma pausa em que você espera um sermão, e ele não vem. Em vez disso, abre o caderno e rasga, com cuidado, uma folha, que estende por cima da mesa: *pode copiar as minhas anotações. Depois a gente conversa.*"""),
  dict(id='mentir', texto='Dizer que sim, claro, que já viu algumas coisas, e improvisar com um nome de museu', ir='ts_c3_dividir',
   efeitos=dict(flag='a_blefou', abalo=1),
   resultado="""— Claro — você diz, com o sorriso de dez mil festas. — Eu vi umas coisas no Uffizi. — A pessoa ao lado ergue uma sobrancelha, só uma. *Lorenzetti não está no Uffizi*, diz, com a voz de quem corrige uma data. *Está aqui, no Palazzo Pubblico, a duzentos metros.* O seu sorriso, que sempre funcionou, hoje não funciona. A sua cara, por dentro, está pegando fogo."""),
  dict(id='rir', texto='Rir, assumir que não sabe nada e pedir que a outra pessoa explique, como se fosse uma aposta', ir='ts_c3_dividir',
   efeitos=dict(flag='a_riu_de_si', vinculo=2),
   resultado="""Você ri, alto, de verdade, e a risada enche a sala, e três cabeças se viram. *Eu não sei NADA*, você diz, *me explica, por favor, como se eu tivesse cinco anos.* A pessoa ao lado, em vez de se incomodar, fica um segundo parad{{B.o_a}}, e a sua boca, a que nunca sorri, faz um movimento no canto, curto, que desaparece antes de se completar. *Aos cinco anos*, diz a voz, *eu já lia Vasari.* E, dessa vez, a sobrancelha é de brincadeira."""),
 ])

NOS['ts_c3_b'] = dict(tipo='solo', cap=3, seat='B', lugar='Sala de aula, Palazzo San Niccolò', hora='Segunda · 10h40',
 texto="""Você sabe tudo sobre Ambrogio Lorenzetti. Sabe que o afresco, de 1338 a 1339, ocupa três paredes da Sala dos Nove, no Palazzo Pubblico. Sabe que o Bom Governo é uma cidade ordenada, de mulheres que dançam e de mercadores que vendem, e que o Mau Governo é uma cidade de sombra, onde a Tirania tem chifres. Sabe a data de nascimento do pintor, o ano em que morreu de peste, e o nome de duas teses que o discutem.

O que não sabe, e a aula inteira se tornou uma tentativa de resolver, é como se trabalha em dupla com uma pessoa que, em quarenta minutos, trocou de lugar quatro vezes, riu de uma piada de um colega, mandou duas mensagens e desenhou um coração no caderno, na margem de uma anotação sobre afresco.

A pessoa ao lado, que acaba de confessar não saber nada, olha para você, à espera. É a primeira vez que alguém espera de você uma lição que não esteja nos livros.""",
 acoes=[
  dict(id='anotacoes', texto='Rasgar uma folha das suas anotações, com cuidado, e entregar à outra pessoa', ir='ts_c3_dividir',
   efeitos=dict(flag='b_deu_anotacoes', vinculo=2),
   resultado="""Você abre o caderno, onde a caligrafia é perfeita, e rasga uma folha, no pontilhado, com um gesto que, em três anos de curso, jamais fez. Estende por cima da mesa. *Pode copiar*, diz. A mão que pega a folha tem unhas pintadas de coral, descascadas nas pontas. Um toque, de um segundo, nos seus dedos. Você, que organizou a vida para evitar surpresas, não sabe o que fazer com a que acaba de acontecer."""),
  dict(id='regras', texto='Propor um método de trabalho, claro e dividido por etapas, antes de qualquer outra coisa', ir='ts_c3_dividir',
   efeitos=dict(flag='b_propos_metodo'),
   resultado="""— Proponho um método — você diz, e tira do fichário um papel, com uma tabela. — Sábado, biblioteca, das nove às dezessete. Domingo, escrita. Segunda a quinta, revisão. A apresentação é no dia dezesseis de dezembro. — A outra pessoa lê a tabela, que tem vinte e duas linhas, e emite um som de quem se afoga e ri ao mesmo tempo. *Você tem uma LINHA para o lanche?*, pergunta a outra pessoa. Você tem. É a linha doze."""),
  dict(id='calar', texto='Não dizer nada, só olhar a outra pessoa por um instante e voltar ao caderno', ir='ts_c3_dividir',
   efeitos=dict(flag='b_calou_aula', abalo=1),
   resultado="""Você não diz nada. Olha, por um instante, para o rosto ao lado, o da risada alta e da distração, e volta ao caderno. A mão, sozinha, escreve uma frase, no alto da página, que nada tem a ver com Lorenzetti: *{{A.ele_ela}} não sabe nada, e não tem vergonha disso.* Você risca a frase, duas vezes, e a tinta fica, mesmo assim, legível."""),
 ])

NOS['ts_c3_dividir'] = dict(tipo='dividir', cap=3, lugar='Biblioteca Comunale degli Intronati, Siena', hora='Sábado · 09h00', cada=1,
 texto="""A Biblioteca Comunale degli Intronati ocupa um palácio de tijolos ao lado do Duomo, com um saguão de mármore, escadas de ferro forjado e uma sala de leitura com mesas de madeira escura, abajures de bronze verde e vinte e quatro prateleiras de livros que cheiram a poeira, a cola e a séculos. Às nove da manhã de sábado, está vazia, exceto por um bibliotecário de óculos que lê um jornal e por duas pessoas, de cada lado de uma mesa grande, com livros empilhados no meio.

Sobre a mesa, uma única lâmpada, de abajur verde, ilumina as duas.""",
 pergunta='Como você começa?',
 acoes=[
  dict(id='ler', texto='Pegar o livro mais grosso da pilha e ler, em silêncio, até entender o essencial', efeitos=dict(flag='leu_a_fundo', vinculo=1),
   resultado="""Você pega o livro mais grosso, um tijolo de quinhentas páginas em italiano e inglês, abre no capítulo sobre o Palazzo Pubblico e lê. As primeiras páginas são difíceis, as seguintes, estranhamente claras. Em uma hora, você sabe quem foi Lorenzetti, o que é o Bom Governo e por que a mulher de vestido branco, no meio do afresco, se chama *Concordia*. Quando ergue os olhos, a outra pessoa está olhando, e desvia, rápido."""),
  dict(id='perguntar', texto='Perguntar à outra pessoa o que é o essencial, e ouvir a explicação, como se fosse uma aula particular', efeitos=dict(flag='pediu_aula', vinculo=2),
   resultado="""Você pergunta, e a pessoa do outro lado da mesa, depois de um segundo de surpresa, explica. Fala baixo, em frases curtas, sem gírias, apontando a gravura do livro com a ponta do lápis. *Aqui, o Bom Governo. Aqui, a Justiça. Aqui, a Concórdia, com uma plaina na mão. É uma alegoria, mas é uma cidade verdadeira.* A explicação dura meia hora. Você, que nunca prestou atenção em aula, não perde uma palavra."""),
  dict(id='desenhar', texto='Pegar o caderno e desenhar o que entende, no lugar de escrever, como faz para pensar', efeitos=dict(flag='desenhou_afresco'),
   resultado="""Você pega o caderno de moda, o de croquis, e desenha, no lugar de escrever. A Concórdia, de vestido longo, de mangas largas; as dançarinas do Bom Governo, de saias em redemoinho; a Tirania, de capa preta. Em quarenta minutos, tem doze figurinos, rápidos, de linha firme. A pessoa do outro lado da mesa, sem querer, parou de ler para olhar o desenho de cabeça para baixo."""),
 ],
 desfecho="""Às onze, o relógio da biblioteca bate, duas badaladas finas, e a sala, que parecia vazia, está cheia de uma coisa que não é som. As duas ergueram os olhos ao mesmo tempo, e se olham por um segundo comprido. Alguém, de leve, ri de uma frase que leu, e a outra, sem saber por quê, também.""",
 ir='ts_c3_dialogo')

NOS['ts_c3_dialogo'] = dict(tipo='dialogo', cap=3, lugar='Biblioteca degli Intronati', hora='Sábado · 13h00', comeca='A',
 texto="""Ao meio-dia e meia, a biblioteca fecha para o almoço, e o bibliotecário, com um pigarro, convida as duas a continuar no pátio. No pátio, um claustro de arcos, uma fonte seca e um limoeiro em um vaso grande, as duas se sentam num banco de pedra, com um pacote de panini que a Giulia, por mensagem, mandou *comer, vocês duas, agora*.

O sol da Toscana, em outubro, é a coisa mais próxima de um abraço que o planeta oferece.""",
 turnos=[
  dict(prompt='A primeira frase é sua.', opcoes=[
    op('flerte', 'n0_a_flerte', '— Você sabe que ri quando acha que ninguém está vendo? Eu vi duas vezes.', se='eu:A'),
    op('abre', 'n0_a_abre', '— Eu li o capítulo inteiro. Eu nunca li um capítulo inteiro. Foi, tipo, uma conquista.', se='eu:A', ef=dict(vinculo=1)),
    op('seco', 'n0_a_seco', '— O panini é de tomate seco. Eu odeio tomate seco. Eu como mesmo assim.', se='eu:A'),
    op('seco', 'n0_b_seco', '— Eu não rio quando acho que ninguém está vendo. Eu rio quando uma coisa é engraçada.', se='eu:B'),
    op('abre', 'n0_b_abre', '— Você desenha bem. Muito bem. Eu não esperava.', se='eu:B', ef=dict(vinculo=1)),
    op('cuida', 'n0_b_cuida', '(Abrir o pacote de panini e estender metade, sem olhar.)', se='eu:B', acao=True),
  ]),
  dict(prompt='Agora você responde.', opcoes=[
    op('abre', 'n1_b_abre', '— Eu li Lorenzetti em Boston, aos dezoito anos. Eu nunca vi o afresco de verdade. Tenho medo de que não seja como eu imaginei.', se='eu:B', ef=dict(vinculo=2)),
    op('seco', 'n1_b_seco', '— Eu estudo desde os seis anos. Não é uma conquista. É um hábito.', se='eu:B'),
    op('flerte', 'n1_b_flerte', '— Se você desenhar a Concórdia de novo, eu não me importo de fingir que não vi.', se='eu:B'),
    op('abre', 'n1_a_abre', '— Eu nunca fiquei tanto tempo quiet{{eu.o_a}} com alguém. Foi estranho, e foi bom.', se='eu:A', ef=dict(vinculo=2)),
    op('flerte', 'n1_a_flerte', '— Você me ensinou em meia hora o que a minha escola inteira não ensinou. Eu devia te pagar em panini.', se='eu:A'),
    op('seco', 'n1_a_seco', '— Tá, mas a gente tem que ir ver o afresco. Ao vivo. É a única forma.', se='eu:A'),
  ]),
  dict(prompt='A conversa é sua de novo.', opcoes=[
    op('abre', 'n2_a_abre', '— A minha família é toda barulho. Eu aprendi a falar para ninguém ouvir o que eu não digo.', se='eu:A', ef=dict(flag='a_contou_familia', vinculo=2)),
    op('flerte', 'n2_a_flerte', '— E a sua? Aposto que o jantar lá é com guardanapo de pano e um tema de conversa.', se='eu:A'),
    op('seco', 'n2_a_seco', '— Vamos voltar. Ainda falta metade da pilha.', se='eu:A'),
    op('abre', 'n2_b_abre', '— A minha família é toda silêncio. Eu aprendi a estudar para ninguém ouvir o que eu não digo.', se='eu:B', ef=dict(flag='b_contou_familia', vinculo=2)),
    op('seco', 'n2_b_seco', '— A minha mãe espera média nove. É a única conversa que temos.', se='eu:B'),
    op('flerte', 'n2_b_flerte', '— O guardanapo é de papel. Mas o tema, acertou.', se='eu:B'),
  ]),
  dict(prompt='A última palavra do pátio é sua.', opcoes=[
    op('abre', 'n3_a_abre', '— A gente podia fazer o trabalho juntas, de verdade. Eu quero.', se='eu:A', ef=dict(vinculo=1)),
    op('flerte', 'n3_a_flerte', '— Se a gente ganhar nota dez, eu te pago um gelato. Dos grandes.', se='eu:A'),
    op('seco', 'n3_a_seco', '— Combinado. Amanhã, de novo. Mesmo horário.', se='eu:A'),
    op('abre', 'n3_b_abre', '— Eu também quero. Mas eu não sei se sei fazer isso. Dividir.', se='eu:B', ef=dict(vinculo=1)),
    op('seco', 'n3_b_seco', '— Combinado. Domingo, escrita. Eu levo o chá.', se='eu:B'),
    op('cuida', 'n3_b_cuida', '— Eu tento. Eu prometo que eu tento.', se='eu:B'),
  ]),
 ],
 pool=[
  op('cuida', 'pl_cuida', '(Empurrar a garrafa de água para o meio do banco, sem dizer nada.)', acao=True),
  op('seco', 'pl_seco', '(Olhar o limoeiro, que não dá limão nenhum, e fingir interesse.)', acao=True),
  op('flerte', 'pl_flerte', '(Deixar o ombro encostar no outro, por acaso, e não afastar.)', acao=True),
  op('abre', 'pl_abre', '— Eu não sei o que dizer. Mas eu quero continuar aqui.'),
  op('fere', 'pl_fere', '(Fechar o livro de uma vez, com um som seco, e esperar.)', acao=True),
 ],
 fecho="""O sino do Duomo bate uma hora, grave, e o limoeiro, no vaso, balança uma folha. As duas ficam um segundo a mais do que deviam, de pernas esticadas no sol, com os panini abertos nos joelhos. Em Siena, às treze horas, o relógio perde a pressa.""",
 ir='ts_c3_decisao')

NOS['ts_c3_decisao'] = dict(tipo='decisao', cap=3, lugar='Biblioteca degli Intronati', hora='Sábado · 17h00',
 texto="""A biblioteca vai fechar às dezoito, e restam sobre a mesa seis livros, um caderno de croquis, um fichário e uma decisão: como as duas organizam o trabalho a partir dali. A tabela de vinte e duas linhas ainda está na mesa, intacta. O desenho da Concórdia, ao lado, também.""",
 pergunta='Como as duas trabalham juntas daqui para frente?',
 ir={'A': 'ts_c3_noite_a', 'B': 'ts_c3_noite_b'},
 acoes=[
  dict(id='metodo', texto='Pelo método: seguir a tabela de vinte e duas linhas, à risca', efeitos=dict(flag='trabalho_metodo'),
   resultado="""Vocês decidem pela tabela. É uma decisão de quem planeja, e uma das duas, que nunca seguiu uma tabela na vida, concorda com a cabeça e diz *tá, tá bom*, e a outra, que a escreveu, sente, pela primeira vez, que alguém a leu."""),
  dict(id='mistura', texto='Misturar: a tabela de manhã, e a tarde livre, para ver o que sair', efeitos=dict(flag='trabalho_mistura', vinculo=1),
   resultado="""Vocês decidem misturar. De manhã, o método; de tarde, o improviso. Uma risca a linha doze, a do lanche, e escreve, no lugar, *passeio*. A outra olha o papel por um segundo comprido e não corrige. É a primeira alteração no plano que alguém faz sem pedir licença, e é aceita."""),
  dict(id='livre', texto='Sem plano: trabalhar quando der vontade, no ritmo que cada dia pedir', efeitos=dict(flag='trabalho_livre', abalo=1),
   resultado="""Vocês decidem sem plano. É a decisão de uma das duas e a concessão da outra, e as duas sabem. A tabela fica dobrada, no fundo do fichário, com as vinte e duas linhas em branco por cumprir. Ninguém diz nada, e o desenho da Concórdia, sobre a mesa, parece, de repente, um mapa."""),
 ])

NOS['ts_c3_noite_a'] = dict(tipo='solo', cap=3, seat='A', lugar='Apartamento, Casa Bianchini', hora='Sábado · 23h10',
 texto="""Em casa, você toma banho primeiro, deixa a água correr até a cozinha esfriar, e deita na cama de ferro de camiseta velha, de olhos fechados, a um palmo de uma pessoa que, em silêncio, folheia o caderno de croquis que você deixou sobre a cômoda.

A folha em que você desenhou a Concórdia está solta, aberta, sob a luz do abajur. Você ouve o papel virar. Não finge dormir, desta vez. Fica ali, na cama, com a respiração de quem espera uma crítica.

— Isso aqui está errado — diz a voz ao lado, baixo. — A plaina da Concórdia não tem esse ângulo. Mas a linha do vestido... a linha do vestido é melhor do que no afresco.""",
 acoes=[
  dict(id='virar', texto='Virar o rosto, devagar, e olhar a pessoa que acabou de elogiar o desenho', ir='ts_c3_fim',
   efeitos=dict(flag='a_virou_rosto', vinculo=2),
   resultado="""Você vira o rosto no travesseiro. A pessoa ao lado, de óculos de leitura, que você nunca tinha visto, segura o croqui com as duas mãos, e a luz do abajur faz uma coroa de fios de cabelo soltos. {{B.Ele_ela}} não sorri. Mas os olhos, pela primeira vez, não estão corrigindo nada. *Obrigad{{eu.o_a}}*, você diz. *Eu desenhei com raiva.* *Dá para ver*, a voz responde. *É por isso que está bom.*"""),
  dict(id='rir', texto='Rir, baixinho, de alívio, e dizer que era só rabisco', ir='ts_c3_fim',
   efeitos=dict(flag='a_minimizou', abalo=1),
   resultado="""Você ri, baixinho, de nervoso. *Era só um rabisco*, diz. *Eu faço isso quando fico entediad{{eu.o_a}}.* O papel, nas mãos da outra pessoa, para. *Não é rabisco*, a voz diz. A frase fica ali, no escuro, e você, que sempre minimizou tudo o que fazia bem, descobre que o seu riso, hoje, não serve."""),
  dict(id='silencio', texto='Ficar em silêncio, de olhos fechados, e deixar o elogio existir', ir='ts_c3_fim',
   efeitos=dict(flag='a_ficou_quieta', vinculo=2),
   resultado="""Você não diz nada. Fecha os olhos, e deixa o elogio pousar no quarto, sem comentar, sem responder, sem ocupar com piada. É a primeira vez, em anos, que alguém diz uma coisa boa a seu respeito e você a recebe sem dizer nada em troca. O silêncio, que sempre foi uma ameaça, é, por uns minutos, uma casa."""),
 ])

NOS['ts_c3_noite_b'] = dict(tipo='solo', cap=3, seat='B', lugar='Apartamento, Casa Bianchini', hora='Sábado · 23h10',
 texto="""Você não consegue ler. Pela primeira vez em três anos, a meta de trinta e duas páginas parece uma obrigação absurda, e o livro, aberto sobre as pernas, está de cabeça para baixo. Na cômoda, o caderno de croquis que a pessoa ao lado esqueceu aberto mostra uma página de desenho: a Concórdia, de vestido, com uma linha tão segura que você olha por um minuto inteiro.

Do outro lado da cama, a pessoa dorme, ou finge, de lado, de costas para a luz, com a mão fora da colcha. Você olha a mão, e, sem saber como, tem a mesma sensação que teve quando viu o afresco pela primeira vez em uma gravura: a de que existe uma coisa maior do que o que se aprendeu.

Você pensa em dizer algo. Pensa na frase, e na frase seguinte, e na que viria depois.""",
 acoes=[
  dict(id='elogiar', texto='Dizer, baixo, que a linha do vestido é melhor do que a do afresco', ir='ts_c3_fim',
   efeitos=dict(flag='b_elogiou_desenho', vinculo=2),
   resultado="""— Isso aqui está errado — você diz, baixinho, e o tom é o de uma correção. — A plaina da Concórdia não tem esse ângulo. — Uma pausa. — Mas a linha do vestido é melhor do que no afresco. — A pessoa, que fingia dormir, vira o rosto. Os olhos, no escuro, brilham. *Obrigad{{A.o_a}}*, diz. Você sente que acaba de fazer a coisa mais difícil do mês: dizer uma coisa boa em voz alta."""),
  dict(id='guardar', texto='Fechar o caderno de croquis, pôr de volta na cômoda e não dizer nada', ir='ts_c3_fim',
   efeitos=dict(flag='b_guardou_elogio', abalo=1),
   resultado="""Você fecha o caderno com a ponta dos dedos, como quem fecha a porta do quarto de um desconhecido, e o põe na cômoda, na mesma posição. O elogio, que ficou na ponta da língua, vai embora com a luz do abajur. Você deita, de olhos abertos, e a coisa que não disse, por algum motivo, pesa mais do que a que diria."""),
  dict(id='copiar', texto='Pegar um papel e, à luz do abajur, copiar o traço do vestido, para ver se aprende', ir='ts_c3_fim',
   efeitos=dict(flag='b_copiou_traco', vinculo=1),
   resultado="""Você pega uma folha do fichário e tenta copiar a linha do vestido, com o lápis de escrever, sem fazer barulho. O traço sai duro, quadrado, de quem aprendeu a escrever e não a desenhar. Você tenta de novo, de novo. Na quinta vez, a linha, por um segundo, se curva. É uma curva pequena. Mas é a sua, e você a olha com uma ternura que não sabe a quem atribuir."""),
 ])

NOS['ts_c3_fim'] = dict(tipo='fim', cap=3, lugar='Casa Bianchini, Siena', hora='Domingo · 08h00',
 texto="""No domingo, às oito, o sol bate na persiana verde e desenha, no teto de madeira, uma grade de listras. {{se flag:trabalho_metodo}}Na mesa da cozinha, a tabela de vinte e duas linhas está pregada com fita, e a linha doze, a do lanche, foi marcada em verde. {{/se}}{{se flag:trabalho_mistura}}Na mesa da cozinha, a tabela de vinte e duas linhas tem uma linha riscada, e, no lugar, uma palavra a lápis: *passeio*. {{/se}}{{se flag:trabalho_livre}}Na mesa da cozinha, a tabela de vinte e duas linhas, dobrada, repousa no fundo do fichário. {{/se}}{{se flag:a_virou_rosto}}No travesseiro, uma pessoa de óculos de leitura segura um croqui, e outra, a seu lado, vira o rosto para olhar. {{/se}}{{se flag:b_elogiou_desenho}}Uma frase, dita baixo, *a linha do vestido é melhor*, ainda não foi respondida de verdade. {{/se}}

Quando as duas, quase ao mesmo tempo, chegam à cozinha, encontram, por baixo da porta, um papel dobrado em quatro, com uma letra de pena, tremida e enorme, em italiano. Uma das duas, a que estudou o idioma, lê em voz baixa, traduzindo:

*Sábado vem temporal, o primeiro do outono. Levem o guarda-chuva grande, o verde, que está atrás da porta. Só tem um. Não briguem por ele. — Ottavia.*

Atrás da porta, de fato, pendurado no gancho, um guarda-chuva verde, de cabo de madeira, comprido, de tamanho de duas pessoas muito próximas.""",
 gancho="Um temporal anunciado, um só guarda-chuva e o aviso: não briguem por ele.",
 ir='ts_c4_chuva')
