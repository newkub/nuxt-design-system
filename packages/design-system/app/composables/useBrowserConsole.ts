import { tryOnScopeDispose } from '@vueuse/core'
import type { ConsoleMessage } from '~/app/types/browser'

export function useBrowserConsole() {
  const messages = ref<ConsoleMessage[]>([])

  const originalConsole = { ...console }

  const intercept = (type: ConsoleMessage['type']) => (...args: unknown[]) => {
    messages.value.push({ type, message: args, timestamp: new Date() })
    originalConsole[type](...args)
  }

  onMounted(() => {
    console.log = intercept('log')
    console.warn = intercept('warn')
    console.error = intercept('error')
    console.info = intercept('info')
  })

  tryOnScopeDispose(() => {
    Object.assign(console, originalConsole)
  })

  const clearConsole = () => {
    messages.value = []
  }

  return {
    messages,
    clearConsole,
  }
}

