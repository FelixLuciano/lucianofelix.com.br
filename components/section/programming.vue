<template>
  <page-section id="programming">
    <template #title>
      Programming
    </template>

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
