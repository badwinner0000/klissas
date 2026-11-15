/* ================= PADRINHO E MADRINHA · CAPÍTULO 2 · A PASTA ================= */

no('pd_c2_madaket',{cap:2,quem:'ab',tipo:'segue',lugar:'Cais de Madaket',trilha:'mar',hora:'Domingo, 11 de junho · 5h50',
 npcs:['dory','barnaby'],
 texto:c=>`Cinco e cinquenta da manhã. A caminhonete de 1988 do Barnaby, emprestada com um *se arranhar, eu planto vocês dois*, para no fim da estrada de Madaket, onde a ilha acaba numa enseada de água parada e barcos de casco descascado.

A caminhonete tem um banco só, inteiriço, e a pasta veio no meio, de cinto. Ninguém falou nos vinte minutos de estrada. O rádio só pega uma estação, de música country de 1970, e ninguém teve coragem de desligar.

No cais, de macacão de borracha amarelo e boné do Red Sox, uma mulher de braços enormes enrola uma corda de náilon do tamanho de uma cobra. Atrás dela, num barco chamado *Maria do Fogo*, quarenta armadilhas de lagosta empilhadas.

— Vocês são o casamento — diz a Dory Barros, sem largar a corda. — Eu não faço casamento. Eu faço lagosta. — Ela olha para os sapatos de ${ehPA(c)?'você':pda(c)}. — Isso aí vai morrer hoje.

Ela joga dois macacões de borracha no cais.

— Sobe. Se vocês puxarem armadilha comigo até as nove, eu escuto. Se não puxarem, eu vendo para o restaurante do Ritz e vocês servem cachorro-quente.`,
 prox:'pd_c2_armadilhas'});

no('pd_c2_armadilhas',{cap:2,quem:'ab',tipo:'dividir',cada:1,lugar:'Barco Maria do Fogo · Madaket Harbor',trilha:'mar',hora:'Domingo, 11 de junho · 6h30',
 texto:c=>`O *Maria do Fogo* sai da enseada com a névoa da manhã ainda baixa na água. Gaivotas. Bóias coloridas, cada uma com as cores de um lagosteiro. As da Dory são verde e laranja, *as cores de Cabo Verde e da laranja do meu avô*.

Uma armadilha pesa trinta quilos molhada. Tem quarenta na água.`,
 pergunta:'O que você faz no barco?',
 ops:[
  {t:'Puxar armadilha. De verdade. Até a mão abrir.',ambos:true,at:'forca',dif:c=>ehPA(c)?1:0,
   ok:{x:c=>`${c.Q} pega a corda molhada, apoia o pé na amurada, e puxa. Trinta quilos de água, ferro e lagosta brava subindo do fundo. Uma. Duas. Cinco. Na décima, as mãos estão abertas em bolha, e a Dory, no leme, para de rir.

— Tá — ela diz. — Tá bom. Turista não chega na décima.

Ela joga uma garrafa de água, sem avisar, por cima do ombro. No *Maria do Fogo*, isso é uma medalha.`,ef:{flag:'puxou_armadilha',fa:1}},
   falha:{x:c=>`${c.Q} pega a corda, puxa, e a armadilha não sobe. ${c.Q} puxa de novo, com o corpo inteiro, e o pé escorrega no convés molhado, e ${c.q} cai sentad${c.eu.o} numa caixa de isca de arenque.

A Dory ri tanto que tem que desligar o motor.

— Isso — ela diz, enxugando o olho — vale o casamento. Eu escuto vocês. Pelo arenque.`,ef:{flag:'arenque'}}},
  {t:'Negociar o preço por libra, de pé, segurando no mastro, sem vomitar',se:ehPA,at:'labia',
   ok:{x:c=>`— Cento e quarenta pessoas — você diz, segurando no mastro com uma mão e na pasta com a outra. — Uma libra e um quarto por pessoa. Cento e setenta e cinco libras. Preço de junho, no cais, é nove dólares. Eu ofereço doze. Com uma condição.

A Dory levanta a sobrancelha.

— Que condição?

— O nome do seu barco no cardápio. *Lagosta do Maria do Fogo, Madaket.* Cento e quarenta pessoas de Boston, Providence e Nova York lendo isso. Metade tem restaurante ou conhece quem tem.

A Dory olha o mar um tempo comprido.

— O meu avô chegou nessa ilha em 1921, num baleeiro, sem saber inglês. — Ela vira o leme. — Ninguém nunca escreveu o nome do barco dele em lugar nenhum. — Uma pausa. — Doze. E eu cozinho. E vocês me ajudam a montar.`,ef:{flag:'dory_preco',fa:1}},
   falha:{x:c=>`Você abre a boca para negociar e o barco sobe uma onda e desce outra, e o seu estômago fica lá em cima.

Você passa os vinte minutos seguintes debruçad${c.eu.o} na amurada do *Maria do Fogo*. A Dory segura a sua pasta para não voar, e lê o plano A inteiro enquanto você vomita no Atlântico.

— Esse plano é bom — ela diz, quando você volta, branc${c.eu.o}. — Mas tá faltando comida.`,ef:{flag:'enjoou',abalo:1,motivo:'o Atlântico'}}},
  {t:'Calcular de cabeça quantas lagostas, quantos quilos de manteiga, quantas panelas, quanto gás',se:ehPB,at:'cabeca',
   ok:{x:c=>`Você pega o caderno preto, molhado de spray, e faz a conta encostado na cabine.

Cento e quarenta pessoas. Uma lagosta de uma libra e um quarto por pessoa, mais dez por cento de quebra: cento e cinquenta e quatro. Água: quatro litros por lagosta, com sal a três e meio por cento, como o mar, que é o que elas reconhecem. Doze panelas de cinquenta litros, quatro rodadas de catorze minutos. Manteiga clarificada: nove quilos. Gás: três botijões, um de reserva.

Você mostra o caderno. A Dory lê, devagar. Depois olha para você.

— Três e meio por cento de sal — ela diz. — A minha avó dizia *sal até ficar igual ao mar*. Ninguém nunca me deu o número.`,ef:{flag:'conta_lagosta',fa:1}},
   falha:{x:c=>`Você faz a conta, e refaz, e o barco balança, e a caneta escorrega, e no fim você tem um número de manteiga que daria para afogar a ilha inteira.

A Dory olha por cima do seu ombro.

— Professor — ela diz — eu cozinho lagosta há quarenta anos. Deixa a conta comigo. Você puxa.`}}
 ],
 prox:'pd_c2_dory'});

no('pd_c2_dory',{cap:2,quem:'ab',tipo:'segue',lugar:'Cais de Madaket',trilha:'abertura',hora:'Domingo, 11 de junho · 9h10',
 npcs:['dory'],
 texto:c=>`De volta ao cais, a Dory tira as luvas e cospe no chão, que é como ela fecha negócio.

— Amanhã, segunda. Às sete. Aqui na praia de Madaket. Eu faço um jantar de prova. Lagosta, milho, batata, chouriço, do jeito da minha avó. Vocês provam. Se gostarem, eu faço o casamento. — Ela aponta para os dois. — Mas vocês dois provam juntos. Eu não cozinho para quem briga na mesa. Estraga o tempero.

${c.f('dory_preco')||c.f('conta_lagosta')?'Ela aperta a mão de cada um. A mão dela parece uma luva de beisebol de couro velho.':'Ela não aperta a mão de ninguém. Mas também não diz não.'}

No caminho de volta, na caminhonete, o rádio toca *Rhinestone Cowboy*. Ninguém desliga.`,
 prox:'pd_c2_carro'});

no('pd_c2_carro',{cap:2,quem:'ab',tipo:'dialogo',lugar:'Caminhonete da Dory · estrada de Madaket',trilha:'romance',hora:'Domingo, 11 de junho · 9h40',
 ef:{pista:'pd_ajuste'},
 texto:c=>`A estrada de areia e pinheiros. O rádio ainda toca *Rhinestone Cowboy*. A cláusula 14.c está na pasta, no colo de ${ehPB(c)?'você':pdb(c)}, e nenhum dos dois falou dela desde o cais. A Dory tem licença de pesca. O clube exige licença de bufê. A diferença entre as duas é de vinte e cinco mil e novecentos dólares.`,
 comeca:E=>lsSeat(E,PD_B),
 falas:[
  {p:'Você começa. Olhando a estrada.',ops:c=>[
   {t:'— A cláusula 14.c. O clube exige bufê com licença do condado. A Dory não tem licença de bufê. Tem licença de pesca.',tom:'seco',tag:'clausula'},
   {t:'— Eu li a cláusula na quinta. Devia ter dito. Estou dizendo agora.',tom:'abre',tag:'quinta'},
   {t:'(Abrir a pasta no colo, na página nove, e deixar o dedo em cima da cláusula, sem dizer nada.)',tom:'seco',acao:true,tag:'dedo'}
  ]},
  {p:'Sua resposta.',ops:(c,h)=>[
   ...(h[0].tag==='clausula'?[{t:'— Detalhe.',tom:'seco',tag:'detalhe'}]:[]),
   ...(h[0].tag==='quinta'?[{t:'— Quinta. Quando a gente ainda nem se falava. Obrigad'+c.eu.o+' por não ter deixado para o domingo.',tom:'cuida',tag:'obrig'}]:[]),
   ...(h[0].tag==='dedo'?[{t:'— Eu estou olhando a estrada. Não estou olhando o dedo. Mas eu sei onde ele está.',tom:'flerte',tag:'sei'}]:[])
  ]},
  {p:'De volta para você.',ops:(c,h)=>[
   ...(h[1].tag==='detalhe'?[{t:'— É um detalhe de vinte e cinco mil e novecentos dólares.',tom:'seco',tag:'25mil'}]:[]),
   ...(h[1].tag==='obrig'?[{t:'— Não agradece. Eu fiquei quatro dias com isso na cabeça e fingindo que era assunto de outra pessoa.',tom:'abre',tag:'quatrodias'}]:[]),
   ...(h[1].tag==='sei'?[{t:'— Então olha. Só para a gente parar de fingir.',tom:'flerte',tag:'olha'}]:[])
  ]},
  {p:'Sua resposta.',ops:(c,h)=>[
   ...(h[2].tag==='25mil'?[{t:'— Então é um *pequeno ajuste*.',tom:'seco',tag:'ajuste'}]:[]),
   ...(h[2].tag==='quatrodias'?[{t:'— Então a gente fingiu a mesma coisa nos mesmos quatro dias. Pequeno ajuste.',tom:'seco',tag:'ajuste'}]:[]),
   ...(h[2].tag==='olha'?[{t:'(Olhar. Pela primeira vez, de verdade. E dizer:) — Pequeno ajuste.',tom:'flerte',acao:true,tag:'ajuste'}]:[])
  ]},
  {p:'Você vira a cabeça e olha para o lado do passageiro.',ops:c=>[
   {t:'— Você sempre diz isso quando é um desastre?',tom:'seco',tag:'sempre'},
   {t:'— Você diz "pequeno ajuste" e a sua mão está apertando a pasta com força demais.',tom:'cuida',tag:'mao'},
   {t:'(Não dizer nada. Baixar o volume do rádio um dedo, para escutar a resposta.)',tom:'abre',acao:true,tag:'radio'}
  ]},
  {p:'Você responde. Sem tirar os olhos do para-brisa.',ops:(c,h)=>[
   ...(h[4].tag==='sempre'?[{t:'— Eu digo isso para ninguém perceber que é um desastre.',tom:'abre',tag:'ninguem'}]:[]),
   ...(h[4].tag==='mao'?[{t:'— É a pasta. A pasta é pesada. Não é a mão.',tom:'seco',tag:'ninguem'}]:[]),
   ...(h[4].tag==='radio'?[{t:'— Eu falo isso para ninguém perceber que é um desastre. O rádio ajuda.',tom:'abre',tag:'ninguem'}]:[])
  ]},
  {p:'Última volta.',ops:c=>[
   {t:'— Eu percebi.',tom:'cuida',tag:'percebi'},
   {t:'(Não responder. Pôr a mão, só por um segundo, na pasta que está entre os dois.)',tom:'flerte',acao:true,tag:'mao2'},
   {t:'— Eu percebi desde a balsa. Só não quis dizer.',tom:'abre',tag:'balsa'}
  ]},
  {p:'Você fecha o capítulo da estrada.',ops:(c,h)=>[
   {t:'— Você é a primeira pessoa em oito anos.',tom:'abre',tag:'oito'},
   {t:'— Pode parar de fingir. Comigo, pode.',tom:'cuida',tag:'parar'}
  ]}
 ],
 prox:'pd_c2_maes'});

no('pd_c2_maes',{cap:2,quem:'ab',tipo:'segue',lugar:'Cais Steamboat Wharf',trilha:'tensao',hora:'Domingo, 11 de junho · 10h00 e 14h00',
 npcs:['rosa','funmi'],
 ef:{pista:'pd_1989'},
 texto:c=>{ const L=[];
  L.push(`Dez da manhã. A balsa lenta encosta no Steamboat Wharf, e da prancha, antes de todo mundo, de óculos escuros de estrela de cinema, lenço Hermès na cabeça e um vestido de linho amarelo, desce a Rosa Castellano, já chorando. Atrás dela, a tia Concetta, de preto, com uma bolsa térmica de onde sai um cheiro inconfundível de berinjela à parmegiana.

— Filh${pdgA(c,'o','a')}! — A Rosa abraça ${ehPA(c)?'você':pda(c)} como quem abraça um sobrevivente de naufrágio. — Ah, meu Deus, olha esse cabelo, foi a umidade, eu sabia, eu disse para a Gemma, *Nantucket tem umidade*. — Ela vira. Vê ${ehPB(c)?'você':pdb(c)}. Para de chorar na hora. — Ah. Você.`);
  if(c.f('contou_maes')) L.push(`A notícia sai ali mesmo, no cais, como ficou combinado ontem à noite: a Courtney, o Marco, Portugal, a lagosta cancelada. A tia Concetta aperta a bolsa térmica contra o peito.

A Rosa escuta tudo de boca aberta. Fecha a boca. Abre de novo.

— Então quem está organizando o casamento da minha filha?

Ninguém precisa responder. No cais sobraram duas pessoas, uma pasta e um caderno.

A Rosa olha de um para o outro. E então, para surpresa de todo mundo, para de chorar, segura o rosto de ${ehPA(c)?'você':pda(c)} com as duas mãos, e diz, baixinho:

— Graças a Deus. Eu nunca gostei daquela Courtney. Ela tinha unha de gel.`);
  else L.push(`— A Courtney? — pergunta a Rosa, olhando em volta. — Cadê a Courtney?

A resposta combinada ontem à noite sai sem ensaio: em reunião, com o bufê.

A Rosa aceita. A tia Concetta, que não fala inglês desde 1974 por opção, olha para ${ehPA(c)?'você':pda(c)} de cima a baixo e diz, em italiano, uma palavra só. *Bugiard${pdgA(c,'o','a')}.* Mentiros${pdgA(c,'o','a')}.`);
  L.push(`Duas da tarde. A balsa rápida. A juíza Funmi Okoro desce a prancha sozinha, sem óculos escuros, de vestido de algodão azul-marinho e um chapéu de palha simples, com uma mala de mão que ela mesma carrega e não deixa ninguém pegar.

Ela olha para ${ehPB(c)?'você':pdb(c)}. Põe a mão no ${ehPB(c)?'seu rosto':'rosto de '+pdb(c)}, um segundo só. Tira.

Depois olha para ${ehPA(c)?'você':pda(c)}.

— A madrinha — ela diz. Não é pergunta.`.replace('— A madrinha —','— '+pdgA(c,'O padrinho da noiva','A madrinha')+' —'));
  if(c.f('escondeu_maes')) L.push(`No caminho até a Gull House, a pé, a juíza não fala. Na varanda das hortênsias, para. Olha a tabela da Pippa, colada no vidro da janela da cozinha, com a coluna *QUEM*.

— A sra. Vance não está em reunião — ela diz. — A sra. Vance está em Portugal. — Ela tira o chapéu. — Vocês deviam ter me contado no cais. Eu teria ajudado. Agora eu vou ajudar mesmo assim, mas vou lembrar. — Ela entra, e para na porta, sem virar. — Eu não vou a casamento desde junho de 1989. Eu vim porque é dele. Não me façam me arrepender.

Nove minutos. O Barnaby, da porta, levanta um dedo para a Pippa. A Pippa, de dentro da cozinha, paga um dólar.`);
  else L.push(`No caminho até a Gull House, a pé, a juíza não fala. Na varanda, a Rosa vem correndo, de lenço Hermès, com o mapa de mesas na mão.

— Funmi! A mesa sete! Você não respondeu a minha mensagem!

— Eu não respondo mensagem às três da manhã, Rosa.

— E a dança das mães? Com os filhos? A gente tem que ensaiar!

A juíza Funmi Okoro olha para a Rosa por cima dos óculos de leitura, que apareceram na ponta do nariz sem ninguém ver de onde vieram.

— Eu não danço em casamento. Eu não vou a casamento desde junho de 1989. — Ela entra na pousada. — Eu vim porque é dele.`);
  return L.join('\n\n') },
 prox:'pd_c2_almoco'});

no('pd_c2_bolo',{cap:2,quem:'ab',tipo:'dialogo',lugar:'Brant Point Bakery · India Street',trilha:'abertura',hora:'Domingo, 11 de junho · 17h00',
 npcs:['rosa'],
 texto:c=>`A Brant Point Bakery é uma confeitaria do tamanho de um armário, com vitrine de doces e um ventilador de teto que gira devagar. Seis fatias de bolo numa bandeja: baunilha com framboesa, chocolate com avelã, cenoura, coco, amêndoa e limão-siciliano com merengue.

A Rosa provou duas fatias e chorou nas duas. Agora está lá fora, na calçada, ao telefone com a tia Concetta, chorando a terceira.

Sobraram vocês dois, quatro garfos, e a pasta aberta na aba *Bolo*.`,
 comeca:E=>lsSeat(E,PD_A),
 falas:[
  {p:'Você começa. Com a autoridade da pasta.',ops:c=>[
   {t:'— O de limão é o favorito da Gemma.',tom:'seco',tag:'limao'},
   {t:'— A Gemma odeia coco. O Tunde ama. Isso é um casamento.',tom:'flerte',tag:'coco'},
   {t:'— Escolhe você. Você é o lado do noivo.',tom:'cuida',tag:'escolhe'}
  ]},
  {p:'Sua resposta.',ops:(c,h)=>[
   ...(h[0].tag==='limao'?[{t:'— O de limão é o *seu* favorito. Você comeu dois.',tom:'flerte',tag:'dois'}]:[]),
   ...(h[0].tag==='coco'?[{t:'— Então põe coco só numa camada. A de baixo. Ninguém come a de baixo.',tom:'flerte',tag:'camada'}]:[]),
   ...(h[0].tag==='escolhe'?[{t:'— Você quer mesmo saber o que eu acho, ou quer que eu concorde?',tom:'seco',tag:'concorde'}]:[])
  ]},
  {p:'De volta para você.',ops:(c,h)=>[
   ...(h[1].tag==='dois'?[{t:'— Eu estou testando a consistência.',tom:'seco',tag:'consist'}]:[]),
   ...(h[1].tag==='camada'?[{t:'— Isso é genial. Eu odeio que isso seja genial.',tom:'flerte',tag:'genial'}]:[]),
   ...(h[1].tag==='concorde'?[{t:'— Os dois. Eu quero que você ache uma coisa e concorde comigo.',tom:'flerte',tag:'os2'}]:[])
  ]},
  {p:'A última garfada.',ops:(c,h)=>[
   ...(h[2].tag==='consist'?[{t:'— Da segunda fatia.',tom:'flerte',tag:'segunda'}]:[]),
   ...(h[2].tag==='genial'?[{t:'— Anota aí. Na pasta. *Padrinho: uma ideia boa.*'.replace('Padrinho',pdTitB(c).replace(/^./,x=>x.toUpperCase())),tom:'flerte',tag:'anota'}]:[]),
   ...(h[2].tag==='os2'?[{t:'— Limão. Eu acho limão. E concordo.',tom:'abre',tag:'limao2'}]:[])
  ]},
  {p:'Você fecha. Anotando na pasta.',ops:(c,h)=>[
   {t:'(Anotar na pasta, em voz alta:) — '+pdTitB(c).replace(/^./,x=>x.toUpperCase())+': cooperação zero.',tom:'seco',tag:'zero'},
   {t:'(Anotar na pasta, sem dizer nada, e virar a pasta para a outra pessoa ler.)',tom:'abre',acao:true,tag:'mostra'}
  ]},
  {p:'Você responde. Sem levantar os olhos do bolo.',ops:(c,h)=>[
   ...(h[4].tag==='zero'?[{t:'— Você escreveu isso há dois anos também. No guardanapo.',tom:'abre',tag:'guardanapo'}]:[]),
   ...(h[4].tag==='mostra'?[{t:'(Ler. *Limão, com uma camada de coco embaixo. Ideia do lado do noivo.* E não dizer nada. E comer a terceira fatia.)',tom:'flerte',acao:true}]:[])
  ]}
 ],
 prox:'pd_c2_mesas'});

no('pd_c2_mesas',{cap:2,quem:'ab',tipo:'puzzle',lugar:'Cozinha da Gull House',trilha:'investigacao',hora:'Domingo, 11 de junho · 21h00',
 npcs:['pippa'],
 texto:c=>`Nove da noite. O mapa de mesas na mesa da cozinha: catorze mesas redondas de dez lugares, desenhadas a lápis pela Courtney, apagadas a borracha pela Rosa, redesenhadas a caneta pela Rosa de madrugada, e corrigidas em silêncio, com post-its amarelos, pela juíza Funmi, hoje à tarde, sem dizer nada a ninguém.

A mesa sete, a da frente, ao lado da pista, tem dois lugares vagos. As duas mães mandaram, cada uma, uma mensagem com as próprias regras. A Rosa mandou para ${ehPA(c)?'você':pda(c)}. A juíza mandou para ${ehPB(c)?'você':pdb(c)}. Nenhuma das duas mandou para os dois.

A Pippa, de pijama de flamingo, traz duas canecas de chá e se senta para assistir, como quem vai ver uma final de campeonato.`,
 puz:{kind:'escolha',tit:'A mesa sete',enun:'Dois lugares vagos na mesa sete, a da frente. Quatro candidatos: a tia Concetta, o tio Sal, a tia Bisi e o Graham Whitfield, colega de trabalho da noiva. Juntem as regras das duas mães.',
  peca:{a:c=>ehPA(c)?'A mensagem da Rosa, de 3h12: "A tia Concetta TEM que ficar na mesa da frente, ela é a madrinha de batismo da Gemma. E o tio Sal NÃO pode ficar na mesma mesa que a Concetta. 1974. Um funeral. Uma lasanha. Não pergunta." E, no fim da lista de convidados, um nome que você lê duas vezes: Graham Whitfield, mesa onze. Você não diz nada.':'A mensagem da juíza, de 14h40, de três linhas: "A irmã Bisi senta na mesa da frente. É a mais velha dos Okoro. A Bisi não suporta gente que fala alto durante a comida. O tio Sal, pelo que a sra. Castellano me contou no cais, fala alto."',
        b:c=>ehPA(c)?'A mensagem da Rosa, de 3h12: "A tia Concetta TEM que ficar na mesa da frente, ela é a madrinha de batismo da Gemma. E o tio Sal NÃO pode ficar na mesma mesa que a Concetta. 1974. Um funeral. Uma lasanha. Não pergunta." E, no fim da lista de convidados, um nome que você lê duas vezes: Graham Whitfield, mesa onze. Você não diz nada.':'A mensagem da juíza, de 14h40, de três linhas: "A irmã Bisi senta na mesa da frente. É a mais velha dos Okoro. A Bisi não suporta gente que fala alto durante a comida. O tio Sal, pelo que a sra. Castellano me contou no cais, fala alto."'},
  opcoes:['A tia Concetta e o tio Sal','A tia Concetta e a tia Bisi','A tia Bisi e o tio Sal','O tio Sal e o Graham'],certa:1,max:2,
  dicas:{1:'As duas tias têm que estar na frente. O tio Sal não cabe com nenhuma delas.'},
  ok:{x:c=>`*A tia Concetta e a tia Bisi.* O círculo a lápis da mesa sete ganha os dois nomes.

A Pippa aplaude sozinha, de pijama.

— A italiana que não fala inglês desde 1974 e a nigeriana que não suporta gente que fala alto — ela diz. — Na mesma mesa. Elas vão se adorar. Nenhuma das duas vai dizer uma palavra a noite inteira.

O tio Sal vai para a mesa onze. Do lado de um certo Graham Whitfield. ${ehPA(c)?'Você conhece esse nome. A Pippa também. Ela olha para você por meio segundo e volta a olhar para a caneca.':'A Pippa lê o nome em voz alta, para de repente, olha para '+pdnA(c)+' por meio segundo e volta a olhar para a caneca.'}`,ef:{flag:'mesa7',fa:1,abaloAmbos:-1,motivo:'o primeiro problema que a dupla resolveu'}},
  falha:{x:c=>`Vocês erram duas vezes. Na segunda, a Pippa, com muito cuidado, aponta o círculo certo com a ponta da caneca de chá.

— A tia Concetta e a tia Bisi — ela diz. — Desculpa. Eu leio as mensagens das duas. Elas me mandam também.

O tio Sal vai para a mesa onze, do lado do Graham Whitfield.`,ef:{flag:'mesa7'}}},
 prox:'pd_c2_planod'});

no('pd_c2_fim',{cap:2,quem:'ab',tipo:'fim',lugar:'Gull House',trilha:'noite',hora:'Domingo, 11 de junho · meia-noite',
 texto:c=>`Na parede da cozinha, a lousa da Pippa ganhou uma coluna nova, ao lado da tabela, escrita com giz rosa: *PLACAR*. E embaixo, duas linhas:

*PIPPA: terça.*
*BARNABY: depois que eles pararem de fingir.*

E uma terceira, com uma letra que ninguém reconhece, de alguém que passou pela cozinha de madrugada e achou graça: *Funmi: eles já pararam. Eles só não sabem.*

Amanhã, segunda, às sete da noite, a Dory Barros faz o jantar de prova na praia de Madaket. Lagosta, milho, chouriço. E vinho, porque a Dory disse que lagosta sem vinho é crime em Cabo Verde e em Massachusetts.`,
 prox:'pd_c3_inicio'});
