<script setup lang="ts">
import { computed } from "vue";
import AppLauncher from "~/components/ui/AppLauncher.vue";
import Logo from "~/components/ui/Logo.vue";
import MenuItems from "~/components/ui/MenuItems.vue";
import ToggleTheme from "~/components/ui/ToggleTheme.vue";
import { useApps } from "~/composables/useApps";

const emit = defineEmits<(e: "toggle") => void>();

interface SidebarProps {
	isCollapsed?: boolean;
}

const props = withDefaults(defineProps<SidebarProps>(), {
	isCollapsed: false,
});

const { navItems, bottomNavItems } = useApps();

function toggleSidebar() {
	emit("toggle");
}
</script>

<template>
  <aside
    :class="[
      'relative transition-all duration-300 ease-in-out border-r flex flex-col h-screen',
      'border-gray-200',
      props.isCollapsed ? 'w-auto' : 'w-64',
    ]"
  >
    <div :class="['flex items-center', props.isCollapsed ? 'p-0 justify-center' : 'h-16 p-4 justify-between']">
      <Logo v-if="!props.isCollapsed" />
      <div class="flex items-center gap-2 relative">
        <AppLauncher v-if="!props.isCollapsed" class="[&_.dropdown]:right-0 [&_.dropdown]:left-auto [&_.dropdown]:top-full [&_.dropdown]:mt-1" />
        <ToggleTheme v-if="!props.isCollapsed" />
      </div>
    </div>

    <button
      :class="[
        'absolute -right-3 z-10 p-1 rounded-full focus:outline-none',
        props.isCollapsed ? 'top-2' : 'top-16',
        'bg-white',
        'border border-gray-200',
        'hover:bg-gray-100',
      ]"
      @click="toggleSidebar"
    >
      <div :class="[props.isCollapsed ? 'i-mdi-chevron-right' : 'i-mdi-chevron-left', 'w-4 h-4']" />
    </button>

    <nav :class="['flex-grow space-y-1 overflow-y-auto overflow-x-hidden', props.isCollapsed ? 'p-0' : 'p-2']">
      <MenuItems :items="navItems" :is-collapsed="props.isCollapsed" layout="vertical" />
    </nav>

    <div :class="['mt-auto border-t border-gray-200', props.isCollapsed ? 'p-0' : 'p-2']">
      <div class="w-full space-y-1">
        <MenuItems :items="bottomNavItems" :is-collapsed="props.isCollapsed" layout="vertical" />
      </div>
    </div>
  </aside>
</template>
