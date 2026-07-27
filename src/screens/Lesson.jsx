import { useMemo, useState } from "react";
import { TYPES_QUESTIONS, EXAM_SEUIL, leconById } from "../data/curriculum.js";
import { bumpTagStat } from "../lib/storage.js";
import { ConceptCard, QuestionBody, MatchBoard } from "../components/steps.jsx";
import { Btn, Confetti, XpCounter } from "../components/ui.jsx";

const FELICITATIONS = ["Excellent !", "Bien joué !", "Parfait !", "Exactement !", "Tu gères !"];
const ENCOURAGEMENTS = ["Pas grave, on la reverra !", "Presque ! Retiens la correction.", "C'est en se trompant qu'on apprend."];

// Sert trois modes : leçon classique, examen de section (lecon.examen),
// session ciblée par tag (lecon.cible). En examen : pas de seconde chance,
// et l'écran de fin pointe les leçons à revoir sous le seuil de 80 %.
export default function Lesson({ lecon, onQuit, onFinish }) {
  const couleur = lecon.couleur;
  const examen = !!lecon.examen;
  const [queue, setQueue] = useState(() => lecon.steps.map((step, i) => ({ step, stepIndex: i, retry: false, uid: `${i}` })));
  const [pos, setPos] = useState(0);
  const [sel, setSel] = useState(null);
  const [phase, setPhase] = useState("answer"); // answer | feedback | done
  const [correct, setCorrect] = useState(false);
  const [combo, setCombo] = useState(0);
  const [stats, setStats] = useState({ xp: 0, firstOk: 0, comboMax: 0, done: 0 });
  const [fautes, setFautes] = useState([]); // origines des erreurs (examen)
  const [confirmQuit, setConfirmQuit] = useState(false);
  const [msgFeedback, setMsgFeedback] = useState("");

  const nbAnswerable = useMemo(() => lecon.steps.filter((s) => TYPES_QUESTIONS.includes(s.t)).length, [lecon]);
  const item = queue[pos];
  const step = item?.step;
  const progression = stats.done / queue.length;

  const estBonneReponse = () => {
    if (step.t === "vf") return sel === step.vrai;
    return sel === step.bonne;
  };

  const verifier = () => {
    const ok = estBonneReponse();
    setCorrect(ok);
    setMsgFeedback(ok ? FELICITATIONS[Math.floor(Math.random() * FELICITATIONS.length)] : ENCOURAGEMENTS[Math.floor(Math.random() * ENCOURAGEMENTS.length)]);
    const nouveauCombo = ok ? combo + 1 : 0;
    setCombo(nouveauCombo);
    setStats((s) => ({
      ...s,
      xp: s.xp + (ok ? (item.retry ? 5 : 10) : 0),
      firstOk: s.firstOk + (ok && !item.retry ? 1 : 0),
      comboMax: Math.max(s.comboMax, nouveauCombo),
    }));
    if (!item.retry) bumpTagStat(step._origine?.tag ?? lecon.tag, ok);
    if (!ok && !item.retry) {
      if (step._origine) setFautes((f) => [...f, step._origine]);
      // en examen : pas de seconde chance, la question ne revient pas
      if (!examen) setQueue((q) => [...q, { ...item, retry: true, uid: item.uid + "r" }]);
      onFinish.onWrong?.(step, item.stepIndex, sel);
    }
    setPhase("feedback");
  };

  const continuer = () => {
    setStats((s) => ({ ...s, done: s.done + 1 }));
    setSel(null);
    setPhase("answer");
    if (pos + 1 >= queue.length) {
      terminer();
    } else {
      setPos(pos + 1);
    }
  };

  const passerConcept = () => {
    setStats((s) => ({ ...s, xp: s.xp + 2, done: s.done + 1 }));
    if (pos + 1 >= queue.length) terminer();
    else setPos(pos + 1);
  };

  const finMatch = (erreurs) => {
    setStats((s) => ({ ...s, xp: s.xp + (erreurs === 0 ? 10 : 5), done: s.done + 1 }));
    if (pos + 1 >= queue.length) terminer();
    else setPos(pos + 1);
  };

  const terminer = () => setPhase("done");

  // ---------- Écran de fin ----------
  if (phase === "done") {
    const precision = nbAnswerable > 0 ? Math.round((stats.firstOk / nbAnswerable) * 100) : 100;

    if (examen) {
      const reussi = precision >= EXAM_SEUIL;
      const xpFinal = stats.xp + (reussi ? 40 : 0);
      // Regroupe les erreurs par leçon d'origine pour orienter la révision
      const faibles = Object.values(
        fautes.reduce((acc, o) => {
          acc[o.leconId] = acc[o.leconId] || { ...o, n: 0 };
          acc[o.leconId].n += 1;
          return acc;
        }, {})
      ).sort((a, b) => b.n - a.n);
      return (
        <div className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-5 overflow-y-auto bg-white px-6 py-10">
          {reussi && <Confetti />}
          <span className="anim-pop text-7xl">{reussi ? "🏅" : "📚"}</span>
          <h2 className="anim-fade-up text-center text-2xl font-extrabold" style={{ color: reussi ? "#a16207" : couleur.base }}>
            {reussi ? "Examen réussi !" : "Pas encore…"}
          </h2>
          <div className="anim-fade-up flex gap-3" style={{ animationDelay: "0.15s" }}>
            <Tile label="Score" color={reussi ? "#a16207" : "#c23349"}>
              🎯 {precision} %
            </Tile>
            <Tile label="XP gagnés" color="#4152b3">
              ⚡ <XpCounter value={xpFinal} />
            </Tile>
          </div>
          <p className="anim-fade-up max-w-sm text-center text-[14px] font-semibold text-pat-muted" style={{ animationDelay: "0.2s" }}>
            {reussi
              ? `Plus de ${EXAM_SEUIL} % de bonnes réponses : la section suivante est débloquée.`
              : `Il faut ${EXAM_SEUIL} % de bonnes réponses pour débloquer la suite. Revois les leçons ci-dessous puis retente l'examen.`}
          </p>
          {!reussi && faibles.length > 0 && (
            <div className="anim-fade-up flex w-full max-w-sm flex-col gap-2" style={{ animationDelay: "0.25s" }}>
              <p className="text-[12px] font-extrabold uppercase tracking-widest text-pat-muted">Leçons à revoir</p>
              {faibles.map((f) => (
                <button
                  key={f.leconId}
                  onClick={() => onFinish.onRevoirLecon?.(f.leconId)}
                  className="choice3d flex items-center justify-between p-3.5 text-[14px] font-bold text-pat-ink"
                >
                  <span>{leconById(f.leconId)?.emoji} {f.leconTitre}</span>
                  <span className="text-[12px] font-extrabold text-pat-coralDark">
                    {f.n} erreur{f.n > 1 ? "s" : ""}
                  </span>
                </button>
              ))}
            </div>
          )}
          <div className="anim-fade-up w-full max-w-sm" style={{ animationDelay: "0.3s" }}>
            <Btn className="w-full" onClick={() => onFinish.onComplete({ precision, xp: xpFinal })}>
              Continuer
            </Btn>
          </div>
        </div>
      );
    }

    const xpFinal = stats.xp + 20; // bonus de fin de leçon
    return (
      <div className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-6 bg-white px-6">
        <Confetti />
        <span className="anim-pop text-7xl">{precision >= 100 ? "👑" : precision >= 70 ? "🎉" : "💪"}</span>
        <h2 className="anim-fade-up text-center text-2xl font-extrabold" style={{ color: couleur.base }}>
          {lecon.cible ? "Entraînement terminé !" : "Leçon terminée !"}
        </h2>
        <div className="anim-fade-up flex gap-3" style={{ animationDelay: "0.15s" }}>
          <Tile label="XP gagnés" color="#a16207">
            ⚡ <XpCounter value={xpFinal} />
          </Tile>
          <Tile label="Précision" color={precision >= 70 ? "#067a53" : "#b45309"}>
            🎯 {precision} %
          </Tile>
          <Tile label="Meilleure série" color="#4152b3">
            🔥 {stats.comboMax}
          </Tile>
        </div>
        <div className="anim-fade-up w-full max-w-sm" style={{ animationDelay: "0.3s" }}>
          <Btn className="w-full" color={couleur.base} shadow={couleur.dark} onClick={() => onFinish.onComplete({ precision, xp: xpFinal })}>
            Continuer
          </Btn>
        </div>
      </div>
    );
  }

  // ---------- Écran de leçon ----------
  const estQuestion = TYPES_QUESTIONS.includes(step.t);

  return (
    <div className="fixed inset-0 z-40 flex flex-col bg-white">
      {/* Header : quitter + progression + combo */}
      <div className="mx-auto flex w-full max-w-xl items-center gap-3 px-4 pb-2 pt-4">
        <button onClick={() => setConfirmQuit(true)} className="text-2xl text-pat-muted transition hover:text-pat-ink" aria-label="Quitter">
          ✕
        </button>
        {examen && (
          <span className="rounded-full bg-pat-goldLight px-2.5 py-0.5 text-[11px] font-extrabold uppercase tracking-wider text-pat-goldDeep">
            Examen
          </span>
        )}
        <div className="lesson-bar">
          <div style={{ width: `${Math.max(4, progression * 100)}%`, background: examen ? "#d97706" : couleur.base }} />
        </div>
        {combo >= 2 && (
          <span key={combo} className="anim-pop flex items-center gap-1 text-[15px] font-extrabold text-pat-goldDeep">
            🔥 {combo}
          </span>
        )}
      </div>

      {/* Contenu du step */}
      <div key={item.uid} className="mx-auto w-full max-w-xl flex-1 overflow-y-auto px-5 pb-40 pt-4">
        {item.retry && <p className="mb-3 inline-block rounded-full bg-pat-goldLight px-3 py-1 text-[12px] font-extrabold uppercase tracking-wider text-pat-goldDeep">Question à retenter</p>}
        {step.t === "concept" && <ConceptCard step={step} couleur={couleur} />}
        {estQuestion && <QuestionBody step={step} sel={sel} setSel={setSel} locked={phase === "feedback"} correctShown={phase === "feedback"} />}
        {step.t === "match" && <MatchBoard step={step} onDone={finMatch} />}
      </div>

      {/* Footer : vérifier / feedback */}
      <div
        className={`fixed inset-x-0 bottom-0 border-t-2 ${
          phase === "feedback" ? (correct ? "border-[#9adfc3] bg-[#dcf5eb]" : "border-[#f4b7c2] bg-[#fde3e8]") : "border-pat-line bg-white"
        }`}
      >
        <div className="mx-auto w-full max-w-xl px-5 py-4">
          {phase === "feedback" ? (
            <div className="anim-slide-up flex flex-col gap-3">
              <div className="flex items-start gap-3">
                <span className="text-3xl">{correct ? "✅" : "❌"}</span>
                <div className="min-w-0">
                  <p className={`text-lg font-extrabold ${correct ? "text-[#067a53]" : "text-pat-coralDark"}`}>{msgFeedback}</p>
                  {!correct && (
                    <p className="text-[14px] font-bold text-pat-coralDark">
                      Bonne réponse : {step.t === "vf" ? (step.vrai ? "VRAI" : "FAUX") : step.choix[step.bonne]}
                    </p>
                  )}
                  {step.exp && <p className={`mt-1 text-[14px] font-semibold leading-snug ${correct ? "text-[#067a53]" : "text-pat-coralDark"}`}>{step.exp}</p>}
                </div>
              </div>
              <Btn
                className="w-full"
                color={correct ? "#0e9a6d" : "#e5495f"}
                shadow={correct ? "#0b7a55" : "#c23349"}
                onClick={continuer}
              >
                Continuer
              </Btn>
            </div>
          ) : step.t === "concept" ? (
            <Btn className="w-full" color={couleur.base} shadow={couleur.dark} onClick={passerConcept}>
              J'ai compris
            </Btn>
          ) : step.t === "match" ? (
            <p className="py-2 text-center text-[13px] font-bold text-pat-muted">Associe toutes les paires pour continuer</p>
          ) : (
            <Btn className="w-full" onClick={verifier} disabled={sel === null}>
              Vérifier
            </Btn>
          )}
        </div>
      </div>

      {/* Confirmation de sortie */}
      {confirmQuit && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-6">
          <div className="anim-pop w-full max-w-sm rounded-3xl bg-white p-6 text-center">
            <span className="text-5xl">🥺</span>
            <h3 className="mt-2 text-lg font-extrabold text-pat-ink">Tu pars déjà ?</h3>
            <p className="mt-1 text-[14px] font-semibold text-pat-muted">
              {examen ? "L'examen sera à refaire entièrement." : "Ta progression dans cette leçon sera perdue."}
            </p>
            <div className="mt-5 flex flex-col gap-2.5">
              <Btn onClick={() => setConfirmQuit(false)}>{examen ? "Continuer l'examen" : "Continuer la leçon"}</Btn>
              <button onClick={onQuit} className="py-2 text-[14px] font-extrabold uppercase tracking-wide text-pat-coral">
                Abandonner
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Tile({ label, color, children }) {
  return (
    <div className="anim-xp min-w-[100px] overflow-hidden rounded-2xl border-2" style={{ borderColor: color }}>
      <p className="px-3 py-1 text-center text-[11px] font-extrabold uppercase tracking-wider text-white" style={{ background: color }}>
        {label}
      </p>
      <p className="bg-white px-3 py-2.5 text-center text-lg font-extrabold text-pat-ink">{children}</p>
    </div>
  );
}
