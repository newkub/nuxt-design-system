<script setup lang="ts">
import { ref } from "vue";

const props = defineProps<{
	activeTab: string;
}>();
const emit = defineEmits(["update:activeTab"]);

const tabs = [
	{ icon: "i-mdi-console", id: "terminal", name: "Terminal" },
	{ icon: "i-mdi-bug-outline", id: "console", name: "Console" },
	{ icon: "i-mdi-alert-circle-outline", id: "problems", name: "Problems" },
];
</script>

<template>
  <div class="border-b border-gray-200">
    <nav class="-mb-px flex items-center space-x-4 px-4" aria-label="Tabs">
      <button 
        v-for="tab in tabs" 
        :key="tab.id" 
        :class="['group inline-flex items-center py-2 px-1 border-b-2 font-medium text-sm', props.activeTab === tab.id ? 'border-primary-500 text-primary-600' : 'border-transparent text-gray-500 hover:text-gray-700']" 
        @click="emit('update:activeTab', tab.id)"
      >
        <div :class="[tab.icon, 'mr-2 w-5 h-5']" />
        <span>{{ tab.name }}</span>
      </button>
    </nav>
  </div>
</template>
