// SECTION 6 — LE CONSEIL EN PRATIQUE
// Allocation d'actifs et conduite de l'entretien client.

export default {
  id: "s6",
  titre: "Le conseil en pratique",
  sousTitre: "Allocation d'actifs, entretien, objections",
  emoji: "🚀",
  couleur: { base: "#047857", dark: "#065f46", light: "#d3f4e6" },
  unites: [
    {
      id: "s6u1",
      titre: "Allocation d'actifs",
      lecons: [
        {
          id: "s6u1l1",
          titre: "Les classes d'actifs",
          emoji: "🧺",
          tag: "bilan-profil",
          niveau: "debutant",
          steps: [
            {
              t: "concept",
              emoji: "🎢",
              titre: "Le couple rendement / risque",
              points: [
                "Monétaire et fonds euro : sûrs, rendement faible.",
                "Obligations : intermédiaires — prêter contre un coupon.",
                "Actions et immobilier : les moteurs de performance long terme… avec de la volatilité.",
              ],
            },
            {
              t: "match",
              consigne: "Associe chaque classe d'actifs à son profil",
              paires: [
                ["Livret / monétaire", "Sûr, faible rendement"],
                ["Obligations", "Coupon régulier"],
                ["Actions", "Moteur long terme"],
                ["SCPI", "Revenus immobiliers"],
              ],
            },
            {
              t: "concept",
              emoji: "📉",
              titre: "La volatilité n'est pas la perte",
              points: [
                "La volatilité mesure l'amplitude des variations, pas une perte définitive.",
                "La perte ne devient réelle que si l'on vend au mauvais moment.",
                "Le rôle du conseiller : dimensionner le risque pour que le client ne soit JAMAIS forcé de vendre en baisse.",
              ],
            },
            {
              t: "vf",
              q: "Une baisse de 20 % d'un portefeuille actions est une perte définitive.",
              vrai: false,
              exp: "C'est une moins-value latente. Elle ne se matérialise qu'à la vente — d'où l'importance de l'horizon et de l'épargne de précaution qui évite de vendre contraint.",
            },
            {
              t: "qcm",
              q: "Quelle est la force principale des intérêts composés ?",
              choix: [
                "Les gains génèrent eux-mêmes des gains : la croissance s'accélère avec le temps",
                "Ils garantissent le capital",
                "Ils suppriment la fiscalité",
                "Ils ne fonctionnent que sur les livrets",
              ],
              bonne: 0,
              exp: "10 000 € à 7 %/an ≈ 20 000 € en 10 ans, 40 000 € en 20 ans, 76 000 € en 30 ans. L'argument n°1 pour commencer tôt.",
            },
            {
              t: "gap",
              phrase: "Répartir ses investissements entre plusieurs classes d'actifs peu corrélées s'appelle la ___.",
              choix: ["diversification", "spéculation", "capitalisation", "titrisation"],
              bonne: 0,
              exp: "« Ne pas mettre tous ses œufs dans le même panier » : le seul repas gratuit de la finance, disait Markowitz.",
            },
          ],
        },
        {
          id: "s6u1l2",
          titre: "Construire une allocation",
          emoji: "🏗️",
          tag: "bilan-profil",
          niveau: "intermediaire",
          steps: [
            {
              t: "concept",
              emoji: "🧱",
              titre: "L'allocation par poches",
              points: [
                "Poche sécurité : livrets + fonds euro (précaution, projets courts).",
                "Poche cœur : allocation diversifiée calée sur le profil et l'horizon.",
                "Poche dynamique : actions/thématiques, dimensionnée pour être « oubliable » 10 ans.",
              ],
            },
            {
              t: "qcm",
              q: "Que permet l'investissement programmé (versements mensuels) ?",
              choix: [
                "Lisser le prix d'achat et neutraliser le stress du « bon moment »",
                "Garantir un rendement minimal",
                "Éviter les frais",
                "Acheter toujours au plus bas",
              ],
              bonne: 0,
              exp: "On achète plus de parts quand c'est bas, moins quand c'est haut. Et surtout : le client investit vraiment, au lieu d'attendre éternellement « la correction ».",
            },
            {
              t: "vf",
              q: "Rééquilibrer un portefeuille consiste à vendre un peu de ce qui a monté pour racheter ce qui a baissé.",
              vrai: true,
              exp: "Le rééquilibrage périodique ramène l'allocation au profil cible et institutionnalise le « vendre haut, acheter bas ».",
            },
            {
              t: "gap",
              phrase: "Plus l'échéance d'un objectif approche, plus il faut ___ l'allocation correspondante.",
              choix: ["sécuriser", "dynamiser", "concentrer", "ignorer"],
              bonne: 0,
              exp: "La désensibilisation progressive : à 2 ans d'un achat immobilier, l'apport n'a rien à faire en actions.",
            },
            {
              t: "cas",
              emoji: "👨‍💻",
              contexte: "Sami, 35 ans, célibataire, 15 000 € de précaution déjà en place, épargne 500 €/mois, aucun projet à moins de 10 ans, profil équilibré-dynamique validé.",
              q: "Quelle mise en œuvre cohérente ?",
              choix: [
                "Versements programmés majoritairement en UC/actions (PEA + assurance-vie), avec une part sécurisée résiduelle",
                "Tout accumuler sur le livret A",
                "Attendre un krach pour investir d'un coup",
                "100 % fonds euro par prudence",
              ],
              bonne: 0,
              exp: "Précaution déjà constituée + horizon > 10 ans + profil validé = investissement programmé dynamique. La pire stratégie serait d'attendre : le temps de marché perdu ne se rattrape pas.",
            },
            {
              t: "match",
              consigne: "Associe chaque situation à la bonne poche",
              paires: [
                ["Coup dur possible", "Livrets"],
                ["Apport dans 2 ans", "Fonds euro"],
                ["Retraite dans 25 ans", "Actions"],
                ["Revenus locatifs passifs", "SCPI"],
              ],
            },
          ],
        },
      ],
    },
    {
      id: "s6u2",
      titre: "L'entretien client",
      lecons: [
        {
          id: "s6u2l1",
          titre: "L'art de la découverte",
          emoji: "🔍",
          tag: "relation-client",
          niveau: "intermediaire",
          steps: [
            {
              t: "concept",
              emoji: "👂",
              titre: "Questionner, écouter, reformuler",
              points: [
                "Questions OUVERTES d'abord : « Racontez-moi… », « Qu'est-ce qui est important pour vous ? »",
                "Écoute active : relancer, laisser les silences travailler.",
                "Reformuler pour valider : « Si je résume, votre priorité est… c'est bien ça ? »",
              ],
            },
            {
              t: "qcm",
              q: "Laquelle de ces questions est une bonne question de découverte ?",
              choix: [
                "« Qu'aimeriez-vous que votre épargne vous permette de faire dans 10 ans ? »",
                "« Vous voulez du fonds euro, n'est-ce pas ? »",
                "« Vous avez combien sur vos comptes ? »",
                "« On part sur le contrat maison ? »",
              ],
              bonne: 0,
              exp: "Ouverte, orientée objectifs de vie, sans produit. Les questions fermées et intrusives arrivent plus tard, une fois la confiance installée.",
            },
            {
              t: "concept",
              emoji: "🗂️",
              titre: "Les 6 territoires à explorer",
              points: [
                "Famille et situation matrimoniale / Activité et revenus.",
                "Patrimoine et crédits / Fiscalité (TMI !).",
                "Objectifs hiérarchisés / Expérience et rapport au risque.",
              ],
            },
            {
              t: "gap",
              phrase: "Répéter avec ses mots ce que le client vient d'exprimer s'appelle la ___.",
              choix: ["reformulation", "négociation", "conclusion", "projection"],
              bonne: 0,
              exp: "Elle prouve l'écoute, corrige les malentendus immédiatement et fait dire « oui » au client sur son propre besoin — la meilleure rampe vers la préconisation.",
            },
            {
              t: "vf",
              q: "Un silence du client pendant l'entretien doit être comblé au plus vite par le conseiller.",
              vrai: false,
              exp: "Le silence est un outil : c'est souvent juste après que le client livre l'information décisive (crainte, projet caché, conflit familial).",
            },
            {
              t: "cas",
              emoji: "🚪",
              contexte: "En fin de découverte, un client lâche : « De toute façon, avec ma fille on ne se parle plus vraiment… »",
              q: "Réaction de conseiller patrimonial ?",
              choix: [
                "Creuser avec tact : cette information peut bouleverser la stratégie de transmission (testament, assurance-vie, quotité disponible)",
                "Ignorer : c'est du domaine privé",
                "Changer de sujet vers les placements",
                "Proposer immédiatement de la déshériter",
              ],
              bonne: 0,
              exp: "Le patrimonial est toujours familial. Une brouille change tout : clause bénéficiaire, quotité disponible, donation-partage. (Et non, on ne « déshérite » pas un enfant en France — réserve héréditaire.)",
            },
          ],
        },
        {
          id: "s6u2l2",
          titre: "Traiter les objections",
          emoji: "🛡️",
          tag: "relation-client",
          niveau: "intermediaire",
          steps: [
            {
              t: "concept",
              emoji: "🤝",
              titre: "La méthode A.C.R.C.",
              points: [
                "Accueillir : « Je comprends, c'est une vraie question. » Jamais de front.",
                "Creuser : « Qu'est-ce qui vous fait dire ça précisément ? »",
                "Répondre avec des faits, puis Confirmer : « Est-ce que cela répond à votre inquiétude ? »",
              ],
            },
            {
              t: "qcm",
              q: "« La bourse, c'est du casino. » Quelle est la MEILLEURE première réaction ?",
              choix: [
                "« Je comprends cette image. Qu'est-ce qui vous la donne — une expérience passée ? »",
                "« Pas du tout, vous vous trompez, regardez les statistiques. »",
                "« Alors restons sur le fonds euro. »",
                "« Tout le monde dit ça au début. »",
              ],
              bonne: 0,
              exp: "Accueillir puis creuser : derrière l'objection se cache souvent un trauma (2008, un proche ruiné). On ne traite bien que l'objection réelle, pas la façade.",
            },
            {
              t: "qcm",
              q: "« Je vais réfléchir. » Que faire ?",
              choix: [
                "Chercher l'objection cachée : « Bien sûr. Pour vous aider à réfléchir, qu'est-ce qui vous retient à ce stade ? »",
                "Conclure l'entretien poliment sans rien ajouter",
                "Baisser les frais immédiatement",
                "Relancer tous les jours par téléphone",
              ],
              bonne: 0,
              exp: "« Je vais réfléchir » est rarement une vraie demande de délai : c'est une objection non exprimée (montant, confiance, conjoint à consulter). La question douce la fait émerger.",
            },
            {
              t: "vf",
              q: "Face à « votre concurrent propose mieux », il faut d'abord dénigrer l'offre concurrente.",
              vrai: false,
              exp: "Dénigrer détruit la confiance. On valorise sa propre approche globale (conseil, suivi, adéquation) et on aide le client à comparer ce qui est comparable — frais totaux, garanties, accompagnement.",
            },
            {
              t: "cas",
              emoji: "💬",
              contexte: "Tu préconises une diversification en UC. Le client : « Mon beau-frère a tout perdu avec ça en 2008. »",
              q: "Ta meilleure réponse ?",
              choix: [
                "« Je comprends que ça marque. Qu'est-ce qui s'est passé exactement pour lui ? » — puis expliquer ce qui, dans TA préconisation, rend ce scénario improbable (horizon, dosage, diversification)",
                "« 2008 ne se reproduira jamais. »",
                "« Votre beau-frère a mal investi, c'est différent. »",
                "« D'accord, oublions les UC. »",
              ],
              bonne: 0,
              exp: "Accueillir, creuser (souvent : 100 % actions, vendu au pire moment), puis montrer en quoi le cadre proposé — profil respecté, horizon long, poche sécurisée — répond précisément à cette peur. L'objection devient un argument.",
            },
            {
              t: "concept",
              emoji: "🏁",
              titre: "Conclure une préconisation",
              points: [
                "Rappeler l'objectif exprimé PAR le client (ses mots, via ta reformulation).",
                "Relier chaque solution à cet objectif : jamais de produit « orphelin ».",
                "Annoncer les frais et les risques sans attendre la question : la transparence conclut mieux que l'esquive.",
              ],
            },
          ],
        },
      ],
    },
  ],
};
