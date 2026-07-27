// ===================================================================
// TAGS THÉMATIQUES TRANSVERSAUX — LISTE FERMÉE (20 max).
// Chaque leçon porte exactement UN tag de cette liste (champ `tag`
// dans sections/*.js). NE PAS inventer de nouveau tag à la volée :
// si un thème ne rentre nulle part, en discuter avant d'étendre la liste.
// Sert au suivi des points faibles récurrents (Profil).
// ===================================================================

export const TAGS = {
  "deontologie-kyc": "Déontologie & conformité (KYC, LCB-FT)",
  "bilan-profil": "Bilan, profil de risque & allocation",
  "couple-regimes": "Couple : régimes matrimoniaux, PACS",
  "tmi-ir": "Barème IR, TMI & quotient familial",
  "reductions-credits": "Déductions, réductions, crédits",
  "pfu-ps": "Flat tax & prélèvements sociaux",
  "ifi": "IFI",
  "av-rachats": "Assurance-vie : rachats",
  "av-transmission": "Assurance-vie : transmission",
  "pea-cto": "PEA & compte-titres",
  "per": "PER",
  "foncier": "Revenus fonciers & déficit",
  "lmnp": "Location meublée (LMNP)",
  "sci": "SCI",
  "pv-immo": "Plus-value immobilière",
  "succession": "Succession",
  "donations": "Donations",
  "demembrement": "Démembrement",
  "transmission-entreprise": "Transmission d'entreprise (Dutreil)",
  "relation-client": "Relation client & objections",
};

export const tagLabel = (id) => TAGS[id] || id;
