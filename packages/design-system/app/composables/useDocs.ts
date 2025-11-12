import type { Ref } from "vue";
import type { DocContent, TocItem } from "~/types/docs";

/**
 * Composable for managing documentation pages
 * Includes TOC extraction and navigation
 */
export function useDocs(doc: Ref<DocContent | null | undefined>) {
	// Extract TOC from markdown content
	const tocItems = computed<TocItem[]>(() => {
		if (!doc.value?.content) return [];

		const content = doc.value.content;
		const lines = content.split("\n");
		const items: TocItem[] = [];

		for (const line of lines) {
			// Match markdown headings (## Heading, ### Heading, etc.)
			const match = line.match(/^(#{2,6})\s+(.+)$/);
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
