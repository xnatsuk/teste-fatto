<!-- eslint-disable unused-imports/no-unused-vars -->
<script setup lang="ts">
import type { SortableEvent, SortableOptions } from 'sortablejs'
import { Sortable } from 'sortablejs-vue3'
import type { Task, TaskList } from '~/types/task'

const emit = defineEmits<{
  edit: [task: Task]
  delete: [taskId: number]
  sorted: [task: Task]
}>()

const tasks = defineModel<TaskList>('tasks', { required: true })

function editTask(task: Task) {
  emit('edit', task)
}

function deleteTask(taskId: number) {
  emit('delete', taskId)
}

const sortable = ref(null)

const options = computed<SortableOptions >(() => {
  return {
    draggable: '.draggable',
    animation: 150,
    dragClass: 'drag',
    scroll: true,
    forceFallback: true,
    fallbackTolerance: 3,
    bubbleScroll: true,
  }
})

function onSortEnd(event: SortableEvent) {
  const { handleSortEnd } = useHandleSort()
  const movedItem = handleSortEnd(event, tasks.value)

  emit('sorted', movedItem!)
}

function onMoveUp(task: Task) {
  const { moveTask } = useHandleSort()
  const index = tasks.value.indexOf(task)
  const movedItem = moveTask(index, 'up', tasks.value)

  emit('sorted', movedItem!)
}

function onMoveDown(task: Task) {
  const { moveTask } = useHandleSort()
  const index = tasks.value.indexOf(task)
  const movedItem = moveTask(index, 'down', tasks.value)

  emit('sorted', movedItem!)
}
</script>

<template>
  <div>
    <div v-show="!tasks || tasks.length < 1">
      <h2 class="text-3xl font-semibold text-gray-800 mb-10">
        Nenhuma tarefa encontrada
      </h2>
    </div>

    <!-- https://github.com/MaxLeiter/sortablejs-vue3/issues/57#issuecomment-1378155415
        :key based on data values that change to solve DOM item duplication -->

    <Sortable
      ref="sortable"
      :key="JSON.stringify(tasks)"
      :list="tasks"
      item-key="order_index"
      :options="options"
      tag="ul"
      @end="onSortEnd($event)"
    >
      <template #item="{ element }">
        <TaskItem :task-item="element" class="draggable">
          <template #order-index>
            <div class="flex flex-col justify-between">
              <div>
                <Icon
                  v-show="element !== tasks[0]"
                  name="fe:arrow-up"
                  size="22"
                  class="bg-slate-500 hover:bg-indigo-600"
                  @click="onMoveUp(element)"
                />
              </div>

              <div>
                <Icon
                  v-show="element !== tasks[tasks.length - 1]"
                  name="fe:arrow-down"
                  size="22"
                  class="bg-slate-500 hover:bg-indigo-600"
                  @click="onMoveDown(element)"
                />
              </div>
            </div>
          </template>

          <template #update-task>
            <button @click="editTask(element)">
              <Icon name="fe:edit" size="22" class="hover:bg-indigo-600 bg-slate-500" />
            </button>
          </template>

          <template #delete-task>
            <button @click="deleteTask(element.id)">
              <Icon name="fe:trash" size="22" class="hover:bg-red-600 bg-slate-500" />
            </button>
          </template>
        </TaskItem>
      </template>
    </Sortable>
  </div>
</template>
