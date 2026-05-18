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
