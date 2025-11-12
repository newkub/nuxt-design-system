/**
 * Get expected schema path
 * Example: base/Button.vue → base/button.schema.ts
 */
export function getExpectedSchemaPath(componentPath: string, suffix: string): string {
  const parts = componentPath.split(/[\/\\]/)
  const fileName = parts[parts.length - 1]
  
  if (!fileName) {
    return componentPath.replace('.vue', suffix).toLowerCase()
  }
  
  const componentName = fileName.replace('.vue', '')
  const schemaName = `${componentName.toLowerCase()}${suffix}`
  
  parts[parts.length - 1] = schemaName
  
  return parts.join('/')
}
