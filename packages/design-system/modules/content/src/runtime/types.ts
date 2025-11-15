export interface ParsedContent {
  _path: string
  _id: string
  _draft?: boolean
  _partial?: boolean
  _locale?: string
  title?: string
  description?: string
  layout?: string
  body: any
  [key: string]: any
}

export interface ContentQuery {
  where?: Record<string, any>
  sort?: Record<string, any>
  limit?: number
}

export interface BlogIndexConfig {
  enabled?: boolean
  defaultTitle?: string
  sortField?: string
  sortDirection?: 'asc' | 'desc'
}

export interface ModuleRuntimeConfig {
  contentDir: string
  apiRoute: string
  contentPathPrefix: string
  defaultType: string
  defaultTitle: string
  defaultDescription: string
  contentTypes?: Record<string, string>
  blogIndex?: BlogIndexConfig
}

export interface ModulePublicRuntimeConfig {
  apiRoute: string
  contentPathPrefix: string
  defaultType: string
  defaultTitle: string
  defaultDescription: string
  contentTypes?: Record<string, string>
  blogIndex?: BlogIndexConfig
}