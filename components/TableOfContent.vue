<template>
  <aside class="fixed top-4 right-4 w-60 p-4 border-l border-gray-200 bg-white max-h-[calc(100vh-2rem)] overflow-y-auto dark:(bg-gray-900 border-gray-700)" aria-labelledby="toc-heading">
    <h3 id="toc-heading" class="text-sm font-semibold mb-4 text-gray-900 dark:text-gray-100">
      <span class="i-carbon-list"></span>
      <span class="ml-2">On this page</span>
    </h3>
    <nav class="toc-nav" aria-label="Table of contents">
      <ul class="list-none p-0 m-0 flex flex-col gap-1">
        <li v-for="(heading, index) in headings" :key="index">
          <a 
            :href="`#${heading.id}`" 
            class="text-sm text-gray-500 no-underline transition-(all duration-200) py-1 px-2 rounded hover:(text-gray-900 bg-gray-100) dark:(text-gray-400 hover:text-white hover:bg-gray-700)"
          >
            {{ heading.text }}
          </a>
        </li>
      </ul>
    </nav>
  </aside>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

interface Props {
  headingLevels?: number[]
  scrollOffset?: number
}

const props = withDefaults(defineProps<Props>(), {
  headingLevels: () => [2, 3],
  scrollOffset: 80
})

const headings = ref<{id: string, text: string}[]>([])

onMounted(() => {
  const selector = props.headingLevels.map(level => `h${level}`).join(',')
  const headingElements = document.querySelectorAll(selector)
  headings.value = Array.from(headingElements).map(heading => ({
    id: heading.id,
    text: heading.textContent || ''
  }))
})
</script>