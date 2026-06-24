<script setup lang="ts">
useSeoMeta({
  title: 'Sign in',
  description: 'Sign in to your Shop Learn account.',
})
</script>

<template>
  <section class="flex min-h-[calc(100vh-4.25rem)] items-center justify-center bg-gradient-to-b from-stone-50 to-stone-100 px-4 py-12">
    <AuthCard
      title="Welcome back"
      subtitle="Sign in to continue shopping"
    >
      <LoginForm />

      <p class="mt-6 text-center text-sm text-stone-500">
        Don't have an account?
        <NuxtLink
          to="/register"
          class="font-medium text-stone-900 underline-offset-4 hover:underline"
        >
          Create one
        </NuxtLink>
      </p>
    </AuthCard>
  </section>
</template>
