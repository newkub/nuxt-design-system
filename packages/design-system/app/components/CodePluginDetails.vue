<script setup lang="ts">
import { computed } from "vue";
import MarkdownRender from "~/components/ui/MarkdownRender.vue";

const props = defineProps({
	plugin: {
		required: true,
		type: Object,
	},
});

const emit = defineEmits(["close"]);

// Mock data for plugin details
const pluginDetails = computed(() => {
	return {
		...props.plugin,
		downloads: props.plugin.downloads || 1000000,
		publisher: props.plugin.publisher || "Unknown Publisher",
		rating: props.plugin.rating || 4.5,
		readme:
			props.plugin.readme ||
			`# ${props.plugin.name}

## Description
${props.plugin.description}

## Features
- Feature 1
- Feature 2
- Feature 3

## Installation
\`\`\`bash
npm install ${props.plugin.name.toLowerCase().replace(/\s+/g, "-")}
\`\`\`

## Usage
\`\`\`javascript
// Example usage
const plugin = require('${props.plugin.name.toLowerCase().replace(/\s+/g, "-")}');
plugin.init();
\`\`\`

## Configuration
You can configure this plugin by adding the following to your configuration file:

\`\`\`json
{
  "plugins": {
    "${props.plugin.name.toLowerCase().replace(/\s+/g, "-")}": {
      "enabled": true,
      "options": {
        "option1": "value1",
        "option2": "value2"
      }
    }
  }
}
\`\`\`

## Changelog
### v${props.plugin.version}
- Initial release
- Added core functionality
- Fixed minor bugs

## License
MIT
`,
	};
});
</script>

<template>
  <div class="h-full w-full flex flex-col bg-white text-gray-900">
    <!-- Header -->
    <div class="flex-shrink-0 p-4 border-b border-gray-200 flex items-center justify-between">
      <div class="flex items-center">
        <div 
          :class="[
            'w-12 h-12 flex items-center justify-center rounded-lg mr-3',
            plugin.enabled 
              ? 'bg-blue-100 text-blue-600' 
              : 'bg-gray-100 text-gray-400'
          ]"
        >
          <div :class="plugin.logo" class="text-2xl"></div>
        </div>
        <div>
          <h2 class="text-xl font-bold">{{ plugin.name }}</h2>
          <div class="flex items-center text-sm text-gray-500">
            <span>{{ plugin.publisher }}</span>
            <span class="mx-2">•</span>
            <span>v{{ plugin.version }}</span>
          </div>
        </div>
      </div>
      <button 
        @click="emit('close')"
        class="p-2 rounded-md hover:bg-gray-100 text-gray-500 hover:text-gray-700"
      >
        <div class="i-mdi-close text-xl"></div>
      </button>
    </div>

    <!-- Stats -->
    <div class="flex-shrink-0 px-4 py-3 border-b border-gray-200 flex items-center text-sm">
      <div class="flex items-center mr-6">
        <div class="i-mdi-star text-yellow-400 mr-1"></div>
        <span>{{ pluginDetails.rating }}</span>
      </div>
      <div class="flex items-center mr-6">
        <div class="i-mdi-download mr-1"></div>
        <span>{{ pluginDetails.downloads?.toLocaleString() }} downloads</span>
      </div>
      <div class="flex items-center">
        <div class="i-mdi-tag mr-1"></div>
        <span>{{ plugin.category }}</span>
      </div>
    </div>

    <!-- Main Content -->
    <div class="flex-1 overflow-y-auto p-4">
      <div class="mb-6">
        <h3 class="text-lg font-semibold mb-2">Description</h3>
        <p class="text-gray-700">{{ plugin.description }}</p>
      </div>

      <div class="mb-6">
        <div class="flex items-center justify-between mb-2">
          <h3 class="text-lg font-semibold">Status</h3>
          <button 
            :class="[
              'px-3 py-1 rounded-full text-sm font-medium',
              plugin.enabled 
                ? 'bg-green-100 text-green-800' 
                : 'bg-gray-100 text-gray-800'
            ]"
          >
            {{ plugin.enabled ? 'Enabled' : 'Disabled' }}
          </button>
        </div>
      </div>

      <div class="mb-6">
        <h3 class="text-lg font-semibold mb-2">README</h3>
        <div class="bg-gray-50 rounded-lg p-4 text-sm prose max-w-none">
          <MarkdownRender :source="pluginDetails.readme" />
        </div>
      </div>
    </div>

    <!-- Footer -->
    <div class="flex-shrink-0 p-4 border-t border-gray-200 flex justify-end">
      <button 
        class="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
      >
        {{ plugin.enabled ? 'Disable' : 'Enable' }}
      </button>
    </div>
  </div>
</template>

<style scoped>
/* Styles are already defined in MarkdownRender component */
</style>