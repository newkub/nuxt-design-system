<script setup lang="ts">
const name = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const agreeToTerms = ref(false)
const loading = ref(false)
const passwordError = ref('')

const emit = defineEmits<{
  submit: [data: { email: string; password: string; name: string }]
  signIn: []
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
  if (!validatePassword() || !agreeToTerms.value) return
  
  loading.value = true
  emit('submit', { 
    email: email.value, 
    password: password.value, 
    name: name.value 
  })
  setTimeout(() => {
    loading.value = false
  }, 1000)
}
</script>

<template>
  <div class="signup-form">
    <div class="form-header">
      <h2 class="form-title">Create an account</h2>
      <p class="form-subtitle">Get started with your free account</p>
    </div>

    <form @submit.prevent="handleSubmit" class="form-content">
      <div class="form-group">
        <label for="name" class="form-label">Full Name</label>
        <input
          id="name"
          v-model="name"
          type="text"
          required
          placeholder="Enter your full name"
          class="form-input"
        />
      </div>

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
          placeholder="Create a password"
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
          placeholder="Confirm your password"
          class="form-input"
          @blur="validatePassword"
        />
        <p v-if="passwordError" class="error-text">{{ passwordError }}</p>
      </div>

      <label class="checkbox-label">
        <input v-model="agreeToTerms" type="checkbox" required class="checkbox" />
        <span>I agree to the Terms of Service and Privacy Policy</span>
      </label>

      <button 
        type="submit" 
        :disabled="loading || !agreeToTerms || !!passwordError" 
        class="submit-btn"
      >
        {{ loading ? 'Creating account...' : 'Create account' }}
      </button>

      <div class="form-footer">
        <span class="footer-text">Already have an account?</span>
        <button type="button" @click="emit('signIn')" class="link-btn">
          Sign in
        </button>
      </div>
    </form>
  </div>
</template>

<style scoped>
.signup-form {
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

.checkbox-label {
  @apply flex items-start gap-2 text-sm text-gray-700;
}

.checkbox {
  @apply w-4 h-4 mt-0.5 rounded border-gray-300;
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

.error-text {
  @apply text-sm text-red-600;
}
</style>
