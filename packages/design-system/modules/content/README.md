# Content Module

A Nuxt module for managing content with markdown support.

## Features

- Markdown content loading
- Dynamic routing for content pages
- SEO metadata generation
- Blog index page with post listing
- Configurable content types
- Automatic layout handling

## Installation

```bash
npm install @docs2/content
```

## Configuration

Add the module to your `nuxt.config.ts`:

```ts
export default defineNuxtConfig({
  modules: [
    '@docs2/content'
  ],
  content: {
    // Directory where your markdown files are located
    contentDir: 'content',
    // Watch content directory for changes
    watch: true,
    // API route for content
    apiRoute: '/api/content',
    // Path prefix for content
    contentPathPrefix: '/docs',
    // Default content type
    defaultType: 'docs',
    // Default title for content pages
    defaultTitle: 'Documentation',
    // Default description for content pages
    defaultDescription: 'Documentation site',
    // Content types configuration
    contentTypes: {
      docs: 'docs',
      blog: 'blog'
    },
    // Blog index configuration
    blogIndex: {
      enabled: true,
      defaultTitle: 'Blog',
      sortField: 'date',
      sortDirection: 'desc'
    }
  }
})
```

## Usage

### Content Components

Use the `Content` component to display content:

```vue
<template>
  <Content path="/getting-started" type="docs" />
</template>
```

### Composables

The module provides the `queryContent` composable for programmatic access:

```ts
const { data: content } = await useAsyncData('content', () => 
  queryContent('/getting-started').findOne()
)
```

## Directory Structure

```
content/
  docs/
    index.md
    getting-started.md
    configuration.md
  blog/
    index.md
    first-post.md
    second-post.md
```

## Frontmatter

Content files support frontmatter for metadata:

```md
---
title: Getting Started
description: Learn how to get started with the documentation site
layout: docs
---

# Getting Started

Content goes here...
```

## Blog Posts

Blog posts support additional frontmatter fields:

```md
---
title: My Blog Post
date: 2023-06-15
readTime: 5 min read
tags:
  - Documentation
  - Nuxt 3
layout: blog
---

# My Blog Post

Content goes here...
```