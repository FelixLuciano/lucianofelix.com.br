/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            a: {
              color: 'var(--primary-color)',
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography')
  ],
}
