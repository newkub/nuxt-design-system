---
title: Configuration
description: Advanced configuration options for your documentation site
layout: docs
---

# Configuration

This guide covers the advanced configuration options for your documentation site. These options allow you to customize various aspects of your site to better fit your needs.

## Nuxt Configuration

The main configuration file for your documentation site is `nuxt.config.ts`. This file contains all the configuration options for your Nuxt application.

### Basic Configuration

Here's a basic configuration example:

```ts
export default defineNuxtConfig({
  // App configuration
  app: {
    head: {
      title: 'My Documentation Site',
      meta: [
        { name: 'description', content: 'My awesome documentation site' }
      ]
    }
  },
  
  // Modules
  modules: [
    '@nuxt/content',
    '@unocss/nuxt'
  ],
  
  // Content module configuration
  content: {
    // Configuration options for @nuxt/content
  },
  
  // UnoCSS configuration
  unocss: {
    // Configuration options for UnoCSS
  }
})
```

## Content Module Configuration

The `@nuxt/content` module is used to manage your Markdown content. You can configure it in several ways:

### Markdown Configuration

Customize how Markdown is processed:

```ts
export default defineNuxtConfig({
  content: {
    markdown: {
      // Configure remark plugins
      remarkPlugins: [
        'remark-gfm', // GitHub Flavored Markdown
        'remark-emoji' // Emoji support
      ],
      
      // Configure rehype plugins
      rehypePlugins: [
        'rehype-highlight' // Syntax highlighting
      ]
    }
  }
})
```

### Highlight Configuration

Configure syntax highlighting:

```ts
export default defineNuxtConfig({
  content: {
    highlight: {
      theme: {
        default: 'github-light',
        dark: 'github-dark'
      },
      preload: [
        'javascript',
        'typescript',
        'vue',
        'css',
        'html'
      ]
    }
  }
})
```

## UnoCSS Configuration

UnoCSS is configured in `uno.config.ts`. Here's an example configuration:

```ts
import { defineConfig } from 'unocss'

export default defineConfig({
  // Theme customization
  theme: {
    colors: {
      primary: '#3b82f6',
      secondary: '#64748b',
      accent: '#10b981'
    },
    fontFamily: {
      sans: ['Inter', 'sans-serif'],
      mono: ['Fira Code', 'monospace']
    }
  },
  
  // Presets
  presets: [
    // Add presets here
  ],
  
  // Shortcuts
  shortcuts: {
    'btn': 'px-4 py-2 rounded-lg bg-primary text-white hover:bg-opacity-90 transition',
    'card': 'bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700'
  }
})
```

## Layout Configuration

You can customize the documentation layout by modifying the layout components in `app/layouts/`.

### Docs Layout

The docs layout is located at `app/layouts/docs.vue`. You can modify this file to change the structure of documentation pages.

### Default Layout

The default layout is located at `app/layouts/default.vue`. This layout is used for non-documentation pages.

## Adding New Components

To add new components to your documentation site:

1. Create a new Vue component in `app/components/`
2. Use the component in your Markdown files:
   ```md
   :my-component
   ```
   
   Or with props:
   ```md
   :my-component{prop="value"}
   ```

## Environment Variables

You can use environment variables in your documentation site by creating a `.env` file:

```env
NUXT_PUBLIC_SITE_URL=https://example.com
NUXT_API_KEY=your-api-key
```

Then access them in your components:

```ts
const siteUrl = process.env.NUXT_PUBLIC_SITE_URL
```

## Deployment

To deploy your documentation site, you can use various hosting providers:

### Vercel

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Vercel will automatically detect the Nuxt configuration and deploy your site

### Netlify

1. Push your code to GitHub
2. Connect your repository to Netlify
3. Set the build command to `npm run build` and the publish directory to `dist/`

### Static Hosting

To generate a static version of your site:

```bash
npm run generate
```

This will create a `dist/` directory with all the static files that you can deploy to any static hosting provider.

## Troubleshooting

If you encounter issues with your configuration:

1. Check the browser console for errors
2. Verify your configuration files for syntax errors
3. Make sure all required dependencies are installed
4. Check the Nuxt and module documentation for specific configuration options

For more help, refer to the [Nuxt documentation](https://nuxt.com/docs) and the documentation for each module you're using.