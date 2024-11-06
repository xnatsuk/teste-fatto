import { serverSupabaseClient } from '#supabase/server'
import { createError } from 'h3'
import type { Database } from '~/types/supabase'

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient<Database>(event)
  const body = await readBody(event)

  const { data, error } = await client
    .from('todo_list')
    .update({ order_index: body.order_index, cost: body.cost, due_date: body.due_date, title: body.title })
    .eq('id', body.id)
  if (error) {
    throw createError({ statusMessage: error.message })
  }

  return data
})
