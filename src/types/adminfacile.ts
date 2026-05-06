import type { ProcedureId } from "@/lib/procedures";

export type RequestFormData = {
  firstName: string;
  lastName: string;
  email: string;
  familyStatus: string;
  childrenCount: number;
  housing: string;
  employmentStatus: string;
  estimatedMonthlyIncome: number;
  requestedAid: ProcedureId | "CAF" | "RSA" | "Prime d'activite";
  issue: string;
  availableDocuments: string;
  dynamicFields?: Record<string, string | number>;
  consent: boolean;
};

export type AiResult = {
  titre: string;
  resume: string;
  checklist: string[];
  lettre: string;
  etapes: string[];
  documentsNecessaires: string[];
  avertissementFinal: string;
};
