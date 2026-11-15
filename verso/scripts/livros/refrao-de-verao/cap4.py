# Refrão de Verão · Capítulo 4 · O Bloqueio
NOS = {}

def op(tom, tag, texto, se=None, ef=None, acao=False):
    d = dict(tom=tom, tag=tag, texto=texto)
    if se: d['se'] = se
    if ef: d['efeitos'] = ef
    if acao: d['acao'] = True
    return d

NOS['rv_c4_telhado'] = dict(tipo='segue', cap=4, lugar='Chalé dos Ashby', hora='Quarta · 07h10',
 ir={'A': 'rv_c4_a', 'B': 'rv_c4_b'},
 texto="""Na quarta-feira, o telhado do chalé do velho Henry tem um quarto das telhas novas, um quarto das velhas e metade de nada, e nenhuma das duas partes parece disposta a ceder. O sol sobe por trás dos pinheiros, e o vapor do riacho se enrola nas samambaias. O rádio laranja toca, dois pontos mais baixo do que ontem, uma estação de rock clássico com um locutor que fala como quem tem a tarde livre.

{{se flag:a_tocou_melodia}}Dentro do chalé, no verso de uma fotografia, está escrita uma linha de letra. {{/se}}{{se flag:a_guardou_melodia}}Dentro do chalé, quatro notas esperam na cabeça de alguém, tão frágeis que um espirro as desfaria. {{/se}}{{se flag:a_cantarolou}}Dentro do chalé, um refrão que não é de ninguém ainda anda de um lado a outro. {{/se}}

São sete e dez da manhã. Há uma melodia a ser gravada, um telhado a ser terminado, e dois dias de convivência que ninguém, nem a cidade, soube classificar.""")

NOS['rv_c4_a'] = dict(tipo='solo', cap=4, seat='A', lugar="Pruitt's Mercantile, nos fundos", hora='Quarta · 11h00', npcs=['doris', 'lorna'],
 texto="""Você pedalou os quatro quilômetros até a Rua Principal na bicicleta do avô, de guidão torto e sino enferrujado. Nos fundos da Pruitt's Mercantile, atrás de uma cortina de contas, há uma mesa com um computador de 2009, um modem satelital de luz piscante e um cartaz: *US$ 3 / 15 MIN. NÃO É CULPA MINHA SE CAIR.*

Doris, de óculos na corrente, põe um cronômetro de cozinha ao lado do teclado. *Quinze minutos*, diz, *e eu não devolvo se cair.*

Você tem a melodia gravada no celular, um arquivo de voz de quarenta e um segundos. Quer mandá-lo à Lorna Feldt, a agente, para provar que está viva. A conexão carrega a primeira barra, a segunda e a terceira, e você, pela primeira vez em dias, quase sente que tem o controle.""",
 acoes=[
  dict(id='enviar', texto='Enviar o arquivo de voz para a Lorna, com uma frase: "Estou escrevendo. Me dá tempo."', ir='rv_c4_dividir',
   efeitos=dict(flag='a_enviou_demo', vinculo=1),
   resultado="""Você escreve: *Estou escrevendo. Tenho uma ideia. Me dá tempo.* A barra de progresso chega a noventa e quatro por cento e fica ali, tremendo, por dois minutos. Aos noventa e oito, a luz do modem apaga. Doris, com o cronômetro, diz, sem prazer: *caiu.* Você não sabe se o arquivo foi enviado ou não. A dúvida, depois de oito meses sem ideia nenhuma, é um tipo curioso de alívio."""),
  dict(id='nao_enviar', texto='Desistir de enviar: abrir o computador, olhar a caixa de e-mail e fechar sem escrever nada', ir='rv_c4_dividir',
   efeitos=dict(flag='a_nao_enviou', abalo=1),
   resultado="""Você abre o e-mail. Duzentas e quarenta mensagens novas. A mais recente, da Lorna, tem um assunto de uma palavra, *Prazo*. O corpo diz: *Gravadora quer o primeiro single até 15 de agosto. Preciso saber o que você tem.* Você olha a frase por cinco minutos. Depois fecha o navegador, paga os três dólares, e deixa a melodia, quarenta e um segundos, no celular, sem plateia."""),
  dict(id='doris', texto='Perguntar à Doris, sem rodeios, o que ela acha de gente que foge para o campo', ir='rv_c4_dividir',
   efeitos=dict(flag='a_perguntou_doris', vinculo=1),
   resultado="""— O que a senhora acha de gente que foge para o campo? — você pergunta, de olho na barra de progresso. Doris, de braços cruzados, responde sem hesitar: *eu acho que cada um foge do que merece. Se você fugiu de gente, vai se sentir bem. Se fugiu de si mesma, vai descobrir que ela veio junto, na mala.* Depois, mais baixo: *seu avô fugiu do mesmo. Ficou quarenta anos. Voltou para ele mesmo, no fim.*"""),
 ])

NOS['rv_c4_b'] = dict(tipo='solo', cap=4, seat='B', lugar='Telhado do chalé dos Ashby', hora='Quarta · 11h00',
 texto="""Do alto do telhado, de onde você vê a estrada de terra inteira até a curva do riacho, você observa a bicicleta do velho Henry descer, de guidão torto, com uma figura curvada sobre ela, a caminho da Rua Principal. A figura pedala mal, e pedala teimosa. No caminho, tropeça numa raiz, quase cai, se endireita, e continua.

Você deixa o martelo de lado. Há uma ideia ruim em cima de uma ideia pior: a de que você, que nunca perguntou a ninguém o que a pessoa foi fazer na cidade, quer saber.

Embaixo, no chão da varanda, deixado sem querer, o violão do seu pai espera, encostado no corrimão, onde você o largou ontem à noite, antes de ir embora do bar.""",
 acoes=[
  dict(id='trabalhar', texto='Voltar ao martelo e terminar o quadrante: telhado não termina sozinho', ir='rv_c4_dividir',
   efeitos=dict(flag='b_trabalhou', vinculo=0),
   resultado="""Você volta ao martelo. Pregos de cobre, telhas de cedro, o ritmo de quem sabe. Em duas horas, o quadrante sul está pronto, e o chalé, visto de cima, tem uma metade de cara nova. A outra metade, de telhas cinzas, parece olhar com inveja. É o seu jeito de pensar: com as mãos, longe de qualquer pessoa."""),
  dict(id='violao', texto='Descer, pegar o violão e tocar baixinho, na varanda, sem ninguém por perto', ir='rv_c4_dividir',
   efeitos=dict(flag='b_tocou_varanda', vinculo=1),
   resultado="""Você desce a escada, pega o violão e senta no degrau da varanda. Toca devagar, sem cantar, os acordes da música que tocou ontem. A madeira velha da casa devolve o som, e o riacho, ao fundo, entra no compasso. Ninguém ouve, e você, por duas horas, deixa de ser *o cara que conserta tudo* para ser *o cara que toca*."""),
  dict(id='seguir', texto='Largar tudo e ir, de picape, até a Rua Principal, só para conferir que a pessoa chegou bem', ir='rv_c4_dividir',
   efeitos=dict(flag='b_foi_ver', abalo=1),
   resultado="""Você desce, entra na picape e vai até a Rua Principal. Não sabe bem por quê. Estaciona em frente à Pruitt's Mercantile, vê a bicicleta encostada na vitrine e, pela janela, de longe, a figura sentada diante de um computador, de cabeça baixa. A paz que sente é irritante: *ela chegou*. Você dá meia-volta, antes que alguém o veja."""),
 ])

NOS['rv_c4_dividir'] = dict(tipo='dividir', cap=4, lugar='Chalé dos Ashby', hora='Quarta · 15h00', cada=1,
 texto="""Às três da tarde, o chalé tem as janelas abertas, um cheiro de cedro novo e uma discussão no ar que ainda não começou. O carpinteiro desce a escada de alumínio, de camiseta suada, e a outra pessoa volta da cidade, de bicicleta, com o rosto vermelho de sol e uma sacola de pão. Os dois se encontram na varanda, e nenhum dos dois, por orgulho, diz *oi*.

Entre eles, uma moldura invisível.""",
 pergunta='O que você diz ao outro?',
 acoes=[
  dict(id='direto', texto='Perguntar direto: como foi o dia, e o que ele ou ela faz da vida', efeitos=dict(flag='perguntou_direto', vinculo=1),
   resultado="""Você pergunta, sem rodeios. A pergunta, dita assim, parece mais íntima do que um beijo, e a pessoa à sua frente fica um segundo sem ar. *Eu*, diz, *trabalho com... coisas. De música. Componho, mais ou menos.* A frase sai em pedaços, e você, que sempre soube ler pedaços, entende o suficiente."""),
  dict(id='indireto', texto='Falar do telhado: mostrar o que ficou pronto, e deixar o resto implícito', efeitos=dict(flag='falou_do_telhado'),
   resultado="""Você aponta para o quadrante pronto, com o orgulho contido de quem faz coisa para durar. *Olha*, diz, *o lado sul*. A outra pessoa olha, e, depois de um segundo, diz *é bonito*, em um tom que não é cortesia. É a conversa mais pequena e mais completa que vocês tiveram, e dura onze palavras."""),
  dict(id='provocar', texto='Provocar: perguntar se é verdade que ela ou ele nunca lavou um prato', efeitos=dict(flag='provocou', abalo=1),
   resultado="""— Dizem que você nunca lavou um prato — você diz, com a cara mais inocente. A outra pessoa fica vermelha, de raiva ou de riso, e responde, com uma dignidade ferida: *eu lavei dois. Em 2019. Foi traumático.* O carpinteiro ri, alto, com a cabeça para trás, e a risada, pela primeira vez, soa a convite."""),
 ],
 desfecho="""A conversa curta vira, sem que ninguém decida, uma conversa comprida. Os dois sentam nos degraus da varanda, com um pão de forma entre eles e o violão encostado no corrimão, e a tarde fica mais longa do que devia.""",
 ir='rv_c4_dialogo')

NOS['rv_c4_dialogo'] = dict(tipo='dialogo', cap=4, lugar='Degraus da varanda, chalé dos Ashby', hora='Quarta · 16h00', comeca='B',
 texto="""A varanda de madeira cinza tem tábuas que cedem e uma vista, entre os pinheiros, do riacho. O sol de meio de junho, a esta hora, dá aos dois a cor de mel. Um pão de forma, uma faca de cozinha e um pote de manteiga de amendoim são o único cardápio.

Quando duas pessoas dividem pão em silêncio, uma delas, cedo ou tarde, diz uma coisa que não pensava dizer.""",
 turnos=[
  dict(prompt='A primeira frase é sua.', opcoes=[
    op('seco', 'u0_b_seco', '— Você não é de escritório. Ninguém de escritório pedala quatro quilômetros para mandar um e-mail.', se='eu:B'),
    op('flerte', 'u0_b_flerte', '— Você mente muito mal. E eu conheço a Doris.', se='eu:B'),
    op('abre', 'u0_b_abre', '— Você pode me contar. Eu não conto para ninguém. Eu só aceito o que você disser.', se='eu:B', ef=dict(vinculo=1)),
    op('seco', 'u0_a_seco', '— Eu não preciso de interrogatório. Eu só preciso de um telhado.', se='eu:A'),
    op('flerte', 'u0_a_flerte', '— Você tem pontaria para perguntas. E pregos. Mas só para perguntas e pregos.', se='eu:A'),
    op('abre', 'u0_a_abre', '— Eu vim para cá porque eu não sei mais escrever. É isso. É essa a minha grande revelação.', se='eu:A', ef=dict(flag='a_confessou_bloqueio', vinculo=2)),
  ]),
  dict(prompt='Agora você responde.', opcoes=[
    op('abre', 'u1_a_abre', '— Eu escrevo música. Escrevia. Há oito meses eu não escrevo nada que preste.', se='eu:A', ef=dict(vinculo=2)),
    op('seco', 'u1_a_seco', '— Eu componho. É o que eu faço. É o que eu era.', se='eu:A'),
    op('fere', 'u1_a_fere', '— Você acha que a sua vida é mais verdadeira do que a minha. Mas você só nunca saiu daqui.', se='eu:A', ef=dict(abalo=1)),
    op('abre', 'u1_b_abre', '— Eu entendo. Eu também parei, uma vez. Você aprende a viver sem aquilo, e depois aquilo volta sem pedir licença.', se='eu:B', ef=dict(vinculo=1)),
    op('seco', 'u1_b_seco', '— Isso explica a mala de seiscentos dólares.', se='eu:B'),
    op('fere', 'u1_b_fere', '— A diferença entre nós é que eu fico onde estou. Você foge para onde ninguém te conhece.', se='eu:B', ef=dict(abalo=1)),
  ]),
  dict(prompt='A conversa é sua de novo.', opcoes=[
    op('abre', 'u2_b_abre', '— Eu tinha uma banda. Eu era bom. Eu ia para Seattle, aos dezenove. O meu pai adoeceu e eu fiquei.', se='eu:B', ef=dict(flag='b_confessou_banda', vinculo=2)),
    op('flerte', 'u2_b_flerte', '— Eu cantei para você ontem. Foi uma música de dezessete anos. Eu nunca a cantei para ninguém.', se='eu:B', ef=dict(vinculo=1)),
    op('seco', 'u2_b_seco', '— Eu não tenho uma tragédia. Eu tenho um telhado, uma picape e um irmão que lava roupa aqui.', se='eu:B'),
    op('abre', 'u2_a_abre', '— Você devia ter ido. Para Seattle. Eu... eu fui, e eu não sei se foi uma boa ideia.', se='eu:A', ef=dict(vinculo=1)),
    op('seco', 'u2_a_seco', '— Eu aposto que você escreveria melhor do que eu.', se='eu:A'),
    op('cuida', 'u2_a_cuida', '— Valeu por me contar isso. Eu sei que não é fácil.', se='eu:A'),
  ]),
  dict(prompt='A última palavra da tarde é sua.', opcoes=[
    op('abre', 'u3_a_abre', '— Eu preciso de silêncio, mas não de solidão. Eu não sabia que eram coisas diferentes.', se='eu:A', ef=dict(vinculo=1)),
    op('flerte', 'u3_a_flerte', '— Se eu pedir para você me ensinar a tocar o violão do seu pai, você me ensina?', se='eu:A'),
    op('seco', 'u3_a_seco', '— Amanhã, às sete. Eu levo o pão.', se='eu:A'),
    op('abre', 'u3_b_abre', '— Eu não sei o que a gente está fazendo. Mas é a melhor tarde que eu tenho em anos.', se='eu:B', ef=dict(vinculo=1)),
    op('flerte', 'u3_b_flerte', '— O violão é meu, mas a música a gente divide. Vem amanhã, às sete, e traz o pão.', se='eu:B'),
    op('seco', 'u3_b_seco', '— Amanhã, às sete. O telhado espera.', se='eu:B'),
  ]),
 ],
 pool=[
  op('cuida', 'pl_cuida', '— Come. Você está pálid{{eu.o_a}}.'),
  op('seco', 'pl_seco', '— Ok.'),
  op('flerte', 'pl_flerte', '— Você é teimos{{eu.o_a}} como o telhado.'),
  op('abre', 'pl_abre', '— Eu nunca disse isso em voz alta.'),
  op('fere', 'pl_fere', '— Você acha que sabe tudo.'),
 ],
 fecho="""O pão acabou, a manteiga de amendoim também, e o riacho, que continua conversando, parece ter ouvido tudo e prometido não contar. O sol desce, e a sombra do telhado novo atravessa a varanda.""",
 ir='rv_c4_decisao')

NOS['rv_c4_decisao'] = dict(tipo='decisao', cap=4, lugar='Chalé dos Ashby', hora='Quarta · 21h00',
 texto="""A noite chega a Pine Hollow com um céu de uma limpeza que não existe nas cidades: estrelas até o horizonte, a Via Láctea como uma poeira derramada, e um silêncio em que dá para ouvir a própria respiração. O telhado do chalé, com um quadrante novo e outro velho, tem uma escada de alumínio encostada, e duas cervejas geladas no riacho.

Ninguém convidou ninguém. Mas a escada está lá.""",
 pergunta='O que vocês fazem com a noite?',
 ir='rv_c4_fim',
 acoes=[
  dict(id='telhado', texto='Subir ao telhado, com as cervejas, para olhar as estrelas', efeitos=dict(flag='subiram_telhado', vinculo=2),
   resultado="""Vocês sobem. A escada de alumínio é fria, as telhas novas guardam o cheiro de cedro, e, do alto, a noite é do tamanho do mundo. Duas cervejas abertas com a mesma chave. A primeira estrela cadente aparece, e nenhum dos dois faz pedido."""),
  dict(id='varanda', texto='Ficar na varanda, no chão, de costas, olhando as estrelas de baixo', efeitos=dict(flag='ficaram_varanda', vinculo=1),
   resultado="""Vocês deitam nas tábuas da varanda, lado a lado, de costas, com a manta xadrez do sofá nos joelhos. O céu, daqui, tem a mesma largura, e as tábuas, mais firmes do que o telhado, dão uma segurança de quem sabe cair pouco. Ninguém fala por muito tempo."""),
  dict(id='dormir', texto='Ir dormir: o dia foi comprido, e a conversa já foi demais para uma quarta', efeitos=dict(flag='foram_dormir'),
   resultado="""Vocês decidem dormir. Cada um por si, o carpinteiro de volta à picape e a outra pessoa à cama de dossel do avô, com cheiro de cachimbo. É a decisão mais sensata, e a mais triste, e as estrelas, lá fora, continuam acesas para ninguém."""),
 ])

NOS['rv_c4_fim'] = dict(tipo='fim', cap=4, lugar='Chalé dos Ashby', hora='Quinta · 01h00',
 texto="""À uma da manhã de quinta, o céu sobre Pine Hollow tem tantas estrelas que parece um engano. {{se flag:subiram_telhado}}No telhado do chalé, duas pessoas, de cervejas quase vazias, falam baixo, em frases curtas, de coisas que nenhuma delas pretendia dizer. {{/se}}{{se flag:ficaram_varanda}}Na varanda do chalé, duas pessoas deitadas lado a lado olham o mesmo céu e não se tocam, e a ausência de toque é mais clara do que um abraço. {{/se}}{{se flag:foram_dormir}}No chalé, uma pessoa dorme mal, e, na picape, a caminho de casa, outra pensa em uma tarde. {{/se}}{{se flag:a_confessou_bloqueio}}Alguém disse, em voz alta, que não sabe mais escrever, e ninguém riu. {{/se}}{{se flag:b_confessou_banda}}Alguém disse, em voz alta, que quase foi para Seattle, e ninguém riu. {{/se}}{{se flag:a_enviou_demo}}Em algum satélite, um arquivo de quarenta e um segundos viaja sem destino certo. {{/se}}{{se flag:a_nao_enviou}}No celular, uma melodia de quarenta e um segundos espera sem plateia. {{/se}}

Mais tarde, quando a outra pessoa finalmente dorme, no quarto do avô, uma coisa, no escuro, se mexe no fundo da cabeça, e não é um pensamento, é uma música inteira. Os versos vêm em ordem, como uma carta. O refrão chega por último, simples, de quatro palavras, que ninguém, na história do pop, usou desse jeito.

Na penumbra, a mão procura o caderno e uma caneta.""",
 gancho="Pela primeira vez em oito meses, uma música inteira chega de uma vez.",
 ir='rv_c5_composicao')
