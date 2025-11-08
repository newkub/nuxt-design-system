<script setup lang="ts">
const props = defineProps<{
  value: string
  activeTab: string
  lazy?: boolean
}>()

const isActive = computed(() => props.activeTab === props.value)
const hasBeenActive = ref(false)

watch(isActive, (newVal) => {
  if (newVal) hasBeenActive.value = true
}, { immediate: true })

const shouldRender = computed(() => {
  if (!props.lazy) return true
  return hasBeenActive.value
})
</script>

<template>
  <div v-if="shouldRender" v-show="isActive" class="tab-panel">
    <slot />
  </div>
</template>

<style scoped>
.tab-panel {
  @apply py-4;
}
</style>
