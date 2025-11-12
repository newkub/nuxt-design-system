import { Effect, pipe } from 'effect'
import { scanDirectory, filterFiles } from './services/file-system.service'
import { validateComponentMeta } from './utils/validator'
import { getExpectedMetaPath } from './utils/path'
import { Logger } from './context'

interface AppOptions {
  componentDir: string
  schemaDir: string
  schemaSuffix: string
  strict: boolean
}

const validationProgram = (options: AppOptions) =>
  pipe(
    Effect.all([
      scanDirectory(options.componentDir).pipe(Effect.flatMap((files) => filterFiles(files, '.vue'))),
      scanDirectory(options.schemaDir).pipe(Effect.flatMap((files) => filterFiles(files, options.schemaSuffix))),
    ]),
    Effect.map(([componentFiles, metaFiles]) =>
      validateComponentMeta(componentFiles, metaFiles)
    )
  )

const reportingProgram = (result: { found: string[]; missing: string[] }, options: AppOptions) =>
  Effect.gen(function* (_) {
    const logger = yield* _(Logger)

    logger.log('\n')
    logger.info('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
    logger.info('  Component Schema Validation               ')
    logger.info('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n')

    logger.success(`✓ Found: ${result.found.length} components with metadata`)

    if (result.missing.length > 0) {
      logger.log('\n')
      const logFn = options.strict ? logger.error : logger.warn
      logFn(`✗ Missing schema for ${result.missing.length} components:`)

      for (const component of result.missing) {
        logger.warn(`   • ${component}`)
        logger.info(`     → Expected: ${getExpectedSchemaPath(component, options.schemaSuffix)}`)
      }

      logger.log('\n')
      logger.info('💡 Tips:')
      logger.info('   • Create metadata files in app/config/components/')
      logger.info('   • Use: defineComponentMeta() helper')
      logger.info('   • Register in: app/config/components/index.ts')
      logger.log('\n')

      if (options.strict) {
        return yield* _(Effect.fail(new Error(`Missing schema for ${result.missing.length} components`)))
      }
    } else {
      logger.success('✨ All components have a schema!')
    }
    logger.log('\n')
    logger.info('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n')
  })

export const main = (options: AppOptions) =>
  pipe(
    validationProgram(options),
    Effect.flatMap((result) => reportingProgram(result, options))
  )
