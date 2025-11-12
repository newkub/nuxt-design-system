/**
 * Auto Re-export Configuration
 */
export interface AutoReexportConfig {
  /**
   * Base path สำหรับ components
   * @default 'app/components'
   */
  basePath?: string

  /**
   * Folders ที่ต้องการ auto-generate
   * ถ้าไม่ระบุ จะ scan ทุก folders ใน basePath
   */
  folders?: string[]

  /**
   * Folders ที่ต้องการข้าม (ignore)
   */
  exclude?: string[]

  /**
   * File extensions ที่ต้องการ export
   * @default ['.vue', '.ts', '.tsx']
   */
  extensions?: string[]

  /**
   * ชื่อไฟล์ output
   * @default 'index.ts'
   */
  outputFileName?: string

  /**
   * Export style
   * - 'default': export { default as ComponentName }
   * - 'named': export * from './Component.vue'
   * @default 'default'
   */
  exportStyle?: 'default' | 'named'

  /**
   * เพิ่ม header comment
   */
  addHeader?: boolean

  /**
   * Custom header text
   */
  headerText?: string

  /**
   * Sort exports alphabetically
   * @default true
   */
  sortAlphabetically?: boolean

  /**
   * Watch mode (dev only)
   * @default true
   */
  watch?: boolean

  /**
   * Verbose logging
   * @default false
   */
  verbose?: boolean

  /**
   * สร้าง root index.ts ที่ re-export จาก folders ทั้งหมด
   * @default false
   */
  generateRootIndex?: boolean

  /**
   * Path สำหรับ root index.ts
   * @default 'app'
   */
  rootIndexPath?: string
}

export const defaultConfig: Required<AutoReexportConfig> = {
  addHeader: true,
  basePath: 'app/components',
  exclude: ['node_modules', '.nuxt', 'dist'],
  exportStyle: 'default',
  extensions: ['.vue', '.ts', '.tsx'],
  folders: [],
  generateRootIndex: true,
  headerText: '',
  outputFileName: 'index.ts',
  rootIndexPath: 'app',
  sortAlphabetically: true,
  verbose: false,
  watch: true,
}
