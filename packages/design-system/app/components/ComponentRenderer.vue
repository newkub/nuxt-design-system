<script setup lang="ts">
import { computed, defineAsyncComponent, ref, watch } from "vue";
import Skeleton from "./Skeleton.vue";

interface Props {
	componentName: string;
	componentPath?: string;
	// Any additional props will be passed through to the component
	[key: string]: any;
}

const props = withDefaults(defineProps<Props>(), {
	componentPath: "",
});

const error = ref<string | null>(null);
const isLoading = ref(false);

// Log props for debugging
console.log("ComponentRenderer received props:", props);

// Create a dynamic import function that can handle different paths
async function importComponent() {
	try {
		console.log("Attempting to import component:", {
			name: props.componentName,
			path: props.componentPath,
		});

		// Special handling for common components
		switch (props.componentName) {
			case "Button":
				return await import("~/components/ui/Button.vue");
			case "Input":
				return await import("~/components/ui/Input.vue");
			case "Card":
				return await import("~/components/ui/Card.vue");
			case "CardHeader":
				return await import("~/components/ui/CardHeader.vue");
			case "CardTitle":
				return await import("~/components/ui/CardTitle.vue");
			case "CardContent":
				return await import("~/components/ui/CardContent.vue");
			case "CardFooter":
				return await import("~/components/ui/CardFooter.vue");
			case "Alert":
				return await import("~/components/ui/Alert.vue");
			case "Badge":
				return await import("~/components/ui/Badge.vue");
			case "Avatar":
				return await import("~/components/ui/Avatar.vue");
			case "Checkbox":
				return await import("~/components/ui/Checkbox.vue");
			case "Switch":
				return await import("~/components/ui/Switch.vue");
			case "Toggle":
				return await import("~/components/ui/Toggle.vue");
			case "Progress":
				return await import("~/components/ui/Progress.vue");
			case "Label":
				return await import("~/components/ui/Label.vue");
			case "Tooltip":
				return await import("~/components/ui/Tooltip.vue");
			case "Separator":
				return await import("~/components/ui/Separator.vue");
			case "Skeleton":
				return await import("~/components/ui/Skeleton.vue");
			// Add more components as needed
		}

		// If we have a specific path, try to import from that path
		if (props.componentPath) {
			// Handle different path formats
			let importPath = props.componentPath;

			// Convert absolute paths to relative imports
			if (importPath.startsWith("app/components/ui/")) {
				importPath = `~/${importPath}`;
			} else if (importPath.startsWith("/app/components/ui/")) {
				importPath = `~${importPath}`;
			} else if (importPath.startsWith("app/")) {
				importPath = `~/${importPath}`;
			} else if (importPath.startsWith("/app/")) {
				importPath = `~${importPath}`;
			} else if (!importPath.startsWith("~")) {
				// Assume it's in the components/ui directory
				importPath = `~/components/ui/${props.componentName}.vue`;
			}

			console.log(`Attempting to import with path: ${importPath}`);

			// Try different import strategies
			try {
				// First try direct import
				return await import(/* @vite-ignore */ importPath);
			} catch (e) {
				console.log("Direct import failed, trying alternative paths...");

				// Try without .vue extension
				if (importPath.endsWith(".vue")) {
					const noExtPath = importPath.slice(0, -4);
					try {
						return await import(/* @vite-ignore */ noExtPath);
					} catch (e2) {
						console.log("Import without extension failed");
					}
				}

				// Try with ~/components/ui/ prefix
				const fallbackPath = `~/components/ui/${props.componentName}.vue`;
				if (fallbackPath !== importPath) {
					try {
						return await import(/* @vite-ignore */ fallbackPath);
					} catch (e3) {
						console.log("Fallback import failed");
					}
				}

				throw e;
			}
		}

		// Fallback to dynamic import by name for components in the ui directory
		const fallbackPath = `~/components/ui/${props.componentName}.vue`;
		console.log(`Falling back to import: ${fallbackPath}`);
		return await import(/* @vite-ignore */ fallbackPath);
	} catch (e: any) {
		console.error(`Failed to import component ${props.componentName}:`, e);
		throw new Error(
			`Failed to load component ${props.componentName}: ${e.message || e}`,
		);
	}
}

// Create the async component dynamically
const AsyncComponent = computed(() => {
	// Only create async component if we have a component name
	if (props.componentName) {
		try {
			console.log(`Creating async component for: ${props.componentName}`);
			return defineAsyncComponent({
				delay: 200,
				errorComponent: {
					props: ["componentName", "errorMessage", "componentPath"],
					template: `
            <div class="text-red-500 p-6 text-center rounded-lg bg-red-50 border border-red-200">
              <div class="i-mdi-alert-circle text-4xl mb-3 mx-auto text-red-500" />
              <p class="font-medium">Failed to load component: {{ componentName }}</p>
              <p class="text-sm mt-1">{{ errorMessage }}</p>
              <p class="text-xs mt-2 text-gray-500">Component path: {{ componentPath }}</p>
            </div>
          `,
				},
				loader: importComponent,
				loadingComponent: Skeleton,
				timeout: 10000,
			});
		} catch (e: any) {
			console.error(
				`Failed to create async component for ${props.componentName}:`,
				e,
			);
			error.value = `Failed to create component ${props.componentName}: ${e.message || e}`;
			return null;
		}
	}

	return null;
});

// Extract component-specific props (excluding componentName and componentPath)
const componentProps = computed(() => {
	const { componentName, componentPath, ...rest } = props;
	console.log("Component props to pass through:", rest);
	return rest;
});

// Watch for component name changes
watch(
	() => props.componentName,
	(newName, oldName) => {
		console.log(`Component name changed from ${oldName} to ${newName}`);
		error.value = null;
	},
	{ immediate: true },
);
</script>

<template>
  <div class="w-full">
    <div v-if="!componentName" class="text-gray-500 p-6 text-center rounded-lg bg-gray-50 border border-gray-200">
      <div class="i-mdi-help-circle text-4xl mb-3 mx-auto text-gray-400" />
      <p class="font-medium">No component name provided</p>
    </div>
    <component 
      v-else-if="AsyncComponent && !error" 
      :is="AsyncComponent" 
      v-bind="componentProps"
      class="w-full"
    />
    <div v-else-if="error" class="text-red-500 p-6 text-center rounded-lg bg-red-50 border border-red-200">
      <div class="i-mdi-alert-circle text-4xl mb-3 mx-auto text-red-500" />
      <p class="font-medium">Failed to load component: {{ componentName }}</p>
      <p class="text-sm mt-1">{{ error }}</p>
    </div>
    <div v-else class="text-gray-500 p-6 text-center rounded-lg bg-gray-50 border border-gray-200">
      <div class="i-mdi-eye-off text-4xl mb-3 mx-auto text-gray-400" />
      <p class="font-medium">Component {{ componentName }} cannot be previewed</p>
      <p class="text-sm mt-1">No preview available</p>
    </div>
  </div>
</template>