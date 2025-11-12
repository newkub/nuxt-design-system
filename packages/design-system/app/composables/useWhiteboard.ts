import { useWhiteboardState } from "./useWhiteboardState";
import { useWhiteboardCanvas } from "./useWhiteboardCanvas";
import { useWhiteboardObjects } from "./useWhiteboardObjects";
import { useWhiteboardTools } from "./useWhiteboardTools";
import {
	useWhiteboardEvents,
	setupWhiteboardEvents,
} from "./useWhiteboardEvents";

/**
 * Main whiteboard composable
 * Orchestrates all whiteboard functionality using smaller composables
 * Following Nuxt 4 best practices for composition
 */
export function useWhiteboard() {
	// 1. Initialize state
	const state = useWhiteboardState();

	// 2. Initialize canvas operations
	const canvas = useWhiteboardCanvas(state);

	// 3. Initialize object operations
	const objectOps = useWhiteboardObjects(state, canvas.redrawCanvas);

	// 4. Initialize tools
	const tools = useWhiteboardTools(state, objectOps.addObject);

	// 5. Initialize event handlers
	const events = useWhiteboardEvents(state, {
		redrawCanvas: canvas.redrawCanvas,
		clearCanvas: objectOps.clearCanvas,
		addObject: objectOps.addObject,
		startDrawing: tools.startDrawing,
	});

	// 6. Setup event listeners
	setupWhiteboardEvents(state, events, canvas.resizeCanvas, canvas.handleWheel);

	// 7. Initialize canvas on mount
	nextTick(() => {
		if (state.canvasRef.value) {
			state.ctx.value = state.canvasRef.value.getContext("2d");
			canvas.resizeCanvas();
		}
	});

	// 8. Custom directive for auto-focus
	const vFocus = {
		mounted: (el: HTMLInputElement) => el.focus(),
	};

	// 9. Return public API
	return {
		// Refs
		canvasRef: state.canvasRef,
		minimapRef: state.minimapRef,
		// State
		currentColor: state.currentColor,
		currentTool: state.currentTool,
		textInput: state.textInput,
		menuContext: state.menuContext,
		editingSticky: state.editingSticky,
		viewport: state.viewport,
		zoomLevel: state.zoom,
		// Tool actions
		selectTool: tools.selectTool,
		selectColor: tools.selectColor,
		// Object actions
		updateStickyText: objectOps.updateStickyText,
		deleteSticky: objectOps.deleteSticky,
		// Canvas actions
		zoomIn: canvas.zoomIn,
		zoomOut: canvas.zoomOut,
		zoomReset: canvas.zoomReset,
		// Event handlers
		handleMenuContextAction: events.handleMenuContextAction,
		handleTextInputBlur: events.handleTextInput,
		handleTextInputEnter: events.handleTextInput,
		// Directive
		vFocus,
	};
}
