<script setup lang="ts">
const props = withDefaults(defineProps<{
  title?: string
  message?: string
  reason?: string
  showContactSupport?: boolean
  showBackButton?: boolean
}>(), {
  title: 'Access Denied',
  message: 'You don\'t have permission to access this resource',
  showContactSupport: true,
  showBackButton: true
})

const emit = defineEmits<{
  backToHome: []
  contactSupport: []
}>()
</script>

<template>
  <div class="access-denied">
    <div class="content-container">
      <div class="icon-container">
        <div class="icon">🚫</div>
      </div>

      <div class="text-content">
        <h1 class="title">{{ title }}</h1>
        <p class="message">{{ message }}</p>
        
        <div v-if="reason" class="reason-box">
          <div class="reason-label">Reason:</div>
          <div class="reason-text">{{ reason }}</div>
        </div>

        <div class="suggestions">
          <p class="suggestions-title">What you can do:</p>
          <ul class="suggestions-list">
            <li>Verify you're signed in with the correct account</li>
            <li>Request access from the resource owner</li>
            <li>Check if your account has the necessary permissions</li>
            <li v-if="showContactSupport">Contact support if you believe this is an error</li>
          </ul>
        </div>
      </div>

      <div class="action-buttons">
        <button v-if="showBackButton" @click="emit('backToHome')" class="back-btn">
          ← Back to Home
        </button>
        <button v-if="showContactSupport" @click="emit('contactSupport')" class="support-btn">
          Contact Support
        </button>
      </div>

      <div class="footer-info">
        <p class="error-code">Error Code: 403 - Forbidden</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.access-denied {
  @apply min-h-screen flex items-center justify-center bg-gray-50 p-4;
}

.content-container {
  @apply w-full max-w-md bg-white rounded-lg border border-gray-200 p-8 text-center;
}

.icon-container {
  @apply mb-6;
}

.icon {
  @apply w-20 h-20 mx-auto bg-red-100 rounded-full flex items-center justify-center text-5xl;
}

.text-content {
  @apply mb-6 space-y-4;
}

.title {
  @apply text-2xl font-bold text-gray-900;
}

.message {
  @apply text-gray-600;
}

.reason-box {
  @apply bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-left;
}

.reason-label {
  @apply text-sm font-semibold text-yellow-800 mb-1;
}

.reason-text {
  @apply text-sm text-yellow-700;
}

.suggestions {
  @apply text-left;
}

.suggestions-title {
  @apply text-sm font-semibold text-gray-900 mb-2;
}

.suggestions-list {
  @apply text-sm text-gray-600 space-y-1 list-disc list-inside;
}

.action-buttons {
  @apply flex flex-col gap-3 mb-6;
}

.back-btn {
  @apply w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700;
}

.support-btn {
  @apply w-full py-2 px-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50;
}

.footer-info {
  @apply pt-4 border-t border-gray-200;
}

.error-code {
  @apply text-xs text-gray-500;
}
</style>
