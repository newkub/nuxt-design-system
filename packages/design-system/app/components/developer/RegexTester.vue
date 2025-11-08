<script setup lang="ts">
import { ref, computed } from 'vue'

const pattern = ref('\\d{3}-\\d{3}-\\d{4}')
const flags = ref('g')
const testString = ref('Call me at 123-456-7890 or 987-654-3210')

const matches = computed(() => {
  try {
    const regex = new RegExp(pattern.value, flags.value)
    const results = []
    let match: RegExpExecArray | null = null
    
    match = regex.exec(testString.value)
    while (match !== null) {
      results.push({
        text: match[0],
        index: match.index
      })
      if (!flags.value.includes('g')) break
      match = regex.exec(testString.value)
    }
    
    return { success: true, matches: results }
  } catch (error: any) {
    return { success: false, error: error.message, matches: [] }
  }
})

const highlightedText = computed(() => {
  if (!matches.value.success) return testString.value
  
  let result = testString.value
  let offset = 0
  
  matches.value.matches.forEach((match: any) => {
    const start = match.index + offset
    const end = start + match.text.length
    const highlighted = `<mark class="bg-yellow-200">${match.text}</mark>`
    result = result.substring(0, start) + highlighted + result.substring(end)
    offset += highlighted.length - match.text.length
  })
  
  return result
})
</script>

<template>
  <div class="h-full flex flex-col bg-white">
    <div class="p-4 border-b bg-gray-50">
      <h2 class="text-lg font-semibold text-gray-900">Regex Tester</h2>
    </div>

    <div class="flex-1 overflow-y-auto p-4">
      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700 mb-2">Pattern</label>
        <div class="flex gap-2">
          <input
            v-model="pattern"
            type="text"
            class="flex-1 px-3 py-2 border rounded font-mono text-sm"
            placeholder="Enter regex pattern"
          />
          <input
            v-model="flags"
            type="text"
            class="w-20 px-3 py-2 border rounded font-mono text-sm"
            placeholder="Flags"
          />
        </div>
      </div>

      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700 mb-2">Test String</label>
        <textarea
          v-model="testString"
          class="w-full h-32 px-3 py-2 border rounded font-mono text-sm"
          placeholder="Enter test string"
        />
      </div>

      <div v-if="!matches.success" class="p-3 bg-red-50 text-red-600 rounded mb-4">
        {{ matches.error }}
      </div>

      <div class="mb-4">
        <h3 class="font-semibold mb-2">Result ({{ matches.matches.length }} matches)</h3>
        <div class="p-4 bg-gray-50 rounded font-mono text-sm" v-html="highlightedText" />
      </div>

      <div v-if="matches.matches.length > 0">
        <h3 class="font-semibold mb-2">Matches</h3>
        <div class="space-y-2">
          <div v-for="(match, i) in matches.matches" :key="i" class="p-2 bg-gray-50 rounded">
            <span class="font-medium">Match {{ i + 1 }}:</span> "{{ match.text }}" at index {{ match.index }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
