/**
 * 契约测试：联系信息数据结构
 * 验证 Mock 数据中的 contact 字段符合 UI 契约要求
 */
import { describe, it, expect } from 'vitest'
import mockData from '@/mock/homepage.json'
import { mapContent } from '@/utils/contentMapper.js'

const mapped = mapContent(mockData)
const contact = mapped.contact

describe('contact data contract', () => {
  it('contact should not be null', () => {
    expect(contact).not.toBeNull()
  })

  it('contact.companyName should be a non-empty string', () => {
    expect(typeof contact.companyName).toBe('string')
    expect(contact.companyName.length).toBeGreaterThan(0)
  })

  it('contact.copyright should be a non-empty string', () => {
    expect(typeof contact.copyright).toBe('string')
    expect(contact.copyright.length).toBeGreaterThan(0)
  })

  it('contact.phone should be a non-empty string', () => {
    expect(typeof contact.phone).toBe('string')
    expect(contact.phone.length).toBeGreaterThan(0)
  })

  it('contact.email should be a non-empty string', () => {
    expect(typeof contact.email).toBe('string')
    expect(contact.email.length).toBeGreaterThan(0)
  })

  it('contact.serviceHours should be a string', () => {
    expect(typeof contact.serviceHours).toBe('string')
  })

  it('contact.socialLinks should be an array', () => {
    expect(Array.isArray(contact.socialLinks)).toBe(true)
  })

  it('socialLinks items should have type, label, url fields', () => {
    contact.socialLinks.forEach(link => {
      expect(typeof link.type).toBe('string')
      expect(link.type.length).toBeGreaterThan(0)
      expect(typeof link.label).toBe('string')
      expect(typeof link.url).toBe('string')
    })
  })

  it('contact.recordNumber should be null or a string', () => {
    expect(contact.recordNumber === null || typeof contact.recordNumber === 'string').toBe(true)
  })
})
