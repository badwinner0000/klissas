/* ================= PADRINHO E MADRINHA · CAPÍTULO 5 · A DANÇA ================= */

no('pd_c5_aula',{cap:5,quem:'ab',tipo:'segue',lugar:'Salão da Igreja Metodista · Centre Street',trilha:'abertura',hora:'Quarta, 14 de junho · 9h00',
 npcs:['pippa'],
 texto:c=>`O salão paroquial da Igreja Metodista de Centre Street tem piso de tábua corrida que range, um piano de armário desafinado, cadeiras de plástico empilhadas e um quadro de avisos com o cardápio do jantar de feijão de sexta.

A professora se chama Mrs. Eleanor Starbuck. Oitenta e um anos, um metro e cinquenta, sapatilha de cetim, coque branco, colar de pérola, e uma bengala que ela usa para apontar, nunca para andar.

— Dancei com o Fred Astaire em 1958 — ela diz, antes de bom dia. — No Copley Plaza, em Boston. Uma valsa. Ele pisou no meu pé. Eu nunca contei para ninguém, até agora. — Ela aponta a bengala para os dois. — Vocês. No centro do salão. A Pippa me disse que vocês se odeiam. Ótimo. O ódio dá postura.

A Pippa liga a caixinha de som no celular. *Moon River*, Andy Williams, três minutos e meio. A valsa dos padrinhos, que entra depois da dos noivos, e que na pasta, na aba azul, tem um asterisco: *ensaiar. Muito.*

— Quem conduz? — pergunta a Mrs. Starbuck.

Ela olha de um para o outro e espera. A bengala bate no assoalho, uma vez, como relógio de xadrez.`,
 ef:{pista:'pd_valsa'},
 prox:'pd_c5_valsa'});

no('pd_c5_pai',{cap:5,quem:'ab',tipo:'dialogo',lugar:'Escadaria da Igreja Metodista',trilha:'romance',hora:'Quarta, 14 de junho · 10h30',
 texto:c=>`${lsNoite(c,'olhos5')?'Os dois sustentaram o olhar até o último grão de areia. A Mrs. Starbuck ainda esperou dez segundos antes de avisar que a ampulheta tinha acabado, e mandou a Pippa pagar a limonada.':c.f('olhos5_a')?Pdb(c)+' desviou aos vinte segundos e pagou as duas limonadas.':c.f('olhos5_b')?Pda(c)+' desviou aos vinte segundos e pagou as duas limonadas.':'Os dois desviaram no mesmo instante, cada um para um lado. A Mrs. Starbuck declarou empate por covardia, e cada um pagou a sua limonada.'}

Intervalo. A Mrs. Starbuck foi tomar chá na sacristia com a Pippa, que quer saber tudo sobre o Fred Astaire.

Vocês sentam na escadaria de pedra da igreja, na Centre Street, com dois copos de limonada de uma barraquinha de crianças, um dólar cada. A rua está cheia de turistas de bermuda e cachorros de raça.

Na pasta, na aba azul, depois da valsa dos padrinhos, tem um item: *Dança das mães com os filhos. Rosa e ${pdFA(c).ap}? NÃO. Rosa e Gemma. Funmi e Tunde?? (recusou)*.`,
 comeca:E=>lsSeat(E,PD_A),
 falas:[
  {p:'Você pergunta. Com cuidado. Sem pasta.',ops:c=>[
   {t:'— A sua mãe não vai dançar com o Tunde. Ela não vai a casamento desde 1989. O que aconteceu em 1989?',tom:'abre',tag:'1989'},
   {t:'— Você nunca fala do seu pai.',tom:'abre',tag:'pai'},
   {t:'— Você dança melhor do que admite.',tom:'flerte',tag:'danca'}
  ]},
  {p:'Sua vez. A limonada esquentando na mão.',ops:(c,h)=>[
   ...(h[0].tag==='1989'?[{t:'— Ela ia casar com o meu pai em junho de 1989. Eu tinha um ano. Ele não apareceu na igreja. Foi o que ela sempre disse.',tom:'abre',tag:'igreja'}]:[]),
   ...(h[0].tag==='pai'?[{t:'— Não tem o que falar. Ele foi embora quando eu tinha oito anos. Numa terça. A mesa do café estava posta.',tom:'abre',tag:'terca'}]:[]),
   ...(h[0].tag==='danca'?[{t:'— Meu pai dançava. É a única coisa que eu lembro dele direito. Ele dançava com a minha mãe na cozinha.',tom:'abre',tag:'cozinha'}]:[]),
   {t:'— Isso é um assunto para outro dia.',tom:'seco',tag:'outro'}
  ]},
  {p:'De volta para você.',ops:(c,h)=>[
   ...(h[1].tag==='igreja'?[{t:'— Mas você tem um irmão mais novo.',tom:'abre',tag:'irmao'}]:[]),
   ...(h[1].tag==='terca'?[{t:'— A mesa do café posta.',tom:'cuida',tag:'mesa'}]:[]),
   ...(h[1].tag==='cozinha'?[{t:'— E depois?',tom:'abre',tag:'depois'}]:[]),
   ...(h[1].tag==='outro'?[{t:'— Tá. — (Uma pausa.) — A minha mãe chora em toda prova de bolo. Eu nunca chorei em nenhuma. Cada família tem o seu jeito de não falar.',tom:'abre',tag:'jeito'}]:[])
  ]},
  {p:'Sua vez.',ops:(c,h)=>[
   ...(h[2].tag==='irmao'?[{t:'— Ele voltou. Em 1991. Eles ficaram juntos sem casar. O Tunde nasceu. E em 1996 ele foi embora de novo. Desta vez de vez. Numa terça. Com a mesa do café posta.',tom:'abre',tag:'voltou'}]:[]),
   ...(h[2].tag==='mesa'?[{t:'— Ovo, torrada, café. Três xícaras. Ele tinha posto a mesa. Ele pôs a mesa e foi embora. Eu passei trinta anos tentando entender quem faz isso.',tom:'abre',tag:'quemfaz'}]:[]),
   ...(h[2].tag==='depois'?[{t:'— Depois ele foi embora. E a minha mãe parou de dançar. Na cozinha e em qualquer lugar.',tom:'abre',tag:'parou'}]:[]),
   ...(h[2].tag==='jeito'?[{t:'— O nosso é a minha mãe decidir tudo e ninguém perguntar nada.',tom:'abre',tag:'decide'}]:[])
  ]},
  {p:'A última. A Pippa está chamando da porta.',ops:(c,h)=>[
   {t:'— É por isso que você não sabe mentir. Porque alguém mentiu para você com a mesa posta.',tom:'abre'},
   {t:'(Pegar a mão do lado, a que segura a limonada quente, e não dizer nada.)',tom:'cuida',acao:true},
   {t:'— O Tunde não é o seu pai.',tom:'abre'}
  ]}
 ],
 prox:c=>pdPor(c,'pd_c5_a','pd_c5_b')});

no('pd_c5_banda',{cap:5,quem:'ab',tipo:'segue',lugar:'Cozinha da Gull House',trilha:'tensao',hora:'Quarta, 14 de junho · 14h00',
 npcs:['pippa','dory','barnaby'],
 texto:c=>`Duas da tarde. ${c.f('banda_problema')?'A banda The Salty Dogs confirmou, por mensagem, com três emojis de caveira: o bar mitzvah de Hyannis paga o dobro. Eles não vão.':'A Pippa entra na cozinha pálida, com o celular na mão. A banda The Salty Dogs mandou mensagem com três emojis de caveira: o contrato dizia domingo. Sábado eles tocam num bar mitzvah em Hyannis, que paga o dobro. Eles não vão.'}

Sem banda. A três dias.

A Pippa abre a terceira agenda e começa a ler nomes de bandas de Cape Cod, todas reservadas desde março.

E da porta dos fundos, com uma caixa de isopor de lagosta nos braços, a Dory Barros, que veio trazer amostra de chouriço, para.

— Vocês estão sem banda? — Ela põe o isopor na mesa. — Os meus primos tocam. Os Barros de Madaket. Cinco. Violão, cavaquinho, baixo, bateria e o meu tio Armando no acordeão. Morna, funaná, e depois, se pagar a cerveja, Earth, Wind & Fire. Eles tocam em batizado, em velório e no Quatro de Julho. Nunca tocaram em casamento de americano. — Ela olha para os dois. — Mas americano casa igual a todo mundo, não casa?

Do outro lado da mesa, a Pippa já está com a playlist aberta no celular: *Casamento G&T, 214 músicas, 11 horas*. E o Tunde, lembra a Pippa, é engenheiro de som. Tem caixas, mesa de som, tudo, num depósito em Boston.`,
 prox:'pd_c5_escolha'});

no('pd_c5_escolha',{cap:5,quem:'ab',tipo:'decisao',lugar:'Cozinha da Gull House',trilha:'tensao',hora:'Quarta, 14 de junho · 14h20',
 npcs:['dory','pippa'],
 texto:c=>`Os primos da Dory: cinco cabo-verdianos de Madaket, morna e funaná, um acordeão de 1962, e ninguém sabe o que vai acontecer quando a tia Concetta ouvir um funaná.

A playlist da Pippa: duzentas e catorze músicas, onze horas, aprovadas pela Gemma em março, num sistema de som que o Tunde montaria, se o Tunde estivesse aqui, o que ele não está.`,
 pergunta:'Quem toca no casamento?',
 ops:[
  {t:'Os Barros de Madaket. Ao vivo. Com acordeão. Ninguém vai esquecer.',ef:{flag:'banda_primos'},
   x:c=>`A Dory sorri, e pela primeira vez desde domingo dá para ver que falta um dente do lado esquerdo.

— Eu vou ligar para o Armando. Ele vai chorar. — Ela pega o isopor de novo. — E vocês dois vão dançar o funaná. Na frente de todo mundo. Isso é condição.

A Pippa escreve na tabela: *Banda: Os Barros (morna, funaná, acordeão).* E, na coluna de observações: *Padrinhos dançam funaná (condição).*`},
  {t:'A playlist da Pippa. Aprovada pela Gemma. Sem surpresa.',ef:{flag:'banda_playlist'},
   x:c=>`A Pippa dá um gritinho e abraça o celular.

A Dory dá de ombros, sem se ofender.

— Tudo bem. Mas os meus primos vão estar lá mesmo assim, porque vão me ajudar a servir lagosta. E se a playlist falhar, o Armando tem o acordeão no carro. — Ela pega o isopor. — Sempre tem.`}
 ],
 prox:'pd_c5_ensaio'});

no('pd_c5_fim',{cap:5,quem:'ab',tipo:'fim',lugar:'Gull House',trilha:'noite',hora:'Quarta, 14 de junho · 19h00',
 texto:c=>`O dia acaba com a lousa da cozinha cheia: *Licença: OK. Lagosta: OK. Tenda: ${c.f('tenda_agua')?'OK (gramado de baixo!)':'OK (gramado de cima)'}. Banda: ${c.f('banda_primos')?'Os Barros':'playlist'}. Bolo: limão + coco embaixo. Valsa: ensaiando.*

Falta o ensaio no clube, à noite, às nove. Ver a tenda montada, a luz, o caminho da cerimônia${c.f('altar_girado')?', o altar girado trinta e oito graus':''}.

A previsão do tempo para a noite, no rádio da cozinha do Barnaby: *pancadas de chuva forte a partir das vinte e uma horas, com rajadas de vento. Fiquem em casa.*

O Barnaby desliga o rádio e entrega a chave da caminhonete, sem dizer nada. Depois diz:

— A caminhonete vaza pelo teto, do lado do passageiro. Desde 1997.

— Tudo nessa ilha quebrou em 1997? — pergunta a Pippa.

— Foi um ano difícil — diz o Barnaby.`,
 prox:'pd_c6_chuva'});
