/**
 * heroNav.unit.test.js
 *
 * 单元测试：contentMapper 导航和 Hero 映射逻辑
 */

import { describe, it, expect } from 'vitest'
import { mapContent } from '@/utils/contentMapper.js'

describe('Hero & Nav Unit Tests [US1]', () => {
  describe('mapContent — navItems', () => {
    it('should filter out invisible nav items', () => {
      const raw = buildRaw({
        navigation: [
          { id: 'a', label: 'A', targetType: 'anchor', target: '#a', priority: 1, visible: true },
          { id: 'b', label: 'B', targetType: 'anchor', target: '#b', priority: 2, visible: false }
        ]
      })
      const mapped = mapContent(raw)
      expect(mapped.navItems.length).toBe(1)
      expect(mapped.navItems[0].label).toBe('A')
    })

    it('should sort nav items by priority ascending', () => {
      const raw = buildRaw({
        navigation: [
          { id: 'z', label: 'Z', targetType: 'anchor', target: '#z', priority: 3, visible: true },
          { id: 'a', label: 'A', targetType: 'anchor', target: '#a', priority: 1, visible: true },
          { id: 'm', label: 'M', targetType: 'anchor', target: '#m', priority: 2, visible: true }
        ]
      })
      const mapped = mapContent(raw)
      expect(mapped.navItems.map(i => i.label)).toEqual(['A', 'M', 'Z'])
    })

    it('should handle empty navigation gracefully', () => {
      const raw = buildRaw({ navigation: [] })
      expect(mapContent(raw).navItems).toEqual([])
    })

    it('should handle null navigation gracefully', () => {
      const raw = buildRaw({ navigation: null })
      expect(mapContent(raw).navItems).toEqual([])
    })
  })

  describe('mapContent — hero', () => {
    it('should map hero fields correctly', () => {
      const raw = buildRaw({
        hero: {
          heading: '绒芸优选',
          tagline: '精选羊绒',
          description: '品质生活从这里开始',
          ctaLabel: '探索更多',
          ctaTarget: '#categories',
          mediaType: 'image',
          mediaUrl: '/img/hero.jpg',
          mediaAlt: '首屏图片'
        }
      })
      const { hero } = mapContent(raw)
      expect(hero.heading).toBe('绒芸优选')
      expect(hero.tagline).toBe('精选羊绒')
      expect(hero.ctaLabel).toBe('探索更多')
      expect(hero.mediaType).toBe('image')
    })

    it('should default mediaType to "image" for unknown type', () => {
      const raw = buildRaw({ hero: minHero({ mediaType: 'unknown' }) })
      expect(mapContent(raw).hero.mediaType).toBe('image')
    })

    it('should return null hero for missing hero field', () => {
      const raw = buildRaw({ hero: null })
      expect(mapContent(raw).hero).toBeNull()
    })

    it('should trim whitespace from hero fields', () => {
      const raw = buildRaw({ hero: minHero({ heading: '  绒芸  ' }) })
      expect(mapContent(raw).hero.heading).toBe('绒芸')
    })
  })

  describe('mapContent — logoText', () => {
    it('should use companyName as logoText', () => {
      const raw = buildRaw({
        contact: minContact({ companyName: '绒芸品牌' })
      })
      expect(mapContent(raw).logoText).toBe('绒芸品牌')
    })

    it('should fallback to "绒芸优选" when contact is missing', () => {
      const raw = buildRaw({ contact: null })
      expect(mapContent(raw).logoText).toBe('绒芸优选')
    })
  })
})

// ── 辅助构造函数 ──────────────────────────────────────────────────────────────

function buildRaw(overrides = {}) {
  return {
    homePageConfig: { id: 'test', version: '1', locale: 'zh-CN', sections: [{ key: 's', enabled: true, order: 0, title: 'T' }] },
    navigation: overrides.navigation !== undefined ? overrides.navigation : defaultNavigation(),
    hero: overrides.hero !== undefined ? overrides.hero : minHero(),
    categories: overrides.categories !== undefined ? overrides.categories : [],
    brandStory: overrides.brandStory !== undefined ? overrides.brandStory : null,
    contact: overrides.contact !== undefined ? overrides.contact : minContact()
  }
}

function defaultNavigation() {
  return [
    { id: 'n1', label: 'A', targetType: 'anchor', target: '#a', priority: 1, visible: true },
    { id: 'n2', label: 'B', targetType: 'anchor', target: '#b', priority: 2, visible: true },
    { id: 'n3', label: 'C', targetType: 'anchor', target: '#c', priority: 3, visible: true },
    { id: 'n4', label: 'D', targetType: 'anchor', target: '#d', priority: 4, visible: true }
  ]
}

function minHero(overrides = {}) {
  return {
    heading: '标题',
    tagline: '副标题',
    description: '描述文字',
    ctaLabel: 'CTA',
    ctaTarget: '#categories',
    mediaType: 'image',
    mediaUrl: '/img.jpg',
    mediaAlt: '图片描述',
    ...overrides
  }
}

function minContact(overrides = {}) {
  return {
    companyName: '测试公司',
    copyright: '© 2024',
    phone: '400-000-0000',
    serviceHours: '周一至周五',
    email: 'test@example.com',
    ...overrides
  }
}
