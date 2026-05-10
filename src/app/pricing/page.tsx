import { ArrowRight, Check, HelpCircle, Lock, ShieldCheck, Sparkles, Workflow } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { Button, ButtonLink } from "@/components/button";
import { CheckoutButton } from "@/components/checkout-button";
import { DisclaimerBox } from "@/components/disclaimer-box";
import { isStripePlanConfigured } from "@/lib/stripe-checkout";

const discoveryFeatures = [
  "1 dossier gratuit",
  "Generation IA",
  "Prompts pre-ecrits",
  "Export PDF",
  "Preparation email",
  "Responsive mobile"
];

const premiumFeatures = [
  "Dossiers illimites",
  "Prompts premium",
  "Generation IA avancee",
  "Export PDF premium",
  "Preparation email intelligente",
  "Historique complet",
  "Prompts France",
  "Modeles ARCE / CAF / URSSAF",
  "Support prioritaire"
];

const proFeatures = [
  "Multi dossiers",
  "Stockage documents",
  "Outils entrepreneur",
  "Gestion administrative avancee",
  "Automatisations futures IA"
];

export default function PricingPage() {
  const premiumEnabled = isStripePlanConfigured("premium");

  return (
    <main className="bg-white">
      <section className="mx-auto max-w-7xl px-4 pb-10 pt-16 sm:px-6 lg:px-8 lg:pb-16">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-sm font-semibold uppercase text-blue-600">Tarifs AdminFacile</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
            Une offre claire pour preparer vos demarches sans complexite
          </h1>
          <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-slate-600">
            Commencez gratuitement, puis passez en Premium lorsque vous voulez produire plus de dossiers, conserver un
            historique complet et gagner du temps sur vos courriers administratifs.
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
            description="Pour decouvrir AdminFacile avec un premier dossier complet."
            features={discoveryFeatures}
            name="Decouverte"
            price="0€"
          />
          <PlanCard
            action={<CheckoutButton disabled={!premiumEnabled} label="Passer Premium" plan="premium" />}
            badge="Le plus populaire"
            description="Pour utiliser AdminFacile regulierement et creer des dossiers sans limite."
            featured
            features={premiumFeatures}
            name="Premium"
            price="9,99€/mois"
          />
          <PlanCard
            action={
              <div className="space-y-2">
                <Button className="w-full" disabled type="button" variant="secondary">
                  <Lock className="h-4 w-4" />
                  Bientot disponible
                </Button>
                <p className="text-center text-sm font-medium text-slate-500">Offre pro en preparation.</p>
              </div>
            }
            description="Pour les independants et petites structures qui veulent centraliser leur administratif."
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
            text="Un parcours simple, des prompts utiles et des dossiers structures pour reduire l'incertitude avant vos demarches."
          />
          <InfoCard
            icon={Workflow}
            title="Comment ca fonctionne"
            text="Choisissez une demarche, remplissez le formulaire, genereez votre dossier, puis exportez le PDF ou preparez l'email."
          />
          <InfoCard
            icon={ShieldCheck}
            title="Securite et clarte"
            text="Les cles serveur ne sont pas exposees au navigateur et l'utilisateur garde toujours la main avant l'envoi."
          />
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-14 sm:px-6 lg:px-8">
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
            answer="Oui. Les formulaires, le dashboard, le PDF et la preparation email sont concus pour mobile et desktop."
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
