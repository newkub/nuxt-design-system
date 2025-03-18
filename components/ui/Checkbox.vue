<template>
  <label class="checkbox">
    <input
      type="checkbox"
      :checked="modelValue"
      @change="$emit('update:modelValue', ($event.target as HTMLInputElement).checked)"
      class="checkbox__input"
    />
    <span class="checkbox__label">
      <slot />
    </span>
  </label>
</template>

<script setup lang="ts">
defineProps<{
  modelValue?: boolean
}>()

defineEmits(['update:modelValue'])
</script>

<style scoped>
.checkbox {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
}

.checkbox__input {
  width: 1rem;
  height: 1rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.25rem;
  appearance: none;
  cursor: pointer;
  transition: all 0.2s;
}

.checkbox__input:checked {
  background-color: #3b82f6;
  border-color: #3b82f6;
}

.checkbox__input:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.checkbox__label {
  font-size: 0.875rem;
  color: #4b5563;
}
</style>
