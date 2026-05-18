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
