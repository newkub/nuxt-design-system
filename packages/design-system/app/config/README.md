# Component Metadata Config

โฟลเดอร์นี้เก็บ metadata ของ components ทั้งหมด

## 📁 Structure

```
config/
├── components/
│   ├── base/
│   │   └── button.meta.ts
│   ├── auth/
│   │   └── login-form.meta.ts
│   └── index.ts          # Registry ทั้งหมด
└── README.md
```

## 📝 การเพิ่ม Component Metadata

### 1. สร้างไฟล์ metadata

```ts
// config/components/base/button.meta.ts
import { defineComponentMeta } from '~/composables/useComponentMeta'

export default defineComponentMeta({
  id: 'base-button',
  name: 'Button',
  description: 'A button component',
  category: 'base',
  status: 'stable',
  tags: ['button', 'action'] as const,
  related: [] as const,
  props: {
    // ...
  },
  events: {
    // ...
  },
  slots: ['default'] as const,
  examples: [
    // ...
  ] as const
})
```

### 2. เพิ่มใน index.ts

```ts
// config/components/index.ts
import buttonMeta from './base/button.meta'
import loginFormMeta from './auth/login-form.meta'

export const componentMetadata = [
  buttonMeta,
  loginFormMeta,
  // เพิ่มที่นี่
] as const
```

### 3. Auto-register

Plugin จะ auto-register ให้อัตโนมัติเมื่อ app start

## ✅ Benefits

- ✅ **Separation of Concerns** - Component แยกจาก metadata
- ✅ **Centralized** - Metadata อยู่ที่เดียว
- ✅ **Type-Safe** - Full TypeScript support
- ✅ **Auto-Register** - Plugin register อัตโนมัติ
- ✅ **Clean Components** - Component files สะอาด

## 🎯 Component File Structure

Component ไม่ต้องมี metadata code เลย:

```vue
<script setup lang="ts">
// แค่ props และ logic
const props = defineProps<{
  variant?: string
}>()
</script>

<template>
  <!-- template -->
</template>
```

Metadata อยู่ใน `config/components/`:

```ts
// config/components/base/button.meta.ts
export default defineComponentMeta({
  id: 'base-button',
  // ...
})
```

## 📊 Registry Flow

```
app start
    ↓
plugins/component-meta-registry.ts
    ↓
import config/components/index.ts
    ↓
componentMetadata array
    ↓
forEach registerComponent()
    ↓
useComponentMeta store
```

## 🔍 การใช้งาน Metadata

```ts
// ใน component อื่นๆ
const { getComponent, searchComponents } = useComponentMeta()

// ดึง metadata
const buttonMeta = getComponent('base-button')

// ค้นหา
const buttons = searchComponents('button')
```
