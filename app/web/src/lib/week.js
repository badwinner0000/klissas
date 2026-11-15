// datas sempre como texto "AAAA-MM-DD" no fuso do grupo; semana começa na segunda

export function localNow(tz, at = new Date()) {
  const f = new Intl.DateTimeFormat('en-CA', {
    timeZone: tz, year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hourCycle: 'h23',
  })
  const p = Object.fromEntries(f.formatToParts(at).map((x) => [x.type, x.value]))
  return { date: `${p.year}-${p.month}-${p.day}`, time: `${p.hour}:${p.minute}` }
}

export function addDays(d, n) {
  const x = new Date(d + 'T12:00:00Z')
  x.setUTCDate(x.getUTCDate() + n)
  return x.toISOString().slice(0, 10)
}

export function weekStart(d) {
  const dow = (new Date(d + 'T12:00:00Z').getUTCDay() + 6) % 7
  return addDays(d, -dow)
}

export function daysBetween(a, b) {
  return Math.round((new Date(b + 'T12:00:00Z') - new Date(a + 'T12:00:00Z')) / 86400000)
}

// estado da semana para um grupo
export function weekInfo(group, at = new Date()) {
  const tz = group.fuso || 'America/Sao_Paulo'
  const n = localNow(tz, at)
  const cur = weekStart(n.date)
  const next = addDays(cur, 7)
  const prazo = (group.prazo_hora || '23:59').slice(0, 5)
  const nowStr = `${n.date} ${n.time}`
  const criado = localNow(tz, new Date(group.created_at))
  const primeira = weekStart(criado.date)
  const largada = at.getTime() < new Date(group.created_at).getTime() + 24 * 3600 * 1000
  const aberta = (w) => nowStr < `${addDays(w, -1)} ${prazo}` || (w === primeira && largada)
  const numero = (w) => Math.floor(daysBetween(primeira, w) / 7) + 1
  const diasParaFechar = daysBetween(n.date, addDays(cur, 6))
  return { tz, today: n.date, now: nowStr, cur, next, prazo, aberta, numero, primeira, diasParaFechar }
}

const MESES = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez']
const DIAS = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb']
export function fmtDia(d) {
  const x = new Date(d + 'T12:00:00Z')
  return `${DIAS[x.getUTCDay()]}, ${x.getUTCDate()} ${MESES[x.getUTCMonth()]}`
}
export function fmtIntervalo(w) {
  const a = new Date(w + 'T12:00:00Z'), b = new Date(addDays(w, 6) + 'T12:00:00Z')
  return `${a.getUTCDate()} ${MESES[a.getUTCMonth()]} a ${b.getUTCDate()} ${MESES[b.getUTCMonth()]}`
}
export function quando(iso) {
  const min = Math.round((Date.now() - new Date(iso).getTime()) / 60000)
  if (min < 1) return 'agora'
  if (min < 60) return `há ${min} min`
  const h = Math.round(min / 60)
  if (h < 24) return `há ${h} h`
  const d = Math.round(h / 24)
  return d === 1 ? 'ontem' : `há ${d} dias`
}
