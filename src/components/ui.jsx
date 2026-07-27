import { useEffect, useMemo, useState } from "react";

// Bouton 3D (ombre pleine) — couleur de marque par défaut
export function Btn({ children, onClick, disabled, color = "#4152b3", shadow = "#2f3d8f", textColor = "#fff", className = "", ...rest }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{ background: color, color: textColor, "--btn-shadow": shadow }}
      className={`btn3d px-6 py-3 text-base ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}

// Bouton secondaire (blanc, bordure)
export function BtnGhost({ children, onClick, className = "", ...rest }) {
  return (
    <button
      onClick={onClick}
      style={{ "--btn-shadow": "#e7e6f0" }}
      className={`btn3d border-2 border-pat-line bg-white px-6 py-3 text-base text-pat-brand ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}

// Pluie de confettis (leçon terminée)
export function Confetti({ count = 60 }) {
  const pieces = useMemo(() => {
    const colors = ["#4152b3", "#0369a1", "#7c4dbc", "#d97706", "#0e9a6d", "#c73a72"];
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 0.8,
      duration: 2 + Math.random() * 2,
      color: colors[i % colors.length],
      size: 6 + Math.random() * 8,
    }));
  }, [count]);
  return (
    <>
      {pieces.map((p) => (
        <div
          key={p.id}
          className="confetti"
          style={{
            left: `${p.left}%`,
            background: p.color,
            width: p.size,
            height: p.size * 1.4,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
          }}
        />
      ))}
    </>
  );
}

// Toast de badge débloqué
export function BadgeToast({ badge, onDone }) {
  useEffect(() => {
    const t = setTimeout(onDone, 3500);
    return () => clearTimeout(t);
  }, [onDone]);
  return (
    <div className="anim-pop fixed bottom-24 left-1/2 z-50 flex -translate-x-1/2 items-center gap-3 rounded-2xl border-2 border-pat-goldDeep bg-white px-5 py-3 shadow-xl">
      <span className="text-3xl">{badge.icone}</span>
      <div>
        <p className="text-[11px] font-extrabold uppercase tracking-widest text-pat-goldDeep">Badge débloqué</p>
        <p className="font-extrabold text-pat-ink">{badge.nom}</p>
      </div>
    </div>
  );
}

// Compteur XP animé
export function XpCounter({ value, duration = 900 }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    let raf;
    const t0 = performance.now();
    const tick = (t) => {
      const p = Math.min(1, (t - t0) / duration);
      setN(Math.round(value * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value, duration]);
  return <span>{n}</span>;
}

// Emblème de la marque : écusson + courbe ascendante (symbole abstrait,
// remplace toute mascotte anthropomorphe)
export function Embleme({ size = 52 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" aria-hidden="true">
      <path d="M50 6 88 20v30c0 24-16 38-38 44C28 88 12 74 12 50V20Z" fill="#4152b3" />
      <path d="M50 12 82 24v26c0 20-13.5 32-32 37.5C31.5 82 18 70 18 50V24Z" fill="#2f3d8f" opacity="0.35" />
      <path d="M28 62 44 46l10 8 18-20" stroke="#f2b01e" strokeWidth="9" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="72" cy="34" r="6" fill="#f2b01e" />
    </svg>
  );
}

// Bulle de dialogue de l'emblème (ex-mascotte)
export function Mascotte({ children }) {
  return (
    <div className="flex items-end gap-3">
      <span className="anim-bounce-soft shrink-0"><Embleme /></span>
      <div className="relative rounded-2xl border-2 border-pat-line bg-white px-4 py-3 text-[15px] font-bold text-pat-ink">
        <span className="absolute -left-2 bottom-3 h-4 w-4 rotate-45 border-b-2 border-l-2 border-pat-line bg-white" />
        {children}
      </div>
    </div>
  );
}
