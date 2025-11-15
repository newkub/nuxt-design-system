<script setup lang="ts">
import { useState } from '@wrikka/nuxt-design-system'

const [count, setCount] = useState(0)
const [name, setName] = useState('')

const increment = () => setCount(count.value + 1)
const decrement = () => setCount(count.value - 1)
</script>

<template>
  <div class="p-4">
    <h2>useState Composable Test</h2>
    
    <div class="mb-4">
      <label class="block mb-2">Name:</label>
      <input 
        v-model="name" 
        type="text" 
        class="border p-2 rounded"
        placeholder="Enter your name"
      />
      <p class="mt-2">Hello, {{ name }}!</p>
    </div>
    
    <div class="mb-4">
      <label class="block mb-2">Count: {{ count }}</label>
      <button @click="increment" class="bg-blue-500 text-white px-4 py-2 rounded mr-2">
        Increment
      </button>
      <button @click="decrement" class="bg-red-500 text-white px-4 py-2 rounded">
        Decrement
      </button>
    </div>
  </div>
</template>