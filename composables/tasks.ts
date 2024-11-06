import type { Task, TaskList } from '~/types/task'

export async function useGetAllTasks() {
  try {
    const data = await $fetch<TaskList>('/api/tasks', { method: 'GET' })
    return data
  }
  catch (error) {
    console.error(error)
  }
}

export async function useGetTask(id: number) {
  try {
    const data = await $fetch<Task>(`/api/tasks/${id}`, { method: 'GET' })
    return data
  }
  catch (error) {
    console.error(error)
  }
}

export async function useCreateTask(task: Partial<Task>) {
  try {
    await $fetch('/api/tasks', { method: 'POST', body: task })
  }
  catch (error) {
    console.error(error)
  }
}

export async function useUpdateTask(id: number, task: Partial<Task>) {
  try {
    await $fetch(`/api/tasks/${id}`, { method: 'POST', body: task })
  }
  catch (error) {
    console.error(error)
  }
}

export async function useDeleteTask(id: number) {
  try {
    await $fetch('/api/tasks', { method: 'DELETE', body: { id } })
  }
  catch (error) {
    console.error(error)
  }
}
