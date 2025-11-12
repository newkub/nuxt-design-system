<script setup lang="ts">
import { computed, ref } from "vue";
import ToggleTheme from "~/components/ui/ToggleTheme.vue";

interface Props {
	initialUrl?: string;
}
const props = withDefaults(defineProps<Props>(), {
	initialUrl: "https://wrikka.com",
});

const urlInput = ref(props.initialUrl);
const iframeUrl = ref(props.initialUrl);
const iframe = ref<HTMLIFrameElement | null>(null);
const isLoading = ref(true);

type ResponsiveMode = "desktop" | "tablet" | "mobile";
const responsiveMode = ref<ResponsiveMode>("desktop");

const navigate = () => {
	let url = urlInput.value;
	if (!url.startsWith("http://") && !url.startsWith("https://")) {
		url = `https://${url}`;
	}
	iframeUrl.value = url;
	isLoading.value = true;
};

const reload = () => {
	if (iframe.value) {
		isLoading.value = true;
		// Force reload by changing the src attribute slightly or using the reload method
		iframe.value.src = iframeUrl.value;
	}
};

const onIframeLoad = () => {
	isLoading.value = false;
	try {
		if (iframe.value?.contentWindow) {
			// This might fail due to CORS, but it's a good-to-have
			urlInput.value = iframe.value.contentWindow.location.href;
		}
	} catch (error) {
		console.warn("Cannot access iframe location due to CORS policy.");
	}
};

const responsiveClasses = computed(() => {
	switch (responsiveMode.value) {
		case "tablet":
			return "w-[768px] h-[1024px]";
		case "mobile":
			return "w-[375px] h-[667px]";
		default:
			return "w-full h-full";
	}
});

const responsiveDevices = [
	{ icon: "i-mdi-desktop-mac", id: "desktop" },
	{ icon: "i-mdi-tablet-ipad", id: "tablet" },
	{ icon: "i-mdi-cellphone", id: "mobile" },
] as const;
</script>

<template>
  <div class="h-full w-full relative flex-1 flex flex-col bg-gray-100 text-gray-800">
    <!-- Browser Controls -->
    <div class="bg-gray-50 px-3 py-2 border-b border-gray-200 flex items-center gap-3 flex-wrap">
      <!-- Navigation & URL Bar -->
      <div class="flex items-center gap-1">
        <button @click="navigateTo('/code')" class="p-2 rounded-full hover:bg-gray-200 transition-colors">
          <div class="i-mdi-home w-5 h-5" />
        </button>
        <button @click="reload" class="p-2 rounded-full hover:bg-gray-200 transition-colors">
          <div class="i-mdi-refresh w-5 h-5" :class="{ 'animate-spin': isLoading }" />
        </button>
      </div>
      <div class="flex-1 min-w-0">
        <form @submit.prevent="navigate" class="relative">
          <div class="i-mdi-lock absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input 
            v-model="urlInput" 
            type="text" 
            class="w-full bg-white border border-gray-300 rounded-full py-1.5 pl-9 pr-4 text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition"
            placeholder="https://example.com"
          />
        </form>
      </div>

      <!-- Responsive and Theme Toggles -->
      <div class="flex items-center gap-2">
        <!-- Responsive Tools -->
        <div class="flex items-center bg-gray-200 rounded-full p-0.5">
          <button 
            v-for="device in responsiveDevices" 
            :key="device.id" 
            @click="responsiveMode = device.id"
            class="p-1.5 rounded-full transition-colors"
            :class="responsiveMode === device.id ? 'bg-white text-primary-500' : 'hover:bg-gray-300'"
          >
            <div :class="[device.icon, 'w-5 h-5']" />
          </button>
          
          <!-- Theme Toggle -->
          <ToggleTheme />
        </div>
      </div>
    </div>

    <!-- iFrame Preview -->
    <div class="flex-1 p-4 overflow-auto flex justify-center items-center">
      <div
        class="bg-white shadow-lg rounded-lg transition-all duration-300 ease-in-out mx-auto"
        :class="responsiveClasses"
      >
        <iframe 
          ref="iframe"
          :src="iframeUrl"
          @load="onIframeLoad"
          class="w-full h-full border-0 rounded-lg"
          sandbox="allow-scripts allow-same-origin allow-forms"
        ></iframe>
      </div>
    </div>
  </div>
</template>
