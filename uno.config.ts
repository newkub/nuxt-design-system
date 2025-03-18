import { defineConfig, presetAttributify, presetIcons } from 'unocss'

export default defineConfig({
  presets: [    
    presetAttributify(),
    presetIcons({
      scale: 1.2,
      warn: true,
    }),
  ],
  shortcuts: [
    // Add your shortcuts here
  ],
  rules: [
    // Add your custom rules here
  ],
  theme: {
    colors: {
      // Light theme colors
      light: {
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
        secondary: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
        },
        success: '#22c55e',
        warning: '#f59e0b',
        error: '#ef4444',
        info: '#3b82f6',
      },
      // Dark theme colors
      dark: {
        primary: {
          50: '#0c4a6e',
          100: '#075985',
          200: '#0369a1',
          300: '#0284c7',
          400: '#0ea5e9',
          500: '#38bdf8',
          600: '#7dd3fc',
          700: '#bae6fd',
          800: '#e0f2fe',
          900: '#f0f9ff',
        },
        secondary: {
          50: '#0f172a',
          100: '#1e293b',
          200: '#334155',
          300: '#475569',
          400: '#64748b',
          500: '#94a3b8',
          600: '#cbd5e1',
          700: '#e2e8f0',
          800: '#f1f5f9',
          900: '#f8fafc',
        },
        success: '#15803d',
        warning: '#b45309',
        error: '#b91c1c',
        info: '#1d4ed8',
      },
    },
  },
})
