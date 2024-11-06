import { serverSupabaseClient } from '#supabase/server'
import { createError } from 'h3'
import type { Database } from '~/types/supabase'

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient<Database>(event)
  const id = getRouterParam(event, 'id')

  if (!client)
    throw createError({ statusMessage: 'Failed to connect to Supabase' })

  const { error } = await client
    .from('todo_list')
    .delete()
    .eq('id', Number(id))

  if (error) {
    throw createError({ statusMessage: error.message })
  }
})
