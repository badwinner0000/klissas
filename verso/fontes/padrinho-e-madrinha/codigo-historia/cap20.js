/* ================= PADRINHO E MADRINHA · CAPÍTULO 10 · cenas novas ================= */

no('pd_c10_a',{cap:10,quem:'solo',lugar:'Cozinha do Yacht Club',trilha:'romance',hora:'Domingo, 18 de junho · 2h10',
 npcs:['dory'],
 texto:c=>`A cozinha do clube cheira a sal, manteiga clarificada e panela molhada. Ficaram duas das doze panelas de cinquenta litros, e a Dory, de avental ensopado, esfrega a penúltima com uma palha de aço do tamanho de uma frigideira.

Ela não levanta a cabeça quando você entra. Ela sabe quem é pelo passo.

— Cento e cinquenta e quatro lagostas — ela diz. — Nem uma voltou para a cozinha. Quarenta anos de barco e a primeira vez que eu servi tudo sem sobra. — Ela passa a palha na borda. — Sabe o que isso quer dizer?

Ela não espera a resposta.

— Quer dizer que eu fiz um casamento, e fiz certo. E se eu fiz um, eu faço outro. — Ela finalmente olha para você, com a cara de quem fecha negócio, que é como a Dory pede as coisas. — Eu sei cozinhar. Eu não sei o resto. Quem liga, quem escolhe a data, quem diz *não* para a tia que quer pombo. Você sabe o resto. Eu sei o que você é, a semana inteira eu vi. Você não é ${pdgA(c,'chato','chata')}. Você é ${pdgA(c,'preciso','precisa')}.`,
 ops:[
  {t:'Aceitar: um casamento por mês, o resto por conta do boca a boca',at:'labia',
   ok:{x:c=>`Você pega o caderno de um bolso, a caneta de outro, e senta no balcão de aço, entre as panelas, e na mesma hora está fazendo conta. Sete casamentos no verão, quatro no outono, preço por convidado, comissão da ilha, o seguro da van, a licença de bufê de que a Dory ainda precisa — e que você sabe tirar em duas semanas.

Ela olha você escrever, de braços cruzados, com a palha na mão.

— Você está contente — ela diz.

Você está. É a primeira vez em meses que você faz conta sem sentir nada apertar. Dory escreve, com o dedo molhado na bancada de aço, um número que é metade do que você ia pedir. Você corrige. Para cima. Ela ri, com falta de dente.`,ef:{flag:'dory_socia',vinc:1,motivoV:'sociedade com a Dory',abalo:-1,motivo:'a primeira conta sem aperto'}},
   falha:{x:c=>`Você abre o caderno e fala em prazo, em margem, em *sinergia*. A Dory escuta com a paciência de quem espera maré. No meio de *sinergia*, ela levanta a mão.

— Não precisa traduzir — ela diz. — Eu entendo de maré. Margem é a mesma coisa.

Ela corrige o seu número, de cabeça, e dá menos do que você queria, mas acerta. A conta fica boa. A Dory fica melhor do que a conta.`,ef:{flag:'dory_socia'}}},
  {t:'Dizer que vai pensar',
   x:c=>`Você diz que vai pensar. É a frase que você usa com noiva que quer pombo.

— Hm — faz a Dory. — Isso é o que você diz pra noiva que quer pombo. — Ela volta para a panela. — Se vai pensar, pense depois de comer. Tem sopa. É de ontem, mas sopa de peixe melhora com o tempo.

Ela serve em duas conchas. Você come em pé, na cozinha, às duas e quinze da manhã. Não é a sopa que resolve. Mas ajuda a conta ser de outra hora.`,ef:{abalo:1,motivo:'a frase de noiva'}},
  {t:'Perguntar à Dory o que a avó dela ia achar de tudo isso',
   x:c=>`A Dory para de esfregar. Tira do bolso do avental um papelzinho dobrado, tão gasto que parece pano.

— Ela morreu em 1998. Nunca viu o meu barco. — Ela abre o papel. É uma letra a lápis, inclinada, em crioulo. — Receita. De caldo de peixe. Eu nunca consegui tirar o número do sal. Ela não escrevia número.

${c.f('conta_lagosta')?'Você lembra do número. Três e meio por cento, o mar. A Dory já ouviu essa conta dita em voz alta, no barco, e guardou. Ela olha para o papel, depois para você.':'Você pensa no mar. Em quanto sal o mar tem.'}

— Ela ia dizer que eu demorei — a Dory fala. — E que eu escolhi bem.`,ef:{flag:'dory_receita',vinc:1,motivoV:'a receita da avó'}},
  {t:'Terminar de lavar a última panela. É o que você sabe fazer.',
   x:c=>`Você tira o relógio, arregaça as mangas e pega a segunda palha de aço. A Dory deixa. As duas lavam em silêncio, uma de cada lado da pia comprida, e a água do mar, que a Dory usa para tudo, tem o cheiro de um lugar que não precisa de empresa.

Quando a última panela vai para o escorredor, às três menos dez, a Dory, sem olhar, diz:

— Fica dito. A proposta fica de pé.`,ef:{flag:'dory_proposta',abalo:-1,motivo:'a última panela'}},
  {t:'Subir. A pista ainda tem alguém esperando.',ir:'pd_c10_salao'}
 ]});

no('pd_c10_b',{cap:10,quem:'solo',lugar:'Cais do Yacht Club',trilha:'mar',hora:'Domingo, 18 de junho · 2h10',
 npcs:['barnaby'],
 texto:c=>`O cais do clube é uma prancha comprida de madeira cinza que entra trinta metros no porto. No final dela, num banco, o Barnaby Cole, com uma garrafa térmica de metal e dois copos de papel, olhando a água preta.

Ele não saiu. Disse que ia embora a pé e saiu da tenda por esse lado. Os vasos de hortênsia estão enfileirados no cais, atrás dele, no escuro, como espectadores.

— Senta — ele diz. — Aí tem café. É ruim. — Ele não se vira. — Eu tinha um dinheiro de uma poupança e uma mulher de Providence que queria casar na ilha. Em 1991. A Ruth. Era de Rhode Island como você. Dizia que ilha era lugar de morar, não de passar. — Um gole. — Ela morreu em 2009. Foi em 2009 que eu parei de casar gente.

Você senta. O banco é pequeno, e você ocupa o mínimo, como quem não quer incomodar a memória de ninguém.

— A pergunta que eu queria fazer a semana toda — diz o Barnaby — é a mesma que ninguém faz pra mim: ${pdgB(c,'o senhor','a senhora')} volta?`,
 ops:[
  {t:'Perguntar sobre a Ruth. O que ela diria de hoje.',
   x:c=>`Você pergunta. O Barnaby não responde na hora. Serve café, devagar, nos dois copos, e entrega um.

— Ela diria que a gente se achou. — Um riso curto, de barba. — E que eu estraguei o suspense dizendo logo no primeiro dia. Eu avisei vocês dois no primeiro jantar. *Eu vou ganhar a aposta.* Ela detestava spoiler.

Ele olha o porto.

— Mas ela ia ficar do seu lado. Sempre fica do lado de quem tem medo de ficar. Ela dizia que quem tem medo de ficar é o único que sabe o preço.

O café é realmente ruim. Você bebe tudo.`,ef:{flag:'b_ruth',vinc:1,motivoV:'a conversa sobre a Ruth'}},
  {t:'Dizer que não sabe se volta a Providence em setembro',at:'coragem',
   ok:{x:c=>`Você diz. Em voz alta, para um velho florista num cais, às duas da manhã, a frase que não disse nem para o espelho: que não sabe se volta. Que a escola é boa, que os alunos gostam, que onze anos é uma vida, e que, pela primeira vez, a ideia de uma sala 214 sem tabela periódica queimada nas bordas não dá pavor.

O Barnaby escuta tudo de cabeça baixa.

— Não precisa decidir hoje — ele diz. — Eu decidi em 2009, sozinho, e não recomendo. Mas já que ${pdgB(c,'o senhor','a senhora')} perguntou: tem uma escola de ensino médio aqui, sabia? A única da ilha. Está sem professor de ciências desde fevereiro.

Ele não diz mais nada. Entrega o copo. Você segura o copo, e a informação, e os dois pesam igual.`,ef:{flag:'b_vaga_ilha',vinc:1,motivoV:'dizer que podia não voltar',abalo:-1,motivo:'dizer em voz alta'}},
   falha:{x:c=>`Você abre a boca. A frase não sai. O que sai é: *a escola começa em setembro*, no tom de professor, de quem recita calendário.

O Barnaby ouve, assente, e não insiste.

— Setembro. — Ele pensa. — É longe. Ou é amanhã. Depende de quem pergunta.`}},
  {t:'Ficar em silêncio, ao lado dele, olhando a água',
   x:c=>`Vocês ficam. Dez minutos. Quinze. O barco do Barros, o *Maria do Fogo*, balança no escuro, preso à boia, com uma lanterna acesa na popa que ninguém lembrou de apagar. A água faz um ruído de pano.

O Barnaby é a única pessoa que você já conheceu que consegue ficar quieto sem exigir que você também fique. Quando vira para você, finalmente, é só para dizer:

— ${pdgB(c,'O senhor','A senhora')} é ${pdgB(c,'bom','boa')} nisso. Não é todo mundo.

Você não sabe o que responder, e não responde, e por uma vez isso é suficiente.`,ef:{flag:'b_silencio_cais',abalo:-2,motivo:'um cais e dois copos de café ruim'}},
  {t:'Voltar para a pista. Tem alguém esperando.',ir:'pd_c10_salao'}
 ]});

no('pd_c10_amanhecer',{cap:10,quem:'ab',tipo:'segue',lugar:'Nantucket · Easton Street',trilha:'mar',hora:'Domingo, 18 de junho · 5h50',
 npcs:['pippa','barnaby'],
 texto:c=>{ const L=[];
  L.push(`O céu de Nantucket clareia por baixo, antes de acima, como se a luz subisse do porto. Cinco e cinquenta. A primeira balsa para Hyannis sai às seis e meia, e o apito, de longe, já avisa quem tem pressa.`);
  if(c.f('final_juntos')) L.push(`Sobre a escada da Gull House, de frente para a rua, dois sapatos na mão, um paletó no ombro, e dois copos de café ruim que alguém trouxe sem pedir. A Pippa, de pijama de flamingo, sentou do lado, sem dizer uma palavra, e dividiu um pedaço de bolo de limão em três.

Ninguém olha o relógio. O Barnaby passa na calçada, de avental e regador, rega os vasos da varanda como em qualquer domingo, e não olha. Ele olha. Ele já sabia desde segunda.`);
  else if(c.f('final_salao')) L.push(`Na tenda vazia, a fileira de luzinhas, já perdida contra o céu, e uma valsa que nenhum dos dois quis parar. Quando por fim a música interna acaba, alguém abre a lona do lado do mar. O sol nasce em cima da água, em cima dos vasos do Barnaby, em cima de cento e quarenta cadeiras empilhadas.

A Pippa, que não dormiu, assiste de longe, da porta da cozinha. Não filma. É a primeira vez em dez dias.`);
  else if(c.f('final_pasta')) L.push(`Dois lugares no banco do fundo da balsa, encostados na máquina de café que continua quebrada. Pela janela molhada, Nantucket vai ficando pequena, como um brinquedo de que alguém se despede com a mão.

Ninguém fala. A Pippa ficou no cais, de pijama de flamingo, acenando com as duas mãos, e a mancha amarela do vestido de linho dela é a última coisa que se vê da ilha.`);
  else L.push(`A balsa das nove não existe ainda. A de seis e meia, sim, e um dos dois está nela, no andar de cima, com a mala de rodinha, olhando o porto sem ver. O outro vai na das nove. Ninguém combinou. Os dois sabem.

Na lousa da cozinha da Gull House, a Pippa lê o placar riscado, e fica um tempo parada na frente dele, sem escrever nada.`);
  L.push(`A pasta, a de couro de quatro dedos, ficou numa cadeira da tenda. O Barnaby vai guardá-la na sala dos fundos da pousada, junto das coisas da Ruth. Ele sabe que um dia alguém vem buscar.`);
  return L.join('\n\n') },
 prox:'pd_c10_epilogo'});
