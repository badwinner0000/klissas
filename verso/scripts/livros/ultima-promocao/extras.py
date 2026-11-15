# Consequências tardias das escolhas. Privadas só na cena do próprio assento; públicas em cenas compartilhadas.
E = {}
def add(nid, *frases): E.setdefault(nid, []).extend(frases)

# ---- A (privadas) ----
add('up_c2_a',
 "{{se flag:a_fechou_hartwell}}A Hartwell, fechada na segunda sem desconto, ainda é o único número limpo da semana.{{/se}}",
 "{{se flag:a_perguntou_priya}}A palavra *outro candidato*, dita pela Priya na copa, volta a cada portão de embarque.{{/se}}",
 "{{se flag:a_conferiu_arquivo}}A foto da página do arquivo, com os quarenta e um milhões, continua no celular, no meio das fotos de aeroporto.{{/se}}")
add('up_c2_noite_a',
 "{{se flag:a_investigou}}A matrícula *MW-0017*, escrita e riscada numa folha, ainda tem o mesmo número de letras.{{/se}}",
 "{{se flag:a_ligou_megan}}A voz da Megan dizendo *então ele que se cuide* ainda é a frase mais gentil da semana.{{/se}}",
 "{{se flag:a_cozinhou}}O espaguete com limão de domingo foi a primeira refeição de verdade em um mês, e o gosto ficou.{{/se}}")
add('up_c3_noite_a',
 "{{se flag:a_fez_ritual}}O ritual das saídas de emergência, feito no portão, é um mapa que a mão ainda sabe de cor.{{/se}}",
 "{{se flag:a_bebeu}}A dose dupla no bar do terminal, contra todas as regras, foi o único desvio de um ano.{{/se}}",
 "{{se flag:a_contou_nina}}A mensagem para a Nina, *eu tenho medo de avião*, tem a resposta guardada: *eu sei desde 2019*.{{/se}}")
add('up_c4_a',
 "{{se flag:a_marcou_lado}}A pasta no travesseiro, marcando o lado da janela, é uma bandeira infantil que funcionou.{{/se}}",
 "{{se flag:a_desconfiou_marcus}}O cartão do champanhe, *à dupla*, não sai da cabeça: Marcus nunca usou essa palavra.{{/se}}",
 "{{se flag:a_tomou_banho}}A hora na banheira de cobre foi a primeira hora inteira só sua desde segunda-feira.{{/se}}")
add('up_c4_corredor_a',
 "{{se flag:a_agradeceu_priya}}O agradecimento à Priya, mais gentil do que o costume, ainda tem um resto de calor.{{/se}}",
 "{{se flag:a_ensaiou}}O ensaio no espelho, ignorando o aviso, rendeu uma abertura sem falha e um resto de culpa.{{/se}}",
 "{{se flag:a_mudou_slide}}A frase sobre o cliente que ligou às 23h, trocada pelo gráfico de abertura, foi a coisa mais corajosa do palco.{{/se}}")
add('up_c5_noite_a',
 "{{se flag:a_guardou_fraude}}O segredo da fraude, guardado até ter provas, pesa como um segundo travesseiro.{{/se}}",
 "{{se flag:a_buscou_mais}}As duas edições a mais, achadas no banheiro, estão salvas num arquivo sem nome.{{/se}}")
add('up_c7_a',
 "{{se flag:a_admitiu}}A frase *foi melhor*, dita sozinha no corredor, deixou uma leveza esquisita no peito.{{/se}}",
 "{{se flag:a_negou}}A oração *dados vencem histórias* já não soa tão firme depois de três repetições.{{/se}}",
 "{{se flag:a_ligou_nina}}A risada da Nina, *finalmente alguém que te impressiona*, ainda toca no ouvido.{{/se}}")
add('up_c8_a',
 "{{se flag:a_insistiu_priya}}O *desculpa* da Priya, com uma mãe em Mumbai por trás, ficou sem resposta.{{/se}}",
 "{{se flag:a_poupou_priya}}O *obrigada por não insistir* da Priya é uma pequena gentileza que fica.{{/se}}",
 "{{se flag:a_guardou_priya}}A frase *cuidado com quem você confia* ainda se mistura ao passo da pessoa ao lado.{{/se}}")
add('up_c8_marcus_a',
 "{{se flag:a_mostrou_email}}O e-mail *precisamos conversar*, mostrado no brunch, foi a primeira vez que alguém disse *vem aqui*.{{/se}}",
 "{{se flag:a_guardou_email}}O e-mail *precisamos conversar* foi guardado no bolso do blazer, entre um croissant e um sorriso.{{/se}}",
 "{{se flag:a_exigiu_presenca}}A exigência de ter a outra parte presente foi recusada com uma palavra: *sozinha*.{{/se}}")
add('up_c9_a1',
 "{{se flag:a_tem_provas}}A pasta de quarenta e três arquivos, pedida e recebida, é a única coisa pesada na bagagem.{{/se}}",
 "{{se flag:a_quer_avisar}}A vontade de avisar a pessoa do 412 antes de qualquer outra coisa ainda não passou.{{/se}}",
 "{{se flag:a_sozinha}}A decisão de resolver sozinho ou sozinha, a de sempre, deu resultado e deixou uma sede.{{/se}}")
add('up_c9_a2',
 "{{se flag:a_insistiu}}Os fatos, repetidos três vezes na chamada, não mudaram, e a falta de resposta continua.{{/se}}",
 "{{se flag:a_desligou}}A chamada desligada antes que a voz falhasse ainda deixa um eco de tela escura.{{/se}}")
add('up_c9_a3',
 "{{se flag:a_confrontou}}O pen drive em cima do vidro, na sala do Marcus, continua sendo a cena que mais se repete na memória.{{/se}}",
 "{{se flag:a_deixou_falar}}A frase final do Marcus, *você sempre soube demais*, é a prova que ele mesmo entregou.{{/se}}",
 "{{se flag:a_saiu_calada}}A saída calada, com os papéis dobrados em três, foi a coisa mais firme dos onze anos.{{/se}}")
add('up_c10_a',
 "{{se flag:a_contou_megan}}A conversa à mesa da Megan, sem organizar nem tirar adjetivo, ainda é o que mais importa da semana.{{/se}}",
 "{{se flag:a_falou_leo}}O tiranossauro de plástico, de dente quebrado, que o Leo emprestou, está no bolso do casaco.{{/se}}",
 "{{se flag:a_evitou_megan}}A mão da Megan no joelho, debaixo da mesa, foi a resposta a uma mentira de cansaço.{{/se}}")

# ---- B (privadas) ----
add('up_c2_b',
 "{{se flag:b_aplaudiu}}O aplauso no galpão, sozinho no começo, foi uma despedida que parecia uma celebração.{{/se}}",
 "{{se flag:b_perguntou_pai}}A palavra *depois*, dita pelo pai na reunião, ainda cai como uma bandeja no chão.{{/se}}",
 "{{se flag:b_saiu}}A volta pelo quarteirão, no vento de março, foi o lugar onde os balanços de três anos finalmente fizeram sentido.{{/se}}")
add('up_c2_noite_b',
 "{{se flag:b_falou_buster}}O *oi, cara* ao Buster, pela tela, valeu mais do que qualquer conselho.{{/se}}",
 "{{se flag:b_perguntou_valor}}A pergunta sobre o valor da venda teve uma resposta que não cabia em número.{{/se}}",
 "{{se flag:b_pediu_chloe}}O pedido à Chloe, *tudo que for público*, já virou uma noite acordada dela.{{/se}}")
add('up_c3_noite_b',
 "{{se flag:b_notou_medo}}A mão apertando a pasta no portão, vista de longe e guardada, é uma informação que dá vergonha ter.{{/se}}",
 "{{se flag:b_levou_cafe}}O café de papel, estendido sem explicação, foi a primeira coisa dividida.{{/se}}",
 "{{se flag:b_pediu_marcus}}O pedido para procurar tudo o que o Marcus assinou rendeu um *cuidado com todo mundo* que não sai da cabeça.{{/se}}")
add('up_c4_b',
 "{{se flag:b_admitiu_pai}}A frase *ela é melhor do que eu*, dita ao pai, foi a verdade mais barata e mais difícil.{{/se}}",
 "{{se flag:b_mentiu_pai}}A mentira *nem tanto*, dita ao pai, ficou com o gosto de uma coisa antiga.{{/se}}",
 "{{se flag:b_ouviu_buster}}O latido curto do Buster, ouvido pelo telefone no lobby do hotel, ainda é a melhor notícia da viagem.{{/se}}")
add('up_c4_corredor_b',
 "{{se flag:b_ligou_chloe}}A informação da Chloe, *a página dezessete não está na versão pública*, vira uma pergunta sem rosto.{{/se}}",
 "{{se flag:b_esperou_chloe}}A noite de espera, ouvindo a respiração do outro lado do colchão, tinha forma e calor.{{/se}}",
 "{{se flag:b_perguntou_acordada}}A pergunta no escuro, *você também está acordada?*, ganhou uma resposta e uma promessa de não rir.{{/se}}")
add('up_c5_noite_b',
 "{{se flag:b_sem_cartao}}O cartão de anotações, guardado no bolso, foi a decisão mais sincera do palco.{{/se}}",
 "{{se flag:b_ligou_pai}}A voz do pai, *fala do Walter*, ainda é a abertura de qualquer coisa.{{/se}}",
 "{{se flag:b_mudou_ordem}}A doca de Gary, às quatro da manhã, no começo dos slides, foi o primeiro slide que ninguém esqueceu.{{/se}}")
add('up_c7_b',
 "{{se flag:b_falou_frank}}A frase do Frank, *esse é o Tillman que eu conheço*, é o melhor elogio do mês.{{/se}}",
 "{{se flag:b_perguntou_frank}}A conversa de pessoa e não de telefone, prometida pelo Frank, ainda está por vir.{{/se}}",
 "{{se flag:b_desligou_frank}}O telefone desligado depressa, com trezentos executivos esperando, deixou a voz do Frank como alguém que queria contar uma coisa.{{/se}}")
add('up_c8_b',
 "{{se flag:b_suspeitou}}A suspeita sobre Lincoln Park, guardada como pedra no bolso, tem o gosto de uma dúvida.{{/se}}",
 "{{se flag:b_defendeu}}A defesa de última hora, *não é ela*, teve como resposta *você a conhece há três dias*.{{/se}}",
 "{{se flag:b_vai_contar}}A decisão de contar, sem acusar, é uma aposta que ainda não deu resultado.{{/se}}")
add('up_c8_marcus_b',
 "{{se flag:b_mostrou_jantar}}O e-mail do jantar, mostrado no brunch, deu uma informação de graça e recebeu uma confiança.{{/se}}",
 "{{se flag:b_guardou_jantar}}O segredo do jantar, guardado desde o brunch, é o menor e o mais pesado da vida.{{/se}}",
 "{{se flag:b_recusou_jantar}}A recusa ao Marcus, respondida com *eu insisto*, mostra que este jantar não é um jantar.{{/se}}")
add('up_c9_b1',
 "{{se flag:b_confia}}A frase *não foi ela*, dita à Chloe, voltou com uma resposta: *então eu vou ajudar você a provar*.{{/se}}",
 "{{se flag:b_duvida}}A ordem *fica de olho*, dada à Chloe, tem hoje o gosto de ter dançado valsa com a dúvida.{{/se}}",
 "{{se flag:b_vai_perguntar}}A decisão de perguntar sem acusar foi a mais corajosa e a que deu menos resultado.{{/se}}")
add('up_c9_b2',
 "{{se flag:b_recusou_carta}}A carta recusada no Steirereck, com o pedido de ver por escrito, fez do Marcus um inimigo e do alívio, uma amizade nova.{{/se}}",
 "{{se flag:b_perguntou_mw}}A pergunta sobre a MW Holdings, feita em plena entrada, teve como resposta *eu gosto de gente que lê*.{{/se}}")
add('up_c9_b3',
 "{{se flag:b_planejou_prova}}A lista de três perguntas, escrita no bloco, ainda tem a última linha sublinhada: *ligar para ela*.{{/se}}",
 "{{se flag:b_contou_pai}}A conversa de verdade com o pai, *eu sabia do rombo*, tirou um peso que não era seu.{{/se}}")
add('up_c10_b',
 "{{se flag:b_chamou_frank}}A ajuda do Frank Delaney, pedida ao pai, devolveu o Buster e a conta.{{/se}}",
 "{{se flag:b_vai_voltar}}O *dane-se o congresso*, dito ao pai, foi a coisa mais livre que saiu da boca em anos.{{/se}}",
 "{{se flag:b_chamou_chloe}}A Chloe de joelhos numa doca de carga, tentando convencer um vira-lata a sair de baixo do caminhão, é uma foto que fica.{{/se}}")
add('up_c10_b_voo',
 "{{se flag:b_deixou_frank_falar}}O silêncio ouvindo o Frank, em frases lentas e sem enfeite, ensinou mais do que qualquer pergunta.{{/se}}",
 "{{se flag:b_agradeceu_frank}}O *vai, filho*, do Frank, é uma permissão que só um homem de sessenta anos sabe dar.{{/se}}")

# ---- públicas (cenas compartilhadas) ----
add('up_c2_hotel',
 "{{se flag:voo_trabalhou}}No avião, uma apresentação foi revisada slide por slide, e a turbulência derrubou a concentração.{{/se}}",
 "{{se flag:voo_conversou}}No avião, uma comédia romântica ruim e uma mini-garrafa de vinho viraram a primeira conversa em que ninguém quis ganhar.{{/se}}",
 "{{se flag:voo_dormiu}}No avião, uma cabeça caiu do lado errado e acordou com um peso conhecido no ombro.{{/se}}")
add('up_c3_dialogo',
 "{{se flag:pegou_tv}}O controle da TV ficou com quem chegou primeiro, em um canal austríaco de notícias.{{/se}}",
 "{{se flag:pegou_chuveiro}}A água quente do chuveiro acabou depois de uma hora, sem ninguém avisar.{{/se}}",
 "{{se flag:pegou_cama}}O lado da cama, declarado de sapato, virou uma fronteira aceita sem concordância.{{/se}}")
add('up_c3_fim',
 "{{se flag:a_confiou_cama}}A confiança dita em voz alta, *a cama é grande*, foi cumprida sem ninguém comentar.{{/se}}",
 "{{se flag:b_confiou_cama}}A confiança dita em voz alta, *eu confio que você vai ficar do seu lado*, foi cumprida sem ninguém comentar.{{/se}}")
add('up_c5_dialogo',
 "{{se flag:mudou_assunto}}A palavra *casal*, afastada pela conversa sobre o pedágio da União Europeia, ainda voltava, de vez em quando, à mesa.{{/se}}")
add('up_c7_manha',
 "{{se flag:a_calou_segredo}}Uma delas, no café, bebeu um gole de vinho e disse que não tinha mais nada a contar, e os dois sabiam que era mentira.{{/se}}",
 "{{se flag:b_calou_segredo}}Uma delas, no café, ergueu um *saúde* em vez de uma confissão, e os dois sabiam por quê.{{/se}}")
add('up_c10_final',
 "{{se flag:disse_a_frase}}No parque, alguém disse a frase inteira, *você estava certa, eu estava errado, e eu não quero a vaga, eu quero você*, e ela não precisou de mais nada.{{/se}}",
 "{{se flag:cada_um_segue}}Os dois decidiram não decidir tudo naquele dia, e a porta ficou aberta como combinado.{{/se}}",
 "{{se flag:a_chorou}}Foi no degrau de uma varanda de Dayton que uma delas chorou, sem pressa, pela primeira vez em dez anos.{{/se}}",
 "{{se flag:a_discordou_nina}}Houve uma discussão na varanda sobre plateia e trabalho, e as duas tinham razão.{{/se}}",
 "{{se flag:a_falou_da_pessoa}}A Nina descobriu na varanda que a história nunca foi sobre a vaga.{{/se}}",
 "{{se flag:a_ficou_parque}}O banco de madeira do rio viu um fim de tarde sem espera.{{/se}}",
 "{{se flag:a_pediu_nina}}Uma ligação à Nina, *você acha que ele vem?*, teve resposta: *ele já veio, só falta chegar*.{{/se}}",
 "{{se flag:a_escreveu_caderno}}No caderno, três linhas sem lista guardam o que ninguém lê.{{/se}}",
 "{{se flag:b_ensaiou}}No avião, a frase foi ensaiada até a palavra *vaga* sumir.{{/se}}",
 "{{se flag:b_avisou_pai}}O pai respondeu com erros de digitação e ternura: *o buster esta cmigo. ele aprovou*.{{/se}}",
 "{{se flag:b_dormiu_voo}}A frase cresceu no sono, como um pão.{{/se}}")
EXTRAS = E
