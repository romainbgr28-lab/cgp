// Appels Mistral — réservés au COACHING (Coach IA & Simulation client).
// Tout le contenu de formation est pré-enregistré : l'IA n'en génère jamais.
//
// Deux modes, dans cet ordre de priorité :
//   1. Worker Cloudflare (URL configurée dans Profil → Réglages) : le front
//      envoie { model, messages, … } au Worker, qui ajoute la clé côté
//      serveur (voir formation-cgp/worker/). La clé ne quitte jamais le serveur.
//   2. Appel direct à api.mistral.ai avec la clé stockée dans le navigateur.
import { getApiKey, getWorkerUrl } from "./storage.js";

const MODEL = "mistral-large-latest";

// Au moins un des deux modes est configuré (sert aux écrans Coach/Simulation)
export const aiDisponible = () => !!getWorkerUrl() || !!getApiKey();

export async function callAI(messages, { jsonMode = false, temperature = 0.6 } = {}) {
  const workerUrl = getWorkerUrl();
  const apiKey = getApiKey();
  if (!workerUrl && !apiKey) throw new Error("NO_KEY");

  const url = workerUrl || "https://api.mistral.ai/v1/chat/completions";
  const body = workerUrl
    ? { model: MODEL, messages, temperature, jsonMode }
    : {
        model: MODEL,
        messages,
        temperature,
        max_tokens: 1500,
        ...(jsonMode ? { response_format: { type: "json_object" } } : {}),
      };

  let res;
  try {
    res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(workerUrl ? {} : { Authorization: `Bearer ${apiKey}` }),
      },
      body: JSON.stringify(body),
    });
  } catch {
    throw new Error(
      workerUrl
        ? "Impossible de joindre le Worker. Vérifie son URL dans Profil → Réglages."
        : "Impossible de joindre l'API Mistral. Vérifie ta connexion."
    );
  }
  if (!res.ok) {
    if (res.status === 401) throw new Error("Clé API invalide (401). Vérifie-la dans Profil → Réglages.");
    if (res.status === 429) throw new Error("Trop de requêtes (429). Attends quelques secondes.");
    let detail = "";
    try {
      detail = (await res.json())?.error || "";
    } catch {
      /* corps non JSON */
    }
    throw new Error(detail || `Erreur ${res.status} de l'API Mistral.`);
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
