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
