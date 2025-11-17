export interface NavItem {
  text: string
  link: string
}

export interface SidebarItem {
  text: string
  link: string
}

export interface SidebarGroup {
  text: string
  items: SidebarItem[]
}

export type Sidebar = (SidebarItem | SidebarGroup)[]

export interface DocsConfig {
  title?: string
  description?: string
  nav?: NavItem[]
  sidebar?: Record<string, Sidebar>
}

export function defineDocsConfig(config: DocsConfig): DocsConfig {
  return config
}
