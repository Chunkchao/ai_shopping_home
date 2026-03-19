/**
 * 集成测试：联系区块与页脚渲染流程
 */
import { describe, it, expect } from 'vitest'
import { shallowMount, mount } from '@vue/test-utils'
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
    { type: 'xiaohongshu', label: '小红书', url: '#', qrImageUrl: null }
  ]
}

describe('ContactSection integration', () => {
  it('renders contact section without error when data is provided', () => {
    const wrapper = shallowMount(ContactSection, {
      propsData: { data: sampleContact }
    })
    expect(wrapper.exists()).toBe(true)
  })

  it('shows phone number in template', () => {
    const wrapper = mount(ContactSection, {
      propsData: { data: sampleContact }
    })
    expect(wrapper.text()).toContain('400-800-8888')
  })

  it('shows email in template', () => {
    const wrapper = mount(ContactSection, {
      propsData: { data: sampleContact }
    })
    expect(wrapper.text()).toContain('service@rongyun.example.com')
  })

  it('shows social links', () => {
    const wrapper = mount(ContactSection, {
      propsData: { data: sampleContact }
    })
    expect(wrapper.text()).toContain('微信公众号')
    expect(wrapper.text()).toContain('小红书')
  })

  it('renders fallback state when data is null', () => {
    const wrapper = shallowMount(ContactSection, {
      propsData: { data: null }
    })
    expect(wrapper.exists()).toBe(true)
  })
})

describe('SiteFooter integration', () => {
  it('renders footer without error when contact is provided', () => {
    const wrapper = shallowMount(SiteFooter, {
      propsData: { contact: sampleContact }
    })
    expect(wrapper.exists()).toBe(true)
  })

  it('shows copyright text in footer', () => {
    const wrapper = mount(SiteFooter, {
      propsData: { contact: sampleContact }
    })
    expect(wrapper.text()).toContain('© 2024 绒芸优选 版权所有')
  })

  it('shows recordNumber when present', () => {
    const wrapper = mount(SiteFooter, {
      propsData: { contact: sampleContact }
    })
    expect(wrapper.text()).toContain('蒙ICP备XXXXXXXX号')
  })

  it('renders footer without error when contact is null', () => {
    const wrapper = shallowMount(SiteFooter, {
      propsData: { contact: null }
    })
    expect(wrapper.exists()).toBe(true)
  })
})
