import s0 from "./sections/s0.js";
import s1 from "./sections/s1.js";
import s2 from "./sections/s2.js";
import s3 from "./sections/s3.js";
import s4 from "./sections/s4.js";
import s5 from "./sections/s5.js";
import s6 from "./sections/s6.js";
import s7 from "./sections/s7.js";
import s8 from "./sections/s8.js";
import s9 from "./sections/s9.js";
import s10 from "./sections/s10.js";
import { tagLabel } from "./tags.js";

export const SECTIONS = [s0, s1, s2, s3, s4, s5, s6, s7, s8, s9, s10];

// ============================================================
// GRAPHE DE DÉBLOCAGE DES SECTIONS — remplace l'ordre linéaire.
// Une section s'ouvre quand l'examen de sa section prérequise est
// réussi (null = toujours ouverte). Cibles de la refonte :
//   s0→s1→s2→s3→s4→s5→s6 (chaîne socle) ; s8 après s3 ;
//   s7/s9/s11 après s6 ; s10 après s7.
// ============================================================
export const PREREQUIS = {
  s0: null,
  s1: "s0",
  s2: "s1",
  s3: "s2",
  s4: "s3",
  s5: "s4",
  s6: "s5",
  s7: "s6",
  s8: "s3",
  s9: "s6",
  s10: "s7",
  s11: "s6",
};

// Clause « grand-père » : un utilisateur qui avait déjà commencé une
// section avant l'introduction du verrou n'est jamais re-verrouillé.
export function sectionOuverte(sectionId, exams, progress) {
  const prereq = PREREQUIS[sectionId];
  if (!prereq) return true;
  if (exams[prereq]?.reussi) return true;
  const section = SECTIONS.find((s) => s.id === sectionId);
  return section ? section.unites.flatMap((u) => u.lecons).some((l) => progress[l.id]) : false;
}

// Niveaux de difficulté (purement informatifs, aucun effet sur le déblocage)
export const NIVEAUX_LECON = {
  debutant: { label: "Débutant", bg: "#dcf5eb", fg: "#067a53" },
  intermediaire: { label: "Intermédiaire", bg: "#e6e9fb", fg: "#2f3d8f" },
  avance: { label: "Avancé", bg: "#fdf0d5", fg: "#a16207" },
  expert: { label: "Expert", bg: "#fde3e8", fg: "#c23349" },
};

// Liste plate et ordonnée de toutes les leçons (ordre = ordre de déverrouillage)
export const LECONS = SECTIONS.flatMap((section) =>
  section.unites.flatMap((unite) =>
    unite.lecons.map((lecon) => ({
      ...lecon,
      sectionId: section.id,
      sectionTitre: section.titre,
      uniteId: unite.id,
      uniteTitre: unite.titre,
      couleur: section.couleur,
    }))
  )
);

export const leconById = (id) => LECONS.find((l) => l.id === id);

// Types de steps auxquels on peut "répondre" (et donc réviser)
export const TYPES_QUESTIONS = ["qcm", "vf", "gap", "cas"];

export function statsCurriculum() {
  const nbQuestions = LECONS.reduce(
    (acc, l) => acc + l.steps.filter((s) => TYPES_QUESTIONS.includes(s.t)).length,
    0
  );
  return { nbSections: SECTIONS.length, nbLecons: LECONS.length, nbQuestions };
}

// ============================================================
// EXAMEN DE SECTION ("boss") — 10 à 15 questions piochées au
// hasard dans les leçons DÉJÀ VUES de la section. Seuil : 80 %.
// ============================================================
export const EXAM_SEUIL = 80; // % de bonnes réponses pour valider
export const EXAM_NB_QUESTIONS = 12;

const melanger = (arr) => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

// Chaque question d'examen garde son origine (_origine) pour pouvoir
// pointer les leçons faibles en cas d'échec et alimenter la révision.
export function buildExam(section, progress) {
  const lecons = section.unites.flatMap((u) => u.lecons).filter((l) => progress[l.id]);
  const pool = lecons.flatMap((l) =>
    l.steps
      .map((s, i) => ({ step: s, stepIndex: i, lecon: l }))
      .filter((x) => TYPES_QUESTIONS.includes(x.step.t))
  );
  const steps = melanger(pool)
    .slice(0, EXAM_NB_QUESTIONS)
    .map((x) => ({
      ...x.step,
      _origine: { leconId: x.lecon.id, leconTitre: x.lecon.titre, stepIndex: x.stepIndex, tag: x.lecon.tag },
    }));
  return {
    id: "exam-" + section.id,
    examen: true,
    sectionId: section.id,
    sectionTitre: section.titre,
    titre: "Examen — " + section.titre,
    emoji: "🏅",
    couleur: section.couleur,
    steps,
  };
}

// ============================================================
// SESSION CIBLÉE — mini-entraînement sur un tag thématique
// (points faibles récurrents du Profil). Pas de progression
// de parcours : XP seulement.
// ============================================================
export function buildSessionCible(tag) {
  const pool = LECONS.filter((l) => l.tag === tag).flatMap((l) =>
    l.steps
      .map((s, i) => ({ step: s, stepIndex: i, lecon: l }))
      .filter((x) => TYPES_QUESTIONS.includes(x.step.t))
  );
  const steps = melanger(pool)
    .slice(0, 8)
    .map((x) => ({
      ...x.step,
      _origine: { leconId: x.lecon.id, leconTitre: x.lecon.titre, stepIndex: x.stepIndex, tag },
    }));
  if (steps.length === 0) return null;
  return {
    id: "cible-" + tag,
    cible: true,
    titre: "Entraînement ciblé",
    sectionTitre: tagLabel(tag),
    emoji: "🎯",
    couleur: { base: "#4152b3", dark: "#2f3d8f", light: "#e6e9fb" },
    steps,
  };
}
