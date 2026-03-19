<template>
  <div
    v-show="open"
    class="mobile-nav"
    role="dialog"
    aria-label="移动端导航菜单"
  >
    <nav aria-label="移动端主导航">
      <ul class="mobile-nav__list" role="list">
        <li
          v-for="item in items"
          :key="item.id"
          class="mobile-nav__item"
        >
          <a
            :href="item.target"
            :class="['mobile-nav__link', { 'is-active': activeId === item.id }]"
            @click="handleClick(item, $event)"
          >
            {{ item.label }}
          </a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'MobileNav',

  props: {
    items: {
      type: Array,
      default: () => []
    },
    open: {
      type: Boolean,
      default: false
    },
    activeId: {
      type: String,
      default: null
    }
  },

  methods: {
    handleClick(item, event) {
      this.$emit('navigate', item, event)
      this.$emit('close')
    }
  }
}
</script>

<style scoped>
.mobile-nav {
  position: absolute;
  top: var(--layout-nav-height);
  left: 0;
  right: 0;
  background-color: var(--color-bg-page);
  border-bottom: 1px solid var(--color-border);
  box-shadow: var(--shadow-md);
  z-index: 99;
}

.mobile-nav__list {
  display: flex;
  flex-direction: column;
  padding: var(--space-2) 0;
}

.mobile-nav__link {
  display: block;
  padding: var(--space-3) var(--space-6);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-medium);
  color: var(--color-text-secondary);
  text-decoration: none;
  transition: background-color var(--transition-fast), color var(--transition-fast);
}

.mobile-nav__link:hover,
.mobile-nav__link.is-active {
  background-color: var(--color-bg-section);
  color: var(--color-primary);
}

/* 仅在移动端显示 */
@media (min-width: 769px) {
  .mobile-nav {
    display: none !important;
  }
}
</style>
