/**
 * UI Components Index
 * Auto-import ใน Nuxt 4 จะทำงานอัตโนมัติ
 * ไฟล์นี้ใช้สำหรับ export แบบ manual เท่านั้น (ถ้าจำเป็น)
 */

// Base Components
export { default as Button } from "./Button.vue";
export { default as Input } from "./Input.vue";
export { default as Textarea } from "./Textarea.vue";
export { default as Label } from "./Label.vue";
export { default as Checkbox } from "./Checkbox.vue";
export { default as Switch } from "./Switch.vue";
export { default as Badge } from "./Badge.vue";
export { default as Alert } from "./Alert.vue";

// Card Components
export { default as Card } from "./Card.vue";
export { default as CardContent } from "./CardContent.vue";
export { default as CardDescription } from "./CardDescription.vue";
export { default as CardFooter } from "./CardFooter.vue";
export { default as CardHeader } from "./CardHeader.vue";
export { default as CardTitle } from "./CardTitle.vue";
export { default as CardProject } from "./CardProject.vue";

// Layout Components
export { default as Separator } from "./Separator.vue";
export { default as Scroll } from "./Scroll.vue";
export { default as Skeleton } from "./Skeleton.vue";
export { default as Progress } from "./Progress.vue";

// Overlay Components
export { default as Modal } from "./Modal.vue";
export { default as Toast } from "./Toast.vue";
export { default as Tooltip } from "./Tooltip.vue";
export { default as Popover } from "./Popover.vue";

// Navigation Components
export { default as Tabs } from "./Tabs.vue";
export { default as VerticalTabs } from "./VerticalTabs.vue";
export { default as Accordion } from "./Accordion.vue";
export { default as Breadcrumb } from "./Breadcrumb.vue";
export { default as Navbar } from "./Navbar.vue";
export { default as NavItem } from "./NavItem.vue";

// Menu Components
export { default as MenuContext } from "./MenuContext.vue";
export { default as MenuDropdown } from "./MenuDropdown.vue";
export { default as MenuItems } from "./MenuItems.vue";

// Complex Components
export { default as Table } from "./Table.vue";
export { default as DataTable } from "./DataTable.vue";
export { default as CommandPalette } from "./CommandPalette.vue";
export { default as FileStructure } from "./FileStructure.vue";
export { default as DraggableTabs } from "./DraggableTabs.vue";

// Editor Components
export { default as MarkdownEditor } from "./MarkdownEditor.vue";
export { default as MarkdownRender } from "./MarkdownRender.vue";
export { default as TextEditor } from "./TextEditor.vue";

// Specialized Components
export { default as Toc } from "./Toc.vue";
export { default as Search } from "./Search.vue";
export { default as SearchInput } from "./SearchInput.vue";
export { default as Avatar } from "./Avatar.vue";
export { default as Logo } from "./Logo.vue";
export { default as Link } from "./Link.vue";

// Re-export compound components from Select and Dialog
export * from "./Select.vue";
export * from "./Dialog.vue";

// Re-export types
export type { TocItem, MenuItem } from "~/shared/types/ui";
