# A Última Promoção · Capítulo 2 · A viagem
NOS = {}

def op(tom, tag, texto, se=None, ef=None, acao=False):
    d = dict(tom=tom, tag=tag, texto=texto)
    if se: d['se'] = se
    if ef: d['efeitos'] = ef
    if acao: d['acao'] = True
    return d

NOS['up_c2_aeroporto'] = dict(tipo='segue', cap=2, lugar="Terminal 5, O'Hare, Chicago", hora='Quinta · 16h10', npcs=['priya'],
 ir={'A': 'up_c2_a', 'B': 'up_c2_b'},
 texto="""O Terminal 5 do O'Hare, numa quinta-feira de março, tem o cheiro de todo aeroporto internacional: carpete, pretzel quente e o álcool em gel que alguém acabou de passar nas mãos. Dois mil e duzentos passageiros, quatro portões de embarque para a Europa e uma fila de controle de passaporte que dá a volta no balcão de café.

A confirmação da reserva diz *poltronas 24A e 24B*, lado a lado, janela e corredor. Quem comprou foi Priya Patel, a assistente do Marcus, a mando do Marcus, e o que quer que Marcus pense de trabalho em equipe vem impresso numa folha A4 que já está amassada nos bolsos de dois candidatos.

{{se flag:competir_limpo}}Vocês combinaram competir limpo, e competir limpo, pelo visto, começa com dividir um braço de poltrona. {{/se}}{{se flag:sem_regras}}Nada ficou combinado, então a poltrona do lado é, por enquanto, território neutro. {{/se}}{{se flag:trocar_info}}Vocês combinaram trocar informação, e a primeira ficha chega na fila do passaporte: nenhum dos dois sabe nada. {{/se}}

Cada um, por um motivo diferente, preferia ter ido sozinho.""")

NOS['up_c2_a'] = dict(tipo='solo', cap=2, seat='A', lugar="Portão K14, O'Hare", hora='Quinta · 16h50',
 texto="""Você tem trinta e oito anos, um passaporte com quarenta e dois carimbos e um segredo que nunca contou a ninguém da Meridian: você tem pavor de avião.

Não é um medo comum. É um medo organizado, com ritual. Você chega duas horas antes, escolhe sempre o corredor, conta as saídas de emergência, e não bebe nada com álcool antes da decolagem porque o álcool, dizem, piora. Fez isso em quarenta e dois países. Nunca disse a ninguém, nem a Nina, nem à Megan, porque *medo de avião* é um assunto que alguém resolve com uma frase gentil, e você não suporta frase gentil.

A pessoa que vai se sentar no 24B está na outra ponta do portão, de gravata afrouxada, olhando para o celular com a testa franzida. Você sente a palma da mão úmida contra o couro da pasta.""",
 acoes=[
  dict(id='ritual', texto='Fazer o ritual completo: contar as saídas, respirar em quatro tempos, sem olhar para ninguém', ir='up_c2_voo',
   efeitos=dict(flag='a_fez_ritual'),
   resultado="""Você conta: duas saídas na frente, duas no meio, duas atrás. Respira em quatro tempos, segura quatro, solta quatro. A palma da mão seca devagar. Ninguém no portão percebe nada, e essa é a única medida de sucesso que você aceita."""),
  dict(id='bar', texto='Ir ao bar do terminal e pedir uma dose, contra todas as suas regras', ir='up_c2_voo',
   efeitos=dict(flag='a_bebeu', abalo=1),
   resultado="""Você atravessa o saguão e senta no balcão de um bar de aeroporto que serve vodca em copo plástico. Pede uma dose dupla, a primeira em um ano. Quando está na metade, o bartender, um homem de bigode, pergunta se você vai viajar a trabalho. *A trabalho*, você responde. Ele diz que então vai precisar de outra."""),
  dict(id='mensagem', texto='Mandar uma mensagem para a Nina dizendo a verdade, pela primeira vez', ir='up_c2_voo',
   efeitos=dict(flag='a_contou_nina', vinculo=1),
   resultado="""Você escreve: *Nina. Eu tenho medo de avião. Sempre tive. Nunca te contei.* Envia antes de pensar. A resposta chega em vinte segundos: *{{A.nome}}. Eu sei desde 2019, quando você segurou a minha mão no voo para Denver e disse que era frio. Liga quando pousar.* Você lê duas vezes. Descobre que há coisas que as pessoas sabem sem terem sido informadas."""),
 ])

NOS['up_c2_b'] = dict(tipo='solo', cap=2, seat='B', lugar="Portão K14, O'Hare", hora='Quinta · 16h50',
 texto="""O portão K14 tem um painel eletrônico que diz *VIENA, ATRASADO 20 MIN*, e quarenta passageiros que olham para o painel com a expressão de quem espera que ele mude por vontade própria. Você, que nunca sentou numa cadeira de aeroporto sem sentir que está no lugar errado, está sentado numa cadeira de aeroporto, no lugar errado, com a gravata afrouxada e o celular na mão.

Na tela, uma mensagem da Chloe, de oito minutos atrás, com um anexo de duas páginas: *Meridian Group. Três diretores saíram em dezoito meses. Todos de áreas que o Marcus Webb comandou. Ninguém quis falar. Priya Patel foi a única que atendeu o telefone e desligou em quatro segundos. Mais amanhã.*

Do outro lado do portão, a pessoa que vai se sentar no 24A está de pé, de costas, segurando a alça de uma pasta de couro com tanta força que os nós dos dedos estão brancos. Você conhece essa postura. É a de quem está tentando não cair de um lugar alto.""",
 acoes=[
  dict(id='observar', texto='Observar de longe, sem dizer nada, e guardar a informação', ir='up_c2_voo',
   efeitos=dict(flag='b_notou_medo'),
   resultado="""Você não vai até lá. Observa. A mão que aperta a pasta, a respiração contada, a boca que se mexe sem som. Você já viu isso antes, em um irmão que tinha medo do escuro. Guarda, como quem guarda um trunfo e sente vergonha de guardar."""),
  dict(id='cafe', texto='Ir à cafeteria e voltar com dois cafés, sem dizer por quê', ir='up_c2_voo',
   efeitos=dict(flag='b_levou_cafe', vinculo=1),
   resultado="""Você atravessa o saguão, espera na fila, volta com dois copos de papel. Estende um sem olhar. *Não sei como você toma*, diz. *Eu pedi igual ao meu.* Ninguém agradece, e o café, que está horrível, é a primeira coisa que os dois dividem."""),
  dict(id='chloe', texto='Responder à Chloe e pedir que ela procure o que o Marcus assinou nos últimos dois anos', ir='up_c2_voo',
   efeitos=dict(flag='b_pediu_marcus', abalo=1),
   resultado="""Você responde: *Procura tudo que o Marcus assinou nos últimos dois anos. Contratos, aquisições, qualquer coisa.* Chloe digita por um minuto e depois escreve só: *Estou dentro. Cuidado com ela. Ou com ele. Sei lá. Cuidado com todo mundo.* A palavra *todo mundo* fica na tela por mais tempo do que devia."""),
 ])

NOS['up_c2_voo'] = dict(tipo='dividir', cap=2, lugar='Austrian Airlines, poltronas 24A e 24B', hora='Quinta · 20h30', cada=1,
 texto="""O voo decolou com vinte e cinco minutos de atraso, sobre um lago Michigan que parecia uma placa de metal escuro. Agora, a dez mil metros, com a cabine em penumbra e o serviço de bordo servido, as duas poltronas do 24 dividem um braço de apoio que ninguém sabe quem tem direito de usar.

Oito horas e quarenta minutos até Viena. O avião estremece de leve. Um dos dois escuta o tremor como uma coisa que está acontecendo em outro lugar, e o outro como um aviso.""",
 pergunta='O que você faz com as oito horas?',
 acoes=[
  dict(id='trabalhar', texto='Abrir o laptop e trabalhar na apresentação, ignorando a pessoa do lado', efeitos=dict(flag='voo_trabalhou'),
   resultado="""Você abre o laptop e revisa a apresentação, slide por slide. É um jeito de estar presente e ausente ao mesmo tempo, e funciona por uma hora e meia. Depois uma turbulência sacode a cabine, a tela treme, e a sua concentração cai com ela."""),
  dict(id='conversar', texto='Puxar conversa, nem que seja sobre o filme da tela', efeitos=dict(flag='voo_conversou', vinculo=1),
   resultado="""Você diz *que filme está passando?*, que é a pergunta mais boba que existe. A outra pessoa responde *uma comédia romântica ruim*, e vocês olham juntos para a tela por quarenta minutos, com o volume baixo e uma mini-garrafa de vinho dividida em dois copos de plástico. É a primeira conversa em que ninguém quer ganhar."""),
  dict(id='dormir', texto='Tentar dormir, com a manta até o queixo, fingindo que não existe ninguém ali', efeitos=dict(flag='voo_dormiu'),
   resultado="""Você puxa a manta, ajeita o travesseiro e fecha os olhos. Dormir, para você, é uma competência, uma disciplina de quem passou anos dormindo em lugares onde não devia. Em vinte minutos o corpo desliga. Mas, em algum ponto da madrugada, uma cabeça cai do lado errado, e você acorda com um peso conhecido no ombro."""),
 ],
 desfecho="""Às duas da manhã, hora de Chicago, o piloto avisa em alemão e em inglês, com a voz de quem recita uma poesia chata, que vão atravessar uma zona de turbulência sobre o Atlântico Norte, e que, por favor, todos permaneçam sentados e com o cinto afivelado.""",
 ir='up_c2_dialogo')

NOS['up_c2_dialogo'] = dict(tipo='dialogo', cap=2, lugar='Poltronas 24A e 24B', hora='Sexta · 02h15', comeca='B',
 texto="""A turbulência dura quarenta minutos e é do tipo que faz o café saltar do copo. Os passageiros, em volta, seguram o que podem: braços de poltrona, mãos de desconhecidos, o próprio cinto. No 24, há dois braços de apoio, um deles ocupado por uma mão que, a cada solavanco, aperta mais.

Com a cabine em penumbra e o motor roncando, é a primeira vez em três dias em que ninguém tem plateia.""",
 turnos=[
  dict(prompt='A primeira frase é sua.', opcoes=[
    op('cuida', 'f0_cuida', '— Ei. Está tudo bem. Isso é normal, o avião foi feito para isso.', se='eu:B'),
    op('flerte', 'f0_flerte', '— Se a gente cair, pelo menos eu ganho a vaga por W.O.', se='eu:B'),
    op('abre', 'f0_abre', '— Pode segurar a minha mão. Eu não conto para ninguém.', se='eu:B', ef=dict(vinculo=1)),
    op('seco', 'f0_a_seco', '— Não olhe para mim assim. Eu estou perfeitamente bem.', se='eu:A'),
    op('abre', 'f0_a_abre', '— Eu tenho medo de avião. Sempre tive. Ninguém sabe.', se='eu:A', ef=dict(vinculo=1)),
    op('fere', 'f0_a_fere', '— Se você contar isso para o Marcus, eu acabo com você.', se='eu:A', ef=dict(abalo=1)),
  ]),
  dict(prompt='Agora você responde.', opcoes=[
    op('cuida', 'f1_cuida', '— Eu sei. Percebi no portão. Você contou as saídas de emergência.', se='eu:B'),
    op('flerte', 'f1_flerte', '— Quarenta e dois países, e ainda assim a mão aperta como se fosse o primeiro.', se='eu:B'),
    op('seco', 'f1_seco', '— Não vou contar. Eu não sou esse tipo de rival.', se='eu:B'),
    op('abre', 'f1_a_abre', '— Obrigada ou obrigado. Por não rir.', se='eu:A', ef=dict(vinculo=1)),
    op('seco', 'f1_a_seco', '— Chega. Eu não preciso de plateia.', se='eu:A'),
    op('flerte', 'f1_a_flerte', '— Você é mais atento do que o seu perfil no LinkedIn.', se='eu:A'),
  ]),
  dict(prompt='A conversa é sua de novo.', opcoes=[
    op('abre', 'f2_abre', '— Eu também tenho um segredo. Eu moro no escritório. Faz cinco anos.', se='eu:B', ef=dict(flag='dean_contou_escritorio', vinculo=1)),
    op('cuida', 'f2_cuida', '— Fala comigo enquanto passa. Fala qualquer coisa. Do trabalho, do que for.', se='eu:B'),
    op('flerte', 'f2_flerte', '— Se você aguentou quarenta minutos de turbulência, aguenta seis dias de mim.', se='eu:B'),
    op('abre', 'f2_a_abre', '— O meu apartamento tem uma mesa sem cadeira. Eu nunca recebi ninguém.', se='eu:A', ef=dict(flag='joanna_contou_apto', vinculo=1)),
    op('cuida', 'f2_a_cuida', '— Fala você. A sua voz ajuda.', se='eu:A'),
    op('seco', 'f2_a_seco', '— Eu vou me concentrar na respiração. Não precisa responder.', se='eu:A'),
  ]),
  dict(prompt='A última palavra da noite é sua.', opcoes=[
    op('abre', 'f3_abre', '— Boa noite. E, se ajudar, eu não vou a lugar nenhum.', se='eu:B', ef=dict(vinculo=1)),
    op('flerte', 'f3_flerte', '— Se eu cair no sono no seu ombro, finja que não viu.', se='eu:B'),
    op('seco', 'f3_seco', '— Boa noite. Amanhã a gente volta a ser inimigos.', se='eu:B'),
    op('abre', 'f3_a_abre', '— Boa noite. E obrigada, de verdade.', se='eu:A', ef=dict(vinculo=1)),
    op('flerte', 'f3_a_flerte', '— Se eu cair no sono no seu ombro, finja que foi acidente.', se='eu:A'),
    op('seco', 'f3_a_seco', '— Boa noite. Amanhã, de volta ao sobrenome.', se='eu:A'),
  ]),
 ],
 pool=[
  op('cuida', 'pl_cuida', '— Quer água? Eu pego.'),
  op('seco', 'pl_seco', '— Ok.'),
  op('flerte', 'pl_flerte', '— O braço de apoio é meu. Mas hoje eu cedo.'),
  op('abre', 'pl_abre', '— Eu não esperava que isso fosse tão fácil.'),
  op('fere', 'pl_fere', '— Você sempre se faz de forte?'),
 ],
 fecho="""A turbulência passa. O capitão agradece, em dois idiomas, a paciência de todos. No 24, as duas mãos continuam onde estavam, e nenhuma delas se mexe.""",
 ir='up_c2_hotel')

NOS['up_c2_hotel'] = dict(tipo='decisao', cap=2, lugar='Hotel Imperial, Kärntner Ring, Viena', hora='Sexta · 14h20',
 texto="""O Hotel Imperial, em Viena, tem lustres do tamanho de carros pequenos, tapetes que absorvem o som das pessoas e um balcão de recepção onde uma mulher de coque perfeito, crachá *Frau Hofer*, digita por trinta e oito segundos e olha, enfim, para duas pessoas que estão há vinte horas sem dormir.

— Há um problema — diz ela, no tom de quem avisa que o problema é de outra pessoa. — O congresso lotou o hotel. Tenho uma reserva em nome dos senhores: um quarto, cama king, seis noites. Não tenho nenhum outro.

Atrás dos dois, uma fila de executivos de terno amarrotado espera para dizer a mesma coisa.""",
 pergunta='O que vocês fazem?',
 ir={'A': 'up_c2_noite_a', 'B': 'up_c2_noite_b'},
 acoes=[
  dict(id='aceitar', texto='Aceitar o quarto: são só seis noites, e há um sofá', efeitos=dict(flag='quarto_unico', vinculo=1),
   resultado="""Vocês aceitam. É a decisão mais prática e a mais perigosa, e os dois sabem. Frau Hofer entrega um cartão-chave dourado, com um sorriso que pode ser de simpatia ou de piedade, e diz *Willkommen im Imperial*, e se vira para a fila."""),
  dict(id='outro', texto='Procurar outro hotel: nenhum dos dois quer dividir o quarto com a concorrência', efeitos=dict(flag='procurou_outro', abalo=1),
   resultado="""Vocês saem do Imperial com as malas e passam duas horas, sob uma garoa fina, tentando achar um quarto em uma cidade lotada de executivos. Tentam o Sacher, o Bristol, uma pensão de esquina. Tudo cheio. Voltam, molhados e sem dignidade, e Frau Hofer, sem dizer nada, entrega o mesmo cartão dourado."""),
  dict(id='priya', texto='Ligar para a Priya e exigir uma solução do Marcus', efeitos=dict(flag='ligou_priya'),
   resultado="""Vocês ligam. Priya atende no terceiro toque, com a voz mais baixa do que nunca. *Foi o Marcus que pediu um quarto só*, ela diz, depressa, como quem confessa um crime, *Eu avisei. Ele disse que era para economizar.* Ela desliga antes de qualquer resposta, e a palavra *economizar* fica pendurada entre os dois como um fio solto."""),
 ])

NOS['up_c2_noite_a'] = dict(tipo='solo', cap=2, seat='A', lugar='Quarto 412, Hotel Imperial', hora='Sexta · 15h10',
 texto="""O quarto 412 tem pé-direito de quatro metros, uma cama king de colcha de damasco, duas poltronas de veludo cor de vinho e uma janela que dá para o Ring, onde um bonde amarelo passa em silêncio. Há um frigobar, uma escrivaninha, um sofá de dois lugares que você mede, com os olhos, em centímetros, e conclui que ninguém dorme ali.

Na mesa de cabeceira, uma garrafa de champanhe num balde de gelo, com um cartão: *À dupla mais promissora da Meridian. Que vença o melhor. — M.W.* Você segura o cartão com dois dedos. A letra de Marcus é grande, redonda, de quem escreve para ser lido por outras pessoas.""",
 acoes=[
  dict(id='cama', texto='Escolher o lado da cama e deixar a bolsa lá, para marcar território', ir='up_c2_fim',
   efeitos=dict(flag='a_marcou_lado'),
   resultado="""Você escolhe o lado da janela e deixa a pasta sobre o travesseiro, com a alça pendurada para fora, como uma bandeira. É infantil e você sabe. Funciona do jeito que sempre funcionou: você se sente menos perdida."""),
  dict(id='champanhe', texto='Ler o cartão de novo e se perguntar por que o Marcus quis um quarto só', ir='up_c2_fim',
   efeitos=dict(flag='a_desconfiou_marcus', abalo=1),
   resultado="""Você lê de novo. *À dupla.* Marcus nunca usou essa palavra. Em onze anos na Meridian, você foi *a melhor*, *a única*, *a de resultados*. Nunca *dupla*. E a coisa que mais incomoda é a economia: um quarto só, para dois candidatos, em um hotel que cobra seiscentos euros por noite. Marcus nunca economiza."""),
  dict(id='banho', texto='Tomar um banho quente, de uma hora, antes que a outra pessoa chegue', ir='up_c2_fim',
   efeitos=dict(flag='a_tomou_banho'),
   resultado="""Você tranca a porta do banheiro, enche a banheira de água quente, e fica lá por uma hora, de olhos fechados, ouvindo o som distante do Ring. É a primeira hora que você tem para si mesma desde segunda-feira. Quando sai, de roupão, a pessoa do outro lado da porta já voltou, e você sabe pelo cheiro de café."""),
 ])

NOS['up_c2_noite_b'] = dict(tipo='solo', cap=2, seat='B', lugar='Lobby, Hotel Imperial', hora='Sexta · 15h10',
 texto="""Você deixa a pessoa subir primeiro, com a desculpa de ligar para casa. Na cadeira de couro do lobby, sob um lustre de cristal que provavelmente vale mais do que o seu primeiro carro, você abre o celular e liga para o seu pai.

Em Chicago, são oito da manhã. O seu pai atende no quinto toque, e a sua voz sai sozinha, antes de você pensar: *Pai, eu fui para Viena com uma pessoa que quer a minha vaga.* Do outro lado, o barulho de uma colher batendo numa xícara, e depois o Buster latindo, longe, para um carteiro.

— E ela é boa? — pergunta o seu pai.""",
 acoes=[
  dict(id='verdade', texto='Dizer a verdade: ela é a melhor profissional que você já encontrou', ir='up_c2_fim',
   efeitos=dict(flag='b_admitiu_pai', vinculo=1),
   resultado="""— É — você diz. — É melhor do que eu. Ela fechou um contrato de seis dígitos na segunda de manhã, antes das dez, sem desconto. — Do outro lado, o seu pai ri baixo, o riso de quem ouviu uma coisa que esperava ouvir há anos. *Então você tem um problema que vale a pena ter*, ele diz."""),
  dict(id='mentir', texto='Dizer que é fraca, que vai ser fácil', ir='up_c2_fim',
   efeitos=dict(flag='b_mentiu_pai', abalo=1),
   resultado="""— Nem tanto — você diz. — Dá para ganhar. — A mentira sai com a facilidade de uma coisa antiga. O seu pai fica em silêncio por um segundo a mais do que devia, e depois só diz: *tá bom, filho.* Você sente, pela primeira vez, que ele não acreditou."""),
  dict(id='buster', texto='Pedir para falar com o Buster e ouvir o cachorro latir', ir='up_c2_fim',
   efeitos=dict(flag='b_ouviu_buster', vinculo=1),
   resultado="""Você pede para pôr o celular perto da orelha do Buster. Ouve o barulho de unhas no piso de madeira, a respiração ofegante, e um latido curto de reconhecimento. Você diz *oi, amigo* em voz baixa, no lobby de um hotel de seiscentos euros por noite, e um garçom que passa com uma bandeja finge que não ouviu."""),
 ])

NOS['up_c2_fim'] = dict(tipo='fim', cap=2, lugar='Quarto 412, Hotel Imperial', hora='Sexta · 16h30',
 texto="""Às quatro e meia da tarde, o quarto 412 tem uma cama king, um sofá de dois lugares, duas malas abertas e duas pessoas que não dormem há trinta horas, sentadas em lados opostos do mesmo colchão, a um metro um do outro, olhando para o mesmo ponto na parede.

{{se flag:quarto_unico}}Vocês aceitaram o quarto, e aceitar é a palavra certa: não houve escolha. {{/se}}{{se flag:procurou_outro}}Depois de duas horas de garoa e de hotéis lotados, o cartão dourado da Frau Hofer pareceu, de repente, uma rendição. {{/se}}{{se flag:ligou_priya}}A palavra *economizar* ainda está no ar, no tom exato da Priya. {{/se}}{{se flag:dean_contou_escritorio}}A pessoa na cama já sabe que o outro mora no escritório, e agora, no quarto de um hotel, parece que ela encontrou o primeiro dormitório da vida dele. {{/se}}{{se flag:joanna_contou_apto}}O outro já sabe que o apartamento tem uma mesa sem cadeira, e olha para os móveis do quarto 412 com uma pena que não é pena. {{/se}}

O sofá, medido em centímetros, tem um metro e sessenta e cinco. Ninguém, em nenhuma das duas famílias, tem um metro e sessenta e cinco.

Na parede em frente, um relógio de bronze marca 16h31. Em algum lugar do corredor, um carrinho de camareira passa. E ao lado da porta, no chão, onde alguém o deslizou por baixo da fresta, um envelope branco, com o logo da Meridian e uma única linha, em letra redonda:

*Apresentações sábado, 9h. Os dois no mesmo palco, no mesmo horário. Divirtam-se. — M.W.*""",
 gancho="Sábado, às nove, os dois vão apresentar no mesmo palco, no mesmo horário.",
 ir='up_c3_manha')
