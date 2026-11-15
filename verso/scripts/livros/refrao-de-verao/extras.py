# Consequências tardias das escolhas. Privadas só na cena do próprio assento; públicas em cenas compartilhadas.
E = {}
def add(nid, *frases): E.setdefault(nid, []).extend(frases)

# ---- A (privadas) ----
add('rv_c2_a', "{{se flag:a_entrou_direto}}A chave do advogado girou no primeiro dia sem hesitar, e a casa ainda tem esse cheiro de cachimbo e de entrada direta.{{/se}}")
add('rv_c4_a',
 "{{se flag:a_disse_verdade}}A frase dita à Doris, *eu estava em turnê, em Tóquio*, ainda é a única verdade que a cidade recebeu de graça.{{/se}}",
 "{{se flag:a_mentiu_doris}}A palavra *marketing*, dita depressa demais à Doris, continua pendurada no balcão como uma moeda mordida.{{/se}}",
 "{{se flag:a_cartao_preto}}O cartão preto, devolvido pela Doris com *aqui a gente só aceita dinheiro*, ainda está no fundo da carteira, inútil.{{/se}}")
add('rv_c3_melodia',
 "{{se flag:a_ouviu_fechados}}A música ouvida de olhos fechados na Lanterna ainda soa sem microfone, sem compressor, sem filtro.{{/se}}",
 "{{se flag:a_analisou_musica}}A estrutura da música do bar, ré maior e uma ponte que cai um tom, ficou na cabeça como um mapa de coisa simples e impossível de fabricar.{{/se}}",
 "{{se flag:a_saiu_antes}}O último verso da música ficou do lado de fora da parede, na varanda dos fundos, e a cabeça tenta adivinhá-lo.{{/se}}")
add('rv_c9_a2', "{{se flag:a_perguntou_doris}}A frase da Doris, *seu avô voltou para ele mesmo no fim*, é a que mais pesa neste último dia.{{/se}}")
add('rv_c6_a',
 "{{se flag:a_chamou_ouvir}}A janela aberta, o martelo parado e *vem ouvir uma coisa* foram a primeira vez em que uma música saiu de casa antes de estar pronta.{{/se}}",
 "{{se flag:a_ensaiou_demo}}O piano, tocado até os dedos doerem, ainda tem na tecla de fita crepe uma marca de unha.{{/se}}",
 "{{se flag:a_escondeu_musica}}A tampa do piano, fechada por reflexo, ainda guarda o medo de uma música nua demais.{{/se}}")
add('rv_c7_a',
 "{{se flag:a_apagou_lorna}}A mensagem da Lorna, apagada sem resposta, deixou uma pedra de sinal mais livre e mais perigosa.{{/se}}",
 "{{se flag:a_releu_lorna}}A voz da Lorna, *cuidado com o que você está sentindo*, é a que mais se repete: ela nunca disse isso a ninguém.{{/se}}")
add('rv_c8_a', "{{se flag:a_ligou_lorna}}O telefonema da pedra de sinal, com a Lorna dizendo *foi bom, a internet está dizendo que você está de volta*, deixou um gosto de ter sido vazada por alguém que nunca se conheceu.{{/se}}")
add('rv_c9_a',
 "{{se flag:a_escreveu_noite}}A noite inteira de escrita deixou o chão coberto de folhas e um álbum de doze faixas, todas tristes.{{/se}}",
 "{{se flag:a_tentou_alegre}}O refrão alegre, rasgado em dez minutos, virou uma ironia por cima de uma estrofe triste.{{/se}}",
 "{{se flag:a_tentou_ligar}}A caminhada de madrugada até a pedra do sinal, com o dedo parado sobre um número, deixou o orvalho nas botas.{{/se}}")

# ---- B (privadas) ----
add('rv_c2_b', "{{se flag:b_ignorou}}A martelada no primeiro dia, sem descer da escada, ficou como uma opinião do telhado.{{/se}}")
add('rv_c2_noite_b',
 "{{se flag:b_defendeu}}A defesa feita à Doris, *ela acabou de enterrar o avô*, rendeu um pacote de biscoitos de aveia para a casa.{{/se}}",
 "{{se flag:b_apostou}}A aposta de dez dólares com a Doris saiu sozinha, como um prego que escolhe a madeira.{{/se}}",
 "{{se flag:b_neutro}}A neutralidade na mercearia foi uma lição antiga: quem tem opinião sobre todo mundo termina sem amigo.{{/se}}")
add('rv_c3_noite_b',
 "{{se flag:b_perguntou_caleb}}A conversa com o irmão, *ou é invisível, ou sabe desaparecer*, ainda não tem conclusão.{{/se}}",
 "{{se flag:b_ignorou_caleb}}O jantar com o irmão, falando de lenha e de motor, deixou a neta do Henry pendurada no ar como roupa no varal.{{/se}}",
 "{{se flag:b_contou_aposta}}O riso do Caleb diante da aposta, *você, que nunca apostou em nada*, continua soando.{{/se}}")
add('rv_c4_b',
 "{{se flag:b_disse_sarah}}A frase da Sarah, *gente assim tem data de ir embora*, é uma previsão que ainda não acabou.{{/se}}",
 "{{se flag:b_negou_sarah}}A negativa dada à Sarah, *foi só uma música*, foi lida como a mentira que é.{{/se}}",
 "{{se flag:b_calou_sarah}}O silêncio diante da Sarah no cascalho deixou, no retrovisor, uma cidade do tamanho de uma mão.{{/se}}")
add('rv_c5_b',
 "{{se flag:b_trabalhou}}O quadrante sul do telhado, terminado por teimosia, continua sendo o único trabalho sem testemunha.{{/se}}",
 "{{se flag:b_tocou_varanda}}O violão na varanda, tocado baixinho, fez de um carpinteiro, por duas horas, alguém que toca.{{/se}}",
 "{{se flag:b_foi_ver}}A viagem à Rua Principal, só para ver a bicicleta na vitrine, ainda dá vergonha e dá paz.{{/se}}")
add('rv_c6_b',
 "{{se flag:b_ouviu_escada}}O degrau da escada, de costas para a casa, foi o melhor lugar do mundo para ser o primeiro ouvinte.{{/se}}",
 "{{se flag:b_acompanhou_martelo}}O dueto de martelo e piano, em quatro por quatro, foi o primeiro em quatorze anos.{{/se}}",
 "{{se flag:b_bateu_porta}}O pedido de água na porta, com a desculpa pronta, ainda tem na memória um sorriso de quem foi ouvida.{{/se}}")
add('rv_c7_b',
 "{{se flag:b_negou_caleb}}A negativa ao irmão, *não tem nada*, valeu menos do que o sorriso na picape.{{/se}}",
 "{{se flag:b_contou_caleb}}A confissão ao irmão, *eu estou gostando e estou com medo*, ainda é a frase mais honesta da cozinha.{{/se}}",
 "{{se flag:b_fugiu_caleb}}A pergunta sobre Spokane, feita para fugir, foi aceita pelo irmão com o tom de quem deixa.{{/se}}")
add('rv_c8_b',
 "{{se flag:b_saiu_bar}}A saída da Lanterna, com a cerveja intacta, deixou fotógrafos que ninguém conhecia fotografando um carpinteiro.{{/se}}",
 "{{se flag:b_olhou_sarah}}O olhar da Sarah, sem triunfo, disse com um gesto de cabeça: *você sabia que tinha data*.{{/se}}")
add('rv_c9_b',
 "{{se flag:b_ouviu_caleb}}O sermão do Caleb, ouvido até o fim, resumiu-se em *em parte*, e em parte já é começo.{{/se}}",
 "{{se flag:b_brigou_caleb}}A briga com o irmão, *você não sabe o que é ficar*, terminou numa porta batida e numa frase que dói: *eu sei, só nunca falei*.{{/se}}",
 "{{se flag:b_foi_calha}}A calha, terminada em silêncio com a janela do piano aberta, foi o melhor jeito de ouvir sem olhar.{{/se}}")
add('rv_c10_b', "{{se flag:b_foi_ao_chale}}O chalé vazio, visitado de madrugada, ainda guarda a forma de uma pessoa que passou por ali.{{/se}}")
add('rv_c10_b2',
 "{{se flag:b_aceitou_caminhao}}O Ford de 2003, com embreagem de humor e duas caixas de biscoitos de aveia, é a prova de que alguém emprestou sem fazer pergunta.{{/se}}",
 "{{se flag:b_foi_de_picape}}A picape de freio gasto, mantida por orgulho, sobe cada curva com uma tosse de gato velho.{{/se}}",
 "{{se flag:b_ligou_caleb}}A porta de carga número quatro, indicada pelo irmão, é o único endereço que importa na arena.{{/se}}")

# ---- públicas ----
add('rv_c2_dialogo',
 "{{se flag:carregou_sozinha}}As sacolas carregadas de uma vez, e a omelete de ovos no chão da mercearia, ainda rendem uma risada seca no banco da picape.{{/se}}",
 "{{se flag:dividiu_peso}}As sacolas divididas até a picape foram um silêncio em fila, sem incômodo.{{/se}}",
 "{{se flag:fez_piada}}A piada do chapéu, *disfarçar ou carregar peso*, rendeu um riso de nariz que foi logo negado.{{/se}}")
add('rv_c3_entrada', "{{se flag:convidou_bar}}O convite ao bar, dito no fim da viagem, *tem cerveja ruim e um banjo*, ainda vale.{{/se}}")
add('rv_c3_dialogo',
 "{{se flag:sentou_balcao}}A cerveja da torneira, a mais barata, foi a melhor de meses, segundo quem a bebeu.{{/se}}",
 "{{se flag:ficou_palco}}Ao lado do palco, de braços cruzados, ficou quem viu de perto os arranhões e a fita crepe nos instrumentos.{{/se}}",
 "{{se flag:falou_caleb}}A conversa com o irmão do carpinteiro foi a frase mais direta da noite: *eu acho que é uma pessoa interessante*.{{/se}}")
add('rv_c4_dividir',
 "{{se flag:a_quase_contou}}A frase *eu trabalho com música, mais ou menos* ficou pela metade, na varanda dos fundos da Lanterna.{{/se}}",
 "{{se flag:b_quase_contou}}A frase *eu tive uma banda, aos catorze* ficou pela metade, na varanda dos fundos da Lanterna.{{/se}}")
add('rv_c4_dialogo',
 "{{se flag:perguntou_direto}}A pergunta direta, *o que você faz da vida*, soou mais íntima do que um beijo.{{/se}}",
 "{{se flag:falou_do_telhado}}O quadrante sul, mostrado com onze palavras, foi a conversa mais pequena e mais completa da semana.{{/se}}",
 "{{se flag:provocou}}A provocação sobre os pratos, *eu lavei dois, em 2019, foi traumático*, virou piada fixa.{{/se}}")
add('rv_c6_noite', "{{se flag:ficou_cais}}No cais, uma truta saltou ao longe e desenhou um círculo que ninguém viu.{{/se}}")
add('rv_c7_bar', "{{se flag:cidade_descobriu}}A foto da bicicleta, tirada de longe, já circula em três satélites.{{/se}}")
add('rv_c9_fim', "{{se flag:b_avisou_festa}}A frase *se eu for à festa, vou pedir que você fique, e não tenho direito*, ficou na varanda, dita uma vez.{{/se}}")
add('rv_c10_final',
 "{{se flag:a_abriu_nova}}O show abriu com a música nova, a do telhado, e dezoito mil vozes sabiam a letra.{{/se}}",
 "{{se flag:a_abriu_classico}}O show abriu com a música de sempre, e uma voz pequena, ao fundo da cabeça, perguntou: quem está ouvindo?{{/se}}",
 "{{se flag:a_procurou_plateia}}Da lateral do palco, uma pessoa procurou na fileira do fundo um boné que não esperava ver.{{/se}}",
 "{{se flag:b_ensaiou_musica}}No acostamento, a frase ensaiada, *eu não vim para te tirar do mundo*, saiu na terceira vez sem tremer.{{/se}}",
 "{{se flag:b_foi_cachoeira}}Numa cachoeira da Passagem de Stevens, um minuto de silêncio trocou uma frase ensaiada por um desejo simples.{{/se}}",
 "{{se flag:b_ligou_doris}}Do outro lado de uma linha fixa, uma mulher de avental disse que, se desse errado, ela nunca soube de nada.{{/se}}",
 "{{se flag:disse_a_frase}}No palco, a frase inteira foi dita: *eu não vim para te tirar do mundo; eu vim para fazer parte dele*.{{/se}}",
 "{{se flag:um_canta_outro_toca}}Um cantou, o outro tocou, e no segundo refrão o refletor se abriu para os dois sem que ninguém pedisse.{{/se}}")
EXTRAS = E
