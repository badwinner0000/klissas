// Implementação em arquivo (.data/): serve para rodar localmente. Uma instância só; serializa por sala.
import { existsSync, mkdirSync, readFileSync, renameSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { type Relato, type Sala, type Store, ErroSalaInexistente } from './store';

const DIR = () => process.env.VERSO_DATA_DIR ?? join(process.cwd(), '.data');
const g = globalThis as unknown as { __verso?: { salas: Map<string, Sala>; relatos: Relato[]; locks: Map<string, Promise<unknown>>; carregado: boolean } };

export function storeArquivo(): Store {
  const mem = (g.__verso ??= { salas: new Map<string, Sala>(), relatos: [] as Relato[], locks: new Map<string, Promise<unknown>>(), carregado: false });
  const carregar = () => {
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
  };
  const gravar = () => {
    try {
      mkdirSync(DIR(), { recursive: true });
      const tmp = join(DIR(), 'salas.json.tmp');
      writeFileSync(tmp, JSON.stringify([...mem.salas.values()]));
      renameSync(tmp, join(DIR(), 'salas.json'));
      writeFileSync(join(DIR(), 'relatos.json'), JSON.stringify(mem.relatos));
    } catch {
      /* disco indisponível: segue em memória */
    }
  };
  const comTrava = async <T>(codigo: string, fn: () => T | Promise<T>): Promise<T> => {
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
  };
  return {
    async obter(c) {
      carregar();
      return mem.salas.get(c.toUpperCase());
    },
    async criar(s) {
      carregar();
      if (mem.salas.has(s.codigo)) return false;
      mem.salas.set(s.codigo, s);
      gravar();
      return true;
    },
    async mutar(codigo, fn) {
      const c = codigo.toUpperCase();
      return comTrava(c, async () => {
        carregar();
        const sala = mem.salas.get(c);
        if (!sala) throw new ErroSalaInexistente();
        const r = await fn(sala);
        sala.rev += 1;
        gravar();
        return r;
      });
    },
    async relatar(r) {
      carregar();
      mem.relatos.push(r);
      gravar();
    },
    async relatos() {
      carregar();
      return mem.relatos;
    },
  };
}
