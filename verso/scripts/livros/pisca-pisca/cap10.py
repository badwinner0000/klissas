# Pisca-Pisca · Capítulo 10 · Pisca-Pisca (quarta 24 à noite, quinta 25 de dezembro)
NOS = {}

def op(tom, tag, texto, se=None, ef=None, acao=False):
    d = dict(tom=tom, tag=tag, texto=texto)
    if se: d['se'] = se
    if ef: d['efeitos'] = ef
    if acao: d['acao'] = True
    return d

NOS['pp_c10_contagem'] = dict(tipo='segue', cap=10, lugar='Plataforma da árvore, Cooper Green', hora='Quarta, 24 de dezembro · 18h59',
 ir='pp_c10_gesto',
 texto="""— Cinco! — grita Odalys Quiñones, e a voz dela, no megafone, falha como a de uma criança. — Quatro!

O mundo, em Cooper Green, reduz-se a poucas coisas. A fechadura pequena, de latão, na frente de cada interruptor. O barbante vermelho ou azul que prende cada chave ao pulso. O rosto do outro, a dez metros, iluminado pela lâmpada de emergência da plataforma. As quatrocentas respirações em volta, que viram uma só. A neve, que parou.

{{se flag:duas_metades}}A árvore está dividida em duas metades, e cada metade tem o seu interruptor: se um dos dois atrasar um segundo, o transformador da cidade corta tudo. {{/se}}Não há tempo para ensaiar uma frase. Há tempo, só, para uma coisa.""")

NOS['pp_c10_gesto'] = dict(tipo='dividir', cap=10, lugar='Plataforma da árvore, Cooper Green', hora='Quarta, 24 de dezembro · 18h59', cada=1,
 texto="""Três segundos. Duas pessoas, cada uma com a sua chave, a sua fechadura, o seu nome na boca de uma cidade inteira que as olha. Todo o trabalho dos últimos sete dias, a planilha, o caderno, a briga, o andaime, a tempestade, cabe agora em um gesto.

Cada um tem o mesmo problema, de lados opostos: o que faz, quando não dá mais para esconder o que a gente é?""",
 pergunta='O que você faz?',
 acoes=[
  dict(id='falar', texto='Falar em voz alta, para a praça inteira, o que você quer de verdade', efeitos=dict(flag='gesto_falou', vinculo=2),
   variantes=[
    dict(se='flag:a_leu_caderno || flag:b_disse_verdade || flag:confessou_cornell || flag:confessou_cornell_festa', resultado="""Você pega o megafone da mão da Odalys, que o entrega sem protestar, e diz, para quatrocentas pessoas, com a voz firme e o coração aos pulos: *esse ginkgo de vidro é meu. Eu o desenhei, eu o medi, quatro madrugadas. E eu me inscrevi em Cornell, e não sei se vou, e quero decidir olhando para a pessoa que está do outro lado dessa praça.* A praça fica em silêncio. Depois, de algum lugar, alguém bate palmas, e os outros seguem."""),
    dict(se='', resultado="""Você pega o megafone da mão da Odalys, que o entrega sem protestar, e diz, para quatrocentas pessoas, com a voz firme e o coração aos pulos, a coisa que passou sete dias sem conseguir dizer baixinho. Não é longa, e não é bonita. É verdadeira. Quando termina, a praça fica em silêncio, e depois, de algum lugar, alguém bate palmas, e os outros seguem."""),
   ]),
  dict(id='soltar', texto='Soltar o controle: não conferir nada, não ter plano B, entregar o segundo ao outro', efeitos=dict(flag='gesto_soltou', vinculo=2),
   resultado="""Você tira a prancheta do braço, devagar, e a entrega ao Nico, que está ali ao lado, de olhos arregalados. Dobra a folha de cálculo ao meio e a coloca no bolso do menino. Pela primeira vez em dezoito anos, não há uma folha, um cronômetro, um segundo cálculo de reserva. Só uma chave, um olhar do outro lado e a confiança de que o outro vai apertar junto."""),
  dict(id='calar', texto='Não dizer nada, só olhar e apertar na hora', efeitos=dict(flag='gesto_calou'),
   resultado="""Você não diz nada. Olha para a outra pessoa, a dez metros, e segura a chave com a mão firme. O que existe entre os dois nesse segundo é um tipo de silêncio que não esconde nada, porque não tem o que esconder. É a primeira vez em dois anos que o silêncio entre vocês não é uma recusa."""),
 ],
 desfecho="""Dois segundos. Cada um dos dois, do seu lado da plataforma, fez a sua escolha em frente a quatrocentas testemunhas. A fechadura espera, de latão, brilhando de leve na luz de emergência.""",
 ir='pp_c10_acende')

NOS['pp_c10_acende'] = dict(tipo='decisao', cap=10, lugar='Plataforma da árvore, Cooper Green', hora='Quarta, 24 de dezembro · 19h00',
 texto="""— Um! — grita Odalys, e a praça inteira, em coro, repete.

Só falta uma coisa, e é a mais simples e a mais difícil: apertar no mesmo segundo.""",
 pergunta='Como vocês apertam?',
 ir='pp_c10_luz',
 acoes=[
  dict(id='juntos', texto='Olhar um para o outro e apertar no instante em que o outro apertar', efeitos=dict(flag='apertaram_olhando', vinculo=2),
   resultado="""Vocês se olham, e as duas chaves giram ao mesmo tempo, sem sinal nenhum, como se uma só mão controlasse os dois pulsos."""),
  dict(id='contar', texto='Contar baixinho, os dois, até três, e apertar no três', efeitos=dict(flag='apertaram_contando', vinculo=1),
   resultado="""Vocês contam baixinho, em coro, sem combinar, *um, dois, três*, e as duas chaves giram no três, quase juntas, com a diferença de um piscar de olhos que só a árvore vai saber."""),
  dict(id='respirar', texto='Esperar uma respiração, a mesma, e apertar na expiração', efeitos=dict(flag='apertaram_respirando', vinculo=2),
   resultado="""Vocês esperam. Os dois inspiram, ao mesmo tempo, sem planejar, e expiram. As duas chaves giram na expiração, e o ar sai dos dois juntos como um suspiro de alívio."""),
 ])

NOS['pp_c10_luz'] = dict(tipo='segue', cap=10, lugar='Cooper Green', hora='Quarta, 24 de dezembro · 19h00',
 ir='pp_c10_manha',
 texto="""Por um segundo e meio, nada acontece. É o mesmo segundo e meio da Acendida, ano após ano, aquele em que a cidade inteira prende a respiração. Depois, no alto de uma árvore de doze metros, uma estrela de oito pontas gira, com o motorzinho de relógio de 1987, e acende, uma ponta por vez, em latão e vidro soprado, e depois todas juntas.

A luz desce pela espiral, ramo após ramo, em fios quentes, de baixo para cima, de cima para baixo, em um desenho que ninguém ensaiou, e que nenhuma planilha previu. {{se flag:cedeu_a}}As mil lâmpadas que a nº 8 perdeu não fazem falta: a árvore é mais bonita assim, mais escura nos lugares certos. {{/se}}{{se flag:cedeu_b}}O buraco no ginkgo, que a nº 11 cedeu, virou o lugar onde a luz da estrela cai, e parece sempre ter estado ali. {{/se}}{{se flag:duas_metades}}As duas metades acendem no mesmo instante, e a cidade vê, pela primeira vez, uma árvore de duas casas. {{/se}}

Quatrocentas pessoas fazem um *ooooh* que sobe até o céu limpo. Na primeira fila, a nonna Concetta e a Pó-pó, de mãos dadas, de cobertor, choram do mesmo jeito. Sal Tedeschi, de joelhos, de carta na mão, olha a estrela, e Lily Lau põe a mão no ombro dele, sem pedir licença. Atrás de todos, Odalys, de megafone baixo, esquece pela segunda vez de dar uma ordem.

O transformador da cidade zumbe, uma vez, e aguenta.""")

NOS['pp_c10_manha'] = dict(tipo='segue', cap=10, lugar='Harmon Place', hora='Quinta, 25 de dezembro · 07h30',
 ir={'A': 'pp_c10_a', 'B': 'pp_c10_b'},
 texto="""Manhã de Natal em Dyker Heights tem um som de neve derretendo, de calha pingando e de ônibus de turismo longe. Pela primeira vez em onze anos, a nº 8 e a nº 11 acordam sem luzes, sem trenó, sem Papai Noel de braço mecânico, sem ginkgo de vidro. A rua inteira está escura, e é a rua mais bonita que a rua já foi.

No fim de Harmon Place, em Cooper Green, a árvore de doze metros brilha, sozinha, de dia, porque o seu Szymanski prometeu que o transformador agora aguenta, sempre, qualquer coisa que os dois fizerem juntos. No topo, a estrela de oito pontas continua a girar, devagar.

O celular dos dois vibra, no mesmo minuto, em duas casas diferentes.""")

NOS['pp_c10_a'] = dict(tipo='solo', cap=10, seat='A', lugar='Cozinha da nº 8', hora='Quinta, 25 de dezembro · 07h40',
 texto="""Você desce a escada da nº 8 de meias e encontra a cozinha ocupada: a nonna Concetta, de avental, na frente do fogão a lenha; o seu pai, Sal, de olhos vermelhos, com um envelope aberto ao lado de uma xícara de café; a sua mãe, Angela, de braços cruzados, mas de sorriso; e o Nico, de pijama de dinossauro, comendo biscoito.

Em cima da mesa, três lugares a mais do que o costume. A nonna, sem se virar, diz: *a Lily e a Pó-pó vêm às nove. Trazem dumplings. Eu fiz o pão de ló.*

No seu celular, uma mensagem de um número que você sabe de cor.""",
 acoes=[
  dict(id='responder', texto='Responder agora, sem pensar, o que você sente', ir='pp_c10_final',
   efeitos=dict(flag='a_respondeu_manha', vinculo=1),
   resultado="""Você escreve, com o polegar, sem apagar nenhuma letra: *Feliz Natal. Eu quero ver você hoje, e amanhã, e depois de amanhã. Se você for para Ithaca, eu pego o ônibus de seis horas em fevereiro. E em março. E eu não vou fazer planilha.* Envia. Pela primeira vez, você não confere duas vezes."""),
  dict(id='ir_la', texto='Largar o café, pôr o casaco e atravessar a rua até a nº 11', ir='pp_c10_final',
   efeitos=dict(flag='a_atravessou_manha', vinculo=2),
   resultado="""Você veste o casaco por cima do pijama, calça as botas do seu pai e atravessa Harmon Place, de meias molhadas, até a varanda da nº 11. Antes que você bata, a porta se abre. A pessoa do outro lado está de pijama também, de cabelo bagunçado, com o celular na mão e uma mensagem escrita pela metade."""),
  dict(id='esperar', texto='Deixar a mensagem sem resposta até a hora do almoço, e aproveitar o Natal em casa', ir='pp_c10_final',
   efeitos=dict(flag='a_esperou_manha'),
   resultado="""Você põe o celular de lado, de tela para baixo, e se senta à mesa. Come uma fatia de pão de ló. Ouve o seu pai ler, em voz alta, uma carta de treze anos. A resposta pode esperar uma manhã. Hoje, a coisa que precisava de você está dentro da cozinha."""),
 ])

NOS['pp_c10_b'] = dict(tipo='solo', cap=10, seat='B', lugar='Varanda da nº 11', hora='Quinta, 25 de dezembro · 07h40',
 texto="""Você acorda na nº 11 com a luz de um sol de dezembro por cima do ginkgo nu, o caderno de capa verde aberto na mesa, e a Pó-pó, de xale, sentada ao lado, mexendo uma tigela de congee de gengibre.

*A Lily e a Concetta combinaram um café da manhã*, ela diz, sem olhar. *Eu vou fingir que me surpreendi.*

No celular, dois e-mails. O primeiro, de Cornell, com o assunto *Decisão de Admissão Antecipada*. O segundo, de um número que você sabe de cor: uma mensagem curta, sem ponto final.""",
 acoes=[
  dict(id='abrir_junto', texto='Atravessar a rua com o e-mail fechado e abrir junto com {{A.nome}}', ir='pp_c10_final',
   efeitos=dict(flag='b_abriu_junto', vinculo=2),
   resultado="""Você atravessa a rua de botas, com o celular fechado na mão, até a varanda da nº 8, onde a porta se abre antes de você bater. Vocês sentam nos degraus de entrada, lado a lado, em frente à árvore que brilha de dia, e você estende o telefone. *Abre você*, diz {{A.nome}}, *e eu leio junto.* O e-mail diz o que você esperava e o que você tinha medo de esperar, e fica ali, aberto, entre os dois, sem que nenhum dos dois precise fingir nada."""),
  dict(id='abrir_sozinho', texto='Abrir o e-mail agora, na varanda, e contar depois', ir='pp_c10_final',
   efeitos=dict(flag='b_abriu_sozinho'),
   resultado="""Você abre. O e-mail é curto, formal, com um parágrafo de parabéns e uma data limite de resposta que cai em maio. Você lê duas vezes, e o que sente não é alegria nem medo: é o contrário de fugir. Você tem tempo. Pela primeira vez, tem tempo para decidir olhando para alguém."""),
  dict(id='nao_abrir', texto='Não abrir o e-mail hoje: Natal é Natal, e a decisão é para depois', ir='pp_c10_final',
   efeitos=dict(flag='b_nao_abriu', vinculo=1),
   resultado="""Você põe o celular de lado. O e-mail fica ali, fechado, com a palavra *Decisão* no assunto, e a Pó-pó, sem ter visto nada, murmura: *quando se está com a casa cheia, a resposta pode esperar até depois do pão de ló.* Pela primeira vez, a decisão de não decidir não é fuga: é um jeito de ficar."""),
 ])

NOS['pp_c10_final'] = dict(tipo='final', cap=10, lugar='Harmon Place', hora='Quinta, 25 de dezembro · 09h00',
 finais=[
  dict(se='vinc>=14 && flag:beijo_andaime', texto="""Às nove em ponto, a nº 8 e a nº 11, pela primeira vez em doze anos, têm a mesma mesa. A nonna Concetta partiu o pão de ló em dezesseis fatias, a Pó-pó trouxe os dumplings, Sal Tedeschi e Lily Lau trocaram, numa cozinha, um aperto de mão que durou mais que o necessário. Os dois do projeto, de pijama e de botas, chegaram juntos, cada um por uma porta, e a mesa abriu dois lugares lado a lado, sem que ninguém precisasse dizer o motivo.

Do outro lado da janela, a árvore de doze metros brilha de dia. A estrela gira, devagar, com o motor de 1987. Debaixo dela, no banco de pedra, ninguém.

Cornell responde em maio, ou em abril, ou antes. {{A.nome}} e {{B.nome}} não sabem se vão para Ithaca, se ficam, se um segue o outro, se ninguém segue. Mas o beijo do andaime já aconteceu, a árvore já acendeu, e há, em um bairro do Brooklyn, duas casas que, em 2026, vão enfeitar a mesma rua, juntas.

*Pisca-pisca*, diz Mei, de nove anos, olhando a estrela pela janela, com a boca cheia de dumpling. E a rua inteira, sem combinar, repete."""),
  dict(se='vinc>=8', texto="""Às nove, a mesa da nº 8 tem dezesseis lugares e quinze pessoas, e o décimo sexto fica vazio por um segundo, até alguém, devagar, puxar a cadeira. A nonna Concetta e a Pó-pó trocam receitas. Sal e Lily falam de transformador. Os dois do projeto, sentados lado a lado, sem pressa, descobrem que a coisa mais difícil, em um dia de Natal, é não dizer nada e ficar.

Do lado de fora, a árvore brilha, de dia, de doze metros, de estrela. Cornell responde, em algum momento, sem pressa. {{A.nome}} e {{B.nome}} não sabem o que isso muda, e sabem, os dois, que a decisão é de dois.

*Feliz Natal*, diz alguém, e a mesa inteira responde, em duas línguas e três sotaques."""),
  dict(texto="""A árvore acendeu. Por sete noites, duas famílias que não se falavam fizeram uma coisa juntas, e o transformador, a cidade e a estrela de 1987 aguentaram. O que existe entre {{A.nome}} e {{B.nome}} ainda é incerto: uma amizade de infância que quase virou outra coisa, uma carta de Cornell por abrir, uma planilha dobrada numa gaveta.

Não é um final feliz de filme. É um começo de manhã: a rua escura, a árvore acesa, e duas casas com as janelas abertas, uma em frente à outra, como sempre estiveram."""),
 ])
