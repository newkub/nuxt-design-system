# useComponentMeta

Composable สำหรับจัดการ metadata ของ components ทั้งหมดให้เป็น standard เดียวกัน

## Features

- ✅ Type-safe metadata management
- ✅ Category-based organization
- ✅ Tag-based filtering
- ✅ Status tracking (stable, beta, alpha, deprecated, experimental)
- ✅ Accessibility information
- ✅ Related components linking
- ✅ Search functionality
- ✅ Statistics and analytics
- ✅ Import/Export support

## Types

### ComponentMeta

```typescript
interface ComponentMeta {
  id: string                          // Unique identifier
  name: string                        // Component name
  description: string                 // Brief description
  category: ComponentCategory         // Component category
  tags: string[]                      // Searchable tags
  version: string                     // Semantic version
  status: ComponentStatus             // Development status
  examples: ComponentExample[]        // Usage examples
  related: string[]                   // Related component IDs
  author: ComponentAuthor             // Author information
  accessibility: ComponentAccessibility // A11y information
  languages: string[]                 // Supported languages
  props?: Record<string, unknown>     // Props documentation
  events?: Record<string, unknown>    // Events documentation
  slots?: string[]                    // Available slots
  dependencies?: string[]             // External dependencies
  createdAt?: Date                    // Creation date
  updatedAt?: Date                    // Last update date
  deprecated?: {                      // Deprecation info
    reason: string
    alternative?: string
    removeVersion?: string
  }
}
```

### ComponentStatus

```typescript
type ComponentStatus = 
  | 'stable'       // Production ready
  | 'beta'         // Feature complete, testing
  | 'alpha'        // Early development
  | 'deprecated'   // No longer recommended
  | 'experimental' // Unstable, may change
```

### ComponentCategory

```typescript
type ComponentCategory = 
  | 'auth'         // Authentication components
  | 'data'         // Data display components
  | 'form'         // Form components
  | 'layout'       // Layout components
  | 'navigation'   // Navigation components
  | 'feedback'     // Feedback components
  | 'overlay'      // Modal, Dialog, Popover
  | 'media'        // Image, Video, Audio
  | 'chart'        // Chart components
  | 'developer'    // Developer tools
  | 'utility'      // Utility components
  | 'other'        // Other components
```

### ComponentAccessibility

```typescript
interface ComponentAccessibility {
  level: AccessibilityLevel           // WCAG level
  features: string[]                  // A11y features list
  keyboardNavigation: boolean         // Keyboard support
  screenReaderSupport: boolean        // Screen reader support
  ariaLabels: boolean                 // ARIA labels
  colorContrast: boolean              // Color contrast compliance
  focusManagement: boolean            // Focus management
}

type AccessibilityLevel = 
  | 'wcag-aaa'    // WCAG AAA compliant
  | 'wcag-aa'     // WCAG AA compliant
  | 'wcag-a'      // WCAG A compliant
  | 'partial'     // Partially compliant
  | 'none'        // Not compliant
```

## API

### registerComponent(meta: ComponentMeta)

ลงทะเบียน component metadata

```typescript
const { registerComponent } = useComponentMeta()

registerComponent({
  id: 'auth-login-form',
  name: 'LoginForm',
  description: 'A login form component with email and password fields',
  category: 'auth',
  tags: ['authentication', 'form', 'login'],
  version: '1.0.0',
  status: 'stable',
  examples: [
    {
      title: 'Basic Usage',
      code: '<AuthLoginForm @submit="handleLogin" />',
      language: 'vue'
    }
  ],
  related: ['auth-signup-form', 'auth-forgot-password-form'],
  author: {
    name: 'Your Name',
    email: 'your@email.com'
  },
  accessibility: {
    level: 'wcag-aa',
    features: ['Keyboard navigation', 'Screen reader support', 'ARIA labels'],
    keyboardNavigation: true,
    screenReaderSupport: true,
    ariaLabels: true,
    colorContrast: true,
    focusManagement: true
  },
  languages: ['en', 'th']
})
```

### getComponent(id: string)

ดึงข้อมูล component จาก ID

```typescript
const { getComponent } = useComponentMeta()
const meta = getComponent('auth-login-form')
```

### getComponentsByCategory(category: ComponentCategory)

ดึงข้อมูล components ตาม category

```typescript
const { getComponentsByCategory } = useComponentMeta()
const authComponents = getComponentsByCategory('auth')
```

### getComponentsByTag(tag: string)

ดึงข้อมูล components ตาม tag

```typescript
const { getComponentsByTag } = useComponentMeta()
const formComponents = getComponentsByTag('form')
```

### getComponentsByStatus(status: ComponentStatus)

ดึงข้อมูล components ตาม status

```typescript
const { getComponentsByStatus } = useComponentMeta()
const stableComponents = getComponentsByStatus('stable')
```

### searchComponents(query: string)

ค้นหา components

```typescript
const { searchComponents } = useComponentMeta()
const results = searchComponents('login')
```

### getAllComponents()

ดึงข้อมูล components ทั้งหมด

```typescript
const { getAllComponents } = useComponentMeta()
const all = getAllComponents()
```

### getRelatedComponents(id: string)

ดึงข้อมูล related components

```typescript
const { getRelatedComponents } = useComponentMeta()
const related = getRelatedComponents('auth-login-form')
```

### getComponentStats()

ดึงสถิติของ components

```typescript
const { getComponentStats } = useComponentMeta()
const stats = getComponentStats()
// {
//   total: 50,
//   byCategory: { auth: 5, data: 10, ... },
//   byStatus: { stable: 30, beta: 15, ... },
//   byAccessibilityLevel: { 'wcag-aa': 40, ... },
//   totalTags: 50,
//   totalCategories: 12
// }
```

## Example: Component Registry Page

```vue
<script setup lang="ts">
const { 
  getAllComponents,
  getComponentsByCategory,
  getAllCategories,
  searchComponents,
  getComponentStats
} = useComponentMeta()

const searchQuery = ref('')
const selectedCategory = ref<string | null>(null)

const filteredComponents = computed(() => {
  let results = searchQuery.value 
    ? searchComponents(searchQuery.value)
    : getAllComponents()
  
  if (selectedCategory.value) {
    results = results.filter(c => c.category === selectedCategory.value)
  }
  
  return results
})

const stats = computed(() => getComponentStats())
const categories = computed(() => getAllCategories())
</script>

<template>
  <div class="component-registry">
    <div class="stats">
      <div>Total: {{ stats.total }}</div>
      <div>Stable: {{ stats.byStatus.stable }}</div>
    </div>

    <input 
      v-model="searchQuery" 
      placeholder="Search components..."
    />

    <div class="categories">
      <button 
        v-for="category in categories" 
        :key="category"
        @click="selectedCategory = category"
      >
        {{ category }}
      </button>
    </div>

    <div class="components-grid">
      <div 
        v-for="component in filteredComponents" 
        :key="component.id"
        class="component-card"
      >
        <h3>{{ component.name }}</h3>
        <p>{{ component.description }}</p>
        <div class="tags">
          <span v-for="tag in component.tags" :key="tag">
            {{ tag }}
          </span>
        </div>
        <div class="meta">
          <span class="status">{{ component.status }}</span>
          <span class="version">v{{ component.version }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
```

## Example: Auto-register Components

```typescript
// plugins/component-meta-registry.ts
export default defineNuxtPlugin(() => {
  const { registerComponent } = useComponentMeta()

  // Register all auth components
  registerComponent({
    id: 'auth-login-form',
    name: 'LoginForm',
    description: 'Authentication login form',
    category: 'auth',
    tags: ['auth', 'form', 'login'],
    version: '1.0.0',
    status: 'stable',
    examples: [],
    related: ['auth-signup-form'],
    author: { name: 'Team' },
    accessibility: {
      level: 'wcag-aa',
      features: [],
      keyboardNavigation: true,
      screenReaderSupport: true,
      ariaLabels: true,
      colorContrast: true,
      focusManagement: true
    },
    languages: ['en', 'th']
  })

  // Register more components...
})
```

## Notes

- ใช้ `useState` สำหรับ state management (shared across components)
- รองรับ SSR (Server-Side Rendering)
- Type-safe ทั้งหมด
- สามารถ export/import collection สำหรับ backup หรือ migration
- รองรับการค้นหาแบบ full-text search
