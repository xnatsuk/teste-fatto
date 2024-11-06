<script lang="ts" setup>
const emit = defineEmits(['delete', 'close'])
</script>

<template>
  <div class="w-[26rem] pt-10 pb-5">
    <div class="bg-white w-full text-center p-3 flex-auto justify-center leading-6">
      <Icon name="fe:warning" size="34" class="bg-indigo-500" />
      <h2 class="text-2xl font-bold py-4">
        Tem certeza?
      </h2>
      <p class="text-md text-gray-500 px-8">
        Esta tarefa será excluída permanentemente.
      </p>
    </div>

    <div class="flex justify-evenly p-3 mt-8">
      <BaseButton
        message="Excluir"
        type="normal"
        icon="fe:trash"
        icon-size="22"
        @click="emit('delete')"
      />
      <BaseButton
        message="Cancelar"
        type="action"
        icon="fe:close"
        icon-size="22"
        @click="emit('close')"
      />
    </div>
  </div>
</template>
