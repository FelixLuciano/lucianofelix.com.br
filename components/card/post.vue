<template>
  <a
    :href="url"
    target="_blank"
    rel="norefer noopener"
    class="card-post"
    :class="{'card-post--feature': feature}"
  >
    <img
      :src="thumb"
      alt="Post thumbnail"
    />
  </a>  
</template>


<script lang="ts" setup>
const props = defineProps({
  thumb: {
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
  object-fit: cover;

  &--feature {
    grid-area: 2 span / 2 span;
  }
}
</style>
