# Vite Hooks ที่ใช้ใน Auto Re-export Plugin

Plugin นี้ใช้ Vite Plugin API เพื่อ auto-generate re-exports

## 🎣 Vite Hooks ที่ใช้

### 1. `buildStart()`
**เรียกเมื่อ:** เริ่ม build หรือ dev server
**ใช้สำหรับ:** Generate re-exports ครั้งแรก

```ts
async buildStart() {
  if (isFirstBuild) {
    await generator.generateAll()
    isFirstBuild = false
  }
}
```

**Output:**
```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🔄 Auto Re-export: Generating component exports...
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🔄 Generating re-exports for 7 folders...

✅ Generated app/components/auth/index.ts (3 exports)
✅ Generated app/components/base/index.ts (12 exports)
...

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ Auto Re-export: Complete (234ms)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

### 2. `buildEnd()`
**เรียกเมื่อ:** Build เสร็จสิ้น
**ใช้สำหรับ:** แสดงสถานะเสร็จสิ้น

```ts
buildEnd() {
  if (verbose) {
    console.log('📦 Auto Re-export: Build phase complete')
  }
}
```

### 3. `configureServer(server)`
**เรียกเมื่อ:** Dev server start
**ใช้สำหรับ:** เปิด watch mode

```ts
configureServer(server: ViteDevServer) {
  if (config.watch !== false) {
    console.log('\n👀 Auto Re-export: Watch mode enabled')
    generator.watch()
  }
}
```

**Output:**
```
👀 Auto Re-export: Watch mode enabled
   Changes to component files will trigger re-generation

🚀 Auto Re-export: Dev server ready
```

### 4. `handleHotUpdate({ file, server })`
**เรียกเมื่อ:** ไฟล์เปลี่ยนใน HMR (Hot Module Replacement)
**ใช้สำหรับ:** แจ้งเตือนเมื่อ component เปลี่ยน

```ts
handleHotUpdate({ file, server }) {
  if (file.includes('/components/') && !file.includes('/node_modules/')) {
    if (verbose) {
      console.log(`\n🔄 Auto Re-export: Detected change in ${file}`)
    }
  }
}
```

**Output:**
```
🔄 Auto Re-export: Detected change in app/components/base/Button.vue
```

## 📊 Vite Hooks ที่มีทั้งหมด (สามารถใช้เพิ่มได้)

### Universal Hooks (ใช้ได้ทั้ง build และ dev)

| Hook | Timing | Use Case |
|------|--------|----------|
| `options(options)` | ก่อนสร้าง config | แก้ไข rollup options |
| `buildStart()` | ✅ ใช้แล้ว | เริ่ม build |
| `resolveId(id)` | ระหว่าง import | Custom module resolution |
| `load(id)` | ระหว่าง import | Load custom modules |
| `transform(code, id)` | ระหว่าง import | แปลง code |
| `buildEnd()` | ✅ ใช้แล้ว | จบ build |
| `closeBundle()` | หลัง bundle complete | Cleanup |

### Vite-Specific Hooks

| Hook | Timing | Use Case |
|------|--------|----------|
| `config(config)` | ก่อนสร้าง config | แก้ไข Vite config |
| `configResolved(config)` | หลัง config resolved | อ่าน final config |
| `configureServer(server)` | ✅ ใช้แล้ว | Custom dev server |
| `configurePreviewServer(server)` | Preview server start | Custom preview server |
| `transformIndexHtml(html)` | Transform HTML | แก้ไข index.html |
| `handleHotUpdate(ctx)` | ✅ ใช้แล้ว | Custom HMR |

## 🎯 สรุป: Hooks ที่ใช้ใน Re-export Plugin

```ts
{
  name: 'vite-plugin-auto-reexport',
  
  // ✅ Build Phase
  buildStart() {
    // Generate re-exports
  },
  buildEnd() {
    // Show completion
  },
  
  // ✅ Dev Server Phase  
  configureServer(server) {
    // Start watch mode
  },
  
  // ✅ HMR Phase
  handleHotUpdate({ file }) {
    // Detect component changes
  }
}
```

## 🚀 การใช้งานใน Nuxt

```ts
// nuxt.config.ts
import { autoReexport } from './app/plugins/re-export'

export default defineNuxtConfig({
  vite: {
    plugins: [
      autoReexport({
        basePath: 'app/components',
        folders: ['auth', 'base', 'data'],
        generateRootIndex: true,
        verbose: true,  // เปิดให้แสดงข้อความเต็ม
        watch: true     // เปิด watch mode
      })
    ]
  }
})
```

## 📝 Terminal Output Example

### Development Mode (`bun dev`)

```bash
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🔄 Auto Re-export: Generating component exports...
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🔄 Generating re-exports for 7 folders...

✅ Generated app/components/auth/index.ts (3 exports)
✅ Generated app/components/base/index.ts (12 exports)
✅ Generated app/components/data/index.ts (5 exports)
✅ Generated app/components/feedback/index.ts (4 exports)
✅ Generated app/components/layout/index.ts (8 exports)
✅ Generated app/components/media/index.ts (2 exports)
✅ Generated app/components/navigation/index.ts (6 exports)
✅ Generated root app/index.ts (40 component exports)

✨ Done! Generated re-exports for 7 folders + root index

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ Auto Re-export: Complete (234ms)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

👀 Auto Re-export: Watch mode enabled
   Changes to component files will trigger re-generation

🚀 Auto Re-export: Dev server ready

Nuxt 4.0.0 with Nitro 2.10.0
  > Local:    http://localhost:3000
```

### Build Mode (`bun run build`)

```bash
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🔄 Auto Re-export: Generating component exports...
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🔄 Generating re-exports for 7 folders...

✅ Generated app/components/auth/index.ts (3 exports)
✅ Generated app/components/base/index.ts (12 exports)
...

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ Auto Re-export: Complete (189ms)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📦 Auto Re-export: Build phase complete

ℹ Building Nuxt...
```

### Watch Mode (เมื่อแก้ไขไฟล์)

```bash
🔄 Auto Re-export: Detected change in app/components/base/Button.vue

📝 File changed: app/components/base/Button.vue
✅ Generated app/components/base/index.ts (12 exports)
```

## 🎛️ Config Options

```ts
interface AutoReexportConfig {
  basePath: string              // Base path สำหรับ components
  folders: string[]             // Folders ที่จะ generate
  outputFileName: string        // ชื่อไฟล์ output (default: 'index.ts')
  generateRootIndex: boolean    // Generate root index หรือไม่
  verbose: boolean              // แสดง log เต็ม
  watch: boolean                // เปิด watch mode
  extensions: string[]          // Extensions ที่รองรับ
  sortAlphabetically: boolean   // เรียง exports
  exportStyle: 'default' | 'named'
}
```

## ✅ Benefits

1. **Visual Feedback** - เห็นชัดว่า re-export ทำงาน
2. **Performance Info** - แสดงเวลาที่ใช้
3. **Watch Notifications** - รู้เมื่อไฟล์เปลี่ยน
4. **Debug Friendly** - ง่ายต่อการ debug
5. **Professional** - Output สวยงามเป็นระเบียบ

## 📚 Reference

- [Vite Plugin API](https://vitejs.dev/guide/api-plugin.html)
- [Rollup Plugin Hooks](https://rollupjs.org/plugin-development/)
- [Nuxt Vite Configuration](https://nuxt.com/docs/api/configuration/nuxt-config#vite)
