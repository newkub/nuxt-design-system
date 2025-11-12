<script setup lang="ts">
import { onClickOutside } from "@vueuse/core";
import { ref } from "vue";
import Tabs from "~/components/ui/Tabs.vue";
import { useApps } from "~/composables/useApps";

const { allApps, builtInApps } = useApps();
const launcherRef = ref(null);
const isOpen = ref(false);
const activeTab = ref("apps");

const launcherTabs = [
	{ label: "Apps", value: "apps" },
	{ label: "Settings", value: "settings" },
];

function toggleDropdown() {
	isOpen.value = !isOpen.value;
}

function closeDropdown() {
	isOpen.value = false;
}

onClickOutside(launcherRef, () => {
	closeDropdown();
});

const settingsApps = builtInApps.value.filter(
	(app) => app.category === "System",
);
</script>

<template>
  <div ref="launcherRef" class="relative">
    <button @click="toggleDropdown" class="p-2 rounded-full hover:bg-gray-100 transition-colors">
      <div class="i-mdi-apps w-6 h-6 text-gray-600" />
    </button>

    <div v-if="isOpen" class="absolute top-full right-0 mt-2 w-80 bg-white border border-gray-200 rounded-2xl shadow-lg z-20">
      <Tabs v-model="activeTab" :tabs="launcherTabs" layout="navbar" class="p-2">
        <template #default>
          <div class="p-4 pt-0 max-h-[60vh] overflow-y-auto">
            <div v-if="activeTab === 'apps'" class="grid grid-cols-3 gap-4">
              <NuxtLink 
                v-for="app in allApps" 
                :key="app.slug" 
                :to="app.to" 
                class="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-gray-100 transition-colors text-center"
                @click="isOpen = false"
              >
                <div :class="[app.icon, 'w-8 h-8 text-primary']" />
                <span class="text-xs font-medium text-gray-700 truncate w-full">{{ app.label }}</span>
              </NuxtLink>
            </div>
            <div v-if="activeTab === 'settings'">
              <details class="group">
                <summary class="flex items-center justify-between p-2 rounded-lg cursor-pointer hover:bg-gray-100">
                  <span class="font-medium">System</span>
                  <div class="i-mdi-chevron-down transform transition-transform duration-200 group-open:rotate-180" />
                </summary>
                <div class="grid grid-cols-3 gap-4 pt-2">
                  <NuxtLink 
                    v-for="app in settingsApps" 
                    :key="app.slug" 
                    :to="app.to" 
                    class="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-gray-100 transition-colors text-center"
                    @click="isOpen = false"
                  >
                    <div :class="[app.icon, 'w-8 h-8 text-gray-600']" />
                    <span class="text-xs font-medium text-gray-700 truncate w-full">{{ app.label }}</span>
                  </NuxtLink>
                </div>
              </details>
            </div>
          </div>
        </template>
      </Tabs>
    </div>
  </div>
</template>
