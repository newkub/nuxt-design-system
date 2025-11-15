<script setup lang="ts">
const props = withDefaults(defineProps<{
  url: string
  provider?: 'youtube' | 'vimeo' | 'custom'
  aspectRatio?: string
}>(), {
  provider: 'youtube',
  aspectRatio: '16/9'
})

const embedUrl = computed(() => {
  const url = props.url
  
  if (props.provider === 'youtube') {
    const videoId = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&]+)/)?.[1]
    return videoId ? `https://www.youtube.com/embed/${videoId}` : url
  }
  
  if (props.provider === 'vimeo') {
    const videoId = url.match(/vimeo\.com\/(\d+)/)?.[1]
    return videoId ? `https://player.vimeo.com/video/${videoId}` : url
  }
  
  return url
})
</script>

<template>
  <div class="embed-video" :style="{ aspectRatio }">
    <iframe
      :src="embedUrl"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
      class="embed-iframe"
    />
  </div>
</template>

<style scoped>
.embed-video {
  @apply relative w-full bg-black rounded-lg overflow-hidden;
}

.embed-iframe {
  @apply absolute inset-0 w-full h-full;
}
</style>
