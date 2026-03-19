<template>
  <div id="app-root">
    <!-- 跳过导航：辅助键盘用户直接跳至主内容 -->
    <a href="#main-content" class="skip-link">跳至主内容</a>
    <PageShell>
      <template #header>
        <SiteHeader
          :nav-items="navItems"
          :logo-text="logoText"
        />
      </template>

      <template #main>
        <PageState v-if="pageState !== 'ready'" :state="pageState" @retry="loadData" />

        <template v-else>
          <HeroSection :data="heroData" />
          <CategoriesSection :items="categoriesData" />
          <BrandStorySection :data="brandStoryData" />
          <ContactSection :data="contactData" />
        </template>
      </template>

      <template #footer>
        <SiteFooter :contact="contactData" />
      </template>
    </PageShell>
  </div>
</template>

<script>
import PageShell from '@/components/layout/PageShell.vue'
import SiteHeader from '@/components/layout/SiteHeader.vue'
import PageState from '@/components/common/PageState.vue'
import HeroSection from '@/components/sections/HeroSection.vue'
import CategoriesSection from '@/components/sections/CategoriesSection.vue'
import BrandStorySection from '@/components/sections/BrandStorySection.vue'
import ContactSection from '@/components/sections/ContactSection.vue'
import SiteFooter from '@/components/layout/SiteFooter.vue'
import { loadHomepageContent } from '@/services/homepageContent.js'
import { mapContent } from '@/utils/contentMapper.js'

export default {
  name: 'App',

  components: {
    PageShell,
    SiteHeader,
    PageState,
    HeroSection,
    CategoriesSection,
    BrandStorySection,
    ContactSection,
    SiteFooter
  },

  data() {
    return {
      pageState: 'loading',
      navItems: [],
      logoText: '',
      heroData: null,
      categoriesData: [],
      brandStoryData: null,
      contactData: null
    }
  },

  async created() {
    await this.loadData()
  },

  methods: {
    async loadData() {
      this.pageState = 'loading'
      try {
        const raw = await loadHomepageContent()
        const mapped = mapContent(raw)
        this.navItems = mapped.navItems
        this.logoText = mapped.logoText
        this.heroData = mapped.hero
        this.categoriesData = mapped.categories
        this.brandStoryData = mapped.brandStory
        this.contactData = mapped.contact
        this.pageState = 'ready'
      } catch (err) {
        console.error('[App] Failed to load homepage content:', err)
        this.pageState = 'error'
      }
    }
  }
}
</script>

<style>
@import './assets/styles/tokens.css';
@import './assets/styles/homepage.css';
</style>
