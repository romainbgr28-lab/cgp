/** @type {import('tailwindcss').Config} */
// Token system "Patrimonio" — palette patrimoine (indigo/or/corail/émeraude).
// Contrastes vérifiés WCAG AA : les variantes *Deep servent au texte sur fond
// blanc (≥ 4,5:1), les bases aux aplats avec texte blanc gras (≥ 3:1).
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Fredoka", "Inter", "system-ui", "sans-serif"],
      },
      colors: {
        pat: {
          // Marque : bleu-nuit / indigo profond
          brand: "#4152b3",
          brandDark: "#2f3d8f",
          brandLight: "#e6e9fb",
          // Or / ambre : réussites, XP, examens
          gold: "#d97706",
          goldDark: "#a85a04",
          goldDeep: "#a16207",
          goldLight: "#fdf0d5",
          // Corail : erreurs
          coral: "#e5495f",
          coralDark: "#c23349",
          coralLight: "#fde3e8",
          // Émeraude : validé / maîtrisé (distinct du vert Duolingo)
          mint: "#0e9a6d",
          mintDark: "#0b7a55",
          mintDeep: "#067a53",
          mintLight: "#dcf5eb",
          // Neutres légèrement teintés indigo
          ink: "#3a3f4b",
          muted: "#6d7380",
          line: "#e7e6f0",
          bg: "#f7f7fb",
        },
      },
    },
  },
  plugins: [],
};
