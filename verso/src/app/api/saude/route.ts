// Diagnóstico: o banco responde? Nunca devolve segredos, só o tipo do problema.
import { NextResponse } from 'next/server';
import { store } from '../../../lib/store';

export const dynamic = 'force-dynamic';

const DICAS: Record<string, string> = {
  '28P01': 'senha do banco recusada: confira a senha dentro da DATABASE_URL na Vercel',
  '28000': 'usuário do banco recusado: use a URL do "Transaction pooler" (usuário postgres.<ref>)',
  '3D000': 'banco inexistente: confira o final da DATABASE_URL (normalmente /postgres)',
  '42P01': 'tabela não existe: rode os arquivos de supabase/migrations (0001 e 0002) no SQL Editor',
  '42703': 'coluna não existe: rode de novo supabase/migrations/0002_salas.sql',
  ENOTFOUND: 'endereço do banco não encontrado: confira o host da DATABASE_URL',
  ETIMEDOUT: 'o banco não respondeu: use a URL do Transaction pooler (porta 6543)',
  ECONNREFUSED: 'conexão recusada: confira host e porta (pooler: 6543)',
  DEPTH_ZERO_SELF_SIGNED_CERT: 'certificado: o código já aceita; atualize o deploy',
  XX000: 'o pooler recusou a conexão: confira usuário (postgres.<ref>) e senha',
};

const POR_MENSAGEM: [RegExp, string][] = [
  [/DATABASE_URL não configurada/i, 'o servidor não enxerga a DATABASE_URL: cadastre como Secret em Variables and secrets do Worker (runtime, não só do build) e faça um novo deploy'],
  [/tenant or user not found/i, 'o pooler não reconhece o usuário: na DATABASE_URL o usuário precisa ser postgres.<ref-do-projeto> (copie a URL do botão Connect > Transaction pooler)'],
  [/password authentication failed/i, 'senha do banco recusada: troque a senha dentro da DATABASE_URL (sem colchetes; símbolos especiais precisam de %-codificação)'],
  [/self[- ]signed|certificate/i, 'problema de certificado SSL com o banco'],
  [/timeout|timed out/i, 'o banco não respondeu a tempo: use o Transaction pooler (porta 6543) e confira o host'],
  [/ENOTFOUND|getaddrinfo/i, 'endereço do banco não encontrado: confira o host da DATABASE_URL'],
  [/relation .* does not exist/i, 'tabela não existe: rode supabase/migrations/0001_init.sql e depois 0002_salas.sql no SQL Editor'],
  [/invalid (url|connection)|ERR_INVALID_URL|Cannot read propert/i, 'DATABASE_URL malformada: confira se há espaços, aspas ou [colchetes] na senha'],
  [/too many (clients|connections)|remaining connection slots/i, 'conexões demais: use o Transaction pooler (porta 6543)'],
];
const limpa = (m: string) => m.replace(/postgres(ql)?:\/\/\S+/gi, '<url>').replace(/\b[\w.-]+\.(supabase\.(co|com)|pooler\.supabase\.com|vercel\.app)\b/gi, '<host>').slice(0, 160);

export async function GET() {
  const base = { banco: process.env.DATABASE_URL ? 'postgres' : 'arquivo', vercel: !!process.env.VERCEL };
  try {
    await store.obter('ZZZZZ');
    return NextResponse.json({ ok: true, ...base }, { headers: { 'Cache-Control': 'no-store' } });
  } catch (e) {
    const err = e as { code?: string; name?: string; message?: string };
    const codigo = err.code ?? err.name ?? 'desconhecido';
    console.error('saude: falha', codigo, err.message);
    const msg = err.message ?? '';
    const dica = DICAS[codigo] ?? POR_MENSAGEM.find(([r]) => r.test(msg))?.[1] ?? 'veja os logs da função na Vercel (Logs)';
    return NextResponse.json({ ok: false, ...base, codigo, mensagem: limpa(msg), dica }, { status: 503, headers: { 'Cache-Control': 'no-store' } });
  }
}
