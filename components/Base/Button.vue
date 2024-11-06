<script lang="ts" setup>
const props = defineProps<{
  message: string
  icon: string
  iconSize?: string
  type: 'normal' | 'action'
}>()

const normal = 'inline-flex items-center gap-2 bg-white px-5 py-2 text-lg shadow-sm font-medium tracking-wider border text-gray-600 rounded-md hover:shadow-lg hover:bg-natural-50'

const action = 'inline-flex items-center gap-2 bg-indigo-500 border border-indigo-500 px-5 py-2 text-lg shadow-sm font-medium tracking-wider text-white rounded-md hover:shadow-lg hover:bg-indigo-600'
</script>

<template>
  <button
    :class=" props.type === 'action'
      ? action
      : normal
    "
  >
    <Icon :name="props.icon" :size="props.iconSize" />
    <span>{{ props.message }}</span>
  </button>
</template>
