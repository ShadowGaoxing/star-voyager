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
        className={`grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-10 md:gap-20 items-start transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        {/* Left: Avatar */}
        <div className="text-center md:text-left">
          <div className="w-44 h-44 rounded-full mx-auto md:mx-0 border-2 border-gold/30 overflow-hidden bg-gradient-to-br from-gold/5 to-purple-accent/5 mb-10">
            <img
              src="/star-voyager/images/avatar/avatar.jpg"
              alt="Avatar"
              className="w-full h-full object-cover"
              onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }}
            />
          </div>
          <div className="flex gap-3 justify-center md:justify-start flex-wrap">
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
