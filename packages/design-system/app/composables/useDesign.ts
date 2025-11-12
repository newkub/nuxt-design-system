import type {
	DesignState,
	PropDef,
	ThemeCategory,
	ThemeData,
	ThemeItem,
} from "~/types/design";

export const useDesign = () => {
	const state = reactive<DesignState>({
		zoom: 1,
	});

	// Functions to manipulate the state
	const zoomIn = () => {
		state.zoom += 0.1;
	};

	const zoomOut = () => {
		state.zoom -= 0.1;
	};

	// Icon copying functionality
	const copyToClipboard = (text: string) => {
		if (typeof navigator !== "undefined" && navigator.clipboard) {
			navigator.clipboard.writeText(text);
		}
	};

	// Theme data processing and helpers
	const processThemeCategories = (theme: ThemeData | null): ThemeCategory[] => {
		if (!theme) return [];

		const categories: ThemeCategory[] = [];

		// Process each theme property
		Object.entries(theme).forEach(([categoryName, categoryValue]) => {
			if (!categoryValue || typeof categoryValue !== "object") return;

			const items: ThemeItem[] = [];

			// Flatten nested objects
			Object.entries(categoryValue).forEach(([key, value]) => {
				items.push({ key, value });
			});

			if (items.length > 0) {
				categories.push({
					items,
					name: categoryName,
					type: categoryName as any,
				});
			}
		});

		return categories;
	};

	// Helper to check if value is a color
	const isColor = (value: unknown): boolean => {
		if (typeof value === "string") {
			return (
				value.startsWith("#") ||
				value.startsWith("rgb") ||
				value.startsWith("hsl")
			);
		}
		return false;
	};

	// Helper to check if value is nested object (like color shades)
	const isNestedObject = (value: unknown): boolean => {
		return typeof value === "object" && value !== null && !Array.isArray(value);
	};

	// Component prop extraction logic
	const extractPropsFromSource = (sourceCode: string): PropDef[] => {
		const props: PropDef[] = [];

		try {
			// Match defineProps with TypeScript interface
			const interfaceMatch = sourceCode.match(
				/interface\s+\w+Props\s*{([^}]+)}/s,
			);
			if (interfaceMatch?.[1]) {
				const propsContent = interfaceMatch[1];
				const propMatches = propsContent.matchAll(/(\w+)(\?)?:\s*([^;\n]+)/g);

				for (const match of propMatches) {
					const name = match[1];
					const optional = match[2];
					const type = match[3];
					if (name && type) {
						props.push({
							default: getDefaultValue(type.trim()),
							name,
							required: !optional,
							type: type.trim(),
						});
					}
				}
			}

			// Match defineProps with object syntax
			const objectMatch = sourceCode.match(
				/defineProps\s*\(\s*{([^}]+)}\s*\)/s,
			);
			if (objectMatch?.[1] && props.length === 0) {
				const propsContent = objectMatch[1];
				const propMatches = propsContent.matchAll(/(\w+):\s*{([^}]+)}/gs);

				for (const match of propMatches) {
					const name = match[1];
					const definition = match[2];
					if (name && definition) {
						const typeMatch = definition.match(/type:\s*(\w+)/);
						const requiredMatch = definition.match(/required:\s*(true|false)/);
						const defaultMatch = definition.match(/default:\s*([^,\n]+)/);

						props.push({
							default:
								defaultMatch?.[1]?.trim() ||
								getDefaultValue(typeMatch?.[1] || "String"),
							name,
							required: requiredMatch?.[1] === "true",
							type: typeMatch?.[1] || "any",
						});
					}
				}
			}
		} catch (e) {
			console.error("Failed to extract props:", e);
		}

		return props;
	};

	const getDefaultValue = (type: string): string | number | boolean | object | undefined => {
		switch (type.toLowerCase()) {
			case "string":
				return "";
			case "number":
				return 0;
			case "boolean":
				return false;
			case "array":
				return [];
			case "object":
				return {};
			default:
				return undefined;
		}
	};

	// Composable icon mapping
	const getComposableIcon = (name: string) => {
		const iconMap: Record<string, string> = {
			useApps: "i-mdi-apps",
			useAuth: "i-mdi-account-key",
			useCalendar: "i-mdi-calendar",
			useCamera: "i-mdi-camera",
			useCart: "i-mdi-cart",
			useChat: "i-mdi-chat",
			useCode: "i-mdi-code-braces",
			useContent: "i-mdi-file-document-multiple",
			useDocs: "i-mdi-file-document",
			useDrive: "i-mdi-folder",
			useFileIcons: "i-mdi-file-image",
			useMarkdown: "i-mdi-markdown",
			useNotes: "i-mdi-note-text",
			useProducts: "i-mdi-package-variant",
			useSheet: "i-mdi-table",
			useShop: "i-mdi-shopping",
			useSticky: "i-mdi-note-multiple",
			useTabs: "i-mdi-tab",
			useTheme: "i-mdi-palette",
			useToast: "i-mdi-message-alert",
			useWhiteboard: "i-mdi-draw",
		};
		return iconMap[name] || "i-mdi-function";
	};

	// Common default props that work for many components
	const commonDefaults: Record<string, string | boolean | number> = {
		alt: "Preview",
		checked: false,
		placeholder: "Enter text...",
		pressed: false,
		size: "default",
		value: 50,
		variant: "default",
	};

	// Component-specific default props
	const componentDefaults: Record<string, Record<string, any>> = {
		Alert: { variant: "default" },
		Avatar: { alt: "Preview" },
		Badge: { variant: "default" },
		Button: { size: "default", variant: "default" },
		Card: {},
		CardContent: {},
		CardFooter: {},
		CardHeader: {},
		CardTitle: {},
		Checkbox: { checked: false },
		Input: { placeholder: "Enter text..." },
		Label: {},
		Progress: { value: 50 },
		Separator: {},
		Skeleton: {},
		Switch: { checked: false },
		Toggle: { pressed: false },
		Tooltip: {},
	};

	const getDefaultProps = (componentName: string): Record<string, string | number | boolean | object | undefined> => {
		return {
			...commonDefaults,
			...componentDefaults[componentName],
		};
	};

	// Data fetching with refresh pattern
	const useRefreshableData = <T>(
		request: string,
		intervalMs: number = 5000,
	) => {
		const { data, refresh } = useFetch<T>(request);

		onMounted(() => {
			const interval = setInterval(() => refresh(), intervalMs);
			onUnmounted(() => clearInterval(interval));
		});

		return { data, refresh };
	};

	return {
		...toRefs(state),
		copyToClipboard,
		extractPropsFromSource,
		getComposableIcon,
		getDefaultProps,
		getDefaultValue,
		isColor,
		isNestedObject,
		processThemeCategories,
		useRefreshableData,
		zoomIn,
		zoomOut,
	};
};
