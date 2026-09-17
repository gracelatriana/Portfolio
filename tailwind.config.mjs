/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx,vue,svelte}"],
  theme: {
    extend: {
      colors: {
        // Professional palette (see design.md / user brief).
        base: "#FFFFFF", // page background
        surface: "#F8FAFC", // alternating section background
        ink: "#0F172A", // headings / strong text
        body: "#475569", // body text
        border: "#E2E8F0", // hairline borders
        navy: {
          DEFAULT: "#1E3A8A", // primary accent
          hover: "#1B3474",
        },
        teal: {
          DEFAULT: "#0891B2", // secondary accent
          hover: "#0A7A96",
        },
      },
      fontFamily: {
        heading: ["Sora", "ui-sans-serif", "system-ui", "sans-serif"],
        body: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      maxWidth: {
        content: "1100px",
      },
      keyframes: {
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        fadeInUp: "fadeInUp 0.5s ease-out both",
      },
    },
  },
  plugins: [],
};
