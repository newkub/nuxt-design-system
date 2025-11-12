<script setup lang="ts">
import { ref } from "vue";
import MenuContext from "./MenuContext.vue";

interface Props {
	showText?: boolean;
}

withDefaults(defineProps<Props>(), {
	showText: true,
});

const menuContextVisible = ref(false);
const menuContextX = ref(0);
const menuContextY = ref(0);

// Reordered menu items with "Open in New Tab" at the top
const menuContextItems = [
	{
		action: "open-new-tab",
		icon: "i-mdi-open-in-new",
		label: "Open in New Tab",
	},
	{ action: "download-image", icon: "i-mdi-download", label: "Download Image" },
	{ action: "copy-image-url", icon: "i-mdi-link", label: "Copy Image URL" },
	{ separator: true },
	{
		icon: "i-mdi-share-variant",
		label: "Social Media",
		submenu: [
			{ action: "social-twitter", icon: "i-mdi-twitter", label: "Twitter" },
			{ action: "social-facebook", icon: "i-mdi-facebook", label: "Facebook" },
			{ action: "social-linkedin", icon: "i-mdi-linkedin", label: "LinkedIn" },
			{
				action: "social-instagram",
				icon: "i-mdi-instagram",
				label: "Instagram",
			},
		],
	},
];

function showMenuContext(event: MouseEvent) {
	event.preventDefault();
	menuContextVisible.value = true;
	menuContextX.value = event.clientX;
	menuContextY.value = event.clientY;
}

interface MenuItem {
	action: string;
	icon?: string;
	label?: string;
	separator?: boolean;
	submenu?: MenuItem[];
}

function handleMenuContextAction(item: MenuItem) {
	switch (item.action) {
		case "download-image": {
			// Download logo image
			const link = document.createElement("a");
			link.href = "/favicon.ico";
			link.download = "wrikka-logo.png";
			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);
			break;
		}
		case "copy-image-url": {
			// Copy image URL to clipboard
			navigator.clipboard.writeText(`${window.location.origin}/favicon.ico`);
			break;
		}
		case "open-new-tab": {
			// Open logo image in new tab
			window.open("/favicon.ico", "_blank");
			break;
		}
		case "social-twitter": {
			window.open("https://twitter.com/wrikka", "_blank");
			break;
		}
		case "social-facebook": {
			window.open("https://facebook.com/wrikka", "_blank");
			break;
		}
		case "social-linkedin": {
			window.open("https://linkedin.com/company/wrikka", "_blank");
			break;
		}
		case "social-instagram": {
			window.open("https://instagram.com/wrikka", "_blank");
			break;
		}
	}
	menuContextVisible.value = false;
}

function closeMenuContext() {
	menuContextVisible.value = false;
}
</script>

<template>
  <div class="relative">
    <NuxtLink
      to="/"
      class="flex items-center cursor-pointer"
      @contextmenu="showMenuContext"
    >
      <img src="/favicon.ico" alt="Logo" class="w-8 h-8">
      <span v-if="showText" class="ml-2 text-lg font-bold">Wrikka</span>
    </NuxtLink>

    <MenuContext
      :show="menuContextVisible"
      :x="menuContextX"
      :y="menuContextY"
      :items="menuContextItems"
      @item-click="handleMenuContextAction"
      @close="closeMenuContext"
    >
      <template #bottom>
        <div class="px-3 py-2 text-xs text-gray-500">
          Right-click for more options
        </div>
      </template>
    </MenuContext>
  </div>
</template>