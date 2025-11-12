import type {
	ArrowObject,
	LineObject,
	PathObject,
	ShapeObject,
	StickyObject,
} from "~/types/whiteboard";
import type { useWhiteboardState } from "./useWhiteboardState";

/**
 * Whiteboard tool selection and drawing logic composable
 * Handles tool switching and object creation
 */
export function useWhiteboardTools(
	state: ReturnType<typeof useWhiteboardState>,
	addObject: (obj: any) => void,
) {
	const {
		currentTool,
		currentShape,
		currentColor,
		worldMousePos,
		getStartPos,
		setCurrentObject,
		setIsDrawing,
	} = state;

	/**
	 * Select drawing tool
	 */
	const selectTool = (tool: string, option = "") => {
		currentTool.value = tool;
		if (tool === "icon") {
			addObject({
				color: currentColor.value,
				font: "24px Arial",
				icon: option,
				id: crypto.randomUUID(),
				type: "icon",
				x: worldMousePos.value.x,
				y: worldMousePos.value.y,
			});
		} else if (tool === "shape") {
			currentShape.value = option as "rectangle" | "circle" | "triangle";
		}
	};

	/**
	 * Select drawing color
	 */
	const selectColor = (color: string) => {
		currentColor.value = color;
	};

	/**
	 * Start drawing operation
	 */
	const startDrawing = (_event: MouseEvent) => {
		setIsDrawing(true);
		const startPos = worldMousePos.value;
		const baseProps = { color: currentColor.value, id: crypto.randomUUID() };

		switch (currentTool.value) {
			case "pencil":
			case "eraser":
				setCurrentObject({
					...baseProps,
					compositeOperation:
						currentTool.value === "eraser" ? "destination-out" : "source-over",
					lineWidth: currentTool.value === "eraser" ? 20 : 2,
					points: [startPos],
					type: "path",
				} as PathObject);
				break;
			case "highlighter":
				setCurrentObject({
					...baseProps,
					compositeOperation: "multiply",
					lineWidth: 20,
					points: [startPos],
					type: "path",
				} as PathObject);
				break;
			case "line":
				setCurrentObject({
					...baseProps,
					endX: startPos.x,
					endY: startPos.y,
					lineWidth: 2,
					startX: startPos.x,
					startY: startPos.y,
					type: "line",
				} as LineObject);
				break;
			case "shape":
				setCurrentObject({
					...baseProps,
					height: 0,
					lineWidth: 2,
					shape: currentShape.value,
					type: "shape",
					width: 0,
					x: startPos.x,
					y: startPos.y,
				} as ShapeObject);
				break;
			case "sticky":
				setCurrentObject({
					...baseProps,
					color: "#ffeb3b",
					height: 150,
					text: "",
					type: "sticky",
					width: 200,
					x: startPos.x,
					y: startPos.y,
				} as StickyObject);
				break;
			case "arrow":
				setCurrentObject({
					...baseProps,
					endX: startPos.x,
					endY: startPos.y,
					lineWidth: 2,
					startX: startPos.x,
					startY: startPos.y,
					type: "arrow",
				} as ArrowObject);
				break;
			case "image": {
				// Open file picker for image upload
				const input = document.createElement("input");
				input.type = "file";
				input.accept = "image/*";
				input.onchange = (e) => {
					const file = (e.target as HTMLInputElement).files?.[0];
					if (file) {
						const reader = new FileReader();
						reader.onload = (event) => {
							const result = event.target?.result;
							if (typeof result === "string") {
								const img = new Image();
								img.onload = () => {
									addObject({
										height: Math.min(img.height, 300),
										id: crypto.randomUUID(),
										image: img,
										type: "image",
										width: Math.min(img.width, 300),
										x: worldMousePos.value.x,
										y: worldMousePos.value.y,
									});
								};
								img.src = result;
							}
						};
						reader.readAsDataURL(file);
					}
				};
				input.click();
				return;
			}
		}
	};

	return {
		selectTool,
		selectColor,
		startDrawing,
	};
}
