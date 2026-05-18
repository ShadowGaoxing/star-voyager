# 星际航行者 — 实施计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a personal portfolio website "Star Voyager" with Next.js + Tailwind CSS featuring particle starfield, i18n, scroll animations, and responsive design.

**Architecture:** Single-page Next.js 14 App Router site with 6 scrollable sections. Language state managed via React Context + localStorage. Starfield rendered on Canvas. All animations use CSS transforms for GPU acceleration.

**Tech Stack:** Next.js 14 (App Router), TypeScript, Tailwind CSS, Phosphor Icons, Google Fonts (Noto Sans SC + Space Grotesk)

---

### Task 1: Initialize Next.js project

**Files:**
- Create: `E:\网页\package.json`
- Create: `E:\网页\tsconfig.json`
- Create: `E:\网页\next.config.ts`
- Create: `E:\网页\tailwind.config.ts`
- Create: `E:\网页\postcss.config.js`
- Create: `E:\网页\src\app\globals.css`

- [ ] **Step 1: Create package.json**

```json
{
  "name": "star-voyager",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "next": "^14.2.0",
    "react": "^18.3.0",
    "react-dom": "^18.3.0",
    "@phosphor-icons/react": "^2.1.0"
  },
  "devDependencies": {
    "@types/node": "^20.0.0",
    "@types/react": "^18.3.0",
    "@types/react-dom": "^18.3.0",
    "typescript": "^5.4.0",
    "tailwindcss": "^3.4.0",
    "postcss": "^8.4.0",
    "autoprefixer": "^10.4.0"
  }
}
```

- [ ] **Step 2: Create tsconfig.json**

```json
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": { "@/*": ["./src/*"] }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

- [ ] **Step 3: Create next.config.ts**

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
```

- [ ] **Step 4: Create postcss.config.js**

```javascript
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

- [ ] **Step 5: Create tailwind.config.ts**

```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "space-bg": "#0a0a1a",
        "space-card": "rgba(255,255,255,0.03)",
        "space-card-hover": "rgba(255,255,255,0.06)",
        "space-border": "rgba(255,255,255,0.08)",
        "gold": "#f0c040",
        "gold-dark": "#d4a020",
        "purple-accent": "#a78bfa",
        "blue-accent": "#93c5fd",
      },
      fontFamily: {
        sans: ["Noto Sans SC", "Inter", "sans-serif"],
        display: ["Space Grotesk", "sans-serif"],
      },
      animation: {
        "fade-in-up": "fadeInUp 0.6s ease-out forwards",
        "glow": "glow 2s ease-in-out infinite alternate",
      },
      keyframes: {
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        glow: {
          "0%": { boxShadow: "0 0 5px rgba(240,192,64,0.2)" },
          "100%": { boxShadow: "0 0 20px rgba(240,192,64,0.4)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
```

- [ ] **Step 6: Create src/app/globals.css**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500&display=swap');

:root {
  --bg-primary: #0a0a1a;
  --bg-card: rgba(255,255,255,0.03);
  --bg-card-hover: rgba(255,255,255,0.06);
  --border: rgba(255,255,255,0.08);
  --text-primary: #e8e8ed;
  --text-secondary: rgba(255,255,255,0.55);
  --text-muted: rgba(255,255,255,0.35);
  --accent-gold: #f0c040;
  --accent-purple: #a78bfa;
  --accent-blue: #93c5fd;
}

* {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  background-color: var(--bg-primary);
  color: var(--text-primary);
  font-family: 'Noto Sans SC', 'Inter', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

::selection {
  background: rgba(240, 192, 64, 0.3);
  color: #fff;
}

@layer components {
  .section-container {
    @apply max-w-6xl mx-auto px-6 md:px-12 py-16 md:py-24;
  }

  .section-label {
    @apply text-xs tracking-[0.1em] uppercase text-gold font-medium mb-3;
  }

  .section-title {
    @apply text-3xl md:text-4xl font-semibold tracking-tight text-[#e8e8ed];
  }

  .gold-gradient {
    @apply bg-gradient-to-r from-gold to-gold-dark bg-clip-text text-transparent;
  }

  .card-base {
    @apply bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] rounded-xl;
  }

  .card-hover {
    @apply transition-all duration-300 ease-out;
  }

  .card-hover:hover {
    @apply -translate-y-1;
    box-shadow: 0 8px 30px rgba(240, 192, 64, 0.08);
    border-color: rgba(240, 192, 64, 0.2);
  }

  .btn-primary {
    @apply inline-block px-8 py-3 rounded-full font-semibold text-sm tracking-wide;
    background: linear-gradient(135deg, #f0c040, #d4a020);
    color: #0a0a1a;
    transition: all 0.3s ease;
  }

  .btn-primary:hover {
    box-shadow: 0 0 20px rgba(240, 192, 64, 0.3);
    transform: translateY(-1px);
  }

  .tag {
    @apply text-xs px-3 py-1 rounded-full font-medium;
  }

  .tag-gold {
    @apply tag;
    background: rgba(240, 192, 64, 0.12);
    color: #f0c040;
  }

  .tag-purple {
    @apply tag;
    background: rgba(167, 139, 250, 0.12);
    color: #a78bfa;
  }

  .tag-blue {
    @apply tag;
    background: rgba(147, 197, 253, 0.12);
    color: #93c5fd;
  }

  .tag-green {
    @apply tag;
    background: rgba(110, 231, 183, 0.12);
    color: #6ee7b7;
  }

  .fade-in-section {
    opacity: 0;
    transform: translateY(30px);
    transition: opacity 0.6s ease-out, transform 0.6s ease-out;
  }

  .fade-in-section.is-visible {
    opacity: 1;
    transform: translateY(0);
  }
}
```

- [ ] **Step 7: Install dependencies**

Run: `cd "E:/网页" && npm install`
Expected: All dependencies installed, node_modules/ created.

- [ ] **Step 8: Create next-env.d.ts**

Run: `cd "E:/网页" && npx next dev --port 3099 &` then kill after TypeScript check passes.

---

### Task 2: i18n System

**Files:**
- Create: `E:\网页\public\locales\zh.json`
- Create: `E:\网页\public\locales\en.json`
- Create: `E:\网页\src\lib\i18n.ts`
- Create: `E:\网页\src\contexts\LanguageContext.tsx`

- [ ] **Step 1: Create zh.json**

```json
{
  "nav": { "about": "关于", "work": "项目", "skills": "能力", "timeline": "历程", "contact": "联系" },
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
    "location": "悉尼 · 中国",
    "language": "中文 · English",
    "tags": ["温暖", "好奇", "有执行力"]
  },
  "projects": {
    "sectionLabel": "项目精选",
    "sectionTitle": "Projects",
    "viewAll": "查看全部 →",
    "items": [
      {
        "id": "luckin",
        "category": "AI Agent",
        "title": "瑞幸私域 AI Agent",
        "description": "用LangChain + DeepSeek打造的智能运营助手，实现自动问答、用户分层与活动推荐。",
        "tags": ["LangChain", "DeepSeek", "RAG"]
      },
      {
        "id": "crop",
        "category": "ML Product",
        "title": "农作物遥感分类 PRD",
        "description": "ML模型产品化实践，从需求分析到模型部署的全流程产品方案。",
        "tags": ["ML", "PRD", "遥感"]
      },
      {
        "id": "knowledge",
        "category": "Knowledge System",
        "title": "个人AI知识库系统",
        "description": "基于RAG与多模型协作的个人知识管理平台。",
        "tags": ["RAG", "AI Agent", "知识管理"]
      },
      {
        "id": "xiaohongshu",
        "category": "Content Strategy",
        "title": "小红书账号运营准备中",
        "description": "探索内容创作与社交媒体的产品化运营策略。",
        "tags": ["内容策略", "运营", "社交媒体"]
      },
      {
        "id": "douyin",
        "category": "Content Strategy",
        "title": "抖音账号运营准备中",
        "description": "短视频平台的内容规划与增长策略设计。",
        "tags": ["内容策略", "运营", "短视频"]
      }
    ]
  },
  "skills": {
    "sectionLabel": "能力清单",
    "groups": [
      {
        "title": "🤖 AI & ML",
        "items": [
          { "name": "LLM应用开发", "level": 90 },
          { "name": "RAG系统", "level": 85 },
          { "name": "模型部署", "level": 75 }
        ]
      },
      {
        "title": "📊 产品能力",
        "items": [
          { "name": "需求分析", "level": 88 },
          { "name": "数据分析", "level": 82 },
          { "name": "PRD撰写", "level": 90 }
        ]
      },
      {
        "title": "💻 技术栈",
        "items": [
          { "name": "Python", "level": 85 },
          { "name": "LangChain", "level": 82 },
          { "name": "PyTorch", "level": 70 }
        ]
      },
      {
        "title": "🌐 语言",
        "items": [
          { "name": "中文（母语）", "level": 100 },
          { "name": "English (IELTS 7.5)", "level": 80 },
          { "name": "粤语", "level": 60 }
        ]
      }
    ]
  },
  "timeline": {
    "sectionLabel": "历程",
    "items": [
      { "year": "2026 · Present", "title": "求职中", "subtitle": "AI产品经理方向", "color": "gold" },
      { "year": "2026", "title": "悉尼大学", "subtitle": "CS硕士毕业", "color": "purple" },
      { "year": "2024", "title": "詹姆斯库克大学", "subtitle": "IT本科毕业", "color": "blue" }
    ]
  },
  "contact": {
    "sectionLabel": "联系",
    "heading1": "一起做些",
    "heading2": "有趣的事情",
    "button": "联系我",
    "email": "gaoxing@email.com"
  },
  "footer": {
    "copyright": "© 2026 高兴 · 探索者"
  }
}
```

- [ ] **Step 2: Create en.json**

```json
{
  "nav": { "about": "About", "work": "Work", "skills": "Skills", "timeline": "Timeline", "contact": "Contact" },
  "hero": {
    "label": "Portfolio 2026",
    "title": "Explorer · Gao Xing",
    "subtitle": "PM · AI Explorer · Star Traveler",
    "cta": "View My Work →"
  },
  "about": {
    "sectionLabel": "About",
    "quote": "From Baoding to Sydney, from code to product, I am finding my own orbit.",
    "education": "MCS @ University of Sydney · 2026",
    "location": "Sydney · China",
    "language": "中文 · English",
    "tags": ["Warm", "Curious", "Driven"]
  },
  "projects": {
    "sectionLabel": "Selected Work",
    "sectionTitle": "Projects",
    "viewAll": "View all →",
    "items": [
      {
        "id": "luckin",
        "category": "AI Agent",
        "title": "Luckin Coffee AI Agent",
        "description": "An intelligent operations assistant built with LangChain + DeepSeek, featuring auto-Q&A, user segmentation, and activity recommendations.",
        "tags": ["LangChain", "DeepSeek", "RAG"]
      },
      {
        "id": "crop",
        "category": "ML Product",
        "title": "Crop Classification PRD",
        "description": "End-to-end ML productization, from requirement analysis to model deployment.",
        "tags": ["ML", "PRD", "Remote Sensing"]
      },
      {
        "id": "knowledge",
        "category": "Knowledge System",
        "title": "Personal AI Knowledge Base",
        "description": "A personal knowledge management platform powered by RAG and multi-model collaboration.",
        "tags": ["RAG", "AI Agent", "Knowledge Mgmt"]
      },
      {
        "id": "xiaohongshu",
        "category": "Content Strategy",
        "title": "Xiaohongshu Account (Launching)",
        "description": "Exploring content creation and social media productization strategies.",
        "tags": ["Content Strategy", "Social Media"]
      },
      {
        "id": "douyin",
        "category": "Content Strategy",
        "title": "Douyin Account (Launching)",
        "description": "Short video platform content planning and growth strategy design.",
        "tags": ["Content Strategy", "Short Video"]
      }
    ]
  },
  "skills": {
    "sectionLabel": "Skills & Expertise",
    "groups": [
      {
        "title": "🤖 AI & ML",
        "items": [
          { "name": "LLM Applications", "level": 90 },
          { "name": "RAG Systems", "level": 85 },
          { "name": "Model Deployment", "level": 75 }
        ]
      },
      {
        "title": "📊 Product",
        "items": [
          { "name": "Requirement Analysis", "level": 88 },
          { "name": "Data Analysis", "level": 82 },
          { "name": "PRD Writing", "level": 90 }
        ]
      },
      {
        "title": "💻 Tech Stack",
        "items": [
          { "name": "Python", "level": 85 },
          { "name": "LangChain", "level": 82 },
          { "name": "PyTorch", "level": 70 }
        ]
      },
      {
        "title": "🌐 Languages",
        "items": [
          { "name": "Chinese (Native)", "level": 100 },
          { "name": "English (IELTS 7.5)", "level": 80 },
          { "name": "Cantonese", "level": 60 }
        ]
      }
    ]
  },
  "timeline": {
    "sectionLabel": "Timeline",
    "items": [
      { "year": "2026 · Present", "title": "Job Seeking", "subtitle": "AI Product Manager", "color": "gold" },
      { "year": "2026", "title": "University of Sydney", "subtitle": "MCS Graduate", "color": "purple" },
      { "year": "2024", "title": "James Cook University", "subtitle": "BIT Graduate", "color": "blue" }
    ]
  },
  "contact": {
    "sectionLabel": "Get in Touch",
    "heading1": "Let's build something",
    "heading2": "out of this world.",
    "button": "Contact Me",
    "email": "gaoxing@email.com"
  },
  "footer": {
    "copyright": "© 2026 Gao Xing · Explorer"
  }
}
```

- [ ] **Step 3: Create src/lib/i18n.ts**

```typescript
import zh from "../../public/locales/zh.json";
import en from "../../public/locales/en.json";

export type Lang = "zh" | "en";

const translations: Record<Lang, Record<string, any>> = { zh, en };

function getNestedValue(obj: Record<string, any>, path: string): string {
  const keys = path.split(".");
  let current: any = obj;
  for (const key of keys) {
    if (current[key] === undefined) return path;
    current = current[key];
  }
  return typeof current === "string" ? current : path;
}

export function t(lang: Lang, key: string): string {
  return getNestedValue(translations[lang], key);
}
```

- [ ] **Step 4: Create src/contexts/LanguageContext.tsx**

```tsx
"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import type { Lang } from "@/lib/i18n";

interface LanguageContextType {
  lang: Lang;
  toggleLang: () => void;
  setLang: (l: Lang) => void;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: "zh",
  toggleLang: () => {},
  setLang: () => {},
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("zh");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("lang") as Lang | null;
    if (stored === "zh" || stored === "en") {
      setLangState(stored);
    }
    setMounted(true);
  }, []);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    localStorage.setItem("lang", l);
    document.documentElement.lang = l === "zh" ? "zh-CN" : "en";
  }, []);

  const toggleLang = useCallback(() => {
    setLang(lang === "zh" ? "en" : "zh");
  }, [lang, setLang]);

  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, setLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
```

---

### Task 3: Layout Components (Navbar + Footer)

**Files:**
- Create: `E:\网页\src\components\layout\Navbar.tsx`
- Create: `E:\网页\src\components\layout\Footer.tsx`
- Create: `E:\网页\src\components\ui\LanguageToggle.tsx`
- Create: `E:\网页\src\components\ui\ScrollIndicator.tsx`
- Modify: `E:\网页\src\app\layout.tsx`
- Create: `E:\网页\src\app\page.tsx` (skeleton)

- [ ] **Step 1: Create LanguageToggle.tsx**

```tsx
"use client";

import { useLanguage } from "@/contexts/LanguageContext";

export default function LanguageToggle() {
  const { lang, toggleLang } = useLanguage();

  return (
    <button
      onClick={toggleLang}
      className="text-xs tracking-wide border border-gold/30 text-gold px-3 py-1.5 rounded-full hover:bg-gold/10 transition-all duration-300"
      aria-label="Toggle language"
    >
      {lang === "zh" ? "English" : "中文"}
    </button>
  );
}
```

- [ ] **Step 2: Create Navbar.tsx**

```tsx
"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { t } from "@/lib/i18n";
import LanguageToggle from "../ui/LanguageToggle";
import { List, X } from "@phosphor-icons/react";

const navKeys = ["about", "work", "skills", "timeline", "contact"] as const;

export default function Navbar() {
  const { lang } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-[#0a0a1a]/80 backdrop-blur-lg border-b border-[rgba(255,255,255,0.06)]" : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 md:px-12 h-16 flex items-center justify-between">
        <a href="#" className="text-lg font-semibold tracking-tight">
          <span className="text-gold">✦</span>{" "}
          <span className="text-[#e8e8ed]">Gaoxing</span>
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {navKeys.map((key) => (
            <a
              key={key}
              href={`#${key}`}
              className="text-sm text-[rgba(255,255,255,0.5)] hover:text-[#e8e8ed] transition-colors duration-200 tracking-wide"
            >
              {t(lang, `nav.${key}`)}
            </a>
          ))}
          <LanguageToggle />
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-[#e8e8ed]"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={24} /> : <List size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#0a0a1a]/95 backdrop-blur-lg border-b border-[rgba(255,255,255,0.06)]">
          <div className="px-6 py-4 flex flex-col gap-4">
            {navKeys.map((key) => (
              <a
                key={key}
                href={`#${key}`}
                onClick={() => setMenuOpen(false)}
                className="text-sm text-[rgba(255,255,255,0.5)] hover:text-[#e8e8ed] transition-colors"
              >
                {t(lang, `nav.${key}`)}
              </a>
            ))}
            <div className="pt-2 border-t border-[rgba(255,255,255,0.06)]">
              <LanguageToggle />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
```

- [ ] **Step 3: Create Footer.tsx**

```tsx
"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { t } from "@/lib/i18n";

export default function Footer() {
  const { lang } = useLanguage();

  return (
    <footer className="border-t border-[rgba(255,255,255,0.06)] py-6">
      <div className="max-w-6xl mx-auto px-6 md:px-12 flex justify-between items-center">
        <span className="text-xs text-[rgba(255,255,255,0.25)]">
          {t(lang, "footer.copyright")}
        </span>
        <span className="text-xs text-[rgba(255,255,255,0.25)]">✦</span>
      </div>
    </footer>
  );
}
```

- [ ] **Step 4: Create ScrollIndicator.tsx**

```tsx
"use client";

import { useEffect, useState } from "react";
import { CaretDown } from "@phosphor-icons/react";

export default function ScrollIndicator() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY < 100);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[rgba(255,255,255,0.3)] animate-glow">
      <span className="text-xs tracking-widest">向下探索</span>
      <CaretDown size={20} />
    </div>
  );
}
```

- [ ] **Step 5: Create SectionDivider.tsx**

```tsx
export default function SectionDivider() {
  return <div className="w-full h-px bg-[rgba(255,255,255,0.06)]" />;
}
```

- [ ] **Step 6: Create src/app/layout.tsx**

```tsx
import type { Metadata } from "next";
import { LanguageProvider } from "@/contexts/LanguageContext";
import Navbar from "@/components/layout/Navbar";
import "./globals.css";

export const metadata: Metadata = {
  title: "探索者 · 高兴 | Explorer · Gao Xing",
  description: "Personal portfolio of Gao Xing — PM, AI Explorer, Star Traveler",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <body className="bg-[#0a0a1a] text-[#e8e8ed] antialiased">
        <LanguageProvider>
          <Navbar />
          <main>{children}</main>
        </LanguageProvider>
      </body>
    </html>
  );
}
```

- [ ] **Step 7: Create src/app/page.tsx (skeleton)**

```tsx
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Projects from "@/components/sections/Projects";
import Skills from "@/components/sections/Skills";
import Timeline from "@/components/sections/Timeline";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Projects />
      <Skills />
      <Timeline />
      <Contact />
      <Footer />
    </>
  );
}
```

---

### Task 4: UI Components (StarField + TypeWriter)

**Files:**
- Create: `E:\网页\src\components\ui\StarField.tsx`
- Create: `E:\网页\src\components\ui\TypeWriter.tsx`

- [ ] **Step 1: Create StarField.tsx**

```tsx
"use client";

import { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  size: number;
  opacity: number;
  speed: number;
  driftX: number;
  driftY: number;
}

export default function StarField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);
  const animFrameRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Determine star count based on viewport
    const getStarCount = () => {
      if (window.innerWidth < 768) return 40;
      if (window.innerWidth < 1200) return 80;
      return 150;
    };

    const initStars = () => {
      const count = getStarCount();
      starsRef.current = Array.from({ length: count }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 1.5 + 0.3,
        opacity: Math.random() * 0.8 + 0.2,
        speed: Math.random() * 0.3 + 0.05,
        driftX: (Math.random() - 0.5) * 0.2,
        driftY: (Math.random() - 0.5) * 0.2,
      }));
    };
    initStars();

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const star of starsRef.current) {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
        ctx.fill();

        // Twinkle
        star.opacity += (Math.random() - 0.5) * 0.02;
        star.opacity = Math.max(0.1, Math.min(1, star.opacity));

        // Drift
        star.x += star.driftX * star.speed;
        star.y += star.driftY * star.speed;

        // Wrap around
        if (star.x < 0) star.x = canvas.width;
        if (star.x > canvas.width) star.x = 0;
        if (star.y < 0) star.y = canvas.height;
        if (star.y > canvas.height) star.y = 0;
      }

      animFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    // Reinitialize on resize
    const handleResize = () => {
      resize();
      initStars();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    />
  );
}
```

- [ ] **Step 2: Create TypeWriter.tsx**

```tsx
"use client";

import { useState, useEffect } from "react";

interface TypeWriterProps {
  text: string;
  speed?: number;
  className?: string;
  onComplete?: () => void;
}

export default function TypeWriter({ text, speed = 80, className = "", onComplete }: TypeWriterProps) {
  const [displayed, setDisplayed] = useState("");
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    setDisplayed("");
    setIsComplete(false);
    let i = 0;
    const interval = setInterval(() => {
      if (i < text.length) {
        setDisplayed(text.slice(0, i + 1));
        i++;
      } else {
        clearInterval(interval);
        setIsComplete(true);
        onComplete?.();
      }
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed, onComplete]);

  return (
    <span className={className}>
      {displayed}
      {!isComplete && (
        <span className="inline-block w-[2px] h-[1em] bg-gold ml-1 animate-pulse align-middle" />
      )}
    </span>
  );
}
```

---

### Task 5: Hero Section

**Files:**
- Create: `E:\网页\src\components\sections\Hero.tsx`

- [ ] **Step 1: Create Hero.tsx**

```tsx
"use client";

import { useState, useCallback } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { t } from "@/lib/i18n";
import StarField from "@/components/ui/StarField";
import TypeWriter from "@/components/ui/TypeWriter";
import ScrollIndicator from "@/components/ui/ScrollIndicator";

export default function Hero() {
  const { lang } = useLanguage();
  const [showSubtitle, setShowSubtitle] = useState(false);
  const [showCta, setShowCta] = useState(false);

  const onTitleComplete = useCallback(() => {
    setShowSubtitle(true);
    setTimeout(() => setShowCta(true), 400);
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      <StarField />

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        {/* Small label */}
        <div className="text-xs text-[rgba(255,255,255,0.35)] tracking-[0.15em] uppercase mb-6 animate-fade-in-up">
          {t(lang, "hero.label")}
        </div>

        {/* Main title */}
        <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight leading-[1.1] mb-4">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#e8e8ed] via-[#e8e8ed] to-[rgba(232,232,237,0.6)]">
            {lang === "zh" ? "探索者" : "Explorer"}
          </span>
          <span className="text-[rgba(255,255,255,0.15)] mx-2">·</span>
          <span className="gold-gradient">
            {lang === "zh" ? "高兴" : "Gao Xing"}
          </span>
        </h1>

        {/* Typewriter subtitle */}
        <div className="h-8 md:h-10 flex items-center justify-center mb-8">
          {showSubtitle && (
            <div className="text-base md:text-lg text-[rgba(255,255,255,0.5)] tracking-wide animate-fade-in-up">
              <TypeWriter
                text={t(lang, "hero.subtitle")}
                speed={60}
              />
            </div>
          )}
          {!showSubtitle && (
            <TypeWriter
              text={t(lang, "hero.subtitle")}
              speed={60}
              onComplete={onTitleComplete}
            />
          )}
        </div>

        {/* CTA Button */}
        {showCta && (
          <a
            href="#work"
            className="btn-primary inline-block animate-fade-in-up"
          >
            {t(lang, "hero.cta")}
          </a>
        )}
      </div>

      <ScrollIndicator />
    </section>
  );
}
```

---

### Task 6: About Section

**Files:**
- Create: `E:\网页\src\components\sections\About.tsx`

- [ ] **Step 1: Create About.tsx**

```tsx
"use client";

import { useRef, useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { t } from "@/lib/i18n";

function useInViewHook(options?: IntersectionObserverInit) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setIsVisible(true); observer.disconnect(); } },
      { threshold: 0.1, ...options }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [options]);

  return [ref, isVisible] as const;
}

export default function About() {
  const { lang } = useLanguage();
  const [ref, isVisible] = useInViewHook();

  const tags = t(lang, "about.tags") as unknown as string[];
  const infoItems = [
    { label: "Education", value: t(lang, "about.education") },
    { label: "Location", value: t(lang, "about.location") },
    { label: "Language", value: t(lang, "about.language") },
  ];

  return (
    <section id="about" className="section-container">
      <div
        ref={ref}
        className={`grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-8 md:gap-16 items-start transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        {/* Left: Avatar */}
        <div className="text-center md:text-left">
          <div className="w-40 h-40 rounded-full mx-auto md:mx-0 border-2 border-gold/30 bg-gradient-to-br from-gold/5 to-purple-accent/5 flex items-center justify-center mb-4">
            <span className="text-5xl opacity-50">📷</span>
          </div>
          <div className="flex gap-2 justify-center md:justify-start flex-wrap">
            {tags.map((tag: string) => (
              <span
                key={tag}
                className="text-xs text-[rgba(255,255,255,0.5)] border border-[rgba(255,255,255,0.15)] px-3 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Right: Content */}
        <div>
          <div className="section-label">{t(lang, "about.sectionLabel")}</div>
          <blockquote className="text-xl md:text-2xl font-medium leading-relaxed text-[#e8e8ed] mb-4">
            &ldquo;{t(lang, "about.quote")}&rdquo;
          </blockquote>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
            {infoItems.map((item) => (
              <div key={item.label}>
                <div className="text-xs text-[rgba(255,255,255,0.35)] uppercase tracking-wider mb-1">
                  {item.label}
                </div>
                <div className="text-sm text-[rgba(255,255,255,0.75)]">
                  {item.value}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
```

---

### Task 7: Projects Section

**Files:**
- Create: `E:\网页\src\components\sections\Projects.tsx`

- [ ] **Step 1: Create Projects.tsx**

```tsx
"use client";

import { useRef, useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { t } from "@/lib/i18n";
import { ArrowRight } from "@phosphor-icons/react";

function useInViewSimple() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, visible] as const;
}

interface ProjectItem {
  id: string;
  category: string;
  title: string;
  description: string;
  tags: string[];
}

export default function Projects() {
  const { lang } = useLanguage();
  const [ref, visible] = useInViewSimple();
  const items = t(lang, "projects.items") as unknown as ProjectItem[];
  const featureGradient = "bg-gradient-to-br from-gold/10 to-purple-accent/10";
  const gradients = [
    "bg-gradient-to-br from-purple-accent/10 to-blue-accent/10",
    "bg-gradient-to-br from-blue-accent/10 to-green-400/10",
    "bg-gradient-to-br from-gold/10 to-orange-400/10",
    "bg-gradient-to-br from-purple-accent/5 to-pink-400/10",
  ];

  const tagColorClass = (tag: string) => {
    const goldTags = ["LangChain", "DeepSeek", "RAG", "PRD"];
    const purpleTags = ["AI Agent", "ML", "Remote Sensing"];
    const greenTags = ["Content Strategy", "Social Media", "Short Video"];
    if (goldTags.includes(tag)) return "tag-gold";
    if (purpleTags.includes(tag)) return "tag-purple";
    if (greenTags.includes(tag)) return "tag-green";
    return "tag-blue";
  };

  if (!items || items.length === 0) return null;
  const [featured, ...rest] = items;

  return (
    <section id="work" className="section-container">
      <div
        ref={ref}
        className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      >
        <div className="flex justify-between items-end mb-8">
          <div>
            <div className="section-label">{t(lang, "projects.sectionLabel")}</div>
            <h2 className="section-title">{t(lang, "projects.sectionTitle")}</h2>
          </div>
          <span className="text-sm text-[rgba(255,255,255,0.35)] hidden sm:block">
            {t(lang, "projects.viewAll")}
          </span>
        </div>

        {/* Featured Project */}
        <a
          href="#"
          className="card-base card-hover grid grid-cols-1 md:grid-cols-[1.2fr_1fr] gap-0 overflow-hidden mb-4"
        >
          <div className={`${featureGradient} min-h-[200px] md:min-h-[260px] flex items-center justify-center`}>
            <span className="text-sm text-[rgba(255,255,255,0.25)]">{featured.title} — Cover</span>
          </div>
          <div className="p-6 md:p-8">
            <div className="tag-gold inline-block mb-3">{featured.category}</div>
            <h3 className="text-xl font-semibold tracking-tight text-[#e8e8ed] mb-3">{featured.title}</h3>
            <p className="text-sm text-[rgba(255,255,255,0.55)] leading-relaxed mb-4">{featured.description}</p>
            <div className="flex gap-2 flex-wrap">
              {featured.tags.map((tag: string) => (
                <span key={tag} className={tagColorClass(tag)}>{tag}</span>
              ))}
            </div>
          </div>
        </a>

        {/* Grid Projects */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {rest.map((project: ProjectItem, i: number) => (
            <a
              key={project.id}
              href="#"
              className="card-base card-hover p-5"
            >
              <div className={`${gradients[i % gradients.length]} h-28 rounded-lg mb-4 flex items-center justify-center`}>
                <span className="text-xs text-[rgba(255,255,255,0.2)]">Cover</span>
              </div>
              <div className={project.category === "Content Strategy" ? "tag-green inline-block mb-2" : "tag-purple inline-block mb-2"}>
                {project.category}
              </div>
              <h3 className="text-base font-semibold text-[#e8e8ed] mb-1">{project.title}</h3>
              <p className="text-xs text-[rgba(255,255,255,0.45)] mb-3 line-clamp-2">{project.description}</p>
              <div className="flex gap-1.5 flex-wrap">
                {project.tags.map((tag: string) => (
                  <span key={tag} className={tagColorClass(tag)}>{tag}</span>
                ))}
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
```

---

### Task 8: Skills Section

**Files:**
- Create: `E:\网页\src\components\sections\Skills.tsx`

- [ ] **Step 1: Create Skills.tsx**

```tsx
"use client";

import { useRef, useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { t } from "@/lib/i18n";

function useInViewSkills() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, visible] as const;
}

interface SkillItem {
  name: string;
  level: number;
}

interface SkillGroup {
  title: string;
  items: SkillItem[];
}

const barGradients = [
  "bg-gradient-to-r from-gold to-gold-dark",
  "bg-gradient-to-r from-purple-accent via-purple-accent to-blue-accent",
  "bg-gradient-to-r from-blue-accent to-cyan-400",
  "bg-gradient-to-r from-cyan-400 to-green-400",
];

const percentColors = ["text-gold", "text-purple-accent", "text-blue-accent", "text-green-400"];

export default function Skills() {
  const { lang } = useLanguage();
  const [ref, visible] = useInViewSkills();
  const groups = t(lang, "skills.groups") as unknown as SkillGroup[];

  if (!groups) return null;

  return (
    <section id="skills" className="section-container">
      <div ref={ref} className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
        <div className="section-label mb-8">{t(lang, "skills.sectionLabel")}</div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {groups.map((group, gi) => (
            <div key={group.title} className="card-base p-6">
              <h3 className="text-sm font-semibold text-[#e8e8ed] mb-5">{group.title}</h3>
              {group.items.map((skill, si) => (
                <div key={skill.name} className="mb-4 last:mb-0">
                  <div className="flex justify-between text-sm mb-1.5">
                    <span className="text-[rgba(255,255,255,0.55)]">{skill.name}</span>
                    <span className={percentColors[(gi + si) % 4]}>{skill.level}%</span>
                  </div>
                  <div className="h-1 bg-[rgba(255,255,255,0.06)] rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-1000 ease-out ${barGradients[gi % 4]}`}
                      style={{ width: visible ? `${skill.level}%` : "0%" }}
                    />
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

---

### Task 9: Timeline Section

**Files:**
- Create: `E:\网页\src\components\sections\Timeline.tsx`

- [ ] **Step 1: Create Timeline.tsx**

```tsx
"use client";

import { useRef, useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { t } from "@/lib/i18n";

function useInViewTimeline() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, visible] as const;
}

interface TimelineItem {
  year: string;
  title: string;
  subtitle: string;
  color: string;
}

const dotColors: Record<string, string> = {
  gold: "bg-gold",
  purple: "bg-purple-accent",
  blue: "bg-blue-accent",
};

const yearColors: Record<string, string> = {
  gold: "text-gold",
  purple: "text-purple-accent",
  blue: "text-blue-accent",
};

export default function Timeline() {
  const { lang } = useLanguage();
  const [ref, visible] = useInViewTimeline();
  const items = t(lang, "timeline.items") as unknown as TimelineItem[];

  if (!items) return null;

  return (
    <section id="timeline" className="section-container">
      <div className="section-label mb-8">{t(lang, "timeline.sectionLabel")}</div>
      <div ref={ref} className="relative pl-8">
        {/* Gradient vertical line */}
        <div className="absolute left-[7px] top-1 bottom-1 w-px bg-gradient-to-b from-gold via-purple-accent via-blue-accent to-transparent" />

        {items.map((item, i) => (
          <div
            key={item.year + item.title}
            className={`relative pb-8 last:pb-0 transition-all duration-700 ${
              visible
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-4"
            }`}
            style={{ transitionDelay: `${i * 150}ms` }}
          >
            {/* Dot */}
            <div
              className={`absolute -left-8 top-1 w-[15px] h-[15px] rounded-full border-2 border-[#0a0a1a] ${
                dotColors[item.color] || "bg-gold"
              }`}
            />
            {/* Content */}
            <div className={yearColors[item.color] || "text-gold"}>
              <span className="text-xs tracking-wide">{item.year}</span>
            </div>
            <div className="text-base font-medium text-[#e8e8ed] mt-0.5">{item.title}</div>
            <div className="text-sm text-[rgba(255,255,255,0.45)]">{item.subtitle}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
```

---

### Task 10: Contact Section

**Files:**
- Create: `E:\网页\src\components\sections\Contact.tsx`

- [ ] **Step 1: Create Contact.tsx**

```tsx
"use client";

import { useRef, useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { t } from "@/lib/i18n";
import { Envelope, GithubLogo, LinkedinLogo } from "@phosphor-icons/react";

function useInViewContact() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, visible] as const;
}

export default function Contact() {
  const { lang } = useLanguage();
  const [ref, visible] = useInViewContact();

  return (
    <section id="contact" className="section-container">
      <div
        ref={ref}
        className={`text-center transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      >
        <div className="section-label mb-4">{t(lang, "contact.sectionLabel")}</div>
        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-[#e8e8ed]">
          {t(lang, "contact.heading1")}
        </h2>
        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight gold-gradient mb-8">
          {t(lang, "contact.heading2")}
        </h2>

        <a href={`mailto:${t(lang, "contact.email")}`} className="btn-primary inline-block mb-10">
          {t(lang, "contact.button")}
        </a>

        <div className="flex items-center justify-center gap-6 text-sm">
          <a href={`mailto:${t(lang, "contact.email")}`} className="flex items-center gap-2 text-[rgba(255,255,255,0.45)] hover:text-[#e8e8ed] transition-colors">
            <Envelope size={16} />
            <span>{t(lang, "contact.email")}</span>
          </a>
          <span className="text-[rgba(255,255,255,0.1)]">·</span>
          <a href="#" className="flex items-center gap-2 text-[rgba(255,255,255,0.45)] hover:text-[#e8e8ed] transition-colors">
            <GithubLogo size={16} />
            <span>GitHub</span>
          </a>
          <span className="text-[rgba(255,255,255,0.1)]">·</span>
          <a href="#" className="flex items-center gap-2 text-[rgba(255,255,255,0.45)] hover:text-[#e8e8ed] transition-colors">
            <LinkedinLogo size={16} />
            <span>LinkedIn</span>
          </a>
        </div>
      </div>
    </section>
  );
}
```

---

### Task 11: Build & Verify

**Files:** (none)

- [ ] **Step 1: Run build**

Run: `cd "E:/网页" && npx next build`
Expected: Build succeeds with no errors.

- [ ] **Step 2: Quick dev check**

Run: `cd "E:/网页" && npx next dev --port 3099`
Open http://localhost:3099 and verify:
- Hero section renders with starfield background
- Typewriter effect works on title
- Language toggle switches all content between zh/en
- Navigation scrolls to correct sections
- About / Projects / Skills / Timeline / Contact all render
- Skills bars animate on scroll
- Timeline nodes stagger on scroll
- Responsive layout at mobile width (<768px)
- Contact button and links are clickable

---

## Scope Check

The spec covers a single-page portfolio site with 6 sections, i18n, starfield animation, and scroll-triggered effects. All features are tightly coupled into one page — no independent subsystems to decompose. Plan is appropriately scoped.
