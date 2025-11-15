<script setup lang="ts">
import { ref, computed } from 'vue'

interface Test {
  id: string
  name: string
  status: 'pending' | 'running' | 'passed' | 'failed'
  duration?: number
}

const tests = ref<Test[]>([
  { id: '1', name: 'Login test', status: 'passed', duration: 123 },
  { id: '2', name: 'API test', status: 'failed', duration: 89 },
  { id: '3', name: 'UI test', status: 'pending' }
])

const isRunning = ref(false)

const stats = computed(() => ({
  total: tests.value.length,
  passed: tests.value.filter(t => t.status === 'passed').length,
  failed: tests.value.filter(t => t.status === 'failed').length
}))

const runTests = async () => {
  isRunning.value = true
  for (const test of tests.value) {
    test.status = 'running'
    await new Promise(r => setTimeout(r, 500))
    test.status = Math.random() > 0.3 ? 'passed' : 'failed'
  }
  isRunning.value = false
}
</script>

<template>
  <div class="h-full flex flex-col bg-white">
    <div class="p-4 border-b">
      <button @click="runTests" :disabled="isRunning" class="px-4 py-2 bg-green-600 text-white rounded">
        Run Tests
      </button>
      <div class="mt-3 flex gap-4">
        <span>Total: {{ stats.total }}</span>
        <span class="text-green-600">Passed: {{ stats.passed }}</span>
        <span class="text-red-600">Failed: {{ stats.failed }}</span>
      </div>
    </div>
    <div class="flex-1 overflow-y-auto p-4">
      <div v-for="test in tests" :key="test.id" class="p-3 border-b">
        <div class="flex items-center justify-between">
          <span>{{ test.name }}</span>
          <span :class="test.status === 'passed' ? 'text-green-600' : 'text-red-600'">
            {{ test.status }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
