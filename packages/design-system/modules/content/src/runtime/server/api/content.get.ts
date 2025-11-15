import { defineEventHandler, getQuery } from 'h3'
import { readFileSync, readdirSync, existsSync } from 'node:fs'
import { join, extname, basename } from 'node:path'

// Simple markdown parser
const parseMarkdown = (content: string) => {
  const lines = content.split('\n')
  const frontmatter: Record<string, any> = {}
  const bodyLines: string[] = []
  
  let inFrontmatter = false
  let frontmatterLines: string[] = []
  
  // Parse frontmatter
  for (const line of lines) {
    if (line.trim() === '---' && !inFrontmatter) {
      inFrontmatter = true
      continue
    }
    
    if (line.trim() === '---' && inFrontmatter) {
      inFrontmatter = false
      continue
    }
    
    if (inFrontmatter) {
      frontmatterLines.push(line)
    } else {
      bodyLines.push(line)
    }
  }
  
  // Parse frontmatter key-value pairs
  for (const line of frontmatterLines) {
    const [key, ...valueParts] = line.split(':')
    if (key && valueParts.length > 0) {
      const value = valueParts.join(':').trim()
      // Try to parse as JSON, otherwise keep as string
      try {
        frontmatter[key.trim()] = JSON.parse(value)
      } catch {
        frontmatter[key.trim()] = value
      }
    }
  }
  
  return {
    ...frontmatter,
    body: bodyLines.join('\n')
  }
}

// Get content directory from Nuxt options or default
const getContentDir = (event: any) => {
  // Try to get content directory from runtime config
  const runtimeConfig = event.context.nuxt?.options?.runtimeConfig || {}
  const contentDir = runtimeConfig.content?.contentDir || 'content'
  return join(process.cwd(), contentDir)
}

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  let path = (query.path as string) || ''
  
  // Handle root path
  if (path === '/') {
    path = 'index.md'
  }
  
  // Remove leading slash if present
  if (path.startsWith('/')) {
    path = path.substring(1)
  }
  
  // Add .md extension if not present and not a directory
  if (path && !path.endsWith('.md') && !extname(path)) {
    path = path + '.md'
  }
  
  const queryString = (query.query as string) || '{}'
  const sortString = (query.sort as string) || '{}'
  const limit = (query.limit as string) || ''
  const single = (query.single as string) || 'false'
  
  const contentDir = getContentDir(event)
  
  // Get content path prefix from runtime config
  const runtimeConfig = event.context.nuxt?.options?.runtimeConfig || {}
  const contentModuleConfig = runtimeConfig.content || {}
  const contentPathPrefix = contentModuleConfig.contentPathPrefix || '/docs'
  const contentTypes = contentModuleConfig.contentTypes || { docs: 'docs', blog: 'blog' }
  const defaultType = contentModuleConfig.defaultType || 'docs'
  const blogIndexConfig = contentModuleConfig.blogIndex || { 
    enabled: true, 
    sortField: 'date', 
    sortDirection: 'desc' 
  }
  
  // Use configured default type
  const effectiveContentType = (query.type as string) || defaultType
  
  // Determine the content directory based on type
  const contentSubDir = contentTypes[effectiveContentType] || effectiveContentType
  
  // Fix the path to correctly point to content/{type}
  let fullPath = join(contentDir, contentSubDir, path)
  
  try {
    // Parse query parameters
    const queryObj = JSON.parse(queryString)
    const sortObj = JSON.parse(sortString)
    
    // Special handling for blog index - list all blog posts
    if (blogIndexConfig.enabled && effectiveContentType === 'blog' && path === 'index.md') {
      // For blog index, we want to list all blog posts
      const blogDir = join(contentDir, contentSubDir)
      if (existsSync(blogDir)) {
        const files = readdirSync(blogDir)
        const contents: any[] = []
        
        for (const file of files) {
          // Skip the index.md file itself
          if (file === 'index.md') continue
          
          if (extname(file) === '.md') {
            const filePath = join(blogDir, file)
            const content = readFileSync(filePath, 'utf-8')
            const parsed = parseMarkdown(content)
            
            contents.push({
              _path: join('/', basename(file, '.md')),
              _id: basename(file, '.md'),
              ...parsed
            })
          }
        }
        
        // Sort by configured field and direction
        contents.sort((a, b) => {
          if (a[blogIndexConfig.sortField] && b[blogIndexConfig.sortField]) {
            const aVal = new Date(a[blogIndexConfig.sortField]).getTime()
            const bVal = new Date(b[blogIndexConfig.sortField]).getTime()
            const direction = blogIndexConfig.sortDirection === 'asc' ? 1 : -1
            return (aVal - bVal) * direction
          }
          return 0
        })
        
        // Return the blog index content along with the list of posts
        const indexPath = join(blogDir, 'index.md')
        if (existsSync(indexPath)) {
          const indexContent = readFileSync(indexPath, 'utf-8')
          const indexParsed = parseMarkdown(indexContent)
          
          return {
            ...indexParsed,
            posts: contents
          }
        }
        
        // If no index.md, return just the posts
        return contents
      }
    }
    
    // Handle special case for directory with index.md
    if (!extname(fullPath) && existsSync(fullPath) && !existsSync(fullPath + '.md')) {
      const indexPath = join(fullPath, 'index.md')
      if (existsSync(indexPath)) {
        // Return index.md content when requesting a directory
        const content = readFileSync(indexPath, 'utf-8')
        const parsed = parseMarkdown(content)
        
        return {
          _path: path,
          _id: 'index',
          ...parsed
        }
      }
    }
    
    // If path points to a file with .md extension
    if (extname(fullPath) === '.md' && existsSync(fullPath)) {
      const content = readFileSync(fullPath, 'utf-8')
      const parsed = parseMarkdown(content)
      
      return {
        _path: path,
        _id: basename(path, extname(path)),
        ...parsed
      }
    }
    
    // If path points to a file without .md extension, try adding .md
    if (!extname(fullPath) && existsSync(fullPath + '.md')) {
      const finalPath = fullPath + '.md'
      const content = readFileSync(finalPath, 'utf-8')
      const parsed = parseMarkdown(content)
      
      return {
        _path: path,
        _id: basename(path, extname(path)),
        ...parsed
      }
    }
    
    // If path points to a directory
    if (existsSync(fullPath) && !extname(fullPath)) {
      const files = readdirSync(fullPath)
      const contents: any[] = []
      
      for (const file of files) {
        if (extname(file) === '.md') {
          const filePath = join(fullPath, file)
          const content = readFileSync(filePath, 'utf-8')
          const parsed = parseMarkdown(content)
          
          contents.push({
            _path: join(path, basename(file, '.md')),
            _id: basename(file, '.md'),
            ...parsed
          })
        }
      }
      
      // Apply query filters
      let filteredContents = contents.filter(item => {
        for (const [key, value] of Object.entries(queryObj)) {
          if (item[key] !== value) {
            return false
          }
        }
        return true
      })
      
      // Apply sorting
      if (Object.keys(sortObj).length > 0) {
        filteredContents.sort((a, b) => {
          for (const [key, direction] of Object.entries(sortObj)) {
            const aVal = a[key]
            const bVal = b[key]
            
            if (aVal < bVal) return direction === 'asc' ? -1 : 1
            if (aVal > bVal) return direction === 'asc' ? 1 : -1
          }
          return 0
        })
      }
      
      // Apply limit
      if (limit) {
        const limitNum = parseInt(limit)
        filteredContents = filteredContents.slice(0, limitNum)
      }
      
      // Return single item or array
      if (single === 'true') {
        return filteredContents[0] || null
      }
      
      return filteredContents
    }
    
    // If we get here, the content was not found
    return {
      error: 'Content not found',
      path: fullPath
    }
  } catch (error: any) {
    console.error('Content error:', error)
    return {
      error: 'Content not found',
      path: fullPath,
      details: error.message
    }
  }
})