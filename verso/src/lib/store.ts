// Armazenamento das salas: interface + escolha da implementação.
//   • DATABASE_URL definido  → Postgres (Supabase em produção)
//   • senão                  → arquivo local em .data/ (só para desenvolvimento; NÃO funciona na Vercel)
import type { Livro, Seat } from '../content/schema';
import type { Estado } from '../engine/motor';
import { storeArquivo } from './store-arquivo';

export interface Participante {
  token: string; // segredo do jogador; nunca sai do servidor para o outro
  nome: string;
  genero: 'ele' | 'ela';
  ia?: boolean;
}
export interface EntradaDiario {
  cap: number;
  lugar?: string;
  hora?: string;
  texto: string;
}
export interface Sala {
  codigo: string;
  slug: string;
  hash: string; // a sala fica travada nesta versão do livro, mesmo que o arquivo mude depois
  livro: Livro; // snapshot da versão em que a partida começou
  modo: 'dupla' | 'solo';
  status: 'lobby' | 'jogando' | 'fim';
  criador: Seat;
  jogadores: Partial<Record<Seat, Participante>>;
  estado?: Estado;
  diario: Record<Seat, EntradaDiario[]>;
  rev: number; // sobe a cada mudança: o cliente usa para saber se algo mudou
  criada: number;
}
export interface Relato {
  id: string;
  codigo: string;
  livro: string;
  noInterno?: string;
  seat?: Seat;
  texto: string;
  quando: number;
}
export class ErroSalaInexistente extends Error {}
export class ErroBancoIndisponivel extends Error {}

export interface Store {
  obter(codigo: string): Promise<Sala | undefined>;
  /** false se o código já existe */
  criar(sala: Sala): Promise<boolean>;
  /**
   * Lê a sala, aplica `fn` (que a modifica) e grava com controle de concorrência (rev).
   * Se outra instância gravou no meio, relê e reaplica `fn`. Se `fn` lança, nada é gravado.
   */
  mutar<T>(codigo: string, fn: (sala: Sala) => Promise<T> | T): Promise<T>;
  relatar(r: Relato): Promise<void>;
  relatos(): Promise<Relato[]>;
}

let impl: Store | undefined;
async function escolher(): Promise<Store> {
  if (impl) return impl;
  if (process.env.DATABASE_URL) {
    const { storePg } = await import('./store-pg');
    impl = storePg(process.env.DATABASE_URL);
  } else {
    if (process.env.VERCEL) throw new ErroBancoIndisponivel('DATABASE_URL não configurada: a Vercel não guarda arquivos entre requisições.');
    impl = storeArquivo();
  }
  return impl;
}

export const store: Store = {
  obter: async (c) => (await escolher()).obter(c),
  criar: async (s) => (await escolher()).criar(s),
  mutar: async (c, fn) => (await escolher()).mutar(c, fn),
  relatar: async (r) => (await escolher()).relatar(r),
  relatos: async () => (await escolher()).relatos(),
};
