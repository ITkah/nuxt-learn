<template>
  <header class="sticky top-0 z-50 border-b border-stone-200/70 bg-white/90 shadow-sm backdrop-blur-xl">
    <div class="mx-auto flex h-[4.25rem] max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
      <NuxtLink
        to="/"
        class="flex items-center gap-3 transition-opacity hover:opacity-90"
      >
        <span class="flex size-11 items-center justify-center rounded-2xl bg-gradient-to-br from-stone-800 to-stone-950 text-white shadow-lg shadow-stone-900/25">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            class="size-5"
            aria-hidden="true"
          >
            <path
              d="M6 8h12l-1.2 10.5a1.5 1.5 0 0 1-1.49 1.33H8.69a1.5 1.5 0 0 1-1.49-1.33L6 8Z"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linejoin="round"
            />
            <path
              d="M9 8V6.5a3 3 0 1 1 6 0V8"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
            />
          </svg>
        </span>
        <span class="flex flex-col leading-none">
          <span class="text-base font-bold tracking-tight text-stone-900 sm:text-lg">Shop Learn</span>
          <span class="mt-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-stone-400">E-commerce</span>
        </span>
      </NuxtLink>

      <div class="flex items-center gap-2.5 sm:gap-3">
        <BaseButton to="/login" variant="outline" size="sm">
          Sign in
        </BaseButton>
        <BaseButton to="/register" variant="primary" size="sm">
          Register
        </BaseButton>
      </div>
    </div>
  </header>
</template>
