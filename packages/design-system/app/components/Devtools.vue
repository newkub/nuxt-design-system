<script setup lang="ts">
import { computed, defineAsyncComponent, onMounted, provide, ref } from "vue";
import { useResponsive } from "~/composables/useResponsive";
import DevtoolsInfo from "../devtools/DevtoolsInfo.vue";
import Modal from "./Modal.vue";
import ToggleTheme from "./ToggleTheme.vue";

const { device, setDevice, devicePresets } = useResponsive();

// Components for tabs - we will import them later
const DesignTheme = defineAsyncComponent(
	() => import("~/components/devtools/DevtoolsInfo.vue"),
);
const DesignComponents = defineAsyncComponent(
	() => import("~/components/devtools/DevtoolsInfo.vue"),
);
const DesignComposables = defineAsyncComponent(
	() => import("~/components/devtools/DevtoolsInfo.vue"),
);
const PackageJsonViewer = defineAsyncComponent(
	() => import("~/components/devtools/PackageJsonViewer.vue"),
);
const NuxtConfigViewer = defineAsyncComponent(
	() => import("~/components/devtools/NuxtConfigViewer.vue"),
);
const Console = defineAsyncComponent(
	() => import("~/components/devtools/Console.vue"),
);
const Terminal = defineAsyncComponent(
	() => import("~/components/devtools/Terminal.vue"),
);

const isOpen = ref(false);

// Counts for each tab
const componentCount = ref(0);
const composableCount = ref(0);
const consoleCount = ref(0);
const terminalCount = ref(0);

const tabs = computed(() => [
	{
		component: DevtoolsInfo,
		count: null,
		icon: "i-mdi-information-outline",
		name: "Info",
	},
	{ component: DesignTheme, count: null, icon: "i-mdi-palette", name: "Theme" },
	{
		component: DesignComponents,
		count: componentCount.value,
		icon: "i-mdi-widgets-outline",
		name: "Components",
	},
	{
		component: DesignComposables,
		count: composableCount.value,
		icon: "i-mdi-function-variant",
		name: "Composables",
	},
	{
		component: PackageJsonViewer,
		count: null,
		icon: "i-mdi-package-variant",
		name: "package.json",
	},
	{
		component: NuxtConfigViewer,
		count: null,
		icon: "i-mdi-cog-outline",
		name: "Nuxt Config",
	},
	{
		component: Console,
		count: consoleCount.value,
		icon: "i-mdi-console",
		name: "Console",
	},
	{
		component: Terminal,
		count: terminalCount.value,
		icon: "i-mdi-console-line",
		name: "Terminal",
	},
]);

const activeTab = ref("Info");

// Provide counts to child components
provide("updateConsoleCount", (count: number) => {
	consoleCount.value = count;
});
provide("updateTerminalCount", (count: number) => {
	terminalCount.value = count;
});

// Load component and composable counts
onMounted(async () => {
	try {
		const componentsResponse = await $fetch("/api/devtools/stats/components");
		componentCount.value = componentsResponse?.count || 0;

		const composablesResponse = await $fetch("/api/devtools/stats/composables");
		composableCount.value = composablesResponse?.count || 0;
	} catch (error) {
		// Silently fail
	}
});
</script>

<template>
  <div class="fixed bottom-5 right-10 z-50">
    <!-- Floating Action Button -->
    <button 
      class="w-8 h-8 rounded-full bg-blue-500 text-white shadow-lg flex items-center justify-center transform transition-transform hover:scale-110 hover:bg-blue-600" 
      @click="isOpen = !isOpen"
    >
      <div class="i-mdi-wrench-cog-outline text-sm" />
    </button>

    <!-- DevTools Panel -->
    <Modal 
      v-model="isOpen" 
      :show-header="false" 
      transition-type="fade"
      size="xl"
    >
      <div class="flex flex-col h-full">
        <!-- Panel Header -->
        <header class="flex items-center justify-between p-2 border-b border-gray-200 flex-shrink-0">
          <div class="flex items-center gap-4">
            <div class="flex items-center gap-2">
              <div class="i-mdi-wrench-cog text-sm text-primary-500" />
              <h2 class="font-semibold">Wrikka DevTools</h2>
            </div>
            <!-- Tabs Navigation -->
            <nav class="flex items-center">
              <button
                v-for="tab in tabs"
                :key="tab.name"
                class="flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md transition-colors"
                :class="activeTab === tab.name 
                  ? 'bg-gray-100 text-primary-500'
                  : 'text-gray-500 hover:bg-gray-100'"
                @click="activeTab = tab.name"
              >
                <div :class="tab.icon" />
                <span>{{ tab.name }}</span>
                <span v-if="tab.count !== null && tab.count > 0" 
                      class="ml-1 px-1.5 py-0.5 text-xs rounded-full"
                      :class="activeTab === tab.name 
                        ? 'bg-primary-500 text-white' 
                        : 'bg-gray-200'">
                  {{ tab.count }}
                </span>
              </button>
            </nav>
          </div>

          <div class="flex items-center gap-2">
            <ToggleTheme />
            <div class="flex items-center gap-1 px-2 py-1 rounded-md bg-gray-100">
              <button 
                v-for="preset in devicePresets" 
                :key="preset.name"
                :title="preset.name"
                class="p-2 rounded-md transition-colors"
                :class="device.name === preset.name 
                  ? 'bg-primary-500 text-white' 
                  : 'hover:bg-gray-200'"
                @click="setDevice(preset)"
              >
                <div :class="preset.icon" />
              </button>
            </div>
            <button @click="isOpen = false" class="p-2 rounded-md hover:bg-gray-100">
              <div class="i-mdi-close" />
            </button>
          </div>
        </header>

        <!-- Tab Content -->
        <main class="flex-1 overflow-y-auto">
          <component 
            :is="tabs.find(tab => tab.name === activeTab)?.component" 
            v-if="activeTab !== 'Info'"
            class="h-full"
          />
          <DevtoolsInfo v-else />
        </main>
      </div>
    </Modal>
  </div>
</template>