<script setup lang="ts">
const password = ref('')
const confirmPassword = ref('')
const loading = ref(false)
const success = ref(false)
const passwordError = ref('')

const emit = defineEmits<{
  submit: [data: { password: string }]
  backToLogin: []
}>()

const validatePassword = () => {
  if (password.value !== confirmPassword.value) {
    passwordError.value = 'Passwords do not match'
    return false
  }
  if (password.value.length < 8) {
    passwordError.value = 'Password must be at least 8 characters'
    return false
  }
  passwordError.value = ''
  return true
}

const handleSubmit = () => {
  if (!validatePassword()) return
  
  loading.value = true
  emit('submit', { password: password.value })
  setTimeout(() => {
    loading.value = false
    success.value = true
  }, 1000)
}
</script>

<template>
  <div class="reset-password-form">
    <div class="form-header">
      <h2 class="form-title">Reset password</h2>
      <p class="form-subtitle">
        {{ success 
          ? 'Your password has been reset' 
          : 'Enter your new password' 
        }}
      </p>
    </div>

    <form v-if="!success" @submit.prevent="handleSubmit" class="form-content">
      <div class="form-group">
        <label for="password" class="form-label">New Password</label>
        <input
          id="password"
          v-model="password"
          type="password"
          required
          placeholder="Create a new password"
          class="form-input"
          @blur="validatePassword"
        />
      </div>

      <div class="form-group">
        <label for="confirmPassword" class="form-label">Confirm Password</label>
        <input
          id="confirmPassword"
          v-model="confirmPassword"
          type="password"
          required
          placeholder="Confirm your new password"
          class="form-input"
          @blur="validatePassword"
        />
        <p v-if="passwordError" class="error-text">{{ passwordError }}</p>
      </div>

      <button 
        type="submit" 
        :disabled="loading || !!passwordError" 
        class="submit-btn"
      >
        {{ loading ? 'Resetting...' : 'Reset password' }}
      </button>

      <button type="button" @click="emit('backToLogin')" class="back-btn">
        ← Back to sign in
      </button>
    </form>

    <div v-else class="success-content">
      <div class="success-icon">✓</div>
      <p class="success-message">
        Your password has been successfully reset
      </p>
      <button @click="emit('backToLogin')" class="back-btn-success">
        Continue to sign in
      </button>
    </div>
  </div>
</template>

<style scoped>
.reset-password-form {
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

.error-text {
  @apply text-sm text-red-600;
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
