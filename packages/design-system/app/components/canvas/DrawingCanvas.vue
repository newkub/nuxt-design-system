<script setup lang="ts">
import { useCanvas, type Shape } from '~/composables/useCanvas'

const {
  tool,
  shapes,
  selectedShapeIds,
  color,
  fillColor,
  strokeWidth,
  zoom,
  addShape,
  selectShape,
  clearSelection,
  updateShape
} = useCanvas()

const canvas = ref<HTMLCanvasElement | null>(null)
const drawing = ref(false)
const currentShape = ref<Shape | null>(null)
const startPoint = ref({ x: 0, y: 0 })

const getMousePos = (e: MouseEvent) => {
  const rect = canvas.value?.getBoundingClientRect()
  if (!rect) return { x: 0, y: 0 }
  
  return {
    x: (e.clientX - rect.left) / zoom.value,
    y: (e.clientY - rect.top) / zoom.value
  }
}

const onMouseDown = (e: MouseEvent) => {
  const pos = getMousePos(e)
  drawing.value = true
  startPoint.value = pos

  if (tool.value === 'select') {
    // Check if clicking on existing shape
    const clickedShape = shapes.value.find(s => 
      pos.x >= s.x && pos.x <= s.x + (s.width || 0) &&
      pos.y >= s.y && pos.y <= s.y + (s.height || 0)
    )
    
    if (clickedShape) {
      selectShape(clickedShape.id, e.shiftKey)
    } else {
      clearSelection()
    }
    return
  }

  const id = `shape-${Date.now()}`
  
  if (tool.value === 'rectangle') {
    currentShape.value = {
      id,
      type: 'rectangle',
      x: pos.x,
      y: pos.y,
      width: 0,
      height: 0,
      fill: fillColor.value,
      stroke: color.value,
      strokeWidth: strokeWidth.value
    }
  } else if (tool.value === 'circle') {
    currentShape.value = {
      id,
      type: 'circle',
      x: pos.x,
      y: pos.y,
      width: 0,
      height: 0,
      fill: fillColor.value,
      stroke: color.value,
      strokeWidth: strokeWidth.value
    }
  } else if (tool.value === 'line') {
    currentShape.value = {
      id,
      type: 'line',
      x: pos.x,
      y: pos.y,
      x2: pos.x,
      y2: pos.y,
      stroke: color.value,
      strokeWidth: strokeWidth.value
    }
  } else if (tool.value === 'pen') {
    currentShape.value = {
      id,
      type: 'path',
      x: pos.x,
      y: pos.y,
      points: [{ x: pos.x, y: pos.y }],
      stroke: color.value,
      strokeWidth: strokeWidth.value
    }
  }
}

const onMouseMove = (e: MouseEvent) => {
  if (!drawing.value || !currentShape.value) return
  
  const pos = getMousePos(e)
  
  if (tool.value === 'rectangle' || tool.value === 'circle') {
    currentShape.value.width = pos.x - startPoint.value.x
    currentShape.value.height = pos.y - startPoint.value.y
  } else if (tool.value === 'line') {
    currentShape.value.x2 = pos.x
    currentShape.value.y2 = pos.y
  } else if (tool.value === 'pen' && currentShape.value.points) {
    currentShape.value.points.push({ x: pos.x, y: pos.y })
  }
  
  drawCanvas()
}

const onMouseUp = () => {
  if (currentShape.value) {
    addShape(currentShape.value)
    currentShape.value = null
  }
  drawing.value = false
  drawCanvas()
}

const drawCanvas = () => {
  const ctx = canvas.value?.getContext('2d')
  if (!ctx || !canvas.value) return
  
  ctx.clearRect(0, 0, canvas.value.width, canvas.value.height)
  ctx.save()
  ctx.scale(zoom.value, zoom.value)
  
  // Draw all shapes
  for (const shape of shapes.value) {
    drawShape(ctx, shape)
  }
  
  // Draw current shape
  if (currentShape.value) {
    drawShape(ctx, currentShape.value)
  }
  
  ctx.restore()
}

const drawShape = (ctx: CanvasRenderingContext2D, shape: Shape) => {
  ctx.strokeStyle = shape.stroke || '#000'
  ctx.fillStyle = shape.fill || 'transparent'
  ctx.lineWidth = shape.strokeWidth || 2
  
  if (shape.type === 'rectangle') {
    ctx.beginPath()
    ctx.rect(shape.x, shape.y, shape.width || 0, shape.height || 0)
    ctx.fill()
    ctx.stroke()
  } else if (shape.type === 'circle') {
    const rx = Math.abs((shape.width || 0) / 2)
    const ry = Math.abs((shape.height || 0) / 2)
    ctx.beginPath()
    ctx.ellipse(shape.x + rx, shape.y + ry, rx, ry, 0, 0, Math.PI * 2)
    ctx.fill()
    ctx.stroke()
  } else if (shape.type === 'line') {
    ctx.beginPath()
    ctx.moveTo(shape.x, shape.y)
    ctx.lineTo(shape.x2 || shape.x, shape.y2 || shape.y)
    ctx.stroke()
  } else if (shape.type === 'path' && shape.points) {
    ctx.beginPath()
    ctx.moveTo(shape.points[0].x, shape.points[0].y)
    for (let i = 1; i < shape.points.length; i++) {
      ctx.lineTo(shape.points[i].x, shape.points[i].y)
    }
    ctx.stroke()
  }
  
  // Highlight selected
  if (selectedShapeIds.value.has(shape.id)) {
    ctx.strokeStyle = '#3b82f6'
    ctx.lineWidth = 2 / zoom.value
    ctx.setLineDash([5, 5])
    ctx.strokeRect(shape.x - 5, shape.y - 5, (shape.width || 0) + 10, (shape.height || 0) + 10)
    ctx.setLineDash([])
  }
}

watch([shapes, selectedShapeIds, zoom], drawCanvas, { deep: true })

onMounted(() => {
  if (canvas.value) {
    canvas.value.width = 1200
    canvas.value.height = 800
    drawCanvas()
  }
})
</script>

<template>
  <canvas
    ref="canvas"
    class="drawing-canvas"
    @mousedown="onMouseDown"
    @mousemove="onMouseMove"
    @mouseup="onMouseUp"
    @mouseleave="onMouseUp"
  />
</template>

<style scoped>
.drawing-canvas {
  @apply border border-gray-300 bg-white cursor-crosshair;
}
</style>
