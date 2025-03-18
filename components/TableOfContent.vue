<template>
  <aside class="toc">
    <h3 class="toc-title">On this page</h3>
    <nav class="toc-nav">
      <ul>
        <li><a href="#introduction" class="toc-link">Introduction</a></li>
        <li><a href="#installation" class="toc-link">Installation</a></li>
        <li><a href="#usage" class="toc-link">Usage</a></li>
      </ul>
    </nav>
  </aside>
</template>

<script setup lang="ts">
// TODO: Add dynamic content based on page headings
</script>

<style scoped>
.toc {
  width: 240px;
  position: fixed;
  top: 1rem;
  right: 1rem;
  padding: 1rem;
  border-left: 1px solid #e5e7eb;
  background: white;
  max-height: calc(100vh - 2rem);
  overflow-y: auto;
}

.toc-title {
  font-size: 0.875rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #111827;
}

.toc-nav ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.toc-link {
  font-size: 0.875rem;
  color: #4b5563;
  text-decoration: none;
  transition: all 0.2s;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
}

.toc-link:hover {
  color: #111827;
  background: #f3f4f6;
}
</style>