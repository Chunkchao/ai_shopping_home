/**
 * 单元测试：mapContact 逻辑与边界情况
 */
import { describe, it, expect } from 'vitest'
import { mapContent } from '@/utils/contentMapper.js'

function mapContact(contact) {
  return mapContent({ contact }).contact
}

describe('mapContact unit tests', () => {
  it('returns null for null input', () => {
    expect(mapContact(null)).toBeNull()
  })

  it('returns null for undefined input', () => {
    expect(mapContact(undefined)).toBeNull()
  })

  it('returns null for non-object input', () => {
    expect(mapContact('string')).toBeNull()
    expect(mapContact(42)).toBeNull()
  })

  it('maps basic contact fields correctly', () => {
    const raw = {
      companyName: '测试公司',
      copyright: '© 2024',
      phone: '400-000-0000',
      email: 'test@example.com',
      serviceHours: '周一至周五',
      socialLinks: []
    }
    const result = mapContact(raw)
    expect(result.companyName).toBe('测试公司')
    expect(result.copyright).toBe('© 2024')
    expect(result.phone).toBe('400-000-0000')
    expect(result.email).toBe('test@example.com')
    expect(result.serviceHours).toBe('周一至周五')
  })

  it('sets recordNumber to null when not provided', () => {
    const result = mapContact({ companyName: 'X', socialLinks: [] })
    expect(result.recordNumber).toBeNull()
  })

  it('preserves recordNumber when provided', () => {
    const result = mapContact({ companyName: 'X', recordNumber: 'ICP123', socialLinks: [] })
    expect(result.recordNumber).toBe('ICP123')
  })

  it('defaults socialLinks to empty array for missing field', () => {
    const result = mapContact({ companyName: 'X' })
    expect(Array.isArray(result.socialLinks)).toBe(true)
    expect(result.socialLinks).toHaveLength(0)
  })

  it('maps socialLinks correctly', () => {
    const raw = {
      companyName: 'X',
      socialLinks: [
        { type: 'wechat', label: '微信', url: '#wx', qrImageUrl: '/qr.png' },
        { type: 'weibo', label: '微博', url: '#wb' }
      ]
    }
    const result = mapContact(raw)
    expect(result.socialLinks).toHaveLength(2)
    expect(result.socialLinks[0].type).toBe('wechat')
    expect(result.socialLinks[0].qrImageUrl).toBe('/qr.png')
    expect(result.socialLinks[1].qrImageUrl).toBeNull()
  })

  it('defaults missing string fields to empty string', () => {
    const result = mapContact({})
    expect(result.companyName).toBe('')
    expect(result.phone).toBe('')
    expect(result.email).toBe('')
  })
})
