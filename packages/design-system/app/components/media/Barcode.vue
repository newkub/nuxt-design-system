<script setup lang="ts">
const props = withDefaults(defineProps<{
  value: string
  width?: number
  height?: number
  format?: 'CODE128' | 'EAN13' | 'UPC'
}>(), {
  width: 200,
  height: 80,
  format: 'CODE128'
})

const canvasRef = ref<HTMLCanvasElement>()

const generateBarcode = () => {
  if (!canvasRef.value) return
  
  const ctx = canvasRef.value.getContext('2d')
  if (!ctx) return
  
  canvasRef.value.width = props.width
  canvasRef.value.height = props.height
  
  ctx.fillStyle = '#FFFFFF'
  ctx.fillRect(0, 0, props.width, props.height)
  
  const barWidth = 2
  let x = 10
  
  for (let i = 0; i < props.value.length; i++) {
    if (parseInt(props.value[i], 10) % 2 === 0) {
      ctx.fillStyle = '#000000'
      ctx.fillRect(x, 10, barWidth, props.height - 30)
    }
    x += barWidth + 1
  }
  
  ctx.fillStyle = '#000000'
  ctx.font = '14px monospace'
  ctx.textAlign = 'center'
  ctx.fillText(props.value, props.width / 2, props.height - 5)
}

watch(() => props.value, generateBarcode, { immediate: true })
watch(() => [props.width, props.height], generateBarcode)
</script>

<template>
  <div class="barcode">
    <canvas ref="canvasRef" class="barcode-canvas" />
  </div>
</template>

<style scoped>
.barcode {
  @apply inline-flex;
}

.barcode-canvas {
  @apply border border-gray-200;
}
</style>
