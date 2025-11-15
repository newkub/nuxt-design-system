import { defineNuxtModule, createResolver, addImportsDir, addComponent } from '@nuxt/kit'

export interface ModuleOptions {
  /**
   * Directory where content files are located
   * @default 'content'
   */
  contentDir?: string
  
  /**
   * Whether to watch content directory for changes
   * @default true
   */
  watch?: boolean
  
  /**
   * API route for content
   * @default '/api/content'
   */
  apiRoute?: string
  
  /**
   * Path prefix for content
   * @default '/docs'
   */
  contentPathPrefix?: string
  
  /**
   * Content types configuration
   * @default { docs: 'docs', blog: 'blog' }
   */
  contentTypes?: Record<string, string>
  
  /**
   * Default content type
   * @default 'docs'
   */
  defaultType?: string
  
  /**
   * Default title for content pages
   * @default 'Documentation'
   */
  defaultTitle?: string
  
  /**
   * Default description for content pages
   * @default 'Documentation site'
   */
  defaultDescription?: string
  
  /**
   * Blog index configuration
   */
  blogIndex?: {
    /**
     * Whether to enable special blog index handling
     * @default true
     */
    enabled?: boolean
    
    /**
     * Default blog title
     * @default 'Blog'
     */
    defaultTitle?: string
    
    /**
     * Sort field for blog posts
     * @default 'date'
     */
    sortField?: string
    
    /**
     * Sort direction for blog posts
     * @default 'desc'
     */
    sortDirection?: 'asc' | 'desc'
  }
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'content',
    configKey: 'content',
    compatibility: {
      nuxt: '^3.0.0 || ^4.0.0'
    }
  },
  defaults: {
    contentDir: 'content',
    watch: true,
    apiRoute: '/api/content',
    contentPathPrefix: '/docs',
    defaultType: 'docs',
    defaultTitle: 'Documentation',
    defaultDescription: 'Documentation site',
    contentTypes: {
      docs: 'docs',
      blog: 'blog'
    },
    blogIndex: {
      enabled: true,
      defaultTitle: 'Blog',
      sortField: 'date',
      sortDirection: 'desc'
    }
  },
  async setup(options, nuxt) {
    const { resolve } = createResolver(import.meta.url)
    
    // Add composables
    addImportsDir(resolve('./runtime/composables'))
    
    // Add components
    addComponent({
      name: 'Content',
      filePath: resolve('./runtime/components/Content.vue')
    })
    
    // Add server API routes
    nuxt.hook('nitro:config', (nitroConfig) => {
      nitroConfig.handlers = nitroConfig.handlers || []
      // Register the content API route correctly
      nitroConfig.handlers.push({
        route: options.apiRoute || '/api/content',
        handler: resolve('./runtime/server/api/content.get')
      })
    })
    
    // Watch content directory for changes
    if (options.watch) {
      nuxt.hook('builder:watch', async (event, path) => {
        if (path.startsWith(options.contentDir || 'content')) {
          // Trigger reload when content changes
          await nuxt.callHook('builder:generateApp')
        }
      })
    }
    
    // Pass options to runtime
    nuxt.options.runtimeConfig = nuxt.options.runtimeConfig || {}
    nuxt.options.runtimeConfig.content = {
      contentDir: options.contentDir || 'content',
      apiRoute: options.apiRoute || '/api/content',
      contentPathPrefix: options.contentPathPrefix || '/docs',
      defaultType: options.defaultType || 'docs',
      defaultTitle: options.defaultTitle || 'Documentation',
      defaultDescription: options.defaultDescription || 'Documentation site',
      contentTypes: options.contentTypes || {
        docs: 'docs',
        blog: 'blog'
      },
      blogIndex: options.blogIndex || {
        enabled: true,
        defaultTitle: 'Blog',
        sortField: 'date',
        sortDirection: 'desc'
      }
    }
    
    nuxt.options.runtimeConfig.public = nuxt.options.runtimeConfig.public || {}
    nuxt.options.runtimeConfig.public.content = {
      apiRoute: options.apiRoute || '/api/content',
      contentPathPrefix: options.contentPathPrefix || '/docs',
      defaultType: options.defaultType || 'docs',
      defaultTitle: options.defaultTitle || 'Documentation',
      defaultDescription: options.defaultDescription || 'Documentation site',
      contentTypes: options.contentTypes || {
        docs: 'docs',
        blog: 'blog'
      },
      blogIndex: options.blogIndex || {
        enabled: true,
        defaultTitle: 'Blog',
        sortField: 'date',
        sortDirection: 'desc'
      }
    }
  }
})