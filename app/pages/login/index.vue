<script setup lang="ts">
useSeoMeta({
  title: 'Login',
  description: 'Sign in to your account'
})
</script>
<template>
  <main class="flex min-h-screen items-center justify-center bg-gray-100 px-4">
    <section class="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
      <div class="mb-8 text-center">
        <h1 class="text-3xl font-bold text-gray-900">
          Login
        </h1>
        <p class="mt-2 text-gray-500">
          Sign in to your account
        </p>
      </div>

      <p class="mt-6 text-center text-sm text-gray-600">
        Don’t have an account?

        <NuxtLink
          to="/register"
          class="font-medium text-blue-600 hover:underline"
        >
          Register
        </NuxtLink>
      </p>
    </section>
  </main>
</template>
