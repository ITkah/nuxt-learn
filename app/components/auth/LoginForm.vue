<template>
  <form class="flex flex-col gap-5">
    <BaseInput
      label="Email"
      name="email"
      type="email"
      autocomplete="email"
      placeholder="you@example.com"
      required
    />

    <BaseInput
      label="Password"
      name="password"
      type="password"
      autocomplete="current-password"
      placeholder="••••••••"
      required
    />

    <BaseButton type="submit" class="w-full">
      Sign in
    </BaseButton>
  </form>
</template>
