/* ================= PADRINHO E MADRINHA · CAPÍTULO 8 · OS NOIVOS CHEGAM ================= */

no('pd_c8_tunde',{cap:8,quem:'ab',tipo:'segue',lugar:'Gull House',trilha:'tensao',hora:'Quinta, 15 de junho · 21h00',
 npcs:['gemma','tunde'],
 texto:c=>`A Gemma abraça todo mundo. A Pippa, que ela nunca viu, o Barnaby, que tenta fugir, a Rosa, que chora, a juíza Funmi, que aceita o abraço sem descruzar os braços, e ${ehPB(c)?'você':pdb(c)}, por último, demorado, com os pés descalços em cima dos seus${ehPB(c)?'':', dos pés de '+pdb(c)}.

— Vocês fizeram tudo — ela diz, olhando a lousa da cozinha, sem ler o placar. — A Pippa me contou na varanda. A Courtney. Portugal. A lagosteira. A tenda. Vocês dois. *Juntos.* — Ela ri alto. — Eu sabia. Eu sabia que vocês iam se odiar de um jeito útil.

Atrás dela, na varanda, o Tunde espera, de capuz, com as mãos no bolso, olhando ${ehPA(c)?'para você':'para '+pda(c)}.

— Eu vou tomar banho — diz a Gemma. — Cinco dias sem chuveiro quente. Ninguém me deixa sair do chuveiro antes de meia-noite.

Ela sobe a escada correndo.

O Tunde entra na cozinha. Passa por ${pdb(c)} com um aperto no ombro, rápido, sem olhar nos olhos.

— ${pdFA(c).ap}. Na varanda. Por favor.

Os dois saem. A porta de tela bate.

E dez minutos depois, de cabelo molhado, de toalha no pescoço, a Gemma desce de novo, mais cedo do que disse, e acha ${ehPB(c)?'você':pdb(c)} sozinh${pdgB(c,'o','a')} no quintal, debaixo da macieira que não dá maçã.`,
 prox:c=>pdPor(c,'pd_c8_a','pd_c8_b')});

no('pd_c8_a',{cap:8,quem:'solo',lugar:'Varanda da Gull House',trilha:'tensao',hora:'Quinta, 15 de junho · 21h10',
 npcs:['tunde'],
 texto:c=>`O Tunde senta no banco de vime das hortênsias. Você senta do lado. Ele demora um tempo comprido para falar. É do jeito dele. Escolhe devagar, porque quer escolher uma vez só.

— Você é a pessoa que resolve as coisas — ele diz, por fim. — A Gemma sempre diz isso. *${c.eu.g==='f'?'Minha irmã':'Meu irmão'} resolve qualquer coisa sem ninguém perceber.*

— Às vezes.

— Eu preciso que você resolva uma coisa sem ninguém perceber. — Ele olha as mãos. — Eu preciso de um pouco mais de tempo. Antes de casar. Não é ela. Eu amo ela. Sou eu. Eu passei cinco dias em silêncio e eu não consegui parar de pensar no meu pai, que casou com a minha mãe sem ter certeza, ou não casou, eu nunca soube direito, e foi embora duas vezes.

Ele respira.

— Você consegue adiar? Sem dizer por quê? Dizer que é a neblina, a balsa, o juiz que não chegou, qualquer coisa. Uma semana. Um mês. Um *pequeno ajuste*. — Ele quase sorri. — Ela me ensinou essa. A Gemma. Ela disse que você diz isso quando é um desastre.`,
 ops:[
  {ir:'pd_c8_neblina',t:'— Consigo. Eu consigo adiar sem ninguém saber o motivo. É o que eu faço.',
   x:c=>`— Consigo — você diz. E é verdade. Você já sabe como. A neblina de amanhã é perfeita. O juiz de paz está em Hyannis. Ninguém precisaria saber de nada.

O Tunde fecha os olhos, aliviado.

— Obrigado.

Você olha para ele, aliviado, e sente uma coisa estranha no estômago, como se tivesse fechado uma porta do lado de dentro.

É o plano D. Item 4. *Não explicar.* Com outra pessoa.`,ef:{flag:'a_esconde',abalo:1,motivo:'o item 4, com outra pessoa'}},
  {ir:'pd_c8_neblina',t:'— Não. Você vai contar para ela. Hoje. Eu fico do seu lado quando você contar.',at:'coragem',
   ok:{x:c=>`O Tunde olha para você como se você tivesse dito uma coisa em outra língua.

— Você não ia... resolver?

— Eu resolvi um casamento assim. O meu. Sem ninguém saber. — Você não acredita que está dizendo isso em voz alta, na varanda, para o noivo da sua irmã. — Fui eu que cancelei. Às quatro da manhã. E deixei todo mundo achar que o Graham foi embora. E eu passei nove meses sendo cuidad${c.eu.o} por uma mentira. Não faz isso com a Gemma. Ela merece saber que você tem medo. Ela vai cuidar do seu medo melhor do que de qualquer mentira.

Silêncio comprido. O sino de boia.

— Você cancelou? — o Tunde diz, baixinho.

— Pequeno ajuste — você diz. E pela primeira vez a expressão sai sem sorriso nenhum.`,ef:{flag:'a_verdade',vinc:1,motivoV:'a verdade, dita em voz alta'}},
   falha:{x:c=>`Você abre a boca para dizer *não*. Para dizer que ele vai contar para ela, hoje, que você vai estar do lado.

Sai outra coisa.

— Vou ver o que dá para fazer.

O Tunde agradece. Você não sabe o que acabou de prometer. Você sabe exatamente o que acabou de prometer.`,ef:{flag:'a_esconde'}}},
  {ir:'pd_c8_neblina',t:'— Por que você veio falar comigo, e não com o seu irmão?',
   x:c=>`O Tunde dá uma risada curta, sem graça.

— Porque o meu irmão não sabe mentir. Se eu pedisse para ele adiar sem dizer por quê, ele ia subir na mesa do jantar de ensaio e anunciar que eu estou com dúvida, com a tabela periódica na mão. — Ele olha a cozinha, pela janela. — E porque ele já sabe. Eu liguei para ele antes do retiro. Ele guardou. Treze dias. — Ele balança a cabeça. — Ele nunca guardou nada na vida. Ele guardou isso por mim.

Você não diz que já sabe disso. Que é por isso que vocês brigaram de manhã. Você não diz nada.`,ef:{flag:'a_ouviu_tunde'}}
 ],
 prox:'pd_c8_neblina'});

no('pd_c8_b',{cap:8,quem:'solo',lugar:'Quintal da Gull House',trilha:'tensao',hora:'Quinta, 15 de junho · 21h15',
 npcs:['gemma'],
 texto:c=>`A Gemma senta do seu lado no banco debaixo da macieira, de toalha no pescoço, com o cabelo pingando no seu ombro.

— Ele foi falar com a minha ${pdIrA(c)} — ela diz. — Não comigo. Não com você. Com ${pdgA(c,'o','a')} ${pdFA(c).ap}. — Ela sorri, mas é um sorriso que não chega aos olhos. — Ele ficou estranho no retiro. Ele chorava meditando. Eu achei que era o lugar. Todo mundo chora lá. — Ela vira para você. — Você sabe de alguma coisa. Você está com aquela cara. A de quando você sabe a resposta e o aluno não.

Você não sabe mentir. Você nunca soube. A Gemma sabe disso. Foi por isso que ela veio até o fundo do quintal.`,
 ops:[
  {ir:'pd_c8_neblina',t:'Contar. O recado, o pai, os treze dias. Ela tem o direito de saber antes de entrar na igreja.',
   x:c=>`Você conta. Não toca o recado. Diz com as suas palavras, devagar, como quem explica uma reação perigosa a um aluno de quem gosta.

A Gemma escuta tudo. Não chora. Isso é o pior.

— Treze dias — ela diz.

— Ele me pediu.

— E agora você me contou. — Ela levanta. Enxuga o cabelo com a toalha, devagar, sem necessidade. — Obrigada. Eu acho. Eu não sei. — Ela olha a varanda, onde o Tunde está sentado com ${oA(c)} ${pdIrA(c)} dela. — Eu vou dormir. Eu não vou falar com ele hoje. Se eu falar hoje, eu falo coisa que não volta.

Ela entra. Você fica debaixo da macieira. Disse a verdade. Não se sente nem um pouco melhor.`,ef:{flag:'b_contou_gemma',abalo:2,motivo:'a verdade que não ajudou'}},
  {ir:'pd_c8_neblina',t:'— Pergunta para ele, Gem. Não para mim. Eu confio que ele vai te responder.',at:'coragem',
   ok:{x:c=>`A Gemma olha para você um tempo comprido.

— Então tem alguma coisa.

— Tem uma coisa que é dele. Não minha. — Você segura a mão dela. — Eu passei trinta anos achando que proteger alguém é contar a verdade antes que ela machuque. Essa semana alguém me ensinou que às vezes proteger é deixar a pessoa escolher a hora. — Uma pausa. — Pergunta para ele. Amanhã. Ele vai te responder. Ele escolhe devagar, mas ele escolhe.

A Gemma aperta a sua mão. Fica um tempo. Depois levanta.

— Você mudou — ela diz. — Você nunca deixou ninguém escolher nada na vida. Nem o sabor do sorvete.`,ef:{flag:'b_devolveu',vinc:1,motivoV:'confiar na escolha de outra pessoa'}},
   falha:{x:c=>`Você tenta dizer *pergunta para ele*. Sai torto, tarde, depois de um silêncio que já respondeu tudo.

A Gemma faz que sim, devagar.

— Tá. Eu pergunto. — Ela levanta. — Você nunca soube disfarçar, sabia? Nem quando a gente era criança e você me escondia os presentes de Natal. — Ela entra.

Ela sabe que tem alguma coisa. Não sabe o quê. E agora vai passar a noite imaginando.`,ef:{flag:'b_devolveu'}}},
  {ir:'pd_c8_neblina',t:'— Ele está cansado. Cinco dias de silêncio. É só isso.',at:'labia',dif:1,
   ok:{x:c=>`Sai quase convincente. Pela primeira vez na vida, uma mentira sai inteira, sem tremer.

A Gemma sorri, aliviada, encosta a cabeça no seu ombro.

— Eu sabia que era isso. — Ela levanta. — Boa noite, cunhad${c.eu.o}.

Você fica no banco. A mentira inteira no seu peito, pesada como chumbo. Você aprendeu a mentir. Com a melhor professora. E não gostou.`,ef:{flag:'b_mentiu_gemma',abalo:2,motivo:'a primeira mentira inteira'}},
   falha:{x:c=>`— Ele está cansado — você diz. — Cinco dias de...

A Gemma ri. Não de alegria.

— Você está mentindo. Você pisca três vezes quando mente. Desde os oito anos. — Ela levanta. — Tudo bem. Eu pergunto para ele.

Ela entra. Agora ela sabe que tem alguma coisa, e sabe que você mentiu sobre ela.`,ef:{flag:'b_mentiu_gemma'}}}
 ],
 prox:'pd_c8_neblina'});

no('pd_c8_neblina',{cap:8,quem:'ab',tipo:'segue',lugar:'Nantucket',trilha:'tensao',hora:'Sexta, 16 de junho · 7h00',
 npcs:['barnaby','pippa','rosa'],
 texto:c=>`Sexta-feira. Neblina.

Não a neblina da balsa de sábado. Outra coisa. Uma neblina que não se vê através, que apaga o porto, o farol de Brant Point, a casa da frente. A Steamship Authority cancela todas as balsas da manhã. Os voos da Cape Air, também. Nantucket, às sete da manhã de sexta, é uma ilha de verdade.

Na lousa da cozinha, a Pippa escreve, em vermelho, com a mão tremendo:

*PRESOS NO CONTINENTE:*
*1. O juiz de paz (Judge Harlan Pike, Hyannis). Sem ele, não tem casamento.*
*2. Quarenta peônias rosa que a Rosa encomendou escondida de Boston.*
*3. Doze convidados, incluindo a tia Bisi.*

A Rosa, de robe, lê o item 2 e finge que não é com ela.

Na mesa do café, o Tunde e a Gemma sentados lado a lado, ${c.f('b_contou_gemma')?'sem se tocar, sem se olhar, comendo ovo em silêncio. A Gemma não dormiu. Dá para ver.':c.f('b_mentiu_gemma')||c.f('b_devolveu')?'de mãos dadas, mas a Gemma olha para o Tunde de lado, de vez em quando, como quem procura alguma coisa num rosto conhecido.':'de mãos dadas, ela rindo alto demais de uma piada que ninguém fez.'}

Nas duas pontas da mesa comprida, uma pasta de couro e um caderno preto, cada um com a sua xícara. Desde ontem de manhã, o que um tem para dizer ao outro passa pela Pippa, por escrito.

Faltam trinta e quatro horas.`,
 prox:'pd_c8_tarefas'});

no('pd_c8_tarefas',{cap:8,quem:'ab',tipo:'dividir',cada:2,lugar:'Nantucket',trilha:'investigacao',hora:'Sexta, 16 de junho · 8h00',
 npcs:['barnaby','funmi'],
 texto:c=>`O dia se divide, e desta vez ninguém divide em voz alta. Cada um pega a sua parte da pasta e vai, sem consultar o outro.`,
 pergunta:'O que você resolve hoje? (duas coisas cada um)',
 ops:[
  {t:'Ligar para o Judge Pike em Hyannis e tentar uma solução: barco particular, avião, qualquer coisa',se:ehPA,at:'labia',
   ok:{x:c=>`O Judge Harlan Pike tem setenta e quatro anos, um barco a vela e nenhuma intenção de atravessar o Nantucket Sound na neblina.

— ${c.eu.g==='m'?'Meu jovem':'Minha jovem'}, eu celebro casamento há quarenta anos. Eu não celebro o meu próprio funeral. — Uma pausa. — Mas eu posso te dizer uma coisa que a sra. Vance devia ter te dito. Em Massachusetts, qualquer juiz de paz do estado pode celebrar. Tem dois na ilha. Um é a dona da loja de queijo, que está em Lisboa. O outro... — Ele ri. — Pergunta para o seu florista.`,ef:{flag:'dica_pike',fa:1}},
   falha:{x:c=>`O Judge Pike não atende. Caixa postal três vezes. Na quarta, a mulher dele atende e diz que ele está no barco. Na marina. Não navegando. Só sentado no barco, olhando a neblina, que é o que ele faz quando a neblina vem.`,ef:{abalo:1,motivo:'o juiz no barco'}}},
  {t:'Convencer a Rosa a desistir das peônias. Em voz alta. Na frente da cozinha inteira.',se:ehPA,
   x:c=>`— Mãe. As peônias não vêm. E se viessem, não iam combinar com as hortênsias do Barnaby, que estão prontas, e são azuis, e são daqui.

— A Gemma gosta de peônia!

— A Gemma gosta de você, mãe. E de hortênsia. Ela me disse ontem, na escada.

A Rosa olha para você, de robe, com a xícara na mão, e uma coisa muda na cara dela.

— Você nunca me corrigiu — ela diz. — Em trinta anos. Você sempre deu um jeito de eu achar que a ideia era minha. — Ela põe a xícara na mesa. — Hortênsia. Tá. Azul.`,ef:{flag:'rosa_hortensia'}},
  {t:'Montar o sistema de som da tenda com o Tunde, que é engenheiro de som e precisa de alguma coisa para fazer com as mãos',se:ehPB,at:'cabeca',
   ok:{x:c=>`Duas horas na tenda, de joelhos, com cabo, mesa de som emprestada do clube e duas caixas que o Barnaby tinha no porão desde o casamento da filha dele, em 1999. O Tunde testa, liga, desliga, e não fala. Você passa os cabos. Também não fala.

Na terceira hora, o Tunde para, com um cabo na mão.

— Ela te perguntou ontem, né? — ele diz. — A Gemma. No quintal.

— Perguntou.

— E o que você disse?

${c.f('b_contou_gemma')?'— A verdade.':c.f('b_devolveu')?'— Que perguntasse para você.':'— Que você estava cansado.'}

O Tunde fica olhando o cabo. ${c.f('b_contou_gemma')?'— Eu sei. Ela não falou comigo a noite inteira. — Ele encaixa o cabo. — Talvez fosse melhor assim. Eu não sei.':c.f('b_devolveu')?'— Obrigado — ele diz. — Ela perguntou. Hoje cedo. Eu ainda não respondi. Mas ela perguntou para mim. — Ele encaixa o cabo.':'— Você mentiu por mim? — Ele olha para você. — Você? — Ele balança a cabeça. — Desculpa. Eu não devia ter te pedido isso.'}`,ef:{flag:'som_tunde',abaloAmbos:-1,motivo:'dois irmãos e um cabo'}},
   falha:{x:c=>`Duas horas na tenda com cabo e caixa de som. Você liga a mesa ao contrário, e a caixa dá um estouro que espanta todas as gaivotas do porto. O Tunde ri, pela primeira vez desde que desceu da balsa.

— Química é uma coisa — ele diz. — Som é outra.`,ef:{flag:'som_tunde'}}},
  {t:'Perguntar à sua mãe, uma juíza aposentada, se ela poderia celebrar o casamento',se:ehPB,
   x:c=>`— Eu fui juíza em Rhode Island — sua mãe diz, sem levantar os olhos do jornal. — Isto é Massachusetts. Eu não posso celebrar nada aqui. — Ela vira a página. — E mesmo que pudesse, eu não ia.

— Por quê?

Ela fecha o jornal.

— Porque eu não confio em casamento, ${pdFB(c).ap}. E quem celebra tem que confiar. — Ela levanta. — Amanhã, depois do casamento, se tiver casamento, eu te conto por quê. Eu prometo.`,ef:{flag:'funmi_promete'}},
  {t:'Perguntar ao Barnaby se ele conhece alguém na ilha que possa celebrar um casamento',ambos:true,
   x:c=>`O Barnaby está na estufa, cortando hortênsia. Não vira.

— Conheço.

— Quem?

Ele corta mais uma hortênsia. Põe no balde. Tira as luvas de couro.

— Eu. Juiz de paz do estado de Massachusetts desde 1991. A Ruth me fez tirar a licença, porque ela queria que alguém casasse a gente de novo, na praia, no aniversário de vinte anos. — Ele põe as luvas no bolso do avental. — Eu casei a gente. E depois casei mais umas trezentas pessoas nessa ilha. De graça. Na praia. Às vezes de bota.

${c.Q} fica olhando para ele.

— Por que você não disse antes?

— Ninguém perguntou. — O Barnaby volta para as hortênsias. — E porque o juiz é a última coisa que cai. Eu estava esperando para ver se vocês iam aguentar até ela cair.`,ef:{flag:'barnaby_celebra'}},
  {t:'Andar até Brant Point, na neblina, e ficar olhando o farol que não se vê',ambos:true,
   x:c=>`Brant Point, o farol pequeno na ponta da ilha, sumiu na neblina. Sobrou a buzina de nevoeiro, de trinta em trinta segundos.

${c.Q} anda até o fim da areia e fica olhando para o lugar onde o farol deveria estar.${c.f('brant_point')?`

A vinte metros, parad${c.outroAtor.o} na areia, olhando para o mesmo nada, está ${c.oq}. Vinte metros de neblina é muita coisa. A buzina toca.`:`

A buzina toca. Trinta segundos. Toca de novo. No meio da neblina, parece alguém chamando sem saber o nome de quem chama.`}`,ef:{flag:'brant_point',abalo:1,motivo:'a buzina de nevoeiro'}}
 ],
 prox:'pd_c8_ensaio'});

no('pd_c8_jantar',{cap:8,quem:'ab',tipo:'segue',lugar:'Quintal da Gull House',trilha:'tensao',hora:'Sexta, 16 de junho · 20h00',
 npcs:['gemma','tunde','rosa','funmi','barnaby','dory'],
 texto:c=>{ const L=[];
  L.push(`O jantar de ensaio é no quintal da Gull House, debaixo da macieira que não dá maçã, numa mesa comprida de cavaletes com as toalhas de linho da Ruth, que o Barnaby tirou de um baú de cedro e não deixou ninguém lavar. A Dory faz chowder e pão de milho. Os primos dela, os Barros, tocam morna baixinho num canto, com o tio Armando no acordeão.

Vinte e oito pessoas. Os doze presos no continente, não. A neblina ainda não levantou.`);
  if(c.f('barnaby_celebra')) L.push(`Na hora do brinde, o Barnaby levanta. Ninguém esperava. Ele bate o garfo no copo.

— Amanhã eu caso vocês — ele diz para a Gemma e o Tunde. — Eu sou juiz de paz desde 1991. Eu já casei trezentas pessoas. Eu tenho uma regra só. — Ele olha para o Tunde. — Se no meio da cerimônia alguém quiser parar, para. Sem vergonha. Eu já parei quatro. Os quatro casaram depois. Melhor. — Ele senta.

O Tunde olha para o copo. A Gemma olha para o Tunde.`);
  else L.push(`Na hora do brinde, a Pippa anuncia, com a voz tremendo, que o Judge Pike continua em Hyannis e que *ainda não temos celebrante*. A Rosa chora. A juíza Funmi não pisca.

E o Barnaby, da ponta da mesa, de avental, diz, sem levantar:

— Eu caso eles. Juiz de paz desde 1991. Ninguém perguntou.

A mesa inteira vira para ele. Ele mastiga o pão de milho.`);
  if(c.f('b_contou_gemma')) L.push(`No meio do jantar, a Gemma levanta da mesa sem dizer nada e vai para a estufa. O Tunde vai atrás. Durante quarenta minutos, vinte e oito pessoas fingem não ver, pelo vidro embaçado da estufa, duas silhuetas conversando, uma chorando, a outra com as mãos no rosto.

Quando os dois voltam para a mesa, sentam lado a lado. Não de mãos dadas. Mas lado a lado.`);
  else if(c.f('a_verdade')) L.push(`No meio do jantar, o Tunde levanta e pede para a Gemma ir com ele até a estufa. Ela vai. Durante quarenta minutos, vinte e oito pessoas fingem não ver, pelo vidro embaçado da estufa, duas silhuetas conversando, uma com as mãos no rosto, a outra segurando essas mãos.

Quando os dois voltam, de mãos dadas, a Gemma está com os olhos vermelhos e um sorriso que não é o sorriso alto de sempre. É outro. Menor e mais firme.

O Tunde, ao passar pela cadeira de ${ehPA(c)?'você':pda(c)}, põe a mão no ombro, um segundo.`);
  else L.push(`O jantar inteiro, o Tunde não solta a mão da Gemma. A Gemma ri alto. Ninguém mais ri. ${c.f('a_esconde')?'De vez em quando o Tunde olha para '+(ehPA(c)?'você':pda(c))+', na outra ponta da mesa, como quem confere se o plano está de pé. O plano de adiar sem explicar. Que só '+(ehPA(c)?'você':pda(c))+' sabe que existe.':''}`);
  L.push(`A Pippa bate a faca no copo. Pela pasta, aba azul, item nove, agora vêm os brindes dos padrinhos. Um de cada ponta da mesa.`);
  return L.join('\n\n') },
 prox:'pd_c8_brindes'});

no('pd_c8_varanda',{cap:8,quem:'ab',tipo:'dialogo',lugar:'Varanda da Gull House',trilha:'noite',hora:'Sexta, 16 de junho · 23h50',
 texto:c=>`Meia-noite menos dez. O jantar acabou. Os primos da Dory guardaram o acordeão. A neblina, finalmente, começa a levantar, devagar, e o farol de Brant Point aparece, longe, piscando verde.

A varanda das hortênsias tem duas portas. Desde ontem de manhã, tudo o que foi dito entre os dois coube num papel da Pippa e numa frase ensaiada na tenda.`,
 comeca:E=>lsSeat(E,PD_B),
 falas:[
  {p:'Você fala primeiro. Sem caderno.',ops:c=>[
   {t:'— Eu estava errad'+'o. Sobre a verdade não esperar. Às vezes ela espera a pessoa certa contar.',tom:'abre',tag:'errado'},
   {t:'— A gente devia estar do mesmo lado amanhã. Sejam quais forem os lados.',tom:'abre',tag:'lado'},
   {t:'— O seu chowder estava frio. Quer dizer, o da Dory.',tom:'flerte',tag:'chowder'}
  ]},
  {p:'Sua vez. O farol piscando.',ops:(c,h)=>[
   ...(h[0].tag==='errado'?[{t:'— Eu também estava. Ela não pode esperar para sempre. Eu esperei nove meses e virei uma pessoa que todo mundo tem pena.',tom:'abre',tag:'pena'}]:[]),
   ...(h[0].tag==='lado'?[{t:'— Do lado de quem? Do seu irmão ou da minha '+pdIrA(c)+'?',tom:'seco',tag:'quem'}]:[]),
   ...(h[0].tag==='chowder'?[{t:'— Você está tentando fazer piada. Você não sabe fazer piada.',tom:'flerte',tag:'piada'}]:[]),
   {t:'— Agora não. Amanhã tem um casamento.',tom:'seco',tag:'agora'}
  ]},
  {p:'De volta para você.',ops:(c,h)=>[
   ...(h[1].tag==='pena'?[{t:'— Eu não tenho pena de você. Eu nunca tive. Eu tenho outra coisa.',tom:'abre'}]:[]),
   ...(h[1].tag==='quem'?[{t:'— Do lado deles dois. Juntos ou não. E do seu.',tom:'abre'}]:[]),
   ...(h[1].tag==='piada'?[{t:'— Eu sei. Eu ensaiei. Versão quatro.',tom:'flerte'}]:[]),
   ...(h[1].tag==='agora'?[{t:'— Tá. Amanhã. — (Uma pausa.) — Boa noite.',tom:'seco'},{t:'(Ficar na varanda, do lado, sem dizer nada, até o farol piscar dez vezes.)',tom:'cuida',acao:true}]:[])
  ]}
 ],
 prox:'pd_c8_fim'});
NOS.pd_c8_varanda.falas[0].ops=(f=>c=>f(c).map(o=>o.tag==='errado'?Object.assign({},o,{t:'— Eu estava errad'+c.eu.o+'. Sobre a verdade não esperar. Às vezes ela espera a pessoa certa contar.'}):o))(NOS.pd_c8_varanda.falas[0].ops);

