import { useCallback, useState } from "react";
import { leconById, LECONS, SECTIONS, buildExam, buildSessionCible, EXAM_SEUIL } from "./data/curriculum.js";
import {
  getProgress, saveLessonResult, getXp, addXp, markActiveToday, calcStreak,
  addToDeck, deckDue, logErreur, getBadges, unlockBadge, BADGES, stGet,
  getExams, saveExamResult,
} from "./lib/storage.js";
import Path from "./screens/Path.jsx";
import Lesson from "./screens/Lesson.jsx";
import Review from "./screens/Review.jsx";
import Coach from "./screens/Coach.jsx";
import Simulation from "./screens/Simulation.jsx";
import Profile from "./screens/Profile.jsx";
import { BadgeToast, Embleme } from "./components/ui.jsx";

const ONGLETS = [
  { id: "parcours", label: "Parcours", emoji: "🗺️" },
  { id: "revision", label: "Réviser", emoji: "🧠" },
  { id: "coach", label: "Coach", emoji: "🧑‍🏫" },
  { id: "simu", label: "Clients", emoji: "🎭" },
  { id: "profil", label: "Profil", emoji: "👤" },
];

export default function App() {
  const [onglet, setOnglet] = useState("parcours");
  const [leconActive, setLeconActive] = useState(null); // leçon, examen ou session ciblée
  const [progress, setProgress] = useState(getProgress);
  const [exams, setExams] = useState(getExams);
  const [xp, setXp] = useState(getXp);
  const [streak, setStreak] = useState(calcStreak);
  const [toastQueue, setToastQueue] = useState([]);
  const [reviewSession, setReviewSession] = useState(null); // cartes dues figées à l'ouverture

  const dueCount = deckDue().length;

  const pousserBadge = useCallback((id) => {
    if (unlockBadge(id)) {
      const def = BADGES.find((b) => b.id === id);
      if (def) setToastQueue((q) => [...q, def]);
    }
  }, []);

  // ---- Fin de leçon / examen / session ciblée ----
  const finirLecon = useCallback(
    ({ precision, xp: xpGagne }) => {
      const lecon = leconActive;
      const nouveauXp = addXp(xpGagne);
      markActiveToday();
      setXp(nouveauXp);
      setStreak(calcStreak());
      setLeconActive(null);

      if (lecon.examen) {
        // Examen de section : résultat à part, ne touche pas à la progression des leçons
        setExams({ ...saveExamResult(lecon.sectionId, precision, EXAM_SEUIL) });
        if (calcStreak() >= 7) pousserBadge("streak_7");
        return;
      }
      if (lecon.cible) {
        // Session ciblée (points faibles) : XP seulement
        if (calcStreak() >= 7) pousserBadge("streak_7");
        return;
      }

      const nouveauProgress = saveLessonResult(lecon.id, { precision, xp: xpGagne });
      setProgress({ ...nouveauProgress });

      const nbFaites = LECONS.filter((l) => nouveauProgress[l.id]).length;
      pousserBadge("premiere_lecon");
      if (nbFaites >= 10) pousserBadge("dix_lecons");
      if (precision >= 100) pousserBadge("perfection");
      if (SECTIONS.some((s) => s.unites.flatMap((u) => u.lecons).every((l) => nouveauProgress[l.id]))) pousserBadge("section_finie");
      if (nbFaites >= LECONS.length) pousserBadge("expert");
      if (calcStreak() >= 7) pousserBadge("streak_7");
    },
    [leconActive, pousserBadge]
  );

  // ---- Erreur en leçon : historique Coach + paquet de révision ----
  // En examen / session ciblée, _origine ramène à la leçon d'origine.
  const surErreur = useCallback((step, stepIndex, sel) => {
    const lecon = leconActive;
    addToDeck(step, {
      leconId: step._origine?.leconId ?? lecon.id,
      stepIndex: step._origine?.stepIndex ?? stepIndex,
      sectionTitre: lecon.sectionTitre,
      couleur: lecon.couleur,
      tag: step._origine?.tag ?? lecon.tag,
    });
    const bonne = step.t === "vf" ? (step.vrai ? "VRAI" : "FAUX") : step.choix?.[step.bonne];
    const mauvaise = step.t === "vf" ? (sel ? "VRAI" : "FAUX") : step.choix?.[sel];
    logErreur({ q: step.q || step.phrase, mauvaise, bonne, exp: step.exp, section: lecon.sectionTitre, tag: step._origine?.tag ?? lecon.tag });
  }, [leconActive]);

  const ouvrirRevision = () => {
    setReviewSession(deckDue());
    setOnglet("revision");
  };

  const finirRevision = () => {
    markActiveToday();
    setStreak(calcStreak());
    if (stGet("nbRevisions", 0) >= 25) pousserBadge("reviseur");
    setReviewSession(null);
    setOnglet("parcours");
    setProgress({ ...getProgress() });
  };

  // ---- Leçon / examen / session ciblée en plein écran ----
  if (leconActive) {
    return (
      <Lesson
        key={leconActive.id}
        lecon={leconActive}
        onQuit={() => setLeconActive(null)}
        onFinish={{
          onComplete: finirLecon,
          onWrong: surErreur,
          // Depuis l'écran d'échec d'examen : ouvrir directement une leçon faible
          onRevoirLecon: (id) => setLeconActive(leconById(id)),
        }}
      />
    );
  }

  return (
    <div className="mx-auto flex h-screen max-w-2xl flex-col">
      {/* Barre du haut : série + XP */}
      <header className="z-30 flex items-center justify-between border-b-2 border-pat-line bg-white px-5 py-2.5">
        <div className="flex items-center gap-2">
          <Embleme size={26} />
          <span className="font-display text-[16px] font-bold tracking-tight text-pat-ink">Patrimonio</span>
        </div>
        <div className="flex items-center gap-4">
          <span className={`flex items-center gap-1 text-[15px] font-extrabold ${streak > 0 ? "text-pat-goldDeep" : "text-pat-line"}`} title="Série : jours d'activité consécutifs">
            🔥 {streak}
          </span>
          <span className="flex items-center gap-1 text-[15px] font-extrabold text-pat-brand" title="Points d'expérience">
            ⚡ {xp}
          </span>
        </div>
      </header>

      {/* Contenu de l'onglet */}
      <main key={onglet} className="anim-screen flex-1 overflow-y-auto bg-white pb-20">
        {onglet === "parcours" && (
          <Path
            progress={progress}
            exams={exams}
            onStartLesson={(id) => setLeconActive(leconById(id))}
            onStartExam={(section) => setLeconActive(buildExam(section, progress))}
          />
        )}
        {onglet === "revision" && (
          <Review
            dueCards={reviewSession ?? deckDue()}
            onDone={finirRevision}
            onWrongAgain={() => {}}
          />
        )}
        {onglet === "coach" && <Coach />}
        {onglet === "simu" && <Simulation onSimDone={() => pousserBadge("premiere_simu")} />}
        {onglet === "profil" && (
          <Profile
            progress={progress}
            xp={xp}
            streak={streak}
            onReset={() => window.location.reload()}
            onTrainTag={(tag) => {
              const session = buildSessionCible(tag);
              if (session) setLeconActive(session);
            }}
          />
        )}
      </main>

      {/* Navigation basse */}
      <nav className="fixed inset-x-0 bottom-0 z-30 border-t-2 border-pat-line bg-white">
        <div className="mx-auto flex max-w-2xl">
          {ONGLETS.map((o) => {
            const actif = onglet === o.id;
            return (
              <button
                key={o.id}
                onClick={() => (o.id === "revision" ? ouvrirRevision() : setOnglet(o.id))}
                className="relative flex flex-1 flex-col items-center gap-0.5 py-2"
              >
                <span className={`rounded-xl px-3 py-0.5 text-2xl transition ${actif ? "bg-[#e6e9fb]" : ""}`}>{o.emoji}</span>
                <span className={`text-[10px] font-extrabold uppercase tracking-wide ${actif ? "text-pat-brand" : "text-pat-muted"}`}>{o.label}</span>
                {o.id === "revision" && dueCount > 0 && (
                  <span className="absolute right-[22%] top-0.5 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-pat-coral px-1 text-[11px] font-extrabold text-white">
                    {dueCount}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </nav>

      {/* Toast badge (un à la fois) */}
      {toastQueue.length > 0 && (
        <BadgeToast badge={toastQueue[0]} onDone={() => setToastQueue((q) => q.slice(1))} />
      )}
    </div>
  );
}
