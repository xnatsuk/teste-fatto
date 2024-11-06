export interface Task {
  cost: number
  created_at?: string | Date
  due_date: string | Date
  id: number
  order_index: number
  title: string
}

export type TaskList = Task[]
