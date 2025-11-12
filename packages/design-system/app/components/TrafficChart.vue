<script setup lang="ts">
interface DataPoint {
	name: string;
	visitors: number;
	pageViews: number;
}

interface Props {
	data: DataPoint[];
	height?: number;
}

const props = withDefaults(defineProps<Props>(), {
	height: 320,
});

const chartData = computed(() => {
	if (!props.data.length) return [];

	const maxVisitors = Math.max(...props.data.map((d) => d.visitors));
	const maxPageViews = Math.max(...props.data.map((d) => d.pageViews));

	return props.data.map((item, index) => {
		const x = (index / (props.data.length - 1)) * 100;
		const visitorsY = ((maxVisitors - item.visitors) / maxVisitors) * 100;
		const pageViewsY = ((maxPageViews - item.pageViews) / maxPageViews) * 100;

		return {
			...item,
			pageViewsY,
			visitorsY,
			x,
		};
	});
});
</script>

<template>
  <div class="relative" :style="{ height: `${height}px` }">
    <!-- Chart Area -->
    <div class="absolute inset-0">
      <!-- Grid lines -->
      <div class="absolute inset-0 flex flex-col justify-between text-xs text-gray-400">
        <div v-for="i in 5" :key="i" class="border-t border-gray-200" />
      </div>

      <!-- Y-axis labels -->
      <div class="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-gray-500 -ml-8">
        <div v-for="i in 5" :key="i">{{ Math.round((5 - i) * 1000) }}</div>
      </div>

      <!-- Chart lines -->
      <svg class="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        <!-- Visitors line -->
        <polyline
          :points="chartData.map(d => `${d.x},${d.visitorsY}`).join(' ')"
          fill="none"
          stroke="#3B82F6"
          stroke-width="0.5"
          class="drop-shadow-sm"
        />

        <!-- Page views line -->
        <polyline
          :points="chartData.map(d => `${d.x},${d.pageViewsY}`).join(' ')"
          fill="none"
          stroke="#10B981"
          stroke-width="0.5"
          class="drop-shadow-sm"
        />

        <!-- Data points -->
        <g v-for="point in chartData" :key="point.name">
          <!-- Visitors point -->
          <circle
            :cx="point.x"
            :cy="point.visitorsY"
            r="0.8"
            fill="#3B82F6"
            class="hover:r-1.5 transition-all cursor-pointer"
          />

          <!-- Page views point -->
          <circle
            :cx="point.x"
            :cy="point.pageViewsY"
            r="0.8"
            fill="#10B981"
            class="hover:r-1.5 transition-all cursor-pointer"
          />
        </g>
      </svg>
    </div>

    <!-- Legend -->
    <div class="absolute bottom-0 left-0 right-0 flex justify-center gap-6 text-sm">
      <div class="flex items-center gap-2">
        <div class="w-3 h-3 bg-blue-500 rounded-full"></div>
        <span class="text-gray-600">Visitors</span>
      </div>
      <div class="flex items-center gap-2">
        <div class="w-3 h-3 bg-green-500 rounded-full"></div>
        <span class="text-gray-600">Page Views</span>
      </div>
    </div>

    <!-- X-axis labels -->
    <div class="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-gray-500 -mb-6">
      <span v-for="point in chartData" :key="point.name" class="text-center" style="width: 20px;">
        {{ point.name }}
      </span>
    </div>
  </div>
</template>
