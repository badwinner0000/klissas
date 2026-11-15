/* ================= PADRINHO E MADRINHA · CAPÍTULO 10 · DEPOIS DA FESTA ================= */

no('pd_c10_manha',{cap:10,quem:'ab',tipo:'segue',lugar:'Tenda do Yacht Club',trilha:'noite',hora:'Domingo, 18 de junho · 1h30',
 npcs:['pippa','barnaby','dory'],
 texto:c=>`Uma e meia da manhã. A festa acaba do jeito que as festas boas acabam: devagar, por desistência, com gente dormindo nas cadeiras.

A tia Concetta e a tia Bisi foram embora juntas, de braço dado, para a pousada, discutindo em duas línguas que nenhuma das duas entende. A Rosa dormiu numa cadeira dobrável com os sapatos no colo. A juíza Funmi levou a Rosa para o hotel, de braço, como quem leva uma testemunha. ${c.f('casou')?'Os noivos saíram às meia-noite e quarenta, debaixo de uma chuva de pétalas de hortênsia azul, numa caminhonete de 1988 enfeitada com latas, que o Barnaby emprestou e que pegou de primeira.':'A Gemma e o Tunde saíram à meia-noite e quarenta, de mãos dadas, a pé, pela Easton Street, descalços os dois, sem casar e sem ninguém ir embora.'}

Sobrou a tenda. As luzinhas acesas. Cento e quarenta cadeiras desarrumadas. Copos. Uma hortênsia caída na pista. A Dory e os primos lavando as doze panelas na cozinha, cantando morna. O Barnaby recolhendo vaso por vaso, sem pressa. A Pippa, sentada no chão da pista, de vestido e tênis, comendo o último pedaço do bolo de limão com uma camada de coco embaixo, direto da bandeja.

E vocês dois. No meio da tenda vazia. Com duas passagens para a balsa das nove.`,
 prox:'pd_c10_gestos'});

no('pd_c10_gestos',{cap:10,quem:'ab',tipo:'dividir',cada:1,lugar:'Tenda do Yacht Club',trilha:'romance',hora:'Domingo, 18 de junho · 1h40',
 npcs:['pippa','barnaby','dory'],
 texto:c=>`Na tenda vazia, ainda tem gente: a Pippa no chão com o bolo, o Barnaby com os vasos, a Dory e cinco primos na porta da cozinha, de avental molhado. Ninguém está olhando. Todo mundo está olhando.`,
 pergunta:'Qual é o seu gesto?',
 ops:[
  {t:'Pedir ajuda. Em voz alta. Na frente de todo mundo que sobrou.',se:ehPA,at:'coragem',dif:c=>c.f('a_verdade')||c.f('adiar_juntos')?-1:1,
   ok:{x:c=>`Você sobe na cadeira dobrável mais perto. Não precisa de microfone. A tenda está quieta.

Você diz que precisa de ajuda. A voz sai mais alta do que queria. Conta que a Castellano Eventos está quebrando desde setembro, que tem três clientes este ano, que não sabe consertar isso sozinh${c.eu.o}. Que nunca pediu ajuda a ninguém na vida, porque se pedisse as pessoas iam ver que você não sabe tudo. Você não sabe tudo. Termina repetindo a frase inteira, devagar: precisa de ajuda.

Silêncio.

A Pippa larga o bolo. Levanta do chão.

— Eu tenho um Instagram com onze mil seguidores — ela diz. — E filmei a semana inteira.

Da porta da cozinha, a Dory, de avental:

— Eu faço lagosta para casamento agora. Pelo jeito. Eu preciso de alguém que saiba vender isso.

E o Barnaby, com um vaso de hortênsia nos braços, sem virar:

— Flor eu tenho.

Ninguém aplaude. Não é esse tipo de coisa. Mas a Pippa vem e senta do seu lado na cadeira dobrável, e encosta a cabeça no seu ombro, e fica.`,ef:{flag:'gesto_ajuda',vinc:1,motivoV:'pedir ajuda em voz alta'}},
   falha:{x:c=>`Você sobe na cadeira. Abre a boca. *Eu preciso de ajuda.* A frase está pronta.

Sai: *Obrigad${c.eu.o} a todos. Foi um trabalho de equipe.*

Você desce da cadeira. A Pippa olha para você de baixo, com o bolo no colo, com uma cara de quem ouviu a frase que não saiu.

— Quase — ela diz, baixinho. — Na próxima.`,ef:{flag:'gesto_quase'}}},
  {t:'Entregar a pasta. A pasta inteira, com o plano D, para a outra pessoa.',se:ehPA,
   x:c=>`Você tira a pasta da bolsa de lona. Dois sacos plásticos. Couro marrom, quatro dedos de grossura, abas coloridas. A azul. A verde. A amarela. E a página D, grampeada por cima.

Você atravessa a pista e entrega. Na mão de ${pdFB(c).ap}.

Você diz que é para ler, a página D também.

${pdFB(c).ap} olha para a pasta. Não abre. Diz que não precisa ler.

Você sabe. É por isso que está dando.`,ef:{flag:'gesto_pasta',vinc:1,motivoV:'a pasta inteira'}},
  {t:'Ajudar a desmontar a tenda até a balsa das nove. É o trabalho. O trabalho é o que você sabe.',se:ehPA,
   x:c=>`Você tira os sapatos, põe o avental que a Dory deixou numa cadeira, e começa a empilhar cadeiras dobráveis. Cento e quarenta. Uma por uma.

Às três da manhã, as cadeiras estão empilhadas. Às quatro, as luzinhas. Às cinco, a tenda. Ninguém fala com você e você não fala com ninguém. É mais fácil assim. Sempre foi.`,ef:{flag:'a_trabalho'}},
  {t:'Devolver o guardanapo do Alba. Com uma linha nova escrita embaixo, à mão.',se:ehPB,
   x:c=>`Você tira a carteira do bolso. O guardanapo de pano, dobrado em quatro, com o *A* azul bordado e a tinta borrada da chuva de quarta.

Você pede uma caneta para a Pippa. Ela tem quatro.

Embaixo de *${pdTitB(c).replace(/^./,x=>x.toUpperCase())}: cooperação zero.*, com a letra pequena de professor, você escreve:

*Revisão, 17 de junho de 2023: cooperação total. Reação irreversível.*

Você atravessa a pista e entrega. ${pdFA(c).ap} lê. Lê de novo. Dobra em quatro. Guarda no bolso de dentro, do lado do coração, sem dizer nada, porque não tem eufemismo para isso.`,ef:{flag:'gesto_guardanapo',vinc:1,motivoV:'cooperação total'}},
  {t:'Rasgar a passagem da balsa das nove. Ficar sem saber o que acontece depois.',se:ehPB,at:'coragem',
   ok:{x:c=>`Você tira a passagem do bolso do terno. *Steamship Authority. Nantucket–Hyannis. Dom 18/06. 9h00.*

Rasga ao meio. Depois em quatro. Põe os pedaços em cima da mesa da frente, a mesa sete, onde a tia Concetta e a tia Bisi passaram a noite de mãos dadas.

Você não tem plano. Você não sabe quando volta para Providence. A escola começa em setembro. Você nunca, na vida, rasgou uma passagem sem ter outra comprada.

Do outro lado da pista, alguém vê os quatro pedaços de papel na mesa sete.`,ef:{flag:'gesto_fica',vinc:1,motivoV:'sem plano'}},
   falha:{x:c=>`Você tira a passagem do bolso. Segura com as duas mãos. Pensa em rasgar.

Guarda de novo.

Você não sabe ficar sem saber. Ainda não. Talvez nunca. Mas a passagem, de volta no bolso, pesa mais do que pesava antes.`,ef:{flag:'gesto_quase_b'}}},
  {t:'Ajudar a Dory e os primos a lavar as panelas. Doze. Até a balsa.',se:ehPB,
   x:c=>`Doze panelas de cinquenta litros. Esfregão de aço. Água do mar. Você lava as doze com os primos Barros, cantando morna sem saber a letra, até as cinco da manhã.

Ninguém pergunta nada. É mais fácil assim. Você entende, agora, por que a outra pessoa gosta tanto de trabalhar.`,ef:{flag:'b_trabalho'}}
 ],
 prox:c=>pdPor(c,'pd_c10_a','pd_c10_b')});

no('pd_c10_salao',{cap:10,quem:'ab',tipo:'dialogo',lugar:'Pista da tenda vazia',trilha:'romance',hora:'Domingo, 18 de junho · 2h30',
 texto:c=>`Duas e meia. A Pippa foi dormir. A Dory e os primos foram embora na caminhonete deles, com o acordeão. O Barnaby apagou as luzinhas da tenda, uma fileira só ficou acesa, a do meio, em cima da pista, e foi embora a pé, sem dizer boa noite, com um vaso de hortênsia debaixo do braço.

Sobrou a pista de madeira, cento e quarenta cadeiras empilhadas${c.f('a_trabalho')||c.f('b_trabalho')?' por alguém que não quis falar':''}, e o barulho do porto.`,
 comeca:E=>lsSeat(E,PD_B),
 falas:[
  {p:'Você fala primeiro.',ops:c=>[
   {t:'— A minha versão daquela noite agora tem um final diferente.',tom:'abre',tag:'versao'},
   {t:'— Eu não sei o que acontece amanhã. Eu nunca disse essa frase na vida.',tom:'abre',tag:'amanha'},
   {t:'— Você pisou no meu pé três vezes na valsa.',tom:'flerte',tag:'pe'}
  ]},
  {p:'Sua vez.',ops:(c,h)=>[
   ...(h[0].tag==='versao'?[{t:'— Qual?',tom:'flerte',tag:'qual'}]:[]),
   ...(h[0].tag==='amanha'?[{t:'— Eu sempre sei. Eu tenho uma aba para isso. — (Uma pausa.) — Eu também não sei.',tom:'abre',tag:'naosei'}]:[]),
   ...(h[0].tag==='pe'?[{t:'— Quatro. Você contou errado. A Mrs. Starbuck ia ficar decepcionada.',tom:'flerte',tag:'quatro'}]:[]),
   {t:'— Boston fica a uma hora e meia de Providence. De trem.',tom:'seco',tag:'trem'}
  ]},
  {p:'De volta para você. A fileira de luz.',ops:(c,h)=>[
   ...(h[1].tag==='qual'?[{t:'— Termina no estacionamento. E não termina.',tom:'abre'}]:[]),
   ...(h[1].tag==='naosei'?[{t:'— Então a gente não sabe junto.',tom:'abre'}]:[]),
   ...(h[1].tag==='quatro'?[{t:'— Então dança de novo. Para eu contar direito.',tom:'flerte'}]:[]),
   ...(h[1].tag==='trem'?[{t:'— Uma hora e doze. O das nove e doze. Eu pesquisei.',tom:'abre'},{t:'— Isso é longe.',tom:'fere'}]:[])
  ]}
 ],
 prox:'pd_c10_escolha'});

no('pd_c10_escolha',{cap:10,quem:'ab',tipo:'decisao',lugar:'Pista da tenda vazia',trilha:'romance',hora:'Domingo, 18 de junho · 3h00',
 texto:c=>`Três da manhã. Uma fileira de luzinhas. Uma pista de madeira. ${c.f('casou')?'Um casamento que aconteceu.':'Um casamento que não aconteceu, e uma festa que aconteceu mesmo assim.'}

Duas passagens para a balsa das nove${c.f('gesto_fica')?'. Quer dizer, uma. A outra está em quatro pedaços na mesa sete':''}.

A pasta não tem aba para isso.`,
 pergunta:'Como termina?',
 ops:[
  {t:'Sair juntos da festa. De mão dada, pela Easton Street, sem saber para onde.',se:c=>c.vinc>=6&&c.fa>=2&&c.f('casou'),ef:{flag:'final_juntos'},
   x:c=>`Alguém estende a mão. O outro pega.

Os dois saem da tenda pelo gramado, passam pelo altar${c.f('altar_girado')?', girado trinta e oito graus,':''} e pelas hortênsias, atravessam o estacionamento, o mesmo, onde a caminhonete não pegou, e sobem a Easton Street a pé, de mão dada, às três da manhã, um de sapato na mão, o outro de paletó no ombro, ninguém está mais contando quem.

Na janela de cima da Gull House, uma luz acesa. A Pippa, de pijama de flamingo, na janela. Ela vê os dois subindo a rua. Tira o celular. Não filma. Guarda o celular.

Escreve na lousa da cozinha, no escuro: *Domingo, 3h. Saíram juntos.*`},
  {t:'Dançar. Agora. Sem música. Os únicos dois no salão vazio.',se:c=>c.vinc>=6&&c.f('adiado'),ef:{flag:'final_salao'},
   x:c=>`Alguém estende a mão. Não para sair. Para dançar.

Sem música. A fileira de luz em cima. O barulho do porto. Um, dois, três. Ninguém conta em voz alta. Ninguém conduz.

Uma valsa num salão vazio, numa tenda de um casamento que não aconteceu, às três da manhã, por duas pessoas que se conheceram num encontro às cegas que deu errado e que passaram dois anos contando uma versão sem o final.

No terceiro minuto, alguém começa a cantarolar *Moon River*. Desafinado. O outro ri. Continua dançando.`},
  {t:'A balsa das nove. Cada um para a sua cidade. Sem promessa. Com um *eu te ligo* que os dois sabem que é verdade.',se:c=>c.vinc>=5,ef:{flag:'final_pasta'},
   x:c=>`Ninguém estende a mão. Os dois ficam na pista, a um metro, até as luzinhas começarem a parecer apagadas contra o céu que clareia.

Um lembra que tem uma escola em setembro. O outro, uma empresa para salvar. Os dois sabem. Um diz que liga. O outro lembra que em dois anos ele nunca ligou. E a resposta é a única frase da noite que nenhum dos dois ensaiou: desta vez, sim.

Às nove, a balsa. Dois lugares no banco do fundo, encostados na máquina de café quebrada, que continua quebrada. Duas horas de travessia. Em Hyannis, dois carros, um para o norte, outro para o oeste.`},
  {t:'Acabou. A festa, a semana, o resto. Cada um empilha a sua metade das cadeiras e vai embora.',se:c=>c.vinc<5,ef:{flag:'final_ruptura'},
   x:c=>`Ninguém estende a mão.

Os dois empilham as cadeiras que faltam, cada um de um lado da pista, sem falar. Setenta para cada um. Quando acabam, alguém apaga a última fileira de luzinhas.

Às nove, a balsa. Um no andar de cima, perto da janela. O outro no andar de baixo, no banco do fundo, encostado na máquina de café quebrada.

Em Hyannis, dois carros.`}
 ],
 prox:'pd_c10_amanhecer'});

no('pd_c10_epilogo',{cap:10,quem:'ab',tipo:'final',lugar:'Epílogo',trilha:'mar',hora:'Junho de 2024',
 texto:c=>{ const L=[];
  L.push(c.f('casou')?`A Gemma e o Tunde fizeram um ano de casados em dezessete de junho de 2024. Comemoraram na Gull House, quarto três, a tranca quebrada desde 1997. O Barnaby consertou a tranca de presente. Eles pediram para ele desconsertar.`:`A Gemma e o Tunde se casaram em vinte e três de setembro de 2023, numa terça-feira, na praia de Madaket, às seis da manhã, de bota de borracha, com o Barnaby celebrando e a Dory de testemunha. Ninguém mais foi convidado. Ninguém ficou ofendido. O Tunde, antes do *sim*, disse em voz alta, na frente do Barnaby, da Dory e de três gaivotas, do que tinha medo. A Gemma disse do que ela tinha. Depois disseram sim.`);
  L.push(`A juíza Funmi Okoro foi a três casamentos em 2024. Dançou nos três. Mal. A Rosa Castellano foi aos três também, porque a Funmi convidou, e chorou nos três, e a Funmi passou o lenço nas três vezes, sem olhar, como quem entrega um documento.`);
  L.push(`A Barros Lobster, de Madaket, fez dezessete casamentos no verão de 2024. O cardápio diz: *Lagosta do Maria do Fogo, Madaket, desde 1921.* A Dory contratou os cinco primos. O tio Armando toca acordeão em todos.

O Barnaby Cole casou mais onze pessoas na praia. A Gull House voltou a servir café da manhã, na cozinha da Ruth, com a licença que nunca venceu. A Pippa mora no quarto quatro durante o verão e cuida das reservas.`);
  L.push(c.f('gesto_ajuda')?`A Castellano Eventos fez vinte e dois casamentos em 2024. O vídeo da Pippa, *a semana em que a cerimonialista fugiu*, teve dois milhões de visualizações. No fim do vídeo, uma pessoa sobe numa cadeira dobrável e diz *eu preciso de ajuda*, e a legenda diz: *a melhor cerimonialista de Boston*. As noivas ligam pedindo exatamente aquilo: alguém que saiba que as coisas dão errado.`:`A Castellano Eventos sobreviveu a 2023 por pouco. Em 2024, fez nove casamentos. A Pippa sempre diz que podia ser o dobro, se alguém deixasse ela postar o vídeo da semana de Nantucket. Ninguém deixa ainda.`);
  if(c.f('final_juntos')) L.push(`Junho de 2024. Um apartamento pequeno em Pawtucket, exatamente no meio do caminho entre Boston e Providence, quarenta minutos de trem para cada lado, escolhido com uma planilha e uma tabela de horários. Na geladeira, dois ímãs: a tabela periódica e um calendário de casamentos com vinte e dois círculos vermelhos.

${Pda(c)} ainda diz *pequeno ajuste*. Agora explica, depois, qual. ${Pdb(c)} ainda conta os passos da valsa em voz alta. Agora só quando quer que alguém ria.

Na carteira de ${pdb(c)}, entre a carteira de motorista e o cartão da biblioteca, um guardanapo de pano do Alba, dobrado em quatro, com duas linhas. ${c.f('gesto_guardanapo')?'A segunda, em letra de professor: *cooperação total. Reação irreversível.*':'A segunda, em letra de cerimonialista, escrita no trem: *Revisão: cooperação aceitável.*'}

Eles ainda contam versões diferentes daquela noite de 2021. As duas, agora, terminam no estacionamento. E não terminam.`);
  else if(c.f('final_salao')) L.push(`Junho de 2024. A Gemma e o Tunde casaram de bota em setembro. Os dois padrinhos não estavam. Não foram convidados. Estavam, naquela mesma manhã de terça, a quatrocentos metros dali, na mesma praia, numa canga, assistindo de longe com um café da Dory, porque a Gemma tinha mandado uma mensagem: *ninguém convidado, mas a praia é pública*.

Desde aquela noite na tenda, os dois dançam em todo salão vazio que encontram. Na escola de Providence, no ginásio, depois do baile de formatura, quando os alunos vão embora. Num salão de festas em Newport, às três da manhã, depois de um casamento da Castellano Eventos. Sem música. Um, dois, três.

${Pdb(c)} ainda conta os passos. Baixinho. Só para o outro ouvir.`);
  else if(c.f('final_pasta')) L.push(`Novembro de 2023. Boston. Chove.

Na caixa de correio do apartamento de Back Bay, ${pdgA(c,'o','a')} ${pdnA(c)} encontra um envelope pardo de Providence, grosso, de quatro dedos.

Dentro, uma pasta. Não de couro. De papelão, comprada em loja de material escolar, com abas de cartolina recortadas à mão. Na capa, em letra pequena de professor de química, com caneta de quatro cores:

*PLANO E.*

Aba azul: *Sábado, 2 de dezembro. Trem das 9h12, Providence–Boston. Chega 10h24.*
Aba verde: *Se chover: o mesmo trem, com guarda-chuva. Que eu não vou deixar na cadeira.*
Aba amarela: *Se você não quiser: não precisa explicar. Item 4.*
Aba vermelha: *Se você quiser: não precisa explicar também.*

E no fim, grampeada por cima, uma página com um *D* riscado, e embaixo, escrito à mão:

*Eu liguei. Você não atendeu. Eu entendo. Mas eu não sei mentir, então: eu ainda penso no estacionamento toda vez que chove. Choveu muito em Providence esse mês.*

No dia dois de dezembro, às dez e vinte e quatro, a estação South Station, em Boston, está cheia. Na plataforma sete, alguém espera com uma pasta de couro debaixo do braço. E um guarda-chuva fechado.`);
  else L.push(`Junho de 2024. Ninguém ligou.

${Pda(c)} faz casamentos em Boston. ${Pdb(c)} dá aula em Providence. No casamento da Gemma e do Tunde, em setembro, de bota, na praia, nenhum dos dois estava, porque ninguém foi convidado, e a praia, naquela terça, estava vazia.

Cada um ainda conta a sua versão da noite de 2021. As duas terminam antes da sobremesa. Ninguém conta o estacionamento. Ninguém conta a caminhonete. Ninguém conta a semana.

Na lousa da cozinha da Gull House, que ninguém apagou desde junho, a última linha da Pippa ainda está lá, meio borrada: *Eles pararam de fingir.* O Barnaby passa por ela todo dia, de manhã, com a caneca de café, e não apaga. Ele diz que é para lembrar que nem toda aposta paga.`);
  L.push(`*Padrinho e Madrinha · fim.*`);
  return L.join('\n\n') },
 prox:null});
