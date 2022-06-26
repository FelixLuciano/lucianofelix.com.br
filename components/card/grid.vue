<template>
  <div class="card-grid">
    <slot />
  </div>
</template>


<style lang="postcss" scoped>
.card-grid {
  max-width: 100rem;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-auto-flow: dense;
  gap: .5rem;
  place-items: center;

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
}
</style>
