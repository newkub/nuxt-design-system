# Wrikka Design System Monorepo

Monorepo สำหรับ Wrikka Design System ที่ใช้ Turborepo

## 🏗️ โครงสร้าง Workspace

### `packages/design-system` - Core Design System
- Components, composables, utilities
- Nuxt modules (wrikka-design, component-meta-validator)
- ไม่มี theme config (ย้ายไป packages/docs แล้ว)

### `packages/docs` - Documentation Builder 🎨
- **Builder package** สำหรับสร้าง documentation sites
- ใช้ `@wrikka/vue-design-system` ผ่าน workspace
- มี `wrikka-theme.config.ts` configuration
- มี **CLI** (`wrikka-docs`) ที่ใช้ `@clack/prompts`
- เก็บ markdown content ใน `content/`

### `packages/storybook` - Component Stories
- Storybook สำหรับ component documentation
- Interactive examples และ testing

### `docs/` - Simple User Example 📚
- ตัวอย่างการใช้งาน `@wrikka/docs` builder แบบง่ายที่สุด
- Extend configuration จาก `@wrikka/docs`
- ไม่ต้องตั้งค่าอะไรเพิ่มเติม

## 📦 Commands

```bash
# Development - รันทุก workspace พร้อมกัน
bun dev

# Build - build ทุก workspace
bun build

# Storybook
bun storybook

# สร้าง docs project ใหม่ด้วย CLI
bun docs:init

# Lint & Format
bun lint
bun format

# Test
bun test

# Update dependencies
bun update:deps
```

## 🚀 เริ่มต้นใช้งาน

```bash
# ติดตั้ง dependencies
bun install

# รัน development servers
bun dev
```

## 📖 การใช้ Documentation Builder

### ใช้ CLI สร้าง project ใหม่

```bash
# ใช้ CLI สร้าง docs project
bun docs:init

# หรือใช้ CLI โดยตรง
bun packages/docs/cli/index.js
```

### Extend จาก @wrikka/docs

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  extends: ['@wrikka/docs'],
  
  devServer: {
    port: 3001
  }
})
```

## 🛠️ Tech Stack

- **Monorepo**: Turborepo
- **Package Manager**: Bun
- **Framework**: Nuxt 4
- **UI**: Vue 3 + UnoCSS
- **Documentation**: Custom docs builder + Storybook
- **CLI**: @clack/prompts
- **Testing**: Vitest

## 📂 Architecture

```
.
├── packages/
│   ├── design-system/    # Core components & modules
│   ├── docs/             # Builder package with CLI
│   └── storybook/        # Component stories + features
├── apps/
│   └── docs/             # Simple user example
└── package.json          # Root monorepo config
```

## 🎨 Storybook Features

Storybook พร้อมใช้งานพร้อม features ครบครัน:

- 🌓 **Dark Mode** - Theme switcher ที่สวยงาม
- ♿ **A11y Checks** - Accessibility validation
- 📱 **Responsive Viewports** - Test ทุก screen size
- 🎮 **Interactive Controls** - Edit props แบบ real-time
- 📖 **Auto Docs** - Documentation จาก component meta
- 🎨 **Custom Themes** - Branded interface
- 🔧 **UnoCSS** - Atomic CSS utilities

```bash
# Start Storybook
bun storybook
# หรือ
cd packages/storybook && bun dev
```
