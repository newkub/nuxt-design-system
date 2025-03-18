<script setup lang="ts">
import { ref, watch } from 'vue'
import { onClickOutside } from '@vueuse/core'

const props = defineProps({
  isOpen: { type: Boolean, required: true },
  size: { type: String, default: 'md', validator: (value: string) => ['sm', 'md', 'lg'].includes(value) },
  closeOnClickOutside: { type: Boolean, default: true }
})

const emit = defineEmits(['close'])

const modalRef = ref<HTMLElement | null>(null)

watch(() => props.isOpen, (isOpen) => {
  if (isOpen) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = 'auto'
  }
})

if (props.closeOnClickOutside) {
  onClickOutside(modalRef, () => emit('close'))
}
</script>

<template>
  <Transition name="fade">
    <div v-if="isOpen" class="fixed inset-0 z-50">
      <!-- Overlay -->
      <div class="fixed inset-0 bg-black/50" aria-hidden="true" />

      <!-- Modal container -->
      <div class="fixed inset-0 flex items-center justify-center p-4">
        <!-- Modal content -->
        <div
          ref="modalRef"
          class="bg-white rounded-lg shadow-lg w-full"
          :class="{
            'max-w-sm': size === 'sm',
            'max-w-md': size === 'md',
            'max-w-lg': size === 'lg'
          }"
          role="dialog"
          aria-modal="true"
        >
          <!-- Header slot -->
          <header v-if="$slots.header" class="px-6 py-4 border-b">
            <slot name="header" />
          </header>

          <!-- Content slot -->
          <div class="px-6 py-4">
            <slot />
          </div>

          <!-- Footer slot -->
          <footer v-if="$slots.footer" class="px-6 py-4 border-t">
            <slot name="footer" />
          </footer>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
