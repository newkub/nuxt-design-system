import { getExpectedSchemaPath } from './path'

export interface ValidationResult {
  found: string[]
  missing: string[]
}

export function validateComponentSchema(
  components: string[],
  schemas: string[],
  schemaSuffix: string,
): ValidationResult {
  const found: string[] = []
  const missing: string[] = []
  const schemaSet = new Set(schemas)

  for (const component of components) {
    const expectedSchemaPath = getExpectedSchemaPath(component, schemaSuffix)
    if (schemaSet.has(expectedSchemaPath)) {
      found.push(component)
    } else {
      missing.push(component)
    }
  }

  return { found, missing }
}
