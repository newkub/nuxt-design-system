<script setup lang="ts">
import { ref, watch } from 'vue'
import { onClickOutside } from '@vueuse/core'

interface ModalProps {
  isOpen: boolean
  size?: 'sm' | 'md' | 'lg'
  closeOnClickOutside?: boolean
  class?: string
  variantGroup?: string
  darkClass?: string
  overlayClass?: string
}

const props = withDefaults(defineProps<ModalProps>(), {
  isOpen: false,
  size: 'md',
  closeOnClickOutside: true
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
    <div v-if="props.isOpen" class="fixed inset-0 z-50">
      <!-- Overlay -->
      <div class="fixed inset-0 bg-black/50" aria-hidden="true" :class="props.overlayClass" />

      <!-- Modal container -->
      <div class="fixed inset-0 flex items-center justify-center p-4">
        <!-- Modal content -->
        <div
          ref="modalRef"
          class="bg-white rounded-lg shadow-lg w-full"
          :class="[
            props.class,
            props.variantGroup,
            props.darkClass,
            {
              'max-w-sm': props.size === 'sm',
              'max-w-md': props.size === 'md',
              'max-w-lg': props.size === 'lg'
            }
          ]"
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

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 200ms;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>