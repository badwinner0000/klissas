// Teste contra Postgres REAL: jogo completo com os dois jogadores agindo ao mesmo tempo (CAS),
// reinício do servidor no meio da partida (estado vem do banco) e checagem do que ficou gravado.
const { spawn } = require('node:child_process');
const { Client } = require('pg');
const PORT = process.env.E2E_PORT || '3105', BASE = 'http://localhost:' + PORT;
const DB = process.env.DATABASE_URL;
if (!DB) { console.log('defina DATABASE_URL (Postgres com a migração 0002 aplicada)'); process.exit(2); }
const falhas = []; const checa = (ok, msg) => { if (!ok) { falhas.push(msg); console.log('  ✗', msg); } };
let srv;
const subir = async () => {
  srv = spawn('npx', ['next', 'start', '-p', PORT], { cwd: __dirname + '/../..', env: { ...process.env, DATABASE_URL: DB, DATABASE_SSL: 'disable' }, stdio: 'pipe', detached: true });
  for (let i = 0; i < 60; i++) { try { if ((await fetch(BASE + '/api/livros')).ok) return; } catch {} await new Promise((r) => setTimeout(r, 500)); }
  throw new Error('servidor não subiu');
};
const derrubar = () => { try { process.kill(-srv.pid, 'SIGKILL'); } catch {} };
const j = async (p, o = {}) => { const r = await fetch(BASE + p, { method: o.body ? 'POST' : 'GET', headers: { 'content-type': 'application/json', ...(o.t ? { 'x-token': o.t } : {}) }, body: o.body ? JSON.stringify(o.body) : undefined }); return { s: r.status, b: await r.json().catch(() => ({})) }; };
const decide = (v, s, voto) => {
  if (!v || !v.opcoes.length) return null;
  let op;
  if (v.opcoes.length === 1 && v.opcoes[0].id === 'continuar') op = v.opcoes[0];
  else if (v.tipo === 'consentimento') op = v.opcoes.find((o) => o.id === 'avancar');
  else if (v.tipo === 'decisao') { const k = s + v.texto.slice(0, 30); if (voto[k] && !(s === 'A' && v.votoDoOutro)) return null; op = v.votoDoOutro ? v.opcoes.find((o) => o.id === v.votoDoOutro.id) || v.opcoes[0] : v.opcoes[0]; }
  else op = v.opcoes[Math.floor(Math.random() * v.opcoes.length)];
  const a = op.id === 'continuar' ? { tipo: 'continuar' } : v.tipo === 'consentimento' ? { tipo: 'voto', id: op.id } : { tipo: 'opcao', id: op.id };
  if (v.tipo === 'decisao') a.__chave = s + v.texto.slice(0, 30); // só vira "votou" depois do 200
  return a;
};
(async () => {
  const db = new Client({ connectionString: DB }); await db.connect();
  await db.query('delete from salas'); await db.query('delete from relatos');
  await subir();
  try {
    const c = await j('/api/salas', { body: { slug: 'padrinhos', modo: 'dupla', nome: 'Ivy', genero: 'ela', seat: 'A' } });
    checa(c.s === 200, 'criar sala (200)');
    const cod = c.b.codigo, T = { A: c.b.token };
    const e = await j(`/api/salas/${cod}/entrar`, { body: { nome: 'Sam', genero: 'ele' } }); T.B = e.b.token;
    checa((await j(`/api/salas/${cod}/entrar`, { body: { nome: 'Outro', genero: 'ele' } })).s === 409, 'terceiro jogador é recusado (409)');
    checa((await j(`/api/salas/${cod}/comecar`, { body: {}, t: T.B })).s === 403, 'só o criador começa (403)');
    checa((await j(`/api/salas/${cod}/comecar`, { body: {}, t: T.A })).s === 200, 'começar (200)');
    // no banco: livro versionado + sala; tokens só no doc
    const row = (await db.query('select codigo, status, livro_hash, doc from salas where codigo=$1', [cod])).rows[0];
    checa(row && row.status === 'jogando', 'sala gravada no banco com status jogando');
    checa((await db.query('select count(*)::int n from livros_versoes where hash=$1', [row.livro_hash])).rows[0].n === 1, 'versão do livro gravada em livros_versoes (sala travada nela)');
    checa(!JSON.stringify(row.doc).includes('"nos"'), 'o livro inteiro NÃO é duplicado dentro da sala');

    let n = 0, c409 = 0, reiniciou = false, parado = 0; const voto = { A: {}, B: {} };
    while (n < 3000) {
      const [ra, rb] = await Promise.all([j(`/api/salas/${cod}`, { t: T.A }), j(`/api/salas/${cod}`, { t: T.B })]);
      if (ra.b.status === 'fim' && rb.b.status === 'fim') break;
      // os dois agem AO MESMO TEMPO, sem esperar um ao outro
      const jogadas = [['A', ra.b], ['B', rb.b]].map(([s, r]) => [s, r.rev, decide(r.visao, s, voto[s])]).filter((x) => x[2]);
      const res = await Promise.all(jogadas.map(([s, rev, a]) => { const { __chave, ...corpo } = a; return j(`/api/salas/${cod}/acao`, { t: T[s], body: { ...corpo, rev } }); }));
      res.forEach((r, i) => { const ch = jogadas[i][2].__chave; if (r.s === 200) { n++; if (ch) voto[jogadas[i][0]][ch] = 1; } else if (r.s === 409) c409++; else checa(false, `ação devolveu ${r.s}: ${r.b.erro}`); });
      if (!jogadas.length) { if (++parado > 8) { checa(false, 'jogo parado sem opções'); break; } } else parado = 0;
      if (!reiniciou && n > 120) { reiniciou = true; derrubar(); await new Promise((r) => setTimeout(r, 500)); await subir(); console.log('  (servidor reiniciado na ação', n + ')'); }
    }
    const fa = (await j(`/api/salas/${cod}`, { t: T.A })).b, fb = (await j(`/api/salas/${cod}`, { t: T.B })).b;
    checa(fa.status === 'fim' && fb.status === 'fim', `partida terminou nos dois lados após ${n} ações (${c409} conflitos 409 tratados)`);
    checa(reiniciou, 'houve reinício do servidor no meio e o jogo continuou do banco');
    const rev = (await db.query('select rev from salas where codigo=$1', [cod])).rows[0].rev;
    checa(rev >= n, `rev no banco (${rev}) acompanha as ações aplicadas (${n}): nenhuma gravação perdida`);
    const md = await (await fetch(`${BASE}/api/salas/${cod}/exportar?token=${T.A}`)).text();
    checa(md.startsWith('# Padrinho e Madrinha') && !/undefined|\{\{|pd_c\d/.test(md), 'exportação limpa a partir do banco');
    const x = await j(`/api/salas/${cod}/relato`, { t: T.A, body: { texto: 'teste de relato' } });
    checa(x.s === 200 && (await db.query('select count(*)::int n from relatos')).rows[0].n === 1, 'relato gravado no banco');
    checa(!JSON.stringify(fb.visao).includes('noite3') && !('estado' in fb), 'B não recebe flags nem estado');
    // solo no banco
    const so = await j('/api/salas', { body: { slug: 'padrinhos', modo: 'solo', nome: 'Sam', genero: 'ele', seat: 'B' } });
    checa((await j(`/api/salas/${so.b.codigo}/comecar`, { body: {}, t: so.b.token })).s === 200, 'modo solo começa no banco');
  } catch (err) { falhas.push('exceção: ' + (err.stack || err)); console.log(err); }
  finally { derrubar(); await db.end(); }
  console.log(falhas.length ? `FALHOU (${falhas.length})` : 'OK: Postgres real');
  process.exit(falhas.length ? 1 : 0);
})();
