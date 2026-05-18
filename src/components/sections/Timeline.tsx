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
