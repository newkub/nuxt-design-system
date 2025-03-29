<template>
  <nav class="sticky top-0 bg-white shadow-md z-50 dark:(bg-gray-900 text-white)">
    <div class="container mx-auto px-4 py-2 flex justify-between items-center">
      <NuxtLink 
        to="/" 
        class="text-xl font-bold hover:(text-primary-500) transition-(colors duration-300)"
      >
        {{ props.logoText }}
      </NuxtLink>
      <div class="flex items-center space-x-4">
        <NuxtLink
          v-for="(link, index) in props.links"
          :key="index"
          :to="link.to"
          class="hover:(text-primary-500) transition-(colors duration-300)"
        >
          {{ link.text }}
        </NuxtLink>
        <button 
          @click="toggleTheme"
          class="p-2 rounded-full hover:(bg-gray-100 dark:bg-gray-700) transition-(colors duration-300)"
        >
          <div v-if="theme === 'dark'" class="i-heroicons-moon-20-solid w-5 h-5" />
          <div v-else class="i-heroicons-sun-20-solid w-5 h-5" />
        </button>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
interface Props {
  logoText?: string
  links?: { text: string; to: string }[]
}

const props = withDefaults(defineProps<Props>(), {
  logoText: 'Nuxt Design System',
  links: () => [
    { text: 'Components', to: '/components' },
    { text: 'Composables', to: '/composables' },
    { text: 'Get Started', to: '/get-started' }
  ]
})

const theme = useState('theme', () => 'light')

const toggleTheme = () => {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
  document.documentElement.classList.toggle('dark', theme.value === 'dark')
}
</script>