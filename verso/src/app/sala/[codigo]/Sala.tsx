'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import { IcBandeira, IcDiario, IcLista, IcVolta } from '../../../components/Icones';
import { ErroCliente, type Sessao, api, gravarSessao, lerSessao, partes } from '../../../lib/cliente';

interface Visao {
  tipo: string; cap: number; lugar?: string; hora?: string; texto: string; prompt?: string;
  registro: { k: string; seat: 'A' | 'B'; texto: string }[];
  opcoes: { id: string; texto: string; tom?: string }[];
  aguardando: string | null; votoDoOutro?: { id: string; texto: string }; fim: boolean;
}
interface Ficha {
  eu: { nome: string; papel: string; idade: number; origem?: string; ferida?: string } | null;
  par: { nome: string; papel: string; idade: number; origem?: string } | null;
  fatos: string[]; vinculo: number; fa: number; nervosismo: number; pistas: string[];
}
interface Estado {
  codigo: string; titulo: string; serie?: string; capsTotal: number; modo: 'dupla' | 'solo'; status: 'lobby' | 'jogando' | 'fim'; rev: number;
  eu: { seat: 'A' | 'B'; nome: string; genero: string; criador: boolean };
  par: { nome: string; genero: string; ia: boolean } | null;
  ficha: Ficha; visao: Visao | null; diario: number; final?: string; semMudanca?: boolean;
}
const TOM: Record<string, string> = { abre: 'abre', seco: 'seco', flerte: 'flerte', cuida: 'cuida', fere: 'fere' };

function Texto({ t, className }: { t: string; className?: string }) {
  return (
    <div className={className}>
      {partes(t).map((p, i) => (
        <p key={i} className={p.fala ? 'fala' : ''}>{p.trechos.map((x, j) => (x.em ? <em key={j}>{x.t}</em> : <span key={j}>{x.t}</span>))}</p>
      ))}
    </div>
  );
}

export default function Sala({ codigo }: { codigo: string }) {
  const [sessao, setSessao] = useState<Sessao | null | undefined>(undefined);
  const [st, setSt] = useState<Estado | null>(null);
  const [erro, setErro] = useState('');
  const [ocupado, setOcupado] = useState(false);
  const [painel, setPainel] = useState<'ficha' | 'diario' | 'relato' | null>(null);
  const [diario, setDiario] = useState<{ cap: number; lugar?: string; hora?: string; texto: string }[]>([]);
  const [relato, setRelato] = useState('');
  const [relatoOk, setRelatoOk] = useState(false);
  const [fs, setFs] = useState(18);
  const [tema, setTema] = useState<'escuro' | 'claro'>('escuro');
  const [nomeJ, setNomeJ] = useState('');
  const [genJ, setGenJ] = useState<'ele' | 'ela'>('ela');
  const rev = useRef<number>(-1);
  const dlg = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    setSessao(lerSessao(codigo));
    try {
      const f = Number(localStorage.getItem('verso:fs')); if (f >= 14 && f <= 28) setFs(f);
      if (localStorage.getItem('verso:tema') === 'claro') setTema('claro');
    } catch { /* sem armazenamento: usa o padrão */ }
  }, [codigo]);
  useEffect(() => {
    document.documentElement.style.setProperty('--fs', `${fs}px`);
    document.documentElement.dataset.tema = tema;
    try { localStorage.setItem('verso:fs', String(fs)); localStorage.setItem('verso:tema', tema); } catch { /* ok */ }
  }, [fs, tema]);

  const buscar = useCallback(async (forca = false) => {
    if (!sessao) return;
    try {
      const r = await api<Estado>(`/api/salas/${codigo}?rev=${forca ? -1 : rev.current}`, { token: sessao.token });
      setErro('');
      if (r.semMudanca) return;
      rev.current = r.rev;
      setSt(r);
    } catch (e) {
      const ec = e as ErroCliente;
      setErro(ec.message);
    }
  }, [codigo, sessao]);

  useEffect(() => {
    if (!sessao) return;
    buscar(true);
    const t = setInterval(() => buscar(), 1200);
    const vis = () => { if (document.visibilityState === 'visible') buscar(true); }; // ao voltar/reconectar, relê tudo
    document.addEventListener('visibilitychange', vis);
    window.addEventListener('online', vis);
    return () => { clearInterval(t); document.removeEventListener('visibilitychange', vis); window.removeEventListener('online', vis); };
  }, [sessao, buscar]);

  useEffect(() => {
    const d = dlg.current;
    if (!d) return;
    if (painel && !d.open) d.showModal();
    if (!painel && d.open) d.close();
  }, [painel]);

  async function abrirDiario() {
    setPainel('diario');
    if (!sessao) return;
    try { const r = await api<{ entradas: typeof diario }>(`/api/salas/${codigo}/diario`, { token: sessao.token }); setDiario(r.entradas); } catch (e) { setErro((e as Error).message); }
  }
  async function enviar(corpo: { tipo: string; id?: string }) {
    if (!sessao || ocupado) return;
    setOcupado(true);
    try { await api(`/api/salas/${codigo}/acao`, { token: sessao.token, body: { ...corpo, rev: rev.current } }); setErro(''); }
    catch (e) { setErro((e as Error).message); }
    await buscar(true);
    setOcupado(false);
  }
  async function comecar() {
    if (!sessao) return;
    setOcupado(true);
    try { await api(`/api/salas/${codigo}/comecar`, { token: sessao.token, method: 'POST', body: {} }); setErro(''); } catch (e) { setErro((e as Error).message); }
    await buscar(true); setOcupado(false);
  }
  async function entrar() {
    setOcupado(true);
    try {
      const r = await api<Sessao>(`/api/salas/${codigo}/entrar`, { body: { nome: nomeJ, genero: genJ } });
      gravarSessao(codigo, r); setSessao(r); setErro('');
    } catch (e) { setErro((e as Error).message); }
    setOcupado(false);
  }
  async function enviarRelato() {
    if (!sessao) return;
    try { await api(`/api/salas/${codigo}/relato`, { token: sessao.token, body: { texto: relato } }); setRelato(''); setRelatoOk(true); } catch (e) { setErro((e as Error).message); }
  }

  if (sessao === undefined) return <main><p className="mut">Carregando…</p></main>;
  if (sessao === null)
    return (
      <main>
        <h1>Entrar na sala {codigo}</h1>
        <p className="mut">Escolha o nome e o gênero do seu personagem.</p>
        {erro && <p role="alert" className="erro">{erro}</p>}
        <section className="card">
          <label htmlFor="nj">Nome</label><input id="nj" value={nomeJ} maxLength={24} onChange={(e) => setNomeJ(e.target.value)} />
          <label htmlFor="gj">Gênero</label>
          <select id="gj" value={genJ} onChange={(e) => setGenJ(e.target.value as 'ele' | 'ela')}><option value="ela">Ela</option><option value="ele">Ele</option></select>
          <div className="row" style={{ marginTop: 14 }}><button className="pri" disabled={ocupado || !nomeJ.trim()} onClick={entrar}>Entrar</button><a className="btn" href="/">Voltar</a></div>
        </section>
      </main>
    );
  if (!st) return <main><p className="mut">{erro || 'Conectando…'}</p>{erro && <a href="/">Voltar ao início</a>}</main>;

  const v = st.visao;
  const link = typeof window !== 'undefined' ? `${window.location.origin}/sala/${codigo}` : '';
  return (
    <main className="leitor">
      <header className="leitor-topo">
        <a href="/" className="btn icb" aria-label="Voltar ao início"><IcVolta /></a>
        <div className="tt">
          <strong>{st.titulo}</strong>
          <span>{st.serie ?? (st.modo === 'solo' ? 'Jogo solo' : 'A dois')}</span>
        </div>
      </header>
      {erro && <p role="alert" className="erro sm">{erro}</p>}

      {st.status === 'lobby' && (
        <section className="card">
          <h2>Sala de espera</h2>
          <p className="mut">Mande o código ou o link para a outra pessoa.</p>
          <div className="cod" aria-label={`Código ${codigo.split('').join(' ')}`}>{codigo}</div>
          <p className="sm mut" style={{ wordBreak: 'break-all', textAlign: 'center' }}>{link}</p>
          <div className="row" style={{ justifyContent: 'center' }}>
            <button onClick={() => navigator.clipboard?.writeText(link)}>Copiar link</button>
          </div>
          <h3 style={{ marginTop: 16 }}>Quem está aqui</h3>
          <p>{st.eu.nome} <span className="chip">você</span></p>
          <p>{st.par ? <>{st.par.nome} {st.par.ia && <span className="chip">IA</span>}</> : <span className="mut">Esperando a outra pessoa entrar…</span>}</p>
          {st.eu.criador
            ? <button className="pri" style={{ width: '100%' }} disabled={ocupado || !st.par} onClick={comecar}>Começar</button>
            : <p className="espera">Esperando quem criou a sala começar…</p>}
        </section>
      )}

      {st.status !== 'lobby' && v && (
        <>
          <div className="cartao cena" key={`${v.cap}-${v.texto.slice(0, 20)}`}>
            <h2 className="cap-tit">Capítulo {v.cap}</h2>
            <p className="cap-sub">{[v.lugar, v.hora].filter(Boolean).join(' · ')}</p>
            <div className="leitura"><Texto t={v.texto} /></div>
            {v.registro.length > 0 && (
              <div className="reg leitura">
                {v.registro.map((r, i) => (
                  r.k === 'esc'
                    ? <p key={i} className="esc sm">▸ {r.seat === st.eu.seat ? 'Você escolheu' : 'Escolhido pelo outro'}: {r.texto}</p>
                    : <Texto key={i} t={r.texto} className={r.k === 'fala' ? 'fala' : ''} />
                ))}
              </div>
            )}
          </div>
          <div className="progresso" aria-label={`Capítulo ${v.cap} de ${st.capsTotal}`}>
            <div className="barra"><i style={{ width: `${Math.min(100, (v.cap / st.capsTotal) * 100)}%` }} /></div>
            <span>{v.cap}/{st.capsTotal}</span>
          </div>
          {st.status === 'fim' ? (
            <section className="card">
              <h2>Fim</h2>
              <Texto t={st.final ?? ''} />
              <div className="row"><a className="btn" href={`/api/salas/${codigo}/exportar?token=${encodeURIComponent(sessao.token)}`}>Baixar a história (Markdown)</a><a className="btn" href="/">Outra história</a></div>
            </section>
          ) : (
            <>
              {v.prompt && <p className="mut"><em>{v.prompt}</em></p>}
              {v.votoDoOutro && <p className="mut sm">O outro jogador escolheu: “{v.votoDoOutro.texto}”. Só vale se você escolher o mesmo.</p>}
              <div className="opcoes" role="group" aria-label="Suas escolhas" data-tipo={v.tipo}>
                {v.opcoes.map((o) => (
                  <button key={o.id} data-opcao={o.id} disabled={ocupado}
                    onClick={() => enviar(v.tipo === 'consentimento' ? { tipo: 'voto', id: o.id } : o.id === 'continuar' ? { tipo: 'continuar' } : { tipo: 'opcao', id: o.id })}>
                    {o.tom && <span className="chip">{TOM[o.tom] ?? o.tom}</span>}{o.texto}
                  </button>
                ))}
              </div>
              {v.aguardando && <p className="espera" aria-live="polite">{v.aguardando}</p>}
            </>
          )}
        </>
      )}

      <div className="controles" role="toolbar" aria-label="Menu da leitura">
        <button aria-label="Ficha do personagem" onClick={() => setPainel('ficha')}><IcLista /><span>Ficha</span></button>
        <button aria-label="Resumo do que aconteceu" onClick={abrirDiario}><IcDiario /><span>Resumo</span></button>
        <button aria-label="Reportar problema nesta cena" onClick={() => { setRelatoOk(false); setPainel('relato'); }}><IcBandeira /><span>Reportar</span></button>
      </div>

      <dialog ref={dlg} onClose={() => setPainel(null)} aria-label="Painel">
        <div className="topo"><h2>{painel === 'ficha' ? 'Ficha' : painel === 'diario' ? 'O que aconteceu até agora' : 'Reportar problema'}</h2><button onClick={() => setPainel(null)}>Fechar</button></div>
        {painel === 'ficha' && (
          <div className="leitor">
            <h3>{st.ficha.eu?.nome} <span className="chip">você</span></h3>
            <p className="mut sm">{st.ficha.eu?.papel} · {st.ficha.eu?.idade} anos · {st.ficha.eu?.origem}</p>
            {st.ficha.eu?.ferida && <p className="sm"><strong>O que você teme:</strong> {st.ficha.eu.ferida}</p>}
            <h3>{st.ficha.par?.nome}</h3>
            <p className="mut sm">{st.ficha.par?.papel} · {st.ficha.par?.idade} anos · {st.ficha.par?.origem}</p>
            <h3>Quem é quem</h3>
            <ul className="sm">{st.ficha.fatos.map((f, i) => <li key={i}>{f}</li>)}</ul>
            <h3>Vocês</h3>
            <p className="sm">Vínculo {st.ficha.vinculo}/10</p><div className="barra"><i style={{ width: `${st.ficha.vinculo * 10}%` }} /></div>
            <p className="sm">Faísca {st.ficha.fa}/5</p><div className="barra"><i style={{ width: `${st.ficha.fa * 20}%` }} /></div>
            <p className="sm">Seu nervosismo {st.ficha.nervosismo}/6</p><div className="barra"><i style={{ width: `${(st.ficha.nervosismo / 6) * 100}%` }} /></div>
            <h3>Leitura</h3>
            <div className="row"><button onClick={() => setFs((x) => Math.max(14, x - 2))} aria-label="Diminuir letra">A−</button><button onClick={() => setFs((x) => Math.min(28, x + 2))} aria-label="Aumentar letra">A+</button><button onClick={() => setTema((t) => (t === 'escuro' ? 'claro' : 'escuro'))}>Tema {tema === 'escuro' ? 'claro' : 'escuro'}</button></div>
          </div>
        )}
        {painel === 'diario' && (
          <div className="leitor">
            <p className="mut sm">Só o que o seu personagem viveu ou soube.</p>
            {diario.length === 0 && <p className="mut">Ainda não aconteceu nada.</p>}
            {diario.map((e, i) => <div key={i} className="card"><p className="mut sm">{[e.cap < 99 ? `Cap. ${e.cap}` : 'Final', e.lugar, e.hora].filter(Boolean).join(' · ')}</p><Texto t={e.texto} /></div>)}
          </div>
        )}
        {painel === 'relato' && (
          <div>
            <p className="mut sm">Conte o que estava errado nesta cena. Isso chega para quem cuida do livro.</p>
            <label htmlFor="rel">O que aconteceu?</label>
            <input id="rel" value={relato} maxLength={2000} onChange={(e) => setRelato(e.target.value)} />
            <div className="row" style={{ marginTop: 12 }}><button className="pri" disabled={relato.trim().length < 3} onClick={enviarRelato}>Enviar</button></div>
            {relatoOk && <p role="status">Obrigado, recebemos.</p>}
          </div>
        )}
      </dialog>
    </main>
  );
}
