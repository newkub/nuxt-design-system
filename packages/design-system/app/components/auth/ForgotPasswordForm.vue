<script setup lang="ts">
const email = ref('')
const loading = ref(false)
const success = ref(false)

const emit = defineEmits<{
  submit: [data: { email: string }]
  backToLogin: []
}>()

const handleSubmit = () => {
  loading.value = true
  emit('submit', { email: email.value })
  setTimeout(() => {
    loading.value = false
    success.value = true
  }, 1000)
}
</script>

<template>
  <div class="forgot-password-form">
    <div class="form-header">
      <h2 class="form-title">Forgot password?</h2>
      <p class="form-subtitle">
        {{ success 
          ? 'Check your email for a reset link' 
          : 'Enter your email and we\'ll send you a reset link' 
        }}
      </p>
    </div>

    <form v-if="!success" @submit.prevent="handleSubmit" class="form-content">
      <div class="form-group">
        <label for="email" class="form-label">Email</label>
        <input
          id="email"
          v-model="email"
          type="email"
          required
          placeholder="Enter your email"
          class="form-input"
        />
      </div>

      <button type="submit" :disabled="loading" class="submit-btn">
        {{ loading ? 'Sending...' : 'Send reset link' }}
      </button>

      <button type="button" @click="emit('backToLogin')" class="back-btn">
        ← Back to sign in
      </button>
    </form>

    <div v-else class="success-content">
      <div class="success-icon">✓</div>
      <p class="success-message">
        We've sent a password reset link to <strong>{{ email }}</strong>
      </p>
      <button @click="emit('backToLogin')" class="back-btn-success">
        Back to sign in
      </button>
    </div>
  </div>
</template>

<style scoped>
.forgot-password-form {
  @apply w-full max-w-md bg-white rounded-lg border border-gray-200 p-8;
}

.form-header {
  @apply mb-6;
}

.form-title {
  @apply text-2xl font-bold text-gray-900 mb-2;
}

.form-subtitle {
  @apply text-gray-600;
}

.form-content {
  @apply space-y-4;
}

.form-group {
  @apply space-y-2;
}

.form-label {
  @apply block text-sm font-medium text-gray-700;
}

.form-input {
  @apply w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none;
}

.submit-btn {
  @apply w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed;
}

.back-btn {
  @apply w-full py-2 px-4 text-gray-600 hover:text-gray-800 text-center;
}

.success-content {
  @apply text-center space-y-4;
}

.success-icon {
  @apply w-16 h-16 mx-auto bg-green-100 text-green-600 rounded-full flex items-center justify-center text-3xl font-bold;
}

.success-message {
  @apply text-gray-700;
}

.back-btn-success {
  @apply w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700;
}
</style>
