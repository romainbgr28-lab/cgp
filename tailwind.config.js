/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Nunito", "system-ui", "sans-serif"],
      },
      colors: {
        duo: {
          green: "#58cc02",
          greenDark: "#46a302",
          blue: "#1cb0f6",
          blueDark: "#1899d6",
          red: "#ff4b4b",
          redDark: "#ea2b2b",
          yellow: "#ffc800",
          text: "#3c3c3c",
          muted: "#777777",
          line: "#e5e5e5",
          bg: "#f7f7f7",
        },
      },
    },
  },
  plugins: [],
};
