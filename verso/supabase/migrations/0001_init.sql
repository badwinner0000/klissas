-- VERSO · schema inicial (proposta para revisão)
-- Princípios: RLS em tudo; cliente só LÊ; toda escrita de jogo passa por servidor (service_role).

create extension if not exists pgcrypto;

-- ───────────── helpers ─────────────
create or replace function public.is_admin() returns boolean
language sql stable security definer set search_path = public as $$
  select coalesce((select is_admin from profiles where id = auth.uid()), false)
$$;

create or replace function public.pode_ver_adulto() returns boolean
language sql stable security definer set search_path = public as $$
  select coalesce((select adulto_optin and data_nasc is not null
                          and data_nasc <= (current_date - interval '18 years')
                   from profiles where id = auth.uid()), false)
$$;

-- ───────────── profiles ─────────────
create table public.profiles (
  id          uuid primary key references auth.users(id) on delete cascade,
  nome        text not null default 'Leitor',
  data_nasc   date,
  adulto_optin boolean not null default false,
  is_admin    boolean not null default false,
  criado_em   timestamptz not null default now()
);
alter table public.profiles enable row level security;
create policy profiles_self_select on public.profiles for select using (id = auth.uid());
create policy profiles_self_insert on public.profiles for insert with check (id = auth.uid() and is_admin = false);
-- update: só nome/data_nasc/optin; is_admin protegido por trigger abaixo
create policy profiles_self_update on public.profiles for update using (id = auth.uid()) with check (id = auth.uid());

create or replace function public.protege_is_admin() returns trigger language plpgsql as $$
begin
  if new.is_admin is distinct from old.is_admin and current_user <> 'service_role' then
    new.is_admin := old.is_admin;
  end if;
  return new;
end $$;
create trigger profiles_protege_admin before update on public.profiles
  for each row execute function public.protege_is_admin();

-- ───────────── livros ─────────────
create table public.books (
  id          uuid primary key default gen_random_uuid(),
  slug        text unique not null,
  titulo      text not null,
  secao       text not null check (secao in ('love-sparks','k-vibes','dark-deals','bitter-sweet')),
  linha       text,
  tropes      text[] not null default '{}',
  sinopse     text,
  explicitacao text not null default 'sexy-romance' check (explicitacao in ('sexy-romance','hot')),
  adulto      boolean not null default false,
  tema        jsonb not null default '{}',
  versao      int not null default 0,          -- última versão publicada (0 = "em breve")
  publicado   boolean not null default false,
  criado_em   timestamptz not null default now()
);
alter table public.books enable row level security;
create policy books_select on public.books for select
  using (is_admin() or (publicado and (not adulto or pode_ver_adulto())));

create table public.book_versions (
  book_id   uuid references public.books(id) on delete cascade,
  versao    int not null,
  conteudo  jsonb not null,                    -- grafo de cenas (schema validado no lint)
  hash      text not null,
  criado_em timestamptz not null default now(),
  primary key (book_id, versao)
);
alter table public.book_versions enable row level security;
create policy bv_select on public.book_versions for select using (
  is_admin() or exists (select 1 from public.books b
    where b.id = book_id and b.publicado and (not b.adulto or pode_ver_adulto()))
);
-- Nota: conteúdo inteiro vai ao cliente? NÃO. O cliente recebe só o nó renderizado
-- pelo servidor (texto já resolvido, sem segredos do outro assento). Esta policy
-- existe para o admin e para o servidor; o leitor usa a API do jogo.

-- ───────────── salas ─────────────
create table public.rooms (
  id          uuid primary key default gen_random_uuid(),
  codigo      text unique not null check (codigo ~ '^[A-Z]{5}$'),
  book_id     uuid not null references public.books(id),
  book_versao int  not null,                   -- trava: sala nunca muda de versão
  modo        text not null check (modo in ('dupla','solo')),
  status      text not null default 'lobby' check (status in ('lobby','jogando','fim','arquivada')),
  criado_por  uuid not null references auth.users(id),
  criado_em   timestamptz not null default now(),
  foreign key (book_id, book_versao) references public.book_versions(book_id, versao)
);

create table public.room_players (
  room_id    uuid references public.rooms(id) on delete cascade,
  seat       text check (seat in ('a','b')),
  user_id    uuid references auth.users(id),   -- null = IA (modo solo)
  is_ia      boolean not null default false,
  personagem jsonb not null default '{}',      -- nome, gênero, idade, atributos
  pronto     boolean not null default false,
  primary key (room_id, seat),
  check ((is_ia and user_id is null) or (not is_ia and user_id is not null))
);
create unique index room_players_user_once on public.room_players(room_id, user_id) where user_id is not null;

create or replace function public.is_member(p_room uuid) returns boolean
language sql stable security definer set search_path = public as $$
  select exists (select 1 from room_players where room_id = p_room and user_id = auth.uid())
$$;
create or replace function public.my_seat(p_room uuid) returns text
language sql stable security definer set search_path = public as $$
  select seat from room_players where room_id = p_room and user_id = auth.uid()
$$;

alter table public.rooms enable row level security;
create policy rooms_select on public.rooms for select using (is_member(id) or criado_por = auth.uid());
alter table public.room_players enable row level security;
create policy rp_select on public.room_players for select using (is_member(room_id));
-- entrar/criar sala: Route Handler com service_role (valida código, adulto, vaga).

-- ───────────── estado ─────────────
-- Estado PÚBLICO (visível aos dois): posições de cena compartilhada, flags públicas, vínculo, nervosismo.
create table public.game_state (
  room_id       uuid primary key references public.rooms(id) on delete cascade,
  publico       jsonb not null,
  rev           int   not null default 0,
  atualizado_em timestamptz not null default now()
);
-- Estado PRIVADO por assento: cena solo, pistas, flags secretas, diário pessoal.
create table public.seat_state (
  room_id uuid references public.rooms(id) on delete cascade,
  seat    text check (seat in ('a','b')),
  privado jsonb not null default '{}',
  rev     int  not null default 0,
  primary key (room_id, seat)
);
alter table public.game_state enable row level security;
create policy gs_select on public.game_state for select using (is_member(room_id));
alter table public.seat_state enable row level security;
create policy ss_select on public.seat_state for select using (my_seat(room_id) = seat);

-- Log imutável. visibilidade restringe quem lê (diário privado, exportação).
create table public.game_events (
  id           bigint generated always as identity primary key,
  room_id      uuid not null references public.rooms(id) on delete cascade,
  rev          int  not null,
  seat         text check (seat in ('a','b')),
  autor        text not null default 'jogador' check (autor in ('jogador','ia','sistema')),
  tipo         text not null,
  payload      jsonb not null default '{}',
  visibilidade text not null default 'publico' check (visibilidade in ('publico','a','b')),
  criado_em    timestamptz not null default now()
);
create index game_events_room on public.game_events(room_id, id);
alter table public.game_events enable row level security;
create policy ge_select on public.game_events for select using (
  is_member(room_id) and (visibilidade = 'publico' or visibilidade = my_seat(room_id))
);
create or replace function public.eventos_imutaveis() returns trigger language plpgsql as $$
begin raise exception 'game_events é imutável'; end $$;
create trigger ge_no_update before update or delete on public.game_events
  for each row execute function public.eventos_imutaveis();

-- Votos secretos: cada jogador lê SÓ o próprio voto, para sempre.
-- O resultado (avançar / sem) vira evento público sem dizer quem recuou.
create table public.secret_votes (
  room_id   uuid references public.rooms(id) on delete cascade,
  no_id     text not null,
  seat      text check (seat in ('a','b')),
  voto      text not null check (voto in ('avancar','ficar')),
  criado_em timestamptz not null default now(),
  primary key (room_id, no_id, seat)
);
alter table public.secret_votes enable row level security;
create policy sv_select on public.secret_votes for select using (my_seat(room_id) = seat);
-- sem insert/update para o cliente: o voto entra via servidor.

-- ───────────── reports ─────────────
create table public.reports (
  id        uuid primary key default gen_random_uuid(),
  room_id   uuid references public.rooms(id) on delete set null,
  book_id   uuid references public.books(id) on delete set null,
  no_id     text,                              -- id interno só para admin/log
  user_id   uuid not null references auth.users(id),
  texto     text not null check (char_length(texto) between 3 and 2000),
  estado    text not null default 'aberto' check (estado in ('aberto','em-analise','resolvido')),
  criado_em timestamptz not null default now()
);
alter table public.reports enable row level security;
create policy reports_insert on public.reports for insert with check (user_id = auth.uid());
create policy reports_select on public.reports for select using (user_id = auth.uid() or is_admin());
create policy reports_admin_upd on public.reports for update using (is_admin());

-- ───────────── escrita atômica de turno (só servidor) ─────────────
-- Compare-and-swap em rev: se outro turno entrou antes, levanta rev_conflict e o cliente relê.
create or replace function public.aplicar_turno(
  p_room uuid, p_rev_esperada int, p_publico jsonb, p_privados jsonb, p_eventos jsonb
) returns int language plpgsql security definer set search_path = public as $$
declare nova int;
begin
  update game_state set publico = p_publico, rev = rev + 1, atualizado_em = now()
   where room_id = p_room and rev = p_rev_esperada
  returning rev into nova;
  if nova is null then raise exception 'rev_conflict' using errcode = 'P0001'; end if;

  insert into seat_state(room_id, seat, privado, rev)
  select p_room, k, v, nova from jsonb_each(coalesce(p_privados,'{}')) as t(k, v)
  on conflict (room_id, seat) do update set privado = excluded.privado, rev = excluded.rev;

  insert into game_events(room_id, rev, seat, autor, tipo, payload, visibilidade)
  select p_room, nova, e->>'seat', coalesce(e->>'autor','jogador'), e->>'tipo',
         coalesce(e->'payload','{}'), coalesce(e->>'visibilidade','publico')
  from jsonb_array_elements(coalesce(p_eventos,'[]')) e;
  return nova;
end $$;
revoke all on function public.aplicar_turno(uuid,int,jsonb,jsonb,jsonb) from public, anon, authenticated;
grant execute on function public.aplicar_turno(uuid,int,jsonb,jsonb,jsonb) to service_role;

-- ───────────── grants explícitos (lição do app anterior: auto-expose desligado) ─────────────
revoke all on all tables in schema public from anon, authenticated;
grant select on public.books, public.book_versions, public.rooms, public.room_players,
               public.game_state, public.seat_state, public.game_events, public.secret_votes to authenticated;
grant select, insert, update on public.profiles to authenticated;
grant select, insert on public.reports to authenticated;
grant update (estado) on public.reports to authenticated;
-- anon (chave pública) não tem nada: convidado entra via signInAnonymously → role authenticated.

-- ───────────── realtime ─────────────
alter publication supabase_realtime add table public.game_state, public.seat_state,
  public.game_events, public.room_players;

-- ───────────── storage ─────────────
insert into storage.buckets(id, name, public) values ('capas','capas',true), ('personagens','personagens',false)
  on conflict do nothing;
create policy capas_read   on storage.objects for select using (bucket_id = 'capas');
create policy capas_admin  on storage.objects for all    using (bucket_id = 'capas' and public.is_admin())
                                                         with check (bucket_id = 'capas' and public.is_admin());
create policy pers_owner   on storage.objects for all
  using (bucket_id = 'personagens' and (storage.foldername(name))[1] = auth.uid()::text)
  with check (bucket_id = 'personagens' and (storage.foldername(name))[1] = auth.uid()::text);
