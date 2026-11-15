-- VERSO · modelo em uso (substitui o 0001, que nunca foi executado).
-- O servidor (Route Handlers) é o único que fala com o banco, por conexão direta (DATABASE_URL).
-- O navegador NUNCA acessa estas tabelas: ele só recebe a visão do próprio assento pela API.
-- Por isso: RLS ligado e NENHUMA policy => as chaves anon/authenticated do Supabase não leem nem escrevem nada.

create table if not exists public.livros_versoes (
  hash      text primary key,          -- sha256 curto do JSON do livro: a sala fica travada nesta versão
  slug      text not null,
  conteudo  jsonb not null,
  criada_em timestamptz not null default now()
);

create table if not exists public.salas (
  codigo      text primary key check (codigo ~ '^[A-Z]{5}$'),
  rev         integer not null default 0,
  status      text not null check (status in ('lobby','jogando','fim')),
  livro_hash  text not null references public.livros_versoes(hash),
  doc         jsonb not null,           -- jogadores (com tokens), estado, diário. Nunca vai inteiro ao cliente.
  criada_em   timestamptz not null default now(),
  atualizada  timestamptz not null default now()
);
create index if not exists salas_atualizada on public.salas (atualizada);

create table if not exists public.relatos (
  id         uuid primary key default gen_random_uuid(),
  codigo     text,
  livro      text not null,
  no_interno text,                      -- id interno só para o admin; nunca mostrado ao jogador
  seat       text check (seat in ('A','B')),
  texto      text not null check (char_length(texto) between 3 and 2000),
  criado_em  timestamptz not null default now()
);

alter table public.livros_versoes enable row level security;
alter table public.salas          enable row level security;
alter table public.relatos        enable row level security;
-- sem policies de propósito.

-- o Supabase concede privilégios às roles de API por padrão; retira explicitamente.
do $$ begin
  if exists (select 1 from pg_roles where rolname = 'anon') then
    revoke all on public.livros_versoes, public.salas, public.relatos from anon;
  end if;
  if exists (select 1 from pg_roles where rolname = 'authenticated') then
    revoke all on public.livros_versoes, public.salas, public.relatos from authenticated;
  end if;
end $$;
