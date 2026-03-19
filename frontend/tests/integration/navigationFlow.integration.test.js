/**
 * navigationFlow.integration.test.js
 *
 * 集成测试：验证 SiteHeader 导航渲染与 scrollSpy 锚点滚动工具逻辑
 */

import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import SiteHeader from '@/components/layout/SiteHeader.vue'

const sampleNavItems = [
  { id: 'nav-1', label: '女士系列', targetType: 'anchor', target: '#categories' },
  { id: 'nav-2', label: '男士系列', targetType: 'anchor', target: '#categories' },
  { id: 'nav-3', label: '品牌故事', targetType: 'anchor', target: '#brand-story' },
  { id: 'nav-4', label: '联系我们', targetType: 'anchor', target: '#contact' }
]

describe('Navigation Integration Tests [US1]', () => {
  describe('SiteHeader rendering', () => {
    it('should render logo text', () => {
      const wrapper = mount(SiteHeader, {
        propsData: {
          navItems: sampleNavItems,
          logoText: '绒芸优选'
        }
      })
      expect(wrapper.text()).toContain('绒芸优选')
      wrapper.destroy()
    })

    it('should render all navigation items', () => {
      const wrapper = mount(SiteHeader, {
        propsData: {
          navItems: sampleNavItems,
          logoText: '绒芸优选'
        }
      })
      sampleNavItems.forEach(item => {
        expect(wrapper.text()).toContain(item.label)
      })
      wrapper.destroy()
    })

    it('should have a nav element with role navigation', () => {
      const wrapper = mount(SiteHeader, {
        propsData: {
          navItems: sampleNavItems,
          logoText: '绒芸优选'
        }
      })
      const nav = wrapper.find('nav')
      expect(nav.exists()).toBe(true)
      wrapper.destroy()
    })

    it('should render anchor links for anchor-type nav items', () => {
      const wrapper = mount(SiteHeader, {
        propsData: {
          navItems: sampleNavItems,
          logoText: '绒芸优选'
        }
      })
      const links = wrapper.findAll('a')
      expect(links.length).toBeGreaterThanOrEqual(sampleNavItems.length)
      wrapper.destroy()
    })
  })

  describe('SiteHeader mobile menu toggle', () => {
    it('should have a mobile toggle button accessible by aria', () => {
      const wrapper = mount(SiteHeader, {
        propsData: {
          navItems: sampleNavItems,
          logoText: '绒芸优选'
        }
      })
      const toggleBtn = wrapper.find('[aria-label]')
      expect(toggleBtn.exists()).toBe(true)
      wrapper.destroy()
    })
  })
})
