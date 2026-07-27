import { useEffect, useMemo, useRef, useState } from "react";
import { SECTIONS, LECONS, EXAM_SEUIL } from "../data/curriculum.js";
import { OBJECTIONS } from "../data/objections.js";
import { objectionDuJour, getObjVues, markObjVue } from "../lib/storage.js";
import { Btn } from "../components/ui.jsx";

// Décalages horizontaux du chemin sinueux
const OFFSETS = [0, -55, -85, -55, 0, 55, 85, 55];

export default function Path({ progress, exams, onStartLesson, onStartExam }) {
  const currentRef = useRef(null);
  useEffect(() => {
    currentRef.current?.scrollIntoView({ block: "center", behavior: "instant" });
  }, []);

  // Déverrouillage linéaire : une leçon est jouable si la précédente est terminée…
  const firstLockedIndex = LECONS.findIndex((l) => !progress[l.id]);
  const isUnlockedLineaire = (globalIdx) => firstLockedIndex === -1 || globalIdx <= firstLockedIndex;

  // …ET si sa section est ouverte : examen de la section précédente réussi.
  // Clause « grand-père » : un utilisateur qui avait déjà commencé la section
  // avant l'introduction des examens n'est jamais re-verrouillé.
  const sectionOuverte = (si) => {
    if (si === 0) return true;
    const prev = SECTIONS[si - 1];
    if (exams[prev.id]?.reussi) return true;
    return SECTIONS[si].unites.flatMap((u) => u.lecons).some((l) => progress[l.id]);
  };

  let globalIdx = -1;

  return (
    <div className="pb-8">
      <ObjectionDuJour />

      {SECTIONS.map((section, si) => {
        const lecons = section.unites.flatMap((u) => u.lecons);
        const faites = lecons.filter((l) => progress[l.id]).length;
        const ouverte = sectionOuverte(si);
        const toutesFaites = faites === lecons.length;
        const exam = exams[section.id];
        return (
          <div key={section.id}>
            {/* Bandeau de section */}
            <div
              className="sticky top-0 z-20 mx-4 mt-4 rounded-2xl px-5 py-4 text-white shadow-md"
              style={{ background: `linear-gradient(135deg, ${section.couleur.base}, ${section.couleur.dark})` }}
            >
              <p className="text-[11px] font-extrabold uppercase tracking-widest opacity-80">
                Section {si + 1} · {faites}/{lecons.length} leçons {exam?.reussi && "· examen validé ✓"}
              </p>
              <h2 className="text-lg font-extrabold leading-tight">
                {section.emoji} {section.titre}
              </h2>
              <p className="text-[13px] font-semibold opacity-80">{section.sousTitre}</p>
              {!ouverte && (
                <p className="mt-1.5 inline-block rounded-full bg-white/20 px-2.5 py-0.5 text-[11px] font-extrabold uppercase tracking-wider">
                  🔒 Réussis l'examen de la section {si} pour débloquer
                </p>
              )}
            </div>

            {section.unites.map((unite) => (
              <div key={unite.id}>
                {/* Séparateur d'unité */}
                <div className="mx-8 my-5 flex items-center gap-3">
                  <div className="h-0.5 flex-1 rounded bg-pat-line" />
                  <span className="text-[12px] font-extrabold uppercase tracking-wider text-pat-muted">{unite.titre}</span>
                  <div className="h-0.5 flex-1 rounded bg-pat-line" />
                </div>

                {/* Nœuds de leçons (médaillons) */}
                <div className="flex flex-col items-center gap-7">
                  {unite.lecons.map((lecon) => {
                    globalIdx += 1;
                    const idx = globalIdx;
                    const done = !!progress[lecon.id];
                    const unlocked = ouverte && isUnlockedLineaire(idx);
                    const isCurrent = unlocked && !done;
                    const offset = OFFSETS[idx % OFFSETS.length];
                    const perfect = done && progress[lecon.id].precision >= 100;
                    // Taille du médaillon selon l'importance de la leçon (densité de questions)
                    const nbQuestions = lecon.steps.filter((s) => s.t !== "concept").length;
                    const taille = nbQuestions >= 6 ? 74 : 62;
                    return (
                      <div key={lecon.id} style={{ transform: `translateX(${offset}px)` }} className="relative">
                        {isCurrent && (
                          <div
                            ref={currentRef}
                            className="anim-float absolute -top-11 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-xl border-2 border-pat-line bg-white px-3 py-1.5 text-[12px] font-extrabold uppercase tracking-wider shadow-sm"
                            style={{ color: section.couleur.base }}
                          >
                            Commencer
                            <span className="absolute -bottom-[7px] left-1/2 h-3 w-3 -translate-x-1/2 rotate-45 border-b-2 border-r-2 border-pat-line bg-white" />
                          </div>
                        )}
                        <button
                          onClick={() => unlocked && onStartLesson(lecon.id)}
                          disabled={!unlocked}
                          aria-label={lecon.titre}
                          className={`relative flex items-center justify-center rounded-full text-3xl transition-transform active:scale-95 ${isCurrent ? "anim-pulse-ring" : ""}`}
                          style={{
                            width: taille,
                            height: taille,
                            background: unlocked ? section.couleur.base : "#e7e6f0",
                            boxShadow: `0 6px 0 ${unlocked ? section.couleur.dark : "#cfccdd"}, inset 0 0 0 4px rgba(255,255,255,0.28)`,
                          }}
                        >
                          <span className={unlocked ? "" : "grayscale opacity-60"}>{done ? (perfect ? "👑" : "⭐") : unlocked ? lecon.emoji : "🔒"}</span>
                        </button>
                        <p className="mt-1.5 max-w-[110px] text-center text-[11px] font-bold leading-tight text-pat-muted">{lecon.titre}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}

            {/* Nœud d'examen (écusson doré, dernier nœud de la section) */}
            <div className="mt-7 flex flex-col items-center">
              <button
                onClick={() => toutesFaites && onStartExam(section)}
                disabled={!toutesFaites}
                aria-label={`Examen de la section ${section.titre}`}
                className="shield-node relative flex h-[88px] w-[82px] items-center justify-center text-4xl transition-transform active:scale-95"
                style={{
                  background: toutesFaites
                    ? "linear-gradient(160deg, #f2b01e, #d97706)"
                    : "#e7e6f0",
                  filter: `drop-shadow(0 5px 0 ${toutesFaites ? "#a85a04" : "#cfccdd"})`,
                }}
              >
                <span className={toutesFaites ? "" : "grayscale opacity-60"}>{exam?.reussi ? "🏅" : toutesFaites ? "🏆" : "🔒"}</span>
              </button>
              <p className="mt-2 text-center text-[12px] font-extrabold uppercase tracking-wider text-pat-goldDeep">
                Examen{exam ? ` · ${exam.note} %` : ""}
              </p>
              <p className="max-w-[220px] text-center text-[11px] font-semibold leading-tight text-pat-muted">
                {exam?.reussi
                  ? "Validé — rejouable pour le plaisir"
                  : toutesFaites
                    ? `${EXAM_SEUIL} % requis pour débloquer la suite`
                    : "Termine toutes les leçons de la section"}
              </p>
            </div>
          </div>
        );
      })}

      {/* Fin de parcours */}
      <div className="mx-auto mt-10 flex flex-col items-center gap-2 pb-4">
        <span className="text-4xl">🎓</span>
        <p className="text-sm font-extrabold text-pat-muted">Fin du parcours — CGP en devenir</p>
      </div>
    </div>
  );
}

// ============================================================
// OBJECTION DU JOUR — carte permanente au-dessus du chemin.
// Contenu 100 % pré-écrit (src/data/objections.js), zéro appel IA,
// aucun impact sur XP / série.
// ============================================================
function ObjectionDuJour() {
  const objection = useMemo(() => objectionDuJour(OBJECTIONS), []);
  const [faite, setFaite] = useState(() => {
    const vue = getObjVues()[objection.id];
    return !!vue && new Date(vue).toDateString() === new Date().toDateString();
  });
  const [ouvert, setOuvert] = useState(false);
  const [reponse, setReponse] = useState("");
  const [correction, setCorrection] = useState(false);

  const terminer = () => {
    markObjVue(objection.id);
    setFaite(true);
    setOuvert(false);
  };

  return (
    <>
      <button
        onClick={() => setOuvert(true)}
        className="mx-4 mt-4 flex w-[calc(100%-2rem)] items-center gap-3 rounded-2xl border-2 border-pat-goldDeep/30 bg-pat-goldLight px-4 py-3 text-left transition active:scale-[0.99]"
      >
        <span className="text-3xl">{faite ? "✅" : "💬"}</span>
        <span className="min-w-0 flex-1">
          <span className="block text-[11px] font-extrabold uppercase tracking-widest text-pat-goldDeep">
            Objection du jour · {objection.theme}
          </span>
          <span className="block truncate text-[13px] font-bold text-pat-ink">
            {faite ? "Traitée — reviens demain pour la suivante !" : objection.objection}
          </span>
        </span>
        {!faite && <span className="text-[12px] font-extrabold uppercase tracking-wide text-pat-goldDeep">2 min</span>}
      </button>

      {ouvert && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 sm:items-center" onClick={() => setOuvert(false)}>
          <div
            className="anim-slide-up max-h-[88vh] w-full max-w-lg overflow-y-auto rounded-t-3xl bg-white p-5 sm:rounded-3xl"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="text-[11px] font-extrabold uppercase tracking-widest text-pat-goldDeep">
              💬 Objection du jour · {objection.theme}
            </p>
            <p className="mt-2 rounded-2xl rounded-tl-none border-2 border-pat-line bg-pat-bg p-4 text-[15px] font-bold italic leading-snug text-pat-ink">
              {objection.objection}
            </p>

            {!correction ? (
              <>
                <p className="mt-3 text-[13px] font-bold text-pat-muted">Formule ta réponse comme en entretien (à voix haute ou par écrit) :</p>
                <textarea
                  value={reponse}
                  onChange={(e) => setReponse(e.target.value)}
                  rows={3}
                  placeholder="Ta réponse au client…"
                  className="mt-2 w-full rounded-xl border-2 border-pat-line p-3 text-[14px] font-semibold focus:border-pat-brand focus:outline-none"
                />
                <div className="mt-3 flex flex-col gap-2">
                  <Btn className="w-full" onClick={() => setCorrection(true)}>
                    Voir la correction
                  </Btn>
                  <button onClick={() => setOuvert(false)} className="py-1.5 text-[13px] font-extrabold uppercase tracking-wide text-pat-muted">
                    Plus tard
                  </button>
                </div>
              </>
            ) : (
              <>
                {reponse.trim() && (
                  <div className="mt-3 rounded-2xl border-2 border-pat-line p-3.5">
                    <p className="text-[11px] font-extrabold uppercase tracking-widest text-pat-muted">Ta réponse</p>
                    <p className="mt-1 text-[13px] font-semibold text-pat-ink">{reponse}</p>
                  </div>
                )}
                <div className="mt-3 rounded-2xl bg-pat-mintLight p-4">
                  <p className="text-[11px] font-extrabold uppercase tracking-widest text-pat-mintDeep">Réponse de pro (A.C.R.C.)</p>
                  <p className="mt-1 text-[14px] font-semibold leading-snug text-pat-ink">{objection.reponse}</p>
                </div>
                {objection.astuce && (
                  <div className="mt-2 rounded-2xl bg-pat-brandLight p-4">
                    <p className="text-[11px] font-extrabold uppercase tracking-widest text-pat-brandDark">Astuce terrain</p>
                    <p className="mt-1 text-[13px] font-semibold leading-snug text-pat-ink">{objection.astuce}</p>
                  </div>
                )}
                <Btn className="mt-3 w-full" color="#0e9a6d" shadow="#0b7a55" onClick={terminer}>
                  J'ai terminé
                </Btn>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
