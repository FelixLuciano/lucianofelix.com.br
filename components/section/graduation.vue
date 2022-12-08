<template>
  <page-section id="graduation">
    <template #title>
      Graduation
    </template>

    <div class="pb-8 grid md:grid-cols-2 gap-8">
      <div />

      <ContentDoc path="/letters/graduation" class="prose prose-neutral dark:prose-invert" />
    </div>

    <ul class="projects-list">
      <ContentQuery path="data/graduation" :only="['projects']" find="one" #="{ data }">
        <ContentRenderer :value="data" #="{ value:{ projects } }">
          <li v-for="post in projects" :key="post.url" class="projects-list__item">
            <a :href="post.url" target="_blank" rel="noopener noreferer" class="projects-list__link">{{ post.title }}</a>
          </li>
        </ContentRenderer>
      </ContentQuery>
    </ul>

    <template #bottom>
      <card-grid>

        <ContentQuery path="data/graduation" :only="['photos']" find="one" #="{ data }">
          <ContentRenderer :value="data" #="{ value:{ photos } }">

            <template v-for="post in photos" :key="post.photo">
              <card-photo
                :src="post.photo"
                :thumbnail="post.thumbnail"
                :alt="post.alt"
                :orientation="post.orientation"
                :feature="post.feature"
              />
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
  display: flex;
  /* flex-direction: column; */
  flex-wrap: wrap;
  /* gap: 1rem; */

  &__item {
    flex: 1 1 33%;
    list-style-type: square;

    @media (max-width: 80rem) {
      flex-basis: 50%;
    }
    @media (max-width: 50rem) {
      flex-basis: 100%;
    }

    &::marker {
      color: var(--primary-color);
    }
  }

  &__link {
    padding: 1rem 0;
    border-bottom: 1px dotted #000;
    font-size: 1.2rem;
    font-weight: 500;
    line-height: 1em;
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
