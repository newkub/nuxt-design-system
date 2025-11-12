import { Effect } from 'effect'
import { readdirSync, statSync, existsSync } from 'node:fs'
import { join, relative } from 'node:path'

export const scanDirectory = (dir: string): Effect.Effect<string[], Error> =>
  Effect.try({
    try: () => {
      const results: string[] = []
      const scan = (currentDir: string) => {
        if (!existsSync(currentDir)) return
        const files = readdirSync(currentDir)
        for (const file of files) {
          const fullPath = join(currentDir, file)
          const stat = statSync(fullPath)
          if (stat.isDirectory()) {
            scan(fullPath)
          } else {
            results.push(relative(dir, fullPath))
          }
        }
      }
      scan(dir)
      return results
    },
    catch: (unknown) => new Error(`Failed to scan directory: ${unknown}`),
  })

export const filterFiles = (paths: string[], extension: string) =>
  Effect.succeed(paths.filter((p) => p.endsWith(extension)))
