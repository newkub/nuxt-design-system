/**
 * Drawing utilities for whiteboard canvas objects
 */

import type {
	ArrowObject,
	LineObject,
	Point,
	ShapeObject,
	StickyObject,
} from "~/types/whiteboard";

/**
 * Draw a shape object (rectangle, circle, triangle, ellipse)
 */
export const drawShapeObject = (
	ctx: CanvasRenderingContext2D | null,
	obj: ShapeObject,
): void => {
	if (!ctx) return;

	ctx.strokeStyle = obj.color;
	ctx.lineWidth = obj.lineWidth;
	ctx.beginPath();

	switch (obj.shape) {
		case "rectangle":
			ctx.rect(obj.x, obj.y, obj.width, obj.height);
			break;
		case "circle":
			ctx.ellipse(
				obj.x + obj.width / 2,
				obj.y + obj.height / 2,
				Math.abs(obj.width / 2),
				Math.abs(obj.height / 2),
				0,
				0,
				2 * Math.PI,
			);
			break;
		case "triangle":
			ctx.moveTo(obj.x + obj.width / 2, obj.y);
			ctx.lineTo(obj.x + obj.width, obj.y + obj.height);
			ctx.lineTo(obj.x, obj.y + obj.height);
			ctx.closePath();
			break;
		case "ellipse":
			ctx.ellipse(
				obj.x + obj.width / 2,
				obj.y + obj.height / 2,
				Math.abs(obj.width / 2),
				Math.abs(obj.height / 2),
				0,
				0,
				2 * Math.PI,
			);
			break;
	}
	ctx.stroke();
};

/**
 * Draw an arrow object with arrowhead
 */
export const drawArrowObject = (
	ctx: CanvasRenderingContext2D | null,
	obj: ArrowObject,
): void => {
	if (!ctx) return;

	const headlen = 10;
	const dx = obj.endX - obj.startX;
	const dy = obj.endY - obj.startY;
	const angle = Math.atan2(dy, dx);

	ctx.beginPath();
	ctx.strokeStyle = obj.color;
	ctx.lineWidth = obj.lineWidth;
	ctx.moveTo(obj.startX, obj.startY);
	ctx.lineTo(obj.endX, obj.endY);
	ctx.lineTo(
		obj.endX - headlen * Math.cos(angle - Math.PI / 6),
		obj.endY - headlen * Math.sin(angle - Math.PI / 6),
	);
	ctx.moveTo(obj.endX, obj.endY);
	ctx.lineTo(
		obj.endX - headlen * Math.cos(angle + Math.PI / 6),
		obj.endY - headlen * Math.sin(angle + Math.PI / 6),
	);
	ctx.stroke();
};

/**
 * Draw a line object
 */
export const drawLineObject = (
	ctx: CanvasRenderingContext2D | null,
	obj: LineObject,
): void => {
	if (!ctx) return;

	ctx.strokeStyle = obj.color;
	ctx.lineWidth = obj.lineWidth;
	ctx.beginPath();
	ctx.moveTo(obj.startX, obj.startY);
	ctx.lineTo(obj.endX, obj.endY);
	ctx.stroke();
};

/**
 * Draw a sticky note object with text wrapping
 */
export const drawStickyObject = (
	ctx: CanvasRenderingContext2D | null,
	obj: StickyObject,
): void => {
	if (!ctx) return;

	// Draw sticky note background
	ctx.fillStyle = obj.color;
	ctx.fillRect(obj.x, obj.y, obj.width, obj.height);
	ctx.strokeStyle = "#000";
	ctx.lineWidth = 1;
	ctx.strokeRect(obj.x, obj.y, obj.width, obj.height);

	// Draw text with word wrapping
	if (obj.text) {
		ctx.fillStyle = "#000";
		ctx.font = "14px Arial";
		const words = obj.text.split(" ");
		let line = "";
		let y = obj.y + 20;

		for (const word of words) {
			const testLine = `${line + word} `;
			const metrics = ctx.measureText(testLine);
			if (metrics.width > obj.width - 20 && line) {
				ctx.fillText(line, obj.x + 10, y);
				line = `${word} `;
				y += 18;
			} else {
				line = testLine;
			}
		}
		ctx.fillText(line, obj.x + 10, y);
	} else {
		ctx.fillStyle = "#666";
		ctx.font = "italic 14px Arial";
		ctx.fillText("Click to edit...", obj.x + 10, obj.y + 20);
	}
};

/**
 * Get emoji representation for icon objects
 */
export const getIconEmoji = (icon: string): string => {
	if (icon.includes("star")) return "⭐";
	if (icon.includes("heart")) return "❤️";
	if (icon.includes("bolt")) return "⚡";
	if (icon.includes("sun")) return "☀️";
	return "❓";
};

/**
 * Calculate world coordinates from screen coordinates
 */
export const screenToWorld = (
	screenX: number,
	screenY: number,
	panOffset: Point,
	zoom: number,
): Point => {
	return {
		x: (screenX - panOffset.x) / zoom,
		y: (screenY - panOffset.y) / zoom,
	};
};

/**
 * Calculate screen coordinates from world coordinates
 */
export const worldToScreen = (
	worldX: number,
	worldY: number,
	panOffset: Point,
	zoom: number,
): Point => {
	return {
		x: worldX * zoom + panOffset.x,
		y: worldY * zoom + panOffset.y,
	};
};

/**
 * Clamp zoom level between min and max values
 */
export const clampZoom = (
	zoom: number,
	minZoom: number = 0.2,
	maxZoom: number = 3,
): number => {
	return Math.max(minZoom, Math.min(zoom, maxZoom));
};
