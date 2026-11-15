'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Capa from '../../components/Capa';
import { type ResumoPartida, carregarPartidas } from '../../lib/cliente';

export default function Partidas() {
  const [p, setP] = useState<ResumoPartida[] | null>(null);
  useEffect(() => { carregarPartidas().then(setP); }, []);
  return (
    <main>
      <h1>Suas partidas</h1>
      <p className="mut">{p ? `${p.length} ${p.length === 1 ? 'partida' : 'partidas'} neste aparelho` : 'Carregando…'}</p>
      {p && p.length === 0 && <div className="card"><p>Você ainda não começou nenhuma história.</p><Link className="btn pri" href="/">Escolher uma história</Link></div>}
      <div className="estante">
        {p?.map((x) => (
          <Link key={x.codigo} href={`/sala/${x.codigo}`} className="item" aria-label={`${x.titulo}, ${x.status === 'fim' ? 'terminada' : x.status === 'lobby' ? 'esperando começar' : `capítulo ${x.cap}`}`}>
            <Capa c={{ titulo: x.titulo, serie: x.serie, tema: x.tema, slug: x.slug }} tamanho="m" />
            {x.status === 'fim' ? <span className="badge">Fim</span> : x.status === 'jogando' ? <span className="pbar"><i style={{ width: `${(x.cap / x.capsTotal) * 100}%` }} /></span> : <span className="badge" style={{ background: '#fff3c4', color: '#5a4300' }}>Na sala de espera</span>}
            <div className="sm" style={{ marginTop: 8 }}>{x.titulo}</div>
            <div className="mut sm">{x.modo === 'solo' ? 'Solo' : 'A dois'} · sala {x.codigo}</div>
          </Link>
        ))}
      </div>
    </main>
  );
}
