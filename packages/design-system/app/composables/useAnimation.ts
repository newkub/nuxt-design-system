import type {
  AnimationConfig,
  AnimationInstance,
  AnimationKeyframe,
  TransformProperties,
  AnimationPlayState,
  EasingFunction
} from '~/types/animation'

/**
 * Easing Functions
 */
const easingFunctions: Record<string, string> = {
  linear: 'linear',
  easeIn: 'cubic-bezier(0.42, 0, 1, 1)',
  easeOut: 'cubic-bezier(0, 0, 0.58, 1)',
  easeInOut: 'cubic-bezier(0.42, 0, 0.58, 1)',
  easeInQuad: 'cubic-bezier(0.55, 0.085, 0.68, 0.53)',
  easeOutQuad: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
  easeInOutQuad: 'cubic-bezier(0.455, 0.03, 0.515, 0.955)',
  easeInCubic: 'cubic-bezier(0.55, 0.055, 0.675, 0.19)',
  easeOutCubic: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
  easeInOutCubic: 'cubic-bezier(0.645, 0.045, 0.355, 1)',
  easeInQuart: 'cubic-bezier(0.895, 0.03, 0.685, 0.22)',
  easeOutQuart: 'cubic-bezier(0.165, 0.84, 0.44, 1)',
  easeInOutQuart: 'cubic-bezier(0.77, 0, 0.175, 1)',
  easeInQuint: 'cubic-bezier(0.755, 0.05, 0.855, 0.06)',
  easeOutQuint: 'cubic-bezier(0.23, 1, 0.32, 1)',
  easeInOutQuint: 'cubic-bezier(0.86, 0, 0.07, 1)',
  easeInSine: 'cubic-bezier(0.47, 0, 0.745, 0.715)',
  easeOutSine: 'cubic-bezier(0.39, 0.575, 0.565, 1)',
  easeInOutSine: 'cubic-bezier(0.445, 0.05, 0.55, 0.95)',
  easeInExpo: 'cubic-bezier(0.95, 0.05, 0.795, 0.035)',
  easeOutExpo: 'cubic-bezier(0.19, 1, 0.22, 1)',
  easeInOutExpo: 'cubic-bezier(1, 0, 0, 1)',
  easeInCirc: 'cubic-bezier(0.6, 0.04, 0.98, 0.335)',
  easeOutCirc: 'cubic-bezier(0.075, 0.82, 0.165, 1)',
  easeInOutCirc: 'cubic-bezier(0.785, 0.135, 0.15, 0.86)',
  easeInBack: 'cubic-bezier(0.6, -0.28, 0.735, 0.045)',
  easeOutBack: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  easeInOutBack: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  easeInElastic: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  easeOutElastic: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  easeInOutElastic: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  easeInBounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  easeOutBounce: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
  easeInOutBounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  spring: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)'
}

/**
 * Get easing function
 */
const getEasing = (easing: EasingFunction = 'easeOut'): string => {
  if (easing.startsWith('cubic-bezier')) return easing
  return easingFunctions[easing] || easingFunctions.easeOut
}

/**
 * Transform properties to CSS string
 */
const transformToString = (transform: TransformProperties): string => {
  const parts: string[] = []

  // Translate
  if (transform.x !== undefined || transform.translateX !== undefined) {
    const val = transform.x ?? transform.translateX
    parts.push(`translateX(${typeof val === 'number' ? `${val}px` : val})`)
  }
  if (transform.y !== undefined || transform.translateY !== undefined) {
    const val = transform.y ?? transform.translateY
    parts.push(`translateY(${typeof val === 'number' ? `${val}px` : val})`)
  }
  if (transform.z !== undefined || transform.translateZ !== undefined) {
    const val = transform.z ?? transform.translateZ
    parts.push(`translateZ(${typeof val === 'number' ? `${val}px` : val})`)
  }

  // Scale
  if (transform.scale !== undefined) {
    parts.push(`scale(${transform.scale})`)
  }
  if (transform.scaleX !== undefined) {
    parts.push(`scaleX(${transform.scaleX})`)
  }
  if (transform.scaleY !== undefined) {
    parts.push(`scaleY(${transform.scaleY})`)
  }
  if (transform.scaleZ !== undefined) {
    parts.push(`scaleZ(${transform.scaleZ})`)
  }

  // Rotate
  if (transform.rotate !== undefined) {
    const val = transform.rotate
    parts.push(`rotate(${typeof val === 'number' ? `${val}deg` : val})`)
  }
  if (transform.rotateX !== undefined) {
    const val = transform.rotateX
    parts.push(`rotateX(${typeof val === 'number' ? `${val}deg` : val})`)
  }
  if (transform.rotateY !== undefined) {
    const val = transform.rotateY
    parts.push(`rotateY(${typeof val === 'number' ? `${val}deg` : val})`)
  }
  if (transform.rotateZ !== undefined) {
    const val = transform.rotateZ
    parts.push(`rotateZ(${typeof val === 'number' ? `${val}deg` : val})`)
  }

  // Skew
  if (transform.skew !== undefined) {
    const val = transform.skew
    parts.push(`skew(${typeof val === 'number' ? `${val}deg` : val})`)
  }
  if (transform.skewX !== undefined) {
    const val = transform.skewX
    parts.push(`skewX(${typeof val === 'number' ? `${val}deg` : val})`)
  }
  if (transform.skewY !== undefined) {
    const val = transform.skewY
    parts.push(`skewY(${typeof val === 'number' ? `${val}deg` : val})`)
  }

  return parts.join(' ')
}

/**
 * Convert config to Web Animations API keyframes
 */
const configToKeyframes = (config: AnimationConfig): Keyframe[] => {
  if (config.keyframes) {
    return config.keyframes.map(kf => {
      const frame: any = {}
      
      if (kf.offset !== undefined) frame.offset = kf.offset
      if (kf.opacity !== undefined) frame.opacity = kf.opacity
      if (kf.transform) frame.transform = transformToString(kf.transform)
      if (kf.backgroundColor) frame.backgroundColor = kf.backgroundColor
      if (kf.color) frame.color = kf.color
      if (kf.width) frame.width = typeof kf.width === 'number' ? `${kf.width}px` : kf.width
      if (kf.height) frame.height = typeof kf.height === 'number' ? `${kf.height}px` : kf.height
      
      // Copy other properties
      Object.keys(kf).forEach(key => {
        if (!['offset', 'opacity', 'transform', 'backgroundColor', 'color', 'width', 'height'].includes(key)) {
          frame[key] = kf[key]
        }
      })
      
      return frame
    })
  }

  const frames: Keyframe[] = []
  
  if (config.from) {
    const fromFrame: any = {}
    if (config.from.opacity !== undefined) fromFrame.opacity = config.from.opacity
    if (config.from.transform) fromFrame.transform = transformToString(config.from.transform)
    if (config.from.backgroundColor) fromFrame.backgroundColor = config.from.backgroundColor
    if (config.from.color) fromFrame.color = config.from.color
    frames.push(fromFrame)
  }
  
  if (config.to) {
    const toFrame: any = {}
    if (config.to.opacity !== undefined) toFrame.opacity = config.to.opacity
    if (config.to.transform) toFrame.transform = transformToString(config.to.transform)
    if (config.to.backgroundColor) toFrame.backgroundColor = config.to.backgroundColor
    if (config.to.color) toFrame.color = config.to.color
    frames.push(toFrame)
  }
  
  return frames
}

/**
 * useAnimation Composable
 */
export const useAnimation = () => {
  /**
   * Animate element
   */
  const animate = (
    element: HTMLElement | null,
    config: AnimationConfig
  ): AnimationInstance | null => {
    if (!element || !import.meta.client) return null

    const keyframes = configToKeyframes(config)
    const options: KeyframeAnimationOptions = {
      duration: config.duration || 400,
      delay: config.delay || 0,
      easing: getEasing(config.easing),
      iterations: config.iterations === 'infinite' ? Infinity : (config.iterations || 1),
      direction: config.direction || 'normal',
      fill: config.fillMode || 'both'
    }

    const animation = element.animate(keyframes, options)

    if (!config.autoplay) {
      animation.pause()
    }

    // Callbacks
    if (config.onStart) {
      config.onStart()
    }

    if (config.onUpdate) {
      animation.onfinish = () => config.onUpdate?.(1)
    }

    if (config.onComplete) {
      animation.onfinish = config.onComplete
    }

    // Create instance
    const instance: AnimationInstance = {
      play: () => animation.play(),
      pause: () => animation.pause(),
      reverse: () => animation.reverse(),
      restart: () => {
        animation.cancel()
        animation.play()
      },
      seek: (progress: number) => {
        animation.currentTime = animation.effect?.getTiming().duration as number * progress
      },
      cancel: () => animation.cancel(),
      finish: () => animation.finish(),
      getProgress: () => {
        const duration = animation.effect?.getTiming().duration as number
        return (animation.currentTime as number) / duration
      },
      getState: () => {
        if (animation.playState === 'running') return 'running'
        if (animation.playState === 'paused') return 'paused'
        if (animation.playState === 'finished') return 'finished'
        return 'idle'
      },
      getDuration: () => animation.effect?.getTiming().duration as number
    }

    return instance
  }

  /**
   * Animate multiple elements with stagger
   */
  const animateStagger = (
    elements: HTMLElement[],
    config: AnimationConfig
  ): AnimationInstance[] => {
    const instances: AnimationInstance[] = []
    
    const staggerDelay = typeof config.stagger === 'number'
      ? config.stagger
      : config.stagger?.each || 50

    elements.forEach((el, index) => {
      const elementConfig = {
        ...config,
        delay: (config.delay || 0) + (staggerDelay * index)
      }
      
      const instance = animate(el, elementConfig)
      if (instance) instances.push(instance)
    })

    return instances
  }

  /**
   * Create timeline
   */
  const createTimeline = (items: Array<{
    element: HTMLElement
    config: AnimationConfig
    offset?: number
  }>) => {
    const instances: AnimationInstance[] = []
    
    items.forEach((item, index) => {
      const instance = animate(item.element, item.config)
      if (instance) instances.push(instance)
    })

    return {
      play: () => {
        for (const i of instances) i.play()
      },
      pause: () => {
        for (const i of instances) i.pause()
      },
      restart: () => {
        for (const i of instances) i.restart()
      },
      instances
    }
  }

  return {
    animate,
    animateStagger,
    createTimeline
  }
}
