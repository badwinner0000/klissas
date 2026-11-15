// Implementação em Postgres (Supabase). Conexão direta, só do servidor.
// Concorrência: UPDATE ... WHERE rev = <lido>. Se outra instância gravou antes, relê e reaplica.
import { Pool } from 'pg';
import type { Livro } from '../content/schema';
import { Livro as LivroSchema } from '../content/schema';
import { type Relato, type Sala, type Store, ErroSalaInexistente } from './store';

const livros = new Map<string, Livro>(); // cache por instância: o conteúdo de um hash nunca muda

export function storePg(url: string): Store {
  const ssl = process.env.DATABASE_SSL === 'disable' ? false : { rejectUnauthorized: false };
  const pool = new Pool({ connectionString: url, max: Number(process.env.DATABASE_POOL ?? 3), ssl, idleTimeoutMillis: 10_000, connectionTimeoutMillis: 8_000 });
  pool.on('error', (e) => console.error('pg: erro em conexão ociosa', e.message));

  const livroPorHash = async (hash: string): Promise<Livro> => {
    const c = livros.get(hash);
    if (c) return c;
    const r = await pool.query('select conteudo from livros_versoes where hash = $1', [hash]);
    if (!r.rows[0]) throw new Error(`versão do livro ${hash} não encontrada`);
    const l = LivroSchema.parse(r.rows[0].conteudo);
    livros.set(hash, l);
    return l;
  };
  const dehidratar = (s: Sala) => {
    const { livro: _l, codigo: _c, rev: _r, status: _s, ...resto } = s;
    void _l; void _c; void _r; void _s;
    return resto;
  };
  const hidratar = async (row: { codigo: string; rev: number; status: Sala['status']; livro_hash: string; doc: Omit<Sala, 'livro' | 'codigo' | 'rev' | 'status'> }): Promise<Sala> => ({
    ...row.doc,
    codigo: row.codigo,
    rev: row.rev,
    status: row.status,
    livro: await livroPorHash(row.livro_hash),
  });
  const obter = async (codigo: string): Promise<Sala | undefined> => {
    const r = await pool.query('select codigo, rev, status, livro_hash, doc from salas where codigo = $1', [codigo.toUpperCase()]);
    return r.rows[0] ? hidratar(r.rows[0]) : undefined;
  };
  const dorme = (ms: number) => new Promise((r) => setTimeout(r, ms));

  return {
    obter,
    async criar(s) {
      const cli = await pool.connect();
      try {
        await cli.query('begin');
        await cli.query('insert into livros_versoes(hash, slug, conteudo) values ($1, $2, $3) on conflict (hash) do nothing', [s.hash, s.slug, JSON.stringify(s.livro)]);
        const r = await cli.query('insert into salas(codigo, rev, status, livro_hash, doc) values ($1, $2, $3, $4, $5) on conflict (codigo) do nothing returning codigo', [s.codigo, s.rev, s.status, s.hash, JSON.stringify(dehidratar(s))]);
        await cli.query('commit');
        livros.set(s.hash, s.livro);
        return r.rowCount === 1;
      } catch (e) {
        await cli.query('rollback').catch(() => {});
        throw e;
      } finally {
        cli.release();
      }
    },
    async mutar(codigo, fn) {
      for (let t = 0; t < 10; t++) {
        const sala = await obter(codigo);
        if (!sala) throw new ErroSalaInexistente();
        const resultado = await fn(sala);
        const lida = sala.rev;
        const r = await pool.query('update salas set doc = $2, status = $3, rev = rev + 1, atualizada = now() where codigo = $1 and rev = $4 returning rev', [sala.codigo, JSON.stringify(dehidratar(sala)), sala.status, lida]);
        if (r.rowCount === 1) return resultado;
        await dorme(15 + Math.random() * 40 * (t + 1)); // outra instância gravou antes: relê e reaplica
      }
      throw new Error('conflito de gravação repetido ao atualizar a sala');
    },
    async relatar(r: Relato) {
      await pool.query('insert into relatos(codigo, livro, no_interno, seat, texto) values ($1, $2, $3, $4, $5)', [r.codigo, r.livro, r.noInterno ?? null, r.seat ?? null, r.texto]);
    },
    async relatos() {
      const r = await pool.query('select id, codigo, livro, no_interno, seat, texto, extract(epoch from criado_em) * 1000 as quando from relatos order by criado_em desc limit 500');
      return r.rows.map((x) => ({ id: x.id, codigo: x.codigo, livro: x.livro, noInterno: x.no_interno ?? undefined, seat: x.seat ?? undefined, texto: x.texto, quando: Number(x.quando) }));
    },
  };
}
