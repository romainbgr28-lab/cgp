// Persistance locale (localStorage) — préfixe unique pour toute l'app.
const PREFIX = "patrimonio:";

export function stGet(key, fallback) {
  try {
    const raw = window.localStorage.getItem(PREFIX + key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

export function stSet(key, value) {
  try {
    window.localStorage.setItem(PREFIX + key, JSON.stringify(value));
  } catch {
    /* stockage plein ou indisponible : l'app continue en mémoire */
  }
}

export function stClearAll() {
  const keys = [];
  for (let i = 0; i < window.localStorage.length; i++) {
    const k = window.localStorage.key(i);
    if (k && k.startsWith(PREFIX) && k !== PREFIX + "apiKey" && k !== PREFIX + "workerUrl") keys.push(k);
  }
  keys.forEach((k) => window.localStorage.removeItem(k));
}

// ---- Progression des leçons ----
// progress = { [leconId]: { precision, xp, date, fois } }
export const getProgress = () => stGet("progress", {});
export function saveLessonResult(leconId, { precision, xp }) {
  const p = getProgress();
  const prev = p[leconId];
  p[leconId] = {
    precision: prev ? Math.max(prev.precision, precision) : precision,
    xp: (prev?.xp || 0) + xp,
    date: new Date().toISOString(),
    fois: (prev?.fois || 0) + 1,
  };
  stSet("progress", p);
  return p;
}

// ---- XP total ----
export const getXp = () => stGet("xp", 0);
export function addXp(n) {
  const xp = getXp() + n;
  stSet("xp", xp);
  return xp;
}

// ---- Streak (jours actifs) ----
export function markActiveToday() {
  const jours = stGet("jours", []);
  const today = new Date().toDateString();
  if (!jours.includes(today)) {
    jours.push(today);
    stSet("jours", jours.slice(-400));
  }
}
export function calcStreak() {
  const jours = new Set(stGet("jours", []));
  const d = new Date();
  if (!jours.has(d.toDateString())) d.setDate(d.getDate() - 1); // valide si actif hier
  let streak = 0;
  while (jours.has(d.toDateString())) {
    streak += 1;
    d.setDate(d.getDate() - 1);
  }
  return streak;
}

// ---- Paquet de révision espacée ----
// deck = [{ id, step, sectionTitre, couleur, due, ok }]
// Intervalles (jours) selon le nombre de réussites consécutives.
const INTERVALLES = [1, 3, 7, 16, 35];
const JOUR = 86400000;

export const getDeck = () => stGet("deck", []);

export function addToDeck(step, meta) {
  const deck = getDeck();
  const id = meta.leconId + ":" + meta.stepIndex;
  if (deck.some((c) => c.id === id)) {
    // déjà dans le paquet : redevient due demain
    const c = deck.find((x) => x.id === id);
    c.ok = 0;
    c.due = Date.now() + JOUR;
  } else {
    deck.push({ id, step, sectionTitre: meta.sectionTitre, couleur: meta.couleur, tag: meta.tag, due: Date.now() + JOUR, ok: 0 });
  }
  stSet("deck", deck);
}

export function deckDue() {
  const now = Date.now();
  return getDeck().filter((c) => c.due <= now);
}

export function answerDeckCard(id, correct) {
  const deck = getDeck();
  const c = deck.find((x) => x.id === id);
  if (!c) return;
  if (correct) {
    c.ok = (c.ok || 0) + 1;
    if (c.ok > INTERVALLES.length) {
      // maîtrisée : sort du paquet
      stSet("deck", deck.filter((x) => x.id !== id));
      return;
    }
    c.due = Date.now() + INTERVALLES[Math.min(c.ok - 1, INTERVALLES.length - 1)] * JOUR;
  } else {
    c.ok = 0;
    c.due = Date.now() + JOUR;
  }
  stSet("deck", deck);
}

// ---- Historique d'erreurs (pour le Coach) ----
// erreurs = [{ q, mauvaise, bonne, exp, section, tag?, date }]
// (tag absent sur les erreurs enregistrées avant l'ajout des tags : géré partout)
export function logErreur(e) {
  const errs = stGet("erreurs", []);
  errs.unshift({ ...e, date: new Date().toISOString() });
  stSet("erreurs", errs.slice(0, 40));
}
export const getErreurs = () => stGet("erreurs", []);

// ---- Examens de section ----
// exams = { [sectionId]: { note, reussi, date, fois } }
export const getExams = () => stGet("exams", {});
export function saveExamResult(sectionId, note, seuil) {
  const e = getExams();
  const prev = e[sectionId];
  e[sectionId] = {
    note: Math.max(prev?.note ?? 0, note),
    reussi: !!prev?.reussi || note >= seuil,
    date: new Date().toISOString(),
    fois: (prev?.fois || 0) + 1,
  };
  stSet("exams", e);
  return e;
}

// ---- Statistiques par tag thématique (points faibles récurrents) ----
// tagStats = { [tag]: { ok, ko } } — absent pour les anciens utilisateurs : défaut {}
export const getTagStats = () => stGet("tagStats", {});
export function bumpTagStat(tag, correct) {
  if (!tag) return; // question sans tag (données antérieures) : on ignore
  const s = getTagStats();
  const t = s[tag] || { ok: 0, ko: 0 };
  if (correct) t.ok += 1;
  else t.ko += 1;
  s[tag] = t;
  stSet("tagStats", s);
}

// ---- Objection du jour ----
// objVues = { [objectionId]: dateISO } ; objJour = { day, id }
export const getObjVues = () => stGet("objVues", {});
export function markObjVue(id) {
  const v = getObjVues();
  v[id] = new Date().toISOString();
  stSet("objVues", v);
}
export function objectionDuJour(objections) {
  const day = Math.floor(Date.now() / 86400000);
  const memo = stGet("objJour", null);
  if (memo && memo.day === day) {
    const o = objections.find((x) => x.id === memo.id);
    if (o) return o;
  }
  const vues = getObjVues();
  const recente = (id) => vues[id] && Date.now() - new Date(vues[id]).getTime() < 10 * 86400000;
  let choix = null;
  for (let k = 0; k < objections.length; k++) {
    const o = objections[(day + k) % objections.length];
    if (!recente(o.id)) { choix = o; break; }
  }
  if (!choix) choix = objections[day % objections.length]; // tout vu récemment : roulement simple
  stSet("objJour", { day, id: choix.id });
  return choix;
}

// ---- Badges ----
export const BADGES = [
  { id: "premiere_lecon", nom: "Premiers pas", desc: "Terminer sa première leçon", icone: "🐣" },
  { id: "dix_lecons", nom: "Marathonien", desc: "Terminer 10 leçons", icone: "🏃" },
  { id: "section_finie", nom: "Section conquise", desc: "Terminer toutes les leçons d'une section", icone: "🏆" },
  { id: "perfection", nom: "Sans faute", desc: "Finir une leçon à 100 % de précision", icone: "💎" },
  { id: "streak_7", nom: "Une semaine de feu", desc: "7 jours d'activité d'affilée", icone: "🔥" },
  { id: "reviseur", nom: "Mémoire d'acier", desc: "Réviser 25 cartes", icone: "🧠" },
  { id: "premiere_simu", nom: "Face au client", desc: "Terminer une simulation débriefée", icone: "🎭" },
  { id: "expert", nom: "Diplômé", desc: "Terminer tout le parcours", icone: "🎓" },
];
export const getBadges = () => stGet("badges", {});
export function unlockBadge(id) {
  const b = getBadges();
  if (b[id]) return false;
  b[id] = new Date().toISOString();
  stSet("badges", b);
  return true;
}

// ---- Compteur de cartes révisées (badge) ----
export function bumpRevisions() {
  const n = stGet("nbRevisions", 0) + 1;
  stSet("nbRevisions", n);
  return n;
}

// ---- Clé API (Coach & Simulation uniquement) ----
export const getApiKey = () => stGet("apiKey", "");
export const setApiKey = (k) => stSet("apiKey", k.trim());

// ---- URL du Worker Cloudflare (proxy Mistral, clé côté serveur) ----
// Si renseignée, elle prime sur la clé navigateur (voir lib/ai.js).
export const getWorkerUrl = () => stGet("workerUrl", "");
export const setWorkerUrl = (u) => stSet("workerUrl", u.trim().replace(/\/+$/, ""));
