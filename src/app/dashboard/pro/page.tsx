import { ProDemoTools } from "@/components/pro-demo-tools";
import { ButtonLink } from "@/components/button";
import { CheckoutButton } from "@/components/checkout-button";
import { getProAccessDateLabel, hasProAccess, isProPaidAccessActive } from "@/lib/pro-access";
import { createClient } from "@/lib/supabase/server";
import { Calculator, LockKeyhole } from "lucide-react";

export default async function DashboardProPage() {
  const supabase = await createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();
  const { data: profile } = await supabase.from("profiles").select("*").eq("id", user!.id).single();
  const initialDate = new Date().toISOString().slice(0, 10);
  const paidAccessActive = isProPaidAccessActive();
  const userHasProAccess = hasProAccess(profile);

  if (!userHasProAccess) {
    return (
      <div className="space-y-8">
        <section className="rounded-[2rem] bg-slate-950 p-6 text-white shadow-sm sm:p-8">
          <p className="text-sm font-semibold uppercase text-blue-200">Offre Professionnel</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">Cette fonctionnalité nécessite l'offre Professionnel.</h1>
          <p className="mt-4 max-w-3xl leading-8 text-slate-300">
            L'accès aux outils entrepreneur, factures, devis illimités, relances clients, assistant IA Pro et automatisations futures est réservé à l'offre Professionnel.
          </p>
        </section>

        <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-slate-950 text-white">
                <LockKeyhole className="h-5 w-5" />
              </span>
              <div>
                <h2 className="text-2xl font-semibold tracking-tight text-slate-950">Professionnel - 29,99€/mois</h2>
                <p className="mt-2 max-w-2xl leading-7 text-slate-600">
                  Passez Professionnel pour débloquer l'espace Pro complet à partir du {getProAccessDateLabel()}.
                </p>
              </div>
            </div>
            <div className="w-full sm:w-64">
              <CheckoutButton label="Passer Professionnel" plan="pro" />
            </div>
          </div>
          <div className="mt-5">
            <ButtonLink href="/dashboard/pro-demo" variant="outline">
              Voir la démo limitée
            </ButtonLink>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <section className="rounded-[2rem] bg-slate-950 p-6 text-white shadow-sm sm:p-8">
        <p className="text-sm font-semibold uppercase text-blue-200">{paidAccessActive ? "Offre Professionnel" : "Mode démo Professionnel"}</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">Outils Pro</h1>
        <p className="mt-4 max-w-3xl leading-8 text-slate-300">
          {paidAccessActive
            ? "Votre accès Professionnel est actif : outils entrepreneur, factures, devis, relances et assistant IA Pro."
            : `Accès démo disponible jusqu'au ${getProAccessDateLabel()}. Après cette date, l'offre Professionnel sera requise.`}
        </p>
      </section>

      <section className="rounded-[2rem] border border-blue-100 bg-blue-50 p-5 shadow-sm sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex gap-4">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-slate-950 text-white">
              <Calculator className="h-5 w-5" />
            </span>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-xl font-semibold text-slate-950">Simulateur de prestation IA</h2>
                <span className="rounded-full bg-blue-600 px-3 py-1 text-xs font-bold text-white">Nouveau</span>
              </div>
              <p className="mt-2 max-w-2xl leading-7 text-slate-700">
                Analysez une prestation, ses contraintes, son temps, ses fournitures et son contexte métier pour obtenir une estimation transformable en devis.
              </p>
            </div>
          </div>
          <ButtonLink className="w-full sm:w-auto" href="/dashboard/simulateur-chantier">
            Ouvrir le simulateur
          </ButtonLink>
        </div>
      </section>

      <ProDemoTools initialDate={initialDate} profile={profile} />
    </div>
  );
}
