<script setup lang="ts">
const props = withDefaults(defineProps<{
  modelValue?: string
  placeholder?: string
  disabled?: boolean
  readonly?: boolean
  required?: boolean
  rows?: number
  resize?: 'none' | 'vertical' | 'horizontal' | 'both'
  maxLength?: number
  showCount?: boolean
  error?: boolean
}>(), {
  disabled: false,
  readonly: false,
  required: false,
  rows: 3,
  resize: 'vertical',
  showCount: false,
  error: false
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
  focus: [event: FocusEvent]
  blur: [event: FocusEvent]
}>()

const textareaRef = ref<HTMLTextAreaElement>()
const characterCount = computed(() => props.modelValue?.length || 0)

const focus = () => textareaRef.value?.focus()
const blur = () => textareaRef.value?.blur()

defineExpose({ focus, blur })
</script>

<template>
  <div class="base-textarea-wrapper">
    <textarea
      ref="textareaRef"
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :readonly="readonly"
      :required="required"
      :rows="rows"
      :maxlength="maxLength"
      :class="['base-textarea', resize, { error, disabled }]"
      @input="emit('update:modelValue', ($event.target as HTMLTextAreaElement).value)"
      @focus="emit('focus', $event)"
      @blur="emit('blur', $event)"
    />
    <div v-if="showCount && maxLength" class="textarea-count">
      {{ characterCount }} / {{ maxLength }}
    </div>
  </div>
</template>

<style scoped>
.base-textarea-wrapper {
  @apply relative;
}

.base-textarea {
  @apply w-full px-4 py-2 border border-gray-300 rounded-lg bg-white outline-none transition-colors;
}

.base-textarea:focus {
  @apply border-blue-500 ring-2 ring-blue-500 ring-opacity-20;
}

.base-textarea.error {
  @apply border-red-500;
}

.base-textarea.error:focus {
  @apply border-red-500 ring-red-500 ring-opacity-20;
}

.base-textarea.disabled {
  @apply bg-gray-100 cursor-not-allowed;
}

.base-textarea.none {
  @apply resize-none;
}

.base-textarea.vertical {
  @apply resize-y;
}

.base-textarea.horizontal {
  @apply resize-x;
}

.base-textarea.both {
  @apply resize;
}

.textarea-count {
  @apply absolute bottom-2 right-2 text-xs text-gray-500;
}
</style>
