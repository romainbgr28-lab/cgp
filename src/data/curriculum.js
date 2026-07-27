import s1 from "./sections/s1.js";
import s2 from "./sections/s2.js";
import s3 from "./sections/s3.js";
import s4 from "./sections/s4.js";
import s5 from "./sections/s5.js";
import s6 from "./sections/s6.js";

export const SECTIONS = [s1, s2, s3, s4, s5, s6];

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
