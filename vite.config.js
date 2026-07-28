import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      // public/manifest.json est géré à la main (cf. sa structure) : le
      // plugin ne fait ici que générer/enregistrer le service worker.
      manifest: false,
      registerType: "autoUpdate",
      includeAssets: ["manifest.json", "icon-192.png", "icon-512.png", "apple-touch-icon.png"],
      workbox: {
        // Le contenu pédagogique (curriculum, barèmes, tags) est du JS
        // statique embarqué au build : le précacher ici le rend disponible
        // hors-ligne dans sa totalité, pas seulement "au fur et à mesure".
        globPatterns: ["**/*.{js,css,html,ico,png,svg,woff,woff2}"],
        navigateFallback: "/index.html",
        // Les appels Mistral (Coach/Simulation) ne sont jamais mis en cache :
        // ils exigent une connexion, ce qui reste normal et assumé.
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.(googleapis|gstatic)\.com\//,
            handler: "CacheFirst",
            options: {
              cacheName: "google-fonts",
              expiration: { maxEntries: 10, maxAgeSeconds: 60 * 60 * 24 * 365 },
            },
          },
        ],
      },
    }),
  ],
});
