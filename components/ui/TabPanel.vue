<script setup lang="ts">
import { inject } from 'vue'

const { activeTab } = inject('tabs', { activeTab: 0 })

const props = defineProps({
  index: { type: Number, required: true }
})

const isActive = activeTab === props.index
</script>

<template>
  <div v-if="isActive" class="p-4">
    <slot />
  </div>
</template>
