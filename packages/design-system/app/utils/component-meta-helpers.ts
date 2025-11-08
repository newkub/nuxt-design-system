import type { 
  ComponentMeta, 
  ComponentStatus,
  AccessibilityLevel 
} from '~/types/component-meta'

export const createComponentMeta = (
  partial: Omit<ComponentMeta, 'createdAt' | 'updatedAt'> & {
    createdAt?: Date
    updatedAt?: Date
  }
): ComponentMeta => {
  return {
    ...partial,
    createdAt: partial.createdAt || new Date(),
    updatedAt: partial.updatedAt || new Date()
  }
}

export const updateComponentMeta = (
  existing: ComponentMeta,
  updates: Partial<ComponentMeta>
): ComponentMeta => {
  return {
    ...existing,
    ...updates,
    updatedAt: new Date()
  }
}

export const deprecateComponent = (
  meta: ComponentMeta,
  reason: string,
  alternative?: string,
  removeVersion?: string
): ComponentMeta => {
  return {
    ...meta,
    status: 'deprecated',
    deprecated: {
      reason,
      alternative,
      removeVersion
    },
    updatedAt: new Date()
  }
}

export const getStatusColor = (status: ComponentStatus): string => {
  const colors: Record<ComponentStatus, string> = {
    stable: 'green',
    beta: 'blue',
    alpha: 'yellow',
    deprecated: 'red',
    experimental: 'purple'
  }
  return colors[status]
}

export const getStatusIcon = (status: ComponentStatus): string => {
  const icons: Record<ComponentStatus, string> = {
    stable: '✓',
    beta: 'β',
    alpha: 'α',
    deprecated: '⚠',
    experimental: '🧪'
  }
  return icons[status]
}

export const getAccessibilityBadge = (level: AccessibilityLevel): string => {
  const badges: Record<AccessibilityLevel, string> = {
    'wcag-aaa': 'AAA',
    'wcag-aa': 'AA',
    'wcag-a': 'A',
    'partial': 'Partial',
    'none': 'None'
  }
  return badges[level]
}

export const getAccessibilityColor = (level: AccessibilityLevel): string => {
  const colors: Record<AccessibilityLevel, string> = {
    'wcag-aaa': 'green',
    'wcag-aa': 'green',
    'wcag-a': 'yellow',
    'partial': 'orange',
    'none': 'red'
  }
  return colors[level]
}

export const formatVersion = (version: string): string => {
  return version.startsWith('v') ? version : `v${version}`
}

export const isStable = (meta: ComponentMeta): boolean => {
  return meta.status === 'stable'
}

export const isDeprecated = (meta: ComponentMeta): boolean => {
  return meta.status === 'deprecated'
}

export const isExperimental = (meta: ComponentMeta): boolean => {
  return meta.status === 'experimental' || meta.status === 'alpha'
}

export const shouldShowWarning = (meta: ComponentMeta): boolean => {
  return isDeprecated(meta) || isExperimental(meta)
}

export const getWarningMessage = (meta: ComponentMeta): string | null => {
  if (isDeprecated(meta)) {
    const alt = meta.deprecated?.alternative 
      ? ` Use ${meta.deprecated.alternative} instead.` 
      : ''
    return `⚠️ This component is deprecated. ${meta.deprecated?.reason || ''}${alt}`
  }
  
  if (isExperimental(meta)) {
    return '🧪 This component is experimental and may change in future releases.'
  }
  
  return null
}

export const sortComponentsByName = (components: ComponentMeta[]): ComponentMeta[] => {
  return [...components].sort((a, b) => a.name.localeCompare(b.name))
}

export const sortComponentsByStatus = (components: ComponentMeta[]): ComponentMeta[] => {
  const statusOrder: Record<ComponentStatus, number> = {
    stable: 1,
    beta: 2,
    alpha: 3,
    experimental: 4,
    deprecated: 5
  }
  
  return [...components].sort((a, b) => {
    return statusOrder[a.status] - statusOrder[b.status]
  })
}

export const sortComponentsByVersion = (components: ComponentMeta[]): ComponentMeta[] => {
  return [...components].sort((a, b) => {
    const versionA = a.version.split('.').map(Number)
    const versionB = b.version.split('.').map(Number)
    
    for (let i = 0; i < 3; i++) {
      if (versionA[i] !== versionB[i]) {
        return (versionB[i] || 0) - (versionA[i] || 0)
      }
    }
    return 0
  })
}

export const filterByAccessibility = (
  components: ComponentMeta[],
  minLevel: AccessibilityLevel
): ComponentMeta[] => {
  const levelOrder: Record<AccessibilityLevel, number> = {
    'wcag-aaa': 4,
    'wcag-aa': 3,
    'wcag-a': 2,
    'partial': 1,
    'none': 0
  }
  
  const minLevelValue = levelOrder[minLevel]
  
  return components.filter(meta => {
    return levelOrder[meta.accessibility.level] >= minLevelValue
  })
}

export const groupByCategory = (components: ComponentMeta[]): Record<string, ComponentMeta[]> => {
  return components.reduce((acc, meta) => {
    if (!acc[meta.category]) {
      acc[meta.category] = []
    }
    acc[meta.category].push(meta)
    return acc
  }, {} as Record<string, ComponentMeta[]>)
}

export const groupByStatus = (components: ComponentMeta[]): Record<ComponentStatus, ComponentMeta[]> => {
  return components.reduce((acc, meta) => {
    if (!acc[meta.status]) {
      acc[meta.status] = []
    }
    acc[meta.status].push(meta)
    return acc
  }, {} as Record<ComponentStatus, ComponentMeta[]>)
}

export const getComponentDependencyGraph = (
  components: ComponentMeta[]
): Map<string, Set<string>> => {
  const graph = new Map<string, Set<string>>()
  
  components.forEach(meta => {
    if (!graph.has(meta.id)) {
      graph.set(meta.id, new Set())
    }
    
    meta.related.forEach(relatedId => {
      if (!graph.has(relatedId)) {
        graph.set(relatedId, new Set())
      }
      graph.get(meta.id)?.add(relatedId)
    })
  })
  
  return graph
}

export const exportToJSON = (components: ComponentMeta[]): string => {
  return JSON.stringify(components, null, 2)
}

export const importFromJSON = (json: string): ComponentMeta[] => {
  return JSON.parse(json)
}

export const validateComponentMeta = (meta: Partial<ComponentMeta>): string[] => {
  const errors: string[] = []
  
  if (!meta.id) errors.push('id is required')
  if (!meta.name) errors.push('name is required')
  if (!meta.description) errors.push('description is required')
  if (!meta.category) errors.push('category is required')
  if (!meta.version) errors.push('version is required')
  if (!meta.status) errors.push('status is required')
  if (!meta.author) errors.push('author is required')
  if (!meta.accessibility) errors.push('accessibility is required')
  
  if (meta.version && !/^\d+\.\d+\.\d+$/.test(meta.version)) {
    errors.push('version must be in semver format (x.y.z)')
  }
  
  return errors
}
