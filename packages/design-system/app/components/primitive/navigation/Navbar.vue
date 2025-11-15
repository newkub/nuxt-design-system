<script setup lang="ts">
const props = withDefaults(defineProps<{
  title?: string
  logo?: string
  fixed?: boolean
  transparent?: boolean
}>(), {
  fixed: false,
  transparent: false
})

const emit = defineEmits<{
  menuClick: []
  logoClick: []
}>()
</script>

<template>
  <nav :class="['navbar', { fixed, transparent }]">
    <div class="navbar-content">
      <div class="navbar-start">
        <button @click="emit('menuClick')" class="menu-btn">
          <span class="menu-icon">☰</span>
        </button>
        <div @click="emit('logoClick')" class="logo">
          <img v-if="logo" :src="logo" alt="logo" />
          <span v-else>{{ title || 'App' }}</span>
        </div>
      </div>
      
      <div class="navbar-center">
        <slot name="center" />
      </div>
      
      <div class="navbar-end">
        <slot name="end" />
      </div>
    </div>
    
    <!-- Sub-components for easier usage -->
    <div v-if="$slots.brand" class="navbar-brand">
      <slot name="brand" />
    </div>
    
    <nav v-if="$slots.menu" class="navbar-menu">
      <slot name="menu" />
    </nav>
  </nav>
</template>

<style scoped>
.navbar {
  @apply w-full bg-white border-b border-gray-200 px-4 py-3;
}

.navbar.fixed {
  @apply fixed top-0 left-0 right-0 z-50;
}

.navbar.transparent {
  @apply bg-transparent border-transparent;
}

.navbar-content {
  @apply max-w-7xl mx-auto flex items-center justify-between;
}

.navbar-start {
  @apply flex items-center gap-4;
}

.menu-btn {
  @apply p-2 hover:bg-gray-100 rounded-lg lg:hidden;
}

.menu-icon {
  @apply text-xl;
}

.logo {
  @apply flex items-center gap-2 text-xl font-bold cursor-pointer;
}

.logo img {
  @apply h-8 w-auto;
}

.navbar-center {
  @apply flex-1 flex items-center justify-center;
}

.navbar-end {
  @apply flex items-center gap-2;
}

/* Styles for NavbarBrand equivalent */
.navbar-brand {
  @apply text-xl font-bold text-slate-900 no-underline flex items-center;
}

/* Styles for NavbarMenu equivalent */
.navbar-menu {
  @apply flex items-center gap-4;
}

/* Styles for NavbarItem equivalent */
.navbar-menu :deep(a) {
  @apply px-4 py-2 rounded-md text-slate-600 no-underline transition-all font-medium hover:text-slate-900 hover:bg-slate-100 router-link-exact-active:text-blue-500 router-link-exact-active:bg-blue-100;
}
</style>