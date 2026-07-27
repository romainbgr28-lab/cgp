import { useState } from "react";
import { SECTIONS, LECONS, statsCurriculum } from "../data/curriculum.js";
import { BADGES, getBadges, getApiKey, setApiKey, stClearAll } from "../lib/storage.js";
import { Btn } from "../components/ui.jsx";

const NIVEAUX = [
  { seuil: 0, nom: "Stagiaire", emoji: "🐣" },
  { seuil: 200, nom: "Conseiller junior", emoji: "📚" },
  { seuil: 600, nom: "Conseiller confirmé", emoji: "💼" },
  { seuil: 1200, nom: "Conseiller senior", emoji: "🎖️" },
  { seuil: 2200, nom: "Expert patrimonial", emoji: "🏆" },
  { seuil: 3500, nom: "Maître CGP", emoji: "👑" },
];

export default function Profile({ progress, xp, streak, onReset }) {
  const badges = getBadges();
  const [key, setKey] = useState(getApiKey());
  const [keySaved, setKeySaved] = useState(false);
  const [confirmReset, setConfirmReset] = useState(false);

  const niveau = [...NIVEAUX].reverse().find((n) => xp >= n.seuil);
  const suivant = NIVEAUX.find((n) => n.seuil > xp);
  const { nbLecons, nbQuestions } = statsCurriculum();
  const nbFaites = LECONS.filter((l) => progress[l.id]).length;

  return (
    <div className="mx-auto max-w-xl px-5 pb-10 pt-6">
      {/* En-tête niveau */}
      <div className="rounded-3xl bg-gradient-to-br from-duo-blue to-duo-blueDark p-5 text-white">
        <div className="flex items-center gap-4">
          <span className="text-5xl">{niveau.emoji}</span>
          <div className="min-w-0 flex-1">
            <p className="text-[11px] font-extrabold uppercase tracking-widest opacity-80">Niveau actuel</p>
            <h2 className="text-xl font-extrabold">{niveau.nom}</h2>
          </div>
        </div>
        {suivant && (
          <div className="mt-3">
            <div className="h-3 overflow-hidden rounded-full bg-white/25">
              <div
                className="h-full rounded-full bg-duo-yellow transition-all duration-700"
                style={{ width: `${Math.min(100, Math.round(((xp - niveau.seuil) / (suivant.seuil - niveau.seuil)) * 100))}%` }}
              />
            </div>
            <p className="mt-1 text-[12px] font-bold opacity-80">
              {xp} XP — encore {suivant.seuil - xp} XP avant « {suivant.nom} »
            </p>
          </div>
        )}
      </div>

      {/* Stats rapides */}
      <div className="mt-4 grid grid-cols-3 gap-2.5">
        <Stat emoji="🔥" valeur={streak} label={`jour${streak > 1 ? "s" : ""} d'affilée`} />
        <Stat emoji="⚡" valeur={xp} label="XP au total" />
        <Stat emoji="📖" valeur={`${nbFaites}/${nbLecons}`} label="leçons finies" />
      </div>

      {/* Progression par section */}
      <h3 className="mb-2 mt-7 text-lg font-extrabold text-duo-text">Progression</h3>
      <div className="flex flex-col gap-2.5">
        {SECTIONS.map((s) => {
          const lecons = s.unites.flatMap((u) => u.lecons);
          const faites = lecons.filter((l) => progress[l.id]).length;
          const ratio = faites / lecons.length;
          return (
            <div key={s.id} className="rounded-2xl border-2 border-duo-line bg-white p-3.5">
              <div className="flex items-center justify-between">
                <p className="text-[14px] font-extrabold text-duo-text">
                  {s.emoji} {s.titre}
                </p>
                <span className="text-[12px] font-bold text-duo-muted">
                  {faites}/{lecons.length}
                </span>
              </div>
              <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-duo-line">
                <div className="h-full rounded-full transition-all duration-700" style={{ width: `${ratio * 100}%`, background: s.couleur.base }} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Badges */}
      <h3 className="mb-2 mt-7 text-lg font-extrabold text-duo-text">Badges</h3>
      <div className="grid grid-cols-2 gap-2.5">
        {BADGES.map((b) => {
          const date = badges[b.id];
          return (
            <div key={b.id} className={`rounded-2xl border-2 p-3.5 ${date ? "border-duo-yellow bg-white" : "border-duo-line bg-duo-bg opacity-60"}`}>
              <span className={`text-2xl ${date ? "" : "grayscale"}`}>{b.icone}</span>
              <p className="mt-1 text-[13px] font-extrabold text-duo-text">{b.nom}</p>
              <p className="text-[11px] font-semibold leading-tight text-duo-muted">{b.desc}</p>
            </div>
          );
        })}
      </div>

      {/* Réglages */}
      <h3 className="mb-2 mt-7 text-lg font-extrabold text-duo-text">Réglages</h3>
      <div className="rounded-2xl border-2 border-duo-line bg-white p-4">
        <p className="text-[13px] font-extrabold text-duo-text">Clé API Mistral (Coach & Simulation)</p>
        <p className="mt-0.5 text-[12px] font-semibold text-duo-muted">
          Optionnelle : le parcours complet ({nbLecons} leçons, {nbQuestions} questions) fonctionne sans. Stockée uniquement dans ton navigateur.
        </p>
        <div className="mt-2.5 flex gap-2">
          <input
            type="password"
            value={key}
            onChange={(e) => {
              setKey(e.target.value);
              setKeySaved(false);
            }}
            placeholder="Clé API…"
            className="min-w-0 flex-1 rounded-xl border-2 border-duo-line px-3 py-2 text-[14px] font-semibold focus:border-duo-blue focus:outline-none"
          />
          <Btn
            className="px-4 text-[13px]"
            onClick={() => {
              setApiKey(key);
              setKeySaved(true);
            }}
          >
            {keySaved ? "✓" : "OK"}
          </Btn>
        </div>
      </div>

      <div className="mt-3 rounded-2xl border-2 border-duo-line bg-white p-4">
        {confirmReset ? (
          <div className="flex flex-col gap-2">
            <p className="text-[13px] font-extrabold text-duo-redDark">Tout effacer (progression, XP, révisions, badges) ? Irréversible.</p>
            <div className="flex gap-2">
              <Btn color="#ff4b4b" shadow="#ea2b2b" className="flex-1 text-[13px]" onClick={() => { stClearAll(); onReset(); }}>
                Oui, tout effacer
              </Btn>
              <Btn color="#e5e5e5" shadow="#c9c9c9" textColor="#777" className="flex-1 text-[13px]" onClick={() => setConfirmReset(false)}>
                Annuler
              </Btn>
            </div>
          </div>
        ) : (
          <button onClick={() => setConfirmReset(true)} className="text-[13px] font-extrabold uppercase tracking-wide text-duo-red">
            Réinitialiser ma progression
          </button>
        )}
      </div>

      <p className="mt-6 text-center text-[11px] font-semibold leading-relaxed text-duo-muted">
        Contenu pédagogique millésimé loi de finances 2025.
        <br />
        Les barèmes évoluent chaque année : vérifie les valeurs sur bofip.gouv.fr avant tout usage client.
      </p>
    </div>
  );
}

function Stat({ emoji, valeur, label }) {
  return (
    <div className="rounded-2xl border-2 border-duo-line bg-white p-3 text-center">
      <p className="text-xl">{emoji}</p>
      <p className="text-lg font-extrabold leading-tight text-duo-text">{valeur}</p>
      <p className="text-[11px] font-bold text-duo-muted">{label}</p>
    </div>
  );
}
