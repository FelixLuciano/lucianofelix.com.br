<template>
  <page-section id="programming">

    <template #title>
      Programming
    </template>

    <div class="pb-8 grid md:grid-cols-2 gap-8">
      <div />

      <ContentDoc path="/letters/programming" :head="false"
        class="prose prose-neutral dark:prose-invert text-lg md:text-2xl" />
    </div>

    <template #bottom>
      <card-grid>

        <ContentQuery path="data/programming-posts" :only="['posts']" find="one" #="{ data }">
          <ContentRenderer :value="data" #="{ value: { posts } }">

            <template v-for="post in posts" :key="post.photo">
              <card-post :thumbnail="post.thumbnail" :feature="post.feature" :url="post.url" />
            </template>

          </ContentRenderer>
        </ContentQuery>

      </card-grid>
    </template>

  </page-section>
</template>
