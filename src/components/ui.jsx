import { useEffect, useMemo, useState } from "react";

// Bouton 3D façon Duolingo
export function Btn({ children, onClick, disabled, color = "#58cc02", shadow = "#46a302", textColor = "#fff", className = "", ...rest }) {
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
      style={{ "--btn-shadow": "#e5e5e5" }}
      className={`btn3d border-2 border-duo-line bg-white px-6 py-3 text-base text-duo-blue ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}

// Pluie de confettis (leçon terminée)
export function Confetti({ count = 60 }) {
  const pieces = useMemo(() => {
    const colors = ["#58cc02", "#1cb0f6", "#ce82ff", "#ff9600", "#ffc800", "#f75c9b"];
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
    <div className="anim-pop fixed bottom-24 left-1/2 z-50 flex -translate-x-1/2 items-center gap-3 rounded-2xl border-2 border-duo-yellow bg-white px-5 py-3 shadow-xl">
      <span className="text-3xl">{badge.icone}</span>
      <div>
        <p className="text-[11px] font-extrabold uppercase tracking-widest text-duo-yellow">Badge débloqué</p>
        <p className="font-extrabold text-duo-text">{badge.nom}</p>
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

// Bulle de dialogue de la mascotte
export function Mascotte({ children, emoji = "🦉" }) {
  return (
    <div className="flex items-end gap-3">
      <span className="anim-bounce-soft text-5xl">{emoji}</span>
      <div className="relative rounded-2xl border-2 border-duo-line bg-white px-4 py-3 text-[15px] font-bold text-duo-text">
        <span className="absolute -left-2 bottom-3 h-4 w-4 rotate-45 border-b-2 border-l-2 border-duo-line bg-white" />
        {children}
      </div>
    </div>
  );
}
