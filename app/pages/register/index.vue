<script setup lang="ts">
useSeoMeta({
  title: 'Create account',
  description: 'Create your Shop Learn account.',
})
</script>

<template>
  <section class="flex min-h-[calc(100vh-4.25rem)] items-center justify-center bg-gradient-to-b from-stone-50 to-stone-100 px-4 py-12">
    <AuthCard
      title="Create account"
      subtitle="Join Shop Learn and start exploring"
    >
      <RegisterForm />

      <p class="mt-6 text-center text-sm text-stone-500">
        Already have an account?
        <NuxtLink
          to="/login"
          class="font-medium text-stone-900 underline-offset-4 hover:underline"
        >
          Sign in
        </NuxtLink>
      </p>
    </AuthCard>
  </section>
</template>
