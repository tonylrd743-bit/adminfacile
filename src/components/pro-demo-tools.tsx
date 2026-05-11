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
import type { jsPDF } from "jspdf";
import type { ReactNode } from "react";
import { Button } from "@/components/button";

type ProToolId = "quote" | "invoice" | "client-email" | "payment-reminder" | "quote-reply" | "pro-assistant";

type ProTool = {
  id: ProToolId;
  title: string;
  description: string;
  icon: LucideIcon;
};

type ProValues = {
  companyName: string;
  companyAddress: string;
  companySiret: string;
  companyEmail: string;
  clientName: string;
  clientAddress: string;
  documentNumber: string;
  documentDate: string;
  validUntil: string;
  dueDate: string;
  service: string;
  quantity: string;
  unitPrice: string;
  discount: string;
  vatRate: string;
  paymentTerms: string;
  reminderLevel: string;
  details: string;
};

type DemoResult = {
  title: string;
  subject: string;
  body: string;
  kind: ProToolId;
};

const tools: ProTool[] = [
  {
    id: "quote",
    title: "Générateur de devis",
    description: "Créez un devis structuré avec coordonnées, tableau de prestations, totaux et bon pour accord.",
    icon: FileText
  },
  {
    id: "invoice",
    title: "Générateur de facture",
    description: "Préparez une facture professionnelle avec échéance, statut, TVA, pénalités et mode de paiement.",
    icon: ReceiptText
  },
  {
    id: "client-email",
    title: "Préparer un email client",
    description: "Rédigez un email business clair, courtois et directement envoyable.",
    icon: Mail
  },
  {
    id: "payment-reminder",
    title: "Relancer une facture impayée",
    description: "Choisissez le niveau de relance et générez un message crédible, du rappel doux à la mise en demeure amiable.",
    icon: TimerReset
  },
  {
    id: "quote-reply",
    title: "Répondre à une demande de devis",
    description: "Transformez une demande entrante en réponse commerciale professionnelle et structurée.",
    icon: BriefcaseBusiness
  },
  {
    id: "pro-assistant",
    title: "Assistant administratif IA Pro",
    description: "Produisez une synthèse business avec priorités, documents à préparer et prochaines actions.",
    icon: Sparkles
  }
];

export function ProDemoTools() {
  const [selectedToolId, setSelectedToolId] = useState<ProToolId>("quote");
  const [values, setValues] = useState<ProValues>(() => createInitialValues("quote"));
  const [result, setResult] = useState<DemoResult>(() => buildDemoResult(tools[0], createInitialValues("quote")));
  const [copied, setCopied] = useState(false);
  const selectedTool = tools.find((tool) => tool.id === selectedToolId) ?? tools[0];
  const totals = useMemo(() => calculateTotals(values), [values]);
  const emailLinks = useMemo(() => buildEmailLinks(result.subject, result.body), [result]);

  function selectTool(tool: ProTool) {
    const nextValues = createInitialValues(tool.id);
    setSelectedToolId(tool.id);
    setValues(nextValues);
    setResult(buildDemoResult(tool, nextValues));
    setCopied(false);
  }

  function updateValue(name: keyof ProValues, value: string) {
    setValues((current) => ({ ...current, [name]: value }));
  }

  function generateDemo() {
    setResult(buildDemoResult(selectedTool, values));
    setCopied(false);
  }

  async function copyResult() {
    await navigator.clipboard.writeText(result.body);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  }

  async function downloadPdf() {
    const { jsPDF } = await import("jspdf");
    const doc = new jsPDF();

    if (result.kind === "quote" || result.kind === "invoice") {
      drawBusinessPdf(doc, selectedTool, values, totals);
    } else {
      drawTextPdf(doc, result);
    }

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
                active ? "border-slate-950 bg-slate-950 text-white" : "border-slate-200 bg-white text-slate-950"
              ].join(" ")}
              key={tool.id}
            >
              <div className="flex items-start justify-between gap-3">
                <span className={active ? "flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white text-slate-950" : "flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-slate-950 text-white"}>
                  <Icon className="h-5 w-5" />
                </span>
                <span className={active ? "rounded-full bg-blue-500 px-3 py-1 text-xs font-bold text-white" : "rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700"}>
                  Démo Pro
                </span>
              </div>
              <h2 className="mt-4 text-lg font-semibold">{tool.title}</h2>
              <p className={active ? "mt-2 flex-1 leading-7 text-slate-300" : "mt-2 flex-1 leading-7 text-slate-600"}>
                {tool.description}
              </p>
              <Button className="mt-5 w-full" onClick={() => selectTool(tool)} type="button" variant={active ? "outline" : "secondary"}>
                Tester en démo
              </Button>
            </article>
          );
        })}
      </div>

      <section className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <form action={generateDemo} className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <p className="text-sm font-semibold uppercase text-blue-600">Démo active</p>
          <h2 className="mt-1 text-2xl font-semibold tracking-tight text-slate-950">{selectedTool.title}</h2>
          <p className="mt-2 leading-7 text-slate-600">{selectedTool.description}</p>

          <div className="mt-6 space-y-6">
            <FieldGroup title="Votre entreprise">
              <Input label="Nom de l'entreprise" name="companyName" onChange={updateValue} value={values.companyName} />
              <Input label="Adresse" name="companyAddress" onChange={updateValue} value={values.companyAddress} />
              <Input label="SIREN / SIRET" name="companySiret" onChange={updateValue} value={values.companySiret} />
              <Input label="Email" name="companyEmail" onChange={updateValue} type="email" value={values.companyEmail} />
            </FieldGroup>

            <FieldGroup title="Client">
              <Input label="Nom du client" name="clientName" onChange={updateValue} value={values.clientName} />
              <Input label="Adresse client" name="clientAddress" onChange={updateValue} value={values.clientAddress} />
            </FieldGroup>

            <FieldGroup title={selectedTool.id === "invoice" ? "Facture" : "Document"}>
              <Input label="Numéro" name="documentNumber" onChange={updateValue} value={values.documentNumber} />
              <Input label="Date" name="documentDate" onChange={updateValue} type="date" value={values.documentDate} />
              {selectedTool.id === "quote" ? (
                <Input label="Valide jusqu'au" name="validUntil" onChange={updateValue} type="date" value={values.validUntil} />
              ) : null}
              {selectedTool.id === "invoice" || selectedTool.id === "payment-reminder" ? (
                <Input label="Échéance" name="dueDate" onChange={updateValue} type="date" value={values.dueDate} />
              ) : null}
              {selectedTool.id === "payment-reminder" ? (
                <label className="block space-y-2 text-sm font-semibold text-slate-800">
                  Niveau de relance
                  <select
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-950 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                    onChange={(event) => updateValue("reminderLevel", event.target.value)}
                    value={values.reminderLevel}
                  >
                    <option value="soft">Relance douce</option>
                    <option value="second">Deuxième relance</option>
                    <option value="firm">Relance ferme</option>
                    <option value="formal">Mise en demeure amiable</option>
                  </select>
                </label>
              ) : null}
            </FieldGroup>

            <FieldGroup title="Prestation">
              <Input label="Description" name="service" onChange={updateValue} value={values.service} />
              <Input label="Quantité" name="quantity" onChange={updateValue} type="number" value={values.quantity} />
              <Input label="Prix unitaire HT" name="unitPrice" onChange={updateValue} type="number" value={values.unitPrice} />
              <Input label="Remise %" name="discount" onChange={updateValue} type="number" value={values.discount} />
              <Input label="TVA %" name="vatRate" onChange={updateValue} type="number" value={values.vatRate} />
              <Input label="Conditions de paiement" name="paymentTerms" onChange={updateValue} value={values.paymentTerms} />
            </FieldGroup>

            <label className="block space-y-2 text-sm font-semibold text-slate-800">
              Contexte ou message
              <textarea
                className="min-h-32 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-950 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                onChange={(event) => updateValue("details", event.target.value)}
                value={values.details}
              />
            </label>
          </div>

          <Button className="mt-6 w-full" type="submit">
            <Sparkles className="h-4 w-4" />
            Générer l'exemple Pro
          </Button>
        </form>

        <section className="min-w-0 rounded-[2rem] border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase text-blue-600">Aperçu professionnel</p>
              <h2 className="mt-1 text-2xl font-semibold tracking-tight text-slate-950">{result.title}</h2>
            </div>
            <span className="w-fit rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-700">Prêt pour PDF</span>
          </div>

          {result.kind === "quote" || result.kind === "invoice" ? (
            <BusinessDocumentPreview kind={result.kind} totals={totals} values={values} />
          ) : (
            <pre className="mt-5 min-h-80 whitespace-pre-wrap break-words rounded-3xl bg-slate-50 p-4 font-sans leading-7 text-slate-700 ring-1 ring-slate-100">
              {result.body}
            </pre>
          )}

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <Button className="w-full" onClick={copyResult} type="button" variant="outline">
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              {copied ? "Copié" : "Copier"}
            </Button>
            <Button className="w-full" onClick={downloadPdf} type="button">
              <Download className="h-4 w-4" />
              PDF
            </Button>
            <a
              className="focus-ring inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-900 transition hover:border-slate-400 hover:bg-slate-50"
              href={emailLinks.mailtoUrl}
            >
              <Mail className="h-4 w-4" />
              Mail
            </a>
            <a
              className="focus-ring inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full bg-slate-950 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
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

function BusinessDocumentPreview({ kind, values, totals }: { kind: ProToolId; values: ProValues; totals: ReturnType<typeof calculateTotals> }) {
  const isInvoice = kind === "invoice";
  return (
    <div className="mt-5 overflow-hidden rounded-3xl border border-slate-200 bg-white">
      <div className="grid gap-6 p-5 sm:grid-cols-2 sm:p-8">
        <div>
          <div className="flex h-16 w-36 items-center justify-center rounded-2xl bg-slate-950 text-lg font-bold text-white">AdminFacile</div>
          <div className="mt-5 space-y-1 text-sm leading-6 text-slate-600">
            <p className="font-semibold text-slate-950">{values.companyName}</p>
            <p>{values.companyAddress}</p>
            <p>{values.companySiret}</p>
            <p>{values.companyEmail}</p>
          </div>
        </div>
        <div className="text-left sm:text-right">
          <h3 className="text-3xl font-semibold tracking-tight text-slate-950">{isInvoice ? "FACTURE" : "DEVIS"}</h3>
          <div className="mt-5 grid gap-2 text-sm text-slate-600 sm:justify-end">
            <InfoLine label={isInvoice ? "Facture n°" : "Devis n°"} value={values.documentNumber} />
            <InfoLine label="Date" value={formatDateForDisplay(values.documentDate)} />
            <InfoLine label={isInvoice ? "Échéance" : "Valide jusqu'au"} value={formatDateForDisplay(isInvoice ? values.dueDate : values.validUntil)} />
            {isInvoice ? <InfoLine label="Statut" value="En attente de règlement" /> : null}
          </div>
        </div>
      </div>

      <div className="border-y border-slate-200 bg-slate-50 p-5 sm:p-8">
        <p className="text-xs font-bold uppercase text-slate-500">À</p>
        <p className="mt-2 font-semibold text-slate-950">{values.clientName}</p>
        <p className="mt-1 whitespace-pre-wrap text-sm leading-6 text-slate-600">{values.clientAddress}</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] border-collapse text-sm">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="px-4 py-3 text-left font-semibold">Description</th>
              <th className="px-4 py-3 text-right font-semibold">Quantité</th>
              <th className="px-4 py-3 text-right font-semibold">Prix HT</th>
              <th className="px-4 py-3 text-right font-semibold">Remise</th>
              <th className="px-4 py-3 text-right font-semibold">Montant HT</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-slate-200">
              <td className="px-4 py-4 text-slate-800">{values.service}</td>
              <td className="px-4 py-4 text-right text-slate-700">{values.quantity}</td>
              <td className="px-4 py-4 text-right text-slate-700">{formatEuro(totals.unitPrice)}</td>
              <td className="px-4 py-4 text-right text-slate-700">{values.discount || "0"} %</td>
              <td className="px-4 py-4 text-right font-semibold text-slate-950">{formatEuro(totals.discountedHt)}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="grid gap-6 p-5 sm:grid-cols-[1fr_280px] sm:p-8">
        <div className="text-sm leading-6 text-slate-600">
          <p className="font-semibold text-slate-950">{isInvoice ? "Mode de paiement" : "Conditions"}</p>
          <p className="mt-2">{values.paymentTerms}</p>
          <p className="mt-4 whitespace-pre-wrap">{values.details}</p>
          <p className="mt-4 italic">Bon pour accord, date et signature :</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm">
          <InfoLine label="Total HT" value={formatEuro(totals.discountedHt)} />
          <InfoLine label={`TVA (${values.vatRate || "0"} %)`} value={formatEuro(totals.vatAmount)} />
          <div className="mt-3 border-t border-slate-200 pt-3">
            <InfoLine label="Total TTC" strong value={formatEuro(totals.totalTtc)} />
          </div>
        </div>
      </div>
    </div>
  );
}

function FieldGroup({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section>
      <h3 className="text-sm font-bold uppercase text-slate-500">{title}</h3>
      <div className="mt-3 grid gap-4 sm:grid-cols-2">{children}</div>
    </section>
  );
}

function Input({
  label,
  name,
  value,
  type = "text",
  onChange
}: {
  label: string;
  name: keyof ProValues;
  value: string;
  type?: string;
  onChange: (name: keyof ProValues, value: string) => void;
}) {
  return (
    <label className="block space-y-2 text-sm font-semibold text-slate-800">
      {label}
      <input
        className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-950 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
        onChange={(event) => onChange(name, event.target.value)}
        type={type}
        value={value}
      />
    </label>
  );
}

function InfoLine({ label, value, strong = false }: { label: string; value: string; strong?: boolean }) {
  return (
    <div className="flex justify-between gap-6">
      <span className="text-slate-500">{label}</span>
      <span className={strong ? "font-bold text-slate-950" : "font-semibold text-slate-800"}>{value}</span>
    </div>
  );
}

function createInitialValues(toolId: ProToolId): ProValues {
  const now = new Date();
  const future = new Date(now);
  future.setDate(now.getDate() + 30);
  const due = new Date(now);
  due.setDate(now.getDate() + 15);
  const prefix = toolId === "invoice" ? "FAC" : "DEV";
  const number = `${prefix}-${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}${String(now.getDate()).padStart(2, "0")}`;

  const values = {
    companyName: "AdminFacile Pro Services",
    companyAddress: "12 rue de la Gestion\n75009 Paris\nFrance",
    companySiret: "SIREN : 000 000 000",
    companyEmail: "contact@adminfacile.fr",
    clientName: "Client Exemple",
    clientAddress: "Adresse client\nFrance",
    documentNumber: number,
    documentDate: toInputDate(now),
    validUntil: toInputDate(future),
    dueDate: toInputDate(due),
    service: "Prestation administrative professionnelle",
    quantity: "1",
    unitPrice: "450",
    discount: "0",
    vatRate: "20",
    paymentTerms: "Paiement par virement sous 15 jours.",
    reminderLevel: "soft",
    details: "Document généré en mode démo. À relire, compléter et adapter avant tout envoi réel."
  };

  if (toolId === "quote" && typeof window !== "undefined") {
    const stored = sessionStorage.getItem("adminfacile:pro-quote");
    if (stored) {
      sessionStorage.removeItem("adminfacile:pro-quote");
      try {
        const parsed = JSON.parse(stored) as Partial<ProValues>;
        return { ...values, ...parsed, documentNumber: values.documentNumber };
      } catch {
        return values;
      }
    }
  }

  return values;
}

function buildDemoResult(tool: ProTool, values: ProValues): DemoResult {
  const totals = calculateTotals(values);
  const title = tool.id === "invoice" ? `Facture ${values.documentNumber}` : tool.id === "quote" ? `Devis ${values.documentNumber}` : tool.title;
  return {
    title,
    subject: buildSubject(tool, values),
    body: buildBody(tool, values, totals),
    kind: tool.id
  };
}

function buildSubject(tool: ProTool, values: ProValues) {
  if (tool.id === "quote") return `Devis ${values.documentNumber} - ${values.service}`;
  if (tool.id === "invoice") return `Facture ${values.documentNumber} - ${values.service}`;
  if (tool.id === "payment-reminder") return `Relance facture ${values.documentNumber}`;
  return `${tool.title} - ${values.clientName}`;
}

function buildBody(tool: ProTool, values: ProValues, totals: ReturnType<typeof calculateTotals>) {
  if (tool.id === "quote" || tool.id === "invoice") {
    return `${tool.id === "invoice" ? "FACTURE" : "DEVIS"} ${values.documentNumber}

Emetteur :
${values.companyName}
${values.companyAddress}
${values.companySiret}
${values.companyEmail}

Client :
${values.clientName}
${values.clientAddress}

Prestation :
- ${values.service}
- Quantite : ${values.quantity}
- Prix unitaire HT : ${formatEuro(totals.unitPrice)}
- Remise : ${values.discount || "0"} %
- Total HT : ${formatEuro(totals.discountedHt)}
- TVA : ${formatEuro(totals.vatAmount)}
- Total TTC : ${formatEuro(totals.totalTtc)}

Conditions :
${values.paymentTerms}

${values.details}`;
  }

  if (tool.id === "payment-reminder") return buildReminderBody(values);
  if (tool.id === "client-email") {
    return `Bonjour ${values.clientName},

Je vous remercie pour votre retour.

Je vous adresse les éléments relatifs à ${values.service}.

${values.details}

Je reste disponible pour toute précision et peux vous transmettre un document complémentaire si nécessaire.

Cordialement,
${values.companyName}`;
  }
  if (tool.id === "quote-reply") {
    return `Bonjour ${values.clientName},

Merci pour votre demande concernant ${values.service}.

Après analyse des éléments transmis, voici une première proposition de cadrage :
${values.details}

Prochaines étapes proposées :
1. Confirmer le périmètre exact de la mission
2. Valider les délais souhaités
3. Établir un devis détaillé

Cordialement,
${values.companyName}`;
  }

  return `Synthèse administrative Pro

Dossier : ${values.clientName}
Objectif : ${values.service}

Situation :
${values.details}

Priorités recommandées :
1. Clarifier les échéances et documents manquants
2. Regrouper les justificatifs dans un dossier unique
3. Rédiger les emails ou courriers nécessaires
4. Planifier les relances

Note : cette démo aide à structurer le travail administratif et ne remplace pas un conseil juridique, fiscal ou comptable.`;
}

function buildReminderBody(values: ProValues) {
  const intro = {
    soft: "Sauf erreur de notre part, le règlement de la facture ci-dessous ne nous est pas encore parvenu.",
    second: "Nous revenons vers vous concernant la facture ci-dessous, qui reste à ce jour en attente de règlement malgré notre précédent rappel.",
    firm: "Nous vous demandons de bien vouloir régulariser la facture ci-dessous dans les meilleurs délais.",
    formal: "À défaut de règlement rapide ou de retour de votre part, nous nous réservons la possibilité d'engager les démarches amiables nécessaires au recouvrement."
  }[values.reminderLevel];

  return `Objet : Relance facture ${values.documentNumber}

Bonjour ${values.clientName},

${intro}

Facture concernée : ${values.documentNumber}
Prestation : ${values.service}
Montant TTC : ${formatEuro(calculateTotals(values).totalTtc)}
Échéance : ${formatDateForDisplay(values.dueDate)}

${values.details}

Nous vous remercions de bien vouloir procéder au règlement ou de nous indiquer si un élément bloque le traitement.

Cordialement,
${values.companyName}`;
}

function calculateTotals(values: ProValues) {
  const quantity = Number(values.quantity || 0);
  const unitPrice = Number(values.unitPrice || 0);
  const discount = Number(values.discount || 0);
  const vatRate = Number(values.vatRate || 0);
  const totalHt = quantity * unitPrice;
  const discountedHt = totalHt * (1 - discount / 100);
  const vatAmount = discountedHt * (vatRate / 100);
  const totalTtc = discountedHt + vatAmount;
  return { quantity, unitPrice, totalHt, discountedHt, vatAmount, totalTtc };
}

function drawBusinessPdf(doc: jsPDF, tool: ProTool, values: ProValues, totals: ReturnType<typeof calculateTotals>) {
  const isInvoice = tool.id === "invoice";
  const margin = 16;
  const width = doc.internal.pageSize.getWidth();
  let y = 20;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(24);
  doc.setTextColor(15, 23, 42);
  doc.text(isInvoice ? "FACTURE" : "DEVIS", width - margin, y, { align: "right" });

  doc.setFillColor(15, 23, 42);
  doc.roundedRect(margin, y + 6, 68, 34, 3, 3, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(15);
  doc.text("AdminFacile", margin + 8, y + 24);

  doc.setTextColor(100, 116, 139);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.text(split(doc, `${values.companyName}\n${values.companyAddress}\n${values.companySiret}\n${values.companyEmail}`, 70), margin, y + 52);
  doc.text(split(doc, `${isInvoice ? "Facture" : "Devis"} n° : ${values.documentNumber}\nDate : ${formatDateForDisplay(values.documentDate)}\n${isInvoice ? "Échéance" : "Valide jusqu'au"} : ${formatDateForDisplay(isInvoice ? values.dueDate : values.validUntil)}`, 70), width - margin, y + 52, { align: "right" });

  y = 86;
  doc.setFont("helvetica", "bold");
  doc.setTextColor(15, 23, 42);
  doc.text("À :", margin, y);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(51, 65, 85);
  doc.text(split(doc, `${values.clientName}\n${values.clientAddress}`, 80), margin, y + 7);

  y = 122;
  doc.setFillColor(37, 99, 235);
  doc.rect(margin, y, width - margin * 2, 10, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.text("DESCRIPTION", margin + 3, y + 7);
  doc.text("QTE", 108, y + 7, { align: "right" });
  doc.text("PRIX HT", 135, y + 7, { align: "right" });
  doc.text("REMISE", 160, y + 7, { align: "right" });
  doc.text("MONTANT HT", width - margin - 3, y + 7, { align: "right" });

  y += 18;
  doc.setTextColor(51, 65, 85);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.text(split(doc, values.service, 78), margin + 3, y);
  doc.text(String(values.quantity), 108, y, { align: "right" });
  doc.text(formatEuro(totals.unitPrice), 135, y, { align: "right" });
  doc.text(`${values.discount || "0"} %`, 160, y, { align: "right" });
  doc.text(formatEuro(totals.discountedHt), width - margin - 3, y, { align: "right" });

  y += 14;
  doc.setDrawColor(226, 232, 240);
  doc.line(margin, y, width - margin, y);
  y += 9;
  doc.setFont("helvetica", "bold");
  doc.text("Total HT", 140, y, { align: "right" });
  doc.text(formatEuro(totals.discountedHt), width - margin - 3, y, { align: "right" });
  y += 7;
  doc.text(`TVA (${values.vatRate || "0"} %)`, 140, y, { align: "right" });
  doc.text(formatEuro(totals.vatAmount), width - margin - 3, y, { align: "right" });
  y += 8;
  doc.setFontSize(11);
  doc.text("TOTAL TTC", 140, y, { align: "right" });
  doc.text(formatEuro(totals.totalTtc), width - margin - 3, y, { align: "right" });

  y += 18;
  doc.setFontSize(9);
  doc.setFont("helvetica", "italic");
  doc.text(split(doc, `${values.paymentTerms}\n${values.details}\n\nBon pour accord, date et signature :`, width - margin * 2), margin, y);
}

function drawTextPdf(doc: jsPDF, result: DemoResult) {
  const margin = 16;
  const width = doc.internal.pageSize.getWidth();
  let y = 22;
  doc.setFillColor(15, 23, 42);
  doc.roundedRect(margin, y, width - margin * 2, 28, 4, 4, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.text("AdminFacile Pro", margin + 8, y + 12);
  doc.setFontSize(10);
  doc.text(result.title, margin + 8, y + 22);
  y += 44;
  doc.setTextColor(51, 65, 85);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  split(doc, result.body, width - margin * 2).forEach((line: string) => {
    if (y > 280) {
      doc.addPage();
      y = 20;
    }
    doc.text(line, margin, y);
    y += 6;
  });
}

function split(doc: jsPDF, text: string, maxWidth: number) {
  return doc.splitTextToSize(text || "-", maxWidth);
}

function buildEmailLinks(subjectText: string, bodyText: string) {
  const subject = encodeURIComponent(subjectText);
  const body = encodeURIComponent(bodyText);
  return {
    gmailUrl: `https://mail.google.com/mail/?view=cm&fs=1&su=${subject}&body=${body}`,
    mailtoUrl: `mailto:?subject=${subject}&body=${body}`
  };
}

function toInputDate(date: Date) {
  return date.toISOString().slice(0, 10);
}

function formatDateForDisplay(value: string) {
  if (!value) return "-";
  return new Intl.DateTimeFormat("fr-FR").format(new Date(value));
}

function formatEuro(value: number) {
  return new Intl.NumberFormat("fr-FR", { currency: "EUR", style: "currency" }).format(value || 0);
}
