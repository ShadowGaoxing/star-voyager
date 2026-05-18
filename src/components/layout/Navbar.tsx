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
