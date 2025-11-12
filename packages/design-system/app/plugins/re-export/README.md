# Auto Re-Export Plugin

A Vite plugin to automatically generate re-export index files for specified directories. This simplifies imports and helps maintain a clean project structure.

## Features

- ✅ Auto-generate `index.ts` in each specified directory
- ✅ Auto-generate a root `index.ts` that re-exports from all generated directory barrels
- ✅ Watch mode for development
- ✅ Configurable (directories, extensions, export style)
- ✅ TypeScript support with full autocomplete

## Usage

### In Vite Config

```ts
import { autoReexport } from './app/plugins/re-export'

export default defineNuxtConfig({
  vite: {
    plugins: [
      autoReexport({
        basePath: 'app/components',
        folders: ['auth', 'base', 'form'],
        generateRootIndex: true,
        rootIndexPath: 'app'
      })
    ]
  }
})
```

### Configuration Options

```ts
interface AutoReexportConfig {
  /** Base path for components */
  basePath?: string // default: 'app/components'
  
  /** Directories to scan for files */
  folders?: string[] // default: auto-detect
  
  /** Directories to exclude */
  exclude?: string[] // default: ['node_modules', '.nuxt', 'dist']
  
  /** File extensions to export */
  extensions?: string[] // default: ['.vue', '.ts', '.tsx']
  
  /** Output file name */
  outputFileName?: string // default: 'index.ts'
  
  /** Export style: 'default' | 'named' */
  exportStyle?: 'default' | 'named' // default: 'default'
  
  /** Add header comment */
  addHeader?: boolean // default: true

  /** Custom header text */
  headerText?: string

  /** Sort exports alphabetically */
  sortAlphabetically?: boolean // default: true

  /** Watch mode (dev only) */
  watch?: boolean // default: true

  /** Verbose logging */
  verbose?: boolean // default: false

  /** Generate root index.ts */
  generateRootIndex?: boolean // default: false

  /** Path for root index.ts */
  rootIndexPath?: string // default: 'app'
}
```

## Examples

### Example 1: Basic Setup

```ts
autoReexport({
  basePath: 'app/components',
  folders: ['auth', 'base', 'form']
})
```

### Example 2: With Root Index

```ts
autoReexport({
  basePath: 'app/components',
  folders: ['auth', 'base', 'form'],
  generateRootIndex: true,
  rootIndexPath: 'app'
})
```

### Example 3: Named Exports

```ts
autoReexport({
  basePath: 'app/components',
  exportStyle: 'named'
})
```

### Example 4: Custom Configuration

```ts
autoReexport({
  basePath: 'src/components',
  folders: ['ui', 'forms', 'layout'],
  extensions: ['.vue', '.ts'],
  outputFileName: 'exports.ts',
  addHeader: true,
  headerText: '// Auto-generated exports\n\n',
  sortAlphabetically: true,
  verbose: true
})
```

## Structure

```
app/plugins/re-export/
├── index.ts         # Vite plugin main export
├── generator.ts     # ReexportGenerator class
├── types.ts         # TypeScript types & default config
├── test.ts          # Test script
└── README.md        # Documentation
```

## Testing

Run the test script:

```bash
bun run app/plugins/re-export/test.ts
```

## Migration from Nuxt Module

### Before (Nuxt Module)

```ts
export default defineNuxtConfig({
  modules: ['./modules/auto-reexport'],
  autoReexport: {
    basePath: 'app/components',
    folders: ['auth', 'base']
  }
})
```

### After (Vite Plugin)

```ts
import { autoReexport } from './app/plugins/re-export'

export default defineNuxtConfig({
  vite: {
    plugins: [
      autoReexport({
        basePath: 'app/components',
        folders: ['auth', 'base']
      })
    ]
  }
})
```

## Notes

- The plugin generates files at the start of the build and watches for changes in dev mode.
- The root index will be created at `rootIndexPath/index.ts` (default: `app/index.ts`).
- Generated files will have a header comment indicating they are auto-generated.
- Watch mode only works in development mode.
