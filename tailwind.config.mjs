/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      keyframes: {
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        appearFromBottom: {
          from: { transform: "translateY(20px)" },
          to: { transform: "translateY(0px)" },
        },
        progress: {
          from: { transform: "translateX(0) scaleX(0)" },
          "40%": { transform: "translateX(0) scaleX(0.4)" },
          to: { transform: "translateX(100%) scaleX(0.5)" },
        },
      },
      animation: {
        appearFromBottom: "appearFromBottom .4s ease forwards",
        fadeIn: "fadeIn .4s ease forwards",
        progress: "progress 1s infinite linear",
      },
    },
  },
  plugins: [],
};
