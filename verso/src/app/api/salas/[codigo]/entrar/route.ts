import { corpo, responde, tokenDe } from '../../../../../lib/http';
import { agirNaSala, comecar, entrarNaSala, registrarRelato } from '../../../../../lib/jogo';
export const dynamic = 'force-dynamic';
void tokenDe; void corpo; void agirNaSala; void comecar; void entrarNaSala; void registrarRelato;
export const POST = (req: Request, c: { params: Promise<{ codigo: string }> }) =>
  responde(async () => {
    const { codigo } = await c.params;
    return entrarNaSala(codigo, await corpo(req));
  });
