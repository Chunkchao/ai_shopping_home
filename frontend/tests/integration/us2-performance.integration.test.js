/**
 * us2-performance.integration.test.js
 *
 * US2 品类浏览区性能验证：组件渲染应在 300ms 内完成
 */

import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import CategoriesSection from '@/components/sections/CategoriesSection.vue'
import BrandStorySection from '@/components/sections/BrandStorySection.vue'

const categories = [
  { id: 'c1', name: '女士系列', summary: '描述A', imageUrl: '/img/a.jpg', imageAlt: 'A', actionLabel: '了解', actionTarget: '#contact', badge: '热销' },
  { id: 'c2', name: '男士系列', summary: '描述B', imageUrl: '/img/b.jpg', imageAlt: 'B', actionLabel: '了解', actionTarget: '#contact', badge: null },
  { id: 'c3', name: '儿童系列', summary: '描述C', imageUrl: '/img/c.jpg', imageAlt: 'C', actionLabel: '了解', actionTarget: '#contact', badge: '新品' }
]

const brandStory = {
  title: '品牌故事',
  paragraphs: ['第一段内容', '第二段内容'],
  highlightPhrases: ['品质', '匠心'],
  detailLink: '#contact'
}

describe('US2 Performance Budget Tests', () => {
  it('CategoriesSection should mount within 300ms', () => {
    const start = performance.now()
    const wrapper = mount(CategoriesSection, { propsData: { items: categories } })
    const elapsed = performance.now() - start
    expect(elapsed).toBeLessThan(300)
    wrapper.destroy()
  })

  it('BrandStorySection should mount within 300ms', () => {
    const start = performance.now()
    const wrapper = mount(BrandStorySection, { propsData: { data: brandStory } })
    const elapsed = performance.now() - start
    expect(elapsed).toBeLessThan(300)
    wrapper.destroy()
  })

  it('CategoriesSection should render at least 3 cards', () => {
    const wrapper = mount(CategoriesSection, { propsData: { items: categories } })
    const cards = wrapper.findAll('.category-card')
    expect(cards.length).toBeGreaterThanOrEqual(3)
    wrapper.destroy()
  })

  it('BrandStorySection should render title and paragraphs', () => {
    const wrapper = mount(BrandStorySection, { propsData: { data: brandStory } })
    expect(wrapper.text()).toContain(brandStory.title)
    brandStory.paragraphs.forEach(p => expect(wrapper.text()).toContain(p))
    wrapper.destroy()
  })
})
