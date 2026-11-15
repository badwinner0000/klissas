# Verso

Livros-jogo em pt-BR para duas pessoas. Plano completo em `docs/PLANO.md`; schema em `supabase/migrations/0001_init.sql`.

## Estado atual

| Marco | Situação |
| --- | --- |
| a) schema + auth + RLS | schema escrito, **ainda não executado nem testado** (sem Supabase local neste ambiente) |
| b) motor + testes | feito: `src/engine/` (puro) + `tests/unit/` |
| f) lint / sim / trilha / contar | feito |
| c) leitor e lobby em tempo real, d) biblioteca e tema, e) modo solo, g) E2E + CI | pendentes |

## Prioridade de conteúdo

**O primeiro livro real do Verso é "Padrinho e Madrinha"** (Love Story Nº 5). O material de origem está em
`fontes/padrinho-e-madrinha/` (código JS dos 21 arquivos de capítulo, motor de referência, ferramentas antigas e o texto
lido de ponta a ponta, que serve de gabarito da migração). `voo-cancelado` fica só como fixture de teste.

Levantamento para a migração (feito sobre o material, ainda sem converter nada):
- ~120 cenas e ~26,6 mil palavras; tipos usados: segue 35, dividir 26, dialogo 19, fim 9, decisao 5, puzzle 1, final 1 (e as cenas solo).
- Textos são funções JS com poucos helpers: `c.f(flag)` (166 usos), `lsNoite` (consentimento), `lsSeat`, `lsSim`, nome e gênero (`pda`, `pdgA`...). Isso torna a conversão para templates seguros viável, mas não 100% automática: cadeias de ternário precisam de revisão humana.
- Lacunas do meu motor a fechar antes: nó `puzzle`; opções de diálogo que dependem do histórico inteiro (`ops:(c,h)=>`), não só do tom anterior; faixas de nervosismo que mudam texto; atributos do livro (Lábia, Cabeça, Agilidade, Coragem, Força) no lugar dos de exemplo; ordem real dos votos secretos.
- Gabarito: o `.md` completo (caminho em que os dois aceitam) deve bater com a trilha gerada pelo Verso para a mesma política.

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
