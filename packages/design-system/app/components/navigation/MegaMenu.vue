<script setup lang="ts">
const props = withDefaults(defineProps<{
  modelValue?: boolean
}>(), {
  modelValue: false
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()

const menuRef = ref<HTMLElement>()

onClickOutside(menuRef, () => {
  if (props.modelValue) {
    emit('update:modelValue', false)
  }
})
</script>

<template>
  <div ref="menuRef" class="mega-menu-container">
    <div @click="emit('update:modelValue', !modelValue)">
      <slot name="trigger" />
    </div>
    
    <Transition name="mega-menu">
      <div v-if="modelValue" class="mega-menu">
        <div class="mega-menu-content">
          <slot />
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.mega-menu-container {
  @apply relative;
}

.mega-menu {
  @apply absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-white rounded-lg border border-gray-200 shadow-xl z-50 min-w-[600px];
}

.mega-menu-content {
  @apply p-6;
}

.mega-menu-enter-active,
.mega-menu-leave-active {
  @apply transition-all duration-200;
}

.mega-menu-enter-from,
.mega-menu-leave-to {
  @apply opacity-0 scale-95;
}
</style>
