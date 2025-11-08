export type ComponentStatus = 
  | 'stable' 
  | 'beta' 
  | 'alpha' 
  | 'deprecated' 
  | 'experimental'

export type ComponentCategory = 
  | 'base'
  | 'auth'
  | 'data'
  | 'form'
  | 'layout'
  | 'navigation'
  | 'feedback'
  | 'overlay'
  | 'media'
  | 'chart'
  | 'developer'
  | 'utility'
  | 'other'

/**
 * Component Example (simplified)
 */
export interface ComponentExample {
  readonly title: string
  readonly code: string
}

/**
 * Component Prop Definition
 */
export interface ComponentProp {
  readonly type: string
  readonly required: boolean
  readonly default?: unknown
  readonly description?: string
}

/**
 * Component Meta - Type-Safe and Minimal
 * เฉพาะข้อมูลที่จำเป็นจริงๆ
 */
export interface ComponentMeta {
  // Identification
  readonly id: string
  readonly name: string
  readonly description: string
  readonly category: ComponentCategory
  readonly status: ComponentStatus
  
  // Organization
  readonly tags: readonly string[]
  readonly related: readonly string[]
  
  // Documentation (optional)
  readonly examples?: readonly ComponentExample[]
  readonly props?: Readonly<Record<string, ComponentProp>>
  readonly events?: Readonly<Record<string, string>>
  readonly slots?: readonly string[]
}

/**
 * Component Meta Collection
 */
export interface ComponentMetaCollection {
  readonly components: Map<string, ComponentMeta>
  readonly categories: Map<ComponentCategory, string[]>
  readonly tags: Map<string, string[]>
}
