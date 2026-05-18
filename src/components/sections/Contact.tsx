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
  const email = t(lang, "contact.email");
  const outlookUrl = `https://outlook.live.com/mail/0/deeplink/compose?to=${encodeURIComponent(email)}`;

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

        <a href={outlookUrl} target="_blank" rel="noopener noreferrer" className="btn-primary inline-block mb-10">
          {t(lang, "contact.button")}
        </a>

        <div className="flex items-center justify-center gap-6 text-sm">
          <a href={outlookUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-[rgba(255,255,255,0.45)] hover:text-[#e8e8ed] transition-colors">
            <Envelope size={16} />
            <span>{email}</span>
          </a>
          <span className="text-[rgba(255,255,255,0.1)]">·</span>
          <a href="https://github.com/ShadowGaoxing" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-[rgba(255,255,255,0.45)] hover:text-[#e8e8ed] transition-colors">
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
