import { useCssVar } from '@vueuse/core'

const COLORS = ['#922', '#A82', '#582', '#272', '#286', '#268', '#22B', '#529', '#A28']

export default defineNuxtPlugin(nuxtApp => {
  const primaryColor = useCssVar('--primary-color')

  primaryColor.value = COLORS[Math.floor(Math.random() * COLORS.length)]
})
