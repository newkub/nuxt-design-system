import type {
	DocContent,
	DocMenuItem,
	TocItem,
} from "~/types/docs";

/**
 * Parse route params for documentation pages
 */
export function useDocRouteParams() {
	const route = useRoute();

	const slugParts = computed(() =>
		Array.isArray(route.params.docs) ? route.params.docs : [],
	);

	const slug = computed(() => slugParts.value.join("/"));
	const project = computed(() => slugParts.value[0]);

	return {
		project,
		slug,
		slugParts,
	};
}

/**
 * Fetch document content from API
 */
export function useDocContent(slug: Ref<string> | string) {
	const docSlug = typeof slug === "string" ? slug : slug;

	return useFetch<DocContent>(() => `/api/docs/${unref(docSlug)}`, {
		key: `doc-${unref(docSlug)}`,
	});
}

/**
 * Fetch navigation menu items for a project
 */
export function useDocNavigation(
	project: Ref<string | undefined> | string | undefined,
) {
	const projectName = typeof project === "string" ? project : project;

	const { data, ...rest } = useFetch<{ sections: DocMenuItem[] }>(
		() => `/api/docs/${unref(projectName)}/navigation`,
		{
			default: () => [],
			key: `nav-${unref(projectName)}`,
			transform: (response) => response.sections || [],
		},
	);

	return { data, ...rest };
}

/**
 * Extract TOC from document content
 */
export function useDocToc(doc: Ref<DocContent | null | undefined>) {
	const tocItems = computed<TocItem[]>(() => {
		if (!doc.value?.content) return [];

		const content = doc.value.content;
		const lines = content.split("\n");
		const items: TocItem[] = [];

		for (const line of lines) {
			// Match markdown headings (# Heading, ## Heading, ### Heading, etc.)
			// Changed from {2,6} to {1,6} to include h1 headings
			const match = line.match(/^(#{1,6})\s+(.+)$/);
			if (match?.[1] && match[2]) {
				const level = match[1].length;
				const text = match[2].trim();

				// Generate ID from heading text (lowercase, replace spaces with hyphens)
				const id = text
					.toLowerCase()
					.replace(/[^\w\s-]/g, "")
					.replace(/\s+/g, "-");

				items.push({
					id,
					label: text,
					level,
				});
			}
		}

		return items;
	});

	const scrollToHeading = (id: string) => {
		const element = document.getElementById(id);
		if (element) {
			element.scrollIntoView({ behavior: "smooth", block: "start" });
		}
	};

	return {
		scrollToHeading,
		tocItems,
	};
}

/**
 * Composable for managing documentation pages
 * Combines document fetching, navigation, and TOC extraction
 */
export function useContent(slug: Ref<string> | string) {
	const docResult = useDocContent(slug);
	const { tocItems, scrollToHeading } = useDocToc(docResult.data);

	return {
		...docResult,
		scrollToHeading,
		tocItems,
	};
}

/**
 * Navigate to a documentation page
 */
export function useDocNavigation_action() {
	const navigateToDoc = (to: string) => {
		return navigateTo(to);
	};

	return {
		navigateToDoc,
	};
}
