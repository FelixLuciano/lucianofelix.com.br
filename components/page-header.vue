<template>
  <header class="page-header">
    <div class="page-header__wrap">
      <div class="page-header__slot page-header__slot--left">
        <div class="page-header__title-section">
          <p class="page-header__title bg-primary">LUCIANO FELIX</p>
        </div>
      </div>

      <div class="page-header__container">
        <div class="page-header__slot page-header__slot--top">
          <div class="page-header__title-section page-header__title-section--horizontal">
            <p class="page-header__title page-header__title--horizontal bg-primary">LUCIANO FELIX</p>
          </div>
        </div>

        <div class="page-header__logo-section">
          <div class="page-header__logo bg-primary">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 182 208" width="64" height="64">
              <path fill="#777" d="M85.5 137.5h-32v-34.1c0-3.5-2.2-6.6-5.5-7.8l-10.5-3.8V26.7h32v44.6c9.9 7.5 16 19.3 16 32.1v34.1z" />
              <path fill="#AAA" d="M85.5 103.4h-32v-32c0-3.5-2.2-6.6-5.5-7.8l-26.5-9.7V26.7h32v4.8l5.5 2c15.9 5.8 26.5 21 26.5 37.9v32z" />
              <path fill="#DDD" d="M85.5 71.4h-32v-16c0-3.5-2.2-6.6-5.5-7.8L0 30.1 10.9 0l48 17.5c15.9 5.8 26.5 21 26.5 37.9v16z" />
              <polygon fill="#FFF" points="181.5,175.5 169.8,207.5 53.5,207.5 53.5,15.5 85.5,27.1 85.5,175.5" />
            </svg>
          </div>
        </div>

        <div class="page-header__quote-section">
          <p class="page-header__quote">{{ greetings }}<span v-show="isTyping" class="page-header__quote-cursor">|</span></p>
        </div>

        <div class="page-header__slot page-header__slot--bottom">
          <div class="page-header__anchor-section">
            <a class="page-header__anchor bg-primary" href="#" title="About me">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 14" width="16" height="16" aria-hidden="true">
                <polygon points="8 13.856 16 0 0 0 8 13.856" fill="currentcolor"/>
              </svg>
            </a>
          </div>

          <div class="page-header__decorator"></div>
        </div>
      </div>

      <div class="page-header__slot page-header__slot--right"></div>
    </div>
  </header>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'

const isTyping = ref(false)
const greetings = ref('')

function sleep (time) {
  return new Promise((resolve) => {
    setTimeout(resolve, time)
  })
}

async function type (text) {
  for (let character of text) {
    greetings.value += character
    await sleep(64 * (2 * Math.random())**2)
  }
}

async function erase (text) {
  for (let character of text) {
    greetings.value = greetings.value.slice(0, greetings.value.length -1)
    await sleep(64 * (2 * Math.random())**2)
  }
}

onMounted(async () => {
  await sleep(1000)
  isTyping.value = true
  await sleep(1000)
  await erase('Hey')
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

<style lang="postcss">
.page-header {
  flex: 1 0 100vh;
  width: 100%;
  max-height: 70rem;
  padding: var(--margin-size);
  color: #FFF;
  display: flex;
  flex-direction: column;

  &__wrap {
    flex: 1 0 auto;
    width: 100%;
    max-width: 160rem;
    margin: 0 auto;
    background-color: #000;
    border-radius: 0.25rem;
    display: flex;
  }

  &__container {
    flex: 1 1 auto;
    width: 100%;
    max-width: 80rem;
    display: flex;
    flex-direction: column;
  }

  &__slot {
    flex: 1 1 3rem;
    display: flex;

    @media (max-width: 42rem) {
    &--right, &--left {
        flex: 1 1 1rem !important;
      }
    }
    &--top {
      min-height: 8rem;
      border-bottom: 1px dotted #333;
    }
    &--right {
      flex: 1 1 3rem;
      min-width: 1rem;
      border-left: 1px dotted #333;
    }
    &--bottom {
      min-height: 8rem;
      border-top: 1px dotted #333;
      flex-direction: column;
    }
    &--left {
      flex: 1 1 3.75rem;
      min-width: 1rem;
      border-right: 1px dotted #333;
    }
  }


  &__title {
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

  &__logo {
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

  &__quote {
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

  &__anchor {
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

  &__decorator {
    width: 32%;
    min-width: 8rem;
    margin: 0 auto;
    border: .25rem solid #000;
    border-top-width: 0;
    border-bottom-color: var(--background-color);
  }
}
</style>
