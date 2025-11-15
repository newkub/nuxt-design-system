<script setup lang="ts">
import { ref, computed } from 'vue'

const hexColor = ref('#3b82f6')

const rgbColor = computed(() => {
  const hex = hexColor.value.replace('#', '')
  const r = parseInt(hex.substring(0, 2), 16)
  const g = parseInt(hex.substring(2, 4), 16)
  const b = parseInt(hex.substring(4, 6), 16)
  return { r, g, b }
})

const hslColor = computed(() => {
  const { r, g, b } = rgbColor.value
  const rNorm = r / 255
  const gNorm = g / 255
  const bNorm = b / 255
  
  const max = Math.max(rNorm, gNorm, bNorm)
  const min = Math.min(rNorm, gNorm, bNorm)
  const l = (max + min) / 2
  
  let h = 0, s = 0
  
  if (max !== min) {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    
    switch (max) {
      case rNorm: h = ((gNorm - bNorm) / d + (gNorm < bNorm ? 6 : 0)) / 6; break
      case gNorm: h = ((bNorm - rNorm) / d + 2) / 6; break
      case bNorm: h = ((rNorm - gNorm) / d + 4) / 6; break
    }
  }
  
  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100)
  }
})

const copyColor = (format: string) => {
  let text = ''
  if (format === 'hex') text = hexColor.value
  else if (format === 'rgb') text = `rgb(${rgbColor.value.r}, ${rgbColor.value.g}, ${rgbColor.value.b})`
  else if (format === 'hsl') text = `hsl(${hslColor.value.h}, ${hslColor.value.s}%, ${hslColor.value.l}%)`
  navigator.clipboard.writeText(text)
}

const shades = computed(() => {
  const { h, s } = hslColor.value
  return [10, 20, 30, 40, 50, 60, 70, 80, 90].map(l => {
    const hslStr = `hsl(${h}, ${s}%, ${l}%)`
    return { l, color: hslStr }
  })
})
</script>

<template>
  <div class="h-full flex flex-col bg-white">
    <div class="p-4 border-b bg-gray-50">
      <h2 class="text-lg font-semibold">Color Picker & Palette Generator</h2>
    </div>

    <div class="flex-1 overflow-y-auto p-4">
      <div class="mb-6">
        <div class="w-full h-40 rounded-lg mb-4" :style="{ backgroundColor: hexColor }" />
        <input
          v-model="hexColor"
          type="color"
          class="w-full h-12 rounded cursor-pointer"
        />
      </div>

      <div class="grid grid-cols-3 gap-4 mb-6">
        <div class="p-4 border rounded">
          <div class="text-sm font-medium text-gray-600 mb-2">HEX</div>
          <div class="font-mono text-lg">{{ hexColor }}</div>
          <button @click="copyColor('hex')" class="text-xs text-blue-600 mt-2">Copy</button>
        </div>
        <div class="p-4 border rounded">
          <div class="text-sm font-medium text-gray-600 mb-2">RGB</div>
          <div class="font-mono text-sm">{{ rgbColor.r }}, {{ rgbColor.g }}, {{ rgbColor.b }}</div>
          <button @click="copyColor('rgb')" class="text-xs text-blue-600 mt-2">Copy</button>
        </div>
        <div class="p-4 border rounded">
          <div class="text-sm font-medium text-gray-600 mb-2">HSL</div>
          <div class="font-mono text-sm">{{ hslColor.h }}°, {{ hslColor.s }}%, {{ hslColor.l }}%</div>
          <button @click="copyColor('hsl')" class="text-xs text-blue-600 mt-2">Copy</button>
        </div>
      </div>

      <div>
        <h3 class="font-semibold mb-3">Color Shades</h3>
        <div class="grid grid-cols-9 gap-2">
          <div v-for="shade in shades" :key="shade.l" class="text-center">
            <div class="w-full h-20 rounded" :style="{ backgroundColor: shade.color }" />
            <div class="text-xs text-gray-600 mt-1">{{ shade.l }}%</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
