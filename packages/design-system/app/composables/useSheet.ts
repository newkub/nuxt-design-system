import {
	useClipboard,
	useKeyModifier,
	useLocalStorage,
} from "@vueuse/core";
import type {
	CellData,
	CellPosition,
	CellRange,
	CellStyle,
} from "~/types/sheet";

export const useSheet = () => {
	const route = useRoute();
	const project = computed(() => route.params.project as string);

	// Grid data with formatting
	const grid = useLocalStorage<CellData[][]>(
		"sheet-grid",
		Array.from({ length: 100 }, () =>
			Array.from({ length: 26 }, () => ({ value: "" })),
		),
		{ mergeDefaults: true },
	);

	// Selection state
	const selectedCell = ref<CellPosition>({ col: 0, row: 0 });
	const selectedRange = ref<CellRange | null>(null);
	const isSelecting = ref(false);

	// Editing state
	const isEditing = ref(false);
	const editingValue = ref("");

	// Formula bar
	const formulaBarValue = ref("");

	// History for undo/redo
	const history = ref<CellData[][][]>([]);
	const historyIndex = ref(-1);

	// Clipboard
	const { copy, copied, text: clipboardText } = useClipboard();
	const copiedRange = ref<CellRange | null>(null);

	// Keyboard modifiers
	const ctrlPressed = useKeyModifier("Control");
	const shiftPressed = useKeyModifier("Shift");

	// Column and row headers
	const getColumnLabel = (index: number): string => {
		let label = "";
		let num = index;
		while (num >= 0) {
			label = String.fromCharCode(65 + (num % 26)) + label;
			num = Math.floor(num / 26) - 1;
		}
		return label;
	};

	const getRowLabel = (index: number): string => {
		return (index + 1).toString();
	};

	// Cell operations
	const selectCell = (row: number, col: number) => {
		if (!shiftPressed.value) {
			selectedCell.value = { col, row };
			selectedRange.value = null;
		} else {
			// Extend selection
			if (!selectedRange.value) {
				selectedRange.value = {
					end: { col, row },
					start: { ...selectedCell.value },
				};
			} else {
				selectedRange.value.end = { col, row };
			}
		}
		updateFormulaBar();
	};

	const startSelecting = (row: number, col: number) => {
		isSelecting.value = true;
		selectedCell.value = { col, row };
		selectedRange.value = {
			end: { col, row },
			start: { col, row },
		};
	};

	const continueSelecting = (row: number, col: number) => {
		if (isSelecting.value && selectedRange.value) {
			selectedRange.value.end = { col, row };
		}
	};

	const endSelecting = () => {
		isSelecting.value = false;
	};

	const getCellData = (row: number, col: number): CellData => {
		return grid.value[row]?.[col] || { value: "" };
	};

	const updateCell = (row: number, col: number, data: Partial<CellData>) => {
		const currentCell = grid.value[row]?.[col];
		if (!currentCell) return;
		saveHistory();
		grid.value[row]![col] = {
			...currentCell,
			...data,
			value: data.value ?? currentCell.value,
		};
	};

	const updateCellValue = (row: number, col: number, value: string) => {
		updateCell(row, col, { value });
	};

	const updateCellStyle = (
		row: number,
		col: number,
		style: Partial<CellStyle>,
	) => {
		const currentCell = grid.value[row]?.[col];
		if (!currentCell) return;
		updateCell(row, col, {
			style: { ...currentCell.style, ...style },
		});
	};

	const updateSelectedCellsStyle = (style: Partial<CellStyle>) => {
		if (selectedRange.value) {
			const { start, end } = selectedRange.value;
			const minRow = Math.min(start.row, end.row);
			const maxRow = Math.max(start.row, end.row);
			const minCol = Math.min(start.col, end.col);
			const maxCol = Math.max(start.col, end.col);

			for (let row = minRow; row <= maxRow; row++) {
				for (let col = minCol; col <= maxCol; col++) {
					updateCellStyle(row, col, style);
				}
			}
		} else {
			updateCellStyle(selectedCell.value.row, selectedCell.value.col, style);
		}
	};

	// Formula bar
	const updateFormulaBar = () => {
		const { row, col } = selectedCell.value;
		const cell = getCellData(row, col);
		formulaBarValue.value = cell.formula || cell.value;
	};

	const applyFormulaBarValue = () => {
		const { row, col } = selectedCell.value;
		const value = formulaBarValue.value;

		if (value.startsWith("=")) {
			updateCell(row, col, { formula: value, value: evaluateFormula(value) });
		} else {
			updateCell(row, col, { formula: undefined, value });
		}
	};

	// Simple formula evaluation
	const evaluateFormula = (formula: string): string => {
		try {
			// Remove = sign
			const expr = formula.substring(1);
			// WARNING: This is a very basic evaluation for demo purposes only
			// In production, use a proper formula parser library like mathjs or formula.js
			// Using Function constructor instead of eval for slightly better security
			const evaluator = new Function(`return ${expr}`);
			return evaluator().toString();
		} catch {
			return "#ERROR!";
		}
	};

	// History management
	const saveHistory = () => {
		if (historyIndex.value < history.value.length - 1) {
			history.value = history.value.slice(0, historyIndex.value + 1);
		}
		history.value.push(JSON.parse(JSON.stringify(grid.value)));
		historyIndex.value++;
		if (history.value.length > 50) {
			history.value.shift();
			historyIndex.value--;
		}
	};

	const undo = () => {
		if (historyIndex.value > 0) {
			historyIndex.value--;
			grid.value = JSON.parse(
				JSON.stringify(history.value[historyIndex.value]),
			);
		}
	};

	const redo = () => {
		if (historyIndex.value < history.value.length - 1) {
			historyIndex.value++;
			grid.value = JSON.parse(
				JSON.stringify(history.value[historyIndex.value]),
			);
		}
	};

	// Clipboard operations
	const copySelection = async () => {
		if (selectedRange.value) {
			copiedRange.value = { ...selectedRange.value };
			const { start, end } = selectedRange.value;
			const minRow = Math.min(start.row, end.row);
			const maxRow = Math.max(start.row, end.row);
			const minCol = Math.min(start.col, end.col);
			const maxCol = Math.max(start.col, end.col);

			const data: string[][] = [];
			for (let row = minRow; row <= maxRow; row++) {
				const rowData: string[] = [];
				for (let col = minCol; col <= maxCol; col++) {
					rowData.push(getCellData(row, col).value);
				}
				data.push(rowData);
			}

			await copy(data.map((row) => row.join("\t")).join("\n"));
		} else {
			const cell = getCellData(selectedCell.value.row, selectedCell.value.col);
			await copy(cell.value);
		}
	};

	const pasteSelection = async () => {
		const text = clipboardText.value;
		if (!text) return;

		saveHistory();
		const rows = text.split("\n");
		const { row, col } = selectedCell.value;

		rows.forEach((rowText, rowOffset) => {
			const cells = rowText.split("\t");
			cells.forEach((cellValue, colOffset) => {
				const targetRow = row + rowOffset;
				const targetCol = col + colOffset;
				const targetCell = grid.value[targetRow]?.[targetCol];
				if (targetCell) {
					grid.value[targetRow]![targetCol] = { value: cellValue.trim() };
				}
			});
		});
	};

	const cutSelection = async () => {
		await copySelection();
		if (selectedRange.value) {
			const { start, end } = selectedRange.value;
			const minRow = Math.min(start.row, end.row);
			const maxRow = Math.max(start.row, end.row);
			const minCol = Math.min(start.col, end.col);
			const maxCol = Math.max(start.col, end.col);

			saveHistory();
			for (let row = minRow; row <= maxRow; row++) {
				for (let col = minCol; col <= maxCol; col++) {
					if (grid.value[row]?.[col]) {
						grid.value[row][col] = { value: "" };
					}
				}
			}
		} else {
			saveHistory();
			const cell = grid.value[selectedCell.value.row]?.[selectedCell.value.col];
			if (cell) {
				grid.value[selectedCell.value.row][selectedCell.value.col] = {
					value: "",
				};
			}
		}
	};

	const deleteSelection = () => {
		if (selectedRange.value) {
			const { start, end } = selectedRange.value;
			const minRow = Math.min(start.row, end.row);
			const maxRow = Math.max(start.row, end.row);
			const minCol = Math.min(start.col, end.col);
			const maxCol = Math.max(start.col, end.col);

			saveHistory();
			for (let row = minRow; row <= maxRow; row++) {
				for (let col = minCol; col <= maxCol; col++) {
					if (grid.value[row]?.[col]) {
						grid.value[row][col] = { value: "" };
					}
				}
			}
		} else {
			saveHistory();
			const cell = grid.value[selectedCell.value.row]?.[selectedCell.value.col];
			if (cell) {
				grid.value[selectedCell.value.row][selectedCell.value.col] = {
					value: "",
				};
			}
		}
	};

	// Cell navigation
	const moveSelection = (rowDelta: number, colDelta: number) => {
		const newRow = Math.max(
			0,
			Math.min(grid.value.length - 1, selectedCell.value.row + rowDelta),
		);
		const newCol = Math.max(
			0,
			Math.min(
				(grid.value[0]?.length ?? 0) - 1,
				selectedCell.value.col + colDelta,
			),
		);
		selectCell(newRow, newCol);
	};

	const startEditing = () => {
		const { row, col } = selectedCell.value;
		const cell = getCellData(row, col);
		editingValue.value = cell.formula || cell.value;
		isEditing.value = true;
	};

	const stopEditing = (save: boolean = true) => {
		if (save && isEditing.value) {
			const { row, col } = selectedCell.value;
			const value = editingValue.value;

			if (value.startsWith("=")) {
				updateCell(row, col, { formula: value, value: evaluateFormula(value) });
			} else {
				updateCell(row, col, { formula: undefined, value });
			}
		}
		isEditing.value = false;
		editingValue.value = "";
	};

	const cancelEditing = () => {
		stopEditing(false);
	};

	// Check if cell is in selected range
	const isCellSelected = (row: number, col: number): boolean => {
		if (selectedRange.value) {
			const { start, end } = selectedRange.value;
			const minRow = Math.min(start.row, end.row);
			const maxRow = Math.max(start.row, end.row);
			const minCol = Math.min(start.col, end.col);
			const maxCol = Math.max(start.col, end.col);
			return row >= minRow && row <= maxRow && col >= minCol && col <= maxCol;
		}
		return row === selectedCell.value.row && col === selectedCell.value.col;
	};

	return {
		applyFormulaBarValue,
		cancelEditing,
		continueSelecting,
		copied,
		copiedRange,
		copySelection,

		// Modifiers
		ctrlPressed,
		cutSelection,
		deleteSelection,
		editingValue,
		endSelecting,
		formulaBarValue,
		getCellData,

		// Methods
		getColumnLabel,
		getRowLabel,
		grid,
		isCellSelected,
		isEditing,
		isSelecting,
		moveSelection,
		pasteSelection,
		// State
		project,
		redo,
		selectCell,
		selectedCell,
		selectedRange,
		shiftPressed,
		startEditing,
		startSelecting,
		stopEditing,
		undo,
		updateCell,
		updateCellStyle,
		updateCellValue,
		updateFormulaBar,
		updateSelectedCellsStyle,
	};
};
