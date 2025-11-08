<script setup lang="ts">
const props = defineProps<{
  src: string
  title?: string
  artist?: string
  cover?: string
}>()

const audioRef = ref<HTMLAudioElement>()
const isPlaying = ref(false)
const currentTime = ref(0)
const duration = ref(0)
const volume = ref(1)

const togglePlay = () => {
  if (isPlaying.value) {
    audioRef.value?.pause()
  } else {
    audioRef.value?.play()
  }
}

const formatTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${mins}:${secs.toString().padStart(2, '0')}`
}
</script>

<template>
  <div class="audio-player">
    <audio
      ref="audioRef"
      :src="src"
      @play="isPlaying = true"
      @pause="isPlaying = false"
      @timeupdate="currentTime = audioRef!.currentTime"
      @loadedmetadata="duration = audioRef!.duration"
    />
    
    <div class="player-content">
      <img v-if="cover" :src="cover" alt="cover" class="cover" />
      <div v-else class="cover-placeholder">🎵</div>
      
      <div class="track-info">
        <div class="track-title">{{ title || 'Unknown Track' }}</div>
        <div class="track-artist">{{ artist || 'Unknown Artist' }}</div>
      </div>
      
      <button @click="togglePlay" class="play-btn">
        {{ isPlaying ? '⏸' : '▶' }}
      </button>
    </div>
    
    <div class="progress-bar">
      <span class="time">{{ formatTime(currentTime) }}</span>
      <input
        type="range"
        :value="currentTime"
        :max="duration"
        @input="audioRef && (audioRef.currentTime = Number(($event.target as HTMLInputElement).value))"
        class="progress-slider"
      />
      <span class="time">{{ formatTime(duration) }}</span>
    </div>
  </div>
</template>

<style scoped>
.audio-player {
  @apply w-full bg-white rounded-lg border border-gray-200 p-4;
}

.player-content {
  @apply flex items-center gap-4 mb-4;
}

.cover {
  @apply w-16 h-16 rounded-lg object-cover;
}

.cover-placeholder {
  @apply w-16 h-16 rounded-lg bg-gray-200 flex items-center justify-center text-3xl;
}

.track-info {
  @apply flex-1;
}

.track-title {
  @apply font-semibold text-gray-900;
}

.track-artist {
  @apply text-sm text-gray-600;
}

.play-btn {
  @apply w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700 text-xl;
}

.progress-bar {
  @apply flex items-center gap-2;
}

.time {
  @apply text-xs text-gray-600;
}

.progress-slider {
  @apply flex-1;
}
</style>
