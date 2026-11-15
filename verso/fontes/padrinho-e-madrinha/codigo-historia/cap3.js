/* ================= PADRINHO E MADRINHA · CAPÍTULO 3 · LAGOSTA E VINHO ================= */

no('pd_c3_inicio',{cap:3,quem:'ab',tipo:'segue',lugar:'Cozinha da Gull House',trilha:'abertura',hora:'Segunda, 12 de junho · 7h30',
 npcs:['barnaby','rosa','funmi','pippa'],
 texto:c=>`Café da manhã na Gull House: o Barnaby faz ovos mexidos, torrada de pão de forma e café de coador, e não aceita reclamação nem elogio.

Na mesa comprida da cozinha, de um lado, a Rosa Castellano, de robe de seda, lendo em voz alta, com lágrimas, as mensagens de felicitação dos primos de Nápoles. Do outro, a juíza Funmi Okoro, de vestido de algodão, lendo o *Inquirer and Mirror*, o jornal da ilha, com um lápis na mão, corrigindo os erros de concordância.

As duas não se olham. Entre as duas, o pote de geleia de framboesa, como uma fronteira.

A Pippa entra com as três agendas, atualiza a tabela da parede, e risca uma linha: *Bufê: Dory Barros. Prova: hoje, 19h, Madaket.* E embaixo, em vermelho, outra que ninguém riscou ainda: *Licença do condado (14.c). Prazo: quarta, 17h30.*

O dia se divide sozinho.`,
 prox:c=>pdPor(c,'pd_c3_a','pd_c3_b')});

no('pd_c3_a',{cap:3,quem:'solo',lugar:'Varanda da Gull House',trilha:'tensao',hora:'Segunda, 12 de junho · 9h00',
 npcs:['pippa'],
 texto:c=>`Na varanda, entre as hortênsias, com o notebook aberto no colo e o celular do lado. Nove da manhã.

Uma mensagem nova, às oito e quarenta e sete, de um número que você ainda não apagou:

*Oi. Vi que fiquei na mesa onze. Do lado de um tio Sal. A Gemma me convidou há um ano, antes de tudo. Se for estranho para você, eu não vou. É só dizer. — G.*

O Graham. Arquiteto, colega da Gemma no escritório, simpático, de suéter no ombro. O homem com quem você ia se casar em primeiro de outubro do ano passado, na igreja de St. Leonard, no North End, com duzentos convidados e uma banda de swing. O homem que, segundo a cidade inteira, foi embora três semanas antes.

Ele não foi embora.

A Pippa aparece na porta de tela com duas canecas de café.

— Posso perguntar uma coisa? — Ela senta no degrau. — É verdade que ele te largou? O Graham? A minha mãe leu no Instagram de alguém.`,
 ops:[
  {t:'— Verdade. Ele foi embora. Está tudo bem. Já passou.',
   x:c=>`Sai fácil. Sai como sempre sai, com o sorriso de trabalho. Você disse essa frase umas quarenta vezes em oito meses. Para clientes, para a sua mãe, para a cabeleireira.

A Pippa faz que sim, com pena, e aperta a sua mão.

— Ele é um idiota — ela diz.

Ele não é. Você bebe o café.`,ef:{flag:'mentiu_pippa',abalo:1,motivo:'a frase de sempre'}},
  {t:'— É complicado. Não foi exatamente assim. Um dia eu te conto.',
   x:c=>`A Pippa olha para você um tempo comprido, com o café parado no meio do caminho até a boca.

— Tá — ela diz. — Um dia. — E depois, baixinho: — Eu sempre achei esquisito. Você nunca chorou. No escritório. Nenhuma vez. Quem é largado chora.

Ela levanta e volta para dentro, antes que você precise responder.`,ef:{flag:'quase_pippa'}},
  {t:'Responder ao Graham',
   x:c=>`Você escreve. Apaga. Escreve de novo.

*Não é estranho. Vem. A Gemma quer você lá. — ${pdFA(c).ap.charAt(0)}.*

Manda. Olha a tela. Três pontinhos aparecem do outro lado. Somem. Aparecem de novo.

*Obrigado. E você ainda não contou para ninguém, né?*

Você não responde essa.`,ef:{flag:'graham_vem'}},
  {t:'Ligar para a vigilância sanitária do condado e descobrir como se tira uma licença de bufê em dois dias',at:'labia',
   ok:{x:c=>`A funcionária da vigilância sanitária do condado de Nantucket se chama Deb, atende no quarto toque, e tem a paciência de quem já ouviu todo tipo de pedido de casamento de verão.

— Licença de bufê em dois dias? Não existe. — Uma pausa. — Mas existe *licença temporária de evento*. Precisa de uma cozinha comercial licenciada na ilha como base. Alguém com licença de cozinha que assine como responsável. Aí a Dory cozinha lá, ou cozinha na praia com supervisão dessa cozinha, e o clube aceita.

— Quem na ilha tem cozinha licenciada e assinaria por uma desconhecida?

— Ah, querida — diz a Deb. — Isso aí é Nantucket. Você vai ter que perguntar.`,ef:{flag:'licenca_caminho',fa:1}},
   falha:{x:c=>`A vigilância sanitária do condado te deixa em espera por quarenta minutos com uma versão de flauta de *Sweet Caroline*. Quando alguém atende, é para dizer que o setor de licenças fecha às dez nas segundas.

São dez e um.`,ef:{abalo:1,motivo:'Sweet Caroline de flauta'}}},
  {t:'Às seis e meia, entrar na caminhonete. Madaket.',ir:'pd_c3_praia'}
 ]});

no('pd_c3_b',{cap:3,quem:'solo',lugar:'Quintal da Gull House',trilha:'tensao',hora:'Segunda, 12 de junho · 9h00',
 npcs:['funmi','barnaby'],
 texto:c=>`O quintal dos fundos da Gull House é uma estufa de vidro meio torta, vinte e quatro vasos de hortênsia azul e um banco de madeira debaixo de uma macieira que não dá maçã.

Sua mãe está sentada no banco, de chapéu de palha, com o *Inquirer and Mirror* dobrado no colo. Ela não está lendo. Está olhando a estufa.

Você senta do lado. Ela não olha para você. Fala para a estufa.

— O seu irmão te ligou. Antes do retiro.

Não é pergunta. Ela foi juíza trinta anos. Ela não faz pergunta quando já sabe a resposta.`,
 ops:[
  {t:'— Ligou.',
   x:c=>`Uma palavra só. Verdadeira. Você não consegue dizer menos do que isso e não quer dizer mais.

Sua mãe faz que sim, devagar, olhando a estufa.

— E você não vai me dizer o que ele disse.

— Ele pediu.

— Então não diz. — Ela dobra o jornal em quatro. — Você nunca soube mentir, ${pdFB(c).ap}. Desde pequen${c.eu.o}. Quando você não fala, eu sei que é porque é grave. — Ela levanta. — Eu prefiro não saber. Por enquanto. Eu já soube uma vez, de manhã, num dia de casamento. Uma vez basta.

Ela entra. Você fica no banco, com a frase dela pendurada na macieira.`,ef:{flag:'funmi_sabe_ligou',abalo:1,motivo:'uma vez basta'}},
  {t:'— Mãe. O que aconteceu em 1989?',
   x:c=>`Sua mãe vira a cabeça e olha para você pela primeira vez desde que você sentou.

É o olhar de juíza. O de quando um advogado faz uma pergunta que não devia.

— Outro dia — ela diz.

— Você sempre diz outro dia.

— E um dia vai ser outro dia. — Ela levanta. Ajeita o chapéu. — Você mudou de assunto. Isso quer dizer que ele te ligou, e que é grave. — Uma pausa. — Obrigada por não mentir. Você sempre foi ruim nisso. Eu sempre gostei disso em você.`,ef:{flag:'perguntou_1989'}},
  {t:'Tirar da carteira um guardanapo de pano dobrado em quatro, e olhar, sem desdobrar',
   x:c=>`Quando sua mãe entra, você tira a carteira do bolso de trás. Entre a carteira de motorista e o cartão da biblioteca de Providence, um guardanapo de pano branco, dobrado em quatro, com o bordado de um *A* azul no canto. O Alba.

Você não desdobra. Você sabe o que está escrito. Você leu umas trezentas vezes em dois anos.

Você guarda de novo. Não sabe por que guardou, há dois anos, na hora de ir embora, quando ${pdFA(c).ap} já tinha saído. Não sabe por que ainda guarda. É o tipo de pergunta que você não faria para um aluno, porque a resposta é óbvia e constrangedora.`,ef:{flag:'guardanapo'}},
  {t:'Pesquisar quem na ilha tem licença de cozinha comercial e poderia assinar pela Dory',at:'cabeca',
   ok:{x:c=>`O banco de dados de licenças do condado é um site de 2004 com fundo cinza. Você filtra: *cozinha comercial, ativa, Nantucket*. Quarenta e um resultados. Restaurantes, hotéis, a escola, o hospital.

E na linha vinte e oito: *Gull House Inn. Cole, Barnaby J. Cozinha comercial classe B. Emitida em 1991. Renovada anualmente. Ativa.*

Você olha pela janela da estufa. O Barnaby, de avental de lona, está regando hortênsia com um regador de lata.

— A Gull House servia café da manhã para quarenta hóspedes até 2009 — ele diz, sem virar, quando você sai com o celular na mão. — A minha mulher cozinhava. Eu nunca deixei a licença vencer. — Ele rega. — Não me pergunta por quê. A resposta é óbvia e constrangedora.`,ef:{flag:'licenca_barnaby',fa:1}},
   falha:{x:c=>`O site de licenças do condado é de 2004 e cai três vezes. Na terceira, você desiste e vai ajudar o Barnaby a regar hortênsia, que é uma coisa que pelo menos tem resultado visível.`}},
  {t:'Às seis e meia, entrar na caminhonete. Madaket.',ir:'pd_c3_praia'}
 ]});

no('pd_c3_praia',{cap:3,quem:'ab',tipo:'segue',lugar:'Praia de Madaket',trilha:'mar',hora:'Segunda, 12 de junho · 19h00',
 npcs:['dory'],
 texto:c=>{ const L=[];
  L.push(`A praia de Madaket fica do lado oeste da ilha, onde o sol se põe no mar. Às sete da noite de junho, o céu está laranja, depois rosa, e a areia ainda está quente.

A Dory cavou um buraco na areia do tamanho de uma banheira, forrou de pedra, acendeu lenha em cima da pedra às quatro da tarde, e agora, em cima da pedra em brasa, uma camada de alga molhada, e em cima da alga, lagosta, milho na palha, batata vermelha, cebola inteira, chouriço português e mariscos, e por cima de tudo, outra camada de alga, e uma lona molhada. Uma fumaça branca sobe, com cheiro de mar cozinhando.

— *Clambake* — diz a Dory. — Mas do jeito da minha avó, com chouriço. Os americanos esquecem o chouriço.`);
  if(c.f('licenca_caminho')||c.f('licenca_barnaby')) L.push(`${c.f('licenca_barnaby')?`Antes de qualquer outra coisa, vocês dois já sabem que o Barnaby assina: a Gull House tem cozinha comercial licenciada desde 1991.`:`Vocês já sabem que a licença temporária de evento precisa de uma cozinha licenciada na ilha que assine por vocês.`}${c.f('licenca_barnaby')&&c.f('licenca_caminho')?`

A vigilância sanitária aceita licença temporária com cozinha base. Um dos dois ligou de manhã e descobriu.

Os dois se olham. Cada um tinha meia resposta.`:''}

A Dory para de mexer a lona. Olha para os dois.

— O Barnaby Cole — ela diz. — Aquele velho rabugento. — Ela ri. — Ele vai assinar. A mulher dele, a Ruth, era a minha melhor amiga. Ela morreu em 2009. Ele nunca deixou a licença vencer.`);
  else L.push(`A Dory pergunta da licença. Ninguém tem resposta ainda. Ela dá de ombros e volta para a lona.

— Amanhã vocês descobrem. Hoje vocês comem.`);
  L.push(`Ela abre a lona. A fumaça sobe numa nuvem que tapa o pôr do sol. Quando a fumaça baixa, na mesa de piquenique de madeira, em pratos de papel, tem uma lagosta vermelha para cada um, milho, batata, chouriço, e manteiga derretida num pote de vidro.`);
  return L.join('\n\n') },
 prox:'pd_c3_maos'});

no('pd_c3_vinho',{cap:3,quem:'ab',tipo:'dialogo',lugar:'Praia de Madaket',trilha:'romance',hora:'Segunda, 12 de junho · 21h30',
 texto:c=>`Nove e meia. A lagosta acabou. A primeira garrafa também. A segunda está pela metade, enterrada na areia para continuar gelada. Os sapatos de alguém estão dentro de um balde de mariscos vazio. O céu ainda tem uma faixa verde no horizonte, que só existe no fim de junho, nessa latitude, por uns dez minutos.

Vocês estão sentados na areia, encostados no banco da mesa de piquenique, com os pés quase no mar.`,
 comeca:E=>lsSeat(E,PD_B),
 falas:[
  {p:'Você fala primeiro. O vinho ajuda.',ops:c=>[
   {t:'— Onze ligações. Naquela noite. Eu contei.',tom:'seco',tag:'onze'},
   {t:'— Por que você saiu antes da sobremesa? A verdade.',tom:'abre',tag:'porque'},
   {t:'— Essa é a melhor lagosta que eu já comi. Eu odeio admitir isso perto de você.',tom:'flerte',tag:'lagosta'}
  ]},
  {p:'Sua vez. A faixa verde no horizonte.',ops:(c,h)=>[
   ...(h[0].tag==='onze'?[{t:'— Era a noite de um casamento em Newport que estava desmoronando. A noiva ligou onze vezes, chorando. Eu atendi as onze porque ninguém mais atendia ela.',tom:'abre',tag:'noiva'}]:[]),
   ...(h[0].tag==='porque'?[{t:'— Porque você estava interessante. E eu tinha um casamento no dia seguinte. E pessoas interessantes atrapalham.',tom:'abre',tag:'interessante'}]:[]),
   ...(h[0].tag==='lagosta'?[{t:'— Admitir o quê? Que você é capaz de gostar de alguma coisa?',tom:'flerte',tag:'gostar'}]:[])
  ]},
  {p:'De volta para você. A garrafa enterrada na areia.',ops:(c,h)=>[
   ...(h[1].tag==='noiva'?[{t:'— Você não disse isso. Naquela noite. Você só atendeu.',tom:'abre',tag:'naodisse'}]:[]),
   ...(h[1].tag==='interessante'?[{t:'— Interessante. — (Uma pausa.) — Ninguém nunca me chamou de interessante. Os alunos me chamam de Mol.',tom:'flerte',tag:'mol'}]:[]),
   ...(h[1].tag==='gostar'?[{t:'— Eu gosto de muita coisa. Eu gosto da tabela periódica. Eu gosto de café ruim. Eu gosto de...',tom:'flerte',tag:'gosta'}]:[])
  ]},
  {p:'Sua vez.',ops:(c,h)=>[
   ...(h[2].tag==='naodisse'?[{t:'— Você não perguntou. Você explicou a reação de Maillard.',tom:'flerte',tag:'maillard'}]:[]),
   ...(h[2].tag==='mol'?[{t:'— Mol. Seis vírgula zero dois vezes dez elevado a vinte e três. Eu pesquisei. Dois anos atrás. Depois do jantar.',tom:'abre',tag:'pesquisou'}]:[]),
   ...(h[2].tag==='gosta'?[{t:'— De quê? Termina a frase.',tom:'flerte',tag:'termina'}]:[])
  ]},
  {p:'A última. O mar está subindo, nos pés.',ops:(c,h)=>[
   ...(h[3].tag==='maillard'?[{t:'— Eu explico química quando eu fico nervos'+c.eu.o+'. Eu fiquei nervos'+c.eu.o+' a noite inteira.',tom:'abre'}]:[]),
   ...(h[3].tag==='pesquisou'?[{t:'— Você pesquisou o meu apelido.',tom:'flerte'}]:[]),
   ...(h[3].tag==='termina'?[{t:'(Não terminar a frase. Olhar. Demorar demais olhando.)',tom:'flerte',acao:true}]:[]),
   {t:'(Tirar a garrafa da areia e servir os dois copos de plástico até a boca.)',tom:'cuida',acao:true}
  ]}
 ],
 prox:'pd_c3_noite'});

no('pd_c3_noite',{cap:3,quem:'ab',tipo:'dividir',secreto:true,cada:1,lugar:'Praia de Madaket',trilha:'romance',hora:'Segunda, 12 de junho · 22h00',
 texto:c=>`A segunda garrafa acabou. A faixa verde no horizonte também. Ficou a lua, e o barulho do mar, e uma brasa vermelha ainda viva no buraco da Dory, debaixo da alga.

Os dois estão de pé, descalços, na beira da água, sem lembrar quem levantou primeiro. Perto. Mais perto do que duas pessoas que se odeiam ficam numa praia vazia.

Ninguém está olhando. A ilha inteira está dormindo. E amanhã, se for preciso, dá para dizer que foi o vinho.`,
 pergunta:'O que você quer?',
 ops:[
  {t:'Beijar. E não pensar no amanhã até amanhã.',ambos:true,ef:lsSim('noite3'),x:c=>`${c.Q} dá o último passo.`},
  {t:'Ficar aqui, perto, e não atravessar. Ainda não.',ambos:true,x:c=>`${c.Q} fica onde está, com o mar nos pés, e não se mexe.`}
 ],
 prox:c=>lsNoite(c,'noite3')?'pd_c3_sim':'pd_c3_nao'});

no('pd_c3_sim',{cap:3,quem:'ab',tipo:'segue',lugar:'Gull House · quarto três',trilha:'romance',hora:'Terça, 13 de junho · 6h10',
 ef:{flag:'noite3_sim',fa:1},
 texto:c=>`O beijo tem gosto de sal, de manteiga e de vinho verde. Não tem nada de tímido, e não tem nada de engraçado, e nenhum dos dois explica nada, quimicamente ou não.

A Dory volta às dez e cinco. Encontra a mesa limpa, as garrafas vazias, nenhuma lagosta, e a caminhonete do Barnaby saindo da estrada de terra com os faróis acesos. Ela sorri sozinha e apaga a brasa com um balde de água do mar.

Na Gull House, o banheiro do meio tem duas portas. A tranca do três está quebrada desde 1997. Esta noite, ninguém tenta trancar nada.

—

Seis e dez da manhã.

Luz cinza de neblina pela janela do quarto três. O sino de boia do porto. Uma gaivota no telhado. Um vestido azul-marinho no chão, uma camisa de linho em cima da cadeira, uma pasta de couro esquecida aberta em cima da cômoda, na aba *Bolo*.

Duas pessoas acordadas, as duas fingindo que não estão.`,
 prox:'pd_c3_manha'});

no('pd_c3_nao',{cap:3,quem:'ab',tipo:'segue',lugar:'Praia de Madaket',trilha:'romance',hora:'Terça, 13 de junho · 6h10',
 ef:{flag:'noite3_nao',vinc:1,motivoV:'a noite inteira na praia, sem atravessar'},
 texto:c=>`Ninguém atravessa. Os dois ficam na beira da água, perto, até a maré subir até os joelhos, e então voltam para a mesa de piquenique, e sentam no banco, lado a lado, com a lona da Dory por cima dos ombros, porque esfriou.

A Dory volta às dez e cinco. Encontra os dois sentados no banco, debaixo da lona, falando baixo. Ela não interrompe. Deixa uma garrafa térmica de café na mesa, e duas bolachas de água e sal, e vai embora de novo, a pé, até a casa dela, do outro lado da enseada.

Vocês conversam até as três. Sobre a escola de Providence e os alunos que comem giz. Sobre casamentos em Newport que desmoronam. Sobre pais. Sobre nada que dê para contar para os irmãos.

—

Seis e dez da manhã.

Luz cinza de neblina. Uma gaivota. A brasa apagada. Duas pessoas dormindo sentadas no banco de uma mesa de piquenique, encostadas uma na outra, debaixo de uma lona molhada que cheira a alga.

Uma acorda. A outra também. As duas fingem que não.`,
 prox:'pd_c3_manha'});

