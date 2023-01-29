<template>
  <page-section id="graduation">

    <template #title>
      Graduation
    </template>

    <div class="pb-8 grid md:grid-cols-2 gap-8">
      <div />

      <ContentDoc path="/letters/graduation" :head="false" class="prose prose-neutral dark:prose-invert" />
    </div>

    <ul class="projects-list">

      <ContentQuery path="data/graduation" :only="['projects']" find="one" #="{ data }">
        <ContentRenderer :value="data" #="{ value: { projects } }">

          <li v-for="post in projects" :key="post.url" class="projects-list__item">
            <a :href="post.url" target="_blank" rel="noopener noreferer" class="projects-list__link">{{ post.title
            }}</a>
          </li>

        </ContentRenderer>
      </ContentQuery>

    </ul>

    <template #bottom>
      <card-grid>

        <ContentQuery path="data/graduation" :only="['photos']" find="one" #="{ data }">
          <ContentRenderer :value="data" #="{ value: { photos } }">

            <template v-for="post in photos" :key="post.photo">
              <card-photo :src="post.photo" :thumbnail="post.thumbnail" :alt="post.alt" :orientation="post.orientation"
                :feature="post.feature" />
            </template>

          </ContentRenderer>
        </ContentQuery>

      </card-grid>
    </template>

  </page-section>
</template>

<style lang="postcss" scoped>
.projects-list {
  margin-bottom: 2rem;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem 3rem;

  @media (max-width: 70rem) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 60rem) {
    grid-template-columns: repeat(1, 1fr);
  }

  &__item {
    list-style-type: square;

    &::marker {
      color: var(--primary-color);
    }
  }

  &__link {
    border-bottom: 1px dotted #000;
    font-size: 1.2rem;
    font-weight: 500;
    line-height: 2.5em;
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
