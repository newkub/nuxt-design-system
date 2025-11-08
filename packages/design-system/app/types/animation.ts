/**
 * Animation Types
 * Type-safe animation system
 */

// Easing Types
export type EasingFunction = 
  | 'linear'
  | 'easeIn' | 'easeOut' | 'easeInOut'
  | 'easeInQuad' | 'easeOutQuad' | 'easeInOutQuad'
  | 'easeInCubic' | 'easeOutCubic' | 'easeInOutCubic'
  | 'easeInQuart' | 'easeOutQuart' | 'easeInOutQuart'
  | 'easeInQuint' | 'easeOutQuint' | 'easeInOutQuint'
  | 'easeInSine' | 'easeOutSine' | 'easeInOutSine'
  | 'easeInExpo' | 'easeOutExpo' | 'easeInOutExpo'
  | 'easeInCirc' | 'easeOutCirc' | 'easeInOutCirc'
  | 'easeInBack' | 'easeOutBack' | 'easeInOutBack'
  | 'easeInElastic' | 'easeOutElastic' | 'easeInOutElastic'
  | 'easeInBounce' | 'easeOutBounce' | 'easeInOutBounce'
  | 'spring'
  | `cubic-bezier(${string})`

// Direction
export type AnimationDirection = 'normal' | 'reverse' | 'alternate' | 'alternate-reverse'

// Fill Mode
export type AnimationFillMode = 'none' | 'forwards' | 'backwards' | 'both'

// Play State
export type AnimationPlayState = 'idle' | 'running' | 'paused' | 'finished'

// Transform Properties
export interface TransformProperties {
  x?: number | string
  y?: number | string
  z?: number | string
  translateX?: number | string
  translateY?: number | string
  translateZ?: number | string
  scale?: number
  scaleX?: number
  scaleY?: number
  scaleZ?: number
  rotate?: number | string
  rotateX?: number | string
  rotateY?: number | string
  rotateZ?: number | string
  skew?: number | string
  skewX?: number | string
  skewY?: number | string
}

// Keyframe
export interface AnimationKeyframe {
  offset?: number // 0-1
  opacity?: number
  transform?: TransformProperties
  backgroundColor?: string
  color?: string
  width?: string | number
  height?: string | number
  [key: string]: any
}

// Animation Config
export interface AnimationConfig {
  // Basic
  duration?: number // ms
  delay?: number // ms
  easing?: EasingFunction
  iterations?: number | 'infinite'
  direction?: AnimationDirection
  fillMode?: AnimationFillMode
  
  // Properties to animate
  from?: AnimationKeyframe
  to?: AnimationKeyframe
  keyframes?: AnimationKeyframe[]
  
  // Advanced
  autoplay?: boolean
  loop?: boolean
  alternate?: boolean
  yoyo?: boolean
  
  // Stagger
  stagger?: number | {
    each?: number
    from?: 'start' | 'center' | 'end' | number
    grid?: [number, number]
    axis?: 'x' | 'y'
  }
  
  // Spring Physics
  spring?: {
    stiffness?: number
    damping?: number
    mass?: number
  }
  
  // Triggers
  trigger?: {
    scroll?: boolean
    scrollOffset?: number
    intersection?: boolean
    intersectionThreshold?: number
    hover?: boolean
    click?: boolean
  }
  
  // Callbacks
  onStart?: () => void
  onUpdate?: (progress: number) => void
  onComplete?: () => void
  onRepeat?: () => void
  onReverse?: () => void
}

// Timeline Item
export interface TimelineItem {
  selector?: string
  config: AnimationConfig
  offset?: number | string
}

// Timeline Config
export interface TimelineConfig {
  items: TimelineItem[]
  autoplay?: boolean
  loop?: boolean
  onComplete?: () => void
}

// Animation Instance
export interface AnimationInstance {
  play: () => void
  pause: () => void
  reverse: () => void
  restart: () => void
  seek: (progress: number) => void
  cancel: () => void
  finish: () => void
  getProgress: () => number
  getState: () => AnimationPlayState
  getDuration: () => number
}

// Preset Names
export type AnimationPreset = 
  | 'fadeIn' | 'fadeOut' | 'fadeInUp' | 'fadeInDown' | 'fadeInLeft' | 'fadeInRight'
  | 'slideInUp' | 'slideInDown' | 'slideInLeft' | 'slideInRight'
  | 'slideOutUp' | 'slideOutDown' | 'slideOutLeft' | 'slideOutRight'
  | 'zoomIn' | 'zoomOut'
  | 'bounceIn' | 'bounceOut'
  | 'rotateIn' | 'rotateOut'
  | 'flipIn' | 'flipOut'
  | 'shake' | 'pulse' | 'wobble' | 'swing'
  | 'rubberBand' | 'jello' | 'heartBeat'
