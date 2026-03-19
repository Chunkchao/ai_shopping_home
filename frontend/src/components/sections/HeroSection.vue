<template>
  <section id="hero" class="hero-section" aria-label="品牌首屏展示区">
    <!-- 降级状态：无数据 -->
    <div v-if="!data" class="hero-section__fallback" role="alert">
      <p>首屏内容暂时无法显示，请刷新页面重试。</p>
    </div>

    <template v-else>
      <!-- 背景媒体 -->
      <div class="hero-section__media" aria-hidden="true">
        <video
          v-if="data.mediaType === 'video' && data.mediaUrl"
          class="hero-section__bg-video"
          :poster="data.mediaPoster || ''"
          autoplay
          muted
          loop
          playsinline
          preload="auto"
        >
          <source :src="data.mediaUrl" type="video/mp4" />
        </video>
        <img
          v-else-if="data.mediaType === 'image' && data.mediaUrl"
          :src="data.mediaUrl"
          :alt="data.mediaAlt"
          class="hero-section__bg-img"
          loading="eager"
        />
        <div v-else class="hero-section__bg-placeholder"></div>
        <div class="hero-section__overlay"></div>
      </div>

      <!-- 内容区 -->
      <div class="hero-section__content">
        <h1 class="hero-section__heading">{{ data.heading }}</h1>
        <p class="hero-section__tagline">{{ data.tagline }}</p>
        <p v-if="data.description" class="hero-section__description">{{ data.description }}</p>
        <a
          :href="data.ctaTarget"
          class="hero-section__cta"
          @click="handleCta"
        >
          {{ data.ctaLabel }}
        </a>
      </div>
    </template>
  </section>
</template>

<script>
export default {
  name: 'HeroSection',

  props: {
    data: {
      type: Object,
      default: null
    }
  },

  methods: {
    handleCta(event) {
      if (this.data && this.data.ctaTarget && this.data.ctaTarget.startsWith('#')) {
        event.preventDefault()
        const el = document.querySelector(this.data.ctaTarget)
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      }
    }
  }
}
</script>

<style scoped>
.hero-section {
  position: relative;
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background-color: var(--color-bg-dark);
}

/* 背景媒体 */
.hero-section__media {
  position: absolute;
  inset: 0;
}

.hero-section__bg-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

.hero-section__bg-placeholder {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, var(--color-primary-dark) 0%, var(--color-secondary) 100%);
}

.hero-section__bg-video {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

.hero-section__overlay {
  position: absolute;
  inset: 0;
  background-color: var(--color-bg-overlay);
}

/* 内容区 */
.hero-section__content {
  position: relative;
  z-index: 1;
  text-align: center;
  max-width: 700px;
  padding: var(--space-8) var(--space-6);
  color: var(--color-text-inverse);
}

.hero-section__heading {
  font-size: var(--font-size-4xl);
  font-weight: var(--font-weight-bold);
  letter-spacing: 0.1em;
  margin-bottom: var(--space-4);
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);
}

.hero-section__tagline {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-normal);
  margin-bottom: var(--space-4);
  opacity: 0.92;
  line-height: var(--line-height-loose);
}

.hero-section__description {
  font-size: var(--font-size-base);
  opacity: 0.82;
  margin-bottom: var(--space-8);
  line-height: var(--line-height-loose);
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
}

/* CTA 按钮 */
.hero-section__cta {
  display: inline-block;
  padding: var(--space-3) var(--space-10);
  background-color: var(--color-primary);
  color: var(--color-text-inverse);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-semibold);
  letter-spacing: 0.08em;
  border-radius: var(--radius-full);
  text-decoration: none;
  transition: background-color var(--transition-base), transform var(--transition-fast);
}

.hero-section__cta:hover {
  background-color: var(--color-primary-light);
  transform: translateY(-2px);
}

.hero-section__cta:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 3px;
}

/* 降级状态 */
.hero-section__fallback {
  padding: var(--space-20) var(--space-6);
  color: var(--color-text-muted);
  text-align: center;
  font-size: var(--font-size-base);
}

/* 移动端 */
@media (max-width: 768px) {
  .hero-section {
    min-height: 60vh;
  }

  .hero-section__heading {
    font-size: var(--font-size-3xl);
  }

  .hero-section__tagline {
    font-size: var(--font-size-lg);
  }
}
</style>
