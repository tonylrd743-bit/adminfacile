import { NextResponse } from "next/server";
import { zodTextFormat } from "openai/helpers/zod";
import { z } from "zod";
import { getOpenAI } from "@/lib/openai";
import { getProcedureById, isProcedureId } from "@/lib/procedures";
import { createClient } from "@/lib/supabase/server";
import type { AiResult } from "@/types/adminfacile";
import type { Json } from "@/types/database";

export const runtime = "nodejs";

const OPENAI_TIMEOUT_MS = 35_000;

const requestSchema = z.object({
  firstName: z.string().trim().min(1),
  lastName: z.string().trim().min(1),
  email: z.string().trim().email(),
  familyStatus: z.string().trim().optional().default(""),
  childrenCount: z.coerce.number().min(0),
  housing: z.string().trim().optional().default(""),
  employmentStatus: z.string().trim().optional().default(""),
  estimatedMonthlyIncome: z.coerce.number().min(0),
  requestedAid: z.string().trim().min(1),
  issue: z.string().trim().min(1),
  availableDocuments: z.string().trim().min(1),
  dynamicFields: z.record(z.string(), z.union([z.string(), z.number()])).optional().default({}),
  consent: z.literal(true)
});

const aiResultSchema = z.object({
  titre: z.string().min(1),
  resume: z.string().min(1),
  checklist: z.array(z.string().min(1)).min(1),
  lettre: z.string().min(1),
  etapes: z.array(z.string().min(1)).min(1),
  documentsNecessaires: z.array(z.string().min(1)).min(1),
  avertissementFinal: z.string().min(1)
});

const openAIResultFormatSchema = z.object({
  titre: z.string(),
  resume: z.string(),
  checklist: z.array(z.string()),
  lettre: z.string(),
  etapes: z.array(z.string()),
  documentsNecessaires: z.array(z.string()),
  avertissementFinal: z.string()
});

const systemPrompt = `Tu es AdminFacile, un assistant administratif francais premium.
Tu aides des particuliers, independants et entrepreneurs a preparer des dossiers administratifs serieux, clairs et directement exploitables.

Posture attendue :
- ecriture professionnelle, humaine et rassurante, jamais robotique
- niveau de qualite proche d'un cabinet administratif, d'une fiduciaire moderne ou d'un conseiller administratif experimente
- style francais credible : factuel, courtois, precis, structure
- aucune promesse d'acceptation, aucun conseil juridique, fiscal ou medical personnalise
- aucune reponse courte ou generique : chaque section doit etre utile, contextualisee et actionnable

Chaque dossier doit automatiquement ameliorer le texte utilisateur :
- reformuler les formulations maladroites
- structurer les faits
- clarifier la demande
- suggerer les pieces utiles
- creer une lettre prete a copier avec objet, contexte, demande, pieces jointes et formule de politesse

Tu reponds uniquement en JSON conforme au schema demande.`;

export async function POST(request: Request) {
  const supabase = await createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Authentification requise." }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Requête invalide." }, { status: 400 });
  }

  const parsed = requestSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Formulaire incomplet ou invalide." }, { status: 400 });
  }

  const receivedRequestType = parsed.data.requestedAid;
  if (!isProcedureId(receivedRequestType)) {
    return NextResponse.json(
      {
        error: `Démarche inconnue: "${receivedRequestType}". Merci de choisir une démarche proposée.`
      },
      { status: 400 }
    );
  }

  const procedure = getProcedureById(receivedRequestType)!;
  const requestType = procedure.id;

  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json(
      { error: "OpenAI n'est pas configuré. Ajoutez OPENAI_API_KEY dans .env.local." },
      { status: 503 }
    );
  }

  const formData = parsed.data;
  const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single();
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), OPENAI_TIMEOUT_MS);

  let aiResult: AiResult;
  try {
    const response = await getOpenAI().responses.create(
      {
        model: process.env.OPENAI_MODEL ?? "gpt-4.1-mini",
        input: [
          { role: "system", content: systemPrompt },
          {
            role: "user",
            content: buildUserPrompt(formData, procedure, profile)
          }
        ],
        text: {
          format: zodTextFormat(openAIResultFormatSchema, "adminfacile_dossier")
        }
      },
      { signal: controller.signal }
    );

    const parsedResult = aiResultSchema.safeParse(JSON.parse(response.output_text));
    if (!parsedResult.success) {
      return NextResponse.json(
        { error: "OpenAI a répondu, mais le format du dossier est invalide. Veuillez réessayer." },
        { status: 502 }
      );
    }

    aiResult = parsedResult.data;
  } catch (error) {
    return handleOpenAIError(error);
  } finally {
    clearTimeout(timeout);
  }

  console.error("REQUEST_TYPE_INSERTED", requestType);

  const { data, error } = await supabase
    .from("requests")
    .insert({
      user_id: user.id,
      request_type: requestType,
      form_data: formData as unknown as Json,
      ai_result: aiResult as unknown as Json,
      status: "generated"
    })
    .select("id")
    .single();

  if (error || !data) {
    if (error && isRequestTypeConstraintError(error)) {
      return NextResponse.json(
        {
          error:
            "Cette démarche n'est pas encore autorisée dans Supabase. Exécutez la migration SQL du CHECK requests_request_type_check."
        },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { error: "Erreur Supabase pendant l'enregistrement du dossier. Vérifiez le schéma SQL et les policies RLS." },
      { status: 500 }
    );
  }

  return NextResponse.json({ id: data.id });
}

function isRequestTypeConstraintError(error: { code?: string; message?: string; details?: string | null }) {
  const text = `${error.message ?? ""} ${error.details ?? ""}`;
  return error.code === "23514" && text.includes("requests_request_type_check");
}

function buildUserPrompt(
  formData: z.infer<typeof requestSchema>,
  procedure: NonNullable<ReturnType<typeof getProcedureById>>,
  profile: unknown
) {
  const tone = getToneGuidance(procedure);

  return `À partir des informations fournies, génère un dossier administratif premium, clair, prudent et directement exploitable.

Démarche sélectionnée :
- Intitulé : ${procedure.label}
- Catégorie : ${procedure.category}
- Organisme ou destinataire probable : ${procedure.targetOrganization}
- Consignes spécialisées : ${procedure.promptFocus}
- Ton et posture : ${tone}

Exigences de qualité :
- le titre doit être précis et professionnel
- le résumé doit expliquer la situation en 4 à 6 phrases, avec les points importants et le besoin principal
- la checklist doit contenir des actions concrètes, ordonnées et non génériques
- la lettre doit être une vraie lettre administrative française : objet clair, formule d'appel, contexte, demande formulée correctement, pièces jointes mentionnées, demande de retour, formule de politesse
- les étapes doivent expliquer quoi faire maintenant, dans quel ordre, et quoi vérifier
- les documents nécessaires doivent être adaptés à la situation, pas une liste vague
- l'avertissement final doit être prudent, court et utile

Règles :
- ne promets jamais l'acceptation d'un dossier
- ne donne pas de conseil juridique
- conseille de vérifier les informations sur les sites officiels
- ne cite pas de loi précise si l'utilisateur ne l'a pas fournie
- évite les phrases creuses ou trop génériques
- enrichis la demande sans inventer de faits, en signalant les informations à compléter entre crochets si nécessaire
- si le texte utilisateur contient des parenthèses à compléter, conserve-les ou transforme-les en champs clairement visibles
- si le profil professionnel contient un métier, une entreprise, un SIRET ou des coordonnées, les utiliser pour personnaliser la signature, le contexte et les formulations
- pour un plaquiste, parler matériaux, m², main-d'œuvre et chantier seulement si c'est pertinent ; pour un consultant, parler mission, livrables, temps et valeur ; pour le nettoyage, parler surface, accès, produits et durée

Profil utilisateur enregistré :
${JSON.stringify(profile, null, 2)}

Informations utilisateur :
${JSON.stringify(formData, null, 2)}`;
}

function getToneGuidance(procedure: NonNullable<ReturnType<typeof getProcedureById>>) {
  const text = `${procedure.id} ${procedure.label} ${procedure.category} ${procedure.targetOrganization}`.toLowerCase();

  if (text.includes("caf") || text.includes("rsa") || text.includes("logement") || text.includes("aide")) {
    return "ton social et administratif : clair, empathique, factuel, rassurant, avec attention aux justificatifs et à la situation du foyer";
  }
  if (text.includes("france travail") || text.includes("chômage") || text.includes("chomage")) {
    return "ton précis et professionnel : dates, situation d'emploi, demandes claires, relance courtoise et pièces liées au parcours professionnel";
  }
  if (text.includes("urssaf") || text.includes("indépendant") || text.includes("independant") || text.includes("micro")) {
    return "ton business premium : factuel, structuré, orienté échéances, cotisations, activité, régularisation et suivi administratif";
  }
  if (text.includes("employeur") || text.includes("travail")) {
    return "ton RH : professionnel, sobre, respectueux, avec formulation claire de la demande et conservation d'une relation constructive";
  }
  if (text.includes("propriétaire") || text.includes("proprietaire") || text.includes("bailleur")) {
    return "ton formel : factuel, courtois, précis sur le logement, les dates, les constats et les pièces jointes";
  }
  if (text.includes("banque") || text.includes("client") || text.includes("facture")) {
    return "ton business premium : concis, ferme sans agressivité, orienté résolution, trace écrite et suivi";
  }

  return "ton administratif premium : clair, structuré, prudent, professionnel et directement exploitable";
}

function handleOpenAIError(error: unknown) {
  if (error instanceof Error && error.name === "AbortError") {
    return NextResponse.json(
      { error: "La génération a pris trop de temps. Veuillez réessayer dans quelques instants." },
      { status: 504 }
    );
  }

  const status = typeof error === "object" && error !== null && "status" in error ? Number(error.status) : undefined;
  if (status === 401) {
    return NextResponse.json({ error: "Clé OpenAI invalide. Vérifiez OPENAI_API_KEY." }, { status: 503 });
  }
  if (status === 429) {
    return NextResponse.json(
      { error: "OpenAI est temporairement limité ou votre quota est atteint. Réessayez plus tard." },
      { status: 429 }
    );
  }
  if (status && status >= 500) {
    return NextResponse.json(
      { error: "OpenAI est temporairement indisponible. Veuillez réessayer dans quelques minutes." },
      { status: 503 }
    );
  }

  return NextResponse.json(
    { error: "Impossible de générer le dossier pour le moment. Veuillez réessayer." },
    { status: 502 }
  );
}
