import { useMemo, useState } from "react";

// ---------- Carte-concept : une idée, 3 points, un exemple ----------
export function ConceptCard({ step, couleur }) {
  return (
    <div className="anim-fade-up flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <span className="text-5xl">{step.emoji}</span>
        <h2 className="text-xl font-extrabold leading-tight text-pat-ink">{step.titre}</h2>
      </div>
      <div className="flex flex-col gap-2.5">
        {step.points.map((p, i) => (
          <div
            key={i}
            className="anim-fade-up flex items-start gap-3 rounded-2xl border-2 border-pat-line bg-white p-4"
            style={{ animationDelay: `${0.08 * (i + 1)}s` }}
          >
            <span
              className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[13px] font-extrabold text-white"
              style={{ background: couleur.base }}
            >
              {i + 1}
            </span>
            <p className="text-[15px] font-semibold leading-snug text-pat-ink">{p}</p>
          </div>
        ))}
      </div>
      {step.exemple && (
        <div className="anim-fade-up rounded-2xl p-4" style={{ background: couleur.light, animationDelay: "0.35s" }}>
          <p className="text-[11px] font-extrabold uppercase tracking-widest" style={{ color: couleur.dark }}>
            Exemple
          </p>
          <p className="mt-1 text-[15px] font-semibold text-pat-ink">{step.exemple}</p>
        </div>
      )}
    </div>
  );
}

// ---------- Corps de question (qcm / vf / gap / cas) ----------
export function QuestionBody({ step, sel, setSel, locked, correctShown }) {
  if (step.t === "vf") {
    return (
      <div className="anim-fade-up flex flex-col gap-5">
        <Consigne>Vrai ou faux ?</Consigne>
        <p className="rounded-2xl border-2 border-pat-line bg-white p-5 text-lg font-bold leading-snug text-pat-ink">{step.q}</p>
        <div className="grid grid-cols-2 gap-3">
          {[
            { v: true, label: "VRAI", emoji: "✅" },
            { v: false, label: "FAUX", emoji: "❌" },
          ].map((opt) => (
            <button
              key={opt.label}
              disabled={locked}
              onClick={() => setSel(opt.v)}
              className={`choice3d p-5 text-center text-lg font-extrabold ${classesChoix(sel === opt.v, locked, correctShown, step.vrai === opt.v)}`}
            >
              <span className="mr-2">{opt.emoji}</span>
              {opt.label}
            </button>
          ))}
        </div>
      </div>
    );
  }

  if (step.t === "gap") {
    const [avant, apres] = step.phrase.split("___");
    return (
      <div className="anim-fade-up flex flex-col gap-5">
        <Consigne>Complète la phrase</Consigne>
        <p className="rounded-2xl border-2 border-pat-line bg-white p-5 text-lg font-bold leading-relaxed text-pat-ink">
          {avant}
          <span
            className={`mx-1 inline-block min-w-[90px] rounded-lg border-b-4 px-2 text-center ${
              sel !== null ? "border-pat-brand bg-[#e6e9fb] text-pat-brandDark" : "border-pat-line text-transparent"
            }`}
          >
            {sel !== null ? step.choix[sel] : "____"}
          </span>
          {apres}
        </p>
        <div className="flex flex-wrap justify-center gap-2.5">
          {step.choix.map((c, i) => (
            <button
              key={i}
              disabled={locked}
              onClick={() => setSel(sel === i ? null : i)}
              className={`choice3d px-4 py-2.5 text-[15px] font-bold ${classesChoix(sel === i, locked, correctShown, step.bonne === i)}`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>
    );
  }

  // qcm & cas
  return (
    <div className="anim-fade-up flex flex-col gap-4">
      {step.t === "cas" ? (
        <>
          <Consigne>Cas client</Consigne>
          <div className="flex items-start gap-3">
            <span className="text-4xl">{step.emoji || "🧑‍💼"}</span>
            <p className="rounded-2xl rounded-tl-none border-2 border-pat-line bg-white p-4 text-[15px] font-semibold italic leading-snug text-pat-ink">
              {step.contexte}
            </p>
          </div>
          <p className="text-lg font-extrabold text-pat-ink">{step.q}</p>
        </>
      ) : (
        <>
          <Consigne>Choisis la bonne réponse</Consigne>
          <p className="text-lg font-extrabold leading-snug text-pat-ink">{step.q}</p>
        </>
      )}
      <div className="flex flex-col gap-2.5">
        {step.choix.map((c, i) => (
          <button
            key={i}
            disabled={locked}
            onClick={() => setSel(sel === i ? null : i)}
            className={`choice3d flex items-center gap-3 p-4 text-[15px] font-bold leading-snug ${classesChoix(sel === i, locked, correctShown, step.bonne === i)}`}
          >
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border-2 border-current text-[13px] opacity-60">
              {String.fromCharCode(65 + i)}
            </span>
            {c}
          </button>
        ))}
      </div>
    </div>
  );
}

function Consigne({ children }) {
  return <p className="text-[12px] font-extrabold uppercase tracking-widest text-pat-muted">{children}</p>;
}

function classesChoix(estSelection, locked, correctShown, estBonne) {
  if (!locked) return estSelection ? "sel" : "";
  // verrouillé = feedback affiché
  if (correctShown && estBonne) return "ok anim-pop";
  if (estSelection && !estBonne) return "ko anim-shake";
  return "dim";
}

// ---------- Paires à associer (façon Duolingo) ----------
export function MatchBoard({ step, onDone }) {
  const { gauche, droite } = useMemo(() => {
    const melange = (arr) => [...arr].sort(() => Math.random() - 0.5);
    return {
      gauche: melange(step.paires.map(([l], i) => ({ label: l, pair: i }))),
      droite: melange(step.paires.map(([, r], i) => ({ label: r, pair: i }))),
    };
  }, [step]);
  const [selG, setSelG] = useState(null);
  const [selD, setSelD] = useState(null);
  const [trouves, setTrouves] = useState([]);
  const [erreurs, setErreurs] = useState(0);
  const [shake, setShake] = useState(null); // "g-2" / "d-1"

  const tenter = (cote, item, idx) => {
    if (trouves.includes(item.pair)) return;
    if (cote === "g") {
      if (selG === idx) return setSelG(null);
      setSelG(idx);
      if (selD !== null) valider(idx, selD);
    } else {
      if (selD === idx) return setSelD(null);
      setSelD(idx);
      if (selG !== null) valider(selG, idx);
    }
  };

  const valider = (ig, id) => {
    const g = gauche[ig];
    const d = droite[id];
    if (g.pair === d.pair) {
      const t = [...trouves, g.pair];
      setTrouves(t);
      setSelG(null);
      setSelD(null);
      if (t.length === step.paires.length) setTimeout(() => onDone(erreurs), 350);
    } else {
      setErreurs((e) => e + 1);
      setShake(`g-${ig}|d-${id}`);
      setTimeout(() => {
        setShake(null);
        setSelG(null);
        setSelD(null);
      }, 400);
    }
  };

  const cls = (cote, item, idx) => {
    const sel = cote === "g" ? selG === idx : selD === idx;
    if (trouves.includes(item.pair)) return "ok pointer-events-none opacity-70";
    if (shake && shake.includes(`${cote}-${idx}`)) return "ko anim-shake";
    return sel ? "sel" : "";
  };

  return (
    <div className="anim-fade-up flex flex-col gap-5">
      <p className="text-[12px] font-extrabold uppercase tracking-widest text-pat-muted">{step.consigne || "Associe les paires"}</p>
      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col gap-2.5">
          {gauche.map((item, i) => (
            <button key={i} onClick={() => tenter("g", item, i)} className={`choice3d p-3.5 text-center text-[14px] font-bold leading-snug ${cls("g", item, i)}`}>
              {item.label}
            </button>
          ))}
        </div>
        <div className="flex flex-col gap-2.5">
          {droite.map((item, i) => (
            <button key={i} onClick={() => tenter("d", item, i)} className={`choice3d p-3.5 text-center text-[14px] font-bold leading-snug ${cls("d", item, i)}`}>
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
