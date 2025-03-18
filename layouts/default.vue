<template>
  <div>
    <NavBar />
    <main class="pt-16">
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
import NavBar from '~/components/NavBar.vue'
// TypeScript setup script
</script>
