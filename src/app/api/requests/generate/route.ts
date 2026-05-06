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

const systemPrompt =
  "Tu es un assistant administratif français. Tu aides les utilisateurs à préparer leurs démarches administratives. Tu ne donnes pas de conseil juridique. Tu dois rester clair, prudent, structuré et pédagogique. Tu réponds uniquement en JSON conforme au schéma demandé.";

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

  if (!isProcedureId(parsed.data.requestedAid)) {
    return NextResponse.json({ error: "Démarche inconnue. Merci de choisir une démarche proposée." }, { status: 400 });
  }

  const procedure = getProcedureById(parsed.data.requestedAid)!;

  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json(
      { error: "OpenAI n'est pas configuré. Ajoutez OPENAI_API_KEY dans .env.local." },
      { status: 503 }
    );
  }

  const formData = parsed.data;
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
            content: buildUserPrompt(formData, procedure)
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

  const { data, error } = await supabase
    .from("requests")
    .insert({
      user_id: user.id,
      request_type: procedure.id,
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

function buildUserPrompt(formData: z.infer<typeof requestSchema>, procedure: NonNullable<ReturnType<typeof getProcedureById>>) {
  return `À partir des informations fournies, génère un dossier administratif clair et prudent.

Démarche sélectionnée :
- Intitulé : ${procedure.label}
- Catégorie : ${procedure.category}
- Organisme ou destinataire probable : ${procedure.targetOrganization}
- Consignes spécialisées : ${procedure.promptFocus}

Le résultat doit contenir :
- un résumé clair de la situation
- une checklist personnalisée
- une lettre administrative prête à copier
- les documents nécessaires
- les étapes à suivre
- un avertissement final rappelant qu'AdminFacile ne remplace pas un organisme officiel ou un conseil juridique

Règles :
- ne promets jamais l'acceptation d'un dossier
- ne donne pas de conseil juridique
- conseille de vérifier les informations sur les sites officiels
- formule la lettre de manière polie, simple et réutilisable

Informations utilisateur :
${JSON.stringify(formData, null, 2)}`;
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
