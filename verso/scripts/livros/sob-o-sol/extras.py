# Consequências tardias das escolhas. Privadas só na cena do próprio assento; públicas em cenas compartilhadas.
E = {}
def add(nid, *frases): E.setdefault(nid, []).extend(frases)

# ---- A (privadas) ----
add('ts_c1_noite_a',
 "{{se flag:a_fez_festa_gato}}O gato cinza do vicolo, a primeira conversa em italiano que você teve, dorme, agora, em algum degrau, sem saber que é seu confidente.{{/se}}",
 "{{se flag:a_mandou_foto}}A foto do vicolo, mandada ao grupo da família, teve uma resposta de uma linha e a palavra *conversando*.{{/se}}",
 "{{se flag:a_subiu_direto}}A escada de mármore, subida sem pensar, ainda tem na memória o olho de uma vizinha que abriu uma fresta e fechou.{{/se}}")
add('ts_c2_a', "{{se flag:a_abriu_celular}}A luz azul do celular, aceso no escuro na primeira noite, foi pedida de volta com a delicadeza de um *modo avião*.{{/se}}")
add('ts_c2_noite_a',
 "{{se flag:a_comprou_demais}}Os oitenta e sete euros gastos no mercado, a um terço da verba do mês, ainda pesam como um maço de girassóis.{{/se}}",
 "{{se flag:a_aprendeu_receita}}A receita da Giulia, anotada com atenção, é a primeira coisa que alguém ensinou sem pedir nada em troca.{{/se}}",
 "{{se flag:a_avisou_mae}}A palavra *conversando*, na mensagem da mãe, continua no celular, como um aviso.{{/se}}")
add('ts_c3_a', "{{se flag:a_pos_musica}}A balada tocada em um só ouvido na cozinha, cantada quase sem som, ainda anda pela cabeça no compasso de uma página virada.{{/se}}")
add('ts_c3_noite_a',
 "{{se flag:a_disse_nao_li}}A verdade dita na aula, *eu nem sei quem é*, rendeu uma folha rasgada com cuidado e nenhum sermão.{{/se}}",
 "{{se flag:a_blefou}}O blefe do Uffizi, desmentido em seis palavras, ainda faz a cara pegar fogo por dentro.{{/se}}",
 "{{se flag:a_riu_de_si}}O pedido de explicação *como se eu tivesse cinco anos* rendeu um canto de boca que não completou o sorriso.{{/se}}")
add('ts_c4_a',
 "{{se flag:a_minimizou}}O *era só um rabisco*, dito de nervoso, recebeu como resposta uma frase seca: *não é rabisco*.{{/se}}",
 "{{se flag:a_ficou_quieta}}O elogio ao desenho, recebido sem resposta nem piada, foi a primeira coisa boa aceita em anos sem troca.{{/se}}")
add('ts_c4_volta_a',
 "{{se flag:a_olhou_chuva}}Os minutos na janela, olhando a rua virar rio, deixaram os olhos úmidos de uma coisa sem nome.{{/se}}",
 "{{se flag:a_propos_pausa}}A pausa pedida na mesa, *quer uma pausa?*, foi concedida com cinco minutos e um cuidado novo.{{/se}}",
 "{{se flag:a_pos_playlist}}A playlist de Los Angeles, em um só ouvido, soou pequena demais para a chuva de Siena.{{/se}}")
add('ts_c5_a',
 "{{se flag:a_parou_praca}}O instante parado no meio da Piazza del Campo, sob o guarda-chuva, ainda tem quatro segundos de nenhuma palavra.{{/se}}",
 "{{se flag:a_falou_demais}}Os quatro minutos de falação na praça, sem respirar, receberam como resposta: *hoje eu gostei mais do que você não disse*.{{/se}}")
add('ts_c6_a',
 "{{se flag:a_vestiu_preto}}O vestido preto, de uma pessoa de festas, ficou no chão do quarto na manhã seguinte.{{/se}}",
 "{{se flag:a_vestiu_saia}}A saia verde-água, a que a mãe escolheu, ainda tem na seda o som de um passo dado na frente do espelho.{{/se}}",
 "{{se flag:a_vestiu_jeans}}O macacão jeans, de quem diz *não me arrumei*, levou quarenta minutos para ser escolhido.{{/se}}")
add('ts_c6_giulia',
 "{{se flag:a_esperou_cafe}}Os dois cafés servidos e frios, esperando alguém na mesa, ainda têm um resto de vinte minutos.{{/se}}",
 "{{se flag:a_saiu_antes}}A manhã na Piazza del Campo, sentada de costas para a torre, foi a primeira fuga da temporada.{{/se}}",
 "{{se flag:a_chamou_giulia}}O bilhete *saí, volto à tarde*, deixado na mesa, foi o primeiro recado escrito por esta mão.{{/se}}")
add('ts_c7_noite_a', "{{se flag:a_minimizou_giulia}}O *não é nada*, dito à Giulia, deixou um cornetto de damasco intacto no prato e uma mentira transparente.{{/se}}")
add('ts_c8_a', "{{se flag:a_virou_costas}}O lado da parede, escolhido por respeito, ainda guarda o calor de uma noite de cuidado e de saudade.{{/se}}")
add('ts_c9_a',
 "{{se flag:a_ofereceu_sanduiche}}O sanduíche de tomate, estendido no trem, *como você sabia?*, ainda tem gosto de manjericão.{{/se}}",
 "{{se flag:a_apontou_vila}}A vila de catorze torres, apontada da janela do trem, *eu vou morar naquela*, virou promessa.{{/se}}",
 "{{se flag:a_tirou_foto}}A foto tirada sem avisar, de perfil, com luz de janela na bochecha, é a única que nunca será mostrada.{{/se}}")
add('ts_c9_noite_a',
 "{{se flag:a_contou_estagio}}A notícia contada em voz alta, no quarto, deixou nas mãos de alguém um livro embrulhado com raiva.{{/se}}",
 "{{se flag:a_escondeu_estagio}}O segredo guardado por um dia, diante do espelho, ensaiou duas versões do futuro como quem prova vestidos.{{/se}}",
 "{{se flag:a_ligou_mae}}A ligação em que a mãe escutou até o fim terminou com *eu estou orgulhosa de você*, sem plural.{{/se}}")

# ---- B (privadas) ----
add('ts_c1_noite_b',
 "{{se flag:b_conferiu_lista}}A lista de quatorze regras, conferida na porta, perdeu o ponto de interrogação do item dez e ganhou um *não*.{{/se}}",
 "{{se flag:b_avisou_mae}}O *tudo em ordem* mandado à mãe teve resposta de relatório: média nove, ligação no domingo, às 19h.{{/se}}",
 "{{se flag:b_olhou_vicolo}}O minuto parado no vicolo, olhando a luz bater no arco, foi o primeiro olhar sem anotação.{{/se}}")
add('ts_c2_b', "{{se flag:b_perguntou_luz}}A pergunta *a luz incomoda?*, feita no escuro, teve como resposta *eu gosto de saber que tem alguém acordado*.{{/se}}")
add('ts_c2_noite_b',
 "{{se flag:b_recitou_lista}}A lista de leituras, recitada à mãe em onze minutos, não teve nenhuma pergunta sobre a outra pessoa.{{/se}}",
 "{{se flag:b_tentou_contar}}A luz de Siena, oferecida à mãe como assunto, ficou no ar da cozinha sem destinatário.{{/se}}",
 "{{se flag:b_encerrou_chamada}}O *preciso estudar*, dito como saída de emergência, apagou a tela às 16h41.{{/se}}")
add('ts_c3_b', "{{se flag:b_comeu_prato}}O prato de macarrão, comido quente sem levantar os olhos, ainda tem pimenta e uma doçura de limão que ninguém explicou.{{/se}}")
add('ts_c3_noite_b',
 "{{se flag:b_deu_anotacoes}}A folha rasgada do pontilhado, a primeira em três anos de curso, ainda tem a caligrafia de uma pessoa que escreve para ser lida.{{/se}}",
 "{{se flag:b_propos_metodo}}A tabela de vinte e duas linhas, com uma linha para o lanche, arrancou um som de quem se afoga rindo.{{/se}}",
 "{{se flag:b_calou_aula}}A frase escrita e riscada no alto da página, *não sabe nada e não tem vergonha*, continua legível.{{/se}}")
add('ts_c4_b',
 "{{se flag:b_guardou_elogio}}O elogio guardado na ponta da língua, com o caderno de croquis fechado, pesou mais do que o que teria sido dito.{{/se}}",
 "{{se flag:b_copiou_traco}}A linha do vestido, copiada à luz do abajur, ganhou na quinta tentativa uma curva pequena e sua.{{/se}}")
add('ts_c4_volta_b',
 "{{se flag:b_leu_voz_baixa}}A frase lida em voz baixa, *a luz é a ordem do mundo*, fez inclinar a cabeça alguém que ouvia sem saber qual música era.{{/se}}",
 "{{se flag:b_foi_janela}}O metro de distância, na janela da biblioteca, olhando a mesma chuva, foi a primeira coisa que não vinha do plano.{{/se}}",
 "{{se flag:b_anotou_chuva}}A nota na margem, *chuva em Siena: barulho de dedos*, é a coisa menos acadêmica e a única que ficou sem risco.{{/se}}")
add('ts_c5_b', "{{se flag:b_afastou_mao}}A mão tirada do cabo e guardada no bolso deixou o guarda-chuva balançar nas duas mãos de quem o segurou.{{/se}}")
add('ts_c6_b',
 "{{se flag:b_quis_ficar}}O *eu fico só até as nove*, dito três vezes, perdeu o sentido na terceira.{{/se}}",
 "{{se flag:b_avisou_mae_festa}}O *se for o caso*, da mãe, não pesou como sempre quando a festa foi anunciada.{{/se}}")
add('ts_c6_matteo',
 "{{se flag:b_fugiu_biblioteca}}A fuga para a biblioteca, em voz de comunicado, terminou numa escada de mármore, com a testa na parede fria.{{/se}}",
 "{{se flag:b_foi_cozinha}}O minuto de pé na porta da cozinha, de meia, com a colher tilintando na xícara, foi mais longo do que qualquer conversa.{{/se}}",
 "{{se flag:b_olhou_mae}}O cursor piscando em uma mensagem à mãe, *mãe, eu*, apagada três vezes, deixou a sensação de desapontar alguém desde os doze anos.{{/se}}")
add('ts_c8_b', "{{se flag:b_ficou_quieta}}A noite de silêncio, de mãos cruzadas sobre o peito, terminou às três com um choro sem som que não era tristeza.{{/se}}")
add('ts_c9_b',
 "{{se flag:b_aceitou_viagem}}O Baxandall fechado e guardado no trem foi a primeira mudança de religião sem testemunha.{{/se}}",
 "{{se flag:b_explicou_vilas}}Os nomes de vilas explicados em voz baixa, Monteriggioni, Colle di Val d'Elsa, San Gimignano, foram a viagem mais falante da vida.{{/se}}",
 "{{se flag:b_deixou_ombro}}O ombro encostado com o balanço do trem, sem recuo, foi a descoberta de que silêncio acompanhado é um lugar.{{/se}}")
add('ts_c9_noite_b',
 "{{se flag:b_disse_sempre_quis}}O *é o que eu sempre quis*, dito no escritório, soou como um texto decorado.{{/se}}",
 "{{se flag:b_confessou_duvida}}A confissão ao orientador, *o plano parece pequeno*, voltou como pergunta: o que o plano não previu?{{/se}}",
 "{{se flag:b_ligou_mae_sapienza}}A notícia da Sapienza, dada à mãe do corredor, ficou na garganta como um osso pequeno depois do *sim*.{{/se}}")
add('ts_c10_b',
 "{{se flag:b_esperou_manha}}A manhã esperada de olhos abertos, até a persiana ganhar uma linha rosada, terminou numa cama com uma falta.{{/se}}",
 "{{se flag:b_olhou_dormir}}A hora e pouco olhando alguém dormir, sem tocar, foi a coisa mais longa feita sem ler uma palavra.{{/se}}")

# ---- públicas (cenas compartilhadas) ----
add('ts_c1_dialogo',
 "{{se flag:pegou_janela}}Sobre o lado da janela da cama, onde bate o sol, já pesa um casaco jogado como bandeira.{{/se}}",
 "{{se flag:dividiu_armario}}No armário, uma fita crepe divide as prateleiras ao meio, com uma etiqueta em cada metade.{{/se}}",
 "{{se flag:saiu_do_quarto}}A torneira da cozinha, aberta para ouvir alguma coisa, deixou na água um gosto de pedra.{{/se}}")
add('ts_c1_decisao',
 "{{se flag:regra_sem_julgar}}Uma regra, a de *sem julgamento*, ficou combinada em voz alta na cozinha.{{/se}}",
 "{{se flag:regra_visitas}}Outra regra, a de visitas até as vinte e duas horas, também.{{/se}}")
add('ts_c2_dialogo',
 "{{se flag:cozinhou_apesar}}O cacio e pepe, feito no meio de oito pessoas, teve na água do cozimento a sua mágica.{{/se}}",
 "{{se flag:liberou_mesa}}A mesa foi desocupada com uma educação que dói: fichas por ordem de cor, notebook debaixo do braço.{{/se}}",
 "{{se flag:ficou_na_mesa}}O fichário ficou aberto no meio do jantar, e uma colher de pau foi tirada de cima da ficha número nove.{{/se}}")
add('ts_c2_decisao',
 "{{se flag:cronograma_a}}Do cronograma, a cozinha é de uma das duas das cinco às sete.{{/se}}",
 "{{se flag:cronograma_b}}Do cronograma, a cozinha é da outra das seis às oito da manhã.{{/se}}")
add('ts_c3_decisao',
 "{{se flag:a_contou_familia}}Uma contou ao pátio da biblioteca que a família dela é toda barulho.{{/se}}",
 "{{se flag:b_contou_familia}}A outra contou que a dela é toda silêncio.{{/se}}")
add('ts_c4_dialogo',
 "{{se flag:terminou_ficha}}A ficha da tarde foi terminada, e os seis livros devolvidos, um a um, às prateleiras.{{/se}}",
 "{{se flag:esperou_chuva}}A chuva, esperada até 17h55, não diminuiu, e o bibliotecário pigarreou duas vezes.{{/se}}",
 "{{se flag:abriu_guarda_chuva}}O guarda-chuva verde da signora Ottavia, aberto no saguão, tem varetas de madeira e lugar para duas pessoas muito próximas.{{/se}}")
add('ts_c5_dialogo',
 "{{se flag:dancou_com_giulia}}Na sala do Lorenzo, uma pessoa dançou melhor do que nunca, sabendo-se observada.{{/se}}",
 "{{se flag:foi_ao_terraco}}No terraço, Siena de cima era um mar de telhas e de torres.{{/se}}",
 "{{se flag:ficou_na_parede}}Na parede da festa, uma pessoa observou a sala inteira sem saber que era a mais observada.{{/se}}")
add('ts_c5_decisao',
 "{{se flag:b_admitiu_chuva}}Uma disse, no terraço, que pensou na noite da chuva todos os dias, e fingiu que não.{{/se}}",
 "{{se flag:a_admitiu_chuva}}A outra disse que pensou tanto que parou de falar.{{/se}}")
add('ts_c6_fim',
 "{{se flag:mergulhou_trabalho}}Quem mergulhou no trabalho cumpriu a tabela até a linha dezenove e dormiu às três.{{/se}}",
 "{{se flag:mergulhou_festas}}Quem mergulhou nas festas cantou karaokê em italiano de ouvido, e cada risada foi uma pedra no caminho.{{/se}}",
 "{{se flag:tentou_falar}}Uma tentativa de conversa, *a gente precisa conversar?*, teve a resposta *não agora, eu preciso de um tempo*, e um pão partido sobre a tábua.{{/se}}")
add('ts_c7_decisao',
 "{{se flag:a_contou_ex}}Uma contou, à mesa de sopa, do ex de quatro anos de que fugiu.{{/se}}",
 "{{se flag:b_contou_nunca}}A outra contou que nunca teve ninguém, e a frase não pesou.{{/se}}",
 "{{se flag:a_deu_espaco}}Uma disse que espera, de verdade.{{/se}}")
add('ts_c8_consente1',
 "{{se flag:ficaram_arno}}O Arno, visto do parapeito, desliza sem pressa em uma cor que nenhuma tinta tem.{{/se}}",
 "{{se flag:foram_piazzale}}Do Piazzale Michelangelo, Florença inteira ficou dourada.{{/se}}",
 "{{se flag:foram_oltrarno}}No Oltrarno, um cone de castanhas assadas foi dividido de pé, de mãos queimadas.{{/se}}")
add('ts_c9_dialogo',
 "{{se flag:despediu_lugares}}A despedida dos lugares, uma a uma, teve na biblioteca um *arrivederci* do bibliotecário de óculos.{{/se}}",
 "{{se flag:despediram_juntas}}A despedida juntas pôs dois tijolos a poucos centímetros um do outro na Piazza del Campo.{{/se}}",
 "{{se flag:arrumou_tudo}}A lista de quarenta linhas virou, em dois dias, nenhuma, e cada caixa fechada foi um som de porta.{{/se}}")
add('ts_c10_final',
 "{{se flag:disse_o_gesto}}Na avenida, a frase foi dita inteira: *eu pedi transferência; eu quero viver a minha vida, com você*.{{/se}}",
 "{{se flag:a_quis_tudo}}Uma disse que quer tudo isso, mesmo sem plano.{{/se}}",
 "{{se flag:b_quis_tudo}}A outra disse o mesmo, com as mesmas palavras.{{/se}}",
 "{{se flag:nao_decidiram}}Ninguém decidiu nada naquela tarde, e foi a decisão mais radical.{{/se}}",
 "{{se flag:b_ensaiou_frase}}No trem, a última frase, a que ninguém ensaiou, era a única que já se sabia.{{/se}}",
 "{{se flag:b_leu_vasari}}No trem, uma ficha dobrada na página trinta e dois ficou borrada de um choro de alívio.{{/se}}",
 "{{se flag:b_olhou_janela}}No trem, o coração bateu no compasso das rodas, tum-tum, só um coração.{{/se}}")
EXTRAS = E
