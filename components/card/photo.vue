<template>
  <img
    :src="thumbnail"
    :data-zoom-src="zoomSrc"
    :alt="alt"
    tabindex="0"
    ref="img_node"
    class="card-photo"
    @keypress.enter="zoom.open()"
    :class="{
      'card-photo--wide': orientation === 'wide',
      'card-photo--portrait': orientation === 'portrait',
      'card-photo--feature': feature
    }"
  />
</template>


<script lang="ts" setup>
import mediumZoom from 'medium-zoom'

const props = defineProps({
  src: {
    type: String
  },
  thumbnail: {
    type: String,
    required: true
  },
  alt: {
    type: String,
    required: true
  },
  orientation: {
    type: String,
    default: 'landscape'
  },
  feature: {
    type: Boolean,
    default: false
  }
})

const img_node = ref(null)
const zoom = ref(null)

onMounted(() => {
  zoom.value = mediumZoom(img_node.value, {
    background: 'var(--background-color)'
  })
})
</script>


<style lang="postcss" scoped>
.card-photo {
  width: 100%;
  height: 100%;
  object-fit: cover;
  aspect-ratio: 3 / 2;
  outline-offset: .4rem;

  &--feature {
    grid-area: 2 span / 2 span;
  }

  &--portrait {
    grid-area: 2 span / 1 span;
    aspect-ratio: 2 / 3;

    &.card-photo--feature {
      grid-area: 2 span / 1 span;
    }
  }

  &--wide {
    grid-area: 1 span / 2 span;
    aspect-ratio: 3 / 1;
  }
}
</style>
