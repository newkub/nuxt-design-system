<script setup lang="ts">
import { fromHighlighter } from "@shikijs/markdown-it/core";
import MarkdownIt from "markdown-it";
import { createHighlighterCore } from "shiki/core";
import { createOnigurumaEngine } from "shiki/engine/oniguruma";
import { onMounted, ref, watch } from "vue";

interface MarkdownContentProps {
	content?: string
}

const props = defineProps<MarkdownContentProps>()

const markdownContainer = ref(null);

// Create highlighter
const highlighter = await createHighlighterCore({
	engine: createOnigurumaEngine(() => import("shiki/wasm")),
	langs: [
		import("@shikijs/langs/javascript.mjs"),
		import("@shikijs/langs/typescript.mjs"),
		import("@shikijs/langs/vue.mjs"),
		import("@shikijs/langs/html.mjs"),
		import("@shikijs/langs/css.mjs"),
		import("@shikijs/langs/shellscript.mjs"),
	],
	themes: [
		import("@shikijs/themes/vitesse-light.mjs"),
		import("@shikijs/themes/vitesse-dark.mjs"),
	],
});

// Create markdown instance with syntax highlighting
const md = MarkdownIt({
	html: true,
	linkify: true,
	typographer: true,
});

md.use(
	fromHighlighter(highlighter, {
		darkModeTheme: "vitesse-dark",
		theme: "vitesse-light",
	}),
);

// Render markdown content
const renderMarkdown = () => {
	if (markdownContainer.value) {
		markdownContainer.value.innerHTML = md.render(props.content || "");
	}
};

// Watch for content changes
watch(
	() => props.content,
	() => {
		renderMarkdown();
	},
);

// Render on mount
onMounted(() => {
	renderMarkdown();
});
</script>

<template>
  <div ref="markdownContainer" class="text-slate-700 dark:text-slate-300"></div>
</template>

<style scoped>
/* Styles updated to use UnoCSS utility classes */

:deep(h1) {
  @apply text-3xl font-bold mb-6 mt-8 first:mt-0;
}

:deep(h2) {
  @apply text-2xl font-bold mb-5 mt-8;
}

:deep(h3) {
  @apply text-xl font-bold mb-4 mt-6;
}

:deep(h4) {
  @apply text-lg font-bold mb-3 mt-4;
}

:deep(p) {
  @apply mb-4 leading-relaxed;
}

:deep(strong) {
  @apply font-semibold;
}

:deep(em) {
  @apply italic;
}

:deep(ul) {
  @apply list-disc list-inside mb-4 pl-4;
}

:deep(ol) {
  @apply list-decimal list-inside mb-4 pl-4;
}

:deep(li) {
  @apply mb-1;
}

:deep(li > ul) {
  @apply mb-0 mt-1;
}

:deep(li > ol) {
  @apply mb-0 mt-1;
}

:deep(a) {
  @apply text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 underline;
}

:deep(code) {
  @apply font-mono text-sm bg-gray-100 dark:bg-gray-800 rounded px-1 py-0.5;
}

:deep(pre) {
  @apply bg-gray-800 dark:bg-gray-900 rounded-lg p-4 mb-4 overflow-x-auto;
}

:deep(pre code) {
  @apply bg-transparent p-0 rounded-none;
}

:deep(blockquote) {
  @apply border-l-4 border-gray-300 dark:border-gray-600 pl-4 py-1 my-4 italic;
}

:deep(table) {
  @apply min-w-full mb-4;
}

:deep(th) {
  @apply bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 px-4 py-2 text-left font-bold;
}

:deep(td) {
  @apply border border-gray-300 dark:border-gray-600 px-4 py-2;
}

:deep(tr:nth-child(even)) {
  @apply bg-gray-50 dark:bg-gray-800/50;
}
</style>