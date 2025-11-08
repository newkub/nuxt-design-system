# Auth Components

คอมโพเนนต์สำหรับระบบ Authentication ที่ครบถ้วน พร้อมใช้งานสำหรับ Nuxt 3

## Components

### 1. AuthUI
คอมโพเนนต์หลักสำหรับจัดการ auth flow ทั้งหมด

**Props:**
- `initialView`: `'login' | 'signup' | 'forgot-password' | 'reset-password' | 'consent'` (default: `'login'`)
- `showSocialLogin`: `boolean` (default: `true`)

**Events:**
- `@login`: `{ email, password, rememberMe }`
- `@signup`: `{ email, password, name }`
- `@forgotPassword`: `{ email }`
- `@resetPassword`: `{ password, token }`
- `@consent`: `{ scopes }`
- `@socialLogin`: `'google' | 'github' | 'facebook'`

**Usage:**
```vue
<AuthUI
  initial-view="login"
  :show-social-login="true"
  @login="handleLogin"
  @signup="handleSignup"
/>
```

### 2. LoginForm
ฟอร์มเข้าสู่ระบบ

**Events:**
- `@submit`: `{ email, password, rememberMe }`
- `@forgotPassword`
- `@signUp`

### 3. SignUpForm
ฟอร์มสมัครสมาชิก

**Events:**
- `@submit`: `{ email, password, name }`
- `@signIn`

### 4. ForgotPasswordForm
ฟอร์มลืมรหัสผ่าน

**Events:**
- `@submit`: `{ email }`
- `@backToLogin`

### 5. ResetPasswordForm
ฟอร์มรีเซ็ตรหัสผ่าน

**Events:**
- `@submit`: `{ password }`
- `@backToLogin`

### 6. ConsentForm
ฟอร์มขอความยินยอม (OAuth consent screen)

**Props:**
- `appName`: `string` (default: `'Application'`)
- `appDescription`: `string`
- `scopes`: `Scope[]`

**Events:**
- `@submit`: `{ scopes }`
- `@cancel`

### 7. AccessDenied
หน้าแสดงเมื่อถูกปฏิเสธการเข้าถึง (403)

**Props:**
- `title`: `string` (default: `'Access Denied'`)
- `message`: `string`
- `reason`: `string`
- `showContactSupport`: `boolean` (default: `true`)
- `showBackButton`: `boolean` (default: `true`)

**Events:**
- `@backToHome`
- `@contactSupport`

### 8. TwoFactorAuth
คอมโพเนนต์สำหรับยืนยันตัวตนแบบ 2 ชั้น

**Events:**
- `@submit`: `{ code }`
- `@resendCode`
- `@backToLogin`

### 9. OAuthCallback
หน้าสำหรับจัดการ OAuth callback

**Props:**
- `provider`: `string` (default: `'OAuth'`)
- `status`: `'loading' | 'success' | 'error'` (default: `'loading'`)
- `errorMessage`: `string`

**Events:**
- `@retry`
- `@backToLogin`

### 10. EmailVerification
หน้าสำหรับยืนยันอีเมล

**Props:**
- `email`: `string`
- `status`: `'pending' | 'verified' | 'expired'` (default: `'pending'`)

**Events:**
- `@resendEmail`
- `@backToLogin`
- `@continue`

## Styling

ทุกคอมโพเนนต์ใช้ Tailwind CSS / UnoCSS กับ `@apply` directive

## Features

- ✅ Modern UI/UX design
- ✅ Responsive layout
- ✅ Form validation
- ✅ Loading states
- ✅ Success/Error states
- ✅ TypeScript support
- ✅ Event-driven architecture
- ✅ Customizable props
- ✅ Accessible (keyboard navigation)

## Example Usage

```vue
<script setup lang="ts">
const handleLogin = (data: { email: string; password: string; rememberMe: boolean }) => {
  console.log('Login:', data)
  // ทำการ login
}

const handleSignup = (data: { email: string; password: string; name: string }) => {
  console.log('Signup:', data)
  // ทำการ signup
}
</script>

<template>
  <AuthUI
    @login="handleLogin"
    @signup="handleSignup"
  />
</template>
```
