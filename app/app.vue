<script setup lang="ts">
import DefaultLayout from './layouts/DefaultLayout.vue'

const layout = ref<'default'>('default')

const layouts = {
  default: DefaultLayout,
}
</script>

<template>
  <div class="m-3 flex gap-2 items-center justify-center">
    <nuxt-link to="/">home</nuxt-link>
    <nuxt-link to="/test">test</nuxt-link>
  </div>


  <component :is="layouts[layout]">
    <NuxtPage />
  </component>
</template>

