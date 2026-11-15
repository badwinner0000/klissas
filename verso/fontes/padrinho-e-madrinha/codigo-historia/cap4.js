/* ================= PADRINHO E MADRINHA · CAPÍTULO 4 · AS REGRAS ================= */

no('pd_c4_inicio',{cap:4,quem:'ab',tipo:'segue',lugar:'Prefeitura de Nantucket · Broad Street',trilha:'abertura',hora:'Terça, 13 de junho · 9h00',
 npcs:['barnaby','dory'],
 texto:c=>`Nove da manhã, no balcão do setor de licenças do condado, no térreo da prefeitura, um prédio de tijolo com bandeira e gerânio na janela.

O Barnaby Cole, de avental de lona por cima da camisa de domingo, assina três vias do formulário de licença temporária de evento como *responsável técnico pela cozinha base*. A caneta treme um pouco. Na linha *estabelecimento*, ele escreve devagar: *Gull House. Cozinha da Ruth.* A funcionária, a Deb, olha a frase, não corrige, e carimba.

A Dory Barros, de macacão, do lado dele, não fala nada. Põe a mão no ombro dele, um segundo, e tira.

${c.f('licenca_barnaby')||c.f('licenca_caminho')?'Na saída, o Barnaby para nos degraus e olha para os dois.':'Na saída, o Barnaby para nos degraus e olha para os dois, que passaram a segunda inteira sem resolver a licença e que, de manhã, ouviram da Dory que *aquele velho rabugento assina, eu já falei com ele*.'}

— Eu não assinei por vocês — ele diz. — Eu assinei pela Dory. E pela Ruth, que ia gostar de uma festa. — Ele desce um degrau. — E porque a Pippa me disse que se eu não assinasse ela ia chorar. E ela chora alto.

A cláusula 14.c está resolvida. Faltam quatro dias. Faltam: a tenda, as cadeiras, a banda confirmar o horário, o bolo de limão com uma camada de coco, a valsa dos padrinhos, a dança das mães, e uma regra escrita num guardanapo.`,
 prox:'pd_c4_ashby'});

no('pd_c4_clube',{cap:4,quem:'ab',tipo:'dividir',cada:2,lugar:'Nantucket Yacht Club',trilha:'abertura',hora:'Terça, 13 de junho · 11h00',
 npcs:['pippa','rosa'],
 texto:c=>`Onze horas. O gramado, o terraço, o bar e o porão. Tem serviço para quatro pessoas, e duas delas assinaram um guardanapo hoje cedo.`,
 pergunta:'O que você faz no clube? (duas coisas cada um)',
 ops:[
  {t:'Convencer o Mr. Ashby a deixar a tenda no gramado de baixo, perto da água, contra o regulamento',se:ehPA,at:'labia',
   ok:{x:c=>`— Mr. Ashby. O senhor já viu um pôr do sol de junho daqui de baixo? — Você aponta. — Não do terraço. Daqui. Com a água refletindo.

— O regulamento diz...

— O regulamento foi escrito em 1952. Em 1952, o comodoro do clube casou a filha aqui. Eu vi a foto, na parede do bar. A tenda estava *aqui*. — Você sorri. — Eu só estou pedindo a mesma exceção que o comodoro deu para a filha dele.

O Mr. Ashby olha para a foto imaginária na parede do bar. Depois para o gramado. Depois para você.

— ${pdgA(c,'O senhor','A senhora')} inventou essa foto.

Não inventou. Está mesmo na parede do bar. Você viu ontem, enquanto esperava. O Mr. Ashby autoriza a tenda no gramado de baixo, e pede para não contar a ninguém.`,ef:{flag:'tenda_agua',fa:1}},
   falha:{x:c=>`O Mr. Ashby escuta tudo, com o blazer abotoado, e no fim diz que o regulamento é o regulamento, e que o regulamento foi escrito em 1952 *justamente para evitar casamentos perto da água, depois do que aconteceu com a filha do comodoro*.

Você não pergunta o que aconteceu com a filha do comodoro. Você tem medo da resposta.`}},
  {t:'Acalmar a Rosa, que quer trocar as hortênsias azuis por peônias rosa',se:ehPA,
   x:c=>`— Peônia rosa, filh${pdgA(c,'o','a')}! A Gemma ama peônia rosa! Estava no Pinterest!

— Mãe. Peônia rosa não existe em Nantucket em junho. Até a peônia sabe que não.

A Rosa para. Olha para você.

— Isso foi o Barnaby que disse.

— Foi.

— Você está repetindo o que o Barnaby diz. — Ela tira os óculos escuros. — Você nunca repete o que os outros dizem. Você sempre tem a sua frase. — Ela te olha mais um pouco, com olho de mãe, que é pior que olho de juíza. — Tem alguma coisa diferente em você desde ontem.`,ef:{flag:'rosa_desconfia'}},
  {t:'Medir o corredor da cerimônia e calcular o ângulo do sol às cinco e meia',se:ehPB,at:'cabeca',
   ok:{x:c=>`Fita métrica, bússola do celular, a tabela de efemérides que você baixou ontem. Às cinco e meia da tarde do dia dezessete de junho, em Nantucket, o sol vai estar a vinte e um graus acima do horizonte, no azimute de duzentos e noventa e quatro.

Se o altar ficar onde a Courtney desenhou, os convidados vão olhar direto para o sol durante a cerimônia inteira. Cento e quarenta pessoas de olho fechado.

Você gira o altar no papel trinta e oito graus. O sol fica atrás dos noivos, de lado, na água.

A Pippa olha o desenho por cima do seu ombro e faz um barulhinho.

— Isso é a coisa mais romântica que eu já vi alguém fazer com uma fita métrica.`,ef:{flag:'altar_girado',fa:1}},
   falha:{x:c=>`Você faz a conta, e o celular perde o sinal do GPS, e a fita métrica enrola no salto da Rosa, e a Rosa cai sentada no gramado, de chapéu, e chora.

Não se machuca. Mas chora.`,ef:{abalo:1,motivo:'a Rosa no gramado'}}},
  {t:'Ligar para a banda e confirmar o horário, e descobrir que a banda acha que o casamento é domingo',se:ehPB,
   x:c=>`A banda se chama The Salty Dogs. O vocalista atende de ressaca.

— Domingo, cara. Dezoito. Tá aqui no contrato.

— O casamento é sábado. Dezessete.

Um silêncio de ressaca do outro lado.

— Então a gente tem um problema. Sábado a gente toca num bar mitzvah em Hyannis.

Você desliga. Olha para o porto. Pela primeira vez em três dias, entende o que ${pdnA(c)} quer dizer com *pequeno ajuste*.`,ef:{flag:'banda_problema',abalo:1,motivo:'The Salty Dogs'}},
  {t:'Descer ao depósito do porão e contar as cadeiras dobráveis',ambos:true,
   x:c=>`O depósito do clube fica no porão: escuro, com cheiro de corda molhada e tinta de barco, e cento e quarenta e tantas cadeiras dobráveis empilhadas contra as paredes, com um metro e meio de corredor entre as pilhas.

${c.Q} desce a escada para contar.${c.f('deposito_a')||c.f('deposito_b')?` No fim do corredor, debaixo da única lâmpada, está ${c.oq}, que desceu dez minutos antes para contar as mesmas cadeiras.`:' Cento e quarenta e duas. Duas quebradas.'}`,ef:c=>({flag:'deposito_'+c.s})},
  {t:'Ficar do outro lado do gramado, perto da bandeira, e cumprir a regra',ambos:true,
   x:c=>`${c.Q} atravessa o gramado até o mastro da bandeira, a quarenta metros de qualquer pessoa com quem tenha assinado um guardanapo, e fica lá, de costas, olhando o porto. Cumprindo a regra com o corpo inteiro.

A Pippa, no meio do gramado, com a fita métrica, tira o celular e manda uma mensagem para o Barnaby: *Tem gente escondida atrás da bandeira.*

A resposta chega em trinta segundos: *Eu sei. Tô vendo da caminhonete.*`,ef:c=>({flag:'longe_'+c.s})}
 ],
 prox:c=>c.f('deposito_a')&&c.f('deposito_b')?'pd_c4_porao':'pd_c4_foto'});

no('pd_c4_cozinha',{cap:4,quem:'ab',tipo:'segue',lugar:'Cozinha da Gull House',trilha:'abertura',hora:'Terça, 13 de junho · 18h00',
 npcs:['pippa','barnaby'],
 texto:c=>`Seis da tarde. A lousa da cozinha.

*PIPPA: terça.* — com três estrelas em giz rosa, desenhadas com força, uma do lado da outra, e um ponto de exclamação.

*BARNABY: depois que eles pararem de fingir.* — e embaixo, com a letra de etiqueta de planta: *Não pararam. Isso não conta.*

*Funmi: eles já pararam. Eles só não sabem.* — sem alteração. A juíza não voltou à cozinha. Mas alguém viu ela parada na porta, às cinco, olhando a lousa, com a sombra de um sorriso que ninguém naquela família via desde os anos oitenta.

${c.f('noite3_sim')?'— A aposta é sobre o *beijo* — diz a Pippa para o Barnaby, de braços cruzados. — Eu ganhei.':'— A aposta é sobre o *beijo* — diz a Pippa para o Barnaby, de braços cruzados. — Ainda não ganhou ninguém. Mas eu estou perto.'}

${c.f('noite3_sim')?'— A aposta é sobre eles pararem de fingir — diz o Barnaby, cortando cebola. — Você ganhou o beijo. Eu ainda não perdi nada.':'— A aposta é sobre eles pararem de fingir — diz o Barnaby, cortando cebola. — Sem beijo, ninguém ganhou. Eu ainda não perdi nada.'}

— Isso não está escrito em lugar nenhum!

— Está escrito na lousa. Lê de novo.

A Rosa, na sala, ao telefone com a tia Concetta, em italiano, não está chorando. Pela primeira vez desde domingo. Está rindo. Baixinho. E dizendo uma frase que ${ehPA(c)?'você entende, porque é a sua língua de infância':'você não entende, mas que tem o seu nome no meio'}.`,
 prox:c=>pdPor(c,'pd_c4_a','pd_c4_b')});

no('pd_c4_a',{cap:4,quem:'solo',lugar:'Varanda da Gull House',trilha:'tensao',hora:'Terça, 13 de junho · 20h00',
 npcs:['rosa'],
 texto:c=>`Oito da noite. A varanda das hortênsias. Sua mãe senta do seu lado no banco de vime, de robe de seda, sem maquiagem, o que é raro, e com uma taça de vinho branco, o que não é.

${c.f('olhou4_a')||c.f('olhou4_b')?'— Eu vi a foto — ela diz. — Catorze vezes.':'— Eu vi a foto — ela diz. — Dois postes. Ninguém fica duro daquele jeito do lado de quem não importa.'}

— Mãe.

— Eu não estou brava. Eu estou feliz. Eu estou com medo. É a mesma coisa, na minha idade. — Ela bebe. — Depois do Graham, eu achei que você nunca mais ia olhar para ninguém assim. Ele te machucou tanto.

Você não diz nada.

— Você nunca chorou — ela continua. — Nem uma vez. Eu chorei por você. A Gemma chorou. A tia Concetta acendeu vela na igreja por seis meses, para ele pegar uma doença. Você não chorou. — Ela segura a sua mão. — Por quê?`,
 ops:[
  {t:'— Porque já passou, mãe. Eu sou forte.',
   x:c=>`— Você é — diz a Rosa, e aperta a sua mão. — Você sempre foi. Desde pequen${c.eu.o}. Organizou a própria festa de seis anos, com convite e tudo.

Ela vai embora pela porta de tela, enxugando o olho, satisfeita.

Você fica na varanda. A frase *eu sou forte* ainda no ar, entre as hortênsias. Mentira número quarenta e um.`,ef:{flag:'mentiu_rosa2',abalo:1,motivo:'mentira número quarenta e um'}},
  {t:'— Porque não foi ele, mãe. — E parar aí. Sem conseguir dizer o resto.',
   x:c=>`A Rosa olha para você. Não entende.

— Como assim não foi ele?

— Esquece. — Você levanta. — Eu bebi vinho na praia ontem. Eu ainda estou confus${c.eu.o}.

Ela não acredita. Mas não insiste. Ela segura a sua mão mais um pouco, com olho de mãe.

— Quando você quiser — ela diz. — Eu sou dramática. Mas eu sei ouvir.`,ef:{flag:'quase_rosa'}},
  {t:'Mudar de assunto: a dança das mães. A juíza não quer dançar.',
   x:c=>`— A Funmi não dança em casamento — diz a Rosa, e a cara dela muda, de mãe para general. — Ela disse que não vai a casamento desde 1989. Que tipo de mulher não vai a casamento?

— Uma que foi a um que deu errado, mãe.

A Rosa para. Pensa.

— Ah — ela diz. E depois, mais baixo: — Ah. — Ela olha a taça de vinho. — Eu nunca perguntei.

— Ninguém pergunta para ela. Ela é juíza.

— Eu sou da North End. — A Rosa levanta. — A gente pergunta.`,ef:{flag:'rosa_funmi'}},
  {t:'Sair para o quintal. Tem uma luz acesa debaixo da macieira.',ir:'pd_c4_macieira'}
 ]});

