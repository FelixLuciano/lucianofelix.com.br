import { defineNuxtConfig } from 'nuxt'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  target: 'static',
  ssr: false,
  buildAssetsDir: '_app',

  modules: [
    '@nuxtjs/tailwindcss',
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
