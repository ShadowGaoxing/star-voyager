"use client";

import { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  size: number;
  baseOpacity: number;
  opacity: number;
  speed: number;
  driftX: number;
  driftY: number;
  hue: number;
}

interface ShootingStar {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  trail: { x: number; y: number }[];
}

export default function StarField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);
  const shootingStarsRef = useRef<ShootingStar[]>([]);
  const animFrameRef = useRef<number>(0);
  const mouseRef = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const onMouse = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", onMouse);

    const getStarCount = () => {
      if (window.innerWidth < 768) return 60;
      if (window.innerWidth < 1200) return 120;
      return 200;
    };

    const initStars = () => {
      const count = getStarCount();
      starsRef.current = Array.from({ length: count }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2.2 + 0.3,
        baseOpacity: Math.random() * 0.7 + 0.3,
        opacity: Math.random() * 0.7 + 0.3,
        speed: Math.random() * 0.4 + 0.05,
        driftX: (Math.random() - 0.5) * 0.15,
        driftY: (Math.random() - 0.5) * 0.15,
        hue: 200 + Math.random() * 60,
      }));
    };
    initStars();

    // Nebula clouds
    const nebulae = [
      { x: 0.2, y: 0.3, r: 0.25, color: [124, 58, 237], a: 0.04 },
      { x: 0.8, y: 0.6, r: 0.2, color: [240, 192, 64], a: 0.03 },
      { x: 0.5, y: 0.8, r: 0.3, color: [59, 130, 246], a: 0.03 },
    ];

    let shootingStarTimer = 0;

    const spawnShootingStar = () => {
      shootingStarsRef.current.push({
        x: Math.random() * canvas.width,
        y: 0,
        vx: (Math.random() * 4 + 3) * (Math.random() > 0.5 ? 1 : -1),
        vy: Math.random() * 3 + 2,
        life: 0,
        maxLife: 30 + Math.random() * 40,
        trail: [],
      });
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw nebula background
      for (const neb of nebulae) {
        const g = ctx.createRadialGradient(
          neb.x * canvas.width, neb.y * canvas.height, 0,
          neb.x * canvas.width, neb.y * canvas.height, neb.r * canvas.width
        );
        g.addColorStop(0, `rgba(${neb.color.join(",")},${neb.a})`);
        g.addColorStop(1, `rgba(${neb.color.join(",")},0)`);
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      // Draw and update stars
      const stars = starsRef.current;
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];
        star.opacity += (Math.random() - 0.5) * 0.03;
        star.opacity = Math.max(0.15, Math.min(star.baseOpacity + 0.3, star.opacity));

        star.x += star.driftX * star.speed;
        star.y += star.driftY * star.speed;

        if (star.x < 0) star.x = canvas.width;
        if (star.x > canvas.width) star.x = 0;
        if (star.y < 0) star.y = canvas.height;
        if (star.y > canvas.height) star.y = 0;

        // Mouse interaction - subtle attraction
        const dx = mx - star.x;
        const dy = my - star.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 200) {
          star.x += dx * 0.001;
          star.y += dy * 0.001;
        }

        // Draw star with glow
        const glowSize = star.size * 3;
        const starGrad = ctx.createRadialGradient(
          star.x, star.y, 0,
          star.x, star.y, glowSize
        );
        starGrad.addColorStop(0, `rgba(255,255,255,${star.opacity})`);
        starGrad.addColorStop(0.3, `rgba(255,255,255,${star.opacity * 0.3})`);
        starGrad.addColorStop(1, `rgba(255,255,255,0)`);
        ctx.fillStyle = starGrad;
        ctx.beginPath();
        ctx.arc(star.x, star.y, glowSize, 0, Math.PI * 2);
        ctx.fill();

        // Star core
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${star.opacity})`;
        ctx.fill();

        // Connect nearby stars with faint lines
        for (let j = i + 1; j < stars.length; j++) {
          const other = stars[j];
          const d = Math.sqrt((star.x - other.x) ** 2 + (star.y - other.y) ** 2);
          if (d < 120) {
            ctx.beginPath();
            ctx.moveTo(star.x, star.y);
            ctx.lineTo(other.x, other.y);
            ctx.strokeStyle = `rgba(147, 197, 253, ${0.08 * (1 - d / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      // Shooting stars
      shootingStarTimer++;
      if (shootingStarTimer > 120 + Math.random() * 180) {
        spawnShootingStar();
        shootingStarTimer = 0;
      }

      shootingStarsRef.current = shootingStarsRef.current.filter((s) => {
        s.life++;
        s.trail.push({ x: s.x, y: s.y });
        if (s.trail.length > 15) s.trail.shift();
        s.x += s.vx;
        s.y += s.vy;
        s.vy += 0.05;

        // Draw trail
        if (s.trail.length > 1) {
          ctx.beginPath();
          ctx.moveTo(s.trail[0].x, s.trail[0].y);
          for (let k = 1; k < s.trail.length; k++) {
            ctx.lineTo(s.trail[k].x, s.trail[k].y);
          }
          ctx.strokeStyle = `rgba(255,255,255,${0.6 * (1 - s.life / s.maxLife)})`;
          ctx.lineWidth = 2;
          ctx.stroke();
        }

        // Draw head
        const headBright = 1 - s.life / s.maxLife;
        ctx.beginPath();
        ctx.arc(s.x, s.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${headBright})`;
        ctx.fill();

        return s.life < s.maxLife;
      });

      animFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      resize();
      initStars();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", onMouse);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    />
  );
}
