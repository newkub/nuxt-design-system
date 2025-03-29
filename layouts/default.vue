<script setup lang="ts">
import NavBar from "~/components/NavBar.vue";
// TypeScript setup script
</script>


<template>
  <div>
    <NavBar />
    <main class="container mx-auto pt-16 w-full">
      <slot />
    </main>
  </div>
</template>