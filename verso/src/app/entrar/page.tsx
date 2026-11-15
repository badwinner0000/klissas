'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { api, gravarSessao } from '../../lib/cliente';

export default function Entrar() {
  const router = useRouter();
  const [cod, setCod] = useState('');
  const [nome, setNome] = useState('');
  const [gen, setGen] = useState<'ele' | 'ela'>('ela');
  const [erro, setErro] = useState('');
  const [ocupado, setOcupado] = useState(false);
  async function entrar() {
    setErro(''); setOcupado(true);
    const c = cod.trim().toUpperCase();
    try {
      const r = await api<{ token: string; seat: 'A' | 'B' }>(`/api/salas/${c}/entrar`, { body: { nome, genero: gen } });
      gravarSessao(c, r);
      router.push(`/sala/${c}`);
    } catch (e) { setErro((e as Error).message); setOcupado(false); }
  }
  return (
    <main>
      <h1>Entrar numa sala</h1>
      <p className="mut">Peça o código de 5 letras para quem criou a partida.</p>
      <section className="card">
        <label htmlFor="cod">Código</label>
        <input id="cod" value={cod} maxLength={5} autoCapitalize="characters" autoComplete="off" onChange={(e) => setCod(e.target.value.toUpperCase())} />
        <label htmlFor="nj">Nome do seu personagem</label>
        <input id="nj" value={nome} maxLength={24} onChange={(e) => setNome(e.target.value)} />
        <label htmlFor="gj">Gênero</label>
        <select id="gj" value={gen} onChange={(e) => setGen(e.target.value as 'ele' | 'ela')}><option value="ela">Ela</option><option value="ele">Ele</option></select>
        {erro && <p role="alert" className="erro sm" style={{ marginTop: 10 }}>{erro}</p>}
        <div className="row" style={{ marginTop: 16 }}><button className="pri" style={{ width: '100%' }} disabled={ocupado || cod.trim().length < 5 || !nome.trim()} onClick={entrar}>Entrar</button></div>
      </section>
    </main>
  );
}
