import { useState } from 'react'
import { H, artDe, itemDe } from '../lib/catalog.js'
import { realizado, pontosItem } from '../lib/scoring.js'
import { fmtDia, quando, addDays } from '../lib/week.js'
import { Header, Icon, Avatar, Art, COLORS, fmt, sinal, dias, toast, Flame, CountUp } from '../ui.jsx'
import { alternar, comentar, apagarRegistro, atualizarGrupo, salvarMinimo, removerMinimo, salvarPerfil } from '../data.js'
import { Catalogo, Meta } from './Sheets.jsx'
import { supabase } from '../lib/supabase.js'

function LinhaJogador({ p, i, ctx, valor }) {
  return (
    <div className={`prow ${p.user_id === ctx.uid ? 'me' : ''}`}>
      <span className={`dot ${i === 0 ? 'lime' : ''}`}>{i + 1}º</span>
      <Avatar nome={p.nome} cor={p.cor} size={34} />
      <div className="tx"><b>{p.nome}{p.user_id === ctx.uid ? ' (você)' : ''}</b>
        <small><Icon name="flame" size={13} />{ctx.streak(p.user_id) > 0 ? dias(ctx.streak(p.user_id)) : 'sem sequência'}{p.tem_promessa === false ? ' · só mínimos' : ''}</small></div>
      <div className="rt">{valor ?? p.pontos} pts<small>{ctx.postsHoje(p.user_id) === 1 ? '1 post hoje' : `${ctx.postsHoje(p.user_id)} posts hoje`}</small></div>
    </div>
  )
}

export function Home({ ctx, acoes, go }) {
  const itens = ctx.itensMeus(ctx.w.cur)
  const minhas = ctx.validas(ctx.w.cur).filter((e) => e.user_id === ctx.uid)
  const r = ctx.placarAtual()
  return (
    <div className="screen enter">
      <Header title={<div className="hello"><h1 style={{ color: 'var(--purple)' }}>Olá, {ctx.perfil.nome}</h1><p>{ctx.w.diasParaFechar === 0 ? 'Último dia da semana. Poste o que falta.' : `Faltam ${ctx.w.diasParaFechar} dias para fechar a semana.`}</p></div>} actions={acoes} />
      <div className="quick pad">
        <button onClick={() => go('promessa')}><Icon name="dumbbell" /><span>Promessa</span></button>
        <button onClick={() => go('progresso')}><Icon name="chart" /><span>Progresso</span></button>
        <button onClick={() => go('catalogo', 'Alimentação saudável')}><Icon name="apple" /><span>Nutrição</span></button>
        <button onClick={() => go('feed')}><Icon name="group" /><span>Comunidade</span></button>
      </div>
      <Sequencia ctx={ctx} />
      <div className="sec pad">
        <div className="sec-h"><h2>Sua promessa</h2><button className="sec-h" style={{ fontSize: 12 }} onClick={() => go('promessa')}>Ver tudo ›</button></div>
        {itens.length ? (
          <div className="grid2">{itens.slice(0, 4).map((it) => {
            const h = H[it.habit_id], [a, g] = artDe(h.categoria), feito = realizado(it, minhas), over = it.modo === 'max' && feito > it.meta
            return (
              <button key={it.habit_id} className={`photo ${g}`} onClick={() => go('registrar', it.habit_id)} aria-label={`Registrar ${h.nome}`}>
                <Art name={a} /><span className="star"><Icon name="star" /></span>
                <span className="cap"><b>{h.nome}</b><small><span>{fmt(feito)}/{fmt(it.meta)} {h.unidade}</span><span>{over ? 'acima do limite' : `${sinal(Math.round(pontosItem(it, feito, ctx.regras)))} pts`}</span></small></span>
              </button>
            )
          })}</div>
        ) : <div className="card-out">Você ainda não tem promessa para esta semana. Monte a da próxima em Promessa.</div>}
      </div>
      <div className="band pad" style={{ marginTop: 14 }}>
        <div className="challenge">
          <div className="l"><b>Semana {ctx.w.numero(ctx.w.cur)}</b><small>Promessa da próxima semana trava domingo, {ctx.w.prazo.replace(':', 'h')}</small>
            <button className="chip lime" style={{ alignSelf: 'flex-start', marginTop: 6 }} onClick={() => go('promessa-next')}>Montar próxima semana</button></div>
          <div className={`photo g-a`}><Art name="flame" /></div>
        </div>
      </div>
      <div className="sec pad">
        <div className="sec-h"><h2>Ranking da semana</h2><button style={{ fontSize: 12 }} onClick={() => go('rank')}>Ver tudo ›</button></div>
        <div className="rows">{r.slice(0, 3).map((p, i) => <LinhaJogador key={p.user_id} p={p} i={i} ctx={ctx} />)}</div>
      </div>
      <div className="spacer" />
    </div>
  )
}

const LETRAS = ['S', 'T', 'Q', 'Q', 'S', 'S', 'D']
function Sequencia({ ctx }) {
  const s = ctx.streak(ctx.uid)
  const meus = new Set(ctx.entries.filter((e) => e.user_id === ctx.uid).map((e) => e.dia))
  const postouHoje = meus.has(ctx.w.today)
  return (
    <div className="band pad">
      <div className="streak">
        <Flame size={46} lit={s > 0} />
        <div><span className="num"><CountUp value={s} /></span> <span className="lbl">{s === 1 ? 'dia seguido' : 'dias seguidos'}</span>
          <small>{postouHoje ? 'Fogo aceso hoje. Volte amanhã para manter.' : s > 0 ? 'Poste hoje para não apagar o fogo.' : 'Poste algo hoje para acender o fogo.'}</small></div>
      </div>
      <div className="weekstrip" aria-label="Dias desta semana com post">
        {LETRAS.map((l, i) => {
          const d = addDays(ctx.w.cur, i), lit = meus.has(d), fut = d > ctx.w.today
          return <div key={d} className={`d ${d === ctx.w.today ? 'today' : ''} ${fut ? 'future' : ''}`} aria-label={`${fmtDia(d)}: ${lit ? 'com post' : 'sem post'}`}>
            {l}<Flame size={16} lit={lit} delay={i * 0.13} /></div>
        })}
      </div>
    </div>
  )
}

export function Ranking({ ctx, acoes }) {
  const [aba, setAba] = useState('semana')
  const lista = aba === 'semana' ? ctx.placarAtual() : ctx.geral
  const me = lista.find((p) => p.user_id === ctx.uid)
  const pos = lista.findIndex((p) => p.user_id === ctx.uid) + 1
  const t3 = [lista[1], lista[0], lista[2]].filter(Boolean)
  const pote = Number(ctx.group.pote_por_pessoa) * ctx.membros.length
  return (
    <div className="screen enter">
      <Header title="Ranking" actions={acoes} />
      <div className="band pad"><div className="profile"><Avatar nome={ctx.perfil.nome} cor={ctx.perfil.cor} size={64} /><div className="who"><h2>{ctx.perfil.nome}</h2>
        <div className="stats"><div className="stat"><i /><div><b>{pos || '-'}º</b><small>posição</small></div></div><div className="stat"><i /><div><b><CountUp value={me?.pontos ?? 0} /></b><small>pontos</small></div></div><div className="stat"><i /><div><b>{ctx.streak(ctx.uid)}</b><small>sequência</small></div></div></div></div></div></div>
      <div className="sec pad">
        <div className="pills"><button className="pill" aria-pressed={aba === 'semana'} onClick={() => setAba('semana')}>Semana {ctx.w.numero(ctx.w.cur)}</button><button className="pill" aria-pressed={aba === 'geral'} onClick={() => setAba('geral')}>Geral</button></div>
        {t3.length >= 3 && <div className="pod">{t3.map((p, i) => (
          <div key={p.user_id} className={`p ${i === 1 ? 'first' : ''}`}><Avatar nome={p.nome} cor={p.cor} size={i === 1 ? 52 : 42} /><div className="nm">{p.nome}</div><div className="pt"><CountUp value={p.pontos} /></div><div className="ps">{i === 1 ? '1º' : i === 0 ? '2º' : '3º'} lugar</div></div>
        ))}</div>}
        <div className="rows">{lista.map((p, i) => <LinhaJogador key={p.user_id} p={p} i={i} ctx={ctx} />)}</div>
        {pote > 0 && <div className="pot"><div><small>Pote</small><br /><b>R$ {fmt(pote)}</b></div><small style={{ textAlign: 'right' }}>{ctx.membros.length} jogadores · R$ {fmt(ctx.group.pote_por_pessoa)} cada<br />o app só mostra; o dinheiro fica com vocês</small></div>}
        <p className="note">O ranking atualiza quando alguém posta. Posts com {ctx.regras.flags_para_cair} contestações não contam.</p>
      </div>
      <div className="spacer" />
    </div>
  )
}

export function Feed({ ctx, acoes }) {
  const [filtro, setFiltro] = useState('todos')
  const [texto, setTexto] = useState({})
  let posts = ctx.entries.filter((e) => e.week_start >= addDays(ctx.w.cur, -7))
  if (filtro === 'fotos') posts = posts.filter((e) => e.foto_path)
  if (filtro === 'contestados') posts = posts.filter((e) => ctx.flagsPor[e.id])
  const nome = (id) => ctx.membros.find((m) => m.user_id === id) || { nome: '?', cor: 0 }
  const run = async (f) => { try { await f(); ctx.reload() } catch (e) { toast(e.message) } }
  return (
    <div className="screen enter">
      <Header title="Comunidade" actions={acoes} />
      <div className="sec pad">
        <div className="pills">{[['todos', 'Feed'], ['fotos', 'Fotos'], ['contestados', 'Contestados']].map(([k, l]) => <button key={k} className="pill" aria-pressed={filtro === k} onClick={() => setFiltro(k)}>{l}</button>)}</div>
        {!posts.length && <div className="card-out">Nenhum post ainda. Registre algo da sua promessa e apareça aqui.</div>}
        {posts.map((e) => {
          const a = nome(e.user_id), h = H[e.habit_id] || { nome: e.habit_id, unidade: '', categoria: '' }, [art, g] = artDe(h.categoria)
          const flags = ctx.flagsPor[e.id] || 0, caiu = flags >= ctx.regras.flags_para_cair
          const liked = ctx.meuLike.has(e.id), flagged = ctx.meuFlag.has(e.id), meu = e.user_id === ctx.uid
          const valor = `${fmt(e.quantidade)} ${h.unidade}`
          return (
            <article key={e.id} className="card-out post">
              <div className="post-h"><Avatar nome={a.nome} cor={a.cor} size={36} /><div><b>{a.nome}</b><small>{quando(e.created_at)} · {h.nome}{e.dia !== ctx.w.today ? ` · ${fmtDia(e.dia)}` : ''}</small></div><span className="fav"><Icon name="star" /></span></div>
              {e.texto && <p>{e.texto}</p>}
              {e.foto_path && ctx.urls[e.foto_path]
                ? <div className={`photo ${g}`}><img src={ctx.urls[e.foto_path]} alt={`Evidência de ${a.nome}: ${h.nome}`} loading="lazy" /><span className="tag">{valor}</span></div>
                : <span className="chip lime" style={{ alignSelf: 'flex-start' }}>{valor}{!e.foto_path ? ' · sem foto' : ''}</span>}
              {flags > 0 && <span className="chip bad" style={{ alignSelf: 'flex-start' }}>{caiu ? 'Derrubado: não conta pontos' : `${flags} de ${ctx.regras.flags_para_cair} contestações`}</span>}
              {(ctx.commentsPor[e.id] || []).map((c) => <div key={c.id} className="cmt"><b>{nome(c.user_id).nome}</b> {c.texto}</div>)}
              <form className="cmt-form" onSubmit={(ev) => { ev.preventDefault(); const t = (texto[e.id] || '').trim(); if (!t) return; run(() => comentar(e.id, ctx.uid, t)); setTexto({ ...texto, [e.id]: '' }) }}>
                <input type="text" maxLength={300} placeholder="Comentar..." value={texto[e.id] || ''} onChange={(ev) => setTexto({ ...texto, [e.id]: ev.target.value })} aria-label="Comentário" />
                <button className="btn sm white" type="submit">Enviar</button>
              </form>
              <div className="acts">
                <button aria-pressed={liked} onClick={() => run(() => alternar('reactions', e.id, ctx.uid, liked))}><Icon name="heart" />{ctx.likesPor[e.id] || 0}</button>
                <button><Icon name="chat" />{(ctx.commentsPor[e.id] || []).length}</button>
                {!meu && <button className="flag" aria-pressed={flagged} onClick={() => run(async () => { await alternar('flags', e.id, ctx.uid, flagged); toast(flagged ? 'Contestação retirada.' : `Contestação enviada. Com ${ctx.regras.flags_para_cair} o post para de contar.`) })}><Icon name="flag" />Contestar</button>}
                {meu && <button onClick={() => run(async () => { await apagarRegistro(e); toast('Post apagado.') })}><Icon name="trash" />Apagar</button>}
              </div>
            </article>
          )
        })}
      </div>
      <div className="spacer" />
    </div>
  )
}

export function Progresso({ ctx, acoes, onBack }) {
  const [aba, setAba] = useState('log')
  const hoje = ctx.w.today
  const ano = +hoje.slice(0, 4), mes = +hoje.slice(5, 7)
  const primeiro = `${hoje.slice(0, 7)}-01`
  const offset = (new Date(primeiro + 'T12:00:00Z').getUTCDay() + 6) % 7
  const nDias = new Date(Date.UTC(ano, mes, 0)).getUTCDate()
  const meus = ctx.entries.filter((e) => e.user_id === ctx.uid)
  const diasComPost = new Set(meus.map((e) => e.dia))
  const porDia = meus.reduce((m, e) => ((m[e.dia] = (m[e.dia] || 0) + 1), m), {})
  const NOMES = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']
  const hist = ctx.historico.map((s) => ({ s: `S${ctx.w.numero(s.semana)}`, p: s.placar.find((x) => x.user_id === ctx.uid)?.pontos ?? 0, pos: s.placar.findIndex((x) => x.user_id === ctx.uid) + 1 }))
  const total = ctx.geral.find((x) => x.user_id === ctx.uid)?.pontos ?? 0
  const W = 300, Hh = 170, bw = 22, top = Math.max(50, ...hist.map((h) => h.p)), step = (W - 40) / Math.max(1, hist.length)
  return (
    <div className="screen enter">
      <Header title="Progresso" onBack={onBack} actions={acoes} />
      <div className="band pad"><div className="profile"><Avatar nome={ctx.perfil.nome} cor={ctx.perfil.cor} size={60} /><div className="who"><h2>{ctx.perfil.nome}</h2>
        <div className="stats"><div className="stat"><i /><div><b><CountUp value={total} /></b><small>pontos totais</small></div></div><div className="stat"><i /><div><b>{ctx.streak(ctx.uid)}</b><small>dias seguidos</small></div></div></div></div></div></div>
      <div className="sec pad">
        <div className="pills"><button className="pill" aria-pressed={aba === 'log'} onClick={() => setAba('log')}>Registro</button><button className="pill" aria-pressed={aba === 'chart'} onClick={() => setAba('chart')}>Gráficos</button></div>
        {aba === 'log' ? <>
          <div className="sec-h"><h2 style={{ color: 'var(--white)', fontSize: 14 }}>{NOMES[mes - 1]} {ano}</h2><span>{(() => { const n = [...diasComPost].filter((d) => d.startsWith(hoje.slice(0, 7))).length; return n === 1 ? '1 dia com post' : `${n} dias com post` })()}</span></div>
          <div className="cal">
            <div className="cal-w">{['SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SÁB', 'DOM'].map((x) => <span key={x}>{x}</span>)}</div>
            <div className="cal-d">{Array.from({ length: offset }, (_, i) => <span key={'v' + i} />)}{Array.from({ length: nDias }, (_, i) => {
              const d = `${hoje.slice(0, 7)}-${String(i + 1).padStart(2, '0')}`
              const n = porDia[d] || 0
              return n ? <span key={d} className={`fire ${d === hoje ? 'today' : ''}`} title={`${n} post${n > 1 ? 's' : ''}`}><Flame size={n >= 3 ? 20 : n === 2 ? 17 : 14} delay={(i % 7) * 0.11} />{i + 1}</span>
                : <span key={d} className={d === hoje ? 'today' : ''}>{i + 1}</span>
            })}</div>
          </div>
          <div className="sec-h"><h2>Atividades</h2></div>
          <div className="rows">{meus.slice(0, 15).map((e) => {
            const h = H[e.habit_id] || { nome: e.habit_id, unidade: '', categoria: '' }
            return <div key={e.id} className="prow"><span className="dot"><Icon name={artDe(h.categoria)[0]} /></span><span className="tx"><b>{h.nome}</b><small>{fmtDia(e.dia)}</small></span><span className="rt">{fmt(e.quantidade)} {h.unidade}</span></div>
          })}{!meus.length && <p className="note">Nada registrado ainda.</p>}</div>
        </> : <>
          <div><div className="muted" style={{ fontSize: 12 }}>Meu progresso</div><h2 style={{ color: 'var(--lime)', fontSize: 22 }}>Pontos por semana</h2></div>
          <div className="chart"><svg viewBox={`0 0 ${W} ${Hh}`} width="100%" role="img" aria-label="Seus pontos nas últimas semanas">
            {[0, Math.round(top / 2), top].map((t) => <text key={t} x="30" y={10 + (Hh - 30) - (t / top) * (Hh - 30) + 4} textAnchor="end">{t}</text>)}
            {hist.map((h, i) => {
              const x = 40 + step * i + (step - bw) / 2, alt = (Math.max(0, h.p) / top) * (Hh - 30)
              return <g key={h.s}><rect x={x} y="10" width={bw} height={Hh - 30} rx="11" fill="#d9d9d9" /><rect x={x} y={10 + (Hh - 30) - alt} width={bw} height={alt} rx="11" fill={i === hist.length - 1 ? '#e2f163' : '#c9d94f'} /><text x={x + bw / 2} y={Hh - 2} textAnchor="middle">{h.s}</text></g>
            })}
          </svg></div>
          <div className="rows">{hist.slice().reverse().slice(0, 4).map((h) => <div key={h.s} className="strip"><div className="d"><small>Sem.</small><b>{h.s.slice(1)}</b></div><hr /><div className="v"><small>Pontos</small><b>{h.p}</b></div><div className="v"><small>Posição</small><b>{h.pos || '-'}º</b></div></div>)}</div>
        </>}
      </div>
      <div className="spacer" />
    </div>
  )
}

export function Grupo({ ctx, acoes, onBack }) {
  const g = ctx.group
  const admin = g.admin === ctx.uid
  const [f, setF] = useState({ prazo_hora: g.prazo_hora.slice(0, 5), base_min: g.base_min, base_max: g.base_max, multa: g.multa, bonus: g.bonus, flags_para_cair: g.flags_para_cair, carencia_horas: g.carencia_horas, pote_por_pessoa: g.pote_por_pessoa })
  const [perfil, setPerfil] = useState({ nome: ctx.perfil.nome, cor: ctx.perfil.cor })
  const [sheet, setSheet] = useState(null)
  const run = async (fn, msg) => { try { await fn(); toast(msg); ctx.reload() } catch (e) { toast(e.message) } }
  const copiar = async () => { try { await navigator.clipboard.writeText(g.codigo); toast('Código copiado.') } catch { toast(`Código: ${g.codigo}`) } }
  const num = (k, label) => <div className="field"><label htmlFor={'g-' + k}>{label}</label><input id={'g-' + k} type="number" min="0" value={f[k]} onChange={(e) => setF({ ...f, [k]: e.target.value })} /></div>
  return (
    <div className="screen enter">
      <Header title="Grupo" onBack={onBack} actions={acoes} />
      <div className="band pad"><div className="profile"><span className="av" style={{ background: 'var(--ink)', width: 60, height: 60, color: 'var(--lime)', fontStyle: 'italic', fontSize: 22 }}>TP</span>
        <div className="who"><h2 style={{ color: 'var(--ink)' }}>{g.nome}</h2><div className="stats" style={{ color: 'var(--ink)' }}><div className="stat"><i style={{ background: 'var(--ink)' }} /><div><b>{ctx.membros.length}</b><small>membros</small></div></div><div className="stat"><i style={{ background: 'var(--ink)' }} /><div><b>{ctx.w.numero(ctx.w.cur)}</b><small>semanas</small></div></div></div></div></div></div>
      <div className="sec pad">
        <div className="code-box"><div><small>Código para convidar</small><br /><b>{g.codigo}</b></div><button className="btn sm lime" onClick={copiar}>Copiar</button></div>
        <div className="sec-h"><h2>Regras</h2><span>{admin ? 'você é admin' : 'definidas pelo admin'}</span></div>
        <ul className="rules">
          <li>A promessa da semana trava no domingo, {g.prazo_hora.slice(0, 5).replace(':', 'h')}. Quem não montar fica com os mínimos do grupo.</li>
          <li>Meta mínima: até {g.base_min} pts, proporcional ao que foi postado. Sem post, zero.</li>
          <li>Limite máximo: {g.base_max} pts dentro do limite, −{g.multa} por unidade acima.</li>
          <li>Bateu a meta inteira: bônus de {g.bonus} pts.</li>
          <li>{g.flags_para_cair} contestações derrubam os pontos de um post.</li>
          <li>Dá para postar até {g.carencia_horas} h depois que a semana fecha.</li>
        </ul>
        <div className="sec-h"><h2>Mínimos do grupo</h2>{admin && <button className="btn sm lime" onClick={() => setSheet({ tipo: 'cat' })}>+ Adicionar</button>}</div>
        <div className="rows">{ctx.minimos.map((m) => {
          const h = H[m.habit_id]
          return <div key={m.habit_id} className="prow"><span className="dot lime"><Icon name={artDe(h?.categoria)[0]} /></span><span className="tx"><b>{h?.nome || m.habit_id}</b><small>{m.modo === 'max' ? 'limite' : 'meta'} {fmt(m.meta)} {m.unidade}</small></span>
            {admin && <button className="rt" onClick={() => run(() => removerMinimo(g.id, m.habit_id), 'Mínimo removido.')}>Remover</button>}</div>
        })}{!ctx.minimos.length && <p className="note">Nenhum mínimo. Cada um vale só pela própria promessa.</p>}</div>
        {admin && <>
          <div className="sec-h"><h2>Ajustes do admin</h2></div>
          <div className="admin-grid">
            <div className="field"><label htmlFor="g-prazo">Prazo no domingo</label><input id="g-prazo" type="time" value={f.prazo_hora} onChange={(e) => setF({ ...f, prazo_hora: e.target.value })} style={{ width: '100%', font: 'inherit', border: 0, borderRadius: 14, padding: '11px 14px' }} /></div>
            {num('base_min', 'Pontos da meta')}{num('bonus', 'Bônus meta batida')}{num('base_max', 'Pontos no limite')}{num('multa', 'Multa por excesso')}{num('flags_para_cair', 'Contestações p/ cair')}{num('carencia_horas', 'Carência (horas)')}{num('pote_por_pessoa', 'Pote por pessoa (R$)')}
          </div>
          <button className="btn lime" onClick={() => run(() => atualizarGrupo(g.id, { ...f, base_min: +f.base_min, base_max: +f.base_max, multa: +f.multa, bonus: +f.bonus, flags_para_cair: Math.max(1, +f.flags_para_cair), carencia_horas: +f.carencia_horas, pote_por_pessoa: +f.pote_por_pessoa }), 'Regras salvas.')}>Salvar regras</button>
        </>}
        <div className="sec-h"><h2>Membros</h2></div>
        <div className="rows">{ctx.membros.map((m) => <div key={m.user_id} className="prow"><Avatar nome={m.nome} cor={m.cor} /><span className="tx"><b>{m.nome}</b><small>{ctx.streak(m.user_id) > 0 ? dias(ctx.streak(m.user_id)) : 'sem sequência'}</small></span><span className="rt">{m.user_id === g.admin ? 'admin' : 'membro'}</span></div>)}</div>
        <div className="sec-h"><h2>Meu perfil</h2></div>
        <div className="field"><label htmlFor="p-nome" style={{ color: 'var(--white)' }}>Nome</label><input id="p-nome" type="text" maxLength={40} value={perfil.nome} onChange={(e) => setPerfil({ ...perfil, nome: e.target.value })} /></div>
        <div className="colors" style={{ justifyContent: 'flex-start' }}>{COLORS.map((c, i) => <button key={c} style={{ background: c }} aria-pressed={perfil.cor === i} aria-label={`Cor ${i + 1}`} onClick={() => setPerfil({ ...perfil, cor: i })} />)}</div>
        <button className="btn dark" onClick={() => perfil.nome.trim() ? run(() => salvarPerfil(ctx.uid, { nome: perfil.nome.trim(), cor: perfil.cor }), 'Perfil salvo.') : toast('Digite um nome.')}>Salvar perfil</button>
        <button className="btn dark" onClick={() => supabase.auth.signOut()}>Sair</button>
      </div>
      <div className="spacer" />
      {sheet?.tipo === 'cat' && <Catalogo titulo="Mínimo do grupo" onClose={() => setSheet(null)} ja={ctx.minimos.map((m) => m.habit_id)} onPick={(id) => setSheet({ tipo: 'meta', id })} />}
      {sheet?.tipo === 'meta' && <Meta habitId={sheet.id} regras={ctx.regras} titulo="Mínimo do grupo" onClose={() => setSheet(null)}
        onSave={(v) => { const it = itemDe(sheet.id, v); setSheet(null); run(() => salvarMinimo(g.id, it), 'Mínimo salvo. Vale para todos.') }} />}
    </div>
  )
}
