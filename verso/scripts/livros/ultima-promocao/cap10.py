# A Última Promoção · Capítulo 10 · O grande gesto
NOS = {}

def op(tom, tag, texto, se=None, ef=None, acao=False):
    d = dict(tom=tom, tag=tag, texto=texto)
    if se: d['se'] = se
    if ef: d['efeitos'] = ef
    if acao: d['acao'] = True
    return d

NOS['up_c10_aviao'] = dict(tipo='segue', cap=10, lugar='Duas cidades', hora='Quarta · 05h30',
 ir={'A': 'up_c10_a', 'B': 'up_c10_b'},
 texto="""Quarta-feira, cinco e meia da manhã em Viena, vinte e três e meia de terça em Dayton. O aeroporto de Schwechat tem a luz azul de todo aeroporto antes do sol. Em Ohio, o rio Great Miami continua passando, sem ligar para o que cada um decidiu.

Havia uma regra, combinada num domingo de manhã, num quarto de hotel: *não falamos disso até o fim do congresso*. O congresso, afinal, acaba hoje. A regra, tecnicamente, expira em algumas horas, e nenhuma das duas pessoas se lembrou dela.

Cada uma tem, no bolso, uma coisa que não existia na segunda-feira. Uma, uma pasta de quarenta e três arquivos que viajou por e-mail. A outra, uma mensagem de quatro palavras.""")

NOS['up_c10_b'] = dict(tipo='solo', cap=10, seat='B', lugar="Aeroporto de Frankfurt, Terminal 1", hora='Quarta · 09h40', npcs=['marcus'],
 texto="""Frankfurt, a escala de duas horas e dez minutos. Você chegou de Viena às oito e meia, de mala de mão e de terno amarrotado, com a pasta *MW-0017* aberta no celular e o endereço da sede europeia da Meridian Global, a vinte minutos de táxi do aeroporto, copiado numa nota.

Você tem uma carta de intenções assinada, no bolso, para um cargo que o Marcus ofereceu a você ontem à noite, e que a Meridian, a partir de hoje, vai considerar aceito. Tem também um dever que ninguém lhe deu, e um voo para Cincinnati às onze e vinte.

Duas horas, uma decisão, e um homem que, três anos atrás, aprendeu a assinar com a mão esquerda para parecer outra pessoa.""",
 acoes=[
  dict(id='entregar', texto='Mandar a pasta, com a carta de demissão, para o conselho e para a auditoria da matriz, agora', ir='up_c10_b_voo',
   efeitos=dict(flag='entregou_prova', vinculo=2),
   resultado="""Você escreve o e-mail no café do terminal, com o celular em cima da mesa e um espresso esfriando. O destinatário é *Audit Committee, Meridian Global*, com cópia ao presidente do conselho. O assunto: *Evidência de fraude, valuation Tillman & Sons, MW Holdings.* O anexo: quarenta e três arquivos. O corpo: quatro linhas. E, embaixo, uma quinta, que você escreve devagar: *Peço demissão do processo seletivo e de qualquer cargo na Meridian.* Envia, e o *whoosh* do celular é o som mais limpo do dia."""),
  dict(id='presencial', texto='Ir de táxi até a sede europeia e entregar a pasta, em mãos, a alguém de confiança', ir='up_c10_b_voo',
   efeitos=dict(flag='entregou_em_maos', vinculo=3, abalo=1),
   resultado="""Você pega um táxi, e o motorista, de cabelo grisalho, não faz perguntas. A sede europeia da Meridian é um prédio de vidro fumê, com uma recepção de mármore e uma mulher de terninho que não sorri. Você pede a *Frau Kessler, da Auditoria Interna*, sem hora marcada, com a pasta num pen drive, e espera quarenta minutos num sofá de couro, sem tocar o celular. Quando entrega, ela olha o pen drive, olha você, e diz só: *o senhor sabe o que isso significa?* Você diz que sim."""),
  dict(id='confrontar', texto='Ligar primeiro para o Marcus, dar a ele uma chance de se explicar, e só depois entregar', ir='up_c10_b_voo',
   efeitos=dict(flag='b_confrontou_marcus', abalo=2),
   resultado="""Você liga. Marcus atende no segundo toque, com o sorriso na voz. Você diz *eu li tudo*, e o sorriso, do outro lado, cai uma oitava. *{{B.nome}}*, diz ele, *vamos conversar como adultos. Há uma posição de vice-presidente para você, e uma carta que você já assinou.* Você olha a janela do terminal, onde um avião da Lufthansa roda para a pista, e diz: *eu assinei uma carta de intenções. Não assinei um silêncio.* E desliga, e envia a pasta, e o gosto, na boca, é o de algo que você devia ter feito antes."""),
 ])

NOS['up_c10_b_voo'] = dict(tipo='solo', cap=10, seat='B', lugar='Voo Frankfurt–Cincinnati, poltrona 14C', hora='Quarta · 14h20',
 texto="""Nove horas de voo, uma poltrona de corredor, um vizinho de assento que dorme com a boca aberta, e a certeza de que não há discurso que prepare ninguém para o que se vai dizer. Você abre o bloco de notas do celular, onde escreveu, e apagou, e reescreveu, doze versões de uma frase.

Pela primeira vez em quarenta e um anos, você não é o filho do dono, nem o diretor de operações, nem o candidato. Você é uma pessoa em um avião, sem emprego, sem vaga, sem carta de intenções, com um cachorro em Gary e uma mensagem de quatro palavras no bolso.

Você não vai levar flores. Pensou nisso, no duty-free de Frankfurt, diante de um buquê de tulipas, e decidiu que flores seriam uma maneira de pedir licença. O que você leva é outra coisa.""",
 acoes=[
  dict(id='ensaiar', texto='Ensaiar a frase em voz baixa, até que ela soe sincera e não ensaiada', ir='up_c10_encontro',
   efeitos=dict(flag='b_ensaiou'),
   resultado="""Você ensaia, em voz tão baixa que o vizinho de poltrona não acorda. A frase tem seis palavras, depois dez, depois vinte, e, na altura de Terra Nova, a palavra *você* aparece três vezes e a palavra *vaga* nenhuma. É a primeira versão que soa verdadeira, e você apaga as outras onze."""),
  dict(id='pai', texto='Mandar uma mensagem ao pai: que ele cuide do Buster e confie em você mais uma vez', ir='up_c10_encontro',
   efeitos=dict(flag='b_avisou_pai', vinculo=1),
   resultado="""Você escreve: *Pai, eu entreguei a prova, pedi demissão, e vou procurar uma pessoa. Cuida do Buster. Eu te ligo.* A resposta, de um homem que nunca digita sem erro, chega em duas linhas cheias de erros e de ternura: *vai fiilho. o buster esta cmigo. ele aprovou.*"""),
  dict(id='dormir', texto='Fechar os olhos e tentar dormir, deixando a frase para a hora certa', ir='up_c10_encontro',
   efeitos=dict(flag='b_dormiu_voo'),
   resultado="""Você fecha os olhos, e, pela primeira vez em cinco anos, dorme sem ser em turno de quatro horas. O sono vem pesado, sem sonho, e acorda no meio da descida, com o comissário pedindo que levante o encosto da poltrona. Você levanta, e a frase, sem ensaio, já está pronta, como um pão que cresceu durante o sono."""),
 ])

NOS['up_c10_a'] = dict(tipo='solo', cap=10, seat='A', lugar='RiverScape MetroPark, Dayton', hora='Quarta · 17h45', npcs=['nina'],
 texto="""Quarta-feira, o fim de tarde, o mesmo banco de madeira, o mesmo rio. Você vem aqui desde terça, sem decidir vir, como quem retorna a um lugar onde parou de se defender. O celular vibrou uma vez às onze, uma notificação da Chloe: *A auditoria da matriz foi aberta. Alguém mandou a pasta antes de você. Não sei quem.* Você não respondeu. Não sabe o que sentir.

A mensagem de quatro palavras, enviada ontem à noite, continua sem resposta. Do outro lado do Atlântico, o silêncio é de um tipo que você não consegue classificar: nem *não*, nem *sim*, nem *espera*.

Faz sol, de um jeito fraco, de março, e o rio brilha. Você pensa que talvez a coisa mais corajosa que fez na vida foi dizer *obrigada*, sem adjetivo, a alguém que talvez nunca responda.""",
 acoes=[
  dict(id='ficar', texto='Ficar no banco até o sol baixar, sem esperar nada de ninguém', ir='up_c10_encontro',
   efeitos=dict(flag='a_ficou_parque', vinculo=1),
   resultado="""Você fica. Observa o sol descer devagar, o rio ficar cor de latão, uma família de patos atravessar a margem. Não espera nada, e esse é o ponto: pela primeira vez, a sua tarde não está pendurada em ninguém. Há uma paz de tipo novo nisso, e você a aceita como quem aceita um presente sem perguntar o preço."""),
  dict(id='nina', texto='Ligar para a Nina e perguntar, em voz alta, se ela acha que ele vai vir', ir='up_c10_encontro',
   efeitos=dict(flag='a_pediu_nina', vinculo=1),
   resultado="""— Você acha que ele vem? — você pergunta, e a frase, ao sair, é a coisa mais vulnerável que já disse a alguém. A Nina ri, do outro lado, uma risada macia. *Eu acho que ele já veio*, ela diz. *Só falta chegar.* Você diz *que besteira*, e a Nina diz *anda, vai respirar*, e você desliga, de rosto quente."""),
  dict(id='escrever', texto='Abrir o caderno e escrever, sem lista, só o que está sentindo', ir='up_c10_encontro',
   efeitos=dict(flag='a_escreveu_caderno', vinculo=1),
   resultado="""Você abre o caderno e, sem lista, sem seta, sem item, escreve três linhas: *Eu não sei se ele vem. Eu não sei se eu quero que venha. Eu sei que eu quero que alguém olhe para o meu trabalho e para mim, e que seja a mesma pessoa.* A tinta, no papel, parece mais honesta do que qualquer planilha."""),
 ])

NOS['up_c10_encontro'] = dict(tipo='segue', cap=10, lugar='RiverScape MetroPark, Dayton', hora='Quarta · 19h05',
 ir='up_c10_dialogo',
 texto="""A hora azul chega a Dayton às sete e cinco da noite de uma quarta de março. As luzes da ponte de pedestres acendem, uma a uma, no mesmo compasso de um acorde de piano. No banco de madeira, de casaco emprestado, uma pessoa olha o rio, sem esperar ninguém.

Pelo caminho de cascalho, vindo da direção do estacionamento, de terno amarrotado, de mala de mão e de uma pasta de couro embaixo do braço, caminha alguém que passou vinte e quatro horas sem dormir e doze sem saber o que dizer. Não traz flores. Traz outra coisa.

Quando a pessoa do banco o vê, o relógio da ponte marca sete e seis. {{se flag:entregou_prova}}A pasta de provas, mandada à auditoria da matriz, já chegou a quem devia. {{/se}}{{se flag:entregou_em_maos}}A pasta de provas, entregue em mãos, já foi aberta por quem devia. {{/se}}{{se flag:b_confrontou_marcus}}Marcus Webb já sabe que foi descoberto, e a primeira coisa que fez foi apagar o próprio e-mail. {{/se}}""")

NOS['up_c10_dialogo'] = dict(tipo='dialogo', cap=10, lugar='RiverScape MetroPark, Dayton', hora='Quarta · 19h10', comeca='B',
 texto="""A uns três passos de distância, os dois se olham sem dizer nada. Atrás deles, o rio. À frente, a ponte de pedestres acesa. Não há plateia, nem projetor, nem Marcus Webb, nem vaga. Há duas pessoas e uma conversa que vai ter de ser feita à mão.""",
 turnos=[
  dict(prompt='A primeira frase é sua.', opcoes=[
    op('abre', 'm0_b_abre', '— Você estava certa. Eu estava errado. E eu não quero a vaga. Eu quero você.', se='eu:B', ef=dict(flag='disse_a_frase', vinculo=2)),
    op('seco', 'm0_b_seco', '— Entreguei a prova. Pedi demissão. A matriz já sabe de tudo.', se='eu:B'),
    op('flerte', 'm0_b_flerte', '— Voei oito mil quilômetros para ver um banco de madeira. Ele tem que valer.', se='eu:B'),
    op('abre', 'm0_a_abre', '— Eu não esperava que você viesse. E, agora que veio, não sei onde pôr as mãos.', se='eu:A', ef=dict(vinculo=1)),
    op('seco', 'm0_a_seco', '— Você voou até aqui para me dizer o quê?', se='eu:A'),
    op('flerte', 'm0_a_flerte', '— Você está horrível. Cheira a avião. Fica bem em você.', se='eu:A'),
  ]),
  dict(prompt='Agora você responde.', opcoes=[
    op('abre', 'm1_a_abre', '— Eu estava com medo de que você não acreditasse. E, quando você não acreditou, eu entendi.', se='eu:A', ef=dict(vinculo=1)),
    op('seco', 'm1_a_seco', '— Eu não pedi que você viesse. Eu só mandei as provas.', se='eu:A'),
    op('fere', 'm1_a_fere', '— Você demorou três dias para acreditar em mim. Eu demorei onze anos para acreditar em mim.', se='eu:A', ef=dict(abalo=1)),
    op('abre', 'm1_b_abre', '— Eu fui um covarde na ligação. Eu devia ter dito *eu acredito* sem pensar. Eu pensei, e perdi três dias.', se='eu:B', ef=dict(vinculo=1)),
    op('cuida', 'm1_b_cuida', '— Você está com frio? O casaco é emprestado, dá para ver. Fica com o meu.', se='eu:B'),
    op('seco', 'm1_b_seco', '— Eu não vim para ser perdoado. Vim para dizer o que eu devia ter dito.', se='eu:B'),
  ]),
  dict(prompt='A conversa é sua de novo.', opcoes=[
    op('abre', 'm2_a_abre', '— Eu liguei para o Frank Delaney. Antes de tudo. Eu não consegui ficar quieta.', se='eu:A', ef=dict(vinculo=1)),
    op('flerte', 'm2_a_flerte', '— O Frank me contou que você ligou. Ele quase chorou. Ele nunca chorou.', se='eu:B', ef=dict(vinculo=1)),
    op('abre', 'm2_b_abre', '— O Frank me contou que você ligou para ele. Antes de saber de qualquer coisa de mim. Isso era a prova mais importante.', se='eu:B', ef=dict(vinculo=2)),
    op('cuida', 'm2_a_cuida', '— Você dormiu? Comeu? Tem um café aqui perto, e o Leo gosta de panqueca.', se='eu:A'),
    op('seco', 'm2_a_seco', '— E agora? Você não tem emprego, eu não tenho emprego.', se='eu:A'),
    op('seco', 'm2_b_seco', '— Eu não tenho emprego, nem vaga, nem carta. Tenho um cachorro e uma ideia.', se='eu:B'),
  ]),
  dict(prompt='A última palavra do parque é sua.', opcoes=[
    op('abre', 'm3_a_abre', '— Qual ideia?', se='eu:A', ef=dict(vinculo=1)),
    op('flerte', 'm3_a_flerte', '— Se for uma ideia de empresa, eu aceito. Se for outra, também.', se='eu:A'),
    op('cuida', 'm3_a_cuida', '— Primeiro come. Depois a gente fala de ideia.', se='eu:A'),
    op('abre', 'm3_b_abre', '— Uma empresa nova. Tillman e Nicholls. Operações e dados, juntos. Com gente que sabe os nomes.', se='eu:B', ef=dict(vinculo=1)),
    op('flerte', 'm3_b_flerte', '— Uma empresa que se chame como a gente. E, se não der, ao menos o banco.', se='eu:B'),
    op('seco', 'm3_b_seco', '— Uma empresa. Mas só se você quiser. Eu não faço nada sem você aceitar.', se='eu:B'),
  ]),
 ],
 pool=[
  op('cuida', 'pl_cuida', '— Vem. A gente pode caminhar até a ponte.'),
  op('seco', 'pl_seco', '— Continua.'),
  op('flerte', 'pl_flerte', '— Você é teimoso. Eu gosto.'),
  op('abre', 'pl_abre', '— Eu não esperava ser tão feliz de te ver.'),
  op('fere', 'pl_fere', '— Isso levou tempo demais.'),
 ],
 fecho="""As luzes da ponte de pedestres acendem por completo, num acorde de lâmpadas brancas. O rio, escuro, reflete cada uma. E, em um banco de madeira de Dayton, duas pessoas que passaram uma semana inteira com medo de pedir ajuda em voz alta descobrem que a voz funciona.""",
 ir='up_c10_decisao')

NOS['up_c10_decisao'] = dict(tipo='decisao', cap=10, lugar='RiverScape MetroPark, Dayton', hora='Quarta · 19h40',
 texto="""Tem uma escolha que só pode ser dos dois, porque só existe se os dois a fizerem. Não é mais sobre a vaga, nem sobre o Marcus, nem sobre a fraude, que a auditoria da matriz vai resolver em meses. É sobre o que vem depois de uma semana em que duas pessoas ficaram sem nada.""",
 pergunta='O que vocês fazem com o que vem?',
 ir='up_c10_final',
 acoes=[
  dict(id='empresa', texto='Abrir a Tillman & Nicholls juntos: operações e dados, com o Walter, a Chloe e a Priya', efeitos=dict(flag='abriu_empresa', vinculo=3),
   resultado="""Vocês decidem abrir a empresa. Será pequena, de início: uma sala em River North, duas mesas, um cachorro. Os primeiros funcionários serão a Chloe, que acabou de achar a página dezessete, e o Walter, que já sabe dirigir. A primeira cliente será o Frank Delaney, que vai pedir que o contrato seja escrito à mão."""),
  dict(id='devagar', texto='Ir devagar: um jantar, depois um fim de semana, depois uma conversa sobre trabalho', efeitos=dict(flag='foi_devagar', vinculo=2),
   resultado="""Vocês decidem ir devagar. Um jantar, depois um fim de semana, depois uma conversa sobre trabalho, e cada coisa no seu tempo. É uma decisão de adultos que já aprenderam que o que se faz com pressa se desfaz com pressa. Os dois sorriem do mesmo jeito, de lado, como quem guarda uma coisa boa para mais tarde."""),
  dict(id='separado', texto='Cada um segue o seu caminho por enquanto: respeito, cuidado, e uma porta aberta', efeitos=dict(flag='cada_um_segue'),
   resultado="""Vocês decidem não decidir tudo hoje. Cada um segue o seu caminho por enquanto: ela, com a Megan e a Nina, a reunir os pedaços; ele, com o pai e o cachorro, a reerguer o galpão. A porta fica aberta, e os dois sabem disso. Não é um fim: é uma pausa de quem ainda tem muita vida pela frente."""),
 ])

NOS['up_c10_final'] = dict(tipo='final', cap=10, lugar='Dayton e Chicago', hora='Seis meses depois',
 finais=[
  dict(se='flag:abriu_empresa && vinc>=9', texto="""Em setembro, num sábado de sol frio, a placa de bronze da porta, em River North, diz **TILLMAN & NICHOLLS · Operações e Dados**. A sala é pequena: duas mesas, uma estante de livros dobrados, uma cafeteira que faz café melhor do que a do galpão. Na parede, uma planilha impressa e, ao lado, uma fotografia de um homem de colete refletivo com um dente de ouro.

A auditoria da Meridian Global durou quatro meses. Marcus Webb saiu da empresa por *motivos pessoais*, e a MW Holdings foi dissolvida por ordem de um juiz federal. O nome da autora do valuation aparece, na versão pública do relatório, como *a analista que primeiro alertou*. Ninguém na Meridian disse *foi um erro*, mas Priya Patel, que entregou a carta de demissão no dia seguinte, passou a trabalhar de segunda a sexta, no fundo da sala, onde, finalmente, fala em voz alta.

Os dois ainda brigam por cada parágrafo de contrato. {{se flag:noite_412}}O que aconteceu no 412 nunca foi tema de nenhuma reunião, e é a razão de todas elas. {{/se}}{{se !flag:noite_412}}O que não aconteceu no 412 foi, com o tempo, acontecendo aos poucos, a cada jantar. {{/se}}{{se flag:beijo_cafe}}Há um café em Viena que ninguém, até agora, voltou a visitar, mas que os dois já combinaram de visitar em março. {{/se}}O Buster dorme embaixo da mesa de operações, de orelha caída e orelha em pé, com a expressão de quem aprovou todas as decisões da vida adulta que ninguém lhe pediu para aprovar.

Em cima da mesa de dados, ao lado de um copo de café, há uma folha de papel do Hotel Imperial, dobrada e amassada, com quatro regras e duas assinaturas, uma em cima da outra, como se feitas pela mesma mão. Na quarta regra, acrescentada a lápis, uma frase nova: *quem ganhar, ganha junto.*"""),
  dict(se='flag:foi_devagar || flag:abriu_empresa', texto="""Em setembro, num sábado de sol frio, uma pessoa de Chicago e uma pessoa de Dayton jantam num restaurante pequeno de Oakwood, de toalha de papel e vela de pote. Passaram o verão assim: uma viagem de carro a Cincinnati, um fim de semana no lago Erie, uma noite de pizza na cozinha da Megan, com o Leo mostrando o tiranossauro de dente quebrado.

A auditoria da Meridian Global durou quatro meses. Marcus Webb saiu da empresa por *motivos pessoais*, e a MW Holdings foi dissolvida. O nome da autora do valuation aparece, na versão pública do relatório, como *a analista que primeiro alertou*. {{se flag:a_aceitou_valer}}Ela não leu o relatório inteiro: já tinha aprendido, num banco de madeira, que não precisa da plateia. {{/se}}

Nenhum dos dois tem emprego fixo, e os dois têm planos demais para caber num guardanapo. {{se flag:beijo_cafe}}Há um café em Viena que ninguém, até agora, voltou a visitar, mas que os dois já combinaram de visitar em março. {{/se}}O Buster, que foi apresentado à Megan, ao Leo e à Nina, já escolheu um lado do sofá em cada casa. A vaga que nunca existiu virou piada de família, a primeira que os dois dividem."""),
  dict(texto="""Em setembro, num sábado de sol frio, uma pessoa de Chicago e uma pessoa de Dayton se falam por telefone, às oito da noite, como combinaram. A auditoria da Meridian Global durou quatro meses. Marcus Webb saiu da empresa, e a MW Holdings foi dissolvida. O nome da autora do valuation aparece, na versão pública do relatório, como *a analista que primeiro alertou*.

Cada um reconstruiu a sua vida: ela, com um cargo novo numa empresa pequena de logística de Columbus; ele, com o galpão da família alugado a uma cooperativa de motoristas. Não se veem todo mês, nem toda semana, e a distância, que um dia parecia o fim, hoje parece uma escolha. {{se flag:beijo_cafe}}Há um café em Viena que ninguém, até agora, voltou a visitar, e o convite, que nunca foi feito, ainda está de pé. {{/se}}

A vaga nunca existiu, e a coisa que existiu, em vez dela, foi uma semana em que duas pessoas aprenderam a pedir ajuda em voz alta. O resto, como diria o seu Frank Delaney, é viagem."""),
 ])
