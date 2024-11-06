import type { SortableEvent } from 'sortablejs'
import type { Task, TaskList } from '~/types/task'

export function useHandleSort() {
  function handleSortEnd(event: SortableEvent, tasks: TaskList) {
    const { oldIndex, newIndex } = event

    if (oldIndex === undefined || newIndex === undefined || oldIndex === newIndex)
      return

    const movedItem = tasks.splice(oldIndex, 1)[0]
    tasks.splice(newIndex, 0, movedItem)

    const newOrderIndex = calculateNewOrderIndex(newIndex, tasks)
    movedItem.order_index = newOrderIndex

    return movedItem
  }

  function moveTask(index: number, direction: 'up' | 'down', tasks: TaskList) {
    if (direction === 'up' && index <= 0)
      return

    if (direction === 'down' && index >= tasks.length - 1)
      return

    const newIndex = direction === 'up' ? index - 1 : index + 1
    const movedItem = tasks.splice(index, 1)[0]
    tasks.splice(newIndex, 0, movedItem)

    const newOrderIndex = calculateNewOrderIndex(newIndex, tasks)
    movedItem.order_index = newOrderIndex

    return movedItem
  }

  function calculateNewOrderIndex(newIndex: number, tasks: TaskList): number {
    let newOrderIndex

    if (newIndex === 0) {
      newOrderIndex = tasks.length > 1 ? tasks[1].order_index / 2 : 0.5
    }
    else if (newIndex === tasks.length - 1) {
      newOrderIndex = tasks[newIndex - 1].order_index + 1
    }
    else {
      const prevOrderIndex = tasks[newIndex - 1].order_index
      const nextOrderIndex = tasks[newIndex + 1]?.order_index || tasks[0].order_index
      newOrderIndex = (prevOrderIndex + nextOrderIndex) / 2
    }

    return Number.parseFloat(newOrderIndex.toFixed(6))
  }

  return {
    handleSortEnd,
    moveTask,
  }
}
