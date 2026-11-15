// Mesma regra da função placar() do banco, usada para mostrar os pontos ao vivo no app.

export const REGRAS_PADRAO = { base_min: 10, base_max: 6, multa: 4, bonus: 5, flags_para_cair: 3 }

// soma o realizado respeitando o teto diário; entries: [{habit_id, dia, quantidade}]
export function realizado(item, entries) {
  const porDia = {}
  for (const e of entries) if (e.habit_id === item.habit_id) porDia[e.dia] = (porDia[e.dia] || 0) + Number(e.quantidade)
  return Object.values(porDia).reduce((s, q) => s + (item.teto_dia == null ? q : Math.min(q, Number(item.teto_dia))), 0)
}

export function pontosItem(item, feito, r = REGRAS_PADRAO) {
  const meta = Number(item.meta)
  if (item.modo === 'min') {
    if (meta <= 0) return 0
    return r.base_min * Math.min(1, feito / meta) + (feito >= meta ? r.bonus : 0)
  }
  return feito <= meta ? r.base_max : -((feito - meta) * r.multa)
}

// itens efetivos: promessa da pessoa + mínimos do grupo que ela não cobriu
export function itensEfetivos(proprios, minimos) {
  const ids = new Set(proprios.map((i) => i.habit_id))
  return [...proprios, ...minimos.filter((m) => !ids.has(m.habit_id)).map((m) => ({ ...m, doGrupo: true }))]
}

export function pontosSemana(itens, entries, r = REGRAS_PADRAO) {
  return Math.round(itens.reduce((s, i) => s + pontosItem(i, realizado(i, entries), r), 0))
}

// entradas que ainda contam (menos contestações que o limite)
export function entradasValidas(entries, flagsPorEntry, r = REGRAS_PADRAO) {
  return entries.filter((e) => (flagsPorEntry[e.id] || 0) < r.flags_para_cair)
}

// dias seguidos com pelo menos um post, terminando hoje ou ontem
export function sequencia(dias, hoje, addDays) {
  const set = new Set(dias)
  let d = set.has(hoje) ? hoje : addDays(hoje, -1)
  let n = 0
  while (set.has(d)) { n++; d = addDays(d, -1) }
  return n
}
