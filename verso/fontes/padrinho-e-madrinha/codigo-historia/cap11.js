/* ================= PADRINHO E MADRINHA · CAPÍTULO 1 · cenas novas e reescritas ================= */

no('pd_c1_balsa',{cap:1,quem:'ab',tipo:'segue',lugar:'Balsa rápida · Nantucket Sound',trilha:'mar',hora:'Sábado, 10 de junho · 16h05',
 texto:c=>`A balsa rápida tem dois andares, trezentos lugares e, nesta tarde de sábado, trezentas e duas pessoas, contando dois labradores e um bebê de colo. O único banco com espaço no andar de baixo é o do fundo, de dois lugares, encostado na máquina de café quebrada.

Num dos lugares, uma pasta de couro de quatro dedos de grossura. No corredor, de pé, um terno numa capa de plástico pendurado num ombro.

A balsa apita. O motor ronca. O chão vibra. Entre a pasta e o terno, dois anos de versões diferentes da mesma noite.

${c.f('fingiu')||c.f('mandou_msg')?'Num dos dois celulares, a tela ainda mostra a mensagem das três e cinquenta e sete: *Eu estou vendo você fingindo que não me viu.*\n\n':''}Uma senhora com um labrador molhado pede licença para passar, e o cachorro resolve a questão do jeito dele: senta em cima do pé de quem está de pé e não sai mais. A pasta vai para um colo. Sobra um lugar no banco. Só um.`,
 prox:'pd_c1_farpas'});

no('pd_c1_tabela',{cap:1,quem:'ab',tipo:'segue',lugar:'Cozinha da Gull House',trilha:'abertura',hora:'Sábado, 10 de junho · 19h00',
 npcs:['pippa','barnaby'],
 texto:c=>`A cozinha da Gull House tem uma mesa comprida de pinho, um fogão de seis bocas grande demais para a casa e uma lousa verde de escola pendurada ao lado da geladeira. A Pippa prende a tabela dela na parede com fita crepe. A tabela tem cores e legenda.

— Eu vou falar tudo de uma vez, porque se eu parar eu choro — ela avisa. — Sábado que vem, dia dezessete, cinco e meia da tarde, Nantucket Yacht Club. Cento e quarenta convidados. Noiva: Gemma Castellano, vinte e nove anos. — A caneta aponta para ${pda(c)}. — Irmã caçula. Noivo: Tunde Okoro, trinta e um, engenheiro de som. — A caneta vira para ${pdb(c)}. — Irmão caçula. Os dois estão num retiro de silêncio em Vermont, sem celular, e só saem na quinta.

Ela respira.

— Mãe da noiva: a dona Rosa, chega amanhã na balsa das dez, com uma tia. Mãe do noivo: a juíza Funmi Okoro, chega amanhã na das duas, sozinha. As duas acham que a Courtney Vance está aqui com um cronograma. — Outra respiração. — O que a gente tem: clube pago, banda confirmada, flor. — Ela olha para o Barnaby, que finge que flor não é com ele. — O que a gente não tem: cerimonialista, bufê, lagosta. E esta coluna aqui.

A coluna se chama *QUEM*. Está vazia de cima a baixo.

— Faltou uma linha — diz o Barnaby, mexendo uma panela, de costas. — O que esses dois têm um com o outro.

— Isso não cabe na tabela.

— Então arruma uma tabela maior.`,
 prox:'pd_c1_noite'});

no('pd_c1_jantar',{cap:1,quem:'ab',tipo:'dialogo',lugar:'Cozinha da Gull House',trilha:'abertura',hora:'Sábado, 10 de junho · 21h00',
 npcs:['pippa','barnaby'],
 texto:c=>`Nove da noite. O Barnaby serve ensopado de peixe sem perguntar se alguém quer, em pratos fundos que não combinam entre si. A Pippa espera todo mundo dar a primeira colherada.

— Tá, eu preciso perguntar — ela diz. — A Gemma me falou que vocês *já se conhecem*. Com aquela voz. De onde?

O Barnaby não levanta os olhos do prato. Mas para de mastigar.`,
 comeca:E=>lsSeat(E,PD_A),
 falas:[
  {p:'Você responde primeiro. A Pippa está com o queixo na mão.',ops:c=>[
   {t:'— Um jantar. Em 2021. Durou uma hora e dez. Eu cronometrei.',tom:'seco',tag:'hora'},
   {t:'— Nossos irmãos armaram um encontro às cegas. Alguém chegou dezenove minutos depois da hora. Não fui eu.',tom:'flerte',tag:'atraso',
    apos:'A Pippa vira a cabeça para o outro lado da mesa, devagar, como quem acompanha uma bola de tênis.'},
   {t:'— A gente jantou uma vez. Foi um dia ruim para os dois. Não vale como amostra.',tom:'cuida',tag:'amostra'}
  ]},
  {p:'A sua versão. O ensopado esfriando.',ops:(c,h)=>[
   ...(h[0].tag==='atraso'?[{t:'— A ponte de Providence estava parada. E eu pedi desculpa. Duas vezes. Isso nunca entra na versão.',tom:'seco',tag:'ponte'}]:[]),
   ...(h[0].tag==='amostra'?[{t:'— É verdade. Eu estava nervos'+c.eu.o+'. Eu falo de química quando fico nervos'+c.eu.o+'.',tom:'abre',tag:'nervoso'}]:[]),
   {t:'— Uma hora e dez, com onze ligações atendidas no meio. Eu também sei contar.',tom:'seco',tag:'onze'},
   {t:'— Foi o pior primeiro encontro da minha vida. Eu lembro de todos os detalhes. Não sei o que isso quer dizer.',tom:'flerte',tag:'pior',
    apos:'A Pippa abre a boca. O Barnaby, sem olhar, empurra o cesto de pão na direção dela, e ela entende o recado e fecha.'}
  ]},
  {p:'De volta para você.',ops:(c,h)=>[
   {t:'— Você explicou a sobremesa. Usando a palavra *molécula*.',tom:'seco',tag:'molecula'},
   {t:'— Você dividiu a conta por item, com uma caneta de quatro cores. Eu vi a cor que você escolheu para a minha parte.',tom:'flerte',tag:'caneta'},
   {t:'— Eu saí antes da sobremesa. Isso eu admito. O resto eu contesto.',tom:'abre',tag:'admito'}
  ]},
  {p:'Sua vez. A Pippa parou de comer.',ops:(c,h)=>[
   ...(h[2].tag==='caneta'?[{t:'— Vermelho. É a cor de corrigir.',tom:'flerte',tag:'vermelho'}]:[]),
   ...(h[2].tag==='molecula'?[{t:'— A palavra era *sacarose*. Molécula é genérico.',tom:'seco',tag:'sacarose'}]:[]),
   {t:'— Você trocou de mesa duas vezes. O garçom achou que a gente estava fugindo de alguém.',tom:'seco',tag:'mesa'},
   {t:'— Eu ia pedir a sobremesa para dois. Nunca contei isso para ninguém.',tom:'abre',tag:'sobremesa',
    apos:'A colher da Pippa para no ar. Uma gota de ensopado cai na terceira agenda.'}
  ]},
  {p:'A última palavra do seu lado.',ops:(c,h)=>[
   {t:'(Rir. Tarde demais para fingir que foi tosse.)',tom:'flerte',acao:true,tag:'riu'},
   {t:'— Pippa, anota: as versões não batem. Nunca vão bater.',tom:'seco',tag:'anota'},
   {t:'— Numa coisa a gente concorda. Foi horrível.',tom:'flerte',tag:'horrivel'}
  ]},
  {p:'Você fecha.',ops:(c,h)=>[
   {t:'— Horrível e inesquecível. As duas coisas cabem na mesma noite.',tom:'flerte',tag:'cabem'},
   {t:'(Passar o cesto de pão para o outro lado da mesa, sem ninguém pedir.)',tom:'cuida',acao:true,tag:'pao'},
   {t:'— O ensopado está muito bom, Barnaby.',tom:'seco',tag:'ensopado',
    apos:'O Barnaby resmunga que ensopado bom não se elogia, se repete. E põe mais uma concha em cada prato, sem perguntar.'}
  ]}
 ],
 prox:'pd_c1_maes'});

no('pd_c1_maes',{cap:1,quem:'ab',tipo:'decisao',lugar:'Cozinha da Gull House',trilha:'tensao',hora:'Sábado, 10 de junho · 23h00',
 npcs:['pippa','barnaby'],
 texto:c=>`Onze da noite. A cozinha cheira a cebola e a café requentado. A tabela da Pippa já tem algumas linhas preenchidas na coluna *QUEM*${c.f('achou_dory')?', uma delas com *Dory Barros, Madaket, 6h*':''}${c.f('clausula_clube')?', e outra, em vermelho, com *Cláusula 14.c, quarta, 17h30*':''}.

Amanhã, domingo, as mães chegam. A Rosa na balsa das dez, com a tia Concetta. A juíza Funmi Okoro na das duas, sozinha. As duas esperam encontrar a Courtney Vance, da Vance & Co., com um sorriso e um cronograma.

A Pippa, de pijama de flamingo, segura uma caneca de chá e olha de um para o outro.

— Então — ela diz. — A gente conta para as mães? Ou não conta?`,
 pergunta:'O que vocês dizem para as mães amanhã?',
 ops:[
  {t:'A verdade, de manhã, as duas juntas, antes que elas descubram sozinhas. A Courtney fugiu. Vocês dois assumem.',ef:{flag:'contou_maes'},
   x:c=>`A Pippa anota na tabela: *Domingo, 10h: contar para as mães. Juntos.* Sublinha *juntos* duas vezes, com caneta rosa, olhando para o Barnaby. O Barnaby finge que não viu.

— A verdade bem apresentada — ela diz, experimentando a frase. — Posso pôr isso no meu currículo?`},
  {t:'Nada, por enquanto. A Courtney está *numa reunião*. Até ter bufê, ninguém precisa saber.',ef:{flag:'escondeu_maes'},
   x:c=>`A Pippa anota na tabela: *Mães: a Courtney está em reunião.* E embaixo, com letra menor: *(mentira).*

— Isso se chama administrar a informação — ela diz, sem muita convicção. — Eu li num livro de eventos.

O Barnaby, da pia, responde sem virar:

— A juíza vai saber em dez minutos.`}
 ],
 prox:'pd_c1_parede'});

no('pd_c1_parede',{cap:1,quem:'ab',tipo:'dividir',secreto:true,cada:1,lugar:'Gull House · quartos três e quatro',trilha:'noite',hora:'Sábado, 10 de junho · meia-noite',
 texto:c=>`Meia-noite. Quarto três e quarto quatro. No meio, um banheiro com duas portas e uma tranca quebrada desde 1997.

A parede entre os dois quartos é de tábua de 1840. Dá para ouvir tudo através dela: o colchão do outro lado, uma mala abrindo, alguém escovando os dentes com raiva.

Depois, silêncio dos dois lados. O silêncio de duas pessoas que sabem que a outra está acordada.`,
 pergunta:'O que você faz? (a outra pessoa só fica sabendo depois)',
 ops:[
  {t:'Bater na parede. Duas vezes, de leve. Sem saber direito por quê.',ambos:true,ef:lsSim('bateu1'),x:c=>`${c.Q} bate na tábua, duas vezes, com o nó do dedo.`},
  {t:'Virar para o lado da janela e dormir. Amanhã começa cedo.',ambos:true,x:c=>`${c.Q} vira para o lado da janela e puxa a colcha até o queixo.`}
 ],
 prox:'pd_c1_fim'});

no('pd_c1_fim',{cap:1,quem:'ab',tipo:'fim',lugar:'Gull House',trilha:'noite',hora:'Sábado, 10 de junho · meia-noite e vinte',
 texto:c=>`${lsNoite(c,'bateu1')?'As batidas saem quase juntas, uma de cada lado da mesma tábua. Depois, mais nada. Ninguém sabe o que aquilo quis dizer, e ninguém atravessa o banheiro para perguntar.':c.f('bateu1_a')||c.f('bateu1_b')?'Duas batidas de leve, de um lado só. Do outro, a colcha no queixo e os olhos abertos no escuro. A resposta não vem. Quem bateu fica um tempo com a mão espalmada na tábua, depois tira.':'Ninguém bate em nada. A parede fica entre os dois a noite inteira, fazendo o serviço dela.'}

Lá embaixo, na cozinha, de pijama de flamingo, a Pippa escreve num canto da lousa, com giz, bem pequeno: *Aposta: eles se beijam até terça.*

De manhã, a frase tem companhia. Embaixo, com letra de etiqueta de planta: *Beijo não conta. Conta o dia em que pararem de fingir.*`,
 prox:'pd_c2_madaket'});
