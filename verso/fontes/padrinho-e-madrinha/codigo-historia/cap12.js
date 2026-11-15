/* ================= PADRINHO E MADRINHA · CAPÍTULO 2 · cenas novas e reescritas ================= */

no('pd_c2_almoco',{cap:2,quem:'ab',tipo:'dividir',cada:1,lugar:'Quintal da Gull House',trilha:'abertura',hora:'Domingo, 11 de junho · 14h30',
 npcs:['rosa','funmi','concetta','pippa','barnaby'],
 texto:c=>`Duas e meia. O Barnaby põe a mesa do quintal para seis, debaixo da macieira que não dá maçã, porque *na cozinha não cabe tanta opinião*. A tia Concetta tira da bolsa térmica uma travessa de berinjela à parmegiana do tamanho de um pneu e planta a travessa no centro da mesa, sem perguntar se alguém já almoçou.

De um lado, a Rosa, que fala desde que sentou. Do outro, a juíza Funmi, que ainda não tirou o chapéu. Entre as duas, a berinjela.

— A senhora come berinjela? — pergunta a Rosa.

— Eu como o que puserem na minha frente, sra. Castellano. Fui juíza de vara de família.

A tia Concetta diz uma frase comprida em italiano, olhando para a juíza. Ninguém traduz. A Pippa, na ponta da mesa, está com o garfo parado no ar há um minuto inteiro.`,
 pergunta:'O que você faz na mesa?',
 ops:[
  {t:'Traduzir a tia Concetta. Com alguma liberdade.',se:ehPA,at:'labia',
   ok:{x:c=>`A frase era: *essa aí tem cara de quem nunca repetiu um prato na vida.*

— A minha tia disse que é uma honra ter uma juíza à mesa — você traduz.

A juíza Funmi olha para a tia Concetta. Olha para você. Serve um segundo pedaço de berinjela no próprio prato, devagar, sem desviar os olhos de nenhuma das duas.

— Diga à sua tia que eu entendo italiano de restaurante — ela responde. — E que a berinjela está muito boa.

A tia Concetta dá um sorriso curto, o primeiro desde que desceu da balsa, e empurra a travessa dois dedos na direção da juíza.`,ef:{flag:'traduziu',fa:1}},
   falha:{x:c=>`— Ela disse que é uma honra — você traduz.

A tia Concetta entende inglês muito bem quando quer. Corrige em voz alta, em italiano, palavra por palavra, e depois repete com as mãos, para não sobrar dúvida.

A juíza acompanha as mãos com atenção profissional.

— Não precisa traduzir — ela diz. — Gesto eu leio desde 1985.`,ef:{abalo:1,motivo:'a tia Concetta corrigindo a tradução'}}},
  {t:'Tirar o mapa de mesas do alcance da sua mãe antes da sobremesa',se:ehPA,
   x:c=>`O mapa de mesas está debaixo do cotovelo da Rosa, que já tirou uma caneta da bolsa. Você troca o mapa pelo cardápio da prova de bolo, com a mão leve de quem já tirou muito convite errado da mão de noiva. A Rosa risca três sabores de bolo sem notar a diferença.

A juíza Funmi nota. Não diz nada. Empurra o saleiro dois centímetros para o lado, até cobrir a ponta do mapa que ficou aparecendo debaixo do seu guardanapo.`,ef:{flag:'salvou_mapa'}},
  {t:'Montar o prato da sua mãe do jeito que ela gosta, antes que ela precise pedir',se:ehPB,
   x:c=>`Você conhece o prato da sua mãe: pouca coisa, tudo separado, nada encostando em nada. Você monta do jeito certo e põe na frente dela.

— Obrigada — ela diz. E depois, mais baixo, só para o seu lado da mesa: — A mulher fala muito.

— Fala.

— O seu irmão vai almoçar com ela todo domingo, pelo resto da vida. — Ela corta a berinjela em quadrados iguais. — Ainda bem que o paciente da família é ele.`,ef:{flag:'serviu_funmi'}},
  {t:'Responder quando a Rosa perguntar o que gente de química acha de casamento',se:ehPB,at:'coragem',
   ok:{x:c=>`— E você? — A Rosa aponta o garfo na sua direção. — Química. Você acredita em casamento, ou é dessa gente que explica tudo?

A mesa para. A sua mãe para.

— Eu acredito em ligação covalente — você diz. — Dois átomos dividem o que têm, porque sozinhos ficam instáveis. Ninguém perde nada na troca. É das ligações mais fortes que existem.

Silêncio. A Rosa pisca duas vezes.

— Isso foi bonito ou foi uma aula?

— Na minha experiência, ninguém nunca soube dizer.

A Pippa escreve *covalente* na terceira agenda e sublinha.`,ef:{flag:'covalente',fa:1}},
   falha:{x:c=>`— Eu acredito em... — Você procura uma frase e acha a tabela periódica. — Estatisticamente, quarenta por cento dos...

— *Estatisticamente* — repete a Rosa, com a mão no peito, para a tia Concetta, que não precisava de tradução para essa.

A sua mãe põe a mão no seu braço. É o sinal de parar. Você conhece o sinal desde os quatro anos.`,ef:{abalo:1,motivo:'estatisticamente'}}},
  {t:'Comer em silêncio e repetir a berinjela',ambos:true,
   x:c=>`${c.Q} come. A berinjela da tia Concetta tem seis camadas e nenhuma pressa. No segundo prato, a tia Concetta aponta o garfo para ${c.q} e diz uma palavra só, em italiano, que a Rosa traduz com orgulho:

— *Finalmente.* Ela disse: finalmente alguém com juízo nesta mesa.`,ef:{abalo:-1,motivo:'seis camadas de berinjela'}}
 ],
 prox:c=>pdPor(c,'pd_c2_a','pd_c2_b')});

no('pd_c2_a',{cap:2,quem:'solo',lugar:'Gull House · quarto quatro',trilha:'tensao',hora:'Domingo, 11 de junho · 15h30',
 npcs:['pippa'],
 texto:c=>`Quarto quatro. Uma hora e meia até a prova de bolo. Você abre o notebook em cima da colcha de retalhos e entra na caixa de entrada da Castellano Eventos.

Em 2022, a empresa fez vinte e seis casamentos. Em 2023, até agora, tem três no calendário. Depois de outubro do ano passado, as noivas de Boston passaram a ter pena de você, e ninguém contrata por pena a pessoa que vai organizar o dia mais feliz da própria vida.

Tem um e-mail novo, de sexta à noite. Assunto: *Mudança de planos*. É da noiva de setembro, a de Newport, a maior das três.

*Querid${c.eu.o}, espero que entenda. A minha sogra insistiu numa empresa maior. Fechamos com a Vance & Co. Você foi maravilhos${c.eu.o}. Beijos.*

A Vance & Co. A empresa da Courtney. A que neste momento está em Portugal com o dono de um bufê.`,
 ops:[
  {t:'Responder à noiva de Newport com a carta de sempre',
   x:c=>`Você tem a carta pronta. Tem desde 2016. *Que notícia boa! Fico feliz por vocês dois. A Vance & Co. é uma excelente escolha.*

Você troca *excelente* por *interessante*. Destroca. Envia com *excelente*.

O sorriso de trabalho aparece no seu rosto enquanto você digita, sozinh${c.eu.o}, num quarto de pousada, sem ninguém para ver.`,ef:{flag:'perdeu_newport',abalo:1,motivo:'a carta de sempre'}},
  {t:'Abrir a planilha da empresa e olhar o número de verdade',at:'cabeca',
   ok:{x:c=>`Você abre a aba que nunca abre na frente da Pippa. Aluguel do escritório de Back Bay, o salário dela, o seguro, o empréstimo da van.

Com dois casamentos no ano, o dinheiro acaba em novembro. Você escreve *novembro* numa célula e pinta a célula de amarelo. Fica mais fácil de olhar depois que tem cor.

Você sabe montar plano para tudo. Para isso, por enquanto, só tem um mês com nome.`,ef:{flag:'sabe_novembro'}},
   falha:{x:c=>`Você abre a planilha. Os números se embaralham do jeito que se embaralham às três da manhã. Você fecha o notebook com as duas mãos, devagar, como quem fecha a tampa de uma panela que ainda está fervendo.`,ef:{abalo:1,motivo:'a planilha'}}},
  {t:'Bater na porta do quarto da Pippa, que está do outro lado do corredor',
   x:c=>`A Pippa abre a porta com o celular na mão e a cara de quem foi pega.

— Eu não postei nada — ela diz, antes de você perguntar. — Eu só filmei. A lagosteira, a caminhonete, a balsa. Está tudo no rascunho. — Ela vira a tela. Onze vídeos. — Olha, eu sei que a empresa está mal. Eu abro a correspondência. Mas eu trabalho com você há oito meses e nunca vi ninguém resolver as coisas desse jeito. As pessoas iam querer ver. Era só você deixar.

Você diz que vai pensar. É a frase que você usa com noiva que quer pombo na cerimônia.

A Pippa conhece a frase. Ela faz que sim e não apaga os rascunhos.`,ef:{flag:'pippa_filmou'}},
  {t:'Fechar o notebook. A prova de bolo é às cinco.',ir:'pd_c2_bolo'}
 ]});

no('pd_c2_b',{cap:2,quem:'solo',lugar:'Quintal da Gull House',trilha:'tensao',hora:'Domingo, 11 de junho · 15h30',
 texto:c=>`O banco debaixo da macieira. Uma hora e meia até a prova de bolo. Você tira da mochila o que trouxe de Providence sem contar a ninguém: vinte e oito provas finais de química do segundo ano, presas com um elástico.

O ano letivo acabou na sexta. As notas fecham na quarta. Você dá aula na mesma escola pública há onze anos, na sala 214, a que tem a tabela periódica com o canto queimado, e os alunos chamam você de Mol desde antes de você descobrir.

O celular vibra. É o grupo *Química 2ºB (sem o Mol)*, do qual você faz parte desde março, por descuido de quem criou. Alguém mandou uma foto sua, tirada escondido na aula sobre ligações químicas, com a legenda: *ele explicando ligação e sendo solteir${c.eu.o}*.

Quarenta e uma risadas.`,
 ops:[
  {t:'Corrigir as provas finais',at:'cabeca',
   ok:{x:c=>`Você corrige doze em cinquenta minutos, com a caneta vermelha. A décima terceira é da Deja Monteiro, que tirou a nota mais alta da turma e escreveu na margem da última questão, a lápis:

*Prof, boa sorte no casamento do seu irmão. Não chora no discurso. Se chorar, chora no começo, que aí todo mundo perdoa o resto.*

Você dá o ponto da questão. Depois, por honestidade, dá meio ponto pelo conselho.`,ef:{flag:'provas',abalo:-1,motivo:'a margem da prova da Deja'}},
   falha:{x:c=>`Você corrige três. Na quarta, uma maçã que não existe cai da macieira que não dá maçã. É uma noz, largada por uma gaivota, bem em cima do elástico. As provas se espalham pelo quintal, e você passa vinte minutos catando química orgânica no meio das hortênsias.`}},
  {t:'Escrever a carta de recomendação que a Deja pediu, com prazo na sexta',
   x:c=>`A Deja quer estudar engenharia química em Amherst. O formulário pede uma carta de um professor.

Você não sabe escrever carta de recomendação do jeito que se escreve. Sabe escrever o que viu.

*A Deja erra em voz alta. Em onze anos, é a única aluna que eu tive que levanta a mão para dizer que errou a conta do quadro, a minha ou a dela. Um laboratório precisa mais disso do que de qualquer nota.*

Você lê de novo. Não tem um elogio que não seja um fato. Você envia.`,ef:{flag:'carta_deja'}},
  {t:'Responder no grupo dos alunos',
   x:c=>`Você digita: *Eu estou neste grupo desde março.*

O grupo fica em silêncio por um minuto inteiro. Depois:

*PROF???*
*apaga apaga apaga*
*${c.eu.g==='f'?'professora':'professor'} a foto ficou boa pelo menos*
*é verdade que ${c.eu.g==='f'?'a senhora':'o senhor'} vai num casamento? vai ter par?*

Você digita: *As notas fecham na quarta.* E depois, porque não sabe mentir nem por mensagem: *Não sei.*

Quarenta e uma risadas. De outro tipo.`,ef:{flag:'grupo_alunos'}},
  {t:'Guardar as provas na mochila. A prova de bolo é às cinco.',ir:'pd_c2_bolo'}
 ]});

no('pd_c2_planod',{cap:2,quem:'ab',tipo:'dialogo',lugar:'Cozinha da Gull House',trilha:'noite',hora:'Domingo, 11 de junho · 23h40',
 npcs:['barnaby'],
 ef:{pista:'pd_planod'},
 texto:c=>`A Pippa foi dormir. O Barnaby também, depois de deixar na mesa, sem perguntar nada, um prato de biscoito de aveia e uma garrafa de leite.

Ficou a cozinha: a luz amarela, o sino de boia no porto, a pasta aberta na aba do bolo. E no fim da pasta, aparecendo por baixo das abas coloridas, o canto de uma página grampeada por cima das outras, com uma letra D escrita à mão, com uma caneta que não é a de trabalho.`,
 comeca:E=>lsSeat(E,PD_B),
 falas:[
  {p:'A página está a um palmo da sua mão.',ops:c=>[
   {t:'— O que é a página D?',tom:'abre',tag:'pergunta'},
   {t:'(Puxar a pasta para conferir a aba do bolo. O dedo para no canto da página grampeada.)',tom:'seco',acao:true,tag:'dedo'},
   {t:'— Tem uma página aí que você pula toda vez. Eu não vou perguntar. Só estou avisando que eu vi.',tom:'cuida',tag:'vi'}
  ]},
  {p:'Sua resposta.',ops:c=>[
   {t:'(Fechar a pasta. Sem olhar e sem pressa, como quem fecha a porta de um quarto com criança dormindo.) — O plano D é só meu.',tom:'seco',acao:true,tag:'fecha'},
   {t:'— É o plano para quando o A, o B e o C não funcionam. Ninguém nunca chegou nele.',tom:'abre',tag:'ninguem'},
   {t:'— Você lê contrato de clube de vela por diversão. Eu sabia que uma hora você chegava nessa página.',tom:'flerte',tag:'contrato'}
  ]},
  {p:'De volta para você.',ops:c=>[
   {t:'— E o que acontece no plano D?',tom:'abre',tag:'acontece'},
   {t:'— Tá. É seu. Eu também tenho um caderno que ninguém lê.',tom:'cuida',tag:'caderno'},
   {t:'(Pegar um biscoito de aveia, partir no meio e empurrar a metade pelo tampo da mesa.)',tom:'flerte',acao:true,tag:'biscoito'}
  ]},
  {p:'Sua vez. O sino de boia lá fora.',ops:c=>[
   {t:'— Hoje deu certo. A lagosta, a mesa sete, o bolo. A gente trabalhou junto e deu certo.',tom:'abre',tag:'deucerto'},
   {t:'— No plano D eu paro de resolver. Eu ainda não sei como é isso.',tom:'abre',tag:'paro'},
   {t:'— Não conta para ninguém que hoje foi bom.',tom:'flerte',tag:'naoconta'}
  ]},
  {p:'Você fecha a noite.',ops:c=>[
   {t:'— Para quem eu ia contar? Para o caderno?',tom:'flerte',tag:'paraquem'},
   {t:'— Deu certo. Eu anotei. Com a caneta azul, que é a das coisas que eu não pretendo riscar.',tom:'abre',tag:'azul'},
   {t:'(Tampar a garrafa de leite, levar os dois copos até a pia e lavar os dois.)',tom:'cuida',acao:true,tag:'copos'}
  ]}
 ],
 prox:'pd_c2_fim'});
