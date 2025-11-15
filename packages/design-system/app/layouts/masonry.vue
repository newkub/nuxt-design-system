<template>
  <div class="p-4 sm:p-6 md:p-8">
    <div class="column-count-1 sm:column-count-2 md:column-count-3 lg:column-count-4 xl:column-count-5 gap-4 sm:gap-6 md:gap-8">
      <slot />
    </div>
  </div>
</template>

<style>
/* We add this small global style to ensure items inside the slot don't break across columns */
.column-count-1 > *,
.sm\:column-count-2 > *,
.md\:column-count-3 > *,
.lg\:column-count-4 > *,
.xl\:column-count-5 > * {
  break-inside: avoid;
  margin-bottom: 1rem; /* Corresponds to gap-4 */
}
</style>
