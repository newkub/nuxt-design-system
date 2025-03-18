<template>
  <div :class="['avatar', { 'avatar--small': size === 'small', 'avatar--large': size === 'large' }]">
    <img
      v-if="src"
      :src="src"
      :alt="alt"
      class="avatar__image"
    />
    <div v-else class="avatar__placeholder">
      {{ initials }}
    </div>
  </div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  src?: string
  alt?: string
  initials?: string
  size?: 'small' | 'medium' | 'large'
}>(), {
  size: 'medium'
})
</script>

<style scoped>
.avatar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  overflow: hidden;
  background-color: #e5e7eb;
  color: #4b5563;
}

.avatar--small {
  width: 2rem;
  height: 2rem;
  font-size: 0.75rem;
}

.avatar--medium {
  width: 3rem;
  height: 3rem;
  font-size: 1rem;
}

.avatar--large {
  width: 4rem;
  height: 4rem;
  font-size: 1.25rem;
}

.avatar__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.avatar__placeholder {
  font-weight: 500;
  text-transform: uppercase;
}
</style>
