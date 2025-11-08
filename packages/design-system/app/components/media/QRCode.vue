<script setup lang="ts">
const props = withDefaults(defineProps<{
  value: string
  size?: number
  errorLevel?: 'L' | 'M' | 'Q' | 'H'
}>(), {
  size: 200,
  errorLevel: 'M'
})

const canvasRef = ref<HTMLCanvasElement>()

const generateQR = async () => {
  if (!canvasRef.value) return
  
  const ctx = canvasRef.value.getContext('2d')
  if (!ctx) return
  
  canvasRef.value.width = props.size
  canvasRef.value.height = props.size
  
  ctx.fillStyle = '#FFFFFF'
  ctx.fillRect(0, 0, props.size, props.size)
  
  ctx.fillStyle = '#000000'
  ctx.font = '12px monospace'
  ctx.textAlign = 'center'
  ctx.fillText('QR Code', props.size / 2, props.size / 2)
  ctx.fillText(props.value.slice(0, 20), props.size / 2, props.size / 2 + 20)
}

watch(() => props.value, generateQR, { immediate: true })
watch(() => props.size, generateQR)
</script>

<template>
  <div class="qr-code">
    <canvas ref="canvasRef" class="qr-canvas" />
    <p class="qr-value">{{ value }}</p>
  </div>
</template>

<style scoped>
.qr-code {
  @apply inline-flex flex-col items-center gap-2;
}

.qr-canvas {
  @apply border border-gray-200 rounded;
}

.qr-value {
  @apply text-xs text-gray-600 max-w-full truncate;
}
</style>
