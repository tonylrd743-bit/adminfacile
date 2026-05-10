import { ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/button";
import { RequestForm } from "@/components/request-form";
import { createClient } from "@/lib/supabase/server";

export default async function NewRequestPage({
  searchParams
}: {
  searchParams: Promise<{ template?: string }>;
}) {
  const { template } = await searchParams;
  const supabase = await createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  return (
    <div className="space-y-6">
      <div className="rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-slate-200">
        <p className="text-sm font-semibold uppercase text-blue-600">Assistant guidé</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">Nouvelle démarche</h1>
        <p className="mt-3 max-w-3xl leading-8 text-slate-600">
          Choisissez parmi 15 démarches utiles, puis remplissez les informations adaptées. L'assistant générera une
          checklist, une lettre, les documents à préparer et les prochaines étapes.
        </p>
      </div>
      <section className="flex flex-col gap-4 rounded-[2rem] border border-blue-100 bg-blue-50 p-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold text-slate-950">Vous ne savez pas quoi écrire ?</h2>
          <p className="mt-2 leading-7 text-slate-700">
            Choisissez un modèle populaire pour préremplir la demande, puis complétez les informations entre parenthèses.
          </p>
        </div>
        <ButtonLink className="w-full sm:w-auto" href="/dashboard/templates">
          Choisir un modèle populaire
          <ArrowRight className="h-4 w-4" />
        </ButtonLink>
      </section>
      <RequestForm email={user?.email ?? ""} initialTemplateId={template} />
    </div>
  );
}
