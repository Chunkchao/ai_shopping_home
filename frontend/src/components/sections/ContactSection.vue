<template>
  <section id="contact" class="contact-section" aria-labelledby="contact-title">
    <div class="section-inner contact-section__inner">
      <h2 id="contact-title" class="section-title">联系我们</h2>

      <!-- 错误/空态降级 -->
      <div v-if="!data" class="contact-section__empty">
        <p class="state-text">暂无联系信息</p>
      </div>

      <div v-else class="contact-section__body">
        <!-- 联系信息卡片 -->
        <div class="contact-section__info">
          <h3 class="contact-section__company">{{ data.companyName }}</h3>

          <ul class="contact-section__list" aria-label="联系方式">
            <li v-if="data.phone" class="contact-section__item">
              <span class="contact-section__icon" aria-hidden="true">📞</span>
              <span class="contact-section__label">客服热线：</span>
              <a :href="`tel:${data.phone}`" class="contact-section__link">{{ data.phone }}</a>
            </li>
            <li v-if="data.serviceHours" class="contact-section__item">
              <span class="contact-section__icon" aria-hidden="true">🕐</span>
              <span class="contact-section__label">服务时间：</span>
              <span>{{ data.serviceHours }}</span>
            </li>
            <li v-if="data.email" class="contact-section__item">
              <span class="contact-section__icon" aria-hidden="true">✉️</span>
              <span class="contact-section__label">电子邮箱：</span>
              <a :href="`mailto:${data.email}`" class="contact-section__link">{{ data.email }}</a>
            </li>
          </ul>
        </div>

        <!-- 社交媒体 -->
        <div v-if="data.socialLinks && data.socialLinks.length" class="contact-section__social">
          <h3 class="contact-section__social-title">关注我们</h3>
          <ul class="contact-section__social-list" aria-label="社交媒体">
            <li
              v-for="link in data.socialLinks"
              :key="link.type"
              class="contact-section__social-item"
            >
              <a
                :href="link.url"
                :aria-label="link.label"
                class="contact-section__social-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span class="contact-section__social-type" :data-type="link.type">
                  {{ link.label }}
                </span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'ContactSection',
  props: {
    data: {
      type: Object,
      default: null
    }
  }
}
</script>

<style scoped>
.contact-section {
  background-color: var(--color-surface-alt, #f8f5f1);
  padding: var(--space-16, 4rem) var(--space-4, 1rem);
}

.contact-section__inner {
  max-width: var(--layout-max-width, 1200px);
  margin: 0 auto;
}

.contact-section__empty {
  text-align: center;
  padding: var(--space-8, 2rem) 0;
  color: var(--color-text-muted, #888);
}

.contact-section__body {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-10, 2.5rem);
  margin-top: var(--space-8, 2rem);
}

.contact-section__company {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--color-primary, #8b6f47);
  margin-bottom: var(--space-4, 1rem);
}

.contact-section__list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: var(--space-4, 1rem);
}

.contact-section__item {
  display: flex;
  align-items: center;
  gap: var(--space-2, 0.5rem);
  font-size: 0.95rem;
  color: var(--color-text, #333);
  line-height: 1.6;
}

.contact-section__icon {
  width: 1.4em;
  flex-shrink: 0;
}

.contact-section__label {
  color: var(--color-text-muted, #888);
  flex-shrink: 0;
}

.contact-section__link {
  color: var(--color-primary, #8b6f47);
  text-decoration: none;
  transition: opacity var(--transition-fast, 0.15s ease);
}

.contact-section__link:hover,
.contact-section__link:focus-visible {
  opacity: 0.75;
  text-decoration: underline;
}

.contact-section__social-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--color-primary, #8b6f47);
  margin-bottom: var(--space-4, 1rem);
}

.contact-section__social-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-3, 0.75rem);
}

.contact-section__social-link {
  display: inline-block;
  padding: var(--space-2, 0.5rem) var(--space-4, 1rem);
  border: 1px solid var(--color-border, #d4b99a);
  border-radius: var(--radius-md, 6px);
  color: var(--color-text, #333);
  text-decoration: none;
  font-size: 0.9rem;
  transition: background-color var(--transition-fast, 0.15s ease), color var(--transition-fast, 0.15s ease);
}

.contact-section__social-link:hover,
.contact-section__social-link:focus-visible {
  background-color: var(--color-primary, #8b6f47);
  color: var(--color-on-primary, #fff);
  border-color: var(--color-primary, #8b6f47);
}

@media (max-width: 768px) {
  .contact-section__body {
    grid-template-columns: 1fr;
  }
}
</style>
