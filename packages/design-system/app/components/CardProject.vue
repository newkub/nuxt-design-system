<script setup lang="ts">
import type { PropType } from "vue";

// Define the project type - this will be extended by specific media types
interface BaseProject {
	id: string | number;
	name: string;
	createdAt?: string;
	updatedAt?: string;
	status?: "draft" | "in-progress" | "completed";
	[key: string]: any; // Allow additional properties
}

interface Props {
	project: BaseProject;
	mediaType: string;
	onClick: (project: BaseProject) => void;
}

const props = defineProps<Props>();
</script>

<template>
  <div 
    class="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden hover:bg-gray-700/50 transition-colors cursor-pointer"
    @click="onClick(project)"
  >
    <!-- Media-specific content will be shown based on mediaType -->
    <div v-if="mediaType === 'image'" class="h-48 overflow-hidden">
      <img 
        v-if="project.url" 
        :src="project.url" 
        :alt="project.name" 
        class="w-full h-full object-cover"
      >
      <div v-else class="h-full bg-gray-700 flex items-center justify-center">
        <div class="i-mdi-image-outline text-5xl text-gray-500" />
      </div>
    </div>
    
    <div v-else-if="mediaType === 'video'" class="h-40 bg-gray-700 flex items-center justify-center relative">
      <div class="i-mdi-video-outline text-5xl text-gray-500" />
      <div class="absolute bottom-2 right-2 bg-black/50 rounded-full p-1">
        <div class="i-mdi-play-circle-outline" />
      </div>
    </div>
    
    <div v-else-if="mediaType === 'audio'" class="h-40 bg-gray-700 flex items-center justify-center">
      <div class="i-mdi-music-note-outline text-5xl text-gray-500" />
    </div>
    
    <div v-else-if="mediaType === '3d'" class="h-40 bg-gray-700 flex items-center justify-center">
      <div class="i-mdi-cube-outline text-5xl text-gray-500" />
    </div>
    
    <div v-else-if="mediaType === 'animation'" class="h-40 bg-gray-700 flex items-center justify-center">
      <div class="i-mdi-animation-outline text-5xl text-gray-500" />
    </div>
    
    <div v-else-if="mediaType === 'logo'" class="h-40 bg-gray-700 flex items-center justify-center">
      <div class="i-mdi-image-filter-center-focus-strong-outline text-5xl text-gray-500" />
    </div>
    
    <div v-else class="h-40 bg-gray-700 flex items-center justify-center">
      <div class="i-mdi-file-outline text-5xl text-gray-500" />
    </div>
    
    <div class="p-4">
      <div class="flex justify-between items-start mb-2">
        <h3 class="font-medium">{{ project.name }}</h3>
        <span 
          v-if="project.status"
          class="text-xs px-2 py-1 rounded"
          :class="{
            'bg-green-900/30 text-green-400': project.status === 'completed',
            'bg-yellow-900/30 text-yellow-400': project.status === 'in-progress',
            'bg-gray-700 text-gray-400': project.status === 'draft'
          }"
        >
          {{ project.status }}
        </span>
      </div>
      
      <!-- Media-specific details -->
      <div v-if="mediaType === 'image'" class="flex justify-between text-sm text-gray-400 mb-3">
        <span>{{ project.resolution || 'N/A' }}</span>
        <span>{{ project.size || 'N/A' }}</span>
      </div>
      
      <div v-else-if="mediaType === 'video'" class="flex justify-between text-sm text-gray-400">
        <span>{{ project.duration || 'N/A' }}</span>
        <span>{{ project.resolution || 'N/A' }}</span>
      </div>
      
      <div v-else-if="mediaType === 'audio'" class="flex justify-between text-sm text-gray-400">
        <span>{{ project.duration || 'N/A' }}</span>
        <span>{{ project.size || 'N/A' }}</span>
      </div>
      
      <div v-else-if="mediaType === '3d'" class="text-sm text-gray-400 mb-3">
        <span>{{ project.type || '3D Model' }}</span>
      </div>
      
      <div v-else-if="mediaType === 'animation'" class="text-sm text-gray-400 mb-3">
        <span>{{ project.duration || 'N/A' }}</span>
      </div>
      
      <div v-else-if="mediaType === 'logo'" class="text-sm text-gray-400 mb-3">
        <span>{{ project.type || 'Logo' }}</span>
      </div>
      
      <p v-if="project.createdAt" class="text-xs text-gray-500">Created: {{ project.createdAt }}</p>
    </div>
  </div>
</template>