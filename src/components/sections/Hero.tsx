"use client";

import { useState, useCallback } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { t } from "@/lib/i18n";
import StarField from "@/components/ui/StarField";
import TypeWriter from "@/components/ui/TypeWriter";
import ScrollIndicator from "@/components/ui/ScrollIndicator";

export default function Hero() {
  const { lang } = useLanguage();
  const [showCta, setShowCta] = useState(false);

  const onSubtitleComplete = useCallback(() => {
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
          <div className="text-base md:text-lg text-[rgba(255,255,255,0.5)] tracking-wide">
            <TypeWriter
              text={t(lang, "hero.subtitle")}
              speed={60}
              onComplete={onSubtitleComplete}
            />
          </div>
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
