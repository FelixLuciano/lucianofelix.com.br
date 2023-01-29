<template>
  <a :href="url" target="_blank" rel="norefer noopener" class="card-post" :class="{ 'card-post--feature': feature }">
    <img :src="thumbnail" alt="Post thumbnail" class="thumbnail" />
  </a>
</template>


<script lang="ts" setup>
defineProps({
  thumbnail: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  feature: {
    type: Boolean,
    default: false
  }
})

</script>


<style lang="postcss" scoped>
.card-post {
  width: 100%;
  height: 100%;
  position: relative;
  outline-offset: .4rem;

  &--feature {
    grid-area: 2 span / 2 span;
  }
}

.thumbnail {
  width: 100%;
  height: 100%;
  aspect-ratio: 3 / 2;
  object-fit: cover;
}
</style>
