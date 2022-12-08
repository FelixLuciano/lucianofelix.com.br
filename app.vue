<template>
  <Html lang="en">
    <Head>
      <Title>Luciano Felix</Title>
      <Link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      <link rel="preconnect" href="https://fonts.googleapis.com">
      <Link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300..800&display=swap" rel="stylesheet" />
    </Head>

    <Body>
      <NuxtLayout>
        <NuxtPage/>
      </NuxtLayout>
    </Body>
  </Html>
</template>


<style lang="postcss">
:root {
  --background-color: #FFF;
  --primary-color: #922;
  --margin-size: clamp(.5rem, 4vmin, 3rem);

  &.dark {
    --background-color: #111;
    color: #DDD;
  }
}

html {
  scroll-behavior: smooth;
}

body {
  background-color: var(--background-color);
  font-family: "Open Sans", sans-serif;
}

#__nuxt {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

::selection {
  background-color: var(--primary-color);
  color: #000;
} 

</style>
