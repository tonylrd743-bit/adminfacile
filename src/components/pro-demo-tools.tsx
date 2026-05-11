"use client";

import { useMemo, useState } from "react";
import {
  BriefcaseBusiness,
  Check,
  Copy,
  Download,
  ExternalLink,
  FileText,
  Mail,
  ReceiptText,
  Sparkles,
  TimerReset
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Button } from "@/components/button";

type ProToolId = "quote" | "invoice" | "client-email" | "payment-reminder" | "quote-reply" | "pro-assistant";

type ProTool = {
  id: ProToolId;
  title: string;
  description: string;
  icon: LucideIcon;
  fields: Array<{ name: string; label: string; placeholder: string; type?: "text" | "number" | "textarea" }>;
};

const tools: ProTool[] = [
  {
    id: "quote",
    title: "Generateur de devis",
    description: "Creez une proposition commerciale claire avec prestations, montant et conditions.",
    icon: FileText,
    fields: [
      { name: "client", label: "Client", placeholder: "Nom du client ou entreprise" },
      { name: "service", label: "Prestation", placeholder: "Ex : Creation site vitrine" },
      { name: "amount", label: "Montant HT estime", placeholder: "1200", type: "number" },
      { name: "details", label: "Details", placeholder: "Indiquez le contexte, les livrables et les delais.", type: "textarea" }
    ]
  },
  {
    id: "invoice",
    title: "Generateur de facture",
    description: "Preparez une facture exemple structuree avant export professionnel.",
    icon: ReceiptText,
    fields: [
      { name: "client", label: "Client", placeholder: "Nom du client" },
      { name: "service", label: "Objet facture", placeholder: "Ex : Accompagnement administratif mensuel" },
      { name: "amount", label: "Montant HT", placeholder: "450", type: "number" },
      { name: "details", label: "Mentions utiles", placeholder: "Conditions de paiement, echeance, reference projet.", type: "textarea" }
    ]
  },
  {
    id: "client-email",
    title: "Preparer un email client",
    description: "Redigez un email business professionnel et pret a envoyer.",
    icon: Mail,
    fields: [
      { name: "client", label: "Destinataire", placeholder: "Client ou prospect" },
      { name: "service", label: "Sujet", placeholder: "Ex : Proposition commerciale" },
      { name: "details", label: "Message souhaite", placeholder: "Expliquez le contexte et l'objectif de l'email.", type: "textarea" }
    ]
  },
  {
    id: "payment-reminder",
    title: "Relancer une facture impayee",
    description: "Preparez une relance ferme, courtoise et exploitable.",
    icon: TimerReset,
    fields: [
      { name: "client", label: "Client", placeholder: "Nom du client" },
      { name: "service", label: "Reference facture", placeholder: "Facture F-2026-001" },
      { name: "amount", label: "Montant TTC", placeholder: "540", type: "number" },
      { name: "details", label: "Contexte", placeholder: "Date d'echeance, relances deja faites, mode de paiement.", type: "textarea" }
    ]
  },
  {
    id: "quote-reply",
    title: "Repondre a une demande de devis",
    description: "Transformez une demande entrante en reponse commerciale structuree.",
    icon: BriefcaseBusiness,
    fields: [
      { name: "client", label: "Prospect", placeholder: "Nom du prospect" },
      { name: "service", label: "Besoin exprime", placeholder: "Ex : Mission administrative ponctuelle" },
      { name: "details", label: "Informations recues", placeholder: "Collez ou resumez la demande du prospect.", type: "textarea" }
    ]
  },
  {
    id: "pro-assistant",
    title: "Assistant administratif IA Pro",
    description: "Generez une synthese business avec actions prioritaires et documents a produire.",
    icon: Sparkles,
    fields: [
      { name: "client", label: "Dossier ou client", placeholder: "Nom du dossier" },
      { name: "service", label: "Objectif", placeholder: "Ex : Organiser mes obligations URSSAF" },
      { name: "details", label: "Situation", placeholder: "Listez les points a clarifier, echeances et documents.", type: "textarea" }
    ]
  }
];

const baseState = {
  client: "",
  service: "",
  amount: "",
  details: ""
};

export function ProDemoTools() {
  const [selectedToolId, setSelectedToolId] = useState<ProToolId>("quote");
  const [values, setValues] = useState(baseState);
  const [result, setResult] = useState("");
  const [copied, setCopied] = useState(false);
  const selectedTool = tools.find((tool) => tool.id === selectedToolId) ?? tools[0];
  const emailLinks = useMemo(() => buildEmailLinks(selectedTool.title, result), [result, selectedTool.title]);

  function selectTool(tool: ProTool) {
    setSelectedToolId(tool.id);
    setValues(baseState);
    setResult("");
    setCopied(false);
  }

  function generateDemo() {
    setResult(buildDemoDocument(selectedTool, values));
    setCopied(false);
  }

  async function copyResult() {
    if (!result) return;
    await navigator.clipboard.writeText(result);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  }

  async function downloadPdf() {
    if (!result) return;
    const { jsPDF } = await import("jspdf");
    const doc = new jsPDF();
    const margin = 16;
    const maxWidth = doc.internal.pageSize.getWidth() - margin * 2;
    let y = 20;

    doc.setFillColor(15, 23, 42);
    doc.roundedRect(margin, y, maxWidth, 30, 4, 4, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.text("AdminFacile Pro - Demo", margin + 8, y + 13);
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text(selectedTool.title, margin + 8, y + 22);
    y += 44;

    doc.setTextColor(51, 65, 85);
    doc.setFontSize(10);
    const lines = doc.splitTextToSize(result, maxWidth);
    lines.forEach((line: string) => {
      if (y > 280) {
        doc.addPage();
        y = 20;
      }
      doc.text(line, margin, y);
      y += 6;
    });

    doc.save(`adminfacile-pro-${selectedTool.id}.pdf`);
  }

  return (
    <div className="space-y-8">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {tools.map((tool) => {
          const Icon = tool.icon;
          const active = tool.id === selectedTool.id;
          return (
            <article
              className={[
                "flex min-w-0 flex-col rounded-3xl border p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg",
                active ? "border-blue-300 bg-blue-50" : "border-slate-200 bg-white"
              ].join(" ")}
              key={tool.id}
            >
              <div className="flex items-start justify-between gap-3">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-slate-950 text-white">
                  <Icon className="h-5 w-5" />
                </span>
                <span className="rounded-full bg-blue-600 px-3 py-1 text-xs font-bold text-white">Demo Pro</span>
              </div>
              <h2 className="mt-4 text-lg font-semibold text-slate-950">{tool.title}</h2>
              <p className="mt-2 flex-1 leading-7 text-slate-600">{tool.description}</p>
              <Button className="mt-5 w-full" onClick={() => selectTool(tool)} type="button" variant={active ? "primary" : "outline"}>
                Tester en demo
              </Button>
            </article>
          );
        })}
      </div>

      <section className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <form action={generateDemo} className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <p className="text-sm font-semibold uppercase text-blue-600">Demo active</p>
          <h2 className="mt-1 text-2xl font-semibold tracking-tight text-slate-950">{selectedTool.title}</h2>
          <p className="mt-2 leading-7 text-slate-600">{selectedTool.description}</p>

          <div className="mt-6 space-y-4">
            {selectedTool.fields.map((field) => (
              <label className="block space-y-2 text-sm font-semibold text-slate-800" key={field.name}>
                {field.label}
                {field.type === "textarea" ? (
                  <textarea
                    className="min-h-32 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-950 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                    onChange={(event) => setValues((current) => ({ ...current, [field.name]: event.target.value }))}
                    placeholder={field.placeholder}
                    value={values[field.name as keyof typeof values]}
                  />
                ) : (
                  <input
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-950 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                    onChange={(event) => setValues((current) => ({ ...current, [field.name]: event.target.value }))}
                    placeholder={field.placeholder}
                    type={field.type ?? "text"}
                    value={values[field.name as keyof typeof values]}
                  />
                )}
              </label>
            ))}
          </div>

          <Button className="mt-6 w-full" type="submit">
            <Sparkles className="h-4 w-4" />
            Generer l'exemple Pro
          </Button>
        </form>

        <section className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <p className="text-sm font-semibold uppercase text-blue-600">Resultat</p>
          <h2 className="mt-1 text-2xl font-semibold tracking-tight text-slate-950">Document professionnel</h2>
          <pre className="mt-5 min-h-80 whitespace-pre-wrap break-words rounded-3xl bg-slate-50 p-4 font-sans leading-7 text-slate-700 ring-1 ring-slate-100">
            {result || "Remplissez le formulaire puis cliquez sur Generer l'exemple Pro."}
          </pre>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <Button className="w-full" disabled={!result} onClick={copyResult} type="button" variant="outline">
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              {copied ? "Copie" : "Copier"}
            </Button>
            <Button className="w-full" disabled={!result} onClick={downloadPdf} type="button">
              <Download className="h-4 w-4" />
              PDF
            </Button>
            <a
              className={[
                "focus-ring inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-900 transition hover:border-slate-400 hover:bg-slate-50",
                result ? "" : "pointer-events-none opacity-50"
              ].join(" ")}
              href={emailLinks.mailtoUrl}
            >
              <Mail className="h-4 w-4" />
              Mail
            </a>
            <a
              className={[
                "focus-ring inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full bg-slate-950 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800",
                result ? "" : "pointer-events-none opacity-50"
              ].join(" ")}
              href={emailLinks.gmailUrl}
              rel="noopener noreferrer"
              target="_blank"
            >
              <ExternalLink className="h-4 w-4" />
              Gmail
            </a>
          </div>
        </section>
      </section>
    </div>
  );
}

function buildDemoDocument(tool: ProTool, values: typeof baseState) {
  const client = values.client.trim() || "[Client]";
  const service = values.service.trim() || "[Objet / prestation]";
  const amount = values.amount.trim() || "[Montant]";
  const details = values.details.trim() || "[Contexte a completer]";

  switch (tool.id) {
    case "quote":
      return `DEVIS - DEMO ADMINFACILE PRO

Client : ${client}
Prestation : ${service}
Montant HT estime : ${amount} euros

Contexte :
${details}

Proposition :
Nous proposons une intervention structuree comprenant cadrage du besoin, realisation de la prestation, point de validation et livraison finale.

Conditions :
- Devis valable 30 jours
- Demarrage apres validation ecrite
- Modalites de paiement a confirmer

Cordialement,
[Votre nom / entreprise]`;
    case "invoice":
      return `FACTURE - DEMO ADMINFACILE PRO

Client : ${client}
Objet : ${service}
Montant HT : ${amount} euros

Details :
${details}

Synthese facture :
- Prestation realisee selon les elements convenus
- Paiement attendu a reception sauf condition particuliere
- Merci d'indiquer la reference facture lors du reglement

Cordialement,
[Votre nom / entreprise]`;
    case "client-email":
      return `Objet : ${service}

Bonjour ${client},

Je vous remercie pour votre retour.

Je vous adresse ci-dessous les elements relatifs a ${service}.

${details}

Je reste disponible pour toute precision et peux vous transmettre un devis ou un document recapitulatif si necessaire.

Cordialement,
[Votre nom]`;
    case "payment-reminder":
      return `Objet : Relance facture ${service}

Bonjour ${client},

Sauf erreur de notre part, la facture ${service} d'un montant de ${amount} euros reste en attente de reglement.

Contexte :
${details}

Nous vous remercions de bien vouloir proceder au reglement ou de nous indiquer si un element bloque le traitement.

Cordialement,
[Votre nom / entreprise]`;
    case "quote-reply":
      return `Objet : Reponse a votre demande - ${service}

Bonjour ${client},

Merci pour votre demande concernant ${service}.

Apres lecture des elements transmis, voici une premiere proposition de cadrage :
${details}

Prochaine etape proposee :
- confirmer le perimetre
- valider les delais souhaites
- etablir un devis clair

Cordialement,
[Votre nom]`;
    case "pro-assistant":
      return `SYNTHESE ADMINISTRATIVE PRO

Dossier : ${client}
Objectif : ${service}

Situation :
${details}

Priorites recommandees :
1. Clarifier les echeances et documents manquants
2. Regrouper les justificatifs dans un dossier unique
3. Rediger les emails ou courriers necessaires
4. Planifier les relances

Documents a preparer :
- pieces d'identite ou references dossier si necessaire
- justificatifs professionnels
- factures, devis, courriers ou attestations utiles

Note : cette demo aide a structurer le travail administratif et ne remplace pas un conseil juridique, fiscal ou comptable.`;
  }
}

function buildEmailLinks(title: string, result: string) {
  const subject = encodeURIComponent(`AdminFacile Pro - ${title}`);
  const body = encodeURIComponent(result);
  return {
    gmailUrl: `https://mail.google.com/mail/?view=cm&fs=1&su=${subject}&body=${body}`,
    mailtoUrl: `mailto:?subject=${subject}&body=${body}`
  };
}
