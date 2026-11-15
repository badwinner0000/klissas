'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ErroCliente, api, gravarSessao } from '../lib/cliente';

interface Livro { slug: string; titulo: string; secao: string; tropes: string[]; sinopse?: string; personagens?: { A: Pers; B: Pers } }
interface Pers { papel: string; nomePadrao: string; generoPadrao: 'ele' | 'ela'; idade: number; origem?: string }
const SECAO: Record<string, string> = { 'love-sparks': '☀️ Love Sparks · comédia romântica', 'k-vibes': '🌸 K-Vibes', 'dark-deals': '🖤 Dark Deals', 'bitter-sweet': '🌧️ Bitter Sweet' };

export default function Inicio() {
  const router = useRouter();
  const [livros, setLivros] = useState<Livro[] | null>(null);
  const [slug, setSlug] = useState('');
  const [seat, setSeat] = useState<'A' | 'B'>('A');
  const [nome, setNome] = useState('');
  const [gen, setGen] = useState<'ele' | 'ela'>('ela');
  const [cod, setCod] = useState('');
  const [nomeJ, setNomeJ] = useState('');
  const [genJ, setGenJ] = useState<'ele' | 'ela'>('ela');
  const [erro, setErro] = useState('');
  const [ocupado, setOcupado] = useState(false);

  useEffect(() => {
    api<Livro[]>('/api/livros').then((l) => { setLivros(l); if (l[0]) setSlug(l[0].slug); }).catch((e: ErroCliente) => setErro(e.message));
  }, []);
  const livro = livros?.find((l) => l.slug === slug);
  const escolheSeat = (s: 'A' | 'B') => { setSeat(s); const p = livro?.personagens?.[s]; if (p) { setNome(p.nomePadrao); setGen(p.generoPadrao); } };
  useEffect(() => { if (livro) escolheSeat(seat); /* eslint-disable-next-line react-hooks/exhaustive-deps */ }, [slug, livros]);

  async function criar(modo: 'dupla' | 'solo') {
    setErro(''); setOcupado(true);
    try {
      const r = await api<{ codigo: string; token: string; seat: 'A' | 'B' }>('/api/salas', { body: { slug, modo, nome, genero: gen, seat } });
      gravarSessao(r.codigo, { token: r.token, seat: r.seat });
      router.push(`/sala/${r.codigo}`);
    } catch (e) { setErro((e as Error).message); setOcupado(false); }
  }
  async function entrar() {
    setErro(''); setOcupado(true);
    const c = cod.trim().toUpperCase();
    try {
      const r = await api<{ token: string; seat: 'A' | 'B' }>(`/api/salas/${c}/entrar`, { body: { nome: nomeJ, genero: genJ } });
      gravarSessao(c, r);
      router.push(`/sala/${c}`);
    } catch (e) { setErro((e as Error).message); setOcupado(false); }
  }

  return (
    <main>
      <h1>Verso</h1>
      <p className="mut">Livros-jogo de romance para duas pessoas. Cada uma no seu aparelho, escolhendo a mesma história.</p>
      {erro && <p role="alert" className="erro">{erro}</p>}
      {!livros && !erro && <p className="mut">Carregando biblioteca…</p>}
      {livros?.map((l) => (
        <button key={l.slug} className={`card ${slug === l.slug ? 'sel' : ''}`} style={{ display: 'block', width: '100%', borderRadius: 18 }} aria-pressed={slug === l.slug} onClick={() => setSlug(l.slug)}>
          <span className="chip">{SECAO[l.secao] ?? l.secao}</span>
          <h2>{l.titulo}</h2>
          {l.sinopse && <p className="mut sm">{l.sinopse}</p>}
          <span>{l.tropes.map((t) => <span className="chip" key={t}>{t}</span>)}</span>
        </button>
      ))}
      {livro?.personagens && (
        <section className="card">
          <h2>Seu personagem</h2>
          <div className="grid g2">
            {(['A', 'B'] as const).map((s) => (
              <button key={s} className={seat === s ? 'sel' : ''} style={{ borderRadius: 14 }} aria-pressed={seat === s} onClick={() => escolheSeat(s)}>
                <strong>{livro.personagens![s].papel}</strong><br />
                <span className="mut sm">{livro.personagens![s].idade} anos · {livro.personagens![s].origem}</span>
              </button>
            ))}
          </div>
          <label htmlFor="nome">Nome</label>
          <input id="nome" value={nome} maxLength={24} onChange={(e) => setNome(e.target.value)} />
          <label htmlFor="gen">Gênero</label>
          <select id="gen" value={gen} onChange={(e) => setGen(e.target.value as 'ele' | 'ela')}>
            <option value="ela">Ela</option><option value="ele">Ele</option>
          </select>
          <div className="row" style={{ marginTop: 14 }}>
            <button className="pri" disabled={ocupado || !nome.trim()} onClick={() => criar('dupla')}>Jogar a dois</button>
            <button disabled={ocupado || !nome.trim()} onClick={() => criar('solo')}>Jogar solo</button>
          </div>
        </section>
      )}
      <section className="card">
        <h2>Entrar numa sala</h2>
        <label htmlFor="cod">Código de 5 letras</label>
        <input id="cod" value={cod} maxLength={5} autoCapitalize="characters" onChange={(e) => setCod(e.target.value.toUpperCase())} />
        <label htmlFor="nj">Nome do seu personagem</label>
        <input id="nj" value={nomeJ} maxLength={24} onChange={(e) => setNomeJ(e.target.value)} />
        <label htmlFor="gj">Gênero</label>
        <select id="gj" value={genJ} onChange={(e) => setGenJ(e.target.value as 'ele' | 'ela')}><option value="ela">Ela</option><option value="ele">Ele</option></select>
        <div className="row" style={{ marginTop: 14 }}><button className="pri" disabled={ocupado || cod.trim().length < 5 || !nomeJ.trim()} onClick={entrar}>Entrar</button></div>
      </section>
    </main>
  );
}
