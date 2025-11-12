<script setup lang="ts">

interface Props {
	title: string;
	description?: string;
	componentName?: string;
	componentPath?: string;
	sourceCode?: string;
	// Any additional props for the component
	[key: string]: any;
}

const props = withDefaults(defineProps<Props>(), {
	componentName: "",
	componentPath: "",
	description: "",
	sourceCode: "",
});

const slots = useSlots();

// Debug logging
console.log("ComponentsPreview received props:", props);

// Reactive data
const showCode = ref(false);
const activeViewport = ref("desktop");

// Computed preview style
const previewStyle = computed(() => {
	const viewports = [
		{ icon: "i-mdi-cellphone", name: "mobile", width: "375px" },
		{ icon: "i-mdi-tablet", name: "tablet", width: "768px" },
		{ icon: "i-mdi-monitor", name: "desktop", width: "100%" },
	];

	const viewport = viewports.find((vp) => vp.name === activeViewport.value);
	return {
		maxWidth: "100%",
		width: viewport?.width || "100%",
	};
});

// Extract component-specific props (excluding our own props)
const componentProps = computed(() => {
	const {
		title,
		description,
		componentName,
		componentPath,
		sourceCode,
		...rest
	} = props;
	return rest;
});

// Check if we have a default slot
const hasDefaultSlot = computed(() => {
	return !!slots.default && slots.default().length > 0;
});
</script>

<template>
  <div class="border rounded-2xl p-5 space-y-5 bg-gradient-to-br from-white to-gray-50 shadow-sm hover:shadow-md transition-shadow duration-300">
    <header class="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
      <div class="flex-1">
        <h2 class="text-2xl font-bold text-gray-900">
          {{ title }}
        </h2>
        <p v-if="description" class="text-sm text-gray-600 font-mono mt-1 truncate">
          {{ description }}
        </p>
      </div>
      <div class="flex items-center gap-2 flex-shrink-0">
        <button
          class="flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-lg hover:bg-gray-100 transition-colors text-gray-700"
          @click="showCode = !showCode"
        >
          <div class="i-mdi-code-tags text-base" />
          <span>Code</span>
        </button>
        <div class="hidden sm:flex items-center">
          <ViewportControl v-model="activeViewport" />
        </div>
        <ToggleTheme />
      </div>
    </header>

    <div class="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-1 min-h-[200px]">
      <div v-if="!showCode" class="h-full flex items-center justify-center">
        <div
          class="w-full bg-white rounded-lg shadow-inner transition-all duration-300 ease-in-out overflow-hidden border border-gray-200"
          :style="previewStyle"
        >
          <div class="p-5 sm:p-6">
            <!-- Render actual component if componentName is provided -->
            <ComponentRenderer 
              v-if="componentName" 
              :component-name="componentName" 
              :component-path="componentPath"
              v-bind="componentProps"
              class="w-full"
            />
            <!-- Use slot if provided -->
            <slot v-else-if="hasDefaultSlot" />
            <!-- Show visual fallback if neither component nor slot is provided -->
            <div v-else class="w-full max-w-md mx-auto">
              <div class="bg-gray-100 rounded-lg border border-gray-200 overflow-hidden">
                <!-- Window title bar -->
                <div class="flex items-center justify-between px-4 py-2 bg-gray-200 border-b border-gray-300">
                  <div class="flex space-x-2">
                    <div class="w-3 h-3 rounded-full bg-red-400"></div>
                    <div class="w-3 h-3 rounded-full bg-yellow-400"></div>
                    <div class="w-3 h-3 rounded-full bg-green-400"></div>
                  </div>
                  <div class="text-xs text-gray-500 font-medium">
                    Component Preview
                  </div>
                  <div class="w-6"></div>
                </div>
                
                <!-- Component preview area -->
                <div class="p-6">
                  <div class="space-y-4">
                    <!-- Header -->
                    <div class="space-y-2">
                      <div class="h-6 bg-gray-300 rounded w-3/4"></div>
                      <div class="h-4 bg-gray-200 rounded w-full"></div>
                      <div class="h-4 bg-gray-200 rounded w-5/6"></div>
                    </div>
                    
                    <!-- Content blocks -->
                    <div class="space-y-3 pt-2">
                      <div class="h-4 bg-gray-200 rounded w-full"></div>
                      <div class="h-4 bg-gray-200 rounded w-11/12"></div>
                      <div class="h-4 bg-gray-200 rounded w-10/12"></div>
                    </div>
                    
                    <!-- Action buttons -->
                    <div class="flex space-x-3 pt-4">
                      <div class="h-10 bg-blue-500 rounded-lg w-24"></div>
                      <div class="h-10 bg-gray-200 rounded-lg w-24"></div>
                    </div>
                  </div>
                </div>
              </div>
              
              <!-- Info message -->
              <div class="text-center mt-6">
                <p class="text-gray-500 text-sm">
                  No component specified for preview
                </p>
                <p class="text-gray-400 text-xs mt-1">
                  Provide a component name to render
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="bg-white rounded-lg border border-gray-200">
        <Codeblock v-if="sourceCode" :code="sourceCode" language="vue" :show-copy-button="true" />
        <div v-else class="p-8 text-center text-gray-500">
          <div class="i-mdi-code-tags text-5xl mb-3 mx-auto text-gray-400" />
          <p class="font-medium">Source code not available</p>
        </div>
      </div>
    </div>
  </div>
</template>