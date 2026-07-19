import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Legacy tokens (kept for backward-compat)
        void: "#000000",
        surface: "#121508",
        "surface-raised": "#1a1d10",
        "surface-dim": "#1a1d10",
        hairline: "#222222",
        "gym-green": {
          DEFAULT: "#d0ff00",
          dim: "#a8cc00",
          glow: "#e8ff66",
        },
        "anti-purple": {
          DEFAULT: "#8B5CF6",
          dim: "#7C4DEF",
          glow: "#A78BFA",
        },
        alert: "#F59E0B",
        ink: "#F5F5F0",
        "ink-dim": "#888888",
        // NRC Kinetic Audit tokens
        volt: "#d0ff00",
        "solar-red": "#ff4d00",
        "dark-moss": "#121508",
        "oled-black": "#000000",
        // Brand aliases
        "brand-lime": "#d0ff00",
        "brand-red": "#ff4d00",
      },
      fontFamily: {
        display: ["var(--font-display)", "Arial Narrow", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      backgroundImage: {
        "kinetic-gradient": "linear-gradient(135deg, #ff4d00 0%, #d0ff00 100%)",
        "volt-gradient": "linear-gradient(180deg, #d0ff00 0%, #a8cc00 100%)",
        "fault-line": "linear-gradient(180deg, #d0ff00 0%, #ff4d00 100%)",
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
        "volt-pulse": {
          "0%, 100%": { boxShadow: "0 0 0px 0px rgba(208,255,0,0)" },
          "50%": { boxShadow: "0 0 20px 4px rgba(208,255,0,0.35)" },
        },
        "slide-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "kinetic-in": {
          "0%": { opacity: "0", transform: "skewY(-2deg) translateY(16px)" },
          "100%": { opacity: "1", transform: "skewY(0deg) translateY(0)" },
        },
      },
      animation: {
        blink: "blink 1s step-end infinite",
        scan: "scan 2.4s linear infinite",
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
        "volt-pulse": "volt-pulse 2.5s ease-in-out infinite",
        "slide-up": "slide-up 0.4s ease-out forwards",
        "kinetic-in": "kinetic-in 0.5s ease-out forwards",
      },
      transitionTimingFunction: {
        kinetic: "cubic-bezier(0.25, 0, 0, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
