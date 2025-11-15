# @wrikka/reexport-module

Auto re-export module for the Wrikka Design System.

## Features

- Automatically generates index files for component folders
- Creates root re-export file for easy imports
- Configurable through nuxt.config.ts
- Watch mode for development

## Configuration

Configure the module in your `nuxt.config.ts`:

```ts
export default defineNuxtConfig({
  modules: [
    './modules/reexport'
  ],
  
  wrikkaReexport: {
    basePath: 'app/components', // Base path for components
    folders: [ // Folders to generate index files for
      'auth',
      'base',
      'data',
      'feedback',
      'layout',
      'media',
      'navigation'
    ],
    generateRootIndex: true, // Generate root index.ts file
    verbose: false, // Log generation process
    watch: true // Watch for file changes
  }
})
```

## Usage

Once configured, the module will automatically generate:

1. Index files in each component folder (`app/components/[folder]/index.ts`)
2. A root index file (`app/components/index.ts`) that re-exports all components

This allows you to import components like:

```ts
// Import all base components
import { Button, Input, Card } from '~/app/components/base'

// Import specific components
import { DataTable } from '~/app/components/data'
```