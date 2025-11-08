import type { Plugin, ViteDevServer } from 'vite'
import type { AutoReexportConfig } from './types'
import { ReexportGenerator } from './generator'

/**
 * Vite Plugin สำหรับ Auto Re-export Components
 * 
 * รองรับ Vite Hooks:
 * - buildStart: Generate re-exports ตอน build
 * - buildEnd: แสดงสถานะเสร็จสิ้น
 * - configureServer: Watch mode ใน dev
 * - handleHotUpdate: Hot reload ตอนไฟล์เปลี่ยน
 * 
 * @example
 * ```ts
 * // nuxt.config.ts
 * import { autoReexport } from './app/plugins/re-export'
 * 
 * export default defineNuxtConfig({
 *   vite: {
 *     plugins: [
 *       autoReexport({
 *         basePath: 'app/components',
 *         folders: ['auth', 'base', 'form'],
 *         generateRootIndex: true,
 *         verbose: true
 *       })
 *     ]
 *   }
 * })
 * ```
 */
export function autoReexport(config: Partial<AutoReexportConfig> = {}): Plugin {
  const generator = new ReexportGenerator(config)
  let isFirstBuild = true
  let startTime = 0
  const verbose = config.verbose !== false

  return {
    name: 'vite-plugin-auto-reexport',
    
    // Hook: buildStart - เรียกตอนเริ่ม build
    async buildStart() {
      if (isFirstBuild) {
        startTime = Date.now()
        console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
        console.log('🔄 Auto Re-export: Generating component exports...')
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n')
        
        await generator.generateAll()
        
        const duration = Date.now() - startTime
        console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
        console.log(`✅ Auto Re-export: Complete (${duration}ms)`)
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n')
        
        isFirstBuild = false
      }
    },

    // Hook: buildEnd - เรียกตอนจบ build
    buildEnd() {
      if (verbose) {
        console.log('📦 Auto Re-export: Build phase complete')
      }
    },

    // Hook: configureServer - เรียกตอน dev server start
    configureServer(server: ViteDevServer) {
      if (config.watch !== false) {
        console.log('\n👀 Auto Re-export: Watch mode enabled')
        console.log('   Changes to component files will trigger re-generation\n')
        
        generator.watch()
        
        // Log when server is ready
        server.httpServer?.once('listening', () => {
          if (verbose) {
            console.log('🚀 Auto Re-export: Dev server ready')
          }
        })
      }
    },

    // Hook: handleHotUpdate - เรียกตอนไฟล์เปลี่ยนใน HMR
    handleHotUpdate({ file, server }) {
      // ถ้าเป็นไฟล์ component ให้แจ้งเตือน
      if (file.includes('/components/') && !file.includes('/node_modules/')) {
        if (verbose) {
          console.log(`\n🔄 Auto Re-export: Detected change in ${file}`)
        }
      }
    }
  }
}

export { ReexportGenerator } from './generator'
export type { AutoReexportConfig } from './types'
export { defaultConfig } from './types'
