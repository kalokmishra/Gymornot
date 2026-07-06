import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        void: "#0B0F19",
        surface: "#131A2A",
        "surface-raised": "#1B2438",
        hairline: "#2A3450",
        "gym-green": {
          DEFAULT: "#10B981",
          dim: "#0D9668",
          glow: "#34D399",
        },
        "anti-purple": {
          DEFAULT: "#8B5CF6",
          dim: "#7C4DEF",
          glow: "#A78BFA",
        },
        alert: "#F59E0B",
        ink: "#E7E9EE",
        "ink-dim": "#9AA3B8",
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      backgroundImage: {
        "fault-line": "linear-gradient(180deg, #10B981 0%, #8B5CF6 100%)",
      },
      keyframes: {
        blink: {
          "0%, 49%": { opacity: "1" },
          "50%, 100%": { opacity: "0" },
        },
        scan: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100%)" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "0.6" },
          "50%": { opacity: "1" },
        },
      },
      animation: {
        blink: "blink 1s step-end infinite",
        scan: "scan 2.4s linear infinite",
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
