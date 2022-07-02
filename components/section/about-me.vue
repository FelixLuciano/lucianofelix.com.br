<template>
  <page-section id="about-me" :large="true">
    <template #title>
      A student starting my career in computer engineering
    </template>

    <div class="grid md:grid-cols-2 gap-8">
      <img src="/assets/image/profile-photo.jpg" class="rounded-md" />

      <ContentDoc path="letters/about-me" class="prose prose-neutral dark:prose-invert" />
    </div>
  </page-section>
</template>
