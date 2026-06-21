// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from 'nuxt/config'
import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  runtimeConfig: {
    // server-only — never exposed to the client bundle
    jwtAccessSecret: process.env.JWT_ACCESS_SECRET || '',
    accessTokenTtl: '15m',
    refreshTokenTtlDays: 7,
  },
  devServer: {
    port: 3000,
  },
  modules: [
    '@nuxtjs/i18n',
    '@nuxt/eslint',
    '@nuxt/image',
    '@pinia/nuxt',
    '@vueuse/nuxt',
    '@nuxtjs/seo',
  ],
  components: [
    {
      path: '~/components',
      pathPrefix: false,
    },
  ],
  i18n: {
    defaultLocale: 'en',
    locales: [
      { code: 'en', language: 'en-US', name: 'English' },
      { code: 'uk', language: 'uk-UA', name: 'Українська' }
    ]
  },
  vite: {
    plugins: [tailwindcss()],
    optimizeDeps: {
      include: [
        '@unhead/schema-org/vue',
        '@vue/devtools-core',
        '@vue/devtools-kit',
      ]
    }
  },
  nitro: {
    // FE-only mode: proxy /api to a shared backend so the browser sees
    // everything as same-origin (httpOnly cookies keep working).
    // Set API_PROXY_TARGET to enable; leave empty to use the local backend.
    devProxy: process.env.API_PROXY_TARGET
      ? {
          '/api': {
            target: `${process.env.API_PROXY_TARGET}/api`,
            changeOrigin: true,
          },
        }
      : undefined,
  },
})
