import {
  ArrowRight,
  BadgeEuro,
  BriefcaseBusiness,
  Building2,
  CarFront,
  FileX2,
  HandCoins,
  HeartHandshake,
  House,
  KeyRound,
  Landmark,
  ReceiptText,
  Scale,
  ShieldPlus,
  Store,
  UserRoundSearch
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { ButtonLink } from "@/components/button";
import { DisclaimerBox } from "@/components/disclaimer-box";
import { FeatureCard } from "@/components/feature-card";
import { SectionHeading } from "@/components/section-heading";
import { getProcedureCategories, procedures } from "@/lib/procedures";

const iconMap: Record<string, LucideIcon> = {
  BadgeEuro,
  BriefcaseBusiness,
  Building2,
  CarFront,
  FileX2,
  HandCoins,
  HeartHandshake,
  House,
  KeyRound,
  Landmark,
  ReceiptText,
  Scale,
  ShieldPlus,
  Store,
  UserRoundSearch
};

export default function ProceduresPage() {
  const categories = getProcedureCategories();

  return (
    <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="Démarches"
        text="AdminFacile prépare des dossiers et courriers administratifs fréquents, avec un assistant prudent et spécialisé pour chaque situation."
        title="15 démarches utiles pour avancer plus vite"
      />

      <section className="mx-auto mt-10 max-w-4xl rounded-[2rem] border border-slate-200 bg-slate-50 p-5 text-center shadow-sm sm:p-6">
        <h2 className="text-xl font-semibold text-slate-950">Une démarche claire, sans surcharge</h2>
        <p className="mx-auto mt-2 max-w-2xl leading-7 text-slate-600">
          Choisissez une catégorie, lancez votre dossier depuis le dashboard, ou utilisez un prompt pré-écrit depuis votre
          espace privé si vous voulez partir d'un modèle prêt à compléter.
        </p>
        <div className="mt-5 flex flex-col justify-center gap-3 sm:flex-row">
          <ButtonLink className="w-full sm:w-auto" href="/dashboard/new">
            Créer une démarche
            <ArrowRight className="h-4 w-4" />
          </ButtonLink>
          <ButtonLink className="w-full sm:w-auto" href="/dashboard/prompts" variant="outline">
            Voir les prompts pré-écrits
          </ButtonLink>
        </div>
      </section>

      <div className="mt-14 space-y-12">
        {categories.map((category) => (
          <section key={category}>
            <h2 className="text-xl font-semibold text-slate-950">{category}</h2>
            <div className="mt-5 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {procedures
                .filter((procedure) => procedure.category === category)
                .map((procedure) => (
                  <FeatureCard
                    icon={iconMap[procedure.icon] ?? HeartHandshake}
                    key={procedure.id}
                    text={procedure.description}
                    title={procedure.label}
                  />
                ))}
            </div>
          </section>
        ))}
      </div>

      <div className="mt-12 flex flex-col justify-center gap-3 sm:flex-row">
        <ButtonLink className="w-full sm:w-auto" href="/dashboard/new">
          Créer une démarche
          <ArrowRight className="h-4 w-4" />
        </ButtonLink>
        <ButtonLink className="w-full sm:w-auto" href="/dashboard/prompts" variant="outline">
          Voir les prompts pré-écrits
        </ButtonLink>
      </div>
      <DisclaimerBox className="mt-12" />
    </main>
  );
}
