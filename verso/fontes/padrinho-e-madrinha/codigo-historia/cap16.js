/* ================= PADRINHO E MADRINHA · CAPÍTULO 6 · cenas novas e reescritas ================= */

no('pd_c6_chuva',{cap:6,quem:'ab',tipo:'segue',lugar:'Nantucket Yacht Club',trilha:'tensao',hora:'Quarta, 14 de junho · 21h00',
 texto:c=>`Nove da noite. A tenda branca${c.f('tenda_agua')?', no gramado de baixo, junto da água,':''} está montada, com as luzinhas penduradas e as cento e quarenta cadeiras em fileiras. O Mr. Ashby entregou a chave do portão e foi para casa. Os funcionários do clube jantam na cozinha.

O ensaio de hoje é pequeno: conferir o caminho da cerimônia com a lanterna do celular. São quarenta e dois passos do terraço até o altar${c.f('altar_girado')?', que agora fica trinta e oito graus virado para o lado':''}.

Às nove e onze, a chuva chega. Vem do porto como uma parede. O vento entra por baixo da lona e a tenda inteira se levanta, feito vela de barco. As luzinhas balançam. Uma cadeira sai voando sozinha e cai na água.

Da cozinha do clube, alguém grita que vai buscar corda. Vai levar uns minutos.`,
 prox:'pd_c6_tenda'});

no('pd_c6_tenda',{cap:6,quem:'ab',tipo:'dividir',cada:1,lugar:'Gramado do Yacht Club',trilha:'tensao',hora:'Quarta, 14 de junho · 21h12',
 texto:c=>`A lona estala. Uma estaca do canto, do lado do vento, sai do chão dois dedos a cada rajada. O fio das luzinhas está esticado como corda de violão. Mais três cadeiras tombam e começam a rolar na direção do porto.`,
 pergunta:'O que você faz enquanto a corda não chega?',
 ops:[
  {t:'Segurar a estaca do canto com o peso do corpo',ambos:true,at:'forca',
   ok:{x:c=>`${c.Q} se joga na estaca e abraça a corda de amarração com os dois braços. A lona puxa para cima, ${c.q} puxa para baixo, e por três minutos inteiros de chuva na cara ninguém ganha.

Quando os funcionários chegam, a estaca continua no chão. Os braços de ${c.q} continuam em volta da corda, e demoram a entender que já podem soltar.`,ef:{flag:'estaca',fa:1}},
   falha:{x:c=>`${c.Q} agarra a corda de amarração. A rajada seguinte arranca a estaca do chão com um barulho de rolha e arrasta ${c.q} por dois metros de gramado, de barriga.

A tenda decide ficar de pé por conta própria, presa pelas outras cinco estacas. A grama fica toda na roupa.`,ef:{abalo:1,motivo:'dois metros de gramado, de barriga'}}},
  {t:'Salvar as luzinhas antes que o fio arrebente',se:ehPA,at:'agilidade',
   ok:{x:c=>`Você sobe numa cadeira e solta os ganchos, um por um, enrolando o fio no braço como mangueira. Cem metros de luzinha, molhados, pesados, acesos.

A outra metade você não alcança. Ela estoura lâmpada por lâmpada, numa fila de estalinhos, e apaga.

Meia tenda de luz já é alguma coisa. Você desce da cadeira com um braço brilhando.`,ef:{flag:'luzes_salvas'}},
   falha:{x:c=>`Você sobe numa cadeira, estica o braço, e o fio arrebenta dois ganchos antes da sua mão. Duzentos metros de luzinha caem na grama molhada e apagam de uma vez.

No escuro, só sobra a lanterna do celular, com três por cento de bateria.`,ef:{abalo:1,motivo:'as luzinhas'}}},
  {t:'Soltar a lona do lado do vento, para a tenda parar de fazer vela',se:ehPB,at:'cabeca',
   ok:{x:c=>`A tenda está presa dos quatro lados, e é por isso que ela quer voar: o vento entra e não tem por onde sair. Você solta as duas amarras do lado do porto e enrola a lona para cima.

O vento atravessa a tenda de ponta a ponta e vai embora pelo outro lado. A lona baixa. As estacas param de sair do chão.

Você fica um segundo olhando aquilo funcionar. Depois percebe que está sorrindo, encharcad${oB(c)}, no meio de um temporal.`,ef:{flag:'lona_solta',fa:1}},
   falha:{x:c=>`Você solta uma amarra. Era a do lado errado. A lona faz uma barriga para dentro, enche de água em dez segundos e despeja tudo de uma vez, uns quarenta litros, na sua cabeça.

A física estava certa. A direção do vento é que mudou.`,ef:{abalo:1,motivo:'quarenta litros de chuva'}}},
  {t:'Correr atrás das cadeiras antes que mais alguma vá parar no porto',ambos:true,
   x:c=>`${c.Q} corre pelo gramado atrás de cadeira dobrável. Pega uma pelo pé, outra pelo encosto, perde a terceira, que entra na água em pé, com alguma dignidade, e sai boiando.

Cento e trinta e oito cadeiras salvas. As outras duas agora pertencem ao porto de Nantucket.`,ef:{flag:'cadeiras_porto'}}
 ],
 prox:c=>pdPor(c,'pd_c6_a','pd_c6_b')});

no('pd_c6_espera',{cap:6,quem:'ab',tipo:'dialogo',lugar:'Caminhonete do Barnaby · estacionamento do clube',trilha:'romance',hora:'Quarta, 14 de junho · 21h45',
 texto:c=>`A chuva não dá sinal de cansar. O copo de café debaixo da goteira enche a cada seis minutos, mais ou menos, e alguém precisa despejar pela fresta da janela.

É assim que começa o jogo, sem ninguém ter chamado de jogo: cada vez que o copo enche, uma pergunta. A resposta tem que ser curta e tem que ser verdade.`,
 comeca:E=>lsSeat(E,PD_A),
 falas:[
  {p:'O copo encheu. A pergunta é sua.',ops:c=>[
   {t:'— Qual foi a pior coisa que um aluno já escreveu numa prova?',tom:'flerte',tag:'aluno'},
   {t:'— Por que química?',tom:'abre',tag:'quimica'},
   {t:'— Você precisava mesmo dividir aquela conta por item?',tom:'seco',tag:'conta'}
  ]},
  {p:'Resposta curta. E verdadeira.',ops:(c,h)=>[
   ...(h[0].tag==='aluno'?[{t:'— "A água ferve a noventa graus porque é um ângulo reto." Eu dei meio ponto pela geometria.',tom:'flerte',tag:'r1'}]:[]),
   ...(h[0].tag==='quimica'?[{t:'— Porque nada some. O que parece que sumiu virou outra coisa. Eu precisava que isso fosse verdade.',tom:'abre',tag:'r1'}]:[]),
   ...(h[0].tag==='conta'?[{t:'— Eu divido tudo por item. É o único jeito de eu ter certeza de que não fiquei devendo nada a ninguém.',tom:'abre',tag:'r1'}]:[]),
   {t:'— Passo. A próxima eu respondo em dobro.',tom:'seco',tag:'passo'}
  ]},
  {p:'De volta para você.',ops:c=>[
   {t:'(Rir. O vidro embaça mais um pouco.)',tom:'flerte',acao:true,tag:'riu'},
   {t:'— Isso foi curto e foi verdade. Eu não esperava as duas coisas.',tom:'cuida',tag:'curto'},
   {t:'— O copo encheu de novo. Sua vez de perguntar.',tom:'seco',tag:'vez'}
  ]},
  {p:'A pergunta agora é sua.',ops:c=>[
   {t:'— Qual foi o pior casamento que você já salvou?',tom:'flerte',tag:'pior'},
   {t:'— Por que casamento?',tom:'abre',tag:'porque'},
   {t:'— Quantos alfinetes tem nessa almofadinha do seu pulso?',tom:'cuida',tag:'alfinete'}
  ]},
  {p:'Resposta curta. E verdadeira.',ops:(c,h)=>[
   ...(h[3].tag==='pior'?[{t:'— Um noivo alérgico a lírio, numa igreja com quatrocentos lírios. Eu troquei tudo por hortênsia em cinquenta minutos. Ninguém ficou sabendo.',tom:'flerte',tag:'r2'}]:[]),
   ...(h[3].tag==='porque'?[{t:'— Porque é o único dia em que todo mundo combina de fazer dar certo. Eu gosto de trabalhar nesse dia.',tom:'abre',tag:'r2'}]:[]),
   ...(h[3].tag==='alfinete'?[{t:'— Quarenta e dois. Eu conto quando fico com medo. Você recita gás nobre. Eu vi a sua boca mexendo na balsa.',tom:'abre',tag:'r2'}]:[]),
   {t:'— Passo. Mas fico devendo uma.',tom:'seco',tag:'passo2'}
  ]},
  {p:'Você fecha a rodada.',ops:c=>[
   {t:'— Curto e verdadeiro.',tom:'cuida',tag:'cv'},
   {t:'(Despejar o copo de café pela fresta da janela e pôr de volta no lugar, debaixo da goteira.)',tom:'seco',acao:true,tag:'copo'},
   {t:'— A gente é pior nisso do que parece. E melhor do que eu esperava.',tom:'abre',tag:'melhor'}
  ]}
 ],
 prox:'pd_c6_verdade'});

no('pd_c6_sim',{cap:6,quem:'ab',tipo:'segue',lugar:'Gull House · quarto quatro',trilha:'romance',hora:'Quinta, 15 de junho · 6h00',
 ef:{flag:'noite6_sim',fa:1,vinc:1,motivoV:'sem regra'},
 texto:c=>`A Gull House está apagada. A escada dos fundos range no terceiro degrau, e os dois pisam nele ao mesmo tempo, e riem baixo, de roupa ainda úmida, como dois adolescentes chegando depois da hora.

Quarto quatro, desta vez. A tranca do quatro funciona. Desta vez, alguém tranca.

—

Seis da manhã. Neblina na janela. O sino de boia.

Duas pessoas acordadas, e nenhuma das duas fingindo que não está. Em cima da cômoda, dobrado, o guardanapo de papel com a regra de três itens. ${c.f('regra_dura')?'O item 3, em vermelho, dizia que '+(c.f('noite3_sim')?'não ia acontecer de novo':'não ia acontecer')+'. O guardanapo continua dobrado, e ninguém propõe uma errata.':'O item 3 dizia: *o resto a gente vê*. Está visto.'}`,
 prox:'pd_c6_fim'});

no('pd_c6_nao',{cap:6,quem:'ab',tipo:'segue',lugar:'Gull House',trilha:'romance',hora:'Quinta, 15 de junho · 6h00',
 ef:{flag:'noite6_nao',vinc:1,motivoV:'devagar, sem fingir'},
 texto:c=>`Na escada dos fundos da Gull House, o terceiro degrau range. ${lsNoite(c,'beijo6')?'É nele que acontece o beijo de boa noite, que demora bem mais do que um boa-noite.':(c.f('beijo6_a')||c.f('beijo6_b'))?'É nele que os dois param, a um degrau de distância. Um queria mais do que um boa-noite. O outro pediu calma, sem usar a palavra. Fica assim, e ninguém sai ofendido.':'É nele que os dois param, a um degrau de distância, e se olham um tempo comprido. Ninguém atravessa. Também ninguém sobe logo.'}

Quarto três. Quarto quatro. O banheiro no meio, com as duas portas abertas a noite inteira, e a luz do corredor passando pelas duas.

À meia-noite e vinte, ninguém bate na parede. Não precisa. Dá para ouvir a respiração do outro lado.

—

Seis da manhã. Neblina na janela. O sino de boia. Duas pessoas acordadas em quartos diferentes, com as portas abertas, olhando o mesmo teto de madeira de 1840, cada uma do seu lado da parede.`,
 prox:'pd_c6_fim'});
