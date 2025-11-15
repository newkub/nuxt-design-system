<script setup lang="ts">
// Types for animation configuration
interface AnimationConfig {
  // Animation properties
  translateX?: number | string
  translateY?: number | string
  scale?: number
  rotate?: number
  opacity?: number
  duration?: number
  delay?: number
  easing?: string
  iterations?: number | 'infinite'
  direction?: 'normal' | 'reverse' | 'alternate' | 'alternate-reverse'
  fill?: 'none' | 'forwards' | 'backwards' | 'both'
  
  // Callbacks
  onStart?: () => void
  onComplete?: () => void
  onUpdate?: (progress: number) => void
}

type AnimationPreset = 
  | 'fadeIn'
  | 'fadeOut'
  | 'slideInUp'
  | 'slideInDown'
  | 'slideInLeft'
  | 'slideInRight'
  | 'slideOutUp'
  | 'slideOutDown'
  | 'slideOutLeft'
  | 'slideOutRight'
  | 'zoomIn'
  | 'zoomOut'
  | 'bounce'
  | 'pulse'
  | 'shake'
  | 'flip'

interface AnimationInstance {
  play: () => void
  pause: () => void
  restart: () => void
  reverse: () => void
  cancel: () => void
  finish: () => void
  finished: Promise<void>
  currentTime: number
  playbackRate: number
}

// Props
const props = withDefaults(defineProps<{
  // Preset or custom config
  preset?: AnimationPreset
  config?: AnimationConfig
  
  // Basic options
  duration?: number
  delay?: number
  easing?: string
  
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

// Reactive references
const containerRef = ref<HTMLElement>()
const instance = ref<AnimationInstance | null>(null)
const isPlaying = ref(false)

/**
 * Get preset configuration
 */
const getPreset = (preset: AnimationPreset): AnimationConfig => {
  switch (preset) {
    case 'fadeIn':
      return { opacity: 1, duration: 300 }
    case 'fadeOut':
      return { opacity: 0, duration: 300 }
    case 'slideInUp':
      return { translateY: 0, opacity: 1, duration: 300 }
    case 'slideInDown':
      return { translateY: 0, opacity: 1, duration: 300 }
    case 'slideInLeft':
      return { translateX: 0, opacity: 1, duration: 300 }
    case 'slideInRight':
      return { translateX: 0, opacity: 1, duration: 300 }
    case 'slideOutUp':
      return { translateY: '-100%', opacity: 0, duration: 300 }
    case 'slideOutDown':
      return { translateY: '100%', opacity: 0, duration: 300 }
    case 'slideOutLeft':
      return { translateX: '-100%', opacity: 0, duration: 300 }
    case 'slideOutRight':
      return { translateX: '100%', opacity: 0, duration: 300 }
    case 'zoomIn':
      return { scale: 1, opacity: 1, duration: 300 }
    case 'zoomOut':
      return { scale: 0, opacity: 0, duration: 300 }
    case 'bounce':
      return { translateY: [0, -20, 0], duration: 1000 }
    case 'pulse':
      return { scale: [1, 1.1, 1], duration: 1000 }
    case 'shake':
      return { translateX: [0, -10, 10, -10, 10, 0], duration: 500 }
    case 'flip':
      return { rotate: [0, 360], duration: 800 }
    default:
      return {}
  }
}

/**
 * Merge preset with custom config
 */
const mergePreset = (preset: AnimationPreset, customConfig: AnimationConfig): AnimationConfig => {
  const presetConfig = getPreset(preset)
  return { ...presetConfig, ...customConfig }
}

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
    iterations: props.loop ? 'infinite' : (baseConfig.iterations || 1)
  }
  
  return finalConfig
}

/**
 * Create keyframes from config
 */
const createKeyframes = (config: AnimationConfig) => {
  const keyframes = []
  
  // Initial state (0%)
  const initial: Record<string, any> = {}
  if (config.translateX !== undefined) initial.transform = `translateX(${config.translateX})`
  if (config.translateY !== undefined) initial.transform = `${initial.transform || ''} translateY(${config.translateY})`
  if (config.scale !== undefined) initial.transform = `${initial.transform || ''} scale(${config.scale})`
  if (config.rotate !== undefined) initial.transform = `${initial.transform || ''} rotate(${config.rotate}deg)`
  if (config.opacity !== undefined) initial.opacity = config.opacity
  keyframes.push(initial)
  
  // Final state (100%)
  const final: Record<string, any> = {}
  if (config.translateX !== undefined) final.transform = `translateX(${config.translateX})`
  if (config.translateY !== undefined) final.transform = `${final.transform || ''} translateY(${config.translateY})`
  if (config.scale !== undefined) final.transform = `${final.transform || ''} scale(${config.scale})`
  if (config.rotate !== undefined) final.transform = `${final.transform || ''} rotate(${config.rotate}deg)`
  if (config.opacity !== undefined) final.opacity = config.opacity
  keyframes.push(final)
  
  return keyframes
}

/**
 * Animate element
 */
const animate = (element: HTMLElement, config: AnimationConfig): AnimationInstance => {
  const keyframes = createKeyframes(config)
  const options: KeyframeAnimationOptions = {
    duration: config.duration || 300,
    delay: config.delay || 0,
    easing: config.easing || 'ease-out',
    iterations: config.iterations === 'infinite' ? Infinity : (config.iterations || 1),
    direction: config.direction || 'normal',
    fill: config.fill || 'both'
  }
  
  const animation = element.animate(keyframes, options)
  
  // Create animation instance
  const animationInstance: AnimationInstance = {
    play: () => animation.play(),
    pause: () => animation.pause(),
    restart: () => {
      animation.cancel()
      element.animate(keyframes, options)
    },
    reverse: () => animation.reverse(),
    cancel: () => animation.cancel(),
    finish: () => animation.finish(),
    finished: animation.finished,
    get currentTime() {
      return animation.currentTime || 0
    },
    set currentTime(value) {
      animation.currentTime = value
    },
    get playbackRate() {
      return animation.playbackRate
    },
    set playbackRate(value) {
      animation.playbackRate = value
    }
  }
  
  // Set up callbacks
  animation.onfinish = () => {
    config.onComplete?.()
    emit('complete')
  }
  
  animation.startTime = performance.now() + (config.delay || 0)
  
  return animationInstance
}

/**
 * Animate staggered elements
 */
const animateStagger = (elements: HTMLElement[], config: AnimationConfig & { stagger: number }): AnimationInstance[] => {
  return elements.map((element, index) => {
    const staggeredConfig = {
      ...config,
      delay: (config.delay || 0) + (index * config.stagger)
    }
    return animate(element, staggeredConfig)
  })
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
  
  // Emit start event
  emit('start')
  isPlaying.value = true
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
      // Small delay to ensure DOM is ready
      setTimeout(play, 0)
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
        if (!containerRef.value) return
        const rect = containerRef.value.getBoundingClientRect()
        const isInView = rect.top < window.innerHeight - (props.scrollOffset || 0)
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
      
      if (containerRef.value) {
        observer.observe(containerRef.value)
      }
      
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
  @apply will-change-transform will-change-opacity;
}
</style>