<script setup lang="ts">
import type { Task } from '~/types/task'

const props = defineProps<{
  task?: Task | null
  type: 'create' | 'edit'
}>()

const emit = defineEmits<{
  (e: 'submit', task: Partial<Task>): void
  (e: 'close'): void
}>()

const task = ref<Partial<Task>>({
  cost: undefined,
  title: '',
  due_date: '',
})

watch(() => props.task, (newTask) => {
  task.value = newTask
    ? { ...newTask }
    : {
        cost: 0,
        title: '',
        due_date: '',
      }
})
</script>

<template>
  <div class="bg-white pt-10 pb-5">
    <form
      @submit.prevent="emit('submit', task)"
    >
      <h2 class="text-3xl font-semibold text-gray-800 mb-10">
        {{ props.type === 'create' ? 'Nova' : 'Editar' }} Tarefa
      </h2>
      <div class="grid  gap-8 mx-20">
        <div class="flex items-baseline gap-3 col-span-2">
          <label class="inline-block mr-4 text-gray-500">
            Tarefa
          </label>
          <input
            v-model="task.title"
            required
            type="text"
            placeholder="Título da tarefa"
            class="border-b-2 border-gray-400 py-2 placeholder-gray-300 outline-none focus:border-indigo-400 w-full"
          >
        </div>

        <div class="flex items-baseline gap-3">
          <label class="inline-block mr-4 text-gray-500">
            Custo
          </label>
          <input
            v-model="task.cost"
            required
            type="text"
            placeholder="Apenas números"
            class="border-b-2 border-gray-400 py-2 placeholder-gray-300 outline-none focus:border-indigo-500 w-full"
          >
        </div>

        <div class="flex items-baseline gap-3">
          <label class=" inline-block mr-4 text-nowrap text-gray-500">
            Data Limite
          </label>
          <input
            v-model="task.due_date"
            required
            type="date"
            class="border-b-2 border-gray-400 py-2 placeholder-gray-300 outline-none focus:border-indigo-400 w-full"
          >
        </div>

        <div class="col-start-2 inline-flex gap-10 mt-4">
          <BaseButton
            message="Salvar"
            icon="fe:check-circle"
            icon-size="20"
            type="action"
          />
          <BaseButton
            message="Cancelar"
            icon="fe:close"
            icon-size="20"
            type="normal"
            @click="emit('close')"
          />
        </div>
      </div>
    </form>
  </div>
</template>
