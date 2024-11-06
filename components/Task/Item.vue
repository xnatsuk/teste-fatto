<script setup lang="ts">
import type { Task } from '~/types/task'

const taskItem = defineModel<Task>('taskItem', { required: true })
const computedTask = computed(() => taskItem.value)

function isDue(): boolean {
  return new Date(computedTask.value.due_date).getTime() > new Date().getTime()
}
</script>

<template>
  <li
    :class="taskItem.cost >= 1000 ? 'bg-indigo-100' : 'bg-white'"
    class="flex mb-5 rounded-md p-5 max-w-xl mx-auto text-lg shadow hover:shadow-lg"
  >
    <slot name="order-index" />

    <div class="w-full">
      <div class="flex items-center justify-between text-start ml-10">
        <h3 class="text-xl font-semibold leading-6 text-gray-900">
          {{ taskItem.title }}
        </h3>

        <p class="text-sm font-medium text-gray-500">
          Data: <span :class="isDue() ? 'text-green-500' : 'text-red-500'"> {{ taskItem.due_date }} </span>
        </p>
      </div>

      <div class="flex justify-between mt-4 ml-10">
        <p class="text font-medium text-gray-600">
          Custo: R$
          <span class="text-indigo-600"> {{ taskItem.cost }} </span>
        </p>
      </div>

      <div class="flex justify-end -my-1">
        <div class="inline-flex gap-6">
          <slot name="update-task" />
          <slot name="delete-task" />
        </div>
      </div>
    </div>
  </li>
</template>
