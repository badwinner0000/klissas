# Pisca-Pisca · Capítulo 3 · A van (sexta, 19 de dezembro de 2025)
NOS = {}

def op(tom, tag, texto, se=None, ef=None, acao=False):
    d = dict(tom=tom, tag=tag, texto=texto)
    if se: d['se'] = se
    if ef: d['efeitos'] = ef
    if acao: d['acao'] = True
    return d

NOS['pp_c3_estrada'] = dict(tipo='segue', cap=3, lugar='Padaria Tedeschi, Thirteenth Avenue', hora='Sexta, 19 de dezembro · 07h15',
 ir='pp_c3_van',
 texto="""A van da Padaria Tedeschi tem um cannoli gigante pintado na lateral e um câmbio que só engata a terceira se você pedir com educação. Angela Tedeschi entrega a chave com uma mão e segura o próprio pulso com a outra, como quem acaba de assinar um papel que não leu.

— Para Nova Jersey. Paterson. Dona Yesenia Delgado, a loja azul com o letreiro de cabo coaxial. Tem fio de oito milímetros que a Home Depot não tem. — Ela olha para o outro lado da calçada, onde alguém da nº 11 espera com um caderno debaixo do braço e um copo de café que não é para dividir. — Volta antes de escurecer. A previsão é de neve.

{{se flag:regra_horario}}Quinze para as oito, cinco minutos de tolerância: vocês chegaram com três de sobra. {{/se}}A Padaria cheira a anis e a canela. No balcão, o Nico, de onze anos, faz sinal de joia para a irmã ou irmão mais velho e depois, por precaução, esconde a mão atrás de um cesto de biscoitos.

— E se a van quebrar — diz Angela, de longe — liga para a prima Fran, em Hoboken. Ela tem sofá.

A van engata a terceira na segunda tentativa, e a rua vira para a ponte.""")

NOS['pp_c3_van'] = dict(tipo='dividir', cap=3, lugar='Van da padaria, Goethals Bridge', hora='Sexta, 19 de dezembro · 08h20', cada=1,
 texto="""Da Gowanus até Paterson são pouco mais de cinquenta minutos, se o trânsito colaborar, e o trânsito de sexta antes do Natal nunca colabora. A van cheira a pão amanhecido, o rádio só pega uma estação de oldies e o aquecedor tem duas posições: *morno* e *incêndio*.

São duas pessoas que se conhecem desde os oito anos, no mesmo banco, com um pé de distância entre elas. Ninguém avisou como se enche esse espaço.""",
 pergunta='O que você faz durante a viagem?',
 acoes=[
  dict(id='musica', texto='Mexer no rádio até achar uma música que os dois conheçam', efeitos=dict(flag='viagem_musica'),
   resultado="""Você gira o botão pelas estações de oldies, de reggaeton, de rádio de notícias, e para numa de rock dos anos noventa que está tocando no meio. Os dois sabem a letra. Nenhum dos dois canta, mas os dois mexem a boca, e por um refrão inteiro a van fica quase confortável."""),
  dict(id='caderno', texto='Tirar o caderno e desenhar a paisagem pela janela, sem mostrar a ninguém', efeitos=dict(flag='viagem_desenho', abalo=1),
   resultado="""Você abre o caderno no joelho e desenha a ponte, a refinaria de Linden, o aviso de *Welcome to New Jersey*. É a primeira vez que desenha com outra pessoa a menos de um metro. A página fica escondida do lado da janela, mas o lápis faz barulho, e o barulho diz o que a mão não diz."""),
  dict(id='silencio', texto='Ficar em silêncio, olhando a estrada, até alguém falar', efeitos=dict(flag='viagem_silencio'),
   resultado="""Você olha a estrada e deixa a van falar sozinha: o motor, o aquecedor, a faixa dupla. O silêncio dura quarenta minutos e dói, mas é um silêncio honesto, do tipo que não finge ser outra coisa. Ao entrar na New Jersey Turnpike, a pessoa ao lado suspira, e você percebe que também estava segurando o ar."""),
 ],
 desfecho="""Aos poucos, o espaço entre os dois bancos mudou de tamanho, ou de natureza. O que era um pé de distância passou a ser só um pé.""",
 ir='pp_c3_loja')

NOS['pp_c3_loja'] = dict(tipo='decisao', cap=3, lugar='Delgado Cable Supply, Paterson, NJ', hora='Sexta, 19 de dezembro · 10h05',
 texto="""A loja azul, com o letreiro de cabo coaxial, é um corredor de três metros de largura e vinte de comprimento, cheio de carretéis como num sonho de eletricista. Dona Yesenia Delgado, de óculos pendurados no pescoço por uma corrente, escuta os dois contarem o projeto sem interromper, e depois mostra, em silêncio, o que tem.

Há duas opções, e o dinheiro das duas casas junto, que vem num envelope dos pais, só cobre uma.""",
 pergunta='Qual fio vocês levam?',
 ir='pp_c3_pane',
 acoes=[
  dict(id='grosso', texto='O fio grosso, de oito milímetros: aguenta a carga inteira, mas é caro e pesado', efeitos=dict(flag='comprou_grosso'),
   resultado="""Vocês levam o fio grosso. Dona Yesenia pesa oitenta quilos de cabo no carrinho, escreve o valor num recibo à mão e avisa, sem erguer a voz: *quem carrega isso na árvore vai querer ter feito academia*."""),
  dict(id='fino', texto='O fio fino, de quatro milímetros: barato e leve, mas só aguenta se dividirem a carga em duas fases', efeitos=dict(flag='comprou_fino', vinculo=1),
   resultado="""Vocês levam o fio fino, o dobro da metragem pelo mesmo preço. Dona Yesenia concorda com a cabeça: *com dois cérebros, dá*. A árvore agora precisa ser ligada em duas partes, e as duas pessoas precisam se entender no segundo exato."""),
  dict(id='misto', texto='Um pouco de cada, e o que sobrar a gente resolve no depósito', efeitos=dict(flag='comprou_misto'),
   resultado="""Vocês levam metade de cada, e dona Yesenia faz a conta em voz baixa, com a calculadora de mesa de teclas gastas. Sobram doze dólares, que ela empurra de volta pelo balcão: *para o chocolate quente, que o dia vai ser longo*."""),
 ])

NOS['pp_c3_pane'] = dict(tipo='segue', cap=3, lugar='New Jersey Turnpike, saída 13', hora='Sexta, 19 de dezembro · 15h40',
 ir='pp_c3_dialogo',
 texto="""A neve começa às três e meia, finíssima, e às quatro já é um lençol que apaga as faixas da estrada. A van da Padaria Tedeschi, com oitenta quilos de fio atrás e dois adolescentes na frente, faz um som de tosse no meio da Turnpike, depois um de pigarro, e por fim para no acostamento da saída treze, em Elizabeth, com o ponteiro da temperatura no vermelho.

{{se flag:comprou_grosso}}O fio grosso pesa uma tonelada, e a van parece ter decidido que não vai carregar mais nem um grama. {{/se}}{{se flag:comprou_fino}}O fio fino é leve, e mesmo assim a van parece ter decidido que não vai carregar nem um grama. {{/se}}{{se flag:comprou_misto}}Metade fina, metade grossa, e a van parece ter decidido que não vai carregar nem um grama. {{/se}}O reboque, pelo telefone, só chega de manhã. A prima Fran, também pelo telefone, responde com três pontos de exclamação e um endereço em Hoboken.

Até o ônibus chegar, os dois têm quarenta minutos de neve, um pacote de pretzel que sobrou do café e um acostamento. Nenhum dos dois consegue ficar calado.""")

NOS['pp_c3_dialogo'] = dict(tipo='dialogo', cap=3, lugar='Skylark Diner, Elizabeth, NJ', hora='Sexta, 19 de dezembro · 17h30', comeca='A',
 texto="""O ônibus 40 deixa os dois, sacudidos e ensopados, na frente do Skylark Diner, que ficou aberto por pura teimosia. Dentro, um letreiro vermelho de neon, cabines de vinil e uma garçonete chamada Doreen, que traz duas canecas de café sem perguntar.

É a primeira vez, em dois anos, que os dois se sentam frente a frente numa mesa, sem nenhuma lista entre eles.""",
 turnos=[
  dict(prompt='A primeira frase é sua.', opcoes=[
    op('cuida', 'v0_frio', '— Você está tremendo. Fica com o meu casaco, eu estou bem.'),
    op('seco', 'v0_plano', '— Reboque às nove da manhã, sofá em Hoboken às sete da noite. Plano B resolvido.'),
    op('flerte', 'v0_doreen', '— Olha só, a Doreen acha que a gente é um casal. Ela trouxe duas colheres para um pudim.'),
  ]),
  dict(prompt='Agora é você quem responde.', opcoes=[
    op('abre', 'v1_obrigado', '— Valeu. Eu fiquei com medo de a gente passar a noite inteira sem falar.', ef=dict(vinculo=1)),
    op('seco', 'v1_pudim', '— Eu não pedi pudim.'),
    op('fere', 'v1_frio', '— Eu sempre fico tremendo quando discuto. Você sabe disso. Ou sabia.', ef=dict(abalo=1)),
  ]),
  dict(prompt='A conversa é sua de novo.', opcoes=[
    op('abre', 'v2_faculdade', '— Tem uma coisa que eu nunca contei para ninguém da minha casa.', ef=dict(flag='confessou_cornell')),
    op('cuida', 'v2_vo', '— Sua avó disse algo sobre a estrela, ontem, quando você chegou?'),
    op('flerte', 'v2_plano', '— Você fez planilha dessa viagem, né? Pode admitir.'),
  ]),
  dict(prompt='A última palavra do jantar é sua.', opcoes=[
    op('abre', 'v3_verdade', '— Eu senti sua falta. Mais do que eu queria sentir.', ef=dict(vinculo=1)),
    op('seco', 'v3_conta', '— Eu pago a conta. Fica por minha conta.'),
    op('flerte', 'v3_tentou', '— Se a neve não parar, você vai ter que dormir de pé no sofá da Fran.'),
  ]),
 ],
 pool=[
  op('cuida', 'pl_come', '— Come alguma coisa. Você não almoçou.'),
  op('seco', 'pl_depois', '— A gente fala disso depois.'),
  op('flerte', 'pl_neon', '— O neon do Skylark te favorece. Tá vermelho no seu cabelo.'),
  op('abre', 'pl_estranho', '— É estranho falar com você sem uma lista na mão.'),
  op('fere', 'pl_cala', '— Pelo menos hoje você não vai fugir. Não tem para onde.'),
 ],
 fecho="""Doreen deixa a conta, dois pedaços de torta que ninguém pediu e uma frase que serve de moral: *neve em dezembro dá liberdade para quem quer ficar*.""",
 ir='pp_c3_sofa')

NOS['pp_c3_sofa'] = dict(tipo='decisao', cap=3, lugar='Apartamento da Fran, Hoboken', hora='Sexta, 19 de dezembro · 21h50',
 texto="""Fran Ruocco, prima de Angela, trinta e cinco anos, gerente de um bar de vinhos, abre a porta de um apartamento de quarenta metros quadrados e uma só cama de casal, e já avisa: *o sofá é de dois lugares e o colchão inflável furou em outubro*.

Ela não faz nenhuma pergunta sobre quem é o outro. Já sabe, pela cara dos dois, e por três dias de mensagens da tia.""",
 pergunta='Como vocês dormem?',
 ir={'A': 'pp_c3_noite_a', 'B': 'pp_c3_noite_b'},
 acoes=[
  dict(id='sofa', texto='Um no sofá, o outro no chão com o travesseiro da Fran', efeitos=dict(flag='dormiu_separado'),
   resultado="""Vocês combinam um sistema: sofá para quem chegou primeiro à porta, e para quem chegou depois, um colchão de casaco e almofada no chão da sala. Fran, da porta do quarto, só levanta uma sobrancelha."""),
  dict(id='revezar', texto='Revezar o sofá: metade da noite cada um', efeitos=dict(flag='dormiu_revezando', vinculo=1),
   resultado="""Vocês acertam: três horas para cada um no sofá, e quem não está dormindo fica acordado na cozinha. O acordo tem um bônus que ninguém menciona: sobrarão duas horas, no meio, em que os dois estarão acordados."""),
  dict(id='cama', texto='Aceitar a cama da Fran, que insiste em dormir no sofá', efeitos=dict(flag='aceitou_cama'),
   resultado="""Fran insiste, com os dois braços cruzados, que ela fica no sofá e vocês ficam com a cama, desde que seja do jeito mais civilizado possível. A cama tem dois travesseiros, uma coberta só e um espaço de um palmo no meio, que ninguém menciona."""),
 ])

NOS['pp_c3_noite_a'] = dict(tipo='solo', cap=3, seat='A', lugar='Apartamento da Fran, Hoboken', hora='Sexta, 19 de dezembro · 01h10',
 texto="""Uma da manhã, e você está acordado na cozinha de uma prima com a luz do fogão acesa, uma caneca de leite morno e a neve caindo do lado de fora da janela, em linha reta, sem vento. No seu celular, aberta desde a van, a conversa de ontem à noite com o número desconhecido: *Pergunte à sua avó por que as duas famílias pararam de se falar. Ela sabe. Não foi 2013.*

A sua nonna Concetta tem oitenta e quatro anos, mora no segundo andar da nº 8 e nunca, em toda a sua vida, falou do vizinho da frente. Você sempre achou que era por educação.""",
 acoes=[
  dict(id='ligar', texto='Ligar para a nonna agora, mesmo que sejam uma da manhã', ir='pp_c3_fim',
   efeitos=dict(flag='a_ligou_nonna', abalo=1),
   resultado="""Ela atende no segundo toque, porque nonna Concetta não dorme: *vigia a casa*. Você pergunta a coisa mais simples: *nonna, por que a gente parou de falar com os Lau?* Do outro lado, três segundos de silêncio, o barulho de um terço de contas contra a madeira, e uma resposta curta:

— Não é uma conversa de telefone. Amanhã, quando você voltar, eu conto. — E desliga."""),
  dict(id='esperar', texto='Deixar a pergunta para depois: a nonna merece o tempo dela', ir='pp_c3_fim',
   efeitos=dict(flag='a_esperou'),
   resultado="""Você guarda o celular. A pergunta fica ali, entre você e o leite que esfria, e vira uma coisa a mais para carregar. Mas há um respeito, que você aprendeu com a própria nonna, em deixar uma pergunta dormir antes de acordá-la."""),
 ])

NOS['pp_c3_noite_b'] = dict(tipo='solo', cap=3, seat='B', lugar='Apartamento da Fran, Hoboken', hora='Sexta, 19 de dezembro · 01h10',
 texto="""Uma da manhã, e você está acordado na sala de uma estranha com o travesseiro de um prédio de Hoboken e a fotografia de 1987 aberta na palma da mão, sob a luz do poste que entra pela janela. Lá fora, a neve cai sem vento.

No celular, a mensagem que chegou duas vezes: *Pergunte à sua avó por que as duas famílias pararam de se falar.* Você pensa na Pó-pó, de camisola, acendendo velas de aniversário durante um apagão. Ela guarda a coisa certa para a hora errada. Talvez ela tenha guardado essa.""",
 acoes=[
  dict(id='mandar', texto='Mandar uma mensagem para a Pó-pó, mesmo sabendo que ela só lê de manhã', ir='pp_c3_fim',
   efeitos=dict(flag='b_mandou_vo', abalo=1),
   resultado="""Você escreve com o polegar: *Pó-pó, por que a gente e os Tedeschi pararam de se falar?* Apaga. Escreve de novo, mais curto: *Pó-pó, o que aconteceu com o vovô Wing e o amigo dele?* Envia. As duas marcas azuis nunca aparecem, mas o telefone, ao lado do seu rosto, parece mais quente."""),
  dict(id='foto', texto='Ficar olhando a fotografia até decorar cada detalhe, e guardar o resto da pergunta', ir='pp_c3_fim',
   efeitos=dict(flag='b_olhou_foto'),
   resultado="""Você olha a fotografia até as bordas dentadas virarem desenho. O homem italiano ri com o corpo todo. O seu avô, de bigode, sorri só com um canto da boca, como você faz. Entre os dois, a estrela parece segurar o ombro dos dois ao mesmo tempo."""),
 ])

NOS['pp_c3_fim'] = dict(tipo='fim', cap=3, lugar='Apartamento da Fran, Hoboken', hora='Sábado, 20 de dezembro · 02h30',
 texto="""Às duas e meia, a cozinha da Fran tem uma luz só, a do fogão, e dois copos de leite morno em cima do balcão. {{se flag:dormiu_revezando}}O acordo de revezar o sofá deixou os dois acordados, no mesmo cômodo, no mesmo horário. {{/se}}{{se flag:dormiu_separado}}O colchão de casaco e almofada não chegou a ser montado, porque nenhum dos dois conseguiu deitar. {{/se}}{{se flag:aceitou_cama}}A cama, de um palmo no meio, ficou vazia dos dois lados. {{/se}}

Nenhum dos dois combinou de estar ali, e os dois estão. Descalços, de meias de lã emprestadas e olhos inchados de sono, cada um ocupa um lado do balcão como se o outro fosse chegar mais tarde.

A neve do lado de fora ilumina as janelas de azul. O silêncio que sobra entre os dois tem o tamanho exato de um beijo.

A luz do corredor acende com um estalo.

— Gente! — diz Fran, de roupão, de braços abertos, com um sorriso enorme e um celular na mão, apontado para os dois. — Eu estava só procurando a minha caneca!""",
 gancho="A prima da Fran estava mesmo procurando uma caneca, ou estava filmando?",
 ir='pp_c4_volta')
