<script setup lang="ts">
interface Props {
	lastUpdated?: string;
}

const props = defineProps<Props>();

const formattedDate = computed(() => {
	if (props.lastUpdated) {
		return new Date(props.lastUpdated).toLocaleDateString();
	}
	return new Date().toLocaleDateString();
});

const scrollToTop = () => {
	if (typeof window !== "undefined") {
		window.scrollTo({ behavior: "smooth", top: 0 });
	}
};
</script>

<template>
  <footer class="px-6 py-8 md:px-10 md:py-10 border-t mt-16 bg-gray-50/50">
    <div class="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
      <div class="flex items-center gap-2 text-sm text-gray-600">
        <div class="i-mdi-clock-outline text-base" />
        <span>Last updated: <span class="font-medium text-gray-900">{{ formattedDate }}</span></span>
      </div>
      <button 
        class="flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-primary hover:text-white bg-primary/10 hover:bg-primary rounded-lg transition-all shadow-sm hover:shadow-md transform hover:-translate-y-0.5"
        @click="scrollToTop"
      >
        <div class="i-mdi-arrow-up text-base" />
        <span>Back to top</span>
      </button>
    </div>
  </footer>
</template>
