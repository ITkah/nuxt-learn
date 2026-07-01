<script setup>
const router = useRouter()

// TODO: розберись які є способи роботи з навігацією, і потім видаляй це - pages і ul/li
const pages = [
  {
    name: 'Home',
    path: '/',
  },
  {
    name: 'Login',
    path: '/login',
  },
  {
    name: 'Register',
    path: '/register',
  }
]

async function handlePageNavigation(page) {
  await router.push(page.path)
}
</script>

<template>
  <BaseHeader />
  <ul>
    <li class="cursor-pointer" v-for="page of pages"
        :key="page.name">
      <div @click="handlePageNavigation(page)">
        {{ page.name }}
      </div>
    </li>
  </ul>
  <NuxtPage />
</template>
