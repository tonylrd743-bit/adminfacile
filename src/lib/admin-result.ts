import type { AiResult } from "@/types/adminfacile";

export const emptyAiResult: AiResult = {
  titre: "Dossier administratif",
  resume: "",
  checklist: [],
  lettre: "",
  etapes: [],
  documentsNecessaires: [],
  avertissementFinal:
    "AdminFacile est un assistant administratif independant et ne remplace pas un organisme officiel ou un conseil juridique."
};

export function normalizeAiResult(value: unknown): AiResult {
  const source = typeof value === "object" && value !== null ? (value as Record<string, unknown>) : {};
  return {
    titre: stringValue(source.titre, emptyAiResult.titre),
    resume: stringValue(source.resume, emptyAiResult.resume),
    checklist: stringArray(source.checklist),
    lettre: stringValue(source.lettre, emptyAiResult.lettre),
    etapes: stringArray(source.etapes),
    documentsNecessaires: stringArray(source.documentsNecessaires),
    avertissementFinal: stringValue(source.avertissementFinal, emptyAiResult.avertissementFinal)
  };
}

function stringValue(value: unknown, fallback: string) {
  return typeof value === "string" ? value : fallback;
}

function stringArray(value: unknown) {
  return Array.isArray(value) ? value.filter((item): item is string => typeof item === "string") : [];
}
