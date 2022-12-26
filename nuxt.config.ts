// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  target: 'static',
  ssr: true,

  modules: [
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
    // https://content.nuxtjs.org/
    '@nuxt/content',
    // // https://image.nuxtjs.org/
    // '@nuxt/image',
    // https://vueuse.org,/
    '@vueuse/nuxt',
    // https://color-mode.nuxtjs.org/
    '@nuxtjs/color-mode',
    // https://nuxt.com/modules/robots
    '@nuxtjs/robots',
  ],

  // https://tailwindcss.nuxt.dev/getting-started/options
  tailwindcss: {
    viewer: false,
  },

  postcss: {
    plugins: {
      'tailwindcss/nesting': {},
      'css-declaration-sorter': {
        order: 'concentric-css',
      },
    },
  },

  // // https://image.nuxtjs.org/api/options
  // image: {},

  colorMode: {
    preference: 'system',
    fallback: 'light',
    hid: 'nuxt-color-mode-script',
    componentName: 'ColorScheme',
    classPrefix: '',
    classSuffix: '',
    storageKey: 'color-mode',
  },

  // https://nuxt.com/modules/robots#options
  robots: {
    rules: {
      UserAgent: '*',
      Allow: '/$',
      Disallow: '/',
    },
  },
})
