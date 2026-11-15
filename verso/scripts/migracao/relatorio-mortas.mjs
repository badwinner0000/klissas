// Relatório das "escolhas mortas": para cada flag sem leitor, onde nasce, o que o jogador escolheu e que cenas vêm depois.
import { readFileSync } from 'node:fs';
const L = JSON.parse(readFileSync(new URL('../../content/livros/padrinhos.json', import.meta.url), 'utf8'));
const nos = L.nos;
const dests = (d) => (typeof d === 'string' ? [d] : Array.isArray(d) ? d.flatMap((x) => dests(x.ir)) : d && typeof d === 'object' ? Object.values(d) : []);
const out = (n) => n.tipo === 'consentimento' ? [n.irAvancou, n.irSem] : n.tipo === 'final' ? [] : n.tipo === 'solo' ? [...dests(n.ir), ...n.acoes.flatMap((a) => (a.ir ? [a.ir] : []))] : dests(n.ir);
const lista = (v) => (v === undefined ? [] : Array.isArray(v) ? v : [v]);
const limpa = (s) => (s ?? '').replace(/\{\{(?:se [^}]*|senao|\/se)\}\}/g, '').replace(/\s+/g, ' ').trim();
const setters = {};
const reg = (flag, info) => (setters[flag] ??= []).push(info);
for (const [id, n] of Object.entries(nos)) {
  for (const f of lista(n.efeitos?.flag)) reg(f, { id, tipo: n.tipo, seat: n.seat, cap: n.cap, rot: '(ao entrar na cena)', res: limpa(n.texto).slice(0, 160) });
  for (const x of n.efeitosSe ?? []) for (const f of lista(x.efeitos?.flag)) reg(f, { id, tipo: n.tipo, cap: n.cap, rot: '(efeito condicional)', res: '' });
  for (const a of n.acoes ?? []) {
    const efs = [a.efeitos, ...(a.variantes ?? []).map((v) => v.efeitos)];
    for (const e of efs) for (const f of lista(e?.flag)) reg(f, { id, tipo: n.tipo, seat: n.seat ?? a.seat, cap: n.cap, rot: limpa(a.texto).slice(0, 110), res: limpa(a.resultado ?? a.variantes?.[a.variantes.length - 1]?.resultado).slice(0, 200) });
  }
  for (const t of n.turnos ?? []) for (const o of t.opcoes) for (const f of lista(o.efeitos?.flag)) reg(f, { id, tipo: n.tipo, cap: n.cap, rot: limpa(o.texto).slice(0, 110), res: `(fala, tom ${o.tom})` });
}
const ordem = Object.keys(nos);
function depois(id, seatPriv) {
  const vis = new Set([id]); const fila = [id]; const achou = [];
  while (fila.length && achou.length < 5) {
    const x = fila.shift();
    for (const d of out(nos[x])) if (!vis.has(d)) { vis.add(d); fila.push(d); const n = nos[d]; if (n.tipo !== 'final' && n.cap >= nos[id].cap && d !== id && (seatPriv ? (n.tipo === 'solo' ? n.seat === seatPriv : true) : true) && n.texto) achou.push(`${d}[c${n.cap} ${n.tipo}${n.seat ? ' ' + n.seat : ''}] ${limpa(n.texto).slice(0, 70)}`); }
  }
  return achou;
}
const mortas = L.escolhasMortasToleradas;
const linhas = [];
for (const f of mortas) {
  const ss = setters[f] ?? [];
  const priv = ss.length === 1 && ss[0].tipo === 'solo' ? ss[0].seat : null;
  for (const s of ss) linhas.push({ cap: s.cap, ordem: ordem.indexOf(s.id), txt: `## ${f}${priv ? `  [PRIVADA do assento ${priv}]` : ''}\n set em ${s.id} (${s.tipo}${s.seat ? ' ' + s.seat : ''}, cap ${s.cap}) · escolha: ${s.rot}\n resultado: ${s.res}\n depois: ${depois(s.id, priv).slice(0, 4).join('\n         ')}\n` });
}
linhas.sort((a, b) => a.cap - b.cap || a.ordem - b.ordem);
const cap = process.argv[2] ? Number(process.argv[2]) : null;
console.log(`mortas: ${mortas.length}; sem setter encontrado: ${mortas.filter((f) => !setters[f]).join(', ') || '-'}`);
for (const l of linhas) if (cap === null || l.cap === cap) console.log(l.txt);
