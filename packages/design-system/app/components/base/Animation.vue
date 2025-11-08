<script setup lang="ts">
import type { AnimationConfig, AnimationInstance, AnimationPreset } from '~/types/animation'
import { getPreset, mergePreset } from '~/utils/animation-presets'

const props = withDefaults(defineProps<{
  // Preset or custom config
  preset?: AnimationPreset
  config?: AnimationConfig
  
  // Basic options
  duration?: number
  delay?: number
  easing?: AnimationConfig['easing']
  
  // Control
  autoplay?: boolean
  loop?: boolean
  trigger?: 'mount' | 'hover' | 'click' | 'scroll' | 'intersection' | 'manual'
  
  // Stagger (for multiple children)
  stagger?: number
  
  // Advanced
  intersectionThreshold?: number
  scrollOffset?: number
}>(), {
  autoplay: true,
  trigger: 'mount',
  loop: false,
  intersectionThreshold: 0.1,
  scrollOffset: 0
})

const emit = defineEmits<{
  start: []
  complete: []
  update: [progress: number]
}>()

const { animate, animateStagger } = useAnimation()
const containerRef = ref<HTMLElement>()
const instance = ref<AnimationInstance | null>(null)
const isPlaying = ref(false)

/**
 * Get final config
 */
const getFinalConfig = (): AnimationConfig => {
  let baseConfig: AnimationConfig = {}
  
  // Start with preset if provided
  if (props.preset) {
    baseConfig = getPreset(props.preset)
  }
  
  // Merge with custom config
  if (props.config) {
    baseConfig = { ...baseConfig, ...props.config }
  }
  
  // Override with component props
  const finalConfig: AnimationConfig = {
    ...baseConfig,
    duration: props.duration ?? baseConfig.duration,
    delay: props.delay ?? baseConfig.delay,
    easing: props.easing ?? baseConfig.easing,
    autoplay: props.autoplay,
    iterations: props.loop ? 'infinite' : (baseConfig.iterations || 1),
    onStart: () => {
      isPlaying.value = true
      emit('start')
      baseConfig.onStart?.()
    },
    onComplete: () => {
      isPlaying.value = false
      emit('complete')
      baseConfig.onComplete?.()
    },
    onUpdate: (progress) => {
      emit('update', progress)
      baseConfig.onUpdate?.(progress)
    }
  }
  
  return finalConfig
}

/**
 * Play animation
 */
const play = () => {
  if (!containerRef.value) return
  
  const config = getFinalConfig()
  const children = Array.from(containerRef.value.children) as HTMLElement[]
  
  if (props.stagger && children.length > 1) {
    const instances = animateStagger(children, {
      ...config,
      stagger: props.stagger
    })
    instance.value = instances[0] // Store first instance for control
  } else {
    instance.value = animate(containerRef.value, config)
  }
}

/**
 * Pause animation
 */
const pause = () => {
  instance.value?.pause()
  isPlaying.value = false
}

/**
 * Restart animation
 */
const restart = () => {
  instance.value?.restart()
  isPlaying.value = true
}

/**
 * Setup triggers
 */
const setupTriggers = () => {
  if (!containerRef.value || !import.meta.client) return
  
  switch (props.trigger) {
    case 'mount':
      play()
      break
      
    case 'hover':
      containerRef.value.addEventListener('mouseenter', play)
      containerRef.value.addEventListener('mouseleave', pause)
      break
      
    case 'click':
      containerRef.value.addEventListener('click', play)
      break
      
    case 'scroll': {
      const onScroll = () => {
        const rect = containerRef.value?.getBoundingClientRect()
        const isInView = rect.top < window.innerHeight - props.scrollOffset
        if (isInView && !isPlaying.value) {
          play()
        }
      }
      window.addEventListener('scroll', onScroll)
      onScroll() // Check initial position
      
      onUnmounted(() => {
        window.removeEventListener('scroll', onScroll)
      })
      break
    }
      
    case 'intersection': {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting && !isPlaying.value) {
              play()
            }
          })
        },
        { threshold: props.intersectionThreshold }
      )
      observer.observe(containerRef.value)
      
      onUnmounted(() => {
        observer.disconnect()
      })
      break
    }
      
    case 'manual':
      // Do nothing, controlled externally
      break
  }
}

onMounted(() => {
  setupTriggers()
})

// Expose methods
defineExpose({
  play,
  pause,
  restart,
  instance
})
</script>

<template>
  <div ref="containerRef" class="base-animation">
    <slot />
  </div>
</template>

<style scoped>
.base-animation {
  @apply will-change-[transform,opacity];
}
</style>
