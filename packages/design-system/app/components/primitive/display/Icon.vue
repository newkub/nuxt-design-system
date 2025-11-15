<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  name: string
  className?: string
}

const props = withDefaults(defineProps<Props>(), {
  className: ''
})
</script>

<template>
  <span class="iconify" :data-icon="name" :class="className"></span>
</template>