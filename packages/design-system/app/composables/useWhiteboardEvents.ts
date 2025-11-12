import { useEventListener } from "@vueuse/core";
import type { StickyObject } from "~/types/whiteboard";
import type { useWhiteboardState } from "./useWhiteboardState";

/**
 * Whiteboard event handlers composable
 * Manages all mouse and keyboard events
 */
export function useWhiteboardEvents(
	state: ReturnType<typeof useWhiteboardState>,
	operations: {
		redrawCanvas: () => void;
		clearCanvas: () => void;
		addObject: (obj: any) => void;
		startDrawing: (event: MouseEvent) => void;
	},
) {
	const {
		canvasRef,
		currentTool,
		textInput,
		menuContext,
		editingSticky,
		objects,
		panOffset,
		worldMousePos,
		getIsDrawing,
		getIsPanning,
		getCurrentObject,
		getStartPos,
		setIsDrawing,
		setIsPanning,
		setLastPos,
		setCurrentObject,
	} = state;

	/**
	 * Handle text input completion
	 */
	const handleTextInput = () => {
		if (!textInput.value.value) return;
		operations.addObject({
			color: state.currentColor.value,
			font: "16px Arial",
			id: crypto.randomUUID(),
			text: textInput.value.value,
			type: "text",
			x: textInput.value.x,
			y: textInput.value.y,
		});
		textInput.value = { value: "", visible: false, x: 0, y: 0 };
	};

	/**
	 * Handle image paste from clipboard
	 */
	const handlePaste = (event: ClipboardEvent) => {
		const clipboardData = event.clipboardData;
		if (!clipboardData) return;
		for (const item of clipboardData.items) {
			if (item.type.includes("image")) {
				const blob = item.getAsFile();
				if (blob) {
					const reader = new FileReader();
					reader.onload = (e) => {
						const result = e.target?.result;
						if (typeof result === "string") {
							const img = new Image();
							img.onload = () => {
								operations.addObject({
									height: img.height,
									id: crypto.randomUUID(),
									image: img,
									type: "image",
									width: img.width,
									x: worldMousePos.value.x,
									y: worldMousePos.value.y,
								});
							};
							img.src = result;
						}
					};
					reader.readAsDataURL(blob);
					event.preventDefault();
					break;
				}
			}
		}
	};

	/**
	 * Hide context menu
	 */
	const hideMenuContext = () => {
		if (menuContext.value.visible) menuContext.value.visible = false;
	};

	/**
	 * Handle context menu action
	 */
	const handleMenuContextAction = (action: string) => {
		hideMenuContext();
		if (action === "clear") {
			operations.clearCanvas();
		} else if (action === "paste") {
			alert("Please use Ctrl+V or Cmd+V to paste an image.");
		}
	};

	/**
	 * Show context menu on right-click
	 */
	const handleMenuContext = (event: MouseEvent) => {
		event.preventDefault();
		menuContext.value = {
			items: [
				{ action: "clear", label: "Clear Canvas" },
				{ action: "paste", label: "Paste Image" },
			],
			visible: true,
			x: event.pageX,
			y: event.pageY,
		};
	};

	/**
	 * Handle canvas click for sticky note selection
	 */
	const handleCanvasClick = (event: MouseEvent) => {
		if (event.button !== 0) return;
		const pos = worldMousePos.value;

		// Check if clicking on a sticky note
		for (const obj of objects.value) {
			if (obj.type === "sticky") {
				const sticky = obj as StickyObject;
				if (
					pos.x >= sticky.x &&
					pos.x <= sticky.x + sticky.width &&
					pos.y >= sticky.y &&
					pos.y <= sticky.y + sticky.height
				) {
					editingSticky.value = sticky;
					return;
				}
			}
		}

		editingSticky.value = null;
	};

	/**
	 * Handle mouse down events
	 */
	const handleCanvasMouseDown = (event: MouseEvent) => {
		if (event.button === 1) {
			setIsPanning(true);
			return;
		}
		if (event.button !== 0) return;
		hideMenuContext();
		if (currentTool.value === "text") {
			if (textInput.value.visible) handleTextInput();
			const pos = worldMousePos.value;
			textInput.value = { value: "", visible: true, x: pos.x, y: pos.y };
		} else {
			if (textInput.value.visible) handleTextInput();
			operations.startDrawing(event);
		}
	};

	/**
	 * Handle mouse move for drawing and panning
	 */
	const draw = (event: MouseEvent) => {
		setLastPos({ x: event.offsetX, y: event.offsetY });
		
		if (getIsPanning()) {
			panOffset.value.x += event.movementX;
			panOffset.value.y += event.movementY;
			operations.redrawCanvas();
			return;
		}
		
		if (!getIsDrawing()) return;
		
		const currentObject = getCurrentObject();
		if (!currentObject) return;
		
		const currentPos = worldMousePos.value;
		const startPos = getStartPos();

		switch (currentObject.type) {
			case "path":
				currentObject.points.push(currentPos);
				break;
			case "line":
				currentObject.endX = currentPos.x;
				currentObject.endY = currentPos.y;
				break;
			case "shape":
				currentObject.width = currentPos.x - startPos.x;
				currentObject.height = currentPos.y - startPos.y;
				break;
			case "arrow":
				currentObject.endX = currentPos.x;
				currentObject.endY = currentPos.y;
				break;
			case "sticky":
				// Sticky notes are created on click, not drag
				break;
		}
		operations.redrawCanvas();
	};

	/**
	 * Handle mouse up to stop drawing
	 */
	const stopDrawing = (_event: MouseEvent) => {
		if (getIsPanning()) {
			setIsPanning(false);
			return;
		}
		
		if (!getIsDrawing()) return;
		
		const currentObject = getCurrentObject();
		if (!currentObject) return;
		
		setIsDrawing(false);
		objects.value.push(currentObject);
		setCurrentObject(null);
		operations.redrawCanvas();
	};

	return {
		handleTextInput,
		handlePaste,
		handleMenuContext,
		handleMenuContextAction,
		handleCanvasClick,
		handleCanvasMouseDown,
		draw,
		stopDrawing,
	};
}

/**
 * Setup all whiteboard event listeners
 */
export function setupWhiteboardEvents(
	state: ReturnType<typeof useWhiteboardState>,
	handlers: ReturnType<typeof useWhiteboardEvents>,
	resizeCanvas: () => void,
	handleWheel: (e: WheelEvent) => void,
) {
	const { canvasRef } = state;

	useEventListener(window, "resize", resizeCanvas);
	useEventListener(window, "paste", handlers.handlePaste);
	useEventListener(canvasRef, "contextmenu", handlers.handleMenuContext);
	useEventListener(canvasRef, "wheel", handleWheel, { passive: false });
	useEventListener(canvasRef, "mousedown", handlers.handleCanvasMouseDown);
	useEventListener(canvasRef, "mousemove", handlers.draw);
	useEventListener(canvasRef, "mouseup", handlers.stopDrawing);
	useEventListener(canvasRef, "mouseleave", handlers.stopDrawing);
	useEventListener(canvasRef, "click", handlers.handleCanvasClick);
}
