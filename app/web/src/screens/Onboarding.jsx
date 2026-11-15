import { useState } from 'react'
import { H, itemDe } from '../lib/catalog.js'
import { Avatar, COLORS, Icon, fmt, toast } from '../ui.jsx'
import { salvarPerfil, criarGrupo, entrarNoGrupo, salvarPromessa } from '../data.js'
import { weekInfo } from '../lib/week.js'
import { supabase } from '../lib/supabase.js'

const OBJ = [['forca', 'Ganhar força', 'dumbbell'], ['condicionamento', 'Condicionamento', 'bike'], ['comer', 'Comer melhor', 'apple'],
  ['dormir', 'Dormir melhor', 'moon'], ['hidratar', 'Beber mais água', 'drop'], ['mente', 'Cuidar da mente', 'brain'],
  ['consistencia', 'Ser constante', 'flame'], ['gordura', 'Perder gordura', 'leaf'], ['esporte', 'Praticar esporte', 'trophy']]
const EQUIP = [['kettlebell', 'Kettlebell'], ['bike', 'Bicicleta'], ['halteres', 'Halteres'], ['elastico', 'Elásticos'],
  ['barra', 'Barra fixa'], ['academia', 'Academia'], ['nada', 'Só o corpo']]
const NIVEIS = [['Iniciante', 'Treino pouco ou estou voltando agora'], ['Intermediário', 'Treino com frequência há alguns meses'], ['Avançado', 'Treino há anos, com constância']]

export function sugestoes(o) {
  const s = []
  const ini = o.nivel === 'Iniciante'
  const add = (id, meta) => { if (H[id] && !s.some((x) => x.habit_id === id)) s.push({ ...itemDe(id, meta), on: true }) }
  add(o.equip.includes('kettlebell') ? 'forca_kettlebell' : o.equip.includes('academia') ? 'forca_academia' : 'forca_sessao', Math.max(1, Math.min(o.dias, ini ? 3 : 5)))
  if (o.equip.includes('bike')) add('bike_min', ini ? 90 : 150)
  else if (o.obj.includes('condicionamento') || o.obj.includes('gordura')) add('caminhada_min', 150)
  if (o.obj.includes('forca')) add('forca_series', ini ? 20 : 40)
  if (o.obj.includes('comer') || o.obj.includes('gordura')) { add('porcoes_vegetais', 14); add('doce_limite', ini ? 3 : 2) }
  if (o.obj.includes('gordura')) add('refri_limite', 1)
  if (o.obj.includes('dormir')) add('sono_noites_7h', 5)
  if (o.obj.includes('hidratar')) add('agua_ml', 14000)
  if (o.obj.includes('mente')) add('meditacao', 35)
  if (o.obj.includes('consistencia')) add('checkin_dia', 7)
  if (o.obj.includes('esporte')) add('esporte_coletivo', 1)
  add('alongamento', ini ? 30 : 60)
  return s
}

const STEPS = 7

export function Onboarding({ uid, perfil, onDone, onSignOut }) {
  const [st, setSt] = useState(0)
  const [o, setO] = useState({
    nome: perfil?.nome || '', cor: perfil?.cor ?? 0, nivel: perfil?.nivel || 'Iniciante', dias: perfil?.dias || 3,
    obj: perfil?.objetivos?.length ? perfil.objetivos : ['comer', 'consistencia'], equip: perfil?.equipamentos?.length ? perfil.equipamentos : [],
  })
  const [modoGrupo, setModoGrupo] = useState('entrar')
  const [codigo, setCodigo] = useState('')
  const [nomeGrupo, setNomeGrupo] = useState('')
  const [grupo, setGrupo] = useState(null)
  const [sug, setSug] = useState(null)
  const [busy, setBusy] = useState(false)
  const set = (k, v) => { setO((x) => ({ ...x, [k]: v })); setSug(null) }
  const tog = (k, v) => set(k, o[k].includes(v) ? o[k].filter((x) => x !== v) : [...o[k], v])

  async function next() {
    if (st === 0 && !o.nome.trim()) return toast('Digite um nome ou apelido para continuar.')
    if (st === 5) {
      setBusy(true)
      try {
        await salvarPerfil(uid, { nome: o.nome.trim(), cor: o.cor, nivel: o.nivel, dias: o.dias, objetivos: o.obj, equipamentos: o.equip })
        let g
        if (modoGrupo === 'entrar') {
          if (!codigo.trim()) throw new Error('Digite o código do grupo.')
          const gid = await entrarNoGrupo(codigo)
          g = { id: gid }
        } else {
          if (!nomeGrupo.trim()) throw new Error('Dê um nome ao grupo.')
          g = await criarGrupo(uid, nomeGrupo.trim())
          toast(`Grupo criado. Código para convidar: ${g.codigo}`)
        }
        setGrupo(g)
        setSug(sugestoes(o))
        setSt(6)
      } catch (e) { toast(e.message) } finally { setBusy(false) }
      return
    }
    if (st === 6) {
      const esc = (sug || []).filter((p) => p.on)
      if (!esc.length) return toast('Escolha pelo menos um hábito.')
      setBusy(true)
      try {
        const { data: g } = await supabase.from('groups').select('*').eq('id', grupo.id).single()
        const w = weekInfo(g)
        const semana = w.aberta(w.cur) ? w.cur : w.next
        await salvarPromessa(grupo.id, uid, semana, esc)
        onDone()
      } catch (e) { toast(e.message) } finally { setBusy(false) }
      return
    }
    setSt(st + 1)
    window.scrollTo(0, 0)
  }

  let t = '', d = '', body = null, cta = 'Continuar'
  if (st === 0) {
    t = 'Como o grupo vai te chamar?'; d = 'Seu nome aparece no ranking, no feed e nos comentários.'
    body = <>
      <div className="field" style={{ width: '100%', maxWidth: 320 }}>
        <label htmlFor="o-nome" style={{ color: 'var(--white)' }}>Nome ou apelido</label>
        <input type="text" id="o-nome" maxLength={40} value={o.nome} onChange={(e) => set('nome', e.target.value)} placeholder="Ex.: Lipe" autoComplete="nickname" />
      </div>
      <div className="note">Cor do seu avatar</div>
      <div className="colors">{COLORS.map((c, i) => <button key={c} style={{ background: c }} aria-pressed={o.cor === i} aria-label={`Cor ${i + 1}`} onClick={() => set('cor', i)} />)}</div>
      <Avatar nome={o.nome} cor={o.cor} size={72} />
    </>
  }
  if (st === 1) {
    t = 'Seu nível de atividade'; d = 'Usamos isso só para sugerir metas que você consiga cumprir. Dá para mudar depois.'
    body = NIVEIS.map(([n, x]) => <button key={n} className="choice" aria-pressed={o.nivel === n} onClick={() => set('nivel', n)}>{n}<br /><small style={{ fontWeight: 400, fontSize: 11 }}>{x}</small></button>)
  }
  if (st === 2) {
    t = 'Quantos dias por semana dá para treinar?'; d = 'Seja realista. Prometer menos e cumprir vale mais do que prometer muito e falhar.'
    const lab = (n) => (n >= 6 ? 'puxado' : n >= 4 ? 'regular' : n >= 2 ? 'leve' : 'começo')
    body = <>
      <div className="big">{o.dias}<small>dias</small></div>
      <div className="ruler">
        <div className="ruler-col" role="group" aria-label="Dias por semana">{[7, 6, 5, 4, 3, 2, 1].map((n) => <button key={n} aria-pressed={o.dias === n} onClick={() => set('dias', n)}>{n}</button>)}</div>
        <div className="ruler-lab">{[7, 6, 5, 4, 3, 2, 1].map((n) => <span key={n} className={o.dias === n ? 'on' : ''}>{lab(n)}</span>)}</div>
      </div>
    </>
  }
  if (st === 3) {
    t = 'Quais são seus objetivos?'; d = 'Escolha quantos quiser. Eles definem as sugestões da sua primeira promessa.'
    body = <div className="circles">{OBJ.map(([k, l, i]) => <button key={k} className="circ" aria-pressed={o.obj.includes(k)} onClick={() => tog('obj', k)}><span className="c"><Icon name={i} /></span>{l}</button>)}</div>
  }
  if (st === 4) {
    t = 'O que você tem para treinar?'; d = 'Marque tudo o que está ao seu alcance durante a semana.'
    body = EQUIP.map(([k, l]) => <button key={k} className="choice" aria-pressed={o.equip.includes(k)} onClick={() => tog('equip', k)}>{l}</button>)
  }
  if (st === 5) {
    t = 'Seu grupo'; d = 'Entre com o código que alguém do grupo te passou, ou crie um grupo novo e convide os outros.'; cta = busy ? 'Salvando...' : 'Continuar'
    body = <>
      <div className="pills"><button className="pill" aria-pressed={modoGrupo === 'entrar'} onClick={() => setModoGrupo('entrar')}>Tenho um código</button><button className="pill" aria-pressed={modoGrupo === 'criar'} onClick={() => setModoGrupo('criar')}>Criar grupo</button></div>
      {modoGrupo === 'entrar'
        ? <div className="field" style={{ width: '100%', maxWidth: 320 }}><label htmlFor="o-cod" style={{ color: 'var(--white)' }}>Código do grupo</label><input type="text" id="o-cod" value={codigo} onChange={(e) => setCodigo(e.target.value)} placeholder="Ex.: TP-4K9QZ" autoCapitalize="characters" /></div>
        : <div className="field" style={{ width: '100%', maxWidth: 320 }}><label htmlFor="o-gn" style={{ color: 'var(--white)' }}>Nome do grupo</label><input type="text" id="o-gn" maxLength={60} value={nomeGrupo} onChange={(e) => setNomeGrupo(e.target.value)} placeholder="Ex.: Os Seis" /><span className="note">Você vira admin e define as regras. Os mínimos começam em 3 treinos e no máximo 2 doces.</span></div>}
    </>
  }
  if (st === 6) {
    t = 'Sua primeira promessa'; d = 'Sugestões com base nas suas respostas. Toque para tirar ou pôr. Depois você ajusta as metas até domingo, 23h59.'; cta = busy ? 'Salvando...' : 'Começar'
    body = <>
      <div className="sug">{(sug || []).map((p, i) => {
        const h = H[p.habit_id]
        return (
          <button key={p.habit_id} className="prow" aria-pressed={p.on} onClick={() => setSug(sug.map((x, j) => (j === i ? { ...x, on: !x.on } : x)))}>
            <span className={`dot ${p.on ? 'lime' : ''}`}>{p.on && <Icon name="check" />}</span>
            <span className="tx"><b>{h.nome}</b><small>{h.modo === 'max' ? 'limite' : 'meta'} {fmt(p.meta)} {h.unidade} na semana</small></span>
          </button>
        )
      })}</div>
      <span className="note">Os mínimos do grupo entram automaticamente.</span>
    </>
  }

  return (
    <div className="onb screen">
      <div className="onb-top pad">
        <button className="back" onClick={() => (st === 0 ? onSignOut() : setSt(st - (st === 6 ? 0 : 1)))} disabled={st === 6}><Icon name="back" />{st === 0 ? 'Sair' : 'Voltar'}</button>
        <div className="dots" aria-label={`Passo ${st + 1} de ${STEPS}`}>{Array.from({ length: STEPS }, (_, i) => <i key={i} className={i === st ? 'on' : ''} />)}</div>
        <span style={{ width: 40 }} />
      </div>
      <h2 className="pad">{t}</h2>
      <div className="band pad"><p>{d}</p></div>
      <div className="onb-body pad">{body}</div>
      <div className="onb-foot pad"><button className="btn dark" onClick={next} disabled={busy}>{cta}</button></div>
    </div>
  )
}
