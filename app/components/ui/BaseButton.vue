<script setup lang="ts">
defineProps<{
  to?: string
  type?: 'button' | 'submit' | 'reset'
  variant?: 'primary' | 'outline' | 'ghost'
  size?: 'sm' | 'md'
}>()
</script>

<template>
  <NuxtLink
    v-if="to"
    :to="to"
    class="inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-stone-400 focus-visible:ring-offset-2 active:scale-[0.98]"
    :class="[
      size === 'sm' ? 'px-4 py-2 text-sm' : 'px-5 py-2.5 text-sm',
      variant === 'outline'
        ? 'border border-stone-200 bg-white text-stone-700 shadow-sm hover:border-stone-300 hover:bg-stone-50 hover:text-stone-900'
        : variant === 'ghost'
          ? 'text-stone-600 hover:bg-stone-100 hover:text-stone-900'
          : 'bg-stone-900 text-white shadow-md shadow-stone-900/20 hover:bg-stone-800 hover:shadow-lg hover:shadow-stone-900/25',
    ]"
  >
    <slot />
  </NuxtLink>
  <button
    v-else
    :type="type ?? 'button'"
    class="inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-stone-400 focus-visible:ring-offset-2 active:scale-[0.98]"
    :class="[
      size === 'sm' ? 'px-4 py-2 text-sm' : 'px-5 py-2.5 text-sm',
      variant === 'outline'
        ? 'border border-stone-200 bg-white text-stone-700 shadow-sm hover:border-stone-300 hover:bg-stone-50 hover:text-stone-900'
        : variant === 'ghost'
          ? 'text-stone-600 hover:bg-stone-100 hover:text-stone-900'
          : 'bg-stone-900 text-white shadow-md shadow-stone-900/20 hover:bg-stone-800 hover:shadow-lg hover:shadow-stone-900/25',
    ]"
  >
    <slot />
  </button>
</template>
