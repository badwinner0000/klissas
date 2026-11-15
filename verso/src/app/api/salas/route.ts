import { corpo, responde } from '../../../lib/http';
import { criarSala } from '../../../lib/jogo';
export const dynamic = 'force-dynamic';
export const POST = (req: Request) => responde(async () => criarSala(await corpo(req)));
