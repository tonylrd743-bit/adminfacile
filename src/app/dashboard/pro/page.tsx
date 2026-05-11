import { ProDemoTools } from "@/components/pro-demo-tools";
import { ButtonLink } from "@/components/button";
import { Calculator } from "lucide-react";

export default function DashboardProPage() {
  return (
    <div className="space-y-8">
      <section className="rounded-[2rem] bg-slate-950 p-6 text-white shadow-sm sm:p-8">
        <p className="text-sm font-semibold uppercase text-blue-200">Mode démo Professionnel</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">Outils Pro</h1>
        <p className="mt-4 max-w-3xl leading-8 text-slate-300">
          Testez les futurs outils professionnels d'AdminFacile avant leur activation complète.
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

      <ProDemoTools />
    </div>
  );
}
