<script setup lang="ts">
import { computed, ref } from "vue";
import Resizer from "~/components/ui/Resizer.vue";

const leftPanelWidth = ref(280);
const rightPanelWidth = ref(280);
const bottomPanelHeight = ref(200);

let startLeftWidth = 0;
let startRightWidth = 0;
let startBottomHeight = 0;

const gridStyle = computed(() => ({
	gridTemplateColumns: `${leftPanelWidth.value}px 5px 1fr 5px ${rightPanelWidth.value}px`,
	gridTemplateRows: `1fr 5px ${bottomPanelHeight.value}px`,
}));

const handleResizeStart = (panel: "left" | "right" | "bottom") => {
	startLeftWidth = leftPanelWidth.value;
	startRightWidth = rightPanelWidth.value;
	startBottomHeight = bottomPanelHeight.value;
};

const handleResizeMove = (
	panel: "left" | "right" | "bottom",
	{ deltaX, deltaY }: { deltaX: number; deltaY: number },
) => {
	if (panel === "left") {
		leftPanelWidth.value = Math.max(50, startLeftWidth + deltaX);
	}
	if (panel === "right") {
		rightPanelWidth.value = Math.max(50, startRightWidth - deltaX);
	}
	if (panel === "bottom") {
		bottomPanelHeight.value = Math.max(50, startBottomHeight - deltaY);
	}
};
</script>

<template>
  <div class="h-screen bg-gray-50 grid overflow-hidden" :style="gridStyle">
    <!-- Left Sidebar -->
    <nav class="hidden md:flex flex-col bg-white/50 overflow-auto row-span-3 border-r border-gray-200">
      <slot name="left" />
    </nav>

    <Resizer direction="horizontal" @resize:start="handleResizeStart('left')" @resize:move="handleResizeMove('left', $event)" class="row-span-3" />

    <!-- Main Content -->
    <main class="flex flex-col overflow-hidden">
      <div class="flex-1 overflow-auto relative">
        <slot name="center" />
      </div>
    </main>

    <Resizer direction="horizontal" @resize:start="handleResizeStart('right')" @resize:move="handleResizeMove('right', $event)" class="row-span-3" />

    <!-- Right Sidebar -->
    <aside class="hidden md:flex flex-col bg-white/50 overflow-auto row-span-3 border-l border-gray-200">
      <slot name="right" />
    </aside>

    <!-- Resizer for Bottom Panel -->
    <Resizer direction="vertical" @resize:start="handleResizeStart('bottom')" @resize:move="handleResizeMove('bottom', $event)" class="col-start-3" />

    <!-- Bottom Panel -->
    <div class="col-start-3 overflow-auto border-t border-gray-200">
      <slot name="center-bottom" />
    </div>
  </div>
</template>
