import { useState } from "react";
import { QuestionBody } from "../components/steps.jsx";
import { Btn, Mascotte } from "../components/ui.jsx";
import { answerDeckCard, bumpRevisions } from "../lib/storage.js";

// Révision espacée : rejoue les questions ratées, aux échéances 1/3/7/16/35 jours.
export default function Review({ dueCards, onDone, onWrongAgain }) {
  const [file, setFile] = useState(dueCards);
  const [pos, setPos] = useState(0);
  const [sel, setSel] = useState(null);
  const [phase, setPhase] = useState(dueCards.length === 0 ? "vide" : "answer");
  const [correct, setCorrect] = useState(false);
  const [score, setScore] = useState({ ok: 0, total: 0 });

  if (phase === "vide") {
    return (
      <div className="flex flex-col items-center gap-6 px-6 pt-16">
        <Mascotte>Rien à réviser aujourd'hui — tout est frais dans ta mémoire !</Mascotte>
        <p className="text-center text-[14px] font-semibold text-duo-muted">
          Les questions que tu rates en leçon reviennent ici automatiquement,
          <br />à intervalles croissants (1, 3, 7, 16 puis 35 jours).
        </p>
        <span className="text-6xl">🧠</span>
      </div>
    );
  }

  if (phase === "fini") {
    return (
      <div className="anim-pop flex flex-col items-center gap-5 px-6 pt-16">
        <span className="text-6xl">🎉</span>
        <h2 className="text-xl font-extrabold text-duo-text">Révision terminée !</h2>
        <p className="text-[15px] font-bold text-duo-muted">
          {score.ok}/{score.total} bonnes réponses — les échéances sont recalées.
        </p>
        <Btn onClick={onDone}>Retour au parcours</Btn>
      </div>
    );
  }

  const carte = file[pos];
  const step = carte.step;

  const verifier = () => {
    const ok = step.t === "vf" ? sel === step.vrai : sel === step.bonne;
    setCorrect(ok);
    setScore((s) => ({ ok: s.ok + (ok ? 1 : 0), total: s.total + 1 }));
    answerDeckCard(carte.id, ok);
    bumpRevisions();
    if (!ok) onWrongAgain?.(step, carte);
    setPhase("feedback");
  };

  const continuer = () => {
    setSel(null);
    if (pos + 1 >= file.length) setPhase("fini");
    else {
      setPos(pos + 1);
      setPhase("answer");
    }
  };

  return (
    <div className="mx-auto flex w-full max-w-xl flex-col px-5 pb-44 pt-4">
      <div className="mb-4 flex items-center justify-between">
        <span
          className="rounded-full px-3 py-1 text-[11px] font-extrabold uppercase tracking-wider text-white"
          style={{ background: carte.couleur?.base || "#1cb0f6" }}
        >
          {carte.sectionTitre}
        </span>
        <span className="text-[13px] font-extrabold text-duo-muted">
          {pos + 1} / {file.length}
        </span>
      </div>

      <div key={carte.id}>
        <QuestionBody step={step} sel={sel} setSel={setSel} locked={phase === "feedback"} correctShown={phase === "feedback"} />
      </div>

      <div
        className={`fixed inset-x-0 bottom-16 border-t-2 ${
          phase === "feedback" ? (correct ? "border-[#a5ed6e] bg-[#d7ffb8]" : "border-[#ffb2b2] bg-[#ffdfe0]") : "border-duo-line bg-white"
        }`}
      >
        <div className="mx-auto w-full max-w-xl px-5 py-4">
          {phase === "feedback" ? (
            <div className="anim-slide-up flex flex-col gap-3">
              <div className="flex items-start gap-3">
                <span className="text-2xl">{correct ? "✅" : "❌"}</span>
                <div>
                  <p className={`font-extrabold ${correct ? "text-[#58a700]" : "text-duo-redDark"}`}>
                    {correct ? "Bien retenu !" : `Bonne réponse : ${step.t === "vf" ? (step.vrai ? "VRAI" : "FAUX") : step.choix[step.bonne]}`}
                  </p>
                  {step.exp && <p className={`mt-0.5 text-[13px] font-semibold ${correct ? "text-[#58a700]" : "text-duo-redDark"}`}>{step.exp}</p>}
                </div>
              </div>
              <Btn className="w-full" color={correct ? "#58cc02" : "#ff4b4b"} shadow={correct ? "#46a302" : "#ea2b2b"} onClick={continuer}>
                Continuer
              </Btn>
            </div>
          ) : (
            <Btn className="w-full" onClick={verifier} disabled={sel === null}>
              Vérifier
            </Btn>
          )}
        </div>
      </div>
    </div>
  );
}
