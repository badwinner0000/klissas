# Verso · Plano de implementação (para revisão)

## 1. Decisões (registradas; me corrija se discordar)

| Tema | Decisão | Motivo |
| --- | --- | --- |
| Local | `verso/` dentro deste repo | o repo já tem outro app (Tá Pago); não misturar |
| Gerenciador | pnpm, Node 20, Next 15 App Router, TS estrito, Tailwind | pedido + padrão |
| Testes | Vitest (motor, lint, sim), Playwright (E2E, 2 contextos) | pedido |
| Convidado | `supabase.auth.signInAnonymously()` | dá um `auth.uid()` real, então RLS funciona igual |
| Escrita de jogo | Route Handler roda o motor TS e chama `aplicar_turno()` (Postgres, só `service_role`) com compare-and-swap em `rev` | motor fica em um só lugar e testável; o banco garante atomicidade |
| Privacidade | estado dividido: `game_state.publico` (os dois) + `seat_state.privado` (só o dono). Eventos têm `visibilidade`. Realtime respeita RLS, então segredo não trafega | regra §5.5 |
| Voto secreto | `secret_votes` legível só pelo dono; o resultado vira evento público **sem dizer quem recuou** | §5.4 |
| Conteúdo do livro no cliente | **não vai inteiro**. O servidor devolve só o nó atual já renderizado para aquele assento | evita vazar cena solo do outro e finais |
| IA solo | Claude via API no servidor, devolve **apenas o id da opção**, timeout + retry + fallback determinístico por personalidade | §7 |
| Capas | capa procedural SVG (tipografia + paleta do tema) sempre; capa de IA é opcional por cima | §5.7 |
| Idade | `pode_ver_adulto()` = data_nasc ≥ 18 anos **e** opt-in; usada na RLS de `books` | §1 |

## 2. Estrutura

```
verso/
  supabase/migrations/        0001_init.sql (anexo), 0002_seed.sql
  src/
    engine/                   puro, sem React
      tipos.ts  estado.ts  dados.ts  template.ts  render.ts
      nos/ segue solo dialogo dividir decisao puzzle fim final
      consentimento.ts  ia-escolha.ts
    content/schema.ts         zod do JSON de livro
    app/                      rotas Next (telas §2) + app/api/* (Route Handlers)
    components/  theme/tokens.ts  lib/supabase/{browser,server,admin}.ts
  content/livros/             <slug>.json
  scripts/                    lint-livros  sim  trilha  contar  migrar-padrinhos
  tests/                      unit/  e2e/
  .github/workflows/ci.yml
```

## 3. Telas e rotas

`/` splash+login · `/biblioteca` · `/novo/[slug]` · `/sala/[codigo]` (lobby → leitor) ·
`/partidas` · `/config` · `/admin` · `/fim/[roomId]`.
Tema: tokens extraídos das imagens (fundo escuro azul-petróleo com gradiente + cards translúcidos e pílulas, para o leitor; tema claro creme/branco com tipografia grossa para biblioteca e perfil). Cada livro sobrepõe paleta e fonte de título.

## 4. API do servidor

- `POST /api/salas` cria sala (livro, modo, premissa) · `POST /api/salas/entrar` (código)
- `POST /api/salas/[id]/pronto`
- `POST /api/jogo/[id]/acao` (`{rev, tipo, payload}`): valida vez/nó/assento → motor → `aplicar_turno`; em conflito responde 409 e o cliente relê
- `GET /api/jogo/[id]/visao`: devolve a visão do assento (nó renderizado, ficha, diário, quem está esperando)
- `POST /api/jogo/[id]/voto`: voto secreto; quando os dois votaram, resolve e emite evento público
- `POST /api/reports` · `POST /api/admin/livros` (upload JSON + lint)

## 5. Marcos e como cada um é provado

| Marco | Entrega | Prova |
| --- | --- | --- |
| a | Next + schema + auth + RLS | testes SQL/JS com chave anônima: não lê sala alheia, não lê voto do outro, não escreve `game_state`, não vira admin |
| b | motor + template + testes | Vitest: resultado por escolha, sem dados (variantes por nervosismo), 3 opções por turno com pool, não-repetição em `dividir`, consentimento nas 4 políticas |
| c | lobby + leitor em tempo real | teste de integração com 2 clientes, reconexão relê o estado |
| d | biblioteca + tema | screenshots Playwright em 375/768/1280, Lighthouse |
| e | modo solo | IA mockada: só devolve ids válidos; fallback quando falha/timeout |
| f | lint + sim + trilha + contar | livro de exemplo mínimo: zero erros; livro-fixture com defeitos plantados: cada regra §5 reprova |
| g | E2E + CI | 2 contextos jogam até o fim, caem e voltam, sem vazamento |

Cada bug corrigido vira teste de regressão. A cada marco eu informo o que passou e o que **não** foi testado (por exemplo, Lighthouse e dois aparelhos reais só dá para você validar em produção).

## 6. Pontos de atenção do schema (`0001_init.sql`)

- Cliente tem só `select`; as únicas escritas diretas são o próprio `profiles` e `reports`. `is_admin` é protegido por trigger.
- `rooms` referencia `(book_id, book_versao)` em `book_versions`: sala fica travada na versão em que começou.
- `game_events` é imutável (trigger), com `visibilidade` para o diário privado e a exportação.
- Grants explícitos, porque o app anterior quebrou com auto-expose desligado.
- Buckets `capas` (leitura pública, escrita admin) e `personagens` (pasta por usuário), com policies criadas junto.

## 7. O que preciso de você (não bloqueia o marco a)

1. **Os arquivos de regras** (Bíblia de Criação e Regras de Ouro do Modo Dupla) **não chegaram**: só vieram as 4 imagens. Usei o resumo do prompt; se houver diferença, mande os arquivos.
2. **O código JS de "Padrinho e Madrinha"** não está no repositório. Preciso dele antes do script de migração e do livro de exemplo real. Até lá uso uma fixture mínima.
3. **Chaves** (não cole aqui): `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, `ANTHROPIC_API_KEY`. Entram como variáveis na Vercel/`.env.local`; no marco a rodo tudo no `supabase start` local.
4. As imagens de referência mostram **dois estilos** (escuro azulado e claro creme). Plano: escuro no leitor e na boas-vindas, claro na biblioteca/perfil, com alternância em Configurações. Diga se prefere um só.
