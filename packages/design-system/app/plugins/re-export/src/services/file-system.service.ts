import { promises as fs } from 'node:fs'
import { dirname } from 'node:path'

export async function readFile(path: string): Promise<string> {
  try {
    return await fs.readFile(path, 'utf-8')
  } catch (e) {
    throw new Error(`Failed to read file: ${path}`, { cause: e })
  }
}

export async function writeFile(path: string, content: string): Promise<void> {
  try {
    await fs.mkdir(dirname(path), { recursive: true })
    await fs.writeFile(path, content, 'utf-8')
  } catch (e) {
    throw new Error(`Failed to write file: ${path}`, { cause: e })
  }
}

export async function pathExists(path: string): Promise<boolean> {
  try {
    await fs.access(path)
    return true
  } catch {
    return false
  }
}
