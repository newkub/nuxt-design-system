<script setup lang="ts">
import { computed } from "vue";

interface Props {
	type?: "link" | "button";
	to?: string;
	active?: boolean;
	collapsed?: boolean;
	layout?: "horizontal" | "vertical";
	icon?: string;
	label: string;
	isFolder?: boolean;
	isExpanded?: boolean;
	// Context menu support
	contextMenu?: boolean;
	// Custom styling props
	padding?: string;
	borderRadius?: string;
	fontSize?: string;
	activeBgColor?: string;
	activeTextColor?: string;
	inactiveTextColor?: string;
	hoverBgColor?: string;
	hoverTextColor?: string;
	// Spacing props
	spacing?: string;
}

const props = withDefaults(defineProps<Props>(), {
	active: false,
	activeBgColor: "bg-blue-100",
	activeTextColor: "text-blue-700",
	borderRadius: "rounded-md",
	collapsed: false,
	contextMenu: false,
	fontSize: "text-sm",
	hoverBgColor: "hover:bg-gray-100",
	hoverTextColor: "",
	inactiveTextColor: "text-gray-700",
	layout: "horizontal",
	padding: "px-3 py-2",
	spacing: "mb-1 last:mb-0",
	type: "button",
});

const emit = defineEmits(["click", "contextmenu"]);

const itemClasses = computed(() => {
	// Base styling for both layouts
	const baseClasses = [
		props.padding,
		props.fontSize,
		"font-medium",
		props.borderRadius,
		"whitespace-nowrap",
		props.active
			? `${props.activeBgColor} ${props.activeTextColor}`
			: `${props.inactiveTextColor} ${props.hoverBgColor} ${props.hoverTextColor}`,
	];

	// Add layout-specific classes
	if (props.layout === "vertical") {
		if (props.collapsed) {
			// Collapsed vertical: items stacked vertically, each taking full width
			baseClasses.push("flex flex-col items-center justify-center w-full");
		} else {
			// Vertical: items stacked vertically, each taking full width
			baseClasses.push("flex items-center w-full");
		}
	}

	// Add spacing classes
	if (props.layout === "vertical") {
		baseClasses.push(props.spacing);
	}

	// Add context menu support class
	if (props.contextMenu) {
		baseClasses.push("context-menu-support");
	}

	return baseClasses;
});

const iconClasses = computed(() => {
	const classes = [
		"w-5 h-5 flex-shrink-0",
		props.layout === "vertical" && !props.collapsed ? "mr-3" : "",
		props.layout === "vertical" && props.collapsed ? "mb-1" : "",
	];

	// Add the icon class if it exists
	if (props.icon) {
		classes.unshift(props.icon);
	}

	return classes;
});

const labelClasses = computed(() => [
	"font-medium",
	props.collapsed && props.layout === "vertical" ? "text-xs" : props.fontSize,
]);

function handleClick() {
	if (props.type === "button") {
		emit("click");
	}
}

function handleContextMenu(event: MouseEvent) {
	if (props.contextMenu) {
		event.preventDefault();
		emit("contextmenu", event);
	}
}
</script>

<template>
  <NuxtLink
    v-if="type === 'link' && to"
    :to="to"
    :title="collapsed ? label : undefined"
    :class="itemClasses"
    @contextmenu="handleContextMenu"
  >
    <slot name="item" :item="props">
      <i v-if="icon" :class="iconClasses" />
      <span :class="[labelClasses, 'flex-1 text-left']">{{ label }}</span>
      <i 
        v-if="isFolder"
        :class="[
          'i-mdi-chevron-down w-4 h-4 transition-transform duration-200 text-gray-400',
          isExpanded ? 'rotate-180' : ''
        ]" 
      />
    </slot>
  </NuxtLink>
  <button
    v-else
    :title="collapsed ? label : undefined"
    :class="itemClasses"
    @click="handleClick"
    @contextmenu="handleContextMenu"
  >
    <slot name="item" :item="props">
      <i v-if="icon" :class="iconClasses" />
      <span :class="[labelClasses, 'flex-1 text-left']">{{ label }}</span>
      <i 
        v-if="isFolder"
        :class="[
          'i-mdi-chevron-down w-4 h-4 transition-transform duration-200 text-gray-400',
          isExpanded ? 'rotate-180' : ''
        ]" 
      />
    </slot>
  </button>
</template>
