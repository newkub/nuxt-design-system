<script setup lang="ts">
interface SankeyLink {
  source: string
  target: string
  value: number
}

interface Props {
  links: SankeyLink[]
  height?: number
}

const props = withDefaults(defineProps<Props>(), {
  height: 400
})

const nodes = computed(() => {
  const nodeSet = new Set<string>()
  props.links.forEach(link => {
    nodeSet.add(link.source)
    nodeSet.add(link.target)
  })
  
  return Array.from(nodeSet).map((name, i) => ({
    name,
    x: (i % 3) * 40 + 10,
    y: Math.floor(i / 3) * 30 + 20
  }))
})

const paths = computed(() => {
  return props.links.map(link => {
    const source = nodes.value.find(n => n.name === link.source)
    const target = nodes.value.find(n => n.name === link.target)
    
    if (!source || !target) return null
    
    const midX = (source.x + target.x) / 2
    return {
      ...link,
      path: `M${source.x + 8},${source.y} C${midX},${source.y} ${midX},${target.y} ${target.x},${target.y}`,
      width: Math.sqrt(link.value) * 2
    }
  }).filter(Boolean)
})
</script>

<template>
  <div class="relative" :style="{ height: `${height}px` }">
    <svg class="w-full h-full" viewBox="0 0 100 100">
      <g v-for="(path, i) in paths" :key="i">
        <path
          :d="path.path"
          fill="none"
          stroke="#3b82f6"
          :stroke-width="path.width"
          opacity="0.3"
          class="hover:opacity-60 transition-opacity"
        >
          <title>{{ path.source }} → {{ path.target }}: {{ path.value }}</title>
        </path>
      </g>
      
      <g v-for="node in nodes" :key="node.name">
        <rect
          :x="node.x"
          :y="node.y - 2"
          width="8"
          height="4"
          fill="#3b82f6"
          rx="1"
        />
        <text :x="node.x + 4" :y="node.y - 4" text-anchor="middle" class="text-[2px] fill-gray-700 font-medium">
          {{ node.name }}
        </text>
      </g>
    </svg>
  </div>
</template>
