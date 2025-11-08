/**
 * Component Meta Validator Module
 * ตรวจสอบว่าทุก component มี metadata config หรือไม่
 */

import { defineNuxtModule, createResolver, useLogger } from '@nuxt/kit'
import { existsSync, readdirSync, statSync } from 'node:fs'
import { join, relative } from 'node:path'

export default defineNuxtModule({
  meta: {
    name: 'component-meta-validator',
    configKey: 'componentMetaValidator'
  },
  
  defaults: {
    enabled: true,
    componentsDir: 'app/components',
    metaDir: 'app/config/components',
    strictMode: false, // true = error, false = warning
    autoGenerate: false // TODO: auto-generate missing metadata
  },
  
  setup(options, nuxt) {
    if (!options.enabled) return
    
    const logger = useLogger('component-meta-validator')
    const resolver = createResolver(import.meta.url)
    const rootDir = nuxt.options.rootDir
    
    // Hook: modules:done - ตรวจสอบหหลังโหลด modules เสร็จ
    nuxt.hook('modules:done', () => {
      const componentsPath = join(rootDir, options.componentsDir)
      const metaPath = join(rootDir, options.metaDir)
      
      if (!existsSync(componentsPath)) {
        logger.warn(`Components directory not found: ${options.componentsDir}`)
        return
      }
      
      if (!existsSync(metaPath)) {
        logger.warn(`Metadata directory not found: ${options.metaDir}`)
        return
      }
      
      // Scan components
      const components = scanComponents(componentsPath, options.componentsDir)
      
      // Scan metadata
      const metadataFiles = scanMetadata(metaPath, options.metaDir)
      
      // Check missing metadata
      const missing: string[] = []
      const found: string[] = []
      
      for (const component of components) {
        const expectedMetaPath = getExpectedMetaPath(component)
        
        if (metadataFiles.has(expectedMetaPath)) {
          found.push(component)
        } else {
          missing.push(component)
        }
      }
      
      // Report
      console.log('\n')
      logger.info('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
      logger.info('  📋 Component Metadata Validation               ')
      logger.info('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
      console.log('\n')
      
      logger.success(`✓ Found: ${found.length} components with metadata`)
      
      if (missing.length > 0) {
        console.log('\n')
        
        if (options.strictMode) {
          logger.error(`✗ Missing metadata for ${missing.length} components:`)
        } else {
          logger.warn(`⚠ Missing metadata for ${missing.length} components:`)
        }
        
        missing.forEach((component) => {
          const expectedPath = getExpectedMetaPath(component)
          logger.warn(`   • ${component}`)
          logger.info(`     → Expected: ${expectedPath}`)
        })
        
        console.log('\n')
        logger.info('💡 Tips:')
        logger.info('   • Create metadata files in app/config/components/')
        logger.info('   • Use: defineComponentMeta() helper')
        logger.info('   • Register in: app/config/components/index.ts')
        console.log('\n')
        
        if (options.strictMode) {
          throw new Error(`Missing metadata for ${missing.length} components`)
        }
      } else {
        logger.success('✨ All components have metadata!')
      }
      
      console.log('\n')
      logger.info('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
      console.log('\n')
    })
  }
})

/**
 * Scan components directory
 */
function scanComponents(dir: string, baseDir: string): string[] {
  const components: string[] = []
  
  function scan(currentDir: string) {
    const files = readdirSync(currentDir)
    
    for (const file of files) {
      const fullPath = join(currentDir, file)
      const stat = statSync(fullPath)
      
      if (stat.isDirectory()) {
        scan(fullPath)
      } else if (file.endsWith('.vue')) {
        const relativePath = relative(dir, fullPath)
        components.push(relativePath)
      }
    }
  }
  
  scan(dir)
  return components
}

/**
 * Scan metadata files
 */
function scanMetadata(dir: string, baseDir: string): Set<string> {
  const metadata = new Set<string>()
  
  function scan(currentDir: string) {
    if (!existsSync(currentDir)) return
    
    const files = readdirSync(currentDir)
    
    for (const file of files) {
      const fullPath = join(currentDir, file)
      const stat = statSync(fullPath)
      
      if (stat.isDirectory()) {
        scan(fullPath)
      } else if (file.endsWith('.meta.ts')) {
        const relativePath = relative(dir, fullPath)
        metadata.add(relativePath)
      }
    }
  }
  
  scan(dir)
  return metadata
}

/**
 * Get expected metadata path
 * Example: base/Button.vue → base/button.meta.ts
 */
function getExpectedMetaPath(componentPath: string): string {
  const parts = componentPath.split(/[/\\]/)
  const fileName = parts[parts.length - 1]
  
  if (!fileName) {
    return componentPath.replace('.vue', '.meta.ts').toLowerCase()
  }
  
  const componentName = fileName.replace('.vue', '')
  const metaName = `${componentName.toLowerCase()}.meta.ts`
  
  parts[parts.length - 1] = metaName
  
  return parts.join('/')
}
