<script setup lang="ts">
interface Props {
	totalSelectedItems: number;
}

defineProps<Props>();

const emit = defineEmits<{
	attach: [];
}>();

function handleAttach() {
	emit("attach");
}
</script>

<template>
  <button
    :disabled="totalSelectedItems === 0"
    @click="handleAttach"
    class="w-full py-3 bg-success-normal text-white rounded-lg font-semibold disabled:bg-border-normal disabled:cursor-not-allowed hover:bg-success-active transition-colors"
  >
    Attach {{ totalSelectedItems > 0 ? totalSelectedItems + ' item(s)' : '' }}
  </button>
</template>
