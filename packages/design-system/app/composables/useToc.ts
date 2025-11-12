import type { Ref } from "vue";
import { computed } from "vue";
import type { TocItem } from "~/types/docs";

/**
 * Extract table of contents from markdown content
 */
export function useToc(markdownContent: Ref<string | undefined>) {
	const tocItems = computed<TocItem[]>(() => {
		if (!markdownContent.value) return [];

		const lines = markdownContent.value.split("\n");
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
