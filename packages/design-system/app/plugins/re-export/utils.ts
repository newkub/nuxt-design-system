/**
 * Pure utility functions
 */

import { basename, extname } from 'node:path'
import type { AutoReexportConfig } from './types'
import { defaultConfig } from './types'

export type Config = Required<AutoReexportConfig>

/**
 * Merge config with defaults
 */
export const createConfig = (config: Partial<AutoReexportConfig> = {}): Config =>
  ({ ...defaultConfig, ...config }) as Config

/**
 * Extract component name from filename
 */
export const getComponentName = (filename: string): string =>
  basename(filename, extname(filename))

/**
 * Sort files if needed
 */
export const sortFiles = (config: Config) => (files: string[]): string[] =>
  config.sortAlphabetically
    ? [...files].sort((a, b) => a.localeCompare(b))
    : files

/**
 * Log verbose message
 */
export const logVerbose = (config: Config) => (message: string): void => {
  if (config.verbose) {
    console.log(message)
  }
}

/**
 * Check if file should be included
 */
export const isValidFile = (config: Config) => (name: string) => (isFile: boolean): boolean => {
  if (!isFile) return false
  if (name === config.outputFileName) return false
  
  const ext = extname(name)
  return config.extensions.includes(ext)
}
