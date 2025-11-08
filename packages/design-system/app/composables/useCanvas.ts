import { ref } from 'vue'

export type Tool = 'select' | 'pen' | 'rectangle' | 'circle' | 'line' | 'text' | 'eraser' | 'hand'

export interface Shape {
  id: string
  type: 'rectangle' | 'circle' | 'line' | 'text' | 'path'
  x: number
  y: number
  width?: number
  height?: number
  x2?: number
  y2?: number
  text?: string
  points?: Array<{ x: number; y: number }>
  fill?: string
  stroke?: string
  strokeWidth?: number
  selected?: boolean
}

export const useCanvas = () => {
  const tool = ref<Tool>('select')
  const shapes = ref<Shape[]>([])
  const selectedShapeIds = ref<Set<string>>(new Set())
  const history = ref<Shape[][]>([])
  const historyStep = ref(0)
  const color = ref('#000000')
  const fillColor = ref('transparent')
  const strokeWidth = ref(2)
  const zoom = ref(1)
  const pan = ref({ x: 0, y: 0 })

  const addShape = (shape: Shape) => {
    shapes.value.push(shape)
    saveHistory()
  }

  const removeShape = (id: string) => {
    shapes.value = shapes.value.filter(s => s.id !== id)
    saveHistory()
  }

  const updateShape = (id: string, updates: Partial<Shape>) => {
    const shape = shapes.value.find(s => s.id === id)
    if (shape) {
      Object.assign(shape, updates)
    }
  }

  const selectShape = (id: string, multi = false) => {
    if (multi) {
      if (selectedShapeIds.value.has(id)) {
        selectedShapeIds.value.delete(id)
      } else {
        selectedShapeIds.value.add(id)
      }
    } else {
      selectedShapeIds.value.clear()
      selectedShapeIds.value.add(id)
    }
  }

  const clearSelection = () => {
    selectedShapeIds.value.clear()
  }

  const deleteSelected = () => {
    shapes.value = shapes.value.filter(s => !selectedShapeIds.value.has(s.id))
    selectedShapeIds.value.clear()
    saveHistory()
  }

  const saveHistory = () => {
    history.value = history.value.slice(0, historyStep.value + 1)
    history.value.push(JSON.parse(JSON.stringify(shapes.value)))
    historyStep.value++
  }

  const undo = () => {
    if (historyStep.value > 0) {
      historyStep.value--
      shapes.value = JSON.parse(JSON.stringify(history.value[historyStep.value]))
    }
  }

  const redo = () => {
    if (historyStep.value < history.value.length - 1) {
      historyStep.value++
      shapes.value = JSON.parse(JSON.stringify(history.value[historyStep.value]))
    }
  }

  const exportToJSON = () => {
    return JSON.stringify(shapes.value, null, 2)
  }

  const importFromJSON = (json: string) => {
    try {
      shapes.value = JSON.parse(json)
      saveHistory()
    } catch (e) {
      console.error('Failed to import:', e)
    }
  }

  const clear = () => {
    shapes.value = []
    selectedShapeIds.value.clear()
    saveHistory()
  }

  return {
    tool,
    shapes,
    selectedShapeIds,
    color,
    fillColor,
    strokeWidth,
    zoom,
    pan,
    addShape,
    removeShape,
    updateShape,
    selectShape,
    clearSelection,
    deleteSelected,
    undo,
    redo,
    exportToJSON,
    importFromJSON,
    clear
  }
}
