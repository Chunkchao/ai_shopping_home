<template>
  <section id="brand-story" class="brand-story-section" aria-label="品牌故事区">
    <div v-if="!data" class="brand-story-section__empty" role="status">
      <p>品牌故事内容加载中……</p>
    </div>

    <div v-else class="brand-story-section__inner">
      <div class="brand-story-section__text-col">
        <h2 class="brand-story-section__title">{{ data.title }}</h2>

        <p
          v-for="(para, idx) in data.paragraphs"
          :key="idx"
          class="brand-story-section__paragraph"
        >{{ para }}</p>

        <!-- 高亮短语 -->
        <ul v-if="data.highlightPhrases && data.highlightPhrases.length" class="brand-story-section__highlights" aria-label="品牌关键词">
          <li
            v-for="phrase in data.highlightPhrases"
            :key="phrase"
            class="brand-story-section__highlight-item"
          >
            <span class="brand-story-section__highlight-dot" aria-hidden="true"></span>
            {{ phrase }}
          </li>
        </ul>

        <a
          v-if="data.detailLink"
          :href="data.detailLink"
          class="brand-story-section__link"
          @click="handleLink"
        >
          了解更多
          <span aria-hidden="true">→</span>
        </a>
      </div>

      <!-- 品牌图像区 -->
      <div class="brand-story-section__deco" aria-hidden="true">
        <img
          v-if="data.imageUrl"
          :src="data.imageUrl"
          :alt="data.imageAlt || '品牌故事'"
          class="brand-story-section__deco-img"
        />
        <div v-else class="brand-story-section__deco-inner"></div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'BrandStorySection',

  props: {
    data: {
      type: Object,
      default: null
    }
  },

  methods: {
    handleLink(event) {
      const link = this.data && this.data.detailLink
      if (link && link.startsWith('#')) {
        event.preventDefault()
        const el = document.querySelector(link)
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }
  }
}
</script>

<style scoped>
.brand-story-section {
  padding: var(--layout-section-padding-y) 0;
  background-color: var(--color-bg-page);
}

.brand-story-section__inner {
  max-width: var(--layout-max-width);
  margin: 0 auto;
  padding: 0 var(--space-6);
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-16);
  align-items: center;
}

/* 文字栏 */
.brand-story-section__title {
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
  margin-bottom: var(--space-6);
}

.brand-story-section__paragraph {
  font-size: var(--font-size-base);
  color: var(--color-text-secondary);
  line-height: var(--line-height-loose);
  margin-bottom: var(--space-4);
}

/* 高亮短语 */
.brand-story-section__highlights {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-3);
  margin-top: var(--space-4);
  margin-bottom: var(--space-6);
}

.brand-story-section__highlight-item {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  color: var(--color-primary);
}

.brand-story-section__highlight-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: var(--color-primary);
  flex-shrink: 0;
}

.brand-story-section__link {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  color: var(--color-primary);
  text-decoration: none;
  padding: var(--space-2) var(--space-5);
  border: 1px solid var(--color-primary);
  border-radius: var(--radius-full);
  transition: background-color var(--transition-fast), color var(--transition-fast);
}

.brand-story-section__link:hover {
  background-color: var(--color-primary);
  color: var(--color-text-inverse);
}

/* 装饰区 */
.brand-story-section__deco {
  display: flex;
  justify-content: center;
  align-items: center;
}

.brand-story-section__deco-img {
  width: 100%;
  max-width: 480px;
  aspect-ratio: 4 / 5;
  object-fit: cover;
  object-position: center top;
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-lg);
}

.brand-story-section__deco-inner {
  width: 100%;
  max-width: 480px;
  aspect-ratio: 4 / 3;
  border-radius: var(--radius-xl);
  background: linear-gradient(135deg, var(--color-secondary) 0%, var(--color-accent) 60%, var(--color-primary-light) 100%);
  opacity: 0.6;
}

/* 空状态 */
.brand-story-section__empty {
  max-width: var(--layout-max-width);
  margin: 0 auto;
  padding: var(--space-12) var(--space-6);
  text-align: center;
  color: var(--color-text-muted);
}

/* 移动端 */
@media (max-width: 768px) {
  .brand-story-section__inner {
    grid-template-columns: 1fr;
    gap: var(--space-8);
  }

  .brand-story-section__deco {
    order: -1;
  }

  .brand-story-section__deco-inner {
    max-width: 100%;
    aspect-ratio: 16 / 7;
  }
}
</style>
