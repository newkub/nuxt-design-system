<script setup lang="ts">
const props = withDefaults(defineProps<{
  email?: string
  status?: 'pending' | 'verified' | 'expired'
}>(), {
  status: 'pending'
})

const loading = ref(false)

const emit = defineEmits<{
  resendEmail: []
  backToLogin: []
  continue: []
}>()

const handleResend = () => {
  loading.value = true
  emit('resendEmail')
  setTimeout(() => {
    loading.value = false
  }, 1000)
}
</script>

<template>
  <div class="email-verification">
    <div class="content-container">
      <div v-if="status === 'pending'" class="pending-state">
        <div class="icon">📧</div>
        <h2 class="title">Verify Your Email</h2>
        <p class="message">
          We've sent a verification link to<br />
          <strong>{{ email }}</strong>
        </p>
        
        <div class="instructions">
          <p>Please check your email and click the verification link to continue.</p>
        </div>

        <div class="actions">
          <button @click="handleResend" :disabled="loading" class="resend-btn">
            {{ loading ? 'Sending...' : 'Resend Email' }}
          </button>
          <button @click="emit('backToLogin')" class="back-btn">
            Back to Sign In
          </button>
        </div>
      </div>

      <div v-else-if="status === 'verified'" class="verified-state">
        <div class="success-icon">✓</div>
        <h2 class="title">Email Verified!</h2>
        <p class="message">Your email has been successfully verified.</p>
        
        <button @click="emit('continue')" class="continue-btn">
          Continue to Dashboard
        </button>
      </div>

      <div v-else class="expired-state">
        <div class="warning-icon">⚠️</div>
        <h2 class="title">Link Expired</h2>
        <p class="message">This verification link has expired or is invalid.</p>
        
        <div class="actions">
          <button @click="handleResend" :disabled="loading" class="resend-btn">
            {{ loading ? 'Sending...' : 'Send New Link' }}
          </button>
          <button @click="emit('backToLogin')" class="back-btn">
            Back to Sign In
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.email-verification {
  @apply min-h-screen flex items-center justify-center bg-gray-50 p-4;
}

.content-container {
  @apply w-full max-w-md bg-white rounded-lg border border-gray-200 p-8 text-center;
}

.pending-state,
.verified-state,
.expired-state {
  @apply space-y-4;
}

.icon {
  @apply w-20 h-20 mx-auto bg-blue-100 rounded-full flex items-center justify-center text-5xl;
}

.success-icon {
  @apply w-20 h-20 mx-auto bg-green-100 text-green-600 rounded-full flex items-center justify-center text-5xl font-bold;
}

.warning-icon {
  @apply w-20 h-20 mx-auto bg-yellow-100 rounded-full flex items-center justify-center text-5xl;
}

.title {
  @apply text-2xl font-bold text-gray-900;
}

.message {
  @apply text-gray-600;
}

.instructions {
  @apply bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-800;
}

.actions {
  @apply space-y-3 mt-6;
}

.resend-btn {
  @apply w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed;
}

.continue-btn {
  @apply w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700;
}

.back-btn {
  @apply w-full py-2 px-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50;
}
</style>
