import { ref, computed } from 'vue'

export interface FileNode {
  id: string
  name: string
  type: 'file' | 'folder'
  path: string
  expanded?: boolean
  children?: FileNode[]
  size?: number
  modified?: Date
  content?: string
}

export const useFileExplorer = () => {
  const files = ref<FileNode[]>([
    {
      id: '1',
      name: 'src',
      type: 'folder',
      path: '/src',
      expanded: false,
      children: [
        {
          id: '1-1',
          name: 'components',
          type: 'folder',
          path: '/src/components',
          children: [
            { id: '1-1-1', name: 'Button.vue', type: 'file', path: '/src/components/Button.vue', size: 1024 },
            { id: '1-1-2', name: 'Card.vue', type: 'file', path: '/src/components/Card.vue', size: 2048 }
          ]
        },
        {
          id: '1-2',
          name: 'pages',
          type: 'folder',
          path: '/src/pages',
          children: [
            { id: '1-2-1', name: 'index.vue', type: 'file', path: '/src/pages/index.vue', size: 3072 }
          ]
        }
      ]
    },
    {
      id: '2',
      name: 'public',
      type: 'folder',
      path: '/public',
      children: []
    },
    {
      id: '3',
      name: 'package.json',
      type: 'file',
      path: '/package.json',
      size: 512
    }
  ])

  const selectedFile = ref<FileNode | null>(null)
  const searchQuery = ref('')

  const toggleFolder = (folder: FileNode) => {
    folder.expanded = !folder.expanded
  }

  const selectFile = (file: FileNode) => {
    selectedFile.value = file
  }

  const filteredFiles = computed(() => {
    if (!searchQuery.value) return files.value

    const search = (nodes: FileNode[]): FileNode[] => {
      return nodes.filter(node => {
        if (node.name.toLowerCase().includes(searchQuery.value.toLowerCase())) {
          return true
        }
        if (node.children) {
          const filteredChildren = search(node.children)
          if (filteredChildren.length > 0) {
            return true
          }
        }
        return false
      })
    }

    return search(files.value)
  })

  const getFileIcon = (fileName: string, type: string) => {
    if (type === 'folder') return 'i-mdi-folder'
    
    const ext = fileName.split('.').pop()?.toLowerCase()
    const iconMap: Record<string, string> = {
      vue: 'i-mdi-vuejs',
      ts: 'i-mdi-language-typescript',
      js: 'i-mdi-language-javascript',
      json: 'i-mdi-code-json',
      md: 'i-mdi-language-markdown',
      css: 'i-mdi-language-css3',
      html: 'i-mdi-language-html5',
      png: 'i-mdi-file-image',
      jpg: 'i-mdi-file-image',
      svg: 'i-mdi-svg'
    }

    return iconMap[ext || ''] || 'i-mdi-file'
  }

  const formatFileSize = (bytes?: number) => {
    if (!bytes) return '-'
    if (bytes < 1024) return `${bytes} B`
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
  }

  return {
    files,
    selectedFile,
    searchQuery,
    filteredFiles,
    toggleFolder,
    selectFile,
    getFileIcon,
    formatFileSize
  }
}
