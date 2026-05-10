"use client";

import { useMemo, useState } from "react";
import type { ReactNode } from "react";
import { useRouter } from "next/navigation";
import {
  BadgeEuro,
  BriefcaseBusiness,
  Building2,
  CarFront,
  CheckCircle2,
  FileX2,
  HandCoins,
  HeartHandshake,
  House,
  KeyRound,
  Landmark,
  Loader2,
  ReceiptText,
  Scale,
  ShieldPlus,
  Sparkles,
  Store,
  UserRoundSearch
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Button } from "@/components/button";
import { findPopularRequestTemplate } from "@/data/popular-requests";
import { getProcedureCategories, procedures } from "@/lib/procedures";
import type { ProcedureField } from "@/lib/procedures";

const CLIENT_TIMEOUT_MS = 45_000;

const inputClass =
  "w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-950 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100";

const steps = ["Identité", "Démarche", "Situation", "Validation"];

const iconMap: Record<string, LucideIcon> = {
  BadgeEuro,
  BriefcaseBusiness,
  Building2,
  CarFront,
  FileX2,
  HandCoins,
  HeartHandshake,
  House,
  KeyRound,
  Landmark,
  ReceiptText,
  Scale,
  ShieldPlus,
  Store,
  UserRoundSearch
};

type InitialFormState = {
  selectedProcedureId: string;
  issueValue: string;
  availableDocumentsValue: string;
  appliedTemplateTitle: string | null;
};

export function RequestForm({ email, initialTemplateId }: { email: string; initialTemplateId?: string }) {
  const router = useRouter();
  const categories = useMemo(() => getProcedureCategories(), []);
  const [initialState] = useState<InitialFormState>(() => getInitialFormState(initialTemplateId));
  const [selectedProcedureId, setSelectedProcedureId] = useState<string>(initialState.selectedProcedureId);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [issueValue, setIssueValue] = useState(initialState.issueValue);
  const [availableDocumentsValue, setAvailableDocumentsValue] = useState(initialState.availableDocumentsValue);
  const [appliedTemplateTitle] = useState<string | null>(initialState.appliedTemplateTitle);

  const selectedProcedure = procedures.find((procedure) => procedure.id === selectedProcedureId) ?? procedures[0];

  async function onSubmit(formData: FormData) {
    setLoading(true);
    setError(null);

    const dynamicFields = Object.fromEntries(
      selectedProcedure.fields.map((field) => [field.name, normalizeFormValue(formData.get(field.name), field.type)])
    );

    const payload = {
      firstName: String(formData.get("firstName") ?? ""),
      lastName: String(formData.get("lastName") ?? ""),
      email: String(formData.get("email") ?? ""),
      familyStatus: String(formData.get("familyStatus") ?? dynamicFields.familyStatus ?? ""),
      childrenCount: Number(formData.get("childrenCount") ?? dynamicFields.childrenCount ?? 0),
      housing: String(formData.get("housing") ?? dynamicFields.housing ?? ""),
      employmentStatus: String(formData.get("employmentStatus") ?? dynamicFields.employmentStatus ?? ""),
      estimatedMonthlyIncome: Number(formData.get("estimatedMonthlyIncome") ?? dynamicFields.estimatedMonthlyIncome ?? 0),
      requestedAid: selectedProcedure.id,
      issue: String(formData.get("issue") ?? ""),
      availableDocuments: String(formData.get("availableDocuments") ?? ""),
      dynamicFields,
      consent: formData.get("consent") === "on"
    };

    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), CLIENT_TIMEOUT_MS);

    try {
      const response = await fetch("/api/requests/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        signal: controller.signal
      });

      const data = (await response.json().catch(() => ({}))) as { id?: string; error?: string };

      if (!response.ok || !data.id) {
        setError(data.error ?? "OpenAI est indisponible pour le moment. Réessayez dans quelques minutes.");
        return;
      }

      router.push(`/dashboard/requests/${data.id}`);
    } catch (requestError) {
      if (requestError instanceof DOMException && requestError.name === "AbortError") {
        setError("La génération prend trop de temps. Vérifiez votre connexion puis réessayez.");
        return;
      }
      setError("Impossible de contacter le serveur de génération. Réessayez dans quelques instants.");
    } finally {
      window.clearTimeout(timeout);
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      {appliedTemplateTitle ? (
        <p className="rounded-2xl bg-blue-50 px-4 py-3 text-sm font-medium text-blue-800">
          Modèle appliqué, complétez les informations entre parenthèses. ({appliedTemplateTitle})
        </p>
      ) : null}
      <form action={onSubmit} className="min-w-0 overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200 bg-slate-50 p-4 sm:p-6">
        <div className="grid gap-3 sm:grid-cols-4">
          {steps.map((step, index) => (
            <div className="flex items-center gap-3 rounded-2xl bg-white p-3 ring-1 ring-slate-200" key={step}>
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-600 text-sm font-semibold text-white">
                {index + 1}
              </span>
              <span className="text-sm font-semibold text-slate-700">{step}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-8 p-4 sm:p-8">
        <FormSection
          eyebrow="Étape 1"
          text="Ces informations servent à personnaliser le résumé et la lettre générée."
          title="Vos informations"
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <Field help="Votre prénom tel que vous souhaitez le voir dans le dossier." label="Prénom" name="firstName" required />
            <Field help="Votre nom de famille." label="Nom" name="lastName" required />
          </div>
          <Field defaultValue={email} help="Utilisé pour rattacher la démarche à votre espace." label="Email" name="email" required type="email" />
        </FormSection>

        <FormSection
          eyebrow="Étape 2"
          text="Choisissez la démarche à préparer. Les questions suivantes s'adaptent automatiquement."
          title="Votre démarche"
        >
          <div className="space-y-6">
            {categories.map((category) => (
              <div key={category}>
                <h3 className="text-sm font-semibold uppercase text-slate-500">{category}</h3>
                <div className="mt-3 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                  {procedures
                    .filter((procedure) => procedure.category === category)
                    .map((procedure) => {
                      const Icon = iconMap[procedure.icon] ?? HeartHandshake;
                      const selected = procedure.id === selectedProcedureId;
                      return (
                        <label
                          className={[
                            "min-w-0 cursor-pointer rounded-3xl border p-4 transition",
                            selected
                              ? "border-blue-600 bg-blue-50 ring-4 ring-blue-100"
                              : "border-slate-200 bg-white hover:border-blue-200 hover:bg-slate-50"
                          ].join(" ")}
                          key={procedure.id}
                        >
                          <input
                            checked={selected}
                            className="sr-only"
                            name="requestedAid"
                            onChange={() => setSelectedProcedureId(procedure.id)}
                            type="radio"
                            value={procedure.id}
                          />
                          <span className="flex min-w-0 items-start gap-3">
                            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-slate-950 text-white">
                              <Icon className="h-5 w-5" />
                            </span>
                            <span className="min-w-0">
                              <span className="block font-semibold text-slate-950">{procedure.label}</span>
                              <span className="mt-1 block text-sm leading-6 text-slate-600">{procedure.description}</span>
                            </span>
                          </span>
                        </label>
                      );
                    })}
                </div>
              </div>
            ))}
          </div>
        </FormSection>

        <FormSection
          eyebrow="Étape 3"
          text={`Questions adaptées pour : ${selectedProcedure.label}.`}
          title="Votre situation"
        >
          <div className="rounded-3xl border border-blue-100 bg-blue-50 p-5">
            <p className="text-sm font-semibold text-blue-700">Organisme ou destinataire probable</p>
            <p className="mt-1 text-slate-800">{selectedProcedure.targetOrganization}</p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            {selectedProcedure.fields.map((field) => (
              <DynamicField field={field} key={field.name} />
            ))}
          </div>
          <TextArea
            help="Décrivez le blocage, votre objectif ou la demande à formuler."
            label="Problème rencontré ou demande principale"
            name="issue"
            onChange={setIssueValue}
            required
            value={issueValue}
          />
          <TextArea
            help="Exemple : avis d'imposition, bulletins de salaire, bail, attestation, RIB, courrier reçu."
            label="Documents déjà disponibles"
            name="availableDocuments"
            onChange={setAvailableDocumentsValue}
            required
            value={availableDocumentsValue}
          />
        </FormSection>

        <FormSection eyebrow="Étape 4" text="Cette confirmation est obligatoire avant toute génération." title="Validation">
          <label className="flex gap-3 rounded-3xl border border-blue-100 bg-blue-50 p-5 text-sm leading-6 text-slate-700">
            <input className="mt-1 h-4 w-4 accent-blue-600" name="consent" required type="checkbox" />
            <span>
              Je comprends qu'AdminFacile est un assistant administratif indépendant et ne remplace pas la CAF, France
              Travail, un avocat ou un conseiller juridique.
            </span>
          </label>
          <div className="flex items-center gap-2 text-sm font-medium text-slate-500">
            <CheckCircle2 className="h-4 w-4 text-blue-600" />
            La clé OpenAI reste côté serveur et n'est jamais envoyée au navigateur.
          </div>
        </FormSection>

        {error ? <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p> : null}
        {loading ? (
          <div className="rounded-3xl border border-blue-100 bg-blue-50 p-5 text-sm leading-6 text-slate-700">
            <div className="flex items-center gap-3 font-semibold text-slate-950">
              <Loader2 className="h-5 w-5 animate-spin text-blue-700" />
              Génération du dossier en cours
            </div>
            <p className="mt-2">L'assistant prépare le résumé, la checklist, la lettre, les documents et les étapes.</p>
          </div>
        ) : null}
        <Button className="w-full sm:w-auto" disabled={loading} type="submit">
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
          {loading ? "Génération en cours..." : "Générer mon dossier"}
        </Button>
      </div>
      </form>
    </div>
  );
}

function FormSection({
  eyebrow,
  title,
  text,
  children
}: {
  eyebrow: string;
  title: string;
  text: string;
  children: ReactNode;
}) {
  return (
    <section className="space-y-5">
      <div>
        <p className="text-sm font-semibold uppercase text-blue-600">{eyebrow}</p>
        <h2 className="mt-1 text-2xl font-semibold tracking-tight text-slate-950">{title}</h2>
        <p className="mt-2 leading-7 text-slate-600">{text}</p>
      </div>
      <div className="space-y-5">{children}</div>
    </section>
  );
}

function DynamicField({ field }: { field: ProcedureField }) {
  if (field.type === "textarea") {
    return <TextArea help={field.help} label={field.label} name={field.name} required={field.required} />;
  }

  if (field.type === "select") {
    return (
      <Select help={field.help} label={field.label} name={field.name} options={field.options ?? []} required={field.required} />
    );
  }

  return <Field help={field.help} label={field.label} min={field.type === "number" ? 0 : undefined} name={field.name} required={field.required} type={field.type} />;
}

function Field({
  label,
  help,
  name,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { label: string; help: string; name: string }) {
  return (
    <label className="block space-y-2 text-sm font-semibold text-slate-800">
      {label}
      <input className={inputClass} name={name} {...props} />
      <span className="block text-sm font-normal leading-6 text-slate-500">{help}</span>
    </label>
  );
}

function Select({
  label,
  help,
  name,
  options,
  required
}: {
  label: string;
  help: string;
  name: string;
  options: string[];
  required?: boolean;
}) {
  return (
    <label className="block space-y-2 text-sm font-semibold text-slate-800">
      {label}
      <select className={inputClass} name={name} required={required}>
        <option value="">Sélectionner</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <span className="block text-sm font-normal leading-6 text-slate-500">{help}</span>
    </label>
  );
}

function TextArea({
  label,
  help,
  name,
  required,
  value,
  onChange
}: {
  label: string;
  help: string;
  name: string;
  required?: boolean;
  value?: string;
  onChange?: (value: string) => void;
}) {
  return (
    <label className="block space-y-2 text-sm font-semibold text-slate-800 sm:col-span-2">
      {label}
      <textarea
        className={`${inputClass} min-h-36`}
        name={name}
        onChange={onChange ? (event) => onChange(event.target.value) : undefined}
        required={required}
        value={value}
      />
      <span className="block text-sm font-normal leading-6 text-slate-500">{help}</span>
    </label>
  );
}

function normalizeFormValue(value: FormDataEntryValue | null, type: ProcedureField["type"]) {
  if (type === "number") {
    return Number(value ?? 0);
  }
  return String(value ?? "");
}

function getInitialFormState(initialTemplateId?: string): InitialFormState {
  const template = getInitialTemplate(initialTemplateId);

  return {
    selectedProcedureId: template?.requestType ?? procedures[0].id,
    issueValue: template?.promptTemplate ?? "",
    availableDocumentsValue: template?.requiredDocuments.join("\n") ?? "",
    appliedTemplateTitle: template?.title ?? null
  };
}

function getInitialTemplate(initialTemplateId?: string) {
  const urlTemplate = findPopularRequestTemplate(initialTemplateId);
  if (urlTemplate) return urlTemplate;

  if (typeof window === "undefined") return undefined;

  const storedTemplateId = sessionStorage.getItem("adminfacile:selected-template");
  const storedTemplate = findPopularRequestTemplate(storedTemplateId);
  if (storedTemplate) {
    sessionStorage.removeItem("adminfacile:selected-template");
  }
  return storedTemplate;
}
