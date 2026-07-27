import { useEffect, useRef, useState } from "react";
import { callAI } from "../lib/ai.js";
import { getApiKey, setApiKey, getErreurs, getProgress, getXp, calcStreak, getDeck } from "../lib/storage.js";
import { SECTIONS, LECONS } from "../data/curriculum.js";
import { Btn, Mascotte } from "../components/ui.jsx";

// Le Coach IA n'invente aucun contenu : il analyse la progression et les
// erreurs RÉELLES stockées localement, et répond aux questions de compréhension.
function contexteApprenant() {
  const progress = getProgress();
  const erreurs = getErreurs();
  const parSection = SECTIONS.map((s) => {
    const lecons = s.unites.flatMap((u) => u.lecons);
    const faites = lecons.filter((l) => progress[l.id]);
    const prec = faites.length ? Math.round(faites.reduce((a, l) => a + progress[l.id].precision, 0) / faites.length) : null;
    return `- ${s.titre} : ${faites.length}/${lecons.length} leçons terminées${prec !== null ? `, précision moyenne ${prec} %` : ""}`;
  }).join("\n");
  const listeErreurs = erreurs
    .slice(0, 15)
    .map((e) => `- [${e.section}] Q: "${e.q}" — il a répondu "${e.mauvaise}" au lieu de "${e.bonne}"`)
    .join("\n");
  return `PROFIL DE L'APPRENANT (données réelles de l'app) :
XP total : ${getXp()} — Streak : ${calcStreak()} jours — Cartes en révision : ${getDeck().length}
Progression (${LECONS.filter((l) => progress[l.id]).length}/${LECONS.length} leçons) :
${parSection}
Ses 15 dernières erreurs :
${listeErreurs || "(aucune erreur enregistrée pour l'instant)"}`;
}

const SYSTEM = `Tu es le coach personnel d'un conseiller en gestion de patrimoine (CGP) en formation sur une app de micro-learning.
Ton rôle : analyser ses données réelles, identifier ses points faibles, lui dire quoi réviser en priorité, et répondre à ses questions de compréhension.
Règles :
- Tu t'appuies UNIQUEMENT sur les données fournies et sur des connaissances patrimoniales solides. Si tu cites un chiffre fiscal, ajoute "(à vérifier, valeurs LF en vigueur)".
- Ton : chaleureux, direct, motivant, comme un coach sportif. Tutoie.
- Réponses COURTES : 4 à 8 phrases max, aérées, éventuellement 2-3 puces. Jamais de pavé.
- Termine souvent par UNE action concrète à faire dans l'app (réviser telle section, refaire telle leçon).`;

const SUGGESTIONS = [
  "Analyse mes erreurs 🔍",
  "Que réviser aujourd'hui ?",
  "Explique-moi ma dernière erreur",
  "Où en suis-je globalement ?",
];

export default function Coach() {
  const [hasKey, setHasKey] = useState(!!getApiKey());
  const [keyInput, setKeyInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [saisie, setSaisie] = useState("");
  const [enCours, setEnCours] = useState(false);
  const [erreur, setErreur] = useState(null);
  const finRef = useRef(null);

  useEffect(() => {
    finRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, enCours]);

  const envoyer = async (texte) => {
    const contenu = (texte ?? saisie).trim();
    if (!contenu || enCours) return;
    setSaisie("");
    setErreur(null);
    const hist = [...messages, { role: "user", content: contenu }];
    setMessages(hist);
    setEnCours(true);
    try {
      const rep = await callAI([
        { role: "system", content: SYSTEM + "\n\n" + contexteApprenant() },
        ...hist.slice(-8),
      ]);
      setMessages((m) => [...m, { role: "assistant", content: rep.trim() }]);
    } catch (e) {
      setErreur(e.message === "NO_KEY" ? "Configure ta clé API pour parler au coach." : e.message);
    } finally {
      setEnCours(false);
    }
  };

  if (!hasKey) {
    return (
      <div className="mx-auto flex max-w-xl flex-col gap-5 px-6 pt-10">
        <Mascotte emoji="🧑‍🏫">Je suis ton coach. Pour m'activer, il me faut une clé API Mistral (gratuite).</Mascotte>
        <div className="rounded-2xl border-2 border-duo-line bg-white p-5">
          <p className="text-[14px] font-semibold text-duo-muted">
            Le coach lit ta progression et tes erreurs réelles pour te guider. Il ne génère jamais le contenu des leçons — tout est pré-enregistré et vérifié.
          </p>
          <input
            type="password"
            value={keyInput}
            onChange={(e) => setKeyInput(e.target.value)}
            placeholder="Clé API Mistral (console.mistral.ai)"
            className="mt-4 w-full rounded-xl border-2 border-duo-line px-4 py-3 text-[15px] font-semibold focus:border-duo-blue focus:outline-none"
          />
          <Btn
            className="mt-3 w-full"
            disabled={keyInput.trim().length < 10}
            onClick={() => {
              setApiKey(keyInput);
              setHasKey(true);
            }}
          >
            Activer le coach
          </Btn>
          <p className="mt-2 text-center text-[12px] font-semibold text-duo-muted">Clé stockée uniquement dans ton navigateur.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto flex h-full max-w-xl flex-col px-4 pt-4">
      <div className="flex-1 space-y-3 overflow-y-auto pb-40">
        {messages.length === 0 && (
          <div className="flex flex-col gap-4 pt-6">
            <Mascotte emoji="🧑‍🏫">Salut champion ! Je connais tout ton parcours et tes erreurs. Que veux-tu savoir ?</Mascotte>
            <div className="flex flex-wrap gap-2">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => envoyer(s)}
                  className="choice3d px-4 py-2 text-[14px] font-bold text-duo-blue"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}
        {messages.map((m, i) => (
          <div key={i} className={`anim-fade-up flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[85%] whitespace-pre-line rounded-2xl px-4 py-3 text-[15px] font-semibold leading-snug ${
                m.role === "user" ? "rounded-br-md bg-duo-blue text-white" : "rounded-bl-md border-2 border-duo-line bg-white text-duo-text"
              }`}
            >
              {m.content}
            </div>
          </div>
        ))}
        {enCours && <p className="pl-2 text-[13px] font-bold italic text-duo-muted">Le coach réfléchit…</p>}
        {erreur && <p className="rounded-xl bg-[#ffdfe0] px-4 py-2 text-[13px] font-bold text-duo-redDark">{erreur}</p>}
        <div ref={finRef} />
      </div>

      <div className="fixed inset-x-0 bottom-16 border-t-2 border-duo-line bg-white">
        <div className="mx-auto flex max-w-xl gap-2 px-4 py-3">
          <input
            value={saisie}
            onChange={(e) => setSaisie(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && envoyer()}
            placeholder="Pose ta question au coach…"
            className="flex-1 rounded-xl border-2 border-duo-line px-4 py-2.5 text-[15px] font-semibold focus:border-duo-blue focus:outline-none"
          />
          <Btn onClick={() => envoyer()} disabled={enCours || !saisie.trim()} className="px-5">
            ➤
          </Btn>
        </div>
      </div>
    </div>
  );
}
