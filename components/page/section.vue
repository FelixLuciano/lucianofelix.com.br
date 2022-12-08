<template>
  <section class="page-section" :id="`section__${id}`">
    <div class="divider" />

    <div v-if="$slots.top" class="slot slot--top">
      <slot name="top" />
    </div>

    <div class="wrap">
      <div class="slot slot--left">
        <div class="counter" />
      </div>

      <div class="container">
        <header class="header" :class="{'header--large': large}">
          <h2 class="header__title" :class="{'header__title--large': large}">
            <a :href="`#section__${id}`"><slot name="title" /></a>
          </h2>

          <slot name="header" v-if="$slots.header" />
        </header>

        <slot/>
      </div>

      <div class="slot slot--right"></div>
    </div>

    <div v-if="$slots.bottom" class="slot slot--bottom">
      <slot name="bottom" />
    </div>
  </section>
</template>

<script lang="ts" setup>
defineProps({
  id: {
    type: String,
    required: true
  },
  large: {
    type: Boolean,
    default: false
  }
})
</script>


<style lang="postcss" scoped>
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
}

.divider {
  width: 100%;
  max-width: 80rem;
  margin: 0 auto 1rem auto;
  border-top: 1px dotted #777;

  :root.dark & {
    border-color: #555;
  }
}

.slot {
  flex: 1 1 0;
  display: flex;

  &--top, &--bottom {
    flex: 1 0 100%;
  }
}

.wrap {
  display: flex;
  flex-wrap: nowrap;
}

.counter {
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

    &:not(:stuck) {
      color: red;
    }
  }
}

.container {
  flex: 1 1 auto;
  margin: 0 auto;
  width: 100%;
  max-width: 80rem;
}

.header {
  max-width: 40rem;
  padding-bottom: 1.5rem;
  font-size: 1.25rem;
  line-height: 1em;

  @media (max-width: 42rem) {
    padding-bottom: 1rem;
  }

  &--large {
    max-width: 60rem;
  }

  &__title {
    font-size: clamp(2.25rem, 5vw, 3rem);
    font-weight: 500;
    line-height: 1em;
    letter-spacing: -.15rem;
    padding-bottom:.5rem;

    :root.dark & {
      color: #FFF;
    }

    &--large {
      font-size: clamp(2.75rem, 6vw, 3.75rem);
    }
  }
}
</style>
