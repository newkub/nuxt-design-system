<script setup lang="ts">
interface Testimonial {
  id: string
  name: string
  title: string
  company?: string
  avatar?: string
  rating: number
  content: string
}

interface Props {
  testimonials: Testimonial[]
  columns?: number
}

const props = withDefaults(defineProps<Props>(), {
  columns: 3
})

const gridCols = computed(() => {
  const cols: Record<number, string> = {
    1: 'grid-cols-1',
    2: 'grid-cols-2',
    3: 'grid-cols-3'
  }
  return cols[props.columns] || 'grid-cols-3'
})
</script>

<template>
  <div :class="['data-testimonial', gridCols]">
    <div v-for="testimonial in testimonials" :key="testimonial.id" class="testimonial-card">
      <div class="rating">
        <div
          v-for="i in 5"
          :key="i"
          :class="[
            'i-mdi-star w-5 h-5',
            i <= testimonial.rating ? 'text-yellow-400' : 'text-gray-300'
          ]"
        />
      </div>

      <p class="testimonial-content">"{{ testimonial.content }}"</p>

      <div class="author-info">
        <div v-if="testimonial.avatar" class="author-avatar">
          <img :src="testimonial.avatar" :alt="testimonial.name" />
        </div>
        <div class="author-details">
          <h4 class="author-name">{{ testimonial.name }}</h4>
          <p class="author-title">
            {{ testimonial.title }}
            <span v-if="testimonial.company">at {{ testimonial.company }}</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.data-testimonial {
  @apply grid gap-6;
}

.testimonial-card {
  @apply bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow;
}

.rating {
  @apply flex gap-1 mb-4;
}

.testimonial-content {
  @apply text-gray-700 mb-6 italic;
}

.author-info {
  @apply flex items-center gap-3;
}

.author-avatar {
  @apply w-12 h-12 rounded-full overflow-hidden bg-gray-100;
}

.author-avatar img {
  @apply w-full h-full object-cover;
}

.author-name {
  @apply font-semibold text-gray-900;
}

.author-title {
  @apply text-sm text-gray-600;
}
</style>
