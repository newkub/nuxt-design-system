
export const useChatInputFile = (
	attachedFile: Ref<File | null>,
	filePreviewUrl: Ref<string>,
	fileInput: Ref<HTMLInputElement | null>,
) => {
	// File handling functions
	const handleFileChange = (event: Event) => {
		const target = event.target as HTMLInputElement;
		const file = target.files?.[0];
		if (file) {
			attachedFile.value = file;
			// Create preview URL for images
			if (file.type.startsWith("image/")) {
				filePreviewUrl.value = URL.createObjectURL(file);
			}
		}
	};

	const handlePaste = (event: ClipboardEvent) => {
		const items = event.clipboardData?.items;
		if (items) {
			for (let i = 0; i < items.length; i++) {
				const item = items[i];
				if (item && item.type.indexOf("image") !== -1) {
					const file = item.getAsFile();
					if (file) {
						attachedFile.value = file;
						filePreviewUrl.value = URL.createObjectURL(file);
					}
				}
			}
		}
	};

	const removeAttachedFile = () => {
		attachedFile.value = null;
		filePreviewUrl.value = "";
	};

	const openFileDialog = () => {
		fileInput.value?.click();
	};

	return {
		handleFileChange,
		handlePaste,
		openFileDialog,
		removeAttachedFile,
	};
};
