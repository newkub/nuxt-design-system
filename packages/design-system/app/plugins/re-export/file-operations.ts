/**
 * File system operations
 */

import { promises as fs } from 'node:fs'
import { resolve } from 'node:path'
import type { Config } from './utils'
import { isValidFile } from './utils'

/**
 * Read files from folder
 */
export const getFiles = (config: Config) => async (folderPath: string): Promise<string[]> => {
  try {
    const items = await fs.readdir(folderPath, { withFileTypes: true })
    
    return items
      .filter(item => isValidFile(config)(item.name)(item.isFile()))
      .map(item => item.name)
  } catch (error) {
    if (config.verbose) {
      console.error(`Error reading folder ${folderPath}:`, error)
    }
    return []
  }
}

/**
 * Auto-detect folders in basePath
 */
export const detectFolders = (config: Config) => async (): Promise<string[]> => {
  const basePath = resolve(process.cwd(), config.basePath)
  
  try {
    const items = await fs.readdir(basePath, { withFileTypes: true })
    
    return items
      .filter(item => item.isDirectory())
      .map(item => item.name)
      .filter(name => !config.exclude.includes(name))
  } catch (error) {
    console.error(`Error detecting folders in ${basePath}:`, error)
    return []
  }
}

/**
 * Get folders list (from config or auto-detect)
 */
export const getFolders = (config: Config) => async (): Promise<string[]> => {
  return config.folders.length > 0
    ? config.folders
    : await detectFolders(config)()
}

/**
 * Write file to disk
 */
export const writeFile = async (path: string, content: string): Promise<void> => {
  await fs.writeFile(path, content, 'utf-8')
}
