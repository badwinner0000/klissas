/* ================= PADRINHO E MADRINHA · CAPÍTULO 4 · cenas novas e reescritas ================= */

no('pd_c4_ashby',{cap:4,quem:'ab',tipo:'segue',lugar:'Nantucket Yacht Club',trilha:'abertura',hora:'Terça, 13 de junho · 10h30',
 npcs:['ashby','pippa','rosa'],
 texto:c=>`O Nantucket Yacht Club é uma casa branca comprida de frente para o porto, com bandeirinhas de sinal náutico e um gramado que desce até a água. O gerente se chama Mr. Ashby, usa blazer azul com âncora bordada no bolso e fala de casamento como quem fala de regata que pode virar.

— O terraço comporta cento e sessenta — ele diz, andando na frente. — O gramado de cima, duzentos. O gramado de baixo, junto da água, não comporta ninguém. É regulamento, desde 1952.

— O que aconteceu em 1952? — pergunta a Pippa, que veio com as três agendas e uma fita métrica.

— A filha do comodoro — responde o Mr. Ashby, e fica por isso.

A Rosa veio também, sem convite, de chapéu de aba larga, *para ver o gramado com os próprios olhos*. Ela para diante de uma fotografia em preto e branco na parede do bar: uma tenda, uma noiva, uma fila de homens de paletó branco. A tenda está armada no gramado de baixo.

— Essa é a filha do comodoro?

— Essa é a tenda, senhora. A filha do comodoro é a que não aparece na foto.

Ele abre a porta de vidro para o gramado e espera todos passarem.

A regra do guardanapo está numa carteira${c.f('regra_dura')?', com o item 3 em vermelho':''}. Hoje vai ser fácil cumprir. É só não chegar perto.`,
 prox:'pd_c4_clube'});

no('pd_c4_porao',{cap:4,quem:'ab',tipo:'dialogo',lugar:'Depósito do Yacht Club',trilha:'romance',hora:'Terça, 13 de junho · 12h10',
 texto:c=>`No depósito do porão, entre duas pilhas de cadeira dobrável, cabe um metro e meio. Tem uma lâmpada só, pendurada pelo fio, que balança cada vez que alguém anda no bar lá em cima.

A regra do guardanapo está numa carteira, num bolso de trás, a menos de um metro e meio.`,
 comeca:E=>lsSeat(E,PD_A),
 falas:[
  {p:'Você fala primeiro. Baixo, sem motivo.',ops:c=>[
   {t:'— Eu vim contar as cadeiras.',tom:'seco',tag:'contar'},
   {t:'— A regra não fala nada de porão.',tom:'flerte',tag:'regra'},
   {t:'(Dar um passo para trás. As costas encontram uma pilha de cadeiras.)',tom:'seco',acao:true,tag:'recua'}
  ]},
  {p:'Sua resposta.',ops:c=>[
   {t:'— Cento e quarenta e duas. Duas quebradas. Eu já contei.',tom:'seco',tag:'contei'},
   {t:'— A regra foi escrita por duas pessoas com sono. Tem lacuna.',tom:'flerte',tag:'lacuna'},
   {t:'— Eu subo, se você preferir. É só falar.',tom:'cuida',tag:'subo'}
  ]},
  {p:'A lâmpada balança.',ops:c=>[
   {t:'— Então cento e quarenta. Fechou. Pode subir.',tom:'seco',tag:'fechou'},
   {t:'— Fica. O porão é grande. Tem um metro e meio inteiro.',tom:'abre',tag:'fica'},
   {t:'(Estender a mão e endireitar uma cadeira que não estava torta.)',tom:'flerte',acao:true,tag:'cadeira'}
  ]}
 ],
 prox:'pd_c4_foto'});

no('pd_c4_foto',{cap:4,quem:'ab',tipo:'dividir',secreto:true,cada:1,lugar:'Terraço do Yacht Club',trilha:'romance',hora:'Terça, 13 de junho · 12h30',
 npcs:['rosa','ashby','pippa'],
 texto:c=>`${c.f('deposito_a')&&c.f('deposito_b')?`Lá em cima, no bar, alguém arrasta uma mesa. A lâmpada do porão dá um pulo no fio. Uma cadeira escorrega do alto da pilha, sem que ninguém tenha encostado nela, e leva onze junto, uma atrás da outra, como dominó.

O barulho se ouve do terraço. A porta do porão abre. Lá no alto da escada, contra a luz, aparecem a Pippa, de fita métrica, o Barnaby, com um vaso de hortênsia, e a Rosa, de chapéu.

— As cadeiras caíram — informa o Mr. Ashby, de trás dos três, para o caso de restar dúvida.

`:''}Meio-dia e meia, no terraço. A Rosa quer uma foto *dos padrinhos, para mandar para a Gemma quando ela sair do retiro*. O Mr. Ashby segura o celular dela com dois dedos, como quem segura um peixe vivo.

A Rosa arruma a pose com as mãos. Mais perto. Mais perto. Um braço no ombro, isso.

— No três, olhem para a câmera — ela manda. — Um. Dois.`,
 pergunta:'No três, para onde você olha? (a outra pessoa só descobre na foto)',
 ops:[
  {t:'Para a câmera. Sorriso de foto.',ambos:true,x:c=>`${c.Q} olha para a câmera.`},
  {t:'Para o lado. Só um segundo.',ambos:true,ef:lsSim('olhou4'),x:c=>`${c.Q} olha para o lado.`}
 ],
 prox:'pd_c4_deposito'});

no('pd_c4_deposito',{cap:4,quem:'ab',tipo:'segue',lugar:'Terraço do Yacht Club',trilha:'romance',hora:'Terça, 13 de junho · 12h31',
 npcs:['pippa','barnaby','rosa'],
 ef:{pista:'pd_placar'},
 texto:c=>{ const a=c.f('olhou4_a'), b=c.f('olhou4_b');
  return `O Mr. Ashby tira catorze fotos em sequência, porque não sabe soltar o botão.

${a&&b?'Nas catorze, os dois estão se olhando. Ninguém olha para a câmera. Na sétima, tem alguém quase rindo.':a?`Nas catorze, ${pdb(c)} olha para a câmera com um sorriso de documento. ${Pda(c)} olha para o lado. Para ${pdb(c)}.`:b?`Nas catorze, ${pda(c)} olha para a câmera com o sorriso de trabalho. ${Pdb(c)} olha para o lado. Para ${pda(c)}.`:'Nas catorze, os dois olham para a câmera, duros, com um palmo de ar entre os ombros, como dois desconhecidos numa foto de formatura.'}

A Rosa pega o celular de volta e passa as fotos com o dedo. ${a||b?`Para de sorrir. Olha a tela. Olha os dois.

— Ah — ela diz. — *Ah.*`:`Franze a testa.

— Vocês parecem dois postes — ela diz. — Dois postes que brigaram.`}

A Pippa espia a tela por cima do ombro dela. Do estacionamento, de dentro da caminhonete, o Barnaby espia a Pippa.`},
 prox:'pd_c4_cozinha'});

no('pd_c4_b',{cap:4,quem:'solo',lugar:'Quintal da Gull House',trilha:'tensao',hora:'Terça, 13 de junho · 20h00',
 texto:c=>`Oito da noite. O banco debaixo da macieira que não dá maçã. Você está com o caderno preto aberto no discurso, versão dezessete, e o celular na outra mão, parado no recado do Tunde.

*Eu não sei se eu quero casar.*

Faltam quatro dias. Os noivos saem do retiro na quinta. Lá dentro, ${pdnA(c)} está montando uma festa de cento e quarenta convidados para um casamento que talvez não aconteça. E não sabe.

Você prometeu ao seu irmão. Você nunca escondeu nada de ninguém por mais de um dia. Amanhã faz doze.`,
 ops:[
  {t:'Ouvir o recado mais uma vez, até o último segundo',
   x:c=>`Você ouve até o fim. E repara numa coisa que tinha escapado nas outras vezes. No último segundo, antes de desligar, o Tunde solta o ar. Quase um riso. O som de quem conseguiu dizer.

Ele não pediu que você resolvesse nada. Pediu para falar em voz alta para alguém.

Você fica pensando em quanta gente nesta ilha está precisando da mesma coisa.`,ef:{flag:'ouviu_riso'}},
  {t:'Ensaiar, em voz baixa, como você contaria',
   x:c=>`Você ensaia três começos, para a estufa.

*Eu preciso te mostrar uma coisa.*

*O meu irmão me ligou antes do retiro.*

*Você vai ficar com raiva de mim.*

O terceiro é o mais honesto. Você anota os três na margem do discurso, em azul, e não risca nenhum.`,ef:{flag:'ensaiou',abalo:-1,motivo:'três começos'}},
  {t:'Tirar o guardanapo de papel da carteira e ler a regra',
   x:c=>`*1. Isso fica em Nantucket.*
*2. Ninguém conta para os irmãos.*
*3. ${c.f('regra_dura')?(c.f('noite3_sim')?'Não acontece de novo.':'Não vai acontecer.'):'O resto a gente vê.'}*

O item 2 fala de irmãos. Foi escrito para uma coisa pequena, de praia. Agora serve para uma coisa enorme, e ninguém combinou isso.

Você dobra o guardanapo de papel e guarda. Na carteira, ele fica encostado em outro, de pano, mais velho.`,ef:{flag:'releu_regra'}},
  {t:'A porta de tela range. Alguém vem vindo pelo quintal.',ir:'pd_c4_macieira'}
 ]});

no('pd_c4_macieira',{cap:4,quem:'ab',tipo:'dialogo',lugar:'Quintal da Gull House · debaixo da macieira',trilha:'tensao',hora:'Terça, 13 de junho · 20h30',
 texto:c=>`Oito e meia. O banco debaixo da macieira dá para dois, com um palmo de sobra. No colo de ${pdb(c)}, um caderno preto aberto e um celular com a tela acesa.

Da cozinha vem a risada da Rosa, ao telefone, em italiano.`,
 comeca:E=>lsSeat(E,PD_B),
 falas:[
  {p:'Você decide o que fazer com o que sabe.',ops:c=>[
   {t:'(Estender o celular e apertar o play. A voz do Tunde, baixa, de dentro de um carro parado: *Eu não sei se eu quero casar.*)',tom:'abre',acao:true,tag:'contou',ef:{flag:'contou_a_tunde',vinc:1,motivoV:'a verdade, mesmo fora de hora'}},
   {t:'— O meu irmão me ligou antes do retiro. Estava nervoso. É isso.',tom:'seco',tag:'meia',ef:{flag:'mentiu_tunde',abalo:2,motivo:'a primeira meia verdade em anos'}},
   {t:'— É o discurso. Versão dezessete. Eu não consigo passar da primeira frase.',tom:'abre',tag:'discurso',ef:{flag:'discurso_ajuda'}}
  ]},
  {p:'Sua resposta.',ops:(c,h)=>h[0].tag==='contou'?[
   {t:'— Dois de junho. Você sabe disso há onze dias. E me deixou contratar uma lagosteira.',tom:'seco',tag:'onze'},
   {t:'— Obrigad'+c.eu.o+' por me mostrar. Eu ainda não sei o que fazer com isso.',tom:'abre',tag:'obrig'},
   {t:'— Isso não muda nada. A festa continua. Se ele tem dúvida, resolve com a Gemma na quinta. A verdade pode esperar a festa.',tom:'seco',tag:'espera',ef:{flag:'a_espera'}}
  ]:h[0].tag==='meia'?[
   {t:'— Tá. Ele estava nervoso.',tom:'seco',tag:'ta'},
   {t:'— Você é a pessoa que não sabe mentir. Então eu vou acreditar. Por enquanto.',tom:'cuida',tag:'acredito'},
   {t:'— Todo noivo fica nervoso. Eu já vi um fugir pela janela do banheiro, em Cape Cod. Voltou em vinte minutos.',tom:'flerte',tag:'janela'}
  ]:[
   {t:'— A segunda frase é sempre a pior. Na primeira você diz quem ele é. Na segunda, do que você tem medo por ele.',tom:'cuida',tag:'segunda'},
   {t:'(Pegar o caderno, sem pedir, e ler a versão dezessete até o fim. São onze palavras.)',tom:'flerte',acao:true,tag:'le'},
   {t:'— Eu já ouvi uns duzentos discursos de padrinho. Os ruins são sobre o noivo. Os bons são sobre medo.',tom:'seco',tag:'duzentos'}
  ]},
  {p:'De volta para você.',ops:(c,h)=>h[0].tag==='contou'?[
   {t:'— Eu prometi a ele. Acabei de quebrar a promessa. Com você.',tom:'abre',tag:'quebrei'},
   {t:'— A verdade não espera. Ela só fica mais cara.',tom:'seco',tag:'naoespera'},
   {t:'— Eu não sei mentir, e você mente por ofício. Alguém neste banco tinha que contar.',tom:'flerte',tag:'oficio'}
  ]:h[0].tag==='meia'?[
   {t:'(Fechar o caderno. Olhar a estufa. Não acrescentar nada.)',tom:'seco',acao:true,tag:'fecha'},
   {t:'— Quando eu puder dizer mais, eu digo. Para você antes de qualquer pessoa.',tom:'abre',tag:'primeiro'},
   {t:'— Você acredita fácil, para quem trabalha com noiva.',tom:'flerte',tag:'facil'}
  ]:[
   {t:'— Do que eu tenho medo por ele, eu sei. É justamente o que eu não posso escrever.',tom:'abre',tag:'sei'},
   {t:'— Lê em voz alta. Na sua voz fica parecendo que está pronto.',tom:'flerte',tag:'voz'},
   {t:'(Escrever uma segunda frase ali mesmo. Riscar. Não esconder o risco.)',tom:'cuida',acao:true,tag:'risco'}
  ]},
  {p:'Você fecha. A luz da cozinha apaga.',ops:c=>[
   {t:'— Vai dormir. Amanhã cedo tem aula de dança com uma senhora de oitenta e um anos.',tom:'cuida',tag:'dormir'},
   {t:'— Fica mais cinco minutos. Sem falar de casamento.',tom:'abre',tag:'fica'},
   {t:'(Levantar. Parar na porta de tela. Demorar para abrir.)',tom:'seco',acao:true,tag:'porta'}
  ]}
 ],
 prox:'pd_c4_parede'});

no('pd_c4_parede',{cap:4,quem:'ab',tipo:'dividir',secreto:true,cada:1,lugar:'Gull House · quartos três e quatro',trilha:'noite',hora:'Terça, 13 de junho · meia-noite',
 texto:c=>`Meia-noite. Quarto três e quarto quatro. O banheiro no meio, com duas portas e a tranca do três quebrada desde 1997.

A mesma parede de tábua. ${lsNoite(c,'bateu1')?'No sábado, ela respondeu.':c.f('bateu1_a')||c.f('bateu1_b')?'No sábado, alguém bateu nela e ficou sem resposta.':'No sábado, ninguém encostou nela.'}

${c.f('noite3_sim')?'A regra do guardanapo está dobrada numa carteira. Ninguém tira a carteira do bolso para conferir o item 3.':'Oficialmente, ninguém atravessou nada até hoje.'}`,
 pergunta:'O que você faz? (a outra pessoa só fica sabendo depois)',
 ops:[
  {t:'Bater na parede. Duas vezes.',ambos:true,ef:lsSim('bateu4'),x:c=>`${c.Q} bate na tábua, duas vezes.`},
  {t:'Deixar a parede em paz e olhar o teto.',ambos:true,x:c=>`${c.Q} cruza as mãos atrás da cabeça e olha o teto de 1840.`}
 ],
 prox:'pd_c4_fim'});

no('pd_c4_fim',{cap:4,quem:'ab',tipo:'fim',lugar:'Gull House · quartos três e quatro',trilha:'noite',hora:'Terça, 13 de junho · meia-noite e vinte',
 texto:c=>`${lsNoite(c,'bateu4')?'Duas batidas de um lado. Duas do outro, quase em cima. Desta vez ninguém esperou para ver se a resposta vinha.':c.f('bateu4_a')||c.f('bateu4_b')?'Duas batidas, de um lado só. Do outro, alguém olha o teto e escuta, e fica com as duas batidas guardadas, sem devolver.':'Ninguém bate. Dos dois lados da tábua, duas pessoas olham o mesmo teto.'}

${c.f('contou_a_tunde')?'Entre os dois quartos existe agora um segredo com dois donos. Ele pesa diferente de cada lado da parede.':c.f('mentiu_tunde')?'Entre os dois quartos existe agora uma meia verdade. Só um lado da parede sabe o tamanho da metade que faltou.':'Entre os dois quartos existe uma coisa que um lado sabe e o outro não. Por enquanto ela não faz barulho.'}

Amanhã cedo, aula de dança. A valsa dos padrinhos: *Moon River*, três minutos e meio. A Pippa marcou com uma professora da ilha, uma senhora de oitenta e um anos que dançou com o Fred Astaire em 1958, segundo ela, e com mais ninguém desde então que valesse o trabalho.`,
 prox:'pd_c5_aula'});
