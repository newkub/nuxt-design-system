import { useToggle } from '@vueuse/core'

export function useContextMenu() {
  const [isVisible, toggle] = useToggle(false)
  const position = ref({ x: 0, y: 0 })

  const open = (event: MouseEvent) => {
    event.preventDefault()
    position.value = { x: event.clientX, y: event.clientY }
    toggle(true)
  }

  const close = () => {
    toggle(false)
  }

  return {
    isVisible,
    position,
    open,
    close,
  }
}
