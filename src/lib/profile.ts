import type { Database } from "@/types/database";

export type ProfessionalProfile = Database["public"]["Tables"]["profiles"]["Row"];

export function getProfileDisplayName(profile: Partial<ProfessionalProfile> | null | undefined) {
  const fullName = [profile?.first_name, profile?.last_name].filter(Boolean).join(" ").trim();
  return profile?.company_name || fullName || "Votre activité";
}

export function getProfileBusinessLabel(profile: Partial<ProfessionalProfile> | null | undefined) {
  return [profile?.profession, profile?.activity, profile?.specialty].filter(Boolean).join(" - ") || "Activité professionnelle";
}

export function getProfileSignature(profile: Partial<ProfessionalProfile> | null | undefined) {
  const lines = [
    getProfileDisplayName(profile),
    getProfileBusinessLabel(profile),
    profile?.professional_email || profile?.email,
    profile?.phone,
    profile?.siret ? `SIRET : ${profile.siret}` : null
  ].filter(Boolean);

  return lines.join("\n");
}

export function getProfileVatMention(profile: Partial<ProfessionalProfile> | null | undefined) {
  if (profile?.vat_applicable) {
    return "TVA applicable selon le taux indiqué sur le document.";
  }
  return "TVA non applicable ou exonération à vérifier selon votre statut. Micro-entrepreneur : article 293 B du CGI si applicable.";
}

export function numberOrNull(value: FormDataEntryValue | null) {
  const parsed = Number(String(value ?? "").replace(",", "."));
  return Number.isFinite(parsed) && String(value ?? "").trim() !== "" ? parsed : null;
}

export function stringOrNull(value: FormDataEntryValue | null) {
  const text = String(value ?? "").trim();
  return text.length > 0 ? text : null;
}
