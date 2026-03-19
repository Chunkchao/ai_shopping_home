<template>
  <header class="site-header" role="banner">
    <div class="site-header__inner">
      <!-- Logo -->
      <a class="site-header__logo" href="#" aria-label="返回首页">
        <span class="site-header__logo-text">{{ logoText }}</span>
      </a>

      <!-- 桌面导航 -->
      <nav class="site-header__nav" aria-label="主导航">
        <ul class="site-header__nav-list" role="list">
          <li
            v-for="item in navItems"
            :key="item.id"
            class="site-header__nav-item"
          >
            <a
              :href="item.target"
              :class="['site-header__nav-link', { 'is-active': activeId === item.id }]"
              @click="handleNavClick(item, $event)"
            >
              {{ item.label }}
            </a>
          </li>
        </ul>
      </nav>

      <!-- 移动端汉堡按钮 -->
      <button
        class="site-header__toggle"
        type="button"
        :aria-expanded="mobileOpen.toString()"
        aria-label="展开或折叠导航菜单"
        @click="mobileOpen = !mobileOpen"
      >
        <span class="site-header__toggle-bar"></span>
        <span class="site-header__toggle-bar"></span>
        <span class="site-header__toggle-bar"></span>
      </button>
    </div>

    <!-- 移动端下拉导航 -->
    <MobileNav
      :items="navItems"
      :active-id="activeId"
      :open="mobileOpen"
      @close="mobileOpen = false"
      @navigate="handleNavClick"
    />
  </header>
</template>

<script>
import MobileNav from './MobileNav.vue'
import { initScrollSpy, destroyScrollSpy } from '@/utils/scrollSpy.js'

export default {
  name: 'SiteHeader',

  components: { MobileNav },

  props: {
    navItems: {
      type: Array,
      default: () => []
    },
    logoText: {
      type: String,
      default: ''
    }
  },

  data() {
    return {
      mobileOpen: false,
      activeId: null
    }
  },

  mounted() {
    this._destroySpy = initScrollSpy(this.navItems, id => {
      this.activeId = id
    })
  },

  beforeDestroy() {
    if (typeof this._destroySpy === 'function') {
      this._destroySpy()
    }
  },

  methods: {
    handleNavClick(item, event) {
      if (item.targetType === 'anchor') {
        event && event.preventDefault()
        const el = document.querySelector(item.target)
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
        this.activeId = item.id
      }
      this.mobileOpen = false
    }
  }
}
</script>

<style scoped>
.site-header {
  background-color: var(--color-bg-page);
  height: var(--layout-nav-height);
  position: relative;
}

.site-header__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  max-width: var(--layout-max-width);
  margin: 0 auto;
  padding: 0 var(--space-6);
}

/* Logo */
.site-header__logo {
  display: flex;
  align-items: center;
  text-decoration: none;
}

.site-header__logo-text {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-bold);
  color: var(--color-primary-dark);
  letter-spacing: 0.05em;
  white-space: nowrap;
}

/* 桌面导航 */
.site-header__nav {
  display: flex;
  align-items: center;
}

.site-header__nav-list {
  display: flex;
  align-items: center;
  gap: var(--space-6);
}

.site-header__nav-link {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  color: var(--color-text-secondary);
  text-decoration: none;
  padding: var(--space-1) 0;
  border-bottom: 2px solid transparent;
  transition: color var(--transition-fast), border-color var(--transition-fast);
  white-space: nowrap;
}

.site-header__nav-link:hover,
.site-header__nav-link.is-active {
  color: var(--color-primary);
  border-bottom-color: var(--color-primary);
}

/* 汉堡按钮 */
.site-header__toggle {
  display: none;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  width: 32px;
  height: 32px;
  padding: 4px;
  background: none;
  border: none;
  cursor: pointer;
}

.site-header__toggle-bar {
  display: block;
  width: 100%;
  height: 2px;
  background-color: var(--color-text-primary);
  border-radius: 2px;
  transition: opacity var(--transition-fast);
}

/* 移动端 */
@media (max-width: 768px) {
  .site-header__nav {
    display: none;
  }

  .site-header__toggle {
    display: flex;
  }
}
</style>
