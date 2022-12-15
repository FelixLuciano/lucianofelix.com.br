<template>

  <Head>
    <Title>Not Found</Title>
  </Head>

  <main>
    <div class="card">
      <div class="card__decorator card__decorator--left"></div>

      <div class="card__wrap">
        <header class="card__header">{{ props.error.message }}</header>

        <div class="card__body">
          <p class="status-code">
            <span class="status-code__code">{{ props.error.statusCode }}</span>
            <span class="status-code__code" aria-hidden="true">{{ props.error.statusCode }}</span>
            <span class="status-code__code" aria-hidden="true">{{ props.error.statusCode }}</span>
          </p>
        </div>

        <footer class="card__footer">
          <NuxtLink to="/" class="card__footer__link">Back to home</NuxtLink>
        </footer>
      </div>

      <div class="card__decorator card__decorator--right"></div>
    </div>
    
    <p class="message">
      Try
      <a :href="githubURL.href" class="message__link">GitHub.LucianoFelix.com.br</a>
    </p>
  </main>
</template>

<script lang="ts" setup>
import { defineProps, computed } from 'vue'

const props = defineProps({
  error: {
    type: Object,
    required: true,
  }
})

console.log(props.error)

const githubURL = computed(() => {
  return new URL('https://github.lucianofelix.com.br' + props.error.url)
})
</script>

<style lang="postcss" scoped>
.card {
  background-color: #000;
  border-radius: 0.5rem;
  color: #fff;
  font-family: monospace;
  font-weight: 500;
  display: flex;

  :root.dark & {
    background-color: #DDD;
    color: #111;
  }

  &__wrap {
    flex: 1 1 auto;
    margin: 0 1rem;
    border: 1px dotted #333;
    border-top-width: 0;
    border-bottom-width: 0;
    display: flex;
    flex-direction: column;

    :root.dark & {
      border-color: #888;
    }
  }

  &__decorator {
    border: 0.5rem solid #000;

    :root.dark & {
      border-color: #DDD;
    }

    &--left {
      margin-top: 40%;
      border-bottom-width: 0;
      border-right-width: 0;
      border-left-color: var(--background-color) !important;
    }

    &--right {
      margin-bottom: 40%;
      border-top-width: 0;
      border-right-color: var(--background-color) !important;
      border-left-width: 0;
    }
  }

  &__header {
    padding: 1rem;
    border-bottom: 1px dotted #333;

    :root.dark & {
      border-color: #888;
    }
  }

  &__body {
    --background-color: #111;
    padding: min(5vmin, 3rem) min(15vmin, 7rem);
    background-color: var(--background-color);

    :root.dark & {
      --background-color: #AAA;
    }
  }

  &__footer {
    padding: 1rem;
    border-top: 1px dotted #333;
    text-align: right;

    :root.dark & {
      border-color: #888;
    }

    &__link {
      text-decoration: underline;
    }
  }
}

.status-code {
  --shadow-color: #FFF;
  margin: 0;
  padding: 0;
  color: var(--primary-color);
  font-size: clamp(4rem, 20vmin, 16rem);
  text-align: center;
  line-height: 1em;
  position: relative;
  animation: noise 2s step-end infinite;

  :root.dark & {
    --shadow-color: #000;
  }

  &__code {
    animation: shift 2s infinite;

    &:nth-child(2),
    &:nth-child(3) {
      text-shadow: var(--x) var(--y) 0 var(--c);
      user-select: none;
      position: absolute;
      inset: 0;
      animation: glitch 2s infinite;
      animation-direction: reverse;
    }

    &:nth-child(2) {
      clip-path: polygon(0 0, 100% 0, 100% 40%, 0 40%);
      -webkit-clip-path: polygon(0 0, 100% 0, 100% 40%, 0 40%);
    }

    &:nth-child(3) {
      clip-path: polygon(0 100%, 100% 100%, 100% 60%, 0 60%);
      -webkit-clip-path: polygon(0 100%, 100% 100%, 100% 60%, 0 60%);
      animation-delay: 250ms;
    }
  }
}

@keyframes noise {
  0% {
    --x: 0;
    --y: 3px;
    --c: var(--background-color);
  }

  10% {
    --x: 3px;
    --y: -2px;
  }

  20% {
    --x: 3px;
    --y: 2px;
  }

  30% {
    --x: -2px;
    --y: 0;
  }

  40% {
    --x: 3px;
    --y: 1px;
  }

  50% {
    --x: -3px;
    --y: -4px;
  }

  60% {
    --x: 1px;
    --y: -4px;
  }

  70% {
    --x: -4px;
    --y: -3px;
    --c: var(--background-color);
  }

  80% {
    --x: 2px;
    --y: -1px;
    --c: var(--shadow-color);
  }

  90% {
    --x: 4px;
    --y: -2px;
  }
}

@keyframes shift {
  2% {
    transform: translate(0.4rem, -0.2rem) skew(4deg);
  }

  4%,
  70% {
    transform: translate(0.1rem, 0) skew(0deg);
  }

  68% {
    transform: translate(0, 0) skew(0deg);
  }

  69% {
    transform: translate(-0.2rem, 0) skew(-2deg);
  }
}

@keyframes glitch {
  2% {
    transform: translate(0.8rem, -0.2rem) skew(16deg);
  }

  4%,
  70% {
    transform: translate(0.2rem, 0) skew(0deg);
  }

  68% {
    transform: translate(0, 0);
  }

  69% {
    transform: translate(-0.2rem, 0) skew(-8deg);
  }
}

.message {
  margin-top: 1rem;
  padding: 1rem 2rem;
  text-align: center;
  font-weight: bold;

  &__link {
    text-decoration: underline dotted var(--primary-color);
  }
}
</style>
