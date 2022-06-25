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

.gallery-grid {
  max-width: 100rem;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-auto-flow: dense;
  gap: .5rem;

  @media (min-width: 48rem) {
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
  }

  @media (min-width: 64rem) {
    grid-template-columns: repeat(4, 1fr);
  }

  @media (min-width: 80rem) {
    grid-template-columns: repeat(5, 1fr);
  }

  &__item {
    width: 100%;
    height: 100%;
    object-fit: cover;

    &--feature {
      grid-area: 2 span / 2 span;
    }
  }
}
</style>
