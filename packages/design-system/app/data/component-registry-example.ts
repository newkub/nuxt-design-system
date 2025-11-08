import type { ComponentMeta } from '~/types/component-meta'

export const authComponentsRegistry: ComponentMeta[] = [
  {
    id: 'auth-login-form',
    name: 'LoginForm',
    description: 'A secure login form with email and password fields, remember me option, and forgot password link',
    category: 'auth',
    tags: ['authentication', 'form', 'login', 'security'],
    version: '1.0.0',
    status: 'stable',
    examples: [
      {
        title: 'Basic Usage',
        description: 'Simple login form with event handlers',
        code: `<AuthLoginForm 
  @submit="handleLogin"
  @forgot-password="goToForgotPassword"
  @sign-up="goToSignUp"
/>`,
        language: 'vue'
      },
      {
        title: 'With Loading State',
        description: 'Handle loading state after submission',
        code: `<script setup>
const handleLogin = async (data) => {
  try {
    await authService.login(data)
    navigateTo('/dashboard')
  } catch (error) {
    console.error(error)
  }
}
</script>

<template>
  <AuthLoginForm @submit="handleLogin" />
</template>`,
        language: 'vue'
      }
    ],
    related: ['auth-signup-form', 'auth-forgot-password-form', 'auth-ui'],
    author: {
      name: 'Wrikka Team',
      email: 'team@wrikka.com',
      url: 'https://wrikka.com'
    },
    accessibility: {
      level: 'wcag-aa',
      features: [
        'Keyboard navigation support',
        'Screen reader labels',
        'Focus management',
        'Error announcements',
        'High contrast support'
      ],
      keyboardNavigation: true,
      screenReaderSupport: true,
      ariaLabels: true,
      colorContrast: true,
      focusManagement: true
    },
    languages: ['en', 'th'],
    props: {
      initialEmail: { type: 'string', required: false },
      autoFocus: { type: 'boolean', default: false }
    },
    events: {
      submit: '{ email: string, password: string, rememberMe: boolean }',
      forgotPassword: 'void',
      signUp: 'void'
    }
  },
  {
    id: 'auth-signup-form',
    name: 'SignUpForm',
    description: 'User registration form with email, password, password confirmation, and terms acceptance',
    category: 'auth',
    tags: ['authentication', 'form', 'registration', 'signup'],
    version: '1.0.0',
    status: 'stable',
    examples: [
      {
        title: 'Basic Usage',
        code: `<AuthSignUpForm 
  @submit="handleSignUp"
  @sign-in="goToSignIn"
/>`,
        language: 'vue'
      }
    ],
    related: ['auth-login-form', 'auth-email-verification', 'auth-ui'],
    author: {
      name: 'Wrikka Team',
      email: 'team@wrikka.com'
    },
    accessibility: {
      level: 'wcag-aa',
      features: [
        'Password strength indicator',
        'Real-time validation',
        'Keyboard navigation',
        'Error messages'
      ],
      keyboardNavigation: true,
      screenReaderSupport: true,
      ariaLabels: true,
      colorContrast: true,
      focusManagement: true
    },
    languages: ['en', 'th'],
    events: {
      submit: '{ email: string, password: string, name: string }',
      signIn: 'void'
    }
  },
  {
    id: 'auth-forgot-password-form',
    name: 'ForgotPasswordForm',
    description: 'Password reset request form that sends a reset link to user email',
    category: 'auth',
    tags: ['authentication', 'form', 'password', 'reset'],
    version: '1.0.0',
    status: 'stable',
    examples: [
      {
        title: 'Basic Usage',
        code: `<AuthForgotPasswordForm 
  @submit="handleForgotPassword"
  @back-to-login="goToLogin"
/>`,
        language: 'vue'
      }
    ],
    related: ['auth-reset-password-form', 'auth-login-form', 'auth-ui'],
    author: {
      name: 'Wrikka Team',
      email: 'team@wrikka.com'
    },
    accessibility: {
      level: 'wcag-aa',
      features: [
        'Success state feedback',
        'Email validation',
        'Keyboard navigation'
      ],
      keyboardNavigation: true,
      screenReaderSupport: true,
      ariaLabels: true,
      colorContrast: true,
      focusManagement: true
    },
    languages: ['en', 'th'],
    events: {
      submit: '{ email: string }',
      backToLogin: 'void'
    }
  },
  {
    id: 'auth-reset-password-form',
    name: 'ResetPasswordForm',
    description: 'Password reset form with new password and confirmation fields',
    category: 'auth',
    tags: ['authentication', 'form', 'password', 'reset'],
    version: '1.0.0',
    status: 'stable',
    examples: [
      {
        title: 'Basic Usage',
        code: `<AuthResetPasswordForm 
  @submit="handleResetPassword"
  @back-to-login="goToLogin"
/>`,
        language: 'vue'
      }
    ],
    related: ['auth-forgot-password-form', 'auth-login-form', 'auth-ui'],
    author: {
      name: 'Wrikka Team',
      email: 'team@wrikka.com'
    },
    accessibility: {
      level: 'wcag-aa',
      features: [
        'Password validation',
        'Match validation',
        'Success feedback'
      ],
      keyboardNavigation: true,
      screenReaderSupport: true,
      ariaLabels: true,
      colorContrast: true,
      focusManagement: true
    },
    languages: ['en', 'th'],
    events: {
      submit: '{ password: string }',
      backToLogin: 'void'
    }
  },
  {
    id: 'auth-consent-form',
    name: 'ConsentForm',
    description: 'OAuth consent screen for requesting user permissions',
    category: 'auth',
    tags: ['authentication', 'oauth', 'consent', 'permissions'],
    version: '1.0.0',
    status: 'stable',
    examples: [
      {
        title: 'Basic Usage',
        code: `<AuthConsentForm 
  app-name="My App"
  app-description="This app needs access"
  :scopes="scopes"
  @submit="handleConsent"
  @cancel="handleCancel"
/>`,
        language: 'vue'
      }
    ],
    related: ['auth-oauth-callback', 'auth-ui'],
    author: {
      name: 'Wrikka Team',
      email: 'team@wrikka.com'
    },
    accessibility: {
      level: 'wcag-aa',
      features: [
        'Scope descriptions',
        'Required indicators',
        'Clear actions'
      ],
      keyboardNavigation: true,
      screenReaderSupport: true,
      ariaLabels: true,
      colorContrast: true,
      focusManagement: true
    },
    languages: ['en', 'th'],
    props: {
      appName: { type: 'string', default: 'Application' },
      appDescription: { type: 'string', required: false },
      scopes: { type: 'array', required: true }
    },
    events: {
      submit: '{ scopes: string[] }',
      cancel: 'void'
    }
  },
  {
    id: 'auth-access-denied',
    name: 'AccessDenied',
    description: 'Error page displayed when user lacks permission (403 Forbidden)',
    category: 'auth',
    tags: ['authentication', 'error', '403', 'forbidden', 'access'],
    version: '1.0.0',
    status: 'stable',
    examples: [
      {
        title: 'Basic Usage',
        code: `<AuthAccessDenied 
  title="Access Denied"
  message="You don't have permission"
  reason="Your account is not authorized"
  @back-to-home="goHome"
  @contact-support="openSupport"
/>`,
        language: 'vue'
      }
    ],
    related: ['auth-login-form', 'auth-ui'],
    author: {
      name: 'Wrikka Team',
      email: 'team@wrikka.com'
    },
    accessibility: {
      level: 'wcag-aa',
      features: [
        'Clear error messaging',
        'Action suggestions',
        'Contact options'
      ],
      keyboardNavigation: true,
      screenReaderSupport: true,
      ariaLabels: true,
      colorContrast: true,
      focusManagement: true
    },
    languages: ['en', 'th'],
    props: {
      title: { type: 'string', default: 'Access Denied' },
      message: { type: 'string', required: false },
      reason: { type: 'string', required: false },
      showContactSupport: { type: 'boolean', default: true },
      showBackButton: { type: 'boolean', default: true }
    },
    events: {
      backToHome: 'void',
      contactSupport: 'void'
    }
  },
  {
    id: 'auth-two-factor-auth',
    name: 'TwoFactorAuth',
    description: 'Two-factor authentication form with 6-digit code input',
    category: 'auth',
    tags: ['authentication', '2fa', 'security', 'otp'],
    version: '1.0.0',
    status: 'stable',
    examples: [
      {
        title: 'Basic Usage',
        code: `<AuthTwoFactorAuth 
  @submit="handleVerifyCode"
  @resend-code="handleResend"
  @back-to-login="goToLogin"
/>`,
        language: 'vue'
      }
    ],
    related: ['auth-login-form', 'auth-ui'],
    author: {
      name: 'Wrikka Team',
      email: 'team@wrikka.com'
    },
    accessibility: {
      level: 'wcag-aa',
      features: [
        'Auto-focus management',
        'Paste support',
        'Keyboard navigation',
        'Auto-submit on complete'
      ],
      keyboardNavigation: true,
      screenReaderSupport: true,
      ariaLabels: true,
      colorContrast: true,
      focusManagement: true
    },
    languages: ['en', 'th'],
    events: {
      submit: '{ code: string }',
      resendCode: 'void',
      backToLogin: 'void'
    }
  },
  {
    id: 'auth-oauth-callback',
    name: 'OAuthCallback',
    description: 'OAuth callback handler with loading, success, and error states',
    category: 'auth',
    tags: ['authentication', 'oauth', 'callback', 'social-login'],
    version: '1.0.0',
    status: 'stable',
    examples: [
      {
        title: 'Basic Usage',
        code: `<AuthOAuthCallback 
  provider="Google"
  status="loading"
  @retry="handleRetry"
  @back-to-login="goToLogin"
/>`,
        language: 'vue'
      }
    ],
    related: ['auth-consent-form', 'auth-login-form', 'auth-ui'],
    author: {
      name: 'Wrikka Team',
      email: 'team@wrikka.com'
    },
    accessibility: {
      level: 'wcag-aa',
      features: [
        'Loading indicators',
        'Success feedback',
        'Error recovery'
      ],
      keyboardNavigation: true,
      screenReaderSupport: true,
      ariaLabels: true,
      colorContrast: true,
      focusManagement: true
    },
    languages: ['en', 'th'],
    props: {
      provider: { type: 'string', default: 'OAuth' },
      status: { type: 'string', default: 'loading' },
      errorMessage: { type: 'string', required: false }
    },
    events: {
      retry: 'void',
      backToLogin: 'void'
    }
  },
  {
    id: 'auth-email-verification',
    name: 'EmailVerification',
    description: 'Email verification page with pending, verified, and expired states',
    category: 'auth',
    tags: ['authentication', 'email', 'verification', 'confirmation'],
    version: '1.0.0',
    status: 'stable',
    examples: [
      {
        title: 'Basic Usage',
        code: `<AuthEmailVerification 
  email="user@example.com"
  status="pending"
  @resend-email="handleResend"
  @back-to-login="goToLogin"
  @continue="goToDashboard"
/>`,
        language: 'vue'
      }
    ],
    related: ['auth-signup-form', 'auth-ui'],
    author: {
      name: 'Wrikka Team',
      email: 'team@wrikka.com'
    },
    accessibility: {
      level: 'wcag-aa',
      features: [
        'Status feedback',
        'Resend functionality',
        'Clear instructions'
      ],
      keyboardNavigation: true,
      screenReaderSupport: true,
      ariaLabels: true,
      colorContrast: true,
      focusManagement: true
    },
    languages: ['en', 'th'],
    props: {
      email: { type: 'string', required: false },
      status: { type: 'string', default: 'pending' }
    },
    events: {
      resendEmail: 'void',
      backToLogin: 'void',
      continue: 'void'
    }
  },
  {
    id: 'auth-ui',
    name: 'AuthUI',
    description: 'Complete authentication UI system with all auth flows integrated',
    category: 'auth',
    tags: ['authentication', 'ui', 'complete', 'all-in-one'],
    version: '1.0.0',
    status: 'stable',
    examples: [
      {
        title: 'Basic Usage',
        description: 'Complete auth system with all features',
        code: `<AuthUI 
  initial-view="login"
  :show-social-login="true"
  @login="handleLogin"
  @signup="handleSignup"
  @social-login="handleSocialLogin"
/>`,
        language: 'vue'
      }
    ],
    related: [
      'auth-login-form',
      'auth-signup-form',
      'auth-forgot-password-form',
      'auth-reset-password-form',
      'auth-consent-form'
    ],
    author: {
      name: 'Wrikka Team',
      email: 'team@wrikka.com'
    },
    accessibility: {
      level: 'wcag-aa',
      features: [
        'Complete auth flow',
        'Social login integration',
        'View switching',
        'All sub-components accessible'
      ],
      keyboardNavigation: true,
      screenReaderSupport: true,
      ariaLabels: true,
      colorContrast: true,
      focusManagement: true
    },
    languages: ['en', 'th'],
    props: {
      initialView: { type: 'string', default: 'login' },
      showSocialLogin: { type: 'boolean', default: true }
    },
    events: {
      login: '{ email: string, password: string, rememberMe: boolean }',
      signup: '{ email: string, password: string, name: string }',
      forgotPassword: '{ email: string }',
      resetPassword: '{ password: string, token: string }',
      consent: '{ scopes: string[] }',
      socialLogin: 'google | github | facebook'
    }
  }
]
