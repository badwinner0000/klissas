// Ajuste editorial do Padrinho e Madrinha: o padrinho (B, "Sam") deixa de ser professor de ensino médio e passa a ser
// professor titular de química numa universidade de prestígio (a mãe dele é juíza; a família é de status).
// Cada regra precisa se aplicar pelo menos uma vez; roda sobre content/livros/padrinhos.json (idempotente: regra já aplicada não casa e é ignorada).
import { readFileSync, writeFileSync } from 'node:fs';
const CAMINHO = new URL('../../content/livros/padrinhos.json', import.meta.url);
const livro = JSON.parse(readFileSync(CAMINHO, 'utf8'));

const R = [
  ['O professor de química', 'O professor titular de química'],
  ['Professor. Muito inteligente. Você vai gostar', 'Professor titular na Brown. Muito inteligente. Você vai gostar'],
  ['para o professor de física que divide a sala com você', 'para o professor de física que divide o corredor do departamento com você'],
  ['— Como vai a indústria do ensino médio?', '— Como vai a indústria das bolsas de pesquisa?'],
  ['— Rentável. Doze mil por ano em giz de cera. Os alunos comem.', '— Rentável. Doze mil por ano em vidraria quebrada. Os orientandos derrubam.'],
  ['Sobre a escola de Providence e os alunos que comem giz.', 'Sobre o departamento de Providence e os orientandos que derrubam vidraria.'],
  ['o grupo dos alunos descobriu que você lê as mensagens', 'o grupo do laboratório descobriu que você lê as mensagens'],
  ['Os alunos me chamam de Mol.', 'Os orientandos me chamam de Mol.'],
  ['— Escola pública. Ensino médio.', '— Professor. Química, na Brown.'],
  ['Você dá aula na mesma escola pública há onze anos, na sala 214, a que tem a tabela periódica com o canto queimado, e os alunos chamam você de Mol desde antes de você descobrir.', 'Você dá aula na mesma universidade há onze anos, e é titular desde os trinta e quatro, o mais novo da história do departamento. A sala 214 é a do canto queimado da tabela periódica, e os orientandos chamam você de Mol desde antes de você descobrir.'],
  ['A Deja quer estudar engenharia química em Amherst. O formulário pede uma carta de um professor.', 'A Deja quer fazer o doutorado em engenharia química em Pittsburgh. O formulário pede uma carta de recomendação de um orientador.'],
  ['Responder no grupo dos alunos', 'Responder no grupo do laboratório'],
  ['Onze anos abrindo janela emperrada de sala de aula', 'Onze anos abrindo janela emperrada de laboratório'],
  ['Onze anos de reunião de pais.', 'Onze anos de reunião de departamento.'],
  ['Escola de Ensino Médio de Nantucket', 'Estação de Pesquisa Costeira de Nantucket'],
  ['É junho, as aulas acabaram, a única janela acesa é a do zelador.', 'É junho, a temporada de campo ainda não começou, a única janela acesa é a do zelador.'],
  ['Você nunca tem motivo para entrar em escola: já trabalha em uma.', 'Você nunca tem motivo para entrar em laboratório alheio: já tem o seu.'],
  ['PROCURA-SE PROFESSOR(A) DE CIÊNCIAS. Ensino médio. Biologia, química, física. Casa da escola disponível. Contato: sra. Alderman, secretaria. (Desde fevereiro.)', 'PROCURA-SE PESQUISADOR(A) PRINCIPAL EM QUÍMICA COSTEIRA. Laboratório equipado, barco de coleta, casa da estação disponível. Contato: sra. Alderman, direção. (Desde fevereiro.)'],
  ['A casa da escola disponível.', 'A casa da estação disponível.'],
  ['junto das trezentas fotos de aluno em feira de ciências', 'junto das trezentas fotos de bancada e de congresso'],
  ['ficou onze anos na mesma sala', 'ficou onze anos na mesma universidade'],
  ['perguntar sobre a escola', 'perguntar sobre a estação'],
  ['Era um professor de química. Pediu transferência', 'Era um pesquisador de química. Pediu transferência'],
  ['*a escola começa em setembro*', '*o semestre começa em setembro*'],
  ['Que a escola é boa, que os alunos gostam, que onze anos é uma vida', 'Que o departamento é bom, que os orientandos precisam de você, que onze anos é uma vida'],
  ['tem uma escola de ensino médio aqui, sabia? A única da ilha. Está sem professor de ciências desde fevereiro.', 'tem uma estação de pesquisa aqui, sabia? A única da ilha. Está sem pesquisador de química desde fevereiro.'],
  ['A escola começa em setembro.', 'O semestre começa em setembro.'],
  ['Um lembra que tem uma escola em setembro.', 'Um lembra que tem aula em setembro.'],
  ['Na escola de Providence, no ginásio, depois do baile de formatura, quando os alunos vão embora.', 'No campus de Providence, no ginásio vazio, depois da formatura, quando os alunos vão embora.'],
];
const feito = new Map();
const aplica = (v) => {
  if (typeof v === 'string') { let s = v; for (const [de, para] of R) if (s.includes(de)) { feito.set(de, (feito.get(de) ?? 0) + s.split(de).length - 1); s = s.split(de).join(para); } return s; }
  if (Array.isArray(v)) return v.map(aplica);
  if (v && typeof v === 'object') return Object.fromEntries(Object.entries(v).map(([k, x]) => [k, aplica(x)]));
  return v;
};
const novo = aplica(livro);
novo.poolGeral = [{"tom": "seco", "tag": "pg_s1", "texto": "— Anotado. Próximo assunto."}, {"tom": "seco", "tag": "pg_s2", "texto": "— Isso é um fato, não uma opinião."}, {"tom": "seco", "tag": "pg_s3", "texto": "— Pode ser. Eu não vou discutir isso agora."}, {"tom": "seco", "tag": "pg_s4", "texto": "— Eu ouvi. Não precisa repetir."}, {"tom": "abre", "tag": "pg_a1", "texto": "— Eu não sei dizer isso direito. Mas é verdade."}, {"tom": "abre", "tag": "pg_a2", "texto": "— Estou cansad{{eu.o_a}}. Não de você. Do dia."}, {"tom": "abre", "tag": "pg_a3", "texto": "— Isso é mais difícil do que eu pensei que seria."}, {"tom": "abre", "tag": "pg_a4", "texto": "— Eu não costumo falar dessas coisas. Hoje, saiu."}, {"tom": "cuida", "tag": "pg_c1", "texto": "— Você já comeu alguma coisa? Eu posso pegar um café."}, {"tom": "cuida", "tag": "pg_c2", "texto": "— Respira. A gente resolve isso depois."}, {"tom": "cuida", "tag": "pg_c3", "texto": "— Se precisar de uma pausa, é só dizer. Eu espero."}, {"tom": "cuida", "tag": "pg_c4", "texto": "— Não precisa responder agora. Eu fico por aqui."}, {"tom": "flerte", "tag": "pg_f1", "texto": "— Você é mais difícil de ler do que parece. Eu gosto do desafio."}, {"tom": "flerte", "tag": "pg_f2", "texto": "— Se isso foi uma indireta, eu entendi."}, {"tom": "flerte", "tag": "pg_f3", "texto": "— Você fica interessante quando se irrita."}, {"tom": "flerte", "tag": "pg_f4", "texto": "— Isso foi quase um elogio. Vou fingir que não percebi."}, {"tom": "fere", "tag": "pg_r1", "texto": "— Você sempre tem uma resposta pronta. Isso cansa."}, {"tom": "fere", "tag": "pg_r2", "texto": "— Isso soou melhor na sua cabeça."}, {"tom": "fere", "tag": "pg_r3", "texto": "— Eu esperava mais de você."}, {"tom": "fere", "tag": "pg_r4", "texto": "— Não é a primeira vez que você faz isso."}]; // falas de reserva genéricas (o pool de cada cena se esgotava e repetia falas)
const sem = R.filter(([de]) => !feito.has(de)).map(([de]) => de.slice(0, 50));
writeFileSync(CAMINHO, JSON.stringify(novo, null, 2) + '\n');
console.log(`ajustes aplicados: ${feito.size}/${R.length}` + (sem.length ? `\n  já aplicados ou ausentes: ${sem.join(' | ')}` : ''));
