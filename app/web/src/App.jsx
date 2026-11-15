import { useEffect, useMemo, useState } from 'react'
import { supabase, configured } from './lib/supabase.js'
import { useGroupData } from './data.js'
import { itensEfetivos, entradasValidas, sequencia, REGRAS_PADRAO } from './lib/scoring.js'
import { addDays } from './lib/week.js'
import { Icon, Toasts, FlameDefs, Celebration } from './ui.jsx'
import { Splash, Login, Setup } from './screens/Auth.jsx'
import { Onboarding } from './screens/Onboarding.jsx'
import { Promessa } from './screens/Promessa.jsx'
import { Home, Ranking, Feed, Progresso, Grupo } from './screens/Main.jsx'
import { Catalogo, Registro } from './screens/Sheets.jsx'

export default function App() {
  if (!configured) return <><Setup /><Toasts /></>
  return <Autenticado />
}

function Autenticado() {
  const [session, setSession] = useState(undefined)
  const [tela, setTela] = useState('splash')
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session))
    const { data } = supabase.auth.onAuthStateChange((_e, s) => setSession(s))
    return () => data.subscription.unsubscribe()
  }, [])
  if (session === undefined) return <div className="loading">Carregando...</div>
  if (!session) return <>{tela === 'splash' ? <Splash onStart={() => setTela('login')} /> : <Login onBack={() => setTela('splash')} />}<Toasts /></>
  return <><FlameDefs /><Logado session={session} /><Celebration /><Toasts /></>
}

// junta os dados carregados em funções práticas para as telas
function useCtx(state, reload) {
  return useMemo(() => {
    if (state.status !== 'ready') return null
    const { uid, group, w, entries, comments, reactions, flags, promessas, minimos } = state
    const regras = { ...REGRAS_PADRAO, ...Object.fromEntries(['base_min', 'base_max', 'multa', 'bonus', 'flags_para_cair'].map((k) => [k, Number(group[k])])) }
    const count = (arr) => arr.reduce((m, x) => ((m[x.entry_id] = (m[x.entry_id] || 0) + 1), m), {})
    const flagsPor = count(flags)
    const likesPor = count(reactions)
    const commentsPor = comments.reduce((m, c) => ((m[c.entry_id] ||= []).push(c), m), {})
    const promessaDe = (user, week) => (promessas.find((p) => p.user_id === user && p.week_start === week)?.promise_items || [])
      .map(({ habit_id, modo, unidade, meta, teto_dia }) => ({ habit_id, modo, unidade, meta: Number(meta), teto_dia: teto_dia == null ? null : Number(teto_dia) }))
    const mins = minimos.map((m) => ({ ...m, meta: Number(m.meta), teto_dia: m.teto_dia == null ? null : Number(m.teto_dia) }))
    const diasPor = entries.reduce((m, e) => ((m[e.user_id] ||= new Set()).add(e.dia), m), {})
    const atual = state.historico[state.historico.length - 1]?.placar || []
    return {
      ...state, minimos: mins, regras, flagsPor, likesPor, commentsPor, reload,
      meuLike: new Set(reactions.filter((r) => r.user_id === uid).map((r) => r.entry_id)),
      meuFlag: new Set(flags.filter((f) => f.user_id === uid).map((f) => f.entry_id)),
      promessaDe,
      itensMeus: (week) => itensEfetivos(promessaDe(uid, week), mins),
      validas: (week) => entradasValidas(entries.filter((e) => e.week_start === week), flagsPor, regras),
      streak: (user) => sequencia([...(diasPor[user] || [])], w.today, addDays),
      postsHoje: (user) => entries.filter((e) => e.user_id === user && e.dia === w.today).length,
      placarAtual: () => atual,
    }
  }, [state, reload])
}

const TABS = [['home', 'Início', 'home'], ['promessa', 'Promessa', 'doc'], ['rank', 'Ranking', 'star'], ['feed', 'Comunidade', 'group']]

function Logado({ session }) {
  const [state, reload] = useGroupData(session)
  const ctx = useCtx(state, reload)
  const [tab, setTab] = useState('home')
  const [sub, setSub] = useState(null)
  const [sheet, setSheet] = useState(null)
  const [promKey, setPromKey] = useState(0)

  if (state.status === 'loading') return <div className="loading">Carregando...</div>
  if (state.status === 'error') return (
    <div className="setup pad"><h2 style={{ color: 'var(--lime)' }}>Não deu para carregar</h2><p>{state.message}</p>
      <button className="btn lime" onClick={reload}>Tentar de novo</button><button className="btn dark" onClick={() => supabase.auth.signOut()}>Sair</button></div>
  )
  if (state.status === 'onboarding') return <Onboarding uid={session.user.id} perfil={state.perfil} onDone={reload} onSignOut={() => supabase.auth.signOut()} />

  const go = (destino, extra) => {
    if (destino === 'registrar') return setSheet({ tipo: 'reg', habit: extra })
    if (destino === 'catalogo') return setSheet({ tipo: 'cat', cat: extra })
    if (destino === 'progresso' || destino === 'grupo') { setSub(destino); window.scrollTo(0, 0); return }
    if (destino === 'promessa-next') { setTab('promessa'); setSub(null); setPromKey((k) => k + 1); return }
    setTab(destino); setSub(null); window.scrollTo(0, 0)
  }
  const acoes = <>
    <button aria-label="Catálogo de hábitos" onClick={() => go('catalogo')}><Icon name="search" /></button>
    <button aria-label="Progresso" onClick={() => go('progresso')}><Icon name="bell" /></button>
    <button aria-label="Grupo e perfil" onClick={() => go('grupo')}><Icon name="user" /></button>
  </>
  const voltar = () => setSub(null)
  let view
  if (sub === 'progresso') view = <Progresso ctx={ctx} acoes={acoes} onBack={voltar} />
  else if (sub === 'grupo') view = <Grupo ctx={ctx} acoes={acoes} onBack={voltar} />
  else if (tab === 'home') view = <Home ctx={ctx} acoes={acoes} go={go} />
  else if (tab === 'promessa') view = <Promessa key={promKey} inicial={promKey > 0 ? 'next' : 'cur'} ctx={ctx} acoes={acoes} onRegistrar={(h) => go('registrar', h)} />
  else if (tab === 'rank') view = <Ranking ctx={ctx} acoes={acoes} />
  else view = <Feed ctx={ctx} acoes={acoes} />

  return (
    <div className="app">
      {view}
      {!sub && <button className="fab" onClick={() => go('registrar')}><Icon name="plus" />Registrar</button>}
      <nav className="nav" aria-label="Seções"><div className="nav-in" role="tablist">
        {TABS.map(([k, l, i]) => <button key={k} role="tab" aria-selected={!sub && tab === k} onClick={() => go(k)}><Icon name={i} />{l}</button>)}
      </div></nav>
      {sheet?.tipo === 'reg' && <Registro ctx={ctx} inicial={sheet.habit} onClose={() => setSheet(null)} />}
      {sheet?.tipo === 'cat' && <Catalogo inicial={sheet.cat || 'Todas'} podeAdicionar={false} onClose={() => setSheet(null)} onPick={() => {}} />}
    </div>
  )
}
