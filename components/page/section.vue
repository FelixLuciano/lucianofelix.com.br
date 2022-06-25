<template>
  <section class="page-section" :id="`section__${id}`">
    <div class="page-section__divider" />

    <div v-if="$slots.top" class="page-section__slot page-section__slot--top">
      <slot name="top" />
    </div>

    <div class="page-section__wrap">
      <div class="page-section__slot page-section__slot--left">
        <div class="page-section__counter" />
      </div>

      <div class="page-section__container">
        <header class="page-section__header">
          <h2 class="page-section__header__title">
            <a :href="`#section__${id}`"><slot name="title" /></a>
          </h2>

          <slot name="header" v-if="$slots.header" />
        </header>

        <slot/>
      </div>

      <div class="page-section__slot page-section__slot--right"></div>
    </div>

    <div v-if="$slots.bottom" class="page-section__slot page-section__slot--bottom">
      <slot name="bottom" />
    </div>
  </section>
</template>

<script lang="ts" setup>
defineProps({
  id: {
    type: String,
    required: true
  }
})
</script>


<style lang="postcss">
.page-section {
  width: 100%;
  max-width: 160rem;
  margin: 0 auto;
  padding: 1rem 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  counter-increment: uni;

  &:first-of-type {
    counter-set: dec 0;
  }
  &:nth-of-type(10n) {
    counter-increment: dec uni;
    counter-set: uni 0;
  }

  &__divider {
    width: 100%;
    max-width: 80rem;
    margin: 0 auto 1rem auto;
    border-top: 1px dotted #777;
  }

  &__slot {
    flex: 1 1 0;
    display: flex;

    &--top, &--bottom {
      flex: 1 0 100%;
    }
  }

  &__wrap {
    display: flex;
    flex-wrap: nowrap;
  }

  &__counter {
    width: 100%;
    padding-top: .75rem;
    padding-right: calc(var(--margin-size) / 2);
    color: #666;
    font-size: 1rem;
    font-family: monospace;
    line-height: 1em;
    text-align: right;

    &:before {
      content: counter(dec) counter(uni) "/";
      position: sticky;
      top: 1rem;
    }
  }

  &__container {
    flex: 1 1 auto;
    margin: 0 auto;
    width: 100%;
    max-width: 80rem;
  }

  &__header {
    max-width: 40rem;
    padding-bottom: 1.5rem;
    font-size: 1.25rem;
    line-height: 1em;

    &__title {
      font-size: 3rem;
      font-weight: 500;
      line-height: 1em;
      letter-spacing: -.15rem;
      padding-bottom:.5rem;
    }
  }
}
</style>
