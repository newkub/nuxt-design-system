/**
 * Re-export Generator - Main Entry Point
 * Refactored into modular structure
 */

import type { AutoReexportConfig } from './types'
import { createConfig } from './utils'
import { getFolders } from './file-operations'
import { generateForFolder } from './folder-generator'
import { generateAll } from './folder-generator'
import { generateRootIndex } from './root-generator'
import { watch } from './watcher'

// ==================== Public API ====================

/**
 * Create reexport generator with config
 * Returns API functions bound to config
 * 
 * @example
 * ```ts
 * const generator = createReexportGenerator({
 *   basePath: 'app/components',
 *   folders: ['base', 'auth']
 * })
 * 
 * await generator.generateAll()
 * ```
 */
export const createReexportGenerator = (userConfig: Partial<AutoReexportConfig> = {}) => {
  const config = createConfig(userConfig)
  
  return {
    generateForFolder: generateForFolder(config),
    generateAll: generateAll(config),
    generateRootIndex: async () => {
      const folders = await getFolders(config)()
      return generateRootIndex(config)(folders)
    },
    watch: watch(config),
    config
  }
}

/**
 * Backward compatibility - Class-based interface
 * 
 * @deprecated Use createReexportGenerator() instead
 * @example
 * ```ts
 * const generator = new ReexportGenerator({
 *   basePath: 'app/components'
 * })
 * await generator.generateAll()
 * ```
 */
export class ReexportGenerator {
  private api: ReturnType<typeof createReexportGenerator>

  constructor(config: Partial<AutoReexportConfig> = {}) {
    this.api = createReexportGenerator(config)
  }

  async generateForFolder(folderPath: string): Promise<void> {
    return this.api.generateForFolder(folderPath)
  }

  async generateAll(): Promise<void> {
    return this.api.generateAll()
  }

  async generateRootIndex(): Promise<void> {
    return this.api.generateRootIndex()
  }

  async watch(): Promise<void> {
    return this.api.watch()
  }
}
