import { defineNuxtConfig } from 'nuxt'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  target: 'static',
  ssr: false,
  buildAssetsDir: '_app',

  modules: [
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
    // https://content.nuxtjs.org/
    '@nuxt/content',
    // // https://image.nuxtjs.org/
    // '@nuxt/image',
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
  },

  // // https://image.nuxtjs.org/api/options
  // image: {}
})
