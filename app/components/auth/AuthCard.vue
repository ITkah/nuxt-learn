<script setup lang="ts">
defineProps<{
  title: string
  subtitle?: string
}>()
</script>

<template>
  <div class="w-full max-w-md rounded-2xl border border-stone-200/80 bg-white p-8 shadow-xl shadow-stone-200/50">
    <div class="mb-8 text-center">
      <h1 class="text-2xl font-semibold tracking-tight text-stone-900">
        {{ title }}
      </h1>
      <p v-if="subtitle" class="mt-2 text-sm text-stone-500">
        {{ subtitle }}
      </p>
    </div>
    <slot />
  </div>
</template>
