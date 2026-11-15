/* ================= PADRINHO E MADRINHA · CAPÍTULO 3 · cenas novas e reescritas ================= */

no('pd_c3_maos',{cap:3,quem:'ab',tipo:'dividir',cada:1,lugar:'Praia de Madaket',trilha:'mar',hora:'Segunda, 12 de junho · 19h20',
 npcs:['dory'],
 texto:c=>`A Dory não põe talher na mesa. Põe um quebra-nozes, um rolo de papel-toalha e um balde para as cascas.

— Lagosta se come com a mão — ela avisa. — Quem pede garfo não está com fome. Está com medo.

Ela cruza os braços e fica olhando, que é como a Dory avalia fornecedor, cliente e genro.`,
 pergunta:'Como você come?',
 ops:[
  {t:'Abrir a lagosta do jeito que você viu num tutorial, sem deixar cair uma gota na roupa',se:ehPA,at:'agilidade',
   ok:{x:c=>`Você torce a cauda, empurra a carne com o polegar, quebra a garra num estalo só. Nenhuma gota na roupa. As cascas vão para o balde em fila.

A Dory descruza os braços.

— Você desmonta bicho do jeito que desmonta problema — ela diz. — Dá até pena da lagosta.`,ef:{flag:'lagosta_limpa',fa:1}},
   falha:{x:c=>`A cauda torce para o lado errado. Um jato de manteiga quente atravessa a mesa e acerta em cheio a pasta de couro, que está dentro de dois sacos plásticos e sobrevive.

A Dory olha os dois sacos plásticos. Olha você.

— Você embrulhou um caderno para vir comer na praia.

Não é um caderno. Você decide não corrigir.`,ef:{abalo:1,motivo:'manteiga na pasta'}}},
  {t:'Levar a pasta até a caminhonete e deixar lá. Pela primeira vez desde sábado, ficar sem ela.',se:ehPA,
   x:c=>`Você anda até a caminhonete, põe a pasta no banco e fecha a porta. Na volta, não sabe o que fazer com os braços. Eles balançam.

A Dory repara. Empurra o pote de manteiga para o seu lado da mesa.

— Agora sim você tem mão — ela diz. — Usa.`,ef:{flag:'sem_pasta',abalo:-1,motivo:'as mãos vazias'}},
  {t:'Explicar por que a lagosta fica vermelha quando cozinha',se:ehPB,at:'cabeca',
   ok:{x:c=>`— Ela já era vermelha — você diz. — O pigmento se chama astaxantina. Viva, a lagosta tem uma proteína que segura esse pigmento e esconde a cor. O calor desmancha a proteína. O vermelho que estava lá dentro o tempo todo aparece.

A Dory fica um tempo olhando a lagosta no prato.

— Quarenta anos cozinhando isso — ela diz. — Ninguém nunca me contou que ela já era vermelha por dentro.`,ef:{flag:'astaxantina',fa:1}},
   falha:{x:c=>`Você começa pela proteína, volta para o pigmento, abre um parêntese sobre crustáceos em geral. No meio do parêntese, a Dory tira a lagosta do seu prato e põe outra, quente, no lugar.

— Professor — ela diz — a sua esfriou na parte da proteína.`}},
  {t:'Quebrar a garra com a mão, do jeito que a Dory faz',se:ehPB,at:'forca',
   ok:{x:c=>`Você põe a garra na palma, fecha a mão e aperta. Estala. A casca abre em duas metades limpas e a carne sai inteira.

A Dory levanta as sobrancelhas, as duas.

— Isso não se aprende em escola.

— Onze anos abrindo janela emperrada de sala de aula — você diz.`,ef:{flag:'garra',fa:1}},
   falha:{x:c=>`Você põe a garra na palma e aperta. A garra escapa, sobe, descreve um arco por cima da mesa e cai no mar com um barulhinho.

Uma gaivota mergulha atrás e leva.

— Essa aí estava paga — diz a Dory, sem rancor. — Tem mais.`}},
  {t:'Começar pelo milho. Devagar. Olhando o mar.',ambos:true,
   x:c=>`${c.Q} começa pelo milho, que veio cozido na palha, no vapor da alga, e tem gosto de fumaça e de sal. A manteiga escorre até o pulso de ${c.q}. Ninguém oferece guardanapo. Na praia de Madaket, guardanapo é a calça.`,ef:{abalo:-1,motivo:'milho com gosto de mar'}}
 ],
 prox:'pd_c3_dory'});

no('pd_c3_dory',{cap:3,quem:'ab',tipo:'segue',lugar:'Praia de Madaket',trilha:'mar',hora:'Segunda, 12 de junho · 19h50',
 npcs:['dory'],
 texto:c=>`A Dory come de pé, encostada na caminhonete dela, uma lagosta inteira em quatro minutos.

— O barco tem o nome da minha avó — ela conta, de boca cheia. — Maria. Fogo é a ilha de onde ela veio, a do vulcão. Ela fazia esta comida em casamento, em batizado e em enterro. Dizia que comida de festa tem que sujar a mão. — Ela limpa os dedos no macacão. — De mão suja ninguém consegue se fazer de fino. Aí as pessoas conversam.

Ela tira do isopor duas garrafas de vinho verde, geladas, suando, e abre as duas com o cabo da faca.

— Provem tudo. Eu vou ver a minha mãe no asilo e volto às dez. Se sobrar lagosta, eu não faço o casamento. — Ela sobe na caminhonete e fala pela janela. — Se sobrar vinho, também não.

A caminhonete some na estrada de areia. Ficam uma mesa de piquenique, o mar passando de laranja para roxo, e duas garrafas abertas.`,
 prox:'pd_c3_vinho'});

no('pd_c3_manha',{cap:3,quem:'ab',tipo:'dialogo',lugar:c=>c.f('noite3_sim')?'Gull House · quarto três':'Praia de Madaket',trilha:'abertura',hora:'Terça, 13 de junho · 6h30',
 texto:c=>`${c.f('noite3_sim')?'Seis e meia. Ninguém falou ainda. Dos dois lados da cama, mãos procuram roupa no chão sem a ajuda dos olhos.':'Seis e meia. A lona escorrega dos ombros. O mar está cinza e liso, e a brasa da Dory virou um buraco de cinza molhada.'}

Alguém vai ter que dizer a primeira frase do dia.`,
 comeca:E=>lsSeat(E,PD_A),
 falas:[
  {p:'Você diz a primeira frase.',ops:c=>[
   {t:'— Os nossos irmãos casam no sábado. As nossas mães estão em guerra. Eu tenho uma pasta e você tem um caderno.',tom:'seco',tag:'lista'},
   {t:'— Eu não sei o que dizer agora. Eu sempre sei o que dizer.',tom:'abre',tag:'naosei'},
   {t:c.f('noite3_sim')?'— Bom dia. Eu acho. Essa parte eu não ensaiei.':'— A gente dormiu sentado numa mesa de piquenique. As minhas costas vão lembrar disso até sábado.',tom:'flerte',tag:'bomdia'}
  ]},
  {p:'Sua resposta.',ops:c=>[
   {t:'— Então a gente precisa de uma regra.',tom:'seco',tag:'regra'},
   {t:c.f('noite3_sim')?'— Eu não me arrependo. Estou dizendo logo, para você não ficar calculando.':'— Ontem eu quase atravessei. Estou dizendo logo, para você não ficar calculando.',tom:'abre',tag:'digo'},
   {t:'— Antes de qualquer coisa: você dormiu? Um pouco, pelo menos?',tom:'cuida',tag:'dormiu'}
  ]},
  {p:'De volta para você.',ops:(c,h)=>[
   {t:'— Regra. Isso. Regra eu sei fazer.',tom:'seco',tag:'sei'},
   ...(h[1].tag==='digo'?[{t:'— Eu estava calculando.',tom:'flerte',tag:'calc'}]:[]),
   ...(h[1].tag==='dormiu'?[{t:'— Dormi. Mal. Foi a melhor noite mal dormida do ano.',tom:'abre',tag:'mal'}]:[]),
   {t:'(Procurar no bolso uma caneta que não está lá. Estender a mão aberta, pedindo a de quatro cores.)',tom:'cuida',acao:true,tag:'caneta'}
  ]},
  {p:'Você fecha.',ops:c=>[
   {t:'(Entregar a caneta de quatro cores, com o azul já apertado.)',tom:'cuida',acao:true,tag:'entrega'},
   {t:'— Escreve você. A sua letra tem cara de contrato.',tom:'flerte',tag:'letra'},
   {t:'— Qualquer regra. Desde que fique por escrito. Eu não confio em regra falada.',tom:'seco',tag:'escrito'}
  ]}
 ],
 prox:'pd_c3_regra'});

no('pd_c3_regra',{cap:3,quem:'ab',tipo:'decisao',lugar:c=>c.f('noite3_sim')?'Gull House · quarto três':'Praia de Madaket',trilha:'abertura',hora:'Terça, 13 de junho · 6h40',
 texto:c=>`Um guardanapo de papel ${c.f('noite3_sim')?'da Gull House, achado em cima da cômoda':'tirado do saco da Dory'}. Uma caneta de quatro cores. Duas pessoas que organizam a vida por escrito.

As duas primeiras linhas saem sem discussão, em azul:

*1. Isso fica em Nantucket.*
*2. Ninguém conta para os irmãos.*

Falta a terceira.`,
 pergunta:'Qual é o item 3?',
 ops:[
  {t:c=>c.f('noite3_sim')?'3. Não acontece de novo.':'3. Não vai acontecer.',ef:{flag:'regra_dura',pista:'pd_regra'},
   x:c=>`A caneta muda para o vermelho, o de corrigir prova.

*3. ${c.f('noite3_sim')?'Não acontece de novo.':'Não vai acontecer.'}*

Duas assinaturas embaixo. Uma em letra pequena, de quem preenche diário de classe. A outra com um floreio no fim, de quem assina contrato.

Ninguém olha para o item 3 por mais de um segundo.`},
  {t:'3. O resto a gente vê.',ef:{flag:'regra_mole',pista:'pd_regra'},
   x:c=>`A caneta para em cima do número 3. Muda para o vermelho. Volta para o azul.

*3. O resto a gente vê.*

Tecnicamente isso é uma hipótese, e hipótese não obriga ninguém a nada. Mas tem duas assinaturas embaixo, uma em letra de diário de classe e outra com floreio de contrato.`}
 ],
 prox:'pd_c3_cafe'});

no('pd_c3_cafe',{cap:3,quem:'ab',tipo:'dividir',cada:1,lugar:'Cozinha da Gull House',trilha:'abertura',hora:'Terça, 13 de junho · 7h30',
 npcs:['barnaby','pippa','rosa','funmi'],
 texto:c=>`Sete e meia. Café da manhã na Gull House. O Barnaby faz ovos mexidos.

${c.f('noite3_sim')?'A Gull House de 1840 tem duas escadas, a da frente e a dos fundos. Dá para chegar na cozinha por duas portas, com cinco minutos de intervalo.':'A caminhonete encosta na calçada às sete e vinte, com areia no banco e uma lona molhada na caçamba.'}

Na cozinha, a Pippa está encostada na pia, de braços cruzados, com a cara de quem acordou às seis só para isso. A Rosa passa manteiga numa torrada sem tirar os olhos da porta. A juíza lê o jornal. Vira a página sem ter lido.

— Bom dia — diz a Pippa. — Dormiram bem? Onde?`,
 pergunta:'O que você responde?',
 ops:[
  {t:'— A gente ficou cuidando da brasa da Dory. Fogo em praia é coisa séria.',ambos:true,
   x:c=>`${c.Q} fala da brasa com a seriedade de quem lê uma norma de segurança.${c.f('cafe_brasa')?' É a segunda vez em um minuto que a cozinha ouve a história da brasa, quase com as mesmas palavras. A juíza baixa o jornal um centímetro.':''}

— A brasa — repete o Barnaby, virando os ovos. — Claro.`,ef:{flag:'cafe_brasa'}},
  {t:'— Dormi, sim. O café está pronto?',ambos:true,
   x:c=>`${c.Q} responde só a primeira pergunta e vai direto para a cafeteira. A segunda fica sem resposta, e a Pippa registra isso com um aceno de cabeça para a Rosa. A Rosa devolve o aceno.`,ef:{flag:'cafe_fuga'}},
  {t:'(Não responder. Sentar, pegar uma torrada e sorrir para o prato.)',ambos:true,
   x:c=>`${c.Q} senta, pega uma torrada e sorri para o prato. Um sorriso pequeno, que escapa sem pedir licença.

A Rosa vê. Pousa a faca da manteiga na mesa, muito devagar, como quem acaba de achar uma pista.`,ef:{flag:'cafe_sorriso'}}
 ],
 prox:'pd_c3_fim'});

no('pd_c3_fim',{cap:3,quem:'ab',tipo:'fim',lugar:'Cozinha da Gull House',trilha:'noite',hora:'Terça, 13 de junho · 7h45',
 npcs:['barnaby','pippa'],
 texto:c=>`O Barnaby serve o café sem perguntar mais nada.

A Pippa atravessa a cozinha até a lousa, com o giz rosa, e embaixo de *PIPPA: terça* desenha, bem pequeno, uma estrela.

${c.f('noite3_sim')?`O Barnaby olha a estrela e fala para a frigideira:

— Beijo não conta. Eles ainda estão fingindo.`:`O Barnaby olha a estrela e balança a cabeça.

— Não teve nem beijo. Eu conheço cara de quem passou a noite conversando.

A Pippa apaga a estrela com o dedo, devagar, e deixa o giz na beirada da lousa, para o caso de precisar.`}

Na tabela da parede, uma linha em vermelho continua sem risco: *Licença do condado (14.c). Prazo: quarta, 17h30.* A prefeitura abre às nove.`,
 prox:'pd_c4_inicio'});
