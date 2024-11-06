import type { Task } from '~/types/task'

export default (values: Partial<Task>, orderIndex: number) => {
  if (!values)
    return

  const newTask: Partial<Task> = {
    title: values.title,
    cost: values.cost,
    due_date: new Date(values.due_date!),
    order_index: Number.parseFloat(orderIndex.toString()),
  }

  return newTask
}
