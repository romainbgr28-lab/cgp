// SECTION 4 — IMMOBILIER PATRIMONIAL
// Valeurs chiffrées récurrentes : centralisées dans ../baremes-2026.js.
// Valeurs : loi de finances 2025 (y compris réforme LMNP sur les plus-values).

import { BAREMES as B, euro, pct } from "../baremes-2026.js";

export default {
  id: "s4",
  titre: "Immobilier patrimonial",
  sousTitre: "Foncier, meublé, SCI, plus-values",
  emoji: "🧱",
  couleur: { base: "#b45309", dark: "#8f4407", light: "#fdeed7" },
  unites: [
    {
      id: "s4u1",
      titre: "La location nue",
      lecons: [
        {
          id: "s4u1l1",
          titre: "Les revenus fonciers",
          emoji: "🏠",
          tag: "foncier",
          steps: [
            {
              t: "concept",
              emoji: "📮",
              titre: "Deux régimes au choix",
              points: [
                `Micro-foncier : loyers ≤ ${euro(B.foncier.seuilMicro)}/an → abattement forfaitaire de ${pct(B.foncier.abattementMicro)}.`,
                "Régime réel : déduction des charges réelles (intérêts d'emprunt, travaux, taxe foncière, assurance…).",
                "Le réel gagne dès que les charges dépassent 30 % des loyers.",
              ],
            },
            {
              t: "qcm",
              q: "Jusqu'à quel montant de loyers annuels le micro-foncier s'applique-t-il ?",
              choix: [euro(B.foncier.seuilMicro), euro(B.bic.seuilMicro), euro(B.bic.seuilLMP), "30 000 €"],
              bonne: 0,
              exp: "15 000 € de loyers bruts (hors charges). Au-delà, le régime réel est obligatoire.",
            },
            {
              t: "gap",
              phrase: "Le micro-foncier applique un abattement forfaitaire de ___.",
              choix: [pct(B.foncier.abattementMicro), "50 %", "10 %", "71 %"],
              bonne: 0,
              exp: "On n'est imposé que sur 70 % des loyers — mais on renonce à déduire les charges réelles.",
            },
            {
              t: "vf",
              q: "On peut opter pour le régime réel même sous 15 000 € de loyers.",
              vrai: true,
              exp: "Option possible (engageante 3 ans). Indispensable quand il y a des travaux ou un gros crédit.",
            },
            {
              t: "cas",
              emoji: "🧮",
              contexte: "Loyers : 9 000 €/an. Charges réelles : 4 500 € (crédit, taxe foncière, gestion).",
              q: "Micro-foncier ou réel ?",
              choix: [
                "Réel : 4 500 € déduits contre 2 700 € d'abattement au micro",
                "Micro-foncier : c'est plus simple donc mieux",
                "Aucune différence",
                "Réel impossible sous 15 000 €",
              ],
              bonne: 0,
              exp: "Réel : base imposable 4 500 € contre 6 300 € au micro. À TMI 30 % + PS, l'écart fait ≈ 850 €/an. La simplicité a un prix.",
            },
            {
              t: "concept",
              emoji: "🔥",
              titre: "Le vrai taux d'imposition du foncier",
              points: [
                "Revenus fonciers = barème IR (TMI) + 17,2 % de prélèvements sociaux.",
                "TMI 30 % → 47,2 % de pression totale ; TMI 41 % → 58,2 %.",
                "C'est pourquoi la location nue au réel « brut de charges » est souvent le régime le plus taxé — et pourquoi le meublé séduit.",
              ],
            },
          ],
        },
        {
          id: "s4u1l2",
          titre: "Le déficit foncier",
          emoji: "📉",
          tag: "foncier",
          steps: [
            {
              t: "concept",
              emoji: "🕳️",
              titre: "Quand les charges dépassent les loyers",
              points: [
                `Le déficit (hors intérêts d'emprunt) s'impute sur le revenu global jusqu'à ${euro(B.foncier.deficitImputable)}/an.`,
                "Le surplus et les intérêts se reportent sur les revenus fonciers des 10 années suivantes.",
                `Plafond porté à ${euro(B.foncier.deficitImputableEnergie)} pour certains travaux de rénovation énergétique (dispositif temporaire).`,
              ],
            },
            {
              t: "qcm",
              q: "Plafond d'imputation du déficit foncier sur le revenu global ?",
              choix: [euro(B.foncier.deficitImputable), `${euro(B.foncier.deficitImputableEnergie)} dans tous les cas`, "15 000 €", "Illimité"],
              bonne: 0,
              exp: "10 700 € (cas général). L'économie vaut TMI × montant imputé — puissant à TMI élevée.",
            },
            {
              t: "vf",
              q: "Les intérêts d'emprunt peuvent s'imputer sur le revenu global.",
              vrai: false,
              exp: "Les intérêts ne s'imputent QUE sur les revenus fonciers. Seules les autres charges (travaux…) peuvent créer le déficit imputable au global.",
            },
            {
              t: "gap",
              phrase: "Le surplus de déficit foncier se reporte sur les revenus fonciers pendant ___ ans.",
              choix: ["10 ans", "6 ans", "3 ans", "1 an"],
              bonne: 0,
              exp: "10 ans de report : un gros programme de travaux peut effacer l'impôt foncier de nombreuses années.",
            },
            {
              t: "qcm",
              q: "Condition pour conserver l'imputation sur le revenu global ?",
              choix: [
                "Louer le bien jusqu'au 31 décembre de la 3e année suivant l'imputation",
                "Ne jamais augmenter le loyer",
                "Vendre dans les 2 ans",
                "Aucune condition",
              ],
              bonne: 0,
              exp: "Si la location cesse avant, l'imputation est remise en cause. À rappeler au client tenté de revendre vite après travaux.",
            },
            {
              t: "cas",
              emoji: "🔨",
              contexte: "Client TMI 41 %, achète un appartement ancien et engage 30 000 € de travaux déductibles. Loyers de l'année : 6 000 €, autres charges 2 000 €.",
              q: "Quel effet fiscal l'année des travaux ?",
              choix: [
                "Déficit ≈ 26 000 € : 10 700 € imputés sur le revenu global (≈ 4 390 € d'IR en moins), le solde reporté sur ses loyers futurs",
                "Les 30 000 € s'imputent en totalité sur son salaire",
                "Aucun effet avant la revente",
                "Il perd ses charges car il est au micro",
              ],
              bonne: 0,
              exp: "6 000 − 2 000 − 30 000 = −26 000. Imputation plafonnée à 10 700 € au global (économie ≈ TMI 41 %), report du reste 10 ans. Il faut être au réel, évidemment.",
            },
          ],
        },
      ],
    },
    {
      id: "s4u2",
      titre: "La location meublée",
      lecons: [
        {
          id: "s4u2l1",
          titre: "Le LMNP",
          emoji: "🛋️",
          tag: "lmnp",
          steps: [
            {
              t: "concept",
              emoji: "🍽️",
              titre: "Le meublé change de monde fiscal",
              points: [
                "La location meublée relève des BIC (bénéfices industriels et commerciaux), pas du foncier.",
                `Micro-BIC (longue durée) : abattement de ${pct(B.bic.abattementMicro)}, seuil ${euro(B.bic.seuilMicro)}.`,
                "Régime réel : déduction des charges ET amortissement du bien — l'arme fatale.",
              ],
            },
            {
              t: "qcm",
              q: "Dans quelle catégorie de revenus la location meublée est-elle imposée ?",
              choix: ["BIC", "Revenus fonciers", "Traitements et salaires", "BNC"],
              bonne: 0,
              exp: "Meublé = activité commerciale au sens fiscal → BIC. Cela ouvre l'accès à l'amortissement, impossible en foncier.",
            },
            {
              t: "gap",
              phrase: "Le micro-BIC (meublé longue durée) applique un abattement de ___.",
              choix: [pct(B.bic.abattementMicro), "30 %", "71 %", "10 %"],
              bonne: 0,
              exp: "50 % contre 30 % en micro-foncier : à régime « micro », le meublé part déjà avec un avantage.",
            },
            {
              t: "concept",
              emoji: "⚙️",
              titre: "L'amortissement, moteur du réel",
              points: [
                "On déduit chaque année une fraction de la valeur du bâti (~2 à 3 %) et des meubles.",
                "Résultat : un loyer comptablement « effacé » — souvent 0 € d'impôt pendant des années.",
                "L'amortissement ne peut pas créer de déficit imputable sur le revenu global : il neutralise, il ne défiscalise pas au-delà.",
              ],
            },
            {
              t: "vf",
              q: "Au réel, un loueur en meublé peut souvent ne payer quasiment aucun impôt sur ses loyers pendant des années.",
              vrai: true,
              exp: "Amortissements + charges absorbent le loyer. C'est ce qui a fait le succès du LMNP au réel — comptabilité obligatoire, expert-comptable recommandé.",
            },
            {
              t: "cas",
              emoji: "⚖️",
              contexte: "Studio meublé, 12 000 € de loyers/an. Charges + intérêts : 4 000 €. Amortissement possible : 6 000 €/an.",
              q: "Micro-BIC ou réel ?",
              choix: [
                "Réel : base imposable 2 000 € contre 6 000 € au micro",
                "Micro-BIC : l'abattement de 50 % est imbattable",
                "Les deux se valent",
                "Le réel est interdit sous 77 700 €",
              ],
              bonne: 0,
              exp: "Réel : 12 000 − 4 000 − 6 000 = 2 000 € imposables. Micro : 6 000 €. Dès qu'il y a de l'amortissement, le réel écrase le micro.",
            },
          ],
        },
        {
          id: "s4u2l2",
          titre: "Meublé : pièges et nouveautés",
          emoji: "⚠️",
          tag: "lmnp",
          steps: [
            {
              t: "concept",
              emoji: "🆕",
              titre: "Réforme 2025 : la revente se durcit",
              points: [
                "Depuis la LF 2025, les amortissements déduits sont RÉINTÉGRÉS dans le calcul de la plus-value à la revente (LMNP).",
                "Concrètement : prix d'acquisition minoré des amortissements → plus-value plus grosse.",
                "Le LMNP réel reste pertinent, mais l'« impôt zéro pour toujours » est terminé — il faut désormais raisonner revente incluse.",
              ],
            },
            {
              t: "qcm",
              q: "Qu'a changé la loi de finances 2025 pour le LMNP au réel ?",
              choix: [
                "Les amortissements sont réintégrés dans le calcul de la plus-value de cession",
                "L'amortissement est supprimé",
                "Le micro-BIC passe à 71 %",
                "Rien n'a changé",
              ],
              bonne: 0,
              exp: "L'avantage pendant la détention demeure ; c'est à la revente que l'addition arrive. Les abattements pour durée de détention continuent toutefois de s'appliquer.",
            },
            {
              t: "vf",
              q: `Le statut LMP (professionnel) s'applique si les recettes dépassent ${euro(B.bic.seuilLMP)} ET les autres revenus d'activité du foyer.`,
              vrai: true,
              exp: "Les DEUX conditions cumulées font basculer en LMP : cotisations sociales, régime de plus-values différent. À surveiller chez les gros loueurs.",
            },
            {
              t: "gap",
              phrase: "Le meublé de tourisme NON classé relève désormais d'un micro-BIC à ___ d'abattement (seuil 15 000 €).",
              choix: ["30 %", "50 %", "71 %", "60 %"],
              bonne: 0,
              exp: "La loi « anti-Airbnb » a durci le régime : 30 % seulement, seuil abaissé à 15 000 €. Le meublé classé conserve un régime plus favorable.",
            },
            {
              t: "cas",
              emoji: "🎯",
              contexte: "Client hésite entre louer son T2 nu ou meublé (longue durée). TMI 30 %, peu de charges, pas envie de comptabilité.",
              q: "Lecture rapide de conseiller ?",
              choix: [
                "Meublé micro-BIC : abattement 50 % contre 30 % en nu, sans comptabilité — à valider selon le marché locatif local",
                "Location nue au réel obligatoirement",
                "Meublé au réel sans hésiter, malgré son refus de la comptabilité",
                "Peu importe, c'est identique",
              ],
              bonne: 0,
              exp: "À contraintes égales (micro), le meublé taxe 50 % du loyer contre 70 %. Le réel ferait encore mieux mais exige une compta — le conseil doit respecter ce que le client accepte de gérer.",
            },
          ],
        },
      ],
    },
    {
      id: "s4u3",
      titre: "Société et plus-values",
      lecons: [
        {
          id: "s4u3l1",
          titre: "SCI : IR ou IS ?",
          emoji: "🏢",
          tag: "sci",
          steps: [
            {
              t: "concept",
              emoji: "👨‍👩‍👧‍👦",
              titre: "La SCI à l'IR : un outil d'organisation",
              points: [
                "Translucide : chaque associé est imposé comme s'il détenait en direct (revenus fonciers).",
                "Sa force : détenir à plusieurs, éviter l'indivision, transmettre par donations de parts.",
                "Ce n'est PAS un outil d'économie d'impôt sur les loyers.",
              ],
            },
            {
              t: "vf",
              q: "Créer une SCI à l'IR permet de payer moins d'impôt sur les loyers.",
              vrai: false,
              exp: "Mythe client tenace. Même assiette, même barème + PS. La SCI apporte de la gouvernance et de la transmission, pas de la défiscalisation.",
            },
            {
              t: "concept",
              emoji: "🏭",
              titre: "La SCI à l'IS : un autre monde",
              points: [
                `La société paie l'IS (${pct(B.is.tauxReduit)} jusqu'à ${euro(B.is.seuilTauxReduit)} de bénéfice, ${pct(B.is.tauxNormal)} au-delà) et peut amortir l'immeuble.`,
                "Mais à la revente : plus-value professionnelle, amortissements repris — souvent très lourde.",
                "Et sortir l'argent vers l'associé (dividendes) déclenche une 2e taxation.",
              ],
            },
            {
              t: "qcm",
              q: "Quel est l'intérêt principal d'une SCI à l'IR pour une famille ?",
              choix: [
                "Organiser la détention et faciliter la transmission (donations de parts)",
                "Échapper à l'impôt sur les loyers",
                "Éviter l'IFI",
                "Supprimer les droits de succession",
              ],
              bonne: 0,
              exp: "Donner des parts par tranches de 100 000 €/15 ans, appliquer une décote de valorisation, garder la gérance : la SCI est un outil de transmission avant tout.",
            },
            {
              t: "match",
              consigne: "SCI à l'IR ou à l'IS ?",
              paires: [
                ["SCI à l'IR", "Associés imposés en direct"],
                ["SCI à l'IS", "Amortissement possible"],
                ["Revente à l'IS", "Amortissements repris"],
                ["Revente à l'IR", "Abattements de durée"],
              ],
            },
            {
              t: "cas",
              emoji: "🎁",
              contexte: "Des parents (58 ans) veulent transmettre progressivement un immeuble locatif de 800 000 € à leurs deux enfants, tout en gardant la main.",
              q: "Quel montage classique ?",
              choix: [
                "Apport à une SCI, parents gérants, puis donations successives de parts (éventuellement en nue-propriété)",
                "Vente de l'immeuble aux enfants",
                "Donation directe de l'immeuble en indivision",
                "Ne rien faire avant le décès",
              ],
              bonne: 0,
              exp: "La SCI permet de donner par tranches calées sur les abattements (100 000 €/enfant/15 ans), avec décote de minorité possible, sans perdre le contrôle (gérance statutaire).",
            },
          ],
        },
        {
          id: "s4u3l2",
          titre: "La plus-value immobilière",
          emoji: "🔑",
          tag: "pv-immo",
          steps: [
            {
              t: "concept",
              emoji: "🧾",
              titre: "Le régime des particuliers",
              points: [
                `Taux : ${pct(B.pvImmo.tauxIR)} d'IR + ${pct(B.ps)} de PS sur la plus-value.`,
                `Abattements pour durée de détention : exonération d'IR au bout de ${B.pvImmo.exoIRAnnees} ans, de PS au bout de ${B.pvImmo.exoPSAnnees} ans.`,
                "Résidence principale : exonération totale, sans condition de durée.",
              ],
            },
            {
              t: "qcm",
              q: "Quelle est la fiscalité de la plus-value sur la vente de la résidence principale ?",
              choix: ["Exonération totale", "19 % + 17,2 %", "PFU 30 %", "Exonérée après 22 ans seulement"],
              bonne: 0,
              exp: "Exonération intégrale, quel que soit le montant et la durée. L'un des derniers grands havres fiscaux français.",
            },
            {
              t: "gap",
              phrase: "La plus-value immobilière est exonérée d'impôt sur le revenu après ___ de détention.",
              choix: ["22 ans", "30 ans", "15 ans", "8 ans"],
              bonne: 0,
              exp: "22 ans pour l'IR (19 %)… mais il faut 30 ans pour les prélèvements sociaux. Deux horloges différentes.",
            },
            {
              t: "vf",
              q: "Après 22 ans de détention, la vente d'une résidence secondaire est totalement exonérée.",
              vrai: false,
              exp: "L'IR est exonéré, mais les prélèvements sociaux courent jusqu'à 30 ans. Entre 22 et 30 ans, il reste une taxation partielle.",
            },
            {
              t: "qcm",
              q: "Une surtaxe s'applique aux plus-values immobilières supérieures à :",
              choix: [`${euro(B.pvImmo.seuilSurtaxe)} (2 à 6 %)`, "100 000 €", "500 000 €", "Aucune surtaxe n'existe"],
              bonne: 0,
              exp: "Surtaxe progressive de 2 à 6 % au-delà de 50 000 € de plus-value nette imposable — souvent oubliée dans les simulations.",
            },
            {
              t: "cas",
              emoji: "🏖️",
              contexte: "Client vend sa maison de vacances détenue depuis 25 ans, plus-value brute de 120 000 €.",
              q: "Que lui annonces-tu ?",
              choix: [
                "Plus d'IR (>22 ans), mais des prélèvements sociaux partiels restent dus (<30 ans)",
                "Exonération totale",
                "19 % + 17,2 % plein pot",
                "Le PFU de 30 %",
              ],
              bonne: 0,
              exp: "À 25 ans de détention : IR exonéré, PS abattus partiellement (l'essentiel de l'abattement PS se concentre entre 22 et 30 ans). Le notaire calculera le montant exact au jour de la vente.",
            },
          ],
        },
      ],
    },
  ],
};
