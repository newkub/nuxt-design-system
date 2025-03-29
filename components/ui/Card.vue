<script setup lang="ts">
interface Props {
  shadow?: 'sm' | 'md' | 'lg' | 'none'
  rounded?: 'sm' | 'md' | 'lg' | 'none'
  hoverEffect?: boolean
  padding?: string
  border?: 'sm' | 'md' | 'lg' | 'none'
  headerClass?: string
  footerClass?: string
  contentClass?: string
}

const props = withDefaults(defineProps<Props>(), {
  shadow: 'md',
  rounded: 'md',
  hoverEffect: false,
  padding: 'p-6',
  border: 'none'
})
</script>

<template>
  <div
    class="bg-white dark:bg-gray-800"
    :class="[
      `shadow-${props.shadow}`,
      `rounded-${props.rounded}`,
      `border-${props.border} border-gray-200 dark:border-gray-700`,
      props.padding,
      { 'hover:(shadow-lg transition-shadow duration-200)': props.hoverEffect }
    ]"
  >
    <!-- Header slot -->
    <header v-if="$slots.header" :class="['border-b p-4 dark:border-gray-700', props.headerClass]">
      <slot name="header" />
    </header>

    <!-- Main content -->
    <div :class="['py-4', props.contentClass]">
      <slot />
    </div>

    <!-- Footer slot -->
    <footer v-if="$slots.footer" :class="['border-t p-4 dark:border-gray-700', props.footerClass]">
      <slot name="footer" />
    </footer>
  </div>
</template>
