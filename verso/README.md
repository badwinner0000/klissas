# Verso

Livros-jogo em pt-BR para duas pessoas. Plano completo em `docs/PLANO.md`; schema em `supabase/migrations/0001_init.sql`.

## Estado atual

| Marco | Situação |
| --- | --- |
| a) schema + auth + RLS | schema escrito, **ainda não executado nem testado** (sem Supabase local neste ambiente) |
| b) motor + testes | feito: `src/engine/` (puro) + `tests/unit/` |
| f) lint / sim / trilha / contar | feito |
| c) leitor e lobby em tempo real, d) biblioteca e tema, e) modo solo, g) E2E + CI | pendentes |

## Comandos (dentro de `verso/`)

```
npm test                       # vitest
npm run typecheck
npm run lint:livros [slug]     # regras §5 e §6.2; erro bloqueia publicação
npm run sim -- <slug> [N]      # N × 4 políticas de consentimento × 4 combinações de gênero
npm run trilha -- <slug> <ambos|nenhum|soA|soB> [seed]
npm run contar -- <slug>
```

## Livro de exemplo

`content/livros/voo-cancelado.json` é um livro **original e mínimo** (2 capítulos, ~15 cenas) que exercita todos os tipos de nó
(segue, solo, dialogo, dividir, decisao, consentimento, fim, final). Não segue a meta de 25–35 mil palavras: serve de fixture.
O lint emite avisos `cena-curta` por isso.

## Decisões

- Estado do motor tem `segredos` (votos). O servidor nunca o projeta ao cliente; vai para `secret_votes`.
- `requer` / `exclui` em nós: declaram de qual lado do consentimento o nó vive. O lint exige isso e o motor lança "contradição" se um nó for visitado do lado errado.
- Nó `puzzle` ainda não implementado.
- Linha do tempo: só exigida e exibida; a checagem de consistência de datas/horários ainda **não** existe.
