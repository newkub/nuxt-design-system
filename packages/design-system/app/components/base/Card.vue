<script setup lang="ts">
const props = withDefaults(defineProps<{
  padding?: boolean
  shadow?: boolean | 'sm' | 'md' | 'lg' | 'xl'
  border?: boolean
  hoverable?: boolean
}>(), {
  padding: true,
  shadow: 'md',
  border: true,
  hoverable: false
})

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

const cardClasses = computed(() => {
  const classes: string[] = ['base-card']
  
  if (props.padding) {
    classes.push('card-padding')
  }
  
  if (props.shadow) {
    if (typeof props.shadow === 'string') {
      classes.push(`shadow-${props.shadow}`)
    } else {
      classes.push('shadow')
    }
  }
  
  if (props.border) {
    classes.push('card-border')
  }
  
  if (props.hoverable) {
    classes.push('card-hoverable')
  }
  
  return classes
})
</script>

<template>
  <div :class="cardClasses" @click="emit('click', $event)">
    <div v-if="$slots.header" class="card-header">
      <slot name="header" />
    </div>
    
    <div class="card-body">
      <slot />
    </div>
    
    <div v-if="$slots.footer" class="card-footer">
      <slot name="footer" />
    </div>
  </div>
</template>

<style scoped>
.base-card {
  @apply bg-white rounded-lg;
}

.card-padding {
  @apply p-6;
}

.card-border {
  @apply border border-gray-200;
}

.card-hoverable {
  @apply cursor-pointer transition-all hover:shadow-lg;
}

.card-header {
  @apply pb-4 border-b border-gray-200 mb-4;
}

.card-footer {
  @apply pt-4 border-t border-gray-200 mt-4;
}

.card-body {
  @apply space-y-4;
}
</style>
