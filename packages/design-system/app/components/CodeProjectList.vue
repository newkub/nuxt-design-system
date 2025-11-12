<script setup lang="ts">
import { ref } from "vue";

// In a real app, this data would likely be fetched from an API
const connectedProjects = ref([
	{
		description: "The main platform for Wrikka services.",
		id: "1",
		lastUpdated: "2 hours ago",
		name: "wrikka-platform",
		owner: "newkub",
	},
	{
		description: "Shared configurations for development environments.",
		id: "2",
		lastUpdated: "1 day ago",
		name: "dev-config",
		owner: "newkub",
	},
	{
		description: "Personal dotfiles and setup scripts.",
		id: "3",
		lastUpdated: "3 days ago",
		name: "dotfiles",
		owner: "newkub",
	},
]);

function openGitHubProject(project: (typeof connectedProjects.value)[0]) {
	// In Nuxt 3, it's better to use navigateTo from the page
	// Emitting an event is a good way to communicate this up
	emit("open-project", project);
}

const emit = defineEmits(["open-project"]);
</script>

<template>
  <div class="space-y-4">
    <div
      v-for="project in connectedProjects"
      :key="project.id"
      @click="openGitHubProject(project)"
      class="bg-white p-6 rounded-lg shadow-md hover:shadow-lg hover:ring-2 hover:ring-primary-500 transition-all cursor-pointer"
    >
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-3">
          <div class="i-mdi-github text-2xl text-gray-500"></div>
          <h3 class="text-xl font-bold text-gray-900">{{ project.owner }}/{{ project.name }}</h3>
        </div>
        <span class="text-sm text-gray-500">{{ project.lastUpdated }}</span>
      </div>
      <p class="mt-2 text-gray-600">{{ project.description }}</p>
    </div>
  </div>
</template>
