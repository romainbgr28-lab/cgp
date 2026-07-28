// ===================================================================
// TAGS THÉMATIQUES TRANSVERSAUX — LISTE FERMÉE (45).
// Chaque leçon porte exactement UN tag de cette liste (champ `tag`
// dans sections/*.js). NE PAS inventer de nouveau tag à la volée :
// si un thème ne rentre nulle part, en discuter avant d'étendre la liste.
// Les 20 tags historiques ne doivent JAMAIS être renommés : l'historique
// d'erreurs et les stats des utilisateurs existants en dépendent.
// Sert au suivi des points faibles récurrents (Profil).
// ===================================================================

export const TAGS = {
  // ---- Tags historiques (ne pas renommer) ----
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

  // ---- Extension (refonte 12 sections) ----
  "bases-patrimoine": "Bases : patrimoine, épargne, inflation",
  "risque-rendement": "Risque, rendement & intérêts composés",
  "cadre-reglementaire": "Statuts, RC pro, RGPD & cadre juridique",
  "fiscalite-internationale": "Fiscalité internationale & mobilité",
  "actionnariat-salarie": "Stock-options & actions gratuites",
  "epargne-salariale": "Épargne salariale (PEE, PERECO)",
  "epargne-bancaire": "Épargne bancaire & comptes à terme",
  "scpi-opci": "SCPI, OPCI & pierre-papier",
  "viager": "Viager & nue-propriété à l'achat",
  "protection-vulnerables": "Protection des personnes vulnérables",
  "prevoyance": "Prévoyance individuelle & collective",
  "sante": "Complémentaire santé",
  "retraite-obligatoire": "Retraite obligatoire & Agirc-Arrco",
  "dependance": "Dépendance & APA",
  "reversion": "Pension de réversion",
  "societes-dirigeant": "Sociétés & rémunération du dirigeant",
  "regimes-sociaux-tns": "Régimes sociaux (TNS vs assimilé)",
  "cession-entreprise": "Cession d'entreprise & apport-cession",
  "credit-immo": "Crédit immobilier & assurance emprunteur",
  "credit-strategie": "Stratégies de crédit & effet de levier",
  "private-equity": "Private equity (FCPR, FCPI, FIP)",
  "cryptoactifs": "Cryptoactifs",
  "actifs-tangibles": "Or, art, forêts & actifs tangibles",
  "divorce-separation": "Divorce & séparation",
  "famille-recomposee": "Famille recomposée & protection du partenaire",
};

export const tagLabel = (id) => TAGS[id] || id;
