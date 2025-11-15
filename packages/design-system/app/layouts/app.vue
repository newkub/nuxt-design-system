<script setup lang="ts">
import type { LayoutProps } from "~/types/layout";

const props = withDefaults(defineProps<LayoutProps>(), {
	orientation: "vertical",
});

const isCollapsed = ref(true);
const showNavbar = ref(true);
const lastScrollY = ref(0);

const { y } = useWindowScroll();

watch(y, (newY) => {
	if (newY < lastScrollY.value || newY <= 50) {
		showNavbar.value = true;
	} else {
		showNavbar.value = false;
	}
	lastScrollY.value = newY;
});

function toggleSidebar() {
	isCollapsed.value = !isCollapsed.value;
}
</script>

<template>
  <div :class="{ 'flex': props.orientation === 'vertical' }">
    <div v-if="props.orientation === 'vertical'" class="flex-shrink-0 h-screen sticky top-0">
      <slot name="sidebar">
        <Sidebar
          :is-collapsed="isCollapsed"
          @toggle="toggleSidebar"
        />
      </slot>
    </div>

    <div class="flex flex-col flex-1">
      <header :class="['sticky top-0 z-50 transition-transform duration-300', { '-translate-y-full': !showNavbar }]">
        <slot v-if="props.orientation === 'horizontal'" name="navbar">
          <Navbar />
        </slot>
      </header>
      <main class="flex-1 p-4 h-screen overflow-y-auto">
        <slot />
      </main>
    </div>
  </div>
</template>
