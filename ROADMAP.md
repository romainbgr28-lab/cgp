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
- **Progression verrouillée.** On ne déverrouille la fiscalité de l'assurance-vie
  qu'après avoir maîtrisé le barème de l'IR : chaque brique s'appuie sur la précédente.
- **Erreur = matière première.** Chaque mauvaise réponse est requeuée dans la leçon
  (on la revoit avant de finir), puis entre dans le paquet de révision espacée
  (intervalles croissants 1 / 3 / 7 / 16 / 35 jours), et nourrit l'analyse du Coach.
- **Gamification utile, pas gadget** : XP, streak quotidien, précision par leçon, badges.
  Objectif : créer l'habitude quotidienne, condition n°1 de la mémorisation.

## 3. Le curriculum (6 sections, ~35 leçons)

| # | Section | Contenu | Pourquoi à cette place |
|---|---------|---------|------------------------|
| 1 | **Fondamentaux** | métier & déontologie, cadre réglementaire (ORIAS, AMF, DER, KYC), bilan patrimonial, profil de risque, régimes matrimoniaux, PACS/concubinage | La posture et le cadre avant la technique |
| 2 | **Fiscalité du particulier** | barème IR & TMI, quotient familial, réductions/crédits/déductions, PFU vs barème, plus-values, prélèvements sociaux, IFI | La TMI est la clé de lecture de tout le reste |
| 3 | **Enveloppes d'épargne** | assurance-vie (mécanique, rachats, 990 I / 757 B, clause bénéficiaire), PEA, CTO, PER (déduction, sortie) | Le cœur de l'activité de conseil |
| 4 | **Immobilier patrimonial** | revenus fonciers, déficit foncier, LMNP micro/réel, pièges LF 2025, SCI IR/IS, plus-values immobilières | Première classe d'actifs des Français |
| 5 | **Transmission** | dévolution & réserve, droits de succession, conjoint survivant, donations, donation-partage, démembrement (art. 669), Dutreil | La matière la plus technique, en dernier socle |
| 6 | **Conseil en pratique** | classes d'actifs, construire une allocation, mener la découverte, traiter les objections | La synthèse : transformer le savoir en conseil |

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
| Paires à associer | Relier notions et définitions (façon Duolingo) |
| Mini-cas | Décision face à un profil client, avec calcul |

## 5. Architecture technique

```
src/
  data/            ← tout le contenu pré-enregistré
    curriculum.js    (index des 6 sections)
    sections/s1..s6.js
    scenarios.js     (profils clients pré-écrits pour la simulation)
  lib/
    storage.js       (localStorage : progression, XP, streak, erreurs, révisions)
    ai.js            (appel Mistral — Coach & Simulation uniquement)
  screens/
    Path.jsx         (parcours façon Duolingo : chemin de nœuds)
    Lesson.jsx       (lecteur de leçon plein écran, pas à pas)
    Review.jsx       (révision espacée des erreurs)
    Coach.jsx        (coach IA sur données réelles)
    Simulation.jsx   (jeu de rôle client + débrief)
    Profile.jsx      (stats, badges, réglages)
```

L'app fonctionne **entièrement sans clé API** (tout le parcours + révisions).
La clé Mistral, optionnelle, n'active que le Coach et la Simulation.

## 6. Pistes v2

- Sons de feedback (correct/erreur/leçon terminée)
- Examens de section (« boss ») conditionnant le passage
- Mode hors-ligne complet (PWA)
- Contenus millésimés : mise à jour annuelle des barèmes en un seul fichier
- Classement entre collègues d'une même agence
