import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "space-bg": "#0a0a1a",
        "space-card": "rgba(255,255,255,0.03)",
        "space-card-hover": "rgba(255,255,255,0.06)",
        "space-border": "rgba(255,255,255,0.08)",
        "gold": "#f0c040",
        "gold-dark": "#d4a020",
        "purple-accent": "#a78bfa",
        "blue-accent": "#93c5fd",
      },
      fontFamily: {
        sans: ["Noto Sans SC", "Inter", "sans-serif"],
        display: ["Space Grotesk", "sans-serif"],
      },
      animation: {
        "fade-in-up": "fadeInUp 0.6s ease-out forwards",
        "glow": "glow 2s ease-in-out infinite alternate",
      },
      keyframes: {
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        glow: {
          "0%": { boxShadow: "0 0 5px rgba(240,192,64,0.2)" },
          "100%": { boxShadow: "0 0 20px rgba(240,192,64,0.4)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
