<template>
  <page-section id="photography">
    <template #title>
      Photography
    </template>

    <div class="pb-8 grid md:grid-cols-2 gap-8">
      <div />

      <div class="prose dark:prose-invert text-lg md:text-2xl">
        <p>
          Ea ipsum ut. Dolores rebum magna eirmod dolor soluta dolor accusam dolor minim dolor kasd nisl justo esse et ex. Adipiscing at dignissim nisl at et magna est zzril nonumy suscipit autem sea adipiscing.
        </p>
        <p>
          Click to magnify
        </p>
      </div>
    </div>

    <template #bottom>
      <card-grid>

        <ContentQuery path="data/photography-posts" :only="['posts']" find="one" #="{ data }">
          <ContentRenderer :value="data" #="{ value:{ posts } }">

            <template v-for="post in posts" :key="post.photo">
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
