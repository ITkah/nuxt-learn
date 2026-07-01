<script setup lang="ts">
import { loginSchema, zodFieldErrors } from 'shared/utils/validation'

const loginForm = reactive({
  email: '',
  password: '',
})

const loading = ref(false)
const errorMessage = ref('')
const fieldErrors = ref<Record<string, string>>({})

async function handleSubmit() {
  fieldErrors.value = {}
  errorMessage.value = ''

  const parsed = loginSchema.safeParse(loginForm)
  if (!parsed.success) {
    fieldErrors.value = zodFieldErrors(parsed.error)
    return
  }

  loading.value = true
  try {
    await $fetch('/api/auth/login', {
      method: 'POST',
      body: parsed.data,
    })
    await navigateTo('/')
  } catch {
    errorMessage.value = 'Could not sign in'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <form class="flex flex-col gap-5" @submit.prevent="handleSubmit">
    <div class="flex flex-col gap-1.5">
      <label for="email" class="text-sm font-medium text-stone-700">
        Email
        <span class="text-rose-500">*</span>
      </label>
      <input
        id="email"
        v-model="loginForm.email"
        name="email"
        type="email"
        autocomplete="email"
        placeholder="you@example.com"
        required
        class="w-full rounded-lg border bg-white px-3.5 py-2.5 text-sm text-stone-900 shadow-sm transition placeholder:text-stone-400 focus:outline-none focus:ring-2"
        :class="fieldErrors.email
          ? 'border-rose-300 focus:border-rose-400 focus:ring-rose-100'
          : 'border-stone-200 focus:border-stone-400 focus:ring-stone-100'"
      >
      <p v-if="fieldErrors.email" class="text-sm text-rose-500">
        {{ fieldErrors.email }}
      </p>
    </div>

    <div class="flex flex-col gap-1.5">
      <label for="password" class="text-sm font-medium text-stone-700">
        Password
        <span class="text-rose-500">*</span>
      </label>
      <input
        id="password"
        v-model="loginForm.password"
        name="password"
        type="password"
        autocomplete="current-password"
        placeholder="••••••••"
        required
        maxlength="128"
        class="w-full rounded-lg border bg-white px-3.5 py-2.5 text-sm text-stone-900 shadow-sm transition placeholder:text-stone-400 focus:outline-none focus:ring-2"
        :class="fieldErrors.password
          ? 'border-rose-300 focus:border-rose-400 focus:ring-rose-100'
          : 'border-stone-200 focus:border-stone-400 focus:ring-stone-100'"
      >
      <p v-if="fieldErrors.password" class="text-sm text-rose-500">
        {{ fieldErrors.password }}
      </p>
    </div>

    <button
      type="submit"
      :disabled="loading"
      class="inline-flex w-full items-center justify-center rounded-xl bg-stone-900 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-stone-900/20 transition-all duration-200 hover:bg-stone-800 hover:shadow-lg hover:shadow-stone-900/25 focus:outline-none focus-visible:ring-2 focus-visible:ring-stone-400 focus-visible:ring-offset-2 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 disabled:active:scale-100"
    >
      {{ loading ? 'Signing in…' : 'Sign in' }}
    </button>

    <p v-if="errorMessage" class="text-sm text-red-500">
      {{ errorMessage }}
    </p>
  </form>
</template>
