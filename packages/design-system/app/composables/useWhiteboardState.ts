import type {
	CanvasObject,
	Point,
	StickyObject,
} from "~/types/whiteboard";

/**
 * Whiteboard state management composable
 * Manages all reactive state for the whiteboard
 */
export function useWhiteboardState() {
	// Canvas refs
	const canvasRef = ref<HTMLCanvasElement | null>(null);
	const minimapRef = ref<{ drawMinimap: () => void } | null>(null);
	const ctx = shallowRef<CanvasRenderingContext2D | null>(null);

	// Tool state
	const currentTool = ref("pencil");
	const currentShape = ref<"rectangle" | "circle" | "triangle" | "ellipse">(
		"rectangle",
	);
	const currentColor = ref("#000000");

	// Canvas objects
	const objects = ref<CanvasObject[]>([]);

	// Text input state
	const textInput = ref({
		value: "",
		visible: false,
		x: 0,
		y: 0,
	});

	// Viewport state
	const zoom = ref(1);
	const panOffset = ref({ x: 0, y: 0 });

	// Context menu state
	const menuContext = ref({
		items: [] as { label: string; action: string }[],
		visible: false,
		x: 0,
		y: 0,
	});

	// Sticky note editing
	const editingSticky = ref<StickyObject | null>(null);

	// Drawing state (non-reactive)
	let isDrawing = false;
	let isPanning = false;
	let startPos: Point = { x: 0, y: 0 };
	let lastPos: Point = { x: 0, y: 0 };
	let currentObject: CanvasObject | null = null;

	// Computed viewport dimensions
	const viewport = computed(() => {
		if (!canvasRef.value) return { height: 0, width: 0, x: 0, y: 0 };
		return {
			height: canvasRef.value.height / zoom.value,
			width: canvasRef.value.width / zoom.value,
			x: -panOffset.value.x / zoom.value,
			y: -panOffset.value.y / zoom.value,
		};
	});

	// Computed world mouse position
	const worldMousePos = computed(() => ({
		x: (lastPos.x - panOffset.value.x) / zoom.value,
		y: (lastPos.y - panOffset.value.y) / zoom.value,
	}));

	// State mutation functions
	const setIsDrawing = (value: boolean) => {
		isDrawing = value;
	};

	const setIsPanning = (value: boolean) => {
		isPanning = value;
	};

	const setStartPos = (pos: Point) => {
		startPos = pos;
	};

	const setLastPos = (pos: Point) => {
		lastPos = pos;
	};

	const setCurrentObject = (obj: CanvasObject | null) => {
		currentObject = obj;
	};

	// Getters for non-reactive state
	const getIsDrawing = () => isDrawing;
	const getIsPanning = () => isPanning;
	const getStartPos = () => startPos;
	const getLastPos = () => lastPos;
	const getCurrentObject = () => currentObject;

	return {
		// Refs
		canvasRef,
		minimapRef,
		ctx,
		// Tool state
		currentTool,
		currentShape,
		currentColor,
		// Canvas objects
		objects,
		// UI state
		textInput,
		zoom,
		panOffset,
		menuContext,
		editingSticky,
		// Computed
		viewport,
		worldMousePos,
		// State mutations
		setIsDrawing,
		setIsPanning,
		setStartPos,
		setLastPos,
		setCurrentObject,
		// Getters
		getIsDrawing,
		getIsPanning,
		getStartPos,
		getLastPos,
		getCurrentObject,
	};
}
