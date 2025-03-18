<template>
  <div>
    <NavBar />
    <main class="container mx-auto pt-16">
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
import NavBar from '~/components/NavBar.vue'
// TypeScript setup script
</script>
