import type { LucideIcon } from "lucide-react";
import { Calculator, FileText, Mail, ReceiptText, ShieldCheck, Sparkles, TimerReset, WalletCards } from "lucide-react";

export type LandingPageConfig = {
  slug: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  primaryCta: string;
  secondaryCta: string;
  documentCta: string;
  benefits: Array<{ title: string; text: string; icon: LucideIcon }>;
  mockupTitle: string;
  mockupRows: Array<[string, string]>;
  faq: Array<{ question: string; answer: string }>;
  seo: {
    title: string;
    description: string;
  };
};

export const landingPages: Record<string, LandingPageConfig> = {
  "devis-factures": {
    slug: "devis-factures",
    eyebrow: "Devis & factures",
    title: "Créez des devis et factures professionnels plus rapidement",
    subtitle:
      "AdminFacile aide les indépendants, artisans, consultants et prestataires à préparer des documents commerciaux clairs, crédibles et prêts à relire.",
    primaryCta: "Essayer gratuitement",
    secondaryCta: "Voir les offres",
    documentCta: "Créer mon premier document",
    benefits: [
      { title: "Lignes personnalisables", text: "Prestations libres, unités, quantités, prix HT, TVA et mentions adaptées.", icon: FileText },
      { title: "PDF professionnel", text: "Un rendu propre pour envoyer un devis ou une facture sans effet brouillon.", icon: ReceiptText },
      { title: "Emails prêts à envoyer", text: "Préparez le message client avec Gmail ou Mail, sans envoi automatique.", icon: Mail }
    ],
    mockupTitle: "Aperçu devis",
    mockupRows: [
      ["Prestation", "Mission de conseil - forfait"],
      ["Total HT", "450,00 €"],
      ["TVA", "90,00 €"],
      ["Total TTC", "540,00 €"]
    ],
    faq: [
      { question: "Puis-je utiliser AdminFacile en micro-entreprise ?", answer: "Oui. Les champs prévoient SIRET, TVA applicable ou non, unités et mentions à vérifier selon votre statut." },
      { question: "Les documents remplacent-ils un expert-comptable ?", answer: "Non. AdminFacile aide à préparer vos documents, mais ne remplace pas un expert-comptable ou un conseil juridique." }
    ],
    seo: {
      title: "Logiciel devis facture simple pour indépendants - AdminFacile",
      description: "Créez devis, factures, PDF et emails professionnels avec AdminFacile, outil indépendant d'aide administrative et business."
    }
  },
  "simulateur-prestation": {
    slug: "simulateur-prestation",
    eyebrow: "Simulateur IA",
    title: "Estimez vos prestations avec une explication professionnelle",
    subtitle:
      "Décrivez une mission, un chantier, une intervention ou un service. AdminFacile vous aide à cadrer le prix, le temps, la difficulté et la marge.",
    primaryCta: "Essayer gratuitement",
    secondaryCta: "Voir les offres",
    documentCta: "Créer mon premier document",
    benefits: [
      { title: "Adapté à votre métier", text: "Bâtiment, nettoyage, consulting, digital, dépannage, livraison, coaching ou autre.", icon: Sparkles },
      { title: "Prix mieux expliqués", text: "Fourchette, prix conseillé, temps estimé, déplacement, difficulté et rentabilité.", icon: Calculator },
      { title: "Transformable en devis", text: "Réutilisez l'estimation dans les outils Pro pour préparer un document client.", icon: FileText }
    ],
    mockupTitle: "Estimation IA",
    mockupRows: [
      ["Prix conseillé", "1 050,00 €"],
      ["Temps estimé", "2 jours"],
      ["Difficulté", "Moyenne"],
      ["Marge", "À sécuriser"]
    ],
    faq: [
      { question: "Le simulateur remplace-t-il une visite terrain ?", answer: "Non. Il donne une estimation indicative à partir des informations fournies. Le professionnel garde la validation finale." },
      { question: "Puis-je l'utiliser pour du consulting ?", answer: "Oui. Le simulateur peut raisonner en mission, livrables, temps, valeur et niveau d'expertise." }
    ],
    seo: {
      title: "Simulateur de prestation IA pour pros - AdminFacile",
      description: "Estimez une prestation, expliquez votre prix et transformez le résultat en devis avec AdminFacile."
    }
  },
  "outils-pro": {
    slug: "outils-pro",
    eyebrow: "Outils Pro",
    title: "Un espace business simple pour gérer vos documents clients",
    subtitle:
      "Devis, factures, emails, relances, demandes de prix et assistant administratif : AdminFacile centralise les tâches qui prennent du temps.",
    primaryCta: "Essayer gratuitement",
    secondaryCta: "Voir les offres",
    documentCta: "Créer mon premier document",
    benefits: [
      { title: "Devis et factures", text: "Préparez vos documents avec des informations profil réutilisées automatiquement.", icon: WalletCards },
      { title: "Relances propres", text: "Rédigez des rappels sérieux, progressifs et professionnels.", icon: TimerReset },
      { title: "Assistant pro", text: "Structurez priorités, documents, prochaines actions et messages client.", icon: Sparkles }
    ],
    mockupTitle: "Poste de travail",
    mockupRows: [
      ["Devis", "Prêt à envoyer"],
      ["Facture", "En attente"],
      ["Email client", "Préparé"],
      ["Relance", "Planifiée"]
    ],
    faq: [
      { question: "AdminFacile est-il adapté aux artisans et consultants ?", answer: "Oui. Le profil professionnel permet d'adapter les textes, unités, mentions et signatures à l'activité." },
      { question: "Puis-je tester sans payer ?", answer: "Oui. L'offre gratuite permet de tester les outils essentiels avant de passer à une offre payante." }
    ],
    seo: {
      title: "Outils Pro pour indépendants et petites entreprises - AdminFacile",
      description: "Devis, factures, relances, emails et assistant administratif IA dans un espace professionnel simple."
    }
  },
  "assistant-administratif": {
    slug: "assistant-administratif",
    eyebrow: "Assistant administratif",
    title: "Préparez vos démarches, courriers et PDF avec un outil indépendant",
    subtitle:
      "AdminFacile aide à structurer vos demandes administratives, vos justificatifs et vos emails, sans se présenter comme un organisme officiel.",
    primaryCta: "Essayer gratuitement",
    secondaryCta: "Voir les offres",
    documentCta: "Créer mon premier document",
    benefits: [
      { title: "Courriers structurés", text: "Objet, contexte, demande, pièces jointes et formule professionnelle.", icon: FileText },
      { title: "Checklist claire", text: "Les documents à préparer et les étapes sont organisés pour avancer plus sereinement.", icon: ShieldCheck },
      { title: "Outil indépendant", text: "Un rappel visible précise qu'AdminFacile ne remplace pas un organisme officiel.", icon: Sparkles }
    ],
    mockupTitle: "Dossier préparé",
    mockupRows: [
      ["Résumé", "Clair et exploitable"],
      ["Lettre", "Prête à relire"],
      ["Documents", "Checklist"],
      ["PDF", "Exportable"]
    ],
    faq: [
      { question: "AdminFacile est-il un organisme officiel ?", answer: "Non. AdminFacile est un outil indépendant d'aide administrative et business." },
      { question: "Les réponses sont-elles des conseils juridiques ?", answer: "Non. Les contenus aident à préparer une demande et doivent être vérifiés auprès des sources ou professionnels compétents." }
    ],
    seo: {
      title: "Assistant administratif IA indépendant - AdminFacile",
      description: "Préparez courriers, démarches, emails et PDF avec un outil indépendant d'aide administrative et business."
    }
  }
};
