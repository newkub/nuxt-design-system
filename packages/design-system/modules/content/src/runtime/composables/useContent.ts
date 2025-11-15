interface ContentConfig {
  apiRoute?: string
  contentPathPrefix?: string
}

export interface ParsedContent {
  _path: string
  _id: string
  _draft?: boolean
  _partial?: boolean
  _locale?: string
  title?: string
  description?: string
  body: any
  [key: string]: any
}

export interface QueryBuilder {
  where: (query: Record<string, any>) => QueryBuilder
  sort: (options: Record<string, any>) => QueryBuilder
  limit: (count: number) => QueryBuilder
  findOne: () => Promise<ParsedContent>
  find: () => Promise<ParsedContent[]>
}

export const queryContent = (path?: string): QueryBuilder => {
  // Get API route from runtime config or use default
  const runtimeConfig = useRuntimeConfig()
  const contentConfig = (runtimeConfig.public?.content || {}) as ContentConfig
  const baseUrl = contentConfig.apiRoute || '/api/content'
  
  const query: Record<string, any> = {}
  const sortOptions: Record<string, any> = {}
  let limitCount: number | null = null
  
  const builder: QueryBuilder = {
    where(q: Record<string, any>) {
      Object.assign(query, q)
      return builder
    },
    
    sort(options: Record<string, any>) {
      Object.assign(sortOptions, options)
      return builder
    },
    
    limit(count: number) {
      limitCount = count
      return builder
    },
    
    async findOne() {
      // Normalize path - if it ends with '/', remove it
      let normalizedPath = path || ''
      if (normalizedPath.endsWith('/')) {
        normalizedPath = normalizedPath.slice(0, -1)
      }
      
      const params = new URLSearchParams({
        path: normalizedPath,
        query: JSON.stringify(query),
        sort: JSON.stringify(sortOptions),
        limit: limitCount ? limitCount.toString() : '1',
        single: 'true'
      })
      
      const response = await fetch(`${baseUrl}?${params}`)
      return await response.json()
    },
    
    async find() {
      // Normalize path - if it ends with '/', remove it
      let normalizedPath = path || ''
      if (normalizedPath.endsWith('/')) {
        normalizedPath = normalizedPath.slice(0, -1)
      }
      
      const params = new URLSearchParams({
        path: normalizedPath,
        query: JSON.stringify(query),
        sort: JSON.stringify(sortOptions),
        limit: limitCount ? limitCount.toString() : '',
        single: 'false'
      })
      
      const response = await fetch(`${baseUrl}?${params}`)
      return await response.json()
    }
  }
  
  return builder
}

// Composable to access docs configuration
export const useDocsConfig = () => {
  // In a real implementation, this would load the docs.config.ts file
  // For now, we'll return a default configuration
  return {
    title: 'Documentation',
    description: 'Documentation site',
    lang: 'en-US',
    themeConfig: {
      sidebar: [
        { text: 'Introduction', link: '/' },
        { text: 'Getting Started', link: '/getting-started' },
        { text: 'Configuration', link: '/configuration' },
        { text: 'API Reference', link: '/api' }
      ]
    }
  }
}