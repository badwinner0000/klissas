# Refrão de Verão · Capítulo 1 · A Fuga
NOS = {}

def op(tom, tag, texto, se=None, ef=None, acao=False):
    d = dict(tom=tom, tag=tag, texto=texto)
    if se: d['se'] = se
    if ef: d['efeitos'] = ef
    if acao: d['acao'] = True
    return d

NOS['rv_c1_a'] = dict(tipo='solo', cap=1, seat='A', lugar='Estrada para Pine Hollow, Washington', hora='Segunda · 16h20',
 texto="""O carro preto que trouxe você de Seattle faz a curva final da estrada de montanha, e o motorista, um homem de óculos escuros e de silêncio profissional, desacelera em frente a uma placa de madeira lascada: *PINE HOLLOW, pop. 1.214*. A população, a julho, sobe para mil duzentos e quinze, porque alguém sempre nasce.

Há oito horas que você não olha o celular. Não por escolha: o sinal morreu na altura de Snoqualmie, e o aparelho, no banco do lado, é só um tijolo de vidro. Pela primeira vez em seis anos, ninguém sabe onde você está, e a sua agente, que foi quem escolheu o motorista, avisou que *dois meses de silêncio são uma estratégia, não uma fuga*. Você não respondeu.

A casa do seu avô Henry Ashby fica no fim de uma estrada de terra, entre pinheiros e um riacho. É um chalé de dois andares, de madeira cinza, com varanda que pende para o lado, uma chaminé de pedra e um telhado que, visto daqui, parece ter perdido uma discussão com o inverno. O avô morreu em março. A casa é sua. O motorista tira duas malas do porta-malas, diz *boa sorte, senhorita*, e vai embora levantando poeira.""",
 acoes=[
  dict(id='entrar', texto='Subir os degraus tortos da varanda e abrir a porta com a chave do advogado', ir='rv_c1_encontro',
   efeitos=dict(flag='a_entrou_direto'),
   resultado="""A chave gira com um rangido de dobradiça mal-humorada. Lá dentro, o cheiro é de madeira velha, de café requentado há uma década e de cachimbo, o do avô, que ainda mora nas cortinas. Poeira dançando num raio de sol. Um sofá com uma manta de lã xadrez dobrada, uma estante de discos, e, em cima do piano de armário, desafinado, a sua fotografia aos nove anos, de maria-chiquinha, de braços abertos num palco de escola."""),
  dict(id='riacho', texto='Ficar um minuto do lado de fora e ouvir o riacho antes de entrar', ir='rv_c1_encontro',
   efeitos=dict(flag='a_ouviu_riacho', vinculo=1),
   resultado="""Você deixa as malas no cascalho e vai até o riacho, que corre a cinco passos da varanda. A água é fria e limpa, e faz um som regular, de quem tem muito tempo. Faz meses que você não ouve nada que não tenha sido gravado, mixado e masterizado. Por um minuto, você fecha os olhos, e é só água."""),
  dict(id='celular', texto='Tentar o celular de novo, em pé na estrada, procurando sinal', ir='rv_c1_encontro',
   efeitos=dict(flag='a_procurou_sinal', abalo=1),
   resultado="""Você levanta o celular, caminha uns metros, volta, sobe numa pedra. Uma barrinha, depois nenhuma. Vinte e sete mensagens não lidas esperam em algum satélite, e a que mais pesa é de uma só palavra, da Lorna, a sua agente: *Álbum?* Você guarda o aparelho no bolso do casaco, e o bolso, de repente, parece mais pesado do que devia."""),
 ])

NOS['rv_c1_b'] = dict(tipo='solo', cap=1, seat='B', lugar='Telhado do chalé dos Ashby, Pine Hollow', hora='Segunda · 16h20', npcs=['doris'],
 texto="""O telhado do chalé do velho Henry Ashby tem sessenta e dois anos, uma inclinação que o seu pai chamava de *opinião* e três mil pregos de cobre, dos quais metade está arrancada. Você está lá em cima desde as oito da manhã, de suspensório e boné, com uma pilha de telhas de cedro, um martelo e uma caixa de ferramentas que cheira a serragem e a café de garrafa térmica.

Trinta e um anos, nascido e criado a quatro quilômetros daqui, dono de uma picape velha, de um cachorro de vizinho que adotou e do respeito de uma cidade que o chama para consertar tudo, de goteira a coração partido. O advogado do espólio ligou na semana passada: *a herdeira vai chegar na segunda. Deixe a casa habitável.* Você perguntou quem era. O advogado disse *a neta*, e mais nada.

Lá embaixo, do lado do riacho, um carro preto vira na estrada, para, descarrega duas malas de marca e vai embora. Uma figura de casaco longo fica parada na poeira, olhando a casa como quem olha um tribunal.""",
 acoes=[
  dict(id='descer', texto='Descer da escada e se apresentar, com o boné na mão', ir='rv_c1_encontro',
   efeitos=dict(flag='b_se_apresentou', vinculo=1),
   resultado="""Você desce pela escada de alumínio, limpa as mãos no jeans e tira o boné, um hábito do seu pai. A pessoa na estrada vira o rosto. Você não a reconhece, o que, numa cidade de mil e duzentas pessoas, já é um dado."""),
  dict(id='rádio', texto='Ligar o rádio da obra, que está no último volume, e fingir que não viu', ir='rv_c1_encontro',
   efeitos=dict(flag='b_ligou_radio', abalo=1),
   resultado="""Você gira o botão do rádio de obra, um aparelho laranja cheio de respingo de tinta, e uma guitarra de rock dos anos noventa sai do alto-falante a um volume que faz um corvo levantar voo. Você fecha os olhos e assovia junto. Não é descortesia: é o seu jeito de dizer que o telhado, até segunda ordem, é seu."""),
  dict(id='trabalhar', texto='Continuar pregando telhas: quem chega a uma casa em obra que se vire', ir='rv_c1_encontro',
   efeitos=dict(flag='b_ignorou'),
   resultado="""Você volta ao prego. A martelada, no telhado de cedro, ecoa pelo vale com a regularidade de um coração. Lá embaixo, a figura do casaco longo continua parada. Você ouve, pela primeira vez, a pergunta que o telhado faz a quem está em cima dele: *e agora?*"""),
 ])

NOS['rv_c1_encontro'] = dict(tipo='segue', cap=1, lugar='Varanda do chalé dos Ashby', hora='Segunda · 16h45', npcs=['doris'],
 ir='rv_c1_dialogo',
 texto="""O primeiro encontro de duas pessoas, em uma varanda que pende para o lado, em uma tarde de junho em que o riacho está cheio de degelo, é um estudo de contraste. De um lado, um casaco longo de caxemira cinza que custou mais do que a picape do outro, óculos escuros de grife e uma mala Rimowa coberta de poeira. Do outro, um boné desbotado, uma camiseta de banda de rock que já não existe e um martelo.

— Você é quem vai mexer no telhado — diz a pessoa do casaco, e a frase, mais afirmação do que pergunta, sai rápida, como quem tem pressa de acabar a conversa. — O advogado disse que a casa estaria pronta.

— O advogado disse *habitável*. — A voz do carpinteiro é calma, de quem já ouviu pior. — Tem teto, tem água do riacho, tem um fogão a lenha. Não tem luz elétrica fora do quadro da cozinha. E o telhado, bom. O telhado está em debate.

Do alto da escada, de onde {{B.nome}} ainda não se mexeu, o rádio continua tocando, em guitarra de rock, a uns oitenta decibéis.""")

NOS['rv_c1_dialogo'] = dict(tipo='dialogo', cap=1, lugar='Varanda do chalé dos Ashby', hora='Segunda · 17h00', comeca='A',
 texto="""Os dois ficam a dois metros de distância, com a madeira rangendo debaixo dos pés, o rádio de fundo e uma poeira dourada subindo do cascalho. Nenhum dos dois pediu essa conversa. Nenhum dos dois, por orgulho diferente, vai ser o primeiro a recuar.""",
 turnos=[
  dict(prompt='A primeira frase é sua.', opcoes=[
    op('seco', 'r0_a_seco', '— Preciso que você desligue isso. Eu estou tentando pensar.', se='eu:A'),
    op('flerte', 'r0_a_flerte', '— Que gosto horrível. Mas, admito, o volume é impressionante.', se='eu:A'),
    op('abre', 'r0_a_abre', '— Desculpa. Foi uma viagem longa, e eu não durmo direito há meses.', se='eu:A', ef=dict(vinculo=1)),
    op('seco', 'r0_b_seco', '— A casa está em obra. Vai ter barulho. É o que tem.', se='eu:B'),
    op('flerte', 'r0_b_flerte', '— Música boa é a que faz o prego entrar sozinho. Essa é das melhores.', se='eu:B'),
    op('abre', 'r0_b_abre', '— Eu conhecia o seu avô. Ele me ensinou a segurar um martelo. Sinto muito.', se='eu:B', ef=dict(vinculo=1)),
  ]),
  dict(prompt='Agora você responde.', opcoes=[
    op('fere', 'r1_a_fere', '— Eu odeio essa música. Odeio mesmo. Sempre odiei.', se='eu:A', ef=dict(abalo=1)),
    op('seco', 'r1_a_seco', '— Então a gente tem um problema: eu preciso de silêncio, e você tem um telhado.', se='eu:A'),
    op('abre', 'r1_a_abre', '— O vovô falava de você? Ele escrevia cartas, mas nunca citou nomes.', se='eu:A', ef=dict(vinculo=1)),
    op('fere', 'r1_b_fere', '— Você odeia uma música que nunca ouviu direito. Isso é falta de curiosidade.', se='eu:B', ef=dict(abalo=1)),
    op('seco', 'r1_b_seco', '— O silêncio é uma coisa cara por aqui. Mas posso baixar até as seis.', se='eu:B'),
    op('flerte', 'r1_b_flerte', '— Você parece alguém que nunca esperou uma goteira. A casa vai te ensinar.', se='eu:B'),
  ]),
  dict(prompt='A conversa é sua de novo.', opcoes=[
    op('seco', 'r2_a_seco', '— Quanto custa terminar o telhado? Pago em dinheiro, agora, para você ir embora hoje.', se='eu:A'),
    op('flerte', 'r2_a_flerte', '— Você tem cara de quem sabe exatamente o que está fazendo e não vai me contar.', se='eu:A'),
    op('abre', 'r2_a_abre', '— Eu não sei cozinhar. Nem acender um fogão a lenha. Me ajuda?', se='eu:A', ef=dict(vinculo=1)),
    op('seco', 'r2_b_seco', '— Dinheiro não apressa goteira. O telhado leva três semanas. Eu volto amanhã às sete.', se='eu:B'),
    op('flerte', 'r2_b_flerte', '— Eu sei o que estou fazendo. Mas o dia em que eu contar, você vai ficar entediada.', se='eu:B'),
    op('cuida', 'r2_b_cuida', '— Eu acendo o fogão agora e te mostro. É uma lição de dois minutos.', se='eu:B', ef=dict(vinculo=1)),
  ]),
  dict(prompt='A última palavra da tarde é sua.', opcoes=[
    op('seco', 'r3_a_seco', '— Amanhã às sete, então. Mas sem rádio.', se='eu:A'),
    op('abre', 'r3_a_abre', '— Valeu. De verdade. Eu não esperava gentileza aqui.', se='eu:A', ef=dict(vinculo=1)),
    op('fere', 'r3_a_fere', '— Não me chame de senhorita. Nem de senhora. Nem de nada que soe a respeito.', se='eu:A'),
    op('seco', 'r3_b_seco', '— Amanhã, às sete. Com rádio. É o combinado.', se='eu:B'),
    op('cuida', 'r3_b_cuida', '— Tem lenha seca no galpão. E o fogão tem tiragem boa. Qualquer coisa, eu estou na casa dos Pruitt.', se='eu:B'),
    op('flerte', 'r3_b_flerte', '— Se você sobreviver à primeira noite sem luz, a gente conversa de música.', se='eu:B'),
  ]),
 ],
 pool=[
  op('seco', 'pl_seco', '— Ok.'),
  op('cuida', 'pl_cuida', '— Quer água? O riacho está limpo.'),
  op('flerte', 'pl_flerte', '— Você é mais ranzinza do que o telhado.'),
  op('abre', 'pl_abre', '— Eu não esperava ser tão mal-educada.'),
  op('fere', 'pl_fere', '— Você acha que sabe tudo sobre mim.'),
 ],
 fecho="""O sol baixa atrás dos pinheiros, e o rádio laranja, por fim, é desligado. O silêncio que vem depois é tão grande que os dois ouvem, ao mesmo tempo, o riacho, uma coruja distante, e o ruído de uma discussão que não acabou.""",
 ir='rv_c1_fim')

NOS['rv_c1_fim'] = dict(tipo='fim', cap=1, lugar='Chalé dos Ashby, Pine Hollow', hora='Segunda · 21h30',
 texto="""Às nove e meia da noite, o chalé do velho Henry tem três lâmpadas acesas, uma panela de macarrão instantâneo esquecida no fogão a lenha e uma pessoa, sentada no sofá de manta xadrez, olhando um piano desafinado. {{se flag:a_ouviu_riacho}}O riacho, lá fora, continua a falar, e ela, dentro, continua a ouvir. {{/se}}{{se flag:a_procurou_sinal}}O celular, sem sinal, está de bruços na mesa, com vinte e sete mensagens presas num satélite. {{/se}}{{se flag:b_ligou_radio}}O rádio laranja, desligado, ainda tem a guitarra nos ouvidos de quem a ouviu. {{/se}}{{se flag:b_se_apresentou}}O boné, tirado na estrada, ficou amassado na mão por mais tempo do que devia. {{/se}}

Do outro lado do vale, na picape velha que desce a estrada de terra, o rádio de cabine, em volume baixo, toca uma estação de rock. A música, por acaso, é a mesma da tarde, e quem dirige não muda de estação.

No piano de armário, a fotografia de uma menina de nove anos de maria-chiquinha, de braços abertos, tem uma dedicatória no verso, na letra trêmula do avô, que a neta só agora lê: *Para quando você voltar a cantar sem plateia.*""",
 gancho="A primeira noite, sem luz, sem sinal e com uma frase do avô no verso de uma fotografia.",
 ir='rv_c2_mercearia')
