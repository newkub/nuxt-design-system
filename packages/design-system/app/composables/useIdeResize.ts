export function useIdeResize(
	leftPanelWidth: Ref<number>,
	rightPanelWidth: Ref<number>,
	bottomPanelHeight: Ref<number>,
) {
	let startLeftWidth = 0;
	let startRightWidth = 0;
	let startBottomHeight = 0;

	const centerGridStyle = computed(() => ({
		gridTemplateRows: `1fr 5px ${bottomPanelHeight.value}px`,
	}));

	function handleResizeStart(_panel: "left" | "right" | "bottom") {
		startLeftWidth = leftPanelWidth.value;
		startRightWidth = rightPanelWidth.value;
		startBottomHeight = bottomPanelHeight.value;
	}

	function handleResizeMove(
		panel: "left" | "right" | "bottom",
		{ deltaX, deltaY }: { deltaX: number; deltaY: number },
	) {
		switch (panel) {
			case "left":
				leftPanelWidth.value = Math.max(50, startLeftWidth + deltaX);
				break;
			case "right":
				rightPanelWidth.value = Math.max(50, startRightWidth - deltaX);
				break;
			case "bottom":
				bottomPanelHeight.value = Math.max(50, startBottomHeight - deltaY);
				break;
		}
	}

	return {
		centerGridStyle,
		handleResizeMove,
		handleResizeStart,
	};
}
