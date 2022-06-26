<template>
  <img
    :src="src"
    :data-zoom-src="zoomSrc"
    :alt="alt"
    ref="img_node"
    class="card-photo"
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
    type: String,
    required: true
  },
  zoomSrc: {
    type: String
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


onMounted(() => {
  mediumZoom(img_node.value, {
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
