import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = { title: 'Verso', description: 'Livros-jogo de romance para duas pessoas, cada uma no seu aparelho.' };
export const viewport: Viewport = { width: 'device-width', initialScale: 1, themeColor: '#0b1b24' };

export default function Raiz({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
