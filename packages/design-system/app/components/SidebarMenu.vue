<script setup lang="ts">
import { computed, ref } from "vue";
import NavItem from "~/components/ui/NavItem.vue";

interface NavItemData {
	id: string;
	name: string;
	path: string;
}

interface Props {
	navItems?: NavItemData[];
	search?: boolean;
	searchTerm?: string;
}

const props = withDefaults(defineProps<Props>(), {
	navItems: () => [],
	search: false,
	searchTerm: "",
});

const route = useRoute();
const localSearchTerm = ref("");

// Check if current route matches the nav item
const isActive = (path: string): boolean => {
	return route.path === path;
};

// Filter nav items based on search term
const filteredNavItems = computed(() => {
	if (!props.search || (!localSearchTerm.value && !props.searchTerm)) {
		return props.navItems;
	}

	const term = (localSearchTerm.value || props.searchTerm).toLowerCase();
	return (
		props.navItems?.filter((item) => item.name.toLowerCase().includes(term)) ||
		[]
	);
});
</script>

<template>
  <nav class="w-64 bg-white border-r border-gray-200 p-4">
    <div v-if="search" class="mb-4">
      <input
        v-model="localSearchTerm"
        type="text"
        placeholder="Search..."
        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
    
    <NavItem
      v-for="item in filteredNavItems"
      :key="item.id"
      type="link"
      :to="item.path"
      :active="isActive(item.path)"
      :label="item.name"
      layout="vertical"
    />
    <slot />
  </nav>
</template>