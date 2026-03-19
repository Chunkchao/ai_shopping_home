/**
 * homepageContent.js — Mock 数据读取服务
 *
 * 从本地 mock/homepage.json 异步加载首页内容。
 * 接口签名设计为可替换为真实 API 调用，调用方无需修改。
 */

import mockData from '@/mock/homepage.json'

/**
 * 加载首页内容（当前实现返回本地 Mock 数据）
 * @returns {Promise<Object>} 原始 homepage mock 数据
 */
export async function loadHomepageContent() {
  // 模拟异步加载延迟（生产环境替换为 fetch 调用）
  await Promise.resolve()
  return mockData
}
