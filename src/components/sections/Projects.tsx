"use client";

import { useRef, useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { t } from "@/lib/i18n";

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

  const coverImages: Record<string, string> = {
    luckin: "/star-voyager/images/projects/luckin-cover.jpg",
    crop: "/star-voyager/images/projects/crop-cover.jpg",
  };

  const [imgErrors, setImgErrors] = useState<Record<string, boolean>>({});
  const handleImgError = (id: string) => setImgErrors((prev) => ({ ...prev, [id]: true }));

  const tagColorClass = (tag: string) => {
    const goldTags = ["LangChain", "DeepSeek", "RAG", "Deep Learning"];
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
        <div className="mb-10">
          <div className="section-label">{t(lang, "projects.sectionLabel")}</div>
          <h2 className="section-title">{t(lang, "projects.sectionTitle")}</h2>
        </div>

        {/* Featured Project */}
        <a
          href="#"
          className="card-base card-hover grid grid-cols-1 md:grid-cols-[1.2fr_1fr] gap-0 overflow-hidden mb-8"
        >
          <div className={`${featureGradient} min-h-[200px] md:min-h-[260px] flex items-center justify-center relative overflow-hidden`}>
            {!imgErrors[featured.id] ? (
              <img
                src={coverImages[featured.id]}
                alt={featured.title}
                className="absolute inset-0 w-full h-full object-cover"
                onError={() => handleImgError(featured.id)}
              />
            ) : null}
            {imgErrors[featured.id] && (
              <span className="text-sm text-[rgba(255,255,255,0.25)] relative z-10">{featured.title} — Cover</span>
            )}
          </div>
          <div className="p-6 md:p-8">
            <div className="tag-gold inline-block mb-3">{featured.category}</div>
            <h3 className="text-xl font-semibold tracking-tight text-[#e8e8ed] mb-3">{featured.title}</h3>
            <p className="text-sm text-[rgba(255,255,255,0.55)] leading-relaxed mb-4 whitespace-pre-line">{featured.description}</p>
            <div className="flex gap-2 flex-wrap">
              {featured.tags.map((tag: string) => (
                <span key={tag} className={tagColorClass(tag)}>{tag}</span>
              ))}
            </div>
          </div>
        </a>

        {/* Grid Projects */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {rest.map((project: ProjectItem, i: number) => (
            <a
              key={project.id}
              href="#"
              className="card-base card-hover p-6"
            >
              <div className={`${gradients[i % gradients.length]} h-28 rounded-lg mb-4 flex items-center justify-center relative overflow-hidden`}>
                {!imgErrors[project.id] ? (
                  <img
                    src={coverImages[project.id]}
                    alt={project.title}
                    className="absolute inset-0 w-full h-full object-cover"
                    onError={() => handleImgError(project.id)}
                  />
                ) : null}
                {imgErrors[project.id] && (
                  <span className="text-xs text-[rgba(255,255,255,0.2)] relative z-10">Cover</span>
                )}
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
