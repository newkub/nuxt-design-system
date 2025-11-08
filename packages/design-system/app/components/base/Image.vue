<script setup lang="ts">
const props = withDefaults(defineProps<{
  src: string
  alt?: string
  width?: string | number
  height?: string | number
  lazy?: boolean
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down'
  rounded?: boolean | string
}>(), {
  lazy: true,
  objectFit: 'cover',
  rounded: false
})

const emit = defineEmits<{
  load: []
  error: []
}>()

const isLoaded = ref(false)
const hasError = ref(false)

const imageClasses = computed(() => {
  const classes = ['base-image', props.objectFit]
  
  if (props.rounded) {
    if (typeof props.rounded === 'string') {
      classes.push(props.rounded)
    } else {
      classes.push('rounded-lg')
    }
  }
  
  return classes
})
</script>

<template>
  <img
    :src="src"
    :alt="alt"
    :width="width"
    :height="height"
    :loading="lazy ? 'lazy' : 'eager'"
    :class="imageClasses"
    @load="isLoaded = true; emit('load')"
    @error="hasError = true; emit('error')"
  />
</template>

<style scoped>
.base-image {
  @apply max-w-full h-auto;
}

.base-image.cover {
  @apply object-cover;
}

.base-image.contain {
  @apply object-contain;
}

.base-image.fill {
  @apply object-fill;
}

.base-image.none {
  @apply object-none;
}

.base-image.scale-down {
  @apply object-scale-down;
}
</style>
