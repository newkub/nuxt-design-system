<script setup lang="ts">
// NavBar component
</script>

<template>
  <nav class="sticky top-0 bg-white shadow-md z-50">
    <div class="container mx-auto px-4 py-2 flex justify-between items-center">
      <NuxtLink to="/" class="text-xl font-bold hover:text-primary-500 transition-colors">
        Nuxt Design System
      </NuxtLink>
      <div class="space-x-4">
        <NuxtLink 
          to="/components" 
          class="hover:text-primary-500 transition-colors"
        >
          Components
        </NuxtLink>
        <NuxtLink 
          to="/composables" 
          class="hover:text-primary-500 transition-colors"
        >
          Composables
        </NuxtLink>
        <NuxtLink 
          to="/get-started" 
          class="hover:text-primary-500 transition-colors"
        >
          Get Started
        </NuxtLink>
      </div>
    </div>
  </nav>
</template>
