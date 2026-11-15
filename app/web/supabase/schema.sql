-- Tá Pago: esquema do banco (Supabase / PostgreSQL)
-- Como usar: no painel do Supabase, abra SQL Editor, cole este arquivo inteiro e clique em Run.
-- Pode rodar de novo sem perder dados: tudo usa "if not exists" ou "create or replace".

-- ============ tabelas ============

create table if not exists profiles (
  id uuid primary key references auth.users on delete cascade,
  nome text not null check (char_length(nome) between 1 and 40),
  cor int not null default 0,
  nivel text,
  dias int,
  objetivos text[] not null default '{}',
  equipamentos text[] not null default '{}',
  created_at timestamptz not null default now()
);

create table if not exists groups (
  id uuid primary key default gen_random_uuid(),
  nome text not null check (char_length(nome) between 1 and 60),
  codigo text not null unique,
  admin uuid not null references auth.users,
  fuso text not null default 'America/Sao_Paulo',
  prazo_hora time not null default '23:59',      -- promessa trava no domingo nesse horário
  carencia_horas int not null default 12,          -- tempo para postar depois que a semana fecha
  base_min int not null default 10,                -- pontos de uma meta mínima cumprida
  base_max int not null default 6,                 -- pontos por ficar dentro de um limite máximo
  multa int not null default 4,                    -- pontos perdidos por unidade acima do limite
  bonus int not null default 5,                    -- bônus por bater a meta inteira
  flags_para_cair int not null default 3,          -- contestações que derrubam um post
  pote_por_pessoa numeric not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists group_members (
  group_id uuid references groups on delete cascade,
  user_id uuid references auth.users on delete cascade,
  papel text not null default 'membro',
  joined_at timestamptz not null default now(),
  primary key (group_id, user_id)
);

-- metas que valem para todos do grupo (os "mínimos")
create table if not exists group_minimums (
  group_id uuid references groups on delete cascade,
  habit_id text not null,
  modo text not null check (modo in ('min','max')),
  unidade text not null,
  meta numeric not null check (meta >= 0),
  teto_dia numeric,
  primary key (group_id, habit_id)
);

create table if not exists promises (
  id uuid primary key default gen_random_uuid(),
  group_id uuid not null references groups on delete cascade,
  user_id uuid not null references auth.users on delete cascade,
  week_start date not null check (extract(isodow from week_start) = 1),
  created_at timestamptz not null default now(),
  unique (group_id, user_id, week_start)
);

create table if not exists promise_items (
  id uuid primary key default gen_random_uuid(),
  promise_id uuid not null references promises on delete cascade,
  habit_id text not null,
  modo text not null check (modo in ('min','max')),
  unidade text not null,
  meta numeric not null check (meta >= 0),
  teto_dia numeric,
  unique (promise_id, habit_id)
);

create table if not exists entries (
  id uuid primary key default gen_random_uuid(),
  group_id uuid not null references groups on delete cascade,
  user_id uuid not null references auth.users on delete cascade,
  habit_id text not null,
  dia date not null,
  week_start date generated always as (dia - (extract(isodow from dia)::int - 1)) stored,
  quantidade numeric not null check (quantidade > 0),
  texto text check (char_length(texto) <= 500),
  foto_path text,
  created_at timestamptz not null default now()
);
create index if not exists entries_group_week on entries (group_id, week_start);

create table if not exists comments (
  id uuid primary key default gen_random_uuid(),
  entry_id uuid not null references entries on delete cascade,
  user_id uuid not null references auth.users on delete cascade,
  texto text not null check (char_length(texto) between 1 and 300),
  created_at timestamptz not null default now()
);

create table if not exists reactions (
  entry_id uuid references entries on delete cascade,
  user_id uuid references auth.users on delete cascade,
  primary key (entry_id, user_id)
);

create table if not exists flags (
  entry_id uuid references entries on delete cascade,
  user_id uuid references auth.users on delete cascade,
  primary key (entry_id, user_id)
);

-- ============ funções auxiliares ============

create or replace function is_member(p_group uuid) returns boolean
language sql stable security definer set search_path = public as $$
  select exists (select 1 from group_members where group_id = p_group and user_id = auth.uid());
$$;

create or replace function is_admin(p_group uuid) returns boolean
language sql stable security definer set search_path = public as $$
  select exists (select 1 from groups where id = p_group and admin = auth.uid());
$$;

create or replace function shares_group(p_user uuid) returns boolean
language sql stable security definer set search_path = public as $$
  select p_user = auth.uid() or exists (
    select 1 from group_members a join group_members b on a.group_id = b.group_id
    where a.user_id = auth.uid() and b.user_id = p_user);
$$;

-- a promessa da semana p_week pode ser montada até domingo (véspera) no horário do grupo.
-- exceção: na primeira semana de um grupo, fica aberta por 24h depois da criação, para dar a largada.
create or replace function promessa_aberta(p_group uuid, p_week date) returns boolean
language sql stable security definer set search_path = public as $$
  select now() < ((p_week - 1)::timestamp + g.prazo_hora) at time zone g.fuso
      or (p_week = (g.created_at at time zone g.fuso)::date - (extract(isodow from (g.created_at at time zone g.fuso))::int - 1)
          and now() < g.created_at + interval '24 hours')
  from groups g where g.id = p_group;
$$;

-- posts de uma semana são aceitos até o fim da semana mais a carência
create or replace function postagem_aberta(p_group uuid, p_dia date) returns boolean
language sql stable security definer set search_path = public as $$
  select p_dia <= (now() at time zone g.fuso)::date
     and now() < ((p_dia - (extract(isodow from p_dia)::int - 1) + 7)::timestamp at time zone g.fuso) + make_interval(hours => g.carencia_horas)
  from groups g where g.id = p_group;
$$;

create or replace function habito_na_promessa(p_group uuid, p_user uuid, p_habit text, p_dia date) returns boolean
language sql stable security definer set search_path = public as $$
  select exists (
      select 1 from promises pr join promise_items pi on pi.promise_id = pr.id
      where pr.group_id = p_group and pr.user_id = p_user and pi.habit_id = p_habit
        and pr.week_start = p_dia - (extract(isodow from p_dia)::int - 1))
    or exists (select 1 from group_minimums where group_id = p_group and habit_id = p_habit);
$$;

-- entrar num grupo pelo código
create or replace function entrar_no_grupo(p_codigo text) returns uuid
language plpgsql security definer set search_path = public as $$
declare gid uuid;
begin
  select id into gid from groups where upper(codigo) = upper(trim(p_codigo));
  if gid is null then raise exception 'Código de grupo não encontrado'; end if;
  insert into group_members (group_id, user_id) values (gid, auth.uid()) on conflict do nothing;
  return gid;
end $$;

-- quem cria o grupo entra como admin
create or replace function add_admin_member() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  insert into group_members (group_id, user_id, papel) values (new.id, new.admin, 'admin') on conflict do nothing;
  return new;
end $$;
drop trigger if exists groups_add_admin on groups;
create trigger groups_add_admin after insert on groups for each row execute function add_admin_member();

-- ============ placar ============
-- meta mínima: base_min × (realizado ÷ meta), máximo 100%, + bônus se cumprir tudo
-- limite máximo: base_max se ficar dentro; senão perde multa por unidade acima
-- o realizado de cada dia respeita o teto diário; posts com contestações demais não contam
-- quem não montou promessa fica com os mínimos do grupo
create or replace function placar(p_group uuid, p_week date)
returns table (user_id uuid, nome text, cor int, pontos int, tem_promessa boolean)
language sql stable security definer set search_path = public as $$
  with g as (select * from groups where id = p_group and is_member(p_group)),
  membros as (
    select m.user_id, p.nome, p.cor from group_members m join profiles p on p.id = m.user_id
    where m.group_id = p_group and exists (select 1 from g)),
  proprios as (
    select pr.user_id, pi.habit_id, pi.modo, pi.meta, pi.teto_dia
    from promises pr join promise_items pi on pi.promise_id = pr.id
    where pr.group_id = p_group and pr.week_start = p_week),
  itens as (
    select * from proprios
    union all
    select mb.user_id, gm.habit_id, gm.modo, gm.meta, gm.teto_dia
    from membros mb cross join group_minimums gm
    where gm.group_id = p_group
      and not exists (select 1 from proprios o where o.user_id = mb.user_id and o.habit_id = gm.habit_id)),
  validas as (
    select e.* from entries e
    where e.group_id = p_group and e.week_start = p_week
      and (select count(*) from flags f where f.entry_id = e.id) < (select flags_para_cair from g)),
  por_dia as (select v.user_id, v.habit_id, v.dia, sum(v.quantidade) q from validas v group by 1, 2, 3),
  realizado as (
    select i.user_id, i.habit_id, i.modo, i.meta,
      -- cuidado: least(null, x) devolve x no Postgres, por isso o null precisa ser tratado antes
      coalesce(sum(case when d.q is null then 0 when i.teto_dia is null then d.q else least(d.q, i.teto_dia) end), 0) as feito
    from itens i left join por_dia d on d.user_id = i.user_id and d.habit_id = i.habit_id
    group by 1, 2, 3, 4),
  pts as (
    select r.user_id,
      case when r.modo = 'min' then
        case when r.meta <= 0 then 0
             else (select base_min from g) * least(1, r.feito / r.meta)
                  + case when r.feito >= r.meta then (select bonus from g) else 0 end end
      else
        case when r.feito <= r.meta then (select base_max from g)
             else -((r.feito - r.meta) * (select multa from g)) end
      end as p
    from realizado r)
  select mb.user_id, mb.nome, mb.cor, round(coalesce(sum(pts.p), 0))::int,
    exists (select 1 from promises pr where pr.group_id = p_group and pr.week_start = p_week and pr.user_id = mb.user_id)
  from membros mb left join pts on pts.user_id = mb.user_id
  group by mb.user_id, mb.nome, mb.cor
  order by 4 desc, 2;
$$;

create or replace function placar_geral(p_group uuid)
returns table (user_id uuid, nome text, cor int, pontos int)
language sql stable security definer set search_path = public as $$
  with g as (select * from groups where id = p_group and is_member(p_group)),
  semanas as (
    select generate_series(
      ((select created_at at time zone fuso from g)::date - (extract(isodow from (select created_at at time zone fuso from g))::int - 1)),
      ((now() at time zone (select fuso from g))::date - (extract(isodow from (now() at time zone (select fuso from g)))::int - 1)),
      interval '7 days')::date as w)
  select p.user_id, p.nome, p.cor, sum(p.pontos)::int
  from semanas s cross join lateral placar(p_group, s.w) p
  group by 1, 2, 3 order by 4 desc, 2;
$$;

-- ============ segurança (RLS) ============

alter table profiles enable row level security;
alter table groups enable row level security;
alter table group_members enable row level security;
alter table group_minimums enable row level security;
alter table promises enable row level security;
alter table promise_items enable row level security;
alter table entries enable row level security;
alter table comments enable row level security;
alter table reactions enable row level security;
alter table flags enable row level security;

drop policy if exists p_profiles_sel on profiles;   create policy p_profiles_sel on profiles for select using (shares_group(id));
drop policy if exists p_profiles_ins on profiles;   create policy p_profiles_ins on profiles for insert with check (id = auth.uid());
drop policy if exists p_profiles_upd on profiles;   create policy p_profiles_upd on profiles for update using (id = auth.uid());

drop policy if exists p_groups_sel on groups;       create policy p_groups_sel on groups for select using (is_member(id) or admin = auth.uid());
drop policy if exists p_groups_ins on groups;       create policy p_groups_ins on groups for insert with check (admin = auth.uid());
drop policy if exists p_groups_upd on groups;       create policy p_groups_upd on groups for update using (admin = auth.uid());

drop policy if exists p_members_sel on group_members; create policy p_members_sel on group_members for select using (is_member(group_id));
drop policy if exists p_members_del on group_members; create policy p_members_del on group_members for delete using (user_id = auth.uid() or is_admin(group_id));

drop policy if exists p_min_sel on group_minimums;  create policy p_min_sel on group_minimums for select using (is_member(group_id));
drop policy if exists p_min_all on group_minimums;  create policy p_min_all on group_minimums for all using (is_admin(group_id)) with check (is_admin(group_id));

drop policy if exists p_prom_sel on promises;       create policy p_prom_sel on promises for select using (is_member(group_id));
drop policy if exists p_prom_ins on promises;       create policy p_prom_ins on promises for insert
  with check (user_id = auth.uid() and is_member(group_id) and promessa_aberta(group_id, week_start));
drop policy if exists p_prom_del on promises;       create policy p_prom_del on promises for delete
  using (user_id = auth.uid() and promessa_aberta(group_id, week_start));

drop policy if exists p_items_sel on promise_items; create policy p_items_sel on promise_items for select
  using (exists (select 1 from promises p where p.id = promise_id and is_member(p.group_id)));
drop policy if exists p_items_ins on promise_items; create policy p_items_ins on promise_items for insert
  with check (exists (select 1 from promises p where p.id = promise_id and p.user_id = auth.uid() and promessa_aberta(p.group_id, p.week_start)));
drop policy if exists p_items_upd on promise_items; create policy p_items_upd on promise_items for update
  using (exists (select 1 from promises p where p.id = promise_id and p.user_id = auth.uid() and promessa_aberta(p.group_id, p.week_start)));
drop policy if exists p_items_del on promise_items; create policy p_items_del on promise_items for delete
  using (exists (select 1 from promises p where p.id = promise_id and p.user_id = auth.uid() and promessa_aberta(p.group_id, p.week_start)));

drop policy if exists p_entries_sel on entries;     create policy p_entries_sel on entries for select using (is_member(group_id));
drop policy if exists p_entries_ins on entries;     create policy p_entries_ins on entries for insert
  with check (user_id = auth.uid() and is_member(group_id) and postagem_aberta(group_id, dia)
              and habito_na_promessa(group_id, auth.uid(), habit_id, dia));
drop policy if exists p_entries_del on entries;     create policy p_entries_del on entries for delete
  using (user_id = auth.uid() and postagem_aberta(group_id, dia));

drop policy if exists p_comments_sel on comments;   create policy p_comments_sel on comments for select
  using (exists (select 1 from entries e where e.id = entry_id and is_member(e.group_id)));
drop policy if exists p_comments_ins on comments;   create policy p_comments_ins on comments for insert
  with check (user_id = auth.uid() and exists (select 1 from entries e where e.id = entry_id and is_member(e.group_id)));
drop policy if exists p_comments_del on comments;   create policy p_comments_del on comments for delete using (user_id = auth.uid());

drop policy if exists p_react_sel on reactions;     create policy p_react_sel on reactions for select
  using (exists (select 1 from entries e where e.id = entry_id and is_member(e.group_id)));
drop policy if exists p_react_ins on reactions;     create policy p_react_ins on reactions for insert
  with check (user_id = auth.uid() and exists (select 1 from entries e where e.id = entry_id and is_member(e.group_id)));
drop policy if exists p_react_del on reactions;     create policy p_react_del on reactions for delete using (user_id = auth.uid());

drop policy if exists p_flags_sel on flags;         create policy p_flags_sel on flags for select
  using (exists (select 1 from entries e where e.id = entry_id and is_member(e.group_id)));
drop policy if exists p_flags_ins on flags;         create policy p_flags_ins on flags for insert
  with check (user_id = auth.uid() and exists (select 1 from entries e where e.id = entry_id and is_member(e.group_id) and e.user_id <> auth.uid()));
drop policy if exists p_flags_del on flags;         create policy p_flags_del on flags for delete using (user_id = auth.uid());

-- ============ fotos de evidência ============
-- arquivos ficam em evidencias/<id do grupo>/<id do usuário>/<arquivo>
insert into storage.buckets (id, name, public) values ('evidencias', 'evidencias', false) on conflict do nothing;

drop policy if exists p_fotos_sel on storage.objects;
create policy p_fotos_sel on storage.objects for select
  using (bucket_id = 'evidencias' and is_member(((storage.foldername(name))[1])::uuid));
drop policy if exists p_fotos_ins on storage.objects;
create policy p_fotos_ins on storage.objects for insert
  with check (bucket_id = 'evidencias' and is_member(((storage.foldername(name))[1])::uuid)
              and (storage.foldername(name))[2] = auth.uid()::text);
drop policy if exists p_fotos_del on storage.objects;
create policy p_fotos_del on storage.objects for delete
  using (bucket_id = 'evidencias' and (storage.foldername(name))[2] = auth.uid()::text);

-- ============ tempo real (feed atualiza sozinho) ============
do $$ begin
  alter publication supabase_realtime add table entries, comments, reactions, flags;
exception when duplicate_object then null; end $$;
