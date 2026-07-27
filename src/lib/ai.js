// Appels Mistral — réservés au COACHING (Coach IA & Simulation client).
// Tout le contenu de formation est pré-enregistré : l'IA n'en génère jamais.
import { getApiKey } from "./storage.js";

const MODEL = "mistral-large-latest";

export async function callAI(messages, { jsonMode = false, temperature = 0.6 } = {}) {
  const apiKey = getApiKey();
  if (!apiKey) throw new Error("NO_KEY");
  let res;
  try {
    res = await fetch("https://api.mistral.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: MODEL,
        messages,
        temperature,
        max_tokens: 1500,
        ...(jsonMode ? { response_format: { type: "json_object" } } : {}),
      }),
    });
  } catch {
    throw new Error("Impossible de joindre l'API Mistral. Vérifie ta connexion.");
  }
  if (!res.ok) {
    if (res.status === 401) throw new Error("Clé API invalide (401). Vérifie-la dans Profil → Réglages.");
    if (res.status === 429) throw new Error("Trop de requêtes (429). Attends quelques secondes.");
    throw new Error(`Erreur ${res.status} de l'API Mistral.`);
  }
  const data = await res.json();
  const content = data?.choices?.[0]?.message?.content;
  if (!content) throw new Error("Réponse vide de l'API.");
  return content;
}

export function parseJSON(text) {
  const clean = text.replace(/```json/gi, "").replace(/```/g, "").trim();
  try {
    return JSON.parse(clean);
  } catch {
    const m = clean.match(/\{[\s\S]*\}/);
    if (m) {
      try {
        return JSON.parse(m[0]);
      } catch {
        /* rien */
      }
    }
    throw new Error("Réponse IA mal formée. Réessaie.");
  }
}
