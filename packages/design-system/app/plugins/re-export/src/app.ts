import { Effect, pipe } from 'effect'
import * as FileSystem from './services/file-system.service'
import * as Watcher from './services/watcher.service'
import { generateIndexContent, generateRootIndexContent } from './utils/generator'
import { join } from 'node:path'
import { promises as fs } from 'node:fs'
import type { AutoReexportConfig } from './types/types'

const readDir = (path: string) => Effect.tryPromise(() => fs.readdir(path))

const generateExports = (options: AutoReexportConfig, srcDir: string) =>
  Effect.gen(function* (_) {
    const folders = options.folders || []
    const rootIndexPath = join(srcDir, options.outputDir, 'index.ts')

    for (const folder of folders) {
      const folderPath = join(srcDir, folder)
      const files = yield* _(readDir(folderPath))
      const folderIndexPath = join(srcDir, options.outputDir, `${folder}.ts`)
      const content = generateIndexContent(files.filter(f => f.endsWith('.ts')), false)
      yield* _(FileSystem.writeFile(folderIndexPath, content))
    }

    const rootContent = generateRootIndexContent(folders)
    yield* _(FileSystem.writeFile(rootIndexPath, rootContent))

    console.log('Generated re-exports.')
  })

export const main = (options: AutoReexportConfig, srcDir: string) =>
  pipe(
    generateExports(options, srcDir),
    Effect.flatMap(() => {
      if (options.watch) {
        const watchPaths = (options.folders || []).map(f => join(srcDir, f))
        return Watcher.watch(watchPaths)
      } else {
        return Effect.succeed('Generation complete.')
      }
    })
  )
