---
title: API Reference
description: Detailed documentation for all available features and components
layout: docs
---

# API Reference

This section provides detailed documentation for all available features and components in the documentation site.

> **Looking for a visual overview of all components?** Check out our [Components page](/components) for a complete list with descriptions and links to detailed documentation.

## Components

### Alert

A component for displaying alerts with different types.

```vue
<template>
  <Alert type="info">
    This is an informational alert.
  </Alert>
</template>
```

Props:
- `type` (String) - The type of alert (info, success, warning, error)

### CodeBlock

A component for displaying code with syntax highlighting.

```vue
<template>
  <CodeBlock language="javascript">
    console.log('Hello, world!');
  </CodeBlock>
</template>
```

Props:
- `language` (String) - The programming language for syntax highlighting

### FeatureCard

A component for displaying features in a card format.

```vue
<template>
  <FeatureCard 
    title="Fast and Lightweight" 
    description="Optimized for performance with minimal JavaScript."
  >
    <template #icon>
      <Icon name="mdi:lightning-bolt" />
    </template>
  </FeatureCard>
</template>
```

Props:
- `title` (String) - The title of the feature
- `description` (String) - The description of the feature

### Nav

The navigation component used in the header and sidebar.

```vue
<template>
  <Nav />
</template>
```

Props:
- `mobile` (Boolean) - Whether to display the mobile version
- `docs` (Boolean) - Whether to display documentation navigation

### Search

A search component for finding content.

```vue
<template>
  <Search />
</template>
```

### TableOfContents

A component for displaying a table of contents.

```vue
<template>
  <TableOfContents :items="tocItems" />
</template>
```

Props:
- `items` (Array) - The table of contents items

### ThemeToggle

A component for toggling between light and dark themes.

```vue
<template>
  <ThemeToggle />
</template>
```

## Composables

### useSearch

A composable for implementing search functionality.

```ts
const { search, results } = useSearch()
```

Returns:
- `search` (Function) - Function to perform a search
- `results` (Ref) - Reactive reference to search results

## Configuration

### Nuxt Configuration

Key configuration options in `nuxt.config.ts`:

```ts
export default defineNuxtConfig({
  modules: [
    '@nuxt/content',
    '@unocss/nuxt'
  ],
  content: {
    // Content module configuration
  },
  unocss: {
    // UnoCSS configuration
  }
})
```

### Content Configuration

Options for configuring the content module:

```ts
export default defineNuxtConfig({
  content: {
    markdown: {
      // Markdown processing options
    },
    highlight: {
      // Syntax highlighting options
    }
  }
})
```

## Markdown Features

### Frontmatter

Use frontmatter to configure page metadata:

```md
---
title: Page Title
description: Page description
layout: docs
---
```

### Code Blocks

Use code blocks with syntax highlighting:

```javascript
function hello() {
  console.log('Hello, world!')
}
```

### Custom Containers

Use custom containers for notes, warnings, and tips:

:::info
This is an informational note.
:::

:::warning
This is a warning.
:::

:::danger
This is a danger note.
:::

### Links

Create links to other pages:

[Getting Started](/docs/getting-started)

### Images

Add images to your documentation:

![Alt text](/path/to/image.png)

## CSS Classes

The site uses UnoCSS for styling. You can use any UnoCSS classes in your Markdown files.

### Layout Classes

- `flex` - Create flexible layouts
- `grid` - Create grid layouts
- `container` - Center content with a max-width

### Typography Classes

- `text-lg` - Large text
- `font-bold` - Bold text
- `text-center` - Centered text

### Spacing Classes

- `p-4` - Padding on all sides
- `m-2` - Margin on all sides
- `space-y-4` - Vertical spacing between children

### Color Classes

- `text-blue-500` - Blue text
- `bg-gray-100` - Light gray background
- `border-red-500` - Red border

## Deployment

### Environment Variables

Use environment variables for configuration:

```env
NUXT_PUBLIC_SITE_URL=https://example.com
```

Access in components:

```ts
const siteUrl = process.env.NUXT_PUBLIC_SITE_URL
```

### Build Commands

- `npm run build` - Build for production
- `npm run generate` - Generate static site
- `npm run dev` - Start development server

## Troubleshooting

### Common Issues

1. **Page not found**: Check that the file path matches the URL
2. **Styling issues**: Verify UnoCSS classes are correctly applied
3. **Content not loading**: Check the content directory structure

### Debugging

1. Check the browser console for errors
2. Verify configuration files for syntax errors
3. Ensure all dependencies are installed correctly