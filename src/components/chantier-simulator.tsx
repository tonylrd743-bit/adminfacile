"use client";

import { useMemo, useState } from "react";
import { ArrowRight, Check, Copy, Download, ExternalLink, ImageUp, Mail, Sparkles } from "lucide-react";
import type { jsPDF } from "jspdf";
import { Button } from "@/components/button";
import { getProfileBusinessLabel, getProfileDisplayName } from "@/lib/profile";
import type { ProfessionalProfile } from "@/lib/profile";
import type { ChantierEstimateResult } from "@/types/chantier";

const serviceCategories = [
  "Bâtiment",
  "Nettoyage",
  "Jardinage",
  "Consulting",
  "Digital",
  "Livraison",
  "Dépannage",
  "Coaching",
  "Administratif",
  "Commerce",
  "Autre"
];

export function ChantierSimulator({ profile }: { profile?: ProfessionalProfile | null }) {
  const [description, setDescription] = useState("");
  const [serviceType, setServiceType] = useState("");
  const [businessActivity, setBusinessActivity] = useState(getProfileBusinessLabel(profile));
  const [dimensions, setDimensions] = useState("");
  const [estimatedTimeInput, setEstimatedTimeInput] = useState("");
  const [materials, setMaterials] = useState("");
  const [travelDistance, setTravelDistance] = useState("");
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [images, setImages] = useState<string[]>([]);
  const [result, setResult] = useState<ChantierEstimateResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const emailLinks = useMemo(() => {
    const subject = encodeURIComponent(result?.emailSubject ?? "Estimation de prestation");
    const body = encodeURIComponent(result?.emailBody ?? "");
    return {
      gmailUrl: `https://mail.google.com/mail/?view=cm&fs=1&su=${subject}&body=${body}`,
      mailtoUrl: `mailto:?subject=${subject}&body=${body}`
    };
  }, [result]);

  async function onImagesChange(files: FileList | null) {
    if (!files) return;
    const selected = Array.from(files).slice(0, 4);
    const dataUrls = await Promise.all(selected.map(readFileAsDataUrl));
    setImages(dataUrls);
  }

  function toggleService(service: string) {
    setSelectedServices((current) =>
      current.includes(service) ? current.filter((item) => item !== service) : [...current, service]
    );
  }

  async function analyze() {
    setLoading(true);
    setError(null);
    setCopied(false);
    try {
      const response = await fetch("/api/chantier/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          description,
          serviceType,
          businessActivity,
          profileContext: {
            companyName: profile?.company_name,
            profession: profile?.profession,
            activity: profile?.activity,
            specialty: profile?.specialty,
            hourlyRate: profile?.hourly_rate,
            serviceArea: profile?.service_area,
            travelFee: profile?.travel_fee,
            vatApplicable: profile?.vat_applicable,
            documentStyle: profile?.document_style
          },
          dimensions,
          estimatedTimeInput,
          materials,
          travelDistance,
          services: selectedServices,
          images
        })
      });
      const data = (await response.json().catch(() => ({}))) as ChantierEstimateResult & { error?: string };
      if (!response.ok) {
        setError(data.error ?? "Impossible d'analyser la prestation pour le moment.");
        return;
      }
      setResult(data);
    } catch {
      setError("Impossible de contacter le serveur d'analyse. Réessayez dans quelques instants.");
    } finally {
      setLoading(false);
    }
  }

  async function copyEstimate() {
    if (!result) return;
    await navigator.clipboard.writeText(formatEstimate(result));
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  }

  async function downloadPdf() {
    if (!result) return;
    const { jsPDF } = await import("jspdf");
    const doc = new jsPDF();
    const margin = 16;
    const width = doc.internal.pageSize.getWidth();
    let y = 20;

    doc.setFillColor(15, 23, 42);
    doc.roundedRect(margin, y, width - margin * 2, 30, 4, 4, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.text("AdminFacile Pro", margin + 8, y + 12);
    doc.setFontSize(10);
    doc.text("Estimation de prestation indicative", margin + 8, y + 22);
    y += 46;

    writeTitle(doc, "Estimation globale", margin, y);
    y += 9;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.setTextColor(37, 99, 235);
    doc.text(result.estimation, margin, y);
    y += 14;

    y = writeBlock(doc, "Adaptation métier", result.businessContext, margin, y, width);
    y = writeBlock(doc, "Résumé professionnel", result.summary, margin, y, width);
    y = writeList(doc, "Pourquoi ce prix", result.whyThisPrice, margin, y, width);
    y = writeBlock(doc, "Positionnement marché France", result.marketPosition, margin, y, width);
    y = writeList(doc, "Conseils professionnels", result.professionalAdvice, margin, y, width);

    doc.save("adminfacile-estimation-prestation.pdf");
  }

  function createQuote() {
    if (!result) return;
    sessionStorage.setItem(
      "adminfacile:pro-quote",
      JSON.stringify({
        service: result.quoteService,
        unitPrice: String(Math.round((result.priceMin + result.priceMax) / 2)),
        details: result.quoteDetails,
        clientName: "Client",
        unit: "forfait"
      })
    );
    window.location.href = "/dashboard/pro";
  }

  return (
    <div className="space-y-8">
      <section className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <p className="text-sm font-semibold uppercase text-blue-600">Analyse professionnelle</p>
          <h2 className="mt-1 text-2xl font-semibold tracking-tight text-slate-950">Informations de prestation</h2>
          <p className="mt-2 leading-7 text-slate-600">
            Décrivez une mission, une intervention ou un projet client. Les photos, dimensions, temps et fournitures restent optionnels.
          </p>
          <p className="mt-3 rounded-2xl bg-blue-50 px-4 py-3 text-sm font-semibold text-blue-900">
            Profil appliqué : {getProfileDisplayName(profile)} - {getProfileBusinessLabel(profile)}.
          </p>

          <div className="mt-6 space-y-5">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block space-y-2 text-sm font-semibold text-slate-800">
                Métier ou activité
                <input
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-950 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  onChange={(event) => setBusinessActivity(event.target.value)}
                  placeholder="Ex : plaquiste, consultant RH, nettoyage, développeur web"
                  value={businessActivity}
                />
              </label>
              <label className="block space-y-2 text-sm font-semibold text-slate-800">
                Type de prestation
                <input
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-950 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  onChange={(event) => setServiceType(event.target.value)}
                  placeholder="Ex : intervention, mission, livraison, conseil, travaux"
                  value={serviceType}
                />
              </label>
            </div>

            <label className="block space-y-2 text-sm font-semibold text-slate-800">
              Photos optionnelles
              <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-5">
                <input accept="image/*" multiple onChange={(event) => onImagesChange(event.target.files)} type="file" />
                <div className="mt-3 flex items-center gap-2 text-sm text-slate-600">
                  <ImageUp className="h-4 w-4" />
                  {images.length ? `${images.length} photo(s) ajoutée(s)` : "Utile pour évaluer l'état, le volume, l'accès ou les contraintes visibles."}
                </div>
              </div>
            </label>

            <label className="block space-y-2 text-sm font-semibold text-slate-800">
              Description libre
              <textarea
                className="min-h-36 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-950 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                onChange={(event) => setDescription(event.target.value)}
                placeholder="Ex : mission de conseil de 3 jours avec audit, livrables et restitution ; nettoyage de bureaux de 120 m² ; pose de cloisons ; intervention de dépannage urgente."
                value={description}
              />
            </label>

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block space-y-2 text-sm font-semibold text-slate-800">
                Dimensions ou quantités
                <input
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-950 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  onChange={(event) => setDimensions(event.target.value)}
                  placeholder="Surface, mètres linéaires, unités, volume, livrables..."
                  value={dimensions}
                />
              </label>
              <label className="block space-y-2 text-sm font-semibold text-slate-800">
                Temps estimé
                <input
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-950 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  onChange={(event) => setEstimatedTimeInput(event.target.value)}
                  placeholder="Ex : 4 h, 2 jours, 3 semaines"
                  value={estimatedTimeInput}
                />
              </label>
              <label className="block space-y-2 text-sm font-semibold text-slate-800">
                Matériel, produits ou livrables
                <input
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-950 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  onChange={(event) => setMaterials(event.target.value)}
                  placeholder="Fournitures, produits, outils, sous-traitance, livrables..."
                  value={materials}
                />
              </label>
              <label className="block space-y-2 text-sm font-semibold text-slate-800">
                Déplacement
                <input
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-950 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  onChange={(event) => setTravelDistance(event.target.value)}
                  placeholder="Ex : 18 km aller, intervention sur site, à distance"
                  value={travelDistance}
                />
              </label>
            </div>

            <div>
              <p className="text-sm font-semibold text-slate-800">Catégories indicatives</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {serviceCategories.map((service) => (
                  <button
                    className={[
                      "min-h-11 rounded-full border px-4 text-sm font-semibold transition",
                      selectedServices.includes(service)
                        ? "border-slate-950 bg-slate-950 text-white"
                        : "border-slate-200 bg-white text-slate-700 hover:border-slate-400"
                    ].join(" ")}
                    key={service}
                    onClick={() => toggleService(service)}
                    type="button"
                  >
                    {service}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {error ? <p className="mt-5 rounded-2xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700">{error}</p> : null}
          <Button className="mt-6 w-full" disabled={loading} onClick={analyze} type="button">
            <Sparkles className={loading ? "h-4 w-4 animate-spin" : "h-4 w-4"} />
            {loading ? "Analyse en cours..." : "Analyser la prestation"}
          </Button>
        </div>

        <ResultPanel
          copied={copied}
          emailLinks={emailLinks}
          onCopy={copyEstimate}
          onDownload={downloadPdf}
          onQuote={createQuote}
          result={result}
        />
      </section>
    </div>
  );
}

function ResultPanel({
  result,
  copied,
  emailLinks,
  onCopy,
  onDownload,
  onQuote
}: {
  result: ChantierEstimateResult | null;
  copied: boolean;
  emailLinks: { gmailUrl: string; mailtoUrl: string };
  onCopy: () => void;
  onDownload: () => void;
  onQuote: () => void;
}) {
  if (!result) {
    return (
      <section className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <p className="text-sm font-semibold uppercase text-blue-600">Résultat</p>
        <h2 className="mt-1 text-2xl font-semibold tracking-tight text-slate-950">Estimation de prestation</h2>
        <div className="mt-5 rounded-3xl bg-slate-50 p-6 leading-7 text-slate-600 ring-1 ring-slate-100">
          L'estimation s'affichera ici avec un prix conseillé, une justification professionnelle, un récapitulatif et des conseils de rentabilité adaptés au métier.
        </div>
      </section>
    );
  }

  return (
    <section className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <p className="text-sm font-semibold uppercase text-blue-600">Résultat professionnel</p>
      <h2 className="mt-1 text-2xl font-semibold tracking-tight text-slate-950">{result.title}</h2>
      <div className="mt-5 rounded-3xl bg-slate-950 p-5 text-white">
        <p className="text-sm font-semibold text-blue-200">Estimation conseillée</p>
        <p className="mt-2 text-3xl font-semibold tracking-tight">{result.estimation}</p>
        <p className="mt-3 leading-7 text-slate-300">{result.summary}</p>
      </div>

      <div className="mt-5 rounded-3xl border border-blue-100 bg-blue-50 p-4 text-sm leading-6 text-blue-950">
        <p className="font-semibold">Adaptation métier</p>
        <p className="mt-1">{result.businessContext}</p>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
        {["Main d'œuvre", "Déplacement", "Difficulté", "Équipement", "Temps estimé"].map((badge) => (
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3 text-sm font-semibold text-slate-700" key={badge}>
            {badge === "Difficulté" ? `${badge}: ${result.difficulty}` : badge === "Temps estimé" ? result.estimatedTime : badge}
          </div>
        ))}
      </div>

      <div className="mt-6 overflow-x-auto rounded-3xl border border-slate-200">
        <table className="w-full min-w-[560px] text-sm">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="px-4 py-3 text-left">Poste</th>
              <th className="px-4 py-3 text-left">Détail</th>
              <th className="px-4 py-3 text-right">Montant</th>
            </tr>
          </thead>
          <tbody>
            {result.recapRows.map((row) => (
              <tr className="border-b border-slate-200 last:border-0" key={`${row.label}-${row.amount}`}>
                <td className="px-4 py-3 font-semibold text-slate-950">{row.label}</td>
                <td className="px-4 py-3 text-slate-600">{row.detail}</td>
                <td className="px-4 py-3 text-right font-semibold text-slate-950">{row.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Section title="Pourquoi ce prix" items={result.whyThisPrice} />
      <Section title="Conseils professionnels" items={result.professionalAdvice} />
      <div className="mt-5 rounded-3xl border border-slate-200 bg-slate-50 p-5">
        <p className="text-sm font-semibold uppercase text-slate-500">Marché France</p>
        <p className="mt-2 leading-7 text-slate-700">{result.marketPosition}</p>
        <p className="mt-4 text-sm font-semibold text-blue-700">Rentabilité estimée : {result.profitability}</p>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <Button className="w-full" onClick={onCopy} type="button" variant="outline">
          {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          {copied ? "Estimation copiée" : "Copier l'estimation"}
        </Button>
        <Button className="w-full" onClick={onDownload} type="button">
          <Download className="h-4 w-4" />
          Télécharger le PDF
        </Button>
        <a className="focus-ring inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-900 transition hover:border-slate-400 hover:bg-slate-50" href={emailLinks.mailtoUrl}>
          <Mail className="h-4 w-4" />
          Préparer l'email client
        </a>
        <a className="focus-ring inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full bg-slate-950 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800" href={emailLinks.gmailUrl} rel="noopener noreferrer" target="_blank">
          <ExternalLink className="h-4 w-4" />
          Gmail
        </a>
        <Button className="w-full sm:col-span-2" onClick={onQuote} type="button" variant="secondary">
          Créer un devis à partir de cette estimation
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </section>
  );
}

function Section({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="mt-5 rounded-3xl border border-slate-200 bg-white p-5">
      <h3 className="font-semibold text-slate-950">{title}</h3>
      <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-700">
        {items.map((item) => (
          <li className="flex gap-2" key={item}>
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-600" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function readFileAsDataUrl(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function formatEstimate(result: ChantierEstimateResult) {
  return `${result.title}

${result.estimation}

Adaptation métier :
${result.businessContext}

Résumé :
${result.summary}

Pourquoi ce prix :
${result.whyThisPrice.map((item) => `- ${item}`).join("\n")}

Positionnement marché :
${result.marketPosition}

Conseils :
${result.professionalAdvice.map((item) => `- ${item}`).join("\n")}`;
}

function writeTitle(doc: jsPDF, title: string, margin: number, y: number) {
  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.setTextColor(15, 23, 42);
  doc.text(title, margin, y);
}

function writeBlock(doc: jsPDF, title: string, text: string, margin: number, y: number, width: number) {
  writeTitle(doc, title, margin, y);
  y += 8;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(51, 65, 85);
  const lines = doc.splitTextToSize(text, width - margin * 2);
  doc.text(lines, margin, y);
  return y + lines.length * 5 + 8;
}

function writeList(doc: jsPDF, title: string, items: string[], margin: number, y: number, width: number) {
  writeTitle(doc, title, margin, y);
  y += 8;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(51, 65, 85);
  items.forEach((item) => {
    const lines = doc.splitTextToSize(`- ${item}`, width - margin * 2);
    doc.text(lines, margin, y);
    y += lines.length * 5 + 2;
  });
  return y + 6;
}
