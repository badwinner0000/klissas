/* ================= PADRINHO E MADRINHA · cenas novas de capítulos 5, 6 e 7 ================= */

no('pd_c5_c',{cap:5,quem:'solo',lugar:'Brant Point · beira do cais',trilha:'mar',hora:'Quarta, 14 de junho · 17h30',
 npcs:['pippa'],
 texto:c=>`O sol de fim de tarde bate de lado no farol de Brant Point, e a Pippa, sentada no muro baixo do cais com os tênis balançando, comprou dois sorvetes de pistache porque disse que *pistache é a única cor que a Nantucket não consegue estragar*.

Ela entrega um a você. O dela já está pela metade.

— Eu queria te mostrar uma coisa — ela diz. — Sem comentário. Só ver.

Ela vira o celular. É o vídeo mais longo dos onze que filmou: seis minutos e quatro segundos. A cerimonialista de Boston de quem ninguém sabe nada, caminhando num cais de madeira, de pasta debaixo do braço, falando ao telefone em três idiomas ao mesmo tempo, mandando um primo erguer uma caixa de gelo, trocando um grampo de véu pela cozinha, dizendo *ótimo* a cada duas frases e *pequeno ajuste* a cada três. A câmera está pousada a um metro de distância. Não está tremendo.

No final do vídeo, sem saber que está sendo filmada, você olha para o mar por um segundo inteiro. Só isso. Seu rosto, sem sorriso de trabalho, por um segundo.

A Pippa tira o celular da sua mão e bloqueia a tela.

— Meu pai limpa casas — ela diz, olhando o farol. — Em Worcester. A minha mãe também. Eu fui a primeira da família a entrar numa faculdade. Quando eu apareci no seu escritório, dei o meu portfólio, e você me contratou na hora. Disse que eu tinha *olho de cerimonialista*. Eu nunca contei o quanto isso significou.`,
 ops:[
  {t:'Perguntar o que ela viu no seu rosto naquele segundo',at:'coragem',
   ok:{x:c=>`Você pergunta. A Pippa leva um tempo para responder, mexendo a ponta do sorvete.

— Alguém que não está trabalhando — ela diz. — Alguém que gosta de onde está. É a única parte do vídeo que eu nunca vou postar, porque é só sua.

Você olha o farol. Ele acende, nesse momento, a lâmpada pequena do topo, mesmo com o céu ainda claro, e vocês duas ficam um tempo sem falar.

Ela termina o sorvete. Dobra o guardanapo em quatro. Põe na sua mão.

— Guarda. Eu sempre fico com o que sobra de papel — ela diz. — É mania de agenda.`,ef:{flag:'pippa_video',vinc:1,motivoV:'o segundo que a Pippa filmou',abalo:-1,motivo:'ser vista sem trabalho'}},
   falha:{x:c=>`Você pergunta, mas sai com tom de reunião: *e qual foi sua leitura?* A Pippa, que é boa, responde no mesmo tom: *percepção de marca, tom autêntico, bom potencial de engajamento.* E ri de si mesma, e você ri junto, mas o momento já passou, como a luz do farol que acendeu cedo demais.`,ef:{abalo:1,motivo:'o tom de reunião'}}},
  {t:'Agradecer por ter contado, e dizer que ela vai ter uma empresa no nome dela algum dia',
   x:c=>`Você agradece. Diz que ela vai ter uma empresa no nome dela, e não é elogio: é previsão. Que pessoas que filmam um cais inteiro para entender como uma coisa funciona costumam acabar dirigindo a coisa.

A Pippa aperta o cone do sorvete até fazer um barulho de papel.

— Eu estou usando o seu escritório como faculdade — ela diz. — Não conta para a minha mãe.

Ela passa o braço no seu e fica assim por um tempo, sem falar, olhando a balsa chegar.`,ef:{flag:'pippa_futuro',vinc:1,motivoV:'a empresa da Pippa'}},
  {t:'Pedir para ela não postar o vídeo. Ainda não.',
   x:c=>`— Ainda não — você diz, e a Pippa assente, na hora, como quem já sabia. — Não é medo. Eu só quero que seja bom quando sair.

— É esse o prazo? — ela pergunta. — Quando for bom?

— É o único prazo que eu nunca soube cumprir.

Ela ri, aperta o seu ombro, e guarda o celular no bolso de trás. Do outro lado da baía, uma gaivota resolve roubar o pistache dela, e a conversa acaba no meio de uma perseguição.`,ef:{flag:'pippa_esperar',abalo:-1,motivo:'o prazo adiado'}},
  {t:'Voltar para a Gull House com ela. Tem lousa para atualizar.',ir:'pd_c5_fim'}
 ]});

no('pd_c5_d',{cap:5,quem:'solo',lugar:'Hotel Veranda · jardim',trilha:'abertura',hora:'Quarta, 14 de junho · 17h30',
 npcs:['funmi'],
 texto:c=>`O jardim do hotel onde a sua mãe está hospedada tem treze mesas de ferro pintadas de branco, doze vazias, e uma, na sombra do plátano, com uma juíza aposentada de óculos de leitura, fazendo palavras cruzadas a caneta.

— Quatorze letras — ela diz, sem levantar os olhos. — *Que desconfia de coisa fácil.* Começa com *c*.

— Cético — você diz, antes de pensar. — Cético tem seis. É… — Você conta. — *Cabeça-dura*. Cabeça-dura tem onze.

— Catorze com o hífen. — Ela escreve. — Senta. Você parece alguém que comeu ovo mexido de pé.

Você senta. Ela empurra um copo de limonada, que você aceita sem perguntar, e uma cardigã azul-marinho dobrada, que você olha.

— Está um frio de quinze graus em junho — ela diz. — Você não trouxe casaco.

Ela nunca perguntou se você trouxe, ela sempre soube. Desde que você tinha oito anos, na cozinha de Providence, com a mesa do café posta, a sua mãe decide o que você precisa sem olhar, e quase sempre acerta.

Você poderia dizer uma dúzia de coisas. A Pippa, a pasta, a semana, o recado do seu irmão que você ouviu cinco vezes. A juíza continua nas palavras cruzadas. Ela espera. Esse é o jeito dela de abrir a porta: fingir que não está abrindo.`,
 ops:[
  {t:'Vestir a cardigã e agradecer',
   x:c=>`Você veste. É grande demais nos ombros e perfeito nas mangas, como as peças de lã que a sua mãe compra desde sempre, para você *crescer dentro*. Cheira a lavanda e a caneta esferográfica.

Ela olha por cima dos óculos, só um instante. Confere o resultado. E volta para o jogo, com um meio sorriso que ela esconde atrás da palavra *cético*.

— Fica bem — ela diz. É o elogio mais completo que ela sabe dar.`,ef:{flag:'funmi_cardiga',vinc:1,motivoV:'a cardigã da sua mãe',abalo:-1,motivo:'lã e lavanda'}},
  {t:'Perguntar pelo seu pai. Só uma pergunta.',at:'coragem',
   ok:{x:c=>`${c.f('perguntou_1989')?'Você já tinha perguntado uma vez, na varanda, e ela mudou de assunto. Pergunta de novo, agora com mais cuidado: se ela pensa nele hoje.':'Você pergunta: se ela pensa nele, hoje, perto do casamento.'}

A caneta para sobre a grade de palavras. Ela tira os óculos de leitura e limpa as lentes na barra da blusa, devagar, que é o jeito dela de ganhar três segundos.

— Penso — ela diz. — Penso desde a primeira palavra da primeira entrevista do Tunde, e do segundo filho, e de cada formatura. Eu penso em você. Eu penso em um homem que não está aqui e que ainda tem a minha caligrafia no cheque do aluguel de 1996.

Ela põe os óculos de volta.

— Eu prometi contar tudo. Depois do casamento, que é quando os depois começam. — A caneta volta ao papel. — Mas eu quero que você saiba que eu pensei na sua pergunta antes de você perguntar.`,ef:{flag:'funmi_prometeu_de_novo',vinc:1,motivoV:'perguntar pelo pai'}},
   falha:{x:c=>`Você pergunta. Mas a pergunta sai torta, como um enunciado de prova: *qual é a relação entre a data do casamento e o que a senhora sente pelo meu pai?* A juíza ouve com a expressão de quem lê petição mal redigida.

— A relação — ela diz — é de causalidade, e eu não vou responder a uma pergunta com cinco verbos. — Ela dá uma batidinha com a caneta. — Reformule depois do casamento. Eu respondo.`,ef:{abalo:1,motivo:'a pergunta de cinco verbos'}}},
  {t:'Ajudar com as palavras cruzadas',
   x:c=>`Vocês resolvem a grade inteira em quarenta minutos, de um jeito que vocês dois fazem desde que você tinha dez anos e ela confiava que você sabia sinônimo de *efêmero*. É a única hora da semana em que ela fala sem formalidade. Sai uma conversa inteira de palavras sem importância: *astro, rio da Itália, afluente do Amazonas.*

No fim, ela dá o último traço, e fecha o caderno.

— Eu vou ao casamento — ela diz. — Só por isso. O seu irmão. — Ela olha para o copo de limonada. — E por você.

Você não diz nada. Ela também não. Os dois bebem limonada.`,ef:{flag:'funmi_cruzadas',abalo:-1,motivo:'a grade inteira'}},
  {t:'Voltar para a Gull House. A Pippa está chamando.',ir:'pd_c5_fim'}
 ]});

no('pd_c6_a',{cap:6,quem:'solo',lugar:'Nantucket Yacht Club · varanda coberta',trilha:'tensao',hora:'Quarta, 14 de junho · 21h30',
 npcs:['pippa'],
 texto:c=>`A varanda coberta do clube tem seis cadeiras de vime e um toldo de lona que, às dez e dez da noite, faz o único barulho do mundo: a chuva, que não bate, empurra. O vento joga a água de lado, de um jeito que nenhum plano B previu.

Você está no telefone com a Pippa, que está do outro lado do gramado, a trinta metros, e fala com você por celular porque *a minha voz não passa pelo vento*.

— Onze lonas — ela diz, no seu ouvido. — Eu tenho onze lonas. A tenda tem dez metros de lado. Eu fiz a conta três vezes, a conta é sempre quatorze lonas.

Você sabe. Já tinha feito a conta. Onze lonas, uma tenda de dez por vinte, cento e quarenta cadeiras, e a previsão de uma chuva de quarenta minutos que virou uma de quatro horas.

— Respira — você diz. — Eu tenho uma ideia.

Você não tem ideia nenhuma. É a frase que você diz desde 2015 para ganhar quarenta segundos, e funciona sobre a Pippa também.`,
 ops:[
  {t:'Dividir o problema: as lonas só precisam proteger o caminho da cerimônia, não a tenda inteira',at:'cabeca',
   ok:{x:c=>`Você pensa rápido, de pé na varanda, com a água jogada na bainha da calça: a chuva só precisa não molhar o corredor central e a mesa dos noivos. As cadeiras do fundo podem molhar. Convidado seca. Papel de agenda não.

— Cinco lonas no corredor, uma em cima do altar, e cinco no fundo da mesa de som — você diz. — O resto cai onde cair.

A Pippa fica em silêncio dois segundos.

— Você é um gênio — ela diz.

— Eu sou uma cerimonialista — você responde. A frase tem um peso novo, e você percebe, e deixa.`,ef:{flag:'c6a_lonas',vinc:1,motivoV:'a conta das lonas'}},
   falha:{x:c=>`Você faz a conta de cabeça, de novo, e chega às mesmas quatorze lonas. A Pippa, do outro lado da chuva, fica esperando uma saída que não vem.

— Tá — ela diz, por fim. — Então a gente improvisa.

Improvisar sempre foi a sua parte menos favorita da profissão. É a que mais aparece em foto.`,ef:{abalo:1,motivo:'quatorze lonas'}}},
  {t:'Pedir ajuda ao Barnaby, que tem uma garagem cheia de coisas inúteis',
   x:c=>`Você liga para a pousada. O Barnaby atende no oitavo toque, com voz de quem foi acordado e prefere não comentar.

— Garagem — ele diz, depois de ouvir tudo. — Fundos. Tem cinco rolos de plástico de estufa. Nunca usei. Peguei de uma estufa que fechou em 1994. — Uma pausa. — Não tem cor. Dá para ver o céu por ele. A Ruth gostava.

Dez minutos depois, a caminhonete dele estaciona no gramado, com os faróis acesos, e uma pilha de plástico transparente na caçamba. A tenda fica com cobertura, e a luz das lâmpadas passa por cima, dourada e meio suja, como em cenário de teatro.`,ef:{flag:'c6a_barnaby',vinc:1,motivoV:'o plástico da Ruth'}},
  {t:'Ficar quieto, deixar a chuva cair e olhar os estragos de cima da varanda',
   x:c=>`Você não faz nada. É raríssimo. Você fica na varanda coberta, de braços cruzados, vendo a chuva empurrar a lona e a Pippa correr com uma lanterna na boca e um primo Barros que chegou, vindo de ninguém sabe onde, de capa de pesca.

Não é desistência. É uma coisa mais estranha, que você ainda não tem nome: deixar a noite acontecer e ver o que ela faz.

A tenda não cai. Ninguém sabe por quê. Você também não.`,ef:{abalo:-1,motivo:'a noite que acontece'}},
  {t:'Descer da varanda e atravessar o gramado. A tenda precisa de mais um par de mãos.',ir:'pd_c6_carro'}
 ]});

no('pd_c6_b',{cap:6,quem:'solo',lugar:'Nantucket Yacht Club · casa de força',trilha:'tensao',hora:'Quarta, 14 de junho · 21h30',
 npcs:['barnaby'],
 texto:c=>`A casa de força do Yacht Club é um galpão de zinco encostado nos fundos, com um quadro elétrico do tamanho de um armário, um cheiro de ozônio e um aviso colado na porta, em letra de médico: *NÃO MEXER SEM O BARNABY.* O Barnaby, claro, não está.

A luz da tenda piscou duas vezes, e na terceira apagou. De fora, no escuro, ouvem-se dez vozes ao mesmo tempo, a mais alta delas a de uma Pippa que acha que a falta de luz é um fim de mundo.

Você tem uma lanterna do celular, um multímetro no bolso (você leva o multímetro para onde for, é como outras pessoas levam chaveiro) e uma tabela de disjuntores em fita crepe, feita por alguém que obviamente estava sob estresse em 2009.

Dá para ver na tabela, riscada à caneta vermelha, uma anotação que alguém repetiu três vezes: *Cuidado: 14 ≠ 20.* O resto está apagado pelo tempo.`,
 ops:[
  {t:'Medir cada disjuntor com o multímetro, um por um, até achar o que caiu',at:'cabeca',
   ok:{x:c=>`Você mede. Quatorze disjuntores, um por um, sem pressa, sem tocar em nada que não precise. Na décima segunda posição, o multímetro marca zero onde devia marcar duzentos e vinte. Você liga. Do lado de fora, a tenda se acende, e dez vozes soltam um *ahhh* que você ouve através da chuva.

Em cima do quadro, sob a fita crepe velha, uma frase a caneta, em letra miúda: *se faltar luz, não é culpa da chuva. É culpa de quem não confere.*

Você conta mentalmente quantas pessoas conferiram essa semana. Chega a dois. Você é uma delas.`,ef:{flag:'c6b_luz',vinc:1,motivoV:'a luz que voltou'}},
   falha:{x:c=>`Você mede, mas na pressa encosta a ponta do multímetro no lugar errado. Um estalo, um cheiro de queimado, um segundo de luz azul, e a tenda inteira apaga de novo, desta vez com um estalo que o Barnaby, a oitocentos metros dali, de pijama, vai jurar ter ouvido.

Você respira fundo, desliga o geral, e recomeça do zero. Demora vinte minutos a mais. O orgulho demora mais.`,ef:{abalo:2,motivo:'o estalo azul'}}},
  {t:'Sair do galpão e pedir ajuda: alguém na tenda deve saber onde o Barnaby guarda a chave',
   x:c=>`Você corre pelo gramado molhado. Quem sabe é a Dory, que está de avental e capa de pesca embaixo da marquise com dois primos, partindo cebola num barril. Ela te encara, indica com o queixo uma lata de café pendurada na tela.

— Chave — ela diz. — E ele deixa uma cartinha dentro. Ele é desse tipo.

A cartinha, dentro da lata de café, diz: *Se for alguém de fora tentando acender isto, levanta a terceira alavanca. Não mexe na quarta.* Assinado: *B.* O Barnaby tinha previsto alguém como você. Ou qualquer um.

A terceira alavanca. A luz volta.`,ef:{flag:'c6b_carta',vinc:1,motivoV:'a cartinha do Barnaby'}},
  {t:'Esperar no escuro, sentado numa caixa de ferramentas, até a chuva diminuir',
   x:c=>`Você senta na caixa de ferramentas, no escuro, com o cheiro de ozônio e de chuva. O galpão de zinco tem um barulho de gotas que é quase um instrumento. Durante dez minutos, você escuta e não conta nada.

Depois a luz volta, sozinha, porque a rede da ilha tem os seus humores. Do lado de fora, a Pippa grita um *eu sabia* que não tem nada a ver com ninguém.`,ef:{abalo:-1,motivo:'o escuro e a chuva'}},
  {t:'Voltar ao gramado. Tem lonas para segurar.',ir:'pd_c6_carro'}
 ]});

no('pd_c7_c',{cap:7,quem:'solo',lugar:'Estufa da Gull House',trilha:'tensao',hora:'Quinta, 15 de junho · tarde',
 npcs:['barnaby'],
 texto:c=>`A estufa da Gull House é um retângulo de vidro e ferro que o Barnaby montou nos fundos do quintal em 1994, com uma única janela quebrada que ele nunca consertou, para a hortênsia ter *ventilação de opinião*. Dentro, quarenta vasos de barro, todos em fileira, de azul, de rosa, de branco, de um verde estranho que ele chama de *a que ninguém pediu*.

Ele está de joelhos no chão de terra batida, de luvas, replantando uma muda com os dedos como quem faz carinho num animal de grande porte.

— Escolhe — ele diz, sem se virar. — Doze para o altar. Eu tenho as que precisam. Mas sou eu que não escolho. A senhora é quem faz casamento.

Você olha. As azuis estão no auge. As brancas, ainda fechadas. As rosa, meio passadas. Todo cerimonialista sabe que a flor perfeita é a que está para abrir, não a que já abriu.

— A Ruth escolhia assim — diz o Barnaby. — Pela que ainda ia ser. Eu escolho pela que já é. Dá casamento diferente.`,
 ops:[
  {t:'Escolher as azuis. A cor do dia.',
   x:c=>`Doze vasos azuis, no auge, que o Barnaby embrulha em papel de jornal e põe numa carriola. Ele conta cada um em voz baixa, do jeito de quem reza.

— Azul — ele diz. — Eu plantei essas quando a Gemma tinha seis anos. Quando ela veio passar o primeiro verão aqui. A Rosa disse que tinha que ser azul, porque *combina com o vestido que a menina vai usar um dia*.

Você olha o vaso. Cada hortênsia carrega sete anos de planejamento de uma mãe que chorava por antecipação.`,ef:{flag:'c7c_azul',vinc:1,motivoV:'as hortênsias da Gemma'}},
  {t:'Escolher as que ainda vão abrir. Pela que vai ser.',at:'coragem',
   ok:{x:c=>`Você aponta as brancas, ainda fechadas, que na manhã de sábado vão estar em ponto exato. Seis delas. E mais seis, de um rosa-claro, que ainda guardam o miolo verde.

O Barnaby fica em silêncio com as luvas na mão.

— A Ruth — ele diz. A voz sai antes dele. — Ela teria escolhido essas. — Ele pigarreia, olha o vidro, olha a janela quebrada. — Faz tempo que ninguém escolhe como ela.

Ele embrulha as doze com um cuidado que não usou nas azuis. Quando termina, tira a luva e aperta a sua mão com a mão suja de terra, uma vez, forte, e volta ao replantio sem olhar.`,ef:{flag:'c7c_ruth',vinc:1,motivoV:'a escolha que a Ruth faria',abalo:-1,motivo:'a mão de terra do Barnaby'}},
   falha:{x:c=>`Você escolhe as que ainda vão abrir, mas calcula mal o tempo: as brancas, na manhã de sábado, vão estar ainda cedo demais para abrir, e na hora da cerimônia ainda vão parecer bolinhas verdes.

— Elas abrem — diz o Barnaby, otimista. — Se o dia for quente. — Ele olha o céu pela janela quebrada. — Mas não prometo.`,ef:{flag:'c7c_branca_cedo',abalo:1,motivo:'as brancas fechadas'}}},
  {t:'Perguntar ao Barnaby por que ele nunca consertou a janela quebrada',
   x:c=>`Você pergunta. O Barnaby levanta, devagar, com a mão nos joelhos, e olha o vidro quebrado do canto, como quem olha um velho amigo.

— Foi a Ruth — ele diz. — Em 2008. Jogou uma bola de tênis, de brincadeira. Eu fiquei bravo uma semana. Ela morreu no ano seguinte. — Uma pausa. — A janela é a única coisa nesta casa que ainda me lembra de que eu ficava bravo com coisa pequena. Eu não conserto.

Ele volta para o chão. Você fica um tempo parado, entre as azuis e as brancas.`,ef:{flag:'c7c_janela',vinc:1,motivoV:'a janela da Ruth'}},
  {t:'Voltar com a carriola. Os noivos chegam hoje à noite.',ir:'pd_c7_depois'}
 ]});

no('pd_c7_d',{cap:7,quem:'solo',lugar:'Escola de Ensino Médio de Nantucket',trilha:'mar',hora:'Quinta, 15 de junho · tarde',
 texto:c=>`Você caminha sem rumo e acaba na frente da Escola de Ensino Médio de Nantucket, um prédio de tijolo claro com um relógio parado em cima da porta e, no gramado da frente, um mastro com a bandeira enrolada em volta de si mesma pelo vento da tarde.

Está fechada. É junho, as aulas acabaram, a única janela acesa é a do zelador.

Você não tem motivo nenhum para estar ali. Você nunca tem motivo para entrar em escola: já trabalha em uma. Mas os seus pés tomaram o caminho sozinhos, o que costuma significar alguma coisa.

Na porta principal, colado com fita transparente no vidro, um cartaz de folha sulfite, escrito à mão, com a data riscada e reescrita três vezes:

*PROCURA-SE PROFESSOR(A) DE CIÊNCIAS. Ensino médio. Biologia, química, física. Casa da escola disponível. Contato: sra. Alderman, secretaria. (Desde fevereiro.)*

A casa da escola disponível. O verbo é *disponível*. Não *incluída*, não *alugada*. Como quem deixa a porta destrancada.`,
 ops:[
  {t:'Tirar uma foto do cartaz com o celular, sem saber por quê',
   x:c=>`Você tira. A foto sai torta, com o reflexo do seu ombro no vidro. Você olha a imagem na tela: o cartaz, o relógio parado, a bandeira enrolada.

Guarda no celular, na pasta *Fotos*, junto das trezentas fotos de aluno em feira de ciências. Fica a última, por enquanto.

Você nunca foi uma pessoa de fugir. Você é uma pessoa de ficar, ficou onze anos na mesma sala. Então não é fuga. É outra coisa que a foto não revela. Você ainda não sabe o nome, e a foto fica ali, esperando que você descubra.`,ef:{flag:'c7d_foto',vinc:1,motivoV:'a foto do cartaz'}},
  {t:'Ler o cartaz até o fim e ir embora. Não é da sua conta.',
   x:c=>`Você lê, duas vezes, até a assinatura da sra. Alderman. Dá as costas. Volta pela rua Fair, onde as hortênsias saem das cercas como se alguém tivesse esquecido de segurá-las.

Você não pensa mais no cartaz. Pensa mais ou menos. Pensa em dois ou três momentos do dia, e no quarto deles, já na esquina da Easton, percebe que ficou a frase *casa disponível* na cabeça, como uma música.`,ef:{abalo:1,motivo:'a frase que ficou'}},
  {t:'Bater na janela acesa do zelador e perguntar sobre a escola',at:'coragem',
   ok:{x:c=>`Um homem de sessenta anos, de camisa de flanela, abre a janela de guilhotina e olha para você por cima dos óculos de leitura.

— Fechado — ele diz. — Volta em setembro.

Você pergunta do cartaz. Ele olha o vidro, olha você.

— A sra. Alderman? Ela é a diretora. — Ele considera. — A casa é de verdade. Dois quartos, uma varanda, uma macieira. Está vazia desde o último que ficou. — Ele hesita. — Era um professor de química. Pediu transferência para o continente em fevereiro. Ele *odiou* o inverno.

Você agradece. Ele fecha a janela, mas depois abre de novo.

— No inverno — ele diz — a ilha fica com quatro mil pessoas. Quem fica, fica porque quer.`,ef:{flag:'c7d_zelador',vinc:1,motivoV:'perguntar sobre a escola',abalo:-1,motivo:'a casa da macieira'}},
   falha:{x:c=>`Você bate, mas a janela do zelador está do outro lado de um canteiro de rosas-do-mato, e você pisa na rosa errada. Um grito de dor, um *meu Deus*, um zelador que sai de pijama e botina para ver o intruso. Você se desculpa seis vezes. Ele aceita uma só.

Você vai embora sem saber de nada sobre a casa. Com um espinho no dedo e um pouco menos de dignidade.`,ef:{abalo:1,motivo:'a rosa errada'}}},
  {t:'Voltar. O jantar é daqui a pouco e a Pippa vai notar a ausência.',ir:'pd_c7_depois'}
 ]});
