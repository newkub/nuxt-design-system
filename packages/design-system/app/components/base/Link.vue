<script setup lang="ts">
const props = withDefaults(defineProps<{
  href?: string
  to?: string
  external?: boolean
  underline?: boolean
  disabled?: boolean
}>(), {
  underline: true,
  disabled: false,
  external: false
})

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

const isExternal = computed(() => {
  return props.external || props.href?.startsWith('http')
})

const linkComponent = computed(() => {
  if (props.to) return 'NuxtLink'
  return 'a'
})
</script>

<template>
  <component
    :is="linkComponent"
    :to="to"
    :href="href"
    :target="isExternal ? '_blank' : undefined"
    :rel="isExternal ? 'noopener noreferrer' : undefined"
    :class="['base-link', { underline, disabled }]"
    @click="emit('click', $event)"
  >
    <slot />
    <span v-if="isExternal" class="external-icon">↗</span>
  </component>
</template>

<style scoped>
.base-link {
  @apply text-blue-600 hover:text-blue-700 transition-colors inline-flex items-center gap-1;
}

.base-link.underline {
  @apply hover:underline;
}

.base-link.disabled {
  @apply text-gray-400 cursor-not-allowed hover:text-gray-400 hover:no-underline pointer-events-none;
}

.external-icon {
  @apply text-xs;
}
</style>
