import type { AnimationConfig, AnimationPreset } from '~/types/animation'

/**
 * Animation Presets
 * Ready-to-use animation configurations
 */

export const animationPresets: Record<AnimationPreset, AnimationConfig> = {
  // Fade Animations
  fadeIn: {
    from: { opacity: 0 },
    to: { opacity: 1 },
    duration: 400,
    easing: 'easeOut'
  },
  
  fadeOut: {
    from: { opacity: 1 },
    to: { opacity: 0 },
    duration: 300,
    easing: 'easeIn'
  },
  
  fadeInUp: {
    from: { opacity: 0, transform: { translateY: 20 } },
    to: { opacity: 1, transform: { translateY: 0 } },
    duration: 500,
    easing: 'easeOut'
  },
  
  fadeInDown: {
    from: { opacity: 0, transform: { translateY: -20 } },
    to: { opacity: 1, transform: { translateY: 0 } },
    duration: 500,
    easing: 'easeOut'
  },
  
  fadeInLeft: {
    from: { opacity: 0, transform: { translateX: -20 } },
    to: { opacity: 1, transform: { translateX: 0 } },
    duration: 500,
    easing: 'easeOut'
  },
  
  fadeInRight: {
    from: { opacity: 0, transform: { translateX: 20 } },
    to: { opacity: 1, transform: { translateX: 0 } },
    duration: 500,
    easing: 'easeOut'
  },
  
  // Slide Animations
  slideInUp: {
    from: { transform: { translateY: '100%' } },
    to: { transform: { translateY: 0 } },
    duration: 400,
    easing: 'easeOut'
  },
  
  slideInDown: {
    from: { transform: { translateY: '-100%' } },
    to: { transform: { translateY: 0 } },
    duration: 400,
    easing: 'easeOut'
  },
  
  slideInLeft: {
    from: { transform: { translateX: '-100%' } },
    to: { transform: { translateX: 0 } },
    duration: 400,
    easing: 'easeOut'
  },
  
  slideInRight: {
    from: { transform: { translateX: '100%' } },
    to: { transform: { translateX: 0 } },
    duration: 400,
    easing: 'easeOut'
  },
  
  slideOutUp: {
    from: { transform: { translateY: 0 } },
    to: { transform: { translateY: '-100%' } },
    duration: 300,
    easing: 'easeIn'
  },
  
  slideOutDown: {
    from: { transform: { translateY: 0 } },
    to: { transform: { translateY: '100%' } },
    duration: 300,
    easing: 'easeIn'
  },
  
  slideOutLeft: {
    from: { transform: { translateX: 0 } },
    to: { transform: { translateX: '-100%' } },
    duration: 300,
    easing: 'easeIn'
  },
  
  slideOutRight: {
    from: { transform: { translateX: 0 } },
    to: { transform: { translateX: '100%' } },
    duration: 300,
    easing: 'easeIn'
  },
  
  // Zoom Animations
  zoomIn: {
    from: { opacity: 0, transform: { scale: 0.3 } },
    to: { opacity: 1, transform: { scale: 1 } },
    duration: 400,
    easing: 'easeOut'
  },
  
  zoomOut: {
    from: { opacity: 1, transform: { scale: 1 } },
    to: { opacity: 0, transform: { scale: 0.3 } },
    duration: 300,
    easing: 'easeIn'
  },
  
  // Bounce Animations
  bounceIn: {
    keyframes: [
      { offset: 0, opacity: 0, transform: { scale: 0.3 } },
      { offset: 0.5, opacity: 1, transform: { scale: 1.05 } },
      { offset: 0.7, transform: { scale: 0.9 } },
      { offset: 1, opacity: 1, transform: { scale: 1 } }
    ],
    duration: 750,
    easing: 'easeOut'
  },
  
  bounceOut: {
    keyframes: [
      { offset: 0, transform: { scale: 1 } },
      { offset: 0.3, transform: { scale: 1.05 } },
      { offset: 1, opacity: 0, transform: { scale: 0.3 } }
    ],
    duration: 500,
    easing: 'easeIn'
  },
  
  // Rotate Animations
  rotateIn: {
    from: { opacity: 0, transform: { rotate: '-200deg' } },
    to: { opacity: 1, transform: { rotate: '0deg' } },
    duration: 600,
    easing: 'easeOut'
  },
  
  rotateOut: {
    from: { opacity: 1, transform: { rotate: '0deg' } },
    to: { opacity: 0, transform: { rotate: '200deg' } },
    duration: 600,
    easing: 'easeIn'
  },
  
  // Flip Animations
  flipIn: {
    from: { opacity: 0, transform: { rotateY: '90deg' } },
    to: { opacity: 1, transform: { rotateY: '0deg' } },
    duration: 600,
    easing: 'easeOut'
  },
  
  flipOut: {
    from: { opacity: 1, transform: { rotateY: '0deg' } },
    to: { opacity: 0, transform: { rotateY: '90deg' } },
    duration: 600,
    easing: 'easeIn'
  },
  
  // Attention Seekers
  shake: {
    keyframes: [
      { offset: 0, transform: { translateX: 0 } },
      { offset: 0.1, transform: { translateX: '-10px' } },
      { offset: 0.2, transform: { translateX: '10px' } },
      { offset: 0.3, transform: { translateX: '-10px' } },
      { offset: 0.4, transform: { translateX: '10px' } },
      { offset: 0.5, transform: { translateX: '-10px' } },
      { offset: 0.6, transform: { translateX: '10px' } },
      { offset: 0.7, transform: { translateX: '-10px' } },
      { offset: 0.8, transform: { translateX: '10px' } },
      { offset: 0.9, transform: { translateX: '-10px' } },
      { offset: 1, transform: { translateX: 0 } }
    ],
    duration: 820
  },
  
  pulse: {
    keyframes: [
      { offset: 0, transform: { scale: 1 } },
      { offset: 0.5, transform: { scale: 1.05 } },
      { offset: 1, transform: { scale: 1 } }
    ],
    duration: 1000,
    easing: 'easeInOut'
  },
  
  wobble: {
    keyframes: [
      { offset: 0, transform: { translateX: 0, rotate: '0deg' } },
      { offset: 0.15, transform: { translateX: '-25%', rotate: '-5deg' } },
      { offset: 0.3, transform: { translateX: '20%', rotate: '3deg' } },
      { offset: 0.45, transform: { translateX: '-15%', rotate: '-3deg' } },
      { offset: 0.6, transform: { translateX: '10%', rotate: '2deg' } },
      { offset: 0.75, transform: { translateX: '-5%', rotate: '-1deg' } },
      { offset: 1, transform: { translateX: 0, rotate: '0deg' } }
    ],
    duration: 1000
  },
  
  swing: {
    keyframes: [
      { offset: 0, transform: { rotate: '0deg' } },
      { offset: 0.2, transform: { rotate: '15deg' } },
      { offset: 0.4, transform: { rotate: '-10deg' } },
      { offset: 0.6, transform: { rotate: '5deg' } },
      { offset: 0.8, transform: { rotate: '-5deg' } },
      { offset: 1, transform: { rotate: '0deg' } }
    ],
    duration: 1000
  },
  
  rubberBand: {
    keyframes: [
      { offset: 0, transform: { scaleX: 1, scaleY: 1 } },
      { offset: 0.3, transform: { scaleX: 1.25, scaleY: 0.75 } },
      { offset: 0.4, transform: { scaleX: 0.75, scaleY: 1.25 } },
      { offset: 0.5, transform: { scaleX: 1.15, scaleY: 0.85 } },
      { offset: 0.65, transform: { scaleX: 0.95, scaleY: 1.05 } },
      { offset: 0.75, transform: { scaleX: 1.05, scaleY: 0.95 } },
      { offset: 1, transform: { scaleX: 1, scaleY: 1 } }
    ],
    duration: 1000
  },
  
  jello: {
    keyframes: [
      { offset: 0, transform: { skewX: '0deg', skewY: '0deg' } },
      { offset: 0.111, transform: { skewX: '0deg', skewY: '0deg' } },
      { offset: 0.222, transform: { skewX: '-12.5deg', skewY: '-12.5deg' } },
      { offset: 0.333, transform: { skewX: '6.25deg', skewY: '6.25deg' } },
      { offset: 0.444, transform: { skewX: '-3.125deg', skewY: '-3.125deg' } },
      { offset: 0.555, transform: { skewX: '1.5625deg', skewY: '1.5625deg' } },
      { offset: 0.666, transform: { skewX: '-0.78125deg', skewY: '-0.78125deg' } },
      { offset: 0.777, transform: { skewX: '0.390625deg', skewY: '0.390625deg' } },
      { offset: 0.888, transform: { skewX: '-0.1953125deg', skewY: '-0.1953125deg' } },
      { offset: 1, transform: { skewX: '0deg', skewY: '0deg' } }
    ],
    duration: 1000
  },
  
  heartBeat: {
    keyframes: [
      { offset: 0, transform: { scale: 1 } },
      { offset: 0.14, transform: { scale: 1.3 } },
      { offset: 0.28, transform: { scale: 1 } },
      { offset: 0.42, transform: { scale: 1.3 } },
      { offset: 0.70, transform: { scale: 1 } }
    ],
    duration: 1300,
    easing: 'easeInOut'
  }
}

/**
 * Get preset by name
 */
export const getPreset = (name: AnimationPreset): AnimationConfig => {
  return { ...animationPresets[name] }
}

/**
 * Merge preset with custom config
 */
export const mergePreset = (
  preset: AnimationPreset,
  custom: Partial<AnimationConfig>
): AnimationConfig => {
  return {
    ...animationPresets[preset],
    ...custom
  }
}
