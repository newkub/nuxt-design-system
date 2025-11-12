import * as FileSystem from './services/file-system.service'
import * as Watcher from './services/watcher.service'
import { generateIndexContent, generateRootIndexContent } from './utils/generator'
import { join } from 'node:path'
import { promises as fs } from 'node:fs'
import type { AutoReexportConfig } from './types/types'

async function generateExports(options: AutoReexportConfig, srcDir: string) {
  const folders = options.folders || []
  const rootIndexPath = join(srcDir, options.outputDir, 'index.ts')

  for (const folder of folders) {
    const folderPath = join(srcDir, folder)
    try {
      const files = await fs.readdir(folderPath)
      const folderIndexPath = join(srcDir, options.outputDir, `${folder}.ts`)
      const content = generateIndexContent(files.filter(f => f.endsWith('.ts')), false)
      await FileSystem.writeFile(folderIndexPath, content)
    } catch (error) {
      console.error(`Error processing folder ${folderPath}:`, error)
    }
  }

  const rootContent = generateRootIndexContent(folders)
  await FileSystem.writeFile(rootIndexPath, rootContent)

  console.log('Generated re-exports.')
}

export async function main(options: AutoReexportConfig, srcDir: string) {
  await generateExports(options, srcDir)

  if (options.watch) {
    const watchPaths = (options.folders || []).map(f => join(srcDir, f))
    Watcher.watch(watchPaths, () => generateExports(options, srcDir))
    console.log('Watching for file changes...')
  } else {
    console.log('Generation complete.')
  }
}
