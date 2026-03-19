<template>
  <footer class="site-footer" role="contentinfo" aria-label="页脚">
    <div class="site-footer__inner">
      <p class="site-footer__copyright">
        {{ copyright }}
      </p>
      <p v-if="recordNumber" class="site-footer__record">
        {{ recordNumber }}
      </p>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'SiteFooter',
  props: {
    contact: {
      type: Object,
      default: null
    }
  },
  computed: {
    copyright() {
      return this.contact && this.contact.copyright
        ? this.contact.copyright
        : `© ${new Date().getFullYear()} 绒芸优选 版权所有`
    },
    recordNumber() {
      return this.contact ? this.contact.recordNumber : null
    }
  }
}
</script>

<style scoped>
.site-footer {
  background-color: var(--color-footer-bg, #2a2118);
  color: var(--color-footer-text, rgba(255, 255, 255, 0.6));
  text-align: center;
  padding: var(--space-6, 1.5rem) var(--space-4, 1rem);
}

.site-footer__inner {
  max-width: var(--layout-max-width, 1200px);
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: var(--space-1, 0.25rem);
}

.site-footer__copyright,
.site-footer__record {
  margin: 0;
  font-size: 0.85rem;
  line-height: 1.6;
}

.site-footer__record {
  opacity: 0.7;
}
</style>
