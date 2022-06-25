<template>
  <section class="page-header">
    <div class="wrap">
      <div class="slot slot--left">
        <div class="title-section">
          <h1 class="title">LUCIANO FELIX</h1>
        </div>
      </div>

      <div class="container">
        <div class="slot slot--top">
          <div class="title-section title-section--horizontal">
            <h1 class="title title--horizontal">LUCIANO FELIX</h1>
          </div>
        </div>

        <header class="logo-section">
          <div class="logo">
            <svgLogo />
          </div>
        </header>

        <div class="quote-section">
          <p class="quote">{{ greetings }}<span v-show="isTyping" class="quote_cursor">|</span></p>
        </div>

        <footer class="slot slot--bottom">
          <div class="anchor-section">
            <a class="anchor" href="#section__networks" title="About me">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 14" width="16" height="16" aria-hidden="true">
                <polygon points="8 13.856 16 0 0 0 8 13.856" fill="currentcolor"/>
              </svg>
            </a>
          </div>

          <div class="decorator"></div>
        </footer>
      </div>

      <div class="slot slot--right"></div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'

const isTyping = ref(false)
const greetings = ref('Hey 👋')

function sleep (time) {
  return new Promise((resolve) => {
    setTimeout(resolve, time)
  })
}

async function type (text) {
  for (let character of text) {
    greetings.value += character
    await sleep(32 * (2 * Math.random())**2)
  }
}

async function erase (text) {
  for (let character of text) {
    greetings.value = greetings.value.slice(0, greetings.value.length -1)
    await sleep(32 * (2 * Math.random())**2)
  }
}

onMounted(async () => {
  await sleep(1000)
  isTyping.value = true
  await sleep(1000)
  await erase('Hey 👋👋')
  await sleep(800)
  await type('Hello')
  await sleep(750)
  await type(', I\'m')
  await sleep(100)
  await erase('\'m')
  await type(' am Luciano')
  await sleep(750)
  await type(' and on this page you will')
  await sleep(100)
  await erase('will')
  await type(' can know more about me')
  await sleep(750)
  await type(' and my creations')
  await sleep(500)
  await type('.')
  await sleep(2000)
  isTyping.value = false
})

</script>

<style lang="postcss" scoped>
.page-header {
  flex: 1 0 100vh;
  width: 100%;
  max-height: 70rem;
  padding: var(--margin-size);
  color: #FFF;
  display: flex;
  flex-direction: column;
}

.wrap {
  flex: 1 0 auto;
  width: 100%;
  max-width: 160rem;
  margin: 0 auto;
  background-color: #000;
  border-radius: 0.25rem;
  display: flex;
}

.container {
  flex: 1 1 auto;
  width: 100%;
  max-width: 80rem;
  display: flex;
  flex-direction: column;
}

.slot {
  flex: 1 1 3rem;
  display: flex;

  &--top {
    min-height: 8rem;
    border-bottom: 1px dotted #333;
  }
  &--bottom {
    min-height: 8rem;
    border-top: 1px dotted #333;
    flex-direction: column;
  }
  &--left {
    min-width: 1rem;
    border-right: 1px dotted #333;
  }
  &--right {
    min-width: 1rem;
    border-left: 1px dotted #333;
  }
  &--right, &--left {
    flex: 1 1 3.75rem;

    @media (max-width: 42rem) {
      flex: 1 1 1rem !important;
    }
  }
}

.title {
  margin: 0;
  padding: 1.5rem 1rem 0.8rem 1rem;
  border-bottom: 1px dotted #333;
  border-top-left-radius: 0.25rem;
  background-color: var(--primary-color);
  writing-mode: vertical-rl;
  white-space: nowrap;
  font-weight: bold;
  letter-spacing: min(1vh, 2rem);

  &--horizontal {
    margin-bottom: auto;
    padding: 1rem;
    border: none;
    border-radius: 0;
    writing-mode: initial;
  }

  &::selection {
    background-color: #000;
  }

  &-section {
    margin: 0 1rem 0 -0.25rem;
    border-right: 1px dotted #333;

    @media (max-width: 42rem) {
      display: none;
    }

    &--horizontal {
      flex: 1 0 auto;
      margin: 0 0 auto 0;
      width: 100%;
      border-right: none;
      border-bottom: 1px dotted #333;
      display: none;

      @media (max-width: 42rem) {
        display: flex;
      }
    }
  }
}

.logo {
  width: 8rem;
  height: 8rem;
  border-right: 1px dotted #333;
  background-color: #222;
  font-size: 5rem;
  display: flex;
  justify-content: center;
  align-items: center;

  & > svg {
    transition: filter 256ms;
  }
  &:hover > svg {
    filter: drop-shadow(0 0 1rem rgba(255, 255, 255, .8))
  }

  &-section {
    border-bottom: 1px dotted #333;
  }
}

.quote {
  padding: clamp(1rem, 3vmin, 1.5rem) clamp(1.5rem, 3vmin, 2rem);
  border-right: 1px dotted #333;
  background-color: #111;
  font-size: clamp(1.25rem, 3vmin, 1.5rem);

  &::before {
    content: open-quote;
  }
  &::after {
    content: close-quote;
  }

  &-section {
    min-width: 8rem;
    max-width: 95%;
    display: flex;
  }

  &-cursor {
    user-select: none;
    animation: blink 1s steps(2, start) infinite;
  }
  @keyframes blink {
    to {
      visibility: hidden;
    }
  }
}

.anchor {
  padding: 1rem 2.5rem;
  border: 1px dotted #333;
  border-top-width: 0;
  border-bottom-width: 0;
  display: inline-block;
  color: inherit;
  text-decoration: none;
  transition: background-color 64ms;

  &:hover {
    background-color: #222;
  }

  &-section {
    width: 100%;
    margin-top: auto;
    border-top: 1px dotted #333;
    display: flex;
    justify-content: center;
  }
}

.decorator {
  width: 32%;
  min-width: 8rem;
  margin: 0 auto;
  border: .25rem solid #000;
  border-top-width: 0;
  border-bottom-color: var(--background-color);
}
</style>
