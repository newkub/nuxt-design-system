<template>
  <div class="inline-flex items-center justify-center rounded-full overflow-hidden bg-gray-200 text-gray-600 dark:bg-gray-700 dark:text-gray-300" 
       :class="[
         size === 'small' ? 'w-8 h-8 text-xs' : 
         size === 'large' ? 'w-16 h-16 text-xl' : 
         'w-12 h-12 text-base'
       ]">
    <img
      v-if="src"
      :src="src"
      :alt="alt"
      class="w-full h-full object-cover"
    />
    <div v-else class="font-medium uppercase">
      {{ initials }}
    </div>
  </div>
</template>

<script setup lang="ts">
interface AvatarProps {
  src?: string
  alt?: string
  initials?: string
  size?: 'small' | 'medium' | 'large'
}

const props = withDefaults(defineProps<AvatarProps>(), {
  size: 'medium',
  initials: ''
})
</script>
