import type { ProcedureId } from "@/lib/procedures";

export type PopularRequestTemplate = {
  id: string;
  title: string;
  category: string;
  badge?: "Populaire" | "Urgent" | "Micro-entrepreneur" | "Logement" | "Santé";
  description: string;
  requestType: ProcedureId;
  promptTemplate: string;
  requiredDocuments: string[];
  emailSubjectTemplate: string;
};

export const popularRequestCategories = [
  "France Travail",
  "CAF",
  "URSSAF / Micro-entrepreneur",
  "Logement",
  "CPAM / Santé",
  "Impôts",
  "Banque",
  "Employeur / Travail",
  "Préfecture / ANTS",
  "Retraite"
] as const;

export const popularRequestTemplates: PopularRequestTemplate[] = [
  {
    id: "france-travail-arce-micro",
    title: "Demande ARCE micro-entrepreneur",
    category: "France Travail",
    badge: "Micro-entrepreneur",
    description: "Préparer une demande d'ARCE dans le cadre d'une création d'activité.",
    requestType: "chomage",
    promptTemplate:
      "Je souhaite demander l'ARCE auprès de France Travail dans le cadre de mon activité de micro-entrepreneur.\nMon activité est : (INDIQUEZ VOTRE ACTIVITÉ).\nDate de création : (DATE).\nNuméro SIRET : (SIRET).\nMa situation actuelle : (EXPLIQUEZ VOTRE SITUATION).\nJe souhaite obtenir une réponse claire sur mon éligibilité et les démarches à suivre.",
    requiredDocuments: ["Justificatif de création d'entreprise", "Numéro SIRET", "Notification de droits ARE", "Pièce d'identité"],
    emailSubjectTemplate: "Demande ARCE micro-entrepreneur - (NOM PRÉNOM)"
  },
  {
    id: "france-travail-rdv-creation",
    title: "Demande rendez-vous conseiller création entreprise",
    category: "France Travail",
    badge: "Populaire",
    description: "Demander un rendez-vous avec un conseiller pour un projet de création.",
    requestType: "chomage",
    promptTemplate:
      "Je souhaite obtenir un rendez-vous avec mon conseiller France Travail pour parler de mon projet de création d'entreprise.\nMon projet est : (DÉCRIVEZ LE PROJET).\nMa situation actuelle : (EXPLIQUEZ VOTRE SITUATION).\nMes questions principales sont : (LISTEZ VOS QUESTIONS).\nJe souhaite connaître les aides et démarches possibles.",
    requiredDocuments: ["Identifiant France Travail", "Résumé du projet", "CV ou parcours professionnel", "Documents de création si disponibles"],
    emailSubjectTemplate: "Demande de rendez-vous création d'entreprise - (NOM PRÉNOM)"
  },
  {
    id: "france-travail-reclamation-paiement",
    title: "Réclamation paiement allocation chômage",
    category: "France Travail",
    badge: "Urgent",
    description: "Signaler un retard ou une anomalie de paiement d'allocation.",
    requestType: "chomage",
    promptTemplate:
      "Je souhaite faire une réclamation concernant le paiement de mon allocation chômage.\nPériode concernée : (MOIS / PÉRIODE).\nMontant attendu ou manquant : (MONTANT).\nDate du dernier paiement reçu : (DATE).\nMa situation : (EXPLIQUEZ CE QUI S'EST PASSÉ).\nJe souhaite obtenir une vérification et une réponse écrite.",
    requiredDocuments: ["Identifiant France Travail", "Relevé de paiement", "Actualisation mensuelle", "RIB", "Courriers reçus"],
    emailSubjectTemplate: "Réclamation paiement allocation chômage - (PÉRIODE)"
  },
  {
    id: "france-travail-contestation-radiation",
    title: "Contestation radiation France Travail",
    category: "France Travail",
    badge: "Urgent",
    description: "Préparer une contestation factuelle d'une radiation.",
    requestType: "chomage",
    promptTemplate:
      "Je souhaite contester une radiation France Travail.\nDate de la décision : (DATE).\nMotif indiqué : (MOTIF).\nMa version des faits : (EXPLIQUEZ CLAIREMENT).\nDocuments ou preuves disponibles : (LISTEZ LES PREUVES).\nJe demande le réexamen de ma situation.",
    requiredDocuments: ["Décision de radiation", "Justificatifs d'absence ou échanges", "Preuves de recherche d'emploi", "Identifiant France Travail"],
    emailSubjectTemplate: "Contestation radiation France Travail - (NOM PRÉNOM)"
  },
  {
    id: "france-travail-maintien-are",
    title: "Demande maintien ARE pendant création d'entreprise",
    category: "France Travail",
    badge: "Micro-entrepreneur",
    description: "Demander des informations sur le maintien ARE pendant une création.",
    requestType: "chomage",
    promptTemplate:
      "Je souhaite demander le maintien de l'ARE pendant la création de mon activité.\nType d'activité : (ACTIVITÉ).\nDate de début prévue ou réelle : (DATE).\nStatut choisi : (MICRO-ENTREPRISE / AUTRE).\nRevenus estimés : (MONTANT).\nJe souhaite connaître les démarches et déclarations à effectuer.",
    requiredDocuments: ["Notification de droits ARE", "Justificatif de création", "Prévisionnel ou estimation de revenus", "Numéro SIRET si disponible"],
    emailSubjectTemplate: "Demande maintien ARE création d'entreprise - (NOM PRÉNOM)"
  },

  {
    id: "caf-demande-rsa",
    title: "Demande RSA",
    category: "CAF",
    badge: "Populaire",
    description: "Préparer une demande RSA ou une mise à jour de dossier.",
    requestType: "rsa",
    promptTemplate:
      "Je souhaite préparer une demande de RSA auprès de la CAF.\nMa situation familiale : (SITUATION).\nNombre d'enfants à charge : (NOMBRE).\nRevenus mensuels estimés : (MONTANT).\nLogement actuel : (LOGEMENT).\nMa difficulté principale : (EXPLIQUEZ VOTRE SITUATION).\nJe souhaite une checklist claire des démarches et documents.",
    requiredDocuments: ["Pièce d'identité", "RIB", "Justificatifs de ressources", "Avis d'imposition", "Justificatif de domicile"],
    emailSubjectTemplate: "Demande RSA - (NOM PRÉNOM)"
  },
  {
    id: "caf-prime-activite",
    title: "Demande prime d'activité",
    category: "CAF",
    badge: "Populaire",
    description: "Préparer les éléments utiles pour une demande de prime d'activité.",
    requestType: "prime-activite",
    promptTemplate:
      "Je souhaite préparer une demande de prime d'activité.\nMon activité professionnelle : (ACTIVITÉ).\nRevenus des trois derniers mois : (MONTANTS).\nComposition du foyer : (DÉCRIVEZ).\nAutres ressources : (INDIQUEZ).\nJe souhaite savoir quels justificatifs préparer.",
    requiredDocuments: ["Bulletins de salaire", "Justificatifs de ressources", "RIB", "Avis d'imposition", "Numéro allocataire si disponible"],
    emailSubjectTemplate: "Demande prime d'activité - (NOM PRÉNOM)"
  },
  {
    id: "caf-probleme-apl",
    title: "Problème APL ou aide au logement",
    category: "CAF",
    badge: "Logement",
    description: "Signaler un blocage, retard ou changement sur l'aide au logement.",
    requestType: "aide-logement",
    promptTemplate:
      "Je rencontre un problème concernant mon APL ou mon aide au logement.\nType de logement : (LOGEMENT).\nMontant du loyer : (MONTANT).\nPériode concernée : (PÉRIODE).\nProblème rencontré : (EXPLIQUEZ).\nJe souhaite obtenir une vérification et les étapes à suivre.",
    requiredDocuments: ["Bail", "Quittance de loyer", "Attestation de loyer", "Justificatifs de ressources", "Courriers CAF"],
    emailSubjectTemplate: "Problème APL / aide au logement - (NOM PRÉNOM)"
  },
  {
    id: "caf-changement-situation",
    title: "Déclaration changement de situation",
    category: "CAF",
    description: "Préparer une déclaration de changement familial, professionnel ou logement.",
    requestType: "caf",
    promptTemplate:
      "Je souhaite déclarer un changement de situation à la CAF.\nChangement concerné : (FAMILLE / EMPLOI / LOGEMENT / RESSOURCES).\nDate du changement : (DATE).\nAncienne situation : (DÉCRIVEZ).\nNouvelle situation : (DÉCRIVEZ).\nJe souhaite savoir quels documents joindre.",
    requiredDocuments: ["Justificatif du changement", "Pièce d'identité", "RIB", "Justificatifs de ressources", "Courriers CAF"],
    emailSubjectTemplate: "Déclaration changement de situation CAF - (NOM PRÉNOM)"
  },
  {
    id: "caf-contestation-trop-percu",
    title: "Contestation trop-perçu CAF",
    category: "CAF",
    badge: "Urgent",
    description: "Préparer une réponse factuelle à une demande de remboursement CAF.",
    requestType: "caf",
    promptTemplate:
      "Je souhaite contester ou demander un réexamen concernant un trop-perçu CAF.\nMontant réclamé : (MONTANT).\nPériode concernée : (PÉRIODE).\nMotif indiqué par la CAF : (MOTIF).\nMa situation et mes explications : (EXPLIQUEZ).\nJe souhaite une lettre claire et prudente.",
    requiredDocuments: ["Notification de trop-perçu", "Justificatifs de ressources", "Échanges CAF", "Relevés de paiement", "Justificatifs de situation"],
    emailSubjectTemplate: "Contestation trop-perçu CAF - (RÉFÉRENCE)"
  },

  {
    id: "urssaf-echeancier",
    title: "Demande échéancier cotisations URSSAF",
    category: "URSSAF / Micro-entrepreneur",
    badge: "Micro-entrepreneur",
    description: "Demander un paiement échelonné de cotisations.",
    requestType: "urssaf",
    promptTemplate:
      "Je souhaite demander un échéancier de paiement pour mes cotisations URSSAF.\nStatut : (MICRO-ENTREPRENEUR / AUTRE).\nPériode concernée : (PÉRIODE).\nMontant dû : (MONTANT).\nMotif de la difficulté : (EXPLIQUEZ).\nProposition d'échéancier : (PROPOSEZ UN MONTANT OU UNE DURÉE).",
    requiredDocuments: ["Échéancier ou appel de cotisations", "Déclarations de chiffre d'affaires", "Justificatifs de difficulté", "Coordonnées URSSAF"],
    emailSubjectTemplate: "Demande d'échéancier URSSAF - (PÉRIODE)"
  },
  {
    id: "urssaf-probleme-declaration-ca",
    title: "Problème déclaration chiffre d'affaires",
    category: "URSSAF / Micro-entrepreneur",
    badge: "Micro-entrepreneur",
    description: "Signaler une erreur ou un blocage de déclaration.",
    requestType: "urssaf",
    promptTemplate:
      "Je rencontre un problème avec ma déclaration de chiffre d'affaires URSSAF.\nPériode concernée : (PÉRIODE).\nChiffre d'affaires à déclarer : (MONTANT).\nProblème rencontré : (ERREUR / BLOCAGE / OUBLI).\nJe souhaite savoir comment régulariser ma situation.",
    requiredDocuments: ["Capture du message d'erreur", "Déclaration concernée", "Justificatifs de chiffre d'affaires", "Numéro SIRET"],
    emailSubjectTemplate: "Problème déclaration chiffre d'affaires URSSAF - (PÉRIODE)"
  },
  {
    id: "urssaf-attestation-vigilance",
    title: "Demande attestation de vigilance",
    category: "URSSAF / Micro-entrepreneur",
    badge: "Micro-entrepreneur",
    description: "Préparer une demande d'attestation de vigilance.",
    requestType: "urssaf",
    promptTemplate:
      "Je souhaite obtenir une attestation de vigilance URSSAF.\nNom de l'entreprise : (NOM).\nNuméro SIRET : (SIRET).\nMotif de la demande : (CLIENT / CONTRAT / DOSSIER).\nBlocage éventuel : (EXPLIQUEZ SI L'ATTESTATION N'EST PAS DISPONIBLE).",
    requiredDocuments: ["Numéro SIRET", "Compte URSSAF", "Dernières déclarations", "Justificatif de demande du client si disponible"],
    emailSubjectTemplate: "Demande attestation de vigilance URSSAF - (SIRET)"
  },
  {
    id: "urssaf-contestation-majoration",
    title: "Contestation majoration URSSAF",
    category: "URSSAF / Micro-entrepreneur",
    badge: "Urgent",
    description: "Contester une majoration ou pénalité URSSAF.",
    requestType: "urssaf",
    promptTemplate:
      "Je souhaite contester une majoration URSSAF.\nMontant de la majoration : (MONTANT).\nPériode concernée : (PÉRIODE).\nMotif indiqué : (MOTIF).\nMes explications : (EXPLIQUEZ).\nJe souhaite demander un réexamen ou une remise.",
    requiredDocuments: ["Notification URSSAF", "Preuve de paiement ou déclaration", "Justificatifs de situation", "Échanges URSSAF"],
    emailSubjectTemplate: "Contestation majoration URSSAF - (PÉRIODE)"
  },
  {
    id: "urssaf-regularisation-compte",
    title: "Demande régularisation compte micro-entrepreneur",
    category: "URSSAF / Micro-entrepreneur",
    description: "Demander la correction ou mise à jour d'un compte URSSAF.",
    requestType: "urssaf",
    promptTemplate:
      "Je souhaite demander la régularisation de mon compte micro-entrepreneur.\nNuméro SIRET : (SIRET).\nProblème constaté : (DÉCRIVEZ).\nPériode concernée : (PÉRIODE).\nCorrection demandée : (EXPLIQUEZ CE QUE VOUS DEMANDEZ).",
    requiredDocuments: ["Numéro SIRET", "Copies des déclarations", "Relevés de paiement", "Captures d'écran du compte"],
    emailSubjectTemplate: "Régularisation compte micro-entrepreneur - (SIRET)"
  },

  {
    id: "logement-demande-social",
    title: "Demande logement social",
    category: "Logement",
    badge: "Logement",
    description: "Préparer un dossier ou une relance de logement social.",
    requestType: "logement-social",
    promptTemplate:
      "Je souhaite préparer ou relancer une demande de logement social.\nNuméro unique si disponible : (NUMÉRO).\nComposition du foyer : (DÉCRIVEZ).\nLogement actuel : (DÉCRIVEZ).\nMotif de la demande ou urgence : (EXPLIQUEZ).\nJe souhaite une lettre claire et une checklist.",
    requiredDocuments: ["Pièce d'identité", "Avis d'imposition", "Justificatifs de ressources", "Justificatif de domicile", "Numéro unique"],
    emailSubjectTemplate: "Demande logement social - (NOM PRÉNOM)"
  },
  {
    id: "logement-relance-travaux",
    title: "Relance propriétaire pour travaux",
    category: "Logement",
    badge: "Logement",
    description: "Relancer un propriétaire ou bailleur au sujet de travaux.",
    requestType: "lettre-proprietaire",
    promptTemplate:
      "Je souhaite relancer mon propriétaire ou bailleur pour des travaux dans mon logement.\nAdresse du logement : (ADRESSE).\nTravaux demandés : (DÉCRIVEZ).\nDate du premier signalement : (DATE).\nConséquences pour le logement : (EXPLIQUEZ).\nJe souhaite une lettre polie et ferme.",
    requiredDocuments: ["Bail", "Photos", "Échanges précédents", "Constat ou devis si disponible"],
    emailSubjectTemplate: "Relance travaux logement - (ADRESSE)"
  },
  {
    id: "logement-contestation-caution",
    title: "Contestation retenue caution",
    category: "Logement",
    badge: "Logement",
    description: "Contester une retenue sur dépôt de garantie.",
    requestType: "lettre-proprietaire",
    promptTemplate:
      "Je souhaite contester une retenue sur mon dépôt de garantie.\nDate de sortie du logement : (DATE).\nMontant retenu : (MONTANT).\nMotif indiqué : (MOTIF).\nMes explications : (EXPLIQUEZ).\nJe souhaite demander la restitution totale ou partielle.",
    requiredDocuments: ["Bail", "État des lieux d'entrée", "État des lieux de sortie", "Décompte de retenue", "Photos"],
    emailSubjectTemplate: "Contestation retenue dépôt de garantie - (NOM PRÉNOM)"
  },
  {
    id: "logement-echeancier-loyer",
    title: "Demande échéancier loyer",
    category: "Logement",
    badge: "Urgent",
    description: "Demander un paiement échelonné de loyers en retard.",
    requestType: "lettre-proprietaire",
    promptTemplate:
      "Je souhaite demander un échéancier de paiement pour mon loyer.\nMontant du retard : (MONTANT).\nPériode concernée : (PÉRIODE).\nMotif de la difficulté : (EXPLIQUEZ).\nProposition de paiement : (PROPOSITION).\nJe souhaite une lettre respectueuse et claire.",
    requiredDocuments: ["Bail", "Quittances", "Justificatifs de ressources", "Justificatifs de difficulté"],
    emailSubjectTemplate: "Demande d'échéancier de loyer - (NOM PRÉNOM)"
  },
  {
    id: "logement-attestation-hebergement",
    title: "Attestation d'hébergement",
    category: "Logement",
    badge: "Logement",
    description: "Préparer une attestation d'hébergement pour un dossier.",
    requestType: "lettre-proprietaire",
    promptTemplate:
      "Je souhaite préparer une attestation d'hébergement.\nNom de l'hébergeant : (NOM).\nNom de la personne hébergée : (NOM).\nAdresse : (ADRESSE).\nDate de début d'hébergement : (DATE).\nDossier concerné : (EXPLIQUEZ).",
    requiredDocuments: ["Pièce d'identité de l'hébergeant", "Justificatif de domicile", "Pièce d'identité de la personne hébergée"],
    emailSubjectTemplate: "Attestation d'hébergement - (NOM PRÉNOM)"
  },

  {
    id: "cpam-remboursement",
    title: "Demande remboursement CPAM",
    category: "CPAM / Santé",
    badge: "Santé",
    description: "Préparer une demande de remboursement ou une relance CPAM.",
    requestType: "securite-sociale",
    promptTemplate:
      "Je souhaite demander ou relancer un remboursement CPAM.\nSoin ou dépense concernée : (DÉCRIVEZ).\nDate : (DATE).\nMontant : (MONTANT).\nProblème rencontré : (EXPLIQUEZ).\nJe souhaite obtenir une réponse sur le traitement de mon dossier.",
    requiredDocuments: ["Feuille de soins", "Facture", "Ordonnance si nécessaire", "Attestation de droits", "RIB"],
    emailSubjectTemplate: "Demande remboursement CPAM - (NOM PRÉNOM)"
  },
  {
    id: "cpam-css",
    title: "Demande CSS complémentaire santé solidaire",
    category: "CPAM / Santé",
    badge: "Santé",
    description: "Préparer une demande de complémentaire santé solidaire.",
    requestType: "securite-sociale",
    promptTemplate:
      "Je souhaite préparer une demande de Complémentaire santé solidaire.\nComposition du foyer : (DÉCRIVEZ).\nRessources mensuelles : (MONTANT).\nSituation actuelle : (EXPLIQUEZ).\nJe souhaite connaître les documents à préparer et les étapes.",
    requiredDocuments: ["Avis d'imposition", "Justificatifs de ressources", "Attestation de droits", "Pièce d'identité", "RIB"],
    emailSubjectTemplate: "Demande CSS - (NOM PRÉNOM)"
  },
  {
    id: "cpam-contestation-refus",
    title: "Contestation refus prise en charge",
    category: "CPAM / Santé",
    badge: "Santé",
    description: "Préparer une contestation de refus de prise en charge.",
    requestType: "securite-sociale",
    promptTemplate:
      "Je souhaite contester un refus de prise en charge CPAM.\nDate de la décision : (DATE).\nSoin ou dossier concerné : (DÉCRIVEZ).\nMotif du refus : (MOTIF).\nMes explications : (EXPLIQUEZ).\nJe souhaite une lettre claire de réexamen.",
    requiredDocuments: ["Décision de refus", "Ordonnance", "Facture ou devis", "Justificatifs médicaux administratifs", "Attestation de droits"],
    emailSubjectTemplate: "Contestation refus prise en charge CPAM - (NOM PRÉNOM)"
  },
  {
    id: "cpam-attestation-droits",
    title: "Demande attestation droits CPAM",
    category: "CPAM / Santé",
    description: "Demander une attestation de droits ou signaler un blocage.",
    requestType: "securite-sociale",
    promptTemplate:
      "Je souhaite obtenir une attestation de droits CPAM.\nMotif de la demande : (EMPLOYEUR / ORGANISME / DOSSIER).\nProblème rencontré si blocage : (EXPLIQUEZ).\nJe souhaite connaître les étapes pour obtenir ce document rapidement.",
    requiredDocuments: ["Numéro de sécurité sociale", "Pièce d'identité", "Justificatif de situation si nécessaire"],
    emailSubjectTemplate: "Demande attestation de droits CPAM - (NOM PRÉNOM)"
  },
  {
    id: "cpam-changement-situation",
    title: "Signalement changement situation santé",
    category: "CPAM / Santé",
    badge: "Santé",
    description: "Signaler un changement de situation à l'Assurance Maladie.",
    requestType: "securite-sociale",
    promptTemplate:
      "Je souhaite signaler un changement de situation à la CPAM.\nType de changement : (ADRESSE / EMPLOI / FAMILLE / AUTRE).\nDate du changement : (DATE).\nAncienne situation : (DÉCRIVEZ).\nNouvelle situation : (DÉCRIVEZ).\nJe souhaite savoir quels justificatifs transmettre.",
    requiredDocuments: ["Pièce d'identité", "Justificatif du changement", "Attestation de droits", "Justificatif de domicile"],
    emailSubjectTemplate: "Changement de situation CPAM - (NOM PRÉNOM)"
  },

  {
    id: "impots-delai-paiement",
    title: "Demande délai de paiement impôts",
    category: "Impôts",
    badge: "Urgent",
    description: "Demander un délai ou échelonnement de paiement.",
    requestType: "impots",
    promptTemplate:
      "Je souhaite demander un délai de paiement pour mes impôts.\nImpôt concerné : (TYPE D'IMPÔT).\nAnnée concernée : (ANNÉE).\nMontant dû : (MONTANT).\nMotif de la difficulté : (EXPLIQUEZ).\nProposition de paiement : (PROPOSITION).",
    requiredDocuments: ["Avis d'imposition", "Justificatifs de revenus", "Justificatifs de charges", "RIB", "Échanges avec l'administration fiscale"],
    emailSubjectTemplate: "Demande délai de paiement impôts - (ANNÉE)"
  },
  {
    id: "impots-contestation-avis",
    title: "Contestation avis d'imposition",
    category: "Impôts",
    badge: "Populaire",
    description: "Préparer une contestation ou demande de correction d'avis.",
    requestType: "impots",
    promptTemplate:
      "Je souhaite contester ou demander la correction d'un avis d'imposition.\nAnnée concernée : (ANNÉE).\nRéférence de l'avis : (RÉFÉRENCE).\nErreur constatée : (EXPLIQUEZ).\nCorrection demandée : (DÉCRIVEZ).\nJe souhaite une demande claire et factuelle.",
    requiredDocuments: ["Avis d'imposition", "Déclaration de revenus", "Justificatifs de revenus ou charges", "Documents prouvant l'erreur"],
    emailSubjectTemplate: "Contestation avis d'imposition - (ANNÉE)"
  },
  {
    id: "impots-remise-gracieuse",
    title: "Demande remise gracieuse",
    category: "Impôts",
    description: "Préparer une demande de remise gracieuse prudente.",
    requestType: "impots",
    promptTemplate:
      "Je souhaite demander une remise gracieuse auprès des impôts.\nImpôt ou pénalité concernée : (DÉCRIVEZ).\nMontant : (MONTANT).\nMotif de la demande : (EXPLIQUEZ VOTRE SITUATION).\nJustificatifs disponibles : (LISTEZ).\nJe souhaite une lettre respectueuse et argumentée.",
    requiredDocuments: ["Avis d'imposition ou pénalité", "Justificatifs de ressources", "Justificatifs de charges", "Justificatifs de difficulté"],
    emailSubjectTemplate: "Demande de remise gracieuse - (NOM PRÉNOM)"
  },
  {
    id: "impots-correction-declaration",
    title: "Correction déclaration revenus",
    category: "Impôts",
    description: "Préparer une demande de correction de déclaration.",
    requestType: "impots",
    promptTemplate:
      "Je souhaite corriger ma déclaration de revenus.\nAnnée concernée : (ANNÉE).\nErreur constatée : (EXPLIQUEZ).\nCorrection à apporter : (DÉCRIVEZ).\nDocuments justificatifs : (LISTEZ).\nJe souhaite connaître les étapes à suivre.",
    requiredDocuments: ["Déclaration de revenus", "Avis d'imposition", "Justificatifs de la correction", "Documents fiscaux"],
    emailSubjectTemplate: "Correction déclaration revenus - (ANNÉE)"
  },
  {
    id: "impots-justificatif-fiscal",
    title: "Demande justificatif fiscal",
    category: "Impôts",
    description: "Demander un justificatif ou document fiscal.",
    requestType: "impots",
    promptTemplate:
      "Je souhaite demander un justificatif fiscal.\nDocument souhaité : (NOM DU DOCUMENT).\nAnnée concernée : (ANNÉE).\nMotif de la demande : (EXPLIQUEZ).\nJe souhaite savoir comment obtenir ce document.",
    requiredDocuments: ["Pièce d'identité", "Référence fiscale si disponible", "Avis d'imposition", "Justificatif de demande de l'organisme"],
    emailSubjectTemplate: "Demande justificatif fiscal - (NOM PRÉNOM)"
  },

  {
    id: "banque-remboursement-frais",
    title: "Demande remboursement frais bancaires",
    category: "Banque",
    description: "Préparer une demande de remboursement de frais.",
    requestType: "contestation",
    promptTemplate:
      "Je souhaite demander le remboursement de frais bancaires.\nType de frais : (DÉCRIVEZ).\nMontant : (MONTANT).\nDate ou période : (DATE / PÉRIODE).\nMotif de ma demande : (EXPLIQUEZ).\nJe souhaite une lettre claire à envoyer à ma banque.",
    requiredDocuments: ["Relevé bancaire", "Conditions tarifaires", "Échanges avec la banque", "Justificatifs de situation"],
    emailSubjectTemplate: "Demande remboursement frais bancaires - (NOM PRÉNOM)"
  },
  {
    id: "banque-deblocage-virement",
    title: "Demande déblocage virement",
    category: "Banque",
    badge: "Urgent",
    description: "Relancer une banque pour un virement bloqué ou en attente.",
    requestType: "contestation",
    promptTemplate:
      "Je souhaite demander le déblocage ou la vérification d'un virement bancaire.\nMontant : (MONTANT).\nDate du virement : (DATE).\nÉmetteur ou bénéficiaire : (NOM).\nProblème constaté : (EXPLIQUEZ).\nJe souhaite obtenir une réponse rapide.",
    requiredDocuments: ["Relevé bancaire", "Preuve de virement", "Référence d'opération", "Pièce d'identité si demandée"],
    emailSubjectTemplate: "Demande déblocage virement - (RÉFÉRENCE)"
  },
  {
    id: "banque-fermeture-compte",
    title: "Demande fermeture compte",
    category: "Banque",
    description: "Préparer une demande de clôture de compte bancaire.",
    requestType: "resiliation",
    promptTemplate:
      "Je souhaite demander la fermeture de mon compte bancaire.\nBanque concernée : (NOM).\nNuméro ou référence du compte : (RÉFÉRENCE).\nDate souhaitée de fermeture : (DATE).\nCompte de transfert du solde : (IBAN SI VOUS SOUHAITEZ L'INDIQUER).\nJe souhaite une lettre claire de clôture.",
    requiredDocuments: ["Pièce d'identité", "RIB du compte de transfert", "Moyens de paiement à restituer si nécessaire"],
    emailSubjectTemplate: "Demande fermeture de compte - (NOM PRÉNOM)"
  },
  {
    id: "banque-contestation-prelevement",
    title: "Contestation prélèvement",
    category: "Banque",
    badge: "Urgent",
    description: "Contester un prélèvement bancaire non reconnu ou contesté.",
    requestType: "contestation",
    promptTemplate:
      "Je souhaite contester un prélèvement bancaire.\nMontant : (MONTANT).\nDate : (DATE).\nLibellé du prélèvement : (LIBELLÉ).\nMotif de contestation : (EXPLIQUEZ).\nJe souhaite demander une vérification et, si possible, un remboursement.",
    requiredDocuments: ["Relevé bancaire", "Mandat ou contrat si disponible", "Échanges avec le créancier", "Pièce d'identité"],
    emailSubjectTemplate: "Contestation prélèvement - (DATE)"
  },
  {
    id: "banque-echeancier-credit",
    title: "Demande échéancier crédit",
    category: "Banque",
    description: "Demander un aménagement ou échéancier de crédit.",
    requestType: "contestation",
    promptTemplate:
      "Je souhaite demander un échéancier ou un aménagement de remboursement pour mon crédit.\nType de crédit : (TYPE).\nMontant de l'échéance : (MONTANT).\nDifficulté rencontrée : (EXPLIQUEZ).\nProposition souhaitée : (DÉCRIVEZ).\nJe souhaite une demande claire à adresser à ma banque.",
    requiredDocuments: ["Contrat de crédit", "Tableau d'amortissement", "Justificatifs de revenus", "Justificatifs de charges"],
    emailSubjectTemplate: "Demande échéancier crédit - (NOM PRÉNOM)"
  },

  {
    id: "travail-attestation-employeur",
    title: "Demande attestation employeur",
    category: "Employeur / Travail",
    description: "Demander une attestation ou un document employeur.",
    requestType: "chomage",
    promptTemplate:
      "Je souhaite demander une attestation employeur.\nNom de l'entreprise : (NOM).\nPériode travaillée : (DATES).\nDocument demandé : (ATTESTATION EMPLOYEUR / CERTIFICAT / AUTRE).\nMotif de la demande : (EXPLIQUEZ).\nJe souhaite une demande polie et claire.",
    requiredDocuments: ["Contrat de travail", "Bulletins de salaire", "Coordonnées employeur", "Date de fin de contrat si concerné"],
    emailSubjectTemplate: "Demande attestation employeur - (NOM PRÉNOM)"
  },
  {
    id: "travail-salaire-impaye",
    title: "Réclamation salaire impayé",
    category: "Employeur / Travail",
    badge: "Urgent",
    description: "Préparer une réclamation factuelle pour salaire non versé.",
    requestType: "contestation",
    promptTemplate:
      "Je souhaite réclamer un salaire impayé.\nMois concerné : (MOIS).\nMontant attendu : (MONTANT).\nDate habituelle de paiement : (DATE).\nÉchanges déjà effectués : (EXPLIQUEZ).\nJe souhaite une lettre claire et factuelle.",
    requiredDocuments: ["Contrat de travail", "Bulletins de salaire", "Relevés bancaires", "Échanges avec l'employeur"],
    emailSubjectTemplate: "Réclamation salaire impayé - (MOIS)"
  },
  {
    id: "travail-rupture-conventionnelle",
    title: "Demande rupture conventionnelle",
    category: "Employeur / Travail",
    description: "Préparer une demande d'échange sur une rupture conventionnelle.",
    requestType: "contestation",
    promptTemplate:
      "Je souhaite demander un rendez-vous pour évoquer une rupture conventionnelle.\nPoste occupé : (POSTE).\nAncienneté : (DURÉE).\nMotif de ma demande : (EXPLIQUEZ BRIÈVEMENT).\nJe souhaite une formulation professionnelle et prudente.",
    requiredDocuments: ["Contrat de travail", "Bulletins de salaire", "Convention collective si disponible", "Échanges internes"],
    emailSubjectTemplate: "Demande de rendez-vous rupture conventionnelle - (NOM PRÉNOM)"
  },
  {
    id: "travail-demission-simple",
    title: "Lettre démission simple",
    category: "Employeur / Travail",
    description: "Préparer une lettre simple de démission.",
    requestType: "resiliation",
    promptTemplate:
      "Je souhaite préparer une lettre de démission simple.\nPoste occupé : (POSTE).\nEntreprise : (NOM).\nDate souhaitée de départ : (DATE).\nDurée du préavis si connue : (DURÉE).\nJe souhaite une lettre claire et professionnelle.",
    requiredDocuments: ["Contrat de travail", "Informations sur le préavis", "Coordonnées employeur"],
    emailSubjectTemplate: "Lettre de démission - (NOM PRÉNOM)"
  },
  {
    id: "travail-conge-absence",
    title: "Demande congé ou absence",
    category: "Employeur / Travail",
    description: "Préparer une demande de congé, absence ou autorisation.",
    requestType: "contestation",
    promptTemplate:
      "Je souhaite demander un congé ou une absence.\nType de congé ou absence : (TYPE).\nDates demandées : (DATES).\nMotif si nécessaire : (EXPLIQUEZ).\nOrganisation prévue : (PRÉCISEZ SI UTILE).\nJe souhaite une demande claire et professionnelle.",
    requiredDocuments: ["Planning ou justificatif si nécessaire", "Contrat de travail", "Règles internes si disponibles"],
    emailSubjectTemplate: "Demande de congé ou absence - (DATES)"
  },

  {
    id: "ants-relance-titre-sejour",
    title: "Relance titre de séjour",
    category: "Préfecture / ANTS",
    badge: "Urgent",
    description: "Préparer une relance pour un dossier en préfecture.",
    requestType: "ants",
    promptTemplate:
      "Je souhaite relancer mon dossier de titre de séjour.\nPréfecture concernée : (PRÉFECTURE).\nNuméro de dossier : (NUMÉRO).\nDate de dépôt : (DATE).\nSituation actuelle : (EXPLIQUEZ).\nJe souhaite une relance claire et respectueuse.",
    requiredDocuments: ["Récépissé", "Preuve de dépôt", "Pièce d'identité", "Justificatifs de situation", "Échanges préfecture"],
    emailSubjectTemplate: "Relance titre de séjour - (NUMÉRO DOSSIER)"
  },
  {
    id: "ants-carte-grise",
    title: "Demande carte grise",
    category: "Préfecture / ANTS",
    description: "Préparer une démarche carte grise ou immatriculation.",
    requestType: "ants",
    promptTemplate:
      "Je souhaite préparer une demande de carte grise.\nType de démarche : (ACHAT / CHANGEMENT ADRESSE / DUPLICATA / AUTRE).\nVéhicule concerné : (MARQUE / IMMATRICULATION).\nProblème rencontré : (EXPLIQUEZ).\nJe souhaite une checklist des documents et étapes.",
    requiredDocuments: ["Certificat de cession", "Carte grise", "Justificatif de domicile", "Pièce d'identité", "Contrôle technique si nécessaire"],
    emailSubjectTemplate: "Demande carte grise - (IMMATRICULATION)"
  },
  {
    id: "ants-probleme-permis",
    title: "Problème permis de conduire",
    category: "Préfecture / ANTS",
    badge: "Urgent",
    description: "Signaler un blocage ou retard sur un permis.",
    requestType: "ants",
    promptTemplate:
      "Je rencontre un problème concernant mon permis de conduire.\nType de demande : (NOUVEAU PERMIS / RENOUVELLEMENT / DUPLICATA).\nDate de dépôt : (DATE).\nNuméro de dossier : (NUMÉRO SI DISPONIBLE).\nProblème rencontré : (EXPLIQUEZ).\nJe souhaite savoir quoi faire.",
    requiredDocuments: ["Pièce d'identité", "Justificatif de domicile", "Photo-signature", "Numéro de dossier", "Justificatifs médicaux si nécessaire"],
    emailSubjectTemplate: "Problème permis de conduire - (NOM PRÉNOM)"
  },
  {
    id: "ants-passeport-cni",
    title: "Demande passeport ou CNI",
    category: "Préfecture / ANTS",
    description: "Préparer une demande de titre d'identité.",
    requestType: "ants",
    promptTemplate:
      "Je souhaite préparer une demande de passeport ou carte nationale d'identité.\nTitre demandé : (PASSEPORT / CNI).\nMotif : (PREMIÈRE DEMANDE / RENOUVELLEMENT / PERTE / VOL).\nDate de rendez-vous si connue : (DATE).\nJe souhaite une checklist claire des documents.",
    requiredDocuments: ["Photo d'identité", "Justificatif de domicile", "Ancien titre", "Timbre fiscal si nécessaire", "Acte de naissance si demandé"],
    emailSubjectTemplate: "Demande passeport / CNI - (NOM PRÉNOM)"
  },
  {
    id: "ants-attestation-hebergement",
    title: "Attestation hébergement pour dossier administratif",
    category: "Préfecture / ANTS",
    description: "Préparer une attestation d'hébergement pour un dossier ANTS/préfecture.",
    requestType: "ants",
    promptTemplate:
      "Je souhaite préparer une attestation d'hébergement pour un dossier administratif.\nNom de l'hébergeant : (NOM).\nNom de la personne hébergée : (NOM).\nAdresse : (ADRESSE).\nDossier concerné : (ANTS / PRÉFECTURE / AUTRE).\nDate de début d'hébergement : (DATE).",
    requiredDocuments: ["Pièce d'identité hébergeant", "Justificatif de domicile hébergeant", "Pièce d'identité personne hébergée"],
    emailSubjectTemplate: "Attestation d'hébergement dossier administratif - (NOM PRÉNOM)"
  },

  {
    id: "retraite-releve-carriere",
    title: "Demande relevé carrière",
    category: "Retraite",
    badge: "Populaire",
    description: "Demander ou vérifier son relevé de carrière.",
    requestType: "retraite",
    promptTemplate:
      "Je souhaite demander ou vérifier mon relevé de carrière.\nAnnée de naissance : (ANNÉE).\nSituation professionnelle actuelle : (SITUATION).\nPériodes à vérifier : (PÉRIODES).\nProblème constaté : (EXPLIQUEZ SI BESOIN).\nJe souhaite connaître les étapes.",
    requiredDocuments: ["Pièce d'identité", "Numéro de sécurité sociale", "Bulletins de salaire", "Attestations employeur", "Relevé de carrière existant"],
    emailSubjectTemplate: "Demande relevé de carrière - (NOM PRÉNOM)"
  },
  {
    id: "retraite-correction-carriere",
    title: "Correction erreur carrière",
    category: "Retraite",
    description: "Préparer une demande de correction de carrière.",
    requestType: "retraite",
    promptTemplate:
      "Je souhaite demander la correction d'une erreur sur mon relevé de carrière.\nPériode concernée : (PÉRIODE).\nEmployeur ou activité concernée : (NOM).\nErreur constatée : (EXPLIQUEZ).\nJustificatifs disponibles : (LISTEZ).\nJe souhaite une demande claire.",
    requiredDocuments: ["Relevé de carrière", "Bulletins de salaire", "Contrats ou attestations", "Certificats de travail", "Pièce d'identité"],
    emailSubjectTemplate: "Correction relevé de carrière - (PÉRIODE)"
  },
  {
    id: "retraite-rdv",
    title: "Demande rendez-vous retraite",
    category: "Retraite",
    description: "Demander un rendez-vous avec un conseiller retraite.",
    requestType: "retraite",
    promptTemplate:
      "Je souhaite demander un rendez-vous avec un conseiller retraite.\nAnnée de naissance : (ANNÉE).\nSituation actuelle : (SITUATION).\nQuestions principales : (LISTEZ).\nPériode souhaitée pour le rendez-vous : (PÉRIODE).\nJe souhaite préparer mon dossier.",
    requiredDocuments: ["Pièce d'identité", "Relevé de carrière", "Numéro de sécurité sociale", "Questions à poser"],
    emailSubjectTemplate: "Demande rendez-vous retraite - (NOM PRÉNOM)"
  },
  {
    id: "retraite-demande-pension",
    title: "Demande pension retraite",
    category: "Retraite",
    badge: "Populaire",
    description: "Préparer une demande de départ ou pension retraite.",
    requestType: "retraite",
    promptTemplate:
      "Je souhaite préparer ma demande de pension retraite.\nDate de départ souhaitée : (DATE).\nSituation professionnelle actuelle : (SITUATION).\nCaisses concernées si connues : (CAISSES).\nQuestions ou blocages : (EXPLIQUEZ).\nJe souhaite une checklist claire.",
    requiredDocuments: ["Pièce d'identité", "RIB", "Relevé de carrière", "Avis d'imposition", "Justificatifs de périodes manquantes"],
    emailSubjectTemplate: "Demande pension retraite - (NOM PRÉNOM)"
  },
  {
    id: "retraite-reversion",
    title: "Demande information pension de réversion",
    category: "Retraite",
    description: "Préparer une demande d'information sur la réversion.",
    requestType: "retraite",
    promptTemplate:
      "Je souhaite demander des informations sur une pension de réversion.\nLien avec la personne décédée : (LIEN).\nDate du décès : (DATE).\nCaisse de retraite connue : (CAISSE).\nMa situation actuelle : (EXPLIQUEZ).\nJe souhaite connaître les démarches et documents.",
    requiredDocuments: ["Acte de décès", "Livret de famille", "Pièce d'identité", "Justificatifs de ressources", "RIB"],
    emailSubjectTemplate: "Demande information pension de réversion - (NOM PRÉNOM)"
  }
];

export function findPopularRequestTemplate(id: string | null | undefined) {
  return popularRequestTemplates.find((template) => template.id === id);
}
