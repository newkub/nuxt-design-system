/**
 * Folder-level generation
 */

import { basename, join, resolve } from 'node:path'
import type { Config } from './utils'
import { sortFiles, logVerbose } from './utils'
import { getFiles, writeFile } from './file-operations'
import { generateIndexContent } from './content-generator'

/**
 * Generate index.ts for a folder
 */
export const generateForFolder = (config: Config) => async (folderPath: string): Promise<void> => {
  const files = await getFiles(config)(folderPath)
  
  if (files.length === 0) {
    logVerbose(config)(`⚠️  No files found in ${folderPath}`)
    return
  }

  const sortedFiles = sortFiles(config)(files)
  const folderName = basename(folderPath)
  const content = generateIndexContent(config)(folderName)(sortedFiles)
  const outputPath = join(folderPath, config.outputFileName)
  
  await writeFile(outputPath, content)
  logVerbose(config)(`✅ Generated ${outputPath} (${sortedFiles.length} exports)`)
}

/**
 * Generate for a single folder with error handling
 */
export const generateFolderSafe = (config: Config) => async (folder: string): Promise<void> => {
  const folderPath = resolve(process.cwd(), config.basePath, folder)
  
  try {
    await generateForFolder(config)(folderPath)
  } catch (error) {
    console.error(`❌ Error generating for ${folder}:`, error)
  }
}

/**
 * Generate for all folders
 */
export const generateAll = (config: Config) => async (): Promise<void> => {
  const { getFolders } = await import('./file-operations')
  const { generateRootIndex } = await import('./root-generator')
  
  const folders = await getFolders(config)()

  console.log(`\n🔄 Generating re-exports for ${folders.length} folders...\n`)

  // Generate for each folder
  await Promise.all(folders.map(generateFolderSafe(config)))

  // Generate root index
  if (config.generateRootIndex) {
    try {
      await generateRootIndex(config)(folders)
      console.log(`\n✨ Done! Generated re-exports for ${folders.length} folders + root index\n`)
    } catch (error) {
      console.error(`❌ Error generating root index:`, error)
    }
  } else {
    console.log(`\n✨ Done! Generated re-exports for ${folders.length} folders\n`)
  }
}
