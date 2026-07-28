// ===================================================================
// BARÈMES & VALEURS MILLÉSIMÉES — source unique de tous les chiffres
// fiscaux utilisés dans les leçons (src/data/sections/*.js).
//
// Dernière vérification : 27/07/2026.
// ⚠️ Millésime du contenu : les valeurs ci-dessous sont celles de la
// rédaction initiale des leçons (loi de finances 2025, revenus 2024).
//
// RAPPEL DE MISE À JOUR ANNUELLE : à chaque loi de finances (décembre),
// vérifier chaque valeur sur impots.gouv.fr / bofip.gouv.fr et la
// corriger ICI — les leçons référencent ces constantes, une correction
// se propage partout. Mettre à jour la date de vérification ci-dessus.
// ===================================================================

// Formate 11497 -> "11 497 €" (espace insécable fine gérée par toLocaleString)
export const euro = (n) => n.toLocaleString("fr-FR") + " €";
// Formate 17.2 -> "17,2 %"
export const pct = (n) => String(n).replace(".", ",") + " %";

export const BAREMES = {
  // --- Impôt sur le revenu (barème LF 2025, revenus 2024) ---
  ir: {
    t1: 11497, // fin de la tranche à 0 %
    t2: 29315, // fin de la tranche à 11 %
    t3: 83823, // fin de la tranche à 30 %
    t4: 180294, // fin de la tranche à 41 % (45 % au-delà)
    plafondDemiPart: 1791, // plafonnement du quotient familial, par demi-part
    plafondPensionEnfantMajeur: 6794, // pension alimentaire déductible (enfant majeur)
    plafondNiches: 10000, // plafonnement global des niches fiscales
  },

  // --- Flat tax et prélèvements sociaux ---
  pfu: { ir: 12.8, ps: 17.2, total: 30 },
  ps: 17.2, // CSG 9,2 + CRDS 0,5 + solidarité 7,5
  abattementDividendes: 40, // option barème uniquement
  rcm: {
    csgDeductible: 6.8, // uniquement en cas d'option pour le barème
    // Dispense d'acompte de 12,8 % à la source, selon le RFR de N-2 :
    dispenseDividendesRFR: 50000, // célibataire (75 000 € pour un couple)
    dispenseDividendesRFRCouple: 75000,
    dispenseInteretsRFR: 25000, // célibataire (50 000 € pour un couple)
    dispenseInteretsRFRCouple: 50000,
  },

  // --- Calcul de l'impôt : décote et hauts revenus ---
  decote: { seuilImpotCelib: 1964, seuilImpotCouple: 3248 }, // impôt brut sous lequel la décote s'applique
  cehr: { seuilCelib: 250000, seuilCouple: 500000, taux1: 3, taux2: 4 }, // sur le revenu fiscal de référence

  // --- Actionnariat salarié (attributions depuis 2018, régime « Macron ») ---
  aga: { abattement: 50, plafondAbattement: 300000 }, // gain d'acquisition d'actions gratuites

  // --- Mobilité internationale ---
  exitTax: { seuilParticipations: 800000, conservationCourteAnnees: 2, conservationLongueAnnees: 5 },
  nonResidents: { tauxMinimum: 20, tauxMinimumSup: 30 }, // taux minimum d'imposition des revenus de source française
  impatries: { exonerationMaxAnnees: 8 }, // régime de l'article 155 B
  residenceFiscale: { seuilSejourJours: 183 },

  // --- Assurance-vie ---
  av: {
    abattementRachatSeul: 4600, // gains, par an, après 8 ans
    abattementRachatCouple: 9200,
    tauxReduit: 7.5, // après 8 ans, primes <= 150 000 €
    seuilPrimes: 150000,
    abattement990I: 152500, // primes versées avant 70 ans, PAR bénéficiaire
    taux990I: 20, // jusqu'à 700 000 € taxables (31,25 % au-delà)
    abattement757B: 30500, // primes versées après 70 ans, abattement GLOBAL
  },

  // --- PEA / PER ---
  pea: { plafond: 150000, plafondAvecPme: 225000 },
  per: { plafondMax: 37094, plafondMin: 4637, tauxRevenus: 10 }, // 10 % des revenus pro, plafonds 2025
  perTNS: { tauxSupplement: 15 }, // + 15 % sur la fraction du bénéfice entre 1 et 8 PASS

  // --- Plafond annuel de la Sécurité sociale (référence transversale) ---
  pass: 47100, // PASS 2025

  // --- Épargne salariale (source : service-public.fr) ---
  epargneSalariale: {
    abondementPeePct: 8, // % du PASS : abondement employeur max sur PEE (≈ 3 768 €)
    abondementPercoPct: 16, // % du PASS : max sur PERECO (≈ 7 536 €)
    abondementMaxMultiple: 300, // % du versement du salarié (3 fois au plus)
    versementMaxPctRemuneration: 25, // versements volontaires : 25 % de la rémunération annuelle brute
    blocagePeeAnnees: 5,
  },

  // --- Livrets réglementés (plafonds de versement) ---
  livrets: {
    plafondLivretA: 22950,
    plafondLDDS: 12000,
    plafondLEP: 10000,
  },

  // --- Immobilier locatif ---
  foncier: {
    seuilMicro: 15000,
    abattementMicro: 30,
    deficitImputable: 10700,
    deficitImputableEnergie: 21400, // travaux de rénovation énergétique (temporaire)
    reportAnnees: 10,
  },
  bic: {
    seuilMicro: 77700, // meublé longue durée
    abattementMicro: 50,
    seuilTourismeNonClasse: 15000,
    abattementTourismeNonClasse: 30,
    seuilLMP: 23000,
  },
  pvImmo: {
    tauxIR: 19,
    exoIRAnnees: 22,
    exoPSAnnees: 30,
    seuilSurtaxe: 50000, // surtaxe 2 à 6 % au-delà
  },
  // Fraction imposable de la rente viagère à titre onéreux (art. 158-6 CGI),
  // selon l'âge du crédirentier au premier versement :
  renteViagere: { moins50: 70, de50a59: 50, de60a69: 40, apres69: 30 },
  // OPCI : ratios réglementaires de composition
  opci: { minImmobilier: 60, minLiquidites: 5 },

  // --- IFI ---
  ifi: { seuilEntree: 1300000, seuilCalcul: 800000, abattementRP: 30 },

  // --- Succession / donation ---
  succession: {
    abattementEnfant: 100000,
    abattementFrereSoeur: 15932,
    abattementNeveu: 7967,
    abattementTiers: 1594,
    abattementPetitEnfant: 31865,
    tauxTiers: 60, // concubins et non-parents
    rappelAnnees: 15, // rappel fiscal / recharge des abattements
  },
  donation: {
    donFamilial: 31865, // art. 790 G, donateur < 80 ans, donataire majeur
    ageMaxDonateur: 80,
  },
  usufruit669: { u51_60: 50, u61_70: 40, u71_80: 30, u81_90: 20 }, // % de la pleine propriété
  dutreil: { exoneration: 75 },
  dons: { reduction: 66 }, // dons aux associations d'intérêt général

  // --- IS (SCI à l'IS) ---
  is: { tauxReduit: 15, seuilTauxReduit: 42500, tauxNormal: 25 },

  // --- LCB-FT & conformité (source : service-public.fr, CMF) ---
  lcbft: {
    plafondEspecesPro: 1000, // paiement en espèces à un professionnel (résident fiscal FR)
    declarationDouane: 10000, // transport d'espèces transfrontalier à déclarer
    beneficiaireEffectifSeuil: 25, // % de détention (capital ou droits de vote)
    conservationAnnees: 5, // documents KYC après la fin de la relation d'affaires
  },
  rgpd: {
    conservationApresRelationAnnees: 5, // alignée sur l'obligation LCB-FT
    delaiNotificationViolationHeures: 72, // notification CNIL d'une violation
  },
};
