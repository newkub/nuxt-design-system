/**
 * Root index generation
 */

import { join, relative, resolve } from 'node:path'
import type { Config } from './utils'
import { sortFiles, logVerbose, getComponentName } from './utils'
import { getFiles, writeFile } from './file-operations'

/**
 * Generate exports for a folder in root index
 */
export const generateFolderExports = (config: Config) => (relativePath: string) => async (folder: string): Promise<string[]> => {
  const folderPath = resolve(process.cwd(), config.basePath, folder)
  const files = await getFiles(config)(folderPath)
  
  if (files.length === 0) return []

  const sortedFiles = sortFiles(config)(files)
  const exports: string[] = [
    `// ${folder} components`,
    ...sortedFiles.map(file => {
      const componentName = getComponentName(file)
      return `export { default as ${componentName} } from './${relativePath}/${folder}/${file}'`
    }),
    '' // Empty line
  ]
  
  return exports
}

/**
 * Generate root index.ts that re-exports from all folders
 */
export const generateRootIndex = (config: Config) => async (folders: string[]): Promise<void> => {
  if (!config.generateRootIndex) return

  const rootPath = resolve(process.cwd(), config.rootIndexPath || 'app')
  const basePath = resolve(process.cwd(), config.basePath)
  const relativePath = relative(rootPath, basePath)
  const sortedFolders = sortFiles(config)(folders)

  // Generate exports for all folders
  const folderExportArrays = await Promise.all(
    sortedFolders.map(generateFolderExports(config)(relativePath))
  )
  
  const allExports = folderExportArrays.flat()
  
  // Generate content
  const header = config.addHeader 
    ? `/**\n * Auto-generated root re-exports\n * Do not edit manually - this file is auto-generated\n */\n\n`
    : ''
  const content = header + allExports.join('\n')
  const outputPath = join(rootPath, config.outputFileName)
  
  await writeFile(outputPath, content)
  
  const exportCount = allExports.filter(e => e.startsWith('export')).length
  logVerbose(config)(`✅ Generated root ${outputPath} (${exportCount} component exports)`)
}
