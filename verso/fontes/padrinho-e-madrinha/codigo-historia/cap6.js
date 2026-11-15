/* ================= PADRINHO E MADRINHA · CAPÍTULO 6 · O ESTACIONAMENTO ================= */

no('pd_c6_carro',{cap:6,quem:'ab',tipo:'dividir',cada:1,lugar:'Estacionamento do Yacht Club · caminhonete do Barnaby',trilha:'tensao',hora:'Quarta, 14 de junho · 21h30',
 texto:c=>`Às nove e vinte e cinco, a corda chega, e com ela seis funcionários do clube, de capa amarela. A tenda fica de pé.

No gramado não há mais o que fazer. No estacionamento, a cinquenta metros de chuva, há uma caminhonete de 1988.

A porta fecha. A chuva bate na lataria como pedra. Os vidros embaçam em vinte segundos. A chave gira, o motor tosse, e nada. O teto pinga, do lado do passageiro, numa cadência regular, dentro de um copo de café vazio que o Barnaby deixou ali exatamente para isso.

O celular de um tem três por cento de bateria. O do outro, nenhum sinal.`,
 pergunta:'O que você faz?',
 ops:[
  {t:'Tentar fazer o motor pegar: a bateria, o afogador, alguma coisa',ambos:true,at:'cabeca',
   ok:{x:c=>`${c.Q} abre o painel de baixo do volante com a lanterna do celular. Fio solto. A caminhonete de 1988 tem um fio do motor de arranque que solta quando chove, porque claro que tem. ${c.Q} encaixa de volta.

A chave gira. O motor pega. O rádio liga sozinho, na única estação que pega, e toca, alto, de 1970, *Rainy Night in Georgia*.

Ninguém desliga. Ninguém dirige também. Lá fora a chuva continua uma parede. O aquecedor da caminhonete começa a soprar um ar quente com cheiro de terra de hortênsia.`,ef:{flag:'motor_pegou',abaloAmbos:-1,motivo:'o aquecedor'}},
   falha:{x:c=>`${c.Q} tenta. Gira a chave, bate no painel, mexe em fios no escuro, e no fim leva um choque pequeno, mas ofendido, e desiste.

A caminhonete continua morta. Faz frio. A roupa molhada gruda. Os vidros embaçam por dentro e escorrem.`}},
  {t:'Pegar o cobertor de mudança que está atrás do banco',ambos:true,
   x:c=>`Atrás do banco tem um cobertor de mudança cinza, grosso, com cheiro de terra e de um cachorro que não existe mais. ${c.Q} puxa, sacode e abre em cima do banco. Dá para duas pessoas, se as duas quiserem.`,ef:{flag:'cobertor'}},
  {t:'Abrir a carteira para ver se o dinheiro molhou, e deixar cair alguma coisa no escuro',se:c=>ehPB(c)&&c.f('guardanapo'),
   x:c=>`Você tira a carteira do bolso de trás para ver o estrago. Encharcada. As notas, o cartão da biblioteca, e entre eles um guardanapo de pano dobrado em quatro, com um *A* azul bordado no canto, que escorrega e cai no chão da caminhonete, no escuro, debaixo do banco.

Você não vê onde caiu. Procura com a mão. Não acha. Desiste, por enquanto. Amanhã você acha.`,ef:{flag:'guardanapo_caiu'}},
  {t:'Conferir se a pasta molhou. A pasta não pode molhar.',se:ehPA,
   x:c=>`A pasta está dentro da sua bolsa de lona, dentro de um saco plástico, dentro de outro saco plástico. Você sempre leva a pasta em dois sacos plásticos. Desde um casamento em Martha's Vineyard em 2017.

Está seca. Todas as abas. A azul, a verde, a amarela. E a página D, grampeada por cima.

Os dois sacos plásticos fazem um barulho enorme dentro da cabine fechada. Não tem como abrir aquilo com discrição.`,ef:{flag:'pasta_seca'}}
 ],
 prox:'pd_c6_espera'});

no('pd_c6_verdade',{cap:6,quem:'ab',tipo:'dialogo',lugar:'Caminhonete do Barnaby · estacionamento do clube',trilha:'romance',hora:'Quarta, 14 de junho · 22h00',
 texto:c=>`A chuva não para. O teto pinga no copo de café. ${c.f('motor_pegou')?'O rádio toca country de 1970 baixinho, e o aquecedor sopra.':'O escuro é completo, exceto pela luz de um poste lá longe, borrada pelo vidro embaçado.'}

E de repente, sem ninguém planejar, é outro estacionamento. Outra chuva. Junho de 2021, o Alba, Back Bay. A noite que cada um conta de um jeito, e que nas duas versões acaba no mesmo ponto: antes da sobremesa.`,
 comeca:E=>lsSeat(E,PD_B),
 falas:[
  {p:'Você fala primeiro. A chuva no teto.',ops:c=>[
   {t:'— Você esqueceu o guarda-chuva. Na cadeira. Eu saí atrás para devolver.',tom:'abre',tag:'guardachuva'},
   {t:'— A minha versão termina na sobremesa. A sua também. Não é verdade, é?',tom:'abre',tag:'versao'},
   {t:'— Você nunca contou para ninguém o que aconteceu no estacionamento.',tom:'abre',tag:'ninguem'}
  ]},
  {p:'Sua vez. O vidro embaçado.',ops:(c,h)=>[
   ...(h[0].tag==='guardachuva'?[{t:'— Eu não esqueci. Eu deixei. Para ver se você vinha atrás.',tom:'abre',tag:'deixou'}]:[]),
   ...(h[0].tag==='versao'?[{t:'— Não. As duas terminam no lugar errado. As duas param antes da chuva.',tom:'abre',tag:'chuva'}]:[]),
   ...(h[0].tag==='ninguem'?[{t:'— Nem você.',tom:'abre',tag:'nemvoce'}]:[])
  ]},
  {p:'De volta para você.',ops:(c,h)=>[
   ...(h[1].tag==='deixou'?[{t:'— Eu vim. E a gente brigou mais dez minutos debaixo do guarda-chuva. Sobre a conta.',tom:'flerte',tag:'conta'}]:[]),
   ...(h[1].tag==='chuva'?[{t:'— Eu saí com o seu guarda-chuva. Você estava no estacionamento, debaixo da chuva, chamando um táxi com o braço.',tom:'abre',tag:'taxi'}]:[]),
   ...(h[1].tag==='nemvoce'?[{t:'— Eu não contei porque eu não sei quem começou.',tom:'abre',tag:'quem'}]:[])
  ]},
  {p:'Sua vez. Ninguém mais está fingindo.',ops:(c,h)=>[
   ...(h[2].tag==='conta'?[{t:'— E no meio da briga, eu não sei quem.',tom:'abre',tag:'beijo'}]:[]),
   ...(h[2].tag==='taxi'?[{t:'— E você fechou o guarda-chuva. Para os dois ficarem molhados igual. Você disse que era *justo*.',tom:'flerte',tag:'beijo'}]:[]),
   ...(h[2].tag==='quem'?[{t:'— Eu também não. Eu penso nisso toda vez que chove.',tom:'abre',tag:'beijo'}]:[])
  ]},
  {p:'Você diz. Em voz alta. Pela primeira vez em dois anos.',ops:c=>[
   {t:'— A gente se beijou. No estacionamento. Na chuva. E cada um entrou num táxi e contou uma versão sem isso.',tom:'abre'},
   {t:'(Não dizer nada. Tirar o cobertor do ombro. Chegar perto.)',tom:'flerte',acao:true}
  ]}
 ],
 prox:'pd_c6_decide'});

no('pd_c6_decide',{cap:6,quem:'ab',tipo:'dividir',secreto:true,cada:1,lugar:'Caminhonete do Barnaby',trilha:'romance',hora:'Quarta, 14 de junho · 22h15',
 texto:c=>`A chuva no teto. O vidro embaçado, o copo de café, a confissão dita em voz alta e ainda no ar. Dois anos de versões separadas, e agora uma só.

O que vem agora é uma escolha de cada um, e só acontece se os dois escolherem.`,
 pergunta:'O que você quer?',
 ops:[
  {t:'Chegar mais perto. Terminar o que ficou interrompido no estacionamento do Alba.',ambos:true,ef:lsSim('beijo62'),x:c=>`${c.Q} chega mais perto.`},
  {t:'Ficar onde está. Ter dito a verdade já é muita coisa por uma noite.',ambos:true,x:c=>`${c.Q} fica onde está, com as mãos no colo, e olha a chuva.`}
 ],
 prox:'pd_c6_beijo'});

no('pd_c6_beijo',{cap:6,quem:'ab',tipo:'segue',lugar:'Caminhonete do Barnaby',trilha:'romance',hora:'Quarta, 14 de junho · 22h20',
 ef:{pista:'pd_beijo'},
 texto:c=>`Junho de 2021. O estacionamento do Alba, chuva fina de Boston, o guarda-chuva esquecido, ou deixado. Dez minutos de briga sobre a conta, sobre a reação de Maillard, sobre onze ligações. E no meio da briga, sem que nenhum dos dois saiba até hoje quem deu o primeiro passo, um beijo. Comprido. Molhado. Do tipo que não se dá num primeiro encontro que deu errado.

Depois, dois táxis. Duas versões. Dois anos.

E na mesa do bar do Alba, enquanto isso, a Gemma e o Tunde, que tinham ido escondidos espiar o encontro dos irmãos, cada um do seu lado do bar, sem se conhecer, e que tinham começado a rir juntos quando a primeira mesa foi trocada, e que pediram outra rodada quando a segunda foi, e que não viram o estacionamento porque já estavam olhando um para o outro.

O casamento de sábado existe por causa de uma briga. E de um beijo que ninguém contou.

—

Agora, dois anos depois, outro estacionamento. Outra chuva, mais forte. Uma caminhonete de 1988 que pinga pelo teto num copo de café.

${!lsNoite(c,'beijo62')?'Ninguém se beija. Os dois ficam olhando o vidro embaçado, sabendo exatamente onde cada um parou há dois anos, e que dessa vez parar foi uma escolha.':c.f('noite3_sim')?'Não é o primeiro beijo. Não é nem o segundo. Mas é o primeiro em que ninguém pode dizer que foi o vinho, ou o porão, ou a regra que falhou. É o primeiro que os dois escolhem sabendo exatamente de onde ele vem.':'É o primeiro beijo desde o estacionamento do Alba. Os dois sabem disso. É o mesmo beijo, interrompido por dois anos e retomado no lugar exato onde parou, como uma reação química que só precisava de mais calor.'}

O rádio, se estiver ligado, toca qualquer coisa. Ninguém ouve.

A chuva para às onze e dez. Ninguém percebe até as onze e meia.`,
 prox:'pd_c6_volta'});

no('pd_c6_volta',{cap:6,quem:'ab',tipo:'dividir',secreto:true,cada:1,lugar:'Estacionamento do Yacht Club',trilha:'romance',hora:'Quarta, 14 de junho · 23h40',
 texto:c=>`Onze e quarenta. A chuva parou. O estacionamento é um espelho de água com a lua dentro. ${c.f('motor_pegou')?'A caminhonete pega de primeira.':'A caminhonete, depois de muito xingamento, pega, porque o Barnaby atende o telefone e diz *bate no painel com a mão aberta, duas vezes, do lado esquerdo*, e funciona.'}

Dez minutos até a Gull House. Um banheiro no meio de dois quartos, com uma tranca quebrada desde 1997.

A regra do guardanapo${c.f('regra_dura')?' diz, em vermelho: '+(c.f('noite3_sim')?'não acontece de novo':'não vai acontecer')+'':' diz: o resto a gente vê'}.`,
 pergunta:'O que você quer esta noite?',
 ops:[
  {t:'O mesmo quarto. Esquecer a regra. Hoje não tem regra.',ambos:true,ef:c=>({flag:['noite6_'+c.s,'beijo6_'+c.s]}),x:c=>`${c.Q} segura a mão do lado, em cima do câmbio, e não solta até a Gull House.`},
  {t:'Um beijo de boa noite na escada dos fundos. E cada um no seu quarto.',ambos:true,ef:lsSim('beijo6'),x:c=>`${c.Q} para no terceiro degrau, que range, e se vira.`},
  {t:'Ir devagar. Cada um no seu quarto, sem beijo. Mas sem fingir mais nada.',ambos:true,x:c=>`${c.Q} dirige com as duas mãos no volante, ou olha pela janela, e sorri sozinh${c.eu.o} o caminho inteiro.`}
 ],
 prox:c=>lsNoite(c,'noite6')?'pd_c6_sim':'pd_c6_nao'});

no('pd_c6_fim',{cap:6,quem:'ab',tipo:'fim',lugar:'Cozinha da Gull House',trilha:'noite',hora:'Quinta, 15 de junho · 7h30',
 npcs:['barnaby','pippa'],
 texto:c=>`Sete e meia. Café da manhã. O Barnaby faz ovos.

Os dois descem pela mesma escada, ao mesmo tempo, sem cálculo nenhum.

O Barnaby olha. Larga a espátula. Atravessa a cozinha até a lousa, pega o giz, e embaixo de *BARNABY: depois que eles pararem de fingir*, escreve, com a letra de etiqueta de planta:

*Quinta, 15. Eu ganhei.*

A Pippa, de pijama de flamingo, olha a lousa, olha os dois, e não protesta. Ela tira o dinheiro do jantar do Club Car do bolso e põe na mão do Barnaby.

— Vale a pena perder — ela diz.

Hoje, quinta, os noivos saem do retiro de Vermont às dez da manhã e pegam o carro para Hyannis. Chegam amanhã, sexta, na balsa das duas. É o que diz a pasta, na aba azul.

A pasta está errada.`,
 prox:'pd_c7_manha'});
