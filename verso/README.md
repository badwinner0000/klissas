# Verso

Livros-jogo em pt-BR para duas pessoas. Plano completo em `docs/PLANO.md`; schema em `supabase/migrations/0001_init.sql`.

## Estado atual

| Marco | Situação |
| --- | --- |
| a) schema + auth + RLS | schema escrito, **ainda não executado nem testado** (sem Supabase local neste ambiente) |
| b) motor v2 + testes | feito, sem dados e sem puzzle: `src/engine/` (puro) + `tests/unit/` (40 testes) |
| f) lint / sim / trilha / contar | feito |
| Padrinho e Madrinha migrado | feito (ver abaixo) |
| c) leitor e lobby em tempo real, d) biblioteca e tema, e) modo solo, g) E2E + CI | pendentes |

## Padrinho e Madrinha (primeiro livro real) — migrado

`content/livros/padrinhos.json` é gerado por `npm run migrar:padrinhos` a partir de `fontes/padrinho-e-madrinha/` (conversor por AST em `scripts/migracao/converter.mjs`; nada é copiado à mão).

| Verificação | Resultado |
| --- | --- |
| Conversão | 122 nós, 0 problemas não mapeados |
| `lint:livros padrinhos` | **0 erros**, 183 avisos |
| `sim padrinhos` | 640 partidas (4 políticas × 4 gêneros × 40): 0 erros, todos os 122 nós visitados |
| Consentimento (4 políticas) | chega ao fim sem texto contraditório; nó "sim" nunca aparece se alguém recusou |
| Cobertura vs gabarito do zip | 96,4% dos parágrafos (400 partidas aleatórias, `npx tsx scripts/migracao/comparar.ts`) |

Decisões da migração:
- **Sem dados e sem puzzle.** Os 58 testes viram variantes: o ramo `falha` do original vale quando o personagem está com nervosismo ≥ 3 (`abalo>=3`); caso contrário, o ramo `ok`. O único puzzle (a mesa 7) virou uma decisão conjunta.
- **Consentimento:** as 7 cenas `secreto` viraram nós `consentimento`; as flags individuais (`noite3_a`/`_b`...) são **privadas** (`flagsPrivadas()`), e o servidor não pode projetá-las ao cliente.
- **Correções editoriais** (o original violava as regras do Verso em 4 trechos que narravam fala de protagonista sem escolha) e 2 opções com gênero fixo: ficam listadas em `CORRECOES` no conversor, com o motivo.
- **Perspectiva:** resultados são escritos em 2ª pessoa de quem age e o parceiro lê em 3ª (porte de `terceira()/vistaDoPar()` do motor original).

Dívida conhecida, a resolver depois (não bloqueia):
- **114 "escolhas mortas"**: flags que o original grava e nenhuma cena lê. Estão no `escolhasMortasToleradas` do livro (aviso, não erro). Cada uma é uma escolha que não muda nada: ligar a uma cena posterior ou cortar. Livros novos têm baseline vazio.
- **Ramos `falha`** só aparecem com nervosismo alto, então são raros (parte dos 3,6% de parágrafos do gabarito não cobertos).
- **64 cenas < 150 palavras** (a Bíblia pede 150–400); 5 acima de 400.
- O lint de agência cobre fala e sentimento de protagonista; ações do próprio personagem em cenas solo lineares ("Você senta...") continuam como no original.

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
- **Sem dados.** O Verso não é RPG: não há rolagem nem atributos. O resultado de uma ação é escolhido por `variantes` (primeira cuja condição vale), e a condição pode olhar flags, vínculo e o nervosismo acumulado por escolhas anteriores. Mesmo estado, mesmo resultado.
- Nó `puzzle` ainda não implementado.
- Linha do tempo: só exigida e exibida; a checagem de consistência de datas/horários ainda **não** existe.
