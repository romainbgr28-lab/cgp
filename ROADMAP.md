# Formation CGP — Plan de route pédagogique & produit

## 1. Le problème à résoudre

Former un vrai conseiller en gestion de patrimoine, ce n'est pas lui faire lire des fiches.
C'est construire, dans l'ordre, quatre compétences :

1. **Savoir** — le socle juridico-fiscal (IR, enveloppes, immobilier, transmission).
   Sans lui, tout conseil est dangereux.
2. **Savoir-calculer** — un CGP manipule des chiffres devant le client : TMI, abattements,
   droits de succession. Il faut automatiser ces calculs par la répétition.
3. **Savoir-décider** — face à un profil client, choisir la bonne enveloppe, le bon
   dispositif. C'est de l'arbitrage, pas de la récitation.
4. **Savoir-dire** — mener un entretien, traiter une objection, formuler une
   préconisation claire et conforme (devoir de conseil).

## 2. Choix pédagogiques structurants

- **Contenu 100 % pré-enregistré et vérifié.** Toutes les leçons, questions et corrections
  sont rédigées à la main avec les valeurs de la loi de finances 2025 (barème IR, abattements,
  plafonds). L'IA ne génère plus jamais le contenu de formation — fini le risque
  d'hallucination fiscale sur un chiffre appris par cœur.
- **L'IA fait ce qu'elle fait bien : coacher.** Deux usages, et deux seulement :
  - **Coach** : elle lit ta progression et tes erreurs réelles, identifie tes faiblesses,
    te dit quoi réviser et répond à tes questions de compréhension.
  - **Simulation client** : à partir de scénarios pré-écrits (profil, objectif pédagogique,
    pièges attendus), elle joue le client puis débriefe ta prestation de conseiller.
- **Micro-learning séquencé.** Une leçon = 8 à 10 écrans d'une seule idée chacun.
  Jamais de bloc de texte : cartes-concepts courtes, puis exercices immédiats.
- **Progression verrouillée par graphe.** Le socle (S0 à S6) se déverrouille en chaîne
  linéaire, examen après examen. Au-delà, le graphe se ramifie selon les prérequis réels :
  la prévoyance (S8) ne demande que la fiscalité de base (examen S3) quand le patrimoine
  professionnel (S7) et les situations de vie (S9, S11) exigent le socle complet (examen S6),
  et les actifs alternatifs (S10) s'appuient sur la fiscalité d'entreprise (examen S7).
  Voir `PREREQUIS` et `sectionOuverte()` dans `src/data/curriculum.js`.
- **Erreur = matière première.** Chaque mauvaise réponse est requeuée dans la leçon
  (on la revoit avant de finir), puis entre dans le paquet de révision espacée
  (intervalles croissants 1 / 3 / 7 / 16 / 35 jours), et nourrit l'analyse du Coach.
- **Gamification utile, pas gadget** : XP, streak quotidien, précision par leçon, badges.
  Objectif : créer l'habitude quotidienne, condition n°1 de la mémorisation.
- **Examen de section (« boss »).** Une fois toutes les leçons d'une section terminées,
  un examen de 12 questions piochées dans ces leçons conditionne le déverrouillage de la
  section suivante (seuil 80 %). Échec → pas de pénalité, mais les leçons à l'origine des
  erreurs sont pointées pour révision avant de retenter.
- **Points faibles par tag thématique.** Chaque leçon porte un tag transversal (liste fermée
  de 45, `src/data/tags.js`) ; chaque réponse alimente un compteur ok/ko par tag
  (`tagStats` en localStorage). Le Profil affiche les tags les plus fragiles (≥ 3 réponses,
  taux d'erreur > 0) avec un bouton d'entraînement ciblé (8 questions sur ce tag, XP only,
  hors progression du parcours).
- **Niveaux de difficulté.** Chaque leçon porte un niveau informatif (débutant /
  intermédiaire / avancé / expert, `NIVEAUX_LECON`), affiché en pastille sous son nœud
  dans le parcours. Purement indicatif : aucun effet sur le déverrouillage.
- **Objection du jour.** Une carte permanente au-dessus du parcours propose, chaque jour,
  une objection client pré-écrite (`src/data/objections.js`) avec méthode de réponse
  A.C.R.C. (Accueillir, Creuser, Répondre, Confirmer). Roulement avec anti-répétition sur
  10 jours ; zéro appel IA, zéro impact XP/série.
- **Barèmes centralisés.** Toutes les valeurs fiscales (tranches IR, abattements, plafonds
  PEA/PER, seuils IFI, barèmes de succession…) vivent dans `src/data/baremes-2026.js`,
  avec formatteurs `euro()`/`pct()`. Un seul fichier à mettre à jour chaque loi de finances.

## 3. Le curriculum (12 sections, 128 leçons, 535 questions)

### Le socle (S0 → S6), linéaire

| # | Section | Leçons | Contenu | Pourquoi à cette place |
|---|---------|--------|---------|------------------------|
| 0 | **Les bases avant tout** | 6 | vocabulaire (patrimoine, actif/passif), épargner vs investir, triangle risque/rendement/horizon, intérêts composés, inflation, familles d'actifs | Construire l'intuition avant tout chiffre fiscal |
| 1 | **Les fondamentaux** | 13 | métier & déontologie, statuts (CIF/IAS/IOBSP), RC pro, devoir de conseil, rémunérations, RGPD, LCB-FT, bilan patrimonial, profil de risque, régimes matrimoniaux | La posture et le cadre avant la technique |
| 2 | **Fiscalité du particulier** | 12 | barème IR & TMI, décote, CEHR, RCM, stock-options/AGA, PFU vs barème, IFI, exit tax, expatriés/impatriés, conventions fiscales | La TMI est la clé de lecture de tout le reste |
| 3 | **Enveloppes d'épargne** | 13 | assurance-vie, capitalisation, PEA, CTO, épargne salariale, PER (dont TNS), livrets, comptes à terme | Le cœur de l'activité de conseil |
| 4 | **Immobilier patrimonial** | 13 | fonciers, LMNP, SCI, plus-values, résidence principale, SCPI/OPCI, crowdfunding, nue-propriété à l'achat, viager | Première classe d'actifs des Français |
| 5 | **Transmission** | 13 | succession, régimes matrimoniaux, donations, démembrement, quasi-usufruit, Dutreil, trusts, mandat de protection, tutelle/curatelle, assurance décès | La matière la plus technique, en dernier socle |
| 6 | **Conseil en pratique** | 9 | classes d'actifs, allocation, entretien découverte, rapport de préconisation, suivi/revue annuelle, relation multi-générationnelle | La synthèse : transformer le savoir en conseil |

### Au-delà du socle, en graphe (déblocage détaillé en §2)

| # | Section | Leçons | Contenu | Prérequis |
|---|---------|--------|---------|-----------|
| 8 | **Prévoyance & protection sociale** | 10 | IJ, invalidité, contrats de prévoyance, complémentaire santé, retraite Agirc-Arrco, décote/surcote, dépendance/APA, réversion | Examen S3 |
| 7 | **Patrimoine professionnel** | 12 | EI vs société, TNS vs assimilé, SCI des murs, salaire/dividendes, holding, cession d'entreprise (500 k€, 151 septies), apport-cession, transmission d'entreprise | Examen S6 |
| 9 | **Crédit & financement** | 8 | mécanique du crédit, loi Lemoine, HCSF, renégociation, effet de levier, crédit lombard, in fine | Examen S6 |
| 11 | **Situations de vie** | 9 | divorce, prestation compensatoire, famille recomposée, expatriation/retour, handicap, décès d'un proche | Examen S6 |
| 10 | **Actifs alternatifs** | 10 | private equity, FCPI/FIP, dette privée, cryptoactifs, or, art, forêts/vignobles, poche satellite, arnaques | Examen S7 |

Chaque section se termine naturellement par des leçons plus applicatives (mini-cas chiffrés).
Les chiffres cités portent la mention de leur millésime et un rappel de vérification
(bofip.gouv.fr) — la loi de finances change chaque année.

## 4. Types d'exercices

| Type | Rôle pédagogique |
|------|------------------|
| Carte-concept | Une idée, 3 points clés max, un exemple. Lue en 20 secondes. |
| QCM | Vérification de connaissance, distracteurs plausibles |
| Vrai / Faux | Casser les idées reçues (« l'argent est bloqué 8 ans ») |
| Texte à trou | Ancrer les chiffres clés (taux, plafonds, durées) |
| Paires à associer | Relier notions et définitions |
| Mini-cas | Décision face à un profil client, avec calcul |

## 5. Architecture technique

```
src/
  data/            ← tout le contenu pré-enregistré
    curriculum.js    (index des 12 sections + PREREQUIS/sectionOuverte() +
                      buildExam()/buildSessionCible() + NIVEAUX_LECON)
    baremes-2026.js  (valeurs fiscales et sociales centralisées, formatteurs euro()/pct())
    tags.js          (liste fermée des 45 tags thématiques)
    objections.js    (14 objections client + réponses A.C.R.C.)
    sections/s0..s11.js
    scenarios.js     (profils clients pré-écrits pour la simulation)
  lib/
    storage.js       (localStorage : progression, XP, streak, erreurs, révisions,
                       examens, tagStats, objection du jour, badges)
    ai.js            (appel Mistral — Coach & Simulation uniquement)
  components/
    ui.jsx           (Btn, Confetti, Embleme — écusson abstrait, ex-mascotte)
    steps.jsx         (types d'exercices : QCM, V/F, texte à trou, paires, cas)
  screens/
    Path.jsx         (parcours : chemin de nœuds, nœud d'examen, objection du jour)
    Lesson.jsx       (lecteur plein écran — leçon / examen / session ciblée)
    Review.jsx       (révision espacée des erreurs)
    Coach.jsx        (coach IA sur données réelles)
    Simulation.jsx   (jeu de rôle client + débrief)
    Profile.jsx      (stats, badges, points faibles par tag, réglages)

formation-cgp/worker/  ← Worker Cloudflare optionnel : proxy CORS pour l'API
                          Mistral (garde la clé côté serveur, jamais dans le navigateur)
```

L'app fonctionne **entièrement sans clé API** (tout le parcours, examens, révisions,
points faibles, objection du jour). La clé Mistral, optionnelle, n'active que le Coach
et la Simulation, soit directement depuis le navigateur (clé stockée en localStorage),
soit via le Worker de `formation-cgp/worker/` (clé côté serveur, plus sûr).

## 6. Identité visuelle

Palette « Patrimonio » (indigo / or / corail / émeraude — cf. `tailwind.config.js`,
tokens `pat-*`), typographie Fredoka (titres) + Inter (texte), emblème écusson abstrait
(`Embleme` dans `src/components/ui.jsx`) sans mascotte anthropomorphe. Contrastes
vérifiés WCAG AA.

## 7. Pistes v2

- Sons de feedback (correct/erreur/leçon terminée)
- Mode hors-ligne complet (PWA)
- Classement entre collègues d'une même agence
- Historique détaillé des tentatives d'examen (au-delà du meilleur score)
