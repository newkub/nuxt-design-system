<script setup lang="ts">
const emit = defineEmits(['click'])

const handleClick = (event: MouseEvent) => {
  emit('click', event)
}
</script>

<template>
  <div
    class="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
    role="menuitem"
    @click="handleClick"
  >
    <slot />
  </div>
</template>
