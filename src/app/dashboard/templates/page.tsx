import { PopularRequestTemplates } from "@/components/popular-request-templates";

export default function DashboardTemplatesPage() {
  return (
    <div className="space-y-8">
      <section className="rounded-[2rem] bg-slate-950 p-6 text-white shadow-sm sm:p-8">
        <p className="text-sm font-semibold uppercase text-blue-200">Bibliothèque de modèles</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">Demandes populaires</h1>
        <p className="mt-4 max-w-3xl leading-8 text-slate-300">
          Choisissez un modèle prêt à compléter, puis générez votre dossier administratif en quelques clics.
        </p>
      </section>

      <PopularRequestTemplates redirectOnSelect />
    </div>
  );
}
