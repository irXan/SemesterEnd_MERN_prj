/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        unbeatableFitness: {
          "primary": "#1E3A2B",     // Deep Forest Green
          "secondary": "#132E20",   // Darker green for hover states
          "accent": "#FFA000",      // Warm Amber / Gold
          "neutral": "#1E293B",     // Dark slate for text
          "base-100": "#FFFFFF",    // Pure white for cards/backgrounds
          "base-200": "#F4F7F5",    // Soft green-tinted white for page backgrounds
          "info": "#0284C7",
          "success": "#16A34A",
          "warning": "#EAB308",
          "error": "#DC2626",
        },
      },
      "light", // fallback theme
    ],
  },
}