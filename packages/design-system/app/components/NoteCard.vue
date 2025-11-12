<script setup lang="ts">
import MarkdownIt from "markdown-it";
import { computed } from "vue";

interface Note {
	id: number;
	content: string;
}

const props = defineProps<{ note: Note }>();
const emit = defineEmits(["click"]);

const md = new MarkdownIt();

const renderedMarkdown = computed(() => md.render(props.note.content));
</script>

<template>
  <div
    class="bg-white border border-gray-200 rounded-xl shadow-sm cursor-pointer transition-all duration-300 hover:shadow-lg hover:border-blue-500 h-48 flex flex-col"
    @click="emit('click')"
  >
    <div class="prose max-w-none flex-grow overflow-hidden p-5" v-html="renderedMarkdown"></div>
    <span class="text-xs text-gray-400 self-start pt-2 px-5 pb-3">ID: {{ note.id }}</span>
  </div>
</template>
