# A Última Promoção · Capítulo 1 · O fim de uma era
NOS = {}

def op(tom, tag, texto, se=None, ef=None, acao=False):
    d = dict(tom=tom, tag=tag, texto=texto)
    if se: d['se'] = se
    if ef: d['efeitos'] = ef
    if acao: d['acao'] = True
    return d

NOS['up_c1_a'] = dict(tipo='solo', cap=1, seat='A', lugar='Meridian Group, 41º andar, Chicago', hora='Segunda · 9h40', npcs=['priya'],
 texto="""O 41º andar da Meridian Group tem vista para o lago e nenhum cheiro. Carpete cinza, vidro fosco, uma planta que ninguém rega porque ninguém tem tempo de descobrir se ela é de verdade. Você é a única pessoa do andar que chegou antes das sete e ainda está aqui às nove e quarenta, com um café frio e a pasta do contrato da Hartwell Freight aberta na tela.

Faltam duas assinaturas. O cliente quer um desconto de quatro por cento que a Meridian não vai dar, e você tem uma resposta pronta, em três frases, sem adjetivo.

Priya Patel passa pela sua mesa com o laptop contra o peito, de olhos baixos, e deixa um post-it amarelo ao lado do seu teclado sem parar de andar. *Marcus quer ver você às 16h. Cartório da fusão, Hale & Brandvold. Vai ter mais gente.* Ela já está na outra ponta do corredor quando você levanta a cabeça.

O comunicado interno de sexta falava em *integração de uma empresa regional ao portfólio*. Você sabe que empresa é. Foi você quem escreveu a análise que a Meridian usou para comprar a Tillman & Sons, e nenhum dos seus nomes está em nenhum slide.""",
 acoes=[
  dict(id='fechar', texto='Fechar a Hartwell agora, sem desconto, com a sua resposta de três frases', ir='up_c1_cartorio',
   efeitos=dict(flag='a_fechou_hartwell', vinculo=0),
   resultado="""Você liga. Diz o preço, diz o prazo, diz o que acontece se o cliente esperar até janeiro. O diretor da Hartwell fica quieto por quatro segundos, que você conta, e assina às dez e cinco. Ninguém vem bater na sua porta para elogiar. Você anota o fechamento na planilha, com a hora, e fecha a planilha.

A única coisa que muda no andar é o post-it de Priya, que continua amarelo ao lado do teclado."""),
  dict(id='priya', texto='Ir atrás da Priya e perguntar quem mais vai estar no cartório', ir='up_c1_cartorio',
   efeitos=dict(flag='a_perguntou_priya', abalo=1),
   resultado="""Você alcança Priya na copa, onde ela finge procurar uma colher. A pergunta sai curta e completa, como todas as suas. Priya olha para a porta, depois para o chão, e responde em voz tão baixa que parece ser dirigida à cafeteira: *o outro candidato.* Mais nada. Ela sai com a colher que não queria.

*Outro candidato.* Você nunca tinha ouvido a palavra dentro dessa empresa."""),
  dict(id='arquivo', texto='Reabrir o arquivo da aquisição da Tillman & Sons e conferir os números antes da reunião', ir='up_c1_cartorio',
   efeitos=dict(flag='a_conferiu_arquivo', abalo=1),
   resultado="""Você abre a pasta que sabe de cor: valuation, projeção de receita, due diligence. Os números que você entregou em março estão lá. Os números que a Meridian pagou, não. Entre os dois há uma diferença de quarenta e um milhões de dólares, e uma nota de rodapé que você não escreveu.

Você fotografa a página com o celular, como quem tira uma foto de um acidente que ainda não aconteceu."""),
 ])

NOS['up_c1_b'] = dict(tipo='solo', cap=1, seat='B', lugar='Tillman & Sons, River North, Chicago', hora='Segunda · 9h40', npcs=['richard', 'chloe'],
 texto="""O galpão da Tillman & Sons, em River North, tem pé-direito de seis metros, quarenta mesas e a única cafeteira da cidade que faz café pior do que o do metrô. Seu avô construiu o prédio em 1962, e a cafeteira provavelmente é da mesma época. Às nove e quarenta, todos os cento e doze funcionários estão em pé em volta da mesa de reuniões, que não é de reunião: é a mesa onde seu pai almoçou todo dia, durante cinquenta anos.

Richard Tillman, setenta anos, camisa de manga curta e gravata de lã, segura uma folha de papel que não vai ler. Ele nunca lê o que escreve.

— Eu queria dizer isso de um jeito que não parecesse ruim — diz ele. — Não tem um jeito. A Tillman & Sons foi vendida. Hoje de manhã. Todo mundo continua com emprego. Eu continuo com o cachorro.

Há uma risada nervosa, de uma pessoa só. Chloe Bennett, vinte e quatro anos, estagiária, de moletom da Northwestern e post-it colado na testa por distração, olha para você de longe, sem dizer nada, e ergue as sobrancelhas. Ela sabe que você sabia.""",
 acoes=[
  dict(id='aplaudir', texto='Aplaudir, porque é isso que um filho faz quando o pai termina um discurso', ir='up_c1_cartorio',
   efeitos=dict(flag='b_aplaudiu', abalo=1),
   resultado="""Você aplaude. Sozinho, por um segundo, depois com mais três pessoas, depois com a sala inteira, num som que parece mais uma despedida do que uma celebração. O seu pai olha na sua direção e faz um aceno pequeno, de quem agradece uma gentileza que não pediu. Você sorri com a boca e com mais nada."""),
  dict(id='perguntar', texto='Levantar a mão e perguntar ao pai, na frente de todos, quem comprou e quanto pagou', ir='up_c1_cartorio',
   efeitos=dict(flag='b_perguntou_pai', abalo=1),
   resultado="""Você levanta a mão, o que não fazia desde o sexto ano. O seu pai demora a olhar, e quando olha, parece mais velho do que ontem. *Meridian*, diz ele. *Quanto, eu digo depois.* A palavra *depois* cai na sala como uma bandeja no chão. Chloe, no fundo, escreve alguma coisa num caderno e a risca em seguida."""),
  dict(id='sair', texto='Sair do galpão sem falar com ninguém e dar uma volta no quarteirão', ir='up_c1_cartorio',
   efeitos=dict(flag='b_saiu', abalo=1),
   resultado="""Você atravessa as quarenta mesas com o rosto no lugar, empurra a porta de ferro e sai para o vento de Chicago, que, em março, ainda é um insulto. Dá a volta no quarteirão sem pensar em nada, e de repente pensa em tudo: nos três anos de balanços que você abriu e fechou, e em uma planilha que ninguém, além de você, nunca perguntou por que dava errado."""),
 ])

NOS['up_c1_cartorio'] = dict(tipo='segue', cap=1, lugar='Hale & Brandvold LLP, LaSalle Street, Chicago', hora='Segunda · 16h05', npcs=['marcus'],
 ir='up_c1_dialogo',
 texto="""Às quatro da tarde, a sala de reuniões do 29º andar da Hale & Brandvold, no coração de LaSalle Street, tem uma mesa de nogueira para vinte, uma garrafa de água San Pellegrino por pessoa e a atmosfera de um corredor de hospital onde ninguém quer ser o primeiro a perguntar o diagnóstico.

Do lado esquerdo da mesa, de terno cinza, de crachá da Meridian ainda virado para dentro, está uma pessoa que você conhece apenas por currículo e por e-mails sem saudação. Do lado direito, de terno emprestado de ocasião, com uma gravata que parece ter sido escolhida no escuro, está outra pessoa que você conhece desde sempre, e desde sempre quis evitar.

Marcus Webb, cinquenta anos, sorriso de comercial de seguro de vida, entra por último. Fecha a porta com o quadril. Pousa as duas mãos na mesa, como um mágico que mostra que não tem nada nas mangas.

— Vou ser breve — diz ele, e não é. — Com a integração da Tillman & Sons, a Meridian abre uma posição de Diretor Regional do Meio-Oeste. Uma. Eu vou escolher dentro de três semanas, depois do congresso de Viena. Os dois estão na lista. — O sorriso aumenta. — Que vença o melhor.

Ninguém sorri de volta. Do corredor, alguém passa empurrando um carrinho de café, e o barulho das rodas é o único som da sala por um tempo comprido.""")

NOS['up_c1_dialogo'] = dict(tipo='dialogo', cap=1, lugar='Elevador, Hale & Brandvold', hora='Segunda · 16h50', comeca='A',
 texto="""O elevador do 29º andar leva quarenta e dois segundos para chegar ao térreo, e Marcus Webb ficou para trás, no telefone, com a porta de nogueira fechada. Dentro da cabine, de espelho dourado e música ambiente de alguém tocando piano contra a vontade, estão dois candidatos à mesma vaga.

Em quarenta e dois segundos dá para dizer muita coisa, ou nenhuma.""",
 turnos=[
  dict(prompt='A primeira frase é sua.', opcoes=[
    op('seco', 'e0_a_seco', '— {{eu.nome}} Nicholls. Diretora de contas. Não precisamos nos apresentar, mas é educado.', se='eu:A'),
    op('flerte', 'e0_a_flerte', '— Você é mais alto do que no organograma.', se='eu:A'),
    op('cuida', 'e0_a_cuida', '— Sinto muito pela venda. Imagino que não tenha sido fácil.', se='eu:A'),
    op('seco', 'e0_b_seco', '— {{eu.nome}} Tillman. Eu seria filh{{eu.o_a}} do dono, mas parece que agora sou só filh{{eu.o_a}}.', se='eu:B'),
    op('flerte', 'e0_b_flerte', '— Então você é a pessoa que escreveu a análise. Eu tinha uma imagem diferente. Menos... horário comercial.', se='eu:B'),
    op('abre', 'e0_b_abre', '— Eu não sabia que ia ter concorrência. Achei que fosse formalidade.', se='eu:B'),
  ]),
  dict(prompt='Agora você responde.', opcoes=[
    op('seco', 'e1_a_seco', '— Não é concorrência. É um processo seletivo. Há um critério, e eu o conheço.', se='eu:A'),
    op('fere', 'e1_a_fere', '— Você tem sobrenome. Eu tenho resultados. Vamos ver o que pesa mais.', se='eu:A', ef=dict(abalo=1)),
    op('abre', 'e1_a_abre', '— Eu também não sabia. Descobri hoje às 9h40, por um post-it.', se='eu:A', ef=dict(vinculo=1)),
    op('seco', 'e1_b_seco', '— Eu conheço o mercado regional, os clientes, os caminhões e o nome de cada motorista. O que você conhece é planilha.', se='eu:B'),
    op('fere', 'e1_b_fere', '— Sobrenome, resultados, post-it. Que lista de justificativas completa para uma pessoa que não precisa se justificar.', se='eu:B', ef=dict(abalo=1)),
    op('abre', 'e1_b_abre', '— Post-it? A Meridian informa promoções por post-it? Isso explica muita coisa.', se='eu:B', ef=dict(vinculo=1)),
  ]),
  dict(prompt='A conversa é sua de novo.', opcoes=[
    op('seco', 'e2_a_seco', '— Vou ser direta: não tenho nada pessoal contra você. Vou ganhar essa vaga.', se='eu:A'),
    op('flerte', 'e2_a_flerte', '— Se perder, será para alguém que mereça. Prefiro que seja eu.', se='eu:A'),
    op('cuida', 'e2_a_cuida', '— Pelo menos jante comigo hoje. Dois candidatos que não se falam é pior do que dois que se odeiam.', se='eu:A', ef=dict(vinculo=1)),
    op('seco', 'e2_b_seco', '— Nada pessoal, claro. Só a minha vida inteira, e a dos cento e doze funcionários do galpão.', se='eu:B'),
    op('flerte', 'e2_b_flerte', '— Eu admiro o desprendimento. Vai ser divertido perder para uma pessoa assim. Mas não vou perder.', se='eu:B'),
    op('cuida', 'e2_b_cuida', '— Eu aceito o jantar, mas pago eu. A empresa ainda é minha por mais uns quinze dias.', se='eu:B', ef=dict(vinculo=1)),
  ]),
  dict(prompt='A última palavra antes da porta abrir é sua.', opcoes=[
    op('seco', 'e3_a_seco', '— Que vença o melhor. É o que o Marcus disse.', se='eu:A'),
    op('flerte', 'e3_a_flerte', '— Foi um prazer descobrir que o meu inimigo tem um bom perfume.', se='eu:A'),
    op('abre', 'e3_a_abre', '— Eu estou com medo. Só para constar. Não é medo de você.', se='eu:A', ef=dict(vinculo=1)),
    op('seco', 'e3_b_seco', '— Que vença o melhor. Que, a esta altura, não sei quem é.', se='eu:B'),
    op('flerte', 'e3_b_flerte', '— O perfume foi acidente. Sorte a minha, que acidentes são o que sei fazer de melhor.', se='eu:B'),
    op('abre', 'e3_b_abre', '— Eu também. Medo, não do inimigo. Do resto.', se='eu:B', ef=dict(vinculo=1)),
  ]),
 ],
 pool=[
  op('seco', 'pl_seco', '— Isso é tudo?'),
  op('cuida', 'pl_cuida', '— Você está com cara de quem não dormiu. Quer carona?'),
  op('flerte', 'pl_flerte', '— Quarenta e dois segundos dão para muita coisa.'),
  op('abre', 'pl_abre', '— Eu não sei fazer isso, sabe. Ser educado com quem eu deveria odiar.'),
  op('fere', 'pl_fere', '— Você tem cara de quem vai me atrapalhar.'),
 ],
 fecho="""A cabine chega ao térreo com um *ding* de elevador de hotel. As portas abrem, e na rua de LaSalle, no fim de tarde de Chicago, os dois saem, cada um por um lado, sem se despedirem.""",
 ir='up_c1_decisao')

NOS['up_c1_decisao'] = dict(tipo='decisao', cap=1, lugar='Calçada de LaSalle Street', hora='Segunda · 17h20',
 texto="""Na calçada de LaSalle, entre uma estação de táxi e um vendedor de pretzels, os dois ficam parados por um instante, sem saber se cada um espera o outro ir embora. Uma garoa fina cai. Um ônibus passa.

Vão ser três semanas, uma vaga e dois candidatos. Alguém precisa dizer como se joga.""",
 pergunta='Como vocês vão competir?',
 ir={'A': 'up_c1_noite_a', 'B': 'up_c1_noite_b'},
 acoes=[
  dict(id='limpo', texto='Competir limpo: cada um faz o seu melhor trabalho, sem sabotagem', efeitos=dict(flag='competir_limpo', vinculo=1),
   resultado="""Vocês combinam a coisa mais simples e mais rara: cada um faz o melhor trabalho que consegue, e ganha quem ganhar. Não há aperto de mão, só um aceno de cabeça de quem avisa o outro de que viu."""),
  dict(id='sem_regras', texto='Sem regras: o que não é proibido por contrato é permitido', efeitos=dict(flag='sem_regras', abalo=1),
   resultado="""Vocês não dizem nada, e é a pior resposta, porque cada um entende a seu modo. Na cabeça de um, é uma trégua tácita. Na do outro, é uma permissão. A garoa engrossa, e os dois se separam sem confiar."""),
  dict(id='informar', texto='Trocar informação: o que cada um descobrir sobre a vaga, o outro fica sabendo', efeitos=dict(flag='trocar_info', vinculo=1),
   resultado="""Vocês fazem um pacto estranho, de poucas palavras: se um descobrir algo sobre a vaga, avisa o outro. Nenhum dos dois acredita que o outro vai cumprir. Os dois, em segredo, já planejam cumprir."""),
 ])

NOS['up_c1_noite_a'] = dict(tipo='solo', cap=1, seat='A', lugar='Apartamento, Lincoln Park', hora='Segunda · 22h30',
 texto="""O seu apartamento, em Lincoln Park, tem um sofá cinza, uma mesa de jantar sem cadeira de jantar e uma geladeira com três potes de iogurte e uma garrafa de vinho aberta há cinco dias. Você nunca foi uma pessoa de móveis. Foi uma pessoa de resultados.

Às dez e meia da noite, de meias, em pé na cozinha, você abre o laptop e olha a fotografia que tirou da página do arquivo da aquisição: *US$ 41 milhões*, uma nota de rodapé em letra miúda, e uma assinatura de Marcus Webb ao lado de uma cláusula que você nunca tinha visto.

O celular vibra duas vezes. A sua irmã, Megan, de Dayton: *Você viu a mamãe? Ela perguntou de você. Liga.* E, embaixo, uma segunda mensagem, de Nina: *{{A.nome}}. Come alguma coisa que não seja iogurte.*""",
 acoes=[
  dict(id='investigar', texto='Ignorar as mensagens e investigar a nota de rodapé até achar a origem', ir='up_c1_fim',
   efeitos=dict(flag='a_investigou', abalo=1),
   resultado="""Você ignora as mensagens. Abre o histórico do documento, o controle de versões, as datas de edição. A nota de rodapé foi inserida às 23h47 de uma quinta-feira, por um usuário que não tem nome: só uma matrícula, *MW-0017*. Você escreve a matrícula numa folha, e a risca, e a escreve de novo."""),
  dict(id='ligar_megan', texto='Ligar para a Megan e dizer a primeira coisa que vier à cabeça', ir='up_c1_fim',
   efeitos=dict(flag='a_ligou_megan', vinculo=1),
   resultado="""Você liga. A Megan atende no segundo toque, com uma criança chorando ao fundo e a voz de quem faz três coisas ao mesmo tempo. *{{A.nome}}?* O que sai da sua boca é: *eu tenho um concorrente.* Do outro lado, um silêncio curto, e depois, sem ironia nenhuma, a frase mais gentil que alguém disse a você em semanas: *então ele que se cuide.*"""),
  dict(id='comer', texto='Fechar o laptop e preparar um jantar de verdade, pela primeira vez em um mês', ir='up_c1_fim',
   efeitos=dict(flag='a_cozinhou'),
   resultado="""Você fecha o laptop. Procura na geladeira, nos armários, no congelador, e acha uma massa de espaguete e um limão que não está de todo morto. Cozinha devagar, de pé, olhando o relógio do forno. É uma refeição pequena, sem nome, e você come na bancada, sem pressa, ouvindo o silêncio do apartamento."""),
 ])

NOS['up_c1_noite_b'] = dict(tipo='solo', cap=1, seat='B', lugar='Tillman & Sons, River North', hora='Segunda · 22h30',
 texto="""O galpão da Tillman & Sons, às dez e meia da noite, é o lugar mais amplo e mais vazio de Chicago. Você mora aqui, numa sala de arquivo reformada às pressas, com um sofá-cama, uma chapa elétrica e uma foto do seu avô na parede que você nunca teve coragem de tirar. O seu divórcio fez cinco anos em outubro e você nunca comprou uma cama.

O celular vibra. É o seu pai, em chamada de vídeo, com o rosto tão perto da câmera que só se vê um olho. Atrás dele, no sofá, um vira-lata marrom de dois anos, com uma orelha caída e outra em pé, olha você pela tela com a expressão de um adolescente que não aprova nenhuma das suas escolhas de vida.

— O Buster está com saudade — diz o seu pai. — Eu também, mas eu não digo.""",
 acoes=[
  dict(id='buster', texto='Conversar com o Buster, como se ele entendesse', ir='up_c1_fim',
   efeitos=dict(flag='b_falou_buster', vinculo=1),
   resultado="""Você diz *oi, cara*, e o Buster levanta a orelha em pé. Diz *a gente vai dar um jeito*, e ele inclina a cabeça, de um jeito que parece cálculo. O seu pai, ao fundo, fica quieto por um minuto, e quando fala de novo, é só: *ele é igualzinho a você, quando você tinha dezessete.*"""),
  dict(id='pai', texto='Perguntar ao pai, em voz baixa, por quanto exatamente a empresa foi vendida', ir='up_c1_fim',
   efeitos=dict(flag='b_perguntou_valor', abalo=1),
   resultado="""A pergunta sai antes que você decida. O seu pai demora a responder. *Menos do que eu devia ter pedido*, diz, afinal. *Mais do que eu devia ter pagado, se você contar o que devo.* A conversa termina com um *boa noite* seco, e a tela do celular, preta, guarda por um instante o seu rosto cansado."""),
  dict(id='chloe', texto='Mandar uma mensagem para a Chloe e pedir que ela descubra o que puder sobre a Meridian', ir='up_c1_fim',
   efeitos=dict(flag='b_pediu_chloe'),
   resultado="""Você escreve: *Preciso de tudo que for público sobre a Meridian. Quem manda, quem saiu, quem entrou.* A resposta de Chloe chega em doze segundos: *Eu estava esperando você pedir. Já comecei. Dorme.* Você sabe que ela vai passar a noite acordada, e sabe que é a coisa mais leal que alguém fez por você neste mês."""),
 ])

NOS['up_c1_fim'] = dict(tipo='fim', cap=1, lugar='Chicago', hora='Terça · 06h12',
 texto="""Na manhã de terça, às seis e doze, dois e-mails idênticos chegam a duas caixas de entrada em lados diferentes de Chicago, com o mesmo assunto e a mesma assinatura:

*De: Marcus Webb. Assunto: Congresso Global de Operações, Viena. Os dois candidatos viajam juntos, quinta-feira, voo noturno da Austrian Airlines, saída às 17h40. Passagens e hotel já reservados. Apresentações no sábado. Quero ver como vocês trabalham em equipe. Que vença o melhor. — M.*

{{se flag:competir_limpo}}Os dois combinaram competir limpo, e a primeira ordem do chefe é viajarem juntos, no mesmo voo, no mesmo hotel, por seis dias. {{/se}}{{se flag:sem_regras}}Nenhum dos dois combinou nada, e agora vão dividir um avião. {{/se}}{{se flag:trocar_info}}Os dois prometeram trocar informação, e a primeira informação é esta: eles vão viajar juntos. {{/se}}

Ao lado do e-mail, em anexo, a confirmação da reserva: *Hotel Imperial Wien, 1 quarto, 1 cama king, 6 noites.* O erro, se foi um erro, vem em letra de sistema, sem rosto.""",
 gancho="Viena, seis noites, e uma reserva que diz um quarto só.",
 ir='up_c2_aeroporto')
