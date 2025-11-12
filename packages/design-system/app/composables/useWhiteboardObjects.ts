import type { CanvasObject, StickyObject } from "~/types/whiteboard";
import type { useWhiteboardState } from "./useWhiteboardState";

/**
 * Whiteboard object manipulation composable
 * Handles CRUD operations for canvas objects
 */
export function useWhiteboardObjects(
	state: ReturnType<typeof useWhiteboardState>,
	redrawCanvas: () => void,
) {
	const { objects, editingSticky } = state;

	/**
	 * Add new object to canvas
	 */
	const addObject = (obj: CanvasObject) => {
		objects.value.push(obj);
		redrawCanvas();
	};

	/**
	 * Update sticky note text
	 */
	const updateStickyText = (stickyId: string, newText: string) => {
		const sticky = objects.value.find(
			(obj) => obj.id === stickyId && obj.type === "sticky",
		) as StickyObject;
		if (sticky) {
			sticky.text = newText;
			redrawCanvas();
		}
	};

	/**
	 * Delete sticky note by ID
	 */
	const deleteSticky = (stickyId: string) => {
		const index = objects.value.findIndex(
			(obj) => obj.id === stickyId && obj.type === "sticky",
		);
		if (index > -1) {
			objects.value.splice(index, 1);
			if (editingSticky.value?.id === stickyId) {
				editingSticky.value = null;
			}
			redrawCanvas();
		}
	};

	/**
	 * Clear all objects from canvas
	 */
	const clearCanvas = () => {
		objects.value = [];
		redrawCanvas();
	};

	return {
		addObject,
		updateStickyText,
		deleteSticky,
		clearCanvas,
	};
}
