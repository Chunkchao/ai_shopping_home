# Phase 0 Research: 公司官网首页（Vite + Vue2 + Mock）

## 决策 1：前端框架与构建方案

- Decision: 采用 Vite + Vue 2.7（Options API）实现首页。
- Rationale: 用户明确要求 Vite 和 Vue2 语法；Vue 2.7 可在保持 Vue2 语法习惯的同时获得更好的工程兼容性；Vite 提供快速开发体验。
- Alternatives considered:
  - Vue 3 + Vite：不符合“Vue2 语法”约束。
  - Webpack + Vue2：可行但构建速度与配置复杂度不优于 Vite。

## 决策 2：依赖最小化策略

- Decision: 仅引入运行必需依赖（vue、vite、@vitejs/plugin-vue2）与测试必需依赖（vitest、@vue/test-utils、jsdom），不引入 UI 组件库。
- Rationale: 满足“尽量少引入依赖”和“尽量使用 HTML/CSS/JavaScript”；自定义组件与样式令牌可覆盖首页需求。
- Alternatives considered:
  - 引入大型 UI 库（Element/Ant 等）：开发效率高，但增加包体积与视觉同质化，不符合最小依赖目标。
  - 引入状态管理库（Vuex/Pinia）：当前首页数据规模小，直接使用本地服务层与组合对象即可。

## 决策 3：数据来源与契约

- Decision: 使用本地 Mock JSON（src/mock/homepage.json）作为唯一数据源，并建立数据契约校验。
- Rationale: 用户要求“数据先用 mock”；本地 JSON 便于稳定复现和离线开发；契约测试可防止字段变更导致页面崩溃。
- Alternatives considered:
  - 远程 Mock API：更贴近线上，但需要额外服务与网络依赖。
  - 直接硬编码在组件内：实现快，但可维护性和可测试性差。

## 决策 4：测试策略

- Decision: 使用 Vitest 承担单元测试、组件集成测试与页面验收场景测试。
- Rationale: 单一测试栈即可覆盖宪章要求，降低工具链复杂度；可在 jsdom 中验证关键用户流程和容错逻辑。
- Alternatives considered:
  - Playwright/Cypress：端到端能力更强，但依赖与维护成本更高。
  - 仅手工测试：无法满足“测试标准强制执行”。

## 决策 5：参考站点风格落地方式

- Decision: 参考 zhenbei 首页的信息架构与气质（首屏品牌叙事、品类入口、品牌故事、底部联系），但全部文案、素材与数据使用 Mock。
- Rationale: 满足“参考样式”且规避版权与品牌混淆风险；可保持视觉方向一致同时确保可商用。
- Alternatives considered:
  - 直接复刻页面结构和文案：存在版权与品牌风险。
  - 完全不参考：偏离用户需求。

## 决策 6：性能预算与验证

- Decision: 预算设定为 LCP <= 2.5s、首屏关键内容可见 <= 3s、导航交互反馈 <= 300ms。
- Rationale: 与规格中的成功标准一致，且适合营销型首页的用户体验预期。
- Alternatives considered:
  - 不设定预算：无法进行客观验收。
  - 仅设置单指标：不能覆盖渲染与交互两类性能风险。

## 决策 7：可访问性与一致性基线

- Decision: 所有关键图片提供替代文本、导航可键盘访问、加载/空态/错误态采用统一样式与文案规范。
- Rationale: 支撑“用户体验一致性”原则并提升可用性。
- Alternatives considered:
  - 仅关注视觉一致：会忽略可访问性与异常路径体验。
