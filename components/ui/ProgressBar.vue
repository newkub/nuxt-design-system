<script setup lang="ts">
interface Props {
  value?: number
  max?: number
  type?: 'linear' | 'circular'
  color?: string
  thickness?: number
  showLabel?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  value: 0,
  max: 100,
  type: 'linear',
  color: 'primary-500',
  thickness: 8,
  showLabel: false
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
    <div v-if="type === 'linear'" class="w-full bg-gray-200 rounded-full overflow-hidden dark:bg-gray-700">
      <div
        class="h-4 transition-all duration-300 ease-in-out"
        :class="`bg-${props.color}`"
        :style="{
          width: `${percentage}%`
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
        class="stroke-gray-200 dark:stroke-gray-700"
        fill="transparent"
      />
      <circle
        cx="50"
        cy="50"
        :r="circularProps.radius"
        :stroke-width="thickness"
        :stroke-dasharray="circularProps.circumference"
        :stroke-dashoffset="circularProps.dashOffset"
        :class="`stroke-${props.color}`"
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
        'text-gray-700 dark:text-gray-200': type === 'circular'
      }"
    >
      <slot>
        {{ Math.round(percentage) }}%
      </slot>
    </div>
  </div>
</template>
