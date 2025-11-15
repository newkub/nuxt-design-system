<script setup lang="ts">
const { isSticky } = useSticky({
	offset: 0,
	stickyClass: "sticky-navbar",
});

const menuItems = [
	{ icon: "i-mdi-home", label: "Platform", to: "/" },
	{ icon: "i-mdi-apps", label: "Apps", to: "/apps" },
	{ icon: "i-mdi-currency-usd", label: "Pricing", to: "/pricing" },
	{ icon: "i-mdi-file-document", label: "Docs", to: "/docs" },
	{ icon: "i-mdi-email", label: "Contact", to: "/contact" },
];
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <header
      :class="[
        'navbar flex items-center justify-center p-4 border-b border-gray-200 bg-white transition-all duration-300',
        isSticky ? 'sticky-navbar top-0 z-50 shadow-md' : ''
      ]"
    >
      <MenuItems :items="menuItems" layout="horizontal" />
    </header>

    <main class="flex-1">
      <slot />
    </main>
  </div>
</template>
