/* ================= PADRINHO E MADRINHA · CAPÍTULO 7 · O QUE CADA UM SABIA ================= */

no('pd_c7_carteira',{cap:7,quem:'ab',tipo:'segue',lugar:'Cozinha da Gull House',trilha:'abertura',hora:'Quinta, 15 de junho · 8h30',
 npcs:['barnaby','pippa'],
 ef:{pista:'pd_guardanapo'},
 texto:c=>{ const L=[];
  L.push(`Oito e meia. Na bancada da cozinha, em cima de um pano de prato, o Barnaby espalhou tudo o que molhou ontem à noite, para secar ao sol da janela: dois celulares dentro de uma tigela de arroz cru, uma carteira aberta, notas de dólar uma do lado da outra, um cartão da biblioteca de Providence, uma carteira de motorista de Rhode Island.`);
  if(c.f('guardanapo_caiu')) L.push(`E, por cima de tudo, um guardanapo de pano branco, dobrado em quatro, com um *A* azul bordado no canto.

— Achei debaixo do banco da caminhonete — diz o Barnaby, para ninguém em particular, servindo café. — Hoje cedo. Quando fui ver o estrago do teto.`);
  else L.push(`E, no meio das notas, saído de dentro da carteira, um guardanapo de pano branco, dobrado em quatro, com um *A* azul bordado no canto, que o Barnaby desdobrou para secar, porque o Barnaby seca tudo aberto.`);
  L.push(`O guardanapo está aberto, porque o Barnaby seca tudo aberto. No meio do pano, em caneta azul, numa letra de cerimonialista, apressada, tem quatro palavras de dois anos atrás, escritas no meio daquele jantar, por baixo da mesa, como quem anota num cronograma:

*${TitB(c)}: cooperação zero.*

A tinta borrou um pouco com a chuva de ontem. Dá para ler mesmo assim. Dá para ver também as quatro dobras de um pano que passou dois anos dentro de uma carteira.

A carteira é de ${pdb(c)}. A letra é de ${pda(c)}. Os dois estão na cozinha.

A Pippa, encostada na pia, olha de um para o outro, e pela primeira vez em cinco dias não pega o celular para avisar ninguém.

É a manhã mais bonita da semana. Dura mais onze minutos.`);
  return L.join('\n\n') },
 prox:'pd_c7_guardanapo'});

no('pd_c7_guardanapo',{cap:7,quem:'ab',tipo:'dialogo',lugar:'Cozinha da Gull House',trilha:'romance',hora:'Quinta, 15 de junho · 8h40',
 texto:c=>`O guardanapo continua aberto em cima do pano de prato, entre os dois, com a tinta borrada e a letra de dois anos atrás. A cozinha cheira a café e a toalha molhada.`,
 comeca:E=>lsSeat(E,PD_A),
 falas:[
  {p:'Você começa. Com o guardanapo na mão.',ops:c=>[
   {t:'— Dois anos.',tom:'abre',tag:'dois'},
   {t:'— Você guardou isso numa carteira, dobrado em quatro. Eu estou calculando se me ofendo.',tom:'flerte',tag:'ofendo'},
   {t:'(Pegar o guardanapo, dobrar de volta nas quatro dobras de antes, devagar, e estender para a outra pessoa.)',tom:'cuida',acao:true,tag:'devolve'}
  ]},
  {p:'Sua resposta.',ops:(c,h)=>[
   ...(h[0].tag==='dois'?[{t:'— Eu ia jogar fora. Toda semana.',tom:'abre',tag:'jogar'}]:[]),
   ...(h[0].tag==='ofendo'?[{t:'— Eu ia jogar fora. Toda semana. E toda semana eu não joguei.',tom:'abre',tag:'jogar'}]:[]),
   ...(h[0].tag==='devolve'?[{t:'(Pegar o guardanapo. Pôr de volta na carteira, onde ele estava, sem dizer nada.)',tom:'abre',acao:true,tag:'carteira'}]:[])
  ]}
 ],
 prox:c=>pdPor(c,'pd_c7_a','pd_c7_b')});


no('pd_c7_a',{cap:7,quem:'solo',lugar:'Cozinha da Gull House',trilha:'tensao',hora:'Quinta, 15 de junho · 8h45',
 npcs:['pippa'],
 texto:c=>c.f('contou_a_tunde')?`${pdFB(c).ap} subiu para se vestir. Você ficou na cozinha com o guardanapo na mão e o café esfriando.

Na mesa, embaixo do celular de ${pdFB(c).ap} na tigela de arroz, o caderno preto, aberto para secar. Você não pretende ler. Você lê. É o seu trabalho ler tudo o que está aberto em cima de uma mesa.

O discurso de ${pdTitB(c)}. Versão dezoito. Desta vez, com a segunda frase, e a terceira, e a quarta, sem nada riscado:

*Meu irmão é a pessoa mais gentil que eu conheço. Ele escolhe devagar, porque quer escolher uma vez só. E duas semanas atrás ele me ligou às duas da manhã e me disse que não sabia se queria casar. Eu acho que essa foi a coisa mais corajosa que ele já fez. Porque o nosso pai também não sabia. E não disse para ninguém.*

Você lê de novo. Para cento e quarenta pessoas. No microfone. Na frente da Gemma.`:`${pdFB(c).ap} subiu para se vestir. Você ficou na cozinha com o guardanapo na mão e o café esfriando.

A Pippa tira o celular de ${pdFB(c).ap} da tigela de arroz, aperta o botão para ver se ligou. Liga. E na tela de bloqueio, porque o celular reiniciou depois de molhar e voltou com as notificações todas de uma vez, uma linha cinza, com a transcrição automática de um recado de voz, de dois de junho:

*Tunde: "Eu não sei se eu quero casar. Não é ela. Sou eu. Eu acordo e fico pensando no papai. Não fala pra ninguém..."*

A Pippa lê. Fica branca. Vira o celular para baixo na bancada, rápido, como se queimasse.

Tarde demais. Você também leu.

Dois de junho. Treze dias. Você contratou uma lagosteira. Você brigou com um gerente de clube por causa de um pôr do sol. Você girou um altar trinta e oito graus. Você passou ${c.f('noite3_sim')||c.f('noite6_sim')?'noites':'uma noite'} com a pessoa que sabia, desde o primeiro minuto na balsa, que o casamento que você está salvando talvez não aconteça.`,
 ops:[
  {t:'Respirar. Contar os alfinetes da almofadinha do pulso. De dez em dez.',
   x:c=>`Dez. Vinte. Trinta. Quarenta e dois alfinetes. Você conta duas vezes. Na segunda, a mão para de tremer.

A Pippa olha para você.

— Você está bem?

— Temos um pequeno ajuste — você diz.

A Pippa não ri.`,ef:{abalo:-1,motivo:'quarenta e dois alfinetes'}},
  {t:'Abrir a pasta na última página. O plano D. Ler sozinh'+'a, pela primeira vez em nove meses.',
   x:c=>`Você abre a pasta na página grampeada. A letra D, à mão.

Embaixo, com a mesma caneta, uma lista que você escreveu em setembro do ano passado, três semanas antes de primeiro de outubro, no seu apartamento de Back Bay, às quatro da manhã:

*Plano D. Se eu não quiser.*
*1. Ligar para a igreja de St. Leonard. Cancelar.*
*2. Ligar para o Graham antes. Não depois.*
*3. Deixar que pensem o que quiserem.*
*4. Não explicar.*

Os itens 1, 2 e 3 estão riscados, feitos. O 4 você cumpre todo dia.

Você fecha a pasta.`,ef:{flag:'leu_planod'}},
  {t:'Subir a escada atrás. Agora.',ir:'pd_c7_briga'}
 ]});
NOS.pd_c7_a.ops[1].t=c=>'Abrir a pasta na última página. O plano D. Ler sozinh'+c.eu.o+', pela primeira vez em nove meses.';

no('pd_c7_b',{cap:7,quem:'solo',lugar:'Steamboat Wharf',trilha:'tensao',hora:'Quinta, 15 de junho · 9h30',
 npcs:['graham'],
 texto:c=>`Nove e meia. Você desceu até o cais para buscar a caixa de luzinhas novas para a tenda, que a de ontem a chuva queimou, e que chega na balsa rápida das nove e vinte.

A balsa encosta. Da prancha, entre turistas e um cachorro de raça, desce um homem de suéter azul no ombro e mala de couro de rodinha. Ele vê a caixa de papelão escrita *GEMMA & TUNDE — LUZES* no carrinho de carga. Vê você do lado. Sorri, simpático, e estende a mão.

— Você deve ser ${c.eu.g==='f'?'a irmã':'o irmão'} do Tunde. Graham Whitfield. Eu trabalho com a Gemma. — Uma pausa. — E eu sou o ex de ${pdFA(c).ap}. Imagino que você já saiba.

Você aperta a mão. O ex. O que foi embora três semanas antes do casamento, segundo a cidade inteira.

— Vim um dia antes para ajudar com o que precisar — ele diz. — A Gemma me pediu, antes do retiro. — Ele olha o porto. — Como ${pdgA(c,'ele','ela')} está? De verdade?`,
 ops:[
  {t:'— Está bem. Trabalhando. Você sabe como é.',
   x:c=>`O Graham ri, baixinho.

— Eu sei. — Ele ajeita o suéter. — Escuta, só uma coisa. Eu sei que é estranho. Eu vir. Mas eu precisava ver ${pdgA(c,'ele','ela')} bem. Depois do que ${pdgA(c,'ele','ela')} fez, eu fiquei preocupado. Cancelar três semanas antes, sozinh${pdgA(c,'o','a')}, e deixar todo mundo achar que fui eu... — Ele para. Vê a sua cara. — Ah. Você não sabia.

Não. Você não sabia.

— ${pdgA(c,'Ele','Ela')} cancelou?

— Às quatro da manhã. Me ligou antes de ligar para a igreja. Disse que não queria. Que não era culpa minha. — Ele dá de ombros, triste. — E depois deixou a cidade inteira me odiar. Eu nunca desmenti. ${pdgA(c,'Ele','Ela')} me pediu. — Uma pausa. — Achei que ${pdgA(c,'ele','ela')} tinha contado para você. Do jeito que a Gemma fala de vocês dois.`,ef:{flag:'sabe_cancelou'}},
  {t:'— Por que você quer saber?',
   x:c=>`O Graham olha para você, surpreso com o tom.

— Porque eu gosto d${pdgA(c,'ele','ela')}. Ainda. De um jeito que já não é o de antes. — Ele suspira. — Olha, ${pdgA(c,'ele','ela')} deve ter te contado a versão de que eu fui embora. Todo mundo acha isso. Eu não fui. Foi ${pdgA(c,'ele','ela')} que cancelou. Às quatro da manhã. E me pediu para deixar todo mundo pensar que fui eu. — Ele dá de ombros. — Eu deixei. Era o mínimo. Mas eu não gosto de mentir para ${c.eu.g==='f'?'a irmã':'o irmão'} do noivo da minha colega. Então pronto. Agora você sabe.

Você sabe.`,ef:{flag:'sabe_cancelou'}},
  {t:'Voltar para a Gull House com a caixa de luzes. Agora.',se:c=>c.f('sabe_cancelou'),ir:'pd_c7_briga'},
  {t:'Voltar para a Gull House com a caixa de luzes',se:c=>!c.f('sabe_cancelou'),
   x:c=>`Você empurra o carrinho de volta pela Easton Street. O Graham vai junto, falando de arquitetura, de telhado de cedro, de como Nantucket é um caso raro de cidade que proibiu feiura por lei.

Na esquina da Gull House, ele para, e diz, como quem diz o tempo:

— ${pdgA(c,'Ele','Ela')} te contou que foi ${pdgA(c,'ele','ela')} que cancelou, né? O nosso casamento. Eu imagino que sim.

Não.`,ef:{flag:'sabe_cancelou'},ir:'pd_c7_briga'}
 ]});

no('pd_c7_depois',{cap:7,quem:'ab',tipo:'dividir',cada:1,lugar:'Nantucket',trilha:'tensao',hora:'Quinta, 15 de junho · tarde',
 texto:c=>`A tarde de quinta se divide sozinha, do jeito que as tardes se dividem quando duas pessoas se evitam numa ilha de vinte quilômetros.

A neblina entra pelo porto e não sai mais.`,
 pergunta:'Onde você passa a tarde?',
 ops:[
  {t:'Procurar o Graham e ter a conversa que você nunca teve, desde o telefonema das quatro da manhã',se:ehPA,
   x:c=>`O Graham está no Brotherhood of Thieves, no balcão, com um chowder. Você senta duas cadeiras para a direita.

— Desculpa — você diz. — Pelos nove meses. Por deixar a cidade inteira achar que foi você.

Ele mexe o chowder.

— Eu disse que tudo bem.

— Não estava tudo bem.

— Não. — Ele sorri, triste. — Mas eu entendi. Você nunca soube ser ajudada. Você só sabe ajudar. Isso foi o que eu entendi às quatro da manhã. Que eu nunca ia conseguir cuidar de você, porque você não deixava. — Ele levanta a colher. — Espero que um dia alguém consiga.

Você não diz nada. Ele não precisa que você diga.`,ef:{flag:'falou_graham',abalo:-1,motivo:'uma desculpa de nove meses'}},
  {t:'Ir ajudar a Dory a limpar as panelas em Madaket, e não pensar em nada',se:ehPA,at:'forca',
   ok:{x:c=>`Doze panelas de cinquenta litros. Esfregão de aço. Água do mar. A Dory não pergunta nada por duas horas. Na terceira, sem levantar os olhos da panela:

— Brigaram.

— Brigamos.

— Que bom. — Ela esfrega. — Quem não briga antes do casamento briga depois, e depois é mais caro.`,ef:{abalo:-1,motivo:'doze panelas'}},
   falha:{x:c=>`Você esfrega a primeira panela até as mãos arderem, e a segunda, e na terceira a Dory tira o esfregão da sua mão.

— Você está esfregando a panela como se a panela tivesse culpa. — Ela põe o esfregão de lado. — Senta. Toma um café. A panela não fez nada.`}},
  {t:'Sentar no banco debaixo da macieira com a sua mãe, e não dizer nada, e ver se ela diz',se:ehPB,
   x:c=>`Sua mãe está lá, de chapéu de palha. Você senta. Ela não olha.

Dez minutos de silêncio. Uma gaivota. O sino de boia.

— Você brigou com ${pdgA(c,'o','a')} Castellano — ela diz.

— Como você sabe?

— Uma porta fechou com força às dez da manhã. Eu ouvi do quintal. — Ela dobra o jornal. — O seu pai também fechava a porta com força. Antes de ir embora. Você não lembra. Você tinha um ano.

— Um ano? Ele foi embora quando eu tinha oito.

Sua mãe fica um tempo quieta. Depois diz:

— Ele foi embora duas vezes. A primeira você não lembra. — Ela levanta. — Sábado eu te conto. Depois do casamento. Se tiver casamento.`,ef:{flag:'funmi_quase'}},
  {t:'Reescrever o discurso. Versão dezenove. Do zero.',se:ehPB,at:'cabeca',
   ok:{x:c=>`Você arranca a versão dezoito do caderno. Dobra. Guarda no bolso, não no lixo.

Versão dezenove. *Meu irmão é a pessoa mais gentil que eu conheço. Ele escolhe devagar, porque quer escolher uma vez só.* E depois, uma terceira frase, que não é sobre dúvida nem sobre o pai:

*E se ele está aqui hoje, é porque escolheu. Eu confio na escolha dele. Eu aprendi essa semana que confiar é a parte que eu nunca soube fazer.*

Você olha a frase. Não é mentira. Também não é tudo. Mas é a primeira vez que você escreve sobre confiar sem que pareça uma prova de química.`,ef:{flag:'discurso19',vinc:1,motivoV:'uma frase sobre confiar'}},
   falha:{x:c=>`Versão dezenove. *Meu irmão é a pessoa mais gentil que eu conheço.* E depois, nada. De novo. A segunda frase não vem, e você sabe por quê. A segunda frase depende do que o Tunde vai fazer, e o Tunde está em Vermont, em silêncio.`}}
 ],
 prox:'pd_c7_recados'});

no('pd_c7_fim',{cap:7,quem:'ab',tipo:'fim',lugar:'Steamboat Wharf',trilha:'noite',hora:'Quinta, 15 de junho · 20h40',
 npcs:['gemma','tunde'],
 texto:c=>`${c.f('recado_ps_a')&&c.f('recado_ps_b')?'Os dois recados chegam com o mesmo P.S., na mesma letra caprichada da Pippa. Ninguém responde por escrito. Às sete, aparecem dois pratos feitos na bancada da cozinha, cobertos com pano, e ninguém pergunta quem serviu qual.':c.f('recado_ps_a')||c.f('recado_ps_b')?'Um dos recados chega com um P.S. de duas palavras. A Pippa entrega o papel e fica esperando a resposta, que não vem. Ela conta como vitória mesmo assim.':'Os recados chegam secos e cumprem o que prometem. A Pippa guarda os dois papéis na terceira agenda, por via das dúvidas.'}

Oito e quarenta da noite. A última balsa de quinta, a lenta, encosta no Steamboat Wharf no meio da neblina, com a buzina grave tocando de minuto em minuto.

Ninguém foi buscar ninguém. Ninguém sabia.

Da prancha, de mochila, de chinelo, com a pele bronzeada de cinco dias de silêncio no mato de Vermont, descem dois: uma mulher de vinte e nove anos com o riso alto, os pés descalços com o chinelo na mão, e um homem de trinta e um, quieto, de casaco de capuz, com os olhos de quem não dormiu no carro.

A Gemma e o Tunde. Um dia e meio antes do previsto. O retiro acabou na quarta à noite, porque o lago encheu com a chuva e o mestre de meditação achou que era um sinal.

A Gemma sai correndo pela Easton Street, de chinelo na mão, gritando o nome de ${pdFA(c).ap} na neblina, para a Gull House inteira acordar.

O Tunde vem atrás, devagar. Na esquina da Gull House, para. Olha a varanda, as hortênsias, a janela da cozinha com a luz acesa e a lousa com o placar.

E então ele faz uma coisa que ninguém esperava. Passa por ${pdb(c)}, na varanda, com um aceno curto. E vai direto até ${ehPA(c)?'você':pda(c)}.

— Posso falar com você? — ele pergunta. — Só você. Agora.`,
 prox:'pd_c8_tunde'});
