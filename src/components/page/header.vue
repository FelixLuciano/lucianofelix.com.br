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
          <div class="logo" v-show="!showDataMatrix" @click="() => toggleDataMatrix()">
            <svg-logo />
            <svg-logo-dark />
          </div>
          <div class="data-matrix" v-show="showDataMatrix" @click="() => toggleDataMatrix()">
            <svg-data-matrix />
          </div>
        </header>

        <div class="quote-section">
          <p class="quote">{{ greetings }}<span v-show="showCursor" class="quote-cursor">|</span></p>
        </div>

        <footer class="slot slot--bottom">
          <div class="anchor-section">
            <a class="anchor" href="#networks" title="About me">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 14" width="16" height="16" aria-hidden="true">
                <polygon points="8 13.856 16 0 0 0 8 13.856" fill="currentcolor" />
              </svg>
            </a>
          </div>

          <div class="decorator"></div>
        </footer>
      </div>

      <div class="slot slot--right">
        <ul class="options--section">
          <li class="options--item">
            <a href="#" @click.prevent="$colorMode.preference = 'dark'">Dark</a>
          </li>
          <li class="options--item">
            <a href="#" @click.prevent="$colorMode.preference = 'light'">Light</a>
          </li>
          <li class="options--item">
            <a href="#" @click.prevent="$colorMode.preference = 'system'">System</a>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'

const showDataMatrix = ref(false)
const isTyping = ref(false)
const showCursor = ref(true)
const greetings = ref('Hey 👋')

function sleep(time: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, time)
  })
}

async function type(text: string, speed = 32) {
  for (let character of text) {
    greetings.value += character
    await sleep(speed * (2 * Math.random()) ** 2)
  }
}

async function erase(text: string, speed = 32) {
  for (let character of text) {
    greetings.value = greetings.value.slice(0, greetings.value.length - 1)
    await sleep(speed * (2 * Math.random()) ** 2)
  }
}

async function toggleDataMatrix() {
  if (isTyping.value) return

  isTyping.value = true
  showCursor.value = true

  if (!showDataMatrix.value) {
    await erase('Hello, I am Luciano and on this page you can know more about me and my creations..', 6)

    showDataMatrix.value = true

    await type('Humm...', 8)

    isTyping.value = false
  } else {
    await erase('Humm...', 8)

    showDataMatrix.value = false

    await type('Hello, I am Luciano and on this page you can know more about me and my creations.', 6)
    await sleep(1000)

    showCursor.value = false
    isTyping.value = false
  }

}

onMounted(async () => {
  isTyping.value = true
  await sleep(1000)
  showCursor.value = true
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
  showCursor.value = false
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

  & ::selection {
    color: #FFF;
  }
}

.wrap {
  flex: 1 0 auto;
  width: 100%;
  max-width: 160rem;
  margin: 0 auto;
  background-color: #000;
  border-radius: 0.25rem;
  display: flex;
  color-scheme: only light;

  :root.dark & {
    background-color: #DDD;
  }
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

  :root.dark & {
    border-color: #888 !important;
  }

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
    border-right: 1px dotted #333;
  }

  &--right {
    border-left: 1px dotted #333;
  }

  &--right,
  &--left {
    flex: 1 1 3.5rem;

    @media (max-width: 42rem) {
      flex: 1 0 1rem !important;
    }
  }
}

.title {
  margin-left: -0.25rem;
  padding: 1.5rem 0 0.8rem 0;
  border-bottom: 1px dotted #333;
  border-top-left-radius: 0.25rem;
  background-color: var(--primary-color);
  line-height: 3.75rem;
  writing-mode: vertical-rl;
  white-space: nowrap;
  font-weight: bold;
  letter-spacing: min(1vh, 2rem);

  :root.dark & {
    border-color: #666;
  }

  &--horizontal {
    margin-left: 0;
    padding: 0 1rem;
    border-bottom: none;
    border-right: 1px dotted #333;
    border-radius: 0;
    writing-mode: initial;
  }

  &::selection {
    background-color: #000;
  }

  &-section {
    border-right: 1px dotted #333;

    @media (max-width: 42rem) {
      display: none;
    }

    :root.dark & {
      border-color: #888;
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

.options {
  &--section {
    margin: 0 0 0 auto;
    padding: 1.5rem 0;
    border-left: 1px dotted #333;
    justify-self: end;
    display: flex;
    flex-direction: column-reverse;
    gap: 2rem;

    @media (max-width: 42rem) {
      display: none;
    }

    :root.dark & {
      border-color: #666;
    }
  }

  &--item {
    opacity: .5;
    line-height: 3.5rem;
    writing-mode: vertical-rl !important;
    text-orientation: mixed;

    &:hover {
      opacity: 1;
      text-decoration: dotted underline var(--primary-color);
      cursor: pointer;
    }

    :root.dark & {
      opacity: .75;
      color: #111;
    }
  }
}

.logo,
.data-matrix {
  width: 8rem;
  height: 8rem;
  border-right: 1px dotted #333;
  background-color: #222;
  font-size: 5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none;

  :root.dark & {
    background-color: #999;
    border-color: #777;
  }

  &>svg {
    transition: filter 256ms;
  }

  &:hover>svg {
    filter: drop-shadow(0 0 1rem rgba(255, 255, 255, .8));

    :root.dark & {
      filter: drop-shadow(0 0 1rem rgba(0, 0, 0, .8));
    }
  }

  &-section {
    border-bottom: 1px dotted #333;

    :root.dark & {
      border-color: #777;
    }
  }
}

.logo>svg {
  &:nth-child(1) {
    display: block;
  }

  &:nth-child(2) {
    display: none;
  }

  :root.dark & {
    &:nth-child(1) {
      display: none;
    }

    &:nth-child(2) {
      display: block;
    }
  }
}

.data-matrix {
  padding: 1rem;
  background-color: #FFF;

  &:hover>svg {
    filter: none;
  }
}

.quote {
  padding: clamp(1rem, 3vmin, 1.5rem) clamp(1.5rem, 3vmin, 2rem);
  border-right: 1px dotted #333;
  background-color: #111;
  font-size: clamp(1.25rem, 3vmin, 1.5rem);

  :root.dark & {
    background-color: #BBB;
    border-color: #888;
    color: #111;
  }

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

  :root.dark & {
    border-color: #888;
    color: #222;
  }

  &:hover {
    background-color: #222;

    :root.dark & {
      background-color: #AAA;
    }
  }

  &-section {
    width: 100%;
    margin-top: auto;
    border-top: 1px dotted #333;
    display: flex;
    justify-content: center;

    :root.dark & {
      border-color: #888;
    }
  }
}

.decorator {
  width: 32%;
  min-width: 8rem;
  margin: 0 auto;
  border: .25rem solid #000;
  border-top-width: 0;
  border-bottom-color: var(--background-color);

  :root.dark & {
    border-color: #DDD;
    border-bottom-color: var(--background-color);
  }
}
</style>
