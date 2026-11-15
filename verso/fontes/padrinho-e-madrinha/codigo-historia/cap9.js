/* ================= PADRINHO E MADRINHA · CAPÍTULO 9 · O DIA ================= */

const pdGemmaSabe=c=>c.f('b_contou_gemma')||c.f('a_verdade')||c.f('b_devolveu');

no('pd_c9_manha',{cap:9,quem:'ab',tipo:'segue',lugar:'Nantucket Yacht Club',trilha:'abertura',hora:'Sábado, 17 de junho · 9h00',
 npcs:['pippa','dory','barnaby','rosa'],
 texto:c=>`Sábado, dezessete de junho. Céu limpo, azul de cartão-postal, vento leve de sudoeste. A neblina de ontem parece uma coisa que alguém inventou.

A primeira balsa traz a tia Bisi, de turbante amarelo e vestido de renda, que desce a prancha como uma rainha e pergunta, antes de bom dia, onde fica a mesa da frente. A tia Concetta, já sentada lá desde as oito, *para garantir o lugar*, olha para a tia Bisi. A tia Bisi olha para a tia Concetta. Nenhuma das duas diz nada. As duas acenam com a cabeça, uma vez, como duas generais de exércitos aliados.

No gramado ${c.f('tenda_agua')?'de baixo, perto da água':'de cima'}, a tenda branca, as cento e quarenta cadeiras, as hortênsias azuis do Barnaby em vasos de barro. ${c.f('altar_girado')?'O altar, girado trinta e oito graus, de costas para o sol que ainda nem está no lugar.':'O altar, no lugar onde a Courtney desenhou.'} Na cozinha do clube, a Dory e os cinco primos Barros, de avental, com doze panelas de cinquenta litros e cento e cinquenta e quatro lagostas vivas em caixas de isopor com alga.

A Pippa corre de um lado para o outro com as três agendas e um fone de ouvido, falando sozinha. A Rosa chora na prova do vestido da Gemma. A Gemma ri de chinelo.

Falta montar duas pessoas: a noiva, num quarto do segundo andar, e o noivo, no vestiário do térreo. Cada uma pediu um padrinho.`,
 prox:c=>pdPor(c,'pd_c9_a','pd_c9_b')});

no('pd_c9_funmi',{cap:9,quem:'ab',tipo:'segue',lugar:'Sala de troféus do Yacht Club',trilha:'romance',hora:'Sábado, 17 de junho · 11h00',
 npcs:['funmi'],
 ef:{pista:'pd_funmi'},
 texto:c=>`Às onze, a Pippa tranca os dois padrinhos na sala de troféus do clube, com a lista de convidados, *porque a pasta manda conferir e eu não aguento mais levar recado*. A sala tem taças de prata de regata de 1910, um retrato a óleo de um comodoro de bigode e uma janela para o porto.

A lista não chega a ser aberta. Alguém bate na porta.

É a juíza Funmi Okoro. De vestido de seda verde-escuro, chapéu, e sem os óculos de leitura.

— Eu prometi contar depois — ela diz. — Mudei de ideia. Depois não espera. Sentem.

Ela escolhe a poltrona de couro verde, de costas para a janela, como se estivesse no tribunal.

— Junho de 1989 — ela diz. — Providence. A igreja de St. Martin. Eu tinha trinta anos e um filho de um ano no colo da minha irmã Bisi, na primeira fila. Duzentos convidados. O vestido era da minha mãe.

Ela olha para ${ehPB(c)?'você':pdb(c)}.

— Na manhã do casamento, às sete, o seu pai bateu na porta da casa da minha mãe, onde eu estava me vestindo. Ele não podia me ver de vestido, dá azar. Então falou do outro lado da porta. Ele disse que tinha dúvidas. Que ele me amava, e amava você, mas que tinha medo. Que o pai dele tinha ido embora, e ele tinha medo de ser igual. — Ela para. — Ele queria conversar. Eu não deixei. Eu disse, do outro lado da porta, com o vestido da minha mãe: *então vai*.

Silêncio. O retrato do comodoro. O porto.

— E ele foi. Eu fui até a igreja, sozinha, e disse para duzentas pessoas que ele não tinha aparecido. Deixei todo mundo achar que eu tinha sido abandonada no altar. Era mais fácil. As pessoas cuidam de quem é abandonada. Ninguém cuida de quem diz *então vai*.

— Ele voltou dois anos depois. Eu aceitei, sem casar. O Tunde nasceu. E em 1996, numa terça, ele foi embora de novo, com a mesa do café posta. — Ela olha para ${ehPB(c)?'você':pdb(c)}. — Você passou trinta anos achando que ele foi embora porque não sabia ficar. Ele foi embora porque eu nunca deixei ele dizer de que tinha medo. Na primeira vez, eu mandei. Na segunda, eu não perguntei. — Ela levanta. — Eu não confio em casamento. Mas eu confio menos ainda em quem não deixa o outro falar.

Ela ajeita o chapéu. Na porta, para.

— O seu irmão vai ter medo hoje. Deixem ele dizer. Os dois. — E sai.`,
 prox:'pd_c9_ajuste'});

no('pd_c9_ajuste',{cap:9,quem:'ab',tipo:'dialogo',lugar:'Sala de troféus do Yacht Club',trilha:'romance',hora:'Sábado, 17 de junho · 11h20',
 texto:c=>`A porta fecha. Os dois ficam na sala de troféus, com as taças de regata de 1910 e o comodoro de bigode, e uma frase no ar: *as pessoas cuidam de quem é abandonada. Ninguém cuida de quem diz então vai.*

É a mesma frase. Duas pessoas, com trinta e três anos de diferença, disseram a mesma frase para justificar a mesma mentira.`,
 comeca:E=>lsSeat(E,PD_A),
 falas:[
  {p:'Você fala. Desta vez sem pasta e sem eufemismo.',ops:c=>[
   {t:'— Temos um pequeno ajuste. — (Uma pausa.) — Eu. Eu sou o pequeno ajuste. Eu cancelei o meu casamento e deixei todo mundo achar que fui largad'+c.eu.o+'. Igual a ela.',tom:'abre',tag:'ajuste'},
   {t:'— O plano D. Você queria saber o que era. Era o meu casamento. Era o plano para quando eu não quisesse mais.',tom:'abre',tag:'planod'}
  ]},
  {p:'Sua vez. O comodoro olhando.',ops:(c,h)=>[
   {t:'— Eu sei. O Graham me contou. Eu fiquei com raiva de você ter mentido. Eu nunca fiquei com raiva do motivo.',tom:'abre',tag:'motivo'},
   {t:'— Por que você não quis?',tom:'abre',tag:'porque'}
  ]},
  {p:'De volta para você.',ops:(c,h)=>[
   ...(h[1].tag==='porque'?[{t:'— Porque com ele eu nunca precisava de nada. Ele cuidava, eu deixava ele achar que cuidava, e eu organizava o resto. Ia ser um casamento perfeito. Eu não queria um casamento perfeito.',tom:'abre'}]:[]),
   ...(h[1].tag==='motivo'?[{t:'— Qual era o motivo, na sua opinião?',tom:'flerte',tag:'qual'}]:[])
  ]},
  {p:'Sua resposta.',ops:(c,h)=>[
   ...(h[2].tag==='qual'?[{t:'— Que você não sabe ser cuidad'+pdgA(c,'o','a')+'. Só sabe cuidar. — (Uma pausa.) — Eu sou igual. Eu cuido da minha mãe há trinta anos. Ninguém nunca me cuidou de volta.',tom:'abre'}]:[]),
   {t:'— Então hoje a gente não deixa o Tunde fazer o que ela fez. Nem o que você fez. Nem o que eu ia fazer.',tom:'abre'},
   {t:'(Atravessar a sala de troféus. Pegar a mão. A que tem a almofadinha de alfinetes no pulso.)',tom:'cuida',acao:true}
  ]}
 ],
 prox:'pd_c9_vento'});

no('pd_c9_panico',{cap:9,quem:'ab',tipo:'segue',lugar:'Vestiário do Yacht Club',trilha:'tensao',hora:'Sábado, 17 de junho · 17h05',
 npcs:['tunde'],
 texto:c=>`Cinco e cinco da tarde. Faltam vinte e cinco minutos.

Cento e trinta e oito convidados sentados nas cadeiras dobráveis. Os Barros ${c.f('banda_primos')?'afinando o violão e o acordeão':'ao lado da mesa de som, com o celular da Pippa conectado, e o acordeão do tio Armando no chão, por precaução'}. O Barnaby de terno de linho, pela primeira vez em vinte anos, com uma hortênsia azul na lapela e uma pasta de couro fina na mão, de juiz de paz. A Gemma num quarto do segundo andar, de vestido, descalça, com a Rosa chorando e a tia Concetta segurando o véu.

E no vestiário masculino do clube, sentado num banco de madeira entre dois armários de metal, de terno azul, com a gravata desfeita na mão, o Tunde.

Ele não está chorando. Está muito quieto. Os dois padrinhos na porta.

— Eu não consigo respirar — ele diz. — Eu estou pensando nele. No papai. ${c.f('a_esconde')?'— Ele olha para '+(ehPA(c)?'você':pda(c))+'. — Você disse que conseguia adiar. Adia. Por favor. Agora. Sem explicar.':'— Ele olha para os dois. — O que eu faço?'}

Do outro lado da janela, no gramado, a Pippa faz um sinal de *cinco minutos* com a mão aberta, sorrindo, sem saber de nada.`,
 prox:'pd_c9_escolha'});

no('pd_c9_escolha',{cap:9,quem:'ab',tipo:'decisao',lugar:'Vestiário do Yacht Club',trilha:'tensao',hora:'Sábado, 17 de junho · 17h08',
 npcs:['tunde'],
 texto:c=>`*O seu irmão vai ter medo hoje. Deixem ele dizer.*

Vinte e dois minutos. Uma pessoa sentada num banco de vestiário. Duas na porta, que passaram a semana inteira em lados diferentes de uma mesma pergunta: se a verdade espera ou não.

${pdGemmaSabe(c)?'A Gemma sabe que ele tem medo. Ela sabe desde ontem.':'A Gemma não sabe de nada. Ela está lá em cima, descalça, rindo.'}`,
 pergunta:'O que vocês dizem ao Tunde?',
 ops:[
  {t:'— Vai lá em cima. Agora. Fala com ela antes do altar. A gente segura a festa o tempo que precisar.',ef:{flag:'verdade_antes'},
   x:c=>`— Agora? — O Tunde olha de um para o outro. — De terno? Ela vai me ver antes da hora. Dá azar.

Ele mesmo pensa na resposta. A mãe dele não viu o noivo antes da hora, em 1989, e ele sabe quanta sorte isso deu.

O Tunde levanta. Ajeita a gravata, mal. Sobe a escada do clube de dois em dois degraus.

Lá fora, a Pippa vê a janela do vestiário vazia, e o sorriso dela congela. Alguém vai ter que explicar a ela, sem eufemismo, qual é o ajuste desta vez.`},
  {t:'— Respira. Todo mundo tem medo. O medo não é um motivo. Entra.',ef:{flag:'empurrou'},
   x:c=>`O Tunde respira. Uma vez. Duas. Recita, baixinho, sem saber de onde, os gases nobres em ordem: hélio, neônio, argônio. O irmão ensinou isso a ele quando ele tinha seis anos e tinha medo do escuro.

Ele levanta. Amarra a gravata. Mal.

— Tá — ele diz. — Tá.

E sai pela porta do vestiário em direção ao gramado, com o medo inteiro ainda no peito, sem ter dito para a pessoa que precisava ouvir.`},
  {t:'— Se você não está pronto, a gente para. Os dois juntos, na frente de todo mundo. Ninguém vai mentir sobre o motivo.',ef:{flag:'adiar_juntos'},
   x:c=>`O Tunde olha para os dois um tempo comprido.

— Na frente de todo mundo? Sem neblina, sem juiz que não chegou, sem *pequeno ajuste*?

Ninguém desmente. Ele ri. Um riso de choro.

— Tem cento e cinquenta e quatro lagostas lá dentro — ele diz. — A festa não pode parar por minha causa. — Ele levanta. — Mas primeiro ela. Eu falo com ela primeiro. Eu.

Ele sobe a escada.`}
 ],
 prox:'pd_c9_cerimonia'});

no('pd_c9_fim',{cap:9,quem:'ab',tipo:'fim',lugar:'Nantucket Yacht Club',trilha:'noite',hora:'Sábado, 17 de junho · meia-noite',
 texto:c=>`Meia-noite. A festa ainda não acabou. ${c.f('banda_primos')?'Os Barros estão no terceiro bis de Earth, Wind & Fire, pago em cerveja.':'O tio Armando tirou o acordeão do chão às onze e não largou mais.'} A Dory serve a última lagosta. A tia Concetta dança funaná.

Amanhã, domingo, a primeira balsa sai às seis e meia. A segunda às nove. Cada um tem uma passagem de volta. Para Boston. Para Providence. Na pasta, aba azul, item último: *Domingo, 18: desmontagem. Balsa das 9h.*

Para depois disso, a pasta não tem aba.`,
 prox:'pd_c10_manha'});
