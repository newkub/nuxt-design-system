<script setup lang="ts">
import type { Plugin } from "~/types/plugin";
import PluginCard from "./PluginCard.vue";

// Emits for parent components
const emit = defineEmits<(e: "select-plugin", plugin: Plugin) => void>();

// Use plugins composable
const {
	searchTerm,
	selectedCategory,
	categories,
	filteredPlugins,
	enabledCount,
	togglePlugin,
	installPlugin,
} = usePlugins();

// Select a plugin to view details - emit event to parent
function selectPlugin(plugin: Plugin) {
	emit("select-plugin", plugin);
}
</script>

<template>
  <div class="h-full w-full relative bg-gray-50 text-gray-800 flex flex-col">
    <header class="flex-shrink-0 flex items-center justify-between p-3 border-b border-gray-200">
      <h2 class="text-xl font-bold flex items-center gap-2">
        <div class="i-mdi-puzzle text-2xl"></div>
        <span>Plugins</span>
      </h2>
      <button 
        @click="installPlugin"
        class="px-3 py-1.5 text-sm bg-primary-600 text-white rounded-md hover:bg-primary-700 flex items-center gap-1"
      >
        <div class="i-mdi-plus-circle-outline text-lg"></div>
        <span>Install</span>
      </button>
    </header>

    <!-- Search and Filter -->
    <div class="flex-shrink-0 p-3 border-b border-gray-200 bg-white">
      <div class="flex flex-col gap-3">
        <div class="relative">
          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <div class="i-mdi-magnify text-gray-400"></div>
          </div>
          <input
            v-model="searchTerm"
            type="text"
            placeholder="Search extensions..."
            class="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>
        
        <div class="flex flex-wrap gap-2">
          <button
            v-for="category in categories"
            :key="category"
            @click="selectedCategory = category"
            :class="[
              'px-3 py-1 text-sm rounded-full',
              selectedCategory === category
                ? 'bg-primary-600 text-white'
                : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
            ]"
          >
            {{ category }}
          </button>
        </div>
      </div>
    </div>

    <!-- Plugins List -->
    <div class="flex-1 overflow-y-auto">
      <div v-if="filteredPlugins.length === 0" class="p-4 text-center text-gray-500">
        No plugins found matching your criteria.
      </div>
      
      <div v-else class="divide-y divide-gray-200">
        <PluginCard
          v-for="plugin in filteredPlugins"
          :key="plugin.id"
          :plugin="plugin"
          @select="selectPlugin"
          @toggle="togglePlugin"
        />
      </div>
    </div>
    
    <!-- Status Bar -->
    <div class="flex-shrink-0 px-3 py-2 text-xs border-t border-gray-200 bg-gray-100 text-gray-600 flex justify-between">
      <span>{{ enabledCount }} enabled plugins</span>
      <span>{{ filteredPlugins.length }} shown</span>
    </div>
  </div>
</template>