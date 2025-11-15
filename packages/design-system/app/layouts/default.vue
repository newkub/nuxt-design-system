<script setup lang="ts">
import type { LayoutProps } from "~/types/layout";

const props = withDefaults(defineProps<LayoutProps>(), {
	orientation: "horizontal",
});

const isCollapsed = ref(true);
const showNavbar = ref(true);
const lastScrollY = ref(0);
const isFullscreen = ref(false);

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

function toggleFullscreen() {
	isFullscreen.value = !isFullscreen.value;
	
	// Emit event for fullscreen change
	const event = new CustomEvent('fullscreen-change', { detail: isFullscreen.value });
	window.dispatchEvent(event);
}
</script>

<template>
  <div 
    class="min-h-screen flex flex-col"
    :class="{ 'fixed inset-0 z-[9999] bg-white': isFullscreen }"
  >
    <header 
      :class="[
        'sticky top-0 z-50 bg-white border-b border-gray-200 transition-transform duration-300',
        { '-translate-y-full': !showNavbar && !isFullscreen },
        { 'hidden': isFullscreen }
      ]"
    >
      <slot name="navbar">
        <Navbar />
      </slot>
      <button 
        @click="toggleFullscreen"
        class="absolute top-4 right-4 p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
        :title="isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'"
      >
        <span v-if="!isFullscreen" class="i-mdi-fullscreen text-xl"></span>
        <span v-else class="i-mdi-fullscreen-exit text-xl"></span>
      </button>
    </header>

    <div 
      class="flex flex-1"
      :class="{ 'hidden': isFullscreen }"
    >
      <aside 
        v-if="props.orientation === 'vertical'" 
        class="flex-shrink-0 w-64 min-h-screen border-r border-gray-200 bg-white"
      >
        <slot name="sidebar">
          <Sidebar 
            :is-collapsed="isCollapsed"
            @toggle="toggleSidebar"
          />
        </slot>
      </aside>

      <main class="flex-1 p-4 overflow-y-auto">
        <slot />
      </main>
    </div>
    
    <!-- Fullscreen content -->
    <div 
      v-if="isFullscreen"
      class="flex-1 p-4 overflow-y-auto"
    >
      <slot />
    </div>
  </div>
</template>