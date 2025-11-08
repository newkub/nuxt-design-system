<script setup lang="ts">
defineProps<{
  src: string
  autoplay?: boolean
  controls?: boolean
  loop?: boolean
  muted?: boolean
}>()
</script>

<template>
  <div class="relative w-full aspect-video bg-black rounded-lg overflow-hidden">
    <video
      :src="src"
      :autoplay="autoplay"
      :controls="controls ?? true"
      :loop="loop"
      :muted="muted"
      class="w-full h-full"
    >
      Your browser does not support the video tag.
    </video>
  </div>
</template>
