import type { SheetKeyboardOptions } from "~/types/sheet";

export const useSheetKeyboard = ({ sheet }: SheetKeyboardOptions) => {
	const isNotEditing = () => !sheet.isEditing.value;
	const isEditing = () => sheet.isEditing.value;

	useKeyboard({
		shortcuts: [
			// Navigation
			{
				condition: isNotEditing,
				handler: (e) => {
					e.preventDefault();
					sheet.moveSelection(-1, 0);
				},
				key: "ArrowUp",
			},
			{
				condition: isNotEditing,
				handler: (e) => {
					e.preventDefault();
					sheet.moveSelection(1, 0);
				},
				key: "ArrowDown",
			},
			{
				condition: isNotEditing,
				handler: (e) => {
					e.preventDefault();
					sheet.moveSelection(0, -1);
				},
				key: "ArrowLeft",
			},
			{
				condition: isNotEditing,
				handler: (e) => {
					e.preventDefault();
					sheet.moveSelection(0, 1);
				},
				key: "ArrowRight",
			},

			// Editing
			{
				condition: isNotEditing,
				handler: (e) => {
					e.preventDefault();
					sheet.startEditing();
				},
				key: "Enter",
			},
			{
				condition: isEditing,
				handler: (e) => {
					e.preventDefault();
					sheet.cancelEditing();
				},
				key: "Escape",
			},

			// Deletion
			{
				condition: isNotEditing,
				handler: (e) => {
					e.preventDefault();
					sheet.deleteSelection();
				},
				key: "Delete",
			},
			{
				condition: isNotEditing,
				handler: (e) => {
					e.preventDefault();
					sheet.deleteSelection();
				},
				key: "Backspace",
			},

			// Undo/Redo
			{
				condition: isNotEditing,
				ctrl: true,
				handler: (e) => {
					e.preventDefault();
					sheet.undo();
				},
				key: "z",
			},
			{
				condition: isNotEditing,
				ctrl: true,
				handler: (e) => {
					e.preventDefault();
					sheet.redo();
				},
				key: "y",
			},

			// Clipboard operations
			{
				condition: isNotEditing,
				ctrl: true,
				handler: (e) => {
					e.preventDefault();
					sheet.copySelection();
				},
				key: "c",
			},
			{
				condition: isNotEditing,
				ctrl: true,
				handler: (e) => {
					e.preventDefault();
					sheet.pasteSelection();
				},
				key: "v",
			},
			{
				condition: isNotEditing,
				ctrl: true,
				handler: (e) => {
					e.preventDefault();
					sheet.cutSelection();
				},
				key: "x",
			},
		],
	});
};
