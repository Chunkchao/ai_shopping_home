/**
 * categoriesFlow.integration.test.js
 *
 * 集成测试：验证品类组件渲染、品类数量、"了解更多"点击行为
 */

import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import CategoriesSection from '@/components/sections/CategoriesSection.vue'
import CategoryCard from '@/components/sections/CategoryCard.vue'

const sampleCategories = [
  { id: 'c1', name: '女士系列', summary: '女士羊绒精品', imageUrl: '/img/women.jpg', imageAlt: '女士', actionLabel: '了解更多', actionTarget: '#contact', badge: '热销' },
  { id: 'c2', name: '男士系列', summary: '男士羊绒精品', imageUrl: '/img/men.jpg', imageAlt: '男士', actionLabel: '了解更多', actionTarget: '#contact', badge: null },
  { id: 'c3', name: '儿童系列', summary: '儿童羊绒精品', imageUrl: '/img/children.jpg', imageAlt: '儿童', actionLabel: '了解更多', actionTarget: '#contact', badge: '新品' }
]

describe('Categories Integration Tests [US2]', () => {
  describe('CategoriesSection', () => {
    it('should render all category cards', () => {
      const wrapper = mount(CategoriesSection, {
        propsData: { items: sampleCategories }
      })
      const cards = wrapper.findAllComponents(CategoryCard)
      expect(cards.length).toBe(sampleCategories.length)
      wrapper.destroy()
    })

    it('should show empty state when items is empty', () => {
      const wrapper = mount(CategoriesSection, {
        propsData: { items: [] }
      })
      expect(wrapper.find('.categories-section__empty').exists()).toBe(true)
      wrapper.destroy()
    })

    it('should have a section heading', () => {
      const wrapper = mount(CategoriesSection, {
        propsData: { items: sampleCategories }
      })
      expect(wrapper.find('h2').exists()).toBe(true)
      wrapper.destroy()
    })
  })

  describe('CategoryCard', () => {
    const cat = sampleCategories[0]

    it('should render category name', () => {
      const wrapper = mount(CategoryCard, { propsData: { item: cat } })
      expect(wrapper.text()).toContain(cat.name)
      wrapper.destroy()
    })

    it('should render badge when provided', () => {
      const wrapper = mount(CategoryCard, { propsData: { item: cat } })
      expect(wrapper.find('.category-card__badge').exists()).toBe(true)
      expect(wrapper.find('.category-card__badge').text()).toContain(cat.badge)
      wrapper.destroy()
    })

    it('should not render badge when badge is null', () => {
      const wrapper = mount(CategoryCard, { propsData: { item: sampleCategories[1] } })
      expect(wrapper.find('.category-card__badge').exists()).toBe(false)
      wrapper.destroy()
    })

    it('should render action link with correct href', () => {
      const wrapper = mount(CategoryCard, { propsData: { item: cat } })
      const link = wrapper.find('.category-card__action')
      expect(link.exists()).toBe(true)
      expect(link.attributes('href')).toBe(cat.actionTarget)
      wrapper.destroy()
    })
  })
})
