import { NextResponse } from 'next/server';
import { ErroApi, exportarMarkdown } from '../../../../../lib/jogo';
import { tokenDe } from '../../../../../lib/http';
export const dynamic = 'force-dynamic';
export async function GET(req: Request, c: { params: Promise<{ codigo: string }> }) {
  try {
    const { codigo } = await c.params;
    const t = tokenDe(req) ?? new URL(req.url).searchParams.get('token');
    return new NextResponse(exportarMarkdown(codigo, t), { headers: { 'Content-Type': 'text/markdown; charset=utf-8', 'Content-Disposition': 'attachment; filename="historia.md"', 'Cache-Control': 'no-store' } });
  } catch (e) {
    return NextResponse.json({ erro: e instanceof ErroApi ? e.message : 'Não consegui exportar a história.' }, { status: e instanceof ErroApi ? e.status : 500 });
  }
}
