# Data Model: 公司官网首页

## 1. HomePageConfig

- Description: 首页整体配置，决定页面区块顺序与开关。
- Fields:
  - id: string，固定配置标识。
  - version: string，配置版本号。
  - locale: string，语言标识（如 zh-CN）。
  - sections: SectionConfig[]，区块配置数组。
  - seo: SeoMeta，SEO 元信息。
- Validation:
  - id/version/locale 必填。
  - sections 至少包含 hero、categories、contact 三类关键区块。

## 2. SectionConfig

- Description: 单个页面区块配置。
- Fields:
  - key: string，区块键（hero/about/categories/contact）。
  - enabled: boolean，是否启用。
  - order: number，显示顺序。
  - title: string，区块标题。
  - subtitle: string，可选副标题。
- Validation:
  - key 必须唯一。
  - order 必须为非负整数。

## 3. NavItem

- Description: 顶部导航项。
- Fields:
  - id: string，导航项标识。
  - label: string，显示名称。
  - targetType: enum("anchor", "route", "external")。
  - target: string，目标锚点或路径。
  - priority: number，排序权重。
  - visible: boolean，是否展示。
- Validation:
  - label/target 必填。
  - targetType=anchor 时 target 必须以 # 开头。

## 4. HeroContent

- Description: 首屏品牌主视觉与文案。
- Fields:
  - heading: string，主标题。
  - tagline: string，核心价值短句。
  - description: string，品牌描述。
  - ctaLabel: string，主按钮文案。
  - ctaTarget: string，主按钮目标。
  - mediaType: enum("image", "video")。
  - mediaUrl: string，媒体地址（Mock 占位）。
  - mediaAlt: string，替代文本。
- Validation:
  - heading/tagline/ctaLabel/ctaTarget 必填。
  - mediaType 与 mediaUrl 必须成对有效。

## 5. CategoryCard

- Description: 品类展示卡片。
- Fields:
  - id: string，品类标识。
  - name: string，品类名称。
  - summary: string，简要介绍。
  - imageUrl: string，封面图。
  - imageAlt: string，封面替代文本。
  - actionLabel: string，动作文案。
  - actionTarget: string，详情目标。
  - badge: string，可选标签。
- Validation:
  - name/actionLabel/actionTarget 必填。
  - 至少提供 3 条有效品类数据。

## 6. BrandStoryBlock

- Description: 品牌故事摘要区块。
- Fields:
  - title: string，区块标题。
  - paragraphs: string[]，段落内容。
  - highlightPhrases: string[]，强调语句。
  - detailLink: string，了解更多链接。
- Validation:
  - paragraphs 至少 2 段。
  - detailLink 可为空；为空时 UI 不渲染按钮。

## 7. ContactInfo

- Description: 底部联系信息。
- Fields:
  - companyName: string。
  - copyright: string。
  - recordNumber: string，备案号或等效资质信息。
  - phone: string，可拨号。
  - serviceHours: string。
  - email: string。
  - socialLinks: SocialLink[]。
- Validation:
  - companyName 和至少一种联系方式（phone/email）必填。

## 8. SocialLink

- Description: 社媒或私域入口。
- Fields:
  - type: enum("wechat", "wecom", "xiaohongshu", "weibo", "other")。
  - label: string。
  - url: string。
  - qrImageUrl: string，可选。
- Validation:
  - label/url 必填。

## 状态与转换

- Loading: 初始加载 Mock 数据。
- Ready: 数据合法并完成渲染。
- Empty: 数据为空，显示空态模块。
- Error: 数据读取失败或结构不合法，显示错误态与恢复入口。

转换规则:

- Loading -> Ready：数据验证通过。
- Loading -> Empty：关键数组为空但结构合法。
- Loading -> Error：文件不可读或结构校验失败。
- Error -> Loading：用户触发重试。
