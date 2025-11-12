<script setup lang="ts">
import type Search from "~/components/ui/Search.vue";

const props = defineProps<{
	initialQuery?: string;
}>();

const { allApps } = useApps();
const router = useRouter();
const route = useRoute();

// Use the composable for command palette logic
const { isCommandPaletteOpen, initialSearchQuery } = useCommandPalette();

const searchQuery = ref(props.initialQuery || "");
const activeTab = ref("all");
const focusedIndex = ref(0);
const searchRef = ref<InstanceType<typeof Search> | null>(null);

// Tab configuration
const TABS = [
	{ icon: "i-mdi-apps", label: "All", value: "all" },
	{ icon: "i-mdi-message", label: "Chat", value: "chat" },
	{ icon: "i-mdi-calendar", label: "Calendar", value: "calendar" },
	{ icon: "i-mdi-file-document", label: "Docs", value: "docs" },
] as const;

// Computed properties for filtering
const filteredApps = computed(() => {
	let filtered = allApps.value;

	// Filter by search query
	if (searchQuery.value) {
		const query = searchQuery.value.toLowerCase();
		filtered = filtered.filter(
			(app) =>
				app.label.toLowerCase().includes(query) ||
				app.description.toLowerCase().includes(query) ||
				app.category?.toLowerCase().includes(query),
		);
	}

	// Filter by tab
	if (activeTab.value !== "all") {
		filtered = filtered.filter((app) =>
			app.to.toLowerCase().includes(activeTab.value.toLowerCase()),
		);
	}

	return filtered;
});

const searchResults = computed(() => {
	return filteredApps.value;
});

// Keyboard navigation
function handleSearchKeydown(event: KeyboardEvent) {
	switch (event.key) {
		case "Tab":
			event.preventDefault();
			cycleTabs();
			break;
		case "ArrowDown":
			event.preventDefault();
			moveFocusDown();
			break;
		case "ArrowUp":
			event.preventDefault();
			moveFocusUp();
			break;
		case "Enter":
			event.preventDefault();
			selectFocusedItem();
			break;
		case "Backspace":
		case "Delete":
			if (searchQuery.value === "") {
				// Close the command palette when search is empty and user presses delete/backspace
				isCommandPaletteOpen.value = false;
			}
			break;
		default:
			// Allow other keys to be handled normally
			break;
	}
}

function cycleTabs() {
	const currentIndex = TABS.findIndex((tab) => tab.value === activeTab.value);
	if (currentIndex !== -1) {
		const nextIndex = (currentIndex + 1) % TABS.length;
		const nextTab = TABS[nextIndex];
		if (nextTab !== undefined) {
			activeTab.value = nextTab.value;
			focusedIndex.value = 0;
		}
	}
}

function moveFocusDown() {
	focusedIndex.value = Math.min(
		focusedIndex.value + 1,
		Math.max(0, searchResults.value.length - 1),
	);
}

function moveFocusUp() {
	focusedIndex.value = Math.max(focusedIndex.value - 1, 0);
}

function selectFocusedItem() {
	const selectedItem = searchResults.value[focusedIndex.value];
	if (selectedItem) {
		router.push(selectedItem.to);
		isCommandPaletteOpen.value = false;
	}
}

// Lifecycle hooks
watch(isCommandPaletteOpen, (newValue) => {
	if (!newValue) {
		searchQuery.value = "";
		activeTab.value = "all";
		focusedIndex.value = 0;
	} else {
		// Set initial query when opening
		if (props.initialQuery || initialSearchQuery.value) {
			searchQuery.value = props.initialQuery || initialSearchQuery.value;
		}
		// When opening, focus the search input after a short delay
		nextTick(() => {
			setTimeout(() => {
				searchRef.value?.focus();
			}, 50);
		});
	}
});

// Reset focused index when search results change
watch([searchResults, activeTab], () => {
	focusedIndex.value = 0;
});

// Close modal when route changes
watch(
	() => route.path,
	() => {
		if (isCommandPaletteOpen.value) {
			isCommandPaletteOpen.value = false;
		}
	},
);

// Watch for initialQuery changes
watch(
	() => props.initialQuery,
	(newQuery) => {
		if (isCommandPaletteOpen.value && newQuery) {
			searchQuery.value = newQuery;
		}
	},
);

// Expose focus method
defineExpose({
	focus: () => {
		searchRef.value?.focus();
	},
});
</script>

<template>
  <Modal v-model="isCommandPaletteOpen" :show-header="false" panel-class="max-w-2xl">
    <div class="p-2">
      <Search 
        ref="searchRef"
        v-model="searchQuery" 
        placeholder="Search apps..." 
        @keydown="handleSearchKeydown"
      />
    </div>

    <div class="border-t border-gray-200" />

    <!-- Tabs -->
    <div class="flex gap-1 px-2 pt-2 border-b border-gray-200">
      <button
        v-for="tab in TABS"
        :key="tab.value"
        type="button"
        :class="[
          'flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md transition-colors',
          activeTab === tab.value
            ? 'bg-gray-100 text-blue-600'
            : 'text-gray-600 hover:bg-gray-100'
        ]"
        @click="activeTab = tab.value"
      >
        <div :class="[tab.icon, 'w-4 h-4']" />
        <span>{{ tab.label }}</span>
      </button>
    </div>

    <!-- Results -->
    <div class="max-h-[400px] overflow-y-auto p-2">
      <div v-if="searchResults.length === 0" class="py-12 text-center text-sm text-gray-500">
        No results found.
      </div>
      <div v-else class="flex flex-col gap-1">
        <NuxtLink
          v-for="(item, index) in searchResults"
          :key="item.to"
          :to="item.to"
          :class="[
            'flex p-3 rounded-lg text-gray-600 group transition-all duration-200 w-full items-center justify-start',
            focusedIndex === index 
              ? 'bg-blue-100 text-blue-700 ring-2 ring-blue-500' 
              : 'hover:bg-gray-100'
          ]"
          @mouseenter="focusedIndex = index"
        >
          <div
            v-if="item.icon"
            :class="[item.icon, 'w-5 h-5 flex-shrink-0 mr-3']"
          />
          <div class="flex flex-col">
            <span class="font-medium text-sm">{{ item.label }}</span>
            <span class="text-xs text-gray-500">{{ item.description }}</span>
          </div>
        </NuxtLink>
      </div>
    </div>
  </Modal>
</template>