import { useState } from 'react'
import { supabase } from '../lib/supabase.js'
import { Icon } from '../ui.jsx'

export function Logo() {
  return (
    <div className="logo">
      <div className="mark">T<span>P</span></div>
      <div className="word">Tá <span>Pago</span></div>
    </div>
  )
}

export function Splash({ onStart }) {
  return (
    <div className="splash screen pad">
      <Logo />
      <p>Prometa a semana, poste o que fez e dispute o ranking com o seu grupo.</p>
      <button className="btn lime" onClick={onStart}>Começar</button>
    </div>
  )
}

export function Login({ onBack }) {
  const [email, setEmail] = useState('')
  const [enviado, setEnviado] = useState(false)
  const [erro, setErro] = useState('')
  const [busy, setBusy] = useState(false)

  async function enviar(e) {
    e.preventDefault()
    setErro('')
    if (!/^\S+@\S+\.\S+$/.test(email)) return setErro('Digite um e-mail válido.')
    setBusy(true)
    const { error } = await supabase.auth.signInWithOtp({ email, options: { emailRedirectTo: window.location.origin } })
    setBusy(false)
    if (error) return setErro(error.message.includes('rate') ? 'Muitas tentativas. Espere um minuto e tente de novo.' : error.message)
    setEnviado(true)
  }

  return (
    <div className="screen login">
      <header className="hd pad">
        <button className="back" onClick={onBack} aria-label="Voltar"><Icon name="back" /></button>
        <h1 style={{ color: 'var(--lime)', textAlign: 'center' }}>Entrar</h1>
        <span style={{ width: 22 }} />
      </header>
      <div className="welcome pad">
        <h3>{enviado ? 'Confira seu e-mail' : 'Bem-vindo'}</h3>
        <p>{enviado
          ? `Mandamos um link de acesso para ${email}. Abra o e-mail neste celular e toque no link. Se não aparecer, olhe o spam.`
          : 'Digite seu e-mail. Você recebe um link para entrar, sem senha.'}</p>
      </div>
      {!enviado && (
        <form className="band pad form" onSubmit={enviar} noValidate>
          <div className="field">
            <label htmlFor="lg-mail">E-mail</label>
            <input type="email" id="lg-mail" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="voce@exemplo.com" autoComplete="email" />
          </div>
          <button type="submit" hidden />
        </form>
      )}
      <div className="center pad">
        {enviado
          ? <button className="btn dark" onClick={() => setEnviado(false)}>Usar outro e-mail</button>
          : <button className="btn dark" onClick={enviar} disabled={busy}>{busy ? 'Enviando...' : 'Receber link de acesso'}</button>}
        {erro && <p className="err" role="alert">{erro}</p>}
      </div>
    </div>
  )
}

export function Setup() {
  return (
    <div className="setup pad screen">
      <Logo />
      <h2 style={{ color: 'var(--lime)' }}>Falta conectar o banco de dados</h2>
      <p>O app ainda não sabe qual projeto Supabase usar. Siga o passo a passo do arquivo <code>app/web/README.md</code>:</p>
      <ol className="rules">
        <li>Crie um projeto grátis em supabase.com.</li>
        <li>No SQL Editor, rode o arquivo <code>supabase/schema.sql</code>.</li>
        <li>Copie a URL e a chave anon para <code>VITE_SUPABASE_URL</code> e <code>VITE_SUPABASE_ANON_KEY</code> (no arquivo <code>.env</code> ou nas variáveis da Vercel).</li>
      </ol>
    </div>
  )
}
