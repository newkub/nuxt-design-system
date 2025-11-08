/**
 * Component Metadata Registry
 * Auto-import และ register metadata ทั้งหมด
 */

// Base Components
import buttonMeta from './base/button.meta'

// Export metadata array
export const componentMetadata = [
  buttonMeta,
  // เพิ่ม component metadata อื่นๆ ที่นี่
] as const

// Re-export individual metadata
export { buttonMeta }
