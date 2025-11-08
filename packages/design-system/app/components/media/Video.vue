<script setup lang="ts">
const props = withDefaults(defineProps<{
  src: string
  poster?: string
  autoplay?: boolean
  loop?: boolean
  muted?: boolean
  controls?: boolean
  width?: string | number
  height?: string | number
}>(), {
  autoplay: false,
  loop: false,
  muted: false,
  controls: true
})

const emit = defineEmits<{
  play: []
  pause: []
  ended: []
  error: []
}>()

const videoRef = ref<HTMLVideoElement>()

const play = () => videoRef.value?.play()
const pause = () => videoRef.value?.pause()

defineExpose({ play, pause })
</script>

<template>
  <div class="video-container">
    <video
      ref="videoRef"
      :src="src"
      :poster="poster"
      :autoplay="autoplay"
      :loop="loop"
      :muted="muted"
      :controls="controls"
      :width="width"
      :height="height"
      class="video"
      @play="emit('play')"
      @pause="emit('pause')"
      @ended="emit('ended')"
      @error="emit('error')"
    >
      Your browser does not support the video tag.
    </video>
  </div>
</template>

<style scoped>
.video-container {
  @apply relative w-full bg-black;
}

.video {
  @apply w-full h-full;
}
</style>
