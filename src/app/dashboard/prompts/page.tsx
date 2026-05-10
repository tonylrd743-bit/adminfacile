import { PopularRequestTemplates } from "@/components/popular-request-templates";

export default function DashboardPromptsPage() {
  return (
    <div className="space-y-8">
      <section className="rounded-[2rem] bg-slate-950 p-6 text-white shadow-sm sm:p-8">
        <p className="text-sm font-semibold uppercase text-blue-200">Bibliothèque de prompts</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">Prompts pré-écrits</h1>
        <p className="mt-4 max-w-3xl leading-8 text-slate-300">
          Choisissez un modèle prêt à compléter pour préparer rapidement votre demande administrative.
        </p>
      </section>

      <PopularRequestTemplates
        buttonLabel="Utiliser ce prompt"
        description="Recherchez un prompt par mot-clé ou filtrez par catégorie. Chaque carte contient un texte prêt à compléter avant de générer votre dossier."
        eyebrow="Prompts pré-écrits"
        groupByCategory
        redirectOnSelect
        searchPlaceholder="Rechercher un prompt"
        title="Prompts classés par catégorie"
      />
    </div>
  );
}
