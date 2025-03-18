<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  value: { type: Number, default: 0 },
  max: { type: Number, default: 100 },
  type: {
    type: String,
    default: 'linear',
    validator: (value: string) => ['linear', 'circular'].includes(value)
  },
  color: { type: String, default: '#3b82f6' },
  thickness: { type: Number, default: 8 },
  showLabel: { type: Boolean, default: false }
})

const percentage = computed(() => {
  return Math.min(100, Math.max(0, (props.value / props.max) * 100))
})

const circularProps = computed(() => {
  const radius = 50 - props.thickness / 2
  const circumference = 2 * Math.PI * radius
  return {
    radius,
    circumference,
    dashOffset: circumference - (percentage.value / 100) * circumference
  }
})
</script>

<template>
  <div class="relative" role="progressbar" :aria-valuenow="value" :aria-valuemin="0" :aria-valuemax="max">
    <!-- Linear Progress -->
    <div v-if="type === 'linear'" class="w-full bg-gray-200 rounded-full overflow-hidden">
      <div
        class="h-4 transition-all duration-300 ease-in-out"
        :style="{
          width: `${percentage}%`,
          backgroundColor: color
        }"
      />
    </div>

    <!-- Circular Progress -->
    <svg v-else class="transform -rotate-90" width="100" height="100" viewBox="0 0 100 100">
      <circle
        cx="50"
        cy="50"
        :r="circularProps.radius"
        stroke-width="8"
        stroke="#e2e8f0"
        fill="transparent"
      />
      <circle
        cx="50"
        cy="50"
        :r="circularProps.radius"
        :stroke-width="thickness"
        :stroke-dasharray="circularProps.circumference"
        :stroke-dashoffset="circularProps.dashOffset"
        :stroke="color"
        fill="transparent"
        class="transition-all duration-300 ease-in-out"
      />
    </svg>

    <!-- Label -->
    <div
      v-if="showLabel"
      class="absolute inset-0 flex items-center justify-center text-sm font-medium"
      :class="{
        'text-white': type === 'linear',
        'text-gray-700': type === 'circular'
      }"
    >
      <slot>
        {{ Math.round(percentage) }}%
      </slot>
    </div>
  </div>
</template>
