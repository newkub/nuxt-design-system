import { defineConfig } from 'tsdown'

export default defineConfig({
  entry: {
    index: './src/index.ts'
  },
  outDir: './dist',
  format: ['esm'],
  platform: 'node',
  dts: true,
  clean: true,
  sourcemap: true,
  treeshake: true
})