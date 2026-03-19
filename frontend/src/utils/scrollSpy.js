/**
 * scrollSpy.js — 导航锚点滚动高亮工具
 *
 * 监听页面滚动，当目标区块进入视窗时激活对应导航项。
 * 返回一个析构函数，供组件 beforeDestroy 时清理监听器。
 *
 * @param {Array} navItems — 来自 contentMapper 的导航项（含 id & target）
 * @param {Function} onActiveChange — (activeNavId: string|null) => void
 * @returns {Function} destroySpy — 调用后移除所有监听
 */
export function initScrollSpy(navItems, onActiveChange) {
  if (typeof window === 'undefined' || !navItems || !navItems.length) {
    return () => {}
  }

  // 只处理 anchor 类型的导航项
  const anchors = navItems
    .filter(item => item.targetType === 'anchor' && item.target && item.target.startsWith('#'))
    .map(item => ({ id: item.id, selector: item.target }))

  if (!anchors.length) return () => {}

  let ticking = false

  function update() {
    const scrollY = window.scrollY
    const winHeight = window.innerHeight

    let activeId = null

    // 从最后一个向前找，找到第一个顶部已滚过或接近顶部的区块
    for (let i = anchors.length - 1; i >= 0; i--) {
      const el = document.querySelector(anchors[i].selector)
      if (!el) continue
      const rect = el.getBoundingClientRect()
      // 区块顶部距离视窗顶部 < 视窗高度的 40%，视为激活
      if (rect.top <= winHeight * 0.4) {
        activeId = anchors[i].id
        break
      }
    }

    onActiveChange(activeId)
    ticking = false
  }

  function onScroll() {
    if (!ticking) {
      requestAnimationFrame(update)
      ticking = true
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true })

  // 初始化检查
  update()

  return function destroySpy() {
    window.removeEventListener('scroll', onScroll)
  }
}

/**
 * 仅供向后兼容保留，组件应优先使用 initScrollSpy 返回的析构函数
 * @param {Function} destroyFn
 */
export function destroyScrollSpy(destroyFn) {
  if (typeof destroyFn === 'function') destroyFn()
}
