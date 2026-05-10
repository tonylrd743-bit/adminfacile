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
import { PopularRequestTemplates } from "@/components/popular-request-templates";
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
      <div className="mt-12">
        <PopularRequestTemplates />
      </div>
      <div className="mt-12 space-y-12">
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
      <div className="mt-12 flex justify-center">
        <ButtonLink href="/dashboard/new">
          Créer une démarche <ArrowRight className="h-4 w-4" />
        </ButtonLink>
      </div>
      <DisclaimerBox className="mt-12" />
    </main>
  );
}
