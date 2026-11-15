// Armazenamento das salas. Esta implementação grava em arquivo (.data/) e serve para rodar e testar localmente.
// Em produção a mesma interface deve ser implementada sobre o Supabase (ver supabase/migrations/0001_init.sql).
import { existsSync, mkdirSync, readFileSync, renameSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import type { Livro, Seat } from '../content/schema';
import type { Estado } from '../engine/motor';

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
  rev: number; // sobe a cada mudança (lobby ou jogo): o cliente usa para saber se algo mudou
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

const DIR = () => process.env.VERSO_DATA_DIR ?? join(process.cwd(), '.data');
const g = globalThis as unknown as { __verso?: { salas: Map<string, Sala>; relatos: Relato[]; locks: Map<string, Promise<unknown>>; carregado: boolean } };
const mem = (g.__verso ??= { salas: new Map<string, Sala>(), relatos: [] as Relato[], locks: new Map<string, Promise<unknown>>(), carregado: false });

function carregar() {
  if (mem.carregado) return;
  mem.carregado = true;
  try {
    const f = join(DIR(), 'salas.json');
    if (existsSync(f)) for (const s of JSON.parse(readFileSync(f, 'utf8')) as Sala[]) mem.salas.set(s.codigo, s);
    const r = join(DIR(), 'relatos.json');
    if (existsSync(r)) mem.relatos = JSON.parse(readFileSync(r, 'utf8'));
  } catch {
    /* arquivo corrompido: começa vazio, nunca derruba o servidor */
  }
}
function gravar() {
  try {
    mkdirSync(DIR(), { recursive: true });
    const tmp = join(DIR(), 'salas.json.tmp');
    writeFileSync(tmp, JSON.stringify([...mem.salas.values()]));
    renameSync(tmp, join(DIR(), 'salas.json'));
    writeFileSync(join(DIR(), 'relatos.json'), JSON.stringify(mem.relatos));
  } catch {
    /* disco indisponível: segue em memória */
  }
}

export const store = {
  obter(codigo: string): Sala | undefined {
    carregar();
    return mem.salas.get(codigo.toUpperCase());
  },
  salvar(s: Sala) {
    carregar();
    s.rev += 1;
    mem.salas.set(s.codigo, s);
    gravar();
  },
  existe(codigo: string) {
    carregar();
    return mem.salas.has(codigo);
  },
  relatar(r: Relato) {
    carregar();
    mem.relatos.push(r);
    gravar();
  },
  relatos(): Relato[] {
    carregar();
    return mem.relatos;
  },
  /** Serializa as mudanças de uma sala: dois jogadores agindo juntos nunca se atropelam. */
  async comTrava<T>(codigo: string, fn: () => T | Promise<T>): Promise<T> {
    const anterior = mem.locks.get(codigo) ?? Promise.resolve();
    let solta!: () => void;
    const atual = new Promise<void>((r) => (solta = r));
    const fila = anterior.then(() => atual);
    mem.locks.set(codigo, fila);
    await anterior;
    try {
      return await fn();
    } finally {
      solta();
      if (mem.locks.get(codigo) === fila) mem.locks.delete(codigo);
    }
  },
};
