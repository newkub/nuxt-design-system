<script setup lang="ts">
const props = withDefaults(defineProps<{
  src: string
  autoplay?: boolean
  loop?: boolean
  controls?: boolean
}>(), {
  autoplay: false,
  loop: false,
  controls: true
})

const emit = defineEmits<{
  play: []
  pause: []
  ended: []
  error: []
}>()

const audioRef = ref<HTMLAudioElement>()

const play = () => audioRef.value?.play()
const pause = () => audioRef.value?.pause()

defineExpose({ play, pause })
</script>

<template>
  <div class="audio-container">
    <audio
      ref="audioRef"
      :src="src"
      :autoplay="autoplay"
      :loop="loop"
      :controls="controls"
      class="audio"
      @play="emit('play')"
      @pause="emit('pause')"
      @ended="emit('ended')"
      @error="emit('error')"
    >
      Your browser does not support the audio tag.
    </audio>
  </div>
</template>

<style scoped>
.audio-container {
  @apply w-full;
}

.audio {
  @apply w-full;
}
</style>
