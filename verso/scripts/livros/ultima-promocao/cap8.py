# A Última Promoção · Capítulo 8 · A descoberta
NOS = {}

def op(tom, tag, texto, se=None, ef=None, acao=False):
    d = dict(tom=tom, tag=tag, texto=texto)
    if se: d['se'] = se
    if ef: d['efeitos'] = ef
    if acao: d['acao'] = True
    return d

NOS['up_c8_chloe'] = dict(tipo='segue', cap=8, lugar='Hofburg Congress Center, Viena', hora='Domingo · 15h10',
 ir={'A': 'up_c8_a', 'B': 'up_c8_b'},
 texto="""Às três e dez da tarde de domingo, num congresso onde quatrocentas pessoas discutem logística de cadeia fria, os dois candidatos à mesma vaga estão, cada um num canto diferente do Hofburg, com o celular colado à orelha e a mesma voz do outro lado: Chloe Bennett, vinte e quatro anos, estagiária, de Chicago, falando mais depressa do que respira.

Ela achou a página dezessete. Não achou sozinha: o arquivo foi parar na sua caixa de entrada, de um endereço sem nome, às quatro da manhã, com um assunto em letras maiúsculas: *PARA QUEM TIVER CORAGEM.*

Cada um dos dois, sem saber, vai ouvir uma metade da mesma história, contada de um jeito diferente, para quem é capaz de entender melhor.""")

NOS['up_c8_a'] = dict(tipo='solo', cap=8, seat='A', lugar='Corredor, Hofburg Congress Center', hora='Domingo · 15h15',
 texto="""— Eu abri a página dezessete — diz Chloe, e a voz dela, que nunca treme, treme. — É uma planilha. A original, de março. O seu valuation. Vinte e três milhões de dólares.

Você não diz nada. O número que você entregou em março, o que você conferiu onze vezes, foi vinte e três. O número que a Meridian pagou, o que você viu no arquivo da aquisição, foi sessenta e quatro. A diferença, quarenta e um milhões, tem nome: *ajuste de sinergias*, assinado por MW-0017.

— Alguém trocou o número depois que você assinou — diz Chloe. — Com a sua assinatura. E o dinheiro da diferença foi para uma empresa chamada MW Holdings. {{A.nome}}... é o Marcus.

No corredor do Hofburg, de mármore claro, você sente as pernas decidirem sozinhas.""",
 acoes=[
  dict(id='provas', texto='Pedir à Chloe que mande tudo para você agora, com data, hora e origem de cada arquivo', ir='up_c8_marcus_a',
   efeitos=dict(flag='a_tem_provas', vinculo=1),
   resultado="""— Manda tudo — você diz. — Cada arquivo. Com a data, a hora e o caminho. Sem editar nada. — Chloe, do outro lado, solta uma risada curta, de alívio. *Eu já mandei. Está na sua caixa de entrada faz vinte minutos.* Você abre o e-mail, em pé no corredor, e rola uma pasta de quarenta e três arquivos. Você nunca teve tanta prova nas mãos. Nem tanto medo."""),
  dict(id='avisar', texto='Dizer à Chloe que vai contar a verdade à pessoa do 412 antes de qualquer outra coisa', ir='up_c8_marcus_a',
   efeitos=dict(flag='a_quer_avisar', vinculo=2, abalo=1),
   resultado="""— Preciso contar para a outra pessoa — você diz. Chloe fica em silêncio, a mesma pausa de quem pensa em dizer *cuidado*. *Eu a vi em Chicago, uma vez, no elevador*, ela diz, devagar. *Ela parece... ela parece alguém que gosta de ser enganado, sem saber que gosta. Mas eu confio em você.* Você desliga, e fica olhando a porta do salão, onde ele ou ela ri com um delegado, e não vai."""),
  dict(id='sozinha', texto='Decidir que vai resolver isso sozinh{{eu.o_a}}, antes de dizer qualquer coisa a qualquer pessoa', ir='up_c8_marcus_a',
   efeitos=dict(flag='a_sozinha', abalo=2),
   resultado="""Você desliga. Fica um minuto parada no corredor, com a mão no mármore frio da parede. A regra que você aprendeu em onze anos de Meridian é a que sempre funcionou: *não peça ajuda em voz alta*. Hoje, ela soa como uma sentença. Você abre o laptop, ali mesmo, no chão, encostad{{eu.o_a}} na parede, e começa a organizar a pasta."""),
 ])

NOS['up_c8_b'] = dict(tipo='solo', cap=8, seat='B', lugar='Corredor, Hofburg Congress Center', hora='Domingo · 15h15',
 texto="""— Eu achei a página dezessete — diz Chloe. — A subsidiária. MW Holdings. É a empresa que recebeu a diferença entre o valuation e o preço de compra. Quarenta e um milhões de dólares. Alguém a registrou em Illinois três dias antes da fusão, com uma caixa postal em Lincoln Park.

Você já sabia do Lincoln Park. Não sabia o resto.

— O valuation original foi assinado por ela — continua Chloe, e a palavra *ela* pesa como um cabide caindo. — Vinte e três milhões. A Meridian pagou sessenta e quatro. Alguém, depois, adulterou o número. Pode ter sido ela, pode ter sido o Marcus. Mas o endereço... o endereço fica a dois quarteirões do apartamento dela.

Você olha, no fim do corredor, a pessoa que ontem à noite dançou com você, de costas, conversando com uma delegada brasileira. Os ombros dela, daqui, parecem os de qualquer um.""",
 acoes=[
  dict(id='confiar', texto='Dizer à Chloe que não acredita: a pessoa do 412 não faria isso', ir='up_c8_marcus_b',
   efeitos=dict(flag='b_confia', vinculo=2),
   resultado="""— Não foi ela — você diz. A Chloe discorda, suave, com a fala de quem já viu isso acontecer: *você só a conhece há uma semana.* Você diz: *é o tempo que levou para eu conhecer meia vida inteira de gente. Não foi ela.* Há um silêncio, e depois uma frase que você não esperava: *então eu vou ajudar você a provar.*"""),
  dict(id='duvidar', texto='Dizer à Chloe que vai ficar de olho: até agora, nada impede que seja ela', ir='up_c8_marcus_b',
   efeitos=dict(flag='b_duvida', abalo=2),
   resultado="""— Fica de olho — você diz. — Em tudo. Nas duas. — A Chloe, do outro lado, anota. Você desliga e sente a coisa pior que a dúvida produz: a de ela ter razão e você ter dançado valsa com uma pessoa que talvez tenha vendido a empresa da sua família. O corredor, de repente, tem corrente de ar."""),
  dict(id='perguntar', texto='Dizer que vai perguntar a ela diretamente, sem acusar, hoje à noite', ir='up_c8_marcus_b',
   efeitos=dict(flag='b_vai_perguntar', vinculo=1),
   resultado="""— Eu vou perguntar — você diz. — Sem acusar. Só perguntar. — Chloe fica em silêncio por um tempo. *E se ela mentir?* Você pensa por um segundo. *Então eu saberei como é ser enganado por alguém em quem eu quis acreditar. Já sei como é ser enganado por quem não quero acreditar.*"""),
 ])

NOS['up_c8_marcus_b'] = dict(tipo='solo', cap=8, seat='B', lugar='Restaurante Steirereck, Viena', hora='Domingo · 20h00', npcs=['marcus'],
 texto="""O Steirereck tem três estrelas Michelin, uma varanda sobre um riacho e um sommelier que fala de vinhos como outros falam de guerras. Marcus Webb, de terno azul-marinho, sorriso de comercial de seguro de vida, espera você numa mesa para dois, de costas para a parede, com uma garrafa de Riesling Smaragd aberta.

— {{B.nome}}! — diz ele, de braços abertos, como se fosse uma reunião de família. — Senta. Você merece. Duas apresentações. Duas ovações. A Meridian não via isso desde 2011.

Entre o aperitivo e a entrada, ele fala de futuro. Do Meio-Oeste, de metas, de uma *oportunidade de crescimento que raramente aparece para pessoas com o seu perfil*. A palavra *perfil* é a que ele usa quando não quer dizer *sobrenome*. Depois, sem pausa, sorri e diz a frase que você esperava e temia:

— A vaga é sua. Eu só preciso de uma coisa: que você assine uma carta de intenções hoje à noite.""",
 acoes=[
  dict(id='aceitar', texto='Aceitar a vaga, assinar a carta e esperar para ver o que acontece', ir='up_c8_telefone',
   efeitos=dict(flag='dean_vaga', abalo=2),
   resultado="""Você assina. A caneta, de ouro, é pesada, e a assinatura, que você conhece há quarenta e um anos, sai do papel em uma versão que não é bem a sua. Marcus ergue a taça. *À nossa parceria.* Você ergue a sua, sentindo o Riesling descer como uma pedra, e a coisa que não consegue parar de pensar é: *ele não me perguntou nada sobre a outra pessoa.*"""),
  dict(id='recusar', texto='Recusar a carta: não assina nada hoje, e quer ver a oferta por escrito antes', ir='up_c8_telefone',
   efeitos=dict(flag='b_recusou_carta', vinculo=1),
   resultado="""— Eu prefiro ver por escrito, Marcus — você diz. — Com o jurídico. E sem pressa. — O sorriso de Marcus não muda, mas os olhos, sim. *Claro*, ele diz. *Claro. Eu entendo.* E, com a entrada, muda de assunto, para o vinho, para o clima, para a cidade. Você sabe que acabou de fazer um inimigo, e não sente nada além de um alívio fino."""),
  dict(id='perguntar', texto='Perguntar a ele, sem rodeios, sobre a MW Holdings', ir='up_c8_telefone',
   efeitos=dict(flag='b_perguntou_mw', abalo=2),
   resultado="""— Marcus, o que é a MW Holdings? — A pergunta sai antes de você decidir. O garfo de Marcus para a meio caminho. *Uma estrutura de planejamento fiscal*, ele diz, depois de dois segundos longos demais. *Rotina. Quem te falou?* Você diz que viu o nome num papel, e ele sorri, e a sua resposta é a mais perigosa da noite: *eu gosto de gente que lê.*"""),
 ])

NOS['up_c8_marcus_a'] = dict(tipo='solo', cap=8, seat='A', lugar='Meridian Group, 41º andar, Chicago', hora='Segunda · 08h00', npcs=['marcus', 'priya'],
 texto="""A sala de Marcus Webb, no 41º andar, tem uma mesa de vidro, uma vista do lago e uma planta que, hoje, você descobre ser de plástico. Você chegou às sete e quarenta, direto do aeroporto, com o cabelo ainda cheirando a avião, a pasta de quarenta e três arquivos num pen drive no bolso e a coragem emprestada de uma estagiária.

Marcus, de pé junto à janela, com as mãos nas costas, não se vira.

— Sente, {{A.nome}}. — A voz é a de sempre, a de comunicado interno. — Tenho uma notícia difícil. A Meridian decidiu, em comum acordo com a diretoria, encerrar o seu ciclo conosco. O processo seletivo foi encerrado. O outro candidato foi escolhido. Há um pacote. A Priya está com os papéis.

Você nem se senta. Do outro lado da mesa de vidro, em uma bandeja, estão os papéis da sua demissão, já assinados por ele, com a data de ontem.""",
 acoes=[
  dict(id='provas', texto='Colocar o pen drive sobre a mesa e dizer que sabe da página dezessete', ir='up_c8_telefone',
   efeitos=dict(flag='a_confrontou', abalo=2),
   resultado="""Você tira o pen drive do bolso e o coloca em cima do vidro, sem fazer barulho. *Página dezessete*, você diz. *O valuation de vinte e três. A MW Holdings. A matrícula MW-0017.* Marcus, ainda de costas, fica quieto por um tempo comprido. Quando se vira, o sorriso é o mesmo, e os olhos, outros. *Você tem uma teoria*, ele diz. *Eu tenho um contrato de confidencialidade assinado por você, e uma equipe jurídica de quarenta pessoas.*"""),
  dict(id='explicacao', texto='Perguntar a ele por que a escolha foi essa, e deixar que ele fale', ir='up_c8_telefone',
   efeitos=dict(flag='a_deixou_falar'),
   resultado="""Você pergunta, em voz plana, por que a decisão foi essa. Marcus fala por três minutos, sobre *alinhamento cultural* e *perfis de liderança*, com a fluência de quem recita. Você escuta, sem anotar, sabendo que cada palavra dele é uma prova de que a pessoa que a disse tem muito a esconder. A frase final, a mais reveladora, vem sem querer: *você sempre soube demais, {{A.nome}}.*"""),
  dict(id='sair', texto='Pegar os papéis, não dizer nada, e sair com a dignidade que sobrou', ir='up_c8_telefone',
   efeitos=dict(flag='a_saiu_calada', vinculo=1),
   resultado="""Você pega os papéis e os dobra em três. Não assina nada. Não diz nada. Em onze anos de Meridian, a coisa mais firme que você já fez foi sair de uma sala sem fazer barulho. No corredor, Priya Patel, de olhos no chão, segura a porta do elevador, e, quando as portas fecham, diz uma frase em voz baixíssima: *eu sinto muito. Eu sinto muito mesmo.*"""),
 ])

NOS['up_c8_telefone'] = dict(tipo='dividir', cap=8, lugar='Chamada de vídeo, Chicago e Viena', hora='Segunda · 09h40', cada=1,
 texto="""Às nove e quarenta da manhã de Chicago, às quatro e quarenta da tarde de Viena, um celular toca no Hofburg. Do outro lado, com os olhos secos e a voz plana de quem já chorou e já parou, uma pessoa de Chicago diz, sem preâmbulo, o que aconteceu: a demissão, a página dezessete, a MW Holdings, o número trocado.

A pessoa de Viena escuta de pé, de costas para uma janela, com a mão no bolso, e, por dois segundos, não responde.""",
 pergunta='Como você reage?',
 acoes=[
  dict(id='insistir', seat='A', texto='Insistir: repetir os fatos, devagar, sem adjetivos, e esperar', efeitos=dict(flag='a_insistiu', vinculo=1),
   resultado="""Você repete tudo, na mesma ordem, com a mesma voz. Os fatos não mudam por serem ditos duas vezes, e você sabe disso, e diz mesmo assim. É a única forma de pedir ajuda que você conhece: dizer a verdade de novo, até o outro ouvir."""),
  dict(id='email', seat='A', texto='Mandar a pasta de provas por e-mail e dizer que cada um tire as suas conclusões', efeitos=dict(flag='a_mandou_provas'),
   resultado="""Você diz: *vou te mandar tudo, agora. Lê. Tira as suas conclusões. Eu não vou pedir que acredite.* Enquanto fala, o dedo já envia a pasta. É um gesto de orgulho e de confiança, e você não sabe qual vem primeiro."""),
  dict(id='desligar', seat='A', texto='Dizer o que tinha a dizer e desligar, antes que a voz falhe', efeitos=dict(flag='a_desligou', abalo=2),
   resultado="""Você diz *é isso* e desliga. A tela escura devolve o seu rosto, que você não reconhece. Você esperava ouvir *eu acredito*, e a ausência de resposta é a pior das respostas. Em Chicago, o dia, de repente, tem uma luz que não vem de nenhuma janela."""),
  dict(id='acreditar', seat='B', texto='Acreditar: dizer que ela sempre disse a verdade, e que está do lado dela', efeitos=dict(flag='acreditou_nela', vinculo=3),
   resultado="""— Eu acredito em você — você diz. A frase sai antes do cálculo, e, depois de dita, é a única coisa de que você tem certeza. Do outro lado, um silêncio de três segundos, e depois uma respiração funda, de quem estava prendendo o ar havia horas. *Obrigad{{A.o_a}}*, diz a voz, e a palavra, pela primeira vez, não soa formal."""),
  dict(id='duvidar', seat='B', texto='Duvidar: dizer que precisa ver provas, e que não consegue decidir assim', efeitos=dict(flag='duvidou_dela', abalo=2),
   resultado="""— Eu preciso ver provas — você diz. A frase, razoável, pesa como uma porta batida. Do outro lado, um silêncio que você não sabe interpretar. *Claro*, diz a voz, em tom de comunicado. *Eu mando.* E a chamada acaba, sem *tchau*, sem nada, com a certeza ruim de que errou na hora certa."""),
  dict(id='tempo', seat='B', texto='Pedir tempo: dizer que precisa pensar, e que ligará em algumas horas', efeitos=dict(flag='pediu_tempo', abalo=1),
   resultado="""— Preciso de algumas horas — você diz. — Eu ligo. — Do outro lado, a voz concorda com a cabeça, você sente pelo tom. *Tudo bem.* A frase, curta, tem o peso de tudo o que ela não está dizendo. Você pensa em dizer mais, e não diz, e desliga, e a hora seguinte é a mais longa da semana."""),
 ],
 desfecho="""A chamada termina, de um jeito ou de outro, e em Viena e em Chicago, dois celulares ficam sozinhos em duas mãos, com a luz da tela se apagando devagar.""",
 ir='up_c8_fim')

NOS['up_c8_fim'] = dict(tipo='fim', cap=8, lugar='Hofburg Congress Center, Viena', hora='Segunda · 17h30',
 texto="""Às cinco e meia da tarde, na saída do último painel, a pessoa que ficou em Viena guarda o crachá no bolso e liga o celular, que ficou desligado por uma hora. {{se flag:acreditou_nela}}A voz dela, dizendo *obrigada*, ainda está na cabeça. {{/se}}{{se flag:duvidou_dela}}A frase *eu preciso ver provas* ainda está na cabeça, como uma porta batida. {{/se}}{{se flag:pediu_tempo}}A promessa de ligar em algumas horas ainda está de pé, e as horas passaram. {{/se}}{{se flag:dean_vaga}}No bolso do terno, uma carta de intenções assinada com uma caneta de ouro pesa mais do que devia. {{/se}}

Na tela, uma única notificação, de um endereço de e-mail que a pessoa reconhece e não sabe se reconhece de verdade: o nome de quem foi demitida às oito da manhã, em Chicago. Assunto: *Prova.* Dentro, sem texto, só um anexo: uma pasta compactada, de quarenta e três arquivos, com o nome *MW-0017*.

{{se flag:a_mandou_provas}}Era isso que ela dissera que mandaria. {{/se}}{{se !flag:a_mandou_provas}}Ninguém disse que ela mandaria. {{/se}}O polegar fica sobre o botão de abrir por um tempo que não cabe em nenhum cronômetro.""",
 gancho="Ela mandou a pasta de provas. Falta decidir se ele abre.",
 ir='up_c9_dayton')
