import { serverSupabaseClient } from '#supabase/server'
import { createError } from 'h3'
import type { Database } from '~/types/supabase'

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient<Database>(event)
  const id = getRouterParam(event, 'id')

  const { data, error } = await client.from('todo_list').select('*').eq('id', Number(id)).single()
  if (error) {
    throw createError({ statusMessage: error.message })
  }

  return data
})
