import {
  ArrowRight,
  BriefcaseBusiness,
  Check,
  FileText,
  HelpCircle,
  Mail,
  ReceiptText,
  ShieldCheck,
  Sparkles,
  TimerReset,
  Workflow
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { ButtonLink } from "@/components/button";
import { CheckoutButton } from "@/components/checkout-button";
import { DisclaimerBox } from "@/components/disclaimer-box";
import { isStripePlanConfigured } from "@/lib/stripe-checkout";

const discoveryFeatures = [
  "1 dossier/mois",
  "Prompts essentiels",
  "Generation IA standard",
  "Preparation email",
  "PDF simple",
  "Acces mobile",
  "Historique limite",
  "Onboarding simple",
  "Tutoriel rapide",
  "Exemples populaires"
];

const premiumFeatures = [
  "Dossiers illimites",
  "Prompts premium France",
  "Generation IA avancee",
  "PDF premium",
  "Historique complet",
  "Preparation email intelligente",
  "Organisation dossiers",
  "Favoris",
  "Prompts CAF / URSSAF / France Travail avances",
  "Suggestions automatiques",
  "Mode mobile premium",
  "Futures automatisations IA"
];

const proFeatures = [
  "Tout Premium inclus",
  "Generation devis",
  "Generation factures",
  "Reponses clients",
  "Preparation emails professionnels",
  "Relances clients",
  "Relances factures impayees",
  "Stockage documents",
  "Coffre administratif",
  "Suivi administratif",
  "Timeline dossiers",
  "Export PDF professionnel",
  "Modeles entreprise",
  "Gestion URSSAF",
  "Modeles ARCE entrepreneur",
  "Dashboard business",
  "Assistant entrepreneur IA",
  "Futures automatisations IA"
];

const automationItems = [
  "Reponses email IA",
  "Rappels administratifs",
  "Classement automatique",
  "Relances automatiques",
  "Assistant entrepreneur IA",
  "Suivi intelligent",
  "Analyse documents IA",
  "Gestion clients simplifiee"
];

const entrepreneurTools = [
  { title: "Creer un devis", icon: FileText },
  { title: "Creer une facture", icon: ReceiptText },
  { title: "Preparer email client", icon: Mail },
  { title: "Reponse demande devis", icon: BriefcaseBusiness },
  { title: "Relance facture", icon: TimerReset },
  { title: "Assistant administratif IA", icon: Sparkles }
];

export default function PricingPage() {
  const premiumEnabled = isStripePlanConfigured("premium");

  return (
    <main className="bg-white">
      <section className="mx-auto max-w-7xl px-4 pb-10 pt-16 sm:px-6 lg:px-8 lg:pb-16">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-sm font-semibold uppercase text-blue-600">Tarifs AdminFacile</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
            Un assistant administratif premium pour avancer avec methode
          </h1>
          <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-slate-600">
            AdminFacile transforme vos demandes administratives en dossiers structures, emails prets a envoyer et PDF
            lisibles, sur mobile comme sur desktop.
          </p>
        </div>

        {!premiumEnabled ? (
          <div className="mx-auto mt-8 max-w-3xl rounded-3xl border border-blue-100 bg-blue-50 p-5 text-center text-sm font-medium text-blue-900">
            Paiement bientot disponible. Le parcours gratuit reste testable pendant la configuration Stripe.
          </div>
        ) : null}

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          <PlanCard
            action={
              <ButtonLink className="w-full" href="/signup" variant="outline">
                Commencer gratuitement
                <ArrowRight className="h-4 w-4" />
              </ButtonLink>
            }
            description="Pour tester AdminFacile avec un premier dossier administratif clair."
            features={discoveryFeatures}
            name="Decouverte"
            price="0€"
          />
          <PlanCard
            action={<CheckoutButton disabled={!premiumEnabled} label="Passer Premium" plan="premium" />}
            badge="Le plus populaire"
            description="Votre assistant administratif personnel intelligent pour produire des dossiers sans limite."
            featured
            features={premiumFeatures}
            name="Premium"
            price="9,99€/mois"
          />
          <PlanCard
            action={
              <div className="space-y-2">
                <ButtonLink className="w-full" href="/dashboard/pro" variant="secondary">
                  <BriefcaseBusiness className="h-4 w-4" />
                  Tester la demo Pro
                </ButtonLink>
                <p className="text-center text-sm font-medium text-slate-500">Aucun paiement requis pour la demo.</p>
              </div>
            }
            badge="Business"
            description="Pour auto-entrepreneurs, independants, artisans et petites entreprises."
            features={proFeatures}
            name="Professionnel"
            price="29,99€/mois"
          />
        </div>
      </section>

      <section className="border-y border-slate-200 bg-slate-50">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 py-14 sm:px-6 lg:grid-cols-3 lg:px-8">
          <InfoCard
            icon={Sparkles}
            title="Pourquoi choisir AdminFacile"
            text="Un produit concu pour produire des demandes claires, rassurantes et exploitables, sans jargon inutile."
          />
          <InfoCard
            icon={Workflow}
            title="Comment ca fonctionne"
            text="Choisissez une demarche, utilisez un prompt si besoin, genereez le dossier, puis exportez le PDF ou preparez l'email."
          />
          <InfoCard
            icon={ShieldCheck}
            title="Serieux et controle"
            text="AdminFacile prepare vos contenus, mais vous gardez toujours la validation finale avant envoi ou depot."
          />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase text-blue-600">Outils entrepreneur</p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">
            Une base solide pour les independants et petites entreprises
          </h2>
          <p className="mt-3 leading-7 text-slate-600">
            Les premiers outils administratifs business sont prepares dans l'interface produit et pourront etre actives
            progressivement.
          </p>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {entrepreneurTools.map((tool) => (
            <ComingSoonCard icon={tool.icon} key={tool.title} title={tool.title} />
          ))}
        </div>
      </section>

      <section className="border-y border-slate-200 bg-slate-950 text-white">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase text-blue-200">En developpement</p>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight">Automatisations IA futures</h2>
              <p className="mt-3 max-w-3xl leading-7 text-slate-300">
                AdminFacile est pense pour devenir un vrai poste de pilotage administratif intelligent.
              </p>
            </div>
            <span className="w-fit rounded-full bg-blue-600 px-4 py-2 text-sm font-bold">En developpement</span>
          </div>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {automationItems.map((item) => (
              <div className="rounded-3xl border border-white/10 bg-white/5 p-4 text-sm font-semibold text-slate-100" key={item}>
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <p className="text-sm font-semibold uppercase text-blue-600">Avis utilisateurs</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">Une experience rassurante</h2>
            <p className="mt-3 leading-7 text-slate-600">
              Le design met l'accent sur la lisibilite, les actions mobiles et la clarte des prochaines etapes.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <Testimonial quote="J'ai compris quoi joindre et comment formuler ma demande sans tourner en rond." name="Utilisateur CAF" />
            <Testimonial quote="La preparation email et le PDF donnent un rendu beaucoup plus professionnel." name="Micro-entrepreneur" />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 pb-14 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase text-blue-600">FAQ</p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">Questions frequentes</h2>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <FaqItem
            question="AdminFacile est-il un organisme officiel ?"
            answer="Non. AdminFacile est un service prive d'assistance administrative et n'est pas affilie aux organismes publics."
          />
          <FaqItem
            question="L'application envoie-t-elle les emails automatiquement ?"
            answer="Non. AdminFacile prepare uniquement le contenu. Vous verifiez, ajoutez le destinataire et envoyez vous-meme."
          />
          <FaqItem
            question="Puis-je utiliser AdminFacile sur mobile ?"
            answer="Oui. Les formulaires, le dashboard, le PDF et la preparation email sont concus pour iPhone, Android et desktop."
          />
          <FaqItem
            question="Stripe est-il obligatoire pour tester ?"
            answer="Non. Si Stripe n'est pas configure, le paiement reste desactive proprement et le parcours gratuit reste accessible."
          />
        </div>
        <DisclaimerBox className="mt-10" />
      </section>
    </main>
  );
}

function PlanCard({
  name,
  price,
  description,
  features,
  action,
  featured = false,
  badge
}: {
  name: string;
  price: string;
  description: string;
  features: string[];
  action: ReactNode;
  featured?: boolean;
  badge?: string;
}) {
  return (
    <section
      className={[
        "relative flex min-w-0 rounded-[2rem] border p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl",
        featured ? "border-blue-300 bg-slate-950 text-white shadow-blue-950/10" : "border-slate-200 bg-white text-slate-950"
      ].join(" ")}
    >
      {badge ? (
        <span className="absolute right-5 top-5 rounded-full bg-blue-600 px-3 py-1 text-xs font-bold text-white">{badge}</span>
      ) : null}
      <div className="flex w-full flex-col">
        <h2 className="pr-28 text-2xl font-semibold">{name}</h2>
        <p className={featured ? "mt-3 min-h-14 text-slate-300" : "mt-3 min-h-14 text-slate-600"}>{description}</p>
        <p className="mt-6 text-4xl font-semibold tracking-tight">{price}</p>
        <ul className="mt-6 flex-1 space-y-3">
          {features.map((feature) => (
            <li className={featured ? "flex gap-3 text-slate-100" : "flex gap-3 text-slate-700"} key={feature}>
              <Check className={featured ? "mt-0.5 h-5 w-5 shrink-0 text-blue-300" : "mt-0.5 h-5 w-5 shrink-0 text-blue-600"} />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
        <div className="mt-8">{action}</div>
      </div>
    </section>
  );
}

function InfoCard({ icon: Icon, title, text }: { icon: LucideIcon; title: string; text: string }) {
  return (
    <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50 text-blue-700">
        <Icon className="h-5 w-5" />
      </span>
      <h2 className="mt-5 text-xl font-semibold text-slate-950">{title}</h2>
      <p className="mt-3 leading-7 text-slate-600">{text}</p>
    </article>
  );
}

function ComingSoonCard({ icon: Icon, title }: { icon: LucideIcon; title: string }) {
  return (
    <article className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <div className="flex items-start gap-4">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-blue-700">
          <Icon className="h-5 w-5" />
        </span>
        <div>
          <h3 className="font-semibold text-slate-950">{title}</h3>
          <p className="mt-2 text-sm font-semibold text-blue-700">Bientot disponible</p>
        </div>
      </div>
    </article>
  );
}

function Testimonial({ quote, name }: { quote: string; name: string }) {
  return (
    <article className="rounded-3xl border border-slate-200 bg-slate-50 p-5 shadow-sm">
      <p className="leading-7 text-slate-700">"{quote}"</p>
      <p className="mt-4 text-sm font-semibold text-slate-950">{name}</p>
    </article>
  );
}

function FaqItem({ question, answer }: { question: string; answer: string }) {
  return (
    <article className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex gap-3">
        <HelpCircle className="mt-1 h-5 w-5 shrink-0 text-blue-600" />
        <div>
          <h3 className="font-semibold text-slate-950">{question}</h3>
          <p className="mt-2 leading-7 text-slate-600">{answer}</p>
        </div>
      </div>
    </article>
  );
}
