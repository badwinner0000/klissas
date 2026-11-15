/* ================= PADRINHO E MADRINHA · CAPÍTULO 9 · cenas novas e reescritas ================= */

no('pd_c9_a',{cap:9,quem:'solo',lugar:'Nantucket Yacht Club · suíte da noiva',trilha:'romance',hora:'Sábado, 17 de junho · 9h40',
 npcs:['gemma','rosa'],
 texto:c=>`A suíte da noiva tem uma janela de frente para o porto, um sofá de linho cor de areia e, neste momento, quatro mulheres e nenhum lugar para sentar. A Rosa chora com antecedência, para ganhar tempo. A tia Concetta tem catorze grampos na boca e opinião sobre cada um. A cabeleireira de Hyannis pede, pela terceira vez, que alguém tire os pés de cima da cadeira dela.

A Gemma está no meio de tudo, de roupão, descalça, comendo morango de um prato de papel, como quem espera um ônibus.

Você chega com a pasta debaixo do braço e três carregadores de celular. A Gemma levanta os olhos e, sem pedir licença a ninguém, dá uma ordem em voz baixa:

— Todo mundo fora. Cinco minutos. ${pda(c)} fica.

${c.f('a_verdade')?'Ela já sabe de muita coisa. Você sabe que ela sabe. Isso torna os cinco minutos mais longos, e não mais curtos.':'Quando a porta fecha, o quarto fica de um tamanho que você não tinha visto. Ela larga o prato, senta no braço do sofá e fala olhando para o porto.'}

— Você está esquisit${c.eu.o} a semana inteira — ela diz. — Sorri para tudo. Resolve tudo antes de eu perguntar. Você faz isso desde pequena. Quando você está bem, você pede coisas. Você não pediu nada desde domingo.`,
 ops:[
  {t:'Contar à Gemma que foi você quem cancelou o seu casamento',se:c=>!c.f('a_verdade')&&!c.f('a_contou_gemma9')&&!c.f('a_escondeu9')&&!c.f('a_perguntou9'),at:'coragem',
   ok:{x:c=>`Você senta no braço do sofá, ao lado dela, e diz tudo em uma frase só, rápida, antes que a voz de trabalho assuma: o Graham não largou você. Foi você. Em setembro, três semanas antes. E deixou todo mundo achar outra coisa durante nove meses, incluindo ela.

A Gemma não diz nada. Pega um morango, olha, devolve para o prato.

— Eu sempre achei que foi isso — ela diz, por fim. — Você nunca chorou. Quem é largada chora. — Ela encosta o ombro no seu. — Eu estava esperando você me contar. Eu não ia perguntar. Era seu.

Ela pega a sua mão, a do pulso com a almofadinha de alfinetes, e conta os alfinetes até dez, como você faz.

— Obrigada por me contar hoje — ela diz. — No dia em que eu mais precisava de uma pessoa que também tem medo.`,ef:{flag:'a_contou_gemma9',vinc:1,motivoV:'a verdade, dita à irmã',abalo:-1,motivo:'dizer em voz alta'}},
   falha:{x:c=>`Você abre a boca. Sai: *o Graham e eu...* E a porta abre. É a Rosa, de lenço na mão, com a notícia de que a tia Bisi trouxe o turbante errado, um amarelo, e que *isso é um sinal*.

A Gemma ri. Você ri. A frase some no meio das duas risadas, de um jeito que você já conhece, porque a empresa inteira foi construída em cima de frases que somem.`,ef:{abalo:1,motivo:'a frase que sumiu'}}},
  {t:'Dizer que está tudo bem e pôr o véu nela',se:c=>!c.f('a_contou_gemma9')&&!c.f('a_escondeu9')&&!c.f('a_perguntou9'),
   x:c=>`Você diz que é só o cansaço da semana. Pega o véu da tia Concetta, que o segurava como se segurasse um passarinho, e prende, grampo por grampo. Catorze.

A Gemma deixa. Fica quieta o tempo todo, olhando você pelo espelho. Quando você termina, ela segura o seu pulso, devagar.

— Pequeno ajuste — ela diz, bem baixo.

Você não responde. Ela solta o seu pulso.`,ef:{flag:'a_escondeu9',abalo:1,motivo:'o véu e o silêncio'}},
  {t:'Perguntar primeiro: "E você? Como está?"',se:c=>!c.f('a_contou_gemma9')&&!c.f('a_escondeu9')&&!c.f('a_perguntou9'),
   x:c=>`${pdGemmaSabe(c)?'A Gemma respira fundo. Ela tem uma resposta, e é uma só.\n\n— Com medo. — Ela sorri. — Mas é medo de quem sabe de que tem medo. É outro tipo. Eu aprendi ontem.':'A Gemma pensa. Ela nunca pensa antes de responder, e agora pensa.\n\n— Feliz — ela diz. — Muito. Mas hoje de manhã eu acordei e o Tunde não estava deitado do lado, estava no chão da tenda, dormindo em cima de um cabo. Eu fiquei olhando um tempo. Eu não sei por que ele fez isso. — Ela mexe no morango. — Você sabe?'}

${pdGemmaSabe(c)?'Ela segura o seu rosto com as duas mãos.\n\n— Quando você estiver com medo — ela diz — me avisa. Eu não resolvo. Só fico perto.':'Você sabe. Você tem uma resposta, de quatro palavras, e fica olhando para ela, e escolhe a de três: você vai descobrir.'}`,ef:{flag:'a_perguntou9',vinc:1,motivoV:'perguntar antes de resolver'}},
  {t:'Abrir a porta e chamar a Rosa de volta. O dia não espera.',ir:'pd_c9_funmi'}
 ]});

no('pd_c9_b',{cap:9,quem:'solo',lugar:'Nantucket Yacht Club · tenda',trilha:'tensao',hora:'Sábado, 17 de junho · 9h40',
 npcs:['tunde','pippa'],
 texto:c=>`A tenda tem cento e quarenta cadeiras, quatro caixas de som e uma mesa de mixagem com nove canais, dois deles com etiqueta de fita crepe escrita à mão: *NÃO MEXER*. O Tunde está de joelhos no chão, com uma chave de fenda na boca e um cabo preto enrolado no tornozelo.

Ele passou a noite aí. Dá para ver pelo cobertor xadrez dobrado em cima de uma caixa de som.

— Eu só queria testar a ordem dos canais — ele diz, sem tirar a chave de fenda. — Dá para testar a ordem dos canais por duas horas. Eu testei por seis.

Você senta numa cadeira dobrável ao lado dele. A chave de fenda sai da boca.

Você diz que ouviu o recado dele. Não precisa explicar qual.

O Tunde fica um tempo olhando um cabo. Depois fala para o cabo, que é como ele fala quando é sério:

— Eu só queria ter certeza. Não do casamento. Dela eu tenho. Eu queria ter certeza de que eu não ia embora de manhã, com a mesa posta.

Você tem o celular no bolso. O recado de dois de junho, às duas da manhã. Você já ouviu uma vez.`,
 ops:[
  {t:'Ouvir o recado de novo, com ele do lado',
   x:c=>`Você põe o celular na caixa de som, no viva-voz, e aperta o play, sem avisar. A voz do Tunde, de dois de junho, de madrugada, enche a tenda vazia:

*${pdb(c)}, sou eu. Eu não sei se quero casar. Quer dizer, eu quero ela. Eu não sei se quero... o dia. Tudo. Eu não sei guardar segredo, você também não. Desculpa. Não conta. Eu só precisava falar para alguém antes de falar para ela.*

Silêncio. O Tunde ouve a própria voz com a cabeça baixa, como quem ouve a voz de outra pessoa mais nova.

— Eu era um idiota — ele diz.

Você responde que ele era alguém que não sabia dizer, e que agora sabe, ou está aprendendo. Ele faz que sim, devagar.

Ele desliga o recado com o polegar e guarda o celular no bolso, junto do cabo.`,ef:{flag:'b_ouviu_recado9',vinc:1,motivoV:'ouvir o recado junto'}},
  {t:'Dizer que não precisa decidir nada hoje de manhã',at:'cabeca',
   ok:{x:c=>`Você enumera, no mesmo tom de quem explica um balanceamento químico: ele tem nove horas. A cerimônia é às cinco e meia. Em nove horas, qualquer pessoa pode decidir uma coisa, desde que não decida às seis e meia da tarde, em pânico, sem comer.

O Tunde ri pelo nariz.

— Você explica sentimento como se fosse equação.

Você diz que é o que sabe fazer.

— Funciona — ele diz. E come a metade do pão que você tirou da mochila, a que você estava guardando.`,ef:{flag:'b_equacao9',abalo:-1,motivo:'o pão e a equação'}},
   falha:{x:c=>`Você começa a explicar, e a explicação dura mais do que a paciência dele. No meio de *a cinética da decisão*, o Tunde levanta a mão, devagar.

— ${pdb(c)}. Eu te amo. Cala a boca.

Ele não está bravo. Está rindo. Dá um tapa no seu ombro, e o abraço que vem depois é meio de lado, de quem não sabe abraçar de frente.`}},
  {t:'Ajudar a enrolar os cabos, sem falar mais nada',
   x:c=>`Você pega a ponta de um cabo. Ele pega a outra. Vocês enrolam em silêncio, cada um no seu ritmo, do jeito que o pai dos dois nunca ensinou, porque não estava lá, e que a juíza ensinou, porque estava.

Quando termina, tem onze rolos pretos alinhados, todos do mesmo tamanho. O Tunde olha para eles um tempo.

— Eu me sinto melhor — ele diz. — Não sei por quê.

Você também não sabe. Mas se sente.`,ef:{flag:'b_cabos9',abalo:-1,motivo:'onze rolos de cabo'}},
  {t:'Levantar. A Pippa chama dos fundos da tenda.',ir:'pd_c9_funmi'}
 ]});

no('pd_c9_vento',{cap:9,quem:'ab',tipo:'dividir',cada:1,lugar:'Gramado do Yacht Club',trilha:'tensao',hora:'Sábado, 17 de junho · 15h20',
 npcs:['pippa','dory','barnaby'],
 texto:c=>`Três e vinte. O vento de sudoeste, que de manhã parecia cartão-postal, virou outra coisa. Uma rajada entra pela lateral da tenda e levanta a lona, dois metros, como quem levanta a saia de alguém. Cento e quarenta cadeiras dobráveis, alinhadas pela Pippa com fita métrica, caminham para o lado de dentro, juntas, em fila.

${c.f('lona_solta')?'A lona que vocês mal prenderam na terça solta a ponta do lado esquerdo e bate no poste como bandeira.':'Uma das estacas do lado do mar sai da grama, sem barulho, e o poste fica um pouco torto.'}

Em dois minutos haverá um problema. Em quatro, haverá um desastre que um convidado vai perceber. A Pippa corre de uma ponta a outra, com as três agendas, gritando para os primos Barros, que estão em cima da hora de uma sesta.`,
 pergunta:'O que você faz nos próximos três minutos?',
 ops:[
  {t:'Segurar o poste com o corpo, enquanto alguém cuida do resto',ambos:true,
   x:c=>`${c.Q} agarra o poste torto com as duas mãos e planta os pés. O vento puxa. A lona estala. A cadeira mais próxima passa rente à orelha.

Dura três minutos. Parece mais. No fim, a Pippa aparece com dois primos e uma marreta, e as estacas voltam para a grama com um barulho que é um alívio de quem espera vinte minutos.`,ef:{abalo:1,motivo:'o poste e o vento'}},
  {t:'Organizar os primos Barros em fila e distribuir tarefas',se:ehPA,at:'labia',
   ok:{x:c=>`Você apita com dois dedos, como o professor de educação física que nunca foi. Seis homens de avental param. Você aponta, um por um: *você, estaca; você, estaca; você, lona; você, as cadeiras que sobraram para dentro.* Ninguém discute. Dá certo porque você fala o nome de cada um, e você aprendeu os seis nomes no domingo, na lagosta.

Em quatro minutos, a tenda está de pé, mais firme do que de manhã. A Pippa, sem fôlego, cochicha: *eu vou escrever isso na minha biografia*.`,ef:{flag:'vento_lideranca',vinc:1,motivoV:'a tenda de pé'}},
   falha:{x:c=>`Você dá as instruções, mas na ordem errada: lona antes das estacas. Dois primos seguram a lona e o vento os leva um metro para o lado, rindo. Eles se divertem. Você não.

A tenda fica de pé na terceira tentativa, mais baixa e mais amassada do que o plano A previa. A Pippa anota num papel: *plano E*.`,ef:{abalo:1,motivo:'a ordem errada'}}},
  {t:'Calcular a força do vento e a tensão das estacas, e dizer onde pôr o peso',se:ehPB,at:'cabeca',
   ok:{x:c=>`Você olha o poste, a lona, a distância das estacas e o ângulo do vento. Não precisa de caderno. Quatro estacas do lado do mar, duas na diagonal, e peso nos cantos: caixas de gelo de lagosta cheias de água, que a Dory tem aos montes.

— Vai segurar? — pergunta a Pippa.

Você responde que vai, e que se não segurar o erro é seu e o seguro cobre.

Segura. Os seis primos Barros enchem as caixas de gelo na mangueira em silêncio, cantando baixinho a mesma morna. A tenda estala, balança, e fica.`,ef:{flag:'vento_calculo',vinc:1,motivoV:'a tenda de pé'}},
   falha:{x:c=>`Você calcula, mas a rajada é maior do que a que você previu. Duas caixas de gelo viram. Um primo é atingido na canela e solta um palavrão em crioulo que não precisa de tradução.

A tenda fica de pé de qualquer jeito, mas o seu orgulho de professor leva um arranhão.`,ef:{abalo:1,motivo:'a rajada maior'}}},
  {t:'Ir buscar o Barnaby, que sabe de vento',ambos:true,
   x:c=>`${c.Q} atravessa o gramado até a casinha de jardinagem, onde o Barnaby, de avental e sem pressa, rega as hortênsias com uma lata de zinco.

— Sudoeste — ele diz, sem levantar a cabeça. — Passa em dez minutos. Sempre passa às quatro, nesta época. — Ele olha a tenda, a lona, os primos correndo. — Dá para segurar até lá. Eu vou ajudar. Mas só depois de regar a azul. A azul não espera.

Ele rega a azul. Leva doze minutos. A tenda segura.`,ef:{abalo:-1,motivo:'uma pessoa que sabe de vento'}}
 ],
 prox:'pd_c9_graham'});

no('pd_c9_graham',{cap:9,quem:'ab',tipo:'dividir',cada:1,lugar:'Gramado do Yacht Club · perto da mesa onze',trilha:'romance',hora:'Sábado, 17 de junho · 16h10',
 npcs:['graham','rosa'],
 texto:c=>`Quatro e dez. Os primeiros convidados chegam pela balsa das três, em trajes que fazem sentido em Boston e nenhum sentido num gramado de Nantucket: salto no gramado, gravata de seda no vento.

Entre eles, de suéter de caxemira sobre os ombros, sorriso aberto, o Graham Whitfield. Arquiteto, trinta e seis anos, colega de trabalho da noiva, convidado da lista dela. Ele cumprimenta a Rosa com dois beijos, olha em volta, e ${c.f('a_verdade')||c.f('a_contou_gemma9')?'vê':'não vê ainda'} a pessoa que procura.

${c.f('sabe_cancelou')?'Você sabe o que ele fez por ela. Ele deixou a cidade inteira achar que ele era o vilão por nove meses, a pedido dela, e nunca reclamou.':'Todo mundo na festa acha que ele largou '+pda(c)+' em setembro. Ele vem, com o sorriso de quem escolheu vir assim mesmo.'}`,
 pergunta:'Ele vem na direção de vocês. O que cada um faz?',
 ops:[
  {t:'Ir até ele primeiro e cumprimentar',se:ehPA,at:'coragem',
   ok:{x:c=>`Você atravessa os vinte metros de gramado antes que ele chegue. Estende a mão. Ele pega, e faz uma coisa que ninguém fazia em nove meses: puxa você para um abraço.

— Eu fiquei com medo de você não vir me cumprimentar — ele diz, no ouvido.

Você conta, baixinho, que ficou com medo de não conseguir. Ele solta você, olha você de cima a baixo.

— Mas conseguiu. Está com cara de quem dormiu três horas.

Você corrige para cinco, e é um recorde. Ele ri. É a risada que você conhecia. Nenhum dos dois cita o motivo, e os dois sabem por que não citam, e o gramado inteiro, que estava prendendo a respiração, desprende.`,ef:{flag:'graham_cumprimento',vinc:1,motivoV:'ir até ele primeiro',abalo:-1,motivo:'o primeiro abraço em nove meses'}},
   falha:{x:c=>`Você anda. No meio do caminho o salto afunda no gramado, a hortênsia do Barnaby rouba o equilíbrio, e a recepção que você ensaiou vira *oi*.

— Oi — diz o Graham, que sabe a diferença.

Vocês trocam três frases sobre o tempo. É um começo.`}},
  {t:'Ficar perto da Rosa e esperar ele chegar',se:ehPA,
   x:c=>`Você fica de pé ao lado da Rosa, que chora de felicidade por qualquer coisa. O Graham chega em quarenta segundos. Cumprimenta a Rosa, depois você, com um aceno de cabeça. Um aceno, e só.

— ${pda(c)}.

Você devolve o nome dele, e só. É o que você sabe fazer: uma conversa inteira em duas sílabas e uma posição de corpo. Ele sabe ler. Sabe, e não diz nada.

— Eu estou na mesa onze — ele diz. — Do lado do tio Sal. Me avisaram.

Você explica que foi uma escolha de lugar da mãe da noiva.

— Eu sei. — Ele olha para você, sem rancor. — Eu estou bem com isso.`,ef:{flag:'graham_aceno',abalo:1,motivo:'duas sílabas'}},
  {t:'Ir com o Graham até a mesa onze e apresentar o tio Sal',se:ehPB,
   x:c=>`Você vai ao encontro do Graham, de caderno debaixo do braço, e se apresenta como irmão do noivo. Ele aperta a sua mão com um sorriso curioso.

— ${pdTitB(c).replace(/^./,x=>x.toUpperCase())} — ele diz. — ${pda(c)} me falou d${pdgB(c,'e você','e você')}.

Você está preparado para qualquer coisa. Menos para isso.

— Duas vezes. A primeira, que você tem opinião sobre redução de molho. A segunda, na segunda-feira, por mensagem. ${pdgA(c,'Ele','Ela')} disse: *${pdgB(c,'ele é um cabeça-dura, mas é um cabeça-dura bom','ela é uma cabeça-dura, mas é uma cabeça-dura boa')}*.

Você não sabe o que fazer com essa informação. Leva o Graham até a mesa onze, apresenta ao tio Sal, que fala alto, e retira-se antes que alguém peça a sua opinião sobre qualquer coisa.`,ef:{flag:'graham_apresentou',vinc:1,motivoV:'a mensagem de segunda'}},
  {t:'Perguntar ao Graham, em voz baixa, se ele está bem de verdade',se:ehPB,at:'coragem',
   ok:{x:c=>`Você pergunta. O Graham olha para você um tempo, como quem pesa se deve contar.

— Estou — ele diz. — Estou melhor do que quando a minha ex me largou. — Uma pausa, com um quase sorriso. — Que não me largou. Mas você sabe disso.

Você confirma com a cabeça.

— Então você sabe que eu faria de novo. — Ele olha em volta. Para a tenda, a lona, a Rosa. Para ${pda(c)}, que conversa com a Pippa do outro lado do gramado. — ${pdgA(c,'Ele','Ela')} precisava de alguém que aceitasse o papel de vilão. Eu aceitei. Não por heroísmo. Era a única coisa que eu podia dar.

Você assente. É a primeira vez em dois anos que você ouve alguém falar d${pdgA(c,'o','a')} ${pda(c)} sem usar a palavra *eficiente*.`,ef:{flag:'graham_perguntou',vinc:1,motivoV:'perguntar de verdade'}},
   falha:{x:c=>`A frase sai antes do tom: *você está bem?*, como uma pergunta de laboratório, de quem verifica um resultado.

— Estou ótimo — responde o Graham, rápido, e muda de assunto para a balsa. Você percebe que fez a pergunta certa do jeito errado.`}}
 ],
 prox:'pd_c9_panico'});

no('pd_c9_cerimonia',{cap:9,quem:'ab',tipo:'segue',lugar:c=>'Gramado '+(c.f('tenda_agua')?'de baixo':'de cima')+' do Yacht Club',trilha:'romance',hora:'Sábado, 17 de junho · pôr do sol',
 npcs:['gemma','tunde','barnaby','funmi','rosa'],
 ef:c=>{ const casa=c.f('verdade_antes')||(c.f('empurrou')&&pdGemmaSabe(c)); return {flag:casa?'casou':'adiado'} },
 texto:c=>{ const casa=c.f('verdade_antes')||(c.f('empurrou')&&pdGemmaSabe(c)); const L=[];
  if(c.f('verdade_antes')) L.push(`O casamento atrasa cinquenta e um minutos.

Durante cinquenta e um minutos, num quarto do segundo andar, de porta fechada, com a Rosa e a tia Concetta expulsas para o corredor, a Gemma e o Tunde conversam. Ninguém ouve o que eles dizem. A Rosa encosta o ouvido na porta e a juíza Funmi, sem dizer nada, tira ela de lá pelo braço.

No gramado, os dois padrinhos seguram cento e trinta e oito convidados. ${c.f('banda_primos')?'Os Barros tocam morna. Depois funaná. A tia Bisi tira a tia Concetta para dançar e a tia Concetta, que não fala inglês desde 1974, aceita.':'A playlist da Pippa toca, e quando a playlist acaba, o tio Armando pega o acordeão do chão e toca morna, e a tia Bisi tira a tia Concetta para dançar.'} A Dory serve bolinho de bacalhau de entrada. Ninguém reclama do atraso. Ninguém sabe do atraso.

Às seis e vinte e um, a porta do clube abre. O Tunde e a Gemma descem a escada juntos, de mãos dadas, contra todas as regras, com os olhos vermelhos dos dois. A Gemma está rindo. Não o riso alto de sempre. Um mais baixo.

— Ele tem medo — ela diz, no microfone, para cento e trinta e oito pessoas, antes que o Barnaby diga qualquer coisa. — Eu também tenho. A gente combinou de ter medo junto.`);
  else if(c.f('adiar_juntos')) L.push(`Às cinco e cinquenta, os dois padrinhos sobem juntos no tablado do altar${c.f('altar_girado')?', girado trinta e oito graus':''}, com o sol de lado, na água. O Barnaby, de terno de linho, dá um passo para trás.

${ehPA(c)?'Você pega':Pda(c)+' pega'} o microfone. A mão treme. Cento e trinta e oito pessoas.

— Boa tarde. Eu sou ${pdgA(c,'o irmão','a irmã')} da noiva, e organizo casamentos há oito anos, e eu tenho uma coisa para dizer que eu nunca disse em nenhum deles. — Uma pausa. — Hoje não vai ter casamento. O noivo precisa de um pouco mais de tempo. A noiva já sabe por quê, porque ele contou para ela primeiro, que é como devia ser. E eu estou dizendo isso no microfone, na frente de todo mundo, porque eu passei nove meses fazendo o contrário com o meu próprio casamento. Eu cancelei. Não fui largad${pdgA(c,'o','a')}. E deixei todo mundo achar outra coisa. — Uma respiração. — Hoje ninguém precisa achar nada.

Silêncio. O vento. As gaivotas.

${ehPB(c)?'Você pega':Pdb(c)+' pega'} o microfone.

— Tem cento e cinquenta e quatro lagostas na cozinha. E uma banda. E a gente ensaiou uma valsa. — Uma pausa. — A festa continua.

Na primeira fila, a juíza Funmi Okoro levanta. Sozinha. E começa a bater palmas.`);
  else if(casa) L.push(`O Tunde entra no gramado com a gravata mal amarrada e o medo inteiro no peito. Mas quando a Gemma desce a escada do clube, de vestido, descalça, ela não está rindo alto. Está olhando para ele, só para ele, do jeito de quem sabe exatamente de que ele tem medo, porque ficou sabendo ontem, e escolheu descer a escada mesmo assim.

No altar, antes que o Barnaby comece, ela pega a mão dele e diz, baixinho, mas o microfone de lapela pega:

— Eu sei. Tudo bem. Eu também.

O Tunde respira. Pela primeira vez no dia.`);
  else L.push(`O Tunde entra no gramado com a gravata mal amarrada. A Gemma desce a escada do clube, de vestido, descalça, rindo alto, de mão dada com a Rosa.

O Barnaby começa. *Estamos aqui reunidos.* A voz grossa, de quem só fala com planta.

No meio da frase, o Tunde levanta a mão. Devagar. Como um aluno.

— Desculpa — ele diz. — Barnaby. Você disse que se alguém quisesse parar...

O Barnaby fecha a pasta de juiz de paz. Faz que sim.

— Para.

O Tunde vira para a Gemma. Fala baixo. O microfone de lapela pega tudo, e cento e trinta e oito pessoas ouvem um homem de trinta e um anos dizer para a mulher que ama que tem medo de ser o pai dele, e que não contou para ela antes porque tinha medo de que ela fosse embora, e que está contando agora, no pior lugar possível, porque não aguenta mais casar com um segredo.

A Gemma escuta tudo. De vestido. Descalça. E quando ele termina, ela tira o véu, entrega para a tia Concetta, e diz, no microfone, para todo mundo:

— A gente não vai casar hoje. — Uma pausa. — Mas a gente não vai embora. Ninguém vai embora. Tem lagosta.`);
  if(casa) L.push(`O Barnaby Cole, juiz de paz do estado de Massachusetts desde 1991, casa Gemma Castellano e Tunde Okoro às seis e trinta e oito da tarde, com o sol ${c.f('altar_girado')?'de lado, na água, exatamente onde alguém calculou que ia estar':'nos olhos de cento e trinta e oito convidados, que choram e não dá para saber se é do sol'}. A cerimônia dura onze minutos. No fim, ele diz *pode beijar*, e depois, fora do microfone, para ninguém: *Ruth, você ia gostar dessa.*

${ehPB(c)?'Você lê':Pdb(c)+' lê'} o discurso de ${pdTitB(c)} no jantar. ${c.f('discurso19')?'Versão dezenove. A da confiança. Ninguém ri na terceira frase. Na quarta, a juíza Funmi tira os óculos.':'A versão que sai, no microfone, não está em nenhuma folha do caderno preto. Tem três frases. A terceira faz a juíza Funmi tirar os óculos.'}`);
  L.push(`E então, ${casa?'depois da valsa dos noivos':'depois que alguém tira o tablado do altar'}, a Pippa, de fone de ouvido, chorando, aperta o play.

*Moon River.* Três minutos e meio.

A valsa dos padrinhos.`);
  return L.join('\n\n') },
 prox:'pd_c9_valsa'});

no('pd_c9_valsa',{cap:9,quem:'ab',tipo:'segue',lugar:'Pista da tenda',trilha:'romance',hora:'Sábado, 17 de junho · 21h00',
 npcs:['pippa','barnaby','funmi'],
 texto:c=>`Os dois vão até o meio da pista. Cento e trinta e oito pessoas olhando. ${c.f('casou')?'A Gemma e o Tunde, de mãos dadas, na beira da pista.':'A Gemma, de vestido, sem véu, e o Tunde, sem gravata, de mãos dadas, na beira da pista, num casamento que não aconteceu e numa festa que aconteceu.'}

Mão no ombro. Mão na cintura. A outra mão, palma com palma, no alto.

${c.f('deixou_conduzir')||c.f('parou_contar')?'Ninguém conduz. Ninguém conta. A valsa que sai não é a da Mrs. Starbuck. É outra, que os dois inventam no primeiro compasso e que nenhum dos dois saberia repetir.':c.f('contou_passos')?'Alguém conta, baixinho, um, dois, três, no ouvido do outro. O outro conduz. É a valsa da Mrs. Starbuck, insuportável e razoável.':'Alguém conduz, firme. O outro pisa no pé no terceiro compasso. Ninguém para.'}

No terceiro minuto, a juíza Funmi Okoro levanta da mesa da frente, atravessa a pista, e bate no ombro do Tunde.

— Dança comigo — ela diz. — Faz trinta e quatro anos.

E dança. A primeira vez desde junho de 1989. Mal. Rindo.

Na mesa sete, a tia Concetta e a tia Bisi não falaram nada a noite inteira. Estão de mãos dadas.

Na cozinha do clube, na parede de azulejo, a Pippa colou com fita crepe um papel novo. Um placar novo. Sem aposta. Só uma linha, com a letra dela:

*Eles pararam de fingir.*`,
 prox:'pd_c9_noivos'});


no('pd_c9_noivos',{cap:9,quem:'ab',tipo:'segue',lugar:'Jardim dos fundos do Yacht Club',trilha:'romance',hora:'Sábado, 17 de junho · 22h30',
 npcs:['dory','pippa','barnaby'],
 texto:c=>`Dez e meia. A festa chegou ao ponto em que ninguém mais olha o relógio. A tenda brilha de dentro. Dá para ouvir, do jardim dos fundos, a morna que o tio Armando toca no acordeão, e a risada da Dory, que parece uma tosse de motor.

Na grama, depois da horta de ervas, há dois bancos de madeira, um de frente para o outro, e uma lanterna de papel que a Pippa pendurou ali sem explicar. A Pippa chamou de *espaço de respiro*.

${c.f('casou')?'Os noivos já saíram. A Gemma levou os sapatos na mão e o Tunde, a gravata. A tia Concetta os viu pelo vidro do jardim de inverno, e ficou calada, o que para ela é uma bênção.':'Os noivos dançam, ou não dançam, ou conversam num canto, ou ficam em silêncio, e ninguém sabe qual dos quatro é, e todos preferem não perguntar.'}

Na lousa da cozinha, alguém, sem dizer quem, riscou o nome do Barnaby no placar da aposta. Embaixo, com a letra da Pippa, a única coisa que ela escreveu à mão em nove dias sem usar as três agendas:

*Gosto mais quando não tem placar.*`,
 prox:'pd_c9_fim'});
