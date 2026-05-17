import { BriefcaseBusiness, Calculator, Clock3, FilePlus2, Files, FolderLock, Gift, UserRound } from "lucide-react";
import { ButtonLink } from "@/components/button";
import { ConversionTracker } from "@/components/conversion-tracker";
import { DashboardCard } from "@/components/dashboard-card";
import { PdfButton } from "@/components/pdf-button";
import { normalizeAiResult } from "@/lib/admin-result";
import { getProfileBusinessLabel, getProfileDisplayName } from "@/lib/profile";
import { getProcedureLabel } from "@/lib/procedures";
import { createClient } from "@/lib/supabase/server";
import { formatDate } from "@/lib/utils";
import type { RequestFormData } from "@/types/adminfacile";

export default async function DashboardPage({
  searchParams
}: {
  searchParams?: Promise<{ checkout?: string; plan?: string }>;
}) {
  const params = await searchParams;
  const supabase = await createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();
  const { data: requests } = await supabase
    .from("requests")
    .select("id, request_type, status, created_at, form_data, ai_result")
    .order("created_at", { ascending: false });
  const { data: profile } = await supabase.from("profiles").select("*").eq("id", user!.id).single();

  const latest = requests?.slice(0, 5) ?? [];

  return (
    <div className="min-w-0 space-y-8">
      <ConversionTracker checkout={params?.checkout} plan={params?.plan} />
      <section className="rounded-[2rem] bg-slate-950 p-5 text-white shadow-sm sm:p-8">
        <p className="text-sm font-semibold text-blue-200">Espace privé</p>
        <div className="mt-3 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="min-w-0">
            <h1 className="text-2xl font-semibold tracking-tight sm:text-4xl">Tableau de bord {getProfileDisplayName(profile)}</h1>
            <p className="mt-3 max-w-2xl leading-8 text-slate-300">
              Lancez une démarche, retrouvez vos dossiers générés et préparez vos documents professionnels adaptés à votre profil : {getProfileBusinessLabel(profile)}.
            </p>
            <p className="mt-2 text-sm text-slate-400">{user?.email}</p>
          </div>
          <ButtonLink className="w-full sm:w-auto" href="/dashboard/new">
            <FilePlus2 className="h-4 w-4" />
            Nouvelle démarche
          </ButtonLink>
          <ButtonLink className="w-full sm:w-auto" href="mailto:contactadminfacile@gmail.com" variant="outline">
            Nous contacter
          </ButtonLink>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-6">
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
        <DashboardCard href="/dashboard/simulateur-chantier" icon={Calculator} text="1 essai gratuit pour estimer une prestation." title="Simulateur prestation" />
        <DashboardCard href="/dashboard/documents" icon={FolderLock} text="Centralisez vos justificatifs et documents utiles." title="Mes documents" />
        <DashboardCard href="/dashboard/account" icon={UserRound} text="Consultez vos informations de compte." title="Mon compte" />
      </section>

      <section className="grid gap-4 lg:grid-cols-[1fr_1fr]">
        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-start gap-4">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-slate-950 text-white">
              <Calculator className="h-5 w-5" />
            </span>
            <div>
              <p className="text-sm font-semibold uppercase text-blue-600">Essai Découverte</p>
              <h2 className="mt-1 text-xl font-semibold text-slate-950">Outils professionnels restants</h2>
              <div className="mt-4 grid gap-2 sm:grid-cols-3">
                <UsagePill label="Prestation IA" value="1" />
                <UsagePill label="Devis" value="1" />
                <UsagePill label="Email client" value="1" />
              </div>
              <ButtonLink className="mt-5 w-full sm:w-auto" href="/pricing" variant="outline">
                Passer Premium
              </ButtonLink>
            </div>
          </div>
        </div>
        <div className="rounded-3xl border border-blue-100 bg-blue-50 p-5 shadow-sm">
          <div className="flex items-start gap-4">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-blue-600 text-white">
              <Gift className="h-5 w-5" />
            </span>
            <div>
              <p className="text-sm font-semibold uppercase text-blue-700">Programme Parrainage</p>
              <h2 className="mt-1 text-xl font-semibold text-slate-950">Invitez vos contacts et gagnez votre abonnement</h2>
              <div className="mt-4 h-3 rounded-full bg-white">
                <div className="h-3 w-2/3 rounded-full bg-blue-600" />
              </div>
              <p className="mt-3 text-sm leading-6 text-slate-700">
                2 filleuls actifs sur 3. Les récompenses sont validées uniquement lorsque les nouveaux utilisateurs testent réellement l'application.
              </p>
            </div>
          </div>
        </div>
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
                    <PdfButton className="w-full sm:w-auto" createdAt={request.created_at} formData={formData} profile={profile} result={result} />
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

function UsagePill({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-slate-50 px-3 py-2 text-sm">
      <p className="font-semibold text-slate-950">{value} restant</p>
      <p className="mt-1 text-slate-500">{label}</p>
    </div>
  );
}
