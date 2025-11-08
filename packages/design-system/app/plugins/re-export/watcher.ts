/**
 * Watch mode functionality
 */

import { relative, resolve } from 'node:path'
import type { Config } from './utils'
import { logVerbose } from './utils'
import { getFolders } from './file-operations'
import { generateForFolder } from './folder-generator'

/**
 * Create watch paths from folders
 */
export const createWatchPaths = (config: Config) => (folders: string[]): string[] =>
  folders.map(folder => 
    resolve(process.cwd(), config.basePath, folder, `**/*{${config.extensions.join(',')}}`)
  )

/**
 * Create file change handler
 */
export const createChangeHandler = (config: Config) => async (path: string): Promise<void> => {
  const folderPath = path.substring(0, path.lastIndexOf('/'))
  
  logVerbose(config)(`\n📝 File changed: ${relative(process.cwd(), path)}`)
  await generateForFolder(config)(folderPath)
}

/**
 * Watch mode
 */
export const watch = (config: Config) => async (): Promise<void> => {
  const chokidar = await import('chokidar')
  const folders = await getFolders(config)()
  const watchPaths = createWatchPaths(config)(folders)

  console.log(`\n👀 Watching ${folders.length} folders for changes...\n`)

  const watcher = chokidar.watch(watchPaths, {
    ignored: [
      '**/node_modules/**',
      '**/.nuxt/**',
      '**/index.ts'
    ],
    ignoreInitial: false,
    persistent: true
  })

  const handleChange = createChangeHandler(config)

  watcher
    .on('add', handleChange)
    .on('change', handleChange)
    .on('unlink', handleChange)
}
