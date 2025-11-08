# Wrikka Design System Module

Nuxt Module ที่รวม UnoCSS Wrikka Preset, Auto Re-export, และ Theme System ไว้ในที่เดียว

## ✨ Features

- ✅ **UnoCSS Wrikka Preset** - พร้อม 4 themes และ autocomplete
- ✅ **Auto Re-export** - Generate index.ts อัตโนมัติ
- ✅ **Component Auto-import** - Import components อัตโนมัติ
- ✅ **Theme System** - 4 themes x 2 modes = 8 variants
- ✅ **Color Mode** - Dark mode support
- ✅ **TypeScript** - Full type safety with autocomplete

## 📦 Installation

Module นี้มาพร้อมกับโปรเจค ไม่ต้องติดตั้งเพิ่ม

## 🚀 การใช้งาน

### Basic Usage

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['./modules/design-system'],
  
  designSystem: {
    // UnoCSS Configuration
    unocss: {
      theme: 'Thailand Night',
      mode: 'dark',
      icons: ['mdi', 'logos'],
      font: 'Noto Sans Thai'
    },
    
    // Auto Re-export Configuration
    reexport: {
      folders: ['auth', 'base', 'form', 'layout']
    }
  }
})
```

### Full Configuration

```ts
export default defineNuxtConfig({
  modules: ['./modules/design-system'],
  
  designSystem: {
    // เปิด/ปิด module
    enabled: true,
    
    // UnoCSS Wrikka Preset
    unocss: {
      theme: 'ocean',
      mode: 'auto',
      icons: ['mdi', 'logos', 'heroicons', 'lucide', 'carbon', 'tabler'],
      font: 'Inter',
      typography: true,
      attributify: false,
      prefix: 'w-'
    },
    
    // Auto Re-export
    reexport: {
      enabled: true,
      basePath: 'app/components',
      folders: ['auth', 'base', 'data', 'feedback', 'layout', 'media', 'navigation'],
      generateRootIndex: true,
      rootIndexPath: 'app',
      verbose: false,
      watch: true
    },
    
    // Component Auto-import
    components: {
      enabled: true,
      dirs: ['~/app/components'],
      global: true
    },
    
    // Theme System
    theme: {
      cssPath: './app/assets/theme.css',
      colorMode: true,
      colorModeOptions: {
        preference: 'system',
        fallback: 'light',
        classSuffix: '',
        storageKey: 'nuxt-color-mode'
      }
    },
    
    // Development Tools
    devtools: {
      enabled: true,
      strictTypeScript: true
    }
  }
})
```

## 📚 Configuration Options

### `enabled`
Type: `boolean`  
Default: `true`

เปิด/ปิด Design System Module

### `unocss`
Type: `WrikkaThemeOptions`

Configuration สำหรับ UnoCSS Wrikka Preset

**Properties:**
- `theme`: `'default' | 'ocean' | 'forest' | 'Thailand Night'`
- `mode`: `'light' | 'dark' | 'auto'`
- `icons`: Array of icon collections
- `font`: Font family name
- `typography`: Enable typography preset
- `attributify`: Enable attributify mode
- `prefix`: Prefix for utility classes

### `reexport`
Type: `AutoReexportConfig`

Configuration สำหรับ Auto Re-export

**Properties:**
- `enabled`: เปิด/ปิด auto-reexport
- `basePath`: Base path สำหรับ components
- `folders`: Folders ที่ต้องการ generate
- `generateRootIndex`: สร้าง root index.ts
- `rootIndexPath`: Path สำหรับ root index
- `verbose`: แสดง log
- `watch`: Watch mode

### `components`
Type: `ComponentsConfig`

Configuration สำหรับ Component Auto-import

**Properties:**
- `enabled`: เปิด/ปิด auto-import
- `dirs`: Component directories
- `global`: Global components

### `theme`
Type: `ThemeConfig`

Configuration สำหรับ Theme System

**Properties:**
- `cssPath`: Path ไปยัง CSS file
- `colorMode`: เปิด/ปิด color mode
- `colorModeOptions`: Color mode preferences

### `devtools`
Type: `DevtoolsConfig`

Configuration สำหรับ Development Tools

**Properties:**
- `enabled`: เปิด/ปิด DevTools
- `strictTypeScript`: TypeScript strict mode

## 🎨 Themes

Module รองรับ 4 themes:

1. **Default** - Modern และ neutral
2. **Ocean** - สดใสสไตล์ทะเล
3. **Forest** - ธรรมชาติสีเขียว
4. **Thailand Night** - สีทองและกรมท่า

แต่ละ theme มี 2 modes: Light และ Dark

## 🎯 ตัวอย่างการใช้งาน

### Thailand Night Theme

```ts
designSystem: {
  unocss: {
    theme: 'Thailand Night',
    mode: 'dark',
    icons: ['mdi', 'logos'],
    font: 'Noto Sans Thai'
  }
}
```

### Ocean Theme with Full Icons

```ts
designSystem: {
  unocss: {
    theme: 'ocean',
    mode: 'auto',
    icons: ['mdi', 'logos', 'heroicons', 'lucide', 'carbon', 'tabler'],
    font: 'Inter',
    typography: true
  }
}
```

### Custom Component Folders

```ts
designSystem: {
  reexport: {
    folders: ['auth', 'base', 'form', 'layout', 'media', 'navigation', 'ui'],
    verbose: true
  },
  components: {
    dirs: [
      '~/app/components',
      { path: '~/app/widgets', global: false }
    ]
  }
}
```

## 🔧 Advanced Usage

### Disable Specific Features

```ts
designSystem: {
  unocss: {
    theme: 'default'
  },
  reexport: {
    enabled: false  // ปิด auto-reexport
  },
  theme: {
    colorMode: false  // ปิด color mode
  }
}
```

### Custom Theme CSS Path

```ts
designSystem: {
  theme: {
    cssPath: './assets/custom-theme.css',
    colorMode: true
  }
}
```

## 📖 Related Documentation

- [Theme System](../../docs/THEME-SYSTEM.md)
- [Thailand Night Theme](../../docs/THAILAND-NIGHT-THEME.md)
- [Autocomplete Guide](../../docs/AUTOCOMPLETE-GUIDE.md)
- [UnoCSS Preset Usage](../../docs/WRIKKA-UNO-PRESET-USAGE.md)

## 💡 Tips

1. ใช้ TypeScript autocomplete (Ctrl+Space) เพื่อดู options ทั้งหมด
2. ตั้งค่า `verbose: true` เพื่อดู logs
3. ใช้ `watch: true` ใน development mode
4. เลือก theme ที่เหมาะกับ brand ของคุณ

## 🐛 Troubleshooting

### Module ไม่ทำงาน

1. ตรวจสอบว่า module path ถูกต้อง
2. ลบ `.nuxt` folder และรัน `bun dev` ใหม่
3. ตรวจสอบ console logs

### Autocomplete ไม่ทำงาน

1. Restart TypeScript Server
2. ตรวจสอบ `tsconfig.json`
3. อ่าน [Autocomplete Guide](../../docs/AUTOCOMPLETE-GUIDE.md)

### Theme ไม่เปลี่ยน

1. ตรวจสอบว่า CSS ถูก import
2. ตรวจสอบ `data-theme` attribute ใน HTML
3. Clear browser cache
