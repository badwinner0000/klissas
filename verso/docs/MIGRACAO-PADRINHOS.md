> **Status: concluída.** Resultado e dívida conhecida em `README.md`. O texto abaixo é o plano original; o motor v2 descrito já existe.

# Migração de Padrinho e Madrinha (primeiro livro real)

Fonte: `fontes/padrinho-e-madrinha/`. Inventário reproduzível: `node scripts/migracao/inventario.mjs`.

## O que o inventário mostrou
- 122 nós: segue 35, dividir 26 (+26 "solo" com `ops`), dialogo 19, fim 9, decisao 5, final 1, puzzle 1.
- Só **39 formas distintas** de expressão dentro dos `${...}`. As dominantes: `c.f(flag)?:` (59), `c.Q/c.q` (59), `pdgA/pdgB` gênero (52), `ehPA/ehPB` quem lê (28), nomes `pdFA/pdFB/pda/pdb` (40), `lsNoite` (6).
- Conversão por **AST (acorn)**, não por regex: cada expressão é mapeada para um token do template seguro; o que não mapear vira erro listado, nunca texto silenciosamente errado.

## Decisão: sem dados
O original usa `at`/`ok`/`falha` (2d6 + atributo ± abalo). No Verso: cada `ops` com teste vira **variantes** condicionais.
`ok` → variante padrão; `falha` → variante com `se: abaloMin` (o personagem está abalado por escolhas anteriores). Os atributos (Lábia, Cabeça...) deixam de existir.
Se você preferir outra regra (por exemplo, sempre o ramo `ok`), é só uma troca no transpilador.

## O que o motor v2 precisa (não existe ainda)
1. **Perspectiva.** Resultados são escritos em 2ª pessoa do ponto de vista de quem age; o parceiro lê em 3ª pessoa. Portar `terceira()/vistaDoPar()` do motor original e renderizar com `eu` (quem lê) e `ator` (quem agiu).
2. **Tokens novos de template:** `{{A.ref}}` ("você" ou nome conforme quem lê), `{{quem}}/{{Quem}}`, `{{outroquem}}`, `{{eu.o_a}}`, `{{se eu:A}}`, `{{se vinculo>=6}}`, `{{se fa>=2}}`, `{{se abalo>=3}}`, e `{{se flag:a}} e {{se flag:b}}` combinados (`lsNoite`).
3. **Solo = `ops` com várias escolhas**, cada uma usável uma vez, com `ir` de saída (hoje: 1 escolha por cena solo).
4. **`dividir` com `cada: N`** (N ações por jogador), `secreto` (escolhas reveladas só depois dos dois), `se`/`req`/`nao`/`so` por ação.
5. **Diálogo com histórico:** opções dependem de `tag`/`tom` de qualquer turno anterior, não só do último; `apos`; reciprocidade que sobe vínculo; `fa` (faísca) e nervosismo por tom (`cuida` alivia o outro, `fere` derruba vínculo).
6. **`decisao`**: voto dos dois, só vale quando coincidem; `prox` pode ser função.
7. ~~`puzzle`~~ (removido a pedido: virou decisão conjunta) e **`final`** com texto composto por blocos condicionais.
8. **Votos como flags por assento** (`bateu1_a`/`bateu1_b`) já existem no livro; o consentimento do Verso (`secret_votes`) precisa produzir as mesmas flags para o texto não mudar.

## Validação (aceite da migração)
- `lint:livros` e `sim` com zero erros nas 4 políticas × 4 combinações de gênero.
- Trilha com os dois aceitando bate com `padrinho-e-madrinha-historia-completa.md` (diff de texto por cena, com nomes/gêneros do gabarito).
- Palavras por capítulo ≈ 26,6 mil no total.

## Depois
Novos livros seguindo a Bíblia (10 caps, 8–12 cenas, 150–400 palavras, grande gesto, variantes "sem"). Um livro completo tem ~25–35 mil palavras; serão escritos um por vez, com lint e simulação a cada capítulo.

## Ajuste editorial: a profissão do padrinho
O padrinho (B, Sam) era professor de química de ensino médio. Como a mãe dele é uma juíza e a família é de status, ele passou a ser **professor titular de química na Brown** (o mais novo da história do departamento). `scripts/migracao/ajustes-sam.mjs` troca as 29 passagens (orientandos em vez de alunos, laboratório em vez de sala de aula, a vaga de ciências da escola de Nantucket virou a direção da Estação de Pesquisa Costeira, "o semestre começa em setembro"). O script roda depois do conversor em `npm run migrar:padrinhos`.
