import { ref, computed } from 'vue'

export interface ConsoleMessage {
  id: string
  type: 'log' | 'error' | 'warn' | 'info'
  message: string
  timestamp: Date
  stack?: string
}

export interface NetworkRequest {
  id: string
  method: string
  url: string
  status: number
  statusText: string
  duration: number
  timestamp: Date
  headers: Record<string, string>
  response?: any
}

export interface PerformanceMetric {
  name: string
  value: number
  unit: string
  timestamp: Date
}

export const useDeveloperTools = () => {
  const consoleMessages = ref<ConsoleMessage[]>([])
  const networkRequests = ref<NetworkRequest[]>([])
  const performanceMetrics = ref<PerformanceMetric[]>([])
  const isRecording = ref(false)

  const addConsoleMessage = (type: ConsoleMessage['type'], message: string, stack?: string) => {
    consoleMessages.value.push({
      id: `msg-${Date.now()}-${Math.random()}`,
      type,
      message,
      timestamp: new Date(),
      stack
    })
  }

  const addNetworkRequest = (request: Omit<NetworkRequest, 'id' | 'timestamp'>) => {
    networkRequests.value.push({
      ...request,
      id: `req-${Date.now()}-${Math.random()}`,
      timestamp: new Date()
    })
  }

  const addPerformanceMetric = (metric: Omit<PerformanceMetric, 'timestamp'>) => {
    performanceMetrics.value.push({
      ...metric,
      timestamp: new Date()
    })
  }

  const clearConsole = () => {
    consoleMessages.value = []
  }

  const clearNetwork = () => {
    networkRequests.value = []
  }

  const clearPerformance = () => {
    performanceMetrics.value = []
  }

  const filteredConsoleMessages = (filter?: ConsoleMessage['type']) => {
    if (!filter) return consoleMessages.value
    return consoleMessages.value.filter(msg => msg.type === filter)
  }

  const filteredNetworkRequests = (method?: string) => {
    if (!method) return networkRequests.value
    return networkRequests.value.filter(req => req.method === method)
  }

  return {
    consoleMessages,
    networkRequests,
    performanceMetrics,
    isRecording,
    addConsoleMessage,
    addNetworkRequest,
    addPerformanceMetric,
    clearConsole,
    clearNetwork,
    clearPerformance,
    filteredConsoleMessages,
    filteredNetworkRequests
  }
}
