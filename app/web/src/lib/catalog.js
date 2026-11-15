import catalogo from '../../../data/habitos.json'

export const HABITOS = catalogo.habitos
export const H = Object.fromEntries(HABITOS.map((h) => [h.id, h]))
export const CATEGORIAS = [...new Set(HABITOS.map((h) => h.categoria))]

export const CAT_ART = {
  'Treino de força': ['kb', 'g-a'],
  'Cardio e condicionamento': ['bike', 'g-d'],
  'Esportes e atividades': ['trophy', 'g-c'],
  'Mobilidade e recuperação': ['leaf', 'g-b'],
  'Hidratação': ['drop', 'g-d'],
  'Alimentação saudável': ['apple', 'g-b'],
  'Sono': ['moon', 'g-e'],
  'Mente e bem-estar': ['brain', 'g-e'],
  'Saúde e cuidados': ['heart', 'g-c'],
  'Consistência e comunidade': ['flame', 'g-a'],
  'Desafios prontos': ['trophy', 'g-a'],
}
export const artDe = (cat) => CAT_ART[cat] || ['star', 'g-f']

// item de promessa a partir do catálogo, com unidade, modo e teto copiados
export function itemDe(habitId, meta) {
  const h = H[habitId]
  return { habit_id: habitId, modo: h.modo, unidade: h.unidade, meta, teto_dia: h.teto_por_dia ?? null }
}
