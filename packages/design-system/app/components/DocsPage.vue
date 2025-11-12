<script setup lang="ts">

const props = defineProps<{
	slug: string;
	slugParts: string[];
	project: string;
}>();

const { data: doc, pending, error } = useContent(toRef(props, "slug"));
</script>

<template>
  <div class="h-full">
    <!-- Loading State -->
    <LoadingState v-if="pending" />

    <!-- Error State -->
    <DocsErrorState v-else-if="error" :message="error.message" />

    <!-- Main Content -->
    <div v-else-if="doc?.frontmatter" class="min-h-screen">
      <Breadcrumb :slug-parts="slugParts" :project="project || ''" />
      
      <DocsHeader :frontmatter="doc.frontmatter" :project="project || ''" />

      <article class="px-4 py-6 md:px-8 md:py-10">
        <div class="max-w-4xl mx-auto">
          <MarkdownRender :source="doc.content" />
        </div>
      </article>

      <DocsFooter />
    </div>

    <!-- Empty State -->
    <DocsEmptyState v-else />
  </div>
</template>
