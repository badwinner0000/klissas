export type Rng = () => number;

/** PRNG determinístico (mulberry32) para testes e simulações. */
export function criarRng(seed: number): Rng {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export const d6 = (rng: Rng) => 1 + Math.floor(rng() * 6);

export type Nivel = 'ok' | 'parcial' | 'falha';
/** ≥10 sucesso · 7–9 parcial · ≤6 falha */
export function nivelDoTotal(total: number): Nivel {
  return total >= 10 ? 'ok' : total >= 7 ? 'parcial' : 'falha';
}
export function testar(rng: Rng, atributo: number, mod = 0) {
  const dados: [number, number] = [d6(rng), d6(rng)];
  const total = dados[0] + dados[1] + atributo + mod;
  return { dados, total, nivel: nivelDoTotal(total) };
}
