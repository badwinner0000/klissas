/* ================= PADRINHO E MADRINHA · CAPÍTULO 7 · cenas novas e reescritas ================= */

no('pd_c7_manha',{cap:7,quem:'ab',tipo:'dividir',cada:1,lugar:'Gull House',trilha:'abertura',hora:'Quinta, 15 de junho · 8h00',
 npcs:['pippa','barnaby'],
 texto:c=>`Oito horas. A Pippa confere a tabela da parede três vezes, de cima para baixo, e não acredita.

— Está tudo riscado até as dez — ela anuncia. — Vocês têm uma hora livre. Uma hora inteira. — Ela olha para os dois, preocupada. — Vocês sabem o que se faz com isso?

Lá fora, o céu de depois da chuva está lavado, e as hortênsias pingam.`,
 pergunta:'O que você faz com uma hora livre?',
 ops:[
  {t:c=>'Fazer o café de '+pdnB(c)+' do jeito que você reparou que '+eleB(c)+' toma',se:ehPA,
   x:c=>`Puro, sem açúcar, na caneca lascada, que ${eleB(c)} pega toda manhã mesmo tendo seis inteiras no armário. Você reparou nisso no domingo. Só hoje reparou que tinha reparado.

Você põe a caneca na bancada, perto de ${pdnB(c)}, e não comenta.

A Pippa finge ler a agenda, que está de cabeça para baixo.`,ef:{flag:'cafe7',vinc:1,motivoV:'a caneca lascada'}},
  {t:'Sentar na varanda e não fazer nada por dez minutos. Cronometrados.',se:ehPA,at:'coragem',
   ok:{x:c=>`Você senta no banco de vime. Põe o celular virado para baixo. Não abre a pasta.

No terceiro minuto, as suas mãos procuram alguma coisa para arrumar e não acham. No sétimo, você repara que as hortênsias depois da chuva têm um azul diferente do de ontem.

Dez minutos. Recorde pessoal desde 2015.`,ef:{flag:'dez_minutos',abalo:-1,motivo:'dez minutos sem fazer nada'}},
   falha:{x:c=>`Você senta no banco de vime. No segundo minuto, já reorganizou de cabeça os vasos de hortênsia por altura. No quarto, está de pé, trocando dois de lugar.

O Barnaby aparece na porta, olha os vasos e troca os dois de volta, sem dizer nada.`}},
  {t:'Abrir o caderno e escrever o discurso enquanto a frase está fácil',se:ehPB,
   x:c=>`Você arranca a versão dezessete e começa a dezoito. Hoje a segunda frase vem sem esforço.

*Ele escolhe devagar, porque quer escolher uma vez só.*

Você olha a frase. Ela é sobre o Tunde. Hoje de manhã, ela também serve para outra pessoa, que está do outro lado da cozinha tomando café.

${c.f('contou_a_tunde')?'A terceira frase vem atrás, e a quarta, e nenhuma delas é mentira. Você escreve todas. Não risca nenhuma.':'Você deixa a caneta parada em cima da linha seguinte, sem pressa.'}`,ef:{flag:'v18'}},
  {t:'Lavar a louça do café com o Barnaby, que não pediu ajuda',se:ehPB,
   x:c=>`O Barnaby lava. Você enxuga. Seis pratos, quatro canecas, uma frigideira.

— Você está assobiando — ele diz, na terceira caneca.

— Não estou.

— *Rhinestone Cowboy.*

Você para de assobiar. Trinta segundos depois, sem perceber, começa de novo. O Barnaby deixa.`,ef:{flag:'assobio',abalo:-1,motivo:'a louça do café'}},
  {t:'Sentar no degrau da varanda, com o café, e olhar a rua',ambos:true,
   x:c=>`${c.Q} senta no degrau da varanda com a caneca nas duas mãos. A Easton Street acorda devagar: um entregador de bicicleta, uma senhora com dois cachorros, um caminhão de gelo.${c.f('degrau7')?`

No mesmo degrau já está ${c.oq}, com outra caneca. O degrau é estreito.`:''}`,ef:{flag:'degrau7'}}
 ],
 prox:'pd_c7_carteira'});

no('pd_c7_briga',{cap:7,quem:'ab',tipo:'dialogo',lugar:'Quarto três da Gull House',trilha:'tensao',hora:'Quinta, 15 de junho · 10h00',
 texto:c=>`Quarto três. A tranca quebrada desde 1997. Pela janela, o porto e a neblina começando a entrar.

Os dois de pé, um de cada lado da cama, cada um com uma coisa que o outro não contou.

${c.f('contou_a_tunde')?'Um caderno preto, aberto na versão dezoito de um discurso que foi escrito para ser lido a cento e quarenta pessoas.':'Um celular com a transcrição de um recado de voz na tela de bloqueio.'} E um nome, Graham, que desceu da balsa das nove e vinte com uma mala de rodinha e uma verdade que não era dele.`,
 comeca:E=>lsSeat(E,PD_A),
 falas:[
  {p:'Você começa. Sem a voz de trabalho.',ops:c=>[
   ...(c.f('contou_a_tunde')?[
    {t:'— Você vai ler isso no microfone? *Meu irmão não sabia se queria casar?* Na frente da Gemma?',tom:'seco',tag:'discurso'},
    {t:'— Você me contou na terça. Eu achei que a gente ia cuidar disso junto. E você escreveu esse discurso sem me dizer nada.',tom:'abre',tag:'junto'}
   ]:[
    {t:'— Dois de junho. Você sabia desde dois de junho. E me deixou montar tudo.',tom:'seco',tag:'sabia'},
    {t:c.f('mentiu_tunde')?'— "Ele estava nervoso." Você olhou para mim e disse isso. Você, que não sabe mentir.':'— Você é a pessoa que não sabe mentir. E passou a semana inteira em silêncio, do meu lado.',tom:'fere',tag:'mentiu'}
   ]),
   {t:'(Pôr na cama, entre os dois, '+(c.f('contou_a_tunde')?'o caderno aberto na versão dezoito':'o celular com a transcrição na tela')+'. Não dizer nada.)',tom:'seco',acao:true,tag:'mostra'}
  ]},
  {p:'Sua resposta.',ops:(c,h)=>[
   ...(h[0].tag==='discurso'||(h[0].tag==='mostra'&&c.f('contou_a_tunde'))?[{t:'— Ainda não sei se leio. Eu escrevi o que é verdade. Você queria que eu escrevesse o que é bonito.',tom:'seco',tag:'bonito'}]:[]),
   ...(h[0].tag==='junto'?[{t:'— Eu não sei cuidar de segredo a dois. Eu mal sei cuidar sozinh'+c.eu.o+'.',tom:'abre',tag:'naosei'}]:[]),
   ...(!c.f('contou_a_tunde')?[{t:'— Eu prometi ao meu irmão. Foi a primeira promessa que ele me pediu na vida.',tom:'seco',tag:'prometi'}]:[]),
   {t:'— E você? O Graham não foi embora. Foi você que cancelou. E deixou a cidade inteira odiar um homem que não fez nada.',tom:'fere',tag:'graham'},
   {t:'— O Graham chegou hoje. Ele me contou que foi você. — (Mais baixo.) — Por que você não me contou?',tom:'abre',tag:'porque'}
  ]},
  {p:'De volta para você. A neblina na janela.',ops:(c,h)=>(h[1].tag==='graham'||h[1].tag==='porque')?[
   {t:'— Porque ser quem foi largad'+c.eu.o+' era mais fácil. As pessoas cuidam de quem é deixado. Ninguém cuida de quem desiste.',tom:'abre',tag:'facil'},
   {t:'— Isso não é da sua conta. Isso é a minha vida. A sua é um segredo de outra pessoa, que você não soube nem guardar nem contar.',tom:'fere',tag:'conta'},
   {t:'(Sentar na beira da cama. De costas. Com a almofadinha de alfinetes fechada na mão.)',tom:'abre',acao:true,tag:'senta'}
  ]:[
   {t:'— A verdade *pode* esperar. Dois dias. Depois da festa ele resolve com ela. Eu faço isso há oito anos.',tom:'seco',tag:'espera'},
   {t:c.f('contou_a_tunde')?'— Você ia ler aquilo sem me avisar. Eu ia ficar sabendo junto com cento e quarenta pessoas.':'— Você ia me deixar descobrir no altar.',tom:'fere',tag:'altar'},
   {t:'— Eu não sei o que fazer com isso. E eu vivo de saber o que fazer.',tom:'abre',tag:'naosei2'}
  ]},
  {p:'Sua vez. Ninguém está ganhando.',ops:(c,h)=>[
   ...(h[2].tag==='facil'?[{t:'— Eu teria cuidado. De quem desistiu. — (Uma pausa.) — Eu cuido de gente que desiste há trinta anos. Eu cuido da minha mãe.',tom:'abre',tag:'cuidado'}]:[]),
   ...(h[2].tag==='conta'?[{t:'— Tá. Então cada um com a sua vida. Até sábado.',tom:'fere',tag:'sabado'}]:[]),
   ...(h[2].tag==='senta'?[{t:'(Sentar na outra beira da cama. De costas também. Um colchão inteiro no meio.)',tom:'abre',acao:true,tag:'senta2'}]:[]),
   ...(h[2].tag==='espera'?[{t:'— Foi o que o meu pai fez. Esperou, com a mesa do café posta. A verdade não espera. Ela só piora.',tom:'abre',tag:'pai'}]:[]),
   ...(h[2].tag==='altar'?[{t:'— Eu não sei o que eu ia fazer. É a primeira vez na vida que eu não sei.',tom:'abre',tag:'naosei3'}]:[]),
   ...(h[2].tag==='naosei2'?[{t:'— Então somos dois. É a pior semana possível para isso.',tom:'cuida',tag:'dois'}]:[]),
   {t:'— Eu preciso sair deste quarto. Depois a gente fala. Ou não.',tom:'seco',tag:'sair'},
   {t:'(Sair. Fechar a porta. A tranca não funciona, mas a porta fecha.)',tom:'seco',acao:true,tag:'porta'}
  ]}
 ],
 prox:'pd_c7_cozinha'});

no('pd_c7_cozinha',{cap:7,quem:'ab',tipo:'segue',lugar:'Cozinha da Gull House',trilha:'tensao',hora:'Quinta, 15 de junho · 10h20',
 npcs:['pippa','barnaby'],
 texto:c=>`Dez e vinte. Na cozinha, a Pippa e o Barnaby escutaram a casa ficar quieta. Numa casa de tábua de 1840, o silêncio depois de uma discussão se ouve melhor do que a discussão.

A Pippa vai até a lousa. Para embaixo de *Quinta, 15. Eu ganhei*, com o giz levantado.

— Eu apago?

— Não. — O Barnaby está descascando batata para o chowder de amanhã. — Briga não desfaz nada. Briga é a parte seguinte.

— A parte seguinte de quê?

— De parar de fingir. — A casca cai inteira, numa espiral só. — Quando a pessoa para de fingir, a primeira coisa que aparece é o que ela estava escondendo. Nunca é bonito. Em 1984, a Ruth e eu ficamos uma semana sem nos falar. Ela me mandava recado pelo carteiro.

A Pippa pensa nisso. Tira a tabela da parede, vira do avesso e escreve no verso, em letra grande: *RECADOS*. Risca duas colunas.

— Eu posso ser o carteiro.

— Você vai ser — diz o Barnaby. — Ninguém te perguntou, mas vai.

Às três da tarde, a Steamship Authority avisa que as balsas de sexta de manhã podem atrasar por causa da neblina. A Pippa cola o aviso na lousa, ao lado do placar.`,
 prox:c=>pdPor(c,'pd_c7_c','pd_c7_d')});

no('pd_c7_recados',{cap:7,quem:'ab',tipo:'dividir',cada:1,lugar:'Gull House',trilha:'tensao',hora:'Quinta, 15 de junho · 18h00',
 npcs:['pippa'],
 texto:c=>`Seis da tarde. Faltam dois dias, e a lista de tarefas não quer saber quem brigou com quem.

A Pippa aparece com o verso da tabela, as duas colunas e uma caneta atrás da orelha.

— Eu levo recado — ela avisa. — Um de cada. Sobre o casamento, ou não. Eu não leio.

Ela lê. Todo mundo sabe que ela lê.`,
 pergunta:'Que recado você manda pela Pippa?',
 ops:[
  {t:'Só serviço: "Cadeiras: 138. Luzes: chegaram. Som: amanhã."',ambos:true,
   x:c=>`${c.Q} dita um recado de três itens, sem um verbo. A Pippa anota, lê em voz alta para conferir e faz a cara de quem esperava mais.

— Só isso?

Só isso.`},
  {t:'Serviço, com um P.S.: "Você comeu?"',ambos:true,ef:c=>({flag:'recado_ps_'+c.s}),
   x:c=>`${c.Q} dita o recado de serviço. No fim, depois de um tempo, acrescenta um P.S. de duas palavras.

A Pippa escreve o P.S. com a letra mais caprichada que tem e sai quase correndo, antes que alguém mude de ideia.`},
  {t:'Nenhum. Devolver o papel em branco.',ambos:true,
   x:c=>`${c.Q} olha o papel, olha a Pippa e devolve em branco.

— Em branco também é recado — ela diz, e guarda mesmo assim.`}
 ],
 prox:'pd_c7_fim'});
