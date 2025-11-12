import { capitalize } from './path'

export const generateIndexContent = (files: string[], isRoot: boolean = false): string => {
  const imports = files
    .map((file) => {
      const name = file.replace(/\.ts$/, '')
      const path = isRoot ? `./${name}` : `./${name}/${name}`
      return `export * from '${path}'`
    })
    .join('\n')
  return `${imports}\n`
}

export const generateFolderIndexContent = (folderName: string): string => {
  return `export * from './${folderName}'\n`
}

export const generateRootIndexContent = (folders: string[]): string => {
  const imports = folders.map((folder) => `export * from './${folder}'`).join('\n')
  return `${imports}\n`
}
