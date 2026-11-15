'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Capa from '../../../components/Capa';
import { IcVolta } from '../../../components/Icones';
import { ErroCliente, api, gravarSessao } from '../../../lib/cliente';

interface Pers { papel: string; nomePadrao: string; generoPadrao: 'ele' | 'ela'; idade: number; origem?: string }
interface Livro { slug: string; titulo: string; secao: string; tropes: string[]; sinopse?: string; serie?: string; tema?: { a: string; b: string; destaque: string }; capitulos: number; personagens?: { A: Pers; B: Pers } }

export default function Detalhe({ slug }: { slug: string }) {
  const router = useRouter();
  const [livro, setLivro] = useState<Livro | null | undefined>(undefined);
  const [seat, setSeat] = useState<'A' | 'B'>('A');
  const [nome, setNome] = useState('');
  const [gen, setGen] = useState<'ele' | 'ela'>('ela');
  const [erro, setErro] = useState('');
  const [ocupado, setOcupado] = useState(false);

  useEffect(() => {
    api<Livro[]>('/api/livros').then((l) => { const x = l.find((y) => y.slug === slug) ?? null; setLivro(x); if (x?.personagens) { setNome(x.personagens.A.nomePadrao); setGen(x.personagens.A.generoPadrao); } }).catch((e: ErroCliente) => { setErro(e.message); setLivro(null); });
  }, [slug]);
  const escolhe = (s: 'A' | 'B') => { setSeat(s); const p = livro?.personagens?.[s]; if (p) { setNome(p.nomePadrao); setGen(p.generoPadrao); } };
  async function criar(modo: 'dupla' | 'solo') {
    setErro(''); setOcupado(true);
    try {
      const r = await api<{ codigo: string; token: string; seat: 'A' | 'B' }>('/api/salas', { body: { slug, modo, nome, genero: gen, seat } });
      gravarSessao(r.codigo, { token: r.token, seat: r.seat });
      router.push(`/sala/${r.codigo}`);
    } catch (e) { setErro((e as Error).message); setOcupado(false); }
  }
  if (livro === undefined) return <main><p className="mut">Carregando…</p></main>;
  if (!livro) return <main><p role="alert" className="erro">{erro || 'Esse livro não está disponível.'}</p><Link className="btn" href="/">Voltar</Link></main>;
  return (
    <main>
      <div className="leitor-topo"><Link href="/" className="btn icb" aria-label="Voltar"><IcVolta /></Link><div className="tt"><strong>{livro.titulo}</strong><span>{livro.serie}</span></div></div>
      <div className="row" style={{ alignItems: 'flex-start', gap: 18, flexWrap: 'nowrap' }}>
        <div style={{ width: 130, flex: 'none' }}><Capa c={{ titulo: livro.titulo, serie: livro.serie, tema: livro.tema, slug: livro.slug }} tamanho="m" /></div>
        <div>
          <p className="sm" style={{ lineHeight: 1.55 }}>{livro.sinopse}</p>
          <div>{livro.tropes.map((t) => <span className="chip" key={t}>{t}</span>)}</div>
          <p className="sm mut">{livro.capitulos} capítulos · dois jogadores, cada um no seu aparelho</p>
        </div>
      </div>
      {livro.personagens && (
        <section className="card">
          <h2>Quem você vai ser</h2>
          <div className="grid g2">
            {(['A', 'B'] as const).map((s) => (
              <button key={s} className={seat === s ? 'sel' : ''} style={{ borderRadius: 18, flexDirection: 'column', alignItems: 'flex-start', textAlign: 'left' }} aria-pressed={seat === s} onClick={() => escolhe(s)}>
                <strong>{livro.personagens![s].papel}</strong>
                <span className="mut sm">{livro.personagens![s].idade} anos · {livro.personagens![s].origem}</span>
              </button>
            ))}
          </div>
          <label htmlFor="nome">Nome do personagem</label>
          <input id="nome" value={nome} maxLength={24} onChange={(e) => setNome(e.target.value)} />
          <label htmlFor="gen">Gênero</label>
          <select id="gen" value={gen} onChange={(e) => setGen(e.target.value as 'ele' | 'ela')}><option value="ela">Ela</option><option value="ele">Ele</option></select>
          {erro && <p role="alert" className="erro sm" style={{ marginTop: 10 }}>{erro}</p>}
          <div className="row" style={{ marginTop: 16 }}>
            <button className="pri" style={{ flex: 1 }} disabled={ocupado || !nome.trim()} onClick={() => criar('dupla')}>Jogar a dois</button>
            <button style={{ flex: 1 }} disabled={ocupado || !nome.trim()} onClick={() => criar('solo')}>Jogar solo</button>
          </div>
        </section>
      )}
    </main>
  );
}
