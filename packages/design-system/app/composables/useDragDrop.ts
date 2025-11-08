import { ref } from 'vue'

export const useDragDrop = <T>() => {
  const draggedItem = ref<T | null>(null)
  const draggedIndex = ref<number>(-1)
  const dropZoneActive = ref(false)

  const onDragStart = (item: T, index: number) => {
    draggedItem.value = item
    draggedIndex.value = index
  }

  const onDragOver = (event: DragEvent) => {
    event.preventDefault()
    dropZoneActive.value = true
  }

  const onDragLeave = () => {
    dropZoneActive.value = false
  }

  const onDrop = (targetIndex: number, items: T[]) => {
    dropZoneActive.value = false
    
    if (draggedIndex.value === -1 || draggedIndex.value === targetIndex) {
      return items
    }

    const newItems = [...items]
    const [removed] = newItems.splice(draggedIndex.value, 1)
    newItems.splice(targetIndex, 0, removed)
    
    draggedItem.value = null
    draggedIndex.value = -1
    
    return newItems
  }

  const onDragEnd = () => {
    draggedItem.value = null
    draggedIndex.value = -1
    dropZoneActive.value = false
  }

  return {
    draggedItem,
    draggedIndex,
    dropZoneActive,
    onDragStart,
    onDragOver,
    onDragLeave,
    onDrop,
    onDragEnd
  }
}
