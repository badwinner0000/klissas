# Tá Pago

App de celular para um grupo pequeno competir em hábitos saudáveis. Cada pessoa monta a promessa da semana até domingo, 23h59, posta o que fez com foto e disputa o ranking.

- **Frontend:** React + Vite. Funciona como app instalável no celular (PWA).
- **Banco, login e fotos:** Supabase (grátis para um grupo deste tamanho).
- **Hospedagem:** Vercel (grátis).

## Passo a passo para colocar no ar (uns 20 minutos)

### 1. Criar o banco no Supabase

1. Entre em [supabase.com](https://supabase.com) e crie uma conta (pode usar o GitHub).
2. Clique em **New project**. Dê um nome (ex.: `ta-pago`), crie uma senha forte para o banco (guarde, mas o app não usa) e escolha a região **South America (São Paulo)**.
3. Quando o projeto terminar de criar, abra **SQL Editor** no menu da esquerda, clique em **New query**, cole todo o conteúdo de [`supabase/schema.sql`](supabase/schema.sql) e clique em **Run**. Deve aparecer "Success".
4. Abra **Authentication > URL Configuration**:
   - Em **Site URL**, coloque o endereço do app na Vercel (você pega no passo 2; volte aqui depois).
   - Em **Redirect URLs**, adicione o mesmo endereço e também `http://localhost:5173` se for testar no computador.
5. Abra **Project Settings > API** e copie dois valores:
   - **Project URL** (algo como `https://abcd1234.supabase.co`)
   - **anon public** key (uma chave longa)

   A chave anon pode ficar no app: ela é pública por design, e a proteção vem das regras do banco. **Nunca** use a chave `service_role` no app.

### 2. Publicar na Vercel

1. Entre em [vercel.com](https://vercel.com) com sua conta do GitHub.
2. **Add New > Project**, escolha o repositório `klissas`.
3. Em **Root Directory**, clique em Edit e escolha `app/web`. A Vercel detecta Vite sozinha.
4. Em **Environment Variables**, adicione:
   - `VITE_SUPABASE_URL` = o Project URL
   - `VITE_SUPABASE_ANON_KEY` = a chave anon
5. Clique em **Deploy**. No fim aparece o endereço (ex.: `https://ta-pago.vercel.app`). Volte ao passo 1.4 e coloque esse endereço no Supabase.

Se o app abrir mostrando "Falta conectar o banco de dados", as variáveis do passo 4 não foram salvas. Corrija e clique em **Redeploy**.

### 3. Começar o grupo

1. Abra o endereço no celular, toque em **Começar** e entre com seu e-mail. Abra o link que chega no e-mail **no mesmo celular**.
2. No onboarding, escolha **Criar grupo**. Você vira admin, e o app mostra o **código do grupo** (ex.: `TP-4K9QZ`).
3. Mande o endereço e o código para os outros. Cada um entra com o próprio e-mail e escolhe **Tenho um código**.
4. Para instalar como app: no iPhone, Safari > Compartilhar > **Adicionar à Tela de Início**. No Android, Chrome > menu > **Instalar app**.

Na **primeira semana** do grupo, a promessa fica aberta por 24 horas depois da criação, para dar a largada. Depois disso vale a regra normal: a promessa da semana seguinte trava domingo, 23h59.

### Limite do e-mail de login

O Supabase grátis manda poucos e-mails de login por hora (o limite exato aparece em **Authentication > Rate Limits**). Para 6 pessoas basta. Se precisar de mais, configure um SMTP próprio em **Authentication > Emails > SMTP Settings**.

## Regras de pontuação

Tudo é configurável pelo admin na tela **Grupo**.

| Situação | Pontos (padrão) |
|---|---|
| Meta mínima (ex.: 3 treinos) | até 10, proporcional ao que foi postado |
| Bateu a meta inteira | +5 de bônus |
| Limite máximo (ex.: doces) respeitado | +6 |
| Cada unidade acima do limite | −4 |
| Post com 3 contestações | deixa de contar |
| Não montou a promessa até domingo, 23h59 | vale só com os mínimos do grupo |

- Cada hábito tem um **teto por dia** (ex.: 4 L de água, 1 sessão de treino), para ninguém lucrar postando tudo no mesmo dia.
- Peso e medidas são só registro e não pontuam.
- O placar é calculado no banco (função `placar`), então todos veem o mesmo número.

## Desenvolvimento local

```bash
cd app/web
cp .env.example .env   # preencha com os dados do Supabase
npm install
npm run dev            # abre em http://localhost:5173
npm test               # testa a pontuação e as datas
npm run test:db        # testa o schema.sql e as regras de segurança num Postgres em memória
```

## Estrutura

```
app/
  data/habitos.json        catálogo com 214 hábitos (unidade, modo, meta sugerida, teto por dia)
  prototype/index.html     protótipo de layout sem banco
  web/
    supabase/schema.sql    tabelas, regras de segurança, placar e armazenamento de fotos
    src/lib/               pontuação, datas da semana, catálogo, conexão
    src/screens/           telas: login, onboarding, início, promessa, ranking, comunidade, progresso, grupo
```
