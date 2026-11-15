import test from 'node:test'
import assert from 'node:assert/strict'
import { realizado, pontosItem, pontosSemana, itensEfetivos, sequencia } from './scoring.js'
import { addDays, weekStart, weekInfo } from './week.js'

const agua = { habit_id: 'agua_ml', modo: 'min', meta: 21000, teto_dia: 4000 }
const doce = { habit_id: 'doce_limite', modo: 'max', meta: 0, teto_dia: null }
const treino = { habit_id: 'forca_sessao', modo: 'min', meta: 3, teto_dia: 1 }

test('meta mínima é proporcional ao postado', () => {
  assert.equal(Math.round(pontosItem(agua, 3500)), 2)
  assert.equal(pontosItem(agua, 0), 0)
})
test('bater a meta dá bônus', () => assert.equal(pontosItem(treino, 3), 15))
test('limite: dentro ganha, acima perde por unidade', () => {
  assert.equal(pontosItem(doce, 0), 6)
  assert.equal(pontosItem(doce, 2), -8)
})
test('teto diário corta exagero', () => {
  const e = [{ habit_id: 'agua_ml', dia: '2026-11-16', quantidade: 9000 }, { habit_id: 'agua_ml', dia: '2026-11-17', quantidade: 1000 }]
  assert.equal(realizado(agua, e), 5000)
  const t = [{ habit_id: 'forca_sessao', dia: '2026-11-16', quantidade: 1 }, { habit_id: 'forca_sessao', dia: '2026-11-16', quantidade: 1 }]
  assert.equal(realizado(treino, t), 1)
})
test('mínimos do grupo entram só se a pessoa não cobriu', () => {
  const it = itensEfetivos([treino], [{ ...treino, meta: 2 }, doce])
  assert.equal(it.length, 2)
  assert.equal(it[0].meta, 3)
  assert.equal(pontosSemana(it, []), 6)
})
test('sequência de dias', () => {
  assert.equal(sequencia(['2026-11-13', '2026-11-14', '2026-11-15'], '2026-11-15', addDays), 3)
  assert.equal(sequencia(['2026-11-13', '2026-11-14'], '2026-11-15', addDays), 2)
  assert.equal(sequencia(['2026-11-12'], '2026-11-15', addDays), 0)
})
test('semana começa na segunda e a promessa trava domingo 23h59', () => {
  assert.equal(weekStart('2026-11-15'), '2026-11-09')
  const g = { fuso: 'America/Sao_Paulo', prazo_hora: '23:59:00', created_at: '2026-10-01T12:00:00Z' }
  const domingoNoite = new Date('2026-11-16T02:30:00Z') // domingo 23h30 em São Paulo
  const w = weekInfo(g, domingoNoite)
  assert.equal(w.cur, '2026-11-09')
  assert.equal(w.aberta(w.next), true)
  const segunda = new Date('2026-11-16T03:30:00Z') // segunda 0h30 em São Paulo
  const w2 = weekInfo(g, segunda)
  assert.equal(w2.cur, '2026-11-16')
  assert.equal(w2.aberta(w2.cur), false)
  assert.equal(w2.aberta(w2.next), true)
})
