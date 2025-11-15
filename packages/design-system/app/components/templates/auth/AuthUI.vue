<script setup lang="ts">
type AuthView = 'login' | 'signup' | 'forgot-password' | 'reset-password' | 'consent'

const props = withDefaults(defineProps<{
  initialView?: AuthView
  showSocialLogin?: boolean
}>(), {
  initialView: 'login',
  showSocialLogin: true
})

const currentView = ref<AuthView>(props.initialView)
const resetToken = ref('')

const emit = defineEmits<{
  login: [data: { email: string; password: string; rememberMe: boolean }]
  signup: [data: { email: string; password: string; name: string }]
  forgotPassword: [data: { email: string }]
  resetPassword: [data: { password: string; token: string }]
  consent: [data: { scopes: string[] }]
  socialLogin: [provider: 'google' | 'github' | 'facebook']
}>()

const handleLogin = (data: { email: string; password: string; rememberMe: boolean }) => {
  emit('login', data)
}

const handleSignUp = (data: { email: string; password: string; name: string }) => {
  emit('signup', data)
}

const handleForgotPassword = (data: { email: string }) => {
  emit('forgotPassword', data)
}

const handleResetPassword = (data: { password: string }) => {
  emit('resetPassword', { password: data.password, token: resetToken.value })
}

const handleConsent = (data: { scopes: string[] }) => {
  emit('consent', data)
}

const switchView = (view: AuthView) => {
  currentView.value = view
}

const handleSocialLogin = (provider: 'google' | 'github' | 'facebook') => {
  emit('socialLogin', provider)
}
</script>

<template>
  <div class="auth-ui">
    <div class="auth-container">
      <AuthLoginForm
        v-if="currentView === 'login'"
        @submit="handleLogin"
        @forgot-password="switchView('forgot-password')"
        @sign-up="switchView('signup')"
      />
      
      <AuthSignUpForm
        v-else-if="currentView === 'signup'"
        @submit="handleSignUp"
        @sign-in="switchView('login')"
      />
      
      <AuthForgotPasswordForm
        v-else-if="currentView === 'forgot-password'"
        @submit="handleForgotPassword"
        @back-to-login="switchView('login')"
      />
      
      <AuthResetPasswordForm
        v-else-if="currentView === 'reset-password'"
        @submit="handleResetPassword"
        @back-to-login="switchView('login')"
      />
      
      <AuthConsentForm
        v-else-if="currentView === 'consent'"
        @submit="handleConsent"
        @cancel="switchView('login')"
      />

      <div v-if="showSocialLogin && ['login', 'signup'].includes(currentView)" class="social-login">
        <div class="divider">
          <span>Or continue with</span>
        </div>
        <div class="social-buttons">
          <button @click="handleSocialLogin('google')" class="social-btn">
            <span>Google</span>
          </button>
          <button @click="handleSocialLogin('github')" class="social-btn">
            <span>GitHub</span>
          </button>
          <button @click="handleSocialLogin('facebook')" class="social-btn">
            <span>Facebook</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.auth-ui {
  @apply min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4;
}

.auth-container {
  @apply w-full max-w-md space-y-4;
}

.social-login {
  @apply mt-6 space-y-4;
}

.divider {
  @apply relative text-center;
}

.divider::before,
.divider::after {
  @apply absolute top-1/2 w-[calc(50%-3rem)] h-px bg-gray-300;
  content: '';
}

.divider::before {
  @apply left-0;
}

.divider::after {
  @apply right-0;
}

.divider span {
  @apply px-4 text-sm text-gray-500 bg-gray-50;
}

.social-buttons {
  @apply grid grid-cols-3 gap-3;
}

.social-btn {
  @apply px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium text-gray-700;
}
</style>
