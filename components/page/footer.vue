<template>
  <footer class="page-footer">
    <div class="container">

      <div class="copyright-section">
        &copy; 2022 Luciano Felix. All rights reserved.
      </div>
    </div>
  </footer>
</template>

<style lang="postcss" scoped>
.page-footer {
  width: 100%;
  max-width: 160rem;
  margin: calc(3 * var(--margin-size)) auto 0 auto;
  padding: 0 var(--margin-size);
}

.container {
  margin: 0 auto;
  padding-bottom: 8rem;
  width: 100%;
  max-width: 80rem;
}

.copyright-section {
  color: #444;
  font-size: .9rem;
  font-weight: 550;

  @media (prefers-color-scheme: dark) {
    color: #AAA;
  }
}
</style>
