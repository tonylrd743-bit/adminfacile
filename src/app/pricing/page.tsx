import { ButtonLink } from "@/components/button";
import { CheckoutButton } from "@/components/checkout-button";
import { DisclaimerBox } from "@/components/disclaimer-box";
import { PricingCard } from "@/components/pricing-card";
import { SectionHeading } from "@/components/section-heading";
import { isStripePlanConfigured } from "@/lib/stripe-checkout";

export default function PricingPage() {
  const completeEnabled = isStripePlanConfigured("complete");
  const premiumEnabled = isStripePlanConfigured("premium");
  const stripeReady = completeEnabled && premiumEnabled;

  const plans = [
    {
      name: "Gratuit",
      price: "0€",
      description: "Pour découvrir AdminFacile avec un premier dossier test.",
      features: ["1 dossier test", "Accès au dashboard", "Démarrage sans paiement"],
      action: (
        <ButtonLink className="w-full" href="/signup" variant="outline">
          Commencer gratuitement
        </ButtonLink>
      )
    },
    {
      name: "Dossier complet",
      price: "4,99€",
      description: "Pour obtenir un dossier structuré avec lettre et export PDF.",
      features: ["Checklist personnalisée", "Lettre administrative", "Étapes à suivre", "Export PDF"],
      action: <CheckoutButton disabled={!completeEnabled} label="Acheter le dossier" plan="complete" />,
      featured: true
    },
    {
      name: "Premium",
      price: "9,99€/mois",
      description: "Pour préparer plusieurs démarches et organiser vos documents.",
      features: ["Dossiers multiples", "Coffre-fort documents", "Nouvelles démarches futures", "Usage régulier"],
      action: <CheckoutButton disabled={!premiumEnabled} label="Passer Premium" plan="premium" />
    }
  ];

  return (
    <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="Tarifs"
        text="Une offre simple pour tester gratuitement, puis payer uniquement lorsque vous avez besoin d'un dossier complet."
        title="Prix simples et transparents"
      />
      {!stripeReady ? (
        <div className="mx-auto mt-8 max-w-3xl rounded-3xl border border-blue-100 bg-blue-50 p-5 text-center text-sm font-medium text-blue-900">
          Paiement bientôt disponible. Vous pouvez tester gratuitement le parcours MVP pendant la configuration Stripe.
        </div>
      ) : null}
      <div className="mt-12 grid gap-6 lg:grid-cols-3">
        {plans.map((plan) => (
          <PricingCard
            action={plan.action}
            description={plan.description}
            featured={plan.featured}
            features={plan.features}
            key={plan.name}
            name={plan.name}
            price={plan.price}
          />
        ))}
      </div>
      <DisclaimerBox className="mt-10" />
    </main>
  );
}
