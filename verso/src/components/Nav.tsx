'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { IcCasa, IcLivro, IcMais, IcPessoa } from './Icones';

const ABAS = [
  { href: '/', rot: 'Início', Ic: IcCasa },
  { href: '/partidas', rot: 'Partidas', Ic: IcLivro },
  { href: '/entrar', rot: 'Entrar', Ic: IcMais },
  { href: '/ajustes', rot: 'Ajustes', Ic: IcPessoa },
];
export default function Nav() {
  const path = usePathname();
  if (path.startsWith('/sala/')) return null; // o leitor tem a própria barra de controles
  return (
    <nav className="nav" aria-label="Navegação principal">
      {ABAS.map(({ href, rot, Ic }) => {
        const ativo = href === '/' ? path === '/' : path.startsWith(href);
        return (
          <Link key={href} href={href} className={ativo ? 'ativo' : ''} aria-current={ativo ? 'page' : undefined} aria-label={rot}>
            <Ic />
            <span>{rot}</span>
          </Link>
        );
      })}
    </nav>
  );
}
