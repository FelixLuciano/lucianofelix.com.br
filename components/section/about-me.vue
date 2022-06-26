<template>
  <page-section id="about-me">
    <template #title>
      A student starting my career in computer engineering
    </template>

    <div class="grid md:grid-cols-2 gap-4">
      <img src="/assets/image/profile-photo.jpg" class="rounded-md" />

      <ContentDoc path="letters/about-me" class="prose" />
    </div>
  </page-section>
</template>
