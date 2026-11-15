/* ================= PADRINHO E MADRINHA · CAPÍTULO 8 · cenas novas e reescritas ================= */

const pdSirva=c=>c.f('barnaby_celebra')?`— Serve — diz o Barnaby, fechando a pasta fina. — Amanhã é igual, com outras duas pessoas. — Ele olha os dois por cima dos óculos. — Ou com as mesmas, um dia. Eu não tenho pressa.`:`— Serve — diz o Barnaby, devolvendo o roteiro para a Pippa. — Amanhã é igual, com outras duas pessoas. Se aparecer um juiz. — Ele olha os dois por cima dos óculos e não acrescenta nada, o que no Barnaby é um comentário.`;

no('pd_c8_ensaio',{cap:8,quem:'ab',tipo:'dialogo',lugar:'Tenda do Yacht Club',trilha:'romance',hora:'Sexta, 16 de junho · 17h00',
 npcs:['barnaby','pippa','tunde'],
 texto:c=>`Cinco da tarde, na tenda, com a neblina encostada na lona. ${c.f('barnaby_celebra')?'O Barnaby quer ensaiar a cerimônia uma vez, do começo ao fim, porque *faz dois anos que eu não caso ninguém, e voz enferruja*.':'O juiz de paz continua preso em Hyannis, mas a Pippa quer ensaiar a cerimônia assim mesmo, lendo ela própria a parte do juiz, de um roteiro que a Courtney deixou. O Barnaby assiste de braços cruzados e corrige o texto em voz alta.'}

Os noivos não estão. O Tunde está de joelhos atrás da mesa de som. A Gemma foi à costureira com a Rosa.

— Eu preciso de dois corpos no altar para marcar o lugar — diz ${c.f('barnaby_celebra')?'o Barnaby, abrindo uma pasta fina de juiz de paz':'a Pippa, com o roteiro na mão'}. — Vocês dois. Padrinho serve para isso.

A Pippa arruma cada um pelos ombros, como quem arruma móvel. Um de frente para o outro. Meio metro.

— Esse roteiro da moça da Vance é ruim — resmunga o Barnaby. — Usem as minhas frases. Eu digo, vocês repetem. É ensaio. Ninguém casa por engano no estado de Massachusetts desde 1911.`,
 comeca:E=>lsSeat(E,PD_A),
 falas:[
  {p:'A frase é: "Eu prometo dizer do que tenho medo." Você repete.',ops:c=>[
   {t:'— Eu prometo dizer do que tenho medo. — (Sem entonação. Como quem lê cláusula de contrato.)',tom:'seco',tag:'clausula'},
   {t:'— Eu prometo dizer do que tenho medo. Dentro do prazo e em três vias.',tom:'flerte',tag:'vias'},
   {t:'— Eu prometo dizer do que tenho medo. — (A voz falha na última palavra. Só um pouco.)',tom:'abre',tag:'falha'}
  ]},
  {p:'A frase é: "E prometo ouvir, quando for a sua vez." Você repete.',ops:c=>[
   {t:'— E prometo ouvir, quando for a sua vez. — (Olhando para o papel na mão do Barnaby.)',tom:'seco',tag:'papel'},
   {t:'— E prometo ouvir. Isso eu sei fazer. Onze anos de reunião de pais.',tom:'flerte',tag:'pais'},
   {t:'— E prometo ouvir, quando for a sua vez. — (Olhando para a frente. Para quem está na frente.)',tom:'abre',tag:'frente'}
  ]},
  {p:'"Agora o par se olha, e eu conto até cinco. É o tempo da foto." Você faz o quê?',ops:c=>[
   {t:'(Olhar. Os cinco segundos inteiros.)',tom:'abre',acao:true,tag:'cinco'},
   {t:'(Olhar para o Barnaby e perguntar, com as sobrancelhas, se dá para pular essa parte.)',tom:'seco',acao:true,tag:'pular'},
   {t:'— Isso está no roteiro, ou o senhor inventou agora?',tom:'flerte',tag:'roteiro'}
  ]},
  {p:'Os mesmos cinco segundos, do seu lado.',ops:c=>[
   {t:'(Olhar. Os cinco segundos inteiros.)',tom:'abre',acao:true,tag:'cinco2',apos:pdSirva},
   {t:'(Contar os cinco segundos em voz baixa, olhando para a grama.)',tom:'seco',acao:true,tag:'grama',apos:pdSirva},
   {t:'— Um. Dois. Três. Quatro. — (Parar no quatro.)',tom:'flerte',tag:'quatro',apos:pdSirva}
  ]}
 ],
 prox:'pd_c8_jantar'});

no('pd_c8_brindes',{cap:8,quem:'ab',tipo:'dividir',cada:1,lugar:'Quintal da Gull House',trilha:'tensao',hora:'Sexta, 16 de junho · 21h00',
 npcs:['gemma','tunde','funmi','rosa'],
 texto:c=>`Vinte e oito copos esperam. Os primos Barros param a morna no meio de um compasso. A Gemma apoia o queixo nas mãos. O Tunde olha para o prato.

Duas pessoas, uma em cada ponta de uma mesa de cavaletes, com um copo na mão e uma semana inteira na garganta.`,
 pergunta:'Qual é o seu brinde?',
 ops:[
  {t:'O brinde que está na pasta. Curto, correto, sem risco.',ambos:true,
   x:c=>`${c.Q} levanta o copo e diz o brinde da pasta, aba azul, item nove: saúde, amor, obrigado a todos por terem vindo. Dura onze segundos. Amanhã ninguém vai lembrar de uma palavra.`},
  {t:'Um brinde de verdade para a Gemma, sem ler',se:ehPA,at:'coragem',
   ok:{x:c=>`— A minha irmã escolheu o vestido em vinte minutos, descalça — você diz. — Eu passei a vida achando que isso era pressa. É confiança. Ela confia que vai dar certo, e é por isso que com ela costuma dar.

Você levanta o copo.

— Eu queria aprender. À Gemma.

A Gemma atravessa o quintal, descalça, e abraça você por trás da cadeira, com força, antes que alguém consiga beber.`,ef:{flag:'brinde_gemma',vinc:1,motivoV:'um brinde sem ler'}},
   falha:{x:c=>`Você levanta, começa com *a minha irmã*, e no meio da frase a voz de trabalho assume o comando. Sai um brinde de fornecedor: agradecimentos, parceiros, o clima ajudou.

A Gemma bate palma mesmo assim. Ela sempre bate.`}},
  {t:'Um brinde de verdade para o Tunde, sem caderno',se:ehPB,at:'coragem',
   ok:{x:c=>`— O meu irmão levou quatro anos para escolher uma bicicleta — você diz. — Ele ainda tem a bicicleta. Ela fez vinte anos em março.

Risadas. O tio Armando solta uma nota no acordeão.

— Ele demora porque quer escolher uma vez só. — Você olha para o Tunde. — Não tem prazo, Tunde. Nem amanhã. Ao meu irmão.

O Tunde não levanta o copo. Fica olhando para você com os olhos cheios e faz que sim, uma vez só.`,ef:{flag:'brinde_tunde',vinc:1,motivoV:'um brinde sem caderno'}},
   falha:{x:c=>`Você levanta, sem caderno, e a primeira coisa que sai é o número atômico do ouro. Setenta e nove. Você tenta ligar ouro com aliança. Não liga.

O Tunde ri, de um jeito que ajuda, e levanta o copo para salvar você.`}},
  {t:'Levantar o copo para a outra ponta da mesa. Sem dizer nada.',ambos:true,ef:c=>({flag:'brinde_olhar_'+c.s}),
   x:c=>`${c.Q} levanta o copo na direção da outra ponta da mesa comprida. Não diz nada. Segura o copo no ar um segundo a mais do que um brinde pede.

A juíza Funmi, no meio da mesa, acompanha o copo com os olhos, de uma ponta até a outra.`}
 ],
 prox:'pd_c8_escada'});

no('pd_c8_escada',{cap:8,quem:'ab',tipo:'dividir',cada:1,lugar:'Gull House · perto da cozinha',trilha:'noite',hora:'Sexta, 16 de junho · 22h40',
 npcs:['rosa','funmi'],
 texto:c=>`Dez e quarenta. O jantar acabou. A cozinha da Gull House tem duas entradas, a da escada dos fundos e a do quintal, e de qualquer uma das duas dá para ouvir o que se fala na pia.

Lá dentro, sozinhas pela primeira vez na semana, as duas mães lavam à mão as taças de cristal da Ruth, que não podem ir para a máquina.

— A senhora viu os dois na mesa? — pergunta a Rosa. — Um em cada ponta.

— Vi.

— ${pdgA(c,'O meu filho','A minha filha')} está sofrendo. Sorri igual quando sofre. Puxou ao pai.

— ${pdgB(c,'O meu','A minha')} não sabe esconder. Nunca soube. Está com a cara de quando tinha oito anos.

— A gente faz alguma coisa?

— Não.

— Como não? Eu sou mãe!

— Eu também. Eu já fiz muita coisa por ${pdgB(c,'esse menino','essa menina')}. Decidi tudo. — A juíza enxuga uma taça contra a luz. — O resultado tem ${pdFB(c).idade||35} anos e pede licença para sentir. Desta vez eu vou ficar com as mãos ocupadas.`,
 pergunta:'Você ouviu. O que faz?',
 ops:[
  {t:'Ficar onde está e ouvir até o fim',ambos:true,
   x:c=>`${c.Q} fica onde está, sem respirar direito.

— E se eles não se acertarem? — pergunta a Rosa.

— Então a senhora chora e eu passo o lenço — responde a juíza. — É um bom sistema. Vem funcionando desde domingo.

A Rosa ri, de nariz entupido. Depois de um tempo, as duas voltam a enxugar.`,ef:c=>({flag:'ouviu_maes_'+c.s})},
  {t:'Entrar na cozinha e pegar um pano de prato',ambos:true,
   x:c=>`${c.Q} entra. As duas param de falar no mesmo segundo, como testemunhas combinadas.

A Rosa estende um pano de prato. A juíza estende uma taça. Ninguém comenta nada. A cozinha enxuga cristal em silêncio, e é o silêncio mais gentil da semana.`,ef:{abalo:-1,motivo:'as taças da Ruth'}},
  {t:'Subir sem fazer barulho. Aquela conversa não era para você.',ambos:true,
   x:c=>`${c.Q} sobe a escada pulando o terceiro degrau, o que range.`}
 ],
 prox:'pd_c8_varanda'});

no('pd_c8_fim',{cap:8,quem:'ab',tipo:'fim',lugar:'Gull House',trilha:'noite',hora:'Sábado, 17 de junho · 1h00',
 texto:c=>`Uma da manhã. A neblina levantou. O céu de Nantucket, sem lua, tem mais estrela do que qualquer céu de Boston ou de Providence.

A primeira balsa sai de Hyannis às seis e meia. A tia Bisi vem nela. O Judge Pike não vem, porque já não precisa.

Na lousa da cozinha, alguém apagou o placar inteiro durante a madrugada. A aposta, os nomes, as estrelas da Pippa, o *Eu ganhei* do Barnaby.

No lugar ficou uma linha só, em duas letras. A primeira metade é redonda, de quem escolhe vestido em vinte minutos: *Sábado, 17. 17h30. Gramado ${c.f('tenda_agua')?'de baixo':'de cima'}.*

A segunda metade é miúda e demorada: *A gente decide lá.*`,
 prox:'pd_c9_manha'});
