---
title: Getting Started
description: Learn how to set up and customize your documentation site
layout: docs
---

# Getting Started

This guide will help you set up and customize your documentation site. By the end of this guide, you'll have a fully functional documentation site that you can customize to your needs.

## Prerequisites

Before you begin, make sure you have the following installed:

- **Node.js** (version 16 or higher)
- **npm** or **yarn** package manager
- Basic knowledge of Vue.js and Markdown

## Installation

To get started with the documentation site, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/docs-site.git
   ```

2. Navigate to the project directory:
   ```bash
   cd docs-site
   ```

3. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

4. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open your browser and visit `http://localhost:3000` to see your site.

## Project Structure

The documentation site follows a specific structure:

```
docs-site/
├── app/                 # Nuxt application files
│   ├── components/      # Vue components
│   ├── layouts/         # Layout components
│   ├── pages/           # Page components
│   └── app.vue          # Main application file
├── content/             # Markdown content
│   └── docs/            # Documentation files
├── public/              # Static assets
└── nuxt.config.ts       # Nuxt configuration
```

## Adding New Pages

To add new documentation pages:

1. Create a new Markdown file in the `content/docs/` directory
2. Add the required frontmatter at the top of the file:
   ```markdown
   ---
   title: Page Title
   description: Page description
   layout: docs
   ---
   ```
3. Write your content in Markdown below the frontmatter

## Customization

You can customize various aspects of the documentation site:

### Theme Configuration

Modify the theme in `nuxt.config.ts`:
```ts
export default defineNuxtConfig({
  // ... other config
  app: {
    head: {
      title: 'Your Site Title',
      meta: [
        { name: 'description', content: 'Your site description' }
      ]
    }
  }
})
```

### Styling

The site uses UnoCSS for styling. You can customize the theme in `uno.config.ts`:
```ts
export default defineConfig({
  theme: {
    colors: {
      primary: '#your-primary-color',
      secondary: '#your-secondary-color'
    }
  }
})
```

## Next Steps

After setting up your site, you might want to:

1. [Configure your site](/docs/configuration) - Learn about advanced configuration options
2. [Explore the API](/docs/api) - Understand the available components and features
3. [View all components](/components) - See all available components with examples