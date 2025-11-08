<script setup lang="ts">
interface PricingPlan {
  id: string
  name: string
  price: number
  period: string
  description?: string
  features: string[]
  popular?: boolean
  cta: string
}

interface Props {
  plans: PricingPlan[]
}

const props = defineProps<Props>()

const emit = defineEmits<{
  selectPlan: [plan: PricingPlan]
}>()
</script>

<template>
  <div class="data-pricing">
    <div
      v-for="plan in plans"
      :key="plan.id"
      :class="['pricing-card', plan.popular && 'popular']"
    >
      <div v-if="plan.popular" class="popular-badge">Most Popular</div>

      <div class="card-header">
        <h3 class="plan-name">{{ plan.name }}</h3>
        <p v-if="plan.description" class="plan-description">{{ plan.description }}</p>
      </div>

      <div class="plan-price">
        <span class="price-amount">${{ plan.price }}</span>
        <span class="price-period">/{{ plan.period }}</span>
      </div>

      <ul class="features-list">
        <li v-for="(feature, i) in plan.features" :key="i" class="feature-item">
          <div class="i-mdi-check w-5 h-5 text-green-600" />
          <span>{{ feature }}</span>
        </li>
      </ul>

      <button
        @click="emit('selectPlan', plan)"
        :class="['cta-button', plan.popular && 'popular-cta']"
      >
        {{ plan.cta }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.data-pricing {
  @apply grid grid-cols-1 md:grid-cols-3 gap-6;
}

.pricing-card {
  @apply bg-white rounded-lg border border-gray-200 p-6 hover:shadow-xl transition-shadow relative;
}

.pricing-card.popular {
  @apply border-blue-500 border-2 shadow-lg;
}

.popular-badge {
  @apply absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-xs px-3 py-1 rounded-full;
}

.card-header {
  @apply mb-6;
}

.plan-name {
  @apply text-2xl font-bold text-gray-900 mb-2;
}

.plan-description {
  @apply text-sm text-gray-600;
}

.plan-price {
  @apply mb-6;
}

.price-amount {
  @apply text-4xl font-bold text-gray-900;
}

.price-period {
  @apply text-gray-600;
}

.features-list {
  @apply space-y-3 mb-6;
}

.feature-item {
  @apply flex items-start gap-2 text-sm text-gray-700;
}

.cta-button {
  @apply w-full py-3 px-4 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-medium;
}

.popular-cta {
  @apply bg-blue-600 hover:bg-blue-700;
}
</style>
