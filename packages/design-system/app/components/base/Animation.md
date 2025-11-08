# Animation Component

Powerful animation component ที่หลากหลายกว่า anime.js พร้อม type-safe และ options ครบถ้วน

## Features

✅ **30+ Presets** - Animation สำเร็จรูป  
✅ **Type-safe** - TypeScript support ครบถ้วน  
✅ **Web Animations API** - Native performance  
✅ **Flexible Triggers** - mount, hover, click, scroll, intersection  
✅ **Stagger Support** - Animate children with delay  
✅ **Timeline** - Chain animations  
✅ **30+ Easing Functions** - Smooth animations  
✅ **Callbacks** - onStart, onComplete, onUpdate  
✅ **Control Methods** - play, pause, restart  

## การใช้งาน

### 1. Preset Animations (ง่ายที่สุด)

```vue
<template>
  <!-- Fade In Up -->
  <BaseAnimation preset="fadeInUp">
    <div>Content</div>
  </BaseAnimation>

  <!-- Bounce In -->
  <BaseAnimation preset="bounceIn" :duration="1000">
    <div>Content</div>
  </BaseAnimation>

  <!-- Shake (Attention) -->
  <BaseAnimation preset="shake" loop>
    <button>Click me!</button>
  </BaseAnimation>
</template>
```

### 2. Custom Animation

```vue
<template>
  <BaseAnimation
    :config="{
      from: { opacity: 0, transform: { translateY: 50, scale: 0.8 } },
      to: { opacity: 1, transform: { translateY: 0, scale: 1 } },
      duration: 600,
      easing: 'easeOutCubic'
    }"
  >
    <div>Custom Animation</div>
  </BaseAnimation>
</template>
```

### 3. Keyframes Animation

```vue
<template>
  <BaseAnimation
    :config="{
      keyframes: [
        { offset: 0, opacity: 0, transform: { scale: 0 } },
        { offset: 0.5, opacity: 1, transform: { scale: 1.2 } },
        { offset: 1, opacity: 1, transform: { scale: 1 } }
      ],
      duration: 800
    }"
  >
    <div>Keyframe Animation</div>
  </BaseAnimation>
</template>
```

### 4. Stagger Animation

```vue
<template>
  <BaseAnimation preset="fadeInUp" :stagger="100">
    <div>Item 1</div>
    <div>Item 2</div>
    <div>Item 3</div>
  </BaseAnimation>
</template>
```

### 5. Trigger Options

```vue
<template>
  <!-- On Mount (default) -->
  <BaseAnimation preset="fadeIn">
    <div>Animates on mount</div>
  </BaseAnimation>

  <!-- On Hover -->
  <BaseAnimation preset="pulse" trigger="hover">
    <button>Hover me</button>
  </BaseAnimation>

  <!-- On Click -->
  <BaseAnimation preset="shake" trigger="click">
    <button>Click me</button>
  </BaseAnimation>

  <!-- On Scroll -->
  <BaseAnimation preset="fadeInUp" trigger="scroll">
    <div>Animates when scrolled into view</div>
  </BaseAnimation>

  <!-- On Intersection -->
  <BaseAnimation preset="zoomIn" trigger="intersection">
    <div>Animates when visible</div>
  </BaseAnimation>

  <!-- Manual Control -->
  <BaseAnimation ref="animRef" preset="bounceIn" trigger="manual">
    <div>Controlled manually</div>
  </BaseAnimation>
</template>

<script setup>
const animRef = ref()

const playAnimation = () => {
  animRef.value?.play()
}
</script>
```

## Available Presets (30+)

### Fade
- `fadeIn`, `fadeOut`
- `fadeInUp`, `fadeInDown`, `fadeInLeft`, `fadeInRight`

### Slide
- `slideInUp`, `slideInDown`, `slideInLeft`, `slideInRight`
- `slideOutUp`, `slideOutDown`, `slideOutLeft`, `slideOutRight`

### Zoom
- `zoomIn`, `zoomOut`

### Bounce
- `bounceIn`, `bounceOut`

### Rotate
- `rotateIn`, `rotateOut`

### Flip
- `flipIn`, `flipOut`

### Attention Seekers
- `shake`, `pulse`, `wobble`, `swing`
- `rubberBand`, `jello`, `heartBeat`

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `preset` | `AnimationPreset` | - | ใช้ preset animation |
| `config` | `AnimationConfig` | - | Custom animation config |
| `duration` | `number` | `400` | Duration (ms) |
| `delay` | `number` | `0` | Delay (ms) |
| `easing` | `EasingFunction` | `'easeOut'` | Easing function |
| `autoplay` | `boolean` | `true` | Auto play |
| `loop` | `boolean` | `false` | Loop animation |
| `trigger` | `string` | `'mount'` | Trigger type |
| `stagger` | `number` | - | Stagger delay (ms) |

## Easing Functions (30+)

### Basic
- `linear`, `easeIn`, `easeOut`, `easeInOut`

### Quad
- `easeInQuad`, `easeOutQuad`, `easeInOutQuad`

### Cubic
- `easeInCubic`, `easeOutCubic`, `easeInOutCubic`

### Quart, Quint, Sine, Expo, Circ, Back, Elastic, Bounce
- และอีกมากมาย...

### Custom
- `cubic-bezier(x1, y1, x2, y2)`

## Transform Properties

```typescript
{
  // Translate
  x, y, z
  translateX, translateY, translateZ
  
  // Scale
  scale, scaleX, scaleY, scaleZ
  
  // Rotate
  rotate, rotateX, rotateY, rotateZ
  
  // Skew
  skew, skewX, skewY
}
```

## Advanced Examples

### Complex Animation

```vue
<BaseAnimation
  :config="{
    keyframes: [
      { 
        offset: 0, 
        opacity: 0,
        transform: { translateY: 50, scale: 0.8, rotate: -10 }
      },
      { 
        offset: 0.6, 
        opacity: 1,
        transform: { translateY: -10, scale: 1.05, rotate: 5 }
      },
      { 
        offset: 1, 
        opacity: 1,
        transform: { translateY: 0, scale: 1, rotate: 0 }
      }
    ],
    duration: 1000,
    easing: 'easeOutCubic'
  }"
>
  <div>Complex Animation</div>
</BaseAnimation>
```

### With Callbacks

```vue
<BaseAnimation
  :config="{
    ...fadeInConfig,
    onStart: () => console.log('Started'),
    onUpdate: (progress) => console.log(`Progress: ${progress}`),
    onComplete: () => console.log('Completed')
  }"
>
  <div>With Callbacks</div>
</BaseAnimation>
```

### Programmatic Control

```vue
<script setup>
const animRef = ref()

const play = () => animRef.value?.play()
const pause = () => animRef.value?.pause()
const restart = () => animRef.value?.restart()
</script>

<template>
  <div>
    <BaseAnimation ref="animRef" preset="pulse" trigger="manual">
      <div>Controlled Animation</div>
    </BaseAnimation>
    
    <button @click="play">Play</button>
    <button @click="pause">Pause</button>
    <button @click="restart">Restart</button>
  </div>
</template>
```

## useAnimation Composable

```typescript
import { useAnimation } from '~/composables/useAnimation'

const { animate, animateStagger } = useAnimation()

// Animate single element
const instance = animate(element, {
  from: { opacity: 0 },
  to: { opacity: 1 },
  duration: 400
})

// Animate multiple with stagger
const instances = animateStagger(elements, {
  from: { opacity: 0, transform: { translateY: 20 } },
  to: { opacity: 1, transform: { translateY: 0 } },
  stagger: 100
})

// Control
instance.play()
instance.pause()
instance.restart()
```

## เปรียบเทียบกับ anime.js

| Feature | Animation.vue | anime.js |
|---------|--------------|----------|
| Type-safe | ✅ | ❌ |
| Presets | ✅ 30+ | ❌ |
| Native API | ✅ Web Animations | ❌ Custom |
| Bundle Size | ✅ Small | ⚠️ Large |
| Triggers | ✅ 6 types | ❌ Manual only |
| Stagger | ✅ | ✅ |
| Timeline | ✅ | ✅ |
| Easing | ✅ 30+ | ✅ Many |
| Performance | ✅ Native | ✅ Good |

## Performance Tips

💡 **Use will-change** - ใช้อัตโนมัติ  
💡 **Use transform** - GPU accelerated  
💡 **Avoid layout properties** - width, height  
💡 **Use Intersection Observer** - สำหรับ scroll animations  

---

**Animation Component ที่ powerful และใช้งานง่าย! 🎬**
