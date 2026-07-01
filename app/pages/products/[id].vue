<script setup lang="ts">
const route = useRoute()

const productId = computed(() => route.params.id)

onMounted(() => {
  // console.log(route);
})
</script>

<template>
  <h1>Product id: {{productId}}</h1>
</template>

<style scoped>

</style>