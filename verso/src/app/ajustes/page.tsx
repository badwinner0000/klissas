'use client';
import { useEffect, useState } from 'react';

export default function Ajustes() {
  const [fs, setFs] = useState(18);
  const [tema, setTema] = useState<'escuro' | 'claro'>('escuro');
  useEffect(() => { try { const f = Number(localStorage.getItem('verso:fs')); if (f >= 14 && f <= 28) setFs(f); if (localStorage.getItem('verso:tema') === 'claro') setTema('claro'); } catch { /* padrão */ } }, []);
  useEffect(() => { document.documentElement.style.setProperty('--fs', `${fs}px`); document.documentElement.dataset.tema = tema; try { localStorage.setItem('verso:fs', String(fs)); localStorage.setItem('verso:tema', tema); } catch { /* ok */ } }, [fs, tema]);
  return (
    <main>
      <h1>Ajustes</h1>
      <section className="card">
        <h2>Tema</h2>
        <div className="row"><button className={tema === 'escuro' ? 'pri' : ''} aria-pressed={tema === 'escuro'} onClick={() => setTema('escuro')}>Escuro</button><button className={tema === 'claro' ? 'pri' : ''} aria-pressed={tema === 'claro'} onClick={() => setTema('claro')}>Claro</button></div>
      </section>
      <section className="card">
        <h2>Tamanho da letra</h2>
        <div className="row"><button aria-label="Diminuir letra" onClick={() => setFs((x) => Math.max(14, x - 2))}>A−</button><span aria-live="polite">{fs}px</span><button aria-label="Aumentar letra" onClick={() => setFs((x) => Math.min(28, x + 2))}>A+</button></div>
        <p className="leitor" style={{ marginTop: 12 }}><span style={{ fontFamily: 'var(--leitura)' }}>Era uma noite de neblina em Nantucket.</span></p>
      </section>
      <section className="card"><h2>Sobre</h2><p className="mut sm">Verso · livros-jogo de romance para duas pessoas. As suas partidas ficam neste aparelho e no servidor, ligadas ao código da sala.</p></section>
    </main>
  );
}
