// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  runtimeConfig: {
    // server-only — never exposed to the client bundle
    jwtAccessSecret: process.env.JWT_ACCESS_SECRET || '',
    accessTokenTtl: '15m',
    refreshTokenTtlDays: 7,
  },
  modules: ['@nuxtjs/i18n', '@nuxtjs/tailwindcss'],
  i18n: {
    defaultLocale: 'en',
    locales: [
      { code: 'en', language: 'en-US', name: 'English' },
      { code: 'uk', language: 'uk-UA', name: 'Українська' }
    ]
  },
  vite: {
    optimizeDeps: {
      include: ['@vue/devtools-core', '@vue/devtools-kit']
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
