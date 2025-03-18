<script setup lang="ts">
interface ClassMap {
  sm: string
  md: string
  lg: string
  none: string
}

const props = defineProps({
  shadow: {
    type: String as () => keyof ClassMap,
    default: 'md',
    validator: (value: string) => ['sm', 'md', 'lg', 'none'].includes(value)
  },
  rounded: {
    type: String as () => keyof ClassMap,
    default: 'md',
    validator: (value: string) => ['sm', 'md', 'lg', 'none'].includes(value)
  },
  hoverEffect: { type: Boolean, default: false },
  padding: { type: String, default: 'p-6' }
})

const shadowClasses: ClassMap = {
  sm: 'shadow-sm',
  md: 'shadow-md',
  lg: 'shadow-lg',
  none: ''
}

const roundedClasses: ClassMap = {
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  none: 'rounded-none'
}
</script>

<template>
  <div
    class="bg-white"
    :class="[
      shadowClasses[props.shadow],
      roundedClasses[props.rounded],
      props.padding,
      { 'hover:shadow-lg transition-shadow duration-200': props.hoverEffect }
    ]"
  >
    <!-- Header slot -->
    <header v-if="$slots.header" class="border-b p-4">
      <slot name="header" />
    </header>

    <!-- Main content -->
    <div class="py-4">
      <slot />
    </div>

    <!-- Footer slot -->
    <footer v-if="$slots.footer" class="border-t p-4">
      <slot name="footer" />
    </footer>
  </div>
</template>
