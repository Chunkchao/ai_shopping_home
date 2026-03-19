/**
 * homepageContent.contract.test.js
 *
 * 契约测试：验证 Mock 数据结构符合 homepage-content-schema.json 中定义的约束
 */

import { describe, it, expect } from 'vitest'
import mockData from '@/mock/homepage.json'

describe('Mock Data Contract — homepage.json', () => {
  describe('homePageConfig', () => {
    it('should have required top-level fields', () => {
      expect(mockData.homePageConfig).toBeDefined()
      expect(mockData.homePageConfig.id).toBeTruthy()
      expect(mockData.homePageConfig.version).toBeTruthy()
      expect(mockData.homePageConfig.locale.length).toBeGreaterThanOrEqual(2)
    })

    it('should have at least 3 sections', () => {
      expect(Array.isArray(mockData.homePageConfig.sections)).toBe(true)
      expect(mockData.homePageConfig.sections.length).toBeGreaterThanOrEqual(3)
    })

    it('each section should have required fields', () => {
      mockData.homePageConfig.sections.forEach((section, i) => {
        expect(section.key, `section[${i}].key`).toBeTruthy()
        expect(typeof section.enabled, `section[${i}].enabled`).toBe('boolean')
        expect(typeof section.order, `section[${i}].order`).toBe('number')
        expect(section.title, `section[${i}].title`).toBeTruthy()
      })
    })
  })

  describe('navigation', () => {
    it('should have at least 4 navigation items', () => {
      expect(Array.isArray(mockData.navigation)).toBe(true)
      expect(mockData.navigation.length).toBeGreaterThanOrEqual(4)
    })

    it('each navigation item should have required fields', () => {
      mockData.navigation.forEach((item, i) => {
        expect(item.id, `nav[${i}].id`).toBeTruthy()
        expect(item.label, `nav[${i}].label`).toBeTruthy()
        expect(['anchor', 'route', 'external']).toContain(item.targetType)
        expect(item.target, `nav[${i}].target`).toBeTruthy()
        expect(typeof item.priority).toBe('number')
        expect(typeof item.visible).toBe('boolean')
      })
    })
  })

  describe('hero', () => {
    it('should have all required hero fields', () => {
      const { hero } = mockData
      expect(hero).toBeDefined()
      expect(hero.heading).toBeTruthy()
      expect(hero.tagline).toBeTruthy()
      expect(hero.description).toBeTruthy()
      expect(hero.ctaLabel).toBeTruthy()
      expect(hero.ctaTarget).toBeTruthy()
      expect(['image', 'video']).toContain(hero.mediaType)
      expect(hero.mediaUrl).toBeTruthy()
      expect(hero.mediaAlt).toBeTruthy()
    })
  })

  describe('categories', () => {
    it('should have at least 3 categories', () => {
      expect(Array.isArray(mockData.categories)).toBe(true)
      expect(mockData.categories.length).toBeGreaterThanOrEqual(3)
    })

    it('each category should have required fields', () => {
      mockData.categories.forEach((cat, i) => {
        expect(cat.id, `categories[${i}].id`).toBeTruthy()
        expect(cat.name, `categories[${i}].name`).toBeTruthy()
        expect(cat.summary, `categories[${i}].summary`).toBeTruthy()
        expect(cat.imageUrl, `categories[${i}].imageUrl`).toBeTruthy()
        expect(cat.imageAlt, `categories[${i}].imageAlt`).toBeTruthy()
        expect(cat.actionLabel, `categories[${i}].actionLabel`).toBeTruthy()
        expect(cat.actionTarget, `categories[${i}].actionTarget`).toBeTruthy()
      })
    })
  })

  describe('brandStory', () => {
    it('should have required brand story fields', () => {
      const { brandStory } = mockData
      expect(brandStory.title).toBeTruthy()
      expect(Array.isArray(brandStory.paragraphs)).toBe(true)
      expect(brandStory.paragraphs.length).toBeGreaterThanOrEqual(2)
      expect(Array.isArray(brandStory.highlightPhrases)).toBe(true)
    })

    it('each paragraph should be a non-empty string', () => {
      mockData.brandStory.paragraphs.forEach((p, i) => {
        expect(typeof p, `paragraphs[${i}]`).toBe('string')
        expect(p.trim().length, `paragraphs[${i}] should not be empty`).toBeGreaterThan(0)
      })
    })
  })

  describe('contact', () => {
    it('should have required contact fields', () => {
      const { contact } = mockData
      expect(contact.companyName).toBeTruthy()
      expect(contact.copyright).toBeTruthy()
      expect(contact.phone).toBeTruthy()
      expect(contact.serviceHours).toBeTruthy()
      expect(contact.email.length).toBeGreaterThanOrEqual(3)
    })
  })
})
