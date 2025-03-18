<template>
  <label class="toggle">
    <input
      type="checkbox"
      :checked="modelValue"
      @change="$emit('update:modelValue', ($event.target as HTMLInputElement).checked)"
      class="toggle__input"
    />
    <span class="toggle__slider" />
  </label>
</template>

<script setup lang="ts">
defineProps<{
  modelValue?: boolean
}>()

defineEmits(['update:modelValue'])
</script>

<style scoped>
.toggle {
  position: relative;
  display: inline-block;
  width: 2.5rem;
  height: 1.5rem;
}

.toggle__input {
  opacity: 0;
  width: 0;
  height: 0;
}

.toggle__slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #e5e7eb;
  border-radius: 2rem;
  transition: all 0.2s;
}

.toggle__slider::before {
  position: absolute;
  content: '';
  height: 1.25rem;
  width: 1.25rem;
  left: 0.125rem;
  bottom: 0.125rem;
  background-color: white;
  border-radius: 50%;
  transition: all 0.2s;
}

.toggle__input:checked + .toggle__slider {
  background-color: #3b82f6;
}

.toggle__input:checked + .toggle__slider::before {
  transform: translateX(1rem);
}

.toggle__input:focus + .toggle__slider {
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}
</style>
