import { fromHighlighter } from "@shikijs/markdown-it/core";
import type MarkdownIt from "markdown-it";
import MarkdownItConstructor from "markdown-it";
import type { HighlighterCore } from "shiki/core";
import { createHighlighterCore } from "shiki/core";
import { createOnigurumaEngine } from "shiki/engine/oniguruma";
import TurndownService from "turndown";
import { computed, onMounted, onServerPrefetch, ref } from "vue";
import type { ParsedElement } from "~/types/markdown";

// --- State (Singleton Pattern) ---
let highlighter: HighlighterCore | null = null;
let md: MarkdownIt | null = null;
let turndown: TurndownService | null = null;
const isInitialized = ref(false);

// --- Initialization ---
async function initialize() {
	if (isInitialized.value) return;

	highlighter = await createHighlighterCore({
		engine: createOnigurumaEngine(() => import("shiki/wasm")),
		langs: [
			import("@shikijs/langs/javascript"),
			import("@shikijs/langs/typescript"),
			import("@shikijs/langs/vue"),
			import("@shikijs/langs/css"),
			import("@shikijs/langs/html"),
			import("@shikijs/langs/json"),
			import("@shikijs/langs/shell"),
		],
		themes: [
			import("@shikijs/themes/vitesse-light"),
			import("@shikijs/themes/vitesse-dark"),
		],
	});

	md = MarkdownItConstructor({ html: true, linkify: true, typographer: true });
	md.use(
		fromHighlighter(highlighter, {
			theme: "vitesse-light",
			// TODO: Add dark theme support based on color mode
		}),
	);

	const defaultHeadingOpen = md.renderer.rules.heading_open ||
		((tokens, idx, options, _env, self) =>
			self.renderToken(tokens, idx, options));

	md.renderer.rules.heading_open = (
		tokens,
		idx,
		options,
		env,
		self,
	) => {
		const token = tokens[idx];
		const nextToken = tokens[idx + 1];
		if (token && nextToken && nextToken.content) {
			const content = nextToken.content;
			const id = content
				.toLowerCase()
				.replace(/[^\w\s-]/g, "")
				.replace(/\s+/g, "-");

			token.attrSet("id", id);
		}
		return defaultHeadingOpen(tokens, idx, options, env, self);
	};

	turndown = new TurndownService({
		bulletListMarker: "-", // Use - for bullet lists
		codeBlockStyle: "fenced", // Use ``` style code blocks
		emDelimiter: "*", // Use * for emphasis
		headingStyle: "atx", // Use # ## ### style headings
		linkReferenceStyle: "full", // Full reference style for complex links
		linkStyle: "inlined", // Use [text](url) for links
		preformattedCode: true, // Preserve code block formatting
		strongDelimiter: "**", // Use ** for strong text
	});

	// Add rules for better HTML to Markdown conversion
	// Preformatted text rule
	turndown.addRule("pre", {
		filter: "pre",
		replacement: (content) => `\n\n\`\`\`\n${content}\n\`\`\`\n\n`,
	});

	// Code block rule with language detection
	turndown.addRule("code", {
		filter: (node) =>
			node.nodeName === "CODE" &&
			node.parentNode &&
			node.parentNode.nodeName === "PRE",
		replacement: (content, node) => {
			const parent = node.parentNode;
			if (parent?.classList) {
				const classListArray = Array.from(parent.classList) as string[];
				const langClass = classListArray.find((cls: string) =>
					cls.startsWith("language-"),
				);
				const lang = langClass ? langClass.replace("language-", "") : "";

				return `\n\n\`\`\`${lang}\n${content}\n\`\`\`\n\n`;
			}
			return `\n\n\`\`\`\n${content}\n\`\`\`\n\n`;
		},
	});

	// Table conversion rule
	turndown.addRule("table", {
		filter: "table",
		replacement: (_content, node) => {
			// Convert HTML table to Markdown table
			const rows = Array.from(node.querySelectorAll("tr"));
			if (rows.length === 0) return "";

			const headers = Array.from(
				(rows[0] as Element).querySelectorAll("th, td"),
			).map((cell: Element) => cell.textContent || "");
			const headerRow = `| ${headers.join(" | ")} |`;
			const separator = `| ${headers.map(() => "---").join(" | ")} |`;

			const bodyRows = rows.slice(1).map((row) => {
				const cells = Array.from((row as Element).querySelectorAll("td")).map(
					(cell: Element) => cell.textContent || "",
				);
				return `| ${cells.join(" | ")} |`;
			});

			return `\n\n${[headerRow, separator, ...bodyRows].join("\n")}\n\n`;
		},
	});

	// Link conversion rule
	turndown.addRule("link", {
		filter: (node) => node.nodeName === "A" && node.getAttribute("href"),
		replacement: (content, node) => {
			const href = node.getAttribute("href");
			return `[${content}](${href})`;
		},
	});

	// Image conversion rule
	turndown.addRule("img", {
		filter: "img",
		replacement: (_content, node) => {
			const alt = node.getAttribute("alt") || "";
			const src = node.getAttribute("src") || "";
			return `![${alt}](${src})`;
		},
	});

	// Blockquote conversion rule
	turndown.addRule("blockquote", {
		filter: "blockquote",
		replacement: (content) => {
			content = content.replace(/^\n+|\n+$/g, "");
			content = content.replace(/^/gm, "> ");
			return `\n\n${content}\n\n`;
		},
	});

	// Horizontal rule conversion
	turndown.addRule("hr", {
		filter: "hr",
		replacement: () => "\n\n---\n\n",
	});

	// Strikethrough conversion
	turndown.addRule("strikethrough", {
		filter: ["del", "s"],
		replacement: (content) => `~~${content}~~`,
	});

	// Inline code conversion
	turndown.addRule("inlineCode", {
		filter: (node) =>
			node.nodeName === "CODE" &&
			(!node.parentNode || node.parentNode.nodeName !== "PRE"),
		replacement: (content) => `\`${content}\``,
	});

	// Line break handling
	turndown.addRule("lineBreak", {
		filter: "br",
		replacement: () => "  \n",
	});

	// Keep special HTML elements as HTML
	turndown.keep(["kbd", "mark", "sub", "sup"]);

	isInitialized.value = true;
}

// --- Composable ---
export function useMarkdownRender() {
	// Ensure initialization is awaited on server and triggered on client mount
	if (process.server) {
		onServerPrefetch(async () => await initialize());
	}
	onMounted(initialize);

	const renderToHtml = (source: string): string => {
		if (!md) return "";
		return md.render(source);
	};

	const parseMarkdownClient = (source: string): ParsedElement[] => {
		if (process.server) {
			console.warn("parseMarkdownClient should only be called on the client.");
			return [{ content: "<!-- Parsing on client -->", type: "text" }];
		}

		const parsedElements: ParsedElement[] = [];
		if (!source || !md) return parsedElements;

		try {
			const html = md.render(source);
			const tempDiv = document.createElement("div");
			tempDiv.innerHTML = html;

			const processNode = (node: ChildNode): ParsedElement[] => {
				const elements: ParsedElement[] = [];
				if (node.nodeType === Node.ELEMENT_NODE) {
					const element = node as HTMLElement;

					if (element.tagName === "PRE") {
						const codeElement = element.querySelector("code");
						if (codeElement) {
							const classListArray = Array.from(element.classList) as string[];
							const langClass = classListArray.find((cls: string) =>
								cls.startsWith("language-"),
							);
							const language = langClass
								? langClass.replace("language-", "")
								: "plaintext";
							const content = codeElement.textContent || "";
							elements.push({ content, language, type: "code" });
							return elements;
						}
					}

					if (element.tagName === "TABLE") {
						const thead = element.querySelector("thead");
						const tbody = element.querySelector("tbody");
						if (thead && tbody) {
							const headers = Array.from(thead.querySelectorAll("th")).map(
								(th) => th.textContent || "",
							);
							const rows = Array.from(tbody.querySelectorAll("tr")).map((tr) =>
								Array.from(tr.querySelectorAll("td")).map(
									(td) => td.textContent || "",
								),
							);
							elements.push({ headers, rows, type: "table" });
							return elements;
						}
					}

					const clone = element.cloneNode(true) as HTMLElement;
					elements.push({ content: clone.outerHTML, type: "text" });
				}
				return elements;
			};

			Array.from(tempDiv.childNodes).forEach((node) => {
				const elements = processNode(node);
				parsedElements.push(...elements);
			});
		} catch (error) {
			console.error("Error parsing markdown:", error);
			parsedElements.push({
				content: md ? md.render(source) : source,
				type: "text",
			});
		}

		return parsedElements;
	};

	const cleanHtmlForConversion = (html: string): string => {
		// Remove or normalize common HTML patterns that might interfere with conversion
		return (
			html
				// Convert divs to semantic equivalents
				.replace(/<div[^>]*class="[^"]*quote[^"]*"[^>]*>/gi, "<blockquote>")
				.replace(/<\/div[^>]*class="[^"]*quote[^"]*"[^>]*>/gi, "</blockquote>")

				// Normalize whitespace and newlines
				.replace(/\r\n/g, "\n")
				.replace(/\r/g, "\n")

				// Remove empty spans and divs that don't contribute meaning
				.replace(/<span[^>]*><\/span>/gi, "")
				.replace(/<div[^>]*><\/div>/gi, "")

				// Convert common editor artifacts
				.replace(
					/<span[^>]*class="Apple-converted-space"[^>]*>\s*<\/span>/gi,
					" ",
				)

				// Clean up multiple spaces
				.replace(/\s{2,}/g, " ")

				// Trim whitespace
				.trim()
		);
	};

	const htmlToMarkdown = (html: string): string => {
		if (!turndown) {
			console.warn("Turndown service not initialized, returning original HTML");
			return html;
		}

		try {
			// Clean up the HTML before conversion
			const cleanedHtml = cleanHtmlForConversion(html)
				.replace(/<br\s*\/?>/gi, "\n") // Convert <br> tags to newlines
				.replace(/<\/p>/gi, "\n\n") // Add double newlines after paragraphs
				.replace(/<p>/gi, "") // Remove opening paragraph tags
				.replace(/&nbsp;/g, " ") // Convert non-breaking spaces
				.replace(/\n{3,}/g, "\n\n") // Replace multiple consecutive newlines with double newlines
				.trim();

			const markdown = turndown.turndown(cleanedHtml);

			// Post-process the markdown to clean up any issues
			return markdown
				.replace(/\n{3,}/g, "\n\n") // Replace multiple consecutive newlines with double newlines
				.trim();
		} catch (error) {
			console.error("Error converting HTML to Markdown:", error);
			console.error("HTML content:", html);
			return html;
		}
	};

	const markdownToCleanHtml = (markdown: string): string => {
		if (!md) return markdown;

		try {
			// Render to HTML first
			const html = md.render(markdown);

			// Create a temporary element to clean the HTML
			const tempDiv = document.createElement("div");
			tempDiv.innerHTML = html;

			// Remove any unnecessary wrapper divs
			return tempDiv.innerHTML
				.replace(/<div[^>]*>/gi, "")
				.replace(/<\/div>/gi, "");
		} catch (error) {
			console.error("Error converting Markdown to clean HTML:", error);
			return md.render(markdown);
		}
	};

	return {
		cleanHtmlForConversion,
		htmlToMarkdown,
		isInitialized: computed(() => isInitialized.value),
		markdownToCleanHtml,
		parseMarkdownClient,
		renderToHtml,
	};
}
