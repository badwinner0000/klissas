// Orquestração do jogo no servidor. O cliente NUNCA recebe estado: só a visão do próprio assento.
import { randomBytes, randomUUID } from 'node:crypto';
import type { Seat } from '../content/schema';
import { type Acao_, ErroJogo, type Jogadores, agir, iniciar, visao } from '../engine/motor';
import { carregarLivro } from './livros';
import { escolhaDaIA } from './ia';
import { type EntradaDiario, type Participante, type Sala, store } from './store';

export class ErroApi extends Error {
  constructor(
    public status: number,
    msg: string,
  ) {
    super(msg);
  }
}
const outro = (s: Seat): Seat => (s === 'A' ? 'B' : 'A');
const SEATS: Seat[] = ['A', 'B'];
const ALFABETO = 'ABCDEFGHJKLMNPQRSTUVWXYZ';

function novoCodigo(): string {
  for (let t = 0; t < 50; t++) {
    const b = randomBytes(5);
    const c = [...b].map((x) => ALFABETO[x % ALFABETO.length]).join('');
    if (!store.existe(c)) return c;
  }
  throw new ErroApi(500, 'Não consegui gerar um código de sala. Tente de novo.');
}

function limpaNome(n: unknown): string {
  const s = String(n ?? '').replace(/[\u0000-\u001f<>{}]/g, '').trim().slice(0, 24);
  if (s.length < 1) throw new ErroApi(400, 'Escolha um nome para o seu personagem.');
  return s;
}
const genero = (g: unknown): 'ele' | 'ela' => {
  if (g !== 'ele' && g !== 'ela') throw new ErroApi(400, 'Escolha o gênero do personagem (ele ou ela).');
  return g;
};
const asSeat = (s: unknown): Seat => (s === 'B' ? 'B' : 'A');

function jogadoresDe(sala: Sala): Jogadores {
  const a = sala.jogadores.A!;
  const b = sala.jogadores.B!;
  return { A: { nome: a.nome, genero: a.genero }, B: { nome: b.nome, genero: b.genero } };
}
function seatDoToken(sala: Sala, token: string | null): Seat {
  if (token) for (const s of SEATS) if (sala.jogadores[s]?.token === token && !sala.jogadores[s]?.ia) return s;
  throw new ErroApi(403, 'Você não faz parte desta sala. Entre pelo código ou pelo link de convite.');
}
function salaOuErro(codigo: string): Sala {
  const s = store.obter(codigo);
  if (!s) throw new ErroApi(404, 'Sala não encontrada. Confira o código de 5 letras.');
  return s;
}

// ───────────── criar / entrar ─────────────
export function criarSala(body: { slug: string; modo: string; nome: string; genero: string; seat?: string }) {
  let carregado;
  try {
    carregado = carregarLivro(String(body.slug));
  } catch {
    throw new ErroApi(404, 'Esse livro não está disponível.');
  }
  const { livro, hash } = carregado;
  if (!livro.personagens) throw new ErroApi(400, `"${livro.titulo}" ainda não está pronto para jogar.`);
  const modo = body.modo === 'solo' ? 'solo' : 'dupla';
  const seat = asSeat(body.seat);
  const eu: Participante = { token: randomUUID(), nome: limpaNome(body.nome), genero: genero(body.genero) };
  const sala: Sala = {
    codigo: novoCodigo(), slug: String(body.slug), hash, livro, modo, status: 'lobby', criador: seat,
    jogadores: { [seat]: eu }, diario: { A: [], B: [] }, rev: 0, criada: Date.now(),
  };
  if (modo === 'solo') {
    const p = livro.personagens[outro(seat)];
    sala.jogadores[outro(seat)] = { token: randomUUID(), nome: p.nomePadrao, genero: p.generoPadrao, ia: true };
  }
  store.salvar(sala);
  return { codigo: sala.codigo, token: eu.token, seat };
}

export async function entrarNaSala(codigo: string, body: { nome: string; genero: string }) {
  return store.comTrava(codigo.toUpperCase(), () => {
    const sala = salaOuErro(codigo);
    if (sala.modo === 'solo') throw new ErroApi(400, 'Essa sala é de jogo solo.');
    if (sala.status !== 'lobby') throw new ErroApi(409, `A partida de "${sala.livro.titulo}" já começou.`);
    const livre = SEATS.find((s) => !sala.jogadores[s]);
    if (!livre) throw new ErroApi(409, 'A sala já está cheia.');
    const eu: Participante = { token: randomUUID(), nome: limpaNome(body.nome), genero: genero(body.genero) };
    if (SEATS.some((s) => sala.jogadores[s]?.nome.toLowerCase() === eu.nome.toLowerCase())) throw new ErroApi(400, 'Os dois personagens precisam ter nomes diferentes.');
    sala.jogadores[livre] = eu;
    store.salvar(sala);
    return { token: eu.token, seat: livre };
  });
}

// ───────────── diário ─────────────
function textoDaVisao(v: ReturnType<typeof visao>, jog: Jogadores): string {
  const linhas = v.registro.map((r) => (r.k === 'esc' ? `▸ ${jog[r.seat].nome}: ${r.texto}` : r.k === 'fala' ? `${jog[r.seat].nome}: ${r.texto}` : r.texto));
  return [v.texto, ...linhas].filter(Boolean).join('\n\n');
}

// ───────────── aplicar uma ação (com IA, diário e versão) ─────────────
function aplicar(sala: Sala, seat: Seat, acao: Acao_) {
  const jog = jogadoresDe(sala);
  const e0 = sala.estado!;
  const antes = Object.fromEntries(SEATS.map((s) => [s, visao(sala.livro, e0, s, jog)])) as Record<Seat, ReturnType<typeof visao>>;
  const { estado } = agir(sala.livro, e0, seat, acao, jog);
  for (const s of SEATS) {
    if (estado.pos[s] !== e0.pos[s]) {
      const v = antes[s];
      const ent: EntradaDiario = { cap: v.cap, lugar: v.lugar, hora: v.hora, texto: textoDaVisao(v, jog) };
      sala.diario[s].push(ent);
    }
  }
  sala.estado = estado;
  if (estado.fim) {
    sala.status = 'fim';
    for (const s of SEATS) sala.diario[s].push({ cap: 99, texto: estado.finalTexto ?? '' });
  }
}

/** A IA age enquanto puder: continua, vota, escolhe. Para quando precisa esperar o humano. */
async function rodarIA(sala: Sala) {
  const iaSeat = SEATS.find((s) => sala.jogadores[s]?.ia);
  if (!iaSeat || sala.status !== 'jogando') return;
  const jog = jogadoresDe(sala);
  for (let i = 0; i < 80 && sala.status === 'jogando'; i++) {
    const v = visao(sala.livro, sala.estado!, iaSeat, jog);
    if (!v.opcoes.length) return;
    const acao = await escolhaDaIA(v, sala.estado!, iaSeat, { eu: jog[iaSeat].nome, par: jog[outro(iaSeat)].nome });
    try {
      aplicar(sala, iaSeat, acao);
    } catch (e) {
      if (e instanceof ErroJogo) return; // se a escolha for inválida, espera; nunca quebra a partida
      throw e;
    }
  }
}

export async function comecar(codigo: string, token: string | null) {
  return store.comTrava(codigo.toUpperCase(), async () => {
    const sala = salaOuErro(codigo);
    const seat = seatDoToken(sala, token);
    if (seat !== sala.criador) throw new ErroApi(403, 'Só quem criou a sala pode começar.');
    if (sala.status !== 'lobby') throw new ErroApi(409, 'A partida já começou.');
    if (!sala.jogadores.A || !sala.jogadores.B) throw new ErroApi(409, 'Falta o segundo jogador entrar na sala.');
    sala.estado = iniciar(sala.livro, jogadoresDe(sala));
    sala.status = 'jogando';
    await rodarIA(sala);
    store.salvar(sala);
    return { ok: true };
  });
}

export async function agirNaSala(codigo: string, token: string | null, body: { tipo?: string; id?: string; rev?: number }) {
  return store.comTrava(codigo.toUpperCase(), async () => {
    const sala = salaOuErro(codigo);
    const seat = seatDoToken(sala, token);
    if (sala.status !== 'jogando' || !sala.estado) throw new ErroApi(409, 'A partida não está em andamento.');
    if (typeof body.rev === 'number' && body.rev !== sala.rev) throw new ErroApi(409, 'A tela estava desatualizada. Atualizei, escolha de novo.');
    let acao: Acao_;
    if (body.tipo === 'continuar') acao = { tipo: 'continuar' };
    else if (body.tipo === 'opcao' && typeof body.id === 'string') acao = { tipo: 'opcao', id: body.id };
    else if (body.tipo === 'voto' && (body.id === 'avancar' || body.id === 'ficar')) acao = { tipo: 'voto', id: body.id };
    else throw new ErroApi(400, 'Ação inválida.');
    try {
      aplicar(sala, seat, acao);
    } catch (e) {
      if (e instanceof ErroJogo) throw new ErroApi(409, `Essa ação não está disponível agora. (${sala.livro.titulo})`);
      throw e;
    }
    await rodarIA(sala);
    store.salvar(sala);
    return { ok: true };
  });
}

// ───────────── o que cada jogador pode ver ─────────────
export function visaoDaSala(codigo: string, token: string | null) {
  const sala = salaOuErro(codigo);
  const seat = seatDoToken(sala, token);
  const par = sala.jogadores[outro(seat)];
  const base = {
    codigo: sala.codigo,
    titulo: sala.livro.titulo,
    modo: sala.modo,
    status: sala.status,
    rev: sala.rev,
    eu: { seat, nome: sala.jogadores[seat]!.nome, genero: sala.jogadores[seat]!.genero, criador: seat === sala.criador },
    par: par ? { nome: par.nome, genero: par.genero, ia: !!par.ia } : null,
    ficha: fichaDe(sala, seat),
  };
  if (sala.status === 'lobby' || !sala.estado) return { ...base, visao: null, diario: 0 };
  const v = visao(sala.livro, sala.estado, seat, jogadoresDe(sala));
  const { no: _interno, ...publico } = v; // o id interno do nó nunca vai ao jogador
  void _interno;
  return {
    ...base,
    visao: { ...publico, aguardando: publico.aguardando ? `Esperando ${par?.nome ?? 'o outro jogador'}…` : null },
    diario: sala.diario[seat].length,
    final: sala.status === 'fim' ? (sala.estado.finalTexto ?? '') : undefined,
  };
}

function fichaDe(sala: Sala, seat: Seat) {
  const P = sala.livro.personagens;
  const mk = (s: Seat, privado: boolean) => {
    const j = sala.jogadores[s];
    const p = P?.[s];
    return j && p ? { nome: j.nome, papel: p.papel, idade: p.idade, origem: p.origem, ferida: privado ? p.ferida : undefined } : null;
  };
  const e = sala.estado;
  return {
    eu: mk(seat, true),
    par: mk(outro(seat), false),
    fatos: sala.livro.fatos,
    vinculo: e?.vinculo ?? 0,
    fa: e?.fa ?? 0,
    nervosismo: e?.nervosismo[seat] ?? 0,
    pistas: e?.pistas[seat] ?? [],
  };
}

export function diarioDaSala(codigo: string, token: string | null) {
  const sala = salaOuErro(codigo);
  const seat = seatDoToken(sala, token);
  return { titulo: sala.livro.titulo, entradas: sala.diario[seat], nomes: { A: sala.jogadores.A?.nome, B: sala.jogadores.B?.nome } };
}

export function exportarMarkdown(codigo: string, token: string | null): string {
  const d = diarioDaSala(codigo, token);
  const partes = [`# ${d.titulo}`, `_${d.nomes.A} e ${d.nomes.B}_`];
  let cap = 0;
  for (const e of d.entradas) {
    if (e.cap !== cap && e.cap !== 99) {
      cap = e.cap;
      partes.push(`\n## Capítulo ${cap}`);
    }
    if (e.cap === 99) partes.push('\n## Final');
    else if (e.lugar || e.hora) partes.push(`\n**${[e.lugar, e.hora].filter(Boolean).join(' · ')}**`);
    partes.push(e.texto);
  }
  return partes.join('\n\n');
}

export function registrarRelato(codigo: string, token: string | null, texto: unknown) {
  const sala = salaOuErro(codigo);
  const seat = seatDoToken(sala, token);
  const t = String(texto ?? '').trim().slice(0, 2000);
  if (t.length < 3) throw new ErroApi(400, 'Descreva o problema em poucas palavras.');
  // o id interno do nó vai só para o log do admin, nunca para a mensagem ao jogador
  const no = sala.estado?.pos[seat];
  store.relatar({ id: randomUUID(), codigo: sala.codigo, livro: sala.livro.titulo, noInterno: no, seat, texto: t, quando: Date.now() });
  return { ok: true };
}
