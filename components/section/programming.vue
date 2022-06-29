<template>
  <page-section id="programming">
    <template #title>
      Programming
    </template>

    <div class="pb-8 grid md:grid-cols-2 gap-4">
      <div />

      <div class="prose">
        <p>
          Nonumy facilisis kasd et sanctus sea sea elitr ipsum lorem clita gubergren no et dolores. Id commodo et justo invidunt iriure magna et nam elitr aliquyam est. Et dolor aliquyam molestie nobis lobortis. Vulputate eos invidunt. No amet nobis ea lorem ut no exerci consetetur amet eos sea. Odio et wisi volutpat sit dolor ad diam tempor elitr minim vulputate consectetuer eos takimata elit amet. Et clita sadipscing no dolore sed kasd.
        </p>
      </div>
    </div>

    <template #bottom>
      <card-grid>

        <ContentQuery path="data/programming-posts" :only="['posts']" find="one" #="{ data }">
          <ContentRenderer :value="data" #="{ value:{ posts } }">

            <template v-for="post in posts" :key="post.photo">
              <card-post
                :thumbnail="post.thumbnail"
                :feature="post.feature"
                :url="post.url"
              />
            </template>

          </ContentRenderer>
        </ContentQuery>

      </card-grid>
    </template>
  </page-section>
</template>
