// Testa o schema.sql num Postgres em memória (PGlite), simulando o login do Supabase.
// Rode com: npm run test:db
import { PGlite } from '@electric-sql/pglite'
import fs from 'node:fs'
const db = new PGlite()
const schema = fs.readFileSync(new URL('./schema.sql', import.meta.url), 'utf8')
const stubs = `
create schema auth; create schema storage;
create table auth.users (id uuid primary key);
create function auth.uid() returns uuid language sql stable as $$ select nullif(current_setting('test.uid', true),'')::uuid $$;
create table storage.buckets (id text primary key, name text, public boolean);
create table storage.objects (id uuid default gen_random_uuid(), bucket_id text, name text);
create function storage.foldername(name text) returns text[] language sql immutable as $$ select (string_to_array(name,'/'))[1:array_length(string_to_array(name,'/'),1)-1] $$;
create publication supabase_realtime; alter table storage.objects enable row level security;
create role authenticated;
`
await db.exec(stubs)
await db.exec(schema)
await db.exec(`grant usage on schema public, auth, storage to authenticated; grant all on all tables in schema public to authenticated; grant all on all tables in schema storage to authenticated; grant select on auth.users to authenticated;`)
console.log('schema ok')
const U = ['11111111-1111-1111-1111-111111111111','22222222-2222-2222-2222-222222222222','33333333-3333-3333-3333-333333333333','44444444-4444-4444-4444-444444444444']
for (const u of U) await db.query('insert into auth.users values ($1)', [u])
const as = async (u, sql, params=[]) => {
  await db.exec(`reset role; select set_config('test.uid','${u}',false); set role authenticated;`)
  try { return await db.query(sql, params) } finally { await db.exec('reset role') }
}
const expectFail = async (label, p) => { try { await p; console.log('FALHOU (deveria bloquear):', label) } catch (e) { console.log('bloqueado ok:', label, '-', e.message.slice(0,60)) } }
// perfis
for (const [i,u] of U.entries()) await as(u, 'insert into profiles (id,nome,cor) values ($1,$2,$3)', [u, ['Ana','Bruno','Carla','Intruso'][i], i])
// grupo criado há 10 dias, para a largada já ter passado
const g = (await as(U[0], `insert into groups (nome,codigo,admin) values ('Os Seis','TP-ABCDE',$1) returning id`, [U[0]])).rows[0].id
await db.query(`update groups set created_at = now() - interval '10 days' where id=$1`, [g])
await as(U[0], `insert into group_minimums (group_id,habit_id,modo,unidade,meta,teto_dia) values ($1,'forca_sessao','min','sessão',3,1),($1,'doce_limite','max','vez',2,null)`, [g])
await as(U[1], `select entrar_no_grupo('tp-abcde')`)
await as(U[2], `select entrar_no_grupo('TP-ABCDE')`)
await expectFail('membro comum cria mínimo', as(U[1], `insert into group_minimums (group_id,habit_id,modo,unidade,meta) values ($1,'x','min','u',1)`, [g]))
await expectFail('código errado', as(U[3], `select entrar_no_grupo('NAO-EXISTE')`))
const vis = await as(U[3], `select count(*)::int n from groups`); console.log('intruso vê grupos:', vis.rows[0].n)
const vis2 = await as(U[3], `select count(*)::int n from profiles`); console.log('intruso vê perfis:', vis2.rows[0].n, '(só o próprio = 1)')
// semanas
const tz = 'America/Sao_Paulo'
const { rows: [w] } = await db.query(`select ((now() at time zone '${tz}')::date - (extract(isodow from (now() at time zone '${tz}'))::int - 1)) as cur`)
const cur = w.cur.toISOString().slice(0,10)
const next = (await db.query(`select ($1::date + 7)::text d`, [cur])).rows[0].d
const curStr = (await db.query(`select $1::date::text d`, [cur])).rows[0].d
console.log('semana atual', curStr, 'próxima', next)
await expectFail('promessa da semana atual depois do prazo', as(U[0], `insert into promises (group_id,user_id,week_start) values ($1,$2,$3)`, [g, U[0], curStr]))
const pn = (await as(U[0], `insert into promises (group_id,user_id,week_start) values ($1,$2,$3) returning id`, [g, U[0], next])).rows[0].id
await as(U[0], `insert into promise_items (promise_id,habit_id,modo,unidade,meta,teto_dia) values ($1,'agua_ml','min','ml',21000,4000)`, [pn])
console.log('promessa da próxima semana: ok')
// para testar pontuação, criamos promessas da semana atual direto como dono (fora do RLS)
const p0 = (await db.query(`insert into promises (group_id,user_id,week_start) values ($1,$2,$3) returning id`, [g, U[0], curStr])).rows[0].id
await db.query(`insert into promise_items (promise_id,habit_id,modo,unidade,meta,teto_dia) values ($1,'agua_ml','min','ml',21000,4000),($1,'doce_limite','max','vez',0,null),($1,'forca_sessao','min','sessão',3,1)`, [p0])
// posts
const hoje = (await db.query(`select (now() at time zone '${tz}')::date::text d`)).rows[0].d
const post = (u, h, q, dia=hoje) => as(u, `insert into entries (group_id,user_id,habit_id,dia,quantidade) values ($1,$2,$3,$4,$5) returning id`, [g,u,h,dia,q])
await post(U[0], 'agua_ml', 9000)        // teto de 4000/dia → conta 4000
await post(U[0], 'doce_limite', 1)        // limite 0 → -4
await post(U[0], 'forca_sessao', 1)
await post(U[0], 'forca_sessao', 1)       // mesmo dia, teto 1 → conta 1
const e1 = (await post(U[1], 'forca_sessao', 1)).rows[0].id   // Bruno só tem mínimos
await expectFail('post de hábito fora da promessa', post(U[1], 'bike_min', 30))
await expectFail('post no futuro', post(U[1], 'forca_sessao', 1, (await db.query(`select ($1::date+1)::text d`,[hoje])).rows[0].d))
await expectFail('intruso posta', post(U[3], 'forca_sessao', 1))
await expectFail('contestar o próprio post', as(U[1], `insert into flags (entry_id,user_id) values ($1,$2)`, [e1, U[1]]))
let pl = await as(U[0], `select nome, pontos, tem_promessa from placar($1,$2)`, [g, curStr]); console.table(pl.rows)
// Ana: agua 10*4000/21000=1.9 ; doce -4 ; forca 10*1/3=3.33 → 1.24 → 1
// Bruno: forca 3.33 + doce 6 = 9.33 → 9 ; Carla: doce 6
for (const u of [U[0], U[2]]) await as(u, `insert into flags (entry_id,user_id) values ($1,$2)`, [e1, u])
pl = await as(U[1], `select nome, pontos from placar($1,$2)`, [g, curStr]); console.log('depois de 2 contestações:', JSON.stringify(pl.rows))
await db.query(`insert into flags (entry_id,user_id) values ($1,$2)`, [e1, U[3]])
pl = await as(U[1], `select nome, pontos from placar($1,$2)`, [g, curStr]); console.log('depois de 3 contestações:', JSON.stringify(pl.rows))
const pg = await as(U[0], `select nome, pontos from placar_geral($1)`, [g]); console.log('geral:', JSON.stringify(pg.rows))
const intr = await as(U[3], `select count(*)::int n from placar($1,$2)`, [g, curStr]); console.log('intruso vê placar:', intr.rows[0].n)
await expectFail('membro edita regras do grupo', as(U[1], `update groups set multa=0 where id=$1 returning id`, [g]).then(r=>{ if(!r.rows.length) throw new Error('0 linhas (bloqueado)') }))
// storage
await as(U[1], `insert into storage.objects (bucket_id,name) values ('evidencias',$1)`, [`${g}/${U[1]}/a.jpg`]); console.log('upload na própria pasta: ok')
await expectFail('upload na pasta de outro', as(U[1], `insert into storage.objects (bucket_id,name) values ('evidencias',$1)`, [`${g}/${U[0]}/b.jpg`]))
await expectFail('intruso faz upload no grupo', as(U[3], `insert into storage.objects (bucket_id,name) values ('evidencias',$1)`, [`${g}/${U[3]}/c.jpg`]))
await db.exec(schema); console.log('schema roda de novo sem erro')
