/**
 * Component Meta Registry Plugin
 * Auto-register component metadata จาก config
 */

import { defineNuxtPlugin } from '#app'
import { useComponentMeta } from '~/composables/useComponentMeta'
import { componentMetadata } from '~/config/components'

export default defineNuxtPlugin(() => {
  const { registerComponent } = useComponentMeta()
  
  // Register metadata ทั้งหมด
  componentMetadata.forEach((meta) => {
    registerComponent(meta)
  })
  
  if (process.dev) {
    console.log(`[Component Meta] Registered ${componentMetadata.length} components`)
  }
})
