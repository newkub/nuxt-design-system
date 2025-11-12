import { describe, it, expect } from 'vitest'
import { generateIndexContent, generateRootIndexContent } from './generator'

describe('generateIndexContent', () => {
  it('should generate content for a folder', () => {
    const files = ['useMyComposable.ts', 'useAnother.ts']
    const expected = `export * from './useMyComposable/useMyComposable'\nexport * from './useAnother/useAnother'`
    expect(generateIndexContent(files, false)).toContain(expected)
  })
})

describe('generateRootIndexContent', () => {
  it('should generate content for the root index', () => {
    const folders = ['composables', 'utils']
    const expected = `export * from './composables'\nexport * from './utils'`
    expect(generateRootIndexContent(folders)).toContain(expected)
  })
})
