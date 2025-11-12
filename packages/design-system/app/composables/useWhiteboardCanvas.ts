import type { CanvasObject } from "~/types/whiteboard";
import {
	drawArrowObject,
	drawLineObject,
	drawShapeObject,
	drawStickyObject,
	getIconEmoji,
} from "./useWhiteboardDrawing";
import type { useWhiteboardState } from "./useWhiteboardState";

/**
 * Whiteboard canvas operations composable
 * Handles canvas rendering, zooming, and panning
 */
export function useWhiteboardCanvas(
	state: ReturnType<typeof useWhiteboardState>,
) {
	const {
		canvasRef,
		minimapRef,
		ctx,
		objects,
		zoom,
		panOffset,
		getCurrentObject,
	} = state;

	/**
	 * Redraw entire canvas with all objects
	 */
	const redrawCanvas = () => {
		const context = ctx.value;
		const canvas = canvasRef.value;
		if (!context || !canvas) return;

		context.resetTransform();
		context.clearRect(0, 0, canvas.width, canvas.height);
		context.translate(panOffset.value.x, panOffset.value.y);
		context.scale(zoom.value, zoom.value);

		const currentObj = getCurrentObject();
		const allObjects = [...objects.value, ...(currentObj ? [currentObj] : [])];

		for (const obj of allObjects) {
			context.save();
			switch (obj.type) {
				case "path": {
					context.beginPath();
					context.strokeStyle = obj.color;
					context.lineWidth = obj.lineWidth;
					context.globalCompositeOperation = obj.compositeOperation;
					for (const [index, point] of obj.points.entries()) {
						if (index === 0) context.moveTo(point.x, point.y);
						else context.lineTo(point.x, point.y);
					}
					context.stroke();
					break;
				}
				case "arrow":
					drawArrowObject(context, obj);
					break;
				case "shape":
					drawShapeObject(context, obj);
					break;
				case "text":
					context.fillStyle = obj.color;
					context.font = obj.font;
					context.fillText(obj.text, obj.x, obj.y);
					break;
				case "icon":
					context.fillStyle = obj.color;
					context.font = obj.font;
					context.fillText(getIconEmoji(obj.icon), obj.x - 12, obj.y + 12);
					break;
				case "line":
					drawLineObject(context, obj);
					break;
				case "sticky":
					drawStickyObject(context, obj);
					break;
			}
			context.restore();
		}

		nextTick(() => {
			minimapRef.value?.drawMinimap();
		});
	};

	/**
	 * Handle mouse wheel for zooming
	 */
	const handleWheel = (event: WheelEvent) => {
		event.preventDefault();
		const zoomFactor = event.deltaY < 0 ? 1.1 : 0.9;
		const newZoom = Math.max(0.2, Math.min(zoom.value * zoomFactor, 3));
		const worldX = (event.offsetX - panOffset.value.x) / zoom.value;
		const worldY = (event.offsetY - panOffset.value.y) / zoom.value;
		panOffset.value.x = event.offsetX - worldX * newZoom;
		panOffset.value.y = event.offsetY - worldY * newZoom;
		zoom.value = newZoom;
		redrawCanvas();
	};

	/**
	 * Zoom in centered on canvas
	 */
	const zoomIn = () => {
		const canvas = canvasRef.value;
		if (!canvas) return;
		const zoomFactor = 1.2;
		const newZoom = Math.min(zoom.value * zoomFactor, 3);
		const centerX = canvas.width / 2;
		const centerY = canvas.height / 2;
		const worldX = (centerX - panOffset.value.x) / zoom.value;
		const worldY = (centerY - panOffset.value.y) / zoom.value;
		panOffset.value.x = centerX - worldX * newZoom;
		panOffset.value.y = centerY - worldY * newZoom;
		zoom.value = newZoom;
		redrawCanvas();
	};

	/**
	 * Zoom out centered on canvas
	 */
	const zoomOut = () => {
		const canvas = canvasRef.value;
		if (!canvas) return;
		const zoomFactor = 0.8;
		const newZoom = Math.max(0.2, zoom.value * zoomFactor);
		const centerX = canvas.width / 2;
		const centerY = canvas.height / 2;
		const worldX = (centerX - panOffset.value.x) / zoom.value;
		const worldY = (centerY - panOffset.value.y) / zoom.value;
		panOffset.value.x = centerX - worldX * newZoom;
		panOffset.value.y = centerY - worldY * newZoom;
		zoom.value = newZoom;
		redrawCanvas();
	};

	/**
	 * Reset zoom and pan to defaults
	 */
	const zoomReset = () => {
		zoom.value = 1;
		panOffset.value = { x: 0, y: 0 };
		redrawCanvas();
	};

	/**
	 * Resize canvas to fill parent container
	 */
	const resizeCanvas = () => {
		const canvas = canvasRef.value;
		if (canvas?.parentElement) {
			canvas.width = canvas.parentElement.clientWidth;
			canvas.height = canvas.parentElement.clientHeight;
			redrawCanvas();
		}
	};

	return {
		redrawCanvas,
		handleWheel,
		zoomIn,
		zoomOut,
		zoomReset,
		resizeCanvas,
	};
}
