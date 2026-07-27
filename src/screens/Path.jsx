import { useEffect, useRef } from "react";
import { SECTIONS, LECONS } from "../data/curriculum.js";

// Décalages horizontaux du chemin (cycle sinusoïdal, façon Duolingo)
const OFFSETS = [0, -55, -85, -55, 0, 55, 85, 55];

export default function Path({ progress, onStartLesson }) {
  const currentRef = useRef(null);
  useEffect(() => {
    currentRef.current?.scrollIntoView({ block: "center", behavior: "instant" });
  }, []);

  // Déverrouillage linéaire : une leçon est jouable si la précédente est terminée
  const firstLockedIndex = LECONS.findIndex((l) => !progress[l.id]);
  const isUnlocked = (globalIdx) => firstLockedIndex === -1 || globalIdx <= firstLockedIndex;

  let globalIdx = -1;

  return (
    <div className="pb-8">
      {SECTIONS.map((section, si) => {
        const lecons = section.unites.flatMap((u) => u.lecons);
        const faites = lecons.filter((l) => progress[l.id]).length;
        return (
          <div key={section.id}>
            {/* Bandeau de section */}
            <div
              className="sticky top-0 z-20 mx-4 mt-4 rounded-2xl px-5 py-4 text-white shadow-md"
              style={{ background: `linear-gradient(135deg, ${section.couleur.base}, ${section.couleur.dark})` }}
            >
              <p className="text-[11px] font-extrabold uppercase tracking-widest opacity-80">
                Section {si + 1} · {faites}/{lecons.length} leçons
              </p>
              <h2 className="text-lg font-extrabold leading-tight">
                {section.emoji} {section.titre}
              </h2>
              <p className="text-[13px] font-semibold opacity-80">{section.sousTitre}</p>
            </div>

            {section.unites.map((unite) => (
              <div key={unite.id}>
                {/* Séparateur d'unité */}
                <div className="mx-8 my-5 flex items-center gap-3">
                  <div className="h-0.5 flex-1 rounded bg-duo-line" />
                  <span className="text-[12px] font-extrabold uppercase tracking-wider text-duo-muted">{unite.titre}</span>
                  <div className="h-0.5 flex-1 rounded bg-duo-line" />
                </div>

                {/* Nœuds de leçons */}
                <div className="flex flex-col items-center gap-7">
                  {unite.lecons.map((lecon) => {
                    globalIdx += 1;
                    const idx = globalIdx;
                    const done = !!progress[lecon.id];
                    const unlocked = isUnlocked(idx);
                    const isCurrent = unlocked && !done;
                    const offset = OFFSETS[idx % OFFSETS.length];
                    const perfect = done && progress[lecon.id].precision >= 100;
                    return (
                      <div key={lecon.id} style={{ transform: `translateX(${offset}px)` }} className="relative">
                        {isCurrent && (
                          <div
                            ref={currentRef}
                            className="anim-float absolute -top-11 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-xl border-2 border-duo-line bg-white px-3 py-1.5 text-[12px] font-extrabold uppercase tracking-wider shadow-sm"
                            style={{ color: section.couleur.base }}
                          >
                            Commencer
                            <span className="absolute -bottom-[7px] left-1/2 h-3 w-3 -translate-x-1/2 rotate-45 border-b-2 border-r-2 border-duo-line bg-white" />
                          </div>
                        )}
                        <button
                          onClick={() => unlocked && onStartLesson(lecon.id)}
                          disabled={!unlocked}
                          aria-label={lecon.titre}
                          className={`relative flex h-[68px] w-[68px] items-center justify-center rounded-full text-3xl transition-transform active:scale-95 ${isCurrent ? "anim-pulse-ring" : ""}`}
                          style={{
                            background: unlocked ? section.couleur.base : "#e5e5e5",
                            boxShadow: `0 6px 0 ${unlocked ? section.couleur.dark : "#c9c9c9"}`,
                          }}
                        >
                          <span className={unlocked ? "" : "grayscale opacity-60"}>{done ? (perfect ? "👑" : "⭐") : unlocked ? lecon.emoji : "🔒"}</span>
                        </button>
                        <p className="mt-1.5 max-w-[110px] text-center text-[11px] font-bold leading-tight text-duo-muted">{lecon.titre}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        );
      })}

      {/* Fin de parcours */}
      <div className="mx-auto mt-10 flex flex-col items-center gap-2 pb-4">
        <span className="text-4xl">🎓</span>
        <p className="text-sm font-extrabold text-duo-muted">Fin du parcours — CGP en devenir</p>
      </div>
    </div>
  );
}
