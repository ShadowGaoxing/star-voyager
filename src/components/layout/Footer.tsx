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
