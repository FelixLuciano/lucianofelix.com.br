<template>
  <Head>
    <Title>Luciano Felix</Title>
    <Link rel="icon" type="image/svg+xml" href="/favicon.svg" />
  </Head>

  <NuxtLayout>
    <NuxtPage/>
  </NuxtLayout>
</template>

<script lang="ts" setup>
import { useCssVar } from '@vueuse/core'

const COLORS = ['#922', '#A82', '#582', '#272', '#286', '#268', '#22B', '#529', '#A28']
const primaryColor = useCssVar('--primary-color')

primaryColor.value = COLORS[Math.floor(Math.random() * COLORS.length)]
</script>


<style>
:root {
  --background-color: #666;
  --primary-color: #922;
  --margin-size: clamp(.5rem, 4vmin, 3rem);
}

body {
  background-color: var(--background-color);
  font-family: "Open Sans", sans-serif;
}

#__nuxt {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

* {
  box-sizing: border-box;
}
::selection {
  background-color: var(--primary-color);
}

.bg-primary::selection {
  background-color: #000;
}
</style>
