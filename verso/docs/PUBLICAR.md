# Publicar o Verso (Supabase + Vercel)

Tempo: ~15 minutos. Você só precisa de contas gratuitas no Supabase e na Vercel e deste repositório no GitHub.
**Nenhuma chave vai para o chat nem para o código**: elas entram como variáveis de ambiente na Vercel.

## 1. Banco (Supabase)
1. Em supabase.com → **New project** (região próxima, ex.: South America). Guarde a senha do banco.
2. **SQL Editor** → cole todo o arquivo `supabase/migrations/0002_salas.sql` → **Run**.
   (Cria `livros_versoes`, `salas`, `relatos` com RLS ligado e sem policies: as chaves públicas do Supabase não leem nada.)
3. **Project Settings → Database → Connection string → "Transaction pooler"** (porta 6543). Copie a URL e troque `[YOUR-PASSWORD]` pela senha.
   Use o **pooler**: a Vercel abre muitas conexões curtas e a conexão direta (5432) esgota.

## 2. Site (Vercel)
1. vercel.com → **Add New → Project** → importe este repositório.
2. **Root Directory:** `verso`. Framework: Next.js (detectado).
3. **Environment Variables** (Production):
   | Nome | Valor |
   | --- | --- |
   | `DATABASE_URL` | a URL do pooler do passo 1.3 |
   | `ANTHROPIC_API_KEY` | *(opcional)* só se quiser o par IA do modo solo com modelo; sem ela usa a escolha por personalidade |
4. **Deploy.** Abra a URL, "Jogar a dois", mande o código/link para outra pessoa.

## 3. Conferir que está no ar
- Abra a URL em dois aparelhos (ou um anônimo + um normal) e jogue uma cena.
- Se aparecer "O servidor ainda não está configurado para guardar partidas": `DATABASE_URL` não foi definida ou está errada (veja **Logs** na Vercel).
- Se travar ao criar sala: confira se usou a URL do *pooler* e se a senha foi trocada.

## Como funciona (e limites)
- O navegador só fala com `/api/*`. O servidor roda o motor e devolve **só a visão do assento**. O banco nunca é acessível ao navegador.
- Várias instâncias da Vercel podem gravar a mesma sala: a gravação usa `rev` (compare-and-swap); em conflito, relê e reaplica.
- O progresso é por *polling* de 1,2 s (sem Realtime). Funciona bem para dois jogadores; para muitas salas simultâneas, o próximo passo é Supabase Realtime.
- Salas antigas não são apagadas. Para limpar: `delete from salas where atualizada < now() - interval '30 days';`
- Adicionar um livro novo: coloque o JSON em `content/livros/`, rode `npm run lint:livros` e `npm run sim -- <slug>`, faça deploy. Salas em andamento continuam na versão antiga (ficam presas ao hash).
- Falta antes de divulgar: login/contas, verificação de idade para +18, moderação dos relatos (hoje só gravam em `relatos`), limite de uso por IP.

## Cloudflare Workers (alternativa à Vercel)
Endereço: **https://lovesparks.verso.business** (domínio `verso.business` na Cloudflare).

1. Workers & Pages → Create → Import a repository → `klissas`. Nome do projeto: **`lovesparks`** (igual ao `name` do `wrangler.jsonc`).
   Root directory `verso` · branch `main` · build `npm ci && npx opennextjs-cloudflare build` · deploy `npx wrangler deploy`.
2. Settings → Variables and secrets → segredo `DATABASE_URL` (Supabase, Transaction pooler, porta 6543).
3. O `wrangler.jsonc` já declara a rota `lovesparks.verso.business` como custom domain: o deploy cria o DNS.
4. Conferir `https://lovesparks.verso.business/api/saude` (deve vir `"ok": true`).

Notas técnicas: os livros entram no bundle (`scripts/gerar-biblioteca.mjs`, no `prebuild`); o Workers abre uma conexão Postgres por consulta (não reaproveita entre requisições); teste local: `npm run cf:preview` (segredos em `.dev.vars`, fora do Git).

### Cloudflare + Supabase: Hyperdrive

O Worker não consegue validar o certificado do Supabase, e a conexão cai com "Connection terminated unexpectedly". O Hyperdrive resolve isso:

1. Painel → Storage & databases → Hyperdrive → Create. Cole a URL do Supabase (Transaction pooler, porta 6543, senha preenchida). Copie o **ID** da configuração (não é segredo).
2. Em `wrangler.jsonc`, adicione `"hyperdrive": [{ "binding": "HYPERDRIVE", "id": "<ID>" }]`.
3. Novo deploy. O código usa o Hyperdrive quando o binding existe e cai para `DATABASE_URL` quando não existe.
