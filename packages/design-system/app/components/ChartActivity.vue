<script setup lang="ts">
import { onMounted, ref } from "vue";

const activityData = ref<number[]>([]);

// Generate mock activity data
onMounted(() => {
	const data: number[] = [];
	for (let i = 0; i < 365; i++) {
		data.push(Math.floor(Math.random() * 5)); // 0 to 4 activity level
	}
	activityData.value = data;
});

const getColorClass = (level: number) => {
	if (level === 0) return "bg-gray-200";
	if (level === 1) return "bg-green-200";
	if (level === 2) return "bg-green-400";
	if (level === 3) return "bg-green-600";
	return "bg-green-800";
};
</script>

<template>
  <div class="bg-white p-4 rounded-lg shadow-md">
    <h3 class="text-lg font-semibold text-gray-800 mb-4">Contribution Activity</h3>
    <div class="grid grid-cols-53 grid-rows-7 gap-1">
      <div
        v-for="(level, index) in activityData"
        :key="index"
        :class="['w-3 h-3 rounded-sm', getColorClass(level)]"
        :title="`Activity level ${level} on day ${index + 1}`"
      ></div>
    </div>
  </div>
</template>

<style scoped>
.grid-cols-53 {
  grid-template-columns: repeat(53, minmax(0, 1fr));
}
</style>
