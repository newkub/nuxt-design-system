<script setup lang="ts">
import type { DocFrontmatter } from "~/composables/useContent";

interface Props {
	frontmatter: DocFrontmatter;
	project: string;
}

defineProps<Props>();
</script>

<template>
  <header class="px-6 py-10 md:px-10 md:py-12 border-b bg-gradient-to-br from-primary/5 via-primary/3 to-transparent">
    <div class="max-w-4xl mx-auto space-y-4">
      <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/15 text-primary text-sm font-semibold border border-primary/20">
        <div class="i-mdi-book-open-outline text-base" />
        <span class="capitalize">{{ project.replace(/-/g, ' ') }}</span>
      </div>
      <h1 class="text-4xl md:text-5xl font-bold text-gray-900 leading-tight tracking-tight">
        {{ frontmatter.title }}
      </h1>
      <p v-if="frontmatter.description" class="text-lg md:text-xl text-gray-600 leading-relaxed max-w-3xl">
        {{ frontmatter.description }}
      </p>
    </div>
  </header>
</template>
