import { useState } from "react";
import { SECTIONS, LECONS, statsCurriculum } from "../data/curriculum.js";
import { BADGES, getBadges, getApiKey, setApiKey, getWorkerUrl, setWorkerUrl, stClearAll, getTagStats } from "../lib/storage.js";
import { tagLabel } from "../data/tags.js";
import { Btn } from "../components/ui.jsx";

// Tags avec au moins 3 réponses, triés par taux d'erreur décroissant.
// Les données antérieures à l'ajout des tags n'ont pas de compteur : absentes, sans crash.
function pointsFaibles() {
  return Object.entries(getTagStats())
    .map(([tag, s]) => ({ tag, total: s.ok + s.ko, taux: s.ko / Math.max(1, s.ok + s.ko) }))
    .filter((x) => x.total >= 3 && x.taux > 0)
    .sort((a, b) => b.taux - a.taux)
    .slice(0, 5);
}

const NIVEAUX = [
  { seuil: 0, nom: "Stagiaire", emoji: "🐣" },
  { seuil: 200, nom: "Conseiller junior", emoji: "📚" },
  { seuil: 600, nom: "Conseiller confirmé", emoji: "💼" },
  { seuil: 1200, nom: "Conseiller senior", emoji: "🎖️" },
  { seuil: 2200, nom: "Expert patrimonial", emoji: "🏆" },
  { seuil: 3500, nom: "Maître CGP", emoji: "👑" },
];

export default function Profile({ progress, xp, streak, onReset, onTrainTag }) {
  const badges = getBadges();
  const faibles = pointsFaibles();
  const [key, setKey] = useState(getApiKey());
  const [keySaved, setKeySaved] = useState(false);
  const [worker, setWorker] = useState(getWorkerUrl());
  const [workerSaved, setWorkerSaved] = useState(false);
  const [confirmReset, setConfirmReset] = useState(false);

  const niveau = [...NIVEAUX].reverse().find((n) => xp >= n.seuil);
  const suivant = NIVEAUX.find((n) => n.seuil > xp);
  const { nbLecons, nbQuestions } = statsCurriculum();
  const nbFaites = LECONS.filter((l) => progress[l.id]).length;

  return (
    <div className="mx-auto max-w-xl px-5 pb-10 pt-6">
      {/* En-tête niveau */}
      <div className="rounded-3xl bg-gradient-to-br from-pat-brand to-pat-brandDark p-5 text-white">
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
                className="h-full rounded-full bg-pat-goldDeep transition-all duration-700"
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
      <h3 className="mb-2 mt-7 text-lg font-extrabold text-pat-ink">Progression</h3>
      <div className="flex flex-col gap-2.5">
        {SECTIONS.map((s) => {
          const lecons = s.unites.flatMap((u) => u.lecons);
          const faites = lecons.filter((l) => progress[l.id]).length;
          const ratio = faites / lecons.length;
          return (
            <div key={s.id} className="rounded-2xl border-2 border-pat-line bg-white p-3.5">
              <div className="flex items-center justify-between">
                <p className="text-[14px] font-extrabold text-pat-ink">
                  {s.emoji} {s.titre}
                </p>
                <span className="text-[12px] font-bold text-pat-muted">
                  {faites}/{lecons.length}
                </span>
              </div>
              <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-pat-line">
                <div className="h-full rounded-full transition-all duration-700" style={{ width: `${ratio * 100}%`, background: s.couleur.base }} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Points faibles récurrents (par tag thématique transversal) */}
      <h3 className="mb-2 mt-7 text-lg font-extrabold text-pat-ink">Points faibles récurrents</h3>
      {faibles.length === 0 ? (
        <p className="rounded-2xl border-2 border-pat-line bg-white p-4 text-[13px] font-semibold text-pat-muted">
          Réponds à quelques questions pour que tes thèmes fragiles apparaissent ici, avec un entraînement ciblé en un clic.
        </p>
      ) : (
        <div className="flex flex-col gap-2.5">
          {faibles.map((f) => (
            <button
              key={f.tag}
              onClick={() => onTrainTag?.(f.tag)}
              className="choice3d p-3.5 text-left"
            >
              <span className="flex items-center justify-between gap-2">
                <span className="text-[14px] font-extrabold text-pat-ink">{tagLabel(f.tag)}</span>
                <span className="shrink-0 rounded-full bg-pat-coralLight px-2.5 py-0.5 text-[11px] font-extrabold text-pat-coralDark">
                  {Math.round(f.taux * 100)} % d'erreurs
                </span>
              </span>
              <span className="mt-2 block h-2 overflow-hidden rounded-full bg-pat-line">
                <span className="block h-full rounded-full bg-pat-coral" style={{ width: `${Math.round(f.taux * 100)}%` }} />
              </span>
              <span className="mt-1.5 block text-[12px] font-bold text-pat-brand">🎯 Lancer un entraînement ciblé</span>
            </button>
          ))}
        </div>
      )}

      {/* Badges */}
      <h3 className="mb-2 mt-7 text-lg font-extrabold text-pat-ink">Badges</h3>
      <div className="grid grid-cols-2 gap-2.5">
        {BADGES.map((b) => {
          const date = badges[b.id];
          return (
            <div key={b.id} className={`rounded-2xl border-2 p-3.5 ${date ? "border-pat-goldDeep bg-white" : "border-pat-line bg-pat-bg opacity-60"}`}>
              <span className={`text-2xl ${date ? "" : "grayscale"}`}>{b.icone}</span>
              <p className="mt-1 text-[13px] font-extrabold text-pat-ink">{b.nom}</p>
              <p className="text-[11px] font-semibold leading-tight text-pat-muted">{b.desc}</p>
            </div>
          );
        })}
      </div>

      {/* Réglages */}
      <h3 className="mb-2 mt-7 text-lg font-extrabold text-pat-ink">Réglages</h3>
      <div className="rounded-2xl border-2 border-pat-line bg-white p-4">
        <p className="text-[13px] font-extrabold text-pat-ink">Clé API Mistral (Coach & Simulation)</p>
        <p className="mt-0.5 text-[12px] font-semibold text-pat-muted">
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
            className="min-w-0 flex-1 rounded-xl border-2 border-pat-line px-3 py-2 text-[14px] font-semibold focus:border-pat-brand focus:outline-none"
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

      <div className="mt-3 rounded-2xl border-2 border-pat-line bg-white p-4">
        <p className="text-[13px] font-extrabold text-pat-ink">URL du Worker (proxy Mistral, optionnel)</p>
        <p className="mt-0.5 text-[12px] font-semibold text-pat-muted">
          Si renseignée, elle remplace la clé ci-dessus : la clé Mistral reste côté serveur (voir formation-cgp/worker/ pour le déploiement).
        </p>
        <div className="mt-2.5 flex gap-2">
          <input
            type="url"
            value={worker}
            onChange={(e) => {
              setWorker(e.target.value);
              setWorkerSaved(false);
            }}
            placeholder="https://formation-cgp-proxy.….workers.dev"
            className="min-w-0 flex-1 rounded-xl border-2 border-pat-line px-3 py-2 text-[14px] font-semibold focus:border-pat-brand focus:outline-none"
          />
          <Btn
            className="px-4 text-[13px]"
            onClick={() => {
              setWorkerUrl(worker);
              setWorkerSaved(true);
            }}
          >
            {workerSaved ? "✓" : "OK"}
          </Btn>
        </div>
      </div>

      <div className="mt-3 rounded-2xl border-2 border-pat-line bg-white p-4">
        {confirmReset ? (
          <div className="flex flex-col gap-2">
            <p className="text-[13px] font-extrabold text-pat-coralDark">Tout effacer (progression, XP, révisions, badges) ? Irréversible.</p>
            <div className="flex gap-2">
              <Btn color="#e5495f" shadow="#c23349" className="flex-1 text-[13px]" onClick={() => { stClearAll(); onReset(); }}>
                Oui, tout effacer
              </Btn>
              <Btn color="#e7e6f0" shadow="#cfccdd" textColor="#777" className="flex-1 text-[13px]" onClick={() => setConfirmReset(false)}>
                Annuler
              </Btn>
            </div>
          </div>
        ) : (
          <button onClick={() => setConfirmReset(true)} className="text-[13px] font-extrabold uppercase tracking-wide text-pat-coral">
            Réinitialiser ma progression
          </button>
        )}
      </div>

      <p className="mt-6 text-center text-[11px] font-semibold leading-relaxed text-pat-muted">
        Contenu pédagogique millésimé loi de finances 2025.
        <br />
        Les barèmes évoluent chaque année : vérifie les valeurs sur bofip.gouv.fr avant tout usage client.
      </p>
    </div>
  );
}

function Stat({ emoji, valeur, label }) {
  return (
    <div className="rounded-2xl border-2 border-pat-line bg-white p-3 text-center">
      <p className="text-xl">{emoji}</p>
      <p className="text-lg font-extrabold leading-tight text-pat-ink">{valeur}</p>
      <p className="text-[11px] font-bold text-pat-muted">{label}</p>
    </div>
  );
}
