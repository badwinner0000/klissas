'use client';
export interface Sessao {
  token: string;
  seat: 'A' | 'B';
}
const k = (codigo: string) => `verso:sessao:${codigo.toUpperCase()}`;
export function lerSessao(codigo: string): Sessao | null {
  try {
    const s = localStorage.getItem(k(codigo));
    return s ? (JSON.parse(s) as Sessao) : null;
  } catch {
    return null;
  }
}
export function gravarSessao(codigo: string, s: Sessao) {
  try {
    localStorage.setItem(k(codigo), JSON.stringify(s));
  } catch {
    /* modo privado: a sessão vale só enquanto a aba existir */
  }
}
export class ErroCliente extends Error {
  constructor(
    public status: number,
    msg: string,
  ) {
    super(msg);
  }
}
export async function api<T>(path: string, opts: { method?: string; body?: unknown; token?: string | null } = {}): Promise<T> {
  let r: Response;
  try {
    r = await fetch(path, {
      method: opts.method ?? (opts.body ? 'POST' : 'GET'),
      headers: { 'content-type': 'application/json', ...(opts.token ? { 'x-token': opts.token } : {}) },
      body: opts.body ? JSON.stringify(opts.body) : undefined,
      cache: 'no-store',
    });
  } catch {
    throw new ErroCliente(0, 'Sem conexão. Vou tentar de novo sozinho.');
  }
  const j = (await r.json().catch(() => ({}))) as { erro?: string };
  if (!r.ok) throw new ErroCliente(r.status, j.erro ?? 'Algo deu errado. Tente de novo.');
  return j as T;
}
/** Parágrafos com *itálico* sem HTML cru. */
export function partes(texto: string): { fala: boolean; trechos: { t: string; em: boolean }[] }[] {
  return texto
    .split(/\n+/)
    .filter((p) => p.trim())
    .map((p) => ({
      fala: /^\s*[—–]/.test(p),
      trechos: p.split(/(\*[^*\n]+\*)/).filter(Boolean).map((t) => (t.startsWith('*') && t.endsWith('*') && t.length > 2 ? { t: t.slice(1, -1), em: true } : { t, em: false })),
    }));
}
