# Component Schema Validator

A Nuxt module to ensure every `.vue` component has a corresponding schema file. This promotes consistency and enables schema-driven development, validation, and documentation.

## Features

- 🔎 **Scans** for all `.vue` components in your specified directory.
- ✅ **Validates** the existence of a corresponding schema file (e.g., `Button.vue` -> `button.schema.ts`).
- ⚙️ **Configurable** paths and schema file suffixes.
- 🚦 **Strict mode** to fail the build if any schema is missing.
- ✨ **Powered by Effect-TS** for robust, functional error handling.

## Installation

This module is intended for internal use within the Wrikka platform and is not published to npm.

## Usage

Enable and configure the module in your `nuxt.config.ts`:

```ts
export default defineNuxtConfig({
  modules: ['modules/component-schema-validator'],

  componentSchemaValidator: {
    // Directory where your .vue components are located, relative to `srcDir`.
    componentDir: 'components',

    // Directory where your schema files are located.
    schemaDir: 'components/schemas',

    // The suffix for your schema files.
    schemaSuffix: '.schema.ts',

    // If true, the build will fail if any component is missing a schema.
    strict: process.env.NODE_ENV === 'production',
  },
})
```

## How It Works

On `modules:done`, the module will:

1.  Scan the `componentDir` for all `.vue` files.
2.  Scan the `schemaDir` for all schema files (matching `schemaSuffix`).
3.  For each component, it constructs an expected schema path (e.g., `components/Button.vue` -> `components/schemas/button.schema.ts`).
4.  It checks if the expected schema file exists.
5.  Finally, it logs a report of all found and missing schemas.

## Development

- **Build**: `bun run build`
- **Test**: `bun run test`
└── config/
    └── components/
        ├── auth/
        │   ├── loginform.meta.ts
        │   └── signupform.meta.ts
        └── base/
            ├── button.meta.ts
            └── input.meta.ts
```

## ⚙️ How It Works

1. **Scan** - อ่าน components จาก `app/components/`
2. **Check** - ตรวจสอบว่ามี `.meta.ts` ใน `app/config/components/`
3. **Report** - แสดง warnings สำหรับ components ที่ไม่มี metadata

## 🚀 Usage

Module ทำงานอัตโนมัติ ไม่ต้องเรียกใช้ใน code

## 📚 Why Module, Not Plugin?

| Modules | Plugins |
|---------|---------|
| Build-time | Runtime |
| Extend Nuxt | Extend Vue app |
| `defineNuxtModule` | `defineNuxtPlugin` |
| `modules/` folder | `app/plugins/` folder |
| This validator ✅ | ❌ Not suitable |

---

**Note:** Module นี้ควรอยู่ใน `modules/` เสมอ ไม่ใช่ `app/plugins/`
