<script setup lang="ts">
import type { Task, TaskList } from '~/types/task'

definePageMeta({
  layout: 'default',
})

const data = await useGetAllTasks()
const tasks = ref<TaskList | undefined>(data!)
const list = computed(() => {
  return tasks.value
    ? [...tasks.value].sort((a, b) => a.order_index - b.order_index)
    : undefined
})

const taskToDelete = ref<number | null>(null)
const taskToEdit = ref<Task | null>(null)

const showCreateModal = ref(false)
const showEditModal = ref(false)
const showDeleteModal = ref(false)

const toggleCreate = () => showCreateModal.value = !showCreateModal.value
const toggleEdit = () => showEditModal.value = !showEditModal.value
const toggleDelete = () => showDeleteModal.value = !showDeleteModal.value

async function createTask(values: Task) {
  const orderIndex = handleOrderIndex(tasks.value!) + 1
  const newTask = parseTask(values, orderIndex)

  await useCreateTask(newTask!)
  tasks.value = await useGetAllTasks()
  toggleCreate()
}

function onEditTask(task: Task) {
  showEditModal.value = true
  taskToEdit.value = task
}

async function updateTask(task: Task) {
  if (!taskToEdit.value || !showEditModal.value)
    return

  const { id } = taskToEdit.value
  await useUpdateTask(id, task)
  tasks.value = await useGetAllTasks()
  toggleEdit()
}

function onDeleteTask(id: number) {
  showDeleteModal.value = true
  taskToDelete.value = id
}

async function deleteTask() {
  if (!taskToDelete.value || !showDeleteModal.value)
    return

  const id = taskToDelete.value
  await useDeleteTask(id)
  tasks.value = await useGetAllTasks()
  toggleDelete()
}

async function updateOrderIndex(task: Task) {
  if (!task)
    return

  await useUpdateTask(task.id, task)
}
</script>

<template>
  <div>
    <TaskList
      :tasks="list!"
      @edit="onEditTask"
      @delete="onDeleteTask"
      @sorted="updateOrderIndex"
    />
    <div>
      <BaseButton
        message="Adicionar Tarefa"
        icon="fe:plus"
        icon-size="22"
        type="action"
        @click="showCreateModal = true"
      />

      <TaskModal :open="showCreateModal" @update:open="toggleCreate">
        <TaskForm
          type="create"
          @submit="createTask"
          @close="showCreateModal = false"
        />
      </TaskModal>

      <TaskModal :open="showEditModal" @update:open="toggleEdit">
        <TaskForm
          type="edit"
          :task="taskToEdit"
          @submit="updateTask"
          @close="showEditModal = false"
        />
      </TaskModal>

      <TaskModal :open="showDeleteModal" @update:open="toggleDelete">
        <TaskDeleteWarning
          @close="showDeleteModal = false"
          @delete="deleteTask"
        />
      </TaskModal>
    </div>
  </div>
</template>
