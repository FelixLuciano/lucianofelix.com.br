<template>
  <page-section id="photography">

    <template #title>
      Photography
    </template>

    <div class="pb-8 grid md:grid-cols-2 gap-8">
      <div />

      <ContentDoc path="/letters/photography" :head="false"
        class="prose prose-neutral dark:prose-invert text-lg md:text-2xl" />
    </div>

    <template #bottom>
      <card-grid>

        <ContentQuery path="data/photography-posts" :only="['posts']" find="one" #="{ data }">
          <ContentRenderer :value="data" #="{ value: { posts } }">

            <template v-for="post in posts" :key="post.photo">
              <card-photo :src="post.photo" :thumbnail="post.thumbnail" :alt="post.alt" :orientation="post.orientation"
                :feature="post.feature" />
            </template>

          </ContentRenderer>
        </ContentQuery>

      </card-grid>
    </template>

  </page-section>
</template>
