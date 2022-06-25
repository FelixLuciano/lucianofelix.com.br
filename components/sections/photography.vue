<template>
  <page-section id="photography">
    <template #title>
      Photography
    </template>

    Click to magnify.

    <template #bottom>
      <card-grid>

        <ContentQuery path="/data/photography-posts" :only="['posts']" find="one" #="{ data }">
          <ContentRenderer :value="data" #="{ value:{ posts } }">

            <template v-for="post in posts" :key="post.photo">
              <card-photo
                :src="post.thumb"
                :zoom-src="post.photo"
                :alt="post.alt"
                :feature="post.feature"
              />
            </template>

          </ContentRenderer>
        </ContentQuery>

      </card-grid>
    </template>
  </page-section>
</template>
