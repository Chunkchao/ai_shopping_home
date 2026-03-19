/**
 * contentMapper.js — Mock 数据映射与校验工具
 *
 * 将原始 Mock JSON 转换为组件所需的视图模型格式，
 * 并在数据缺失或格式异常时提供安全降级。
 */

/**
 * 校验字符串字段，为空时返回降级值
 * @param {*} value
 * @param {string} fallback
 * @returns {string}
 */
function safeString(value, fallback = '') {
  return typeof value === 'string' && value.trim().length > 0 ? value.trim() : fallback
}

/**
 * 校验数组字段，非数组时返回空数组
 * @param {*} value
 * @returns {Array}
 */
function safeArray(value) {
  return Array.isArray(value) ? value : []
}

/**
 * 映射导航项
 * @param {Array} navigation
 * @returns {Array}
 */
function mapNavItems(navigation) {
  return safeArray(navigation)
    .filter(item => item && item.visible !== false)
    .sort((a, b) => (a.priority || 0) - (b.priority || 0))
    .map(item => ({
      id: safeString(item.id, `nav-${Math.random()}`),
      label: safeString(item.label, '导航'),
      targetType: ['anchor', 'route', 'external'].includes(item.targetType) ? item.targetType : 'anchor',
      target: safeString(item.target, '#')
    }))
}

/**
 * 映射首屏 Hero 数据
 * @param {Object} hero
 * @returns {Object|null}
 */
function mapHero(hero) {
  if (!hero || typeof hero !== 'object') return null
  return {
    heading: safeString(hero.heading, ''),
    tagline: safeString(hero.tagline, ''),
    description: safeString(hero.description, ''),
    ctaLabel: safeString(hero.ctaLabel, '了解更多'),
    ctaTarget: safeString(hero.ctaTarget, '#categories'),
    mediaType: hero.mediaType === 'video' ? 'video' : 'image',
    mediaUrl: safeString(hero.mediaUrl, ''),
    mediaPoster: hero.mediaPoster ? safeString(hero.mediaPoster) : null,
    mediaAlt: safeString(hero.mediaAlt, '首屏图片')
  }
}

/**
 * 映射品类列表
 * @param {Array} categories
 * @returns {Array}
 */
function mapCategories(categories) {
  return safeArray(categories).map(item => ({
    id: safeString(item.id, `cat-${Math.random()}`),
    name: safeString(item.name, ''),
    summary: safeString(item.summary, ''),
    imageUrl: safeString(item.imageUrl, ''),
    imageAlt: safeString(item.imageAlt, item.name || '品类图片'),
    actionLabel: safeString(item.actionLabel, '了解更多'),
    actionTarget: safeString(item.actionTarget, '#contact'),
    badge: item.badge ? safeString(item.badge) : null
  }))
}

/**
 * 映射品牌故事
 * @param {Object} brandStory
 * @returns {Object|null}
 */
function mapBrandStory(brandStory) {
  if (!brandStory || typeof brandStory !== 'object') return null
  return {
    title: safeString(brandStory.title, '关于我们'),
    imageUrl: brandStory.imageUrl ? safeString(brandStory.imageUrl) : null,
    imageAlt: safeString(brandStory.imageAlt, '品牌故事'),
    paragraphs: safeArray(brandStory.paragraphs).filter(p => typeof p === 'string' && p.trim()),
    highlightPhrases: safeArray(brandStory.highlightPhrases).filter(p => typeof p === 'string'),
    detailLink: brandStory.detailLink ? safeString(brandStory.detailLink) : null
  }
}

/**
 * 映射联系信息
 * @param {Object} contact
 * @returns {Object|null}
 */
function mapContact(contact) {
  if (!contact || typeof contact !== 'object') return null
  return {
    companyName: safeString(contact.companyName, ''),
    copyright: safeString(contact.copyright, ''),
    recordNumber: contact.recordNumber ? safeString(contact.recordNumber) : null,
    phone: safeString(contact.phone, ''),
    serviceHours: safeString(contact.serviceHours, ''),
    email: safeString(contact.email, ''),
    socialLinks: safeArray(contact.socialLinks).map(link => ({
      type: safeString(link.type, 'other'),
      label: safeString(link.label, ''),
      url: safeString(link.url, '#'),
      qrImageUrl: link.qrImageUrl ? safeString(link.qrImageUrl) : null
    }))
  }
}

/**
 * 映射完整的首页 Mock 数据为视图模型
 * @param {Object} raw — loadHomepageContent() 返回的原始数据
 * @returns {{ logoText: string, navItems: Array, hero: Object|null, categories: Array, brandStory: Object|null, contact: Object|null }}
 */
export function mapContent(raw) {
  if (!raw || typeof raw !== 'object') {
    return {
      logoText: '',
      navItems: [],
      hero: null,
      categories: [],
      brandStory: null,
      contact: null
    }
  }

  const contact = mapContact(raw.contact)

  return {
    logoText: contact ? safeString(contact.companyName, '绒芸优选') : '绒芸优选',
    navItems: mapNavItems(raw.navigation),
    hero: mapHero(raw.hero),
    categories: mapCategories(raw.categories),
    brandStory: mapBrandStory(raw.brandStory),
    contact
  }
}
