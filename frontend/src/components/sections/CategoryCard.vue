<template>
  <article class="category-card">
    <!-- 图片区 -->
    <div class="category-card__image-wrap">
      <img
        :src="item.imageUrl"
        :alt="item.imageAlt"
        class="category-card__image"
        loading="lazy"
      />
      <span v-if="item.badge" class="category-card__badge" aria-label="标签">{{ item.badge }}</span>
    </div>

    <!-- 文字内容 -->
    <div class="category-card__body">
      <h3 class="category-card__name">{{ item.name }}</h3>
      <p class="category-card__summary">{{ item.summary }}</p>
      <a
        :href="item.actionTarget"
        class="category-card__action"
        :aria-label="`${item.actionLabel} — ${item.name}`"
        @click="handleAction"
      >
        {{ item.actionLabel }}
        <span class="category-card__arrow" aria-hidden="true">→</span>
      </a>
    </div>
  </article>
</template>

<script>
export default {
  name: 'CategoryCard',

  props: {
    item: {
      type: Object,
      required: true
    }
  },

  methods: {
    handleAction(event) {
      const target = this.item.actionTarget
      if (target && target.startsWith('#')) {
        event.preventDefault()
        const el = document.querySelector(target)
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      }
    }
  }
}
</script>

<style scoped>
.category-card {
  background-color: var(--color-bg-card);
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-sm);
  transition: transform var(--transition-base), box-shadow var(--transition-base);
  display: flex;
  flex-direction: column;
}

.category-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
}

/* 图片区 */
.category-card__image-wrap {
  position: relative;
  overflow: hidden;
  aspect-ratio: 3 / 2;
  background-color: var(--color-bg-section);
}

.category-card__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform var(--transition-slow);
}

.category-card:hover .category-card__image {
  transform: scale(1.04);
}

/* 徽标 */
.category-card__badge {
  position: absolute;
  top: var(--space-3);
  left: var(--space-3);
  background-color: var(--color-primary);
  color: var(--color-text-inverse);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-semibold);
  padding: var(--space-1) var(--space-2);
  border-radius: var(--radius-sm);
  letter-spacing: 0.05em;
}

/* 文字区 */
.category-card__body {
  padding: var(--space-5) var(--space-5) var(--space-5);
  display: flex;
  flex-direction: column;
  flex: 1;
}

.category-card__name {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  margin-bottom: var(--space-2);
}

.category-card__summary {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  line-height: var(--line-height-loose);
  flex: 1;
  margin-bottom: var(--space-4);
}

/* 行动按钮 */
.category-card__action {
  display: inline-flex;
  align-items: center;
  gap: var(--space-1);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  color: var(--color-primary);
  text-decoration: none;
  transition: gap var(--transition-fast), color var(--transition-fast);
  align-self: flex-start;
}

.category-card__action:hover {
  color: var(--color-primary-dark);
  gap: var(--space-2);
}

.category-card__action:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
  border-radius: var(--radius-sm);
}
</style>
