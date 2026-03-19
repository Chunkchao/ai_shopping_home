<template>
  <section id="categories" class="categories-section" aria-label="品类浏览区">
    <div class="categories-section__inner">
      <h2 class="categories-section__title">探索系列</h2>
      <p class="categories-section__subtitle">精选羊绒品类，温暖每一个季节</p>

      <!-- 空状态 -->
      <div v-if="!items || items.length === 0" class="categories-section__empty" role="status">
        <p>暂无品类信息，敬请期待。</p>
      </div>

      <!-- 品类网格 -->
      <div v-else class="categories-section__grid">
        <CategoryCard
          v-for="item in items"
          :key="item.id"
          :item="item"
        />
      </div>
    </div>
  </section>
</template>

<script>
import CategoryCard from './CategoryCard.vue'

export default {
  name: 'CategoriesSection',

  components: { CategoryCard },

  props: {
    items: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style scoped>
.categories-section {
  padding: var(--layout-section-padding-y) 0;
  background-color: var(--color-bg-section);
}

.categories-section__inner {
  max-width: var(--layout-max-width);
  margin: 0 auto;
  padding: 0 var(--space-6);
}

.categories-section__title {
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
  text-align: center;
  margin-bottom: var(--space-3);
}

.categories-section__subtitle {
  font-size: var(--font-size-base);
  color: var(--color-text-secondary);
  text-align: center;
  margin-bottom: var(--space-12);
}

/* 品类网格 */
.categories-section__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: var(--space-6);
}

/* 空状态 */
.categories-section__empty {
  text-align: center;
  padding: var(--space-16) 0;
  color: var(--color-text-muted);
  font-size: var(--font-size-base);
}

/* 移动端 */
@media (max-width: 600px) {
  .categories-section__grid {
    grid-template-columns: 1fr;
  }
}
</style>
