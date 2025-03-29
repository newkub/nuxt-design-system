// uno.config.ts
import { defineConfig, presetIcons, presetWebFonts, presetWind4 } from 'unocss'

export default defineConfig({
  presets: [
    presetWind4(),
    presetIcons({
      scale: 1.2,
      collections: {
        // Add icon collections here if needed
      },
      extraProperties: {
        'display': 'inline-block',
        'vertical-align': 'middle',
      },
    }),
    presetWebFonts({
      provider: 'google',
      fonts: {
        sans: 'Inter:400,500,600,700',
        mono: 'JetBrains Mono:400,500'
      }
    })
  ],
  shortcuts: [
    ['btn', 'px-4 py-2 rounded-md font-medium transition-colors'],
    ['btn-primary', 'btn bg-indigo-600 dark:bg-indigo-500 text-white hover:(bg-indigo-700 dark:bg-indigo-600)'],
    ['btn-outline', 'btn border border-gray-300 dark:border-gray-600 hover:(bg-gray-50 dark:bg-gray-800)'],
    ['input', 'w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:(outline-none ring-2 ring-indigo-500) dark:focus:ring-indigo-400 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100'],
    ['card', 'bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 text-gray-900 dark:text-gray-100']
  ],
  theme: {
    colors: {
      primary: {
        DEFAULT: 'rgb(var(--color-primary))',
        light: 'rgb(var(--color-primary-light))',
        dark: 'rgb(var(--color-primary-dark))',
      },
      secondary: {
        DEFAULT: 'rgb(var(--color-secondary))',
        light: 'rgb(var(--color-secondary-light))',
        dark: 'rgb(var(--color-secondary-dark))',
      },
    },
    breakpoints: {
      DEFAULT: '1024px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    fontFamily: {
      DEFAULT: 'Inter, sans-serif',
      heading: 'Inter, sans-serif',
      body: 'Inter, sans-serif',
    },
    spacing: {
      DEFAULT: '0.25rem',
      '2xs': '0.0625rem',
      xs: '0.125rem',
      sm: '0.1875rem',
      md: '0.25rem',
      lg: '0.375rem',
      xl: '0.5rem',
    },
    boxShadow: {
      DEFAULT: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
      sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
      md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    },
    borderRadius: {
      DEFAULT: '0.25rem',
      '2xs': '0.0625rem',
      xs: '0.125rem',
      sm: '0.1875rem',
      md: '0.375rem',
      lg: '0.5rem',
      xl: '0.75rem',
      'full': '9999px',
    },
    fontSize: {
      DEFAULT: '1rem',
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
    },
    lineHeight: {
      DEFAULT: '1.5',
      none: '1',
      tight: '1.25',
      snug: '1.375',
      normal: '1.5',
      relaxed: '1.625',
      loose: '2',
    },
  },
})
