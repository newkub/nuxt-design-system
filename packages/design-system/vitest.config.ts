import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'node:path'

export default defineConfig({
  plugins: [vue()],
  
  test: {
    // Test environment
    environment: 'happy-dom',
    
    // Global test APIs
    globals: true,
    
    // Setup files
    setupFiles: ['./test/setup.ts'],
    
    // Coverage
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'test/',
        '.nuxt/',
        '.output/',
        'dist/',
        'storybook-static/',
        '**/*.stories.ts',
        '**/*.spec.ts',
        '**/*.test.ts',
        '**/index.ts'
      ]
    },
    
    // Include/Exclude patterns
    include: [
      'app/**/*.{test,spec}.{js,ts,jsx,tsx}',
      'test/**/*.{test,spec}.{js,ts,jsx,tsx}'
    ],
    
    exclude: [
      'node_modules',
      'dist',
      '.nuxt',
      '.output',
      'storybook-static'
    ],
    
    // Reporters
    reporters: ['verbose'],
    
    // Watch options
    watch: false,
    
    // Timeout
    testTimeout: 10000,
    
    // Threads
    threads: true,
    
    // Pool options
    pool: 'threads',
    poolOptions: {
      threads: {
        singleThread: false
      }
    }
  },
  
  resolve: {
    alias: {
      '~': resolve(__dirname, './app'),
      '@': resolve(__dirname, './app')
    }
  }
})
