import { describe, it, expect } from 'vitest'
import { getExpectedSchemaPath } from './path'

describe('getExpectedSchemaPath',
  () => {
    it('should generate correct schema path for simple component', () => {
      const componentPath = 'Button.vue'
      const suffix = '.schema.ts'
      const expected = 'button.schema.ts'
      expect(getExpectedSchemaPath(componentPath, suffix)).toBe(expected)
    })

    it('should generate correct schema path for nested component', () => {
      const componentPath = 'form/InputField.vue'
      const suffix = '.schema.ts'
      const expected = 'form/inputfield.schema.ts'
      expect(getExpectedSchemaPath(componentPath, suffix)).toBe(expected)
    })

    it('should handle different suffixes', () => {
      const componentPath = 'Card.vue'
      const suffix = '.meta.json'
      const expected = 'card.meta.json'
      expect(getExpectedSchemaPath(componentPath, suffix)).toBe(expected)
    })
  }
)
