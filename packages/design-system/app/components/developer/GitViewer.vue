<script setup lang="ts">
import { ref } from 'vue'

interface Commit {
  id: string
  message: string
  author: string
  date: Date
  branch: string
  files: number
}

const commits = ref<Commit[]>([
  {
    id: 'a1b2c3d',
    message: 'feat: add new authentication system',
    author: 'John Doe',
    date: new Date('2024-01-15T10:30:00'),
    branch: 'main',
    files: 5
  },
  {
    id: 'e4f5g6h',
    message: 'fix: resolve login bug',
    author: 'Jane Smith',
    date: new Date('2024-01-14T15:45:00'),
    branch: 'main',
    files: 2
  },
  {
    id: 'i7j8k9l',
    message: 'docs: update README',
    author: 'Bob Wilson',
    date: new Date('2024-01-13T09:15:00'),
    branch: 'develop',
    files: 1
  }
])

const currentBranch = ref('main')
const branches = ref(['main', 'develop', 'feature/new-ui'])
const selectedCommit = ref<Commit | null>(null)

const getCommitTypeColor = (message: string) => {
  if (message.startsWith('feat:')) return 'bg-green-100 text-green-700'
  if (message.startsWith('fix:')) return 'bg-red-100 text-red-700'
  if (message.startsWith('docs:')) return 'bg-blue-100 text-blue-700'
  if (message.startsWith('refactor:')) return 'bg-yellow-100 text-yellow-700'
  return 'bg-gray-100 text-gray-700'
}

const formatDate = (date: Date) => {
  return new Intl.RelativeTimeFormat('en', { numeric: 'auto' }).format(
    Math.ceil((date.getTime() - Date.now()) / (1000 * 60 * 60 * 24)),
    'day'
  )
}
</script>

<template>
  <div class="h-full flex flex-col bg-white">
    <!-- Header -->
    <div class="p-4 border-b border-gray-200 bg-gray-50">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div class="i-mdi-source-branch w-6 h-6 text-gray-700" />
          <select
            v-model="currentBranch"
            class="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          >
            <option v-for="branch in branches" :key="branch" :value="branch">
              {{ branch }}
            </option>
          </select>
        </div>
        <div class="flex items-center gap-2">
          <button class="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm">
            Pull
          </button>
          <button class="px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm">
            Push
          </button>
        </div>
      </div>
    </div>

    <!-- Commit List -->
    <div class="flex-1 overflow-y-auto">
      <div
        v-for="commit in commits"
        :key="commit.id"
        class="p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer"
        :class="{ 'bg-blue-50': selectedCommit?.id === commit.id }"
        @click="selectedCommit = commit"
      >
        <div class="flex items-start gap-3">
          <div class="i-mdi-source-commit w-5 h-5 text-gray-400 mt-1" />
          <div class="flex-1">
            <div class="flex items-center gap-2 mb-1">
              <span :class="['px-2 py-0.5 text-xs rounded', getCommitTypeColor(commit.message)]">
                {{ commit.message.split(':')[0] }}
              </span>
              <span class="font-mono text-sm text-gray-500">{{ commit.id }}</span>
            </div>
            <p class="text-gray-900 mb-2">{{ commit.message }}</p>
            <div class="flex items-center gap-4 text-sm text-gray-600">
              <span class="flex items-center gap-1">
                <div class="i-mdi-account w-4 h-4" />
                {{ commit.author }}
              </span>
              <span class="flex items-center gap-1">
                <div class="i-mdi-clock w-4 h-4" />
                {{ formatDate(commit.date) }}
              </span>
              <span class="flex items-center gap-1">
                <div class="i-mdi-file-multiple w-4 h-4" />
                {{ commit.files }} files
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
