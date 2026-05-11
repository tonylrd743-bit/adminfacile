import { notFound } from "next/navigation";
import { AlertTriangle, CheckCircle2, ClipboardList, FileText, FolderOpen, Route } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { ButtonLink } from "@/components/button";
import { DisclaimerBox } from "@/components/disclaimer-box";
import { EmailPreparer } from "@/components/email-preparer";
import { PdfButton } from "@/components/pdf-button";
import { normalizeAiResult } from "@/lib/admin-result";
import { createClient } from "@/lib/supabase/server";
import { formatDate, stripListMarker } from "@/lib/utils";
import type { RequestFormData } from "@/types/adminfacile";

export default async function RequestResultPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: request, error } = await supabase.from("requests").select("*").eq("id", id).maybeSingle();
  if (error || !request) notFound();
  const { data: profile } = await supabase.from("profiles").select("*").eq("id", request.user_id).single();

  const result = normalizeAiResult(request.ai_result);
  const formData = request.form_data as unknown as RequestFormData;

  return (
    <div className="min-w-0 space-y-6">
      <section className="rounded-[2rem] bg-slate-950 p-5 text-white shadow-sm sm:p-8">
        <p className="text-sm font-semibold text-blue-200">{formatDate(request.created_at)}</p>
        <div className="mt-3 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="min-w-0">
            <h1 className="text-2xl font-semibold tracking-tight sm:text-4xl">{result.titre}</h1>
            <p className="mt-4 max-w-3xl leading-8 text-slate-300">{result.resume}</p>
          </div>
          <div className="flex w-full flex-col gap-3 sm:flex-row lg:w-auto lg:shrink-0">
            <PdfButton className="w-full sm:w-auto" createdAt={request.created_at} formData={formData} profile={profile} result={result} />
            <ButtonLink className="w-full sm:w-auto" href="/dashboard" variant="outline">
              Revenir dashboard
            </ButtonLink>
            <ButtonLink className="w-full sm:w-auto" href="/dashboard/new" variant="outline">
              Créer une nouvelle démarche
            </ButtonLink>
          </div>
        </div>
      </section>

      <EmailPreparer formData={formData} profile={profile} result={result} />

      <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <ResultSection icon={ClipboardList} items={result.checklist} title="Checklist personnalisée" />
        <ResultSection icon={FolderOpen} items={result.documentsNecessaires} title="Documents à préparer" />
      </div>

      <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50 text-blue-700">
            <FileText className="h-5 w-5" />
          </span>
          <div>
            <p className="text-sm font-semibold text-blue-600">Courrier</p>
            <h2 className="text-xl font-semibold text-slate-950">Lettre générée</h2>
          </div>
        </div>
        <pre className="mt-5 max-w-full whitespace-pre-wrap break-words rounded-3xl bg-slate-50 p-4 font-sans leading-8 text-slate-700 ring-1 ring-slate-100 sm:p-5">
          {result.lettre}
        </pre>
      </section>

      <ResultSection icon={Route} items={result.etapes} ordered title="Étapes à suivre" />
      <section className="rounded-3xl border border-amber-200 bg-amber-50 p-5 shadow-sm sm:p-6">
        <div className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-amber-700">
            <AlertTriangle className="h-5 w-5" />
          </span>
          <div>
            <p className="text-sm font-semibold text-amber-700">Avertissement</p>
            <h2 className="text-xl font-semibold text-slate-950">À vérifier avant envoi</h2>
          </div>
        </div>
        <p className="mt-5 leading-7 text-slate-700">{result.avertissementFinal}</p>
      </section>
      <DisclaimerBox />
    </div>
  );
}

function ResultSection({
  title,
  items,
  ordered = false,
  icon: Icon
}: {
  title: string;
  items: string[];
  ordered?: boolean;
  icon: LucideIcon;
}) {
  const List = ordered ? "ol" : "ul";
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="flex items-center gap-3">
        <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50 text-blue-700">
          <Icon className="h-5 w-5" />
        </span>
        <h2 className="text-xl font-semibold text-slate-950">{title}</h2>
      </div>
      {items.length > 0 ? (
        <List className="mt-5 space-y-3 text-slate-700">
          {items.map((item, index) => (
            <li className="flex gap-3 leading-7" key={`${item}-${index}`}>
              <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-blue-600" />
              <span>
                {ordered ? `${index + 1}. ` : ""}
                {ordered ? stripListMarker(item) : item}
              </span>
            </li>
          ))}
        </List>
      ) : (
        <p className="mt-5 leading-7 text-slate-600">Aucun élément généré pour cette section.</p>
      )}
    </section>
  );
}
