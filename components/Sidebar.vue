<template>
  <aside class="sidebar">
    <div class="logo">
      <NuxtLink to="/">
        <Logo />
      </NuxtLink>
    </div>
    <nav class="navigation">
      <NuxtLink to="/components" class="nav-link">Components</NuxtLink>
      <NuxtLink to="/composables" class="nav-link">Composables</NuxtLink>
    </nav>
  </aside>
</template>

<script setup lang="ts">
import Logo from '~/components/ui/Logo.vue'
</script>

<style scoped>
.sidebar {
  width: 240px;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  padding: 1rem;
  border-right: 1px solid #e5e7eb;
  background: white;
}

.logo {
  margin-bottom: 2rem;
}

.navigation {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.nav-link {
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  color: #4b5563;
  transition: all 0.2s;
}

.nav-link:hover {
  background: #f3f4f6;
  color: #111827;
}

.nav-link.router-link-active {
  background: #e5e7eb;
  color: #111827;
}
</style>