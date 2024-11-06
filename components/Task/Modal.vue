<script setup lang="ts">
const open = defineModel<boolean>('open', { required: true })

const dialog = ref<HTMLDialogElement>()
const dialogRef = ref()

onClickOutside(dialogRef, () => open.value = false)
watch(open, value => value
  ? dialog.value!.show()
  : dialog.value!.close())
</script>

<template>
  <transition name="fade">
    <div v-show="open">
      <div class="fixed bg-black bg-opacity-60 inset-0 z-10">
        <dialog ref="dialog" class="mt-[20%] border rounded-md shadow">
          <div ref="dialogRef" class="flex items-center justify-center ">
            <slot />
          </div>
        </dialog>
      </div>
    </div>
  </transition>
</template>

<style scoped>
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 300ms ease-in-out;
}
</style>
