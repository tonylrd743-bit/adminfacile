export type ProcedureField = {
  name: string;
  label: string;
  help: string;
  type: "text" | "textarea" | "number" | "select" | "date";
  required?: boolean;
  options?: string[];
};

export type ProcedureDefinition = {
  id: string;
  label: string;
  category: string;
  icon: string;
  description: string;
  targetOrganization: string;
  promptFocus: string;
  fields: ProcedureField[];
};

const householdFields: ProcedureField[] = [
  {
    name: "familyStatus",
    label: "Situation familiale",
    help: "Indiquez la situation la plus proche de votre cas actuel.",
    type: "select",
    required: true,
    options: ["Célibataire", "En couple", "Marié(e)", "Séparé(e)", "Parent isolé"]
  },
  {
    name: "childrenCount",
    label: "Nombre d'enfants à charge",
    help: "Indiquez 0 si vous n'avez pas d'enfant à charge.",
    type: "number",
    required: true
  },
  {
    name: "estimatedMonthlyIncome",
    label: "Revenus mensuels estimés",
    help: "Montant approximatif en euros, à vérifier ensuite avec vos justificatifs.",
    type: "number",
    required: true
  }
];

const housingField: ProcedureField = {
  name: "housing",
  label: "Logement actuel",
  help: "Cette information aide à identifier les justificatifs utiles.",
  type: "select",
  required: true,
  options: ["Locataire", "Propriétaire", "Hébergé(e)", "Sans logement stable", "Autre"]
};

const employmentField: ProcedureField = {
  name: "employmentStatus",
  label: "Situation professionnelle",
  help: "Choisissez la situation la plus proche de votre cas.",
  type: "select",
  required: true,
  options: ["Salarié(e)", "Indépendant(e)", "Sans emploi", "Étudiant(e)", "Retraité(e)", "Autre"]
};

export const procedures = [
  {
    id: "caf",
    label: "Dossier CAF",
    category: "Prestations sociales",
    icon: "HeartHandshake",
    description: "Préparer un dossier ou une réponse à la CAF.",
    targetOrganization: "CAF",
    promptFocus:
      "Prépare une checklist CAF prudente, distingue les justificatifs de ressources, de logement et de situation familiale, et rappelle de vérifier les informations sur caf.fr.",
    fields: [housingField, employmentField, ...householdFields]
  },
  {
    id: "rsa",
    label: "RSA",
    category: "Prestations sociales",
    icon: "BadgeEuro",
    description: "Préparer une demande RSA ou une mise à jour de situation.",
    targetOrganization: "CAF ou MSA",
    promptFocus:
      "Structure un dossier RSA avec attention aux ressources, à la composition du foyer, aux justificatifs d'identité et au suivi CAF/MSA, sans promettre d'éligibilité.",
    fields: [housingField, employmentField, ...householdFields]
  },
  {
    id: "prime-activite",
    label: "Prime d'activité",
    category: "Prestations sociales",
    icon: "BriefcaseBusiness",
    description: "Préparer les éléments nécessaires à la prime d'activité.",
    targetOrganization: "CAF ou MSA",
    promptFocus:
      "Explique les pièces utiles pour la prime d'activité, notamment revenus professionnels, autres ressources, composition du foyer et périodes à déclarer.",
    fields: [employmentField, housingField, ...householdFields]
  },
  {
    id: "chomage",
    label: "Chômage",
    category: "Emploi",
    icon: "UserRoundSearch",
    description: "Préparer une démarche France Travail ou une relance.",
    targetOrganization: "France Travail",
    promptFocus:
      "Prépare une démarche France Travail claire, avec documents liés à l'inscription, attestations employeur, situation professionnelle et relance polie si nécessaire.",
    fields: [
      employmentField,
      { name: "lastJobEndDate", label: "Date de fin du dernier emploi", help: "Si vous la connaissez.", type: "date" },
      { name: "employerName", label: "Dernier employeur", help: "Nom de l'entreprise ou de l'employeur.", type: "text" }
    ]
  },
  {
    id: "aide-logement",
    label: "Aide au logement",
    category: "Logement",
    icon: "House",
    description: "Préparer APL, ALS ou ALF.",
    targetOrganization: "CAF ou MSA",
    promptFocus:
      "Prépare une demande d'aide au logement en listant bail, quittance, ressources, composition du foyer et informations sur le logement.",
    fields: [
      housingField,
      ...householdFields,
      { name: "monthlyRent", label: "Loyer mensuel", help: "Montant approximatif hors charges ou charges comprises si connu.", type: "number" }
    ]
  },
  {
    id: "logement-social",
    label: "Logement social",
    category: "Logement",
    icon: "Building2",
    description: "Préparer un dossier ou une relance de logement social.",
    targetOrganization: "Demande-logement-social.gouv.fr ou bailleur social",
    promptFocus:
      "Aide à préparer ou relancer un dossier de logement social avec situation familiale, urgence, ressources, logement actuel et justificatifs.",
    fields: [
      housingField,
      ...householdFields,
      { name: "urgencyReason", label: "Motif d'urgence éventuel", help: "Exemple : logement trop petit, insalubre, séparation, expulsion.", type: "textarea" }
    ]
  },
  {
    id: "securite-sociale",
    label: "Sécurité sociale",
    category: "Santé",
    icon: "ShieldPlus",
    description: "Préparer un courrier ou une démarche CPAM.",
    targetOrganization: "CPAM / Assurance Maladie",
    promptFocus:
      "Prépare une démarche CPAM prudente avec numéro de dossier si fourni, dates, pièces médicales ou administratives à joindre, sans conseil médical.",
    fields: [
      { name: "socialSecurityTopic", label: "Sujet de la démarche", help: "Exemple : carte Vitale, remboursement, affiliation, arrêt de travail.", type: "text", required: true },
      { name: "eventDate", label: "Date concernée", help: "Date du soin, du courrier ou de l'événement si connue.", type: "date" }
    ]
  },
  {
    id: "retraite",
    label: "Retraite",
    category: "Retraite",
    icon: "Landmark",
    description: "Préparer une demande ou une vérification de dossier retraite.",
    targetOrganization: "Assurance retraite / caisse complémentaire",
    promptFocus:
      "Prépare une checklist retraite avec relevé de carrière, périodes travaillées, justificatifs manquants et étapes de vérification sur les sites officiels.",
    fields: [
      employmentField,
      { name: "birthYear", label: "Année de naissance", help: "Utile pour contextualiser sans calculer de droit définitif.", type: "number" },
      { name: "careerIssue", label: "Problème dans la carrière", help: "Période manquante, erreur, demande de départ, réversion, autre.", type: "textarea" }
    ]
  },
  {
    id: "impots",
    label: "Impôts",
    category: "Fiscalité",
    icon: "ReceiptText",
    description: "Préparer une demande ou une contestation simple aux impôts.",
    targetOrganization: "Administration fiscale",
    promptFocus:
      "Prépare un courrier fiscal simple, factuel et prudent, en invitant à vérifier sur impots.gouv.fr et sans conseil fiscal personnalisé.",
    fields: [
      { name: "taxYear", label: "Année concernée", help: "Exemple : 2025.", type: "number", required: true },
      { name: "taxNoticeReference", label: "Référence d'avis", help: "Optionnel, ne mettez pas de donnée sensible si vous n'êtes pas sûr.", type: "text" }
    ]
  },
  {
    id: "ants",
    label: "ANTS / carte grise",
    category: "Titres et véhicules",
    icon: "CarFront",
    description: "Préparer une démarche ANTS, carte grise ou permis.",
    targetOrganization: "ANTS",
    promptFocus:
      "Prépare une checklist ANTS avec justificatifs d'identité, domicile, véhicule ou permis selon le cas, et explique les étapes sans garantir le délai.",
    fields: [
      { name: "antsTopic", label: "Type de démarche ANTS", help: "Carte grise, permis, immatriculation, cession, autre.", type: "select", required: true, options: ["Carte grise", "Permis", "Immatriculation", "Cession de véhicule", "Autre"] },
      { name: "vehicleInfo", label: "Informations véhicule", help: "Marque, immatriculation ou contexte, sans donnée sensible inutile.", type: "text" }
    ]
  },
  {
    id: "urssaf",
    label: "URSSAF",
    category: "Travail indépendant",
    icon: "Store",
    description: "Préparer une demande ou relance URSSAF.",
    targetOrganization: "URSSAF",
    promptFocus:
      "Prépare une démarche URSSAF factuelle pour indépendant ou employeur, avec échéances, cotisations, justificatifs et prudence sur les montants.",
    fields: [
      { name: "businessStatus", label: "Statut", help: "Micro-entrepreneur, indépendant, employeur, autre.", type: "select", required: true, options: ["Micro-entrepreneur", "Indépendant", "Employeur", "Autre"] },
      { name: "urssafPeriod", label: "Période concernée", help: "Exemple : 1er trimestre 2026.", type: "text" }
    ]
  },
  {
    id: "resiliation",
    label: "Résiliation",
    category: "Courriers",
    icon: "FileX2",
    description: "Générer une lettre de résiliation claire.",
    targetOrganization: "Fournisseur, assurance, abonnement ou service",
    promptFocus:
      "Rédige une lettre de résiliation sobre et complète, avec références de contrat si fournies, date souhaitée et demande de confirmation écrite.",
    fields: [
      { name: "serviceName", label: "Service à résilier", help: "Nom du fournisseur, assurance ou abonnement.", type: "text", required: true },
      { name: "contractReference", label: "Référence contrat", help: "Optionnel.", type: "text" },
      { name: "desiredEndDate", label: "Date de résiliation souhaitée", help: "Si vous en avez une.", type: "date" }
    ]
  },
  {
    id: "contestation",
    label: "Contestation",
    category: "Courriers",
    icon: "Scale",
    description: "Préparer une contestation administrative ou commerciale simple.",
    targetOrganization: "Organisme ou service concerné",
    promptFocus:
      "Prépare une contestation factuelle et polie, en séparant les faits, la demande, les pièces jointes et les limites juridiques.",
    fields: [
      { name: "decisionDate", label: "Date de la décision ou facture", help: "Date du courrier, de l'amende, de la facture ou de la décision.", type: "date" },
      { name: "referenceNumber", label: "Référence", help: "Numéro de dossier, facture ou décision si utile.", type: "text" }
    ]
  },
  {
    id: "lettre-proprietaire",
    label: "Lettre propriétaire",
    category: "Logement",
    icon: "KeyRound",
    description: "Rédiger un courrier à un propriétaire ou bailleur.",
    targetOrganization: "Propriétaire ou agence",
    promptFocus:
      "Rédige une lettre locataire-propriétaire claire pour signaler un problème, demander une réparation, relancer ou formaliser une demande, sans conseil juridique.",
    fields: [
      housingField,
      { name: "landlordTopic", label: "Sujet du courrier", help: "Réparation, quittance, dépôt de garantie, préavis, trouble, autre.", type: "select", required: true, options: ["Réparation", "Quittance", "Dépôt de garantie", "Préavis", "Trouble dans le logement", "Autre"] },
      { name: "landlordName", label: "Nom du propriétaire ou bailleur", help: "Optionnel.", type: "text" }
    ]
  },
  {
    id: "aide-financiere",
    label: "Demande d'aide financière",
    category: "Aides et urgences",
    icon: "HandCoins",
    description: "Préparer une demande d'aide exceptionnelle ou sociale.",
    targetOrganization: "CCAS, département, association ou organisme social",
    promptFocus:
      "Prépare une demande d'aide financière humaine, factuelle et prudente, avec budget, urgence, justificatifs et demande formulée clairement.",
    fields: [
      ...householdFields,
      { name: "monthlyExpenses", label: "Charges mensuelles estimées", help: "Montant approximatif des charges principales.", type: "number" },
      { name: "urgencyReason", label: "Motif de la demande", help: "Expliquez la difficulté financière actuelle.", type: "textarea", required: true }
    ]
  }
] as const satisfies ProcedureDefinition[];

export type ProcedureId = (typeof procedures)[number]["id"];
export const procedureIds = procedures.map((procedure) => procedure.id) as ProcedureId[];

export function isProcedureId(value: string): value is ProcedureId {
  return procedureIds.includes(value as ProcedureId);
}

export function getProcedureById(id: string) {
  return procedures.find((procedure) => procedure.id === id);
}

export function getProcedureLabel(id: string) {
  const legacyLabels: Record<string, string> = {
    CAF: "Dossier CAF",
    RSA: "RSA",
    "Prime d'activite": "Prime d'activité"
  };
  return getProcedureById(id)?.label ?? legacyLabels[id] ?? id;
}

export function getProcedureCategories() {
  return Array.from(new Set(procedures.map((procedure) => procedure.category)));
}
