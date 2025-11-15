<script setup lang="ts">
import { ref, watch } from 'vue'

interface Props {
  modelValue: string
  language?: string
  theme?: 'light' | 'dark'
  readonly?: boolean
  lineNumbers?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  language: 'javascript',
  theme: 'dark',
  readonly: false,
  lineNumbers: true
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const code = ref(props.modelValue)
const textarea = ref<HTMLTextAreaElement | null>(null)

watch(() => props.modelValue, (newValue) => {
  code.value = newValue
})

const updateCode = (event: Event) => {
  const target = event.target as HTMLTextAreaElement
  code.value = target.value
  emit('update:modelValue', target.value)
}

const lines = ref(code.value.split('\n').length)

watch(code, (newCode) => {
  lines.value = newCode.split('\n').length
})

const handleTab = (event: KeyboardEvent) => {
  if (event.key === 'Tab') {
    event.preventDefault()
    const start = textarea.value?.selectionStart || 0
    const end = textarea.value?.selectionEnd || 0
    code.value = `${code.value.substring(0, start)}  ${code.value.substring(end)}`
    emit('update:modelValue', code.value)
    
    setTimeout(() => {
      if (textarea.value) {
        textarea.value.selectionStart = textarea.value.selectionEnd = start + 2
      }
    }, 0)
  }
}
</script>

<template>
  <div
    class="h-full flex flex-col overflow-hidden rounded-lg border"
    :class="theme === 'dark' ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-300'"
  >
    <!-- Header -->
    <div
      class="flex items-center justify-between px-4 py-2 border-b"
      :class="theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-300'"
    >
      <div class="flex items-center gap-2">
        <div class="i-mdi-code-tags w-4 h-4" :class="theme === 'dark' ? 'text-gray-400' : 'text-gray-600'" />
        <span class="text-sm font-medium" :class="theme === 'dark' ? 'text-gray-300' : 'text-gray-700'">
          {{ language }}
        </span>
      </div>
      <div class="flex items-center gap-1">
        <button
          class="p-1 rounded hover:bg-gray-700 transition-colors"
          :class="theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'"
          title="Copy code"
          @click="navigator.clipboard.writeText(code)"
        >
          <div class="i-mdi-content-copy w-4 h-4" />
        </button>
      </div>
    </div>

    <!-- Editor -->
    <div class="flex-1 flex overflow-hidden">
      <!-- Line Numbers -->
      <div
        v-if="lineNumbers"
        class="flex flex-col py-4 px-2 text-right select-none font-mono text-sm"
        :class="theme === 'dark' ? 'bg-gray-800 text-gray-500' : 'bg-gray-100 text-gray-400'"
      >
        <div v-for="n in lines" :key="n" class="leading-6">{{ n }}</div>
      </div>

      <!-- Code Area -->
      <div class="flex-1 relative">
        <textarea
          ref="textarea"
          :value="code"
          :readonly="readonly"
          class="w-full h-full p-4 font-mono text-sm resize-none outline-none"
          :class="theme === 'dark' ? 'bg-gray-900 text-gray-100' : 'bg-white text-gray-900'"
          spellcheck="false"
          @input="updateCode"
          @keydown="handleTab"
        />
      </div>
    </div>
  </div>
</template>
