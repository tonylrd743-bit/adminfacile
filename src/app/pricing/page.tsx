import {
  ArrowRight,
  Calculator,
  Check,
  FileText,
  HelpCircle,
  Mail,
  ReceiptText,
  Sparkles,
  Users,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { ButtonLink } from "@/components/button";
import { CheckoutButton } from "@/components/checkout-button";
import { DisclaimerBox } from "@/components/disclaimer-box";
import { isStripePlanConfigured } from "@/lib/stripe-checkout";

const plans = [
  {
    name: "Découverte",
    price: "0€",
    description: "Essayez gratuitement les outils professionnels d'AdminFacile.",
    badge: "Essai",
    features: [
      "1 simulateur de prestation IA",
      "1 génération de devis professionnel",
      "1 email professionnel client",
      "1 dossier administratif test",
      "Prompts essentiels",
      "PDF simple",
      "Accès mobile"
    ],
    counters: [
      ["Simulateur prestation", "1 restant"],
      ["Devis professionnel", "1 restant"],
      ["Email client", "1 restant"]
    ],
    action: (
      <ButtonLink className="w-full" href="/signup" variant="outline">
        Commencer l'essai gratuit
        <ArrowRight className="h-4 w-4" />
      </ButtonLink>
    )
  },
  {
    name: "Premium",
    price: "9,99€/mois",
    description: "Assez d'essais pour convaincre indépendants, artisans, consultants et petites entreprises.",
    badge: "Le plus populaire",
    featured: true,
    features: [
      "3 simulateurs de prestation IA par mois",
      "3 générations de devis premium par mois",
      "Emails professionnels illimités",
      "Dossiers administratifs illimités",
      "Génération IA avancée",
      "PDF premium",
      "Historique complet",
      "Prompts premium",
      "Préparation Gmail/Mail",
      "Organisation des documents"
    ],
    counters: [
      ["Simulateur prestation", "3/mois"],
      ["Devis premium", "3/mois"],
      ["Emails clients", "Illimités"]
    ],
    action: null
  },
  {
    name: "Professionnel",
    price: "29,99€/mois",
    description: "L'espace business complet pour prestataires, indépendants et petites entreprises.",
    badge: "Business",
    features: [
      "Simulateurs de prestation illimités",
      "Devis illimités",
      "Factures professionnelles",
      "Relances automatiques",
      "Assistant IA Pro",
      "Outils entrepreneur",
      "CRM client",
      "Historique devis/factures",
      "Statistiques simples",
      "PDF ultra premium",
      "Organisation entreprise",
      "Automatisations IA futures"
    ],
    counters: [
      ["Simulateur prestation", "Illimité"],
      ["Devis / factures", "Illimité"],
      ["Espace business", "Inclus"]
    ],
    action: null
  }
];

const comparisonRows = [
  ["Simulateur de prestation IA", "1 essai", "3/mois", "Illimité"],
  ["Devis professionnels", "1 essai", "3/mois", "Illimité"],
  ["Emails clients", "1 essai", "Illimités", "Illimités"],
  ["Dossiers administratifs", "1 test", "Illimités", "Illimités"],
  ["PDF premium", "Simple", "Premium", "Ultra premium"],
  ["Espace business", "Non inclus", "Basique", "Complet"]
];

const businessTools = [
  { title: "Simulateur prestation IA", icon: Calculator },
  { title: "Créer un devis", icon: FileText },
  { title: "Créer une facture", icon: ReceiptText },
  { title: "Préparer email client", icon: Mail },
  { title: "CRM client", icon: Users },
  { title: "Assistant administratif IA", icon: Sparkles }
];

export default function PricingPage() {
  const premiumEnabled = isStripePlanConfigured("premium");
  const proEnabled = isStripePlanConfigured("pro");

  return (
    <main className="bg-white">
      <section className="mx-auto max-w-7xl px-4 pb-10 pt-16 sm:px-6 lg:px-8 lg:pb-16">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-sm font-semibold uppercase text-blue-600">Tarifs AdminFacile</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
            Des outils administratifs et business prêts à tester
          </h1>
          <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-slate-600">
            Estimez une prestation, préparez un devis, rédigez un email client et structurez vos démarches dans un espace
            professionnel pensé pour les indépendants, prestataires et petites entreprises françaises.
          </p>
        </div>

        {!premiumEnabled ? (
          <div className="mx-auto mt-8 max-w-3xl rounded-3xl border border-blue-100 bg-blue-50 p-5 text-center text-sm font-medium text-blue-900">
            Paiement bientôt disponible. Les outils de démonstration restent accessibles sans paiement pendant la préparation Stripe.
          </div>
        ) : null}

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {plans.map((plan) => (
            <PlanCard
              action={
                plan.name === "Premium" ? (
                  <CheckoutButton disabled={!premiumEnabled} label="Passer Premium" plan="premium" />
                ) : plan.name === "Professionnel" ? (
                  <CheckoutButton disabled={!proEnabled} label="Passer Professionnel" plan="pro" />
                ) : (
                  plan.action
                )
              }
              badge={plan.badge}
              counters={plan.counters}
              description={plan.description}
              featured={plan.featured}
              features={plan.features}
              key={plan.name}
              name={plan.name}
              price={plan.price}
            />
          ))}
        </div>
      </section>

      <section className="border-y border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase text-blue-600">Programme Parrainage</p>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">
                Invitez vos contacts et gagnez votre abonnement
              </h2>
              <p className="mt-3 leading-7 text-slate-600">
                Si plusieurs personnes découvrent AdminFacile grâce à vous et testent réellement les outils, votre mois Premium
                peut être offert après validation manuelle. Le système valorise les utilisateurs actifs, pas les invitations artificielles.
              </p>
              <p className="mt-3 text-sm font-semibold text-slate-700">Offre soumise à validation. Aucun remboursement automatique n'est promis.</p>
              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                <ReferralMetric label="Filleuls actifs" value="2 / 3" />
                <ReferralMetric label="Statut" value="Ambassadeur" />
                <ReferralMetric label="Avantage possible" value="1 mois offert" />
              </div>
              <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                <ButtonLink className="w-full sm:w-auto" href="/affiliation" variant="secondary">
                  Programme ambassadeur
                </ButtonLink>
                <ButtonLink className="w-full sm:w-auto" href="mailto:contactadminfacile@gmail.com" variant="outline">
                  Nous contacter
                </ButtonLink>
              </div>
            </div>
            <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-blue-600">Progression parrainage</p>
                  <h3 className="mt-1 text-2xl font-semibold text-slate-950">2 filleuls actifs validés</h3>
                </div>
                <span className="rounded-full bg-blue-600 px-3 py-1 text-xs font-bold text-white">Badge ambassadeur</span>
              </div>
              <div className="mt-6 h-3 rounded-full bg-slate-100">
                <div className="h-3 w-2/3 rounded-full bg-blue-600" />
              </div>
              <p className="mt-4 text-sm leading-6 text-slate-600">
                Encore 1 utilisateur actif pour demander l'avantage. Validation conseillée : compte créé, outil testé,
                première génération terminée. Offre soumise à validation.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase text-blue-600">Comparatif</p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">Choisissez le bon niveau d'usage</h2>
        </div>
        <div className="mt-8 overflow-x-auto rounded-[2rem] border border-slate-200 bg-white shadow-sm">
          <table className="w-full min-w-[760px] text-sm">
            <thead className="bg-slate-950 text-white">
              <tr>
                <th className="px-5 py-4 text-left">Fonctionnalité</th>
                <th className="px-5 py-4 text-left">Découverte</th>
                <th className="px-5 py-4 text-left">Premium</th>
                <th className="px-5 py-4 text-left">Professionnel</th>
              </tr>
            </thead>
            <tbody>
              {comparisonRows.map((row) => (
                <tr className="border-b border-slate-200 last:border-0" key={row[0]}>
                  {row.map((cell, index) => (
                    <td className={index === 0 ? "px-5 py-4 font-semibold text-slate-950" : "px-5 py-4 text-slate-700"} key={cell}>
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-slate-950 text-white">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase text-blue-200">Outils entrepreneur</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight">Un poste de travail business en construction</h2>
            <p className="mt-3 leading-7 text-slate-300">
              AdminFacile réunit progressivement estimation de prestation, devis, factures, emails clients, relances et assistant IA Pro.
            </p>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {businessTools.map((tool) => (
              <ToolCard icon={tool.icon} key={tool.title} title={tool.title} />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase text-blue-600">FAQ</p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">Questions fréquentes</h2>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <FaqItem
            question="Puis-je vraiment tester les outils Pro gratuitement ?"
            answer="Oui. L'offre Découverte donne accès à un essai utile : simulateur de prestation, devis professionnel et email client."
          />
          <FaqItem
            question="Comment fonctionne le parrainage ?"
            answer="Le parrainage repose sur des utilisateurs actifs : compte créé, outil testé et génération réalisée. L'objectif est d'éviter les abus."
          />
          <FaqItem
            question="Le simulateur remplace-t-il un devis validé ?"
            answer="Non. Il donne une estimation indicative et professionnelle à partir des informations fournies. Le professionnel garde la validation finale."
          />
          <FaqItem
            question="Stripe est-il obligatoire pour tester ?"
            answer="Non. Si Stripe n'est pas configuré, les boutons payants restent désactivables et les démos restent accessibles."
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
  counters,
  action,
  featured = false,
  badge
}: {
  name: string;
  price: string;
  description: string;
  features: string[];
  counters: string[][];
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
        <div className="mt-6 grid gap-2">
          {counters.map(([label, value]) => (
            <div className={featured ? "flex justify-between rounded-2xl bg-white/10 px-3 py-2 text-sm" : "flex justify-between rounded-2xl bg-slate-50 px-3 py-2 text-sm"} key={label}>
              <span>{label}</span>
              <span className="font-bold">{value}</span>
            </div>
          ))}
        </div>
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

function ReferralMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <p className="text-xs font-semibold uppercase text-slate-500">{label}</p>
      <p className="mt-2 text-lg font-semibold text-slate-950">{value}</p>
    </div>
  );
}

function ToolCard({ icon: Icon, title }: { icon: LucideIcon; title: string }) {
  return (
    <article className="rounded-3xl border border-white/10 bg-white/5 p-5">
      <Icon className="h-5 w-5 text-blue-300" />
      <h3 className="mt-4 font-semibold text-white">{title}</h3>
      <p className="mt-2 text-sm text-slate-300">Inclus dans l'écosystème Pro.</p>
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
