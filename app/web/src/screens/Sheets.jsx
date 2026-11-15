import { useState } from 'react'
import { HABITOS, H, CATEGORIAS } from '../lib/catalog.js'
import { realizado, pontosItem } from '../lib/scoring.js'
import { Sheet, fmt, sinal, toast, celebrate } from '../ui.jsx'
import { registrar } from '../data.js'

// catálogo com busca e filtro; onPick(habit_id) quando a pessoa escolhe
export function Catalogo({ onClose, onPick, ja = [], podeAdicionar = true, inicial = 'Todas', titulo = 'Catálogo de hábitos' }) {
  const [cat, setCat] = useState(inicial)
  const [q, setQ] = useState('')
  const busca = q.trim().toLowerCase()
  const itens = HABITOS.filter((h) => (cat === 'Todas' || h.categoria === cat) && (!busca || h.nome.toLowerCase().includes(busca) || h.categoria.toLowerCase().includes(busca)))
  return (
    <Sheet title={titulo} onClose={onClose} top={<>
      <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Buscar: água, bike, doce, sono..." aria-label="Buscar hábito" />
      <div className="cats">{['Todas', ...CATEGORIAS].map((c) => <button key={c} className="pill" aria-pressed={cat === c} onClick={() => setCat(c)}>{c}</button>)}</div>
    </>}>
      <div className="note">{itens.length} hábitos{podeAdicionar ? '' : ' · para adicionar, vá em Promessa > Próxima semana'}</div>
      {itens.map((h) => {
        const tem = ja.includes(h.id)
        return (
          <div className="cat-item" key={h.id}>
            <div><b>{h.nome}</b><small>{h.categoria} · {h.modo === 'max' ? 'limite máx.' : 'meta'} {fmt(h.meta_sugerida)} {h.unidade}</small></div>
            <button className={`btn sm ${tem ? 'dark' : 'lime'}`} disabled={tem || !podeAdicionar} onClick={() => onPick(h.id)}>{tem ? 'Já tem' : 'Adicionar'}</button>
          </div>
        )
      })}
      {!itens.length && <p className="note">Nada encontrado.</p>}
    </Sheet>
  )
}

// definir a meta de um hábito; minimo = meta do grupo para o mesmo hábito, se houver
export function Meta({ habitId, atual, minimo, regras, onClose, onSave, titulo }) {
  const h = H[habitId]
  const [m, setM] = useState(String(atual ?? h.meta_sugerida))
  const v = Number(m)
  const max = h.modo === 'max'
  let erro = ''
  if (!(v >= 0) || m === '') erro = 'Informe um número.'
  else if (!max && v <= 0) erro = 'A meta precisa ser maior que zero.'
  else if (minimo && !max && v < Number(minimo.meta)) erro = `O grupo exige pelo menos ${fmt(minimo.meta)} ${h.unidade}.`
  else if (minimo && max && v > Number(minimo.meta)) erro = `O limite do grupo é ${fmt(minimo.meta)} ${h.unidade}.`
  return (
    <Sheet title={titulo || 'Meta da semana'} onClose={onClose} top={<>
      <div style={{ color: 'var(--ink)' }}>
        <b style={{ fontSize: 16 }}>{h.nome}</b>
        <div style={{ fontSize: 12 }}>{h.categoria} · evidência: {h.evidencia}</div>
        {h.nota && <div style={{ fontSize: 12, marginTop: 4 }}>{h.nota}</div>}
      </div>
      <div className="field">
        <label htmlFor="meta">{max ? 'Limite máximo na semana' : 'Meta da semana'} ({h.unidade})</label>
        <input type="number" id="meta" min="0" step="any" inputMode="decimal" value={m} onChange={(e) => setM(e.target.value)} />
      </div>
    </>}>
      <div className="preview">{max
        ? <>Ficar em até {fmt(v || 0)} {h.unidade} vale <b>{regras.base_max} pts</b>. Cada unidade acima tira <b>{regras.multa} pts</b>.</>
        : <>Cumprir {fmt(v || 0)} {h.unidade} vale <b>{regras.base_min + regras.bonus} pts</b>. Metade vale <b>{regras.base_min / 2} pts</b>.</>}
        {h.teto_por_dia != null && <><br />Conta no máximo {fmt(h.teto_por_dia)} {h.unidade} por dia.</>}</div>
      {erro && <p className="err" role="alert">{erro}</p>}
      <button className="btn lime" disabled={!!erro} onClick={() => onSave(v)}>Salvar</button>
    </Sheet>
  )
}

export function Registro({ ctx, inicial, onClose }) {
  const itens = ctx.itensMeus(ctx.w.cur)
  const [idx, setIdx] = useState(Math.max(0, itens.findIndex((i) => i.habit_id === inicial)))
  const [qt, setQt] = useState('')
  const [dia, setDia] = useState(ctx.w.today)
  const [texto, setTexto] = useState('')
  const [foto, setFoto] = useState(null)
  const [busy, setBusy] = useState(false)
  if (!itens.length) return <Sheet title="Registrar atividade" onClose={onClose}><p>Sua promessa desta semana está vazia e o grupo não tem mínimos. Monte a promessa da próxima semana.</p></Sheet>
  const item = itens[idx]
  const h = H[item.habit_id]
  const minhas = ctx.validas(ctx.w.cur).filter((e) => e.user_id === ctx.uid)
  const antes = realizado(item, minhas)
  const depois = realizado(item, [...minhas, { habit_id: item.habit_id, dia, quantidade: Number(qt) || 0 }])
  const pa = pontosItem(item, antes, ctx.regras), pd = pontosItem(item, depois, ctx.regras)

  async function publicar() {
    const q = Number(qt)
    if (!(q > 0)) return toast('Informe uma quantidade maior que zero. Sem número, não vale.')
    setBusy(true)
    try {
      await registrar({ gid: ctx.group.id, uid: ctx.uid, habit_id: item.habit_id, dia, quantidade: q, texto: texto.trim(), foto })
      celebrate(Math.round(pd - pa))
      onClose()
      ctx.reload()
    } catch (e) { toast(e.message) } finally { setBusy(false) }
  }

  return (
    <Sheet title="Registrar atividade" onClose={onClose} top={<>
      <div className="field"><label htmlFor="r-hab">Hábito da promessa</label>
        <select id="r-hab" value={idx} onChange={(e) => setIdx(+e.target.value)}>{itens.map((i, k) => <option key={i.habit_id} value={k}>{H[i.habit_id].nome}{i.doGrupo ? ' (grupo)' : ''}</option>)}</select></div>
      <div className="field"><label htmlFor="r-qt">Quantidade ({h.unidade})</label>
        <input type="number" id="r-qt" min="0" step="any" inputMode="decimal" placeholder="0" value={qt} onChange={(e) => setQt(e.target.value)} /></div>
      <div className="field"><label htmlFor="r-dia">Dia</label>
        <input type="date" id="r-dia" min={ctx.w.cur} max={ctx.w.today} value={dia} onChange={(e) => setDia(e.target.value || ctx.w.today)} style={{ width: '100%', font: 'inherit', borderRadius: 14, border: 0, padding: '11px 14px' }} /></div>
      <div className="field"><label htmlFor="r-tx">Comentário</label>
        <input type="text" id="r-tx" maxLength={500} placeholder="Como foi?" value={texto} onChange={(e) => setTexto(e.target.value)} /></div>
    </>}>
      <div className="field">
        <label htmlFor="r-ft" style={{ color: 'var(--white)' }}>Evidência (foto ou print)</label>
        <input type="file" id="r-ft" accept="image/*" onChange={(e) => setFoto(e.target.files[0] || null)} />
        <span className="note">Pede: {h.evidencia}</span>
      </div>
      <div className="preview">Depois deste post: {fmt(depois)} de {fmt(item.meta)} {h.unidade}. Pontos do hábito: <b>{sinal(Math.round(pd))}</b> ({sinal(Math.round(pd - pa))}).
        {item.modo === 'max' && <><br />Isto é um limite: registrar aqui conta contra você, mas esconder vale contestação.</>}</div>
      <button className="btn lime" onClick={publicar} disabled={busy}>{busy ? 'Publicando...' : 'Publicar'}</button>
    </Sheet>
  )
}
