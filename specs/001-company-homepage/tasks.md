# Tasks: 公司官网首页（参考珍贝风格）

**Input**: Design documents from `/specs/001-company-homepage/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/, quickstart.md

**Tests**: 测试任务为必需项；每个用户故事均包含契约/集成/单元测试。
**Organization**: 任务按用户故事分组，确保每个故事可独立实现与验证。

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: 初始化 Vite + Vue2 工程与最小依赖开发环境

- [x] T001 创建前端项目目录骨架于 frontend/
- [x] T002 初始化 Vite + Vue2 依赖配置于 frontend/package.json
- [x] T003 [P] 配置 Vite Vue2 插件与开发脚本于 frontend/vite.config.js
- [x] T004 [P] 创建应用入口并挂载根组件于 frontend/src/main.js
- [x] T005 [P] 创建首页根组件骨架于 frontend/src/App.vue
- [x] T006 [P] 配置基础样式与 reset 规则于 frontend/src/assets/styles/base.css
- [x] T007 配置测试运行环境与命令于 frontend/vitest.config.js

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: 搭建所有用户故事共用的基础能力（Mock 数据、样式令牌、公共组件、状态管理）

**⚠️ CRITICAL**: 本阶段完成前不得进入任一用户故事实现

- [x] T008 创建首页 Mock 数据文件并填充基础结构于 frontend/src/mock/homepage.json
- [x] T009 [P] 实现 Mock 数据读取服务于 frontend/src/services/homepageContent.js
- [x] T010 [P] 实现内容映射与数据校验工具于 frontend/src/utils/contentMapper.js
- [x] T011 [P] 落地全局设计令牌（颜色/字体/间距）于 frontend/src/assets/styles/tokens.css
- [x] T012 [P] 创建统一页面状态组件（loading/empty/error）于 frontend/src/components/common/PageState.vue
- [x] T013 [P] 创建页面布局容器组件（header/main/footer）于 frontend/src/components/layout/PageShell.vue
- [x] T014 编写 Mock 数据契约校验测试于 frontend/tests/contract/homepageContent.contract.test.js

**Checkpoint**: Foundation ready - 用户故事可开始并行开发

---

## Phase 3: User Story 1 - 首屏品牌展示与导航触达 (Priority: P1) 🎯 MVP

**Goal**: 用户进入首页即可理解品牌定位并通过导航触达关键栏目

**Independent Test**: 打开首页后，验证首屏信息完整、导航点击可定位到目标区块（桌面与移动均可）

### Tests for User Story 1 (REQUIRED)

- [x] T015 [P] [US1] 编写首屏内容契约测试于 frontend/tests/contract/heroNavigation.contract.test.js
- [x] T016 [P] [US1] 编写导航触达集成测试于 frontend/tests/integration/navigationFlow.integration.test.js
- [x] T017 [P] [US1] 编写首屏与导航逻辑单元测试于 frontend/tests/unit/heroNav.unit.test.js

### Implementation for User Story 1

- [x] T018 [P] [US1] 实现站点头部导航组件于 frontend/src/components/layout/SiteHeader.vue
- [x] T019 [P] [US1] 实现首屏品牌展示区组件于 frontend/src/components/sections/HeroSection.vue
- [x] T020 [US1] 实现导航锡点滚动与高亮逻辑于 frontend/src/utils/scrollSpy.js
- [x] T021 [US1] 将头部与首屏接入首页组合渲染于 frontend/src/App.vue
- [x] T022 [US1] 实现移动端导航折叠与展开交互于 frontend/src/components/layout/MobileNav.vue
- [x] T023 [US1] 完成 US1 的状态文案一致性与异常降级处理于 frontend/src/components/sections/HeroSection.vue
- [x] T024 [US1] 记录 US1 性能验证脚本与阈値检查于 frontend/tests/integration/us1-performance.integration.test.js

**Checkpoint**: User Story 1 可独立演示与验收（MVP）

---

## Phase 4: User Story 2 - 品类与主推内容浏览 (Priority: P2)

**Goal**: 用户可浏览核心品类并进入对应详情承接位置

**Independent Test**: 仅通过品类区即可识别 3+ 品类并触发“了解更多”跳转

### Tests for User Story 2 (REQUIRED)

- [x] T025 [P] [US2] 编写品类数据契约测试于 frontend/tests/contract/categories.contract.test.js
- [x] T026 [P] [US2] 编写品类浏览与跳转集成测试于 frontend/tests/integration/categoriesFlow.integration.test.js
- [x] T027 [P] [US2] 编写品类映射与容错单元测试于 frontend/tests/unit/categoriesMapper.unit.test.js

### Implementation for User Story 2

- [x] T028 [P] [US2] 实现品类卡片组件于 frontend/src/components/sections/CategoryCard.vue
- [x] T029 [P] [US2] 实现品类列表区块组件于 frontend/src/components/sections/CategoriesSection.vue
- [x] T030 [P] [US2] 实现品牌故事区块组件于 frontend/src/components/sections/BrandStorySection.vue
- [x] T031 [US2] 接入品类与品牌故事数据渲染逻辑于 frontend/src/App.vue
- [x] T032 [US2] 实现品类空态与异常态降级展示于 frontend/src/components/sections/CategoriesSection.vue
- [x] T033 [US2] 对齐 US2 文案/按钮/状态的一致性样式于 frontend/src/assets/styles/homepage.css
- [x] T034 [US2] 添加 US2 性能预算验证测试于 frontend/tests/integration/us2-performance.integration.test.js

**Checkpoint**: User Story 1 与 User Story 2 均可独立通过验收

---

## Phase 5: User Story 3 - 品牌信任与联系转化 (Priority: P3)

**Goal**: 用户可在底部获取可信信息并直接发起联系动作

**Independent Test**: 到达底部后可看到公司信息并成功触发电话/邮箱联系行为

### Tests for User Story 3 (REQUIRED)

- [x] T035 [P] [US3] 编写联系信息契约测试于 frontend/tests/contract/contact.contract.test.js
- [x] T036 [P] [US3] 编写联系动作集成测试于 frontend/tests/integration/contactFlow.integration.test.js
- [x] T037 [P] [US3] 编写联系方式格式与可用性单元测试于 frontend/tests/unit/contact.unit.test.js

### Implementation for User Story 3

- [x] T038 [P] [US3] 实现底部联系信息区块组件于 frontend/src/components/sections/ContactSection.vue
- [x] T039 [P] [US3] 实现站点页脚组件于 frontend/src/components/layout/SiteFooter.vue
- [x] T040 [US3] 接入联系信息数据渲染与动作触发逻辑于 frontend/src/App.vue
- [x] T041 [US3] 完成 US3 错误态与恢复操作体验于 frontend/src/components/sections/ContactSection.vue
- [x] T042 [US3] 对齐 US3 交互反馈与文案一致性于 frontend/src/assets/styles/homepage.css
- [x] T043 [US3] 添加 US3 性能预算验证测试于 frontend/tests/integration/us3-performance.integration.test.js

**Checkpoint**: 全部用户故事可独立运行并通过测试

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: 跨故事优化、质量收口与交付证据沉淀

- [x] T044 [P] 补充首页响应式断点与细节修正于 frontend/src/assets/styles/homepage.css
- [x] T045 [P] 补充可访问性属性与键盘导航支持于 frontend/src/App.vue
- [x] T046 整理并固化 Mock 数据内容清单于 frontend/src/mock/homepage.json
- [x] T047 运行 quickstart 验收流程并记录结果于 specs/001-company-homepage/quickstart.md
- [x] T048 汇总 Lighthouse 性能证据与截图路径于 specs/001-company-homepage/quickstart.md
- [x] T049 代码清理与无用样式移除于 frontend/src/assets/styles/base.css

---

## Dependencies & Execution Order

### Phase Dependencies

- Setup (Phase 1): 可立即开始
- Foundational (Phase 2): 依赖 Phase 1 完成，且阻塞全部用户故事
- User Story Phases (Phase 3-5): 依赖 Phase 2 完成；随后可并行或按优先级推进
- Polish (Phase 6): 依赖目标用户故事全部完成

### User Story Dependencies

- US1 (P1): 仅依赖 Foundational，作为 MVP 最先交付
- US2 (P2): 依赖 Foundational；可与 US1 并行，但默认在 US1 后推进以降低风险
- US3 (P3): 依赖 Foundational；可与 US2 并行

### Within Each User Story

- 先测试（契约/集成/单元）再实现
- 先组件基础再集成到 App
- 最后执行一致性与性能验证

### Parallel Opportunities

- Phase 1: T003-T006 可并行
- Phase 2: T009-T013 可并行，T014 需在 T008-T010 后执行
- US1: T015-T017 并行；T018-T019 并行；T022 可与 T020 并行
- US2: T025-T027 并行；T028-T030 并行
- US3: T035-T037 并行；T038-T039 并行
- Polish: T044 与 T045 可并行

---

## Parallel Example: User Story 1

```bash
# 并行启动 US1 测试任务
Task: "T015 [US1] frontend/tests/contract/heroNavigation.contract.test.js"
Task: "T016 [US1] frontend/tests/integration/navigationFlow.integration.test.js"
Task: "T017 [US1] frontend/tests/unit/heroNav.unit.test.js"

# 并行开发 US1 组件
Task: "T018 [US1] frontend/src/components/layout/SiteHeader.vue"
Task: "T019 [US1] frontend/src/components/sections/HeroSection.vue"
```

---

## Implementation Strategy

### MVP First (US1)

1. 完成 Phase 1 + Phase 2
2. 完成 Phase 3（US1）
3. 执行 US1 独立验收后再继续

### Incremental Delivery

1. 交付 US1（首屏 + 导航）
2. 交付 US2（品类 + 品牌故事）
3. 交付 US3（联系转化）
4. 统一做 Phase 6 收口

### Parallel Team Strategy

1. 开发 A：US1
2. 开发 B：US2
3. 开发 C：US3
4. 共同完成 Phase 6

---

## Notes

- 所有任务均采用 `- [ ] Txxx ...` 清单格式。
- 标记 `[P]` 的任务可并行，前提是不修改同一文件。
- 每个用户故事都可独立测试和演示。
- 若新增依赖，需在 PR 中说明必要性与替代方案评估。
