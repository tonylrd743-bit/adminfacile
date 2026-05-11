import { BriefcaseBusiness, Clock3, FilePlus2, Files, FolderLock, UserRound } from "lucide-react";
import { ButtonLink } from "@/components/button";
import { DashboardCard } from "@/components/dashboard-card";
import { PdfButton } from "@/components/pdf-button";
import { normalizeAiResult } from "@/lib/admin-result";
import { getProcedureLabel } from "@/lib/procedures";
import { createClient } from "@/lib/supabase/server";
import { formatDate } from "@/lib/utils";
import type { RequestFormData } from "@/types/adminfacile";

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();
  const { data: requests } = await supabase
    .from("requests")
    .select("id, request_type, status, created_at, form_data, ai_result")
    .order("created_at", { ascending: false });

  const latest = requests?.slice(0, 5) ?? [];

  return (
    <div className="min-w-0 space-y-8">
      <section className="rounded-[2rem] bg-slate-950 p-5 text-white shadow-sm sm:p-8">
        <p className="text-sm font-semibold text-blue-200">Espace privé</p>
        <div className="mt-3 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="min-w-0">
            <h1 className="text-2xl font-semibold tracking-tight sm:text-4xl">Tableau de bord administratif</h1>
            <p className="mt-3 max-w-2xl leading-8 text-slate-300">
              Lancez une démarche, retrouvez vos dossiers générés et préparez vos documents professionnels au même endroit.
            </p>
            <p className="mt-2 text-sm text-slate-400">{user?.email}</p>
          </div>
          <ButtonLink className="w-full sm:w-auto" href="/dashboard/new">
            <FilePlus2 className="h-4 w-4" />
            Nouvelle démarche
          </ButtonLink>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        <DashboardCard
          href="/dashboard/new"
          icon={FilePlus2}
          text="Préparez une démarche administrative avec génération IA spécialisée."
          title="Nouvelle démarche"
          tone="dark"
        />
        <DashboardCard
          href="/dashboard"
          icon={Files}
          text={`${requests?.length ?? 0} dossier(s) enregistrés dans votre espace.`}
          title="Mes dossiers"
        />
        <DashboardCard href="/dashboard/pro" icon={BriefcaseBusiness} text="Testez devis, factures, relances et emails business." title="Outils Pro" />
        <DashboardCard href="/dashboard/documents" icon={FolderLock} text="Centralisez vos justificatifs et documents utiles." title="Mes documents" />
        <DashboardCard href="/dashboard/account" icon={UserRound} text="Consultez vos informations de compte." title="Mon compte" />
      </section>

      <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        <div className="flex flex-col gap-3 border-b border-slate-200 p-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-blue-600">Suivi</p>
            <h2 className="text-xl font-semibold text-slate-950">Dernières démarches</h2>
          </div>
          <ButtonLink className="w-full sm:w-auto" href="/dashboard/new" variant="outline">
            Créer un dossier
          </ButtonLink>
        </div>
        {latest.length > 0 ? (
          <div className="divide-y divide-slate-200">
            {latest.map((request) => {
              const result = normalizeAiResult(request.ai_result);
              const formData = request.form_data as unknown as RequestFormData;
              return (
                <article className="grid min-w-0 gap-4 p-5 sm:grid-cols-[1fr_auto] sm:items-center" key={request.id}>
                  <div className="min-w-0">
                    <h3 className="font-semibold text-slate-950">{result.titre || getProcedureLabel(request.request_type)}</h3>
                    <div className="mt-2 flex flex-wrap items-center gap-2 text-sm text-slate-500">
                      <span>{getProcedureLabel(request.request_type)}</span>
                      <span aria-hidden="true">•</span>
                      <span>{formatDate(request.created_at)}</span>
                      <span className="flex w-fit items-center gap-2 rounded-full bg-blue-50 px-3 py-1 font-semibold text-blue-700">
                        <Clock3 className="h-4 w-4" />
                        {request.status === "generated" ? "Généré" : request.status}
                      </span>
                    </div>
                  </div>
                  <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:items-center">
                    <ButtonLink className="w-full sm:w-auto" href={`/dashboard/requests/${request.id}`} variant="outline">
                      Ouvrir
                    </ButtonLink>
                    <PdfButton className="w-full sm:w-auto" createdAt={request.created_at} formData={formData} result={result} />
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="p-6">
            <h3 className="font-semibold text-slate-950">Aucune démarche pour le moment</h3>
            <p className="mt-2 max-w-xl leading-7 text-slate-600">
              Créez votre premier dossier pour obtenir une checklist, une lettre, un email préparé et un PDF exportable.
            </p>
            <div className="mt-5">
              <ButtonLink className="w-full sm:w-auto" href="/dashboard/new">
                Créer ma première démarche
              </ButtonLink>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
