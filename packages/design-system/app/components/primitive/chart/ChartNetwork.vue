<script setup lang="ts">
interface Node {
  id: string
  label: string
  x?: number
  y?: number
}

interface Link {
  source: string
  target: string
}

interface Props {
  nodes: Node[]
  links: Link[]
  size?: number
}

const props = withDefaults(defineProps<Props>(), {
  size: 400
})

const positionedNodes = computed(() => {
  return props.nodes.map((node, i) => {
    const angle = (i / props.nodes.length) * 2 * Math.PI
    const radius = 35
    return {
      ...node,
      x: node.x || 50 + radius * Math.cos(angle),
      y: node.y || 50 + radius * Math.sin(angle)
    }
  })
})

const linkPaths = computed(() => {
  return props.links.map(link => {
    const source = positionedNodes.value.find(n => n.id === link.source)
    const target = positionedNodes.value.find(n => n.id === link.target)
    return { source, target }
  }).filter(l => l.source && l.target)
})
</script>

<template>
  <div class="relative" :style="{ width: `${size}px`, height: `${size}px` }">
    <svg class="w-full h-full" viewBox="0 0 100 100">
      <g v-for="(link, i) in linkPaths" :key="i">
        <line
          :x1="link.source!.x"
          :y1="link.source!.y"
          :x2="link.target!.x"
          :y2="link.target!.y"
          stroke="#cbd5e1"
          stroke-width="0.3"
        />
      </g>
      
      <g v-for="node in positionedNodes" :key="node.id">
        <circle
          :cx="node.x"
          :cy="node.y"
          r="3"
          fill="#3b82f6"
          class="hover:r-4 transition-all cursor-pointer"
        >
          <title>{{ node.label }}</title>
        </circle>
        <text :x="node.x" :y="node.y - 5" text-anchor="middle" class="text-[2.5px] fill-gray-700 font-medium">
          {{ node.label }}
        </text>
      </g>
    </svg>
  </div>
</template>
