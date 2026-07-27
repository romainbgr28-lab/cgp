// ===================================================================
// OBJECTION DU JOUR — banque d'objections clients pré-écrites.
// Aucun appel IA : la correction est rédigée à la main (méthode
// A.C.R.C. : Accueillir, Creuser, Répondre, Confirmer).
// Roulement quotidien basé sur la date (voir Path.jsx).
// ===================================================================

export const OBJECTIONS = [
  {
    id: "ob1",
    theme: "Assurance-vie",
    objection: "« L'assurance-vie, c'est bloqué 8 ans, non ? Moi je veux pouvoir toucher mon argent. »",
    reponse:
      "Accueillir : « C'est LA question qu'on me pose le plus, et heureusement la réponse est rassurante. » Répondre : l'argent est disponible à tout moment par rachat — 8 ans n'est pas un blocage mais un seuil FISCAL : après, un abattement annuel de 4 600 € (9 200 € pour un couple) s'applique sur les gains retirés. Confirmer : « Est-ce que ça lève votre inquiétude sur la disponibilité ? »",
    astuce: "Toujours démonter cette idée reçue AVANT qu'elle ne bloque la discussion : elle est présente chez 1 client sur 2.",
  },
  {
    id: "ob2",
    theme: "Marchés financiers",
    objection: "« La bourse, c'est du casino. J'ai un collègue qui a tout perdu. »",
    reponse:
      "Accueillir sans contredire : « Je comprends cette image. » Creuser : « Que s'est-il passé pour votre collègue exactement ? » (souvent : titres isolés, pas de diversification, vente en panique). Répondre : investir diversifié, sur un horizon long, avec une poche de sécurité à côté, n'a rien à voir avec un pari — le risque se dose. Confirmer en reliant à SON horizon et SON profil.",
    astuce: "Ne jamais répondre par des statistiques avant d'avoir creusé : on ne traite bien que l'objection réelle, pas la façade.",
  },
  {
    id: "ob3",
    theme: "Conclusion",
    objection: "« Je vais réfléchir… »",
    reponse:
      "Rarement une vraie demande de délai : c'est une objection cachée (montant, confiance, conjoint à consulter). Accueillir : « Bien sûr, c'est une décision importante. » Creuser : « Pour vous aider à réfléchir, qu'est-ce qui vous retient à ce stade ? » Puis traiter l'objection qui émerge, ou convenir d'une prochaine étape datée avec le conjoint.",
    astuce: "Toujours sortir du rendez-vous avec une prochaine étape concrète et datée, jamais un « on se rappelle ».",
  },
  {
    id: "ob4",
    theme: "Frais",
    objection: "« Vos frais sont plus élevés que la banque en ligne. »",
    reponse:
      "Ne jamais dénigrer le concurrent. Accueillir : « Vous avez raison de comparer. » Répondre : comparer ce qui est comparable — frais TOTAUX (entrée, gestion, arbitrage) ET ce qu'ils financent : conseil global, suivi dans le temps, adéquation démontrée, disponibilité. Une allocation inadaptée coûte bien plus cher que quelques dixièmes de frais. Confirmer : « Qu'est-ce qui compte le plus pour vous : le tarif seul ou l'accompagnement ? »",
    astuce: "Annoncer les frais soi-même, sans attendre la question : la transparence désamorce l'objection avant qu'elle naisse.",
  },
  {
    id: "ob5",
    theme: "Fonds euro",
    objection: "« Le fonds euro ne rapporte plus rien, à quoi bon ? »",
    reponse:
      "Accueillir : « C'est vrai que les rendements ont baissé sur la décennie passée. » Répondre : le fonds euro n'est pas un moteur de performance, c'est la poche de SÉCURITÉ (capital garanti, effet cliquet). La performance vient des UC, dosées selon le profil. Le bon réflexe n'est pas d'abandonner le fonds euro mais de construire une allocation par poches. Confirmer avec un exemple chiffré adapté à son horizon.",
    astuce: "Reformuler l'objectif : « sécurité » et « rendement » sont deux poches différentes, pas un produit unique.",
  },
  {
    id: "ob6",
    theme: "PER",
    objection: "« Le PER, c'est bloqué jusqu'à la retraite, jamais de la vie. »",
    reponse:
      "Accueillir : « Le blocage est réel, autant le dire franchement. » Répondre : c'est le prix de la déduction fiscale (versement × TMI économisé immédiatement) — et il existe des sorties anticipées : achat de la résidence principale et accidents de la vie. Le PER n'a d'ailleurs vocation à recevoir QUE l'épargne retraite, pas l'épargne de précaution. Confirmer : « Sur votre TMI actuelle, 1 000 € versés vous font économiser combien, on calcule ? »",
    astuce: "Ne vendre le PER qu'à partir de TMI 30 % : en dessous, l'assurance-vie plus souple est souvent préférable — le dire crée de la confiance.",
  },
  {
    id: "ob7",
    theme: "Transmission",
    objection: "« Je suis trop jeune pour penser à la succession. »",
    reponse:
      "Accueillir avec le sourire : « Tant mieux, c'est exactement le bon moment. » Répondre : les abattements de donation (100 000 € par enfant) se rechargent tous les 15 ans — commencer tôt permet de les utiliser plusieurs fois ; et l'assurance-vie doit être alimentée avant 70 ans pour l'abattement de 152 500 € par bénéficiaire. Anticiper ne veut pas dire se démunir : on ne donne que ce dont on n'aura jamais besoin. Confirmer : « Voulez-vous qu'on chiffre ce que l'anticipation ferait économiser à vos enfants ? »",
    astuce: "Transformer « trop jeune » en argument : chaque cycle de 15 ans gagné, c'est un abattement de plus consommé en franchise.",
  },
  {
    id: "ob8",
    theme: "Concurrence",
    objection: "« Mon voisin a fait un placement qui rapporte 8 %, vous avez pareil ? »",
    reponse:
      "Accueillir : « 8 %, ça mérite qu'on s'y arrête. » Creuser : « Savez-vous sur quel support, avec quel risque et quel blocage ? » Répondre : un rendement ne se juge JAMAIS seul — toujours avec son risque, sa liquidité et sa fiscalité. Un placement adapté au voisin peut être inadapté à votre situation : c'est tout l'objet du conseil personnalisé. Confirmer en recentrant sur SES objectifs.",
    astuce: "Règle d'or à partager au client : un rendement élevé « garanti » sans risque affiché = signal d'alerte (arnaques courantes).",
  },
  {
    id: "ob9",
    theme: "Immobilier",
    objection: "« Moi je ne crois qu'à la pierre. Le reste, c'est du vent. »",
    reponse:
      "Accueillir : « L'immobilier est effectivement un excellent pilier patrimonial. » Répondre : le sujet n'est pas pierre CONTRE finance, mais l'équilibre — un patrimoine 100 % immobilier est illiquide (impossible d'en vendre un bout en cas de coup dur), concentré et lourdement fiscalisé (TMI + 17,2 % sur les loyers, IFI au-delà de 1,3 M€). Une poche financière apporte la liquidité et la diversification qui manquent. Confirmer : « Que se passe-t-il aujourd'hui si vous avez besoin de 30 000 € rapidement ? »",
    astuce: "Ne jamais attaquer la conviction de fond : s'appuyer dessus (« gardons la pierre en cœur de patrimoine ») et compléter.",
  },
  {
    id: "ob10",
    theme: "Timing de marché",
    objection: "« J'attends que ça baisse pour investir. »",
    reponse:
      "Accueillir : « C'est intuitif, tout le monde aimerait acheter au plus bas. » Répondre : personne ne sait dater le point bas, et l'attente a un coût énorme (temps de marché perdu, dividendes non perçus). La réponse professionnelle : l'investissement programmé — des versements mensuels qui lissent le prix d'achat et neutralisent la question du timing. Confirmer : « Préférez-vous parier sur une date, ou mettre en place une mécanique qui fonctionne quelle que soit la date ? »",
    astuce: "« Time in the market beats timing the market » — à traduire en français simple pour le client, avec un exemple chiffré.",
  },
  {
    id: "ob11",
    theme: "Confiance",
    objection: "« Vous dites ça parce que vous touchez une commission. »",
    reponse:
      "Objection frontale : surtout ne pas se braquer. Accueillir : « Question légitime, et je préfère qu'elle soit posée. » Répondre : expliquer SA rémunération en toute transparence (c'est d'ailleurs une obligation du DER), puis recentrer sur l'adéquation : « Mon intérêt durable, c'est que la solution soit adaptée — un client mal conseillé part, et il a raison. » Montrer la trace écrite : le rapport justifie l'adéquation entre le conseil et SES objectifs. Confirmer : « Voulez-vous que je vous détaille précisément qui gagne quoi sur cette solution ? »",
    astuce: "La transparence sur la rémunération, donnée AVANT d'être demandée, est le meilleur bâtisseur de confiance du métier.",
  },
  {
    id: "ob12",
    theme: "Succession",
    objection: "« Pas besoin de testament, ma femme héritera de tout. »",
    reponse:
      "Accueillir : « C'est ce que croient la plupart des couples. » Répondre : avec des enfants, le conjoint survivant n'hérite JAMAIS de tout automatiquement — au mieux 100 % en usufruit ou 1/4 en pleine propriété (et seulement 1/4 s'il y a des enfants d'une autre union). La protection du conjoint se CONSTRUIT : donation entre époux, régime matrimonial, clause bénéficiaire d'assurance-vie. Confirmer : « Voulez-vous qu'on vérifie ce que recevrait concrètement votre épouse aujourd'hui ? »",
    astuce: "Le chiffrage concret (« voilà ce qu'elle toucherait demain ») déclenche la prise de conscience bien mieux que la théorie.",
  },
  {
    id: "ob13",
    theme: "Épargne réglementée",
    objection: "« Je laisse tout sur le Livret A, au moins c'est sûr. »",
    reponse:
      "Accueillir : « Le Livret A est parfait… pour son rôle : l'épargne de précaution. » Creuser : « Quel montant représente pour vous 3 à 6 mois de dépenses ? » Répondre : au-delà de cette poche, l'argent qui dort perd du pouvoir d'achat face à l'inflation — le « sans risque » a un coût invisible. Chaque euro au-delà de la précaution mérite un projet et une enveloppe adaptée (assurance-vie, PEA…). Confirmer : « Gardons le Livret A plein comme socle, et donnons un travail au reste ? »",
    astuce: "Valider le Livret A au lieu de le critiquer : le client se sent conforté, puis suit naturellement sur « et le surplus ? ».",
  },
  {
    id: "ob14",
    theme: "Défiscalisation",
    objection: "« Ma voisine a défiscalisé, je veux faire pareil. »",
    reponse:
      "Accueillir : « Bonne nouvelle : il existe plein d'outils. Mauvaise nouvelle : le bon outil dépend entièrement de votre situation. » Creuser : « Êtes-vous imposable, et à quelle tranche ? » Répondre : sans impôt, réductions et déductions ne servent à rien (seuls les crédits d'impôt sont remboursables) ; et une défiscalisation ne doit JAMAIS précéder le projet patrimonial — on ne s'endette pas 20 ans pour économiser 2 000 € d'impôt. Confirmer : « On commence par calculer votre TMI pour voir ce qui a vraiment du sens ? »",
    astuce: "« Défiscaliser » n'est pas un objectif, c'est un moyen. Ramener systématiquement au projet : retraite, revenus, transmission.",
  },
];
