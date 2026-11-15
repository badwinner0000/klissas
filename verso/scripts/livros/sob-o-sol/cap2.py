# Sob o Sol da Toscana · Capítulo 2 · A Cozinha
NOS = {}

def op(tom, tag, texto, se=None, ef=None, acao=False):
    d = dict(tom=tom, tag=tag, texto=texto)
    if se: d['se'] = se
    if ef: d['efeitos'] = ef
    if acao: d['acao'] = True
    return d

NOS['ts_c2_cozinha'] = dict(tipo='segue', cap=2, lugar='Casa Bianchini, Siena', hora='Quinta · 16h00', npcs=['giulia', 'ottavia'],
 ir={'A': 'ts_c2_a', 'B': 'ts_c2_b'},
 texto="""Em quatro dias, o apartamento do Vicolo del Sole ganha uma ordem: a torta de ricota da signora Ottavia desapareceu em dois jantares, o colchonete azul foi enrolado atrás da porta, e a cozinha, que é do tamanho de um armário grande, tem agora dois sistemas incompatíveis. Do lado esquerdo do fogão, uma prateleira com potes de vidro etiquetados, todos em ordem alfabética: *arroz, azeite, café, farinha*. Do lado direito, uma sacola de papel com limões, uma garrafa de vinho aberta, um pacote de macarrão sem etiqueta e uma pilha de guardanapos de festa.

{{se flag:dormiram_cama}}A cama, que ninguém comenta, continua dividida. {{/se}}{{se flag:dormiram_chao}}O colchonete azul continua atrás da porta. {{/se}}{{se flag:dormiram_revezando}}A moeda de dois euros, na cômoda, já tem um risco de lápis no lugar da coroa. {{/se}}As aulas começam na segunda. Na quinta, as duas têm uma coisa em comum: precisam da cozinha às sete da noite.""")

NOS['ts_c2_a'] = dict(tipo='solo', cap=2, seat='A', lugar='Mercato del Campo, Siena', hora='Quinta · 16h30', npcs=['giulia'],
 texto="""Você nunca cozinhou para mais de duas pessoas, e agora são oito: a Giulia Brunelli, vinte e três anos, italiana de nascimento e de convicção, que vira para você na primeira aula, com um sorriso de quem faz amigos por esporte, e diz *você parece perdid{{A.o_a}}, vem*; os quatro colegas de curso que ela trouxe; e mais dois, que vieram *porque a Giulia disse que tinha jantar*.

No Mercato, entre barracas de queijo, de tomate e de peixe, a Giulia explica, em um inglês de sotaque doce, que *cacio e pepe* é a coisa mais simples do mundo, e a coisa mais difícil, porque só leva três ingredientes. *Pecorino, pimenta, massa*, ela diz, *e a água do cozimento. É a água que faz a mágica.* Você anota no celular, com a convicção de quem acaba de receber um segredo de Estado.

A sacola está pesada. A barraca do queijo cheira a lugar onde dá para morar.""",
 acoes=[
  dict(id='comprar', texto='Comprar demais: queijo, vinho, flores, velas, tudo o que parecer bonito', ir='ts_c2_dividir',
   efeitos=dict(flag='a_comprou_demais', abalo=1),
   resultado="""Você compra um pecorino de dois quilos, três garrafas de vinho, um maço de girassóis e seis velas de pote. A conta chega a oitenta e sete euros, o que é, descobre ao pagar, um terço da verba de comida do mês. A Giulia ri, de olhos arregalados: *você é uma força da natureza*. Você ri junto, alto, e o riso, como sempre, cobre o que você não quer pensar."""),
  dict(id='anotar', texto='Pedir à Giulia que repita a receita, devagar, e anotar tudo com atenção', ir='ts_c2_dividir',
   efeitos=dict(flag='a_aprendeu_receita', vinculo=1),
   resultado="""Você pede que ela repita, e a Giulia, que adora ensinar, para no meio da rua, de sacola na mão, e explica de novo, devagar: a água do macarrão, o queijo ralado fino, a pimenta tostada na frigideira seca. Você anota até a ordem em que se mexe. É a primeira vez, em semanas, que alguém lhe ensina alguma coisa, e você descobre que gosta de aprender."""),
  dict(id='ligar_casa', texto='Mandar uma mensagem para a sua mãe, em Los Angeles, só para contar que vai cozinhar para oito pessoas', ir='ts_c2_dividir',
   efeitos=dict(flag='a_avisou_mae', abalo=1),
   resultado="""Você escreve: *Mãe, eu vou cozinhar para oito pessoas, em Siena, uma receita italiana!* Os três pontinhos aparecem, somem, aparecem. A resposta, quando vem, é de uma linha: *Que bom, filha. Seu pai e eu estamos tentando algumas coisas. Te ligo no fim de semana.* Você lê o plural, *seu pai e eu*, e responde com um coração, que é a única coisa que cabe."""),
 ])

NOS['ts_c2_b'] = dict(tipo='solo', cap=2, seat='B', lugar='Mesa da cozinha, Casa Bianchini', hora='Quinta · 16h30', npcs=['mae'],
 texto="""A mesa dobrável da cozinha, com a perna curta calçada por um guardanapo dobrado em quatro, é, por enquanto, o único lugar do apartamento com luz boa. Você montou ali o seu escritório: o notebook, o fichário de fichas coloridas, três livros de Vasari, Baxandall e Gombrich, uma garrafa térmica e um relógio de mesa que marca, em verde, a hora e o minuto.

Às quatro e meia, a tela do notebook acende com uma chamada de vídeo. Na tela, num fundo de sala bostoniana de móveis escuros, a sua mãe, cinquenta anos, de blusa de seda abotoada até o queixo, sem sorriso, com um bloco de anotações ao lado.

— Como foi a primeira semana? — pergunta ela. — Eu quero um resumo de uma frase, e depois a lista do que você já leu.""",
 acoes=[
  dict(id='lista', texto='Responder em uma frase e recitar a lista de leituras, como a sua mãe gosta', ir='ts_c2_dividir',
   efeitos=dict(flag='b_recitou_lista'),
   resultado="""— Adaptação satisfatória — você diz. — Li Vasari, as *Vidas* de Duccio a Simone Martini; Baxandall, dois capítulos; e organizei as fichas da tese. — Do outro lado, a sua mãe anota. *Bom*, diz. *A bolsa exige média nove.* Você diz *eu sei*. Ela diz *ótimo*. A chamada dura onze minutos, e nenhuma das duas faz uma pergunta sobre a outra."""),
  dict(id='contar', texto='Tentar contar uma coisa fora da lista: a luz de Siena, a torta da vizinha, a cama única', ir='ts_c2_dividir',
   efeitos=dict(flag='b_tentou_contar', vinculo=1, abalo=1),
   resultado="""— A luz daqui é diferente — você tenta. — Entra de lado, e tudo fica cor de cobre. — A sua mãe levanta os olhos do bloco, com a expressão de quem ouve uma língua que não aprendeu. *Que interessante*, ela diz. E volta ao bloco: *e a tese?* A luz de Siena, que você acabara de oferecer, fica no ar da cozinha, sem destinatário."""),
  dict(id='encerrar', texto='Dizer que precisa estudar, e encerrar a chamada antes do fim', ir='ts_c2_dividir',
   efeitos=dict(flag='b_encerrou_chamada', abalo=1),
   resultado="""— Preciso estudar — você diz, e a frase, tão sua, soa pela primeira vez como uma saída de emergência. A sua mãe assente. *É isso que eu espero de você.* A tela apaga. O relógio de mesa marca 16h41, em verde, e a cozinha fica em um silêncio tão grande que você ouve o ronco da geladeira."""),
 ])

NOS['ts_c2_dividir'] = dict(tipo='dividir', cap=2, lugar='Cozinha, Casa Bianchini', hora='Quinta · 18h40', cada=1,
 texto="""Às seis e quarenta, o sino de uma igreja, em algum lugar, bate a meia, e a cozinha se enche de uma gente que não existia há dez minutos: a Giulia e seis colegas, de sacola, de vinho, de riso, ocupando o corredor, o banheiro e o espaço, já inexistente, entre o fogão e a mesa dobrável. O pecorino, de dois quilos, espera no balcão. O notebook, o fichário e as fichas coloridas continuam na mesa.

Duas pessoas, uma cozinha, e um relógio de mesa que marca, em verde, 18:42.""",
 pergunta='O que você faz?',
 acoes=[
  dict(id='cozinhar', texto='Começar a cozinhar, no meio da bagunça, ignorando a mesa ocupada', efeitos=dict(flag='cozinhou_apesar', vinculo=0),
   resultado="""Você põe a água no fogo, abre o pacote de macarrão, rala o queijo e, no meio de oito pessoas, de gente que entra, de vinho que serve, de piada em italiano, segue a receita, passo a passo, como quem faz uma prova. A água do cozimento, você lembra, é a mágica. Quando mexe o macarrão na frigideira, com a pimenta tostada e o pecorino, o cheiro enche o apartamento, e a bagunça, de repente, tem sentido."""),
  dict(id='mesa', texto='Recolher as fichas e o notebook, com a maior educação possível, e liberar a mesa para o jantar', efeitos=dict(flag='liberou_mesa', vinculo=1),
   resultado="""Você junta as fichas, uma por uma, por ordem de cor, fecha o notebook e põe tudo debaixo do braço. A mesa dobrável, desocupada, ganha de imediato uma toalha de papel, seis pratos e um girassol num pote de geleia. É um gesto de uma educação tão grande que dói, e ninguém, no meio do barulho, repara."""),
  dict(id='ficar', texto='Ficar onde está, na mesa, com o fichário aberto, e fingir que o barulho não existe', efeitos=dict(flag='ficou_na_mesa', abalo=1),
   resultado="""Você fica. O fichário continua aberto, o lápis continua na mão, e, a trinta centímetros do seu cotovelo, sete pessoas riem de uma piada que você não entende. É uma resistência pacífica, e ninguém, além da pessoa que cozinha ao seu lado, parece notar. A pessoa, sem dizer nada, tira da mesa uma colher de pau que estava sobre a sua ficha número nove."""),
 ],
 desfecho="""Às dez e meia, o macarrão acabou, o vinho também, e a Giulia, com a bochecha vermelha de riso, abraça a anfitriã e promete, em dois idiomas, voltar na semana seguinte. A porta fecha, a escada de mármore devolve uma última risada, e a cozinha fica em um silêncio de ressaca.""",
 ir='ts_c2_dialogo')

NOS['ts_c2_dialogo'] = dict(tipo='dialogo', cap=2, lugar='Cozinha, Casa Bianchini', hora='Quinta · 22h40', comeca='B',
 texto="""A cozinha, depois da festa, parece o convés de um navio depois da tempestade: copos nas pias, guardanapos no chão, uma panela de água de macarrão fria, e, na mesa dobrável, em cima das fichas coloridas, uma mancha de vinho tinto, do tamanho de uma moeda.

As duas ficam de pé, uma de cada lado da mesa, com a mancha no meio.""",
 turnos=[
  dict(prompt='A primeira frase é sua.', opcoes=[
    op('fere', 'm0_b_fere', '— A ficha número onze está estragada. Eu levei três dias para escrevê-la.', se='eu:B', ef=dict(abalo=1)),
    op('seco', 'm0_b_seco', '(Pegar a ficha manchada com a ponta dos dedos e observá-la contra a luz.)', se='eu:B', acao=True),
    op('cuida', 'm0_b_cuida', '— O macarrão estava bom. Eu senti o cheiro da mesa.', se='eu:B', ef=dict(vinculo=1)),
    op('abre', 'm0_a_abre', '— Meu Deus, desculpa! Eu não vi! Foi o vinho, foi a Giulia, foi...', se='eu:A', ef=dict(vinculo=1)),
    op('seco', 'm0_a_seco', '— Tá, mas você também ficou aí, no meio, de fichário aberto. Eu avisei.', se='eu:A'),
    op('flerte', 'm0_a_flerte', '— Eu faço outra. Eu escrevo à mão, com a minha letra feia, só para você ver.', se='eu:A'),
  ]),
  dict(prompt='Agora você responde.', opcoes=[
    op('abre', 'm1_a_abre', '— Eu sei que eu sou barulhenta. Eu sei. É que o silêncio, para mim, é... é assustador.', se='eu:A', ef=dict(vinculo=2)),
    op('seco', 'm1_a_seco', '— Cinco dias, e você já tem um sistema para tudo. Eu tenho uma pasta de festas.', se='eu:A'),
    op('fere', 'm1_a_fere', '— Você mora numa biblioteca. Isso é uma casa. As pessoas riem aqui.', se='eu:A', ef=dict(abalo=1)),
    op('seco', 'm1_b_seco', '— Eu preciso da mesa das sete às dez. Todos os dias. Sem exceção.', se='eu:B'),
    op('cuida', 'm1_b_cuida', '— Você cozinha bem. Eu não sabia que era possível cheirar tão bem uma cozinha pequena.', se='eu:B', ef=dict(vinculo=1)),
    op('fere', 'm1_b_fere', '— A regra quatro: visitas até as vinte e duas horas. Você ultrapassou em meia hora.', se='eu:B', ef=dict(abalo=1)),
  ]),
  dict(prompt='A conversa é sua de novo.', opcoes=[
    op('seco', 'm2_a_seco', '— Tá. Então eu uso a cozinha das cinco às sete. Você, das sete às dez. Combinado.', se='eu:A', ef=dict(flag='cronograma_a')),
    op('flerte', 'm2_a_flerte', '— E das dez em diante, a cozinha é de quem tiver fome. Sem regra nenhuma.', se='eu:A'),
    op('abre', 'm2_a_abre', '— Se você quiser, eu cozinho para você. Uma vez por semana. Sem barulho.', se='eu:A', ef=dict(vinculo=2)),
    op('seco', 'm2_b_seco', '— Aceito o cronograma. Pela manhã, a cozinha é minha, das seis às oito.', se='eu:B', ef=dict(flag='cronograma_b')),
    op('abre', 'm2_b_abre', '— Eu não sei cozinhar. Eu como torrada e iogurte. Desde sempre.', se='eu:B', ef=dict(vinculo=1)),
    op('cuida', 'm2_b_cuida', '— Eu limpo a mancha. Foi na minha ficha. É minha responsabilidade.', se='eu:B'),
  ]),
  dict(prompt='A última palavra da cozinha é sua.', opcoes=[
    op('abre', 'm3_a_abre', '— Eu gostei de você ter ficado na mesa. Eu sei que é estranho. Mas eu gostei.', se='eu:A', ef=dict(vinculo=2)),
    op('flerte', 'm3_a_flerte', '— Boa noite. E valeu pela colher de pau.', se='eu:A'),
    op('seco', 'm3_a_seco', '— Boa noite. Amanhã eu lavo a louça. Prometo.', se='eu:A'),
    op('abre', 'm3_b_abre', '— Boa noite. E... a ficha onze pode ser escrita de novo. A mancha tem uma forma bonita.', se='eu:B', ef=dict(vinculo=2)),
    op('cuida', 'm3_b_cuida', '— Boa noite. Eu lavo a louça. Você cozinhou. É justo.', se='eu:B'),
    op('seco', 'm3_b_seco', '— Boa noite. Seis da manhã, cozinha minha.', se='eu:B'),
  ]),
 ],
 pool=[
  op('cuida', 'pl_cuida', '(Pegar a esponja e começar a lavar o primeiro copo, sem dizer nada.)', acao=True),
  op('seco', 'pl_seco', '(Olhar o relógio de mesa, que marca 22:58, e depois a outra pessoa.)', acao=True),
  op('flerte', 'pl_flerte', '(Sorrir de lado, sem querer, e disfarçar com a mão.)', acao=True),
  op('abre', 'pl_abre', '— Eu não sei por que estou dizendo isso. Mas é verdade.'),
  op('fere', 'pl_fere', '(Cruzar os braços e encarar a mancha de vinho, em silêncio.)', acao=True),
 ],
 fecho="""A mancha de vinho, na ficha, tem a forma, de longe, de uma ilha. Lá embaixo, a signora Ottavia bate com o cabo de uma vassoura no teto, três vezes, em compasso de reprovação. As duas olham para cima, ao mesmo tempo, e uma ri, e a outra, devagar, também.""",
 ir='ts_c2_decisao')

NOS['ts_c2_decisao'] = dict(tipo='decisao', cap=2, lugar='Cozinha, Casa Bianchini', hora='Sexta · 00h10',
 texto="""Uma regra, para valer, precisa de duas assinaturas. As duas combinaram, no meio da noite, um cronograma, e agora precisam escolher que forma ele vai tomar: uma folha na geladeira, um quadro de giz ou, simplesmente, a palavra.""",
 pergunta='Como as duas registram o cronograma da cozinha?',
 ir={'A': 'ts_c2_noite_a', 'B': 'ts_c2_noite_b'},
 acoes=[
  dict(id='papel', texto='Escrever tudo numa folha e pregar na porta da geladeira, com um ímã de torre de Siena', efeitos=dict(flag='cronograma_papel', vinculo=1),
   resultado="""Vocês escrevem juntas, uma de cada vez, a lápis, em uma folha de caderno: *5–7, cozinha A. 7–10, mesa B. 6–8 da manhã, cozinha B.* A letra de uma é rápida e inclinada, a da outra, redonda e firme. O ímã, que a signora Bianchini deixou, é uma Torre del Mangia de plástico, e segura as duas caligrafias lado a lado."""),
  dict(id='quadro', texto='Escrever com giz no quadro-negro pequeno da parede, para poder apagar quando quiser', efeitos=dict(flag='cronograma_giz'),
   resultado="""Vocês escrevem com giz no pequeno quadro-negro da parede, o da lista de compras que a signora Bianchini esqueceu. Os horários ficam em branco, num retângulo preto, com a possibilidade, que as duas percebem ao mesmo tempo, de serem apagados. Nenhuma diz nada. É uma forma de assinar um contrato com a cláusula de rescisão à vista."""),
  dict(id='palavra', texto='Não escrever nada: dar a palavra, com um aperto de mão, e confiar', efeitos=dict(flag='cronograma_palavra', vinculo=2),
   resultado="""Vocês estendem a mão, uma para a outra, por cima da mancha de vinho. O aperto dura dois segundos, o suficiente para sentir que uma mão é fria e a outra quente, e que uma tem um calo no dedo de segurar o lápis. Ninguém escreve nada. É um contrato de honra, de duas pessoas que ainda não se conhecem direito, e é a coisa mais séria que fizeram."""),
 ])

NOS['ts_c2_noite_a'] = dict(tipo='solo', cap=2, seat='A', lugar='Cozinha, Casa Bianchini', hora='Sábado · 20h00',
 texto="""No sábado, às oito da noite, a mesa dobrável é da outra pessoa. A regra é a regra: das sete às dez, a mesa é de quem estuda. Você, de calça de pijama e moletom de UCLA, está na bancada, do outro lado do apartamento, com uma panela de macarrão e a vontade, enorme, de colocar uma música.

A pessoa na mesa não ergueu os olhos em uma hora. Estuda com uma testa franzida de quem decifra um idioma, o lápis em movimento e uma xícara de chá, esfriando, a dois palmos do cotovelo. Faz três dias que {{B.ele_ela}} só come torrada e iogurte, e você, que nunca prestou atenção na comida de ninguém, prestou.

A panela ferve. Você tem macarrão demais e uma ideia que não é sua.""",
 acoes=[
  dict(id='prato', texto='Servir um prato e deixá-lo na ponta da mesa, sem dizer nada, e voltar à bancada', ir='ts_c2_fim',
   efeitos=dict(flag='a_deixou_prato', vinculo=2),
   resultado="""Você serve o macarrão em um prato de louça branca, com um fio de azeite e uma folha de manjericão que o pecorino da Giulia, por milagre, deixou viva. Atravessa o apartamento na ponta dos pés e põe o prato, sem barulho, à direita do fichário, ao lado do chá frio. Não diz nada. Volta à bancada e come em pé, de costas, com o coração batendo em um ritmo que a panela não explica."""),
  dict(id='perguntar', texto='Perguntar, baixinho, se a pessoa quer jantar, e esperar a resposta', ir='ts_c2_fim',
   efeitos=dict(flag='a_ofereceu_jantar', vinculo=1),
   resultado="""— Quer? — você pergunta, com a panela na mão. A pessoa na mesa não ergue os olhos. *Obrigad{{B.o_a}}*, diz, *eu como depois.* Você diz *tá* e come sozinha, em pé, com a panela na mão. O *depois* é uma palavra que você conhece: é a que os seus pais usam quando querem dizer *nunca*."""),
  dict(id='musica', texto='Pôr um fone de ouvido, só um, e cozinhar ao som de uma música baixinha', ir='ts_c2_fim',
   efeitos=dict(flag='a_pos_musica', vinculo=0),
   resultado="""Você põe um fone, só um, e deixa o outro pendurado no pescoço, para ouvir a casa. A música é uma balada que você conhece de cor, e que baixinho, na cozinha, ganha outro peso. Em alguns compassos, percebe que está cantando, quase sem som, só com a boca. A pessoa na mesa, a dois metros, vira uma página, devagar, no ritmo da música."""),
 ])

NOS['ts_c2_noite_b'] = dict(tipo='solo', cap=2, seat='B', lugar='Mesa da cozinha, Casa Bianchini', hora='Sábado · 20h00',
 texto="""Você tem uma hora e meia de leitura pela frente, uma ficha a reescrever e, ao seu lado, o fantasma de uma mancha de vinho, que a luz de mesa transforma em ilha. Do outro lado do apartamento, na bancada, a pessoa com quem você divide cama e geladeira cozinha em silêncio, e o cheiro, que sobe, de alho, azeite e queijo, entra no seu texto sobre Simone Martini.

Você relê a mesma frase quatro vezes. A frase diz que *a luz, em Siena, é um instrumento de devoção*. Você escreveu isso há quinze dias, em Boston, de memória, de um livro. Hoje, pela primeira vez, sabe que é verdade, porque a luz da lâmpada da cozinha, sobre uma panela, é exatamente isso.

Do outro lado da mesa, um prato de louça branca, com macarrão, azeite e uma folha de manjericão, aparece sem barulho.""",
 acoes=[
  dict(id='comer', texto='Comer o macarrão, ali mesmo, quente, sem levantar os olhos do texto', ir='ts_c2_fim',
   efeitos=dict(flag='b_comeu_prato', vinculo=2),
   resultado="""Você come. Primeiro um garfo, devagar, como quem confere uma citação. Depois outro. O macarrão tem pimenta, queijo e uma doçura de limão que você não sabe de onde vem. Em cinco minutos, o prato está vazio, e você, que nunca elogia comida, descobre que a frase que quer dizer é *obrigad{{eu.o_a}}*. Não diz. Põe o prato, lavado, na bancada, sem ruído, às dez."""),
  dict(id='ignorar', texto='Deixar o prato esfriar ao lado do fichário, por orgulho, sem tocar', ir='ts_c2_fim',
   efeitos=dict(flag='b_nao_comeu', abalo=1),
   resultado="""Você não toca. O prato esfria, ao lado do chá, com o brilho do azeite apagando-se aos poucos. É orgulho, e você sabe, e é a única coisa que ainda parece sua em uma cozinha em que a bagunça dos outros tomou conta. Às dez, quando fecha o notebook, o prato continua ali, intacto, e a pessoa que o serviu não olha para ele."""),
  dict(id='agradecer', texto='Levantar, ir até a bancada e dizer, baixo, um *valeu* de uma palavra só', ir='ts_c2_fim',
   efeitos=dict(flag='b_agradeceu', vinculo=2),
   resultado="""Você levanta, com o prato na mão, e vai até a bancada. A pessoa, de costas, lava uma panela. *Valeu*, você diz, com a voz mais baixa que consegue, e a palavra sai com um esforço que não esperava. A outra pessoa, sem se virar, apenas assente. A água corre. Nenhuma das duas diz mais nada, e é a conversa mais comprida da semana."""),
 ])

NOS['ts_c2_fim'] = dict(tipo='fim', cap=2, lugar='Casa Bianchini, Siena', hora='Domingo · 07h30',
 texto="""O domingo chega com sol alto e com cheiro de café na escada. {{se flag:cronograma_papel}}Na porta da geladeira, uma folha de caderno, presa por um ímã em forma de Torre del Mangia, tem duas caligrafias, uma ao lado da outra. {{/se}}{{se flag:cronograma_giz}}No quadro-negro, o cronograma, escrito a giz, já perdeu uma letra, apagada, sem querer, por uma manga. {{/se}}{{se flag:cronograma_palavra}}Nenhum papel registra o acordo, e o aperto de mão por cima da mancha ainda vale. {{/se}}

{{se flag:a_deixou_prato}}Na ponta da mesa, um prato de louça branca, que ontem tinha macarrão, está lavado, secando no escorredor. {{/se}}{{se flag:b_nao_comeu}}Na ponta da mesa, um prato de louça branca, com macarrão frio, ainda está ali, e alguém o cobriu com um guardanapo, em respeito. {{/se}}{{se flag:b_agradeceu}}Uma palavra, dita baixinho na bancada, ainda não foi respondida, e não precisa. {{/se}}{{se flag:a_ofereceu_jantar}}Uma oferta recusada com um *depois* ainda pesa. {{/se}}

Lá embaixo, a signora Ottavia sai ao pátio com uma vassoura, uma gaiola de canário e, debaixo do braço, um maço de manjericão. Levanta os olhos para a janela do terceiro andar, dá um sorriso de quem decidiu uma coisa, e diz, para o pátio inteiro ouvir, uma frase em italiano. Nenhuma das duas, lá em cima, entende. Mas o canário, na gaiola, começa a cantar, e a manhã tem, de repente, uma trilha.""",
 gancho="Uma frase em italiano que nenhuma das duas entendeu, e um canário que cantou.",
 ir='ts_c3_aula')
