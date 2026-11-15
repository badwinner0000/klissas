import { NextResponse } from 'next/server';
import { ErroApi } from './jogo';

export const dynamic = 'force-dynamic';

export async function responde(fn: () => unknown | Promise<unknown>) {
  try {
    return NextResponse.json(await fn(), { headers: { 'Cache-Control': 'no-store' } });
  } catch (e) {
    if (e instanceof ErroApi) return NextResponse.json({ erro: e.message }, { status: e.status });
    console.error('erro interno', e); // detalhes só no log do servidor
    return NextResponse.json({ erro: 'Algo deu errado do nosso lado. Tente de novo em instantes.' }, { status: 500 });
  }
}
export const tokenDe = (req: Request) => req.headers.get('x-token');
export async function corpo<T>(req: Request): Promise<T> {
  try {
    return (await req.json()) as T;
  } catch {
    return {} as T;
  }
}
