<script setup lang="ts">
import { ref, computed } from 'vue'

interface Props {
  initialUrl?: string
  allowNavigation?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  initialUrl: 'https://example.com',
  allowNavigation: true
})

const urlInput = ref(props.initialUrl)
const iframeUrl = ref(props.initialUrl)
const iframe = ref<HTMLIFrameElement | null>(null)
const isLoading = ref(true)

type ResponsiveMode = 'desktop' | 'tablet' | 'mobile'
const responsiveMode = ref<ResponsiveMode>('desktop')

const navigate = () => {
  let url = urlInput.value
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    url = `https://${url}`
  }
  iframeUrl.value = url
  isLoading.value = true
}

const reload = () => {
  if (iframe.value) {
    isLoading.value = true
    iframe.value.src = iframeUrl.value
  }
}

const goBack = () => {
  iframe.value?.contentWindow?.history.back()
}

const goForward = () => {
  iframe.value?.contentWindow?.history.forward()
}

const onIframeLoad = () => {
  isLoading.value = false
}

const responsiveClasses = computed(() => {
  switch (responsiveMode.value) {
    case 'tablet':
      return 'w-[768px] h-[1024px]'
    case 'mobile':
      return 'w-[375px] h-[667px]'
    default:
      return 'w-full h-full'
  }
})

const responsiveDevices = [
  { icon: 'i-mdi-desktop-mac', id: 'desktop' as const },
  { icon: 'i-mdi-tablet-ipad', id: 'tablet' as const },
  { icon: 'i-mdi-cellphone', id: 'mobile' as const }
]
</script>

<template>
  <div class="h-full w-full flex flex-col bg-gray-100">
    <!-- Browser Controls -->
    <div class="bg-white px-3 py-2 border-b border-gray-200 flex items-center gap-2">
      <!-- Navigation Buttons -->
      <div v-if="allowNavigation" class="flex items-center gap-1">
        <button @click="goBack" class="p-2 rounded hover:bg-gray-100 transition-colors">
          <div class="i-mdi-arrow-left w-5 h-5" />
        </button>
        <button @click="goForward" class="p-2 rounded hover:bg-gray-100 transition-colors">
          <div class="i-mdi-arrow-right w-5 h-5" />
        </button>
        <button @click="reload" class="p-2 rounded hover:bg-gray-100 transition-colors">
          <div class="i-mdi-refresh w-5 h-5" :class="{ 'animate-spin': isLoading }" />
        </button>
      </div>
      
      <!-- URL Bar -->
      <div class="flex-1">
        <form @submit.prevent="navigate" class="relative">
          <div class="i-mdi-lock absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            v-model="urlInput"
            type="text"
            class="w-full bg-gray-50 border border-gray-300 rounded-full py-2 pl-9 pr-4 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            placeholder="https://example.com"
          />
        </form>
      </div>

      <!-- Responsive Tools -->
      <div class="flex items-center gap-1 bg-gray-100 rounded-full p-1">
        <button
          v-for="device in responsiveDevices"
          :key="device.id"
          @click="responsiveMode = device.id"
          class="p-2 rounded-full transition-colors"
          :class="responsiveMode === device.id ? 'bg-white text-blue-500 shadow' : 'hover:bg-gray-200'"
        >
          <div :class="[device.icon, 'w-4 h-4']" />
        </button>
      </div>
    </div>

    <!-- Preview Area -->
    <div class="flex-1 p-4 overflow-auto flex justify-center items-start bg-gray-50">
      <div
        class="bg-white shadow-lg rounded-lg transition-all duration-300"
        :class="responsiveClasses"
      >
        <iframe
          ref="iframe"
          :src="iframeUrl"
          @load="onIframeLoad"
          class="w-full h-full border-0 rounded-lg"
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
        />
      </div>
    </div>
  </div>
</template>