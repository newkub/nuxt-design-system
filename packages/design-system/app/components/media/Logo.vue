<script setup lang="ts">
const props = withDefaults(defineProps<{
  src?: string
  text?: string
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  clickable?: boolean
}>(), {
  size: 'md',
  clickable: true
})

const emit = defineEmits<{
  click: []
}>()
</script>

<template>
  <component
    :is="clickable ? 'button' : 'div'"
    :class="['logo', size]"
    @click="clickable && emit('click')"
  >
    <img v-if="src" :src="src" alt="logo" class="logo-image" />
    <span v-else class="logo-text">{{ text || 'Logo' }}</span>
  </component>
</template>

<style scoped>
.logo {
  @apply inline-flex items-center justify-center;
}

.logo.xs {
  @apply h-6;
}

.logo.sm {
  @apply h-8;
}

.logo.md {
  @apply h-10;
}

.logo.lg {
  @apply h-12;
}

.logo.xl {
  @apply h-16;
}

.logo-image {
  @apply h-full w-auto;
}

.logo-text {
  @apply font-bold text-gray-900;
}

.logo.xs .logo-text {
  @apply text-sm;
}

.logo.sm .logo-text {
  @apply text-base;
}

.logo.md .logo-text {
  @apply text-lg;
}

.logo.lg .logo-text {
  @apply text-xl;
}

.logo.xl .logo-text {
  @apply text-2xl;
}
</style>
