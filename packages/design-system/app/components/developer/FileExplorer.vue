<script setup lang="ts">
import { ref } from 'vue'
import { useFileExplorer, type FileNode } from '~/composables/useFileExplorer'

const {
  files,
  selectedFile,
  searchQuery,
  filteredFiles,
  toggleFolder,
  selectFile,
  getFileIcon,
  formatFileSize
} = useFileExplorer()

const expandedFolders = ref<Set<string>>(new Set())

const handleToggle = (node: FileNode) => {
  if (node.type === 'folder') {
    toggleFolder(node)
    if (node.expanded) {
      expandedFolders.value.add(node.id)
    } else {
      expandedFolders.value.delete(node.id)
    }
  } else {
    selectFile(node)
  }
}

const renderTree = (nodes: FileNode[], level = 0) => {
  return nodes
}
</script>

<template>
  <div class="h-full flex flex-col bg-gray-50">
    <!-- Header -->
    <div class="p-3 border-b border-gray-200 bg-white">
      <div class="relative">
        <div class="i-mdi-magnify absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search files..."
          class="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
        />
      </div>
    </div>

    <!-- File Tree -->
    <div class="flex-1 overflow-y-auto p-2">
      <template v-for="node in filteredFiles" :key="node.id">
        <FileTreeNode
          :node="node"
          :level="0"
          :selected-id="selectedFile?.id"
          @toggle="handleToggle"
        />
      </template>
    </div>
  </div>
</template>

<script lang="ts">
// FileTreeNode component
export const FileTreeNode = {
  name: 'FileTreeNode',
  props: {
    node: { type: Object as () => FileNode, required: true },
    level: { type: Number, default: 0 },
    selectedId: String
  },
  emits: ['toggle'],
  setup(props: any, { emit }: any) {
    const getFileIcon = (fileName: string, type: string) => {
      if (type === 'folder') return props.node.expanded ? 'i-mdi-folder-open' : 'i-mdi-folder'
      
      const ext = fileName.split('.').pop()?.toLowerCase()
      const iconMap: Record<string, string> = {
        vue: 'i-mdi-vuejs',
        ts: 'i-mdi-language-typescript',
        js: 'i-mdi-language-javascript',
        json: 'i-mdi-code-json',
        md: 'i-mdi-language-markdown',
        css: 'i-mdi-language-css3',
        html: 'i-mdi-language-html5'
      }
      return iconMap[ext || ''] || 'i-mdi-file'
    }

    return { getFileIcon }
  },
  template: `
    <div>
      <div
        :style="{ paddingLeft: (level * 16 + 8) + 'px' }"
        :class="[
          'flex items-center py-1.5 px-2 cursor-pointer rounded hover:bg-gray-100 transition-colors',
          selectedId === node.id ? 'bg-blue-50 text-blue-600' : ''
        ]"
        @click="$emit('toggle', node)"
      >
        <div
          v-if="node.type === 'folder'"
          class="i-mdi-chevron-right w-4 h-4 mr-1 transition-transform"
          :class="{ 'rotate-90': node.expanded }"
        />
        <div v-else class="w-4 h-4 mr-1" />
        <div :class="[getFileIcon(node.name, node.type), 'w-4 h-4 mr-2']" />
        <span class="text-sm truncate flex-1">{{ node.name }}</span>
      </div>
      <template v-if="node.expanded && node.children">
        <FileTreeNode
          v-for="child in node.children"
          :key="child.id"
          :node="child"
          :level="level + 1"
          :selected-id="selectedId"
          @toggle="$emit('toggle', $event)"
        />
      </template>
    </div>
  `
}
</script>
