# Component Meta Validator Module

Nuxt module ที่ตรวจสอบว่าทุก component มี metadata config หรือไม่

## 🎯 Purpose

- ✅ **Build-time validation** - ตรวจสอบตอน `nuxt prepare` / `nuxt build`
- ✅ **Enforce metadata** - บังคับให้มี `.meta.ts` สำหรับทุก component
- ✅ **Development tool** - แสดง warnings/errors ในระหว่าง development

## 📦 Type

**Nuxt Module** (Build-time)

- ❌ ไม่ใช่ runtime plugin
- ✅ ทำงานตอน build/dev เท่านั้น
- ✅ ใช้ Nuxt hooks

## 🔧 Configuration

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['./modules/component-meta-validator'],
  
  componentMetaValidator: {
    enabled: true,
    componentsDir: 'app/components',
    metaDir: 'app/config/components',
    strictMode: false // true = error, false = warning
  }
})
```

## 📁 Expected Structure

```
app/
├── components/
│   ├── auth/
│   │   ├── LoginForm.vue
│   │   └── SignUpForm.vue
│   └── base/
│       ├── Button.vue
│       └── Input.vue
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
