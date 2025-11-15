import { defineConfig } from 'tsdown'
import Vue from 'unplugin-vue/rolldown'

export default defineConfig({
  entry: {
    index: './app/index.ts'
  },
  outDir: './dist',
  format: ['esm'],
  platform: 'browser',
  plugins: [Vue({ isProduction: true })],
  dts: false,
  clean: true,
  sourcemap: true,
  treeshake: true
})