<script setup lang="ts">
interface ProfileData {
  name: string
  title?: string
  avatar?: string
  cover?: string
  bio?: string
  stats?: Array<{ label: string; value: string | number }>
  links?: Array<{ label: string; url: string; icon?: string }>
}

interface Props {
  profile: ProfileData
  editable?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  editable: false
})

const emit = defineEmits<{
  edit: []
}>()
</script>

<template>
  <div class="data-profile">
    <div v-if="profile.cover" class="profile-cover">
      <img :src="profile.cover" alt="Cover" />
    </div>

    <div class="profile-content">
      <div class="profile-header">
        <div class="profile-avatar">
          <img v-if="profile.avatar" :src="profile.avatar" :alt="profile.name" />
          <div v-else class="i-mdi-account w-16 h-16 text-gray-400" />
        </div>

        <div class="profile-info">
          <h2 class="profile-name">{{ profile.name }}</h2>
          <p v-if="profile.title" class="profile-title">{{ profile.title }}</p>
        </div>

        <button v-if="editable" @click="emit('edit')" class="edit-btn">
          <div class="i-mdi-pencil w-4 h-4" />
          Edit
        </button>
      </div>

      <p v-if="profile.bio" class="profile-bio">{{ profile.bio }}</p>

      <div v-if="profile.stats" class="profile-stats">
        <div v-for="stat in profile.stats" :key="stat.label" class="stat-item">
          <div class="stat-value">{{ stat.value }}</div>
          <div class="stat-label">{{ stat.label }}</div>
        </div>
      </div>

      <div v-if="profile.links" class="profile-links">
        <a
          v-for="link in profile.links"
          :key="link.label"
          :href="link.url"
          class="link-item"
          target="_blank"
        >
          <div v-if="link.icon" :class="[link.icon, 'w-4 h-4']" />
          {{ link.label }}
        </a>
      </div>
    </div>
  </div>
</template>

<style scoped>
.data-profile {
  @apply bg-white rounded-lg border border-gray-200 overflow-hidden;
}

.profile-cover {
  @apply h-32 bg-gradient-to-r from-blue-500 to-purple-600 overflow-hidden;
}

.profile-cover img {
  @apply w-full h-full object-cover;
}

.profile-content {
  @apply p-6;
}

.profile-header {
  @apply flex items-start gap-4 mb-4;
}

.profile-avatar {
  @apply w-20 h-20 rounded-full border-4 border-white -mt-10 bg-gray-100 overflow-hidden flex items-center justify-center;
}

.profile-avatar img {
  @apply w-full h-full object-cover;
}

.profile-info {
  @apply flex-1;
}

.profile-name {
  @apply text-2xl font-bold text-gray-900;
}

.profile-title {
  @apply text-gray-600;
}

.edit-btn {
  @apply flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700;
}

.profile-bio {
  @apply text-gray-600 mb-4;
}

.profile-stats {
  @apply flex gap-6 py-4 border-t border-b border-gray-200 mb-4;
}

.stat-item {
  @apply text-center;
}

.stat-value {
  @apply text-2xl font-bold text-gray-900;
}

.stat-label {
  @apply text-sm text-gray-600;
}

.profile-links {
  @apply flex flex-wrap gap-2;
}

.link-item {
  @apply flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors text-sm;
}
</style>
