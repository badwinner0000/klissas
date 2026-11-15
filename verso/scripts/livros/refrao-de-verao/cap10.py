# Refrão de Verão · Capítulo 10 · O Grande Gesto
NOS = {}

def op(tom, tag, texto, se=None, ef=None, acao=False):
    d = dict(tom=tom, tag=tag, texto=texto)
    if se: d['se'] = se
    if ef: d['efeitos'] = ef
    if acao: d['acao'] = True
    return d

NOS['rv_c10_caminhao'] = dict(tipo='segue', cap=10, lugar='Pine Hollow e Seattle', hora='Sábado · 30 de agosto a terça · 2 de setembro',
 ir={'A': 'rv_c10_a', 'B': 'rv_c10_b'},
 texto="""Em três dias, as coisas mudam de lugar. O carro preto leva uma pessoa por uma estrada de montanha, por uma passagem de neve que ainda não é neve, por um vale de pomares e de rodovias, até uma cidade de vidro e de chuva fina, onde um hotel de trinta andares tem, na cobertura, uma suíte com vista para a baía e um cartaz de seis metros: *MAYA · TERÇA, 2 DE SETEMBRO · ARENA RAVENNA · ESGOTADO.*

Em Pine Hollow, que sabe de tudo, ninguém fala de outra coisa. A mercearia abre às seis. Doris Pruitt, de avental, de pé no balcão, faz uma coisa que nunca fez: pendura na porta, a lápis, um cartaz de papel pardo. *FECHADO PARA O FERIADO. QUEM PRECISAR DE PREGO, PROCURE O CALEB.*

Há uma pergunta, na cidade, que ninguém, em voz alta, quer fazer. A de quanto custa, para um carpinteiro, uma passagem de avião.""")

NOS['rv_c10_a'] = dict(tipo='solo', cap=10, seat='A', lugar='Camarim, Arena Ravenna, Seattle', hora='Terça · 17h30', npcs=['lorna'],
 texto="""O camarim da Arena Ravenna tem sofás de couro, uma mesa de frutas que ninguém come, quatro espelhos de lâmpadas redondas e um ar-condicionado a dezoito graus. Dezoito mil pessoas, lá fora, entram em fila, com os celulares erguidos, e o barulho vem pelo corredor como um mar de cabeça para baixo.

Lorna Feldt, de tailleur cinza, com a prancheta sob o braço, traz a lista de músicas, que você nem leu. *São quinze*, diz. *As de sempre. Mais a nova, a do arquivo vazado, que o público já sabe de cor. Você abre com a nova, e a gente vê.*

Você, de vestido de cena, de maquiagem pronta, de rosto que não é o seu, olha o espelho de lâmpadas redondas e vê, atrás de seu próprio ombro, uma varanda de madeira que não existe.""",
 acoes=[
  dict(id='nova', texto='Abrir o show com a música nova, a do telhado, a que você escreveu em Pine Hollow', ir='rv_c10_palco',
   efeitos=dict(flag='a_abriu_nova', vinculo=1),
   resultado="""— Abro com a nova — você diz. — A do refrão de quatro palavras. — Lorna, que nunca discute com uma decisão, concorda com a cabeça. *É sua*, diz. Você sobe ao palco às oito e quatro, de luz em cima, de dezoito mil vozes embaixo, e a primeira nota, de um piano em lá, soa como um piano desafinado de uma sala de madeira. A plateia, que sabia a letra, canta."""),
  dict(id='tradicional', texto='Abrir com o repertório de sempre, o que a plateia pagou para ouvir', ir='rv_c10_palco',
   efeitos=dict(flag='a_abriu_classico', abalo=1),
   resultado="""— Abro com a de sempre — você diz. — Eles pagaram por ela. — Lorna anota, sem expressão. Você sobe ao palco às oito e quatro, e a primeira música, a que abriu sessenta shows, sai com perfeição de máquina. A plateia canta junto, em coro, de olhos fechados. Você canta, e, ao fundo da cabeça, uma voz pequena pergunta: *quem está ouvindo?*"""),
  dict(id='procurar', texto='Pedir à Lorna que alguém procure, na plateia, uma pessoa de boné', ir='rv_c10_palco',
   efeitos=dict(flag='a_procurou_plateia', vinculo=2),
   resultado="""— Pede para alguém olhar na plateia — você diz, baixo. — Uma pessoa de boné. De camiseta de banda. Que não vai estar. — Lorna ergue os olhos da prancheta, e a expressão dela, pela primeira vez em dez anos, não é de planilha. *Querida*, diz, *há dezoito mil pessoas.* Você diz *eu sei*. E sobe ao palco, olhando só para a fileira do fundo."""),
 ])

NOS['rv_c10_b'] = dict(tipo='solo', cap=10, seat='B', lugar="Pruitt's Mercantile, Pine Hollow", hora='Segunda · 06h30', npcs=['doris', 'caleb'],
 texto="""Você chega à mercearia às seis e meia, de boné, de camiseta de banda, de uma mochila no ombro e de uma ideia que não é bem uma ideia, é uma teimosia. Doris Pruitt, de avental, está de pé atrás do balcão, com uma xícara de café e a cara de quem esperava você.

— Eu perdi a aposta — diz ela. — Mas eu também perdi cinco dólares com o outro lado, que era o que eu tinha apostado você ia fazer. Passagem de avião: quatrocentos e noventa dólares. Eu sei porque pesquisei, no computador do fundo, esta madrugada.

Você não tem quatrocentos e noventa dólares. Tem trezentos e doze, uma picape com o freio gasto e um irmão em Seattle, que já avisou: *o show é terça, às oito, na Arena Ravenna. Eu estou na produção. Eu consigo te colocar.* Doris tira, do bolso do avental, uma chave com um chaveiro de plástico de uma marca de pão.""",
 acoes=[
  dict(id='aceitar', texto='Aceitar a chave do caminhão de entregas da mercearia e o troco da Doris', ir='rv_c10_b2',
   efeitos=dict(flag='b_aceitou_caminhao', vinculo=2),
   resultado="""— É um Ford de 2003 — diz Doris. — Faz dez quilômetros por litro, e a embreagem tem humor. A caixa de câmbio só engata a quinta se você pedir com carinho. Você leva até Seattle, entrega duas caixas de biscoitos de aveia no mercado Pike Place, para o meu primo, e volta. — Ela empurra a chave. — O que acontecer no meio, não é da minha conta."""),
  dict(id='recusar', texto='Agradecer, mas recusar: você vai de picape, com a sua própria ruína', ir='rv_c10_b2',
   efeitos=dict(flag='b_foi_de_picape', abalo=1),
   resultado="""— Obrigado, Doris — você diz. — Mas eu vou na minha. — Doris olha você por um segundo, e dá de ombros. *Orgulhoso*, diz. *Como o pai.* Você sai, de boné, e a picape, com o freio gasto, sobe a primeira curva de Republic com uma tosse de gato velho. Você sabe que a picape vai quebrar. Vai de qualquer jeito."""),
  dict(id='caleb', texto='Ligar para o Caleb e perguntar se há um jeito de entrar sem ingresso', ir='rv_c10_b2',
   efeitos=dict(flag='b_ligou_caleb', vinculo=1),
   resultado="""Você liga, da pedra do sinal, de mochila nas costas. Caleb atende no primeiro toque, com o barulho de uma arena ao fundo. *Eu sabia*, ele diz, sem dizer oi. *Eu estou na mesa de som. Você chega pela porta de carga, a número quatro. Eu digo que você é o meu cunhado.* Você diz que não é cunhado de ninguém. *Ainda*, diz Caleb, e desliga."""),
 ])

NOS['rv_c10_b2'] = dict(tipo='solo', cap=10, seat='B', lugar='Rodovia 2, Passagem de Stevens, Washington', hora='Terça · 11h00',
 texto="""Seis horas de estrada, de pomares, de montanha, de uma passagem cheia de pinheiros e de neblina, com um caminhão que tem humor, um rádio que só pega rock clássico e a sensação, nova, de estar indo na direção do próprio medo. Às onze da manhã, na descida da Passagem de Stevens, o ponteiro da temperatura do motor começa a subir.

Você encosta no acostamento. Debaixo do capô, uma mangueira soltou. A solução é de um minuto, de uma braçadeira. Mas, ao lado do rio, há uma queda d'água, e uma tabuleta de madeira que diz *CACHOEIRA, 200 M*. Você tem nove horas até o show, e um ensaio que ainda não fez: o do que vai dizer.""",
 acoes=[
  dict(id='ensaiar', texto='Ensaiar com o violão, no acostamento, o que vai tocar e o que vai dizer', ir='rv_c10_palco',
   efeitos=dict(flag='b_ensaiou_musica', vinculo=1),
   resultado="""Você tira o violão do banco, senta no para-choque e toca, baixo, a música dos dois, a de junho. Ensaiou um discurso, e o discurso virou uma frase só. Repete, para o vento: *eu não vim para te tirar do mundo.* A frase sai, na terceira vez, sem tremer. O resto, você decide, é de improviso, o único jeito de uma frase ser verdadeira."""),
  dict(id='cachoeira', texto='Andar duzentos metros até a cachoeira e ficar um minuto em silêncio', ir='rv_c10_palco',
   efeitos=dict(flag='b_foi_cachoeira', vinculo=1),
   resultado="""Você caminha pela trilha, de botas, entre samambaias. A cachoeira, de vinte metros, cai sobre uma pedra preta, e o som da água é o mesmo do riacho do chalé, maior. Você fica ali um minuto, com os olhos fechados, e a frase que ensaiou some, e o que sobra é uma coisa mais simples: o desejo de estar no mesmo lugar que ela, e de não prometer nada."""),
  dict(id='pai', texto='Ligar para a Doris e dizer que, se der errado, volta amanhã com o caminhão, e ninguém comenta', ir='rv_c10_palco',
   efeitos=dict(flag='b_ligou_doris', vinculo=1),
   resultado="""Você liga, de uma pedra de sinal, para o telefone fixo da mercearia. Doris atende no segundo toque. *Se der errado*, você diz, *eu volto amanhã.* A resposta é de uma frase: *se der errado, eu nunca soube de nada. Mas não vai dar.* E desliga, antes de você responder, o que, vindo de Doris, é a forma mais clara de abraço."""),
 ])

NOS['rv_c10_palco'] = dict(tipo='dialogo', cap=10, lugar='Palco da Arena Ravenna, Seattle', hora='Terça · 21h40', comeca='B',
 texto="""Às nove e quarenta, no meio do show, entre a quinta e a sexta música, uma coisa acontece que nenhum produtor previu: uma pessoa de boné, de camiseta de banda, de violão a tiracolo, sobe ao palco pela lateral esquerda, ajudada por um técnico de som de camiseta de flanela que faz um sinal de *calma* à segurança. Dezoito mil pessoas, de celulares erguidos, olham. O refletor, de um branco duro, acha os dois.

A artista, no centro, de vestido de cena, de microfone na mão, vê o rosto que não esperava e, por um segundo, esquece como se respira.""",
 turnos=[
  dict(prompt='A primeira frase é sua.', opcoes=[
    op('abre', 'z0_b_abre', '— Eu não vim para te tirar do mundo. Eu vim para fazer parte dele.', se='eu:B', ef=dict(flag='disse_a_frase', vinculo=2)),
    op('flerte', 'z0_b_flerte', '— A calha está ótima. Eu vim dizer isso pessoalmente.', se='eu:B'),
    op('seco', 'z0_b_seco', '— Oi. Eu peguei emprestado um caminhão de pão. Foi uma viagem.', se='eu:B'),
    op('abre', 'z0_a_abre', '— Você veio. Eu não achei que você viria. Eu... eu estou muito feliz.', se='eu:A', ef=dict(vinculo=2)),
    op('seco', 'z0_a_seco', '— Isso é loucura. Você não devia estar aqui.', se='eu:A'),
    op('flerte', 'z0_a_flerte', '— O violão do seu pai viajou muito mais do que eu pensava.', se='eu:A'),
  ]),
  dict(prompt='Agora você responde.', opcoes=[
    op('abre', 'z1_a_abre', '— Eu escrevi o último verso do caderno. *E se eu ficasse?* Eu quis dizer em voz alta. Eu estava com medo.', se='eu:A', ef=dict(vinculo=2)),
    op('flerte', 'z1_a_flerte', '— Você é completamente maluco. E isso está sendo transmitido ao vivo.', se='eu:A'),
    op('seco', 'z1_a_seco', '— Dezoito mil pessoas. Você sabe cantar essa?', se='eu:A'),
    op('abre', 'z1_b_abre', '— Eu li o verso. E eu vim responder. Sim. Fica. Ou eu vou. Ou a gente dá um jeito. Mas junto.', se='eu:B', ef=dict(vinculo=2)),
    op('flerte', 'z1_b_flerte', '— Eu sei cantar. Foi você que escreveu em lá menor.', se='eu:B'),
    op('seco', 'z1_b_seco', '— Eu sei. Eu estou com os dedos gelados.', se='eu:B'),
  ]),
  dict(prompt='A conversa é sua de novo.', opcoes=[
    op('abre', 'z2_b_abre', '— Eu fiquei dois anos sem mostrar uma música a ninguém. Você fez eu mostrar. Eu vim devolver.', se='eu:B', ef=dict(vinculo=1)),
    op('seco', 'z2_b_seco', '— A gente toca. E depois a gente conversa.', se='eu:B'),
    op('cuida', 'z2_b_cuida', '— Respira. Eles são só gente. Eu também.', se='eu:B'),
    op('abre', 'z2_a_abre', '— Eu escrevi um álbum com a sua mão. Eu nunca disse. Cada faixa tem você.', se='eu:A', ef=dict(vinculo=2)),
    op('seco', 'z2_a_seco', '— Vamos tocar. Eu faço o refrão. Você faz o violão.', se='eu:A'),
    op('flerte', 'z2_a_flerte', '— Se desafinar, eu finjo que foi proposital.', se='eu:A'),
  ]),
  dict(prompt='A última palavra antes da música é sua.', opcoes=[
    op('abre', 'z3_a_abre', '— Eu te amo. Em voz alta. Na frente de todo mundo. Agora, sim.', se='eu:A', ef=dict(flag='disse_amo_palco', vinculo=2)),
    op('flerte', 'z3_a_flerte', '— Dois, três, quatro.', se='eu:A'),
    op('seco', 'z3_a_seco', '— Lá menor. Agora.', se='eu:A'),
    op('abre', 'z3_b_abre', '— Eu também te amo. E eu aprendi a dizer.', se='eu:B', ef=dict(flag='disse_amo_palco', vinculo=2)),
    op('flerte', 'z3_b_flerte', '— Dois, três, quatro.', se='eu:B'),
    op('seco', 'z3_b_seco', '— Lá menor. Agora.', se='eu:B'),
  ]),
 ],
 pool=[
  op('cuida', 'pl_cuida', '— Respira. Eu estou aqui.'),
  op('seco', 'pl_seco', '— Ok.'),
  op('flerte', 'pl_flerte', '— Dezoito mil pessoas, e eu só olho para você.'),
  op('abre', 'pl_abre', '— Eu nunca fiz isso.'),
  op('fere', 'pl_fere', '— Se for tarde demais, diz agora.'),
 ],
 fecho="""A arena, de dezoito mil pessoas, está em um silêncio que ninguém no palco, em onze anos, ouviu. Atrás, a banda, de olhos arregalados, baixa os instrumentos. Em cima do piano de cauda, em lá menor, uma nota, a primeira, soa como um piano desafinado de uma sala de madeira.""",
 ir='rv_c10_decisao')

NOS['rv_c10_decisao'] = dict(tipo='decisao', cap=10, lugar='Palco da Arena Ravenna, Seattle', hora='Terça · 21h55',
 texto="""A música dos dois, a de junho, a do telhado, a do refrão de quatro palavras, tem duas partes: uma de piano e voz, outra de violão. Os dois, no meio do palco, com dezoito mil pessoas, têm uma decisão que só vale se for dos dois: como terminar a canção, e o que fazer depois.""",
 pergunta='O que vocês fazem com a música, e com o depois?',
 ir='rv_c10_final',
 acoes=[
  dict(id='juntos', texto='Cantar juntos, os dois, sem banda, até o fim, e decidir o resto depois do show', efeitos=dict(flag='cantaram_juntos', vinculo=2),
   resultado="""Vocês cantam. Piano e violão, duas vozes de tons diferentes que, no refrão, acham o mesmo. A arena inteira, depois de um segundo, canta o refrão junto, e o som sobe como uma maré. É a coisa mais pequena e mais enorme que qualquer dos dois já fez, e acaba com um acorde de lá menor que vibra três segundos."""),
  dict(id='ela', texto='A artista canta, o outro toca: um fica no centro, o outro na sombra, como sempre foi', efeitos=dict(flag='um_canta_outro_toca', vinculo=1),
   resultado="""Um canta, o outro toca. O refletor, a princípio, acompanha só quem está no centro. Mas, no segundo refrão, quem canta faz um gesto, e o refletor, sem ninguém pedir, se abre e engloba os dois. A arena, que viu uma estrela, vê, por um instante, duas pessoas, e não sabe dizer qual das duas é a coisa mais bonita."""),
  dict(id='sair', texto='Terminar a música e descer juntos, antes do bis: o show é do público, mas a vida é dos dois', efeitos=dict(flag='desceram_juntos', vinculo=2),
   resultado="""Quando a música acaba, os dois se olham, e uma frase não dita passa entre eles. Quem canta pega a mão do outro, curva-se, e desce junto, pela lateral esquerda, entre a banda e os técnicos, deixando a plateia de dezoito mil pessoas com um bis que não vem. Atrás do cenário, entre cabos, caixas e caixas de som, os dois ficam a dois palmos de distância, a primeira vez em três meses."""),
 ])

NOS['rv_c10_final'] = dict(tipo='final', cap=10, lugar='Seattle e Pine Hollow', hora='Um ano depois',
 finais=[
  dict(se='flag:cancelou_turne && vinc>=9', texto="""Um ano depois, o álbum *Refrão de Verão*, de doze faixas, saiu em junho, gravado no chalé do velho Henry Ashby, em Pine Hollow, Washington, com um piano de armário desafinado, um violão de verniz gasto e um microfone dos anos oitenta. Foi o disco mais vendido do ano, e a artista não deu uma entrevista sequer sobre ele. A crítica escreveu: *a primeira grande obra do pop que ninguém sabe onde foi feita.*

No chalé, o telhado, de cedro, aguentou o inverno. No fundo de uma gaveta, na cozinha, uma folha de papel de pão, com *13 DIAS* escrito a lápis, ficou emoldurada, ao lado da fotografia de uma menina de maria-chiquinha. Na Lanterna, toda terça, a banda de três, com um violão, um banjo e um contrabaixo, toca a mesma música, e a cidade inteira canta o refrão, desafinada e feliz.

{{se flag:disse_amo_palco}}Na primeira terça de cada mês, o carpinteiro e a compositora sobem ao palco da Lanterna e dizem *eu te amo* em voz alta, de brincadeira, para a plateia, e de verdade, para ninguém. {{/se}}{{se flag:cantaram_juntos}}Em Seattle, uma gravação amadora do dueto de dezoito mil vozes tem onze milhões de visualizações e nenhum nome. {{/se}}Doris Pruitt, de avental, de bule fervendo, ganhou a aposta de cinco dólares, que nunca cobrou."""),
  dict(se='flag:aceitou_voltar && vinc>=7', texto="""Um ano depois, o álbum *Refrão de Verão* saiu em junho, em doze faixas, e vendeu o suficiente para a gravadora dizer *eu sabia*, e para a artista dizer *não, você não sabia*. A turnê de outono, que a Lorna refez em três semanas, passou por quarenta e uma cidades. Em todas, no segundo bis, um técnico de som de camiseta de flanela e, ao lado dele, um carpinteiro de boné, de violão, subiam ao palco para tocar a mesma música.

Na casa do velho Henry, o telhado aguentou o inverno. Há uma data na parede da cozinha, escrita a lápis: *30 de agosto.* Todo ano, nesse dia, os dois voltam a Pine Hollow, sem avisar, e encontram a mesa posta, com biscoitos de aveia, na casa da Doris.

{{se flag:disse_amo_palco}}Nas entrevistas, quando perguntam o que fez o álbum ser o que é, a artista diz *um telhado*, e mais nada. {{/se}}{{se flag:desceram_juntos}}O carpinteiro nunca soube explicar o que pensou ao descer do palco de mãos dadas. Diz que foi uma ideia boa. {{/se}}Não é uma história com final fechado. É uma estrada, de duas pessoas, com buracos, e um violão no banco de trás."""),
  dict(texto="""Um ano depois, o álbum *Refrão de Verão* saiu em junho, e foi um sucesso silencioso, o tipo que se descobre com o tempo. A artista seguiu em turnê, de cidade em cidade, e, em cada uma, no último bis, tocou uma música, em piano e voz, que ninguém sabia de onde vinha.

No chalé do velho Henry Ashby, em Pine Hollow, o telhado aguentou o inverno. Um carpinteiro de boné segue consertando o que quebra, de goteira a coração partido, e canta, toda terça, na Lanterna. Os dois se falam por telefone, em horas estranhas, de lugares diferentes, e, de vez em quando, uma picape velha sobe uma estrada de terra em direção a um carro preto, ou o contrário.

Não é um final feliz de filme. É um começo de verão, de novo: o riacho enchendo com o degelo, a porta do chalé aberta, e uma pergunta, escrita no último verso de um caderno, ainda esperando que alguém lhe responda."""),
 ])
