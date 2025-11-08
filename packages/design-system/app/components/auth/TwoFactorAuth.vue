<script setup lang="ts">
const code = ref(['', '', '', '', '', ''])
const loading = ref(false)

const emit = defineEmits<{
  submit: [data: { code: string }]
  resendCode: []
  backToLogin: []
}>()

const inputRefs = ref<HTMLInputElement[]>([])

const handleInput = (index: number, event: Event) => {
  const target = event.target as HTMLInputElement
  const value = target.value
  
  if (value && index < 5) {
    inputRefs.value[index + 1]?.focus()
  }
}

const handleKeyDown = (index: number, event: KeyboardEvent) => {
  if (event.key === 'Backspace' && !code.value[index] && index > 0) {
    inputRefs.value[index - 1]?.focus()
  }
}

const handlePaste = (event: ClipboardEvent) => {
  event.preventDefault()
  const pastedData = event.clipboardData?.getData('text').slice(0, 6)
  if (pastedData && /^\d+$/.test(pastedData)) {
    code.value = pastedData.split('').concat(Array(6 - pastedData.length).fill(''))
    inputRefs.value[Math.min(pastedData.length, 5)]?.focus()
  }
}

const handleSubmit = () => {
  const fullCode = code.value.join('')
  if (fullCode.length === 6) {
    loading.value = true
    emit('submit', { code: fullCode })
    setTimeout(() => {
      loading.value = false
    }, 1000)
  }
}

watchEffect(() => {
  const fullCode = code.value.join('')
  if (fullCode.length === 6) {
    handleSubmit()
  }
})
</script>

<template>
  <div class="two-factor-auth">
    <div class="form-header">
      <h2 class="form-title">Two-Factor Authentication</h2>
      <p class="form-subtitle">Enter the 6-digit code from your authenticator app</p>
    </div>

    <div class="code-inputs">
      <input
        v-for="(digit, index) in code"
        :key="index"
        :ref="el => inputRefs[index] = el as HTMLInputElement"
        v-model="code[index]"
        type="text"
        inputmode="numeric"
        maxlength="1"
        class="code-input"
        @input="handleInput(index, $event)"
        @keydown="handleKeyDown(index, $event)"
        @paste="handlePaste"
      />
    </div>

    <div class="form-actions">
      <button @click="emit('resendCode')" type="button" class="resend-btn">
        Didn't receive a code? Resend
      </button>
      <button @click="emit('backToLogin')" type="button" class="back-btn">
        ← Back to sign in
      </button>
    </div>
  </div>
</template>

<style scoped>
.two-factor-auth {
  @apply w-full max-w-md bg-white rounded-lg border border-gray-200 p-8;
}

.form-header {
  @apply mb-6 text-center;
}

.form-title {
  @apply text-2xl font-bold text-gray-900 mb-2;
}

.form-subtitle {
  @apply text-gray-600;
}

.code-inputs {
  @apply flex gap-2 justify-center mb-6;
}

.code-input {
  @apply w-12 h-14 text-center text-2xl font-bold border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none;
}

.form-actions {
  @apply space-y-3 text-center;
}

.resend-btn {
  @apply text-sm text-blue-600 hover:text-blue-700;
}

.back-btn {
  @apply w-full py-2 px-4 text-gray-600 hover:text-gray-800;
}
</style>
