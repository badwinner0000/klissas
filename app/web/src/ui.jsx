import { useEffect, useState } from 'react'

export const COLORS = ['#896cfe', '#c46bd6', '#e08a3c', '#3fa66a', '#d6588f', '#5a6b8a']

const P = {
  home: <><path d="M3 11l9-8 9 8" /><path d="M5 10v10h5v-6h4v6h5V10" /></>,
  doc: <><rect x="5" y="3" width="14" height="18" rx="2" /><path d="M9 8h6M9 12h6M9 16h3" /></>,
  star: <path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z" />,
  group: <><circle cx="8" cy="8" r="3" /><circle cx="16" cy="8" r="3" /><path d="M2 20c0-3 2.7-5 6-5s6 2 6 5M14 15.2c.6-.1 1.3-.2 2-.2 3.3 0 6 2 6 5" /></>,
  search: <><circle cx="11" cy="11" r="7" /><path d="M20 20l-4-4" /></>,
  bell: <><path d="M6 16V11a6 6 0 0112 0v5l2 2H4z" /><path d="M10 20a2 2 0 004 0" /></>,
  user: <><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4 3.6-7 8-7s8 3 8 7" /></>,
  back: <path d="M15 5l-7 7 7 7" />,
  dumbbell: <path d="M3 9v6M6 6v12M18 6v12M21 9v6M6 12h12" />,
  chart: <><rect x="4" y="3" width="16" height="18" rx="2" /><path d="M8 16v-3M12 16V9M16 16v-5" /></>,
  apple: <><path d="M12 7c-2-2-7-1.5-7 4 0 4 3 9 5 9 1 0 1.3-.6 2-.6s1 .6 2 .6c2 0 5-5 5-9 0-5.5-5-6-7-4z" /><path d="M12 7c0-2 1-3.5 3-4" /></>,
  plus: <path d="M12 5v14M5 12h14" />,
  check: <path d="M5 12l5 5L20 7" />,
  heart: <path d="M12 20s-7-4.4-7-10a4 4 0 017-2.6A4 4 0 0119 10c0 5.6-7 10-7 10z" />,
  chat: <path d="M4 5h16v11H9l-5 4z" />,
  flag: <path d="M5 21V4M5 4h11l-2 4 2 4H5" />,
  flame: <path d="M12 3c1 4 5 5 5 10a5 5 0 01-10 0c0-2 1-3.5 2-4.5 0 2 1 3 2 3 0-3-1-5 1-8.5z" />,
  kb: <><path d="M8 9a4 4 0 118 0" /><rect x="5" y="9" width="14" height="12" rx="6" /></>,
  bike: <><circle cx="6" cy="16" r="4" /><circle cx="18" cy="16" r="4" /><path d="M6 16l4-8h5l3 8M10 8l2 8" /></>,
  drop: <path d="M12 3s6 7 6 11a6 6 0 01-12 0c0-4 6-11 6-11z" />,
  moon: <path d="M20 14A8 8 0 0110 4a8 8 0 1010 10z" />,
  leaf: <><path d="M5 19c0-9 6-14 15-14 0 9-5 15-14 15" /><path d="M5 19l8-8" /></>,
  brain: <path d="M9 4a3 3 0 00-3 3 3 3 0 00-2 5 3 3 0 002 5 3 3 0 006 0V4a3 3 0 00-3 0zM15 4a3 3 0 013 3 3 3 0 012 5 3 3 0 01-2 5 3 3 0 01-6 0" />,
  trophy: <path d="M8 4h8v5a4 4 0 01-8 0zM8 6H5a3 3 0 003 4M16 6h3a3 3 0 01-3 4M12 13v4M8 20h8" />,
  trash: <path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13" />,
}

export function Icon({ name, size, style }) {
  return (
    <svg className="i" viewBox="0 0 24 24" aria-hidden="true" style={size ? { width: size, height: size, ...style } : style}>
      {P[name]}
    </svg>
  )
}

export function Avatar({ nome = '?', cor = 0, size = 40 }) {
  return (
    <span className="av" style={{ background: COLORS[cor % COLORS.length], width: size, height: size, fontSize: Math.round(size * 0.38) }}>
      {(nome || '?')[0].toUpperCase()}
    </span>
  )
}

export function Art({ name }) {
  return <span className="art"><svg viewBox="0 0 24 24">{P[name]}</svg></span>
}

export function Header({ title, onBack, actions }) {
  return (
    <header className="hd pad">
      {onBack && <button className="back" onClick={onBack} aria-label="Voltar"><Icon name="back" /></button>}
      {typeof title === 'string' ? <h1>{title}</h1> : title}
      <div className="ics">{actions}</div>
    </header>
  )
}

export function Sheet({ title, onClose, top, children }) {
  useEffect(() => {
    const k = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', k)
    return () => window.removeEventListener('keydown', k)
  }, [onClose])
  return (
    <>
      <div className="scrim" onClick={onClose} />
      <div className="sheet">
        <div className="sheet-in" role="dialog" aria-modal="true" aria-label={title}>
          <div className="sheet-h pad"><h2>{title}</h2><button className="btn sm white" onClick={onClose}>Fechar</button></div>
          {top && <div className="band pad">{top}</div>}
          <div className="sheet-b pad">{children}</div>
        </div>
      </div>
    </>
  )
}

let pushToast = () => {}
export const toast = (t) => pushToast(t)
export function Toasts() {
  const [msg, setMsg] = useState(null)
  useEffect(() => {
    let timer
    pushToast = (t) => { setMsg(t); clearTimeout(timer); timer = setTimeout(() => setMsg(null), 3000) }
    return () => clearTimeout(timer)
  }, [])
  return msg ? <div className="toast" role="status">{msg}</div> : null
}

export const fmt = (n) => Number(n).toLocaleString('pt-BR', { maximumFractionDigits: 1 })
export const sinal = (n) => (n > 0 ? '+' : '') + n
export const dias = (n) => (n === 1 ? '1 dia seguido' : `${n} dias seguidos`)

// reduz a foto antes de enviar, para economizar espaço e dados
export async function reduzirFoto(file, max = 1280) {
  if (!file || !file.type.startsWith('image/')) return file
  try {
    const bmp = await createImageBitmap(file)
    const k = Math.min(1, max / Math.max(bmp.width, bmp.height))
    const c = document.createElement('canvas')
    c.width = Math.round(bmp.width * k)
    c.height = Math.round(bmp.height * k)
    c.getContext('2d').drawImage(bmp, 0, 0, c.width, c.height)
    const blob = await new Promise((r) => c.toBlob(r, 'image/jpeg', 0.8))
    return blob || file
  } catch {
    return file
  }
}

// ---------- animações ----------

// gradiente do fogo, desenhado uma vez na página
export function FlameDefs() {
  return (
    <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
      <defs>
        <linearGradient id="fogo" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0" stopColor="#ff5a1f" /><stop offset=".55" stopColor="#ffae00" /><stop offset="1" stopColor="#e2f163" />
        </linearGradient>
      </defs>
    </svg>
  )
}

export function Flame({ size = 24, lit = true, delay = 0 }) {
  return (
    <svg className={`flame ${lit ? '' : 'off'}`} viewBox="0 0 24 32" width={size} height={size * 1.33}
      style={{ animationDelay: `${delay}s, ${delay}s` }} aria-hidden="true">
      <path d="M12 1C14 7 21 10 21 19a9 9 0 01-18 0c0-4 2-7 4-9 0 3 1.5 5 3.5 5C10.5 10 9 6 12 1z" fill={lit ? 'url(#fogo)' : '#888'} />
      {lit && <path className="fi" d="M12 15c1 3 4 4 4 8a4 4 0 01-8 0c0-2 1-3 2-4 0 1.5.8 2.5 2 2.5-.3-2.5-.8-4 0-6.5z" fill="#fff3a8" />}
    </svg>
  )
}

// número que sobe contando até o valor
export function CountUp({ value, ms = 900 }) {
  const [v, setV] = useState(0)
  useEffect(() => {
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return setV(value)
    let raf, start
    const from = 0
    const step = (t) => {
      start ??= t
      const k = Math.min(1, (t - start) / ms)
      setV(Math.round(from + (value - from) * (1 - Math.pow(1 - k, 3))))
      if (k < 1) raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [value, ms])
  return <>{v}</>
}

// comemoração ao postar: confete, carimbo "TÁ PAGO!" e pontos ganhos
let pushCelebrate = () => {}
export const celebrate = (pts) => pushCelebrate(pts)
const CORES_CONFETE = ['#e2f163', '#896cfe', '#b3a0ff', '#ffffff', '#ffae00', '#ff5a1f']
export function Celebration() {
  const [c, setC] = useState(null)
  useEffect(() => {
    let timer
    pushCelebrate = (pts) => {
      const bits = Array.from({ length: 46 }, (_, i) => ({
        left: Math.random() * 100, x: `${(Math.random() - 0.5) * 160}px`, r: `${Math.random() * 720 - 360}deg`,
        d: `${1.4 + Math.random() * 1.2}s`, w: `${Math.random() * 0.35}s`, cor: CORES_CONFETE[i % CORES_CONFETE.length],
      }))
      setC({ pts, bits, k: Date.now() })
      clearTimeout(timer)
      timer = setTimeout(() => setC(null), 2500)
    }
    return () => clearTimeout(timer)
  }, [])
  if (!c) return null
  return (
    <div className="celebrate" key={c.k} role="status" aria-label={`Tá pago! ${c.pts ? sinal(c.pts) + ' pontos' : ''}`}>
      <div className="bits">{c.bits.map((b, i) => <i key={i} style={{ left: `${b.left}%`, background: b.cor, '--x': b.x, '--r': b.r, '--d': b.d, '--w': b.w }} />)}</div>
      <div className="box">
        <span className="bigflame"><Flame size={56} /></span>
        <div className="stamp">TÁ PAGO!</div>
        {c.pts !== 0 && <div className="gain">{sinal(c.pts)} pts</div>}
      </div>
    </div>
  )
}
