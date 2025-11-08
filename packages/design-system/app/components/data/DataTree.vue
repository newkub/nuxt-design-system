<script setup lang="ts">
interface TreeNode {
  id: string
  label: string
  children?: TreeNode[]
  icon?: string
  data?: any
}

interface Props {
  data: TreeNode[]
  expandAll?: boolean
  showIcons?: boolean
  selectable?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  expandAll: false,
  showIcons: true,
  selectable: false
})

const emit = defineEmits<{
  nodeClick: [node: TreeNode]
  nodeSelect: [node: TreeNode]
}>()

const expandedNodes = ref<Set<string>>(new Set())
const selectedNode = ref<string | null>(null)

if (props.expandAll) {
  const expandAll = (nodes: TreeNode[]) => {
    nodes.forEach(node => {
      expandedNodes.value.add(node.id)
      if (node.children) expandAll(node.children)
    })
  }
  expandAll(props.data)
}

const toggleNode = (nodeId: string) => {
  if (expandedNodes.value.has(nodeId)) {
    expandedNodes.value.delete(nodeId)
  } else {
    expandedNodes.value.add(nodeId)
  }
}

const selectNode = (node: TreeNode) => {
  selectedNode.value = node.id
  emit('nodeSelect', node)
}
</script>

<template>
  <div class="data-tree">
    <TreeNodeComponent
      v-for="node in data"
      :key="node.id"
      :node="node"
      :level="0"
      :expanded="expandedNodes.has(node.id)"
      :selected="selectedNode === node.id"
      :show-icons="showIcons"
      :selectable="selectable"
      @toggle="toggleNode"
      @select="selectNode"
      @click="emit('nodeClick', node)"
    />
  </div>
</template>

<script lang="ts">
export const TreeNodeComponent = {
  name: 'TreeNodeComponent',
  props: {
    node: { type: Object as () => TreeNode, required: true },
    level: { type: Number, default: 0 },
    expanded: Boolean,
    selected: Boolean,
    showIcons: Boolean,
    selectable: Boolean
  },
  emits: ['toggle', 'select', 'click'],
  template: `
    <div>
      <div
        :class="[
          'tree-node',
          selected && 'selected'
        ]"
        :style="{ paddingLeft: (level * 20 + 8) + 'px' }"
        @click="$emit('click')"
      >
        <button
          v-if="node.children && node.children.length > 0"
          @click.stop="$emit('toggle', node.id)"
          class="toggle-btn"
        >
          <div :class="[expanded ? 'i-mdi-chevron-down' : 'i-mdi-chevron-right', 'w-4 h-4']" />
        </button>
        <div v-else class="w-4" />
        
        <div v-if="showIcons && node.icon" :class="[node.icon, 'w-4 h-4 mr-2 text-gray-500']" />
        
        <input
          v-if="selectable"
          type="checkbox"
          :checked="selected"
          @click.stop
          @change="$emit('select', node)"
          class="mr-2"
        />
        
        <span class="node-label">{{ node.label }}</span>
      </div>
      
      <div v-if="expanded && node.children" class="children">
        <TreeNodeComponent
          v-for="child in node.children"
          :key="child.id"
          :node="child"
          :level="level + 1"
          :expanded="expanded"
          :selected="selected"
          :show-icons="showIcons"
          :selectable="selectable"
          @toggle="$emit('toggle', $event)"
          @select="$emit('select', $event)"
          @click="$emit('click')"
        />
      </div>
    </div>
  `
}
</script>

<style scoped>
.data-tree {
  @apply bg-white rounded-lg border border-gray-200 p-2;
}

.tree-node {
  @apply flex items-center py-2 px-2 rounded cursor-pointer hover:bg-gray-50 transition-colors;
}

.tree-node.selected {
  @apply bg-blue-50 text-blue-700;
}

.toggle-btn {
  @apply p-0 hover:bg-gray-200 rounded mr-1;
}

.node-label {
  @apply text-sm text-gray-900;
}
</style>
