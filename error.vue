<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps({
  error: {
    type: Object as () => NuxtError,
    default: () => ({ statusCode: 500, message: 'Internal Server Error' })
  }
})

</script>

<template>
  <div class="min-h-screen flex flex-col items-center justify-center bg-gray-50">
    <div class="max-w-2xl text-center">
      <img 
        src="https://cdn.pixabay.com/photo/2017/02/12/21/29/false-2061132_1280.png" 
        alt="Error Illustration"
        class="w-64 h-64 mx-auto mb-8"
      >
      <h1 class="text-6xl font-bold text-gray-900 mb-4">
        Oops!
      </h1>
      <p class="text-xl text-gray-600 mb-8">
        Something went wrong. Please try again later.
      </p>
      <NuxtLink
        to="/"
        class="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
      >
        Go Back Home
      </NuxtLink>
    </div>
  </div>
</template>
