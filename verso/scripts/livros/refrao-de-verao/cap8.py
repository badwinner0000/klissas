# Refrão de Verão · Capítulo 8 · A Escolha
NOS = {}

def op(tom, tag, texto, se=None, ef=None, acao=False):
    d = dict(tom=tom, tag=tag, texto=texto)
    if se: d['se'] = se
    if ef: d['efeitos'] = ef
    if acao: d['acao'] = True
    return d

NOS['rv_c8_noite'] = dict(tipo='segue', cap=8, lugar='Pine Hollow', hora='Segunda · 22h00',
 ir={'A': 'rv_c8_a', 'B': 'rv_c8_b'},
 texto="""Quatorze dias é um prazo cruel para qualquer coisa, e um absurdo para um álbum. Em Pine Hollow, às dez da noite, o xerife conseguiu limpar a porteira do chalé, as vans foram embora para o motel de Republic, a trinta quilômetros, e a Rua Principal, que passou o dia como feira, voltou a ser uma rua. Os grilos, que não leem notícia, recomeçaram o coro.

{{se flag:noite_lago}}Na cama de dossel, ainda há o cheiro de duas pessoas. {{/se}}{{se flag:deram_espaco}}O combinado de dar espaço dura menos do que se esperava. {{/se}}{{se flag:insistiram}}A conversa da varanda não acabou. {{/se}}{{se flag:romperam}}O encerramento foi educado, e a educação, quando passa a hora, pesa mais do que a raiva. {{/se}}O telefone fixo, na cozinha, está fora do gancho, e o celular, na pedra, desligado.

A noite, que parecia ter acabado de começar, é a única ferramenta que sobrou.""")

NOS['rv_c8_a'] = dict(tipo='solo', cap=8, seat='A', lugar='Sala do chalé dos Ashby', hora='Terça · 02h00',
 texto="""Você começa às dez, com um café de coador, o piano desafinado, o caderno preto e uma folha de papel de pão colada na parede, onde escreveu *14 DIAS*. Às meia-noite, tem duas faixas. À uma, quatro. Às duas, com os dedos doloridos e a garganta rouca, tem seis, e a sétima, que ainda não tem nome, está se escrevendo sozinha.

As músicas são todas tristes. Isso não era o plano. O plano era um álbum de verão, de batida, de refrão que se canta no carro. Mas cada canção que sai das suas mãos tem o peso de uma casa de madeira, de um riacho, de um telhado, de uma pessoa que talvez não volte. A palavra *perder* aparece em cinco títulos.

Você olha a folha da parede. Faltam treze dias, e a sua mão não sabe escrever outra coisa.""",
 acoes=[
  dict(id='escrever', texto='Continuar escrevendo até o amanhecer, sem corrigir, sem julgar', ir='rv_c8_a2',
   efeitos=dict(flag='a_escreveu_noite', vinculo=1),
   resultado="""Você escreve até o amanhecer. A sétima faixa vira oitava, depois nona, depois uma coisa que não tem título, só uma melodia de quatro notas e uma frase: *o verão é uma coisa que a gente aprende a perder.* Quando a luz do dia entra pela janela, o chão da sala está coberto de folhas, e você, pela primeira vez em oito meses, tem um álbum."""),
  dict(id='alegre', texto='Parar e tentar escrever uma música alegre, só para equilibrar', ir='rv_c8_a2',
   efeitos=dict(flag='a_tentou_alegre', abalo=1),
   resultado="""Você tenta. Um refrão de verão, de batida, de carro de janela aberta. Vem em dez minutos, redondo, um hit de rádio, o tipo que a gravadora ama. Você o toca duas vezes e o rasga. É bom, e é mentira. Volta ao caderno e escreve, por cima, uma estrofe triste, e o refrão alegre vira, sem querer, uma ironia."""),
  dict(id='ligar', texto='Ir até a pedra do sinal, de madrugada, e ligar para a pessoa que deixou o violão', ir='rv_c8_a2',
   efeitos=dict(flag='a_tentou_ligar', vinculo=1),
   resultado="""Você sai de madrugada, de lanterna na mão, até a pedra de sinal. Digita o número, e para, com o dedo sobre a tela. Quatro horas da manhã. Nenhuma frase serve. Guarda o telefone no bolso, e volta pelo mato, com o orvalho molhando as botas, mais leve e mais pesada, de quem quase fez uma coisa."""),
 ])

NOS['rv_c8_a2'] = dict(tipo='solo', cap=8, seat='A', lugar='Varanda do chalé dos Ashby', hora='Terça · 10h00', npcs=['sarah'],
 texto="""De manhã, depois de uma noite sem dormir, com os olhos vermelhos e uma xícara de café já fria, você abre a porta da varanda e dá de cara com uma mulher de trinta anos, de cabelo preto, de casaco azul-marinho, parada no último degrau. Ela não traz máquina, nem microfone, nem sorriso.

— Sarah Brandt — diz ela, sem estender a mão. — Eu sou a ex de {{B.nome}}. Eu não vim brigar. — Uma pausa curta. — Eu vim perguntar uma coisa, e eu quero que você responda de verdade, porque eu vou saber se for mentira.

O vento mexe no casaco azul-marinho. Atrás dela, uma picape velha, de adesivo de *Eu freio para alces*, está estacionada na beira da estrada, vazia. Você não sabe se ela veio sozinha, ou se foi mandada.""",
 acoes=[
  dict(id='responder', texto='Dizer que ouvirá a pergunta, e que responderá com a verdade', ir='rv_c8_dividir',
   efeitos=dict(flag='a_ouviu_sarah', vinculo=1),
   resultado="""— Pergunte — você diz. Sarah olha você por um tempo comprido. *Você vai embora*, diz, *em agosto. Eu quero saber se você já decidiu se vai dizer isso a ele de frente, ou se vai deixar a cidade fazer isso por você.* A pergunta, tão simples, é a mais dura que você ouve na semana. *Eu ainda não sei*, você diz. *Mas eu não vou fugir sem dizer.*"""),
  dict(id='defender', texto='Dizer que não deve explicações a ninguém, e pedir que ela vá embora', ir='rv_c8_dividir',
   efeitos=dict(flag='a_expulsou_sarah', abalo=1),
   resultado="""— Eu não devo explicação a ninguém — você diz, e a frase sai com a mesma firmeza de um comunicado de imprensa. Sarah assente, sem raiva. *Entendi*, diz. *Foi o que eu pensei.* Desce os degraus, e, no último, vira o rosto: *ele merece que alguém lhe deva uma explicação.* A picape dá a partida, e a frase, pesada, fica na varanda."""),
  dict(id='convidar', texto='Convidar a Sarah a entrar e a tomar um café, como duas adultas', ir='rv_c8_dividir',
   efeitos=dict(flag='a_convidou_sarah', vinculo=2),
   resultado="""— Quer entrar? — você pergunta. — O café está horrível, mas está quente. — Sarah hesita, e entra, e senta na beira do sofá de manta xadrez, com a caneca na mão, olhando o piano. Em dez minutos, as duas, que não se conhecem, estão conversando sobre um homem de boné, e, sem querer, sobre quanto cada uma o ama. É a conversa mais estranha e mais honesta do verão."""),
 ])

NOS['rv_c8_b'] = dict(tipo='solo', cap=8, seat='B', lugar='Casa dos Lindqvist', hora='Terça · 08h00', npcs=['caleb'],
 texto="""Você acorda no sofá, com o violão da sua infância no peito, a luz da manhã nos olhos e uma sensação de ressaca sem cerveja. O seu irmão Caleb está de pé, na frente da janela, de braços cruzados, com a cara de um oficial de justiça.

— Eu vou dizer uma coisa, e você vai ficar quieto — diz. — Você é o melhor homem que eu conheço. E é um idiota. — A palavra cai como uma ferramenta. — A moça mentiu? Mentiu. Por omissão. Você teria feito o mesmo se tivesse doze Grammys e um país inteiro atrás. Ela veio para cá para fugir de uma coisa, e achou uma pessoa. Você acha que isso é *usar*? Isso é sorte.

— Eu não — você começa. — Cala a boca — diz Caleb. — O violão do papai está no chalé dela, ou estava, até você deixar. Você abriu o coração para uma pessoa pela primeira vez em dois anos, e agora você vai fingir que foi tudo cenário.""",
 acoes=[
  dict(id='ouvir', texto='Ouvir o Caleb até o fim, em silêncio, e admitir que ele tem razão em parte', ir='rv_c8_dividir',
   efeitos=dict(flag='b_ouviu_caleb', vinculo=2),
   resultado="""Você ouve. O irmão fala por cinco minutos, em voz baixa, sem teatro, como nunca falou. No fim, você diz uma só frase: *em parte.* Caleb sorri, sem triunfo. *Em parte é um começo*, diz. *Come alguma coisa. Depois você decide o resto.*"""),
  dict(id='brigar', texto='Discordar: dizer ao Caleb que ele não sabe o que é ser deixado para trás', ir='rv_c8_dividir',
   efeitos=dict(flag='b_brigou_caleb', abalo=2),
   resultado="""— Você não sabe o que é ficar — você diz. — Você vai e volta quando quer. Eu fiquei. Eu fiquei com o papai, com a casa, com a cidade. E agora tem alguém que, em dois meses, vai embora, e eu sou o cara que vai assistir. — Caleb fica em silêncio. Depois, baixo: *eu sei o que é ficar. Eu só nunca falei.* E sai, batendo a porta com o tipo de silêncio que dói."""),
  dict(id='sair', texto='Pegar a picape e ir para o telhado do chalé: a calha precisa ser terminada', ir='rv_c8_dividir',
   efeitos=dict(flag='b_foi_calha', vinculo=1),
   resultado="""Você pega a caixa de ferramentas e a picape, e sobe a estrada de terra. A calha do chalé, que ficou para o fim, está do jeito que você deixou. Você sobe a escada, pega o martelo, e trabalha em silêncio, com o riacho ao fundo e a janela do piano, lá embaixo, aberta. Não olha para dentro. Mas ouve."""),
 ])

NOS['rv_c8_dividir'] = dict(tipo='dividir', cap=8, lugar='Chalé dos Ashby', hora='Terça · 16h00', cada=1,
 texto="""À tarde, o chalé do velho Henry tem as janelas abertas, cheiro de tinta fresca e uma folha na parede, onde está escrito *13 DIAS*. A calha, a última peça do telhado, está pronta. As vans foram embora. O sol do fim de julho entra pelas frestas e marca um quadrado dourado no tapete.

Entre as duas pessoas, a única coisa que falta ser dita é o que cada uma vai fazer com a data de volta.""",
 pergunta='O que você decide?',
 acoes=[
  dict(id='voltar', seat='A', texto='Aceitar a turnê: voltar para Seattle e para a vida, no dia 30 de agosto', efeitos=dict(flag='aceitou_voltar', abalo=1),
   resultado="""Você diz à Lorna, pelo telefone fixo, às quatro e dez da tarde: *eu volto no dia trinta.* A palavra *volto* sai com a facilidade de uma coisa antiga. Do outro lado, a Lorna suspira, de alívio ou de pena. *Eu mando um carro*, ela diz. *Eu sabia que você ia aceitar.* Você desliga, e o chalé, em volta, parece ter ficado menor."""),
  dict(id='cancelar', seat='A', texto='Cancelar a turnê: dizer à Lorna que você precisa de mais do que um verão', efeitos=dict(flag='cancelou_turne', vinculo=2),
   resultado="""Você diz à Lorna, pelo telefone fixo, com a voz mais calma que já usou: *eu não vou voltar para a turnê.* Do outro lado, um silêncio de planilha em chamas. *Você sabe o que isso custa*, diz Lorna. *Eu sei*, você diz. *Eu também sei o que custa não fazer.* Você desliga, de mãos tremendo, e a folha de papel de pão, na parede, parece mais leve."""),
  dict(id='negociar', seat='A', texto='Negociar: dizer que volta, mas só depois de dois meses de álbum em Pine Hollow', efeitos=dict(flag='negociou_volta'),
   resultado="""Você diz à Lorna: *eu volto, mas em outubro. Eu termino o álbum aqui.* Lorna faz uma pausa. *Eu vou tentar*, diz, *mas o Marco vai dizer não.* Você diz *então peça de novo*. É uma negociação de adulta, e a mais egoísta e mais honesta que você faz. Ela desliga, e o resultado, como toda negociação, é incerto."""),
  dict(id='pedir', seat='B', texto='Pedir a ela, de frente, que não vá, ou que volte logo', efeitos=dict(flag='b_pediu_ficar', vinculo=2),
   resultado="""Você diz, sem teatro: *eu não sei se eu quero que você vá. Eu sei que eu não quero que você suma.* A frase sai mais clara do que você planejou. A pessoa à sua frente olha para você com os olhos úmidos, e a resposta, que não vem, é um tipo de resposta."""),
  dict(id='nao_pedir', seat='B', texto='Não pedir nada: dizer que é decisão dela, e que você aceita o que ela escolher', efeitos=dict(flag='b_nao_pediu', abalo=1),
   resultado="""Você diz: *é decisão sua. Eu aceito o que você escolher.* A frase, dita com a mão firme e o rosto calmo, é a coisa mais nobre e mais covarde que você faz. A pessoa à sua frente assente, devagar, e é tarde demais para você perceber que esperava, no fundo, que ela discordasse."""),
  dict(id='ajudar', seat='B', texto='Oferecer ajuda com o álbum: sentar ao piano, tocar, dar ritmo às músicas tristes', efeitos=dict(flag='b_ajudou_album', vinculo=2),
   resultado="""Você senta ao piano, ao lado dela, e toca as primeiras notas de uma música triste, em lá menor, com a mão esquerda. *Deixa eu ajudar*, você diz. *Nem que seja pelo álbum.* Os dois, lado a lado, passam a tarde inteira transformando tristezas em refrões, e, quando o sol cai, a nona faixa está pronta."""),
 ],
 desfecho="""Ao anoitecer, a folha da parede, onde estava escrito *13 DIAS*, ganha uma segunda linha, a lápis, em letra miúda, que alguém escreveu e não assinou: *30 de agosto.*""",
 ir='rv_c8_fim')

NOS['rv_c8_fim'] = dict(tipo='fim', cap=8, lugar='Chalé dos Ashby', hora='Quarta · 07h00',
 texto="""Na manhã de quarta, a folha de papel de pão, colada na parede do chalé, tem duas linhas. {{se flag:aceitou_voltar}}*13 DIAS. 30 DE AGOSTO.* A data, escrita a lápis, é de uma letra segura, a de quem decide e não olha para trás. {{/se}}{{se flag:cancelou_turne}}*13 DIAS. CANCELADA.* A palavra, escrita a lápis, é de uma letra trêmula, a de quem decide e ainda não acredita. {{/se}}{{se flag:negociou_volta}}*13 DIAS. OUTUBRO?* O ponto de interrogação, escrito a lápis, é a única honestidade da folha. {{/se}}

{{se flag:b_ajudou_album}}Ao piano, uma nona faixa, pronta, tem um acorde de lá menor na ponte. {{/se}}{{se flag:b_pediu_ficar}}No ar, uma frase dita sem teatro, *eu não quero que você suma*, ainda não teve resposta. {{/se}}{{se flag:b_nao_pediu}}No ar, uma frase dita com nobreza, *é decisão sua*, ainda tem o gosto de covardia. {{/se}}{{se flag:a_ouviu_sarah}}Na varanda, uma pergunta de Sarah, *você vai dizer a ele de frente?*, ainda espera. {{/se}}{{se flag:a_convidou_sarah}}No sofá, duas xícaras de café, e uma conversa que nunca vai ser contada. {{/se}}{{se flag:a_expulsou_sarah}}Na estrada, uma picape que foi embora, e uma frase: *ele merece que alguém lhe deva uma explicação.* {{/se}}

Do lado de fora, o sol sobe, e o riacho, que nunca soube nada de turnê, continua falando. Dentro, no piano, quatro notas esperam, e uma pessoa, de olhos vermelhos, olha a folha da parede e conta, nos dedos, quantos dias faltam para ser outra vez uma pessoa que todo mundo conhece.""",
 gancho="A data está escrita na parede, e a despedida começa a ter um dia.",
 ir='rv_c9_despedida')
