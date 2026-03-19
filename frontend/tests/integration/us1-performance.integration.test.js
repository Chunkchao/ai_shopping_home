/**
 * us1-performance.integration.test.js
 *
 * US1 性能验证：验证组件渲染与交互响应时间在预算内
 */

import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import HeroSection from '@/components/sections/HeroSection.vue'
import SiteHeader from '@/components/layout/SiteHeader.vue'

const heroData = {
  heading: '绒芸优选',
  tagline: '精选羊绒',
  description: '品质生活',
  ctaLabel: '探索系列',
  ctaTarget: '#categories',
  mediaType: 'image',
  mediaUrl: '/img/hero.jpg',
  mediaAlt: '首屏图片'
}

const navItems = [
  { id: 'n1', label: '女士系列', targetType: 'anchor', target: '#categories' },
  { id: 'n2', label: '男士系列', targetType: 'anchor', target: '#categories' },
  { id: 'n3', label: '品牌故事', targetType: 'anchor', target: '#brand-story' },
  { id: 'n4', label: '联系我们', targetType: 'anchor', target: '#contact' }
]

describe('US1 Performance Budget Tests', () => {
  it('HeroSection should mount within 300ms', () => {
    const start = performance.now()
    const wrapper = mount(HeroSection, { propsData: { data: heroData } })
    const elapsed = performance.now() - start
    expect(elapsed).toBeLessThan(300)
    expect(wrapper.find('.hero-section__heading').text()).toBe('绒芸优选')
    wrapper.destroy()
  })

  it('SiteHeader should mount within 300ms', () => {
    const start = performance.now()
    const wrapper = mount(SiteHeader, { propsData: { navItems, logoText: '绒芸优选' } })
    const elapsed = performance.now() - start
    expect(elapsed).toBeLessThan(300)
    wrapper.destroy()
  })

  it('HeroSection should render heading and CTA without delay', () => {
    const wrapper = mount(HeroSection, { propsData: { data: heroData } })
    expect(wrapper.find('.hero-section__heading').exists()).toBe(true)
    expect(wrapper.find('.hero-section__cta').exists()).toBe(true)
    wrapper.destroy()
  })

  it('HeroSection should gracefully show fallback when data is null', () => {
    const wrapper = mount(HeroSection, { propsData: { data: null } })
    expect(wrapper.find('.hero-section__fallback').exists()).toBe(true)
    wrapper.destroy()
  })
})
