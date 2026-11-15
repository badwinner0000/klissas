import Sala from './Sala';
export default async function Pagina({ params }: { params: Promise<{ codigo: string }> }) {
  const { codigo } = await params;
  return <Sala codigo={codigo.toUpperCase()} />;
}
