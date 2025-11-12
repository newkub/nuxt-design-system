<script setup lang="ts">
interface DeviceData {
	device: string;
	percentage: number;
	color: string;
}

interface Props {
	data: DeviceData[];
}

const props = defineProps<Props>();

const total = computed(() =>
	props.data.reduce((sum, item) => sum + item.percentage, 0),
);

const chartData = computed(() => {
	let cumulative = 0;
	return props.data.map((item) => {
		const start = cumulative;
		cumulative += item.percentage;
		return {
			...item,
			end: cumulative,
			percentage: item.percentage,
			start,
		};
	});
});
</script>

<template>
  <div class="space-y-4">
    <div class="relative h-4 bg-gray-200 rounded-full overflow-hidden">
      <div
        v-for="segment in chartData"
        :key="segment.device"
        class="absolute h-full rounded-full transition-all duration-500"
        :class="segment.color"
        :style="{
          left: `${segment.start}%`,
          width: `${segment.percentage}%`
        }"
      />
    </div>

    <div class="grid grid-cols-3 gap-4 text-sm">
      <div v-for="item in data" :key="item.device" class="text-center">
        <div class="flex items-center justify-center gap-2 mb-1">
          <div :class="['w-3 h-3 rounded-full', item.color]"></div>
          <span class="font-medium">{{ item.device }}</span>
        </div>
        <div class="text-gray-600">{{ item.percentage }}%</div>
      </div>
    </div>
  </div>
</template>
