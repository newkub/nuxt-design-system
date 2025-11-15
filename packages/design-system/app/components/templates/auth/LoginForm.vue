<script setup lang="ts">
const email = ref('')
const password = ref('')
const rememberMe = ref(false)
const loading = ref(false)

const emit = defineEmits<{
  submit: [data: { email: string; password: string; rememberMe: boolean }]
  forgotPassword: []
  signUp: []
}>()

const handleSubmit = () => {
  loading.value = true
  emit('submit', { email: email.value, password: password.value, rememberMe: rememberMe.value })
  setTimeout(() => {
    loading.value = false
  }, 1000)
}
</script>

<template>
  <div class="login-form">
    <div class="form-header">
      <h2 class="form-title">Sign in to your account</h2>
      <p class="form-subtitle">Welcome back! Please enter your details</p>
    </div>

    <form @submit.prevent="handleSubmit" class="form-content">
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

      <div class="form-group">
        <label for="password" class="form-label">Password</label>
        <input
          id="password"
          v-model="password"
          type="password"
          required
          placeholder="Enter your password"
          class="form-input"
        />
      </div>

      <div class="form-row">
        <label class="checkbox-label">
          <input v-model="rememberMe" type="checkbox" class="checkbox" />
          <span>Remember me</span>
        </label>
        <button type="button" @click="emit('forgotPassword')" class="link-btn">
          Forgot password?
        </button>
      </div>

      <button type="submit" :disabled="loading" class="submit-btn">
        {{ loading ? 'Signing in...' : 'Sign in' }}
      </button>

      <div class="form-footer">
        <span class="footer-text">Don't have an account?</span>
        <button type="button" @click="emit('signUp')" class="link-btn">
          Sign up
        </button>
      </div>
    </form>
  </div>
</template>

<style scoped>
.login-form {
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

.form-row {
  @apply flex items-center justify-between;
}

.checkbox-label {
  @apply flex items-center gap-2 text-sm text-gray-700;
}

.checkbox {
  @apply w-4 h-4 rounded border-gray-300;
}

.link-btn {
  @apply text-sm text-blue-600 hover:text-blue-700;
}

.submit-btn {
  @apply w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed;
}

.form-footer {
  @apply flex items-center justify-center gap-2 text-sm;
}

.footer-text {
  @apply text-gray-600;
}
</style>
