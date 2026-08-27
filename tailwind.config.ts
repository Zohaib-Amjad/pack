import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";
import typography from "@tailwindcss/typography";

export default {
  darkMode: ["class"],
  content: [
    "./src/views/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", "DM Sans", "system-ui", "sans-serif"],
        display: [
          "var(--font-sans)",
          "DM Sans",
          "system-ui",
          "sans-serif",
        ],
      },
      fontSize: {
        // Design System Type Scale
        "ds-hero": ["52px", { lineHeight: "1.05", fontWeight: "700" }],
        "ds-h1": ["40px", { lineHeight: "1.1", fontWeight: "700" }],
        "ds-heading": ["32px", { lineHeight: "1.2", fontWeight: "600" }],
        "ds-subhead": ["26px", { lineHeight: "1.25", fontWeight: "600" }],
        "ds-faq": [
          "21px",
          { lineHeight: "1.3", fontWeight: "500", letterSpacing: "0.12em" },
        ],
        "ds-card": ["14px", { lineHeight: "1.5", fontWeight: "500" }],
        "ds-body": ["13px", { lineHeight: "1.78", fontWeight: "400" }],
        "ds-hero-desc": ["13.5px", { lineHeight: "1.7", fontWeight: "400" }],
        "ds-product": ["12px", { lineHeight: "1.5", fontWeight: "500" }],
        "ds-btn": [
          "11.5px",
          { lineHeight: "1", fontWeight: "500", letterSpacing: "0.1em" },
        ],
        "ds-input": ["13px", { lineHeight: "1.5", fontWeight: "400" }],
        "ds-label": [
          "9.5px",
          { lineHeight: "1", fontWeight: "500", letterSpacing: "0.09em" },
        ],
        "ds-eyebrow": [
          "9.5px",
          { lineHeight: "1", fontWeight: "500", letterSpacing: "0.16em" },
        ],
        "ds-nav": [
          "12.5px",
          { lineHeight: "1", fontWeight: "400", letterSpacing: "0.02em" },
        ],
        "ds-footer": ["12.5px", { lineHeight: "1", fontWeight: "400" }],
        "ds-spec-key": ["12.5px", { lineHeight: "1.5", fontWeight: "500" }],
        "ds-spec-val": ["13px", { lineHeight: "1.6", fontWeight: "400" }],
        "ds-caption": ["11px", { lineHeight: "1.5", fontWeight: "400" }],
      },
      letterSpacing: {
        // Design System Letter Spacing Tokens
        "ds-btn": "0.10em",
        "ds-btn-wide": "0.12em",
        "ds-label": "0.09em",
        "ds-eyebrow": "0.16em",
        "ds-nav": "0.02em",
        "ds-faq": "0.12em",
        "ds-wide": "0.18em",
      },
      lineHeight: {
        // Design System Line Height Tokens
        "ds-heading": "1.05",
        "ds-subhead": "1.2",
        "ds-body": "1.78",
        "ds-relaxed": "1.75",
        "ds-hero-desc": "1.7",
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
          hover: "hsl(var(--accent-hover))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
        // Design System Named Colors (for direct use)
        ds: {
          orange: "#e8732a",
          "orange-hover": "#c45a18",
          green: "#2d5c3e",
          "green-dark": "#1e3d2b",
          ink: "#1a1a1a",
          body: "#4a4a4a",
          muted: "#7a7672",
          placeholder: "#aaa6a0",
          "page-bg": "#f5f3ee",
          "card-bg": "#ffffff",
          "input-bg": "#faf8f5",
          "panel-bg": "#ece9e2",
          border: "#e0ddd6",
          "input-border": "#d8d4cc",
          "chip-border": "#c8c4bc",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "slide-in-left": {
          "0%": { opacity: "0", transform: "translateX(-30px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        "count-up": {
          "0%": { opacity: "0", transform: "scale(0.5)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "marquee-vertical-up": {
          "0%": { transform: "translateY(0)" },
          "100%": { transform: "translateY(-50%)" },
        },
        "marquee-vertical-down": {
          "0%": { transform: "translateY(-50%)" },
          "100%": { transform: "translateY(0)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in-up": "fade-in-up 0.6s ease-out forwards",
        "fade-in": "fade-in 0.5s ease-out forwards",
        "slide-in-left": "slide-in-left 0.6s ease-out forwards",
        "count-up": "count-up 0.4s ease-out forwards",
        marquee: "marquee 20s linear infinite",
        "marquee-slow": "marquee 30s linear infinite",
        "marquee-vertical-up": "marquee-vertical-up 28s linear infinite",
        "marquee-vertical-down": "marquee-vertical-down 32s linear infinite",
      },
    },
  },
  plugins: [tailwindcssAnimate, typography],
} satisfies Config;
