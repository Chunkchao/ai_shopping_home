/**
 * 性能集成测试：US3 联系区块与页脚挂载时间预算
 */
import { describe, it, expect } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import ContactSection from '@/components/sections/ContactSection.vue'
import SiteFooter from '@/components/layout/SiteFooter.vue'

const sampleContact = {
  companyName: '绒芸优选（内蒙古）纺织有限公司',
  copyright: '© 2024 绒芸优选 版权所有',
  recordNumber: '蒙ICP备XXXXXXXX号',
  phone: '400-800-8888',
  serviceHours: '周一至周六 09:00 - 18:00',
  email: 'service@rongyun.example.com',
  socialLinks: [
    { type: 'wechat', label: '微信公众号', url: '#', qrImageUrl: null },
    { type: 'weibo', label: '微博', url: '#', qrImageUrl: null }
  ]
}

describe('US3 performance budget', () => {
  it('ContactSection mounts within 300ms', () => {
    const start = performance.now()
    shallowMount(ContactSection, { propsData: { data: sampleContact } })
    const duration = performance.now() - start
    expect(duration).toBeLessThan(300)
  })

  it('SiteFooter mounts within 300ms', () => {
    const start = performance.now()
    shallowMount(SiteFooter, { propsData: { contact: sampleContact } })
    const duration = performance.now() - start
    expect(duration).toBeLessThan(300)
  })

  it('ContactSection mounts with null data within 300ms', () => {
    const start = performance.now()
    shallowMount(ContactSection, { propsData: { data: null } })
    const duration = performance.now() - start
    expect(duration).toBeLessThan(300)
  })

  it('SiteFooter mounts with null contact within 300ms', () => {
    const start = performance.now()
    shallowMount(SiteFooter, { propsData: { contact: null } })
    const duration = performance.now() - start
    expect(duration).toBeLessThan(300)
  })
})
