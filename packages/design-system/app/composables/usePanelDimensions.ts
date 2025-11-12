import { computed, ref } from "vue";
import type { PanelDimensions } from "~/app/types/panel";

// UI Constants
const UI_CONSTANTS = {
	// Panel dimensions
	PANEL_DIMENSIONS: {
		DEFAULT_BOTTOM_HEIGHT: 200,
		DEFAULT_LEFT_WIDTH: 280,
		DEFAULT_RIGHT_WIDTH: 280,
		MIN_PANEL_SIZE: 50,
	},
} as const;

export const DEFAULT_PANEL_DIMENSIONS: PanelDimensions = {
	bottomPanelHeight: UI_CONSTANTS.PANEL_DIMENSIONS.DEFAULT_BOTTOM_HEIGHT,
	leftPanelWidth: UI_CONSTANTS.PANEL_DIMENSIONS.DEFAULT_LEFT_WIDTH,
	rightPanelWidth: UI_CONSTANTS.PANEL_DIMENSIONS.DEFAULT_RIGHT_WIDTH,
};

export function usePanelDimensions(
	initialDimensions?: Partial<PanelDimensions>,
) {
	const dimensions = ref<PanelDimensions>({
		bottomPanelHeight:
			initialDimensions?.bottomPanelHeight ||
			DEFAULT_PANEL_DIMENSIONS.bottomPanelHeight,
		leftPanelWidth:
			initialDimensions?.leftPanelWidth ||
			DEFAULT_PANEL_DIMENSIONS.leftPanelWidth,
		rightPanelWidth:
			initialDimensions?.rightPanelWidth ||
			DEFAULT_PANEL_DIMENSIONS.rightPanelWidth,
	});

	const gridStyle = computed(() => ({
		gridTemplateColumns: `${dimensions.value.leftPanelWidth}px 5px 1fr 5px ${dimensions.value.rightPanelWidth}px`,
		gridTemplateRows: `1fr 5px ${dimensions.value.bottomPanelHeight}px`,
	}));

	const updateLeftPanelWidth = (width: number) => {
		dimensions.value.leftPanelWidth = Math.max(
			UI_CONSTANTS.PANEL_DIMENSIONS.MIN_PANEL_SIZE,
			width,
		);
	};

	const updateRightPanelWidth = (width: number) => {
		dimensions.value.rightPanelWidth = Math.max(
			UI_CONSTANTS.PANEL_DIMENSIONS.MIN_PANEL_SIZE,
			width,
		);
	};

	const updateBottomPanelHeight = (height: number) => {
		dimensions.value.bottomPanelHeight = Math.max(
			UI_CONSTANTS.PANEL_DIMENSIONS.MIN_PANEL_SIZE,
			height,
		);
	};

	return {
		dimensions,
		gridStyle,
		updateBottomPanelHeight,
		updateLeftPanelWidth,
		updateRightPanelWidth,
	};
}

