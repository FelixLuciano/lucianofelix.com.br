<template>
  <page-section id="photography">
    <template #title>
      Photography
    </template>

    Click to magnify.

    <template #bottom>
      <div class="gallery-grid">
        <img src="assets/image/photo-thumb.webp" v-for="i in 9" :key="i" :class="{'gallery-grid__item--feature': i % 5 === 1}" class="gallery-grid__item" />
      </div>
    </template>
  </page-section>
</template>
