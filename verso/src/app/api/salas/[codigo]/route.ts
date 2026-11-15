import { responde, tokenDe } from '../../../../lib/http';
import { visaoDaSala } from '../../../../lib/jogo';
export const dynamic = 'force-dynamic';
export const GET = (req: Request, c: { params: Promise<{ codigo: string }> }) =>
  responde(async () => {
    const { codigo } = await c.params;
    const v = await visaoDaSala(codigo, tokenDe(req));
    const rev = new URL(req.url).searchParams.get('rev');
    return rev !== null && Number(rev) === v.rev ? { semMudanca: true, rev: v.rev } : v;
  });
