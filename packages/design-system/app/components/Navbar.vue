<script setup lang="ts">
import AppLauncher from "~/components/ui/AppLauncher.vue";
import Logo from "~/components/ui/Logo.vue";
import MenuItems from "~/components/ui/MenuItems.vue";
import ToggleTheme from "~/components/ui/ToggleTheme.vue";
import { useApps } from "~/composables/useApps";

const { navItems, bottomNavItems } = useApps();
</script>

<template>
  <header class="relative z-60 flex items-center p-4 border-b border-gray-200 bg-white">
    <!-- Left: Logo -->
    <div class="flex items-center flex-1">
      <Logo />
    </div>

    <!-- Center: Navigation -->
    <nav class="flex items-center justify-center space-x-4 flex-1">
      <MenuItems :items="navItems" layout="horizontal" />
    </nav>

    <!-- Right: Profile & Theme Toggle -->
    <div class="flex items-center justify-end space-x-4 flex-1">
      <MenuItems :items="bottomNavItems" layout="horizontal" />
      <div class="flex items-center gap-2">
        <AppLauncher />
        <ToggleTheme />
      </div>
    </div>
  </header>
</template>
