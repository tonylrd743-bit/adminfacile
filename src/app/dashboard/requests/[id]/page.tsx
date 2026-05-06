import { notFound } from "next/navigation";
import { AlertTriangle, CheckCircle2, ClipboardList, FileText, FolderOpen, Route } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { ButtonLink } from "@/components/button";
import { DisclaimerBox } from "@/components/disclaimer-box";
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

  const result = normalizeAiResult(request.ai_result);
  const formData = request.form_data as unknown as RequestFormData;

  return (
    <div className="space-y-6">
      <section className="rounded-[2rem] bg-slate-950 p-6 text-white shadow-sm sm:p-8">
        <p className="text-sm font-semibold text-blue-200">{formatDate(request.created_at)}</p>
        <div className="mt-3 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">{result.titre}</h1>
            <p className="mt-4 max-w-3xl leading-8 text-slate-300">{result.resume}</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:shrink-0">
            <PdfButton createdAt={request.created_at} formData={formData} result={result} />
            <ButtonLink href="/dashboard" variant="outline">
              Revenir dashboard
            </ButtonLink>
            <ButtonLink href="/dashboard/new" variant="outline">
              Créer une nouvelle démarche
            </ButtonLink>
          </div>
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <ResultSection icon={ClipboardList} items={result.checklist} title="Checklist personnalisée" />
        <ResultSection icon={FolderOpen} items={result.documentsNecessaires} title="Documents à préparer" />
      </div>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50 text-blue-700">
            <FileText className="h-5 w-5" />
          </span>
          <div>
            <p className="text-sm font-semibold text-blue-600">Courrier</p>
            <h2 className="text-xl font-semibold text-slate-950">Lettre générée</h2>
          </div>
        </div>
        <pre className="mt-5 whitespace-pre-wrap rounded-3xl bg-slate-50 p-5 font-sans leading-8 text-slate-700 ring-1 ring-slate-100">
          {result.lettre}
        </pre>
      </section>

      <ResultSection icon={Route} items={result.etapes} ordered title="Étapes à suivre" />
      <section className="rounded-3xl border border-amber-200 bg-amber-50 p-6 shadow-sm">
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
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
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
