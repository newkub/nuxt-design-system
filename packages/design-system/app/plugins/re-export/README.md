# Auto Re-export Plugin

Vite plugin สำหรับ auto-generate re-export files (index.ts) ใน component folders

## ฟีเจอร์

- ✅ Auto-generate `index.ts` ในแต่ละ folder
- ✅ Auto-generate root `index.ts` ที่ re-export จากทุก folders
- ✅ Watch mode สำหรับ development
- ✅ Configurable (folders, extensions, export style)
- ✅ TypeScript support with full autocomplete

## การใช้งาน

### ใน Vite Config

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

### ตัวเลือกการตั้งค่า

```ts
interface AutoReexportConfig {
  /** Base path สำหรับ components */
  basePath?: string // default: 'app/components'
  
  /** Folders ที่ต้องการ auto-generate */
  folders?: string[] // default: auto-detect
  
  /** Folders ที่ต้องการข้าม */
  exclude?: string[] // default: ['node_modules', '.nuxt', 'dist']
  
  /** File extensions ที่ต้องการ export */
  extensions?: string[] // default: ['.vue', '.ts', '.tsx']
  
  /** ชื่อไฟล์ output */
  outputFileName?: string // default: 'index.ts'
  
  /** Export style: 'default' | 'named' */
  exportStyle?: 'default' | 'named' // default: 'default'
  
  /** เพิ่ม header comment */
  addHeader?: boolean // default: true
  
  /** Custom header text */
  headerText?: string
  
  /** Sort exports alphabetically */
  sortAlphabetically?: boolean // default: true
  
  /** Watch mode (dev only) */
  watch?: boolean // default: true
  
  /** Verbose logging */
  verbose?: boolean // default: false
  
  /** สร้าง root index.ts */
  generateRootIndex?: boolean // default: false
  
  /** Path สำหรับ root index.ts */
  rootIndexPath?: string // default: 'app'
}
```

## ตัวอย่าง

### ตัวอย่างที่ 1: Basic Setup

```ts
autoReexport({
  basePath: 'app/components',
  folders: ['auth', 'base', 'form']
})
```

### ตัวอย่างที่ 2: With Root Index

```ts
autoReexport({
  basePath: 'app/components',
  folders: ['auth', 'base', 'form'],
  generateRootIndex: true,
  rootIndexPath: 'app'
})
```

### ตัวอย่างที่ 3: Named Exports

```ts
autoReexport({
  basePath: 'app/components',
  exportStyle: 'named'
})
```

### ตัวอย่างที่ 4: Custom Configuration

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

## การทดสอบ

รัน test script:

```bash
bun run app/plugins/re-export/test.ts
```

## Migration จาก Nuxt Module

### เดิม (Nuxt Module)

```ts
export default defineNuxtConfig({
  modules: ['./modules/auto-reexport'],
  autoReexport: {
    basePath: 'app/components',
    folders: ['auth', 'base']
  }
})
```

### ใหม่ (Vite Plugin)

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

## หมายเหตุ

- Plugin จะ generate files ตอน build start และ watch changes ใน dev mode
- Root index จะถูกสร้างที่ `rootIndexPath/index.ts` (default: `app/index.ts`)
- ไฟล์ที่ถูก generate จะมี header comment บอกว่าเป็น auto-generated
- Watch mode จะทำงานเฉพาะใน development mode เท่านั้น
