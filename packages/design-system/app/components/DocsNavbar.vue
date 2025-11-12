<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import MenuItems from "~/components/ui/MenuItems.vue";
import type { MenuItem } from "~/composables/useContent";

// Define component props for the navigation items.
const props = defineProps<{
	items: MenuItem[];
}>();

const route = useRoute();
const router = useRouter();

const handleNavigate = (to: string) => {
	router.push(to);
};
</script>

<template>
  <div class="flex items-center h-full">
    <MenuItems 
      :items="props.items" 
      layout="horizontal"
      variant="underline"
      @item-click="handleNavigate"
    />
  </div>
</template>
