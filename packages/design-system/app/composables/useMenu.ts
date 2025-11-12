import { useEventBus } from "@vueuse/core";
import type { MenuItem } from "~/app/types/menu";
import type {
	GenericMenuOptions,
	MenuCoordinationOptions,
	MenuFilterOptions,
	MenuKeyboardOptions,
	MenuPositionOptions,
	SubmenuOptions,
} from "~/app/types/menu";

// === Menu Position Composable ===
export function useMenuPosition(options: MenuPositionOptions) {
	const menuPosition = ref({ left: 0, top: 0 });

	const updatePosition = () => {
		if (!options.menuRef.value || !options.isVisible.value) return;

		nextTick(() => {
			const menuHeight = options.menuRef.value?.offsetHeight || 0;
			const menuWidth = options.menuRef.value?.offsetWidth || 0;
			const viewportHeight = window.innerHeight;
			const viewportWidth = window.innerWidth;

			let top = options.menuY.value;
			let left = options.menuX.value;

			// Different positioning strategies
			if (options.positioning === "above-cursor") {
				// For input fields: position above cursor
				top = options.menuY.value - menuHeight - 24;
				left = options.menuX.value;

				// If not enough space above, show below
				if (top < 10) {
					top = options.menuY.value + 32;
				}
			} else if (options.positioning === "right-of") {
				// Position to the right of the reference point
				top = options.menuY.value;
				left = options.menuX.value + 8;
			} else if (options.positioning === "left-of") {
				// Position to the left of the reference point
				top = options.menuY.value;
				left = options.menuX.value - menuWidth - 8;
			} else {
				// Auto positioning: Calculate which quadrant the mouse is in
				const mouseX = options.menuX.value;
				const mouseY = options.menuY.value;
				const isLeftSide = mouseX < viewportWidth / 2;
				const isTopSide = mouseY < viewportHeight / 2;

				// Smart positioning based on quadrant
				if (isTopSide && isLeftSide) {
					// Top-left quadrant: show menu bottom-right
					top = mouseY + 8;
					left = mouseX + 8;
				} else if (isTopSide && !isLeftSide) {
					// Top-right quadrant: show menu bottom-left
					top = mouseY + 8;
					left = mouseX - menuWidth - 8;
				} else if (!isTopSide && isLeftSide) {
					// Bottom-left quadrant: show menu top-right
					top = mouseY - menuHeight - 8;
					left = mouseX + 8;
				} else {
					// Bottom-right quadrant: show menu top-left
					top = mouseY - menuHeight - 8;
					left = mouseX - menuWidth - 8;
				}
			}

			// Ensure menu doesn't go off screen (with padding)
			const padding = 10;
			if (top < padding) {
				top = padding;
			}
			if (top + menuHeight > viewportHeight - padding) {
				top = viewportHeight - menuHeight - padding;
			}
			if (left < padding) {
				left = padding;
			}
			if (left + menuWidth > viewportWidth - padding) {
				left = viewportWidth - menuWidth - padding;
			}

			menuPosition.value = { left, top };
		});
	};

	return {
		menuPosition,
		updatePosition,
	};
}

// === Menu Keyboard Navigation Composable ===
export function useMenuKeyboard(
	options: MenuKeyboardOptions & { handleItemClick: (item: any) => void },
) {
	const setupKeyboardNavigation = () => {
		// Use the general keyboard navigation utility
		useKeyboardNavigation({
			activeIndex: options.activeIndex,
			isVisible: options.isVisible,
			items: options.selectableItems,
			onClose: options.onClose,
			onSelect: options.handleItemClick,
		});
	};

	return {
		setupKeyboardNavigation,
	};
}

// === Menu Filter Composable ===
export function useMenuFilter(options: MenuFilterOptions) {
	const filteredItems = computed(() => {
		if (!options.searchQuery.value) {
			return options.items.value;
		}
		return options.items.value.filter(
			(item) =>
				!item.separator &&
				item.label
					?.toLowerCase()
					.includes(options.searchQuery.value.toLowerCase()),
		);
	});

	const selectableItems = computed(() =>
		filteredItems.value.filter((item) => !item.separator && item.action),
	);

	return {
		filteredItems,
		selectableItems,
	};
}

// === Submenu Composable ===
export function useSubmenu(options: SubmenuOptions) {
	const handleItemHover = (item: MenuItem, event: MouseEvent) => {
		if (item.submenu && item.submenu.length > 0) {
			options.hoveredItem.value = item;
			options.showSubmenu.value = true;

			const target = event.currentTarget as HTMLElement;
			const rect = target.getBoundingClientRect();

			options.submenuPosition.value = {
				left: rect.right + 8,
				top: rect.top,
			};
		} else {
			options.showSubmenu.value = false;
			options.hoveredItem.value = null;
		}
	};

	const handleSubmenuItemClick = (
		item: MenuItem,
		emit: any,
		close: () => void,
	) => {
		if (item.action) {
			emit("item-click", item);
			close();
		}
	};

	return {
		handleItemHover,
		handleSubmenuItemClick,
	};
}

// === Context Menu Coordination Composable ===
export function useMenuCoordination(options: MenuCoordinationOptions) {
	// Use VueUse's event emitter for better coordination
	const { emit: emitContextMenuEvent, on: onContextMenuEvent } = useEventBus(
		"context-menu-coordination",
	);

	// Listen for close events from other context menus
	const unsubscribe = onContextMenuEvent((event) => {
		if (event === "close-all" && options.isVisible.value) {
			options.close();
		}
	});

	// Notify other context menus to close
	const closeOtherMenus = () => {
		emitContextMenuEvent("close-all");
	};

	// Set/reset the global flag when visibility changes
	watch(options.isVisible, (newVal) => {
		isComponentHandlingContextMenu.value = newVal;
	});

	return {
		closeOtherMenus,
		unsubscribe,
	};
}

// === General Menu Utilities ===
export function useGenericMenu(options: GenericMenuOptions) {
	const menuRef = ref<HTMLElement | null>(null);
	const menuX = ref(0);
	const menuY = ref(0);
	const isVisible = ref(false);
	const activeIndex = ref(-1);
	const searchQuery = ref("");
	const hoveredItem = ref<MenuItem | null>(null);
	const showSubmenu = ref(false);
	const submenuPosition = ref({ left: 0, top: 0 });

	// Use all the menu composables together
	const { menuPosition, updatePosition } = useMenuPosition({
		isVisible,
		menuRef,
		menuX,
		menuY,
		positioning: options.positioning || "auto",
	});

	const { filteredItems, selectableItems } = useMenuFilter({
		items: options.items,
		searchQuery,
	});

	const { handleItemHover, handleSubmenuItemClick } = useSubmenu({
		hoveredItem,
		showSubmenu,
		submenuPosition,
	});

	const openMenu = (x: number, y: number) => {
		menuX.value = x;
		menuY.value = y;
		isVisible.value = true;
	};

	const closeMenu = () => {
		isVisible.value = false;
		searchQuery.value = "";
		activeIndex.value = -1;
		showSubmenu.value = false;
		hoveredItem.value = null;
	};

	// Return all the functionality
	return {
		activeIndex,
		closeMenu,
		filteredItems,
		handleItemHover,
		handleSubmenuItemClick,
		hoveredItem,
		isVisible,

		// Computed
		menuPosition,
		// Refs
		menuRef,
		menuX,
		menuY,

		// Methods
		openMenu,
		searchQuery,
		selectableItems,
		showSubmenu,
		submenuPosition,
		updatePosition,
	};
}

