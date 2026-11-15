import { createClient } from '@supabase/supabase-js'

// aceita a URL com ou sem "/rest/v1/" no fim, que é como o painel às vezes mostra
const url = (import.meta.env.VITE_SUPABASE_URL || '').trim().replace(/\/rest\/v1\/?$/, '').replace(/\/+$/, '')
const key = (import.meta.env.VITE_SUPABASE_ANON_KEY || '').trim()

export const configured = Boolean(url && key && !url.includes('SEU-PROJETO'))
export const supabase = configured ? createClient(url, key) : null
