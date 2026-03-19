# Quickstart: 公司官网首页（Vite + Vue2 + Mock）

## 1. 前置环境

- Node.js: >= 18 LTS
- 包管理器: npm（默认）
- 浏览器: Chrome/Edge 最新版本

## 2. 初始化项目（建议最小依赖）

1. 在仓库根目录创建前端目录结构:
   - frontend/
2. 初始化并安装依赖:
   - 运行时: vue@2.7, vite, @vitejs/plugin-vue2
   - 测试: vitest, @vue/test-utils, jsdom
3. 创建 Mock 数据文件:
   - frontend/src/mock/homepage.json
4. 创建数据服务:
   - frontend/src/services/homepageContent.js

## 3. 本地开发

1. 启动开发服务器:
   - npm run dev
2. 打开首页:
   - <http://localhost:5173/>
3. 校验关键模块:
   - 首屏品牌区
   - 顶部导航
   - 品类卡片
   - 底部联系信息

## 4. 测试执行

1. 运行单元与集成测试:
   - npm run test
2. 验证关键场景:
   - 导航触达
   - 品类跳转
   - 联系方式触发
   - Mock 数据空态/异常态降级

## 5. 契约验证

1. 使用 JSON Schema 校验 Mock 数据:
   - 契约文件: contracts/homepage-content-schema.json
2. 校验失败时:
   - 修复 mock 字段后再运行测试

## 7. 实施验证结果

### 单元与集成测试（npm test）

| 测试轮次 | 测试文件数 | 通过用例数 | 状态 |
|----------|-----------|-----------|------|
| Phase 1-2 基础   | 2 | 11 | ✅ PASS |
| Phase 3 US1   | 5 | 39 | ✅ PASS |
| Phase 4 US2   | 9 | 65 | ✅ PASS |
| Phase 5 US3   | 13 | 96 | ✅ PASS |

**最终测试结果**: Test Files 13 passed (13), Tests 96 passed (96)

### 关键场景验收清单

- [x] 首屏品牌展示区（绒芸优选 Hero）渲染正常
- [x] 顶部导航可触达各区块（锚点滚动）
- [x] 移动端导航折叠/展开正常
- [x] 品类卡片 4 个，含徽章与"了解更多"链接
- [x] 品牌故事区段 3 段，高亮短语展示
- [x] 联系区展示电话/邮箱/服务时间/社交媒体
- [x] 页脚版权与备案号展示
- [x] 页面各组件空态/错误态降级处理正常
- [x] 全部性能预算测试通过（挂载 < 300ms）

### 性能预算（vitest 模拟挂载）

| 组件 | 挂载时间预算 | 状态 |
|------|-------------|------|
| SiteHeader | < 300ms | ✅ |
| HeroSection | < 300ms | ✅ |
| CategoriesSection | < 300ms | ✅ |
| CategoryCard | < 300ms | ✅ |
| BrandStorySection | < 300ms | ✅ |
| ContactSection | < 300ms | ✅ |
| SiteFooter | < 300ms | ✅ |

> Lighthouse 生产环境检查请在 `npm run build && npm run preview` 后执行。


## 7. 交付检查清单

- 所有测试通过
- Mock 数据契约通过
- 桌面/移动截图齐全
- 性能指标达标
- 与宪章四项核心原则一致
