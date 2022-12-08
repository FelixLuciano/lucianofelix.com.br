<template>
  <Head>
    <Title>Luciano Felix</Title>
  </Head>

  <page-header />

  <main class="main__container">
    <section-networks />
    <section-about-me />
    <section-graduation />
    <section-programming />
    <section-photography />
    <section-contact />
  </main>

  <page-footer />
</template>


<style lang="postcss">
.main__container {
  padding: 0 var(--margin-size);
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: calc(1.5 * var(--margin-size));
  counter-reset: dec uni;
}
</style>
