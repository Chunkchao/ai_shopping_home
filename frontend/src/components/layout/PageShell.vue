<template>
  <div class="page-shell">
    <header class="page-shell__header" role="banner">
      <slot name="header" />
    </header>

    <main class="page-shell__main" id="main-content" role="main">
      <slot name="main" />
    </main>

    <footer class="page-shell__footer" role="contentinfo">
      <slot name="footer" />
    </footer>
  </div>
</template>

<script>
export default {
  name: 'PageShell'
}
</script>

<style scoped>
.page-shell {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.page-shell__header {
  position: sticky;
  top: 0;
  z-index: 100;
  height: var(--layout-nav-height);
  background-color: var(--color-bg-page);
  border-bottom: 1px solid var(--color-border-light);
}

.page-shell__main {
  flex: 1;
}

.page-shell__footer {
  background-color: var(--color-bg-dark);
  color: var(--color-text-inverse);
}
</style>
