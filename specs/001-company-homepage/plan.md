# Implementation Plan: 公司官网首页（参考珍贝风格）

**Branch**: `001-company-homepage` | **Date**: 2026-03-19 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/001-company-homepage/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/plan-template.md` for the execution workflow.

## Summary

构建一个公司官网首页 Web 应用，视觉与信息组织风格参考目标站点，但仅复用风格方向，
不复制受保护内容；实现首屏品牌展示、导航触达、品类浏览和底部联系转化。技术方案
采用 Vite + Vue 2（Options API），尽量使用 HTML/CSS/JavaScript，最小化依赖，引入
本地 Mock 数据驱动页面内容，并通过自动化测试保障关键用户故事。

## Technical Context

<!--
  ACTION REQUIRED: Replace the content in this section with the technical details
  for the project. The structure here is presented in advisory capacity to guide
  the iteration process.
-->

**Language/Version**: JavaScript (ES2020+) + Vue 2.7.x（Options API） + HTML5 + CSS3  
**Primary Dependencies**: `vue@2.7`, `vite`, `@vitejs/plugin-vue2`（必需）；测试依赖仅保留 `vitest`, `@vue/test-utils`, `jsdom`  
**Storage**: N/A（静态站点；使用本地 Mock JSON 文件）  
**Testing**: Vitest（单元 + 组件集成 + 场景验收）  
**Target Platform**: 现代桌面与移动浏览器（Chrome/Edge/Safari 最近两个主版本）
**Project Type**: 前端 Web 应用（单仓单前端项目）  
**Performance Goals**: 首屏主要内容可见 <= 3s；导航交互反馈 <= 300ms；LCP <= 2.5s（常见网络条件）  
**Constraints**: 尽量少引入依赖；以 HTML/CSS/JavaScript 为主；Mock 数据优先；兼容移动端与桌面端  
**Scale/Scope**: 1 个官网首页，4-6 个主要内容区块，10-20 条 Mock 内容项

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

### Pre-Design Gate Check

- **Code Quality Gate**: PASS
  - 计划采用组件分层、可复用样式令牌、脚本/样式/模板职责分离；CI 执行静态检查与测试。
- **Testing Gate**: PASS
  - 每个用户故事预置自动化验收场景；单元测试覆盖数据映射与关键交互逻辑。
- **UX Consistency Gate**: PASS
  - 统一导航、按钮、卡片、状态反馈模式；偏离参考站点的部分（品牌文案、素材）仅使用自有/Mock 内容。
- **Performance Gate**: PASS
  - 已定义 LCP、首屏可见时间与交互反馈预算，并在验收阶段用 Lighthouse + 运行时指标验证。
- **Evidence Gate**: PASS
  - 交付证据包括：测试报告、关键页面截图、Lighthouse 报告、Mock 数据清单。

### Post-Design Gate Re-Check

- **Code Quality Gate**: PASS（数据模型、契约、快速启动步骤已约束模块边界与命名规范）
- **Testing Gate**: PASS（Quickstart 提供单元/验收执行步骤；契约定义可验证输入输出）
- **UX Consistency Gate**: PASS（UI 契约明确设计令牌与状态行为）
- **Performance Gate**: PASS（预算与测量方法已落地到 Quickstart）
- **Evidence Gate**: PASS（实现阶段要求产出测试、截图、性能报告）

## Project Structure

### Documentation (this feature)

```text
specs/001-company-homepage/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (/speckit.plan command)
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)
<!--
  ACTION REQUIRED: Replace the placeholder tree below with the concrete layout
  for this feature. Delete unused options and expand the chosen structure with
  real paths (e.g., apps/admin, packages/something). The delivered plan must
  not include Option labels.
-->

```text
frontend/
├── index.html
├── src/
│   ├── main.js
│   ├── App.vue
│   ├── assets/
│   │   ├── styles/
│   │   │   ├── tokens.css
│   │   │   ├── base.css
│   │   │   └── homepage.css
│   │   └── images/
│   ├── components/
│   │   ├── layout/
│   │   ├── sections/
│   │   └── common/
│   ├── mock/
│   │   └── homepage.json
│   ├── services/
│   │   └── homepageContent.js
│   └── utils/
│       └── contentMapper.js
└── tests/
  ├── unit/
  ├── integration/
  └── contract/
```

**Structure Decision**: 采用单前端 Web 应用结构（`frontend/`）以匹配 Vite + Vue2 的最小依赖目标；
通过 `src/mock/homepage.json` 管理 Mock 数据，通过 `tests/contract` 维护数据契约验证。

## Complexity Tracking

无宪章违规项，无需复杂度豁免记录。

- Violation: N/A
- Why Needed: N/A
- Simpler Alternative Rejected Because: N/A
