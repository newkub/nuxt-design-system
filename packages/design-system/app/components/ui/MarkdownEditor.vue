<script setup lang="ts">
defineProps<{
  modelValue: string
  placeholder?: string
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
  submit: []
}>()

function handleInput(event: Event) {
  const target = event.target as HTMLTextAreaElement
  emit('update:modelValue', target.value)
}

function focus() {
  // Implement focus logic
}

function focusEnd() {
  // Implement focus end logic
}

function applyFormat(command: string, value?: string) {
  // Implement format logic
  console.log('Apply format:', command, value)
}

defineExpose({
  focus,
  focusEnd,
  applyFormat
})
</script>

<template>
  <textarea
    :value="modelValue"
    :placeholder="placeholder"
    class="w-full min-h-[200px] p-4 resize-none focus:outline-none"
    @input="handleInput"
    @keydown.ctrl.enter="emit('submit')"
    @keydown.meta.enter="emit('submit')"
  />
</template>
