// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxthub/core',
    '@nuxt/fonts',
    '@nuxt/ui',
    '@vueuse/nuxt',
  ],

  hub: {
    blob: true,
  },

  ui: {
    icons: ['simple-icons'],
  },

  experimental: {
    viewTransition: true,
  },

  devtools: { enabled: true },

  ssr: false
})
