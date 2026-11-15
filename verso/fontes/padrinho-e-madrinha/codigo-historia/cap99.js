/* ================= PADRINHO E MADRINHA · reservas de fala =================
   Cada diálogo ganha uma reserva: falas que cabem em qualquer ponto da conversa, de tons diferentes.
   O motor completa com elas qualquer turno que tenha menos de três opções, para que ninguém só clique no que eu escrevi. */
NOS.pd_c1_farpas.pool=[
 {t:c=>'— Eu estou cansad'+c.eu.o+'. Não de você. Da semana que ainda nem começou.',tom:'abre',tag:'pl_cansaco'},
 {t:'(Olhar para a máquina de café, que solta mais um ruído de quem vai morrer, e fingir que é a coisa mais interessante da balsa.)',tom:'seco',acao:true,tag:'pl_maquina'},
 {t:'— Dois lugares, um apoio de braço. Você vai discordar até disso?',tom:'flerte',tag:'pl_braco'},
 {t:'— Eu aceito a trégua até Nantucket. Em Nantucket a gente vê.',tom:'seco',tag:'pl_tregua'}];
NOS.pd_c2_bolo.pool=[
 {t:'— A Rosa chorou nas duas primeiras. Se chorar na de limão, é a de limão.',tom:'cuida',tag:'pl_rosa'},
 {t:'(Empurrar o prato de coco para o meio da mesa, sem comentar.)',tom:'seco',acao:true,tag:'pl_coco'},
 {t:'— Você está comendo do meu prato. Eu estou contando.',tom:'flerte',tag:'pl_prato'},
 {t:'— Seis bolos, e a gente nem sabe se a tenda aguenta o vento. É esquisito escolher o doce antes do resto.',tom:'abre',tag:'pl_doce'}];
NOS.pd_c3_vinho.pool=[
 {t:'— Eu tenho uma versão dessa noite que ainda não contei para ninguém. Hoje não vou contar. Queria só que você soubesse que ela existe.',tom:'abre',tag:'pl_versao'},
 {t:'(Enterrar o pé na areia fria até o tornozelo e olhar para o mar, em vez de olhar para a outra pessoa.)',tom:'seco',acao:true,tag:'pl_pe'},
 {t:'— O vinho verde é uma péssima ideia. Eu pediria mais uma.',tom:'flerte',tag:'pl_vinho'},
 {t:'— Está esfriando. Pega a lona da Dory.',tom:'cuida',tag:'pl_lona'}];
NOS.pd_c5_pai.pool=[
 {t:'— Você não precisa me contar. Eu pergunto porque quero saber, não porque preciso.',tom:'cuida',tag:'pl_precisa'},
 {t:'(Beber o resto da limonada morna e amassar o copo, devagar, no punho.)',tom:'seco',acao:true,tag:'pl_copo'},
 {t:'— Todo mundo nessa semana tem uma data que não diz em voz alta.',tom:'abre',tag:'pl_data'},
 {t:'— A Mrs. Starbuck vai voltar e eu ainda não sei dançar com você.',tom:'flerte',tag:'pl_danca'}];
NOS.pd_c6_verdade.pool=[
 {t:'— Eu pensei nisso toda vez que choveu. Dois anos de chuva.',tom:'abre',tag:'pl_chuva'},
 {t:'— A gente não precisa resolver isso na caminhonete. Mas também não precisa fingir que não aconteceu.',tom:'cuida',tag:'pl_fingir'},
 {t:'(Passar a manga no vidro embaçado, abrir um círculo, e olhar a chuva por ele.)',tom:'seco',acao:true,tag:'pl_vidro'},
 {t:'— O teto pingou no copo de café de novo. Isso é um sinal ou é só o Barnaby?',tom:'flerte',tag:'pl_teto'}];
NOS.pd_c8_varanda.pool=[
 {t:'— Trinta e oito horas é muito tempo para eu ficar sem ter o que dizer. Eu ensaiei vários começos. Nenhum serve.',tom:'abre',tag:'pl_horas'},
 {t:'(Encostar na grade da varanda, a uma hortênsia de distância, e olhar o farol.)',tom:'seco',acao:true,tag:'pl_grade'},
 {t:'— Você comeu hoje? De verdade? Não o que a Pippa colocou no prato.',tom:'cuida',tag:'pl_comeu'},
 {t:'— O farol piscou. Eu contei. Você também contou.',tom:'flerte',tag:'pl_farol'}];
NOS.pd_c9_ajuste.pool=[
 {t:'— Você não precisa explicar o motivo agora. Eu estou aqui até você terminar.',tom:'cuida',tag:'pl_motivo'},
 {t:'(Passar o dedo na taça de regata de 1910, sem olhar, e limpar o pó na roupa.)',tom:'seco',acao:true,tag:'pl_taca'},
 {t:'— Eu também escolhi a versão em que eu parecia só vítima. É mais fácil. Ninguém pergunta o resto.',tom:'abre',tag:'pl_vitima'},
 {t:'— O comodoro está olhando. Eu acho que ele desaprova.',tom:'seco',tag:'pl_comodoro'}];
NOS.pd_c10_salao.pool=[
 {t:'— Eu não quero que isso acabe junto com a tenda desmontada.',tom:'abre',tag:'pl_tenda'},
 {t:'(Empilhar uma cadeira que sobrou, sem necessidade, só para ter o que fazer com as mãos.)',tom:'seco',acao:true,tag:'pl_cadeira'},
 {t:'— Uma fileira de luz acesa e nenhuma música. Isso é pior do que a valsa.',tom:'flerte',tag:'pl_luz'},
 {t:'— Você precisa dormir. Eu preciso dormir. Vamos fingir que não precisamos mais cinco minutos.',tom:'cuida',tag:'pl_dormir'}];

NOS.pd_c2_carro.pool=[
 {t:'(Abrir uma fresta da janela. Cheiro de pinheiro e de sal. Deixar o silêncio fazer o trabalho.)',tom:'abre',acao:true,tag:'pl_janela'},
 {t:'— Se a Dory não tivesse apertado a nossa mão, eu ia achar que ela tinha desistido.',tom:'cuida',tag:'pl_dory'},
 {t:'— Rhinestone Cowboy. Eu juro que odeio essa música. Não mude.',tom:'flerte',tag:'pl_radio'},
 {t:'— Vinte e cinco mil dólares e uma caminhonete que cheira a isca. Foi uma manhã cara.',tom:'seco',tag:'pl_cara'}];
NOS.pd_c1_neblina2.pool=[
 {t:'(Olhar a neblina pela janela embaçada, que não mostra nada, e fingir que o problema é só o tempo.)',tom:'seco',acao:true,tag:'pl_neblina'},
 {t:'— Eu estou com medo de que elas descubram por outra pessoa. Isso é pior.',tom:'abre',tag:'pl_medo'},
 {t:'— Se a gente for contar, que seja junto. Eu não aguento ser a única pessoa de pé.',tom:'cuida',tag:'pl_junto'},
 {t:'— A máquina de café morreu. A noiva sumiu. A pasta pesa dois quilos. Que começo.',tom:'flerte',tag:'pl_comeco'}];
NOS.pd_c7_guardanapo.pool=[
 {t:'(Olhar para a Pippa, que fingiu perfeitamente não estar ouvindo, e depois para o chão.)',tom:'seco',acao:true,tag:'pl_pippa'},
 {t:'— A tinta borrou. Eu acho que isso conta como prova de que foi guardado e não escondido.',tom:'flerte',tag:'pl_tinta'},
 {t:'— Eu não sei o que dizer. Isso é raro. Aproveita.',tom:'abre',tag:'pl_raro'},
 {t:'— Café. Alguém quer café? Eu preciso de uma coisa para fazer com as mãos.',tom:'seco',tag:'pl_cafe'}];
NOS.pd_c1_jantar.pool=[
 {t:'— Pippa, isso é um interrogatório ou um jantar?',tom:'seco',tag:'pl_interrog'},
 {t:'(Olhar para o prato com muita atenção, como se o ensopado tivesse a resposta.)',tom:'seco',acao:true,tag:'pl_prato'},
 {t:'— A minha versão é mais curta e eu saio melhor nela. Recomendo.',tom:'flerte',tag:'pl_curta'},
 {t:'— Foi há dois anos. A gente era outra gente. Um pouco.',tom:'abre',tag:'pl_outra'}];
NOS.pd_c2_planod.pool=[
 {t:'— O Barnaby deixou leite. Eu não tomo leite desde os doze anos. Vou tomar.',tom:'seco',tag:'pl_leite'},
 {t:'(Ouvir o sino de boia tocar duas vezes antes de responder.)',tom:'abre',acao:true,tag:'pl_sino'},
 {t:'— Você está com farelo de biscoito no queixo. Do lado esquerdo.',tom:'flerte',tag:'pl_farelo'},
 {t:'— Amanhã tem lagosta às sete. A gente devia dormir. Ninguém está levantando.',tom:'cuida',tag:'pl_dormir'}];
NOS.pd_c3_manha.pool=[
 {t:'— Tem uma gaivota olhando para a gente. Eu acho que ela está julgando.',tom:'flerte',tag:'pl_gaivota'},
 {t:'(Olhar o relógio. Seis e trinta e dois. Fazer a conta de quantas horas faltam até sábado.)',tom:'seco',acao:true,tag:'pl_relogio'},
 {t:'— Eu não quero que isso atrapalhe o casamento deles. É só o que eu sei por enquanto.',tom:'abre',tag:'pl_atrapalhe'},
 {t:'— Você está com frio. Dá para ver daqui.',tom:'cuida',tag:'pl_frio'}];
NOS.pd_c4_porao.pool=[
 {t:'— Tem cheiro de corda molhada aqui embaixo. Eu gosto. Não conta para ninguém.',tom:'abre',tag:'pl_corda'},
 {t:'(Olhar a lâmpada balançar, para não olhar outra coisa.)',tom:'seco',acao:true,tag:'pl_lampada'},
 {t:'— Se a Pippa descer agora, a lousa da cozinha ganha uma estrela.',tom:'flerte',tag:'pl_estrela'},
 {t:'— Cuidado com a pilha atrás de você. Ela está torta.',tom:'cuida',tag:'pl_pilha'}];
NOS.pd_c4_macieira.pool=[
 {t:'(Olhar a estufa torta do Barnaby, com a luz da lua no vidro.)',tom:'seco',acao:true,tag:'pl_estufa'},
 {t:'— Essa macieira não dá maçã. O Barnaby rega mesmo assim.',tom:'abre',tag:'pl_macieira'},
 {t:'— Você está com frio. Eu tenho um casaco lá dentro.',tom:'cuida',tag:'pl_casaco'},
 {t:'— Quatro dias. Com tanta coisa sem nome no meio, parecem dois.',tom:'flerte',tag:'pl_quatro'}];
NOS.pd_c6_espera.pool=[
 {t:'— Pergunta difícil. Me dá até o próximo copo.',tom:'seco',tag:'pl_copo'},
 {t:'(Desenhar com o dedo no vidro embaçado. Apagar com a manga antes que dê para ver o que era.)',tom:'abre',acao:true,tag:'pl_vidro'},
 {t:'— Você faz pergunta de quem já sabe a resposta.',tom:'flerte',tag:'pl_sabe'},
 {t:'— Está com frio? Tem um cobertor aí atrás.',tom:'cuida',tag:'pl_cobertor'}];
NOS.pd_c7_briga.pool=[
 {t:'— Fala mais baixo. Esta casa inteira é de tábua.',tom:'seco',tag:'pl_tabua'},
 {t:'(Olhar pela janela. A neblina está entrando pelo porto.)',tom:'seco',acao:true,tag:'pl_janela'},
 {t:'— Eu não quero brigar com você. Estou brigando assim mesmo.',tom:'abre',tag:'pl_brigar'},
 {t:'— A gente tem um casamento para entregar em dois dias. Isso eu ainda sei.',tom:'cuida',tag:'pl_entregar'}];
NOS.pd_c8_ensaio.pool=[
 {t:'(Repetir a frase olhando para a lona da tenda, onde a neblina encosta.)',tom:'seco',acao:true,tag:'pl_lona'},
 {t:'— Barnaby, isso é ensaio de quê, exatamente?',tom:'flerte',tag:'pl_ensaio'},
 {t:'(Repetir baixo. Só quem está a meio metro escuta.)',tom:'abre',acao:true,tag:'pl_baixo'},
 {t:'— Pippa, não filma.',tom:'seco',tag:'pl_filma'}];
