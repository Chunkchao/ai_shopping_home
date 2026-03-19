/**
 * categoriesMapper.unit.test.js
 *
 * 单元测试：品类数据映射与容错逻辑
 */

import { describe, it, expect } from 'vitest'
import { mapContent } from '@/utils/contentMapper.js'

describe('Categories Mapper Unit Tests [US2]', () => {
  it('should map categories with all required fields', () => {
    const raw = buildRaw({
      categories: [
        { id: 'c1', name: '女士', summary: '描述', imageUrl: '/img/w.jpg', imageAlt: '女士图', actionLabel: '了解', actionTarget: '#contact' }
      ]
    })
    const { categories } = mapContent(raw)
    expect(categories.length).toBe(1)
    expect(categories[0].id).toBe('c1')
    expect(categories[0].name).toBe('女士')
    expect(categories[0].badge).toBeNull()
  })

  it('should preserve badge when provided', () => {
    const raw = buildRaw({
      categories: [
        { id: 'c1', name: '热款', summary: '热销品类', imageUrl: '/img.jpg', imageAlt: '图', actionLabel: '查看', actionTarget: '#x', badge: '爆款' }
      ]
    })
    const { categories } = mapContent(raw)
    expect(categories[0].badge).toBe('爆款')
  })

  it('should handle empty categories array', () => {
    const raw = buildRaw({ categories: [] })
    expect(mapContent(raw).categories).toEqual([])
  })

  it('should handle null categories gracefully', () => {
    const raw = buildRaw({ categories: null })
    expect(mapContent(raw).categories).toEqual([])
  })

  it('should map brandStory correctly', () => {
    const raw = buildRaw({
      brandStory: {
        title: '品牌故事',
        paragraphs: ['第一段', '第二段'],
        highlightPhrases: ['关键词1'],
        detailLink: '#about'
      }
    })
    const { brandStory } = mapContent(raw)
    expect(brandStory.title).toBe('品牌故事')
    expect(brandStory.paragraphs).toHaveLength(2)
    expect(brandStory.detailLink).toBe('#about')
  })

  it('should return null brandStory when not provided', () => {
    const raw = buildRaw({ brandStory: null })
    expect(mapContent(raw).brandStory).toBeNull()
  })

  it('should filter empty strings from paragraphs', () => {
    const raw = buildRaw({
      brandStory: {
        title: 'Title',
        paragraphs: ['段落1', '', '  ', '段落2'],
        highlightPhrases: []
      }
    })
    const { brandStory } = mapContent(raw)
    expect(brandStory.paragraphs).toHaveLength(2)
  })
})

// ── 辅助构造函数 ──────────────────────────────────────────────────────────────

function buildRaw(overrides = {}) {
  return {
    homePageConfig: { id: 'test', version: '1', locale: 'zh-CN', sections: [{ key: 's', enabled: true, order: 0, title: 'T' }] },
    navigation: defaultNavigation(),
    hero: minHero(),
    categories: overrides.categories !== undefined ? overrides.categories : [],
    brandStory: overrides.brandStory !== undefined ? overrides.brandStory : null,
    contact: minContact()
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

function minHero() {
  return { heading: 'H', tagline: 'T', description: 'D', ctaLabel: 'CTA', ctaTarget: '#x', mediaType: 'image', mediaUrl: '/img.jpg', mediaAlt: 'alt' }
}

function minContact(overrides = {}) {
  return { companyName: '测试公司', copyright: '©', phone: '400-000-0000', serviceHours: '周一至周五', email: 'x@x.com', ...overrides }
}
