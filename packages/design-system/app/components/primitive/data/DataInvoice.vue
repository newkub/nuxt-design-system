<script setup lang="ts">
interface InvoiceItem {
  description: string
  quantity: number
  price: number
}

interface InvoiceData {
  number: string
  date: string
  dueDate: string
  from: { name: string; address: string; email: string }
  to: { name: string; address: string; email: string }
  items: InvoiceItem[]
  tax?: number
  discount?: number
}

interface Props {
  invoice: InvoiceData
}

const props = defineProps<Props>()

const subtotal = computed(() => {
  return props.invoice.items.reduce((sum, item) => sum + item.quantity * item.price, 0)
})

const taxAmount = computed(() => {
  return subtotal.value * (props.invoice.tax || 0) / 100
})

const discountAmount = computed(() => {
  return subtotal.value * (props.invoice.discount || 0) / 100
})

const total = computed(() => {
  return subtotal.value + taxAmount.value - discountAmount.value
})
</script>

<template>
  <div class="data-invoice">
    <div class="invoice-header">
      <div>
        <h1 class="invoice-title">INVOICE</h1>
        <p class="invoice-number">{{ invoice.number }}</p>
      </div>
      <div class="invoice-dates">
        <div><span class="label">Date:</span> {{ invoice.date }}</div>
        <div><span class="label">Due:</span> {{ invoice.dueDate }}</div>
      </div>
    </div>

    <div class="invoice-parties">
      <div class="party">
        <h3>From</h3>
        <p class="party-name">{{ invoice.from.name }}</p>
        <p>{{ invoice.from.address }}</p>
        <p>{{ invoice.from.email }}</p>
      </div>
      <div class="party">
        <h3>To</h3>
        <p class="party-name">{{ invoice.to.name }}</p>
        <p>{{ invoice.to.address }}</p>
        <p>{{ invoice.to.email }}</p>
      </div>
    </div>

    <table class="invoice-table">
      <thead>
        <tr>
          <th>Description</th>
          <th class="text-center">Quantity</th>
          <th class="text-right">Price</th>
          <th class="text-right">Amount</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, i) in invoice.items" :key="i">
          <td>{{ item.description }}</td>
          <td class="text-center">{{ item.quantity }}</td>
          <td class="text-right">${{ item.price.toFixed(2) }}</td>
          <td class="text-right">${{ (item.quantity * item.price).toFixed(2) }}</td>
        </tr>
      </tbody>
    </table>

    <div class="invoice-totals">
      <div class="total-row">
        <span>Subtotal:</span>
        <span>${{ subtotal.toFixed(2) }}</span>
      </div>
      <div v-if="invoice.tax" class="total-row">
        <span>Tax ({{ invoice.tax }}%):</span>
        <span>${{ taxAmount.toFixed(2) }}</span>
      </div>
      <div v-if="invoice.discount" class="total-row">
        <span>Discount ({{ invoice.discount }}%):</span>
        <span>-${{ discountAmount.toFixed(2) }}</span>
      </div>
      <div class="total-row total">
        <span>Total:</span>
        <span>${{ total.toFixed(2) }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.data-invoice {
  @apply bg-white rounded-lg border border-gray-200 p-8;
}

.invoice-header {
  @apply flex justify-between items-start mb-8 pb-4 border-b border-gray-200;
}

.invoice-title {
  @apply text-3xl font-bold text-gray-900;
}

.invoice-number {
  @apply text-gray-600;
}

.invoice-dates {
  @apply text-right text-sm;
}

.label {
  @apply font-medium text-gray-700;
}

.invoice-parties {
  @apply grid grid-cols-2 gap-8 mb-8;
}

.party h3 {
  @apply font-semibold text-gray-900 mb-2;
}

.party-name {
  @apply font-medium text-gray-900;
}

.party p {
  @apply text-sm text-gray-600;
}

.invoice-table {
  @apply w-full mb-6;
}

.invoice-table th {
  @apply px-4 py-2 bg-gray-50 font-medium text-gray-700 text-left border-b border-gray-200;
}

.invoice-table td {
  @apply px-4 py-3 border-b border-gray-100;
}

.invoice-totals {
  @apply ml-auto max-w-xs space-y-2;
}

.total-row {
  @apply flex justify-between text-sm;
}

.total-row.total {
  @apply text-lg font-bold text-gray-900 pt-2 border-t border-gray-200;
}
</style>
