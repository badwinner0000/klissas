import { useEffect, useState } from 'react'
import { H, itemDe } from '../lib/catalog.js'
import { realizado, pontosItem, pontosSemana } from '../lib/scoring.js'
import { fmtIntervalo } from '../lib/week.js'
import { Header, Icon, fmt, sinal, toast } from '../ui.jsx'
import { salvarPromessa } from '../data.js'
import { Catalogo, Meta } from './Sheets.jsx'

function pct(item, feito) {
  if (item.modo === 'max') return Number(item.meta) === 0 ? (feito > 0 ? 100 : 0) : Math.min(100, (feito / item.meta) * 100)
  return Math.min(100, (feito / item.meta) * 100)
}

export function LinhaHabito({ item, feito, regras, onClick, direita }) {
  const h = H[item.habit_id]
  const mx = item.modo === 'max'
  const over = mx && feito > item.meta
  const pc = Math.round(pct(item, feito))
  const pt = Math.round(pontosItem(item, feito, regras))
  const dot = over ? 'bad' : (!mx && feito >= item.meta) || (mx && !over) ? 'lime' : ''
  return (
    <button className="prow" onClick={onClick}>
      <span className={`dot ${dot}`}>{mx ? (over ? '!' : 'ok') : `${pc}%`}</span>
      <span className="tx">
        <b>{h.nome}</b>
        <small>{mx ? 'limite' : 'meta'} {fmt(item.meta)} {h.unidade}{item.doGrupo ? ' · do grupo' : ''}</small>
        <span className={`mini-bar ${over ? 'over' : mx ? 'ok' : ''}`}><i style={{ width: `${pc}%` }} /></span>
      </span>
      <span className="rt">{direita ?? `${fmt(feito)}/${fmt(item.meta)}`}<small>{sinal(pt)} pts</small></span>
    </button>
  )
}

export function Promessa({ ctx, acoes, onRegistrar, inicial = 'cur' }) {
  const { w, regras } = ctx
  const [aba, setAba] = useState(inicial)
  const semana = aba === 'cur' ? w.cur : w.next
  const editavel = w.aberta(semana)
  const salvos = ctx.promessaDe(ctx.uid, semana)
  const [rascunho, setRascunho] = useState(salvos)
  const [sujo, setSujo] = useState(false)
  const [sheet, setSheet] = useState(null)
  const [busy, setBusy] = useState(false)

  useEffect(() => { setRascunho(ctx.promessaDe(ctx.uid, semana)); setSujo(false) }, [semana, ctx.promessas]) // eslint-disable-line

  const minimoDe = (id) => ctx.minimos.find((m) => m.habit_id === id)
  const doGrupo = ctx.minimos.filter((m) => !rascunho.some((i) => i.habit_id === m.habit_id)).map((m) => ({ ...m, doGrupo: true }))
  const minhas = ctx.validas(semana).filter((e) => e.user_id === ctx.uid)
  const todos = [...rascunho, ...doGrupo]
  const total = pontosSemana(todos, minhas, regras)

  async function salvar() {
    setBusy(true)
    try {
      await salvarPromessa(ctx.group.id, ctx.uid, semana, rascunho)
      toast('Promessa salva.')
      setSujo(false)
      ctx.reload()
    } catch (e) { toast(e.message) } finally { setBusy(false) }
  }
  const mudar = (lista) => { setRascunho(lista); setSujo(true) }
  const copiarAtual = () => mudar(ctx.promessaDe(ctx.uid, w.cur).map((i) => ({ ...i })))

  return (
    <div className="screen">
      <Header title="Promessa" actions={acoes} />
      <div className="sec pad">
        <div className="pills">
          <button className="pill" aria-pressed={aba === 'cur'} onClick={() => setAba('cur')}>Esta semana</button>
          <button className="pill" aria-pressed={aba === 'next'} onClick={() => setAba('next')}>Próxima semana</button>
        </div>
        <div className="banner">{editavel
          ? <>Monte a promessa de <b>{fmtIntervalo(semana)}</b> até <b>domingo, {w.prazo.replace(':', 'h')}</b>. Depois ela trava e ninguém edita.</>
          : <>Promessa de {fmtIntervalo(semana)} travada. Toque num hábito para registrar. <b>Sem post, não vale.</b></>}</div>
      </div>
      <div className="band pad">
        <div className="sec-h" style={{ marginBottom: 12 }}>
          <h2 style={{ color: 'var(--ink)' }}>Semana {w.numero(semana)}</h2>
          <span style={{ color: 'var(--ink)' }}>{todos.length} hábitos · <b>{sinal(total)} pts</b></span>
        </div>
        <div className="rows">
          {rascunho.map((item, idx) => (
            <div key={item.habit_id}>
              <LinhaHabito item={item} feito={realizado(item, minhas)} regras={regras}
                direita={editavel ? 'Editar' : undefined}
                onClick={() => (editavel ? setSheet({ tipo: 'meta', idx }) : onRegistrar(item.habit_id))} />
              {editavel && <div className="hab-extra"><span>{H[item.habit_id].categoria}</span><button onClick={() => mudar(rascunho.filter((_, j) => j !== idx))}>Remover</button></div>}
            </div>
          ))}
          {doGrupo.map((item) => (
            <LinhaHabito key={item.habit_id} item={item} feito={realizado(item, minhas)} regras={regras}
              onClick={() => (editavel ? toast('Meta do grupo. Para mudar a sua, adicione o mesmo hábito com meta igual ou maior.') : onRegistrar(item.habit_id))} />
          ))}
          {!todos.length && <p style={{ color: 'var(--ink)' }}>Nenhum hábito ainda.</p>}
        </div>
        {editavel && <>
          <button className="btn white" style={{ width: '100%', marginTop: 14 }} onClick={() => setSheet({ tipo: 'cat' })}>+ Adicionar do catálogo</button>
          {!rascunho.length && semana === w.next && ctx.promessaDe(ctx.uid, w.cur).length > 0 &&
            <button className="btn dark" style={{ width: '100%', marginTop: 10 }} onClick={copiarAtual}>Repetir a promessa desta semana</button>}
        </>}
      </div>
      {!editavel && aba === 'cur' && !salvos.length && (
        <div className="sec pad"><div className="card-out" style={{ fontSize: 13 }}>Você não montou promessa para esta semana, então valem só os mínimos do grupo. A próxima semana já está aberta.</div></div>
      )}
      <div className="spacer" />

      {sheet?.tipo === 'cat' && <Catalogo onClose={() => setSheet(null)} ja={rascunho.map((i) => i.habit_id)}
        onPick={(id) => setSheet({ tipo: 'meta', novo: id })} />}
      {sheet?.tipo === 'meta' && (() => {
        const id = sheet.novo || rascunho[sheet.idx].habit_id
        const min = minimoDe(id)
        const atual = sheet.novo ? Math.max(H[id].meta_sugerida, min && H[id].modo === 'min' ? Number(min.meta) : 0) : rascunho[sheet.idx].meta
        return <Meta habitId={id} atual={sheet.novo && min && H[id].modo === 'max' ? Math.min(atual, Number(min.meta)) : atual} minimo={min} regras={regras}
          titulo={sheet.novo ? 'Adicionar à promessa' : 'Alterar meta'} onClose={() => setSheet(null)}
          onSave={(v) => {
            mudar(sheet.novo ? [...rascunho, itemDe(id, v)] : rascunho.map((i, j) => (j === sheet.idx ? { ...i, meta: v } : i)))
            setSheet(null)
            toast('Pronto. Toque em Salvar promessa para gravar.')
          }} />
      })()}
      {editavel && sujo && <div style={{ position: 'fixed', left: 0, right: 0, bottom: 'calc(84px + env(safe-area-inset-bottom,0px))', display: 'flex', justifyContent: 'center', zIndex: 7, pointerEvents: 'none' }}>
        <button className="btn lime" style={{ pointerEvents: 'auto', boxShadow: '0 6px 20px rgba(0,0,0,.45)' }} onClick={salvar} disabled={busy}><Icon name="check" size={16} style={{ verticalAlign: '-3px', marginRight: 6 }} />{busy ? 'Salvando...' : 'Salvar promessa'}</button>
      </div>}
    </div>
  )
}
