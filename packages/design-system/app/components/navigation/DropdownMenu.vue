<script setup lang="ts">
interface MenuItem {
  label: string
  value: string
  icon?: string
  disabled?: boolean
  divider?: boolean
}

const props = withDefaults(defineProps<{
  items: MenuItem[]
  modelValue?: boolean
}>(), {
  modelValue: false
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  select: [item: MenuItem]
}>()

const handleSelect = (item: MenuItem) => {
  if (item.disabled) return
  emit('select', item)
  emit('update:modelValue', false)
}
</script>

<template>
  <NavigationDropdown :model-value="modelValue" @update:model-value="emit('update:modelValue', $event)">
    <template #trigger>
      <slot name="trigger" />
    </template>
    
    <div class="dropdown-menu-items">
      <template v-for="(item, index) in items" :key="index">
        <NavigationMenuDivider v-if="item.divider" />
        <button
          v-else
          :class="['dropdown-menu-item', { disabled: item.disabled }]"
          @click="handleSelect(item)"
        >
          <span v-if="item.icon" class="item-icon">{{ item.icon }}</span>
          <span>{{ item.label }}</span>
        </button>
      </template>
    </div>
  </NavigationDropdown>
</template>

<style scoped>
.dropdown-menu-items {
  @apply py-1;
}

.dropdown-menu-item {
  @apply w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2 transition-colors;
}

.dropdown-menu-item.disabled {
  @apply text-gray-400 cursor-not-allowed hover:bg-transparent;
}

.item-icon {
  @apply text-base;
}
</style>
