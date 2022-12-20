<template>
  <page-section id="networks">

    <template #title>
      Connect with me
    </template>

    <ul class="network-list">

      <ContentQuery path="data/networks" :only="['networks']" find="one" #="{ data }">
        <ContentRenderer :value="data" #="{ value: { networks } }">

          <li v-for="network in networks" :key="network.name" class="network-list__item">
            <div class="network-list__item__title">{{ network.name }}</div>
            <a :href="network.url" target="_blank" rel="noopener noreferer" class="network-list__link">{{
                network.username
            }}</a>
          </li>

        </ContentRenderer>
      </ContentQuery>

      <li class="network-list__item">
        <div class="network-list__item__title">email</div>
        <a href="#contact" class="network-list__link">Get in Touch</a>
      </li>
    </ul>

  </page-section>
</template>

<style lang="postcss" scoped>
.network-list {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;

  &__item {
    flex: 0 1 10rem;
    list-style-type: square;

    &::marker {
      color: var(--primary-color);
    }

    &__title {
      font-size: .85rem;
      font-weight: 600;
      line-height: 1em;
    }
  }

  &__link {
    padding: .5rem 0;
    border-bottom: 1px dotted #000;
    font-weight: 500;
    display: block;

    :root.dark & {
      border-bottom-color: #666;
    }

    &:hover {
      color: var(--primary-color);
      border-bottom: 1px solid var(--primary-color);
    }
  }
}
</style>
