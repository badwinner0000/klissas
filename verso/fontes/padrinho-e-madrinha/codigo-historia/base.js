/* ================= LOVE STORY Nº 5 · PADRINHO E MADRINHA (THE BEST MAN & THE MAID OF HONOR) =================
   Nantucket, junho de 2023. A = a cerimonialista de Boston, irmã da noiva. B = o professor de química, irmão do noivo. */
NO_HIST='padrinhos';
const PD_A='pd_a', PD_B='pd_b';
LACOS.padrinhos={v:0,fa:0,n:'Um encontro às cegas que deu errado',d:'Vocês se viram uma vez, dois anos atrás, num jantar arranjado pelos irmãos. Cada um conta essa noite de um jeito.'};
const JOG_PD=[
 {id:PD_A,fixo:true,nome:'Ivy Castellano',ap:'Ivy',g:'f',idade:33,arq:'A cerimonialista de Boston',origem:'Boston, Massachusetts',
  at:{labia:2,cabeca:1,agilidade:1,coragem:0,forca:-1},truque:{at:'labia',n:'Pequeno ajuste'},
  hist:'Dona da Castellano Eventos, em Boston: duzentos casamentos em oito anos, nenhum desastre que um convidado tenha percebido. Até setembro do ano passado, quando o próprio casamento dela foi cancelado três semanas antes, e a cidade inteira achou que o noivo tinha ido embora. Desde então, os clientes somem. Noiva supersticiosa não contrata cerimonialista largada. A noiva é a caçula da família.',
  pers:'Rápida, sorridente, fala em prazos e eufemismos. Resolve tudo antes de alguém perceber que havia um problema. Mente para acalmar os outros, por hábito profissional.',
  medoFala:'Que alguém descubra que eu não sei ser amada sem estar sendo útil. Se eu paro de resolver, eu não sei o que eu sou.',
  bobagem:'Eu tenho um alfinete de segurança em cada bolso de cada roupa que eu tenho. Inclusive no pijama. Inclusive no maiô.',
  segredoFala:'Fui eu que cancelei o meu casamento. O Graham não me largou. Eu deixei todo mundo achar que sim, porque era mais fácil ser a abandonada do que ser a que desistiu.',
  medo:'Não ser amada sem estar útil.',segredo:'Foi ela quem cancelou o próprio casamento; deixou todo mundo achar que foi abandonada.',
  ancora:'conta os alfinetes da almofadinha que usa no pulso, de dez em dez, até a respiração acompanhar a contagem',
  itens:['A pasta: planos A, B, C e uma página D grampeada','Almofadinha de alfinetes no pulso','Três carregadores de celular']},
 {id:PD_B,fixo:true,nome:'Sam Okoro',ap:'Sam',g:'m',idade:35,arq:'O professor de química',origem:'Providence, Rhode Island',
  at:{cabeca:2,coragem:1,forca:1,agilidade:0,labia:-1},truque:{at:'cabeca',n:'Método científico'},
  hist:'Professor de química de ensino médio numa escola pública de Providence há onze anos. Os alunos chamam de Mol, como a unidade. O noivo é o caçula dos Okoro. Criação da mãe, uma juíza, depois que o pai foi embora. Não sabe mentir, nem quando deveria, e julga quem sabe.',
  pers:'Lento, preciso, humor seco de laboratório. Fala pouco e só depois de pensar. Desconfia de tudo que parece fácil demais.',
  medoFala:'Ser deixado do jeito que o meu pai deixou a minha mãe. De manhã, sem aviso, com a mesa do café posta.',
  bobagem:'Eu sei a tabela periódica de cor, de trás para frente. Isso nunca impressionou ninguém. Nem a tabela.',
  segredoFala:'O meu irmão me ligou antes do retiro e disse que não sabe se quer casar. Pediu segredo. Eu não sei guardar segredo. E estou guardando.',
  medo:'Ser deixado sem aviso, como o pai deixou a mãe.',segredo:'O noivo confessou dúvidas a ele antes do retiro e pediu segredo.',
  ancora:'recita os gases nobres em ordem, hélio, neônio, argônio, criptônio, xenônio, radônio, e depois de trás para frente, até o peito descer',
  itens:['Caderno quadriculado de capa preta','Discurso de padrinho, versão catorze','Caneta de quatro cores']}
];
const ehPA=c=>c.eu.id===PD_A, ehPB=c=>c.eu.id===PD_B;
const pda=c=>lsN(c,PD_A), Pda=c=>lsNM(c,PD_A), pdb=c=>lsN(c,PD_B), Pdb=c=>lsNM(c,PD_B);
const pdFA=c=>lsF(c,PD_A), pdFB=c=>lsF(c,PD_B);
const pdPor=(c,na,nb)=>lsPor(c,PD_A,PD_B,na,nb);
const pdgA=(c,m,f)=>lsG(c,PD_A,m,f), pdgB=(c,m,f)=>lsG(c,PD_B,m,f);
const pdnA=c=>pdFA(c).nome||pdFA(c).ap, pdnB=c=>pdFB(c).nome||pdFB(c).ap;
/* título no casamento, no gênero escolhido: madrinha ou padrinho */
const pdTitA=c=>pdgA(c,'padrinho','madrinha'), pdTitB=c=>pdgB(c,'padrinho','madrinha');
/* irmão/irmã */
const pdIrA=c=>pdgA(c,'irmão','irmã'), pdIrB=c=>pdgB(c,'irmão','irmã');
/* atalhos de gênero para o texto: o/a, ele/ela, do personagem A (lado da noiva) e B (lado do noivo) */
const oA=c=>pdgA(c,'o','a'), oB=c=>pdgB(c,'o','a'), eleA=c=>pdgA(c,'ele','ela'), eleB=c=>pdgB(c,'ele','ela'), EleA=c=>pdgA(c,'Ele','Ela'), EleB=c=>pdgB(c,'Ele','Ela');
const TitA=c=>pdTitA(c).replace(/^./,x=>x.toUpperCase()), TitB=c=>pdTitB(c).replace(/^./,x=>x.toUpperCase());

const HIST_PD={
 id:'padrinhos',ordem:14,linha:'lovestory',tag:'Love Story · Nº 5',
 titulo:'The Best Man & the Maid of Honor',tituloPt:'Padrinho e Madrinha',serie:'Love Story · Nº 5',
 gancho:'A cerimonialista fugiu com o dono do bufê. Os noivos estão num retiro de silêncio. Sobraram a madrinha, o padrinho, uma pasta e um encontro às cegas que cada um conta de um jeito.',
 resumo:'Nantucket, junho de 2023. Faltam sete dias para o casamento dos irmãos mais novos e a cerimonialista fugiu. Os únicos com a pasta do evento são a irmã da noiva, cerimonialista de Boston com o negócio afundando, e o irmão do noivo, professor de química de Providence, que guarda um segredo do noivo. Dois anos atrás, os dois tiveram um encontro às cegas arranjado pelos irmãos. Foi um desastre. Os irmãos se conheceram naquela mesma noite, na mesa ao lado, enquanto os dois brigavam. Cada um conta aquela noite de um jeito diferente, e as duas versões deixam de fora a mesma coisa.',
 genero:['Comédia romântica','Inimigos que se gostam','Casamento'],
 idade:'Dois adultos de 33 e 35 anos',
 jogadores:'2 jogadores, cada um no seu aparelho · um é a cerimonialista, o outro o professor de química · nome e gênero livres',
 duracao:'10 capítulos · cerca de 10 horas',
 classif:'16 anos · romance, beijo, sexo só sugerido (a cena corta para a manhã seguinte), bebida',
 aviso:'Ritmo rápido: a primeira noite pode acontecer no capítulo 3. O difícil é o que vem depois.',
 caps:{},pers:()=>JOG_PD,lacos:['padrinhos'],idades:[33,34,35],generoLivre:true,semImg:true,abaloTab:LS_NERVOS,abaloNome:'Nervosismo',vincCap:1,atLabels:LS_AT,
 quemSao:'Um jogador é a cerimonialista de Boston, irmã da noiva. O outro é o professor de química, irmão do noivo. Vocês escolhem nome e gênero.',
 corHero:'oklch(0.55 0.08 230)',heroTxt:'Nantucket',
 npcIni:['barnaby','pippa','rosa','funmi'],
 npcs:{
  barnaby:{n:'Barnaby Cole',chaves:['Barnaby'],idade:68,papel:'Dono da pousada e florista da ilha',fac:'Gull House',
   desc:'Barba branca, avental de lona, mãos de terra. Mal-humorado com todo mundo, gentil com flores. É o único que entende os dois antes deles mesmos.'},
  pippa:{n:'Pippa Lund',chaves:['Pippa'],idade:22,papel:'Estagiária da Castellano Eventos',fac:'Castellano Eventos',
   desc:'Recém-formada, entusiasmo infinito, três agendas de papel. Aposta com o Barnaby em que dia os dois vão se beijar, e mantém o placar na parede da cozinha.'},
  rosa:{n:'Rosa Castellano',chaves:['Rosa'],idade:61,papel:'Mãe da noiva',fac:'Família Castellano',
   desc:'Dramática, perfumada, de North End. Chora em toda prova de bolo e muda a lista de convidados de madrugada, por mensagem de voz.'},
  funmi:{n:'Funmi Okoro',chaves:['Funmi'],idade:64,papel:'Mãe do noivo, juíza aposentada',fac:'Família Okoro',
   desc:'Alta, de óculos de leitura na ponta do nariz. Fala pouco e decide tudo. Criou dois filhos sozinha. Não vai a um casamento desde 1989.'},
  gemma:{n:'Gemma Castellano',chaves:['Gemma'],idade:29,papel:'A noiva',fac:'Família Castellano',
   desc:'A irmã mais nova. Riso alto, pés descalços, fé absoluta de que tudo vai dar certo porque sempre deu. Está num retiro de silêncio em Vermont.'},
  tunde:{n:'Tunde Okoro',chaves:['Tunde'],idade:31,papel:'O noivo',fac:'Família Okoro',
   desc:'O irmão mais novo. Engenheiro de som, gentil, indeciso com cardápio e com quase tudo. Está no mesmo retiro, no mesmo silêncio.'},
  dory:{n:'Dory Barros',chaves:['Dory'],idade:57,papel:'Dona do Barros Lobster, em Madaket',fac:'Nantucket',
   desc:'Cabo-verdiana de terceira geração, voz de capitão de barco, braços de quem levanta armadilha de lagosta desde os doze. Nunca fez um casamento na vida.'},
  starbuck:{n:'Eleanor Starbuck',chaves:['Mrs. Starbuck','Starbuck'],idade:81,papel:'Professora de dança da ilha',fac:'Nantucket',
   desc:'Um metro e cinquenta, sapatilha de cetim, colar de pérola. Usa a bengala para apontar, nunca para andar. Dançou com o Fred Astaire em 1958 e avalia todo mundo por esse padrão.'},
  ashby:{n:'Mr. Ashby',chaves:['Mr. Ashby','Ashby'],idade:59,papel:'Gerente do Nantucket Yacht Club',fac:'Nantucket Yacht Club',
   desc:'Blazer azul com âncora no bolso, regulamento de 1952 decorado. Fala de casamento como quem fala de regata que pode virar.'},
  concetta:{n:'Tia Concetta',chaves:['tia Concetta','Concetta'],idade:74,papel:'Tia-avó da noiva, madrinha de batismo',fac:'Família Castellano',
   desc:'De preto desde 1998. Não fala inglês desde 1974, por opção. Entende tudo. Viaja com uma bolsa térmica de berinjela à parmegiana.'},
  bisi:{n:'Tia Bisi',chaves:['tia Bisi','Bisi'],idade:70,papel:'Irmã mais velha da juíza',fac:'Família Okoro',
   desc:'Turbante amarelo, vestido de renda, passo de rainha. Segurou o sobrinho no colo na primeira fila da igreja, em junho de 1989. Não suporta gente que fala alto durante a comida.'},
  graham:{n:'Graham Whitfield',chaves:['Graham'],idade:36,papel:'O ex-noivo',fac:'Boston',
   desc:'Arquiteto, simpático, de suéter no ombro. Colega de trabalho da noiva. Está na lista de convidados. Todo mundo acha que foi ele quem foi embora.'}
 },
 capa:()=>lsCapa({id:'padrinhos',n:5,c1:'oklch(0.42 0.05 235)',c2:'oklch(0.86 0.09 20)',c3:'#fdf8f3',tit:'Padrinho<br>e Madrinha',sub:'The Best Man & the Maid of Honor',data:'Nantucket · junho de 2023',
  svg:`<svg viewBox="0 0 200 200" fill="none" stroke="currentColor" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"><circle cx="78" cy="112" r="38"/><circle cx="122" cy="112" r="38"/><path d="M104 62 L122 40 L140 62"/><path d="M60 162 Q100 190 140 162" stroke-dasharray="6 10"/></svg>`})
};
HISTORIAS.padrinhos=HIST_PD;
const CAPS_PD=HIST_PD.caps;
[['Um','Duas versões','Sábado, 10 de junho de 2023'],['Dois','A pasta','Domingo, 11 de junho'],['Três','Lagosta e vinho','Segunda, 12 de junho'],
 ['Quatro','As regras','Terça, 13 de junho'],['Cinco','A dança','Quarta, 14 de junho'],['Seis','O estacionamento','Quarta, 14 de junho · noite'],
 ['Sete','O que cada um sabia','Quinta, 15 de junho'],['Oito','Os noivos chegam','Quinta e sexta, 15 e 16 de junho'],['Nove','O dia','Sábado, 17 de junho'],
 ['Dez','Depois da festa','Domingo, 18 de junho de 2023']].forEach((x,i)=>{ CAPS_PD[i+1]={n:x[0],titulo:x[1],data:x[2]} });
INICIO.padrinhos=E=>{ const sa=(E.f.a&&E.f.a.id===PD_A)?'a':'b'; return {[sa]:'pd_c1_a',[outro(sa)]:'pd_c1_b'} };

Object.assign(PISTAS,{
 pd_versao_a:{cap:1,n:'A versão do lado da noiva',x:'Junho de 2021, restaurante Alba, Back Bay. Dezenove minutos de atraso. A pronúncia do vinho corrigida. Uma aula não solicitada sobre a química da redução do molho. A conta dividida por item. Saída antes da sobremesa. Fim.'},
 pd_versao_b:{cap:1,n:'A versão do lado do noivo',x:'Junho de 2021, restaurante Alba, Back Bay. Onze ligações atendidas durante o jantar, contadas. A mesa trocada duas vezes sem consultar ninguém. O garçom chamado de "querido". Um olhar no relógio no meio da única frase sobre o trabalho do outro. Saída antes da sobremesa. Fim.'},
 pd_ajuste:{cap:2,n:'Pequeno ajuste',x:'No vocabulário da cerimonialista, "temos um pequeno ajuste" quer dizer "desastre". "Um ajuste de cronograma" quer dizer "alguém sumiu". "Vamos redimensionar" quer dizer "pegou fogo".'},
 pd_planod:{cap:2,n:'O plano D',x:'A última página da pasta, grampeada por cima, com "D" escrito à mão. Ninguém pode ler. Quando alguém chega perto, a cerimonialista fecha a pasta sem olhar.'},
 pd_1989:{cap:2,n:'Junho de 1989',x:'A juíza Funmi Okoro não vai a um casamento desde junho de 1989. Ela recusou convite de colega, de sobrinha, de afilhada. Vai a este porque é do filho. Disse isso ao telefone, sem emoção nenhuma: "Eu vou porque é dele."'},
 pd_regra:{cap:3,n:'A regra',x:'Escrita de manhã, num guardanapo da pousada, com caneta de quatro cores: "1. Isso fica em Nantucket. 2. Ninguém conta para os irmãos. 3. Não acontece de novo." Assinada pelos dois. O item 3 está em vermelho.'},
 pd_placar:{cap:4,n:'O placar da cozinha',x:'Na parede da cozinha da pousada, uma lousa: PIPPA × BARNABY. Pippa aposta na terça. Barnaby aposta "depois que eles pararem de fingir". Valor: um jantar no Club Car.'},
 pd_valsa:{cap:5,n:'A valsa',x:'A valsa dos padrinhos: "Moon River", três minutos e meio, entrada depois dos noivos. A cerimonialista conduz no ensaio porque o professor conta os passos em voz alta como quem titula uma solução.'},
 pd_beijo:{cap:6,n:'O que as duas versões deixaram de fora',x:'Junho de 2021, estacionamento do Alba, chuva. Uma saída antes da sobremesa. Atrás, alguém com o guarda-chuva esquecido na mesa. Mais briga, debaixo da chuva. E então, sem que nenhum dos dois saiba até hoje quem começou, um beijo. Comprido. Depois, dois táxis diferentes, e ninguém contou para ninguém.'},
 pd_guardanapo:{cap:7,n:'O guardanapo',x:'Na carteira do professor, dobrado em quatro, um guardanapo de pano do Alba, de junho de 2021, com letra de cerimonialista: "Padrinho: cooperação zero." Ele guardou dois anos.'},
 pd_funmi:{cap:9,n:'O que a juíza nunca contou',x:'Junho de 1989. Na manhã do próprio casamento, o noivo de Funmi disse a ela que tinha dúvidas. Ela disse: então vai. Ele foi. Ela deixou os filhos acreditarem por trinta e quatro anos que tinha sido abandonada no altar.'}
});
