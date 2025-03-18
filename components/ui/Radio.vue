<template>
  <label class="radio">
    <input
      type="radio"
      :value="value"
      :checked="modelValue === value"
      @change="$emit('update:modelValue', value)"
      class="radio__input"
    />
    <span class="radio__label">
      <slot />
    </span>
  </label>
</template>

<script setup lang="ts">
defineProps<{
  value: string | number
  modelValue?: string | number
}>()

defineEmits(['update:modelValue'])
</script>

<style scoped>
.radio {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
}

.radio__input {
  width: 1rem;
  height: 1rem;
  border: 1px solid #e5e7eb;
  border-radius: 50%;
  appearance: none;
  cursor: pointer;
  transition: all 0.2s;
}

.radio__input:checked {
  background-color: #3b82f6;
  border-color: #3b82f6;
}

.radio__input:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.radio__label {
  font-size: 0.875rem;
  color: #4b5563;
}
</style>
