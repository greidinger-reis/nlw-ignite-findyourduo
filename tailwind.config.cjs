/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],

  theme: {
    extend: {
      backgroundImage: {
        "game-gradient":
          "linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.9) 67.08%)",
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#8B5CF6",

          secondary: "#71717A",

          accent: "#2A2634",

          neutral: "#18181B",

          "base-100": "#2A2634",

          info: "#3b82f6",

          success: "#22c55e",

          warning: "#eab308",

          error: "#ef4444",

          "--rounded-box": "0.5rem",

          "--rounded-btn": "6px",

          "--btn-text-case": "none",

          "--btn-focus-scale": "1.05",
        },
      },
    ],
  },
};
