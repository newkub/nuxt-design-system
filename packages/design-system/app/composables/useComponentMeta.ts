import { readonly } from 'vue'
import type { 
  ComponentMeta, 
  ComponentMetaCollection,
  ComponentCategory,
  ComponentStatus,
  ComponentExample,
  ComponentProp
} from '~/types/component-meta'

// Re-export types สำหรับใช้งานง่าย
export type {
  ComponentMeta,
  ComponentMetaCollection,
  ComponentCategory,
  ComponentStatus,
  ComponentExample,
  ComponentProp
} from '~/types/component-meta'

// ComponentStats interface (defined inline)
export interface ComponentStats {
  total: number
  byCategory: Record<ComponentCategory, number>
  byStatus: Record<ComponentStatus, number>
  totalTags: number
  totalCategories: number
}

// Nuxt auto-imports
declare const useState: typeof import('#app')['useState']

/**
 * Helper function สำหรับสร้าง ComponentMeta แบบ type-safe
 * ไม่ต้อง import type ComponentMeta แยก
 * 
 * @example
 * ```ts
 * const meta = defineComponentMeta({
 *   id: 'base-button',
 *   name: 'Button',
 *   description: 'A button component',
 *   category: 'base',
 *   status: 'stable',
 *   tags: ['button'] as const,
 *   related: [] as const
 * })
 * ```
 */
export function defineComponentMeta(meta: ComponentMeta): ComponentMeta {
  return meta
}

/**
 * Component Meta Store
 * Type-safe composable สำหรับจัดการ component metadata
 */
export const useComponentMeta = () => {
  // State - ใช้ Map เพื่อ performance ที่ดี
  const components = useState<Map<string, ComponentMeta>>('component-meta-store', () => new Map())
  const categories = useState<Map<ComponentCategory, string[]>>('component-categories', () => new Map())
  const tags = useState<Map<string, string[]>>('component-tags', () => new Map())

  const registerComponent = (meta: ComponentMeta) => {
    components.value.set(meta.id, meta)
    
    if (!categories.value.has(meta.category)) {
      categories.value.set(meta.category, [])
    }
    if (!categories.value.get(meta.category)?.includes(meta.id)) {
      categories.value.get(meta.category)?.push(meta.id)
    }
    
    meta.tags.forEach((tag: string) => {
      if (!tags.value.has(tag)) {
        tags.value.set(tag, [])
      }
      if (!tags.value.get(tag)?.includes(meta.id)) {
        tags.value.get(tag)?.push(meta.id)
      }
    })
  }

  const unregisterComponent = (id: string) => {
    const meta = components.value.get(id)
    if (!meta) return
    
    components.value.delete(id)
    
    const categoryComponents = categories.value.get(meta.category)
    if (categoryComponents) {
      const index = categoryComponents.indexOf(id)
      if (index > -1) {
        categoryComponents.splice(index, 1)
      }
    }
    
    meta.tags.forEach((tag: string) => {
      const tagComponents = tags.value.get(tag)
      if (tagComponents) {
        const index = tagComponents.indexOf(id)
        if (index > -1) {
          tagComponents.splice(index, 1)
        }
      }
    })
  }

  const getComponent = (id: string): ComponentMeta | undefined => {
    return components.value.get(id)
  }

  const getComponentsByCategory = (category: ComponentCategory): ComponentMeta[] => {
    const componentIds = categories.value.get(category) || []
    return componentIds
      .map(id => components.value.get(id))
      .filter((meta): meta is ComponentMeta => meta !== undefined)
  }

  const getComponentsByTag = (tag: string): ComponentMeta[] => {
    const componentIds = tags.value.get(tag) || []
    return componentIds
      .map(id => components.value.get(id))
      .filter((meta): meta is ComponentMeta => meta !== undefined)
  }

  const getComponentsByStatus = (status: ComponentStatus): ComponentMeta[] => {
    return Array.from(components.value.values())
      .filter(meta => meta.status === status)
  }

  const searchComponents = (query: string): ComponentMeta[] => {
    const lowerQuery = query.toLowerCase()
    return Array.from(components.value.values()).filter((meta: ComponentMeta) => 
      meta.name.toLowerCase().includes(lowerQuery) ||
      meta.description.toLowerCase().includes(lowerQuery) ||
      meta.tags.some((tag: string) => tag.toLowerCase().includes(lowerQuery))
    )
  }

  const getAllComponents = (): ComponentMeta[] => {
    return Array.from(components.value.values())
  }

  const getAllCategories = (): ComponentCategory[] => {
    return Array.from(categories.value.keys())
  }

  const getAllTags = (): string[] => {
    return Array.from(tags.value.keys())
  }

  const getRelatedComponents = (id: string): ComponentMeta[] => {
    const meta = components.value.get(id)
    if (!meta) return []
    
    return meta.related
      .map((relatedId: string) => components.value.get(relatedId))
      .filter((meta): meta is ComponentMeta => meta !== undefined)
  }

  const getComponentStats = (): ComponentStats => {
    const allComponents = Array.from(components.value.values())
    
    // Count by category
    const byCategory = {} as Record<ComponentCategory, number>
    for (const [category, componentIds] of categories.value.entries()) {
      byCategory[category] = componentIds.length
    }
    
    // Count by status
    const byStatus = {} as Record<ComponentStatus, number>
    for (const meta of allComponents) {
      byStatus[meta.status] = (byStatus[meta.status] || 0) + 1
    }
    
    return {
      total: allComponents.length,
      byCategory,
      byStatus,
      totalTags: tags.value.size,
      totalCategories: categories.value.size
    }
  }

  const exportCollection = (): ComponentMetaCollection => {
    return {
      components: new Map(components.value),
      categories: new Map(categories.value),
      tags: new Map(tags.value)
    }
  }

  const importCollection = (collection: ComponentMetaCollection) => {
    components.value = new Map(collection.components)
    categories.value = new Map(collection.categories)
    tags.value = new Map(collection.tags)
  }

  const clearAll = () => {
    components.value.clear()
    categories.value.clear()
    tags.value.clear()
  }

  return {
    components: readonly(components),
    categories: readonly(categories),
    tags: readonly(tags),
    registerComponent,
    unregisterComponent,
    getComponent,
    getComponentsByCategory,
    getComponentsByTag,
    getComponentsByStatus,
    searchComponents,
    getAllComponents,
    getAllCategories,
    getAllTags,
    getRelatedComponents,
    getComponentStats,
    exportCollection,
    importCollection,
    clearAll
  }
}
