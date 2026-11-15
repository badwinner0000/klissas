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
| Conversão | 124 nós, 0 problemas não mapeados |
| `lint:livros padrinhos` | **0 erros**, 183 avisos |
| `sim padrinhos` | 640 partidas (4 políticas × 4 gêneros × 40): 0 erros, todos os 122 nós visitados |
| Consentimento (4 políticas) | chega ao fim sem texto contraditório; nó "sim" nunca aparece se alguém recusou |
| Cobertura vs gabarito do zip | 96,4% dos parágrafos (400 partidas aleatórias, `npx tsx scripts/migracao/comparar.ts`) |

Decisões da migração:
- **Sem dados e sem puzzle.** Os 58 testes viram variantes. O ramo `falha` do original vale quando o personagem está abalado (`abalo>=1`) **ou** quando a ação foge do que ele sabe fazer (perfil do personagem em `base.js`, só atributos negativos: a Ivy é ruim de força; o Sam, de lábia). Não há número visível nem sorteio; é caracterização. O nervosismo cai 2 pontos a cada fim de capítulo, então cada capítulo começa calmo e escorrega conforme as coisas se acumulam. Medido: com `abalo>=3` (a primeira versão) 56 dos 116 ramos nunca apareciam; agora são 20. `npm run sim` lista esses ramos como aviso. O único puzzle (a mesa 7) virou uma decisão conjunta.
- **Consentimento:** as 7 cenas `secreto` viraram nós `consentimento`; as flags individuais (`noite3_a`/`_b`...) são **privadas** (`flagsPrivadas()`), e o servidor não pode projetá-las ao cliente.
- **Correções editoriais** (o original violava as regras do Verso em 4 trechos que narravam fala de protagonista sem escolha) e 2 opções com gênero fixo: ficam listadas em `CORRECOES` no conversor, com o motivo.
- **Perspectiva:** resultados são escritos em 2ª pessoa de quem age e o parceiro lê em 3ª (porte de `terceira()/vistaDoPar()` do motor original).

Dívida conhecida, a resolver depois (não bloqueia):
- **Escolhas mortas** (flags que o original grava e nenhuma cena lê): de 114, **faltam os capítulos 6 a 10** (1 a 5 resolvidos; veja `lint:livros`). As reações ficam em `scripts/migracao/consequencias-padrinhos.json`, aplicadas pelo conversor com validação (a cena vem depois da escolha; reação a escolha solo só aparece para quem a fez; há teste de que nada vaza). Relatório do que falta: `node scripts/migracao/relatorio-mortas.mjs <capítulo>`. As que sobrarem ficam em `escolhasMortasToleradas` (aviso). Livros novos têm baseline vazio.
- **20 ramos de resultado nunca aparecem** (ex.: o enjoo no barco, `pd_c2_armadilhas.o2`, primeira cena do capítulo 2): decisão de roteiro pendente (dar um gatilho por escolha anterior, ou cortar).
- **Ramos `falha`** só aparecem com nervosismo alto, então são raros (parte dos 3,6% de parágrafos do gabarito não cobertos).
- **64 cenas < 150 palavras** (a Bíblia pede 150–400); 5 acima de 400.
- **Cerimônia do cap. 9 corrigida:** o discurso dos protagonistas virou o diálogo `pd_c9_microfone` (3 tons por jogador). Há ainda 34 nós com falas sem atribuição na fila de revisão (`fala-sem-atribuicao`); li os suspeitos e são de NPC.
- O lint de agência cobre fala e sentimento de protagonista; ações do próprio personagem em cenas solo lineares ("Você senta...") continuam como no original.

## Rodar o app (local, dois navegadores)

```
npm install
npm run build && npm start        # http://localhost:3100
```
Abra duas janelas (ou dois aparelhos na mesma rede): numa, "Jogar a dois" → código de 5 letras; na outra, "Entrar numa sala". Modo solo: "Jogar solo".
`npm run dev` roda em modo desenvolvimento. Teste E2E com dois navegadores: `node tests/e2e/dois-jogadores.cjs` (variáveis `E2E_POLITICA=ambos|nenhum|soA|soB`, `E2E_SEMENTE`).

Como funciona: o servidor roda o motor (`src/lib/jogo.ts`) e devolve **só a visão do assento** de quem pergunta (`GET /api/salas/:codigo`, cabeçalho `x-token`). O cliente nunca recebe flags, estado, votos nem ids internos de cena. A sala guarda um **snapshot do livro** (hash) e nunca muda de versão no meio da partida. As salas ficam em `.data/` (arquivo): `src/lib/store.ts` é a interface a trocar pelo Supabase.

**Verificado (dois navegadores independentes, 375px, Padrinho e Madrinha completo):** as 4 políticas de consentimento (`ambos`, `nenhum`, `soA`, `soB`) chegam ao fim; B fecha a aba no meio e volta pela sessão guardada; texto limpo nas duas telas; nenhum erro de JavaScript; B nunca recebe token, flags, segredos, estado interno, ids de cena nem a cena solo de A; exportação em Markdown com nomes reais; 403/404 com mensagem humana. Modo solo completou o livro inteiro nos dois assentos pela API (sem chave de IA: escolha determinística; o caminho com `ANTHROPIC_API_KEY` não foi testado).

**Não feito / não testado nesta etapa:** adaptador Supabase (auth, Realtime, `secret_votes` por RLS; o SQL de `supabase/migrations/0001_init.sql` nunca foi executado), verificação de idade para conteúdo +18, tela de administração, capas, Tailwind (o CSS é próprio), Lighthouse. O tempo real é por *polling* de 1,2 s.

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
