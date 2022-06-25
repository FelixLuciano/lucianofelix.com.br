<template>
  <page-header />

  <main class="main__container">
    <sections-networks />
    <sections-about-me />
    <sections-graduation />
    <sections-programming />
    <sections-photography />
    <sections-contact />
  </main>
</template>


<style lang="postcss">
.main__container {
  padding: 0 var(--margin-size);
  padding-bottom: 20vw;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: calc(1.5 * var(--margin-size));
  counter-reset: dec uni;
}
</style>
