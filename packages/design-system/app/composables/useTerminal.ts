import { ref, computed } from 'vue'

export interface TerminalSession {
  id: string
  name: string
  history: string[]
  currentDirectory: string
}

export interface TerminalProfile {
  name: string
  bg: string
  text: string
  prompt: string
}

export const useTerminal = () => {
  const sessions = ref<TerminalSession[]>([
    {
      id: '1',
      name: 'bash',
      history: ['Welcome to the terminal!', ''],
      currentDirectory: '~'
    }
  ])

  const activeSessionId = ref('1')
  const currentCommand = ref('')

  const profiles: TerminalProfile[] = [
    { name: 'dark', bg: 'bg-gray-900', text: 'text-green-400', prompt: 'text-blue-400' },
    { name: 'light', bg: 'bg-gray-50', text: 'text-gray-900', prompt: 'text-blue-600' },
    { name: 'dracula', bg: 'bg-[#282a36]', text: 'text-[#f8f8f2]', prompt: 'text-[#ff79c6]' }
  ]

  const currentProfile = ref(profiles[0])

  const activeSession = computed(() => {
    return sessions.value.find(s => s.id === activeSessionId.value) || sessions.value[0]
  })

  const handleCommand = () => {
    if (!currentCommand.value.trim()) return

    const cmd = currentCommand.value.trim()
    const session = activeSession.value

    // Add command to history
    session.history.push(`$ ${cmd}`)

    // Process command
    if (cmd === 'clear') {
      session.history = []
    } else if (cmd === 'help') {
      session.history.push('Available commands: help, clear, echo, date, pwd, ls')
    } else if (cmd.startsWith('echo ')) {
      session.history.push(cmd.substring(5))
    } else if (cmd === 'date') {
      session.history.push(new Date().toString())
    } else if (cmd === 'pwd') {
      session.history.push(session.currentDirectory)
    } else if (cmd === 'ls') {
      session.history.push('file1.txt  file2.js  folder1/  folder2/')
    } else {
      session.history.push(`bash: ${cmd}: command not found`)
    }

    session.history.push('')
    currentCommand.value = ''
  }

  const handleKeydown = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCommand()
    }
  }

  const createNewSession = () => {
    const newId = String(Date.now())
    sessions.value.push({
      id: newId,
      name: `bash-${sessions.value.length + 1}`,
      history: ['Welcome to the terminal!', ''],
      currentDirectory: '~'
    })
    activeSessionId.value = newId
  }

  const closeSession = (sessionId: string) => {
    if (sessions.value.length <= 1) return
    
    const index = sessions.value.findIndex(s => s.id === sessionId)
    sessions.value.splice(index, 1)
    
    if (activeSessionId.value === sessionId) {
      activeSessionId.value = sessions.value[0].id
    }
  }

  const copyAll = () => {
    const text = activeSession.value.history.join('\n')
    navigator.clipboard.writeText(text)
  }

  const copySelection = () => {
    const selection = window.getSelection()?.toString()
    if (selection) {
      navigator.clipboard.writeText(selection)
    }
  }

  return {
    sessions,
    activeSessionId,
    currentCommand,
    currentProfile,
    profiles,
    activeSession,
    handleCommand,
    handleKeydown,
    createNewSession,
    closeSession,
    copyAll,
    copySelection
  }
}
