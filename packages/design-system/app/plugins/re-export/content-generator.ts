/**
 * Content generation functions
 */

import type { Config } from './utils'
import { getComponentName } from './utils'

/**
 * Generate header comment
 */
export const generateHeader = (config: Config) => (folderName: string): string => {
  if (!config.addHeader) return ''
  
  return config.headerText || 
    `/**\n * Auto-generated re-exports for ${folderName}\n * Do not edit manually - this file is auto-generated\n */\n\n`
}

/**
 * Generate export statement for a file
 */
export const generateExport = (config: Config) => (filename: string): string => {
  const componentName = getComponentName(filename)
  
  return config.exportStyle === 'named'
    ? `export * from './${filename}'`
    : `export { default as ${componentName} } from './${filename}'`
}

/**
 * Generate content for index file
 */
export const generateIndexContent = (config: Config) => (folderName: string) => (files: string[]): string => {
  const header = generateHeader(config)(folderName)
  const exports = files.map(generateExport(config))
  
  return `${header + exports.join('\n')}\n`
}
