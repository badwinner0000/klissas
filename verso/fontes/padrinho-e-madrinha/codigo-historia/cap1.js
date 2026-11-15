/* ================= PADRINHO E MADRINHA · CAPÍTULO 1 · DUAS VERSÕES ================= */

no('pd_c1_a',{cap:1,quem:'solo',lugar:'Terminal da balsa · Hyannis',trilha:'tensao',hora:'Sábado, 10 de junho de 2023 · 15h40',
 texto:c=>`O terminal da Steamship Authority em Hyannis cheira a protetor solar, a diesel e a cachorro molhado. Você está na fila da balsa rápida das quatro para Nantucket, com uma mala de rodinha, uma bolsa de lona com três carregadores de celular e a pasta debaixo do braço.

A pasta. Couro marrom, quatro dedos de grossura, abas coloridas. Plano A, em azul: o casamento de Gemma Castellano e Tunde Okoro, sábado, dezessete de junho, no Nantucket Yacht Club, cento e quarenta convidados, cerimônia na grama às cinco e meia, com o pôr do sol atrás. Plano B, em verde: chuva. Plano C, em amarelo: chuva com vento. E, grampeada no fim, por cima de tudo, uma página que ninguém lê, com uma letra D escrita à mão.

A cerimonialista do casamento não é você. Você é só ${pdgA(c,'o irmão','a irmã')} da noiva. ${pdgA(c,'O padrinho do lado da noiva, como a Gemma insiste em chamar, rindo','A madrinha')}. A Gemma contratou outra pessoa, a Courtney Vance, da Vance & Co., *para você poder aproveitar a festa, ${pdFA(c).ap}, pelo amor de Deus, pelo menos uma vez*.`,
 ops:[
  {t:'Atender a ligação da Pippa, que está tocando pela terceira vez',
   x:c=>`— Não surta — diz a Pippa, sem bom dia. — Promete que não surta.

— Eu não surto. Eu sou profissional.

— A Courtney foi embora. — Uma pausa. — Com o Marco. Do bufê. Eles estão apaixonados. Ela mandou um e-mail às sete da manhã do aeroporto de Logan. Estão indo para Portugal. Eu vou ler: *Sorry, darlings. The heart wants what it wants. O sinal não é reembolsável. Boa sorte, beijos.*

Você fica um tempo em silêncio, na fila da balsa.

— A Pippa ainda está aí? — diz a Pippa, que fala de si mesma em terceira pessoa quando está nervosa.

— Temos um pequeno ajuste — você diz. — Só isso. Um pequeno ajuste.

Do outro lado, a Pippa respira fundo. Ela trabalha com você há oito meses. Ela sabe o que *pequeno ajuste* quer dizer.`,ef:{flag:'sabe_courtney',abalo:1,motivo:'a Courtney foi para Portugal'}},
  {t:'Abrir a pasta e refazer o cronograma da semana na cabeça, item por item',at:'cabeca',
   ok:{x:c=>`Sete dias. Sem cerimonialista, sem bufê. A noiva e o noivo num retiro de silêncio em Vermont, sem celular, até quinta. Cento e quarenta convidados.

Você vira as abas. Clube de vela: reservado, pago. Flores: um florista local, um tal Barnaby Cole, que é também o dono da pousada onde vocês vão ficar. Banda: confirmada. Bolo: a prova é amanhã. Bufê: nada. Lagosta para cento e quarenta pessoas, numa ilha, em junho, em sete dias.

Você escreve na margem do plano A, com a letra pequena: *Bufê. Domingo. Lista de lagosteiros da ilha. Ligar para todos.* E embaixo: *Não chorar.*

A respiração já voltou.`,ef:{flag:'cronograma',abalo:-1,motivo:'uma lista'}},
   falha:{x:c=>`Você abre a pasta e as abas se misturam. Azul com verde, verde com amarelo. O vento do terminal vira três folhas, e uma voa até o asfalto, e um garoto de boné pega e devolve, molhada de refrigerante.

É o mapa de mesas. Agora com uma mancha laranja em cima da mesa sete, a das tias.`,ef:{abalo:1,motivo:'o mapa de mesas no chão'}}},
  {t:'Ouvir de novo o último recado da Gemma, de antes do retiro',
   x:c=>{ const n=pdFB(c).ap, d=pdgB(c,'o','a'); return `*Oi, oi, oi! A gente tá entrando no retiro, eles vão pegar os celulares, eu tô morrendo de medo, o Tunde tá rindo de mim. Escuta: a Courtney cuida de tudo, você não faz NADA, entendeu? Nada. Você vai pra praia, toma vinho, conhece gente. Ah! E ${d} ${pdTitB(c)} vai estar lá. ${d==='o'?'O':'A'} ${n}. Você lembra d${d} ${n}.* Uma risada. *Claro que você lembra d${d} ${n}. Seja boazinha. Eu te amo. Tchau!*

Você lembra.` },ef:{flag:'recado_gemma'}},
  {t:'A fila andou. E lá na frente, de camisa de linho amassada e um caderno de capa preta debaixo do braço, uma pessoa que você conhece.',ir:'pd_c1_a2'}
 ]});

no('pd_c1_a2',{cap:1,quem:'solo',lugar:'Terminal da balsa · Hyannis',trilha:'tensao',hora:'Sábado, 10 de junho · 15h55',
 ef:{pista:'pd_versao_a'},
 texto:c=>`Junho de 2021. O Alba, um restaurante italiano em Back Bay, com toalha branca e um garçom que se chamava Luca e vinha de Worcester.

A Gemma arrumou. *Um amigo de um amigo do trabalho. Professor. Muito inteligente. Você vai gostar, ele é o seu oposto.* Você foi de vestido verde, com a agenda de três casamentos daquele fim de semana no celular.

${pdFB(c).ap} chegou dezenove minutos atrasad${pdgB(c,'o','a')}. Você contou. Sentou, olhou a carta de vinhos e corrigiu a sua pronúncia de *Montepulciano*. Quando o molho de vitela chegou, explicou, sem ninguém perguntar, a química da redução: a água evapora, as moléculas de açúcar caramelizam, a reação de Maillard, como se você fosse uma turma do segundo ano. Quando você contou do casamento que estava fazendo naquele sábado, ${pdgB(c,'ele','ela')} disse: *ah, a indústria do casamento.* Com aquele tom.

E quando a conta veio, dividiu. Por item. Com uma caneta de quatro cores.

Você saiu antes da sobremesa. Fim.

É assim que você conta essa noite. Contou para a Gemma, para a sua mãe, para a Pippa, para duas noivas que perguntaram se você namorava. Sempre igual. Sempre terminando ali, no *fim*.

A pessoa da camisa amassada está seis lugares na sua frente na fila. Vira. Olha para trás. Para em você.

Você vê o reconhecimento chegar. Devagar, como uma reação química que alguém explicaria sem ninguém pedir.`,
 ops:[
  {t:'Sorrir o sorriso profissional, o de noiva chorando no altar, e acenar com dois dedos',
   x:c=>`Você sorri. O sorriso de cerimonialista: dentes, sem olhos. Acena com dois dedos.

Lá na frente, ${pdFB(c).ap} não sorri de volta. Levanta o caderno preto, de leve, como quem levanta um copo num brinde que não quer fazer. E vira para frente.`,ef:{flag:'acenou'}},
  {t:'Fingir que não viu e olhar fixo para o celular',
   x:c=>`Você olha para o celular. Para a tela apagada do celular. Com muita concentração.

Três segundos depois, ele vibra. Uma mensagem de um número que você não tem salvo, mas que você sabe de quem é, porque só tem uma pessoa nessa fila que escreveria assim, com ponto final:

*Eu estou vendo você fingindo que não me viu.*`,ef:{flag:'fingiu'}},
  {t:'Embarcar. Se for para sentar perto, que pelo menos seja na janela.',ir:'pd_c1_balsa'}
 ]});

no('pd_c1_b',{cap:1,quem:'solo',lugar:'Terminal da balsa · Hyannis',trilha:'tensao',hora:'Sábado, 10 de junho de 2023 · 15h40',
 texto:c=>`O terminal da Steamship Authority em Hyannis cheira a protetor solar, a diesel e a cachorro molhado. Você está na fila da balsa rápida das quatro para Nantucket, com uma mochila, um terno numa capa de plástico pendurado no ombro e um caderno quadriculado de capa preta.

No caderno, o discurso de ${pdTitB(c)}, versão catorze. As treze anteriores estão riscadas com caneta vermelha, a da sua caneta de quatro cores. A catorze começa assim: *Meu irmão é a pessoa mais gentil que eu conheço.* E depois disso, nada. Você não consegue escrever a segunda frase.

Porque no seu celular tem um recado de voz do seu irmão, de dois de junho, oito dias atrás, às duas da manhã. Você ouviu uma vez. Não apagou.`,
 ops:[
  {t:'Ouvir o recado do Tunde de novo, com o fone, de costas para a fila',
   x:c=>`*${pdFB(c).ap}. Sou eu. Desculpa a hora.* A voz do Tunde, baixa, de quem está no carro, parado, com o motor desligado. *Eu não sei se eu quero casar.* Um silêncio comprido. *Não é ela. Ela é... ela é tudo. Sou eu. Eu acordo e fico pensando no papai. Que ele também achava que queria. E aí...* Outro silêncio. *Eu vou pro retiro pra pensar. Não fala pra ninguém. Nem pra mamãe. Principalmente pra mamãe. Por favor. Eu só precisava dizer em voz alta pra alguém.*

Fim do recado.

Você não sabe mentir. Você nunca soube. No terceiro ano, confessou à professora que tinha comido o giz de cera azul antes de ela perguntar. E agora tem sete dias de casamento pela frente com um segredo no bolso.`,ef:{flag:'ouviu_tunde',abalo:1,motivo:'o recado do Tunde'}},
  {t:'Ligar para a sua mãe',
   x:c=>`— Okoro. — A sua mãe atende o telefone como atendia no tribunal, pelo sobrenome, há trinta anos.

— Mãe. Sou eu. Estou na balsa. Chego hoje.

— Eu chego amanhã. A sra. Castellano mudou a mesa das tias pela quarta vez. Às três da manhã. Por mensagem de voz. Com choro. — Uma pausa de juíza. — Eu não vou responder.

— Mãe... — Você para. O recado do Tunde no bolso. — Você está bem? Com isso tudo?

— Eu estou indo, ${pdFB(c).ap}. Eu vou porque é dele. — Ela desliga.

Ela não disse se estava bem.`,ef:{flag:'ligou_funmi'}},
  {t:'Tentar escrever a segunda frase do discurso',at:'cabeca',
   ok:{x:c=>`*Meu irmão é a pessoa mais gentil que eu conheço.* Você pensa. Escreve: *Ele escolhe devagar, porque quer escolher uma vez só.*

Olha a frase. É verdade. É a frase mais verdadeira que você escreveu em oito dias. E dá medo, porque ela serve para os dois lados.

Você não risca.`,ef:{flag:'frase2',abalo:-1,motivo:'uma frase verdadeira'}},
   falha:{x:c=>`Você escreve: *Ele é muito decidido.* Risca. Mentira. Escreve: *Ele sempre soube o que queria.* Risca. Mentira. Escreve: *Ele*. E fica olhando para a palavra até a fila andar.

Versão quinze. Riscada.`}},
  {t:'A fila andou. E seis lugares atrás, de vestido azul-marinho, com uma pasta de couro de quatro dedos de grossura, alguém que você conhece.',ir:'pd_c1_b2'}
 ]});

no('pd_c1_b2',{cap:1,quem:'solo',lugar:'Terminal da balsa · Hyannis',trilha:'tensao',hora:'Sábado, 10 de junho · 15h55',
 ef:{pista:'pd_versao_b'},
 texto:c=>`Junho de 2021. O Alba, um restaurante italiano em Back Bay, com toalha branca e um garçom que se chamava Luca e vinha de Worcester.

O Tunde arrumou. *Alguém que um cara do trabalho conhece. Organiza casamentos. Muito eficiente. Você vai gostar, ${pdgA(c,'ele','ela')} é o seu oposto.*

Você chegou dezenove minutos atrasad${c.eu.o}, porque a ponte de Providence estava parada, e pediu desculpa duas vezes. ${pdFA(c).ap} disse *tudo bem* com a boca e *anotado* com o resto da cara.

Durante o jantar, o celular tocou onze vezes. Você contou. ${pdgA(c,'Ele','Ela')} atendeu as onze. Trocou de mesa duas vezes sem perguntar, porque a primeira tinha *uma corrente de ar* e a segunda *uma luz ruim para conversar*. Chamou o garçom de *querido*. Quando você tentou falar da sua turma, a do segundo ano, da reação de Maillard, que é o que deixa um molho bom, ${pdgA(c,'ele','ela')} olhou o relógio. No meio da frase.

E quando a conta veio, ${pdgA(c,'ele','ela')} quis pagar tudo. Com um cartão da empresa. Como se você fosse um fornecedor.

${pdgA(c,'Ele','Ela')} saiu antes da sobremesa. Fim.

É assim que você conta essa noite. Contou para o Tunde, para a sua mãe, para o professor de física que divide a sala com você. Sempre igual. Sempre terminando ali, no *fim*.

Você vira para trás, na fila, sem saber por quê. E para.`,
 ops:[
  {t:'Levantar o caderno, de leve, como quem cumprimenta sem querer cumprimentar',
   x:c=>`Lá atrás, ${pdFA(c).ap} sorri um sorriso que você conhece. O de quem está numa foto de casamento e não gosta de ninguém da foto. Acena com dois dedos.

Você levanta o caderno preto, de leve. E vira para frente.`,ef:{flag:'cumprimentou'}},
  {t:'Mandar uma mensagem. Você ainda tem o número, de dois anos atrás.',
   x:c=>`Você não apagou o número. Você não sabe por quê. Você escreve, com ponto final, porque escreve tudo com ponto final:

*Eu estou vendo você fingindo que não me viu.*

Manda. Lá atrás, alguém que estava olhando com muita concentração para a tela apagada do celular leva um susto com a vibração.`,ef:{flag:'mandou_msg'}},
  {t:'Embarcar. A balsa tem dois andares. Escolher o de baixo, longe da janela.',ir:'pd_c1_balsa'}
 ]});

no('pd_c1_farpas',{cap:1,quem:'ab',tipo:'dialogo',lugar:'Balsa rápida · banco do fundo',trilha:'mar',hora:'Sábado, 10 de junho · 16h10',
 texto:c=>`Dois lugares. Um apoio de braço só. A máquina de café quebrada fazendo um barulho de quem vai morrer a qualquer momento. Duas horas de travessia, porque a neblina começa a fechar em cima do Sound e a balsa rápida, hoje, não vai ser rápida.`,
 comeca:E=>lsSeat(E,PD_A),
 falas:[
  {p:'Você abre. Profissional. Com o sorriso de trabalho.',ops:c=>[
   {t:'— Que coincidência. Mesma balsa. Você não estava dezenove minutos atrasad'+pdgB(c,'o','a')+' desta vez.',tom:'flerte',tag:'atraso'},
   {t:'— Olha, a gente vai passar uma semana junto. Vamos ser adultos. Começar do zero.',tom:'cuida',tag:'zero'},
   {t:'— Como vai a indústria do ensino médio?',tom:'seco',tag:'industria'}
  ]},
  {p:'Sua resposta. Seca.',ops:(c,h)=>[
   ...(h[0].tag==='atraso'?[{t:'— A ponte estava parada. Eu pedi desculpa duas vezes. Você anotou.',tom:'seco',tag:'anotou'}]:[]),
   ...(h[0].tag==='zero'?[{t:'— Do zero. Tá. Prazer. Eu sou a pessoa que você deixou falando sozinha antes da sobremesa.',tom:'seco',tag:'sobremesa'}]:[]),
   ...(h[0].tag==='industria'?[{t:'— Rentável. Doze mil por ano em giz de cera. Os alunos comem.',tom:'flerte',tag:'giz'}]:[]),
   {t:'— Você trouxe a pasta. Claro que trouxe a pasta.',tom:'seco',tag:'pasta'}
  ]},
  {p:'De volta para você. A balsa sacode.',ops:(c,h)=>[
   ...(h[1].tag==='anotou'?[{t:'— Eu não anotei. Eu lembro. É diferente.',tom:'flerte',tag:'lembra'}]:[]),
   ...(h[1].tag==='sobremesa'?[{t:'— Eu saí antes da sobremesa porque você estava explicando a sobremesa. Quimicamente.',tom:'seco',tag:'quimica'}]:[]),
   ...(h[1].tag==='giz'?[{t:'(Rir. Sem querer. E disfarçar com uma tosse.)',tom:'flerte',acao:true,tag:'riu'}]:[]),
   ...(h[1].tag==='pasta'?[{t:'— A pasta é o casamento da minha '+pdIrA(c)+'. Eu não deixo o casamento da minha '+pdIrA(c)+' em casa.',tom:'seco',tag:'irma'}]:[])
  ]},
  {p:'A última. Antes que a máquina de café exploda.',ops:(c,h)=>[
   ...(h[2].tag==='lembra'?[{t:'— Eu também lembro. Do onze. Onze ligações.',tom:'flerte'}]:[]),
   ...(h[2].tag==='quimica'?[{t:'— Era um crème brûlée. A casca é açúcar caramelizado. Eu achei que você ia gostar de saber.',tom:'abre'}]:[]),
   ...(h[2].tag==='riu'?[{t:'— Isso foi uma risada.',tom:'flerte'}]:[]),
   ...(h[2].tag==='irma'?[{t:'— Eu sei. — (Uma pausa.) — O meu irmão também é o meu irmão.',tom:'abre'}]:[]),
   {t:'(Abrir o caderno preto e fingir que lê.)',tom:'seco',acao:true}
  ]}
 ],
 prox:'pd_c1_neblina'});

no('pd_c1_neblina',{cap:1,quem:'ab',tipo:'segue',lugar:'Balsa rápida · Nantucket Sound',trilha:'tensao',hora:'Sábado, 10 de junho · 16h50',
 npcs:['pippa'],
 texto:c=>`A neblina fecha. A balsa reduz para a velocidade de um barco a remo, e uma voz no alto-falante pede desculpas pelo *pequeno atraso devido às condições*.

O celular de ${ehPA(c)?'você':pda(c)} toca. É a Pippa, de novo, com um e-mail novo da Courtney, que lê no viva-voz, porque o sinal está ruim e porque a Pippa não sabe ler e-mail sem dramatizar:

— *P.S.: O bufê também não vai. O Marco vem comigo, obviamente. Os cozinheiros dele estão de férias. A lagosta estava encomendada no nome dele e foi cancelada. A pasta do casamento está com ${pdgA(c,'o padrinho da noiva','a madrinha')} e a pasta do noivo, com a lista de música e os convidados do lado Okoro, está com ${pdgB(c,'o padrinho','a madrinha do noivo')}. Vocês vão se sair maravilhosamente. Beijos, C.*

Silêncio no banco do fundo. A máquina de café dá um último gemido e para de vez.

Dois pares de olhos baixam ao mesmo tempo. Uma pasta de couro de quatro dedos de grossura. Um caderno quadriculado de capa preta, que dentro, no fim, tem uma pasta de plástico com a playlist da festa e cento e doze nomes do lado Okoro.

A balsa apita na neblina. Lá na frente, sem que se veja ainda, Nantucket.`,
 prox:'pd_c1_neblina2'});

no('pd_c1_neblina2',{cap:1,quem:'ab',tipo:'dialogo',lugar:'Balsa para Nantucket',trilha:'abertura',hora:'Sábado, 10 de junho · 16h50',
 texto:c=>`Antes de a balsa encostar, alguém precisa dizer alguma coisa sobre as mães. Duas pastas, uma neblina e nenhuma noiva para perguntar.`,
 comeca:E=>lsSeat(E,PD_A),
 falas:[
  {p:'Você começa.',ops:c=>[
   {t:'— Os noivos estão num retiro de silêncio até quinta. Sem celular. Se a gente contar para as mães agora, a minha liga para o Vaticano.',tom:'seco',tag:'vat'},
   {t:'— Eu não sei se a gente conta. Eu sei que não quero ser quem conta.',tom:'abre',tag:'nao'},
   {t:'(Fechar a pasta de couro, devagar, e pôr a mão em cima dela, como quem segura uma porta.)',tom:'cuida',acao:true,tag:'pasta'}
  ]},
  {p:'Sua resposta.',ops:(c,h)=>[
   ...(h[0].tag==='vat'?[{t:'— A minha liga para o tribunal de Rhode Island. E ganha.',tom:'seco',tag:'trib'}]:[]),
   ...(h[0].tag==='nao'?[{t:'— Então a gente decide em dupla quem não conta. Já é um começo.',tom:'cuida',tag:'dupla'}]:[]),
   ...(h[0].tag==='pasta'?[{t:'— Isso é uma pasta ou um escudo?',tom:'flerte',tag:'escudo'}]:[])
  ]},
  {p:'De volta para você.',ops:(c,h)=>[
   ...(h[1].tag==='trib'?[{t:'— Então ninguém conta nada.',tom:'seco',tag:'ninguem'}]:[]),
   ...(h[1].tag==='dupla'?[{t:'— Em dupla. Eu aceito. Só até a gente chegar lá.',tom:'abre',tag:'aceito'}]:[]),
   ...(h[1].tag==='escudo'?[{t:'— As duas coisas. Tem cento e doze nomes do seu lado aí dentro.',tom:'flerte',tag:'nomes'}]:[])
  ]},
  {p:'Você fecha.',ops:(c,h)=>[
   ...(h[2].tag==='ninguem'?[{t:'— Não foi isso que eu disse.',tom:'seco',tag:'naoefoi'}]:[]),
   ...(h[2].tag==='aceito'?[{t:'— Até a gente chegar lá. Está combinado. Quer dizer, não está.',tom:'seco',tag:'comb'}]:[]),
   ...(h[2].tag==='nomes'?[{t:'— Cento e doze. Eu contei duas vezes. Quer ver?',tom:'flerte',tag:'cento'}]:[])
  ]}
 ],
 prox:'pd_c1_chegada'});

no('pd_c1_chegada',{cap:1,quem:'ab',tipo:'segue',lugar:'Gull House · Easton Street',trilha:'abertura',hora:'Sábado, 10 de junho · 18h40',
 npcs:['barnaby','pippa'],
 texto:c=>`A Gull House é uma pousada de madeira cinza de 1840 a duas quadras do porto, com hortênsias azuis até a altura da janela, uma placa de gaivota descascada e uma bicicleta enferrujada amarrada no poste há tanto tempo que virou decoração.

Na varanda, de avental de lona sujo de terra, com uma tesoura de poda na mão, um homem de barba branca olha vocês subirem a calçada com as malas. Não sorri.

— Castellano e Okoro — diz o Barnaby Cole. — A moça da Vance me ligou de Portugal. Chorando. — Ele corta um galho de hortênsia seco, sem olhar. — Disse que vocês dois iam resolver. Eu disse que eu não acredito em ninguém que chega de balsa com neblina e diz que vai resolver alguma coisa.

Ele abre a porta de tela com o pé.

— Quartos três e quatro. Banheiro no meio, com duas portas. Tranca dos dois lados. — Uma pausa. — A tranca do três está quebrada desde 1997.

Na cozinha, atrás dele, uma moça de vinte e dois anos, de rabo de cavalo, três agendas de papel debaixo do braço e um sorriso do tamanho da ilha, já está acenando com as duas mãos.

— Oi, oi! Eu sou a Pippa! Eu fiz uma tabela! — Ela olha para ${ehPA(c)?'você':pda(c)}, depois para ${ehPB(c)?'você':pdb(c)}, depois de novo para ${ehPA(c)?'você':pda(c)}, e o sorriso fica maior. — Ah. Então ${pdgB(c,'*esse* é o padrinho','*essa* é a madrinha')}.

O Barnaby olha para a Pippa. Olha para os dois. Murmura uma coisa para as hortênsias que soa muito como *ah, pronto*.`,
 prox:'pd_c1_tabela'});

no('pd_c1_noite',{cap:1,quem:'ab',tipo:'dividir',cada:2,lugar:'Gull House e arredores',trilha:'investigacao',hora:'Sábado, 10 de junho · 19h30',
 texto:c=>`Sete e meia. A coluna *QUEM* da tabela continua vazia, e a noite ainda tem umas três horas úteis.

O Barnaby avisa que o jantar sai às nove e que quem não estiver na mesa come frio.`,
 pergunta:'O que você faz hoje à noite? (duas coisas cada um)',
 ops:[
  {t:'Ligar para todos os lagosteiros da ilha, um por um, com a voz mais calma do mundo',se:ehPA,at:'labia',
   ok:{x:c=>`Nove números, da lista amarela que o Barnaby tem pregada atrás da porta desde 1990. Seis não atendem. Dois dizem que junho é temporada e riem. O nono é uma mulher com voz de capitão de barco.

— Barros Lobster, Madaket. Fala.

— Senhora Barros, meu nome é ${pdnA(c)}, da Castellano Eventos, e nós temos um pequeno ajuste...

— Quantas?

— Cento e quarenta.

Um silêncio do outro lado. Depois uma gargalhada.

— Eu nunca fiz casamento na vida. — Outro silêncio. — Vem amanhã às seis da manhã. No cais de Madaket. Se você aguentar puxar armadilha, a gente conversa.`,ef:{flag:'achou_dory',fa:1}},
   falha:{x:c=>`Nove números. Seis não atendem. Dois riem. O nono desliga na sua cara quando você diz *cento e quarenta*.

Você fica olhando o telefone. Do outro lado da cozinha, o Barnaby, cortando cebola, diz sem levantar os olhos:

— A Dory Barros. Madaket. Ela desligou porque você falou como gente de Boston. Liga de novo e fala como gente.

Você liga de novo. Fala como gente. Ela diz: *seis da manhã, cais de Madaket*. E desliga de novo.`,ef:{flag:'achou_dory'}}},
  {t:'Ligar para a sua mãe e dizer que está tudo sob controle',se:ehPA,
   x:c=>`— Filh${c.eu.o}! — A Rosa Castellano atende chorando, porque a Rosa Castellano atende tudo chorando. — A Funmi não respondeu a minha mensagem sobre a mesa sete! Três dias! É uma juíza, ela sabe ler!

— Mãe. Está tudo sob controle.

— A Courtney está aí? Põe a Courtney no telefone.

Você olha para a cozinha. A Pippa com a tabela. O Barnaby com a cebola. ${pdFB(c).ap} na varanda, de costas, com o caderno preto.

— A Courtney está numa reunião — você diz. — Com o bufê.

Não é mentira. É uma reunião com o bufê. Em Portugal.`,ef:{flag:'mentiu_rosa'}},
  {t:'Ler o contrato do clube de vela, linha por linha, do jeito que se lê um rótulo de reagente',se:ehPB,at:'cabeca',
   ok:{x:c=>`Doze páginas. Você lê as doze, com a caneta vermelha. Na página nove, cláusula 14.c, em letra pequena: *O Clube exige que todo serviço de alimentação seja prestado por empresa com licença de bufê no condado de Nantucket. Na ausência de comprovação até 72 horas antes do evento, o Clube fornecerá serviço próprio, a 185 dólares por pessoa.*

Cento e oitenta e cinco vezes cento e quarenta. Você faz a conta de cabeça. Vinte e cinco mil e novecentos dólares.

Você sublinha a cláusula duas vezes. E escreve na margem, com a letra pequena de quem corrige prova: *Prazo: quarta, 17h30.*`,ef:{flag:'clausula_clube',fa:1}},
   falha:{x:c=>`Doze páginas de juridiquês náutico. Na página seis, você começa a ler a mesma frase três vezes. Na página sete, dorme sentad${c.eu.o} na cadeira de vime da varanda, com a caneta na mão e uma mariposa no ombro.`}},
  {t:'Ouvir de novo o recado do Tunde, sozinho, na varanda',se:ehPB,
   x:c=>`Você sai para a varanda. As hortênsias azuis, a neblina na luz do poste, o barulho de um sino de boia lá no porto.

*Eu não sei se eu quero casar.*

Você ouve até o fim. Depois aperta para ouvir de novo, e para no meio, no *papai*.

Atrás de você, a porta de tela range. Você guarda o celular rápido demais, como quem esconde uma prova.

— É o Barnaby — diz o Barnaby. — Não precisa esconder. Eu não ouço nada que não seja planta.`,ef:{flag:'barnaby_viu',abalo:1,motivo:'o papai'}},
  {t:'Ajudar o Barnaby a carregar as hortênsias do caminhão, que ninguém pediu',ambos:true,at:'forca',
   ok:{x:c=>`Vinte e quatro vasos de hortênsia azul, da caçamba de uma caminhonete de 1988 até o fundo do quintal. Pesados. Molhados. Cheios de terra.

${c.Q} carrega doze. O Barnaby carrega doze. Ninguém fala. No fim, o Barnaby tira as luvas de couro e olha para ${c.q} de um jeito diferente.

— Essas são para o clube — ele diz. — Ninguém da Vance perguntou de que cor eram as flores. A Courtney mandou foto de peônia rosa do Pinterest. — Ele bate a terra das luvas. — Peônia rosa em Nantucket em junho. Até a peônia sabe que não.`,ef:{flag:'barnaby_flores',abaloAmbos:-1,motivo:'vinte e quatro hortênsias'}},
   falha:{x:c=>`Você pega o primeiro vaso, ele escorrega, e meio quilo de terra molhada vai parar no seu sapato.

O Barnaby olha. Não ri. Pega o vaso das suas mãos.

— Pela base — ele diz. — Planta é que nem gente. Se você segura pelas folhas, ela solta.`}},
  {t:'Ir até o Brotherhood of Thieves, o bar do fim da rua, e tomar um chowder antes do jantar',ambos:true,
   x:c=>`O Brotherhood of Thieves é um porão de tijolo com velas e mesas de madeira grossa. O chowder de mariscos vem numa caneca. ${c.Q} senta no balcão e come devagar, olhando a parede de garrafas.

${c.f('chowder')?`Duas banquetas para a direita, com outra caneca, está a outra metade da comissão organizadora, que teve a mesma ideia vinte minutos antes. O garçom olha de um para o outro, entende tudo errado e traz uma conta só.

— Separada — ele mesmo avisa, antes que alguém peça. — Já vi essa cara. Eu divido por item.`:`O garçom se chama Wally e trabalha ali desde 1986. Põe um pãozinho a mais no pires sem ninguém pedir.

— Casamento? — ele pergunta. — Dá para ver pela cara. Semana que vem piora.`}`,ef:{flag:'chowder'}}
 ],
 prox:'pd_c1_jantar'});

