'use client';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import Capa from '../components/Capa';
import { IcBusca, IcSeta } from '../components/Icones';
import { EM_BREVE, SECOES } from '../lib/catalogo';
import { type ResumoPartida, api, carregarPartidas } from '../lib/cliente';

interface Livro { slug: string; titulo: string; secao: string; tropes: string[]; sinopse?: string; serie?: string; tema?: { a: string; b: string; destaque: string }; capitulos: number }

export default function Inicio() {
  const [livros, setLivros] = useState<Livro[] | null>(null);
  const [erro, setErro] = useState('');
  const [busca, setBusca] = useState('');
  const [secao, setSecao] = useState('todos');
  const [partidas, setPartidas] = useState<ResumoPartida[]>([]);
  const [splash, setSplash] = useState(false);

  useEffect(() => {
    api<Livro[]>('/api/livros').then(setLivros).catch((e: Error) => setErro(e.message));
    carregarPartidas().then(setPartidas);
    try { if (!localStorage.getItem('verso:splash')) setSplash(true); } catch { /* sem armazenamento */ }
  }, []);
  const fecharSplash = () => { try { localStorage.setItem('verso:splash', '1'); } catch { /* ok */ } setSplash(false); };

  const q = busca.trim().toLowerCase();
  const reais = useMemo(() => (livros ?? []).filter((l) => (secao === 'todos' || l.secao === secao) && (!q || `${l.titulo} ${l.tropes.join(' ')} ${l.secao}`.toLowerCase().includes(q))), [livros, secao, q]);
  const breve = useMemo(() => (secao === 'todos' || secao === 'love-sparks' ? EM_BREVE : []).filter((l) => !q || `${l.titulo} ${l.tropes.join(' ')}`.toLowerCase().includes(q)), [secao, q]);
  const jogando = partidas.filter((p) => p.status === 'jogando').sort((a, b) => b.cap - a.cap)[0];

  if (splash)
    return (
      <div className="splash" role="dialog" aria-label="Boas-vindas">
        <div className="flutua" aria-hidden>
          {[...(livros ?? []).map((l) => ({ titulo: l.titulo, serie: l.serie, tema: l.tema, slug: l.slug })), ...EM_BREVE].slice(0, 6).map((c, i) => (
            <div key={i} style={{ left: `${[4, 34, 62, 12, 46, 70][i]}%`, top: `${[6, 2, 14, 40, 34, 46][i]}%` }}><Capa c={c} tamanho="m" inclinacao={[-14, 8, 16, 10, -9, -18][i]} /></div>
          ))}
        </div>
        <h1>Descubra histórias que você vai amar</h1>
        <p>Cada um no seu aparelho, escolhendo a mesma história.</p>
        <button className="pri" style={{ marginTop: 14 }} onClick={fecharSplash}>Vamos começar <IcSeta /></button>
      </div>
    );

  return (
    <main>
      <div className="boasvindas">
        <div>
          <h1>Bem-vindo ao Verso!</h1>
          <p className="mut">O que vamos ler hoje?</p>
        </div>
      </div>
      <div className="busca">
        <IcBusca />
        <input aria-label="Buscar histórias" placeholder="Buscar histórias…" value={busca} onChange={(e) => setBusca(e.target.value)} />
      </div>
      {erro && <p role="alert" className="erro">{erro}</p>}

      <div className="secao"><h2>Categorias</h2></div>
      <div className="chips" role="tablist" aria-label="Categorias">
        <button className={secao === 'todos' ? 'ativo' : ''} role="tab" aria-selected={secao === 'todos'} onClick={() => setSecao('todos')}>Todos</button>
        {SECOES.map((s) => <button key={s.id} className={secao === s.id ? 'ativo' : ''} role="tab" aria-selected={secao === s.id} onClick={() => setSecao(s.id)}>{s.rot}</button>)}
      </div>

      {jogando && (
        <>
          <div className="secao"><h2>Continue de onde parou</h2></div>
          <Link href={`/sala/${jogando.codigo}`} className="continuar">
            <div style={{ width: 88 }}><Capa c={{ titulo: jogando.titulo, serie: jogando.serie, tema: jogando.tema, slug: jogando.slug }} tamanho="p" /></div>
            <div style={{ flex: 1 }}>
              <div className="mut sm">Jogando agora</div>
              <div className="pct">{Math.round((jogando.cap / jogando.capsTotal) * 100)}%</div>
              <div className="sm mut">Capítulo {jogando.cap} de {jogando.capsTotal}</div>
              <div className="barra"><i style={{ width: `${(jogando.cap / jogando.capsTotal) * 100}%` }} /></div>
            </div>
          </Link>
        </>
      )}

      <div className="secao"><h2>Para você</h2></div>
      {livros && reais.length + breve.length === 0 && <p className="mut">{secao === 'todos' ? 'Nada encontrado para essa busca.' : 'Essa seção chega em breve.'}</p>}
      <div className="carrossel">
        {reais.map((l) => (
          <Link key={l.slug} href={`/livro/${l.slug}`} className="livro-link" aria-label={`Abrir ${l.titulo}`}>
            <Capa c={{ titulo: l.titulo, serie: l.serie, tema: l.tema, slug: l.slug }} tamanho="m" />
            <div className="tit">{l.titulo}</div><div className="sub">{l.capitulos} capítulos · a dois ou solo</div>
          </Link>
        ))}
        {breve.map((l) => (
          <div key={l.titulo} className="livro-link" aria-disabled="true">
            <Capa c={{ titulo: l.titulo, tema: l.tema, slug: l.slug, embreve: true }} tamanho="m" />
            <div className="tit">{l.titulo}</div><div className="sub">em breve</div>
          </div>
        ))}
      </div>
    </main>
  );
}
