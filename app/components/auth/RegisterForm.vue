<template>
  <form class="flex flex-col gap-5">
    <BaseInput
      label="Full name"
      name="name"
      autocomplete="name"
      placeholder="Jane Doe"
      required
    />

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
      autocomplete="new-password"
      placeholder="••••••••"
      required
    />

    <BaseButton type="submit" class="w-full">
      Create account
    </BaseButton>
  </form>
</template>
