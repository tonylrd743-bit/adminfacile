import { NextResponse } from "next/server";
import { zodTextFormat } from "openai/helpers/zod";
import { z } from "zod";
import { getOpenAI } from "@/lib/openai";
import { getUserOrNull } from "@/lib/supabase/server";

export const runtime = "nodejs";

const requestSchema = z.object({
  description: z.string().trim().min(10),
  serviceType: z.string().trim().optional().default(""),
  businessActivity: z.string().trim().optional().default(""),
  estimatedTimeInput: z.string().trim().optional().default(""),
  materials: z.string().trim().optional().default(""),
  dimensions: z.string().trim().optional().default(""),
  travelDistance: z.string().trim().optional().default(""),
  services: z.array(z.string()).optional().default([]),
  profileContext: z
    .object({
      companyName: z.string().nullable().optional(),
      profession: z.string().nullable().optional(),
      activity: z.string().nullable().optional(),
      specialty: z.string().nullable().optional(),
      hourlyRate: z.number().nullable().optional(),
      serviceArea: z.string().nullable().optional(),
      travelFee: z.number().nullable().optional(),
      vatApplicable: z.boolean().nullable().optional(),
      documentStyle: z.string().nullable().optional()
    })
    .optional()
    .default({}),
  images: z.array(z.string().startsWith("data:image/")).max(4).optional().default([])
});

const resultSchema = z.object({
  title: z.string(),
  estimation: z.string(),
  priceMin: z.number(),
  priceMax: z.number(),
  businessContext: z.string(),
  estimatedTime: z.string(),
  profitability: z.string(),
  difficulty: z.enum(["Faible", "Moyenne", "Élevée", "Complexe"]),
  summary: z.string(),
  whyThisPrice: z.array(z.string()),
  marketPosition: z.string(),
  professionalAdvice: z.array(z.string()),
  recapRows: z.array(z.object({ label: z.string(), detail: z.string(), amount: z.string() })),
  badges: z.array(z.string()),
  emailSubject: z.string(),
  emailBody: z.string(),
  quoteService: z.string(),
  quoteDetails: z.string()
});

const systemPrompt = `Tu es un estimateur professionnel polyvalent pour indépendants, artisans, consultants, sociétés de services et petites entreprises en France.
Tu raisonnes comme un professionnel expérimenté, un chargé d'affaires et un responsable administratif.
Tu dois produire une estimation rentable, réaliste, cohérente avec le métier indiqué, les prix pratiqués en France et la valeur livrée au client.

Règles impératives :
- ne jamais casser les prix du marché
- ne jamais donner de prix absurdes ou trop vagues
- adapter le raisonnement au métier : bâtiment, nettoyage, jardinage, consulting, digital, livraison, dépannage, coaching, administratif, commerce ou autre
- tenir compte du temps, volume, surface, accès, difficulté, matériel, déplacement, sous-traitance, produits, fournitures, livrables et main d'œuvre lorsque c'est pertinent
- pour le bâtiment, raisonner en surface, ml, matériaux, préparation, protection, pose, finitions et accès
- pour le nettoyage, raisonner en surface, état initial, produits, temps, fréquence, accès et contraintes horaires
- pour le conseil ou le digital, raisonner en cadrage, livrables, valeur, nombre de jours, réunions et expertise
- pour le jardinage ou les espaces extérieurs, raisonner en végétaux, surfaces, accès, déchets verts, matériel et évacuation
- afficher une fourchette basse/haute et un prix conseillé crédible
- style attendu : "Pour cette prestation, un tarif cohérent en France se situe entre 900€ et 1 200€ selon le périmètre, les contraintes, le temps de travail et les fournitures. Un prix conseillé serait d'environ 1 050€ TTC."
- si des photos sont fournies, analyser prudemment ce qui est visible : état général, volume, accès, complexité, matériel ou contraintes apparentes
- rappeler que l'estimation reste indicative et basée sur les informations fournies
- répondre uniquement en JSON conforme au schéma demandé`;

export async function POST(request: Request) {
  const user = await getUserOrNull();
  if (!user) {
    return NextResponse.json({ error: "Authentification requise." }, { status: 401 });
  }

  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json({ error: "OpenAI n'est pas configuré. Ajoutez OPENAI_API_KEY côté serveur." }, { status: 503 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Requête invalide." }, { status: 400 });
  }

  const parsed = requestSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Décrivez la prestation à estimer avec suffisamment de contexte." }, { status: 400 });
  }

  const inputText = buildPrompt(parsed.data);
  const content = [
    { type: "input_text" as const, text: inputText },
    ...parsed.data.images.map((image) => ({ type: "input_image" as const, image_url: image, detail: "auto" as const }))
  ];

  try {
    const response = await getOpenAI().responses.create({
      model: process.env.OPENAI_MODEL ?? "gpt-4.1-mini",
      input: [
        { role: "system", content: systemPrompt },
        { role: "user", content }
      ],
      text: {
        format: zodTextFormat(resultSchema, "service_estimate")
      }
    });

    const result = resultSchema.safeParse(JSON.parse(response.output_text));
    if (!result.success) {
      return NextResponse.json({ error: "L'analyse a été générée, mais son format est invalide. Réessayez." }, { status: 502 });
    }

    return NextResponse.json(result.data);
  } catch (error) {
    const status = typeof error === "object" && error !== null && "status" in error ? Number(error.status) : undefined;
    if (status === 429) {
      return NextResponse.json({ error: "Quota OpenAI atteint ou temporairement limité. Réessayez plus tard." }, { status: 429 });
    }
    if (status && status >= 500) {
      return NextResponse.json({ error: "OpenAI est temporairement indisponible. Réessayez dans quelques minutes." }, { status: 503 });
    }
    return NextResponse.json({ error: "Impossible d'analyser la prestation pour le moment." }, { status: 502 });
  }
}

function buildPrompt(data: z.infer<typeof requestSchema>) {
  return `Analyse cette prestation et produis une estimation professionnelle adaptée au métier.

Métier ou activité de l'utilisateur :
${data.businessActivity || "Non précisé"}

Profil professionnel enregistré :
${JSON.stringify(data.profileContext, null, 2)}

Type de prestation :
${data.serviceType || "Non précisé"}

Description utilisateur :
${data.description}

Dimensions, surfaces, volumes ou quantités :
${data.dimensions || "Non précisés"}

Temps estimé par l'utilisateur :
${data.estimatedTimeInput || "Non précisé"}

Matériel, fournitures, produits ou livrables :
${data.materials || "Non précisés"}

Distance déplacement :
${data.travelDistance || "Non précisée"}

Catégories indicatives :
${data.services.length ? data.services.join(", ") : "Aucune catégorie imposée"}

Images fournies : ${data.images.length}

Structure attendue :
1. estimation globale TTC sous forme "entre X€ et Y€ TTC"
2. explication professionnelle du prix
3. positionnement marché France
4. conseils professionnels
5. tableau récapitulatif
6. temps estimé
7. estimation rentabilité
8. email client prêt à envoyer
9. données utiles pour transformer en devis ou facture

Le champ businessContext doit expliquer en une phrase comment l'estimation a été adaptée au métier ou au type de prestation.`;
}
