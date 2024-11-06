// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxtjs/supabase',
    '@nuxtjs/tailwindcss',
    '@nuxt/icon',
  ],

  devtools: { enabled: true },

  compatibilityDate: '2024-04-03',

  nitro: {
    esbuild: {
      options: {
        target: 'esnext',
      },
    },
  },

  eslint: {
    config: {
      standalone: false,
      nuxt: {
        sortConfigKeys: true,
      },
    },
  },

  supabase: {
    redirect: false,
  },
})
