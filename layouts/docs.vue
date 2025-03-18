<template>
  <div class="docs-layout">
    <Sidebar />
    <main class="main-content">
      <slot />
    </main>
    <TableOfContent />
  </div>
</template>

<script setup lang="ts">
import Sidebar from '~/components/Sidebar.vue'
import TableOfContent from '~/components/TableOfContent.vue'
</script>

<style scoped>
.docs-layout {
  display: grid;
  grid-template-columns: 240px 1fr 240px;
  min-height: 100vh;
}

.main-content {
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
}
</style>
