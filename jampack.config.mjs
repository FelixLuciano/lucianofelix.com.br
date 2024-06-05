export default {
  general: {
    browserslist: 'last 1 version, not dead',
  },
  image: {
    src_exclude: /^\/image\/favicon\.svg$/,
    external: {
      process: 'download',
    },
  },
  misc: {
    prefetch_links: 'in-viewport',
  },
}
