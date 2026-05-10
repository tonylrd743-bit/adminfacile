"use client";

import { useMemo, useState } from "react";
import { Check, Copy, ExternalLink, Mail, Share2 } from "lucide-react";
import { Button } from "@/components/button";
import { getProcedureLabel } from "@/lib/procedures";
import { stripListMarker } from "@/lib/utils";
import type { AiResult, RequestFormData } from "@/types/adminfacile";

type CopiedTarget = "email" | "share" | null;

export function EmailPreparer({ result, formData }: { result: AiResult; formData: RequestFormData }) {
  const [copied, setCopied] = useState<CopiedTarget>(null);
  const email = useMemo(() => buildEmail(result, formData), [result, formData]);

  async function copyEmail(target: CopiedTarget = "email") {
    await navigator.clipboard.writeText(email.body);
    setCopied(target);
    window.setTimeout(() => setCopied(null), 2200);
  }

  async function shareEmail() {
    if (navigator.share) {
      await navigator.share({
        title: email.subject,
        text: email.body
      });
      return;
    }
    await copyEmail("share");
  }

  return (
    <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
      <div>
        <p className="text-sm font-semibold uppercase text-blue-600">Envoi manuel</p>
        <h2 className="mt-1 text-2xl font-semibold tracking-tight text-slate-950">Preparer l'email</h2>
        <p className="mt-2 max-w-2xl leading-7 text-slate-600">
          Copiez le message ou ouvrez-le dans votre application mail avant de l'envoyer. AdminFacile ne l'envoie jamais
          automatiquement.
        </p>
      </div>

      <div className="mt-6 space-y-5 rounded-3xl bg-slate-50 p-4 ring-1 ring-slate-100 sm:p-5">
        <label className="block space-y-2 text-sm font-semibold text-slate-800">
          Objet
          <input
            className="w-full min-w-0 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-950"
            readOnly
            value={email.subject}
          />
        </label>

        <label className="block space-y-2 text-sm font-semibold text-slate-800">
          Message
          <textarea
            className="min-h-72 w-full min-w-0 rounded-2xl border border-slate-200 bg-white px-4 py-3 leading-7 text-slate-950 sm:min-h-80"
            readOnly
            value={email.body}
          />
        </label>

        <div className="flex w-full flex-col gap-3 sm:grid sm:grid-cols-2 lg:grid-cols-4">
          <Button className="min-h-[44px] w-full" onClick={() => copyEmail()} type="button" variant="outline">
            {copied === "email" ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            {copied === "email" ? "Email copie" : "Copier l'email"}
          </Button>
          <a
            className="focus-ring inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-full border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-900 transition hover:border-slate-400 hover:bg-slate-50"
            href={email.mailtoUrl}
          >
            <Mail className="h-4 w-4" />
            Ouvrir dans Mail
          </a>
          <a
            className="focus-ring inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-full bg-slate-950 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
            href={email.gmailUrl}
            rel="noopener noreferrer"
            target="_blank"
          >
            <ExternalLink className="h-4 w-4" />
            Ouvrir dans Gmail
          </a>
          <Button className="min-h-[44px] w-full" onClick={shareEmail} type="button" variant="secondary">
            {copied === "share" ? <Check className="h-4 w-4" /> : <Share2 className="h-4 w-4" />}
            {copied === "share" ? "Email copie" : "Partager"}
          </Button>
        </div>

        {copied === "share" ? (
          <p className="rounded-2xl bg-blue-50 px-4 py-3 text-sm font-medium text-blue-800">
            Partage non disponible, email copie.
          </p>
        ) : null}
      </div>
    </section>
  );
}

function buildEmail(result: AiResult, formData: RequestFormData) {
  const procedureLabel = getProcedureLabel(formData.requestedAid);
  const senderName = [formData.lastName, formData.firstName].filter(Boolean).join(" ");
  const subject = buildEmailSubject(procedureLabel, formData);
  const documents = result.documentsNecessaires.length
    ? result.documentsNecessaires.map((document) => `- ${stripListMarker(document)}`).join("\n")
    : "- A completer selon les justificatifs demandes par l'organisme";

  const body = `Bonjour,

Je me permets de vous contacter concernant ma demande relative a ${procedureLabel}.

Vous trouverez ci-dessous les elements structures de ma demande, prepares afin de faciliter son traitement.

${result.lettre}

Pieces jointes a ajouter :
${documents}

Je reste disponible pour transmettre tout complement utile et vous remercie par avance pour votre retour.

Cordialement,
${senderName || "[Nom Prenom]"}`;

  const encodedSubject = encodeURIComponent(subject);
  const encodedBody = encodeURIComponent(body);

  return {
    subject,
    body,
    gmailUrl: `https://mail.google.com/mail/?view=cm&fs=1&su=${encodedSubject}&body=${encodedBody}`,
    mailtoUrl: `mailto:?subject=${encodedSubject}&body=${encodedBody}`
  };
}

function buildEmailSubject(procedureLabel: string, formData: RequestFormData) {
  const dynamicFields = formData.dynamicFields ?? {};
  const period = String(dynamicFields.urssafPeriod ?? dynamicFields.taxYear ?? "").trim();
  const suffix = period ? ` - ${period}` : "";
  return `Demande administrative - ${procedureLabel}${suffix}`;
}
