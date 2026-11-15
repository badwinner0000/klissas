// IA do modo solo: só ESCOLHE entre as opções que o nó oferece (devolve um id). Nunca escreve texto livre.
// Sem chave da API (ou se a chamada falhar/demorar), usa a escolha determinística por personalidade.
import type { Seat } from '../content/schema';
import type { Acao_, Estado, Visao } from '../engine/motor';

const PESO_TOM: Record<string, number> = { cuida: 3, abre: 2, flerte: 1, seco: 0, fere: -3 };

/** Personalidade do par: abre-se quando há vínculo, protege-se quando está abalado, provoca quando há faísca. */
export function escolhaDeterministica(v: Visao, e: Estado, seat: Seat): Acao_ {
  const op = v.opcoes;
  if (v.tipo === 'consentimento') {
    // vota em segredo com base no que viveu: só avança com vínculo e sem muito abalo
    const quer = e.vinculo >= 3 && e.nervosismo[seat] <= 3;
    return { tipo: 'voto', id: quer ? 'avancar' : 'ficar' };
  }
  if (op[0]?.id === 'continuar') return { tipo: 'continuar' };
  if (v.tipo === 'decisao' && v.votoDoOutro && op.some((o) => o.id === v.votoDoOutro!.id)) return { tipo: 'opcao', id: v.votoDoOutro.id };
  const pontos = (o: (typeof op)[number], i: number) => {
    let p = o.tom ? (PESO_TOM[o.tom] ?? 0) : 0;
    if (o.tom === 'flerte' && e.fa >= 1) p += 2;
    if (o.tom === 'seco' && e.nervosismo[seat] >= 3) p += 2;
    if ((o.tom === 'cuida' || o.tom === 'abre') && e.vinculo >= 3) p += 1;
    return p * 10 - i; // desempate estável: primeira opção
  };
  const melhor = op.map((o, i) => ({ o, p: pontos(o, i) })).sort((a, b) => b.p - a.p)[0]!;
  return { tipo: 'opcao', id: melhor.o.id };
}

export async function escolhaDaIA(v: Visao, e: Estado, seat: Seat, nomes: { eu: string; par: string }): Promise<Acao_> {
  const base = escolhaDeterministica(v, e, seat);
  const chave = process.env.ANTHROPIC_API_KEY;
  // continuar e consentimento não precisam de modelo; só escolhas com mais de uma opção de conteúdo
  if (!chave || base.tipo === 'continuar' || v.opcoes.length < 2) return base;
  try {
    const ctl = new AbortController();
    const t = setTimeout(() => ctl.abort(), 8000);
    const r = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      signal: ctl.signal,
      headers: { 'x-api-key': chave, 'anthropic-version': '2023-06-01', 'content-type': 'application/json' },
      body: JSON.stringify({
        model: process.env.VERSO_MODELO_IA ?? 'claude-haiku-5-5',
        max_tokens: 20,
        system: `Você interpreta ${nomes.eu}, par romântico de ${nomes.par} num livro-jogo. Escolha UMA opção pelo id, coerente com o vínculo (${e.vinculo}/10), a faísca (${e.fa}/5) e o nervosismo (${e.nervosismo[seat]}/6). Responda só com o id.`,
        messages: [{ role: 'user', content: `Cena:\n${v.texto.slice(0, 1500)}\n\nOpções:\n${v.opcoes.map((o) => `${o.id} :: ${o.texto}${o.tom ? ` (${o.tom})` : ''}`).join('\n')}` }],
      }),
    });
    clearTimeout(t);
    const j = (await r.json()) as { content?: { text?: string }[] };
    const id = j.content?.[0]?.text?.trim();
    if (id && v.opcoes.some((o) => o.id === id)) return v.tipo === 'consentimento' ? base : { tipo: 'opcao', id };
  } catch {
    /* timeout/erro de rede: segue com a escolha determinística */
  }
  return base;
}
