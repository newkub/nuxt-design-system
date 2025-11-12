<script setup lang="ts">
interface Tab {
	id: string;
	name: string;
	icon: string;
}

const props = defineProps<{
	tabs: Tab[];
	activeTab: string | null;
}>();

const emit = defineEmits<{
	"update:activeTab": [tabId: string];
}>();

function setActiveTab(tabId: string) {
	emit("update:activeTab", tabId);
}
</script>

<template>
  <div class="flex border-b border-normal">
    <button
      v-for="tab in tabs"
      :key="tab.id"
      @click="setActiveTab(tab.id)"
      :class="['flex items-center space-x-2 px-md py-3 text-sm font-medium',
        activeTab === tab.id
          ? 'border-b-2 border-success-normal text-success-normal'
          : 'text-border-normal hover:text-background-normal'
      ]"
    >
      <div :class="[tab.icon, 'w-md h-md']"></div>
      <span>{{ tab.name }}</span>
    </button>
  </div>
</template>
