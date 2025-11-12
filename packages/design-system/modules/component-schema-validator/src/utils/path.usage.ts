import { getExpectedSchemaPath } from './path'

// Usage example:
const componentPath = 'components/core/Avatar.vue'
const schemaSuffix = '.schema.ts'

const expectedPath = getExpectedSchemaPath(componentPath, schemaSuffix)

console.log(`For component: ${componentPath}`)
console.log(`Expected schema path is: ${expectedPath}`)
// Expected output: components/core/avatar.schema.ts
