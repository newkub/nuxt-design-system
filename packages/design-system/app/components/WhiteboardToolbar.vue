<script setup lang="ts">
import { ref, watch } from "vue";
import IconPicker from "./IconPicker.vue";

interface Props {
	currentTool: string;
}

const props = defineProps<Props>();
const emit = defineEmits<{
	selectTool: [tool: string, option?: string];
	selectColor: [color: string];
}>();

const showIconPicker = ref(false);
const showShapePicker = ref(false);

const handleSelectIcon = (icon: string) => {
	emit("selectTool", "icon", icon);
	showIconPicker.value = false;
};

const handleSelectShape = (shapeId: string) => {
	emit("selectTool", "shape", shapeId);
	showShapePicker.value = false;
};

const handleToolClick = (toolId: string) => {
	if (toolId === "icon") {
		showIconPicker.value = !showIconPicker.value;
		showShapePicker.value = false;
	} else if (toolId === "shape") {
		showShapePicker.value = !showShapePicker.value;
		showIconPicker.value = false;
	} else {
		emit("selectTool", toolId);
		showIconPicker.value = false;
		showShapePicker.value = false;
	}
};

const tools = [
	{ icon: "i-mdi-pencil", id: "pencil", label: "Pencil" },
	{ icon: "i-mdi-marker", id: "highlighter", label: "Highlighter" },
	{ icon: "i-mdi-eraser", id: "eraser", label: "Eraser" },
	{ icon: "i-mdi-minus", id: "line", label: "Line" },
	{ icon: "i-mdi-shape-outline", id: "shape", label: "Shapes" },
	{ icon: "i-mdi-arrow-top-right", id: "arrow", label: "Arrow" },
	{ icon: "i-mdi-format-text", id: "text", label: "Text" },
	{ icon: "i-mdi-note-text", id: "sticky", label: "Sticky Note" },
	{ icon: "i-mdi-image", id: "image", label: "Image" },
	{ icon: "i-mdi-emoticon-happy-outline", id: "icon", label: "Icon" },
];

const shapeTools = [
	{ icon: "i-mdi-rectangle-outline", id: "rectangle", label: "Rectangle" },
	{ icon: "i-mdi-circle-outline", id: "circle", label: "Circle" },
	{ icon: "i-mdi-triangle-outline", id: "triangle", label: "Triangle" },
	{ icon: "i-mdi-ellipse-outline", id: "ellipse", label: "Ellipse" },
];

const color = ref("#000000");

watch(color, (newColor) => {
	emit("selectColor", newColor);
});
</script>

<template>
  <IconPicker v-if="showIconPicker" @select-icon="handleSelectIcon" />
  <div v-if="showShapePicker" class="absolute top-20 left-1/2 -translate-x-1/2 bg-white p-2 rounded-lg shadow-lg flex gap-2 border border-gray-200 z-10">
    <button
      v-for="shape in shapeTools"
      :key="shape.id"
      @click="handleSelectShape(shape.id)"
      class="p-2 rounded-md hover:bg-gray-100 transition-colors"
      :title="shape.label"
    >
      <div :class="[shape.icon, 'w-6 h-6']" />
    </button>
  </div>
  <div class="absolute top-4 left-1/2 -translate-x-1/2 bg-white p-2 rounded-lg shadow-lg flex gap-2 border border-gray-200 z-10">
    <button
      v-for="tool in tools"
      :key="tool.id"
      @click="handleToolClick(tool.id)"
      class="p-2 rounded-md hover:bg-gray-100 transition-colors relative group"
      :class="{ 'bg-blue-100 text-blue-700': currentTool === tool.id }"
      :title="tool.label"
    >
      <div :class="[tool.icon, 'w-6 h-6']" />
      <div class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
        {{ tool.label }}
      </div>
    </button>
    <div class="relative p-2 rounded-md hover:bg-gray-100 transition-colors">
      <input
        v-model="color"
        type="color"
        class="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
      />
      <div class="i-mdi-palette w-6 h-6" :style="{ color: color }" />
    </div>
  </div>
</template>
