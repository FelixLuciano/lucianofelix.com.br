import { defineNuxtConfig } from 'nuxt'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  target: 'static',
  ssr: false,
  buildAssetsDir: '_app',

  modules: [
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
    // https://vueuse.org,/
    '@vueuse/nuxt'
  ],

  postcss: {
    plugins: {
      'tailwindcss/nesting': {},
      'css-declaration-sorter': {
        order: 'concentric-css'
      }
    }
  }
})
