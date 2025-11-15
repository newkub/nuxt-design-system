<script setup lang="ts">
interface Scope {
  id: string
  name: string
  description: string
  required: boolean
}

const props = withDefaults(defineProps<{
  appName?: string
  appDescription?: string
  scopes?: Scope[]
}>(), {
  appName: 'Application',
  appDescription: 'This application is requesting access to your account',
  scopes: () => [
    { id: 'profile', name: 'Profile Information', description: 'Access your basic profile information', required: true },
    { id: 'email', name: 'Email Address', description: 'Access your email address', required: true },
    { id: 'offline_access', name: 'Offline Access', description: 'Access your data when you\'re not using the app', required: false }
  ]
})

const selectedScopes = ref<string[]>(
  props.scopes.filter(s => s.required).map(s => s.id)
)

const loading = ref(false)

const emit = defineEmits<{
  submit: [data: { scopes: string[] }]
  cancel: []
}>()

const toggleScope = (scopeId: string, required: boolean) => {
  if (required) return
  
  const index = selectedScopes.value.indexOf(scopeId)
  if (index > -1) {
    selectedScopes.value.splice(index, 1)
  } else {
    selectedScopes.value.push(scopeId)
  }
}

const handleAllow = () => {
  loading.value = true
  emit('submit', { scopes: selectedScopes.value })
  setTimeout(() => {
    loading.value = false
  }, 1000)
}

const handleCancel = () => {
  emit('cancel')
}
</script>

<template>
  <div class="consent-form">
    <div class="form-header">
      <div class="app-icon">🔐</div>
      <h2 class="form-title">{{ appName }}</h2>
      <p class="form-subtitle">{{ appDescription }}</p>
    </div>

    <div class="permissions-section">
      <h3 class="permissions-title">This app would like to:</h3>
      <div class="permissions-list">
        <label 
          v-for="scope in scopes" 
          :key="scope.id"
          class="permission-item"
          :class="{ 'permission-required': scope.required }"
        >
          <input
            type="checkbox"
            :checked="selectedScopes.includes(scope.id)"
            :disabled="scope.required"
            @change="toggleScope(scope.id, scope.required)"
            class="permission-checkbox"
          />
          <div class="permission-content">
            <div class="permission-name">
              {{ scope.name }}
              <span v-if="scope.required" class="required-badge">Required</span>
            </div>
            <div class="permission-description">{{ scope.description }}</div>
          </div>
        </label>
      </div>
    </div>

    <div class="form-actions">
      <button 
        @click="handleCancel" 
        type="button" 
        class="cancel-btn"
      >
        Cancel
      </button>
      <button 
        @click="handleAllow" 
        :disabled="loading" 
        class="allow-btn"
      >
        {{ loading ? 'Authorizing...' : 'Allow' }}
      </button>
    </div>

    <div class="form-footer">
      <p class="footer-note">
        By clicking Allow, you allow this app to use your information in accordance with their terms of service and privacy policy.
      </p>
    </div>
  </div>
</template>

<style scoped>
.consent-form {
  @apply w-full max-w-md bg-white rounded-lg border border-gray-200 p-8;
}

.form-header {
  @apply mb-6 text-center;
}

.app-icon {
  @apply w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center text-3xl;
}

.form-title {
  @apply text-2xl font-bold text-gray-900 mb-2;
}

.form-subtitle {
  @apply text-gray-600;
}

.permissions-section {
  @apply mb-6;
}

.permissions-title {
  @apply text-sm font-semibold text-gray-900 mb-3;
}

.permissions-list {
  @apply space-y-3;
}

.permission-item {
  @apply flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer;
}

.permission-required {
  @apply bg-blue-50 hover:bg-blue-50;
}

.permission-checkbox {
  @apply w-5 h-5 mt-0.5 rounded border-gray-300;
}

.permission-content {
  @apply flex-1;
}

.permission-name {
  @apply text-sm font-medium text-gray-900 mb-1 flex items-center gap-2;
}

.required-badge {
  @apply text-xs px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full;
}

.permission-description {
  @apply text-xs text-gray-600;
}

.form-actions {
  @apply flex gap-3;
}

.cancel-btn {
  @apply flex-1 py-2 px-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50;
}

.allow-btn {
  @apply flex-1 py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed;
}

.form-footer {
  @apply mt-6;
}

.footer-note {
  @apply text-xs text-gray-500 text-center;
}
</style>
