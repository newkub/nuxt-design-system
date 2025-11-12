import { Effect } from 'effect'
import { promises as fs } from 'node:fs'
import { dirname } from 'node:path'

export const readFile = (path: string) =>
  Effect.tryPromise({
    try: () => fs.readFile(path, 'utf-8'),
    catch: (e) => new Error(`Failed to read file: ${path}`, { cause: e }),
  })

export const writeFile = (path: string, content: string) =>
  Effect.tryPromise({
    try: async () => {
      await fs.mkdir(dirname(path), { recursive: true })
      return await fs.writeFile(path, content, 'utf-8')
    },
    catch: (e) => new Error(`Failed to write file: ${path}`, { cause: e }),
  })

export const pathExists = (path: string) =>
  Effect.tryPromise({
    try: () => fs.access(path).then(() => true).catch(() => false),
    catch: (e) => new Error(`Failed to check existence of path: ${path}`, { cause: e }),
  })
