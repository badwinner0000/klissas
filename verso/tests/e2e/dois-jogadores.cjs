// E2E: dois navegadores independentes (dois "aparelhos") jogam o livro até o fim.
// Cobre: criar sala, entrar por código, começar, jogar, queda e reconexão no meio, e vazamento entre jogadores.
const { chromium } = require('playwright');
const { spawn } = require('node:child_process');
const { mkdtempSync } = require('node:fs');
const { tmpdir } = require('node:os');
const { join } = require('node:path');

const PORTA = process.env.E2E_PORT || '3101';
const BASE = `http://localhost:${PORTA}`;
const POLITICA = process.env.E2E_POLITICA || 'ambos'; // ambos | nenhum | soA | soB
const SEMENTE = Number(process.env.E2E_SEMENTE || 1);
let s = SEMENTE >>> 0;
const rnd = () => ((s = (s + 0x6d2b79f5) >>> 0), (((s ^ (s >>> 15)) * (1 | s)) >>> 0) / 4294967296);

const falhas = [];
const checa = (ok, msg) => { if (!ok) { falhas.push(msg); console.log('  ✗', msg); } };

// encerra o grupo inteiro (npx + next-server); matar só o npx deixava o servidor vivo na porta
const matar = (p) => { try { process.kill(-p.pid, 'SIGKILL'); } catch { try { p.kill('SIGKILL'); } catch {} } };

async function subirServidor() {
  try { await fetch(`${BASE}/api/livros`); throw new Error(`a porta ${PORTA} já está em uso: encerre o servidor antigo antes de rodar o E2E`); } catch (e) { if (/já está em uso/.test(String(e))) throw e; }
  const dir = mkdtempSync(join(tmpdir(), 'verso-e2e-'));
  const p = spawn('npx', ['next', 'start', '-p', PORTA], { env: { ...process.env, VERSO_DATA_DIR: dir, ...(process.env.DATABASE_URL ? { DATABASE_SSL: 'disable' } : {}) }, stdio: 'pipe', detached: true });
  p.stderr.on('data', (d) => { if (/error/i.test(String(d))) console.log('[servidor]', String(d).trim()); });
  for (let i = 0; i < 60; i++) {
    try { const r = await fetch(`${BASE}/api/livros`); if (r.ok) return p; } catch {}
    await new Promise((r) => setTimeout(r, 500));
  }
  matar(p); throw new Error('servidor não subiu');
}

async function passo(page, seat, tag, votou) {
  // devolve true se agiu
  const grupo = page.locator('[aria-label="Suas escolhas"]');
  if ((await grupo.count()) === 0) return false;
  const tipo = await grupo.getAttribute('data-tipo');
  const btns = grupo.locator('button:not([disabled])');
  const n = await btns.count();
  if (!n) return false;
  const ids = await btns.evaluateAll((els) => els.map((e) => e.getAttribute('data-opcao')));
  const chave = tag + '|' + (await page.locator('.cena').first().innerText().catch(() => '')).slice(0, 60);
  let alvo;
  if (ids.length === 1 && ids[0] === 'continuar') alvo = 0; // decisão já resolvida: só falta continuar
  else if (tipo === 'consentimento') {
    const quer = POLITICA === 'ambos' || (POLITICA === 'soA' && seat === 'A') || (POLITICA === 'soB' && seat === 'B');
    alvo = ids.indexOf(quer ? 'avancar' : 'ficar');
  } else if (tipo === 'decisao') {
    const outro = await page.locator('text=O outro jogador escolheu').count();
    if (votou.has(chave)) {
      if (!(seat === 'A' && outro)) return false; // B espera; A acompanha o voto do outro
    }
    if (outro) {
      const t = await page.locator('p:has-text("O outro jogador escolheu")').first().innerText();
      const m = t.match(/“(.*)”/s);
      const textos = await btns.evaluateAll((els) => els.map((e) => e.textContent));
      const i = textos.findIndex((x) => m && x && x.includes(m[1]));
      alvo = i >= 0 ? i : Math.floor(rnd() * n);
    } else alvo = Math.floor(rnd() * n);
  } else alvo = Math.floor(rnd() * n);
  if (alvo < 0) alvo = 0;
  // só conta como "votou" se o servidor confirmou (200); antes eu marcava no clique e travava quando o clique falhava
  const [resp] = await Promise.all([
    page.waitForResponse((r) => r.url().includes('/acao') && r.request().method() === 'POST', { timeout: 6000 }).catch(() => null),
    btns.nth(alvo).click({ timeout: 5000 }).catch(() => {}),
  ]);
  if (tipo === 'decisao' && resp && resp.status() === 200) votou.add(chave);
  return true;
}

(async () => {
  const srv = await subirServidor();
  const browser = await chromium.launch();
  const t0 = Date.now();
  try {
    const ctxA = await browser.newContext({ viewport: { width: 375, height: 800 } });
    const ctxB = await browser.newContext({ viewport: { width: 375, height: 800 } });
    const A = await ctxA.newPage();
    let B = await ctxB.newPage();
    const errosJs = [];
    for (const p of [A, B]) p.on('pageerror', (e) => errosJs.push(String(e)));
    const respostasB = [];
    const ouvirB = (p) => p.on('response', async (r) => { if (r.url().includes('/api/salas/')) respostasB.push(await r.text().catch(() => '')); });
    ouvirB(B);

    // A cria a sala
    await A.goto(`${BASE}/livro/${process.env.E2E_LIVRO || "padrinhos"}`);
    await A.getByRole('button', { name: /Jogar a dois/ }).waitFor();
    await A.getByRole('button', { name: /Jogar a dois/ }).click();
    await A.waitForURL(/\/sala\/[A-Z]{5}/);
    const codigo = A.url().match(/\/sala\/([A-Z]{5})/)[1];
    console.log('sala', codigo);
    const tokenA = await A.evaluate((c) => JSON.parse(localStorage.getItem('verso:sessao:' + c)).token, codigo);

    // B entra pelo código
    await B.goto(`${BASE}/entrar`);
    await B.locator('#cod').fill(codigo);
    await B.locator('#nj').fill('Sam');
    await B.locator('#gj').selectOption('ele');
    await B.getByRole('button', { name: 'Entrar' }).click();
    await B.waitForURL(new RegExp('/sala/' + codigo));
    await A.getByText('Sam').first().waitFor();
    await A.getByRole('button', { name: 'Começar' }).click();
    await A.locator('.cena').first().waitFor();
    await B.locator('.cena').first().waitFor();

    // joga até o fim; no meio, B "cai" (fecha a aba) e volta
    const votouA = new Set(), votouB = new Set();
    let passos = 0, caiu = false, ciclosSemAgir = 0;
    const fimDe = async (p) => (await p.getByRole('heading', { name: 'Fim' }).count()) > 0;
    while (!(await fimDe(A) && await fimDe(B)) && passos < 1500) {
      let agiu = false;
      for (const [p, seat, v] of [[A, 'A', votouA], [B, 'B', votouB]]) {
        if (await passo(p, seat, seat, v)) { agiu = true; passos++; }
      }
      if (!caiu && passos > 60) {
        caiu = true;
        await B.close();
        B = await ctxB.newPage(); // mesma "pessoa", aba nova: a sessão vem do armazenamento local
        for (const p of [B]) p.on('pageerror', (e) => errosJs.push(String(e)));
        ouvirB(B);
        await B.goto(`${BASE}/sala/${codigo}`);
        await B.locator('.cena').first().waitFor({ timeout: 10000 });
        console.log('  (B caiu e voltou no passo', passos + ')');
      }
      if (!agiu) { ciclosSemAgir++; await new Promise((r) => setTimeout(r, 400)); if (ciclosSemAgir > 120) {
          for (const [nome, p] of [['A', A], ['B', B]]) {
            const corpo = (await p.locator('body').innerText()).replace(/\n+/g, ' ⏎ ');
            const ops = await p.locator('[aria-label="Suas escolhas"] button').evaluateAll((els) => els.map((e) => `${e.getAttribute('data-opcao')}${e.disabled ? '(desab)' : ''}`)).catch(() => []);
            console.log(`  TRAVADO ${nome}: tipo=${await p.locator('[aria-label="Suas escolhas"]').getAttribute('data-tipo').catch(() => '-')} opcoes=${JSON.stringify(ops)} fim=${corpo.slice(-260)}`);
          }
          break;
        } } else ciclosSemAgir = 0;
      await new Promise((r) => setTimeout(r, 60));
    }
    checa(await fimDe(A) && await fimDe(B), `os dois chegaram ao fim (passos=${passos})`);

    // texto limpo
    for (const [nome, p] of [['A', A], ['B', B]]) {
      const t = await p.locator('body').innerText();
      const m = t.match(/undefined|\[object|\$\{|\{\{|⟦ERRO|NaN/);
      checa(!m, `texto limpo na tela de ${nome}` + (m ? ` (achei "${m[0]}" em …${t.slice(Math.max(0, m.index - 40), m.index + 40).replace(/\n/g, ' ')}…)` : ''));
    }
    checa(errosJs.length === 0, `sem erros de JavaScript no navegador (${errosJs.slice(0, 2).join(' | ')})`);

    // vazamento: nada do outro jogador nas respostas que B recebeu
    const todoB = respostasB.join('\n');
    checa(!todoB.includes(tokenA), 'B nunca recebeu o token de A');
    // frase que existe SÓ na cena solo de A (verificada como única no livro); 'mala de rodinha' sozinha reaparece em cenas compartilhadas
    checa(!todoB.includes('uma bolsa de lona com três carregadores'), 'B nunca recebeu a cena solo de A');
    checa(!/"flags"|"segredos"|noite3_a|noite3_b|"estado"/.test(todoB), 'B nunca recebeu flags, segredos nem o estado interno');
    checa(!/"no":"pd_/.test(todoB), 'B nunca recebeu ids internos de cena');

    // diário e exportação (nomes reais, sem ids)
    const md = await (await fetch(`${BASE}/api/salas/${codigo}/exportar?token=${tokenA}`)).text();
    const mm = md.match(/pd_c\d|pp_c\d|undefined|\{\{/);
    const PP = process.env.E2E_LIVRO === 'pisca-pisca';
    checa(md.includes(PP ? '# Pisca-Pisca' : '# Padrinho e Madrinha') && md.includes(PP ? 'Roz' : 'Ivy') && !mm, 'exportação em Markdown com nomes reais e sem ids internos' + (mm ? ` (achei "${mm[0]}")` : ''));
    // quem não é da sala não lê nada
    const r403 = await fetch(`${BASE}/api/salas/${codigo}`, { headers: { 'x-token': 'invalido' } });
    checa(r403.status === 403, 'token inválido recebe 403');
    const r404 = await fetch(`${BASE}/api/salas/ZZZZZ`, { headers: { 'x-token': tokenA } });
    checa(r404.status === 404, 'sala inexistente recebe 404 com mensagem humana');
  } catch (e) {
    falhas.push('exceção: ' + (e.stack || e));
    console.log(e);
  } finally {
    await browser.close(); matar(srv);
  }
  console.log(falhas.length ? `FALHOU (${falhas.length})` : `OK em ${((Date.now() - t0) / 1000).toFixed(0)}s (política ${POLITICA})`);
  process.exit(falhas.length ? 1 : 0);
})();
