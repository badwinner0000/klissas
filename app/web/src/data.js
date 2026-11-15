import { useCallback, useEffect, useRef, useState } from 'react'
import { supabase } from './lib/supabase.js'
import { weekInfo, addDays } from './lib/week.js'
import { reduzirFoto } from './ui.jsx'

const must = ({ data, error }) => {
  if (error) throw new Error(traduzErro(error.message))
  return data
}

export function traduzErro(m = '') {
  if (/row-level security/i.test(m)) return 'O app não deixou: o prazo pode ter passado ou o hábito não está na sua promessa.'
  if (/duplicate key/i.test(m)) return 'Isso já existe.'
  if (/Código de grupo não encontrado/i.test(m)) return 'Código de grupo não encontrado. Confira com quem criou o grupo.'
  if (/Failed to fetch|NetworkError/i.test(m)) return 'Sem conexão. Tente de novo em instantes.'
  return m
}

// carrega tudo o que o app precisa de um grupo; poucos jogadores, então buscamos tudo de uma vez
export function useGroupData(session) {
  const uid = session?.user?.id
  const [state, setState] = useState({ status: 'loading' })
  const timer = useRef()

  const load = useCallback(async () => {
    if (!uid) return
    try {
      const perfil = must(await supabase.from('profiles').select('*').eq('id', uid).maybeSingle())
      const minhas = must(await supabase.from('group_members').select('group_id').eq('user_id', uid).order('joined_at'))
      if (!perfil || !minhas.length) return setState({ status: 'onboarding', perfil })
      const gid = minhas[0].group_id
      const group = must(await supabase.from('groups').select('*').eq('id', gid).single())
      const w = weekInfo(group)
      const desde = addDays(w.cur, -35)
      const [membros, minimos, promessas, entries] = await Promise.all([
        supabase.from('group_members').select('user_id,papel').eq('group_id', gid).then(must),
        supabase.from('group_minimums').select('*').eq('group_id', gid).then(must),
        supabase.from('promises').select('id,user_id,week_start,promise_items(*)').eq('group_id', gid).in('week_start', [w.cur, w.next]).then(must),
        supabase.from('entries').select('*').eq('group_id', gid).gte('week_start', desde).order('created_at', { ascending: false }).then(must),
      ])
      const perfis = must(await supabase.from('profiles').select('id,nome,cor').in('id', membros.map((m) => m.user_id)))
      const ids = entries.map((e) => e.id)
      const [comments, reactions, flags] = ids.length
        ? await Promise.all([
            supabase.from('comments').select('*').in('entry_id', ids).order('created_at').then(must),
            supabase.from('reactions').select('*').in('entry_id', ids).then(must),
            supabase.from('flags').select('*').in('entry_id', ids).then(must),
          ])
        : [[], [], []]
      const semanas = [4, 3, 2, 1, 0].map((k) => addDays(w.cur, -7 * k)).filter((s) => s >= w.primeira)
      const placares = await Promise.all(semanas.map((s) => supabase.rpc('placar', { p_group: gid, p_week: s }).then(must)))
      const geral = must(await supabase.rpc('placar_geral', { p_group: gid }))
      const fotos = entries.filter((e) => e.foto_path).map((e) => e.foto_path)
      let urls = {}
      if (fotos.length) {
        const r = await supabase.storage.from('evidencias').createSignedUrls(fotos, 3600)
        if (!r.error) urls = Object.fromEntries(r.data.filter((x) => x.signedUrl).map((x) => [x.path, x.signedUrl]))
      }
      const P = Object.fromEntries(perfis.map((p) => [p.id, p]))
      setState({
        status: 'ready', uid, perfil, group, w,
        membros: membros.map((m) => ({ ...m, ...(P[m.user_id] || { nome: '?', cor: 0 }) })),
        minimos, promessas, entries, comments, reactions, flags, urls,
        historico: semanas.map((s, i) => ({ semana: s, placar: placares[i] })),
        geral,
      })
    } catch (e) {
      setState({ status: 'error', message: e.message })
    }
  }, [uid])

  useEffect(() => { load() }, [load])

  // feed em tempo real: qualquer mudança recarrega (debounce de 0,8 s)
  useEffect(() => {
    if (!uid) return
    const ch = supabase.channel('feed')
    for (const t of ['entries', 'comments', 'reactions', 'flags']) {
      ch.on('postgres_changes', { event: '*', schema: 'public', table: t }, () => {
        clearTimeout(timer.current)
        timer.current = setTimeout(load, 800)
      })
    }
    ch.subscribe()
    return () => { supabase.removeChannel(ch) }
  }, [uid, load])

  return [state, load]
}

// ---------- ações ----------

export async function salvarPerfil(uid, dados) {
  must(await supabase.from('profiles').upsert({ id: uid, ...dados }))
}

export async function criarGrupo(uid, nome) {
  const codigo = 'TP-' + Math.random().toString(36).slice(2, 7).toUpperCase()
  const g = must(await supabase.from('groups').insert({ nome, codigo, admin: uid }).select().single())
  // mínimos sugeridos: 3 treinos e no máximo 2 doces
  must(await supabase.from('group_minimums').insert([
    { group_id: g.id, habit_id: 'forca_sessao', modo: 'min', unidade: 'sessão', meta: 3, teto_dia: 1 },
    { group_id: g.id, habit_id: 'doce_limite', modo: 'max', unidade: 'vez', meta: 2, teto_dia: null },
  ]))
  return g
}

export async function entrarNoGrupo(codigo) {
  return must(await supabase.rpc('entrar_no_grupo', { p_codigo: codigo }))
}

// grava a promessa da semana inteira: cria a promessa se precisar e substitui os itens
export async function salvarPromessa(gid, uid, week, itens) {
  let p = must(await supabase.from('promises').select('id').eq('group_id', gid).eq('user_id', uid).eq('week_start', week).maybeSingle())
  if (!p) p = must(await supabase.from('promises').insert({ group_id: gid, user_id: uid, week_start: week }).select('id').single())
  const atuais = must(await supabase.from('promise_items').select('id,habit_id').eq('promise_id', p.id))
  const manter = new Set(itens.map((i) => i.habit_id))
  const remover = atuais.filter((a) => !manter.has(a.habit_id)).map((a) => a.id)
  if (remover.length) must(await supabase.from('promise_items').delete().in('id', remover))
  if (itens.length) {
    must(await supabase.from('promise_items').upsert(
      itens.map(({ habit_id, modo, unidade, meta, teto_dia }) => ({ promise_id: p.id, habit_id, modo, unidade, meta, teto_dia })),
      { onConflict: 'promise_id,habit_id' },
    ))
  }
}

export async function registrar({ gid, uid, habit_id, dia, quantidade, texto, foto }) {
  let foto_path = null
  if (foto) {
    const blob = await reduzirFoto(foto)
    foto_path = `${gid}/${uid}/${Date.now()}.jpg`
    must(await supabase.storage.from('evidencias').upload(foto_path, blob, { contentType: 'image/jpeg' }))
  }
  must(await supabase.from('entries').insert({ group_id: gid, user_id: uid, habit_id, dia, quantidade, texto: texto || null, foto_path }))
}

export async function apagarRegistro(e) {
  must(await supabase.from('entries').delete().eq('id', e.id))
  if (e.foto_path) await supabase.storage.from('evidencias').remove([e.foto_path])
}

export async function alternar(tabela, entry_id, uid, ligado) {
  if (ligado) must(await supabase.from(tabela).delete().eq('entry_id', entry_id).eq('user_id', uid))
  else must(await supabase.from(tabela).insert({ entry_id, user_id: uid }))
}

export async function comentar(entry_id, uid, texto) {
  must(await supabase.from('comments').insert({ entry_id, user_id: uid, texto }))
}

export async function atualizarGrupo(gid, dados) {
  must(await supabase.from('groups').update(dados).eq('id', gid))
}

export async function salvarMinimo(gid, item) {
  must(await supabase.from('group_minimums').upsert({ group_id: gid, ...item }, { onConflict: 'group_id,habit_id' }))
}

export async function removerMinimo(gid, habit_id) {
  must(await supabase.from('group_minimums').delete().eq('group_id', gid).eq('habit_id', habit_id))
}
