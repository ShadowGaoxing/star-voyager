# 星际航行者 — 个人作品集网站设计文档

## 项目概览

| 字段 | 内容 |
|------|------|
| 项目名称 | Star Voyager Portfolio / 星际航行者 |
| 作者 | 高兴 (Gao Xing) |
| 主题 | 宇宙星空为视觉隐喻，代表从保定到悉尼、探索AI宇宙的旅程 |
| 技术栈 | Next.js + Tailwind CSS |
| 部署目标 | Vercel / Netlify / GitHub Pages |
| 输出目录 | `E:\网页` |

---

## 1. 技术架构

### 1.1 技术选型

| 层 | 选择 | 原因 |
|---|------|------|
| 框架 | Next.js 14 (App Router) | 支持SSR/SSG，路由系统简洁，生态成熟 |
| 样式 | Tailwind CSS | 原子化CSS，快速迭代，深色模式原生支持 |
| 图标 | Phosphor Icons (React) | 线条风格，1.5px粗细，与设计风格一致 |
| 字体 | Noto Sans SC + Space Grotesk | 中文用思源黑体，英文用Space Grotesk科技感字体 |
| 粒子动画 | Canvas API (自实现) | 性能优于DOM操作，GPU加速 |
| 中英文切换 | i18n JSON + React Context | 轻量无依赖，localStorage持久化 |

### 1.2 项目结构

```
star-voyager/
├── public/
│   ├── locales/
│   │   ├── zh.json          # 中文文案
│   │   └── en.json          # 英文文案
│   └── images/
│       └── avatar.jpg       # 个人头像
├── src/
│   ├── app/
│   │   ├── layout.tsx        # 根布局（字体、全局样式）
│   │   ├── page.tsx          # 首页（单页滚动）
│   │   └── globals.css       # 全局样式 + Tailwind
│   ├── components/
│   │   ├── sections/
│   │   │   ├── Hero.tsx          # 首页大标题 + 打字机效果
│   │   │   ├── About.tsx         # 关于我
│   │   │   ├── Projects.tsx      # 项目展示
│   │   │   ├── Skills.tsx        # 能力清单
│   │   │   ├── Timeline.tsx      # 时间线
│   │   │   └── Contact.tsx       # 联系方式
│   │   ├── ui/
│   │   │   ├── StarField.tsx     # Canvas粒子星空
│   │   │   ├── TypeWriter.tsx    # 打字机效果组件
│   │   │   ├── LanguageToggle.tsx # 中英文切换按钮
│   │   │   ├── ScrollIndicator.tsx # 滚动提示
│   │   │   └── SectionDivider.tsx # 板块分隔线（星轨主题）
│   │   └── layout/
│   │       ├── Navbar.tsx        # 顶部导航
│   │       └── Footer.tsx        # 页脚
│   ├── contexts/
│   │   └── LanguageContext.tsx    # 语言状态管理
│   ├── hooks/
│   │   ├── useScrollProgress.ts  # 滚动进度检测
│   │   ├── useInView.ts          # 元素进入视口检测
│   │   └── useTypewriter.ts      # 打字机效果hook
│   └── lib/
│       └── i18n.ts               # 国际化工具函数
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## 2. 视觉设计

### 2.1 色彩系统

| Token | 色值 | 用途 |
|-------|------|------|
| `--bg-primary` | `#0a0a1a` | 页面背景（深蓝黑） |
| `--bg-card` | `rgba(255,255,255,0.03)` | 卡片背景 |
| `--bg-card-hover` | `rgba(255,255,255,0.06)` | 卡片悬浮背景 |
| `--border` | `rgba(255,255,255,0.08)` | 边框/分隔线 |
| `--text-primary` | `#e8e8ed` | 主文字 |
| `--text-secondary` | `rgba(255,255,255,0.55)` | 次要文字 |
| `--text-muted` | `rgba(255,255,255,0.35)` | 辅助文字 |
| `--accent-gold` | `#f0c040` | 金色强调色 |
| `--accent-gold-dark` | `#d4a020` | 金色深色变体 |
| `--accent-purple` | `#a78bfa` | 紫色强调色 |
| `--accent-blue` | `#93c5fd` | 蓝色强调色 |

**渐变用法：**
- Hero标题：`linear-gradient(135deg, #e8e8ed 30%, rgba(232,232,237,0.6))`
- 名字强调：`linear-gradient(135deg, #f0c040, #d4a020)`
- 技能进度条：按类别使用不同渐变方向
- 时间线连接线：`linear-gradient(to bottom, #f0c040, #a78bfa, #3b82f6, transparent)`

### 2.2 字体系统

```css
/* 中文：Noto Sans SC */
/* 英文：Space Grotesk (headings) + Inter (body) */

h1: 4rem / 700 / -0.03em    /* Hero大标题 */
h2: 1.8rem / 600 / -0.02em  /* 板块标题 */
h3: 1.3rem / 600 / -0.02em  /* 卡片标题 */
body: 0.9rem / 400 / 0.02em /* 正文 */
caption: 0.75rem / 500 / 0.1em /* 标签/标注 */
small: 0.7rem               /* 辅助文字 */
```

### 2.3 间距规范

- 板块间距：`4rem` padding 上下
- 板块分隔：`1px solid rgba(255,255,255,0.08)` 边框线
- 卡片内边距：`1.5rem` / `2rem`
- 卡片间距：`1rem` (网格gap)
- 元素间距：使用 `0.5rem` / `0.75rem` / `1rem` / `1.5rem` 层级

### 2.4 圆角规范

- 卡片：`12px` / `16px`
- 按钮/标签：`100px` (药丸形)
- 头像：`50%`
- 输入框：`8px`

---

## 3. 板块详细设计

### 3.1 Hero Section

**布局：** 全屏居中，垂直方向 flex，上下留白 5rem

```
┌─────────────────────────────────┐
│          Portfolio 2026          │  ← 小标签 0.75rem 灰色大写
│                                 │
│       探索者 · 高兴              │  ← 4rem 白→灰渐变 + 金色强调
│                                 │
│  PM · AI Explorer · Star Traveler│ ← 1.1rem 灰
│                                 │
│        [View My Work →]         │  ← 金色渐变按钮 100px圆角
└─────────────────────────────────┘
```

**动效：**
- 页面加载：小标签先 fade in → 标题 typing effect → 副标题 fade → 按钮弹入
- 背景：Canvas 粒子星空持续动画
- 滚动提示：底部自动隐藏

**组件：** `Hero.tsx` + `StarField.tsx` + `TypeWriter.tsx`

### 3.2 About Section

**布局：** 2列网格 (1fr / 2fr)，左列居中，右列左对齐

| 左列 | 右列 |
|------|------|
| 圆形头像 (160px) + 星轨边框 | Section 标签 "About" |
| 性格标签（药丸形） | 引言引用块 |
| | 教育/地点/语言信息网格 (3列) |

**动效：** 滚动进入视口时，从左到右依次 reveal

### 3.3 Projects Section

**布局：** Featured + Grid 混合布局

**Featured Project (瑞幸AI Agent)：**
```
┌──────────────────────┬──────────────────┐
│                      │  AI Agent (标签)  │
│   项目封面图          │  瑞幸私域 AI Agent │
│   (渐变背景占位)      │  描述文字...       │
│                      │  [LangChain] [DeepSeek] [RAG] │
└──────────────────────┴──────────────────┘
```

**Grid (其余3个项目)：** 2x2网格，每列包含封面缩略图 + 分类标签 + 标题 + 简述

| # | 项目 | 标签 |
|---|------|------|
| 2 | 农作物遥感分类PRD | ML Product |
| 3 | 个人AI知识库系统 | Knowledge System |
| 4 | 小红书账号运营准备中 | Content Strategy |
| 5 | 抖音账号运营准备中 | Content Strategy |

**动效：** 卡片悬浮上浮 + 边框发光 + 微阴影变化

### 3.4 Skills Section

**布局：** 2列网格，每列一个技能组卡片

每张卡片包含：
- 组标题（带emoji图标）
- 3-4个技能项，每项包含名称 + 百分比 + 进度条

进度条设计：4px 高，圆角，渐变色，百分比用彩色数字标注

**动效：** 滚动进入视口时，进度条从 0 填充到指定百分比

### 3.5 Timeline Section

**布局：** 左侧竖线 + 时间节点

```
● 2026 · Present   求职中 · AI产品经理方向
│
● 2026             悉尼大学 · CS硕士毕业
│
● 2024             詹姆斯库克大学 · IT本科毕业
│
```

- 竖线：渐变 `#f0c040 → #a78bfa → #3b82f6 → transparent`
- 圆点：对应年份着色（金→紫→蓝）
- 每个节点包含：年份标签 + 标题 + 描述

**动效：** 滚动进入视口时，节点依次亮起（从底部淡入）

### 3.6 Contact Section

**布局：** 居中，简洁有力

```
      Get in Touch
  Let's build something
  out of this world.    ← 金色渐变
  ─────────────────────
  [联系我]              ← 金色渐变按钮，跳转至联系表单或邮箱
  ─────────────────────
  email · GitHub · LinkedIn
```

**按钮：** "联系我" 金色渐变按钮，与 Hero CTA 风格一致，点击可跳转邮箱或展开联系表单

**动效：** 无复杂动效，保持简洁

---

## 4. 交互与动效规范

### 4.1 滚动触发动画

| 元素 | 动画 | 参数 |
|------|------|------|
| 板块进入视口 | fade-in + slide-up | 透明度 0→1, translateY(30px)→0, 0.6s ease-out |
| 时间线节点 | 依次亮起 | 每个节点延迟 0.15s，stagger |
| 技能进度条 | 宽度填充 | 0→目标%, 1s ease-out |
| 项目卡片 | 悬浮上浮 | translateY(0)→(-4px), 0.3s, 阴影加深 |

### 4.2 悬浮效果

- **卡片：** translateY -4px, box-shadow 增强, 边框发光 (rgba(240,192,64,0.2))
- **按钮：** 光晕扩散 (box-shadow spread 增加)
- **链接：** 下划线从中间向两端渐变动画

### 4.3 加载效果

- **星空背景：** Canvas粒子从中心扩散，模拟"星系诞生"，持续2s
- **标题文字：** typing effect，光标闪烁
- **整体：** 内容块按顺序 staggered fade-in

---

## 5. 中英文切换 (i18n)

### 5.1 工作原理

```
LanguageContext
  ├── state: 'zh' | 'en'
  ├── 初始化: localStorage.getItem('lang') || 'zh'
  ├── toggle(): 切换语言 + 更新localStorage + 更新<html lang>
  └── t(key): 从对应JSON中取值
```

### 5.2 切换按钮行为

| 当前语言 | 按钮显示 | 点击后 |
|---------|---------|--------|
| 中文 | "English" | 所有内容变为英文 |
| English | "中文" | 所有内容变为中文 |

### 5.3 文案结构

```json
// zh.json
{
  "nav": {
    "about": "关于",
    "work": "项目",
    "skills": "能力",
    "timeline": "历程",
    "contact": "联系"
  },
  "hero": {
    "label": "作品集 2026",
    "title": "探索者 · 高兴",
    "subtitle": "产品经理 · AI探索者 · 星际旅行者",
    "cta": "查看我的作品 →"
  },
  "about": {
    "sectionLabel": "关于我",
    "quote": "从保定到悉尼，从代码到产品，我在寻找属于自己的轨道。",
    "education": "悉尼大学 · CS硕士 · 2026",
    "tags": ["温暖", "好奇", "有执行力"]
  },
  // ... 每个板块
}
```

---

## 6. 响应式设计

### 6.1 断点

| 断点 | 宽度 | 布局调整 |
|------|------|---------|
| 桌面 | >1024px | 多列布局，粒子数 150 |
| 平板 | 768-1024px | 双列/单列自适应，粒子数 80 |
| 手机 | <768px | 单列，粒子数 40，汉堡菜单 |

### 6.2 关键响应式行为

- **导航：** 桌面端完整显示，手机端折叠为汉堡菜单
- **About：** 桌面2列，手机堆叠为单列
- **Projects：** 桌面 featured + 2列grid，手机全部单列
- **Skills：** 桌面2列，手机单列
- **Hero字体：** 桌面 4rem，平板 3rem，手机 2rem
- **板块间距：** 桌面 4rem padding，手机 2.5rem
- **按钮尺寸：** 手机端 min 44px 触摸友好

---

## 7. 性能优化

| 策略 | 措施 |
|------|------|
| Canvas渲染 | 粒子星空用Canvas API，不用DOM元素 |
| 图片加载 | Next.js `<Image>` + lazy loading |
| 动画GPU加速 | 使用 CSS transform + opacity（GPU合成） |
| 字体加载 | Google Fonts preconnect + swap |
| 首屏优先 | Critical CSS inline，非首屏组件动态导入 |
| 粒子数量自适应 | 根据视口宽度动态调整粒子数 |

---

## 8. 部署

### 8.1 构建命令

```bash
npm run build    # next build
npm run export   # static export (可选，用于GitHub Pages)
```

### 8.2 部署目标

- **首选：** Vercel (Next.js原生支持)
- **备选：** GitHub Pages (需 `next export` 静态导出)
- **备选：** Netlify (需 `next build` 配置)

### 8.3 环境要求

- Node.js 18+
- npm 9+

---

## 9. 组件依赖图

```
layout.tsx
├── LanguageContext.Provider
├── Navbar
│   ├── LanguageToggle
│   └── ScrollIndicator
├── page.tsx
│   ├── Hero
│   │   ├── StarField (Canvas)
│   │   └── TypeWriter
│   ├── About
│   ├── Projects
│   ├── Skills
│   ├── Timeline
│   └── Contact
└── Footer
```

---

## 10. 阶段划分

### Phase 1: 项目脚手架
- Next.js + Tailwind 初始化
- 字体配置 (Noto Sans SC, Space Grotesk)
- 基础布局 + 色彩系统 + 全局样式

### Phase 2: 核心组件
- LanguageContext + i18n 系统
- Navbar + LanguageToggle
- Hero + StarField + TypeWriter
- About / Projects / Skills / Timeline / Contact

### Phase 3: 动效与交互
- Scroll-triggered 动画
- 粒子系统性能优化
- 响应式适配

### Phase 3b (可选增强): 双主题切换
- 深邃星空 (当前 #0a0a1a) ↔ 黎明日出 (暖色亮主题)
- 主题通过 LanguageContext 同级的状态管理切换
- 存储在 localStorage

### Phase 4: 内容填充与部署
- 中英文文案填充
- 图片资源准备
- 构建测试
- 部署上线
