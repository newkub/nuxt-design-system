<script setup lang="ts">
const props = withDefaults(defineProps<{
  provider?: string
  status?: 'loading' | 'success' | 'error'
  errorMessage?: string
}>(), {
  provider: 'OAuth',
  status: 'loading'
})

const emit = defineEmits<{
  retry: []
  backToLogin: []
}>()
</script>

<template>
  <div class="oauth-callback">
    <div class="content-container">
      <div v-if="status === 'loading'" class="loading-state">
        <div class="spinner"></div>
        <h2 class="status-title">Authenticating with {{ provider }}</h2>
        <p class="status-message">Please wait while we complete your sign in...</p>
      </div>

      <div v-else-if="status === 'success'" class="success-state">
        <div class="success-icon">✓</div>
        <h2 class="status-title">Authentication Successful</h2>
        <p class="status-message">Redirecting you now...</p>
      </div>

      <div v-else class="error-state">
        <div class="error-icon">✕</div>
        <h2 class="status-title">Authentication Failed</h2>
        <p class="status-message">{{ errorMessage || 'Something went wrong during authentication' }}</p>
        
        <div class="action-buttons">
          <button @click="emit('retry')" class="retry-btn">
            Try Again
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
.oauth-callback {
  @apply min-h-screen flex items-center justify-center bg-gray-50 p-4;
}

.content-container {
  @apply w-full max-w-md bg-white rounded-lg border border-gray-200 p-8 text-center;
}

.loading-state,
.success-state,
.error-state {
  @apply space-y-4;
}

.spinner {
  @apply w-12 h-12 mx-auto border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin;
}

.success-icon {
  @apply w-16 h-16 mx-auto bg-green-100 text-green-600 rounded-full flex items-center justify-center text-3xl font-bold;
}

.error-icon {
  @apply w-16 h-16 mx-auto bg-red-100 text-red-600 rounded-full flex items-center justify-center text-3xl font-bold;
}

.status-title {
  @apply text-2xl font-bold text-gray-900;
}

.status-message {
  @apply text-gray-600;
}

.action-buttons {
  @apply flex flex-col gap-3 mt-6;
}

.retry-btn {
  @apply w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700;
}

.back-btn {
  @apply w-full py-2 px-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50;
}
</style>
