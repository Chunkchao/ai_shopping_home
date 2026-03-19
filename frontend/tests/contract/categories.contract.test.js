/**
 * categories.contract.test.js
 *
 * 契约测试：验证品类数据结构符合 schema 约束
 */

import { describe, it, expect } from 'vitest'
import mockData from '@/mock/homepage.json'
import { mapContent } from '@/utils/contentMapper.js'

describe('Categories Contract Tests [US2]', () => {
  const mapped = mapContent(mockData)

  it('should have at least 3 categories in mock data', () => {
    expect(mapped.categories.length).toBeGreaterThanOrEqual(3)
  })

  it('each category should have id, name, summary', () => {
    mapped.categories.forEach((cat, i) => {
      expect(cat.id, `categories[${i}].id`).toBeTruthy()
      expect(cat.name, `categories[${i}].name`).toBeTruthy()
      expect(cat.summary, `categories[${i}].summary`).toBeTruthy()
    })
  })

  it('each category should have actionLabel and actionTarget', () => {
    mapped.categories.forEach((cat, i) => {
      expect(cat.actionLabel, `categories[${i}].actionLabel`).toBeTruthy()
      expect(cat.actionTarget, `categories[${i}].actionTarget`).toBeTruthy()
    })
  })

  it('each category should have imageUrl and imageAlt', () => {
    mapped.categories.forEach((cat, i) => {
      expect(cat.imageUrl, `categories[${i}].imageUrl`).toBeTruthy()
      expect(cat.imageAlt, `categories[${i}].imageAlt`).toBeTruthy()
    })
  })

  it('badge field should be string or null', () => {
    mapped.categories.forEach((cat, i) => {
      expect(
        cat.badge === null || typeof cat.badge === 'string',
        `categories[${i}].badge should be string or null`
      ).toBe(true)
    })
  })

  describe('brandStory contract', () => {
    it('should have a non-empty title', () => {
      expect(mapped.brandStory).not.toBeNull()
      expect(mapped.brandStory.title.trim()).toBeTruthy()
    })

    it('should have at least 2 paragraphs', () => {
      expect(mapped.brandStory.paragraphs.length).toBeGreaterThanOrEqual(2)
    })

    it('each paragraph should be non-empty string', () => {
      mapped.brandStory.paragraphs.forEach((p, i) => {
        expect(typeof p, `paragraphs[${i}]`).toBe('string')
        expect(p.trim().length).toBeGreaterThan(0)
      })
    })
  })
})
