<template>
  <page-header />

  <main class="main__container">
    <page-section id="about-me">
      <template #title>
        A student starting my career in computer engineering
      </template>

      <div class="photo-text-section">
        <img src="assets/image/profile-photo.webp"/>

        <ContentDoc path="/letters/about-me" class="prose" />
      </div>
    </page-section>

    <page-section id="graduation">
      <template #title>
        Graduation 🎓
      </template>

      <div class="photo-text-section">
        <div />

        <ContentDoc path="/letters/graduation" class="prose" />
      </div>
    </page-section>

    <page-section id="programming">
      <template #title>
        Programming 💻
      </template>

      <template #bottom>
        <div class="gallery-grid">
          <img src="assets/image/code-thumb.webp" v-for="i in 9" :key="i" :class="{'gallery-grid__item--feature': i % 5 === 1}" class="gallery-grid__item" />
        </div>
      </template>
    </page-section>

    <page-section id="photography">
      <template #title>
        Photography 📸
      </template>

      <template #bottom>
        <div class="gallery-grid">
          <img src="assets/image/photo-thumb.webp" v-for="i in 9" :key="i" :class="{'gallery-grid__item--feature': i % 5 === 1}" class="gallery-grid__item" />
        </div>
      </template>
    </page-section>

    <page-section id="photography">
      <template #title>
        Get in touch 📫
      </template>

      <template #header>
        Send me a message
      </template>

      <div class="photo-text-section">
        <div />

        <form-frame url="#">
          <template #="{ body, disabled }">
            <form-text-input
              name="contact"
              :required="true"
              :disabled="disabled"
              v-model="body.contact"
            >
              <template #label>Contact</template>
            </form-text-input>

            <form-textarea-input
              name="message"
              :required="true"
              :disabled="disabled"
              v-model="body.message"
            >
              <template #label>Message</template>
            </form-textarea-input>
          </template>
        </form-frame>
      </div>
    </page-section>
  </main>
</template>

<script lang="ts" setup>
function log(a, b, c) {
  console.log(a, b, c)
}
</script>


<style lang="postcss">
.main__container {
  padding: 0 var(--margin-size);
  padding-bottom: 20vw;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: calc(1.5 * var(--margin-size));
  counter-reset: dec uni;
}

.photo-text-section {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;

  @media (max-width: 64rem) {
    grid-template-columns: 1fr;
  }
}

.gallery-grid {
  max-width: 100rem;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-auto-flow: dense;
  gap: .5rem;

  @media (min-width: 48rem) {
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
  }

  @media (min-width: 64rem) {
    grid-template-columns: repeat(4, 1fr);
  }

  @media (min-width: 80rem) {
    grid-template-columns: repeat(5, 1fr);
  }

  &__item {
    width: 100%;
    height: 100%;
    object-fit: cover;

    &--feature {
      grid-area: 2 span / 2 span;
    }
  }
}
</style>
