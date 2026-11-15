/* ================= PADRINHO E MADRINHA · CAPÍTULO 5 · cenas novas e reescritas ================= */

no('pd_c5_valsa',{cap:5,quem:'ab',tipo:'dividir',cada:1,lugar:'Salão da Igreja Metodista',trilha:'romance',hora:'Quarta, 14 de junho · 9h20',
 npcs:['starbuck','pippa'],
 texto:c=>`Mão no ombro. Mão na cintura. A outra mão, palma com palma, no alto. Um, dois, três. Um, dois, três.

O piso range a cada passo. O ventilador de teto gira. A Pippa filma com o celular, sem disfarçar. A Mrs. Starbuck bate a bengala no chão no tempo forte.`,
 pergunta:'Como você dança?',
 ops:[
  {t:'Conduzir. Do jeito que você conduz um casamento: firme, sorrindo, sem deixar ninguém perceber o esforço.',se:ehPA,at:'agilidade',
   ok:{x:c=>`Você conduz. Um, dois, três. Firme na mão, leve no ombro. Um giro no fim da segunda estrofe, sem aviso.

Na terceira volta pelo salão, você para de pensar nos passos. Na quarta, para de pensar no casamento. Na quinta, percebe que está olhando para ${pdnB(c)}, e faz tempo que não olha para os pés.

A Mrs. Starbuck bate a bengala uma vez, forte.

— *Isso.* — Ela aponta. — Você conduz bem. Bem demais. Você nunca deixa ninguém conduzir você, deixa?

Você não responde. Um, dois, três.`,ef:{flag:'conduziu',fa:1}},
   falha:{x:c=>`Você conduz depressa demais, no tempo do cronograma e não no da música. Na segunda volta, tropeça na tábua solta perto do piano. Na terceira, pisa no pé de ${pdnB(c)}.

A Mrs. Starbuck suspira.

— O Fred Astaire também pisava. — Ela aponta a bengala. — De novo. Mais devagar. Valsa não tem prazo.`,ef:{abalo:1,motivo:'a tábua solta'}}},
  {t:'Deixar a outra pessoa conduzir, pela primeira vez na vida, e ver o que acontece',se:ehPA,at:'coragem',
   ok:{x:c=>`Você tira a mão do ombro de ${pdnB(c)} e troca de posição. Inverte tudo. A Mrs. Starbuck levanta uma sobrancelha branca.

— Agora é a vez ${pdgB(c,'dele','dela')} — você avisa.

Nos primeiros compassos, o seu corpo tenta puxar a virada antes da hora. Três vezes. Na quarta, você deixa a virada chegar sozinha. A valsa fica mais lenta e mais torta, e você não sabe qual é o próximo passo.

Você não sabe o que fazer com as mãos sem estar conduzindo. Então só deixa.`,ef:{flag:'deixou_conduzir',vinc:1,motivoV:'deixar conduzir'}},
   falha:{x:c=>`Você troca de posição e avisa que agora não conduz. Em quatro compassos, já está conduzindo de novo, sem perceber.

A bengala bate no chão.

— Sete segundos — diz a Mrs. Starbuck. — Eu contei. O Fred Astaire aguentava dez.`}},
  {t:'Contar os passos em voz alta, como quem titula uma solução: gota a gota, até mudar de cor',se:ehPB,at:'cabeca',
   ok:{x:c=>`— Um, dois, três — você conta. — Um, dois, três. Virada no sete. Um, dois...

— ${pdgB(c,'O rapaz','A moça')} está contando alto — observa a Mrs. Starbuck, para a Pippa.

— Eu conto quando tenho medo de errar — você explica.

— Então conte. — A bengala passa a marcar o tempo junto com a sua voz. — Tem gente que reza. Tem gente que conta. O pé não sabe a diferença.

Funciona. Com a conta em voz alta, você para de olhar para o chão.

— Separados são insuportáveis — a Mrs. Starbuck comenta com a Pippa. — Juntos dão uma pessoa razoável.`,ef:{flag:'contou_passos',fa:1}},
   falha:{x:c=>`Você conta alto, erra a conta, corrige, e a correção sai no tempo errado. No fim da primeira estrofe, você está parad${oB(c)} no meio do salão, contando *um, dois, três* para um piano de armário, e a Pippa está filmando tudo.`}},
  {t:'Parar de contar. Fechar os olhos. Deixar a música dizer o passo.',se:ehPB,at:'coragem',
   ok:{x:c=>`Você para de contar no meio de um *dois*. Fecha os olhos.

O piso range. O ventilador gira. *Moon River, wider than a mile.* Sem a conta, sobram a música e o peso da mão que está na sua. Você segue as duas coisas.

Quando a música acaba, você abre os olhos. A Mrs. Starbuck está muito perto, com a bengala parada no ar.

— Parou de contar — ela diz. — Pelo jeito, demorou ${pdFB(c).idade||35} anos.`,ef:{flag:'parou_contar',vinc:1,motivoV:'parar de contar'}},
   falha:{x:c=>`Você fecha os olhos e pisa num pé, depois em outro, depois na bengala da Mrs. Starbuck, que estava apontando de muito perto.

— Abra os olhos, ${pdgB(c,'rapaz','moça')} — ela manda. — Olho fechado é para quem já sabe.`}}
 ],
 prox:'pd_c5_olhos'});

no('pd_c5_olhos',{cap:5,quem:'ab',tipo:'dividir',secreto:true,cada:1,lugar:'Salão da Igreja Metodista',trilha:'romance',hora:'Quarta, 14 de junho · 10h00',
 npcs:['starbuck','pippa'],
 texto:c=>`— Agora o exercício de que ninguém gosta — anuncia a Mrs. Starbuck. — Parados. Em posição. Sem música. Um minuto inteiro olhando nos olhos do par. Quem desviar primeiro paga a limonada.

Ela vira uma ampulheta de cozinha em cima do piano.

— O Fred Astaire desviou aos quarenta segundos. Nunca me pagou.

A Pippa para de filmar, para assistir melhor.`,
 pergunta:'O que você faz durante o minuto? (a outra pessoa só descobre no fim)',
 ops:[
  {t:'Sustentar o olhar até a areia acabar',ambos:true,ef:lsSim('olhos5'),x:c=>`${c.Q} sustenta o olhar.`},
  {t:'Desviar. Olhar o piano, a ampulheta, qualquer outra coisa.',ambos:true,x:c=>`${c.Q} desvia aos vinte segundos e olha a ampulheta.`}
 ],
 prox:'pd_c5_pai'});

no('pd_c5_a',{cap:5,quem:'solo',lugar:'Gull House · quarto quatro',trilha:'tensao',hora:'Quarta, 14 de junho · 12h00',
 npcs:['rosa'],
 texto:c=>`Meio-dia. O vestido da Gemma chegou de Boston na balsa das onze, numa capa de lona do tamanho de uma pessoa. A sua mãe pendurou na porta do seu quarto, *porque o seu quarto é o único arrumado*, e saiu para chorar no corredor.

Você abre o zíper da capa. Seda cor de marfim, sem renda, sem brilho. A Gemma escolheu em vinte minutos, descalça, numa loja de Newbury Street, e passou o resto da tarde comendo cannoli.

${c.eu.g==='f'?'O seu levou sete meses':'O seu terno levou sete meses de prova'}. Está no fundo do armário do apartamento de Back Bay, numa capa igual a esta.`,
 ops:[
  {t:'Passar o vestido a vapor, prega por prega',at:'agilidade',
   ok:{x:c=>`Você passa o vapor de baixo para cima, sem encostar o ferro, como se faz com seda. Na barra, por dentro, costurado com linha azul, tem um quadradinho de pano com a letra da Gemma, a caneta de tecido:

*Para quem estiver passando este vestido: eu sei que é você. Larga o ferro. Vai para a praia. Eu te amo. G.*

Você termina a barra. Depois larga o ferro. Vai até a janela, que é o mais perto da praia que dá para chegar antes das duas.`,ef:{flag:'bilhete_vestido',abalo:-1,motivo:'o bilhete na barra do vestido'}},
   falha:{x:c=>`O vapor sai de uma vez e pega o seu dedo. Você larga o ferro, que cai de pé, por sorte, a um palmo da seda.

Da porta, a sua mãe solta um grito que se ouve em Madaket. O vestido não tem nada. O seu dedo tem uma bolha.`,ef:{abalo:1,motivo:'o ferro a vapor'}}},
  {t:c=>'Olhar no celular a foto d'+(c.eu.g==='f'?'o seu próprio vestido':'o terno do seu casamento')+', que você nunca devolveu',
   x:c=>`A foto é de agosto do ano passado, na última prova. Você de frente para o espelho, a barra marcada com alfinete, a sua mãe chorando no canto do quadro.

Você pagou a última parcela em novembro. Um mês depois de não usar. A loja ofereceu devolver parte do dinheiro, e você disse que não precisava, com a voz de trabalho, porque quem foi largad${c.eu.o} não pechincha.

Só que você não foi largad${c.eu.o}. Você apaga a tela, sem apagar a foto.`,ef:{flag:'viu_vestido'}},
  {t:'Responder a mensagem que o Graham mandou hoje cedo',
   x:c=>`*Chego amanhã, na balsa das nove e vinte. Precisa que eu leve alguma coisa de Boston?*

O Graham sempre pergunta se você precisa de alguma coisa. Perguntou durante quatro anos. Você sempre respondeu que não, e quase sempre era verdade, e esse foi o problema inteiro.

Você escreve: *Luzinhas de tenda. Duzentos metros. A previsão é de chuva.*

Ele responde com um polegar. Depois: *É a primeira vez que você me pede uma coisa.*

Você deixa essa sem resposta.`,ef:{flag:'pediu_graham'}},
  {t:'Fechar a capa do vestido e descer. A Pippa está chamando da cozinha.',ir:'pd_c5_banda'}
 ]});

no('pd_c5_b',{cap:5,quem:'solo',lugar:'Estufa da Gull House',trilha:'tensao',hora:'Quarta, 14 de junho · 12h00',
 npcs:['barnaby'],
 texto:c=>`Meio-dia. A estufa do Barnaby é de vidro e madeira, e torta: o lado esquerdo é mais alto que o direito, e a cumeeira faz uma curva que nenhuma cumeeira devia fazer.

Ele está lá dentro, de joelhos, com doze vasos de hortênsia e um saco de terra. Não olha quando você entra. Aponta um vaso com a pá.

— Já que veio, trabalha. Essas vão para o altar.`,
 ops:[
  {t:'Replantar as hortênsias do jeito que ele manda',at:'agilidade',
   ok:{x:c=>`Você segura pela base, como ele ensinou. Solta a raiz com dois dedos, assenta, cobre.

— O azul é do solo — você comenta, sem pensar. — Solo ácido libera alumínio, a planta absorve, a flor azula. Em solo alcalino a mesma planta dá flor rosa.

O Barnaby para com a pá no ar.

— A Ruth jogava borra de café nesses vasos toda manhã. Trinta anos. Eu dizia que era simpatia.

— Borra de café acidifica.

Ele olha os doze vasos azuis por um tempo comprido.

— Então ela tinha razão — ele diz. — De novo. Até hoje ela ganha discussão.`,ef:{flag:'borra_cafe',fa:1}},
   falha:{x:c=>`Você segura pela base, mas puxa cedo, e o torrão desmancha na sua mão. Sobra uma hortênsia de raiz nua, com cara de ofendida.

O Barnaby toma a planta de você com as duas mãos e replanta em silêncio.

— Vai lavar a mão — ele diz. — E olha de longe.`}},
  {t:'Perguntar por que a estufa é torta',
   x:c=>`— Porque foi feita por duas pessoas — ele responde. — Eu queria de madeira. A Ruth queria de vidro. Em 1984, cada um construiu um lado, do seu jeito, sem falar com o outro, uma semana inteira.

Ele bate a pá na borda de um vaso.

— No sábado os dois lados se encontraram no meio e não fechavam. Ela riu tanto que sentou no chão. Ninguém consertou. — Ele olha a cumeeira. — Foi a melhor briga que a gente teve. Depois dela, ninguém mais fingiu que concordava.`,ef:{flag:'estufa_torta'}},
  {t:'Perguntar por que ele apostou em "quando pararem de fingir"',
   x:c=>`O Barnaby não finge que não sabe do que você está falando. Na idade dele, isso economiza tempo.

— Beijo é fácil — ele diz. — Eu beijei muita gente antes da Ruth. Difícil foi o dia em que eu contei para ela que tinha medo de barco. Florista de ilha, com medo de barco. Quarenta minutos de balsa e eu suava a camisa inteira.

— E ela?

— Passou a segurar a minha mão na balsa. Trinta e um anos de travessia. Nunca comentou. — Ele volta para a terra. — É nisso que eu aposto. Na hora em que um fala do que tem medo e o outro não usa aquilo depois.`,ef:{flag:'medo_barco'}},
  {t:'Lavar as mãos na torneira do quintal. A Pippa está chamando da cozinha.',ir:'pd_c5_banda'}
 ]});

no('pd_c5_ensaio',{cap:5,quem:'ab',tipo:'dividir',cada:1,lugar:c=>c.f('banda_primos')?'Garagem dos Barros · Madaket':'Tenda do Yacht Club',trilha:'abertura',hora:'Quarta, 14 de junho · 16h00',
 npcs:['dory','pippa'],
 texto:c=>`${c.f('banda_primos')?`Quatro da tarde, na garagem dos Barros, em Madaket: cinco primos, uma bateria montada entre redes de pesca e um acordeão de 1962. O tio Armando tem setenta e três anos e chora antes de tocar a primeira nota, de felicidade, como a Dory tinha avisado.

— Funaná se dança junto e ligeiro — explica a Dory, afastando um isopor com o pé. — É condição. Quero ver antes de sábado.`:`Quatro da tarde, na tenda do clube. A Pippa liga o celular na caixa de som emprestada e testa a playlist, da faixa um à faixa nove. Na faixa dez, o tio Armando, que veio com a Dory entregar gelo, tira o acordeão do carro, *só para ouvir a acústica*.

— Funaná se dança junto e ligeiro — explica a Dory, pondo o gelo no chão. — Já que estão aqui, quero ver.`}

O acordeão começa. É uma música que não deixa ninguém parado, nem quem quer.`,
 pergunta:'O que você faz?',
 ops:[
  {t:'Dançar o funaná. De verdade, no ritmo do acordeão.',ambos:true,at:'agilidade',
   ok:{x:c=>`${c.Q} entra no passo no terceiro compasso. Funaná pede joelho dobrado e quadril solto, e nenhuma das duas coisas se aprende em Boston ou em Providence. Mas o acordeão do tio Armando empurra, e de repente os pés de ${c.q} estão no lugar certo, na hora certa.

Um dos primos grita uma frase em crioulo. A Dory traduz:

— Ele disse que você nasceu na ilha errada.`,ef:{flag:'funana_ok',fa:1}},
   falha:{x:c=>`${c.Q} entra no passo errado, corrige para outro mais errado ainda, e termina dançando uma coisa que não existe em nenhum país.

O tio Armando para de tocar, de tanto rir. Depois recomeça, bem devagar, do jeito que se toca para criança.`,ef:{flag:'funana_torto'}}},
  {t:'Negociar o repertório com o tio Armando: nada de música triste antes do bolo',se:ehPA,at:'labia',
   ok:{x:c=>`— Seu Armando, a morna é linda — você começa. — E faz a mãe da noiva chorar em qualquer idioma. Antes do bolo eu preciso dela inteira.

O tio Armando pensa, com o acordeão no joelho.

— Morna depois do bolo — ele concede. — Antes, coladeira. Mas a última da noite é minha, e é triste, e ninguém me tira.

Você aperta a mão dele. É o contrato mais rápido da sua carreira.`,ef:{flag:'repertorio',fa:1}},
   falha:{x:c=>`Você explica o cronograma musical da festa, com horário. O tio Armando escuta tudo, concorda com tudo e toca uma morna de sete minutos para mostrar que entendeu.

Dois primos choram. A Dory enxuga o olho com a luva.

— Ele não trabalha com horário — ela avisa. — Trabalha com saudade.`}},
  {t:'Achar de onde vem o zumbido do amplificador do baixo',se:ehPB,at:'cabeca',
   ok:{x:c=>`O amplificador zumbe numa nota só, grave, que entra no dente. Você segue o cabo até uma extensão de três pinos com o pino do meio serrado.

— Falta aterramento — você diz. — A corrente que devia descer para a terra fica passeando no circuito.

Você troca a extensão por outra, da caixa de ferramentas do primo. O zumbido some. No silêncio, dá para ouvir o mar.

— Engenheiro? — pergunta o primo do baixo.

— Escola pública. Ensino médio.

O primo assobia, impressionado com alguma das duas coisas.`,ef:{flag:'zumbido',fa:1}},
   falha:{x:c=>`Você segue o cabo até a extensão, mexe no pino errado e leva um choque pequeno, mas ofendido. O amplificador continua zumbindo, agora meio tom acima.

— Deixa — diz o primo do baixo. — A gente toca em cima do zumbido desde 2009. Já virou parte do som.`}},
  {t:'Bater palma no tempo e deixar a música entrar',ambos:true,
   x:c=>`${c.Q} bate palma no contratempo, que é onde a Dory mandou bater. No segundo refrão, os ombros de ${c.q} desistem de ficar parados e vão junto.`,ef:{abalo:-1,motivo:'o acordeão do tio Armando'}}
 ],
 prox:c=>pdPor(c,'pd_c5_c','pd_c5_d')});
