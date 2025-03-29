<template>
  <aside 
    class="w-240px h-screen fixed left-0 top-0 p-4 border-r border-gray-200 bg-white transition-(width duration-300 ease) dark:(bg-gray-900 border-gray-700)" 
    :class="{'w-64px': isCollapsed}"
  >
    <button 
      @click="toggleCollapse" 
      class="absolute right-2 top-2 p-2 rounded-md bg-gray-100 text-gray-500 transition-(all duration-200) hover:(bg-gray-200 text-gray-900) dark:(bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white)" 
      aria-label="Toggle sidebar"
    >
      <span v-if="!isCollapsed" class="i-carbon-collapse-categories"></span>
      <span v-else class="i-carbon-expand-categories"></span>
    </button>
    <nav class="flex flex-col gap-2">
      <NuxtLink 
        v-for="(link, index) in props.links" 
        :key="index" 
        :to="link.to" 
        class="p-2 rounded-md text-gray-500 transition-(all duration-200) hover:(bg-gray-100 text-gray-900) router-link-active:(bg-gray-200 text-gray-900) dark:(text-gray-400 hover:bg-gray-700 hover:text-white router-link-active:bg-gray-800 router-link-active:text-white)"
      >
        <span v-if="link.icon" :class="link.icon" class="mr-2"></span>
        <span v-if="!isCollapsed">{{ link.text }}</span>
      </NuxtLink>
    </nav>
    <div v-if="props.user" class="mt-auto pt-4 border-t border-gray-200 dark:border-gray-700">
      <Avatar 
        :src="props.user.avatar" 
        :initials="props.user.name.split(' ').map(n => n[0]).join('')"
        size="small"
        class="mx-auto"
      />
    </div>
  </aside>
</template>

<script setup lang="ts">
import Avatar from '~/components/ui/Avatar.vue'
import { ref } from 'vue'

interface Props {
  defaultCollapsed?: boolean
  links?: { text: string; to: string; icon?: string }[]
  user?: {
    name: string
    avatar?: string
  }
}

const props = withDefaults(defineProps<Props>(), {
  defaultCollapsed: false,
  links: () => [
    { text: 'Components', to: '/components', icon: 'i-carbon-components' },
    { text: 'Composables', to: '/composables', icon: 'i-carbon-function' }
  ]
})

const isCollapsed = ref(props.defaultCollapsed)
const toggleCollapse = () => {
  isCollapsed.value = !isCollapsed.value
}
</script>