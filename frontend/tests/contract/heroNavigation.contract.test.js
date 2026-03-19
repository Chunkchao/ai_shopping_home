/**
 * heroNavigation.contract.test.js
 *
 * 契约测试：验证首屏内容与导航数据的结构约束
 */

import { describe, it, expect } from 'vitest'
import mockData from '@/mock/homepage.json'
import { mapContent } from '@/utils/contentMapper.js'

describe('Hero & Navigation Contract Tests [US1]', () => {
  const mapped = mapContent(mockData)

  describe('Hero data contract', () => {
    it('should provide a non-empty heading', () => {
      expect(mapped.hero).not.toBeNull()
      expect(mapped.hero.heading.trim()).toBeTruthy()
    })

    it('should provide a non-empty tagline', () => {
      expect(mapped.hero.tagline.trim()).toBeTruthy()
    })

    it('should provide a valid ctaTarget', () => {
      expect(mapped.hero.ctaTarget).toBeTruthy()
    })

    it('should provide a valid mediaType', () => {
      expect(['image', 'video']).toContain(mapped.hero.mediaType)
    })

    it('should provide a non-empty mediaAlt for accessibility', () => {
      expect(mapped.hero.mediaAlt.trim()).toBeTruthy()
    })
  })

  describe('Navigation data contract', () => {
    it('should have at least 4 visible navigation items', () => {
      expect(mapped.navItems.length).toBeGreaterThanOrEqual(4)
    })

    it('each nav item should have id, label, and target', () => {
      mapped.navItems.forEach((item, i) => {
        expect(item.id, `navItems[${i}].id`).toBeTruthy()
        expect(item.label, `navItems[${i}].label`).toBeTruthy()
        expect(item.target, `navItems[${i}].target`).toBeTruthy()
      })
    })

    it('each nav item should have a valid targetType', () => {
      mapped.navItems.forEach((item, i) => {
        expect(['anchor', 'route', 'external'], `navItems[${i}].targetType`).toContain(item.targetType)
      })
    })

    it('should provide logoText from contact.companyName', () => {
      expect(mapped.logoText.trim()).toBeTruthy()
    })
  })
})
