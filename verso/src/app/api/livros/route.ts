import { listarLivros } from '../../../lib/livros';
import { responde } from '../../../lib/http';
export const dynamic = 'force-dynamic';
export const GET = () => responde(() => listarLivros());
